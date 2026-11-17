import { expect, type Page } from '@playwright/test';
export async function continueRound(page: Page) {
  await expect(page.getByRole('region', { name: 'Round result' })).toHaveAttribute('data-ready', 'true', { timeout: 6000 });
  await page.keyboard.press('Space');
}
