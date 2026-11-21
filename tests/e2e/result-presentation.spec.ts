import { openSelection, enterMatch } from './frontMenu';
import { expect, test } from '@playwright/test';
import { png } from './assetFixtures';
import { expectClearResult } from './resultPresentation';

for (const [name,width,height] of [['desktop',1440,900],['phone-portrait',390,844],['phone-landscape',844,390]] as const) {
  test(`${name}: large countdown and transparent round result preserve the frozen arena`,async({page},testInfo)=>{
    await page.emulateMedia({reducedMotion:"reduce"});
    await page.setViewportSize({width,height});
    await page.route(/\/assets\/characters\/[^/]+\/icon\.png$/, route => route.fulfill({ contentType:'image/png', body:png(64,64) }));
    await openSelection(page);
    // AI mode exercises the single-board phone presentation.
    await enterMatch(page);
    await expect(page.locator('canvas')).toBeVisible();
    const countdown=page.getByRole('status',{name:'Round countdown'});
    await expect(countdown).toBeVisible();
    await page.evaluate(()=>document.fonts.ready);
    await expect(page.locator('.round-number')).toHaveCount(0);
    await expect(page.locator('.countdown-number')).toHaveCSS('font-size',`${Number(Math.min(225,height*.55).toFixed(1))}px`);
    for(const selector of ['.countdown-number']) {
      const bounds=(await page.locator(selector).boundingBox())!;
      expect(bounds.x).toBeGreaterThanOrEqual(0);expect(bounds.y).toBeGreaterThanOrEqual(0);
      expect(bounds.x+bounds.width).toBeLessThanOrEqual(width);expect(bounds.y+bounds.height).toBeLessThanOrEqual(height);
    }
    await page.screenshot({path:testInfo.outputPath(`${name}-countdown.png`)});
    const original=await page.locator('canvas').elementHandle();
    await expect(page.locator('.player-0 .hole[data-kind="empty"]').first()).toBeEnabled({timeout:9000});
    await page.evaluate(()=>{const key=document.querySelector('.player-0 .hole[data-kind="empty"]')!.getAttribute('data-key');for(let i=0;i<1000;i++)window.dispatchEvent(new KeyboardEvent('keydown',{code:`Key${key}`}));});
    const result=page.getByRole('region',{name:'Round result'});
    await expect(result).toBeVisible();
    const icon = result.locator('.character-icon');
    await expect(icon).toBeVisible();
    await expect(icon).toHaveAttribute('data-character', 'andromoss');
    const iconBox = (await icon.boundingBox())!;
    expect(iconBox.x).toBeGreaterThanOrEqual(0); expect(iconBox.x + iconBox.width).toBeLessThanOrEqual(width);
    expect(await original!.evaluate(canvas=>canvas===document.querySelector('canvas'))).toBe(true);
    const time=await page.locator('.match-screen').getAttribute('data-time');
    await expectClearResult(page);
    await expect(page.locator('.match-screen')).toHaveAttribute('data-time',time!);
    await expect(page.locator('button:enabled')).toHaveCount(0);
    await expect(result).toHaveAttribute('data-ready','true',{timeout:6000});
    await page.screenshot({path:testInfo.outputPath(`${name}-round-result.png`)});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&document.documentElement.scrollHeight<=innerHeight)).toBe(true);
  });
}
