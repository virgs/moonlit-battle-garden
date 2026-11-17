import { expect, test } from '@playwright/test';
import { gardenArt } from '../../src/render/layout';

test('minimal HUD keeps original board anchors, side names and star controls separated across screen sizes', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('.intro h1')).toHaveCSS('font-family', 'Almendra, Georgia, serif');
  await expect(page.locator('body')).toHaveCSS('font-family', 'Literata, Georgia, serif');
  expect(await page.evaluate(() => document.fonts.check('400 30px Almendra') && document.fonts.check('400 15px Literata'))).toBe(true);
  await page.getByRole('button', { name: /Andy The star/ }).click();
  await page.getByRole('button', { name: 'Local two player' }).click();
  await page.getByRole('button', { name: /Enter the garden/ }).click();
  await expect(page.locator('canvas')).toHaveCount(1);
  await expect(page.locator('.match-overlay')).toBeHidden({ timeout: 8000 });
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  await page.addStyleTag({ content: '.match-overlay{visibility:hidden!important}' });
  for (const [width, height] of [[320, 568], [390, 844], [844, 390], [768, 1024], [1024, 600], [1440, 900], [2560, 1080]]) {
    await page.setViewportSize({ width, height });
    await expect(page.locator('canvas')).toHaveAttribute('width', String(width));
    await expect(page.locator('canvas')).toHaveAttribute('height', String(height));
    const bar = (await page.locator('.score-bar').boundingBox())!;
    const art = (await page.locator('.legacy-score-art').boundingBox())!;
    expect(art.width / art.height).toBeCloseTo(499 / 45, 1);
    await expect(page.getByRole('meter')).toHaveCount(1);
    await expect(page.locator('.score-legend>span').first()).toHaveText('Andy');
    await expect(page.locator('.score-legend>span').last()).toHaveText('Sir Champignon');
    await expect(page.locator('.score-legend')).toHaveCSS('font-family', 'Almendra, Georgia, serif');
    expect(await page.locator('.score-legend>span').evaluateAll(names => names.every(name => name.scrollWidth <= name.clientWidth))).toBe(true);
    const left = (await page.locator('.score-legend>span').first().boundingBox())!;
    const right = (await page.locator('.score-legend>span').last().boundingBox())!;
    expect(left.x).toBeCloseTo(bar.x); expect(right.x + right.width).toBeCloseTo(bar.x + bar.width);
    for (const id of [0, 1]) {
      const panel = page.locator(`.player-${id}`);
      const x = Number(await panel.getAttribute('data-board-x'));
      const y = Number(await panel.getAttribute('data-board-y'));
      const scale = Number(await panel.getAttribute('data-board-scale'));
      expect(y).toBeGreaterThanOrEqual(bar.y + bar.height);
      const stars = (await panel.locator('.star-control').boundingBox())!;
      expect(stars.x).toBeGreaterThanOrEqual(0); expect(stars.x + stars.width).toBeLessThanOrEqual(width);
      expect(stars.y + stars.height).toBeLessThanOrEqual(height);
      for (let hole = 0; hole < 9; hole++) {
        const box = (await panel.locator('.hole').nth(hole).boundingBox())!;
        expect(box.x + box.width / 2).toBeCloseTo(x + gardenArt.holes[hole].x * scale, 0);
        expect(box.y + 77 * scale).toBeCloseTo(y + gardenArt.holes[hole].y * scale, 0);
        expect(box.x >= stars.x + stars.width || box.x + box.width <= stars.x || box.y + box.height <= stars.y).toBe(true);
      }
    }
    await expect(page.locator('.player-summary,.magic-panel,.board-message,.spell-description,.keycap,.versus-label,.online-status')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollHeight <= innerHeight && document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.screenshot({ path: testInfo.outputPath('minimal-wide.png') });
});

test('single board uses horizontal stars on a narrow portrait screen with a side strip in landscape and the original column on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/'); await page.getByRole('button', { name: /Enter the garden/ }).click();
  await expect(page.locator('.single-board .player-0 .horizontal-stars')).toHaveCount(1);
  await expect(page.locator('.player-1')).toHaveCount(0);
  await page.setViewportSize({ width: 844, height: 390 });
  await expect(page.locator('.single-board .player-0 .horizontal-stars')).toHaveCount(1);
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator('.two-boards .vertical-stars')).toHaveCount(2);
  await expect(page.locator('canvas')).toHaveCount(1);
});
