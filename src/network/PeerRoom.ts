import Peer, { type DataConnection, type PeerOptions } from 'peerjs';
import { Session } from '../game/Session';
import type { CharacterId, MatchOptions } from '../game/types';
import { isWire, RULESET, type Wire } from './protocol';

type Callbacks = { status: (message: string) => void; invite: (id: string) => void; start: (session: Session) => void };

/** Signaling discovers peers; only the host browser runs gameplay. No gameplay server. */
export class PeerRoom {
  private peer: Peer;
  private conn: DataConnection | null = null;
  private session: Session | null = null;
  private token = crypto.randomUUID();
  private guestToken: string | null = null;
  private joined = false;
  private closed = false;
  private lastSeen = Date.now();
  private lostAt = 0;
  private openedAt = Date.now();
  private registered = false;
  private lastAttempt = 0;
  private heartbeat: ReturnType<typeof setInterval>;
  private candidates = new Set<DataConnection>();

  constructor(private character: CharacterId, private hostId: string | null, private callbacks: Callbacks) {
    const env = import.meta.env;
    const options: PeerOptions = {};
    if (env.VITE_PEER_HOST) Object.assign(options, { host: env.VITE_PEER_HOST, port: Number(env.VITE_PEER_PORT || 443), path: env.VITE_PEER_PATH || '/', secure: env.VITE_PEER_SECURE !== 'false' });
    // ICE configuration is public browser configuration. Never put a permanent TURN secret here.
    if (env.VITE_ICE_SERVERS) options.config = { iceServers: JSON.parse(env.VITE_ICE_SERVERS) };
    this.peer = new Peer(options);
    this.peer.on('open', id => {
      if (this.closed) return;
      this.registered = true;
      callbacks.invite(id);
      if (hostId) { if (!this.conn?.open) this.connect(); } else if (!this.session) callbacks.status('Waiting for your opponent…');
    });
    this.peer.on('connection', connection => {
      if (this.hostId) { connection.on('open', () => { connection.send({ kind: 'reject', reason: 'This garden is not hosting.' }); connection.close(); }); return; }
      this.bind(connection);
    });
    this.peer.on('error', error => {
      if (this.closed) return;
      if (this.session) this.lost();
      else callbacks.status(`Could not connect (${error.type}). Check the invite and try again. Some networks require a relay.`);
    });
    this.peer.on('disconnected', () => { if (!this.closed) { try { this.peer.reconnect(); } catch { /* next heartbeat retries */ } } });
    this.peer.on('close', () => { if (!this.closed) this.finish('The connection service closed. Return to setup and try again.'); });
    this.heartbeat = setInterval(() => this.pulse(), 1000);
  }

  private connect(): void {
    if (this.closed || !this.hostId || this.peer.disconnected || this.peer.destroyed) return;
    this.lastAttempt = Date.now();
    this.bind(this.peer.connect(this.hostId, { reliable: true, serialization: 'json' }));
  }
  private bind(connection: DataConnection): void {
    this.candidates.add(connection);
    const deadline = setTimeout(() => { if (this.conn !== connection) { connection.close(); this.candidates.delete(connection); } }, 10000);
    connection.on('open', () => {
      if (this.closed) { connection.close(); return; }
      if (this.hostId) {
        this.conn?.close(); this.conn = connection; this.joined = false;
        this.send({ kind: 'hello', character: this.character, token: this.token, rules: RULESET });
      }
    });
    connection.on('data', value => {
      if (this.closed || !isWire(value)) return;
      if (value.kind === 'hello' && !this.hostId) this.accept(connection, value);
      if (connection !== this.conn) return;
      this.lastSeen = Date.now();
      if (value.kind === 'welcome' && this.hostId) {
        if (value.options?.mode !== 'online' || !Array.isArray(value.options.characters)) return;
        if (!this.session) {
          this.session = this.createSession(value.options, 1);
          this.session.receive({ kind: 'state', snapshot: value.snapshot });
          this.callbacks.start(this.session);
        } else {
          this.session.receive({ kind: 'state', snapshot: value.snapshot });
          this.session.connection('connected');
          this.send({ kind: 'ready' });
        }
        this.joined = true; this.lostAt = 0;
        this.callbacks.status('Connected');
      } else if (value.kind === 'reject') this.finish(value.reason);
      else if (value.kind === 'bye') this.finish('Your opponent left the garden.');
      else if (value.kind === 'ping') this.send({ kind: 'pong', time: value.time });
      else if (value.kind === 'pong') this.session?.connection(this.lostAt ? 'reconnecting' : 'connected', Math.max(0, Date.now() - value.time));
      else if (value.kind === 'ready') { this.joined = true; this.lostAt = 0; this.session?.receive(value); }
      else if (this.joined) this.session?.receive(value);
    });
    const ended = () => {
      clearTimeout(deadline); this.candidates.delete(connection);
      if (this.conn === connection && !this.closed) { this.conn = null; this.lost(); }
    };
    connection.on('close', ended); connection.on('error', ended);
  }
  private accept(connection: DataConnection, message: Extract<Wire, { kind: 'hello' }>): void {
    let reason = '';
    if (message.rules !== RULESET) reason = 'Game versions differ. Both players should refresh the game.';
    else if (!['champignon', 'andy'].includes(message.character) || typeof message.token !== 'string') reason = 'Invalid character selection.';
    else if (this.guestToken && this.guestToken !== message.token) reason = 'This garden already has two players.';
    if (reason) { connection.send({ kind: 'reject', reason }); setTimeout(() => connection.close(), 200); return; }
    const previous = this.conn;
    this.conn = connection;
    if (previous !== connection) previous?.close();
    this.guestToken = message.token; this.lastSeen = Date.now();
    if (!this.session) {
      const options: MatchOptions = { characters: [this.character, message.character as CharacterId], mode: 'online', difficulty: 'medium', seed: crypto.getRandomValues(new Uint32Array(1))[0] };
      this.session = this.createSession(options, 0);
      this.send({ kind: 'welcome', options, snapshot: this.session.getSnapshot() });
      this.callbacks.start(this.session);
    } else {
      this.send({ kind: 'welcome', options: this.session.match.options, snapshot: this.session.getSnapshot() });
    }
    this.callbacks.status('Connected');
  }
  private createSession(options: MatchOptions, seat: 0 | 1): Session {
    return new Session(options, { seat, send: message => this.send(message), close: () => this.dispose() });
  }
  private send(message: Wire): void {
    if (this.closed || !this.conn?.open) return;
    // Drop superseded snapshots under backpressure; inputs/control remain reliable.
    if (message.kind === 'state' && this.conn.dataChannel.bufferedAmount > 65536) return;
    try { this.conn.send(message); } catch { this.lost(); }
  }
  private lost(): void {
    if (this.closed || !this.session) return;
    if (!this.lostAt) this.lostAt = Date.now();
    this.joined = false;
    this.session.connection('reconnecting');
    this.callbacks.status('Connection interrupted. Reconnecting…');
  }
  private pulse(): void {
    if (this.closed) return;
    const now = Date.now();
    if (this.peer.disconnected && !this.peer.destroyed) { try { this.peer.reconnect(); } catch { /* still reconnecting */ } }
    if (!this.session && (!this.registered || this.hostId) && now - this.openedAt > 25000) { this.finish('Could not reach the other garden. Check the invite or try a different network.'); return; }
    if (this.session && this.joined && now - this.lastSeen > 6000) this.lost();
    if (this.session && !this.joined && !this.lostAt && now - this.lastSeen > 10000) this.lost();
    if (this.lostAt) {
      if (now - this.lostAt > 30000) { this.finish('Connection lost. Return to setup to start a new match.'); return; }
      if (this.hostId && now - this.lastAttempt > 2500) this.connect();
    }
    if (this.conn?.open) this.send({ kind: 'ping', time: now });
  }
  private finish(reason: string): void {
    this.callbacks.status(reason);
    this.session?.connection('ended');
    this.dispose(false);
  }
  dispose(notify = true): void {
    if (this.closed) return;
    if (notify) this.send({ kind: 'bye' });
    this.closed = true;
    clearInterval(this.heartbeat);
    this.conn?.close();
    this.candidates.forEach(connection => connection.close()); this.candidates.clear();
    this.peer.destroy();
  }
}
