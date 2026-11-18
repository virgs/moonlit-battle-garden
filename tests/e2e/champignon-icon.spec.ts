import { expect, test, type Locator } from '@playwright/test';
import { openSelection, enterMatch } from './frontMenu';

async function expectRealIcon(icon: Locator, character: string) {
  await expect(icon).toHaveAttribute('data-state', 'ready');
  await expect(icon).toHaveAttribute('src', new RegExp(`/assets/characters/${character}/icon\\.png$`));
  await expect.poll(() => icon.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth === 192 && image.naturalHeight === 192)).toBe(true);
}

for (const character of ['champignon', 'andromoss'] as const) test(`${character}: real icon in HUD, pause and round result`, async ({ page }, testInfo) => {
  await openSelection(page, 'local');
  await page.getByRole('button', { name: character === 'champignon' ? 'Next character for Player 2' : 'Next character for Player 1' }).click();
  await enterMatch(page);
  const hud = page.locator(`.score-legend .character-icon[data-character="${character}"]`);
  await expect(hud).toHaveCount(2);
  for (const icon of await hud.all()) await expectRealIcon(icon, character);
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  const pause = page.getByRole('dialog', { name: 'Pause', exact: true });
  await expect(pause).toBeVisible();
  const references = pause.locator(`.menu-hero>.character-icon[data-character="${character}"]`);
  await expect(references).toHaveCount(2);
  for (const icon of await references.all()) await expectRealIcon(icon, character);
  await page.screenshot({ path: testInfo.outputPath(`${character}-icon-pause.png`) });
  await page.getByRole('button', { name: 'Resume', exact: true }).click();
  await expect(page.locator('.player-0 .hole[data-kind="empty"]').first()).toBeEnabled({ timeout: 9000 });
  await page.evaluate(() => {
    const key = document.querySelector('.player-0 .hole[data-kind="empty"]')!.getAttribute('data-key');
    for (let i = 0; i < 1000; i++) window.dispatchEvent(new KeyboardEvent('keydown', { code: `Key${key}` }));
  });
  const result = page.getByRole('region', { name: 'Round result' });
  await expect(result).toBeVisible();
  await expectRealIcon(result.locator('.character-icon'), character);
  await page.screenshot({ path: testInfo.outputPath(`${character}-icon-round-result.png`) });
});
