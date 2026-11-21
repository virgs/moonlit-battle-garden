/** User reviews visuals; checks here cover motifs, clock behavior and actual cast flow. */
import { chromium,expect } from '@playwright/test';
import { createServer } from 'vite';
import { mkdirSync,writeFileSync,appendFileSync } from 'node:fs';
import { resolve,join } from 'node:path';
import { execFileSync } from 'node:child_process';
const out=resolve('output/guard-flows/higher-spells');mkdirSync(out,{recursive:true});
writeFileSync(join(out,'gallery.html'),`<!doctype html><html><meta name="viewport" content="width=device-width,initial-scale=1"><div id="root"></div><script type="module" src="/output/guard-flows/higher-spells/gallery.tsx"></script></html>`);
writeFileSync(join(out,'gallery.tsx'),`
import {createRoot} from 'react-dom/client';import {useState,useEffect} from 'react';
import {SpellGlyph,spellMotifs} from '/src/ui/SpellGlyph';
const names={'champignon':'Sir Champignon','andromoss':'Andromoss','captain-bramble':'Captain Bramble','duskmantle':'Duskmantle','sprig':'Sprig'};
function Gallery(){const [time,setTime]=useState(0);useEffect(()=>{const timer=setInterval(()=>setTime(t=>t+125),125);return()=>clearInterval(timer)},[]);return <main><header><b>Moonlit Battle Garden</b><span>2 stars</span><span>3 stars</span><span>4 stars</span></header>{Object.keys(spellMotifs).map(hero=><section key={hero}><b>{names[hero]}</b>{[2,3,4].map(tier=><figure key={tier}><SpellGlyph character={hero} tier={tier} time={time}/><figcaption>{spellMotifs[hero][tier].replaceAll('-',' ')}</figcaption></figure>)}</section>)}</main>}
createRoot(document.getElementById('root')).render(<Gallery/>);
`);
writeFileSync(join(out,'gallery.css'),`body{margin:0;background:#111d29;color:#e9dbc5;font:18px Georgia}main{padding:16px}header,section{display:grid;grid-template-columns:190px repeat(3,180px);align-items:center;text-align:center}header{height:54px;color:#d8c58f}section{height:132px;border-top:1px solid #34434c}figure{margin:0}svg{width:96px;height:96px;image-rendering:pixelated}figcaption{font-size:13px;color:#b6c8c5}b{text-align:left;padding-left:8px}`);
appendFileSync(join(out,'gallery.html'),'<link rel="stylesheet" href="/output/guard-flows/higher-spells/gallery.css">');
writeFileSync(join(out,'flow.html'),'<!doctype html><html><meta name="viewport" content="width=device-width,initial-scale=1"><div id="root"></div><script type="module" src="/output/guard-flows/higher-spells/flow.tsx"></script></html>');
writeFileSync(join(out,'flow.tsx'),`
import {createRoot} from 'react-dom/client';import {Game} from '/src/ui/Game';import {Session} from '/src/game/Session';import {config} from '/src/game/config';import '/src/ui/style.css';
const params=new URLSearchParams(location.search),hero=params.get('hero')||'sprig',tier=Number(params.get('tier')||4);
const session=new Session({characters:[hero,'champignon'],mode:params.get('mode')||'local',difficulty:'easy',seed:41});session.match.advance(config.countdownMs);session.match.state.players[0].stars=tier;session.match.state.players[1].stars=0;session.togglePause();session.togglePause();
createRoot(document.getElementById('root')).render(<Game session={session} leave={()=>{}}/>);
`);
const server=await createServer({server:{host:'127.0.0.1',port:4188,strictPort:true}});await server.listen();const browser=await chromium.launch();
try{
 const context=await browser.newContext({viewport:{width:762,height:746},baseURL:'http://127.0.0.1:4188'}),page=await context.newPage();await page.clock.install();await page.goto('/output/guard-flows/higher-spells/gallery.html');await expect(page.locator('.spell-glyph')).toHaveCount(15);await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())+100));
 const motifs=await page.locator('.spell-glyph').evaluateAll(elements=>elements.map(e=>e.getAttribute('data-motif')));expect(new Set(motifs).size).toBe(15);
 for(let frame=0;frame<8;frame++){await page.screenshot({path:join(out,`gallery-${frame}.png`)});await page.clock.runFor(125);}
 execFileSync('ffmpeg',['-y','-framerate','8','-i',join(out,'gallery-%d.png'),'-filter_complex','split[a][b];[a]palettegen[p];[b][p]paletteuse','-loop','0',join(out,'all-spells.gif')],{stdio:'ignore'});
 await page.emulateMedia({reducedMotion:'reduce'});await page.clock.runFor(125);expect(await page.locator('.spell-glyph').evaluateAll(es=>es.every(e=>e.getAttribute('data-frame')==='0'))).toBe(true);await context.close();
 for(const [name,width,height,hero,tier] of [['desktop',1280,800,'sprig',4],['portrait',390,844,'captain-bramble',4],['landscape',844,390,'duskmantle',4]] as const){
  const c=await browser.newContext({viewport:{width,height},baseURL:'http://127.0.0.1:4188'}),p=await c.newPage();await p.clock.install();await p.goto('/output/guard-flows/higher-spells/flow.html?hero='+hero+'&tier='+tier+'&mode='+(name==='desktop'?'local':'ai'));await expect(p.locator('canvas')).toBeVisible();await p.clock.pauseAt(new Date(await p.evaluate(()=>Date.now())+200));await p.locator('.player-0 .cast-button').click();await expect(p.locator('.cast-stars')).toHaveAttribute('data-cost','4');await p.clock.runFor(500);await p.screenshot({path:join(out,name+'-casting.png')});await p.clock.runFor(1400);
  for(let n=0;n<30&&!await p.locator('.spell-glyph').count();n++)await p.clock.runFor(100);
  await expect(p.locator('.spell-glyph').first()).toBeVisible();if(name!=='desktop'){await expect(p.locator('.match-screen')).toHaveClass(/single-board/);await expect(p.locator('.hidden-board-effect .spell-glyph').first()).toBeVisible();}await p.screenshot({path:join(out,name+'-gameplay.png')});
  await p.getByRole('button',{name:'Pause',exact:true}).click();const frozen=await p.locator('.spell-glyph').evaluateAll(es=>es.map(e=>e.outerHTML));await p.clock.runFor(1000);expect(await p.locator('.spell-glyph').evaluateAll(es=>es.map(e=>e.outerHTML))).toEqual(frozen);await c.close();
 }
 console.log('15 unique animated motifs, reduced motion, and three actual cast/pause/viewport checks passed.');
}finally{await browser.close();await server.close();}
