import { expect, it } from 'vitest';
import { config } from '../../src/game/config';
import { Match } from '../../src/game/Match';
import { pacingAt, waveDurationMs } from '../../src/game/pacing';
import type { PlayerId, Target } from '../../src/game/types';

const create = () => {
  const match = new Match({ characters: ['champignon', 'andy'], mode: 'local', difficulty: 'medium', seed: 77 });
  match.advance(config.countdownMs);
  return match;
};
function collect(match: Match, duration: number) {
  const traces: [Target[], Target[]] = [[], []];
  for (let time = 0; time < duration; time += config.tickMs) {
    match.advance(config.tickMs);
    for (const id of [0, 1] as PlayerId[]) {
      for (const target of match.state.players[id].holes) if (target) traces[id].push({ ...target, born: target.born - match.state.roundStart, expires: target.expires - match.state.roundStart });
      match.state.players[id].holes.fill(null);
    }
  }
  return traces;
}
const demand = (targets: Target[]) => targets.filter(target => target.origin !== 'magic').map(({ kind, born, expires, origin }) => ({ kind, born, expires, origin }));

it('builds into a peak, recovers, and increases the baseline at matching wave positions', () => {
  const peak = pacingAt(config.pacing.buildMs + 100);
  const recovery = pacingAt(waveDurationMs - 100);
  expect(peak.phase).toBe('peak'); expect(recovery.phase).toBe('recovery');
  expect(peak.intervalMs).toBeLessThan(recovery.intervalMs);
  expect(peak.lifetimeMs).toBeLessThan(recovery.lifetimeMs);
  expect(pacingAt(waveDurationMs * 5).intervalMs).toBeLessThan(pacingAt(0).intervalMs);
  expect(pacingAt(waveDurationMs * 5).lifetimeMs).toBeLessThan(pacingAt(0).lifetimeMs);
});
it('keeps timing smooth at wave transitions and respects hard floors', () => {
  for (const boundary of [config.pacing.buildMs, config.pacing.buildMs + config.pacing.peakMs, waveDurationMs, waveDurationMs * 3]) {
    expect(Math.abs(pacingAt(boundary - 0.01).intervalMs - pacingAt(boundary + 0.01).intervalMs)).toBeLessThan(1);
    expect(Math.abs(pacingAt(boundary - 0.01).lifetimeMs - pacingAt(boundary + 0.01).lifetimeMs)).toBeLessThan(1);
  }
  for (let time = 0; time < 600000; time += 73) {
    const pace = pacingAt(time);
    expect(pace.intervalMs).toBeGreaterThanOrEqual(config.pacing.minIntervalMs);
    expect(pace.lifetimeMs).toBeGreaterThanOrEqual(config.pacing.minLifetimeMs);
    expect(pace.naturalCap).toBeLessThanOrEqual(config.pacing.endNaturalCap + config.pacing.peakExtraTarget);
  }
});
it('offers identical natural target types/times to both players with independent positions', () => {
  const match = create(); const traces = collect(match, waveDurationMs * 2);
  expect(demand(traces[0])).toEqual(demand(traces[1]));
  expect(traces[0].some(target => target.kind === 'star')).toBe(true);
});
it('schedules stars independently, even when magic adds extra targets', () => {
  const normal = create(), attacked = create();
  attacked.state.players[0].decoysUntil = 100000;
  const baseline = collect(normal, waveDurationMs * 2);
  const changed = collect(attacked, waveDurationMs * 2);
  expect(demand(changed[0])).toEqual(demand(baseline[0]));
  expect(demand(changed[1])).toEqual(demand(baseline[1]));
  expect(changed[0].some(target => target.origin === 'magic')).toBe(true);
  const stars = changed[0].filter(target => target.kind === 'star').map(target => target.born);
  expect(stars).toEqual([...config.pacing.starOffsetsMs, ...config.pacing.starOffsetsMs.map(time => time + waveDurationMs)]);
});
it('resets the same demand curve in later rounds without depending on match score', () => {
  const match = create(); const first = collect(match, waveDurationMs * 2);
  match.state.players[0].score = config.winScoreDifference;
  match.state.players[1].holes[0] = null;
  match.action({ type: 'hit', player: 1, hole: 0 });
  expect(match.state.phase).toBe('round-over');
  match.nextRound(); match.advance(config.countdownMs);
  const second = collect(match, waveDurationMs * 2);
  expect(match.state.round).toBe(2);
  expect(demand(second[0])).toEqual(demand(first[0]));
});
it('bounds both normal and magical concurrency under sustained pressure', () => {
  const match = create();
  match.state.players.forEach(player => { player.decoysUntil = 300000; });
  for (let time = 0; time < 150000 && match.state.phase === 'playing'; time += config.tickMs) {
    match.advance(config.tickMs);
    for (const player of match.state.players) {
      expect(player.holes.filter(target => target?.origin === 'magic').length).toBeLessThanOrEqual(config.pacing.maxMagicTargets);
      expect(player.holes.filter(target => target?.kind === 'star').length).toBeLessThanOrEqual(1);
      expect(player.holes.filter(Boolean).length).toBeLessThanOrEqual(8);
      player.score = 0; // Keep the pressure scenario running without a score-difference win.
    }
  }
});
