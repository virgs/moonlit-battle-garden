/** Screenshot output only: user reviews visuals, assertions cover timer geometry/state. */
import { chromium,expect } from '@playwright/test';
import { createServer } from 'vite';
import { mkdirSync,writeFileSync } from 'node:fs';
import { resolve,join } from 'node:path';
const out=resolve('output/guard-flows/spell-duration');mkdirSync(out,{recursive:true});
writeFileSync(join(out,'gallery.tsx'),`
import {createRoot} from 'react-dom/client';import {SpellGlyph} from '/src/ui/SpellGlyph';import '/src/ui/spell-effects.css';
const rows=[['champignon',2,'Champignon · 2★'],['andromoss',4,'Andromoss · 4★'],['duskmantle',3,'Duskmantle · 3★'],['sprig',1,'Sprig · 1★']];
createRoot(document.getElementById('root')).render(<main><header><b>Time remaining</b>{[100,75,50,10,0].map(n=><span key={n}>{n}%</span>)}</header>{rows.map(([hero,tier,label])=><section key={hero}><b>{label}</b>{[1,.75,.5,.1,0].map(remaining=><figure key={remaining}><SpellGlyph character={hero} tier={tier} time={250} remaining={remaining}/></figure>)}</section>)}</main>);
`);
writeFileSync(join(out,'gallery.css'),`body{margin:0;background:#182633;color:#f0dfc7;font:16px Georgia}main{padding:18px}header,section{display:grid;grid-template-columns:174px repeat(5,108px);align-items:center;text-align:center}header{height:42px;color:#dec48e}section{height:124px;border-top:1px solid #40515d}b{text-align:left}figure{margin:0}svg{width:96px;height:96px;image-rendering:pixelated}`);
writeFileSync(join(out,'gallery.html'),'<!doctype html><html><link rel="stylesheet" href="/output/guard-flows/spell-duration/gallery.css"><div id="root"></div><script type="module" src="/output/guard-flows/spell-duration/gallery.tsx"></script></html>');
writeFileSync(join(out,'game.html'),'<!doctype html><html><meta name="viewport" content="width=device-width,initial-scale=1"><div id="root"></div><script type="module" src="/output/guard-flows/spell-duration/game.tsx"></script></html>');
writeFileSync(join(out,'game.tsx'),`
import {createRoot} from 'react-dom/client';import {Game} from '/src/ui/Game';import {Session} from '/src/game/Session';import {config} from '/src/game/config';import '/src/ui/style.css';
const q=new URLSearchParams(location.search),hero=q.get('hero')||'champignon',tier=Number(q.get('tier')||2),caster=hero==='andromoss'?1:0;
const session=new Session({characters:caster===1?['champignon',hero]:[hero,'captain-bramble'],mode:q.get('mode')||'local',difficulty:'easy',seed:41});
session.match.advance(config.countdownMs);session.match.state.players.forEach(p=>p.nextSpawn=Infinity);session.match.state.players[caster].stars=tier;
session.act({type:'cast',player:caster});
// Keep the controlled AI portrait example on the real single-board layout without bot input.
if(q.get('mode')==='ai')session.match.state.players[1].nextCast=Infinity;
createRoot(document.getElementById('root')).render(<Game session={session} leave={()=>{}}/>);
`);
const server=await createServer({server:{host:'127.0.0.1',port:4189,strictPort:true}});await server.listen();const browser=await chromium.launch();
try{
 const context=await browser.newContext({viewport:{width:750,height:574},baseURL:'http://127.0.0.1:4189'}),page=await context.newPage();await page.goto('/output/guard-flows/spell-duration/gallery.html');await expect(page.locator('.spell-glyph[data-asset=ready]')).toHaveCount(20);
 const ids=await page.locator('filter').evaluateAll(es=>es.map(e=>e.id));expect(new Set(ids).size).toBe(20);
 await page.screenshot({path:join(out,'duration-stages.png')});await context.close();
 for(const [name,width,height,hero,tier,duration,fraction,mode] of [
  ['desktop-broom-half',1280,800,'champignon',2,3000,.5,'local'],
  ['portrait-ufo-quarter',390,844,'andromoss',4,8000,.25,'ai'],
  ['landscape-cultivators-quarter',844,390,'sprig',4,4000,.25,'ai'],
 ] as const){
  const c=await browser.newContext({viewport:{width,height},baseURL:'http://127.0.0.1:4189'}),p=await c.newPage();await p.clock.install();await p.clock.pauseAt(new Date());await p.goto('/output/guard-flows/spell-duration/game.html?hero='+hero+'&tier='+tier+'&mode='+mode);await expect(p.locator('canvas')).toBeVisible();await p.clock.runFor(1500+duration*(1-fraction));
  const icons=p.locator('.spell-effects .spell-glyph[data-remaining]');await expect(icons.first()).toBeVisible();const remaining=Number(await icons.first().getAttribute('data-remaining'));expect(remaining).toBeCloseTo(fraction,1);
  const frames=await icons.evaluateAll(es=>es.map(e=>[e.getAttribute('data-frame'),e.getAttribute('data-dark-rows'),e.getAttribute('data-remaining')]));
  if(hero==='sprig'){await expect(icons).toHaveCount(2);expect(frames[0]).toEqual(frames[1]);}
  if(mode==='ai')await expect(p.locator('.match-screen')).toHaveClass(/single-board/);
  await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:join(out,name+'.png')});
  await p.getByRole('button',{name:'Pause',exact:true}).click();const paused=await icons.evaluateAll(es=>es.map(e=>e.outerHTML));await p.clock.runFor(1000);expect(await icons.evaluateAll(es=>es.map(e=>e.outerHTML))).toEqual(paused);await c.close();
 }
 console.log('20 duration-stage samples and3 real-game desktop/phone timer/pause checks passed.');
}finally{await browser.close();await server.close();}
