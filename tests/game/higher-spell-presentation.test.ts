import { expect,it } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Match } from '../../src/game/Match';
import { config } from '../../src/game/config';
import { higherSpellEffects } from '../../src/presentation/spellEffects';
import { SpellGlyph,spellMotifs } from '../../src/ui/SpellGlyph';
import { modifyTarget } from '../../src/game/targetModifiers';
import type { CharacterId } from '../../src/game/types';
const heroes=Object.keys(spellMotifs) as CharacterId[];
function game(hero:CharacterId){const m=new Match({characters:[hero,'sprig'],mode:'local',difficulty:'hard',seed:41});m.advance(config.countdownMs);m.state.players.forEach(p=>p.nextSpawn=Infinity);return m;}
function effects(m:Match,side:0|1){return higherSpellEffects({state:m.state,events:m.events},side);}
it('has twenty unique raster motifs with multiple simulation-driven poses',()=>{
 const motifs:string[]=[];
 for(const hero of heroes)for(const tier of [1,2,3,4]){
  motifs.push(spellMotifs[hero][tier]);
  const poses=Array.from({length:8},(_,frame)=>renderToStaticMarkup(createElement(SpellGlyph,{character:hero,tier,time:frame*125})));
  // Strip diagnostic frame attributes: the artwork itself must move.
  expect(new Set(poses.map(p=>p.replace(/data-frame="\d"/,''))).size).toBeGreaterThan(1);
  expect(poses[0]).toContain(`data-motif="${spellMotifs[hero][tier]}"`);
 }
 expect(new Set(motifs).size).toBe(20);
});
for(const hero of heroes)for(const tier of [2,3,4])it(`${hero} ${tier}: actual casts select the right visual without mutating rules`,()=>{
 const m=game(hero);m.state.players[0].stars=tier;m.state.players[1].stars=4;
 m.action({type:'cast',player:0});m.advance(config.spells.castFreezeMs);
 const before=JSON.stringify(m.state),all=[...effects(m,0),...effects(m,1)];
 expect(all.some(e=>e.character===hero&&e.tier===tier)).toBe(true);
 expect(JSON.stringify(m.state)).toBe(before);
});
it('keeps fixed column geometry and removes timed cues on actual expiry',()=>{
 const m=game('champignon');m.state.players[0].stars=2;m.action({type:'cast',player:0});m.advance(config.spells.castFreezeMs);
 expect(effects(m,0)[0].columns).toEqual(m.state.players[0].sweepColumns);
 m.advance(3000);expect(effects(m,0)).toEqual([]);
});
it('removes quota cues as they transfer to live target markers',()=>{
 for(const hero of ['captain-bramble','duskmantle'] as const){
  const m=game(hero);m.state.players[0].stars=4;m.action({type:'cast',player:0});m.advance(config.spells.castFreezeMs);
  const enemy=m.state.players[1],quota=hero==='duskmantle'?6:3;
  expect(effects(m,1)[0].count).toBe(quota);
  for(let i=0;i<quota;i++){const target={id:100+i,kind:'mole' as const,born:m.state.time,expires:m.state.time+10000};enemy.holes[i]=target;modifyTarget(enemy,target,m.state.time,true);}
  expect(effects(m,1)).toEqual([]);
 }
});
it('does not animate a successful theft when enemy meter is empty',()=>{
 const m=game('andromoss');m.state.players[0].stars=3;m.action({type:'cast',player:0});m.advance(config.spells.castFreezeMs);expect(effects(m,0)).toEqual([]);
});

it('does not mistake a newly collected star for a successful empty-meter theft',()=>{
 const m=game('andromoss');m.state.players[0].stars=3;m.action({type:'cast',player:0});m.advance(config.spells.castFreezeMs);
 m.state.players[0].holes[0]={id:99,kind:'star',born:m.state.time,expires:m.state.time+1000};m.action({type:'hit',player:0,hole:0});
 expect(m.state.players[0].stars).toBe(1);expect(effects(m,0)).toEqual([]);
});
