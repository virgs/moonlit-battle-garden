import { expect,it } from 'vitest';
import { Match } from '../../src/game/Match';
import { Bot } from '../../src/game/Bot';
import { config } from '../../src/game/config';
import { simulateBattle } from '../../src/game/simulate';
import { characterIds,type SpellTier,type Difficulty } from '../../src/game/types';

function game(tier?:SpellTier) {
  const match=new Match({characters:['andromoss','sprig'],difficulty:'medium',mode:'local',seed:41,isolatedSpellTier:tier,isolatedCastingPolicy:tier?'immediate':undefined});
  match.advance(config.countdownMs);match.state.players.forEach(p=>p.nextSpawn=Infinity);
  return match;
}
function star(match:Match) {
  match.state.players[0].holes[0]={id:99,kind:'star',born:match.state.time-1000,expires:match.state.time+5000};
  match.action({type:'hit',player:0,hole:0});
}

it('caps actual star hits at the selected tier, retaining ordinary points',()=>{
  for(const tier of [1,2,3,4] as SpellTier[]) {
    const match=game(tier);match.state.players[1].score=50;
    for(let i=0;i<5;i++)star(match);
    expect(match.starCapacity).toBe(tier);expect(match.state.players[0].stars).toBe(tier);
    expect(match.state.players[0].score).toBe(5*config.points.star);
    expect(match.statistics[0].starsCollected).toBe(tier);
  }
  const normal=game();expect(normal.starCapacity).toBe(4);
});

it('disables every lower-tier cast, but permits the selected tier',()=>{
  for(const tier of [1,2,3,4] as SpellTier[]) {
    const match=game(tier),p=match.state.players[0];
    for(let partial=0;partial<tier;partial++) {
      p.stars=partial;match.action({type:'cast',player:0});
      expect(match.state.casting).toBeNull();expect(p.stars).toBe(partial);
    }
    p.stars=tier;match.action({type:'cast',player:0});
    expect(match.state.casting?.tier).toBe(tier);expect(p.stars).toBe(0);
    match.advance(config.spells.castFreezeMs);
    match.state.phase='round-over';match.nextRound();expect(match.starCapacity).toBe(tier);expect(match.state.players[0].stars).toBe(0);
  }
});

it('casts immediately for every hero and difficulty, even when the spell is wasteful',()=>{
  for(const difficulty of ['easy','medium','hard'] as Difficulty[])for(const character of characterIds)for(const tier of [1,2,3,4] as SpellTier[]) {
    const match=new Match({characters:[character,'sprig'],difficulty,mode:'local',seed:4,isolatedSpellTier:tier,isolatedCastingPolicy:'immediate'});
    match.advance(config.countdownMs);match.state.players[0].stars=tier;
    new Bot(difficulty,8,0).update(match);
    expect(match.state.casting?.tier).toBe(tier);expect(match.state.players[0].stars).toBe(0);
  }
});

it('uses cooldown/paused/casting gates but no hit-action delay for isolated casting',()=>{
  const match=game(1),p=match.state.players[0],bot=new Bot('medium',1,0);
  p.holes[0]={id:1,kind:'star',born:match.state.time-10000,expires:match.state.time+10000};
  bot.update(match);expect(p.stars).toBe(1);
  // The successful hit just scheduled a future hit action; casting need not wait.
  bot.update(match);expect(match.state.casting?.tier).toBe(1);
  match.advance(config.spells.castFreezeMs);p.stars=1;bot.update(match);expect(match.state.casting).toBeNull();
  match.advance(config.spells.cooldownMs);match.state.paused=true;bot.update(match);expect(match.state.casting).toBeNull();
  match.state.paused=false;bot.update(match);expect(match.state.casting?.tier).toBe(1);
});

it('enforces the one-slot cap on theft and records empty theft without a fallback',()=>{
  const match=game(1),[caster,victim]=match.state.players;
  caster.stars=1;victim.stars=1;new Bot('medium',8,0).update(match);match.advance(config.spells.castFreezeMs);
  star(match);match.advance(config.spells.warningMs);
  expect(caster.stars).toBe(1);expect(victim.stars).toBe(0);
  expect(match.statistics[0].starsStolen).toBe(1);expect(match.statistics[0].stolenStarsReceived).toBe(0);
  match.advance(config.spells.cooldownMs);new Bot('medium',8,0).update(match);
  match.advance(config.spells.castFreezeMs+config.spells.warningMs);
  expect(caster.stars).toBe(0);expect(match.statistics[0].emptyThefts).toBe(1);
});

it('observes exact rewards, penalties and guard savings without modifying outcomes',()=>{
  const match=game(1),p=match.state.players[0];star(match);
  p.holes[0]={id:2,kind:'rabbit',born:match.state.time-1000,expires:match.state.time+5000};
  match.action({type:'hit',player:0,hole:0});
  p.mistakeShield=1;p.shieldUntil=match.state.time+3000;
  match.action({type:'hit',player:0,hole:0});
  expect(match.statistics[0].pointsEarned).toBe(config.points.star);
  expect(match.statistics[0].pointsLost).toBe(config.penalties.rabbit);
  expect(match.statistics[0].guardPointsPrevented).toBe(config.penalties.empty);
  expect(p.score).toBe(config.points.star-config.penalties.rabbit);
});

it('runs deterministic actual-simulation matches with only the selected spell',()=>{
  const a=simulateBattle(['champignon','andromoss'],'medium',1234,1);
  expect(simulateBattle(['champignon','andromoss'],'medium',1234,1)).toEqual(a);
  expect(a.timedOut).toBe(false);
  for(const casts of a.casts)expect(casts.slice(1)).toEqual([0,0,0]);
});
