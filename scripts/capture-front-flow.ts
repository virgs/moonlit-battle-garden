/** Record current screen flow for discussion; no title/menu behavior changes. */
import { chromium,expect } from '@playwright/test';
import { createServer } from 'vite';
import { mkdirSync } from 'node:fs';
import { resolve,join } from 'node:path';
const out=resolve('output/guard-flows/front-flow');mkdirSync(out,{recursive:true});
const server=await createServer({server:{host:'127.0.0.1',port:4191,strictPort:true}});await server.listen();const browser=await chromium.launch();
try{
 for(const [name,width,height] of [['desktop',1280,800],['portrait',390,844],['landscape',844,390]] as const){
  const context=await browser.newContext({viewport:{width,height},baseURL:'http://127.0.0.1:4191'}),page=await context.newPage();await page.goto('/');await page.waitForLoadState('networkidle');await page.evaluate(()=>document.fonts.ready);await expect(page.getByRole('main',{name:'Title screen'})).toBeVisible();
  const title=await page.locator('.title-wordmark').boundingBox();expect(title!.x).toBeGreaterThanOrEqual(0);expect(title!.x+title!.width).toBeLessThanOrEqual(width+1);
  await page.screenshot({path:join(out,'title-'+name+'.png')});
  if(name==='desktop'){
   await page.getByRole('button',{name:'Open main menu',exact:true}).click();await expect(page.getByRole('main',{name:'Main menu'})).toBeVisible();await page.screenshot({path:join(out,'main-menu-desktop.png')});
   await page.getByRole('button',{name:/Choose characters/}).click();await expect(page.locator('.character-carousel')).toHaveCount(2);await page.screenshot({path:join(out,'character-selection-desktop.png')});
  }
  await context.close();
 }
 console.log('Current title at3 viewports, main menu and character-selection flow captured.');
}finally{await browser.close();await server.close();}
