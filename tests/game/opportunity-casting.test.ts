import { afterEach,beforeEach,expect,it } from 'vitest';
import { Match } from '../../src/game/Match';
import { Bot } from '../../src/game/Bot';
import { config } from '../../src/game/config';
import { isolatedCasting,opportunityKey,useCastingProfile,defaultCastingProfile } from '../../src/game/IsolatedCasting';
import type { CharacterId,Difficulty,Target } from '../../src/game/types';

// Retain historical-policy coverage explicitly; the adopted default is tested separately.
const historicalWarning=config.spells.warningMs;
beforeEach(()=>{useCastingProfile('baseline');config.spells.warningMs=650;});
afterEach(()=>{useCastingProfile(defaultCastingProfile);config.spells.warningMs=historicalWarning;});

function game(character:CharacterId='andromoss',difficulty:Difficulty='medium') {
  const match=new Match({characters:[character,'sprig'],difficulty,mode:'local',seed:41,isolatedSpellTier:character==='andromoss'?3:character==='champignon'||character==='captain-bramble'?2:1});
  match.advance(config.countdownMs);match.state.players.forEach(p=>p.nextSpawn=Infinity);
  match.state.players[0].stars=match.options.isolatedSpellTier!;
  return match;
}
function mole(match:Match,id=1,remaining=10000):Target {
  return {id,kind:'mole',born:match.state.time-250,expires:match.state.time+remaining};
}

it('applies visible spell-specific opportunity conditions, not character probabilities',()=>{
  const sweep=game('champignon'),p=sweep.state.players[0];
  expect(opportunityKey(sweep,0)).toBeNull();p.holes[0]=mole(sweep);
  expect(opportunityKey(sweep,0)).toBe('sweep:0:1');
  p.holes[3]={...mole(sweep,2),kind:'rabbit'};expect(opportunityKey(sweep,0)).toBeNull();
  p.holes[0]!.expires=sweep.state.time+900;expect(opportunityKey(sweep,0)).toBe('sweep:0:1');
  p.sweepUntil=sweep.state.time+3000;expect(opportunityKey(sweep,0)).toBeNull();

  const theft=game();expect(opportunityKey(theft,0)).toBeNull();
  theft.state.players[1].stars=2;expect(opportunityKey(theft,0)).toBe('steal-charge');

  const armor=game('captain-bramble'),victim=armor.state.players[1];
  victim.holes[0]=mole(armor);expect(opportunityKey(armor,0)).toBe('armor:1');
  victim.holes[0]!.armor=1;expect(opportunityKey(armor,0)).toBeNull();

  const mark=game('duskmantle'),enemy=mark.state.players[1];
  enemy.holes[0]=mole(mark);expect(opportunityKey(mark,0)).toBe('mark:1');
  enemy.holes[0]!.missBonus=4;expect(opportunityKey(mark,0)).toBeNull();

  const extend=game('sprig'),own=extend.state.players[0];
  own.holes[0]=mole(extend);expect(opportunityKey(extend,0)).toBeNull();
  own.holes[0]!.expires=extend.state.time+900;expect(opportunityKey(extend,0)).toBe('extend:1');
  own.holes[0]!.extended=true;expect(opportunityKey(extend,0)).toBeNull();
});

it('does not use invisible, expired or wrong-kind targets as opportunities',()=>{
  for(const hero of ['champignon','captain-bramble','duskmantle','sprig'] as CharacterId[]) {
    const match=game(hero),owner=match.state.players[hero==='captain-bramble'||hero==='duskmantle'?1:0];
    owner.holes[0]={...mole(match,1,900),born:match.state.time};expect(opportunityKey(match,0)).toBeNull();
    owner.holes[0]={...mole(match),expires:match.state.time};expect(opportunityKey(match,0)).toBeNull();
    owner.holes[0]={...mole(match,1,900),kind:'rabbit'};expect(opportunityKey(match,0)).toBeNull();
  }
});

it('uses the same seeded delay on every AI level and never casts on empty charge',()=>{
  const times:number[]=[];
  for(const difficulty of ['easy','medium','hard'] as Difficulty[]) {
    const match=game('andromoss',difficulty),bot=new Bot(difficulty,9,0),start=match.state.time;
    bot.update(match);expect(match.state.casting).toBeNull();
    match.state.players[1].stars=2;bot.update(match);expect(match.state.casting).toBeNull();
    for(let n=0;n<20&&!match.state.casting;n++){match.advance(50);bot.update(match);}
    expect(match.state.casting?.tier).toBe(3);times.push(match.state.time-start);
  }
  expect(new Set(times).size).toBe(1);
  expect(times[0]).toBeGreaterThanOrEqual(isolatedCasting.minDelayMs);expect(times[0]).toBeLessThanOrEqual(isolatedCasting.maxDelayMs);
});

it('cancels a vanished opportunity and gives its return a fresh delay',()=>{
  const match=game(),bot=new Bot('medium',9,0),enemy=match.state.players[1];
  enemy.stars=2;bot.update(match);match.advance(200);enemy.stars=0;bot.update(match);
  match.advance(1000);bot.update(match);expect(match.state.casting).toBeNull();
  enemy.stars=2;bot.update(match);match.advance(250);bot.update(match);expect(match.state.casting).toBeNull();
  match.advance(450);bot.update(match);expect(match.state.casting?.tier).toBe(3);
});

it('does not restart a valid target opportunity when another later target appears',()=>{
  const match=game('captain-bramble'),bot=new Bot('medium',4,0),enemy=match.state.players[1];
  enemy.holes[0]=mole(match);bot.update(match);
  match.advance(250);enemy.holes[1]=mole(match,2,20000);bot.update(match);
  match.advance(450);bot.update(match);expect(match.state.casting?.tier).toBe(2);
});

it('freezes the pending decision with pause and discards it on the next round',()=>{
  const match=game(),bot=new Bot('medium',9,0);match.state.players[1].stars=2;bot.update(match);
  const before=match.state.time;match.state.paused=true;match.advance(5000);bot.update(match);
  expect(match.state.time).toBe(before);expect(match.state.casting).toBeNull();
  match.state.paused=false;match.advance(250);bot.update(match);expect(match.state.casting).toBeNull();
  match.state.phase='round-over';match.nextRound();match.state.players.forEach(p=>p.nextSpawn=Infinity);
  match.advance(config.countdownMs);match.state.players[0].stars=match.options.isolatedSpellTier!;match.state.players[1].stars=2;
  bot.update(match);expect(match.state.casting).toBeNull();match.advance(700);bot.update(match);expect(match.state.casting?.tier).toBe(3);
});

it('waits for cooldown before starting a decision, and still allows warning-time counterplay',()=>{
  const match=game(),bot=new Bot('medium',9,0),[caster,enemy]=match.state.players;
  caster.nextCast=match.state.time+1000;enemy.stars=2;bot.update(match);
  match.advance(1000);bot.update(match);expect(match.state.casting).toBeNull();
  match.advance(700);bot.update(match);expect(match.state.casting?.tier).toBe(3);
  match.advance(config.spells.castFreezeMs);enemy.stars=0;match.advance(config.spells.warningMs);
  expect(match.statistics[0].emptyThefts).toBe(1);expect(caster.stars).toBe(0);
});
