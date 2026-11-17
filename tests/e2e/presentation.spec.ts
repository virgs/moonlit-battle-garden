import { openMainMenu } from './frontMenu';
import { expect, test } from '@playwright/test';
import { supplyFinalArt } from './assetFixtures';

for (const valid of [true, false]) test(`drop-in portrait/home art and ${valid ? 'valid' : 'invalid'} cast sheet playback`, async ({ page }) => {
  await page.clock.install();
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await supplyFinalArt(page, valid);
  await openMainMenu(page);
  await expect(page.locator('.character-card .portrait[data-state="ready"]')).toHaveCount(2);
  await page.getByRole('button', { name: /Enter the garden/ }).click();
  await expect(page.locator('.player-0 .hole')).toHaveCount(9);
  await expect(page.locator('canvas')).toHaveAttribute('data-home-background', /\/assets\/homes\//);
  const garden = page.locator('.player-0');
  const star = garden.locator('.hole[data-kind="star"]').first();
  await expect(star).toBeEnabled({ timeout: 12000 });
  await star.click();
  // Hold at exact simulation ticks: a guard can be legitimately consumed immediately after the cast.
  await page.clock.pauseAt(new Date(await page.evaluate(() => Date.now()) + 100));
  await garden.getByRole('button', { name: /Cast magic/ }).click();
  const cast = page.locator('.cast-banner[data-character="champignon"]');

  await expect(cast).toHaveAttribute('data-tier', '1');
  await expect(cast).toHaveAttribute('data-asset', valid ? 'ready' : 'fallback');
  await expect(cast.getByRole('img', { name: '1 star used', exact: true })).toBeVisible();
  await expect(cast.locator('.cast-stars image')).toHaveCount(1);
  await expect(garden.locator('.stars')).toHaveAttribute('data-charge', '0');
  const time = await page.locator('.match-screen').getAttribute('data-time');
  await expect(garden.locator('.hole:enabled')).toHaveCount(0);
  await page.clock.runFor(200);
  await expect(page.locator('.match-screen')).toHaveAttribute('data-time', time!);
  expect(await cast.evaluate(element => getComputedStyle(element).pointerEvents)).toBe('none');
  if (valid) await expect(cast.locator('.cast-art image')).toHaveAttribute('href', '/assets/characters/champignon/cast-1.png');
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  const frame = await cast.getAttribute('data-frame');
  await page.clock.runFor(200);
  await expect(cast).toHaveAttribute('data-frame', frame!);
  await expect(cast.locator('.cast-stars')).toHaveAttribute('data-cost','1');
  await page.getByRole('button', { name: 'Resume', exact: true }).click();
  for (let tick = 0; tick < 40 && await cast.count(); tick++) await page.clock.runFor(50);
  await expect(cast).toHaveCount(0);
  const guard = page.locator('.effect-guard');
  await expect(guard).toHaveAttribute('data-asset',valid ? 'ready' : 'fallback');
  expect(await guard.evaluate(element => getComputedStyle(element).pointerEvents)).toBe('none');
  expect(errors).toEqual([]);
});
