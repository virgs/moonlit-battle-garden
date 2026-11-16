import { continueRound } from './continueRound';
import { expect, test, type Page } from '@playwright/test';
async function lose(page: Page) {
  await expect(page.locator('.player-0 .hole[data-kind="empty"]').first()).toBeEnabled({ timeout:9000 });
  await page.evaluate(()=>{const key=document.querySelector('.player-0 .hole[data-kind="empty"]')!.getAttribute('data-key');for(let i=0;i<1000;i++)window.dispatchEvent(new KeyboardEvent('keydown',{code:`Key${key}`}));});
}
test('match victory has no buttons, ignores early input and returns to setup only after the delayed prompt', async ({ page }, testInfo) => {
  if(testInfo.project.name==='desktop')await page.addInitScript(()=>Object.defineProperty(navigator,'getGamepads',{value:()=>{throw new DOMException('Gamepad disabled','SecurityError')}}));
  await page.goto('/');await page.getByRole('button',{name:'Local two player'}).click();await page.getByRole('button',{name:/Enter the garden/}).click();
  await lose(page);
  const round = page.getByRole('main', { name: 'Round result' });
  await expect(round).toHaveAttribute('data-ready', 'false');
  await expect(page.locator('button,canvas,.score-bar')).toHaveCount(0);
  await page.keyboard.press('Enter'); await page.mouse.click(10,10);
  await expect(round).toBeVisible();
  await continueRound(page); await lose(page);
  const result=page.getByRole('main',{name:'Match result'});
  await expect(result).toHaveAttribute('data-ready','false');await expect(page.locator('button')).toHaveCount(0);
  await expect(page.getByRole('img',{name:'Round victory trophy'})).toBeVisible();
  await page.screenshot({path:testInfo.outputPath('victory-before-prompt.png')});
  await page.keyboard.press('Enter');await page.mouse.click(10,10);await expect(result).toBeVisible();
  await page.keyboard.down('KeyW');
  await expect(result).toHaveAttribute('data-ready','true',{timeout:6000});
  await expect(page.getByText('Press any key or tap to return to the menu')).toBeVisible();
  await page.screenshot({path:testInfo.outputPath('victory-ready.png')});
  await page.keyboard.down('KeyW');await expect(result).toBeVisible();await page.keyboard.up('KeyW');
  if(testInfo.project.name==='mobile')await page.touchscreen.tap(100,100);else await page.keyboard.press('Space');
  await expect(page.getByRole('button',{name:/Enter the garden/})).toBeVisible();
});
