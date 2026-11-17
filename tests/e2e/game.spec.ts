import { expect, test } from '@playwright/test';

test('start a match, hit a visible mole, pause, and return to setup', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Keep your garden/ })).toBeVisible();
  await page.getByRole('button', { name: /Enter the garden/ }).click();
  const garden = page.getByRole('region', { name: 'Player 1 garden', exact: true });
  await expect(page.locator('.arena-canvas canvas')).toBeVisible();
  await expect(page.locator('canvas')).toHaveCount(1);
  const mole = garden.locator('button[data-kind="mole"]').first();
  await expect(mole).toBeEnabled({ timeout: 10000 });
  const before = await garden.getAttribute('data-score');
  await mole.click();
  await expect(garden).not.toHaveAttribute('data-score', before!);
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Paused', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Mute', exact: true })).toBeVisible();
  await expect(page.getByText('1 star · Mushroom Guard')).toBeVisible();
  await expect(page.getByText('4 stars · Double Trouble')).toBeVisible();
  const pausedTime = await page.locator('.match-screen').getAttribute('data-time');
  await page.waitForTimeout(200);
  await expect(page.locator('.match-screen')).toHaveAttribute('data-time', pausedTime!);
  await page.getByRole('button', { name: 'Resume', exact: true }).click();
  if (testInfo.project.name === 'mobile') {
    await expect(page.locator('.match-screen .player-1')).toHaveCount(0);
    await expect(page.getByRole('group', { name: /Opponent magic: [0-4] of 4 stars/ })).toBeVisible();
    await expect(page.locator('.opponent-charge .sprite-stars')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  } else await expect(page.locator('.match-screen .player-1')).toBeVisible();
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  await page.getByRole('button', { name: 'Quit', exact: true }).click();
  await expect(page.getByRole('button', { name: /Enter the garden/ })).toBeVisible();
  expect(errors).toEqual([]);
});

test('local mode exposes both human boards and keyboard controls', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Local two player' }).click();
  await page.getByRole('button', { name: /Enter the garden/ }).click();
  await expect(page.getByRole('region', { name: 'Player 2 garden', exact: true })).toBeVisible();
  await expect(page.locator('.match-overlay')).toBeHidden({ timeout: 6000 });
  // Choose and strike an empty hole in one browser task; random spawns can occupy Q.
  await page.evaluate(() => {
    const empty = document.querySelector<HTMLButtonElement>('.player-0 .hole[data-kind="empty"]')!;
    const key = empty.dataset.key!;
    window.dispatchEvent(new KeyboardEvent('keydown', { code: `Key${key}`, key: key.toLowerCase(), bubbles: true }));
  });
  await page.keyboard.press('Escape');
  await expect(page.locator('.player-0')).toHaveAttribute('data-score', '-4');
  await expect(page.getByRole('meter', { name: 'Blue versus red round advantage' })).toHaveAttribute('aria-valuenow', '48');
  await expect(page.getByRole('meter')).toHaveCount(1);
  await expect(page.getByRole('dialog', { name: 'Paused', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Mute', exact: true })).toBeVisible();
  await expect(page.getByText('1 star · Mushroom Guard')).toBeVisible();
  await expect(page.getByText('4 stars · Double Trouble')).toBeVisible();
  const pausedTime = await page.locator('.match-screen').getAttribute('data-time');
  await page.waitForTimeout(200);
  await expect(page.locator('.match-screen')).toHaveAttribute('data-time', pausedTime!);
});
