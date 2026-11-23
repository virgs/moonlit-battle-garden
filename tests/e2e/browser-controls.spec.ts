import { expect,test,type Page } from '@playwright/test';
import { keyboardLayouts } from '../../src/game/controls';
import { enterMatch } from './frontMenu';
import type { ReactiveReview } from '../fixtures/reactive-spells';

async function tabDoesNothing(page:Page){
 const focused=await page.evaluateHandle(()=>document.activeElement);
 for(const key of ['Tab','Shift+Tab']){await page.keyboard.press(key);expect(await focused.evaluate(element=>element===document.activeElement)).toBe(true);}
 await focused.dispose();
}

test('Tab is inert on title, menus, character selection, arena and pause; game text cannot be selected',async({page})=>{
 await page.goto('/');await expect(page.getByRole('main',{name:'Title screen'})).toBeVisible();await tabDoesNothing(page);await expect(page.getByRole('main',{name:'Title screen'})).toBeVisible();
 await page.getByRole('button',{name:'Open main menu'}).click();await tabDoesNothing(page);
 await page.locator('.front-panel .mode-title').dblclick();expect(await page.evaluate(()=>getSelection()?.toString())).toBe('');
 expect(await page.locator('.front-panel .mode-title').evaluate(element=>getComputedStyle(element).userSelect)).toBe('none');
 expect(await page.evaluate(()=>document.dispatchEvent(new Event('selectstart',{bubbles:true,cancelable:true})))).toBe(false);
 await page.getByRole('button',{name:'Night Watch',exact:true}).click();await tabDoesNothing(page);await enterMatch(page);
 await expect(page.locator('.player-0 .hole').first()).toBeEnabled({timeout:9000});await tabDoesNothing(page);await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toBeVisible();await tabDoesNothing(page);
 await page.keyboard.press('ArrowDown');await expect(page.getByRole('button',{name:'Mute',exact:true})).toBeFocused();
 await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);await tabDoesNothing(page);
});

for(const mode of ['ai','local'] as const)test(`${mode}: both keyboard grids hit the correct holes and players`,async({page})=>{
 await page.clock.install();await page.clock.pauseAt(new Date());await page.goto('/tests/fixtures/reactive-spells.html?case=champ1'+(mode==='ai'?'&mode=ai':''));await page.waitForLoadState('networkidle');await page.clock.runFor(50);
 for(const [index,layout]of keyboardLayouts.entries())for(const [hole,code]of layout.codes.entries()){
  await page.keyboard.press(code.startsWith('Key')?code.slice(3).toLowerCase():code);
  const event=await page.evaluate(()=>(window as unknown as {reactiveReview:ReactiveReview}).reactiveReview.inspect().events.at(-1));
  expect(event).toMatchObject({player:mode==='local'?index:0,hole});
 }
});

test('Tab does not advance a round result after the fresh-input hold',async({page})=>{
 await page.clock.install();await page.clock.pauseAt(new Date());await page.goto('/tests/fixtures/reactive-spells.html?case=champ1&mode=ai');await page.waitForLoadState('networkidle');await page.clock.runFor(50);
 await page.evaluate(()=>{for(let i=0;i<40;i++)window.dispatchEvent(new KeyboardEvent('keydown',{code:'KeyQ',key:'q'}));});
 const result=page.getByRole('region',{name:'Round result'});await expect(result).toBeVisible();await page.clock.runFor(4100);await expect(result).toHaveAttribute('data-ready','true');await tabDoesNothing(page);await expect(result).toBeVisible();await page.keyboard.press('Enter');await expect(result).toHaveCount(0);
});

test('solo number-row keys also cover the grid on keyboards without a numpad',async({page})=>{
 await page.clock.install();await page.clock.pauseAt(new Date());await page.goto('/tests/fixtures/reactive-spells.html?case=champ1&mode=ai');await page.waitForLoadState('networkidle');await page.clock.runFor(50);
 for(const [hole,key]of ['7','8','9','4','5','6','1','2','3'].entries()){
  await page.keyboard.press(key);const event=await page.evaluate(()=>(window as unknown as {reactiveReview:ReactiveReview}).reactiveReview.inspect().events.at(-1));expect(event).toMatchObject({player:0,hole});
 }
});
