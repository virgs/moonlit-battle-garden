/** Review the current column spells with real casts and controlled arrivals. No game changes. */
import { chromium,expect } from '@playwright/test';
import { createServer } from 'vite';
import { mkdirSync,writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve,join } from 'node:path';
const out=resolve('output/guard-flows/column-spells');mkdirSync(out,{recursive:true});
writeFileSync(join(out,'review.html'),'<!doctype html><html><meta name="viewport" content="width=device-width,initial-scale=1"><div id="root"></div><script type="module" src="/output/guard-flows/column-spells/review.tsx"></script></html>');
writeFileSync(join(out,'review.tsx'),`
import {createRoot} from 'react-dom/client';import {Game} from '/src/ui/Game';import {Session} from '/src/game/Session';import {config} from '/src/game/config';import {modifyTarget} from '/src/game/targetModifiers';import '/src/ui/style.css';
const q=new URLSearchParams(location.search),hero=q.get('hero')||'champignon',tier=Number(q.get('tier')||2),session=new Session({characters:[hero,'captain-bramble'],mode:'local',difficulty:'easy',seed:41}),m=session.match;m.advance(config.countdownMs);m.state.players.forEach(p=>p.nextSpawn=Infinity);
let id=200;const spawn=(hole,kind,age=0)=>{const target={id:id++,kind,born:m.state.time-age,expires:m.state.time+5000};m.state.players[0].holes[hole]=target;modifyTarget(m.state.players[0],target,m.state.time,true);};
for(let hole=0;hole<9;hole++)spawn(hole,hole%3===0?['mole','star','rabbit'][Math.floor(hole/3)]:hole%3===1?'rabbit':'mole',800);
m.state.players[0].stars=tier;session.togglePause();session.togglePause();
window.columnReview={arrive(){const p=m.state.players[0],columns=hero==='champignon'?p.sweepColumns:p.automationColumns,before={score:p.score,stars:p.stars};for(const col of columns)for(let row=0;row<3;row++)spawn(col+row*3,['mole','star','rabbit'][row]);session.togglePause();session.togglePause();return {before,columns};},inspect(){const p=m.state.players[0];return {score:p.score,stars:p.stars,empty:(hero==='champignon'?p.sweepColumns:p.automationColumns).every(col=>[col,col+3,col+6].every(h=>!p.holes[h]))};}};
createRoot(document.getElementById('root')).render(<Game session={session} leave={()=>{}}/>);
`);
const server=await createServer({server:{host:'127.0.0.1',port:4194,strictPort:true}});await server.listen();const browser=await chromium.launch();
try{
 for(const [hero,tier,duration] of [['champignon',2,3000],['champignon',4,6000],['sprig',2,4000],['sprig',4,4000]] as const){
  const name=hero+'-'+tier,frames=join(out,name+'-frames');mkdirSync(frames,{recursive:true});
  const context=await browser.newContext({viewport:{width:1280,height:800},baseURL:'http://127.0.0.1:4194'}),page=await context.newPage();await page.clock.install();await page.clock.pauseAt(new Date());await page.goto('/output/guard-flows/column-spells/review.html?hero='+hero+'&tier='+tier);await page.waitForLoadState('networkidle');await page.evaluate(()=>document.fonts.ready);await page.clock.runFor(100);
  const garden=page.locator('.player-0'),attribute=hero==='champignon'?'data-sweep-columns':'data-automation-columns',effect=page.locator(hero==='champignon'?'.effect-sweep':'.effect-automation');
  const count=Math.ceil((2000+duration+500)/125);
  for(let frame=0;frame<=count;frame++){
   if(frame===4){await garden.locator('.cast-button').click();await expect(page.locator('.cast-stars')).toHaveAttribute('data-cost',String(tier));const columns=(await garden.getAttribute(attribute))!.split(',');expect(columns.length).toBe(hero==='sprig'&&tier===4?2:1);}
   if(frame===21){
    const seeded=await page.evaluate(()=> (window as unknown as {columnReview:{arrive:()=>{before:{score:number;stars:number};columns:number[]}}}).columnReview.arrive());await page.clock.runFor(100);
    const after=await page.evaluate(()=> (window as unknown as {columnReview:{inspect:()=>{score:number;stars:number;empty:boolean}}}).columnReview.inspect());expect(after.empty).toBe(true);expect(after.score-seeded.before.score).toBe(23*seeded.columns.length);expect(after.stars-seeded.before.stars).toBe(seeded.columns.length);
   }
   if(frame===24){await expect(effect).toBeVisible();await page.screenshot({path:join(out,name+'-active.png')});}
   await page.screenshot({path:join(frames,String(frame).padStart(3,'0')+'.png')});await page.clock.runFor(125);
  }
  await expect(effect).toHaveCount(0);
  execFileSync('ffmpeg',['-y','-framerate','8','-i',join(frames,'%03d.png'),'-filter_complex','scale=960:-1:flags=neighbor,split[a][b];[a]palettegen[p];[b][p]paletteuse','-loop','0',join(out,name+'-flow.gif')],{stdio:'ignore'});await context.close();
 }
 console.log('All4 column casts recorded: correct column count, immediate arrivals, normal mole/star/rabbit rewards, star collection and expiry verified.');
}finally{await browser.close();await server.close();}
