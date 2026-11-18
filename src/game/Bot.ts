import { config } from './config';
import type { Match } from './Match';
import { Random } from './random';
import type { Difficulty, PlayerId } from './types';

export class Bot {
  private random: Random;
  private timing: Random;
  private reactionAt = new Map<number,number>();
  private nextAction = 0;
  private considered = new Set<number>();
  private desiredTier = 0;

  constructor(private difficulty: Difficulty, seed: number, private id: PlayerId = 1) {
    this.random = new Random(seed);
    this.timing = new Random(seed ^ 0x71a5b39d);
  }

  private scheduleAction(time:number):void {
    const tuning=config.ai[this.difficulty];
    const jitter=tuning.intervalJitter??0;
    const interval=tuning.intervalMs*(jitter?1+(this.timing.next()*2-1)*jitter:1);
    const hesitation=(tuning.hesitationChance??0)>0&&this.timing.next()<(tuning.hesitationChance??0)
      ? (tuning.hesitationMinMs??0)+this.timing.next()*((tuning.hesitationMaxMs??0)-(tuning.hesitationMinMs??0)):0;
    this.nextAction=time+Math.round(interval+hesitation);
  }

  update(match: Match): void {
    const state = match.state;
    if (state.phase !== 'playing' || state.paused || state.casting || state.time < this.nextAction) return;
    const player = state.players[this.id];
    const tuning = config.ai[this.difficulty];
    const visible = player.holes.filter(target => target !== null);
    const activeIds = new Set(visible.map(target => target.id));
    this.considered = new Set([...this.considered].filter(id => activeIds.has(id)));
    for(const id of this.reactionAt.keys())if(!activeIds.has(id))this.reactionAt.delete(id);
    if(tuning.reactionJitter)for(const target of visible)if(!this.reactionAt.has(target.id)) {
      this.reactionAt.set(target.id,target.born+Math.round(tuning.reactionMs*(1+(this.timing.next()*2-1)*tuning.reactionJitter)));
    }
    if (player.stars && state.time >= player.nextCast) {
      if (!this.desiredTier) {
        const tiers = this.difficulty === 'easy' ? [1, 1, 2, 3, 4] : [1, 2, 3, 4, 4];
        this.desiredTier = tiers[Math.floor(this.random.next() * tiers.length)];
      }
      const opponent = state.players[this.id === 0 ? 1 : 0];
      const emergency = player.character === 'champignon' && (
        (player.pending.length > 0 && player.stars === 3) ||
        (opponent.score - player.score >= config.winScoreDifference * 0.65 && player.mistakeShield === 0) ||
        visible.filter(target => target.kind === 'mole').length >= 3
      );
      const canSteal = player.character === 'andromoss' && player.stars === 3 && opponent.stars >= 2;
      const waitForWard = player.character === 'andromoss' && opponent.magicShieldUntil > state.time;
      const alreadyGuarded = player.character === 'champignon' && player.stars === 1 && player.mistakeShield > 0 && player.shieldUntil > state.time;
      if (!waitForWard && !alreadyGuarded && (player.stars >= this.desiredTier || emergency || canSteal)) {
        match.action({ type: 'cast', player: this.id });
        this.desiredTier = 0;
        this.scheduleAction(state.time);
        return;
      }
    }
    // Only inspect already visible targets; no access to future spawn randomness.
    const targets = player.holes.flatMap((target, hole) => target ? [{ ...target, hole }] : [])
      .filter(target => state.time >= (this.reactionAt.get(target.id)??target.born+tuning.reactionMs) && !this.considered.has(target.id))
      .sort((a, b) => Number(b.kind === 'star') - Number(a.kind === 'star') || a.expires - b.expires);
    for (const target of targets) {
      this.considered.add(target.id);
      const hit = this.random.next() < (target.kind === 'rabbit' ? tuning.rabbitMistake : tuning.accuracy);
      if (hit) {
        match.action({ type: 'hit', player: this.id, hole: target.hole });
        this.scheduleAction(state.time);
        return;
      }
    }
  }
}
