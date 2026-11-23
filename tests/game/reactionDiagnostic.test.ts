import { expect,it } from 'vitest';
import { Match } from '../../src/game/Match';
import { Bot } from '../../src/game/Bot';
import { config } from '../../src/game/config';
import { reactionDiagnostic } from '../../src/game/reactionDiagnostic';

it('blocks casts and score victory only in the explicit offline reaction diagnostic',()=>{
  const match=new Match({characters:['champignon','andromoss'],mode:'local',difficulty:'hard',seed:41,diagnosticMode:'reaction'});
  match.advance(config.countdownMs);match.state.players.forEach(p=>p.nextSpawn=Infinity);
  const player=match.state.players[0];player.stars=4;player.score=config.winScoreDifference+100;
  match.action({type:'cast',player:0});new Bot('hard',7,0).update(match);match.advance(5000);
  expect(player.stars).toBe(4);expect(match.state.casting).toBeNull();expect(match.state.phase).toBe('playing');
  expect(match.state.round).toBe(1);expect(match.events.some(e=>e.kind==='cast')).toBe(false);
  expect(()=>new Match({characters:['champignon','andromoss'],mode:'online',difficulty:'hard',seed:1,diagnosticMode:'reaction'})).toThrow();
  expect(()=>new Match({characters:['champignon','andromoss'],mode:'local',difficulty:'hard',seed:1,diagnosticMode:'reaction',isolatedSpellTier:1})).toThrow();
});

it('resolves the entire birth cohort after a fixed horizon without including later offers',()=>{
  const result=reactionDiagnostic('champignon','medium',41,12000);
  expect(result.casts).toBe(0);expect(result.elapsedMs).toBeGreaterThanOrEqual(12000);
  expect(result.cohorts.every(row=>row.stage==='ramp'&&row.phase==='build')).toBe(true);
  for(const row of result.cohorts)for(const count of Object.values(row.kinds)) {
    expect(count.offered).toBe(count.hit+count.expired);
    expect(count.hitAgeMs).toBeGreaterThanOrEqual(0);
  }
  expect(result.cohorts.flatMap(row=>Object.values(row.kinds)).reduce((n,c)=>n+c.offered,0)).toBeGreaterThan(10);
});

it('covers both ramp and late phases deterministically with no character-specific hit policy',()=>{
  const first=reactionDiagnostic('champignon','hard',1234);
  expect(reactionDiagnostic('champignon','hard',1234)).toEqual(first);
  expect(reactionDiagnostic('sprig','hard',1234).cohorts).toEqual(first.cohorts);
  expect(first.cohorts).toHaveLength(6);expect(first.casts).toBe(0);
  const peak=first.cohorts.find(c=>c.stage==='steady'&&c.phase==='peak')!;
  expect(peak.kinds.mole.offered).toBeGreaterThan(0);expect(peak.kinds.star.offered).toBeGreaterThan(0);
  expect(peak.kinds.mole.minLifetimeMs).toBeGreaterThanOrEqual(config.pacing.minLifetimeMs);
  expect(peak.kinds.mole.maxLifetimeMs).toBeLessThanOrEqual(config.pacing.endLifetimeMs*config.pacing.lifetimePeak);
});
