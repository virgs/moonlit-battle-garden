import { afterEach,expect,it } from 'vitest';
import { Match } from '../../src/game/Match';
import { config } from '../../src/game/config';
import type { Target } from '../../src/game/types';
const oldMode=config.rosterSpells.helpingTinesMode,oldDuration=config.rosterSpells.columnAutomationMs;
afterEach(()=>{config.rosterSpells.helpingTinesMode=oldMode;config.rosterSpells.columnAutomationMs=oldDuration;});
function game(){const m=new Match({characters:['sprig','andromoss'],mode:'local',difficulty:'medium',seed:41});m.advance(config.countdownMs);m.state.players.forEach(p=>p.nextSpawn=Infinity);return m;}
function target(m:Match,id=1,kind:Target['kind']='mole'):Target{return {id,kind,born:m.state.time,expires:m.state.time+20000};}
function cast(m:Match){m.state.players[0].stars=2;m.action({type:'cast',player:0});m.advance(config.spells.castFreezeMs);}
it('hits the entire busiest column immediately with normal rewards/penalties, while leaving other columns',()=>{
  const m=game(),p=m.state.players[0];p.holes[0]=target(m);p.holes[3]=target(m,2,'star');p.holes[6]=target(m,3,'rabbit');p.holes[1]=target(m,4);
  cast(m);expect(p.automationColumns).toEqual([0]);expect(p.holes.filter((_,n)=>n%3===0)).toEqual([null,null,null]);
  expect(p.holes[1]?.id).toBe(4);expect(p.score).toBe(config.points.mole+config.points.star-config.penalties.rabbit);
  expect(p.stars).toBe(1);expect(p.automationUntil-m.state.time).toBe(10000);
});
it('intercepts real arrivals on their birth tick and never applies a minimum visibility delay',()=>{
  const m=game(),p=m.state.players[0];cast(m);
  for(const hole of [1,2,4,5,7,8])p.holes[hole]=target(m,hole+10,'star');p.nextSpawn=m.state.time+250;
  let spawns=0;
  for(let n=0;n<20;n++){
    m.advance(50);
    if(p.spawned>spawns){expect([p.holes[0],p.holes[3],p.holes[6]]).toEqual([null,null,null]);spawns=p.spawned;}
  }
  expect(spawns).toBeGreaterThan(0);expect(m.statistics[0].automationMoleHits+m.statistics[0].automationRabbitHits).toBe(spawns);
});
it('continues through the tenth second, excludes the exact end boundary, freezes and resets per round',()=>{
  const m=game(),p=m.state.players[0];cast(m);const time=m.state.time,until=p.automationUntil;
  m.state.paused=true;m.advance(30000);expect(p.automationUntil).toBe(until);expect(m.state.time).toBe(time);m.state.paused=false;
  m.advance(9900);p.holes[0]=target(m);m.advance(50);expect(p.holes[0]).toBeNull();
  p.holes[0]=target(m,2);m.advance(50);expect(p.holes[0]?.id).toBe(2);
  m.state.phase='round-over';m.nextRound();expect(m.state.players[0].automationUntil).toBe(0);expect(m.state.players[0].automationColumns).toEqual([]);
});
it('keeps the historical pulse behavior available only for reproduction',()=>{
  config.rosterSpells.helpingTinesMode='pulse';config.rosterSpells.columnAutomationMs=6500;
  const m=game(),p=m.state.players[0];p.holes[0]={...target(m),born:m.state.time-250};p.holes[3]={...target(m,2),born:m.state.time-250};cast(m);
  expect(p.holes[0]?.id).toBe(1);m.advance(200);expect(p.holes[0]?.id).toBe(1);m.advance(50);
  expect(p.holes[0]).toBeNull();expect(p.holes[3]?.id).toBe(2);expect(p.automationUntil-m.state.time).toBe(6250);
});
