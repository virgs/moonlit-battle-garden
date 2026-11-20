import { afterEach,expect,it } from 'vitest';
import { Match } from '../../src/game/Match';
import { config } from '../../src/game/config';
import { cleanse,hasGuard } from '../../src/game/targetModifiers';
import type { CharacterId } from '../../src/game/types';
const oldMode=config.rosterSpells.twoStarGuardMode;
afterEach(()=>{config.rosterSpells.twoStarGuardMode=oldMode;});
function game(hero:CharacterId){const m=new Match({characters:[hero,'andromoss'],mode:'local',difficulty:'medium',seed:41});m.advance(config.countdownMs);m.state.players.forEach(p=>p.nextSpawn=Infinity);return m;}
function cast(m:Match){m.state.players[0].stars=2;m.action({type:'cast',player:0});m.advance(config.spells.castFreezeMs);}
it('gives both heroes exactly two permanent mistake blocks for empty hits, rabbits and missed moles',()=>{
  for(const hero of ['champignon','captain-bramble'] as const)for(const kind of ['empty','rabbit','miss'] as const){
    const m=game(hero),p=m.state.players[0];cast(m);expect(p.shieldPermanent).toBe(true);expect(p.shieldUntil).toBe(0);
    m.advance(20000);expect(p.mistakeShield).toBe(2);expect(hasGuard(p,m.state.time)).toBe(true);
    const mistake=()=>{
      if(kind==='empty')m.action({type:'hit',player:0,hole:0});
      else {p.holes[0]={id:99,kind:kind==='miss'?'mole':'rabbit',born:m.state.time-200,expires:m.state.time+50};
        if(kind==='miss')m.advance(50);else m.action({type:'hit',player:0,hole:0});}
    };
    mistake();expect(p.score).toBe(0);expect(p.mistakeShield).toBe(1);
    mistake();expect(p.score).toBe(0);expect(hasGuard(p,m.state.time)).toBe(false);
    mistake();expect(p.score).toBe(-(kind==='empty'?config.penalties.empty:kind==='rabbit'?config.penalties.rabbit:config.penalties.miss));
  }
});
it('freezes, survives cleansing, refreshes to two instead of stacking, and resets next round',()=>{
  const m=game('champignon'),p=m.state.players[0];cast(m);m.action({type:'hit',player:0,hole:0});
  m.state.paused=true;m.advance(30000);expect(p.mistakeShield).toBe(1);m.state.paused=false;
  cleanse(p);expect(p.mistakeShield).toBe(1);m.advance(config.spells.cooldownMs);cast(m);expect(p.mistakeShield).toBe(2);
  m.state.phase='round-over';m.nextRound();expect(m.state.players[0].shieldPermanent).toBe(false);expect(m.state.players[0].mistakeShield).toBe(0);
});
it('retains historical timed one-charge guards only for reproducible controls',()=>{
  config.rosterSpells.twoStarGuardMode='timed';
  for(const [hero,ms] of [['champignon',12000],['captain-bramble',8000]] as const){
    const m=game(hero),p=m.state.players[0];cast(m);expect(p.shieldPermanent).toBe(false);expect(p.mistakeShield).toBe(1);
    m.advance(ms);expect(p.mistakeShield).toBe(0);
  }
});
