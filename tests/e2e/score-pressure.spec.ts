import { openMainMenu } from './frontMenu';
import { expect, test } from '@playwright/test';

test('the trailing board gets its star sooner with a shorter reaction window in actual play', async ({ page }) => {
  await openMainMenu(page);
  await page.getByRole('button', { name: 'Local two player' }).click();
  await page.getByRole('button', { name: /Enter the garden/ }).click();
  await expect(page.locator('.player-0 .hole[data-kind="empty"]').first()).toBeEnabled({ timeout: 9000 });
  await page.evaluate(() => {
    const key = document.querySelector('.player-0 .hole[data-kind="empty"]')!.getAttribute('data-key');
    for (let count = 0; count < 10; count++) window.dispatchEvent(new KeyboardEvent('keydown', { code: `Key${key}` }));
  });
  await expect(page.locator('.player-0')).toHaveAttribute('data-score', '-40');
  const trailingStar = page.locator('.player-0 .hole[data-kind="star"]').first();
  await expect(trailingStar).toBeEnabled({ timeout: 7000 });
  const trailingBorn = Number(await trailingStar.getAttribute('data-born'));
  const trailingLifetime = Number(await trailingStar.getAttribute('data-expires')) - trailingBorn;
  const leadingStar = page.locator('.player-1 .hole[data-kind="star"]').first();
  await expect(leadingStar).toBeEnabled();
  const leadingBorn = Number(await leadingStar.getAttribute('data-born'));
  const leadingLifetime = Number(await leadingStar.getAttribute('data-expires')) - leadingBorn;
  expect(trailingBorn).toBeLessThan(leadingBorn);
  expect(trailingLifetime).toBeLessThan(leadingLifetime);
  await expect(page.locator('.match-screen')).toHaveAttribute('data-phase', 'playing');
});
