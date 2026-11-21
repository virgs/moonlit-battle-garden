import { beforeEach,afterEach } from 'vitest';
import { expect,it } from 'vitest';
import { Match } from '../../src/game/Match';
import { config,characters } from '../../src/game/config';
import type { CharacterId,PlayerId,Target } from '../../src/game/types';
import { Bot } from '../../src/game/Bot';
import { modifyTarget } from '../../src/game/targetModifiers';

function game(a:CharacterId,b:CharacterId='andromoss') {
  const match=new Match({characters:[a,b],mode:'local',difficulty:'medium',seed:41});
  match.advance(config.countdownMs);
  match.state.players.forEach(p=>{p.nextSpawn=Infinity;});
  return match;
}
function target(match:Match,kind:Target['kind']='mole',armor=0):Target {
  return {id:99,kind,armor,born:match.state.time-250,expires:match.state.time+20000};
}
function cast(match:Match,player:PlayerId,tier:number) {
  match.state.players[player].stars=tier;match.action({type:'cast',player});
  expect(match.state.casting?.tier).toBe(tier);match.advance(config.spells.castFreezeMs);
}

it('swaps the actual spell rules and titles for Champignon and Bramble',()=>{
  expect(characters.champignon.spells.slice(0,2).map(s=>s.name)).toEqual(['Mushroom Guard','Clean Sweep']);
  expect(characters['captain-bramble'].spells.slice(0,2).map(s=>s.name)).toEqual(['Bramble Brace','Tin Caps']);
  const guardian=game('champignon');cast(guardian,0,1);
  expect(guardian.state.players[0].mistakeShield).toBe(2);expect(guardian.state.players[0].sweepUntil).toBe(0);
  const bramble=game('captain-bramble');cast(bramble,0,2);bramble.advance(config.spells.warningMs);
  expect(bramble.state.players[1].tinCharges).toBe(3);expect(bramble.state.players[0].mistakeShield).toBe(0);
});

it('Clean Sweep hits only its fixed column for three seconds, with normal rewards and new arrivals',()=>{
  const match=game('champignon'),p=match.state.players[0];
  p.holes[0]=target(match);p.holes[3]=target(match,'rabbit');p.holes[6]=target(match,'star');
  p.holes[1]=target(match,'star');p.holes[2]=target(match);
  cast(match,0,2);
  const reward=config.points.mole+config.points.star-config.penalties.rabbit;
  expect([p.holes[0],p.holes[3],p.holes[6]]).toEqual([null,null,null]);expect(p.sweepColumns).toEqual([0]);
  expect(p.holes[1]?.kind).toBe('star');expect(p.holes[2]?.kind).toBe('mole');expect(p.sweepUntil-match.state.time).toBe(3000);
  expect(p.score).toBe(reward);expect(p.stars).toBe(1);
  match.advance(100);p.holes[0]=target(match);match.advance(100);
  expect(p.holes[0]).toBeNull();expect(p.score).toBe(reward+config.points.mole);expect(p.holes[1]?.kind).toBe('star');
  match.advance(config.rosterSpells.cleanSweepMs-200);p.holes[0]=target(match);match.advance(250);expect(p.holes[0]?.kind).toBe('mole');
});

it('sweep spends separate strikes on armor and cannot score a target twice',()=>{
  const match=game('champignon'),p=match.state.players[0];p.armorUntil=match.state.time+3000;
  p.holes[0]=target(match,'mole',1);cast(match,0,2);
  expect(p.holes[0]?.armor).toBe(0);expect(p.score).toBe(0);
  match.advance(config.tickMs-1);expect(p.holes[0]?.armor).toBe(0);expect(p.score).toBe(0);
  match.advance(1);expect(p.holes[0]).toBeNull();expect(p.score).toBe(config.points.mole);
  match.advance(1000);expect(p.score).toBe(config.points.mole);
});

it('four-star sweep keeps normal rabbit penalties and collects only its selected column',()=>{
  const match=game('champignon'),p=match.state.players[0];
  p.holes[0]=target(match,'rabbit');p.holes[3]=target(match,'star');p.holes[6]=target(match,'star');p.holes[1]=target(match,'star');
  cast(match,0,4);expect(p.mistakeShield).toBe(0);expect(p.stars).toBe(2);
  expect(p.score).toBe(2*config.points.star-config.penalties.rabbit);expect(p.holes[1]?.kind).toBe('star');
  expect(p.sweepUntil-match.state.time).toBe(6000);
});

it('a winning sweep finishes its casting freeze before awarding the round',()=>{
  const match=game('champignon'),p=match.state.players[0];p.score=config.winScoreDifference-config.points.mole;
  p.holes[0]=target(match);p.stars=2;match.action({type:'cast',player:0});
  expect(match.state.phase).toBe('playing');expect(match.state.casting?.tier).toBe(2);
  match.advance(config.spells.castFreezeMs);expect(match.state.phase).toBe('round-over');
});

it('sweep freezes with gameplay and four-star sweep adds no guards',()=>{
  const match=game('champignon'),p=match.state.players[0];cast(match,0,4);
  expect(p.mistakeShield).toBe(0);const until=p.sweepUntil,time=match.state.time;
  p.stars=0;cast(match,1,2);expect(match.state.time).toBe(time);expect(p.sweepUntil).toBe(until);
  match.state.paused=true;match.advance(5000);expect(match.state.time).toBe(time);
  match.state.paused=false;match.state.phase='round-over';match.nextRound();
  expect(match.state.players[0].sweepUntil).toBe(0);expect(match.state.players[0].sweepColumns).toEqual([]);expect(match.state.players[0].automationColumns).toEqual([]);
});

it('empty 3-star theft has no fallback shield or other benefit',()=>{
  for(const tier of [3]) {
    const match=game('andromoss','sprig'),caster=match.state.players[0];
    cast(match,0,tier);match.advance(config.spells.warningMs);
    expect(caster.stars).toBe(0);expect(caster.score).toBe(0);expect(caster.mistakeShield).toBe(0);
    expect(match.state.players[1].pending).toHaveLength(0);
  }
});

it('Double Trouble affects the enemy only, retaining its 8-second pressure window',()=>{
  const match=game('andromoss','sprig');cast(match,0,4);match.advance(config.spells.warningMs);
  expect(match.state.players[0].decoysUntil).toBe(0);
  expect(match.state.players[1].decoysUntil-match.state.time).toBe(config.spells.decoysMs);
});

it('Helping Tines applies rabbit penalties, collects stars and leaves other columns alone',()=>{
  const match=game('sprig'),p=match.state.players[0];
  p.holes[0]=target(match,'rabbit');p.holes[3]=target(match,'star');p.holes[6]=target(match);
  p.holes[1]=target(match,'star');cast(match,0,2);
  expect(p.automationColumns).toEqual([0]);
  match.advance(750);
  expect([p.holes[0],p.holes[3],p.holes[6]]).toEqual([null,null,null]);expect(p.holes[1]?.kind).toBe('star');
  expect(p.stars).toBe(1);expect(p.score).toBe(config.points.star+config.points.mole-config.penalties.rabbit);
});

it('Helping Tines spends one initial armor strike and one further strike per simulation tick',()=>{
  const match=game('sprig'),p=match.state.players[0];p.armorUntil=match.state.time+10000;
  p.holes[0]=target(match,'mole',2);cast(match,0,2);
  expect(p.holes[0]?.armor).toBe(1);expect(p.score).toBe(0);
  match.advance(50);expect(p.holes[0]?.armor).toBe(0);expect(p.score).toBe(0);
  match.advance(50);expect(p.holes[0]).toBeNull();expect(p.score).toBe(config.points.mole);
});

it('an automated rabbit hit consumes a normal guard and otherwise subtracts the normal penalty',()=>{
  const match=game('sprig'),p=match.state.players[0];
  p.holes[0]=target(match,'rabbit');p.holes[3]=target(match,'rabbit');
  p.mistakeShield=1;p.shieldUntil=match.state.time+10000;
  cast(match,0,2);
  expect(p.mistakeShield).toBe(0);expect(p.score).toBe(-config.penalties.rabbit);
  match.advance(250);expect(p.score).toBe(-config.penalties.rabbit);
});

it('Garden Clockwork works exactly two busiest columns and leaves the third untouched',()=>{
  const match=game('sprig'),p=match.state.players[0];
  p.holes[0]=target(match);p.holes[3]=target(match);p.holes[6]=target(match,'star');
  p.holes[1]=target(match,'rabbit');p.holes[4]=target(match);p.holes[2]=target(match,'star');
  cast(match,0,4);expect(p.automationColumns).toEqual([0,1]);
  match.advance(1250);expect(p.holes.filter(Boolean)).toHaveLength(1);
  expect(p.holes[2]?.kind).toBe('star');expect(p.stars).toBe(1);
});

it('the bot saves two-star Clean Sweep on sparse boards and uses it for imminent misses',()=>{
  for(let seed=0;seed<10;seed++) {
    const calm=game('champignon');calm.state.players[0].stars=2;
    calm.state.players[0].holes[0]=target(calm);
    new Bot('medium',seed,0).update(calm);
    expect(calm.state.casting).toBeNull();expect(calm.state.players[0].stars).toBe(2);
    const danger=game('champignon');danger.state.players[0].stars=2;
    for(const hole of [0,3])danger.state.players[0].holes[hole]={...target(danger),expires:danger.state.time+100};
    new Bot('medium',seed,0).update(danger);
    expect(danger.state.casting?.tier).toBe(2);expect([danger.state.players[0].holes[0],danger.state.players[0].holes[3]]).toEqual([null,null]);
  }
});

it('four-star armor affects only the next three moles and has no timer',()=>{
  const match=game('captain-bramble'),victim=match.state.players[1];victim.holes[0]=target(match);
  cast(match,0,4);match.advance(config.spells.warningMs);
  expect(victim.holes[0]?.armor).toBeUndefined();expect(victim.tinCharges).toBe(3);expect(victim.armorUntil).toBe(0);
  match.advance(10000);expect(victim.tinCharges).toBe(3);
  const arrivals=Array.from({length:4},()=>target(match));for(const t of arrivals)modifyTarget(victim,t,match.state.time,true);
  expect(arrivals.map(t=>t.armor)).toEqual([2,2,2,0]);expect(arrivals[0].persistentArmor).toBe(true);
  match.state.phase='round-over';match.nextRound();expect(match.state.players[1].tinCharges).toBe(0);
});

it('Clean Sweep selects the busiest column with stable leftmost ties, even when empty',()=>{
  const match=game('champignon'),p=match.state.players[0];
  p.holes[2]=target(match);p.holes[5]=target(match);p.holes[1]=target(match,'star');
  cast(match,0,2);expect(p.sweepColumns).toEqual([2]);expect(p.holes[1]?.kind).toBe('star');
  const empty=game('champignon');cast(empty,0,2);expect(empty.state.players[0].sweepColumns).toEqual([0]);
});

it('3-star theft steals every available star and remains capped at four',()=>{
  for(let stars=1;stars<=4;stars++) {
    const match=game('andromoss','sprig'),[caster,victim]=match.state.players;
    victim.stars=stars;cast(match,0,3);
    expect(victim.stars).toBe(stars); // hostile warning still applies
    match.advance(config.spells.warningMs);
    expect(victim.stars).toBe(0);expect(caster.stars).toBe(stars);
  }
  const match=game('andromoss','sprig'),[caster,victim]=match.state.players;
  victim.stars=4;cast(match,0,3);caster.stars=2;match.advance(config.spells.warningMs);
  expect(victim.stars).toBe(0);expect(caster.stars).toBe(4);
});

it('a ward blocks all-star theft, while spending the caster charge',()=>{
  const match=game('andromoss','sprig'),[caster,victim]=match.state.players;
  victim.stars=4;victim.magicShieldUntil=match.state.time+6000;
  cast(match,0,3);match.advance(config.spells.warningMs);
  expect(victim.stars).toBe(4);expect(victim.magicShieldUntil).toBe(0);expect(caster.stars).toBe(0);
});

// Historical queued-resolution controls; defaults are tested in hostile-immediate.test.ts.
const historicalWarning=config.spells.warningMs;
beforeEach(()=>{config.spells.warningMs=650;});
afterEach(()=>{config.spells.warningMs=historicalWarning;});
