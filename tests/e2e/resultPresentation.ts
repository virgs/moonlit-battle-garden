import { expect, type Page } from '@playwright/test';

/** Check actual board pixels rather than just the presence of a covered canvas. */
export async function expectClearResult(page: Page) {
  const overlay = page.locator('.match-end');
  await expect(overlay).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expect(overlay).toHaveCSS('background-image', 'none');
  await expect(overlay).toHaveCSS('backdrop-filter', 'none');
  await expect(page.locator('canvas')).toHaveCount(1);
  const board = page.locator('.player-0');
  const x = Number(await board.getAttribute('data-board-x'));
  const y = Number(await board.getAttribute('data-board-y'));
  const scale = Number(await board.getAttribute('data-board-scale'));
  // Source coordinates inside the upper-left board rim, away from result text/art.
  const clip = { x: Math.ceil(x + 18 * scale), y: Math.ceil(y + 15 * scale), width: 18, height: 18 };
  const shown = await page.screenshot({ clip });
  const hidden = await page.addStyleTag({ content: '.match-end{visibility:hidden!important}' });
  const uncovered = await page.screenshot({ clip });
  await hidden.evaluate(element => (element as HTMLStyleElement).remove());
  expect(shown.equals(uncovered), 'Result overlay must leave the board pixels completely visible').toBe(true);
  const colors = await page.evaluate(async data => {
    const image = new Image(); image.src = `data:image/png;base64,${data}`; await image.decode();
    const canvas = document.createElement('canvas'); canvas.width=image.width; canvas.height=image.height;
    const context=canvas.getContext('2d')!; context.drawImage(image,0,0);
    const pixels=context.getImageData(0,0,canvas.width,canvas.height).data;
    const unique=new Set<string>();
    for(let i=0;i<pixels.length;i+=4)unique.add(`${pixels[i]},${pixels[i+1]},${pixels[i+2]}`);
    return unique.size;
  }, shown.toString('base64'));
  expect(colors, 'The board must contain rendered artwork, not a flat blank canvas').toBeGreaterThan(3);
}
