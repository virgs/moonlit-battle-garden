import { Bot } from './Bot';
import { Match } from './Match';
import { config } from './config';
import { chooseHome } from './homes';
import { HomeMusic } from '../presentation/HomeMusic';
import { presentation } from '../presentation/config';
import type { GameAction, GameEvent, MatchOptions, MatchState } from './types';
import { inputAction, localView, type LinkState, type NetworkLink, type Wire } from '../network/protocol';

export type Snapshot = { state: MatchState; events: GameEvent[]; network?: { status: LinkState; rtt: number | null } };

/** Shared local/online session boundary; network guests render host snapshots. */
export class Session {
  readonly match: Match;
  readonly home: ReturnType<typeof chooseHome>;
  private bot: Bot | null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private listeners = new Set<() => void>();
  private snapshot: Snapshot;
  private sounds: Partial<Record<GameEvent['kind'], HTMLAudioElement>> = {};
  private castSounds = new Map<string, HTMLAudioElement>();
  private lastSound = 0;
  private music: HomeMusic | null = null;
  private musicWanted = false;
  muted = true;
  private peerReady = false;
  private linkState: LinkState = 'connected';
  private rtt: number | null = null;

  constructor(options: MatchOptions, private network?: NetworkLink) {
    this.match = new Match(options);
    this.home = chooseHome(options);
    this.bot = options.mode === 'ai' ? new Bot(options.difficulty, options.seed ^ 12345) : null;
    this.snapshot = this.read();
  }

  private read(): Snapshot {
    const raw = { state: structuredClone(this.match.state), events: [...this.match.events] };
    if (!this.network) return raw;
    return { ...localView(raw, this.network.seat), network: { status: this.linkState, rtt: this.rtt } };
  }
  getSnapshot = (): Snapshot => this.snapshot;
  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
  private publish(): void {
    this.snapshot = this.read();
    if (this.network?.seat === 0 && this.linkState === 'connected') this.network.send({ kind: 'state', snapshot: { state: structuredClone(this.match.state), events: [...this.match.events] } });
    this.syncMusic();
    if (!this.muted) {
      for (const event of this.match.events.filter(item => item.id > this.lastSound)) {
        let sound = this.sounds[event.kind];
        const clip = event.kind === 'cast' && event.tier ? presentation[this.match.state.players[event.player].character].casts[event.tier] : null;
        if (clip?.sound) {
          if (!this.castSounds.has(clip.sound)) { const audio = new Audio(clip.sound); audio.volume = 0.3; this.castSounds.set(clip.sound, audio); }
          sound = this.castSounds.get(clip.sound);
        }
        if (sound) { sound.currentTime = 0; void sound.play().catch(() => {}); }
      }
    }
    this.lastSound = this.match.events.at(-1)?.id ?? 0;
    this.listeners.forEach(listener => listener());
  }
  start(): void {
    if (this.timer) return;
    if (this.network) this.network.send({ kind: 'ready' });
    this.timer = setInterval(() => {
      if (this.network && (this.network.seat === 1 || !this.peerReady || this.linkState !== 'connected')) return;
      this.match.advance(config.tickMs);
      this.bot?.update(this.match);
      this.publish();
    }, config.tickMs);
  }
  stop(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    Object.values(this.sounds).forEach(sound => sound.pause());
    this.castSounds.forEach(sound => sound.pause());
    this.music?.dispose();
    this.musicWanted = false;
    this.network?.close();
  }
  private syncMusic(): void {
    const state = this.match.state;
    const wanted = !this.muted && !state.paused && this.linkState === 'connected' && (state.phase === 'playing' || state.phase === 'countdown');
    if (wanted === this.musicWanted || !this.music) return;
    this.musicWanted = wanted;
    this.music.setPlaying(wanted);
  }
  act(action: GameAction): void {
    if (this.network) {
      if (action.player !== 0 || this.linkState !== 'connected') return;
      if (this.network.seat === 1) {
        const target = this.snapshot.state.players[0].holes[action.type === 'hit' ? action.hole : 0];
        this.network.send({ kind: 'input', input: action.type === 'cast' ? { type: 'cast' } : { type: 'hit', hole: action.hole, target: target?.id ?? null } });
        return;
      }
    }
    this.match.action(action); this.publish();
  }
  nextRound(): void {
    if (this.network && this.linkState !== 'connected') return;
    if (this.network?.seat === 1) { this.network.send({ kind: 'next' }); return; }
    this.match.nextRound(); this.publish();
  }
  receive(message: Wire): void {
    if (!this.network) return;
    if (message.kind === 'ready') { this.peerReady = true; this.linkState = 'connected'; this.publish(); }
    if (this.network.seat === 1) {
      if (message.kind === 'state') {
        Object.assign(this.match.state, structuredClone(message.snapshot.state));
        this.match.events = structuredClone(message.snapshot.events);
        this.publish();
      }
      return;
    }
    if (this.linkState !== 'connected') return;
    if (message.kind === 'input' && message.input && typeof message.input === 'object') {
      const action = inputAction(message.input, 1, { state: this.match.state, events: this.match.events });
      if (action) { this.match.action(action); this.publish(); }
    }
    if (message.kind === 'pause') this.togglePause();
    if (message.kind === 'next') this.nextRound();
  }
  connection(status: LinkState, rtt = this.rtt): void {
    this.linkState = status; this.rtt = rtt;
    if (status !== 'connected') { this.peerReady = false; this.match.state.paused = true; }
    this.publish();
  }
  togglePause(): void {
    if (this.network && this.linkState !== 'connected') return;
    if (this.network?.seat === 1) { this.network.send({ kind: 'pause' }); return; }
    if (['playing', 'countdown'].includes(this.match.state.phase)) this.match.state.paused = !this.match.state.paused;
    this.publish();
  }
  toggleSound(): void {
    this.muted = !this.muted;
    if (this.muted) {
      Object.values(this.sounds).forEach(sound => sound.pause());
      this.castSounds.forEach(sound => sound.pause());
    }
    if (!this.muted && !this.sounds.hit) {
      this.sounds = {
        hit: new Audio('/assets/die0.wav'), star: new Audio('/assets/starHit.wav'),
        penalty: new Audio('/assets/wrongHit.wav'),
      };
      Object.values(this.sounds).forEach(sound => { sound.volume = 0.3; sound.load(); });
      this.music = new HomeMusic(this.home.music);
    }
    this.publish();
  }
}
