import type { PlayerId } from '../game/types';

export const legacyBar = { width: 499, height: 45, sheetWidth: 1010, sheetHeight: 164, frameHeight: 41, viewportWidth: 493, viewportHeight: 41, fps: 12 };

export function barSourceOffset(bluePercent: number): number {
  return 5 + 500 * (1 - Math.max(0, Math.min(100, bluePercent)) / 100);
}
export function easeLegacyBar(current: number, target: number): number {
  const delta = target - current;
  return current + Math.sign(delta) * Math.min(Math.abs(delta), Math.floor(Math.abs(delta) / 10) + 1);
}
export function scoreBarGeometry(width: number, height: number) {
  const compact = width < 700 || (height < 500 && width < 1000);
  const hudScale = compact ? 2 : 3;
  const barWidth = Math.min(width - 24, height < 580 ? 320 : 560);
  const artHeight = barWidth * legacyBar.height / legacyBar.width;
  const nameSize = (width <= 500 ? 9 : 10) * hudScale;
  const nameHeight = compact ? 24 : 66, trophyWidth = 56 * hudScale, trophyHeight = 28 * hudScale;
  const total = artHeight + nameHeight + 2 + trophyHeight;
  return { viewportWidth: width, x: (width - barWidth) / 2, y: 12, width: barWidth, height: total, reserve: Math.ceil(total + 4), artHeight, nameSize, nameHeight, trophyWidth, trophyHeight };
}

// Fase.cpp: board origins were (50,200)/(450,200); earth origins
// were (110,560), (610,560), (710,560). Reverse the left sequence.
export const earthPlacements: Record<PlayerId, { x: number; y: number; phase: number; reverse: boolean }[]> = {
  0: [{ x: 60, y: 360, phase: 0, reverse: true }],
  1: [{ x: 160, y: 360, phase: 1, reverse: false }, { x: 260, y: 360, phase: 0, reverse: false }],
};
export const earthFrameSize = 45;
export const rootStripTop = 320;

export const sideColors = [0x000080, 0x800000] as const;
export const legacyStars = { width: 60, height: 200, columns: 7, rows: 5, fps: 12 };
export const legacyTrophy = { width: 150, height: 75, columns: 6, rows: 3, fps: 12 };
/** Original Player::mudaCor changes only exact green pixels below row 310. */
export function recolorBoard(pixels: Uint8ClampedArray, width: number, side: PlayerId): void {
  for (let i = 310 * width * 4; i < pixels.length; i += 4) {
    if (pixels[i] === 0 && pixels[i + 1] === 255 && pixels[i + 2] === 0 && pixels[i + 3]) {
      const color = sideColors[side];
      pixels[i] = color >> 16 & 255; pixels[i + 1] = color >> 8 & 255; pixels[i + 2] = color & 255;
    }
  }
}
export function legacyRewardFrame(elapsedMs: number, reduced = false): number {
  if (reduced) return 2;
  const step = Math.floor((Math.max(0, elapsedMs) + 0.000001) * 12 / 1000);
  return step < 2 ? step : 2 + (step - 2) % 4;
}
