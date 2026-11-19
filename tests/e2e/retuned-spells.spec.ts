import { expect,test } from '@playwright/test';
import { openSelection,enterMatch,chooseCharacter } from './frontMenu';

test('one-star Clean Sweep stays active for three gameplay seconds',async({page},info)=>{
  await page.clock.install();await openSelection(page,'local');await enterMatch(page);
  await expect(page.locator('.player-0 .cast-button')).toBeVisible();
  await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())+100));
  const garden=page.locator('.player-0');
  for(let n=0;n<150&&!await garden.locator('.hole[data-kind="star"]:enabled').count();n++)await page.clock.runFor(100);
  await garden.locator('.hole[data-kind="star"]').first().click();await garden.locator('.cast-button').click();
  await expect(page.locator('.cast-stars')).toHaveAttribute('data-cost','1');
  await page.clock.runFor(1600);
  await expect(page.locator('.effect-sweep')).toBeVisible();
  await page.clock.runFor(2000);
  await expect(page.locator('.effect-sweep')).toBeVisible();

  await page.screenshot({path:info.outputPath('lasting-clean-sweep.png')});
  await page.clock.runFor(1000);await expect(page.locator('.effect-sweep')).toHaveCount(0);
});

test('Sprig can cast four-star automation with exactly two active columns',async({page},info)=>{
  test.setTimeout(60000);
  await page.clock.install();await openSelection(page,'local');await chooseCharacter(page,'Player 1','sprig');await enterMatch(page);
  await expect(page.locator('.player-0 .cast-button')).toBeVisible();
  await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())+100));
  const garden=page.locator('.player-0');
  for(let n=0;n<900;n++) {
    if((await garden.locator('.cast-button').getAttribute('aria-label'))?.includes('(4 stars)'))break;
    await page.clock.runFor(100);
    for(const id of [0,1]) {
      const star=page.locator(`.player-${id} .hole[data-kind="star"]:enabled`);
      if(await star.count())await star.first().click();
    }
  }
  await expect(garden.locator('.cast-button')).toHaveAccessibleName('Cast magic (4 stars)');
  await garden.locator('.cast-button').click();
  await expect(page.locator('.cast-stars')).toHaveAttribute('data-cost','4');
  await page.clock.runFor(1600);
  await expect(garden).toHaveAttribute('data-automation-columns',/^[0-2],[0-2]$/);
  const columns=(await garden.getAttribute('data-automation-columns'))!.split(',');expect(new Set(columns).size).toBe(2);
  await expect(page.locator('.effect-automation')).toBeVisible();
  await page.screenshot({path:info.outputPath('clockwork-two-columns.png')});
  await page.getByRole('button',{name:'Pause',exact:true}).click();
  await page.clock.runFor(1000);await expect(garden).toHaveAttribute('data-automation-columns',columns.join(','));
});
