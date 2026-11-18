import { expect, test } from '@playwright/test';

test('all eight sourced homes decode and play independently in the review collection', async ({ page }) => {
  const failed: string[] = [];
  page.on('response', response => {
    if (response.url().includes('/assets/homes/') && response.status() >= 400) failed.push(response.url());
  });
  await page.goto('./assets/homes/index.html');
  await expect(page.locator('article')).toHaveCount(8);
  expect(await page.locator('article').evaluateAll(cards => cards.map(card => (card as HTMLElement).dataset.home))).toEqual([
    'champignon', 'andromoss', 'mossroot-path', 'whispering-wood', 'stillwater-grove', 'lanternbloom-garden', 'violet-veil', 'bluebell-thicket',
  ]);
  await expect(page.locator('[data-home="bluebell-thicket"]').getByRole('link', { name: 'Artwork: ThQian' })).toBeVisible();
  await expect(page.locator('[data-home="bluebell-thicket"]').getByRole('link', { name: 'CC BY 4.0', exact: true })).toHaveAttribute('href', 'https://creativecommons.org/licenses/by/4.0/');
  await expect(page.getByText('Character to be chosen', { exact: true })).toHaveCount(6);
  await expect.poll(() => page.locator('article img').evaluateAll(images => images.every(image => (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  for (let index = 0; index < 8; index++) {
    // Gesture unlocks native audio on touch-primary browsers too.
    await page.locator('article').nth(index).getByRole('heading').click();
    await page.locator('audio').nth(index).evaluate(async (audio: HTMLAudioElement) => { await audio.play(); });
    await expect.poll(() => page.locator('audio').nth(index).evaluate((audio: HTMLAudioElement) => Number.isFinite(audio.duration) && audio.currentTime > 0 && !audio.paused && audio.loop)).toBe(true);
    expect(await page.locator('audio').evaluateAll(elements => elements.filter(element => !(element as HTMLAudioElement).paused).length)).toBe(1);
    await page.locator('audio').nth(index).evaluate((audio: HTMLAudioElement) => { audio.currentTime = audio.duration - 0.15; });
    await expect.poll(() => page.locator('audio').nth(index).evaluate((audio: HTMLAudioElement) => audio.currentTime)).toBeLessThan(3);
  }
  expect(failed).toEqual([]);
  await page.getByRole('link', { name: 'Back to the game' }).click();
  await expect(page).toHaveURL(/\/$/);
});
