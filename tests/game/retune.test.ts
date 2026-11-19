import { expect,it } from 'vitest';
import { Match } from '../../src/game/Match';
import { config,characters } from '../../src/game/config';
import type { CharacterId,PlayerId,Target } from '../../src/game/types';
import { Bot } from '../../src/game/Bot';

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
  expect(characters.champignon.spells.slice(0,2).map(s=>s.name)).toEqual(['Clean Sweep','Mushroom Guard']);
  expect(characters['captain-bramble'].spells.slice(0,2).map(s=>s.name)).toEqual(['Tin Caps','Bramble Brace']);
  const guardian=game('champignon');cast(guardian,0,2);
  expect(guardian.state.players[0].mistakeShield).toBe(1);expect(guardian.state.players[0].sweepUntil).toBe(0);
  const bramble=game('captain-bramble');cast(bramble,0,1);bramble.advance(config.spells.warningMs);
  expect(bramble.state.players[1].armorHits).toBe(1);expect(bramble.state.players[0].mistakeShield).toBe(0);
});

it('Clean Sweep lasts three active seconds and preserves stars and zero clearing score',()=>{
  const match=game('champignon'),p=match.state.players[0];
  p.holes[0]=target(match);p.holes[1]=target(match,'rabbit');p.holes[2]=target(match,'star');
  cast(match,0,1);
  expect(p.holes.slice(0,2)).toEqual([null,null]);expect(p.sweepUntil-match.state.time).toBe(3000);
  match.advance(2500);p.holes[0]=target(match);p.holes[1]=target(match,'rabbit');match.advance(50);
  expect(p.holes.slice(0,2)).toEqual([null,null]);expect(p.holes[2]?.kind).toBe('star');expect(p.score).toBe(0);
  match.advance(500);p.holes[0]=target(match);match.advance(50);expect(p.holes[0]?.kind).toBe('mole');
});

it('sweep freezes with gameplay and Royal Cleanup keeps three guards plus the sweep',()=>{
  const match=game('champignon'),p=match.state.players[0];cast(match,0,4);
  expect(p.mistakeShield).toBe(3);const until=p.sweepUntil,time=match.state.time;
  p.stars=0;cast(match,1,2);expect(match.state.time).toBe(time);expect(p.sweepUntil).toBe(until);
  match.state.paused=true;match.advance(5000);expect(match.state.time).toBe(time);
  match.state.paused=false;match.state.phase='round-over';match.nextRound();
  expect(match.state.players[0].sweepUntil).toBe(0);expect(match.state.players[0].automationColumns).toEqual([]);
});

it('empty Borrowed Spark and Sticky Fingers have no fallback shield or other benefit',()=>{
  for(const tier of [1,3]) {
    const match=game('andromoss','sprig'),caster=match.state.players[0];
    cast(match,0,tier);match.advance(config.spells.warningMs);
    expect(caster.stars).toBe(0);expect(caster.score).toBe(0);expect(caster.mistakeShield).toBe(0);
    expect(match.state.players[1].pending).toHaveLength(0);
  }
});

it('Double Trouble affects the enemy only, retaining its 8.5-second pressure window',()=>{
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
  expect(p.stars).toBe(1);expect(p.score).toBe(config.points.star+config.rosterSpells.automationPoints-config.penalties.rabbit);
});

it('automation spends separate quarter-second strikes on triple-hit armor',()=>{
  const match=game('sprig'),p=match.state.players[0];p.armorUntil=match.state.time+10000;
  p.holes[0]=target(match,'mole',2);cast(match,0,2);
  match.advance(200);expect(p.holes[0]?.armor).toBe(2);
  match.advance(50);expect(p.holes[0]?.armor).toBe(1);expect(p.score).toBe(0);
  match.advance(250);expect(p.holes[0]?.armor).toBe(0);expect(p.score).toBe(0);
  match.advance(250);expect(p.holes[0]).toBeNull();expect(p.score).toBe(config.rosterSpells.automationPoints);
});

it('an automated rabbit hit consumes a normal guard and otherwise subtracts the normal penalty',()=>{
  const match=game('sprig'),p=match.state.players[0];
  p.holes[0]=target(match,'rabbit');p.holes[3]=target(match,'rabbit');
  p.mistakeShield=1;p.shieldUntil=match.state.time+10000;
  cast(match,0,2);match.advance(250);
  expect(p.mistakeShield).toBe(0);expect(p.score).toBe(0);
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

it('the bot saves one-star Clean Sweep for real danger rather than erasing safe scoring targets',()=>{
  for(let seed=0;seed<10;seed++) {
    const calm=game('champignon');calm.state.players[0].stars=1;
    calm.state.players[0].holes[0]=target(calm);
    new Bot('medium',seed,0).update(calm);
    expect(calm.state.casting).toBeNull();expect(calm.state.players[0].stars).toBe(1);
    const danger=game('champignon');danger.state.players[0].stars=1;
    for(let hole=0;hole<2;hole++)danger.state.players[0].holes[hole]={...target(danger),expires:danger.state.time+100};
    new Bot('medium',seed,0).update(danger);
    expect(danger.state.casting?.tier).toBe(1);expect(danger.state.players[0].holes.slice(0,2)).toEqual([null,null]);
  }
});
