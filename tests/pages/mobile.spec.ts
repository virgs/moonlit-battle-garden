import { expect, test } from '@playwright/test';

test('Pages subpath loads runtime art/audio and supports touch holes and magic in phone orientations', async ({ page }, testInfo) => {
  const errors: string[] = [], assets: { path: string; status: number }[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (new URL(response.url()).pathname.includes('/assets/')) assets.push({ path: new URL(response.url()).pathname, status: response.status() }); });
  await page.goto('./');
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.fonts.check('400 30px Almendra') && document.fonts.check('400 15px Literata'))).toBe(true);
  await expect(page.getByRole('link', { name: 'Moonlit Battle Garden home' })).toHaveAttribute('href', '/moonlit-battle-garden/');
  await page.getByRole('button', { name: /Enter the garden/ }).tap();
  await expect(page.locator('canvas')).toBeVisible();
  await expect(page.locator('.match-overlay')).toBeHidden({ timeout: 8000 });
  const board = page.locator('.player-0');
  await expect(page.locator('.player-1')).toHaveCount(0);
  await expect(page.locator('.mobile-opponent')).toHaveCount(0);
  const star = board.locator('.hole[data-kind="star"]').first();
  await expect(star).toBeEnabled({ timeout: 8000 });
  await star.tap();
  await expect(board.locator('.stars')).toHaveAttribute('aria-label', '1 stars');
  await expect(board.locator('.cast-button')).toBeEnabled();
  await page.screenshot({ path: testInfo.outputPath('phone-portrait.png') });
  await board.locator('.cast-button').tap();
  await expect(page.locator('.cast-banner')).toHaveCount(0);
  await expect(board.locator('.stars')).toHaveAttribute('aria-label', '0 stars');
  await page.getByRole('button', { name: 'Pause', exact: true }).tap();
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.fonts.check('700 64px Cinzel'))).toBe(true);
  await page.addStyleTag({ content: '.match-overlay{visibility:hidden!important}' });
  for (const [width, height, filename] of [[320, 568, 'phone-small.png'], [844, 390, 'phone-landscape.png']] as const) {
    await page.setViewportSize({ width, height });
    await expect(page.locator('canvas')).toHaveAttribute('width', String(width));
    await expect(page.locator('canvas')).toHaveAttribute('height', String(height));
    const button = await board.locator('.cast-button').boundingBox();
    expect(button!.height).toBeGreaterThanOrEqual(44);
    expect(button!.x).toBeGreaterThanOrEqual(0); expect(button!.x + button!.width).toBeLessThanOrEqual(width);
    expect(button!.y + button!.height).toBeLessThanOrEqual(height);
    const hole = await board.locator('.hole').nth(4).boundingBox();
    expect(hole!.width).toBeGreaterThanOrEqual(44); expect(hole!.height).toBeGreaterThanOrEqual(44);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth && document.documentElement.scrollHeight <= innerHeight)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(filename) });
  }
  for (const font of ['Almendra-Regular-', 'Literata-Variable-', 'Cinzel-Variable-']) {
    expect(assets.some(asset => asset.path.includes(font) && asset.status === 200), font).toBe(true);
  }
  expect(errors).toEqual([]);
  expect(assets.every(asset => asset.path.startsWith('/moonlit-battle-garden/assets/'))).toBe(true);
  for (const file of ['legacy/garden.png', 'characters.png', 'legacy/earth.png', 'legacy/bar-sheet.png', 'legacy/bar-border.png', 'background-castle.png', 'backgroundMusic.mp3', 'sfx/starHit.wav']) {
    expect(assets.some(asset => asset.path.endsWith(`/assets/${file}`) && (asset.status === 200 || asset.status === 206)), file).toBe(true);
  }
});
