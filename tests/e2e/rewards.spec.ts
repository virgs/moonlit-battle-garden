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
  await page.goto('/');
  await page.getByRole('button', { name: 'Local two player' }).click();
  await page.getByRole('button', { name: /Enter the garden/ }).click();
  await loseRound(page, 0);
  const trophies = page.locator('.score-trophies .trophy-art');
  await expect(trophies.nth(0)).toHaveAttribute('data-wins', '0');
  await expect(trophies.nth(1)).toHaveAttribute('data-wins', '1');
  await expect(trophies.nth(1).locator('image')).toHaveAttribute('y', '-75');
  const award = page.getByRole('img', { name: 'Round victory trophy' });
  await expect(award).toBeVisible();
  const first = await award.getAttribute('data-frame');
  await expect.poll(() => award.getAttribute('data-frame')).not.toBe(first);
  await expect(award.locator('image')).toHaveAttribute('href', '/assets/legacy/trophy-sheet.png');
  for (const id of [0, 1]) {
    const bar = (await page.locator('.score-track').boundingBox())!;
    const trophy = (await trophies.nth(id).boundingBox())!;
    expect(trophy.y).toBeGreaterThanOrEqual(bar.y + bar.height);
    expect(trophy.x).toBeGreaterThanOrEqual(bar.x);
    expect(trophy.x + trophy.width).toBeLessThanOrEqual(bar.x + bar.width + 1);
    expect(id === 0 ? trophy.x + trophy.width <= bar.x + bar.width / 2 : trophy.x >= bar.x + bar.width / 2).toBe(true);
  }
  await page.screenshot({ path: testInfo.outputPath('round-victory.png') });
  await page.getByRole('button', { name: /Next round/ }).click();
  await expect(award).toHaveCount(0);
  await expect(trophies.nth(1)).toHaveAttribute('data-wins', '1');
  await loseRound(page, 1);
  await expect(trophies.nth(0)).toHaveAttribute('data-wins', '1');
  await expect(trophies.nth(1)).toHaveAttribute('data-wins', '1');
  await page.getByRole('button', { name: /Next round/ }).click();
  await loseRound(page, 0);
  await expect(page.getByRole('heading', { name: 'Player 2 wins the match!' })).toBeVisible();
  await expect(page.getByRole('main', { name:'Match result' })).toBeVisible();
  await expect(page.locator('button')).toHaveCount(0);
  await expect(page.locator('.score-bar')).toHaveCount(0);
});

test('star artwork charges and clears when casting; pause freezes its animation', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Enter the garden/ }).click();
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
  await page.getByRole('button', { name: 'Back to the garden' }).click();
  await board.getByRole('button', { name: /Cast magic/ }).click();
  await expect(stars).toHaveAttribute('data-charge', '0');
  await expect(stars.locator('image').first()).toHaveAttribute('y', '0');
  await expect(page.locator('.stars .charged, .round-wins')).toHaveCount(0);
});

test('reduced motion keeps original trophy and star art in a static pose', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Local two player' }).click();
  await page.getByRole('button', { name: /Enter the garden/ }).click();
  await loseRound(page, 0);
  const trophy = page.locator('.celebration-trophy');
  await expect(trophy).toHaveAttribute('data-frame', '2');
  await expect(page.locator('.player-0 .sprite-stars')).toHaveAttribute('data-frame', '2');
  expect(await trophy.evaluate(element => getComputedStyle(element).animationName)).toBe('none');
  await page.waitForTimeout(300);
  await expect(trophy).toHaveAttribute('data-frame', '2');
});

test('landscape victory and enlarged HUD trophies occupy separate areas', async ({ page }) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto('/'); await page.getByRole('button', { name: 'Local two player' }).click();
  await page.getByRole('button', { name: /Enter the garden/ }).click();
  await loseRound(page, 0);
  const bar = (await page.locator('.score-bar').boundingBox())!;
  const award = (await page.locator('.celebration-trophy').boundingBox())!;
  const card = (await page.locator('.result-card').boundingBox())!;
  expect(award.y).toBeGreaterThan(bar.y + bar.height);
  expect(card.y + card.height).toBeLessThanOrEqual(390);
});
