import { describe, expect, it } from 'vitest';
import { createArenaLayout, gardenArt } from '../../src/render/layout';

const screens = [[320, 568], [390, 844], [844, 390], [768, 1024], [1024, 600], [1440, 900], [2560, 1080], [3840, 2160]];
describe.each(['ai', 'local', 'online'] as const)('%s viewport layout', mode => {
  it.each(screens)('fits %i × %i with uniform artwork and separate board/star hit regions', (width, height) => {
    const layout = createArenaLayout(width, height, mode);
    for (const board of layout.gardens) {
      expect(board.width / board.height).toBeCloseTo(gardenArt.width / gardenArt.height);
      expect(board.x).toBeGreaterThanOrEqual(0);
      expect(board.y).toBeGreaterThan(layout.score.y + layout.score.height);
      expect(board.x + board.width).toBeLessThanOrEqual(width);
      expect(board.y + board.height).toBeLessThanOrEqual(height);
      expect(board.stars.x).toBeGreaterThanOrEqual(0);
      expect(board.stars.y).toBeGreaterThanOrEqual(layout.score.y + layout.score.height);
      expect(board.stars.x + board.stars.width).toBeLessThanOrEqual(width);
      expect(board.stars.y + board.stars.height).toBeLessThanOrEqual(height);
      if (board.starsBelow) expect(board.stars.y).toBeGreaterThan(board.y + board.height);
      else {
        expect(board.stars.width / board.stars.height).toBeCloseTo(board.horizontalStars ? 4 : 60 / 200);
        expect(board.id === 0 ? board.stars.x + board.stars.width < board.x : board.stars.x > board.x + board.width).toBe(true);
      }
      for (const { feet, hit } of board.holes) {
        expect(hit.x).toBeGreaterThanOrEqual(0); expect(hit.y).toBeGreaterThanOrEqual(layout.score.y + layout.score.height);
        expect(hit.x + hit.width).toBeLessThanOrEqual(width); expect(hit.y + hit.height).toBeLessThanOrEqual(height);
        expect(feet.x).toBeCloseTo(hit.x + hit.width / 2); expect(feet.y).toBeLessThan(hit.y + hit.height);
      }
    }
    if (!layout.single) {
      expect(layout.gardens[0].x + layout.gardens[0].width).toBeLessThan(width / 2);
      expect(layout.gardens[1].x).toBeGreaterThan(width / 2);
      expect(layout.gardens[0].scale).toBe(layout.gardens[1].scale);
    } else expect(layout.gardens.map(board => board.id)).toEqual([0]);
  });
});
