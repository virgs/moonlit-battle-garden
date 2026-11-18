import { expect, test } from '@playwright/test';
import { openSelection } from './frontMenu';

declare global { interface Window { homeAudio?: HTMLAudioElement[] } }

for(const character of ['champignon','andromoss'] as const)test(`${character}: sourced home art and music load and the real track loops`,async({page})=>{
  const failed:string[]=[];
  page.on('response',response=>{if(response.url().includes('/assets/homes/')&&response.status()>=400)failed.push(response.url());});
  await page.addInitScript(()=>{
    const Native=window.Audio,elements:HTMLAudioElement[]=[];
    Object.defineProperty(window,'homeAudio',{value:elements});
    const Tracked=function(src?:string){const audio=new Native(src);elements.push(audio);return audio;};
    Tracked.prototype=Native.prototype;window.Audio=Tracked as unknown as typeof Audio;
  });
  await openSelection(page);
  if(character==='champignon'){
    await page.getByRole('button',{name:'Change selection for Computer'}).click();
    await page.getByRole('button',{name:'Next character for Computer'}).click();
    await page.getByRole('button',{name:'Confirm Computer'}).click();
  }else await page.getByRole('button',{name:'Next character for Player 1'}).click();
  await page.getByRole('button',{name:'Confirm Player 1'}).click();
  await page.getByRole('button',{name:'Enter the garden',exact:true}).click();
  await expect(page.locator('canvas')).toHaveAttribute('data-home-background',`/assets/homes/${character}/background.png`);
  const playback=()=>page.evaluate(()=>{
    const elements=(window.homeAudio??[]);
    const audio=elements.find(item=>item.src.includes('/assets/homes/'));
    return audio?{src:audio.src,time:audio.currentTime,duration:audio.duration,paused:audio.paused,loop:audio.loop}:null;
  });
  await expect.poll(async()=>{const audio=await playback();return !!audio&&audio.time>0&&!audio.paused&&Number.isFinite(audio.duration);}).toBe(true);
  expect((await playback())?.src).toContain(`/assets/homes/${character}/music.mp3`);
  expect((await playback())?.loop).toBe(true);
  await page.evaluate(()=>{
    const audio=(window.homeAudio??[]).find(item=>item.src.includes('/assets/homes/'))!;
    audio.currentTime=audio.duration-0.15;
  });
  await expect.poll(async()=>(await playback())?.time??Infinity).toBeLessThan(3);
  await page.getByRole('button',{name:'Pause',exact:true}).click();
  await expect.poll(async()=>(await playback())?.paused).toBe(true);
  expect(failed).toEqual([]);
});
