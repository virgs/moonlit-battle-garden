import { afterEach,expect,it } from 'vitest';
import { Match } from '../../src/game/Match';
import { Bot } from '../../src/game/Bot';
import { config } from '../../src/game/config';
import { isolatedCasting,opportunityKey,useCastingProfile,defaultCastingProfile } from '../../src/game/IsolatedCasting';
import type { Difficulty } from '../../src/game/types';

afterEach(()=>useCastingProfile(defaultCastingProfile));

it('adopts the scaled profile as the single shared default for isolated diagnostics',()=>{
  expect(defaultCastingProfile).toBe('scaled');
  useCastingProfile(defaultCastingProfile);
  expect(isolatedCasting.visibleMs).toBe(100);
  expect(isolatedCasting.delayMultipliers).toEqual({easy:3,medium:2,hard:1});
});
function garden(difficulty:Difficulty='hard') {
  const match=new Match({characters:['captain-bramble','sprig'],mode:'local',difficulty,seed:41,isolatedSpellTier:1});
  match.advance(config.countdownMs);match.state.players.forEach(p=>p.nextSpawn=Infinity);
  match.state.players[0].stars=1;
  match.state.players[1].holes[0]={id:1,kind:'mole',born:match.state.time,expires:match.state.time+10000};
  return match;
}

it('multiplies only the seeded decision delay, leaving target visibility shared',()=>{
  useCastingProfile('scaled');const elapsed:Record<string,number>={};
  for(const difficulty of ['easy','medium','hard'] as const) {
    const match=garden(difficulty),bot=new Bot(difficulty,9,0),start=match.state.time;
    bot.update(match);expect(bot.castingStatistics.scheduled).toBe(0);
    for(let i=0;i<30&&!match.state.casting;i++){match.advance(50);bot.update(match);}
    expect(match.state.casting?.tier).toBe(1);elapsed[difficulty]=match.state.time-start;
    expect(bot.castingStatistics.executed).toBe(1);
  }
  expect(elapsed.hard).toBeGreaterThanOrEqual(300);expect(elapsed.hard).toBeLessThanOrEqual(500);
  expect(elapsed.medium-100).toBe((elapsed.hard-100)*2);
  expect(elapsed.easy-100).toBe((elapsed.hard-100)*3);
});

it('fast uses a uniform delay and profiles can restore the unchanged baseline',()=>{
  useCastingProfile('fast');expect(isolatedCasting.delayMultipliers).toEqual({easy:1,medium:1,hard:1});
  const match=garden();match.advance(100);expect(opportunityKey(match,0)).toBe('armor:1');
  useCastingProfile('baseline');expect(opportunityKey(match,0)).toBeNull();
  expect(isolatedCasting.minDelayMs).toBe(300);expect(isolatedCasting.maxDelayMs).toBe(700);
  match.advance(100);expect(opportunityKey(match,0)).toBe('armor:1');
});

it('accounts for cancellation, pending decisions and execution without hiding replaced opportunities',()=>{
  useCastingProfile('scaled');const match=garden(),bot=new Bot('hard',9,0);
  match.advance(100);bot.update(match);expect(bot.castingStatistics.pending).toBe(1);
  match.state.players[1].holes[0]=null;bot.update(match);
  expect(bot.castingStatistics.cancelled).toBe(1);expect(bot.castingStatistics.pending).toBe(0);
  match.state.players[1].holes[0]={id:2,kind:'mole',born:match.state.time-100,expires:match.state.time+10000};
  bot.update(match);match.advance(400);bot.update(match);
  const stats=bot.castingStatistics;
  expect(stats.executed).toBe(1);expect(stats.scheduled).toBe(stats.cancelled+stats.executed+stats.pending);
  expect(stats.rampScheduled).toBe(2);expect(stats.rampExecuted).toBe(1);
});

it('cancels medium/easy decisions when a half-second opportunity expires while hard can act',()=>{
  useCastingProfile('scaled');let hardCasts=0;
  for(const difficulty of ['easy','medium','hard'] as const)for(let seed=0;seed<10;seed++) {
    const match=garden(difficulty),bot=new Bot(difficulty,Math.imul(seed+1,0x9e3779b9),0);
    match.state.players[1].holes[0]!.expires=match.state.time+500;
    for(let i=0;i<11&&!match.state.casting;i++){bot.update(match);match.advance(50);}
    if(difficulty==='hard')hardCasts+=Number(!!match.state.casting);
    else {expect(match.state.casting).toBeNull();expect(bot.castingStatistics.cancelled).toBe(1);}
  }
  expect(hardCasts).toBeGreaterThan(0);
});
