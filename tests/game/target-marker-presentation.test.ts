import { expect,it } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Match } from '../../src/game/Match';
import { config } from '../../src/game/config';
import { modifyTarget } from '../../src/game/targetModifiers';
import { createArenaLayout } from '../../src/render/layout';
import { TargetMarkers } from '../../src/ui/TargetMarkers';
import { SpellGlyph } from '../../src/ui/SpellGlyph';
it('only shows actionable armor hit counts while keeping point details accessible',()=>{
 const m=new Match({characters:['duskmantle','captain-bramble'],mode:'local',difficulty:'hard',seed:41});m.advance(config.countdownMs);
 m.state.players[1].stars=4;m.action({type:'cast',player:1});m.advance(config.spells.castFreezeMs);
 m.state.players[0].stars=3;m.action({type:'cast',player:0});m.advance(config.spells.castFreezeMs);
 const p=m.state.players[0];p.holes[4]={id:42,kind:'mole',born:m.state.time,expires:m.state.time+2000};modifyTarget(p,p.holes[4]!,m.state.time,true);
 const draw=()=>renderToStaticMarkup(createElement(TargetMarkers,{snapshot:{state:m.state,events:m.events},garden:createArenaLayout(1280,800,'local').gardens[0]}));
 const html=draw();expect(html.replace(/<[^>]*>/g,'')).toBe('3');expect(html).toContain('Manual elimination earns 2 bonus points');expect(html.match(/data-outlined="true"/g)).toHaveLength(2);expect(html).not.toContain('spell-backing');expect(html).not.toContain('data-remaining');
 p.holes[4]!.armor=0;p.holes[4]!.missBonus=8;
 expect(draw().replace(/<[^>]*>/g,'')).toBe('');expect(draw()).toContain('Missing this mole costs 8 extra points');
});
it('builds silhouette outlines from the clipped current frame and lets the halo extend beyond it',()=>{
 const html=renderToStaticMarkup(createElement(SpellGlyph,{character:'andromoss',tier:2,time:125,outlined:true}));
 expect(html).toContain('overflow="visible"');expect(html).toContain('operator="dilate"');expect(html).toContain('flood-color="#65d9ea"');
 expect(html).toMatch(/<g filter="url\(#[^"]+-outline\)"><g clip-path="url\(#[^"]+-frame\)"><image/);
 expect(html).not.toContain('spell-backing');expect(html).not.toContain('spell-elapsed');
});
