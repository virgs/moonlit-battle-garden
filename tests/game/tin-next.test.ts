import { afterEach,expect,it } from 'vitest';
import { Match } from '../../src/game/Match';
import { config } from '../../src/game/config';
import { cleanse,hasTinCaps,modifyTarget } from '../../src/game/targetModifiers';
import type { Target } from '../../src/game/types';
const oldMode=config.rosterSpells.tinCapsMode;
afterEach(()=>{config.rosterSpells.tinCapsMode=oldMode;});
function game(){
  const m=new Match({characters:['captain-bramble','sprig'],mode:'local',difficulty:'medium',seed:41});
  m.advance(config.countdownMs);m.state.players.forEach(p=>p.nextSpawn=Infinity);return m;
}
function cast(m:Match){m.state.players[0].stars=2;m.action({type:'cast',player:0});m.advance(config.spells.castFreezeMs+config.spells.warningMs);}
function mole(m:Match,id=99):Target{return {id,kind:'mole',born:m.state.time,expires:m.state.time+20000};}
it('retains charges through pause, refreshes rather than stacks, and clears charges and armor on cleanse/round reset',()=>{
  const m=game(),p=m.state.players[1];cast(m);expect(hasTinCaps(p)).toBe(true);
  p.holes[0]=mole(m);modifyTarget(p,p.holes[0],m.state.time,true);expect(p.tinCharges).toBe(2);
  m.state.paused=true;m.advance(30000);expect(p.tinCharges).toBe(2);expect(p.holes[0]?.armor).toBe(1);m.state.paused=false;
  m.advance(config.spells.cooldownMs);cast(m);expect(p.tinCharges).toBe(3);
  cleanse(p);expect(hasTinCaps(p)).toBe(false);expect(p.holes[0]?.armor).toBeUndefined();expect(p.holes[0]?.persistentArmor).toBeUndefined();
  m.advance(config.spells.cooldownMs);cast(m);m.state.phase='round-over';m.nextRound();
  expect(m.state.players[1].tinCharges).toBe(0);expect(hasTinCaps(m.state.players[1])).toBe(false);
});
it('stronger Heavy Harvest takes precedence without stacking a third armor hit',()=>{
  const m=game(),p=m.state.players[1];cast(m);
  p.armorUntil=m.state.time+3000;p.armorHits=2;p.armorCharges=4;
  const t=mole(m);modifyTarget(p,t,m.state.time,true);
  expect(t.armor).toBe(2);expect(t.persistentArmor).toBeUndefined();expect(p.tinCharges).toBe(2);
});
it('preserves the historical timed mode for exact control reproduction',()=>{
  config.rosterSpells.tinCapsMode='timed';const m=game(),p=m.state.players[1];p.holes[0]=mole(m);cast(m);
  expect(p.tinCharges).toBe(0);expect(p.holes[0]?.armor).toBe(1);expect(p.armorUntil-m.state.time).toBe(3000);
  m.advance(3000);expect(p.holes[0]?.armor).toBeUndefined();
});
