import { afterEach, expect, it } from 'vitest';
import { Bot } from '../../src/game/Bot';
import { Match } from '../../src/game/Match';
import { config } from '../../src/game/config';

const original=structuredClone(config.ai.hard);
afterEach(()=>{
  for(const key of ['reactionJitter','intervalJitter','hesitationChance','hesitationMinMs','hesitationMaxMs'] as const)delete config.ai.hard[key];
  Object.assign(config.ai.hard,original);
});
function garden(){
  const match=new Match({characters:['andromoss','andromoss'],mode:'local',difficulty:'hard',seed:123});
  match.state.phase='playing';match.state.time=0;
  match.state.players[0].holes[0]={id:1,kind:'mole',born:0,expires:10000};
  return match;
}
function firstHit(seed:number,step:number){
  const match=garden(),bot=new Bot('hard',seed,0);
  for(let time=0;time<=1000;time+=step){match.state.time=time;bot.update(match);if(!match.state.players[0].holes[0])return time;}
  throw new Error('Bot never reacted');
}
it('samples one bounded reaction delay per target and reproduces it independently of polling frequency',()=>{
  Object.assign(config.ai.hard,{accuracy:1,reactionJitter:0.30,intervalJitter:0,hesitationChance:0});
  const observed=new Set<number>();
  for(let index=1;index<=32;index++){
    const seed=Math.imul(index,0x9e3779b1)>>>0; // Spread the initial RNG states across the 32-bit range.
    const fine=firstHit(seed,10),coarse=firstHit(seed,50);
    expect(fine).toBeGreaterThanOrEqual(config.ai.hard.reactionMs*0.70);
    expect(coarse).toBeLessThanOrEqual(Math.ceil(config.ai.hard.reactionMs*1.30/50)*50);
    expect(coarse-fine).toBeGreaterThanOrEqual(0);expect(coarse-fine).toBeLessThan(50);
    expect(firstHit(seed,10)).toBe(fine);observed.add(fine);
  }
  expect(observed.size).toBeGreaterThan(1);
});
it('an occasional hesitation delays the next action without rerolling on every update',()=>{
  Object.assign(config.ai.hard,{accuracy:1,reactionMs:0,intervalMs:100,reactionJitter:0,intervalJitter:0,hesitationChance:1,hesitationMinMs:600,hesitationMaxMs:600});
  const match=garden(),bot=new Bot('hard',45,0);bot.update(match);
  expect(match.state.players[0].holes[0]).toBeNull();
  match.state.players[0].holes[0]={id:2,kind:'mole',born:0,expires:10000};
  for(const time of [50,100,250,500,699]){match.state.time=time;bot.update(match);expect(match.state.players[0].holes[0]?.id).toBe(2);}
  match.state.time=700;bot.update(match);expect(match.state.players[0].holes[0]).toBeNull();
});
it('paused and casting states cannot trigger bot inputs',()=>{
  Object.assign(config.ai.hard,{accuracy:1,reactionMs:0});
  const match=garden(),bot=new Bot('hard',123,0);
  match.state.paused=true;bot.update(match);expect(match.state.players[0].holes[0]?.id).toBe(1);
  match.state.paused=false;match.state.casting={player:1,tier:1,remainingMs:1500};
  bot.update(match);expect(match.state.players[0].holes[0]?.id).toBe(1);
  match.state.casting=null;bot.update(match);expect(match.state.players[0].holes[0]).toBeNull();
});
