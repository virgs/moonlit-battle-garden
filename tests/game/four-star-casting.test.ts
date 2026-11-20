import { afterEach,expect,it } from 'vitest';
import { Match } from '../../src/game/Match';
import { config } from '../../src/game/config';
import { IsolatedCasting,opportunityKey,useCastingProfile,defaultCastingProfile } from '../../src/game/IsolatedCasting';
import type { CharacterId,Difficulty,Target } from '../../src/game/types';
afterEach(()=>useCastingProfile(defaultCastingProfile));
function game(hero:CharacterId,difficulty:Difficulty='hard'){
  const m=new Match({characters:[hero,'champignon'],mode:'local',difficulty,seed:41,isolatedSpellTier:4});m.advance(config.countdownMs);m.state.players.forEach(p=>p.nextSpawn=Infinity);m.state.players[0].stars=4;return m;
}
function target(m:Match,id=1,kind:Target['kind']='mole',life=10000):Target{return {id,kind,born:m.state.time-200,expires:m.state.time+life};}
it('Royal Cleanup needs a useful visible target and avoids replacing an active sweep',()=>{
  const m=game('champignon'),p=m.state.players[0];expect(m.isolatedCastingPolicy).toBe('opportunity');expect(opportunityKey(m,0)).toBeNull();
  p.holes[0]=target(m,1,'rabbit');expect(opportunityKey(m,0)).toBeNull();p.holes[1]=target(m,2,'star');expect(opportunityKey(m,0)).toBe('royal:2');
  p.sweepUntil=m.state.time+3000;expect(opportunityKey(m,0)).toBeNull();
});
it('Double Trouble avoids wards and active renewal, and needs a visible enemy opportunity',()=>{
  const m=game('andromoss'),p=m.state.players[1];p.holes[0]=target(m);expect(opportunityKey(m,0)).toBe('trouble:1');
  p.magicShieldUntil=m.state.time+1000;expect(opportunityKey(m,0)).toBeNull();p.magicShieldUntil=0;
  p.decoysUntil=m.state.time+8500;expect(opportunityKey(m,0)).toBeNull();
});
it('Heavy Harvest can upgrade light armor but avoids renewing active heavy armor; Pact avoids marked targets',()=>{
  const m=game('captain-bramble'),p=m.state.players[1];p.holes[0]={...target(m),armor:1};p.armorHits=1;p.armorUntil=m.state.time+3000;
  expect(opportunityKey(m,0)).toBe('harvest:1');p.armorHits=2;expect(opportunityKey(m,0)).toBeNull();
  const d=game('duskmantle'),q=d.state.players[1];q.holes[0]=target(d);expect(opportunityKey(d,0)).toBe('pact:1');
  q.holes[0]!.missBonus=6;expect(opportunityKey(d,0)).toBeNull();q.holes[0]!.missBonus=undefined;q.markUntil=d.state.time+8000;expect(opportunityKey(d,0)).toBeNull();
});
it('Clockwork uses two columns and avoids rabbits unless a mole is urgent, without refreshing active automation',()=>{
  const m=game('sprig'),p=m.state.players[0];p.holes[0]=target(m);p.holes[3]=target(m,2,'rabbit');p.holes[1]=target(m,3,'star');
  expect(opportunityKey(m,0)).toBeNull();p.holes[0]!.expires=m.state.time+900;expect(opportunityKey(m,0)).toBe('clockwork:0,1:1');
  p.automationUntil=m.state.time+8000;expect(opportunityKey(m,0)).toBeNull();
});
it('shares the seeded delay multipliers and cancels vanished four-star witnesses',()=>{
  useCastingProfile('scaled');const times:number[]=[];
  for(const difficulty of ['easy','medium','hard'] as const){
    const m=game('champignon',difficulty),decision=new IsolatedCasting(9,difficulty),start=m.state.time;m.state.players[0].holes[0]=target(m);decision.tryCast(m,0);
    while(!m.state.casting&&m.state.time-start<1500){m.advance(50);decision.tryCast(m,0);}
    expect(m.state.casting?.tier).toBe(4);expect(decision.statistics.executed).toBe(1);times.push(m.state.time-start);
  }
  expect(times[0]).toBe(times[2]*3);expect(times[1]).toBe(times[2]*2);expect(times[2]).toBeGreaterThanOrEqual(200);expect(times[2]).toBeLessThanOrEqual(400);
  const m=game('champignon'),decision=new IsolatedCasting(9,'hard');m.state.players[0].holes[0]=target(m);decision.tryCast(m,0);m.state.players[0].holes[0]=null;m.advance(500);expect(decision.tryCast(m,0)).toBe(false);expect(decision.statistics.cancelled).toBe(1);
});
it('counts only the marked-miss bonus actually lost, excluding Royal Cleanup guard prevention',()=>{
  const m=game('duskmantle'),p=m.state.players[1];p.stars=4;m.action({type:'cast',player:1});m.advance(config.spells.castFreezeMs);
  for(let hole=0;hole<4;hole++)p.holes[hole]=target(m,hole+1,'mole',100);
  m.action({type:'cast',player:0});m.advance(config.spells.castFreezeMs);m.advance(100);
  expect(m.statistics[1].guardPointsPrevented).toBe(3*(config.penalties.miss+config.rosterSpells.curseBonus));
  expect(m.statistics[1].markBonusPointsLost).toBe(config.rosterSpells.curseBonus);expect(m.statistics[1].pointsLost).toBe(config.penalties.miss+config.rosterSpells.curseBonus);
});
