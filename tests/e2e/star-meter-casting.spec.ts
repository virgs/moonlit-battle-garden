import { expect,test } from '@playwright/test';
import { openSelection,chooseCharacter,enterMatch } from './frontMenu';

test('meter holds completed charge during casting and starts its spending transition afterward',async({page})=>{
  await page.clock.install();await openSelection(page,'local');await enterMatch(page);const board=page.locator('.player-0'),meter=board.locator('.sprite-stars');
  await expect(board.locator('.cast-button')).toBeVisible();await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())+1000));
  for(let n=0;n<250&&!await board.locator('.hole[data-kind="star"]:enabled').count();n++)await page.clock.runFor(100);
  await board.locator('.hole[data-kind="star"]:enabled').first().click();await expect(meter).toHaveAttribute('data-frame','0');
  await board.locator('.cast-button').click();await expect(meter).toHaveAttribute('data-charge','0');await expect(meter).toHaveAttribute('data-displayed-charge','1');await expect(meter).toHaveAttribute('data-frame','2');
  const arena=page.getByRole('main',{name:'Battle arena'}),time=await arena.getAttribute('data-time');
  await page.clock.runFor(1400);await expect(page.locator('.cast-banner')).toBeVisible();await expect(meter).toHaveAttribute('data-displayed-charge','1');await expect(meter).toHaveAttribute('data-frame','2');await expect(arena).toHaveAttribute('data-time',time!);
  for(let n=0;n<5&&await page.locator('.cast-banner').count();n++)await page.clock.runFor(50);
  await expect(page.locator('.cast-banner')).toHaveCount(0);await expect(meter).toHaveAttribute('data-displayed-charge','0');await expect(meter).toHaveAttribute('data-frame','0');
  await page.clock.runFor(100);await expect(meter).toHaveAttribute('data-frame','1');
  await page.keyboard.press('Escape');await page.clock.runFor(1000);await expect(meter).toHaveAttribute('data-frame','1');await page.getByRole('button',{name:'Resume',exact:true}).click();await page.clock.runFor(100);await expect(meter).toHaveAttribute('data-frame','2');
});

test('hidden-opponent meter uses the same cast hold and reduced-motion pose',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});await page.clock.install();await openSelection(page);await chooseCharacter(page,'Computer','andromoss');await enterMatch(page);
  await expect(page.locator('.player-0 .cast-button')).toBeVisible();await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())+1000));
  const board=page.locator('.player-0');for(let n=0;n<250&&!await board.locator('.hole[data-kind="star"]:enabled').count();n++)await page.clock.runFor(100);
  await board.locator('.hole[data-kind="star"]:enabled').first().click();await board.locator('.cast-button').click();const rival=page.locator('.opponent-charge .sprite-stars');
  await expect(rival).toHaveAttribute('data-casting-held','true');await expect(rival).toHaveAttribute('data-frame','2');await page.clock.runFor(500);await expect(rival).toHaveAttribute('data-frame','2');
});
