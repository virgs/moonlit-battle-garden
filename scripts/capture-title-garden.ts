/** Record the live homescreen; no image inspection or generation. */
import { chromium,expect } from '@playwright/test';
import { createServer } from 'vite';
import { mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve,join } from 'node:path';
const out=resolve('output/guard-flows/title-garden');mkdirSync(join(out,'frames'),{recursive:true});
const server=await createServer({server:{host:'127.0.0.1',port:4193,strictPort:true}});await server.listen();const browser=await chromium.launch();
try{
 const c=await browser.newContext({viewport:{width:960,height:600},baseURL:'http://127.0.0.1:4193'}),page=await c.newPage();await page.clock.install();await page.clock.pauseAt(new Date());await page.goto('/');await page.waitForLoadState('networkidle');await page.evaluate(()=>document.fonts.ready);const scene=page.locator('.title-garden');await expect(scene).toHaveAttribute('data-ready','true');await expect(page.getByText('A garden rivalry',{exact:true})).toHaveCount(0);const heading=await page.locator('.title-wordmark').boundingBox();
 const camera:number[]=[];
 for(let frame=0;frame<=160;frame++){
  camera.push(Number(await scene.getAttribute('data-camera')));await page.screenshot({path:join(out,'frames',String(frame).padStart(3,'0')+'.png')});
  if(frame===0||frame===80||frame===120)await page.screenshot({path:join(out,frame===0?'desktop-start.png':frame===80?'desktop-turnaround.png':'desktop-return.png')});
  if(frame<160)await page.clock.runFor(125);
 }
 expect(camera[0]).toBeCloseTo(0);expect(camera[80]).toBeGreaterThan(139);expect(camera[120]).toBeLessThan(camera[80]);expect(camera[160]).toBeLessThan(1);expect(await page.locator('.title-wordmark').boundingBox()).toEqual(heading);
 execFileSync('ffmpeg',['-y','-framerate','8','-i',join(out,'frames','%03d.png'),'-filter_complex','scale=720:-1:flags=neighbor,split[a][b];[a]palettegen[p];[b][p]paletteuse','-loop','0',join(out,'homescreen-ping-pong.gif')],{stdio:'ignore'});
 await page.getByRole('button',{name:'Open main menu',exact:true}).click();await expect(scene).toHaveCount(0);await expect(page.getByRole('main',{name:'Main menu'})).toBeVisible();await c.close();
 for(const [name,width,height] of [['portrait',390,844],['landscape',844,390]] as const){
  const context=await browser.newContext({viewport:{width,height},baseURL:'http://127.0.0.1:4193'}),p=await context.newPage();await p.clock.install();await p.clock.pauseAt(new Date());await p.goto('/');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await expect(p.locator('.title-garden')).toHaveAttribute('data-ready','true');await p.clock.runFor(6000);await p.screenshot({path:join(out,name+'.png')});expect(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await p.emulateMedia({reducedMotion:'reduce'});await expect(p.locator('.title-garden')).toHaveAttribute('data-reduced','true');const still=await p.locator('.title-garden').getAttribute('data-camera');await p.clock.runFor(3000);await expect(p.locator('.title-garden')).toHaveAttribute('data-camera',still!);await context.close();
 }
 console.log('Live20s ping-pong loop, parallax scene, fixed title, menu exit, phones and reduced-motion checks passed.');
}finally{await browser.close();await server.close();}
