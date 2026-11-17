import { config } from './config';

const tuning = config.pacing;
export const waveDurationMs = tuning.buildMs + tuning.peakMs + tuning.recoveryMs;
const blend = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);

/** Only elapsed time inside the current round affects natural difficulty. */
export function pacingAt(elapsedMs: number) {
  const elapsed = Math.max(0, elapsedMs);
  const position = elapsed % waveDurationMs;
  const progress = Math.min(1, elapsed / tuning.rampMs);
  const phase = position < tuning.buildMs ? 'build' : position < tuning.buildMs + tuning.peakMs ? 'peak' : 'recovery';
  const pressure = phase === 'build' ? smooth(position / tuning.buildMs) : phase === 'peak' ? 1
    : 1 - smooth((position - tuning.buildMs - tuning.peakMs) / tuning.recoveryMs);
  return {
    wave: Math.floor(elapsed / waveDurationMs) + 1, phase, pressure,
    intervalMs: Math.max(tuning.minIntervalMs, blend(tuning.startIntervalMs, tuning.endIntervalMs, progress) * blend(tuning.intervalCalm, tuning.intervalPeak, pressure)),
    lifetimeMs: Math.max(tuning.minLifetimeMs, blend(tuning.startLifetimeMs, tuning.endLifetimeMs, progress) * blend(tuning.lifetimeCalm, tuning.lifetimePeak, pressure)),
    naturalCap: Math.min(tuning.endNaturalCap + tuning.peakExtraTarget, tuning.startNaturalCap + Math.floor(progress * (tuning.endNaturalCap - tuning.startNaturalCap)) + (pressure >= 0.7 ? tuning.peakExtraTarget : 0)),
    rabbitChance: blend(tuning.rabbitStart, tuning.rabbitEnd, progress) + pressure * tuning.rabbitPeakExtra,
  };
}

/** A lead never slows the winner; only the trailing board gets bounded extra opportunity/pressure. */
export function playerPacingAt(elapsedMs: number, score: number, opponentScore: number) {
  const base = pacingAt(elapsedMs);
  const deficit = Math.max(0, Math.min(1, (opponentScore - score) / config.winScoreDifference));
  const intervalScale = 1 - tuning.scoreIntervalReduction * deficit;
  const lifetimeScale = 1 - tuning.scoreLifetimeReduction * deficit;
  return {
    ...base, deficit, clockRate: 1 / intervalScale,
    intervalMs: Math.max(tuning.minIntervalMs, base.intervalMs * intervalScale),
    lifetimeMs: Math.max(tuning.minLifetimeMs, base.lifetimeMs * lifetimeScale),
    starLifetimeMs: Math.max(tuning.minLifetimeMs, tuning.starLifetimeMs * lifetimeScale),
  };
}
