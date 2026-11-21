import { expect,it } from 'vitest';
import { readFileSync } from 'node:fs';
import { Match } from '../../src/game/Match';
import { config } from '../../src/game/config';
import { oneStarEffects } from '../../src/presentation/oneStarEffects';
import { presentation,validSheet } from '../../src/presentation/config';
import { modifyTarget,cleanse } from '../../src/game/targetModifiers';
import type { CharacterId } from '../../src/game/types';
function game(hero:CharacterId){const m=new Match({characters:[hero,'sprig'],mode:'local',difficulty:'hard',seed:41});m.advance(config.countdownMs);m.state.players.forEach(p=>p.nextSpawn=Infinity);return m;}
function cast(m:Match,tier=1){m.state.players[0].stars=tier;m.action({type:'cast',player:0});m.advance(config.spells.castFreezeMs);}
it('uses valid eight-frame transparent PNG exports for all five one-star effects',()=>{
  for(const hero of ['champignon','captain-bramble','andromoss','duskmantle','sprig'] as const){
    const clip=presentation[hero].effects[1],png=readFileSync('public'+clip.src);
    expect(validSheet(clip,png.readUInt32BE(16),png.readUInt32BE(20))).toBe(true);expect(png[25]).toBe(6);
    expect(clip.frameCount).toBe(8);expect(clip.fps).toBe(6);
  }
});
it('shows remaining one-star guard charges, without treating five-charge guards as one-star effects',()=>{
  for(const hero of ['champignon','captain-bramble'] as const){
    const m=game(hero),p=m.state.players[0];cast(m);expect(oneStarEffects(p,m.state.time)[0].count).toBe(2);
    m.action({type:'hit',player:0,hole:8});expect(oneStarEffects(p,m.state.time)[0].count).toBe(1);
    m.action({type:'hit',player:0,hole:8});expect(oneStarEffects(p,m.state.time)).toEqual([]);
    m.advance(config.spells.cooldownMs);cast(m,3);expect(oneStarEffects(p,m.state.time)).toEqual([]);
  }
});
it('attaches only one-star curse markers to live affected moles, retaining old marks across tier4 recasts',()=>{
  const m=game('duskmantle'),p=m.state.players[1];cast(m);expect(oneStarEffects(p,m.state.time)[0].count).toBe(3);expect(oneStarEffects(p,m.state.time)[0].holes).toEqual([]);
  p.holes[4]={id:90,kind:'mole',born:m.state.time,expires:m.state.time+10000};modifyTarget(p,p.holes[4]!,m.state.time,true);
  expect(oneStarEffects(p,m.state.time)[0].holes).toEqual([4]);expect(oneStarEffects(p,m.state.time)[0].count).toBe(3);
  m.advance(config.spells.cooldownMs);cast(m,4);expect(oneStarEffects(p,m.state.time)[0].count).toBe(1);
  p.holes[6]={id:91,kind:'mole',born:m.state.time,expires:m.state.time+10000};modifyTarget(p,p.holes[6]!,m.state.time,true);
  expect(oneStarEffects(p,m.state.time)[0].holes).toEqual([4]);cleanse(p,m.state.time);expect(oneStarEffects(p,m.state.time)).toEqual([]);
});
it('derives timed effects from the affected player and actual frozen clock without changing any match state',()=>{
  const m=game('andromoss');cast(m);const before=JSON.stringify(m.state);
  expect(oneStarEffects(m.state.players[0],m.state.time)).toEqual([]);expect(oneStarEffects(m.state.players[1],m.state.time)[0].character).toBe('andromoss');expect(JSON.stringify(m.state)).toBe(before);
  m.state.paused=true;m.advance(20000);expect(oneStarEffects(m.state.players[1],m.state.time)).toHaveLength(1);m.state.paused=false;
  m.advance(8000);expect(oneStarEffects(m.state.players[1],m.state.time)).toEqual([]);
  const s=game('sprig');cast(s);expect(oneStarEffects(s.state.players[0],s.state.time)[0].kind).toBe('tending');s.advance(6000);expect(oneStarEffects(s.state.players[0],s.state.time)).toEqual([]);
});
