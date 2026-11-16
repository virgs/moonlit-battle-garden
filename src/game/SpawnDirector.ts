import { config } from './config';
import { pacingAt, waveDurationMs } from './pacing';
import { Random } from './random';
import type { MatchState, Player, PlayerId, TargetKind } from './types';

/** Shared natural offers; independent positions and magic never perturb the shared clock. */
export class SpawnDirector {
  private schedule: Random;
  private positions: [Random, Random];
  private magic: [Random, Random];
  private nextNatural = 0;
  private starIndex = 0;
  private rabbitStreak = 0;
  private targetId = 0;

  constructor(private seed: number) {
    this.schedule = new Random(seed ^ 0x3571);
    this.positions = [new Random(seed ^ 0x1234), new Random(seed ^ 0x5678)];
    this.magic = [new Random(seed ^ 0x9321), new Random(seed ^ 0x9765)];
  }
  reset(roundStart: number): void {
    this.schedule = new Random(this.seed ^ 0x3571);
    this.nextNatural = roundStart + config.pacing.firstSpawnMs;
    this.starIndex = 0;
    this.rabbitStreak = 0;
  }
  update(state: MatchState): void {
    const elapsed = state.time - state.roundStart;
    const pace = pacingAt(elapsed);
    if (state.time >= this.nextNatural) {
      const rabbit = this.schedule.next() < pace.rabbitChance && this.rabbitStreak < config.pacing.maxRabbitStreak;
      this.rabbitStreak = rabbit ? this.rabbitStreak + 1 : 0;
      this.nextNatural = state.time + Math.round(Math.max(config.pacing.minIntervalMs, pace.intervalMs * (1 + (this.schedule.next() * 2 - 1) * config.pacing.jitter)));
      state.players.forEach((player, id) => {
        if (state.time < player.nextSpawn) return;
        player.nextSpawn = this.nextNatural;
        const count = player.holes.filter(target => target && target.kind !== 'star' && target.origin !== 'magic').length;
        if (count < pace.naturalCap) this.place(state, id as PlayerId, rabbit ? 'rabbit' : 'mole', pace.lifetimeMs, 'natural');
      });
    }
    const offsets = config.pacing.starOffsetsMs;
    const nextStar = Math.floor(this.starIndex / offsets.length) * waveDurationMs + offsets[this.starIndex % offsets.length];
    if (elapsed >= nextStar) {
      this.starIndex++;
      state.players.forEach((player, id) => {
        if (Number.isFinite(player.nextSpawn) && !player.holes.some(target => target?.kind === 'star')) this.place(state, id as PlayerId, 'star', config.pacing.starLifetimeMs, 'star');
      });
    }
    state.players.forEach((player, id) => this.magicSpawn(state, player, id as PlayerId));
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
