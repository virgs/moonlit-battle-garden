import { hasGuard,hasTinCaps } from './targetModifiers';
import { config } from './config';
import { IsolatedCasting } from './IsolatedCasting';
import { busiestColumns } from './targetColumns';
import type { Match } from './Match';
import { Random } from './random';
import type { Difficulty, PlayerId } from './types';

export class Bot {
  private random: Random;
  private isolatedCasting: IsolatedCasting;
  private timing: Random;
  private reactionAt = new Map<number,number>();
  private nextAction = 0;
  private considered = new Set<number>();
  private desiredTier = 0;

  constructor(private difficulty: Difficulty, seed: number, private id: PlayerId = 1) {
    this.random = new Random(seed);
    this.isolatedCasting = new IsolatedCasting(seed,difficulty);
    this.timing = new Random(seed ^ 0x71a5b39d);
  }

  get castingStatistics() { return this.isolatedCasting.statistics; }

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
    if (state.phase !== 'playing' || state.paused || state.casting) return;
    const player = state.players[this.id];
    // Casting has its own clock/RNG and does not wait on hit-action scheduling.
    if (!match.options.diagnosticMode && match.isolatedCastingPolicy === 'opportunity') {
      if (this.isolatedCasting.tryCast(match,this.id)) return;
    } else if (!match.options.diagnosticMode && match.options.isolatedSpellTier && player.stars === match.options.isolatedSpellTier && state.time >= player.nextCast) {
      match.action({ type: 'cast', player: this.id });
      return;
    }
    if (state.time < this.nextAction) return;
    const tuning = config.ai[this.difficulty];
    const visible = player.holes.filter(target => target !== null);
    const activeIds = new Set(visible.map(target => target.id));
    this.considered = new Set([...this.considered].filter(id => activeIds.has(id)));
    for(const id of this.reactionAt.keys())if(!activeIds.has(id))this.reactionAt.delete(id);
    if(tuning.reactionJitter)for(const target of visible)if(!this.reactionAt.has(target.id)) {
      this.reactionAt.set(target.id,target.born+Math.round(tuning.reactionMs*(1+(this.timing.next()*2-1)*tuning.reactionJitter)));
    }
    if (!match.options.diagnosticMode && !match.options.isolatedSpellTier && player.stars && state.time >= player.nextCast) {
      if (!this.desiredTier) {
        const tiers = this.difficulty === 'easy' ? [1, 1, 2, 3, 4] : [1, 2, 3, 4, 4];
        this.desiredTier = tiers[Math.floor(this.random.next() * tiers.length)];
      }
      const opponent = state.players[this.id === 0 ? 1 : 0];
      const defender = player.character === 'champignon' || player.character === 'captain-bramble';
      const sweepColumn = busiestColumns(player, 1)[0];
      const sweepTargets = player.holes.flatMap((target, hole) => target && hole % 3 === sweepColumn ? [target] : []);
      const sweepAtRisk = sweepTargets.filter(target => target.kind === 'mole' && target.expires - state.time <= tuning.reactionMs + tuning.intervalMs * (1 + (target.armor ?? 0)));
      const atRisk = visible.filter(target => target.kind === 'mole' && target.expires - state.time <= tuning.reactionMs + tuning.intervalMs * (1 + (target.armor ?? 0)));
      const sweepNeeded = sweepAtRisk.length >= 2 || ((player.armorUntil > state.time || hasTinCaps(player)) && sweepTargets.filter(target => target.kind === 'mole').length >= 2)
        || sweepAtRisk.some(target => !!target.missBonus);
      const harvestReady = sweepTargets.filter(target => target.kind === 'mole').length >= 2 && !sweepTargets.some(target => target.kind === 'rabbit');
      const sweepUseful = sweepNeeded || harvestReady;
      const emergency = (player.character === 'champignon' && (
        (player.stars === 2 && sweepUseful) ||
        (player.stars === 1 && player.mistakeShield === 0 && atRisk.length > 0) ||
        (player.stars === 3 && player.pending.length > 0)
      )) || (player.character === 'captain-bramble' && (player.stars === 1 || player.stars === 3) && player.mistakeShield === 0 && opponent.score - player.score >= config.winScoreDifference * 0.65);
      // Sweep now scores normal hits: use visible harvest opportunities as well as defensive danger.
      const pointlessSweep = player.character === 'champignon' && player.stars === 2 && (!sweepUseful || player.sweepUntil > state.time);
      const canSteal = player.character === 'andromoss' && player.stars === 3 && opponent.stars >= 2;
      const hostile = player.character === 'andromoss' || (player.character === 'captain-bramble' && (player.stars === 2 || player.stars === 4)) || (player.character === 'duskmantle' && player.stars !== 3);
      const waitForWard = hostile && opponent.magicShieldUntil > state.time;
      const alreadyGuarded = defender && player.stars === 1 && hasGuard(player,state.time);
      const needsCleanse = player.character === 'sprig' && player.stars === 3 && (player.pending.length > 0 || (player.armorUntil > state.time || hasTinCaps(player)) || player.markUntil > state.time || player.camouflageUntil > state.time || player.decoysUntil > state.time || player.invasionUntil > state.time);
      const emptyTheft = player.character === 'andromoss' && (player.stars === 1 || player.stars === 3) && opponent.stars === 0;
      if (!pointlessSweep && !emptyTheft && !waitForWard && !alreadyGuarded && (player.stars >= this.desiredTier || emergency || canSteal || needsCleanse)) {
        match.action({ type: 'cast', player: this.id });
        this.desiredTier = 0;
        this.scheduleAction(state.time);
        return;
      }
    }
    // Only inspect already visible targets; no access to future spawn randomness.
    const targets = player.holes.flatMap((target, hole) => target ? [{ ...target, hole }] : [])
      .filter(target => state.time >= (this.reactionAt.get(target.id)??target.born+tuning.reactionMs) + (player.camouflageUntil > state.time ? 200 : 0) && !this.considered.has(target.id))
      .sort((a, b) => Number(b.kind === 'star') - Number(a.kind === 'star') || (b.missBonus ?? 0) - (a.missBonus ?? 0) || a.expires - b.expires);
    for (const target of targets) {
      this.considered.add(target.id);
      const hit = this.random.next() < (target.kind === 'rabbit' ? tuning.rabbitMistake : tuning.accuracy);
      if (hit) {
        match.action({ type: 'hit', player: this.id, hole: target.hole });
        // An armor strike preserves the target: a later action may hit it again.
        if (player.holes[target.hole]?.id === target.id) this.considered.delete(target.id);
        this.scheduleAction(state.time);
        return;
      }
    }
  }
}
