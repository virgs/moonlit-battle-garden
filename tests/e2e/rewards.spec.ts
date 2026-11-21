import { openSelection, enterMatch } from './frontMenu';
import { continueRound } from './continueRound';
import { expect, test, type Page } from '@playwright/test';

async function loseRound(page: Page, loser: number) {
  await expect(page.locator(`.player-${loser} .hole[data-kind="empty"]`).first()).toBeEnabled({ timeout: 9000 });
  await expect(page.locator('.match-overlay')).toBeHidden({ timeout: 7000 });
  await page.evaluate(id => {
    const hole = document.querySelector(`.player-${id} .hole[data-kind="empty"]`)!;
    const key = hole.getAttribute('data-key')!;
    const code = id === 0 ? `Key${key}` : `Numpad${key}`;
    for (let i = 0; i < 1000; i++) window.dispatchEvent(new KeyboardEvent('keydown', { code }));
  }, loser);
}

test('original trophy sheets celebrate each round and retain the correct per-side totals through match victory', async ({ page }, testInfo) => {
  await openSelection(page,'local');
  await enterMatch(page);
  await loseRound(page, 0);
  const trophies = page.locator('.score-trophies .trophy-art');
  const award = page.getByRole('img', { name: 'Round victory trophy' });
  await expect(award).toBeVisible();
  const first = await award.getAttribute('data-frame');
  await expect.poll(() => award.getAttribute('data-frame')).not.toBe(first);
  await expect(award.locator('image')).toHaveAttribute('href', '/assets/legacy/trophy-sheet.png');
  await page.screenshot({ path: testInfo.outputPath('round-victory.png') });
  await continueRound(page);
  await expect(award).toHaveCount(0);
  await expect(trophies.nth(1)).toHaveAttribute('data-wins', '1');
  await loseRound(page, 1);
  await continueRound(page);
  await expect(trophies.nth(0)).toHaveAttribute('data-wins', '1');
  await expect(trophies.nth(1)).toHaveAttribute('data-wins', '1');
  await loseRound(page, 0);
  await expect(page.getByRole('heading', { name: 'Player 2 wins the match!' })).toBeVisible();
  await expect(page.getByRole('region', { name:'Match result' })).toBeVisible();
  await expect(page.locator('button:enabled')).toHaveCount(0);
  await expect(page.locator('.score-bar')).toBeVisible();
});

test('star artwork charges and clears when casting; pause freezes its animation', async ({ page }, testInfo) => {
  await openSelection(page);
  await enterMatch(page);
  const board = page.locator('.player-0');
  await expect(board.locator('.hole[data-kind="star"]').first()).toBeEnabled({ timeout: 12000 });
  await board.locator('.hole[data-kind="star"]').first().click();
  const stars = board.locator('.sprite-stars');
  await expect(stars).toHaveAttribute('data-charge', '1');
  await expect(stars.locator('image').first()).toHaveAttribute('y', '-200');
  await page.screenshot({ path: testInfo.outputPath('charged-stars.png') });
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  const frozen = await stars.getAttribute('data-frame');
  await page.waitForTimeout(250);
  await expect(stars).toHaveAttribute('data-frame', frozen!);
  await page.getByRole('button', { name: 'Resume', exact: true }).click();
  await board.getByRole('button', { name: /Cast magic/ }).click();
  await expect(stars).toHaveAttribute('data-charge', '0');
  await expect(stars).toHaveAttribute('data-displayed-charge','1');
  await expect(stars).toHaveAttribute('data-frame','2');
  await expect(page.locator('.cast-banner')).toHaveCount(0);
  await expect(stars).toHaveAttribute('data-displayed-charge','0');
  await expect(stars.locator('image').first()).toHaveAttribute('y', '0');
  await expect(page.locator('.stars .charged, .round-wins')).toHaveCount(0);
});

test('reduced motion keeps original trophy and star art in a static pose', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openSelection(page,'local');
  await enterMatch(page);
  await loseRound(page, 0);
  const trophy = page.locator('.celebration-trophy');
  await expect(trophy).toHaveAttribute('data-frame', '2');
  expect(await trophy.evaluate(element => getComputedStyle(element).animationName)).toBe('none');
  await page.waitForTimeout(300);
  await expect(trophy).toHaveAttribute('data-frame', '2');
});

test('landscape round victory fits over the frozen gameplay HUD', async ({ page }) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await openSelection(page,'local');
  await enterMatch(page);
  await loseRound(page, 0);
  await expect(page.locator('canvas')).toHaveCount(1);
  await expect(page.locator('button:enabled')).toHaveCount(0);
  const result = (await page.getByRole('region', { name: 'Round result' }).boundingBox())!;
  const award = (await page.locator('.celebration-trophy').boundingBox())!;
  expect(result.height).toBe(390);
  expect(award.y).toBeGreaterThanOrEqual(0);
  expect(award.y + award.height).toBeLessThanOrEqual(390);
});
