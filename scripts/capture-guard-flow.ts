/** Record actual UI input and simulation frames; visual review stays with the user. */
import { chromium,expect } from '@playwright/test';
import { createServer } from 'vite';
import { mkdirSync,copyFileSync,rmSync,writeFileSync } from 'node:fs';
import { resolve,join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { openSelection,chooseCharacter,enterMatch } from '../tests/e2e/frontMenu';

const output=resolve('output/guard-flows');mkdirSync(output,{recursive:true});
const server=await createServer({server:{host:'127.0.0.1',port:4186,strictPort:true}});await server.listen();
const browser=await chromium.launch();
const captures=[];
try {
  for(const hero of ['champignon','captain-bramble'] as const){
    const context=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:1,baseURL:'http://127.0.0.1:4186'});
    try {
      const page=await context.newPage();await page.clock.install();await openSelection(page,'local');
      await chooseCharacter(page,'Player 1',hero);await chooseCharacter(page,'Player 2',hero==='champignon'?'captain-bramble':'champignon');await enterMatch(page);
      const own=page.locator('.player-0');await expect(own.locator('.cast-button')).toBeVisible();await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())+1000));
      for(let n=0;n<250;n++){
        for(const id of [0,1]){
          const panel=page.locator(`.player-${id}`),charge=await panel.locator('.cast-button').getAttribute('aria-label');
          const star=panel.locator('.hole[data-kind="star"]:enabled');if(charge?.includes('(0 stars)')&&await star.count())await star.first().click();
        }
        if((await own.locator('.cast-button').getAttribute('aria-label'))?.includes('(1 stars)'))break;
        await page.clock.runFor(100);
      }
      await expect(own.locator('.cast-button')).toHaveAccessibleName('Cast magic (1 stars)');await page.evaluate(()=>document.fonts.ready);
      const frames=join(output,`${hero}-frames`);mkdirSync(frames,{recursive:true});let frame=0;
      const capture=async()=>{const file=join(frames,`${String(frame++).padStart(3,'0')}.png`);await page.screenshot({path:file,scale:'css'});return file;};
      const before=await capture();copyFileSync(before,join(output,`${hero}-before.png`));await capture();await capture();
      await own.locator('.cast-button').click();await expect(page.locator('.cast-stars')).toHaveAttribute('data-cost','1');await page.mouse.move(1,799);
      let castSeen=false,effectSeen=false;
      for(let n=0;n<40;n++){
        if(n)await page.clock.runFor(100);
        const file=await capture();
        if(n===5){await expect(page.locator(`.cast-banner[data-character="${hero}"]`)).toBeVisible();copyFileSync(file,join(output,`${hero}-casting.png`));castSeen=true;}
        const effect=page.locator(`.one-star-effect[data-character="${hero}"]`);
        if(!effectSeen&&await effect.locator('.one-star-sprite[data-asset="ready"]').count()){
          await expect(effect).toHaveAttribute('data-affected-player','0');copyFileSync(file,join(output,`${hero}-effect.png`));effectSeen=true;
        }
      }
      expect(castSeen&&effectSeen).toBe(true);await capture();await capture();await capture();
      execFileSync('ffmpeg',['-y','-framerate','10','-i',join(frames,'%03d.png'),'-filter_complex','[0:v]split[a][b];[a]palettegen=stats_mode=diff[p];[b][p]paletteuse=dither=none','-loop','0',join(output,`${hero}-1-star-flow.gif`)],{stdio:'ignore'});
      rmSync(frames,{recursive:true,force:true});captures.push({hero,frames:frame,fps:10,width:1280,height:800,castSeen,effectSeen});console.log(`${hero}: recorded casting, star cost and board effect (${frame} frames)`);
    }finally{await context.close();}
  }
  writeFileSync(join(output,'capture.json'),JSON.stringify({note:'Actual game screens, no generated/composited scenes; no assistant visual review.',captures},null,2)+'\n');
}finally{await browser.close();await server.close();}
