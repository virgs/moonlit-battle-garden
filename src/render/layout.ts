import type { PlayerId } from '../game/types';
import { scoreBarGeometry } from './legacyPresentation';

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
  id: PlayerId; scale: number; lane: Rect; stars: Rect; horizontalStars: boolean; starsBelow: boolean;
  holes: { feet: { x: number; y: number }; hit: Rect }[];
};
export type ArenaLayout = { width: number; height: number; single: boolean; landscape: boolean; score: ReturnType<typeof scoreBarGeometry>; gardens: GardenLayout[] };

export function createArenaLayout(width: number, height: number, mode: 'ai' | 'local' | 'online'): ArenaLayout {
  const single = mode !== 'local' && (width < 700 || (height < 500 && width < 1000));
  const landscape = single && width > height;
  const margin = width < 700 ? 12 : landscape ? 24 : 36;
  const score = scoreBarGeometry(width, height);
  if (single && !landscape) { score.height += 28; score.reserve += 28; }
  const top = score.y + score.height + 12;
  const availableHeight = Math.max(1, height - top - margin);
  const laneWidth = width / (single ? 1 : 2);
  // Use a vertical column beside the board, including centered phone landscape.
  // Narrow portrait lanes can use a horizontal strip below the board.
  const starsBelow = laneWidth < 440 && height >= width;
  const horizontalStars = starsBelow;
  const starWidth = starsBelow ? Math.min(320, laneWidth - 2 * margin) : Math.min(96, availableHeight * 0.24);
  const starHeight = horizontalStars ? Math.max(44, starWidth / 4) : starWidth * 200 / 60;
  const gap = width < 700 ? 12 : 20;
  const availableWidth = landscape ? width - 2 * (margin + starWidth + gap) : laneWidth - margin * 2 - (starsBelow ? 0 : starWidth + gap);
  const boardSpace = availableHeight - (starsBelow ? starHeight + gap : 0);
  const scale = Math.max(0.05, Math.min(availableWidth / gardenArt.width, boardSpace / (gardenArt.height + 26)));
  const boardWidth = gardenArt.width * scale;
  const boardHeight = gardenArt.height * scale;
  const tail = 22 * scale;
  const groupHeight = 4 * scale + boardHeight + tail + (starsBelow ? starHeight + gap : 0);
  const y = top + 4 * scale + Math.max(0, (availableHeight - groupHeight) / 2);
  const gardens = (single ? [0] as const : [0, 1] as const).map(id => {
    const groupWidth = boardWidth + (starsBelow ? 0 : starWidth + gap);
    const groupX = laneWidth * id + (laneWidth - groupWidth) / 2;
    const x = landscape ? (width - boardWidth) / 2 : groupX + (!starsBelow && id === 0 ? starWidth + gap : 0);
    const stars = starsBelow
      ? { x: laneWidth * id + (laneWidth - starWidth) / 2, y: y + boardHeight + tail + gap, width: starWidth, height: starHeight }
      : { x: landscape ? x - gap - starWidth : id === 0 ? groupX : x + boardWidth + gap, y: y + (boardHeight - starHeight) / 2, width: starWidth, height: starHeight };
    return {
      id, x, y, width: boardWidth, height: boardHeight, scale, stars, horizontalStars, starsBelow,
      lane: { x: laneWidth * id, y: 0, width: laneWidth, height },
      holes: gardenArt.holes.map(hole => ({
        feet: { x: x + hole.x * scale, y: y + hole.y * scale },
        hit: { x: x + (hole.x - 39) * scale, y: y + (hole.y - 77) * scale, width: 78 * scale, height: 88 * scale },
      })),
    };
  });
  return { width, height, single, landscape, score, gardens };
}
