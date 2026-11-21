/** Real game renderer and spell rules; captures are for user visual review only. */
import { chromium,expect } from '@playwright/test';
import { createServer } from 'vite';
import { mkdirSync,writeFileSync } from 'node:fs';
import { resolve,join } from 'node:path';
const out=resolve('output/guard-flows/target-effects');mkdirSync(out,{recursive:true});
const cases=[
 ['normal','Normal mole',[]],['armor2','Bramble 2★ · 2 hits',['armor']],['armor4','Bramble 4★ · 3 hits',['armor']],
 ['curse1','Duskmantle 1★ · +8 miss',['curse']],['curse4','Duskmantle 4★ · +6 miss',['curse']],['bonus','Duskmantle 3★ · +2 kill',['bonus']],
 ['rush','Andromoss 2★ · shorter life',['rush']],['long-mole','Sprig 1★ · longer life',['tending']],['long-rabbit','Sprig 1★ · longer rabbit',['tending']],
 ['long-star','Sprig 1★ · longer star',['tending']],['dim','Duskmantle 2★ · dimmed',[]],['combo','Bramble 4★ + Duskmantle 3★',['armor','bonus']],
] as const;
writeFileSync(join(out,'game.html'),'<!doctype html><html><meta name="viewport" content="width=device-width,initial-scale=1"><div id="root"></div><script type="module" src="/output/guard-flows/target-effects/game.tsx"></script></html>');
writeFileSync(join(out,'game.tsx'),`
import {createRoot} from 'react-dom/client';import {Game} from '/src/ui/Game';import {Session} from '/src/game/Session';import {config} from '/src/game/config';import {modifyTarget} from '/src/game/targetModifiers';import '/src/ui/style.css';
const q=new URLSearchParams(location.search),sample=q.get('sample')||'normal';
const own=sample==='bonus'||sample==='combo'?'duskmantle':sample.startsWith('long')?'sprig':'champignon';
const enemy=sample.startsWith('armor')||sample==='combo'?'captain-bramble':sample.startsWith('curse')||sample==='dim'?'duskmantle':sample==='rush'?'andromoss':'captain-bramble';
const session=new Session({characters:[own,enemy],mode:q.get('mode')||'local',difficulty:'easy',seed:41}),m=session.match;m.advance(config.countdownMs);m.state.players.forEach(p=>{p.nextSpawn=Infinity;p.nextCast=0;});
const cast=(side,tier)=>{m.state.players[side].stars=tier;m.action({type:'cast',player:side});m.advance(config.spells.castFreezeMs);};
if(sample==='armor2')cast(1,2);if(sample==='armor4'||sample==='combo')cast(1,4);
if(sample==='curse1')cast(1,1);if(sample==='curse4')cast(1,4);if(sample==='dim')cast(1,2);if(sample==='rush')cast(1,2);
if(sample==='bonus'||sample==='combo')cast(0,3);if(sample.startsWith('long'))cast(0,1);
const holes=q.has('all')?[0,1,2,3,4,5,6,7,8]:[4];
for(const hole of holes){const kind=q.has('all')?(hole===5?'rabbit':hole===7?'star':'mole'):sample==='long-rabbit'?'rabbit':sample==='long-star'?'star':'mole';const target={id:100+hole,kind,born:m.state.time,expires:m.state.time+2000};m.state.players[0].holes[hole]=target;modifyTarget(m.state.players[0],target,m.state.time,true);}
m.advance(800);m.state.players[1].nextCast=Infinity;session.togglePause();session.togglePause();
createRoot(document.getElementById('root')).render(<Game session={session} leave={()=>{}}/>);
`);
const server=await createServer({server:{host:'127.0.0.1',port:4190,strictPort:true}});await server.listen();const browser=await chromium.launch();
try{
 const context=await browser.newContext({viewport:{width:1280,height:800},baseURL:'http://127.0.0.1:4190'}),page=await context.newPage();await page.clock.install();await page.clock.pauseAt(new Date());
 for(const [sample,label,statuses] of cases){
  await page.goto('/output/guard-flows/target-effects/game.html?sample='+sample);await page.waitForLoadState('networkidle');await expect(page.locator('canvas')).toBeVisible();await page.clock.runFor(100);await page.evaluate(()=>document.fonts.ready);
  const row=page.locator('.target-status-row[data-hole="4"]');
  if(statuses.length){await expect(row).toBeVisible();for(const status of statuses)await expect(row.locator(`[data-status="${status}"]`)).toBeVisible();}
  else await expect(row).toHaveCount(0);
  await expect(page.locator('.target-status .spell-backing,.target-status .spell-glyph[data-remaining]')).toHaveCount(0);
  const badge=row.locator('.spell-glyph');if(await badge.count())await expect(badge.locator('image').first()).toBeVisible();
  if(sample.startsWith('armor'))await expect(row.locator('.status-armor')).toHaveAttribute('data-value',sample==='armor2'?'2':'3');
  if(sample.startsWith('curse'))await expect(row.locator('.status-curse')).toHaveAttribute('data-value',sample==='curse1'?'8':'6');
  const hole=await page.locator('.player-0 .hole').nth(4).boundingBox();if(!hole)throw Error('Missing hole geometry');
  const center=hole.x+hole.width/2,bottom=hole.y+hole.height;
  await page.screenshot({path:join(out,sample+'.png'),clip:{x:Math.round(center-96),y:Math.round(bottom-184),width:192,height:184}});
  if(sample==='combo')await page.screenshot({path:join(out,'desktop-combined.png')});
 }
 writeFileSync(join(out,'gallery.html'),`<!doctype html><html><style>body{margin:0;background:#12212b;color:#efdfc4;font:15px Georgia}main{padding:16px}h1{font-size:23px;margin:0 0 12px}section{display:grid;grid-template-columns:repeat(4,208px)}figure{margin:0;padding:4px 8px 10px}img{width:192px;height:184px;image-rendering:pixelated;display:block}figcaption{height:35px;padding-top:5px;line-height:17px}</style><main><h1>Spell effects on targets</h1><section>${cases.map(([id,label])=>`<figure><img src="${id}.png"><figcaption>${label}</figcaption></figure>`).join('')}</section></main></html>`);
 await page.setViewportSize({width:864,height:750});await page.goto('/output/guard-flows/target-effects/gallery.html');await page.waitForLoadState('networkidle');await expect(page.locator('img')).toHaveCount(12);expect(await page.locator('img').evaluateAll(es=>es.every(e=>e instanceof HTMLImageElement&&e.complete&&e.naturalWidth===192))).toBe(true);await page.screenshot({path:join(out,'target-effects-matrix.png'),fullPage:true});await context.close();
 const mobile=await browser.newContext({viewport:{width:390,height:844},baseURL:'http://127.0.0.1:4190'}),phone=await mobile.newPage();await phone.clock.install();await phone.clock.pauseAt(new Date());await phone.goto('/output/guard-flows/target-effects/game.html?sample=combo&all&mode=ai');await phone.waitForLoadState('networkidle');await phone.clock.runFor(100);await phone.evaluate(()=>document.fonts.ready);await expect(phone.locator('.match-screen')).toHaveClass(/single-board/);await expect(phone.locator('.status-armor')).toHaveCount(3);await expect(phone.locator('.target-status-row[data-hole="0"] .status-bonus')).toBeVisible();await expect(phone.locator('.target-status .spell-backing,.target-status .spell-glyph[data-remaining]')).toHaveCount(0);await phone.screenshot({path:join(out,'phone-combined.png')});await mobile.close();
 console.log('12 real-renderer target-effect samples and phone overlapping badges captured; game code unchanged.');
}finally{await browser.close();await server.close();}
