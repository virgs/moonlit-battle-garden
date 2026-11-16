import { expect, test } from '@playwright/test';
import { supplyFinalArt } from './assetFixtures';

for (const valid of [true, false]) test(`drop-in portrait/home art and ${valid ? 'valid' : 'invalid'} cast sheet playback`, async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await supplyFinalArt(page, valid);
  await page.goto('/');
  await expect(page.locator('.character-card .portrait[data-state="ready"]')).toHaveCount(2);
  await page.getByRole('button', { name: /Enter the garden/ }).click();
  await expect(page.locator('.player-0 .hole')).toHaveCount(9);
  await expect(page.locator('canvas')).toHaveAttribute('data-home-background', /\/assets\/homes\//);
  const garden = page.locator('.player-0');
  const star = garden.locator('.hole[data-kind="star"]').first();
  await expect(star).toBeEnabled({ timeout: 12000 });
  await star.click();
  await garden.getByRole('button', { name: /Cast magic/ }).click();
  const cast = page.locator('.cast-banner[data-character="champignon"]');
  if (!valid) { await expect(cast).toHaveCount(0); expect(errors).toEqual([]); return; }
  await expect(cast).toHaveAttribute('data-tier', '1');
  await expect(cast).toHaveAttribute('data-asset', valid ? 'ready' : 'fallback');
  expect(await cast.evaluate(element => getComputedStyle(element).pointerEvents)).toBe('none');
  if (valid) await expect(cast.locator('image')).toHaveAttribute('href', '/assets/characters/champignon/cast-1.png');
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  const frame = await cast.getAttribute('data-frame');
  await page.waitForTimeout(200);
  await expect(cast).toHaveAttribute('data-frame', frame!);
  expect(errors).toEqual([]);
});
