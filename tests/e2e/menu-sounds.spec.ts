import {expect,test,type Page} from '@playwright/test';
import {enterMatch} from './frontMenu';
async function instrument(page:Page,muted=false){
 await page.addInitScript(muted=>{
  if(muted)localStorage.setItem('moonlit-sound','off');
  const played:string[]=[],bytes=new WeakMap<ArrayBuffer,string>(),buffers=new WeakMap<AudioBuffer,string>();Object.assign(window,{menuSoundsPlayed:played});
  const originalFetch=window.fetch;
  window.fetch=async(...args:Parameters<typeof fetch>)=>{const response=await originalFetch(...args),url=String(args[0]);if(url.includes('/assets/sfx/menu/')){const read=response.arrayBuffer.bind(response);response.arrayBuffer=async()=>{const data=await read();bytes.set(data,url);return data;};}return response;};
  const decode=AudioContext.prototype.decodeAudioData;
  AudioContext.prototype.decodeAudioData=function(...args:Parameters<typeof decode>){const src=bytes.get(args[0]);return decode.apply(this,args).then(buffer=>{if(src)buffers.set(buffer,src);return buffer;});};
  const start=AudioBufferSourceNode.prototype.start;
  AudioBufferSourceNode.prototype.start=function(...args:Parameters<typeof start>){const src=this.buffer&&buffers.get(this.buffer);if(src)played.push(src);return start.apply(this,args);};
 },muted);
}
const sounds=(page:Page)=>page.evaluate(()=>(window as unknown as {menuSoundsPlayed:string[]}).menuSoundsPlayed.map(src=>src.split('/').at(-1)!));
async function count(page:Page,file:string,n:number){await expect.poll(async()=>(await sounds(page)).filter(s=>s===file+'.wav').length).toBe(n);}

test('navigation, arrows, confirmation, backtracking and pause actions each play their own cue once',async({page})=>{
 await instrument(page);await page.goto('/');expect(await sounds(page)).toEqual([]);await page.keyboard.press('Enter');await count(page,'confirm',1);
 await page.keyboard.press('ArrowDown');await count(page,'move',1);await page.keyboard.press('ArrowUp');await count(page,'move',2);await page.getByRole('button',{name:'Confirm mode',exact:true}).click();await count(page,'confirm',2);
 await page.keyboard.press('ArrowRight');await count(page,'move',3);await page.getByRole('button',{name:'Next character for Player 1',exact:true}).click();await count(page,'move',4);
 await page.keyboard.press('Enter');await count(page,'confirm',3);await page.getByRole('button',{name:'Next character for Computer',exact:true}).click();await count(page,'move',5);await page.keyboard.press('Enter');await count(page,'confirm',4);await page.keyboard.press('ArrowRight');await count(page,'move',6);
 for(let n=1;n<=3;n++){await page.keyboard.press('Escape');await count(page,'back',n);}
 await page.getByRole('button',{name:'Confirm mode',exact:true}).click();await enterMatch(page);await expect(page.locator('.arena-canvas canvas')).toBeVisible();await count(page,'confirm',8);
 await page.getByRole('button',{name:'Pause',exact:true}).click();await count(page,'confirm',9);await page.keyboard.press('ArrowDown');await count(page,'move',7);await page.keyboard.press('Enter');await expect(page.getByRole('button',{name:'Unmute',exact:true})).toBeVisible();
 const muted=await sounds(page);await page.keyboard.press('ArrowDown');await page.keyboard.press('ArrowUp');expect(await sounds(page)).toEqual(muted);await page.keyboard.press('Enter');await count(page,'confirm',10);await page.keyboard.press('Escape');await count(page,'back',4);
 await page.keyboard.press('Escape');await page.getByRole('button',{name:'Quit',exact:true}).click();await count(page,'back',5);await expect(page.getByRole('main',{name:'Main menu'})).toBeVisible();
});

test('persisted mute also silences front screens; unmute restores feedback and invalid invites get an error',async({page})=>{
 await instrument(page,true);await page.goto('/');await page.keyboard.press('Enter');await page.keyboard.press('ArrowDown');await page.keyboard.press('ArrowUp');await page.getByRole('button',{name:'Confirm mode',exact:true}).click();await page.keyboard.press('ArrowRight');await enterMatch(page);await expect(page.locator('.arena-canvas canvas')).toBeVisible();await page.keyboard.press('Escape');await page.getByRole('button',{name:'Unmute',exact:true}).click();await count(page,'confirm',1);expect(await sounds(page)).toEqual(['confirm.wav']);
 await page.getByRole('button',{name:'Quit',exact:true}).click();await page.getByRole('button',{name:'Beyond the Hedge',exact:true}).click();await page.getByRole('textbox',{name:'Friend’s invite'}).fill('invalid invite');await page.getByRole('button',{name:'Join garden',exact:true}).click();await count(page,'error',1);await expect(page.getByRole('status')).toHaveText('Paste a valid garden invite link or room ID.');
});
