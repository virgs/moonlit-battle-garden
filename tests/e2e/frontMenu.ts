import type { Page } from '@playwright/test';

/** Exercise the real title gate before tests continue into their game flow. */
export async function openMainMenu(page: Page) {
  await page.goto('/');
  await page.getByRole('button', { name:'Open main menu', exact:true }).click();
}
