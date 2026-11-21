import { afterEach,expect,it } from 'vitest';
import { Match } from '../../src/game/Match';
import { config } from '../../src/game/config';
import { IsolatedCasting,opportunityKey,useCastingProfile,defaultCastingProfile } from '../../src/game/IsolatedCasting';
import type { CharacterId,Difficulty,Target } from '../../src/game/types';
afterEach(()=>useCastingProfile(defaultCastingProfile));
function game(hero:CharacterId,enemy:CharacterId='andromoss',difficulty:Difficulty='hard'){
  const m=new Match({characters:[hero,enemy],mode:'local',difficulty,seed:41,isolatedSpellTier:3});m.advance(config.countdownMs);m.state.players.forEach(p=>p.nextSpawn=Infinity);m.state.players[0].stars=3;return m;
}
function mole(m:Match,id=1,life=900):Target{return {id,kind:'mole',born:m.state.time-200,expires:m.state.time+life};}
it('prepares wards against public theft readiness, avoids active renewal and does not invent threats in counter-free matchups',()=>{
  for(const hero of ['sprig'] as const){
    const m=game(hero),[p,enemy]=m.state.players;expect(m.isolatedCastingPolicy).toBe('opportunity');expect(opportunityKey(m,0)).toBeNull();
    enemy.stars=1;expect(opportunityKey(m,0)).toBeNull();enemy.stars=2;expect(opportunityKey(m,0)).toBe('ward-threat');
    p.magicShieldUntil=m.state.time+6000;expect(opportunityKey(m,0)).toBeNull();
    const safe=game(hero,'duskmantle');safe.state.players[1].stars=3;expect(opportunityKey(safe,0)).toBeNull();
  }
});
it('3-star theft waits for a worthwhile enemy charge of enemy stars and avoids casting into an active ward',()=>{
  const m=game('andromoss','champignon'),p=m.state.players[1];p.stars=1;expect(opportunityKey(m,0)).toBeNull();
  p.stars=2;expect(opportunityKey(m,0)).toBe('steal-charge');p.magicShieldUntil=m.state.time+12000;expect(opportunityKey(m,0)).toBeNull();
});
it('Iron Resolve needs an unguarded urgent own mole and Siphon needs a visible own mole without renewing the buff',()=>{
  const m=game('captain-bramble'),p=m.state.players[0];p.holes[0]=mole(m,1,2000);expect(opportunityKey(m,0)).toBeNull();
  p.holes[0]!.expires=m.state.time+900;expect(opportunityKey(m,0)).toBe('resolve:1');p.mistakeShield=1;p.shieldUntil=m.state.time+8000;expect(opportunityKey(m,0)).toBeNull();
  const d=game('duskmantle'),q=d.state.players[0];q.holes[0]={...mole(d),born:d.state.time};expect(opportunityKey(d,0)).toBeNull();
  q.holes[0]!.born-=200;expect(opportunityKey(d,0)).toBe('siphon:1');q.drainUntil=d.state.time+7000;expect(opportunityKey(d,0)).toBeNull();
});
it('Weed Out cleanses persistent armor without waiting for a theft threat or inventing an expiry',()=>{
  const m=game('sprig','duskmantle'),p=m.state.players[0];p.tinCharges=2;p.holes[0]={...mole(m),armor:1,persistentArmor:true};
  expect(opportunityKey(m,0)).toBe('cleanse');m.action({type:'cast',player:0});
  expect(p.tinCharges).toBe(0);expect(p.holes[0]?.armor).toBeUndefined();expect(p.magicShieldUntil-m.state.time).toBe(6000);
});
it('uses the same seeded delay×3/2/1, samples once and cancels a vanished ward opportunity',()=>{
  useCastingProfile('scaled');const elapsed:number[]=[];
  for(const difficulty of ['easy','medium','hard'] as const){
    const m=game('sprig','andromoss',difficulty),decision=new IsolatedCasting(9,difficulty),start=m.state.time;m.state.players[1].stars=2;
    decision.tryCast(m,0);while(!m.state.casting&&m.state.time-start<1500){m.advance(50);decision.tryCast(m,0);}
    expect(m.state.casting?.tier).toBe(3);expect(decision.statistics.scheduled).toBe(1);elapsed.push(m.state.time-start);
  }
  expect(elapsed[0]).toBe(elapsed[2]*3);expect(elapsed[1]).toBe(elapsed[2]*2);expect(elapsed[2]).toBeGreaterThanOrEqual(200);expect(elapsed[2]).toBeLessThanOrEqual(400);
  const m=game('sprig'),decision=new IsolatedCasting(9,'hard');m.state.players[1].stars=2;decision.tryCast(m,0);m.state.players[1].stars=0;m.advance(500);decision.tryCast(m,0);
  expect(decision.statistics.cancelled).toBe(1);expect(m.state.casting).toBeNull();
});
it('tracks only Siphon bonus points from final manual mole hits, retaining normal star rewards',()=>{
  const m=game('duskmantle'),p=m.state.players[0];m.action({type:'cast',player:0});m.advance(config.spells.castFreezeMs);
  p.holes[0]=mole(m);m.action({type:'hit',player:0,hole:0});p.holes[0]={...mole(m,2),kind:'star'};m.action({type:'hit',player:0,hole:0});
  expect(m.statistics[0].siphonBonusPoints).toBe(2);expect(p.score).toBe(config.points.mole+2+config.points.star);
});
