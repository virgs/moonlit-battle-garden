import { config } from '../game/config';
import type { Target, TargetKind, GameEvent } from '../game/types';

export const targetOffsets: Record<TargetKind, number> = { mole: 0, star: 8, rabbit: 16 };
export const targetFrameMs = 1000 / 12;
export const targetHitDuration = targetFrameMs * 8;
// Keep all source frames; short lifetimes choose a smaller evenly spaced set.
// Raising the lifetime automatically restores intermediate poses.
const minimumTransitionFrameMs = 1000 / 20;

function transitionFrame(elapsed: number, duration: number): number {
  const frameCount = Math.min(8, Math.max(2, Math.floor(duration / Math.max(config.tickMs, minimumTransitionFrameMs))));
  const step = Math.min(frameCount - 1, Math.max(0, Math.floor(elapsed / duration * frameCount)));
  return Math.round(step * 7 / (frameCount - 1));
}

/** Original atlas: alive / hit / miss / raise, 8 frames per kind in each row. */
export function targetFrame(target: Target, time: number, reduced = false): number {
  const offset = targetOffsets[target.kind];
  if (reduced) return offset;
  const age = Math.max(0, time - target.born);
  // Reserve both complete phases inside the lifetime; dancing uses the remainder.
  const transition = Math.min(targetFrameMs * 8, Math.max(config.tickMs * 8, (target.expires - target.born) * 0.3), (target.expires - target.born) / 2);
  if (age < transition) return 72 + offset + transitionFrame(age, transition);
  if (time >= target.expires - transition) return 48 + offset + transitionFrame(time - target.expires + transition, transition);
  return offset + Math.floor((age - transition) / targetFrameMs) % 8;
}
export function hitFrame(kind: TargetKind, elapsed: number, reduced = false): number {
  return 24 + targetOffsets[kind] + (reduced ? 7 : Math.min(7, Math.floor(Math.max(0, elapsed) / targetFrameMs)));
}

/** Armor contact is a shield reaction, not a target death animation. */
export function playsTargetHit(event:GameEvent):boolean {
 return event.reason!=='empty'&&event.reason!=='miss'&&!(event.kind==='shield'&&event.targetKind==='mole'&&!event.reason);
}
