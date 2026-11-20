import { afterEach,expect,it } from 'vitest';
import { Match } from '../../src/game/Match';
import { config } from '../../src/game/config';
import { IsolatedCasting,opportunityKey,useCastingProfile,defaultCastingProfile } from '../../src/game/IsolatedCasting';
import type { CharacterId,Difficulty,Target } from '../../src/game/types';
afterEach(()=>useCastingProfile(defaultCastingProfile));
function game(hero:CharacterId,difficulty:Difficulty='hard',tier:1|2=2){
  const m=new Match({characters:[hero,'andromoss'],mode:'local',difficulty,seed:41,isolatedSpellTier:tier});
  m.advance(config.countdownMs);m.state.players.forEach(p=>p.nextSpawn=Infinity);m.state.players[0].stars=tier;return m;
}
function target(m:Match,id=1,kind:Target['kind']='mole',life=900):Target{return {id,kind,born:m.state.time-200,expires:m.state.time+life};}
it('defaults all tiers to opportunity casting and preserves explicit immediate controls',()=>{
  expect(game('champignon').isolatedCastingPolicy).toBe('opportunity');
  expect(new Match({characters:['sprig','andromoss'],mode:'local',difficulty:'hard',seed:1,isolatedSpellTier:4,isolatedCastingPolicy:'immediate'}).isolatedCastingPolicy).toBe('immediate');
});
it('uses the same near-miss guard opportunity for both heroes and avoids replacing active charges',()=>{
  for(const hero of ['champignon','captain-bramble'] as const){
    const m=game(hero,'hard',1),p=m.state.players[0];expect(opportunityKey(m,0)).toBeNull();
    p.holes[0]=target(m,1,'mole',2000);expect(opportunityKey(m,0)).toBeNull();
    p.holes[0]!.expires=m.state.time+900;expect(opportunityKey(m,0)).toBe('guard:1');
    p.shieldPermanent=true;p.mistakeShield=1;expect(opportunityKey(m,0)).toBeNull();
  }
});
it('waits for useful Tines targets and rejects renewing automation or a rabbit-only column',()=>{
  const m=game('sprig'),p=m.state.players[0];p.holes[0]=target(m,1,'rabbit',10000);expect(opportunityKey(m,0)).toBeNull();
  p.holes[3]=target(m,2);expect(opportunityKey(m,0)).toBe('tines:0:2');
  p.automationUntil=m.state.time+6500;expect(opportunityKey(m,0)).toBeNull();
});
it('Shortening and Veil wait for visible enemy targets and avoid wards or refreshing active effects',()=>{
  for(const hero of ['andromoss','duskmantle'] as const){
    const m=game(hero),p=m.state.players[1];expect(opportunityKey(m,0)).toBeNull();
    p.holes[0]=target(m);expect(opportunityKey(m,0)).not.toBeNull();
    p.magicShieldUntil=m.state.time+1000;expect(opportunityKey(m,0)).toBeNull();p.magicShieldUntil=0;
    if(hero==='andromoss')p.moleRushUntil=m.state.time+1000;else p.camouflageUntil=m.state.time+1000;
    expect(opportunityKey(m,0)).toBeNull();
  }
});
it('samples the same seeded200–400ms delay with Easy×3/Medium×2/Hard×1 and cancels vanished opportunities',()=>{
  useCastingProfile('scaled');const times:number[]=[];
  for(const difficulty of ['easy','medium','hard'] as const){
    const m=game('duskmantle',difficulty),decision=new IsolatedCasting(9,difficulty),start=m.state.time;
    m.state.players[1].holes[0]=target(m,1,'mole',10000);expect(decision.tryCast(m,0)).toBe(false);
    while(!m.state.casting&&m.state.time-start<1500){m.advance(50);decision.tryCast(m,0);}
    expect(m.state.casting?.tier).toBe(2);times.push(m.state.time-start);
  }
  expect(times[2]).toBeGreaterThanOrEqual(200);expect(times[2]).toBeLessThanOrEqual(400);
  expect(times[0]).toBe(times[2]*3);expect(times[1]).toBe(times[2]*2);
  const m=game('duskmantle'),decision=new IsolatedCasting(9,'hard');m.state.players[1].holes[0]=target(m);
  decision.tryCast(m,0);m.state.players[1].holes[0]=null;m.advance(500);expect(decision.tryCast(m,0)).toBe(false);expect(decision.statistics.cancelled).toBe(1);
});
it('counts automation rabbit penalties and normal mole/star hits without changing their rewards',()=>{
  const m=game('sprig'),p=m.state.players[0];m.action({type:'cast',player:0});m.advance(config.spells.castFreezeMs);
  for(const [n,kind] of (['mole','star','rabbit'] as const).entries()){
    p.holes[0]=target(m,n+1,kind,10000);m.advance(250);
  }
  expect(m.statistics[0].automationMoleHits).toBe(1);expect(m.statistics[0].automationStarHits).toBe(1);expect(m.statistics[0].automationRabbitHits).toBe(1);
  expect(p.score).toBe(config.points.mole+config.points.star-config.penalties.rabbit);
});
