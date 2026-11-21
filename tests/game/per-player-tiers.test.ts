import { expect,it } from 'vitest';
import { Match } from '../../src/game/Match';
import { config } from '../../src/game/config';
import { opportunityKey } from '../../src/game/IsolatedCasting';
it('keeps independent star capacities, cast restrictions and reset rules without changing ordinary matches',()=>{
  const m=new Match({characters:['andromoss','champignon'],mode:'local',difficulty:'hard',seed:41,isolatedSpellTiers:[1,4]});m.advance(config.countdownMs);m.state.players.forEach(p=>p.nextSpawn=Infinity);
  for(let n=0;n<5;n++)for(const id of [0,1] as const){m.state.players[id].holes[0]={id:n+id*10,kind:'star',born:m.state.time-200,expires:m.state.time+1000};m.action({type:'hit',player:id,hole:0});}
  expect(m.state.players.map(p=>p.stars)).toEqual([1,4]);expect([m.starCapacityFor(0),m.starCapacityFor(1)]).toEqual([1,4]);expect(()=>m.starCapacity).toThrow();
  m.state.players[0].stars=2;m.action({type:'cast',player:0});expect(m.state.casting).toBeNull();
  m.state.phase='round-over';m.nextRound();expect(m.state.players.map(p=>p.stars)).toEqual([0,0]);expect(m.isolatedTier(1)).toBe(4);
});
it('steals every enemy star but applies the receiving actor capacity on either side',()=>{
  for(const actor of [0,1] as const){
    const other=actor===0?1:0;
    const m=new Match({characters:actor===0?['andromoss','champignon']:['champignon','andromoss'],mode:'local',difficulty:'hard',seed:41,isolatedSpellTiers:actor===0?[3,4]:[4,3]});m.advance(config.countdownMs);
    m.state.players[actor].stars=3;m.state.players[other].stars=4;m.action({type:'cast',player:actor});
    expect(m.state.players[actor].stars).toBe(3);expect(m.state.players[other].stars).toBe(0);expect(m.statistics[actor].starsStolen).toBe(4);expect(m.statistics[actor].stolenStarsReceived).toBe(3);
  }
});
it('infers ward threats from the actual opposing selected spell in mixed-tier probes',()=>{
  const m=new Match({characters:['sprig','captain-bramble'],mode:'local',difficulty:'hard',seed:41,isolatedSpellTiers:[3,4]});m.advance(config.countdownMs);m.state.players[0].stars=3;m.state.players[1].stars=3;
  expect(opportunityKey(m,0)).toBe('ward-threat');
});
it('rejects mixed tiers online, invalid pairs and ambiguous shared/paired diagnostics',()=>{
  expect(()=>new Match({characters:['andromoss','sprig'],mode:'online',difficulty:'hard',seed:1,isolatedSpellTiers:[1,4]})).toThrow();
  expect(()=>new Match({characters:['andromoss','sprig'],mode:'local',difficulty:'hard',seed:1,isolatedSpellTier:1,isolatedSpellTiers:[1,4]})).toThrow();
});
