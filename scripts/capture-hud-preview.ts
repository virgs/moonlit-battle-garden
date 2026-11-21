/** Capture a real 1–1 Match through the standard Game renderer, without changing production starts. */
import { chromium,expect } from '@playwright/test';
import { createServer } from 'vite';
import { mkdirSync,writeFileSync } from 'node:fs';
import { resolve,join } from 'node:path';
const output=resolve('output/guard-flows');mkdirSync(output,{recursive:true});
writeFileSync(join(output,'hud-preview.html'),'<!doctype html><html><meta name="viewport" content="width=device-width,initial-scale=1"><div id="root"></div><script type="module" src="/output/guard-flows/hud-preview.tsx"></script></html>');
writeFileSync(join(output,'hud-preview.tsx'),`
import {createRoot} from 'react-dom/client';
import {Game} from '/src/ui/Game';
import {Session} from '/src/game/Session';
import {config} from '/src/game/config';
import '/src/ui/style.css';
const mode=new URLSearchParams(location.search).get('mode')==='local'?'local':'ai';
const session=new Session({characters:['champignon','captain-bramble'],mode,difficulty:'medium',seed:41});
for(const loser of [0,1] as const){
 session.match.advance(config.countdownMs);
 for(let n=0;n<100&&session.match.state.phase==='playing';n++)session.match.action({type:'hit',player:loser,hole:8});
 if(session.match.state.phase!=='round-over')throw Error('Preview round did not finish');
 session.match.nextRound();
}
session.match.advance(config.countdownMs);session.togglePause();session.togglePause();
createRoot(document.getElementById('root')!).render(<Game session={session} leave={()=>{}}/>);
`);
const server=await createServer({server:{host:'127.0.0.1',port:4187,strictPort:true}});await server.listen();const browser=await chromium.launch();
try{
 for(const [name,width,height,mode] of [['desktop',1280,800,'local'],['portrait',390,844,'ai'],['landscape',844,390,'ai'],['small',320,568,'ai'],['compact-landscape',667,375,'ai']] as const){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1,baseURL:'http://127.0.0.1:4187'});
  try{
   const page=await context.newPage();await page.clock.install();await page.goto(`/output/guard-flows/hud-preview.html?mode=${mode}`);await expect(page.locator('canvas')).toBeVisible();await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())+1000));await page.clock.runFor(700);await page.evaluate(()=>document.fonts.ready);
   await expect(page.locator('.score-trophies .trophy-art[data-wins="1"]')).toHaveCount(2);await expect(page.locator('.match-round-number,.round-number')).toHaveCount(0);
   const alignment=await page.locator('.score-legend>span').evaluateAll(pairs=>pairs.map(pair=>{
     const icon=pair.querySelector('.character-icon')!.getBoundingClientRect(),title=pair.querySelector('.hero-name-text')!.getBoundingClientRect(),trophy=pair.querySelector('.trophy-art')!.getBoundingClientRect();
     return {iconCenter:icon.x+icon.width/2,trophyCenter:trophy.x+trophy.width/2,after:Math.max(icon.bottom,title.bottom),top:trophy.top,left:trophy.left,right:trophy.right};
   }));
   for(const item of alignment){expect(item.trophyCenter).toBeCloseTo(item.iconCenter,1);expect(item.top).toBeGreaterThanOrEqual(item.after);expect(item.left).toBeGreaterThanOrEqual(0);expect(item.right).toBeLessThanOrEqual(width);}
   await page.screenshot({path:join(output,`hud-trophies-${name}.png`),scale:'css'});console.log(`${name}: ${width}x${height}, one real round win per side`);
  }finally{await context.close();}
 }
}finally{await browser.close();await server.close();}
