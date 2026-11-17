import { expect, test } from '@playwright/test';
import { soundFiles } from '../../src/presentation/soundFiles';

test('audio is enabled on entry and the recovered effects decode and play through native Web Audio', async ({ page }) => {
  await page.addInitScript(()=>{
    const stats={decoded:0,started:0,failed:0,contexts:[] as AudioContext[]};
    Object.assign(window,{audioStats:stats});
    const Original=window.AudioContext;
    window.AudioContext=class extends Original{constructor(...args:ConstructorParameters<typeof AudioContext>){super(...args);stats.contexts.push(this)}};
    const decode=Original.prototype.decodeAudioData;
    Original.prototype.decodeAudioData=function(...args:Parameters<typeof decode>){return decode.apply(this,args).then(buffer=>{stats.decoded++;return buffer},error=>{stats.failed++;throw error})};
    const start=AudioBufferSourceNode.prototype.start;
    AudioBufferSourceNode.prototype.start=function(...args:Parameters<typeof start>){stats.started++;return start.apply(this,args)};
  });
  await page.goto('/');await page.getByRole('button',{name:/Enter the garden/}).click();
  const stats=()=>page.evaluate(()=>{const s=(window as unknown as Window & {audioStats:{decoded:number;started:number;failed:number;contexts:AudioContext[]}}).audioStats;return{decoded:s.decoded,started:s.started,failed:s.failed,running:s.contexts.some(c=>c.state==='running')}});
  await expect.poll(async()=>(await stats()).running).toBe(true);
  const expected=new Set(Object.values(soundFiles).flat()).size;
  await expect.poll(async()=>(await stats()).decoded,{timeout:15000}).toBe(expected);
  expect((await stats()).failed).toBe(0);
  await expect.poll(async()=>(await stats()).started,{timeout:7000}).toBeGreaterThan(0);
  const before=(await stats()).started;
  await page.locator('.player-0 .hole[data-kind="mole"]').first().click();
  await expect.poll(async()=>(await stats()).started).toBeGreaterThan(before);
  await page.getByRole('button',{name:'Pause',exact:true}).click();
  await expect(page.getByRole('button',{name:'Mute',exact:true})).toBeVisible();
});
