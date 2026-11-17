import { config } from './config';
import { pacingAt, playerPacingAt, waveDurationMs } from './pacing';
import { Random } from './random';
import type { MatchState, Player, PlayerId, TargetKind } from './types';

/** Independent board clocks share the real-time wave; score pressure speeds only the trailing board. */
export class SpawnDirector {
  private schedule: [Random, Random];
  private positions: [Random, Random];
  private magic: [Random, Random];
  private clock = [0, 0];
  private nextNatural = [0, 0];
  private lastNatural = [0, 0];
  private lastTime = 0;
  private starIndex = [0, 0];
  private rabbitStreak = [0, 0];
  private targetId = 0;

  constructor(private seed: number) {
    this.schedule = this.schedules();
    this.positions = [new Random(seed ^ 0x1234), new Random(seed ^ 0x5678)];
    this.magic = [new Random(seed ^ 0x9321), new Random(seed ^ 0x9765)];
  }
  reset(roundStart: number): void {
    this.schedule = this.schedules();
    this.clock = [0, 0];
    this.nextNatural = [config.pacing.firstSpawnMs, config.pacing.firstSpawnMs];
    this.lastNatural = [roundStart - config.pacing.minIntervalMs, roundStart - config.pacing.minIntervalMs];
    this.lastTime = roundStart;
    this.starIndex = [0, 0];
    this.rabbitStreak = [0, 0];
  }
  private schedules(): [Random, Random] {
    return [new Random(this.seed ^ 0x3571), new Random(this.seed ^ 0x13579)];
  }
  update(state: MatchState): void {
    const elapsed = state.time - state.roundStart;
    const base = pacingAt(elapsed);
    const delta = Math.max(0, state.time - this.lastTime);
    this.lastTime = state.time;
    state.players.forEach((player, index) => {
      const id = index as PlayerId;
      const pace = playerPacingAt(elapsed, player.score, state.players[id === 0 ? 1 : 0].score);
      // Integrate rate changes, rather than resetting deadlines when the lead changes.
      this.clock[id] += delta * pace.clockRate;
      if (this.clock[id] >= this.nextNatural[id] && state.time - this.lastNatural[id] >= config.pacing.minIntervalMs) {
        const random = this.schedule[id];
        const rabbit = random.next() < base.rabbitChance && this.rabbitStreak[id] < config.pacing.maxRabbitStreak;
        this.rabbitStreak[id] = rabbit ? this.rabbitStreak[id] + 1 : 0;
        const interval = Math.max(config.pacing.minIntervalMs, base.intervalMs * (1 + (random.next() * 2 - 1) * config.pacing.jitter));
        this.nextNatural[id] = this.clock[id] + interval;
        this.lastNatural[id] = state.time;
        if (Number.isFinite(player.nextSpawn)) {
          player.nextSpawn = state.time + Math.round(Math.max(config.pacing.minIntervalMs, interval / pace.clockRate));
          const count = player.holes.filter(target => target && target.kind !== 'star' && target.origin !== 'magic').length;
          if (count < base.naturalCap) this.place(state, id, rabbit ? 'rabbit' : 'mole', pace.lifetimeMs, 'natural');
        }
      }
      const offsets = config.pacing.starOffsetsMs;
      const ordinal = this.starIndex[id];
      const nextStar = Math.floor(ordinal / offsets.length) * waveDurationMs + offsets[ordinal % offsets.length];
      if (this.clock[id] >= nextStar) {
        this.starIndex[id]++;
        if (Number.isFinite(player.nextSpawn) && !player.holes.some(target => target?.kind === 'star')) this.place(state, id, 'star', pace.starLifetimeMs, 'star');
      }
      this.magicSpawn(state, player, id);
    });
  }
  private magicSpawn(state: MatchState, player: Player, id: PlayerId): void {
    if ((player.invasionUntil <= state.time && player.decoysUntil <= state.time) || state.time < player.nextDecoy) return;
    const strong = player.decoysUntil > state.time;
    player.nextDecoy = state.time + (strong ? 650 : 950);
    if (player.holes.filter(target => target?.origin === 'magic').length >= config.pacing.maxMagicTargets) return;
    const kind = strong && this.magic[id].next() < 0.3 ? 'mole' : 'rabbit';
    this.place(state, id, kind, Math.min(1450, pacingAt(state.time - state.roundStart).lifetimeMs), 'magic');
  }
  private place(state: MatchState, id: PlayerId, kind: TargetKind, lifetime: number, origin: 'natural' | 'star' | 'magic'): void {
    const player = state.players[id];
    const empty = player.holes.flatMap((target, hole) => target ? [] : [hole]);
    if (!empty.length) return;
    const hole = empty[Math.floor(this.positions[id].next() * empty.length)];
    player.holes[hole] = { id: ++this.targetId, kind, origin, born: state.time, expires: state.time + Math.round(lifetime) };
    player.spawned++;
  }
}
