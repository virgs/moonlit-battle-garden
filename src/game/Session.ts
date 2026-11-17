import { Bot } from './Bot';
import { Match } from './Match';
import { config } from './config';
import { chooseHome } from './homes';
import { HomeMusic } from '../presentation/HomeMusic';
import { SoundEffects } from '../presentation/SoundEffects';
import { prepareAudio, takePrimedMusic } from '../presentation/audioGesture';
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
  private effects: SoundEffects | null = null;
  private music: HomeMusic | null = null;
  private musicWanted = false;
  muted = true;
  private peerReady = false;
  private linkState: LinkState = 'connected';
  private rtt: number | null = null;
  private lastTick = 0;
  private elapsed = 0;

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
    this.effects?.setMuted(this.muted || this.match.state.paused || this.linkState !== 'connected');
    this.effects?.sync({ state: this.match.state, events: this.match.events });
    this.listeners.forEach(listener => listener());
  }
  private resetClock(): void {
    this.lastTick = performance.now();
    this.elapsed = 0;
  }
  start(): void {
    if (this.timer) return;
    this.resetClock();
    if (this.network) this.network.send({ kind: 'ready' });
    this.timer = setInterval(() => {
      const now = performance.now();
      const delta = Math.max(0, Math.min(250, now - this.lastTick));
      this.lastTick = now;
      if (this.match.state.paused || (this.network && (this.network.seat === 1 || !this.peerReady || this.linkState !== 'connected'))) { this.elapsed = 0; return; }
      // Timer callbacks can arrive late under rendering load. Catch up in fixed
      // steps, including one bot decision per step, without a long-stall burst.
      this.elapsed += delta;
      while (this.elapsed >= config.tickMs) {
        this.elapsed -= config.tickMs;
        this.match.advance(config.tickMs);
        this.bot?.update(this.match);
      }
      this.publish();
    }, config.tickMs);
  }
  stop(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.effects?.dispose();
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
    this.match.nextRound(); this.resetClock(); this.publish();
  }
  receive(message: Wire): void {
    if (!this.network) return;
    if (message.kind === 'ready') { this.peerReady = true; this.linkState = 'connected'; if (this.network.seat === 0) this.match.state.paused = false; this.resetClock(); this.publish(); }
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
    if (message.kind === 'next') this.nextRound();
  }
  connection(status: LinkState, rtt = this.rtt): void {
    if (status !== this.linkState) this.resetClock();
    this.linkState = status; this.rtt = rtt;
    if (status !== 'connected') { this.peerReady = false; this.match.state.paused = true; }
    this.publish();
  }
  togglePause(): void {
    if (this.match.options.mode === 'online') return;
    if (['playing', 'countdown'].includes(this.match.state.phase)) { this.match.state.paused = !this.match.state.paused; this.resetClock(); }
    this.publish();
  }
  enableSound(): void {
    if (typeof window !== 'undefined') prepareAudio();
    if (!this.effects) { this.effects = new SoundEffects(); this.effects.preload(); this.music = new HomeMusic(this.home.music, takePrimedMusic()); }
    this.muted = false;
    this.publish();
  }
  toggleSound(): void {
    if (this.muted) { this.enableSound(); return; }
    this.muted = true; this.publish();
  }
}
