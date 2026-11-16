import { describe, expect, it } from 'vitest';
import { createArenaLayout, gardenArt } from '../../src/render/layout';

const screens = [[320, 568], [390, 844], [844, 390], [768, 1024], [1024, 600], [1440, 900], [2560, 1080], [3840, 2160]];
describe.each(['ai', 'local'] as const)('%s viewport layout', mode => {
  it.each(screens)('fits %i × %i without distorting artwork or hiding active holes', (width, height) => {
    const layout = createArenaLayout(width, height, mode);
    for (const board of layout.gardens) {
      expect(board.width / board.height).toBeCloseTo(gardenArt.width / gardenArt.height);
      expect(board.x).toBeGreaterThanOrEqual(0);
      if (!layout.landscape) expect(board.y).toBeGreaterThanOrEqual(board.header.y + board.header.height);
      expect(board.x + board.width).toBeLessThanOrEqual(width);
      expect(board.y + board.height).toBeLessThanOrEqual(layout.landscape ? height : board.footer.y);
      expect(board.footer.y + board.footer.height).toBeLessThanOrEqual(height);
      for (const { feet, hit } of board.holes) {
        expect(hit.x).toBeGreaterThanOrEqual(0);
        expect(hit.y).toBeGreaterThanOrEqual(layout.landscape ? 49 : board.header.y + board.header.height);
        expect(hit.x + hit.width).toBeLessThanOrEqual(width);
        expect(hit.y + hit.height).toBeLessThanOrEqual(layout.landscape ? height : board.footer.y);
        expect(feet.x).toBeCloseTo(hit.x + hit.width / 2);
        expect(feet.y).toBeLessThan(hit.y + hit.height);
      }
      if (layout.landscape) {
        expect(board.header.x + board.header.width).toBeLessThan(board.x);
        expect(board.footer.x).toBeGreaterThan(board.x + board.width);
      }
    }
    if (!layout.single) {
      expect(layout.gardens[0].x + layout.gardens[0].width).toBeLessThan(width / 2);
      expect(layout.gardens[1].x).toBeGreaterThan(width / 2);
      expect(layout.gardens[0].scale).toBe(layout.gardens[1].scale);
    } else expect(layout.gardens.map(board => board.id)).toEqual([0]);
  });
});
