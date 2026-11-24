import {expect,test,type Page} from '@playwright/test';
import {characterIds} from '../../src/game/types';
async function open(page:Page,hero='champignon'){
 await page.clock.install();await page.clock.pauseAt(new Date());await page.goto('/tests/fixtures/hero-playback.html?hero='+hero);await page.waitForLoadState('networkidle');
 await expect(page.locator('.preview-idle .standing-hero')).toHaveAttribute('data-asset','ready');await expect(page.locator('.victory-sheet')).toHaveCount(2);for(const selector of ['.preview-idle .standing-hero','.preview-loop .victory-sheet','.preview-once .victory-sheet'])await expect(page.locator(selector)).toHaveAttribute('data-reduced-motion','false');
}
const idle=(page:Page)=>page.locator('.preview-idle .standing-hero');
const loop=(page:Page)=>page.locator('.preview-loop .victory-sheet');
const once=(page:Page)=>page.locator('.preview-once .victory-sheet');
for(const hero of characterIds)test(`${hero}: actual idle and victory sheets both follow twelve FPS and catch up after a late update`,async({page})=>{
 await open(page,hero);await expect(idle(page)).toHaveAttribute('data-fps','12');await expect(loop(page)).toHaveAttribute('data-fps','12');await page.clock.runFor(200);await expect(idle(page)).toHaveAttribute('data-frame','2');await expect(loop(page)).toHaveAttribute('data-frame','2');
 await page.clock.runFor(500);await expect(idle(page)).toHaveAttribute('data-frame','3');await expect(once(page)).toHaveAttribute('data-frame','8');await page.clock.runFor(200);await expect(idle(page)).toHaveAttribute('data-frame','0');await expect(loop(page)).toHaveAttribute('data-frame','1');await expect(once(page)).toHaveAttribute('data-frame','8');
 await page.clock.fastForward(300);await expect(idle(page)).toHaveAttribute('data-frame','4');await expect(loop(page)).toHaveAttribute('data-frame','5');await expect(once(page)).toHaveAttribute('data-frame','8');
});
test('live reduced-motion changes keep poses still and a new hero resets both animation clocks',async({page})=>{
 await open(page);await page.clock.runFor(250);await page.emulateMedia({reducedMotion:'reduce'});await expect(idle(page)).toHaveAttribute('data-reduced-motion','true');await expect(loop(page)).toHaveAttribute('data-reduced-motion','true');await expect(idle(page)).toHaveAttribute('data-frame','0');await expect(loop(page)).toHaveAttribute('data-frame','0');await page.clock.runFor(2000);await expect(loop(page)).toHaveAttribute('data-frame','0');await expect(once(page)).toHaveAttribute('data-frame','0');
 await page.emulateMedia({reducedMotion:'no-preference'});await expect(idle(page)).toHaveAttribute('data-reduced-motion','false');await expect(loop(page)).toHaveAttribute('data-reduced-motion','false');await page.clock.runFor(220);await expect(idle(page)).toHaveAttribute('data-frame','2');await page.getByRole('button',{name:'Next hero'}).click();await page.waitForLoadState('networkidle');await expect(page.locator('main')).toHaveAttribute('data-character','andromoss');await expect(idle(page)).toHaveAttribute('data-asset','ready');await expect(idle(page)).toHaveAttribute('data-reduced-motion','false');await expect(loop(page)).toHaveAttribute('data-reduced-motion','false');await expect(idle(page)).toHaveAttribute('data-frame','0');await expect(loop(page)).toHaveAttribute('data-frame','0');await page.clock.runFor(220);await expect(idle(page)).toHaveAttribute('data-frame','2');await expect(loop(page)).toHaveAttribute('data-frame','2');
});
test('background tabs hold their pose and resume without jumping through hidden time',async({page})=>{
 await open(page);await page.clock.runFor(220);const held=[await idle(page).getAttribute('data-frame'),await loop(page).getAttribute('data-frame')];
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});await page.clock.runFor(5000);await expect(idle(page)).toHaveAttribute('data-frame',held[0]!);await expect(loop(page)).toHaveAttribute('data-frame',held[1]!);
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:false});document.dispatchEvent(new Event('visibilitychange'));});await page.clock.runFor(240);await expect(idle(page)).toHaveAttribute('data-frame','0');await expect(loop(page)).toHaveAttribute('data-frame','5');
});
