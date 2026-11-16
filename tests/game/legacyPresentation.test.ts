import { expect, it } from 'vitest';
import { barSourceOffset, easeLegacyBar, earthPlacements, legacyBar, scoreBarGeometry } from '../../src/render/legacyPresentation';

it('moves one bounded viewport across the original sheet, from all blue through mixed to all red', () => {
  expect(barSourceOffset(100)).toBe(5);
  expect(barSourceOffset(50)).toBe(255);
  expect(barSourceOffset(0)).toBe(505);
  for (let percent = -10; percent <= 110; percent++) {
    const offset = barSourceOffset(percent);
    expect(offset).toBeGreaterThanOrEqual(0);
    expect(offset + legacyBar.viewportWidth).toBeLessThanOrEqual(legacyBar.sheetWidth);
  }
});
it('eases in both directions and converges without overshoot', () => {
  for (const target of [0, 48, 50, 54, 100]) {
    let value = 50;
    for (let frame = 0; frame < 100; frame++) {
      const next = easeLegacyBar(value, target);
      expect(Math.abs(next - target)).toBeLessThanOrEqual(Math.abs(value - target));
      value = next;
    }
    expect(value).toBe(target);
  }
});
it('reserves a single proportionally scaled bar and distinct board-local earth placements', () => {
  for (const [width, height] of [[320, 568], [390, 844], [844, 390], [1440, 900]]) {
    const area = scoreBarGeometry(width, height);
    expect(area.width / area.artHeight).toBeCloseTo(499 / 45);
    expect(area.x).toBeGreaterThanOrEqual(0);
    expect(area.x + area.width).toBeLessThanOrEqual(width);
  }
  expect(earthPlacements[0]).not.toEqual(earthPlacements[1]);
  expect(earthPlacements[0][0].reverse).toBe(true);
  expect(earthPlacements[1].some(item => item.phase !== earthPlacements[0][0].phase)).toBe(true);
});

it('recolors only the original green identity mask in the board base', async () => {
  const { recolorBoard } = await import('../../src/render/legacyPresentation');
  for (const side of [0, 1] as const) {
    const pixels = new Uint8ClampedArray(2 * 312 * 4);
    const put = (x: number, y: number, rgba: number[]) => pixels.set(rgba, (y * 2 + x) * 4);
    const get = (x: number, y: number) => [...pixels.slice((y * 2 + x) * 4, (y * 2 + x) * 4 + 4)];
    put(0, 309, [0, 255, 0, 255]); put(0, 310, [0, 255, 0, 255]);
    put(1, 310, [120, 100, 30, 255]); put(0, 311, [0, 255, 0, 0]);
    recolorBoard(pixels, 2, side);
    expect(get(0, 309)).toEqual([0, 255, 0, 255]);
    expect(get(0, 310)).toEqual(side === 0 ? [0, 0, 128, 255] : [128, 0, 0, 255]);
    expect(get(1, 310)).toEqual([120, 100, 30, 255]);
    expect(get(0, 311)).toEqual([0, 255, 0, 0]);
  }
});

it('scales trophy dimensions and name fonts by two on phones and three on two-board desktop screens', () => {
  const phone = scoreBarGeometry(390, 844), desktop = scoreBarGeometry(1440, 900);
  expect(phone.trophyWidth).toBe(112); expect(phone.trophyHeight).toBe(56); expect(phone.nameSize).toBe(18);
  expect(desktop.trophyWidth).toBe(168); expect(desktop.trophyHeight).toBe(84); expect(desktop.nameSize).toBe(30);
});
