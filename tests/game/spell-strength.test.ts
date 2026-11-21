import { beforeEach,afterEach } from 'vitest';
import { expect,it } from 'vitest';
import { Match } from '../../src/game/Match';
import { config } from '../../src/game/config';
import type { CharacterId,Target } from '../../src/game/types';

function game(character:CharacterId='champignon',tier=character==='champignon'?2:1) {
  const match=new Match({characters:[character,'sprig'],difficulty:'medium',mode:'local',seed:41});
  match.advance(config.countdownMs);match.state.players.forEach(p=>p.nextSpawn=Infinity);
  match.state.players[0].stars=tier;match.action({type:'cast',player:0});match.advance(config.spells.castFreezeMs);
  return match;
}
function target(match:Match,id=99,kind:Target['kind']='mole'):Target {
  return {id,kind,born:match.state.time-250,expires:match.state.time+10000};
}

it('Clean Sweep hits real natural spawns in its fixed column on the same tick they appear',()=>{
  const match=game(),p=match.state.players[0];expect(p.sweepColumns).toEqual([0]);
  // Only the swept column has free holes; stars elsewhere do not consume natural concurrency.
  for(const hole of [1,2,4,5,7,8])p.holes[hole]=target(match,hole,'star');
  p.nextSpawn=match.state.time+config.pacing.firstSpawnMs;
  let spawns=0;
  for(let n=0;n<1000/config.tickMs;n++) {
    match.advance(config.tickMs);
    if(p.spawned>spawns) {
      expect([p.holes[0],p.holes[3],p.holes[6]]).toEqual([null,null,null]);
      expect(match.events.some(e=>e.player===0&&e.time===match.state.time&&(e.kind==='hit'||e.kind==='penalty'))).toBe(true);
      spawns=p.spawned;
    }
  }
  expect(spawns).toBeGreaterThan(0);expect(p.holes[1]?.kind).toBe('star');
});

it('Clean Sweep strikes armor only once per tick and awards normal points only on the final hit',()=>{
  const match=game(),p=match.state.players[0];p.armorUntil=match.state.time+10000;
  p.holes[0]={...target(match),armor:2};
  match.advance(50);expect(p.holes[0]?.armor).toBe(1);expect(p.score).toBe(0);
  match.advance(50);expect(p.holes[0]?.armor).toBe(0);expect(p.score).toBe(0);
  match.advance(50);expect(p.holes[0]).toBeNull();expect(p.score).toBe(config.points.mole);
  match.advance(500);expect(p.score).toBe(config.points.mole);
});

it('both sweeps stop at their exact boundaries and four-star hits every simulation tick',()=>{
  for(const tier of [2,4]){
    const m=game('champignon',tier),p=m.state.players[0];
    const duration=tier===2?3000:6000;expect(p.sweepUntil-m.state.time).toBe(duration);
    p.holes[0]=target(m);m.advance(50);expect(p.holes[0]).toBeNull();expect(p.mistakeShield).toBe(0);
    m.advance(duration-100);p.holes[0]=target(m,100);m.advance(50);expect(p.holes[0]?.id).toBe(100);
  }
});

it('both mark quotas survive long waits and affect future moles only',()=>{
  for(const tier of [1,4]){
    const m=game('duskmantle',tier),p=m.state.players[1];m.advance(config.spells.warningMs);
    expect(p.markPermanent).toBe(true);expect(p.markUntil).toBe(0);expect(p.markCharges).toBe(tier===1?3:6);
    m.advance(30000);expect(p.markCharges).toBe(tier===1?3:6);
  }
});

it('historical instant Tending control remains reproducible and non-stacking',()=>{
  const prior=config.rosterSpells.extensionMs,priorWindow=config.rosterSpells.tendingMs;config.rosterSpells.extensionMs=1200;config.rosterSpells.tendingMs=0;
  try {
    const match=game('sprig'),p=match.state.players[0];
    for(const [hole,kind] of ['mole','rabbit','star'].entries())p.holes[hole]=target(match,hole+1,kind as Target['kind']);
    const expiry=p.holes[0]!.expires;
    // The initial empty-board cast is on cooldown; apply the next one after it expires.
    match.advance(config.spells.cooldownMs);p.stars=1;match.action({type:'cast',player:0});match.advance(config.spells.castFreezeMs);
    for(const t of p.holes.slice(0,3))expect(t?.expires).toBe(expiry+1200);
    const fresh=target(match,9);p.holes[4]=fresh;const freshExpiry=fresh.expires;
    match.advance(50);expect(fresh.expires).toBe(freshExpiry); // no lasting extension aura
    match.advance(config.spells.cooldownMs);p.stars=1;match.action({type:'cast',player:0});match.advance(config.spells.castFreezeMs);
    for(const t of p.holes.slice(0,3))expect(t?.expires).toBe(expiry+1200);
    expect(fresh.expires).toBe(freshExpiry+1200);
  } finally {config.rosterSpells.extensionMs=prior;config.rosterSpells.tendingMs=priorWindow;}
});

// Historical queued-resolution controls; defaults are tested in hostile-immediate.test.ts.
const historicalWarning=config.spells.warningMs;
beforeEach(()=>{config.spells.warningMs=650;});
afterEach(()=>{config.spells.warningMs=historicalWarning;});
