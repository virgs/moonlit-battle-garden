import { expect, test } from '@playwright/test';

test('start a match, hit a visible mole, pause, and return to setup', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Keep your garden/ })).toBeVisible();
  await page.getByRole('button', { name: /Enter the garden/ }).click();
  const garden = page.getByRole('region', { name: 'Player 1 garden', exact: true });
  await expect(garden.locator('canvas')).toBeVisible();
  const mole = garden.locator('button[data-kind="mole"]').first();
  await expect(mole).toBeEnabled({ timeout: 10000 });
  const before = await garden.locator('.score').innerText();
  await mole.click();
  await expect(garden.locator('.score')).not.toHaveText(before);
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Paused', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Back to the garden' }).click();
  if (testInfo.project.name === 'mobile') {
    await expect(page.locator('.arena > .player-1')).toBeHidden();
    await expect(page.locator('.mobile-opponent')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  } else await expect(page.locator('.arena > .player-1')).toBeVisible();
  await page.getByRole('button', { name: 'Change matchup' }).click();
  await expect(page.getByRole('button', { name: /Enter the garden/ })).toBeVisible();
  expect(errors).toEqual([]);
});

test('local mode exposes both human boards and keyboard controls', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Local two player' }).click();
  await page.getByRole('button', { name: /Enter the garden/ }).click();
  await expect(page.getByRole('region', { name: 'Player 2 garden', exact: true })).toBeVisible();
  await expect(page.locator('.match-overlay')).toBeHidden({ timeout: 6000 });
  await page.keyboard.press('q');
  await expect(page.getByRole('meter', { name: 'Your health', exact: true })).toHaveAttribute('aria-valuenow', '96');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('heading', { name: 'Paused', exact: true })).toBeVisible();
});
