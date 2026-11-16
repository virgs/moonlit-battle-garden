import { config } from '../game/config';
import type { Target, TargetKind } from '../game/types';

export const targetOffsets: Record<TargetKind, number> = { mole: 0, star: 8, rabbit: 16 };
export const targetFrameMs = 1000 / 12;
export const targetHitDuration = targetFrameMs * 8;

/** Original atlas: alive / hit / miss / raise, 8 frames per kind in each row. */
export function targetFrame(target: Target, time: number, reduced = false): number {
  const offset = targetOffsets[target.kind];
  if (reduced) return offset;
  const age = Math.max(0, time - target.born);
  // Full ordered rise/hide sequences fit inside the unchanged reaction window.
  const transition = Math.min(targetFrameMs * 8, Math.max(config.tickMs * 8, (target.expires - target.born) * 0.3));
  if (age < transition) return 72 + offset + Math.min(7, Math.floor(age / transition * 8));
  if (time >= target.expires - transition) return 48 + offset + Math.min(7, Math.max(0, Math.floor((time - target.expires + transition) / transition * 8)));
  return offset + Math.floor((age - transition) / targetFrameMs) % 8;
}
export function hitFrame(kind: TargetKind, elapsed: number, reduced = false): number {
  return 24 + targetOffsets[kind] + (reduced ? 7 : Math.min(7, Math.floor(Math.max(0, elapsed) / targetFrameMs)));
}
