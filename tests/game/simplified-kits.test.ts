import { expect,it } from 'vitest';
import { Match } from '../../src/game/Match';
import { config } from '../../src/game/config';
import { cleanse,hasMarks,hasGuard,modifyTarget } from '../../src/game/targetModifiers';
import { opportunityKey } from '../../src/game/IsolatedCasting';
import type { CharacterId,Target,TargetKind } from '../../src/game/types';
function game(hero:CharacterId){const m=new Match({characters:[hero,'sprig'],mode:'local',difficulty:'hard',seed:41});m.advance(config.countdownMs);m.state.players.forEach(p=>p.nextSpawn=Infinity);return m;}
function cast(m:Match,tier:number){m.state.players[0].stars=tier;m.action({type:'cast',player:0});m.advance(config.spells.castFreezeMs);}
function target(m:Match,id=1,kind:TargetKind='mole',life=20000):Target{return {id,kind,born:m.state.time,expires:m.state.time+life};}
for(const hero of ['champignon','captain-bramble'] as const)it(`${hero} has five permanent mistake blocks at3 stars, with no hostile ward`,()=>{
  const m=game(hero),p=m.state.players[0];cast(m,3);m.advance(30000);
  expect(p.shieldPermanent).toBe(true);expect(p.magicShieldUntil).toBe(0);expect(hasGuard(p,m.state.time)).toBe(true);
  // A mole miss, rabbit hit and three empty hits each consume exactly one charge.
  p.holes[0]=target(m,1,'mole',50);m.advance(50);p.holes[0]=target(m,2,'rabbit');m.action({type:'hit',player:0,hole:0});
  for(let n=0;n<3;n++)m.action({type:'hit',player:0,hole:8});
  expect(p.score).toBe(0);expect(p.mistakeShield).toBe(0);m.action({type:'hit',player:0,hole:8});expect(p.score).toBe(-config.penalties.empty);
});
for(const tier of [1,4])it(`Duskmantle ${tier} marks future moles only, never expires and cleanses/resets`,()=>{
  const m=game('duskmantle'),p=m.state.players[1],quota=tier===1?3:6,bonus=tier===1?8:6;
  p.holes[0]=target(m);cast(m,tier);expect(p.holes[0]?.missBonus).toBeUndefined();p.holes.fill(null);
  m.advance(60000);expect(p.markCharges).toBe(quota);expect(hasMarks(p,m.state.time)).toBe(true);
  for(const kind of ['star','rabbit'] as const){const t=target(m,2,kind);modifyTarget(p,t,m.state.time,true);expect(t.missBonus).toBeUndefined();}
  expect(p.markCharges).toBe(quota);
  for(let n=0;n<quota+1;n++){const t=target(m,n+3);modifyTarget(p,t,m.state.time,true);expect(t.missBonus).toBe(n<quota?bonus:undefined);if(n===0)p.holes[0]=t;}
  m.advance(15000);expect(p.holes[0]?.missBonus).toBe(bonus);expect(p.holes[0]?.persistentMark).toBe(true);
  cleanse(p,m.state.time);expect(hasMarks(p,m.state.time)).toBe(false);expect(p.markPermanent).toBe(false);expect(p.holes[0]?.persistentMark).toBeUndefined();
  cast(m,tier);m.state.phase='round-over';m.nextRound();expect(m.state.players[1].markCharges).toBe(0);expect(m.state.players[1].markPermanent).toBe(false);
});
it('Bramble4 future armor survives long waits, lower-cost recasts and cleanses',()=>{
  const m=game('captain-bramble'),p=m.state.players[1];p.holes[0]=target(m);cast(m,4);expect(p.holes[0]?.armor).toBeUndefined();
  m.advance(30000);cast(m,2);expect(p.tinHits).toBe(2);expect(p.tinCharges).toBe(3);
  const t=target(m);modifyTarget(p,t,m.state.time,true);p.holes[0]=t;expect(t.armor).toBe(2);expect(t.persistentArmor).toBe(true);
  m.advance(15000);expect(t.armor).toBe(2);cleanse(p,m.state.time);expect(t.armor).toBeUndefined();expect(p.tinCharges).toBe(0);
});
it('permanent marks retain their original bonus when a different tier replaces the pending quota',()=>{
  const m=game('duskmantle'),p=m.state.players[1];cast(m,1);const old=target(m);modifyTarget(p,old,m.state.time,true);p.holes[0]=old;
  m.advance(config.spells.cooldownMs);cast(m,4);expect(old.missBonus).toBe(8);expect(p.markCharges).toBe(6);
  const fresh=target(m,2);modifyTarget(p,fresh,m.state.time,true);expect(fresh.missBonus).toBe(6);expect(p.markCharges).toBe(5);
});
it('isolated Champignon3 looks for a guard opportunity rather than an enemy spell threat',()=>{
  const m=new Match({characters:['champignon','andromoss'],mode:'local',difficulty:'hard',seed:41,isolatedSpellTier:3});m.advance(config.countdownMs);
  m.state.players[1].stars=3;expect(opportunityKey(m,0)).toBeNull();m.state.players[0].holes[0]={...target(m,1,'mole',900),born:m.state.time-200};
  expect(opportunityKey(m,0)).toBe('resolve:1');
});
for(const hero of ['champignon','sprig'] as const)it(`${hero}4 continuously intercepts actual arrivals until its exact boundary`,()=>{
  const m=game(hero),p=m.state.players[0];cast(m,4);const columns=hero==='champignon'?p.sweepColumns:p.automationColumns,duration=hero==='champignon'?6000:4000;
  expect(columns).toHaveLength(hero==='champignon'?1:2);
  for(let n=0;n<9;n++)if(!columns.includes(n%3))p.holes[n]=target(m,n+10,'star');p.nextSpawn=m.state.time+250;
  let births=0;for(let t=0;t<1000;t+=50){m.advance(50);for(let n=0;n<9;n++)if(columns.includes(n%3))expect(p.holes[n]).toBeNull();births=p.spawned;}
  expect(births).toBeGreaterThan(0);m.advance(duration-1050);const t=target(m,100);p.holes[columns[0]]=t;m.advance(50);expect(p.holes[columns[0]]?.id).toBe(100);
});
