import { expect, test } from '@playwright/test';
import { png } from './assetFixtures';

async function openMenu(page: import('@playwright/test').Page) {
  await page.goto('/');
  await page.getByRole('button', { name: 'Local two player' }).click();
  await page.getByRole('button', { name: /Enter the garden/ }).click();
  await expect(page.locator('.player-0 .hole').first()).toBeEnabled({ timeout: 9000 });
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Pause', exact: true })).toBeVisible();
}

test('pause has left actions, board-shaped sprite key maps and spell titles on the right at every size', async ({ page }) => {
  await openMenu(page);
  await expect(page.getByText('Block the next mistake for 12 seconds.', { exact: true })).toHaveCount(0);
  await expect(page.locator('.hero-spells li')).toHaveCount(8);
  for (const [width, height] of [[1440, 900], [1024, 768], [768, 1024], [390, 844], [320, 568], [844, 390], [667, 375]]) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('.menu-heading h2')).toHaveCSS('font-family', 'Cinzel, Georgia, serif');
    await expect(page.locator('.menu-heading h2')).toHaveCSS('text-transform', 'uppercase');
    const hierarchy = await page.evaluate(() => ({ title: parseFloat(getComputedStyle(document.querySelector('.menu-heading h2')!).fontSize), action: parseFloat(getComputedStyle(document.querySelector('.menu-actions button')!).fontSize), spell: parseFloat(getComputedStyle(document.querySelector('.hero-spells li')!).fontSize), key: document.querySelector('.control-key')!.getBoundingClientRect().width }));
    expect(hierarchy.title).toBeGreaterThan(hierarchy.action);
    expect(hierarchy.action).toBeGreaterThan(hierarchy.spell * 1.5);
    expect(hierarchy.key).toBeLessThanOrEqual(width > 700 && height > 520 ? 40 : 24);
    expect(await page.getByRole('button', { name: 'Resume', exact: true }).evaluate(element => getComputedStyle(element, '::before').opacity)).toBe('1');
    const actions = (await page.locator('.menu-actions').boundingBox())!;
    const reference = (await page.locator('.menu-reference').boundingBox())!;
    if(width < 700 && height > width) expect(reference.y).toBeGreaterThanOrEqual(actions.y + actions.height);
    else expect(actions.x + actions.width).toBeLessThanOrEqual(reference.x);
    expect(width - reference.x - reference.width).toBeCloseTo(actions.x, 0);
    const outerGaps = await page.evaluate(() => {
      const range = document.createRange(); range.selectNodeContents(document.querySelector('.menu-actions button')!);
      const left = range.getBoundingClientRect().left;
      const right = Math.max(...[...document.querySelectorAll('.hero-spells li>span:last-child')].map(element => { const span=document.createRange(); span.selectNodeContents(element); return span.getBoundingClientRect().right; }));
      return { left, right: innerWidth - right };
    });
    expect(Math.abs(outerGaps.left - outerGaps.right)).toBeLessThanOrEqual(1);
    for (const name of ['Resume', 'Mute', 'Quit']) {
      const button = page.getByRole('button', { name, exact: true });
      await expect(button).toBeInViewport();
      expect(await button.evaluate(element => { const range=document.createRange(); range.selectNodeContents(element); return range.getBoundingClientRect().width <= element.getBoundingClientRect().width + 0.01; })).toBe(true);
    }
    const referenceArea = page.locator('.menu-reference');
    expect(await referenceArea.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    await referenceArea.evaluate(element => { element.scrollTop = 0; });
    for (const [id, labels] of [[0, ['Q','W','E','A','S','D','Z','X','C']], [1, ['7','8','9','4','5','6','1','2','3']]] as const) {
      const grid = page.locator('.board-key-grid').nth(id);
      expect(await grid.locator('kbd').evaluateAll(keys => keys.map(key => key.getAttribute('aria-label')))).toEqual(labels);
      for (let index = 0; index < 9; index++) {
        const image = grid.locator('img').nth(index);
        await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBe(16);
      }
      const positions = await grid.locator('kbd').evaluateAll(keys => keys.map(key => { const box=key.getBoundingClientRect(); return {x:box.x,y:box.y}; }));
      expect(positions[0].y).toBe(positions[2].y); expect(positions[3].y).toBeGreaterThan(positions[0].y);
      expect(positions[0].x).toBe(positions[3].x); expect(positions[1].x).toBe(positions[7].x);
    }
    await referenceArea.evaluate(element => { element.scrollTop = element.scrollHeight; });
    await expect(page.getByRole('listitem', { name: '4 stars: Double Trouble' })).toBeInViewport();
    await expect(page.getByRole('button', { name: 'Resume', exact: true })).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth && document.documentElement.scrollHeight <= innerHeight)).toBe(true);
  }
});

test('pause action keyboard navigation toggles sound, traps focus and resumes', async ({ page }) => {
  await openMenu(page);
  await expect(page.getByRole('button', { name: 'Resume', exact: true })).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('button', { name: 'Mute', exact: true })).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByRole('button', { name: 'Resume', exact: true })).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('button', { name: 'Mute', exact: true })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Unmute', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('button', { name: 'Quit', exact: true })).toBeFocused();
  await page.keyboard.press('Tab'); await expect(page.locator('.menu-reference')).toBeFocused();
  await page.keyboard.press('Tab'); await expect(page.getByRole('button', { name: 'Resume', exact: true })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('.player-0 .hole').first()).toBeEnabled();
});

for (const supplied of [false, true]) test(`portrait AI character headings align with ${supplied ? 'supplied' : 'missing'} icons`, async ({ page }) => {
  await page.route(/\/assets\/characters\/[^/]+\/icon\.png$/, route => supplied ? route.fulfill({ contentType: 'image/png', body: png(64, 64) }) : route.fulfill({ status: 404 }));
  await page.goto('/');
  await page.getByRole('button', { name: /Enter the garden/ }).click();
  await expect(page.locator('.player-0 .hole').first()).toBeEnabled({ timeout: 9000 });
  await page.keyboard.press('Escape');
  for (const [width, height] of [[390,844], [320,568]]) {
    await page.setViewportSize({ width, height });
    const headings = page.locator('.menu-hero h3');
    const first = (await headings.nth(0).boundingBox())!, second = (await headings.nth(1).boundingBox())!;
    expect(second.x).toBeCloseTo(first.x, 0);
    const icons = page.locator('.menu-hero>.character-icon');
    await expect(icons).toHaveCount(2);
    for (const icon of await icons.all()) {
      if (supplied) { await expect(icon).toBeVisible(); await expect(icon).toHaveAttribute('data-state','ready'); }
      else await expect(icon).toBeHidden();
    }
    await page.locator('.menu-reference').evaluate(element => { element.scrollTop = element.scrollHeight; });
    await expect(page.getByRole('listitem', { name: '4 stars: Double Trouble' })).toBeInViewport();
    expect(await page.locator('.menu-reference').evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
  }
});
