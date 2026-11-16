import { expect, test } from '@playwright/test';
import { gardenArt } from '../../src/render/layout';

test('one viewport canvas keeps art, hit regions, HUD, and player identity aligned through resizing', async ({ page }, testInfo) => {
  test.setTimeout(60000);
  await page.goto('/');
  // Character choice must not determine side: Andy is still the left/local player.
  await page.getByRole('button', { name: /Andy The star/ }).click();
  await page.getByRole('button', { name: 'Local two player' }).click();
  await page.getByRole('button', { name: /Enter the garden/ }).click();
  await expect(page.locator('canvas')).toHaveCount(1);
  await expect(page.locator('.match-overlay')).toBeHidden({ timeout: 8000 });
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  // Hide only the pause scrim for geometry/visual inspection; the simulation stays paused.
  await page.addStyleTag({ content: '.match-overlay { visibility: hidden !important; }' });
  for (const [width, height] of [[320, 568], [390, 844], [844, 390], [768, 1024], [1024, 600], [1440, 900], [2560, 1080]]) {
    await page.setViewportSize({ width, height });
    await expect(page.locator('canvas')).toHaveAttribute('width', String(width));
    await expect(page.locator('canvas')).toHaveAttribute('height', String(height));
    await expect.poll(async () => page.locator('.player-1').getAttribute('data-board-x')).not.toBeNull();
    const canvas = await page.locator('canvas').boundingBox();
    expect(canvas).toEqual({ x: 0, y: 0, width, height });
    const bar = await page.getByRole('region', { name: 'Round standing' }).boundingBox();
    expect(bar!.x).toBeGreaterThanOrEqual(0);
    expect(bar!.x + bar!.width).toBeLessThanOrEqual(width);
    await expect(page.locator('.player-0 h2')).toHaveText('Andy');
    await expect(page.locator('.player-1 h2')).toHaveText('Sir Champignon');
    for (const id of [0, 1]) {
      const panel = page.locator(`.player-${id}`);
      const summary = await panel.locator('.player-summary').boundingBox();
      expect(bar!.y + bar!.height).toBeLessThanOrEqual(summary!.y);
      expect(summary!.x + summary!.width / 2).toBeCloseTo(width * (id === 0 ? 0.25 : 0.75));
      const x = Number(await panel.getAttribute('data-board-x'));
      const y = Number(await panel.getAttribute('data-board-y'));
      const scale = Number(await panel.getAttribute('data-board-scale'));
      const hud = await panel.locator('.magic-panel').boundingBox();
      expect(hud!.y + hud!.height).toBeLessThanOrEqual(height);
      for (let hole = 0; hole < 9; hole++) {
        const box = await panel.locator('.hole').nth(hole).boundingBox();
        expect(box!.x + box!.width / 2).toBeCloseTo(x + gardenArt.holes[hole].x * scale, 0);
        expect(box!.y + 77 * scale).toBeCloseTo(y + gardenArt.holes[hole].y * scale, 0);
        expect(box!.y).toBeGreaterThanOrEqual(summary!.y + summary!.height - 1);
        expect(box!.y + box!.height).toBeLessThan(hud!.y);
      }
    }
    expect(await page.evaluate(() => document.documentElement.scrollHeight <= innerHeight && document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.screenshot({ path: testInfo.outputPath('wide-match.png') });
});

test('single-board mobile mode preserves local identity after orientation and desktop transitions', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: /Enter the garden/ }).click();
  await expect(page.locator('.single-board .player-0')).toHaveCount(1);
  await expect(page.locator('.player-1')).toHaveCount(0);
  await page.setViewportSize({ width: 844, height: 390 });
  await expect(page.locator('.single-board')).toHaveCount(1);
  await expect(page.locator('.player-1')).toHaveCount(0);
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator('.two-boards .player-1')).toHaveCount(1);
  const local = await page.locator('.player-0 .player-summary').boundingBox();
  const opponent = await page.locator('.player-1 .player-summary').boundingBox();
  expect(local!.x + local!.width).toBeLessThan(opponent!.x);
  await expect(page.locator('canvas')).toHaveCount(1);
});
