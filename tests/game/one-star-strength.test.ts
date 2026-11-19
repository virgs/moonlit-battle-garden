import { expect,it } from 'vitest';
import { Match } from '../../src/game/Match';
import { config } from '../../src/game/config';
import type { CharacterId,Target } from '../../src/game/types';

function game(character:CharacterId='champignon',tier=1) {
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

it('Clean Sweep stops at the three-second boundary and Royal Cleanup keeps quarter-second timing',()=>{
  const sweep=game(),p=sweep.state.players[0];
  sweep.advance(config.rosterSpells.cleanSweepMs-50);p.holes[0]=target(sweep);sweep.advance(50);
  expect(p.holes[0]?.kind).toBe('mole');
  const royal=game('champignon',4),hero=royal.state.players[0];hero.holes[0]=target(royal);
  royal.advance(200);expect(hero.holes[0]?.kind).toBe('mole');
  royal.advance(50);expect(hero.holes[0]).toBeNull();expect(hero.mistakeShield).toBe(3);
});

it('a longer Ominous Bud window leaves the tier-four duration and one-mark quota unchanged',()=>{
  const prior=config.rosterSpells.ominousMarkMs;config.rosterSpells.ominousMarkMs=12000;
  try {
    for(const tier of [1,4]) {
      const match=game('duskmantle',tier),victim=match.state.players[1];
      victim.holes[0]={...target(match),expires:match.state.time+30000};
      match.advance(config.spells.warningMs);
      expect(victim.markUntil-match.state.time).toBe(tier===1?12000:config.rosterSpells.markMs);
      expect(victim.markCharges).toBe(tier===1?0:3);
      if(tier===1) {
        match.advance(11950);expect(victim.holes[0]?.missBonus).toBe(4);
        match.advance(50);expect(victim.holes[0]?.missBonus).toBeUndefined();
      }
    }
  } finally {config.rosterSpells.ominousMarkMs=prior;}
});

it('a larger Gentle Tending extension remains instant, all-target and non-stacking',()=>{
  const prior=config.rosterSpells.extensionMs;config.rosterSpells.extensionMs=1200;
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
  } finally {config.rosterSpells.extensionMs=prior;}
});
