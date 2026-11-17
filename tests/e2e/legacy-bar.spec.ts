import { openSelection, enterMatch } from './frontMenu';
import { continueRound } from './continueRound';
import { expect, test } from '@playwright/test';

test('renders one original bar viewport, plays a single row at a time, and freezes on pause', async ({ page }) => {
  await openSelection(page);
  await enterMatch(page);
  await expect(page.locator('.player-0 .hole')).toHaveCount(9);
  await expect(page.locator('.match-overlay')).toBeHidden({ timeout: 8000 });
  await expect(page.getByRole('meter')).toHaveCount(1);
  const art = page.locator('.legacy-score-art');
  await expect(art).toHaveCount(1);
  await expect(art.locator('image')).toHaveCount(2); // one sheet behind one border
  const initial = await art.getAttribute('data-frame');
  await expect.poll(() => art.getAttribute('data-frame'), { intervals: [30, 50, 70] }).not.toBe(initial);
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  const frozen = await art.getAttribute('data-frame');
  expect(Number(frozen)).toBeGreaterThanOrEqual(0);
  expect(Number(frozen)).toBeLessThan(4);
  await expect(art.locator('image').first()).toHaveAttribute('y', String(-Number(frozen) * 41));
  await page.waitForTimeout(250);
  await expect(art).toHaveAttribute('data-frame', frozen!);
  await expect(page.locator('.health-track, .score-liquid')).toHaveCount(0);
});

test('a decisive score difference shows the round result and resets the bar to the middle next round', async ({ page }) => {
  await openSelection(page,'local');
  await enterMatch(page);
  await expect(page.locator('.player-0 .hole')).toHaveCount(9);
  await expect(page.locator('.match-overlay')).toBeHidden({ timeout: 8000 });
  await page.evaluate(() => {
    const hole = document.querySelector('.player-0 .hole[data-kind="empty"]')!;
    const key = hole.getAttribute('data-key')!;
    // Same valid keyboard action as a player; once the round ends further actions are ignored.
    for (let i = 0; i < 1000; i++) window.dispatchEvent(new KeyboardEvent('keydown', { code: `Key${key}`, key: key.toLowerCase(), bubbles: true }));
  });
  await expect(page.getByRole('heading', { name: 'Player 2 wins the round!' })).toBeVisible();
  await expect(page.getByRole('meter')).toHaveAttribute('aria-valuenow', '0');
  await continueRound(page);
  await expect(page.getByRole('meter')).toHaveAttribute('aria-valuenow', '50');
  await expect(page.locator('.legacy-score-art')).toHaveAttribute('data-offset', '255');
  await expect(page.locator('.player-0')).toHaveAttribute('data-score', '0');
});
