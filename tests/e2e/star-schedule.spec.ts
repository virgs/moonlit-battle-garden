import {expect,test} from '@playwright/test';
import {openSelection,enterMatch} from './frontMenu';

test('the first star waits ten active seconds and can still be collected and cast',async({page})=>{
 await page.clock.install();await page.clock.pauseAt(new Date());await openSelection(page,'local');await enterMatch(page);await page.waitForLoadState('networkidle');
 for(let n=0;n<20&&!await page.locator('.match-screen').count();n++)await page.clock.runFor(100);
 await expect(page.locator('.match-screen')).toBeVisible();
 const advanceTo=async(time:number)=>{for(let n=0;n<500;n++){const actual=Number(await page.locator('.match-screen').getAttribute('data-time'));if(actual>=time)return;await page.clock.runFor(Math.min(100,time-actual));}throw new Error('Round clock did not advance');};
 await advanceTo(3000);
 await expect(page.locator('.match-screen')).toHaveAttribute('data-phase','playing');const board=page.locator('.player-0'),star=board.locator('.hole[data-kind="star"]');
 await advanceTo(12500);await expect(star).toHaveCount(0);await advanceTo(13000);await expect(star).toHaveCount(1);await expect(star).toBeEnabled();
 await star.click();await expect(board.locator('.stars')).toHaveAttribute('aria-label','1 stars');await page.keyboard.press('Tab');await expect(page.locator('.cast-banner')).toBeVisible();await expect(board.locator('.stars')).toHaveAttribute('aria-label','0 stars');
});
