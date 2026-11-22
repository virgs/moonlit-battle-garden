/** Review supporting VFX via real casts, magic arrivals and player hits. */
import { chromium,expect } from '@playwright/test';
import { createServer } from 'vite';
import { mkdirSync,writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve,join } from 'node:path';
const out=resolve('output/guard-flows/spell-choreography');mkdirSync(out,{recursive:true});
writeFileSync(join(out,'review.html'),'<!doctype html><html><div id="root"></div><script type="module" src="/output/guard-flows/spell-choreography/review.tsx"></script></html>');
writeFileSync(join(out,'review.tsx'),`
import {createRoot} from 'react-dom/client';import {Game} from '/src/ui/Game';import {Session} from '/src/game/Session';import {config} from '/src/game/config';import {modifyTarget} from '/src/game/targetModifiers';import '/src/ui/style.css';
const sample=new URLSearchParams(location.search).get('sample'),pressure=sample==='pressure',hero=pressure?'champignon':sample==='souls'?'duskmantle':sample==='ward'?'sprig':'captain-bramble',session=new Session({characters:[hero,pressure?'andromoss':sample==='ward'?'duskmantle':'champignon'],mode:'local',difficulty:'hard',seed:41}),m=session.match;m.advance(config.countdownMs);m.state.players.forEach(p=>p.nextSpawn=Infinity);m.state.players[pressure?1:0].stars=pressure?4:3;
if(pressure)m.action({type:'cast',player:1});
if(sample==='ward'){m.state.players[1].stars=1;m.action({type:'cast',player:1});m.advance(config.spells.castFreezeMs);}
for(const hole of [0,4,6]){const target={id:500+hole,kind:'mole',born:m.state.time-(pressure?0:800),expires:m.state.time+6000};m.state.players[0].holes[hole]=target;modifyTarget(m.state.players[0],target,m.state.time,true);}
session.togglePause();session.togglePause();createRoot(document.getElementById('root')).render(<Game session={session} leave={()=>{}}/>);
`);
const server=await createServer({server:{host:'127.0.0.1',port:4195,strictPort:true}});await server.listen();const browser=await chromium.launch();
try{
 const only=process.argv.find(arg=>arg.startsWith('--only='))?.slice(7);
 for(const sample of ['souls','barrier','pressure','ward'].filter(name=>!only||only===name)){
  const dir=join(out,sample+'-frames');mkdirSync(dir,{recursive:true});const context=await browser.newContext({viewport:{width:1280,height:800},baseURL:'http://127.0.0.1:4195'}),page=await context.newPage();await page.clock.install();await page.clock.pauseAt(new Date());await page.goto('/output/guard-flows/spell-choreography/review.html?sample='+sample);await page.waitForLoadState('networkidle');await page.evaluate(()=>document.fonts.ready);
  for(let frame=0;frame<52;frame++){
   if(frame===4&&sample!=='pressure')await page.locator('.player-0 .cast-button').click();
   if((frame===23||frame===32)&&sample==='souls'){await page.locator('.player-0 .hole').nth(frame===23?0:4).dispatchEvent('pointerdown',{button:0});}
   if((frame===23||frame===32)&&sample==='barrier'){await page.locator('.player-0 .hole[data-kind="empty"]').first().dispatchEvent('pointerdown',{button:0});}
   if(frame===20&&sample==='ward'){await expect(page.locator('.target-status.status-curse')).toHaveCount(0);await expect(page.locator('.effect-ward')).toBeVisible();}
   if(frame===26){await expect(page.locator('.board-spell-scene').first()).toBeVisible();await page.screenshot({path:join(out,sample+'-active.png')});}
   await page.screenshot({path:join(dir,String(frame).padStart(3,'0')+'.png')});await page.clock.runFor(125);
  }
  if(sample==='barrier')await expect(page.locator('.player-0')).toHaveAttribute('data-guard-charges','3');
  execFileSync('ffmpeg',['-y','-framerate','8','-i',join(dir,'%03d.png'),'-filter_complex','scale=960:-1:flags=neighbor,split[a][b];[a]palettegen[p];[b][p]paletteuse','-loop','0',join(out,sample+'-flow.gif')],{stdio:'ignore'});await context.close();
 }
 console.log('Requested real spell choreography captured: rewards, barriers, pressure and/or cleanse ward.');
}finally{await browser.close();await server.close();}
