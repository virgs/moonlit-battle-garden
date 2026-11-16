import { config } from './config';
import type { Match } from './Match';
import { Random } from './random';
import type { Difficulty, PlayerId } from './types';

export class Bot {
  private random: Random;
  private nextAction = 0;
  private considered = new Set<number>();

  constructor(private difficulty: Difficulty, seed: number, private id: PlayerId = 1) {
    this.random = new Random(seed);
  }

  update(match: Match): void {
    const state = match.state;
    if (state.phase !== 'playing' || state.paused || state.time < this.nextAction) return;
    const player = state.players[this.id];
    const tuning = config.ai[this.difficulty];
    const visible = player.holes.filter(target => target !== null);
    const activeIds = new Set(visible.map(target => target.id));
    this.considered = new Set([...this.considered].filter(id => activeIds.has(id)));
    if (player.stars && state.time >= player.nextCast) {
      const emergency = player.character === 'champignon' && (player.pending.length > 0 || player.health < 40 || visible.length >= 3);
      const threshold = this.difficulty === 'easy' ? 1 : player.character === 'andy' ? 2 : 4;
      if (player.stars >= threshold || emergency) {
        match.action({ type: 'cast', player: this.id });
        this.nextAction = state.time + tuning.intervalMs;
        return;
      }
    }
    // Only inspect already visible targets; no access to future spawn randomness.
    const targets = player.holes.flatMap((target, hole) => target ? [{ ...target, hole }] : [])
      .filter(target => state.time - target.born >= tuning.reactionMs && !this.considered.has(target.id))
      .sort((a, b) => Number(b.kind === 'star') - Number(a.kind === 'star') || a.expires - b.expires);
    for (const target of targets) {
      this.considered.add(target.id);
      const hit = this.random.next() < (target.kind === 'rabbit' ? tuning.rabbitMistake : tuning.accuracy);
      if (hit) {
        match.action({ type: 'hit', player: this.id, hole: target.hole });
        this.nextAction = state.time + tuning.intervalMs;
        return;
      }
    }
  }
}
