import type { PlayerId } from '../game/types';

// Source-image pixels, measured from garden.png (301 × 383), in keyboard order.
// Feet sit at each cavity's lower lip; the irregular artwork is not a regular grid.
export const gardenArt = {
  width: 301, height: 383, spriteSize: 90, spriteScale: 0.82,
  holes: [
    { x: 63, y: 74 }, { x: 146, y: 76 }, { x: 232, y: 75 },
    { x: 53, y: 178 }, { x: 151, y: 178 }, { x: 241, y: 178 },
    { x: 52, y: 286 }, { x: 148, y: 284 }, { x: 248, y: 289 },
  ],
};
export type Rect = { x: number; y: number; width: number; height: number };
export type GardenLayout = Rect & {
  id: PlayerId; scale: number; lane: Rect; header: Rect; footer: Rect;
  holes: { feet: { x: number; y: number }; hit: Rect }[];
};
export type ArenaLayout = { width: number; height: number; single: boolean; landscape: boolean; opponent: Rect | null; gardens: GardenLayout[] };

export function createArenaLayout(width: number, height: number, mode: 'ai' | 'local'): ArenaLayout {
  const single = mode !== 'local' && (width < 700 || (height < 500 && width < 1000));
  const short = height < 580;
  const landscape = single && width > height;
  const margin = width < 700 ? 12 : 24;
  const top = single ? (short ? 131 : 185) : (short ? 115 : 151);
  const bottom = short ? 88 : 132;
  const laneWidth = width / (single ? 1 : 2);
  const sideHud = Math.min(230, width * 0.25);
  const availableWidth = landscape ? width - 2 * (sideHud + margin) - 16 : laneWidth - margin * 2;
  const availableHeight = landscape ? height - 65 : height - top - bottom;
  const scale = Math.max(0.05, Math.min(availableWidth / gardenArt.width, availableHeight / gardenArt.height));
  const gardenWidth = gardenArt.width * scale;
  const gardenHeight = gardenArt.height * scale;
  const y = landscape ? 57 : top + Math.max(0, (height - top - bottom - gardenHeight) / 2);
  const gardens = (single ? [0] as const : [0, 1] as const).map(id => {
    // Visual side is determined by local identity, never by character or network seat.
    const x = laneWidth * id + (laneWidth - gardenWidth) / 2;
    const hudWidth = landscape ? sideHud : Math.min(laneWidth - margin * 2, 540);
    const hudX = landscape ? margin : laneWidth * id + (laneWidth - hudWidth) / 2;
    return {
      id, x, y, width: gardenWidth, height: gardenHeight, scale,
      lane: { x: laneWidth * id, y: 0, width: laneWidth, height },
      header: { x: hudX, y: landscape ? 78 : single ? (short ? 76 : 100) : 57, width: hudWidth, height: short ? 48 : 78 },
      footer: { x: landscape ? width - margin - hudWidth : hudX, y: height - bottom + 6, width: hudWidth, height: bottom - 12 },
      holes: gardenArt.holes.map(hole => ({
        feet: { x: x + hole.x * scale, y: y + hole.y * scale },
        hit: { x: x + (hole.x - 39) * scale, y: y + (hole.y - 77) * scale, width: 78 * scale, height: 88 * scale },
      })),
    };
  });
  const opponent = !single ? null : landscape
    ? { x: width - margin - sideHud, y: 78, width: sideHud, height: 34 }
    : { x: 12, y: short ? 50 : 57, width: width - 24, height: short ? 22 : 34 };
  return { width, height, single, landscape, opponent, gardens };
}
