import { expect,it } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Match } from '../../src/game/Match';
import { config } from '../../src/game/config';
import { higherSpellEffects } from '../../src/presentation/spellEffects';
import { oneStarEffects } from '../../src/presentation/oneStarEffects';
import { durationRemaining } from '../../src/presentation/spellDuration';
import { SpellGlyph } from '../../src/ui/SpellGlyph';
import type { CharacterId } from '../../src/game/types';
const timed:[CharacterId,number,number,0|1][]=[['champignon',2,3000,0],['champignon',4,6000,0],['andromoss',1,8000,1],['andromoss',2,8000,1],['andromoss',4,8000,1],['duskmantle',2,6000,1],['duskmantle',3,7000,0],['sprig',1,6000,0],['sprig',2,4000,0],['sprig',3,6000,0],['sprig',4,4000,0]];
for(const [hero,tier,duration,side] of timed)it(`${hero}${tier}: countdown follows actual deadline, pause, casting and refresh`,()=>{
 const m=new Match({characters:[hero,'champignon'],mode:'local',difficulty:'hard',seed:41});m.advance(config.countdownMs);m.state.players.forEach(p=>p.nextSpawn=Infinity);
 const effects=()=>[...oneStarEffects(m.state.players[side],m.state.time),...higherSpellEffects({state:m.state,events:m.events},side)];
 const remaining=()=>effects().find(e=>e.remaining!==undefined)?.remaining;
 const cast=()=>{m.state.players[0].stars=tier;m.action({type:'cast',player:0});};
 cast();expect(remaining()).toBe(1);m.advance(config.spells.castFreezeMs);expect(remaining()).toBe(1);
 m.advance(duration*.75);expect(remaining()).toBeCloseTo(.25,5);
 m.state.paused=true;m.advance(1000);expect(remaining()).toBeCloseTo(.25,5);m.state.paused=false;
 cast();expect(remaining()).toBe(1);m.advance(config.spells.castFreezeMs);expect(remaining()).toBe(1);
 const before=JSON.stringify(m.state);effects();expect(JSON.stringify(m.state)).toBe(before);
 m.advance(duration);expect(remaining()).toBeUndefined();
});
it('never gives charges, pending quotas, target badges or instant theft a timer',()=>{
 for(const [hero,tier] of [['champignon',1],['champignon',3],['captain-bramble',1],['captain-bramble',2],['captain-bramble',3],['captain-bramble',4],['duskmantle',1],['duskmantle',4],['andromoss',3]] as const){
  const m=new Match({characters:[hero,'sprig'],mode:'local',difficulty:'hard',seed:41});m.advance(config.countdownMs);m.state.players[0].stars=tier;m.state.players[1].stars=4;m.action({type:'cast',player:0});
  for(const side of [0,1] as const)for(const e of [...oneStarEffects(m.state.players[side],m.state.time),...higherSpellEffects({state:m.state,events:m.events},side)])expect(e.remaining).toBeUndefined();
 }
 const badge=renderToStaticMarkup(createElement(SpellGlyph,{character:'andromoss',tier:2,time:0}));expect(badge).not.toContain('spell-elapsed');
});
it('clips only the darkened raster copy, preserves alpha and keeps individual SVG IDs unique',()=>{
 const markup=renderToStaticMarkup(createElement('div',{},...[1,.75,.5,0].map(remaining=>createElement(SpellGlyph,{character:'sprig',tier:4,time:0,remaining}))));
 expect([...markup.matchAll(/data-dark-rows="(\d+)"/g)].map(m=>Number(m[1]))).toEqual([0,12,24,48]);
 expect([...markup.matchAll(/id="([^"]+-shade)"/g)].map(m=>m[1])).toHaveLength(4);
 expect(new Set([...markup.matchAll(/id="([^"]+-shade)"/g)].map(m=>m[1])).size).toBe(4);
 expect(markup.match(/0 0 0 1 0/g)).toHaveLength(4);
 expect(durationRemaining(500,0,100)).toBe(1);expect(durationRemaining(100,200,100)).toBe(0);
});
it('keeps optional hero-colour backing unchanged as the artwork drains',()=>{
 for(const character of ['champignon','andromoss','captain-bramble','duskmantle','sprig'] as const){
  const draw=(remaining:number,backed=true)=>renderToStaticMarkup(createElement(SpellGlyph,{character,tier:2,time:250,remaining,backed}));
  const full=draw(1),empty=draw(0),backing=(html:string)=>html.match(/<g class="spell-backing"[\s\S]*?<\/g>/)?.[0];
  expect(backing(full)).toBeTruthy();expect(backing(empty)).toBe(backing(full));
  expect(backing(full)).not.toContain('filter=');expect(backing(full)).not.toContain('clip-path=');
  expect(draw(.5,false)).not.toContain('spell-backing');
 }
});
