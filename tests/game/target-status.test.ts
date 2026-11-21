import { expect,it } from 'vitest';
import { Match } from '../../src/game/Match';
import { config } from '../../src/game/config';
import { targetStatuses } from '../../src/presentation/targetStatus';
import { modifyTarget,cleanse } from '../../src/game/targetModifiers';
import type { CharacterId,Target } from '../../src/game/types';
function game(hero:CharacterId){const m=new Match({characters:[hero,'duskmantle'],mode:'local',difficulty:'hard',seed:41});m.advance(config.countdownMs);m.state.players.forEach(p=>p.nextSpawn=Infinity);return m;}
function cast(m:Match,tier:number){m.state.players[0].stars=tier;m.action({type:'cast',player:0});m.advance(config.spells.castFreezeMs);}
function mole(m:Match):Target{return {id:99,kind:'mole',born:m.state.time,expires:m.state.time+20000};}
it('shows total remaining hits, updates after each armor strike and leaves unarmored targets alone',()=>{
  const m=game('captain-bramble'),p=m.state.players[1],t=mole(m);p.holes[0]=t;cast(m,4);expect(targetStatuses(p,t,m.state.time)).toEqual([]);
  modifyTarget(p,t,m.state.time,true);expect(targetStatuses(p,t,m.state.time)[0]).toMatchObject({kind:'armor',value:3});
  m.action({type:'hit',player:1,hole:0});expect(targetStatuses(p,t,m.state.time)[0].value).toBe(2);
  m.action({type:'hit',player:1,hole:0});expect(targetStatuses(p,t,m.state.time)).toEqual([]);m.action({type:'hit',player:1,hole:0});expect(p.holes[0]).toBeNull();
});
it('shows bonus points only for manual mole rewards, expiring at the actual buff boundary',()=>{
  const m=game('duskmantle'),p=m.state.players[0],t=mole(m);p.holes[0]=t;cast(m,3);
  expect(targetStatuses(p,t,m.state.time)[0]).toMatchObject({kind:'bonus',value:2});
  expect(targetStatuses(p,{...t,kind:'star'},m.state.time)).toEqual([]);expect(targetStatuses(p,{...t,kind:'rabbit'},m.state.time)).toEqual([]);
  m.action({type:'hit',player:0,hole:0});expect(p.score).toBe(config.points.mole+2);m.advance(7000);expect(targetStatuses(p,t,m.state.time)).toEqual([]);
});
it('uses the assigned miss penalty of each future marked mole, with no fake marks from pending quotas',()=>{
  for(const tier of [1,4]){
    const m=game('duskmantle'),p=m.state.players[1],t=mole(m);cast(m,tier);expect(targetStatuses(p,t,m.state.time)).toEqual([]);modifyTarget(p,t,m.state.time,true);
    expect(targetStatuses(p,t,m.state.time)[0]).toMatchObject({kind:'curse',value:tier===1?8:6});p.holes[0]=t;cleanse(p,m.state.time);expect(targetStatuses(p,t,m.state.time)).toEqual([]);
  }
});
it('keeps earned lifetime cues beyond aura expiry, combines them and removes only cleansed shortening',()=>{
  const m=game('andromoss'),p=m.state.players[1],t=mole(m);cast(m,2);p.tendingUntil=m.state.time+6000;modifyTarget(p,t,m.state.time,true);p.holes[0]=t;
  expect(targetStatuses(p,t,m.state.time).map(s=>s.kind)).toEqual(['rush','tending']);m.advance(8000);expect(targetStatuses(p,t,m.state.time).map(s=>s.kind)).toEqual(['rush','tending']);
  cleanse(p,m.state.time);expect(targetStatuses(p,t,m.state.time).map(s=>s.kind)).toEqual(['tending']);expect(targetStatuses(p,t,t.expires)).toEqual([]);
  for(const kind of ['rabbit','star'] as const)expect(targetStatuses(p,{...t,kind},m.state.time).map(s=>s.kind)).toEqual(['tending']);
});
