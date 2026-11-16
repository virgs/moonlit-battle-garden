import { Bot } from './Bot';
import { Match } from './Match';
import { config } from './config';
import { chooseHome } from './homes';
import type { GameAction, GameEvent, MatchOptions, MatchState } from './types';

export type Snapshot = { state: MatchState; events: GameEvent[] };

/** Local session boundary. An online session can later expose the same UI contract. */
export class Session {
  readonly match: Match;
  readonly home: ReturnType<typeof chooseHome>;
  private bot: Bot | null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private listeners = new Set<() => void>();
  private snapshot: Snapshot;
  private sounds: Partial<Record<GameEvent['kind'], HTMLAudioElement>> = {};
  private lastSound = 0;
  private music: HTMLAudioElement | null = null;
  private musicWanted = false;
  muted = true;

  constructor(options: MatchOptions) {
    this.match = new Match(options);
    this.home = chooseHome(options);
    this.bot = options.mode === 'ai' ? new Bot(options.difficulty, options.seed ^ 12345) : null;
    this.snapshot = this.read();
  }

  private read(): Snapshot {
    return { state: structuredClone(this.match.state), events: [...this.match.events] };
  }
  getSnapshot = (): Snapshot => this.snapshot;
  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
  private publish(): void {
    this.snapshot = this.read();
    this.syncMusic();
    if (!this.muted) {
      const event = this.match.events.filter(item => item.id > this.lastSound).at(-1);
      const sound = event && this.sounds[event.kind];
      if (sound) { sound.currentTime = 0; void sound.play().catch(() => {}); }
    }
    this.lastSound = this.match.events.at(-1)?.id ?? 0;
    this.listeners.forEach(listener => listener());
  }
  start(): void {
    if (this.timer) return;
    this.timer = setInterval(() => {
      this.match.advance(config.tickMs);
      this.bot?.update(this.match);
      this.publish();
    }, config.tickMs);
  }
  stop(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    Object.values(this.sounds).forEach(sound => sound.pause());
    this.music?.pause();
    this.musicWanted = false;
  }
  private syncMusic(): void {
    const state = this.match.state;
    const wanted = !this.muted && !state.paused && (state.phase === 'playing' || state.phase === 'countdown');
    if (wanted === this.musicWanted || !this.music) return;
    this.musicWanted = wanted;
    if (wanted) void this.music.play().catch(() => {});
    else this.music.pause();
  }
  act(action: GameAction): void { this.match.action(action); this.publish(); }
  nextRound(): void { this.match.nextRound(); this.publish(); }
  togglePause(): void {
    if (['playing', 'countdown'].includes(this.match.state.phase)) this.match.state.paused = !this.match.state.paused;
    this.publish();
  }
  toggleSound(): void {
    this.muted = !this.muted;
    if (!this.muted && !this.sounds.hit) {
      this.sounds = {
        hit: new Audio('/assets/die0.wav'), star: new Audio('/assets/starHit.wav'),
        hurt: new Audio('/assets/wrongHit.wav'),
      };
      Object.values(this.sounds).forEach(sound => { sound.volume = 0.3; sound.load(); });
      this.music = new Audio(this.home.music);
      this.music.loop = true;
      this.music.volume = 0.12;
    }
    this.publish();
  }
}
