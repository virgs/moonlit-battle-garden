import { expect,it } from 'vitest';
import { Match } from '../../src/game/Match';
import { config } from '../../src/game/config';
import type { CharacterId } from '../../src/game/types';
const hostile:[CharacterId,number][]=[...[1,2,3,4].map(t=>['andromoss',t] as [CharacterId,number]),['captain-bramble',2],['captain-bramble',4],['duskmantle',1],['duskmantle',2],['duskmantle',4]];
function game(hero:CharacterId){
  const m=new Match({characters:[hero,'champignon'],mode:'local',difficulty:'medium',seed:41});
  m.advance(config.countdownMs);m.state.players.forEach(p=>p.nextSpawn=Infinity);
  const p=m.state.players[1];p.stars=4;
  for(let n=0;n<4;n++)p.holes[n]={id:n+1,kind:'mole',born:m.state.time-200,expires:m.state.time+10000};
  return m;
}
it('applies every hostile spell at cast start with no warning or opponent response window',()=>{
  expect(config.spells.warningMs).toBe(0);
  for(const [hero,tier] of hostile){
    const m=game(hero),[caster,victim]=m.state.players;caster.stars=tier;
    m.action({type:'cast',player:0});expect(victim.pending).toHaveLength(0);expect(victim.message).not.toContain('Incoming');
    expect(m.state.casting?.tier).toBe(tier);
    if(hero==='andromoss'){
      if(tier===1)expect([caster.stars,victim.stars]).toEqual([4,0]);
      if(tier===3)expect([caster.stars,victim.stars]).toEqual([2,2]);
      if(tier===2)expect(victim.invasionUntil-m.state.time).toBe(7500);
      if(tier===4)expect(victim.decoysUntil-m.state.time).toBe(8500);
    }else if(hero==='captain-bramble'){
      if(tier===2)expect(victim.tinCharges).toBe(3);
      else expect(victim.holes.filter(t=>t?.armor===2)).toHaveLength(4);
    }else if(tier===2)expect(victim.camouflageUntil-m.state.time).toBe(6500);
    else expect(victim.holes.filter(t=>t?.missBonus)).toHaveLength(tier===1?3:4);
    const time=m.state.time;m.action({type:'cast',player:1});expect(m.state.casting?.player).toBe(0);
    m.advance(config.spells.castFreezeMs);expect(m.state.time).toBe(time);
  }
});
it('lets an already-active ward block any hostile spell, without retroactive casting',()=>{
  for(const [hero,tier] of hostile){
    const m=game(hero),victim=m.state.players[1];victim.magicShieldUntil=m.state.time+10000;
    m.state.players[0].stars=tier;m.action({type:'cast',player:0});
    expect(m.statistics[1].wardBlocks).toBe(1);expect(victim.magicShieldUntil).toBe(0);expect(victim.pending).toHaveLength(0);
    expect(victim.stars).toBe(4);expect(victim.tinCharges).toBe(0);
    expect(victim.invasionUntil+victim.decoysUntil+victim.camouflageUntil).toBe(0);
  }
});
