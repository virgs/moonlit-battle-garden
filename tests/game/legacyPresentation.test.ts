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
    expect(area.width / (area.height - 12)).toBeCloseTo(499 / 45);
    expect(area.x).toBeGreaterThanOrEqual(0);
    expect(area.x + area.width).toBeLessThanOrEqual(width);
  }
  expect(earthPlacements[0]).not.toEqual(earthPlacements[1]);
  expect(earthPlacements[0][0].reverse).toBe(true);
  expect(earthPlacements[1].some(item => item.phase !== earthPlacements[0][0].phase)).toBe(true);
});
