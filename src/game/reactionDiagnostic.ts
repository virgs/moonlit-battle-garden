import { Bot } from './Bot';
import { Match } from './Match';
import { config } from './config';
import { pacingAt } from './pacing';
import type { CharacterId, Difficulty, PlayerId, Target, TargetKind } from './types';

export type ReactionCount = { offered: number; hit: number; expired: number; hitAgeMs: number; minLifetimeMs: number | null; maxLifetimeMs: number | null };
export type ReactionCohort = { stage: 'ramp' | 'steady'; phase: 'build' | 'peak' | 'recovery'; kinds: Record<TargetKind,ReactionCount> };
export type ReactionResult = { character: CharacterId; difficulty: Difficulty; seed: number; activeMs: number; elapsedMs: number; cohorts: ReactionCohort[]; casts: number };
export const reactionCount = ():ReactionCount => ({offered:0,hit:0,expired:0,hitAgeMs:0,minLifetimeMs:null,maxLifetimeMs:null});

/** Fixed-length, spell-free round using the actual Match, SpawnDirector and Bot. */
export function reactionDiagnostic(character: CharacterId, difficulty: Difficulty, seed: number, activeMs = 120000): ReactionResult {
  if (!Number.isInteger(activeMs) || activeMs < config.tickMs || activeMs % config.tickMs) throw Error('Reaction duration must be a positive tick multiple');
  const match = new Match({characters:[character,character],mode:'local',difficulty,seed,diagnosticMode:'reaction'});
  const bots = [new Bot(difficulty,seed^0x123456,0),new Bot(difficulty,seed^0x654321,1)];
  match.advance(config.countdownMs);
  const start=match.state.roundStart,cutoff=start+activeMs;
  const cohorts:ReactionCohort[]=[];
  const pending=new Map<number,{target:Target;side:PlayerId;cohort:ReactionCohort}>();
  let casts=0,lastEvent=0;
  while (match.state.time < cutoff || pending.size) {
    // Stop offers at the horizon, then resolve existing targets normally: no censored misses.
    if (match.state.time+config.tickMs >= cutoff) match.state.players.forEach(p=>p.nextSpawn=Infinity);
    match.advance(config.tickMs);
    for (const side of [0,1] as const) for (const target of match.state.players[side].holes) if (target && !pending.has(target.id)) {
      if (target.born >= cutoff) throw Error('Unexpected target outside measurement horizon');
      const elapsed=target.born-start,phase=pacingAt(elapsed).phase,stage=elapsed<config.pacing.rampMs?'ramp':'steady';
      let cohort=cohorts.find(row=>row.phase===phase&&row.stage===stage);
      if (!cohort) {cohort={stage,phase,kinds:{mole:reactionCount(),star:reactionCount(),rabbit:reactionCount()}};cohorts.push(cohort);}
      const count=cohort.kinds[target.kind],lifetime=target.expires-target.born;
      count.offered++;count.minLifetimeMs=count.minLifetimeMs===null?lifetime:Math.min(count.minLifetimeMs,lifetime);
      count.maxLifetimeMs=count.maxLifetimeMs===null?lifetime:Math.max(count.maxLifetimeMs,lifetime);
      pending.set(target.id,{target:{...target},side,cohort});
    }
    const order=Math.floor(match.state.time/config.tickMs)%2?[0,1] as const:[1,0] as const;
    for (const side of order) bots[side].update(match);
    for (const [id,record] of pending) {
      if (match.state.players[record.side].holes.some(target=>target?.id===id)) continue;
      const count=record.cohort.kinds[record.target.kind];
      if (record.target.expires<=match.state.time) count.expired++;
      else {count.hit++;count.hitAgeMs+=match.state.time-record.target.born;}
      pending.delete(id);
    }
    for (const event of match.events) if (event.id>lastEvent && event.kind==='cast') casts++;
    lastEvent=match.events.at(-1)?.id??lastEvent;
    if (match.state.phase!=='playing'||match.state.time>cutoff+config.pacing.startLifetimeMs*2) throw Error('Reaction diagnostic did not drain normally');
  }
  for (const row of cohorts) for (const count of Object.values(row.kinds)) if (count.offered!==count.hit+count.expired) throw Error('Unresolved reaction cohort');
  if (casts || match.state.casting || match.state.players.some(p=>p.pending.length)) throw Error('Spell leaked into reaction diagnostic');
  return {character,difficulty,seed,activeMs,elapsedMs:match.state.time-start,cohorts,casts};
}
