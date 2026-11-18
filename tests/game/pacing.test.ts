import { expect, it } from 'vitest';
import { config } from '../../src/game/config';
import { Match } from '../../src/game/Match';
import { pacingAt, playerPacingAt, waveDurationMs } from '../../src/game/pacing';
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
it('uses reproducible independent natural schedules for the two boards', () => {
  const match = create(); const traces = collect(match, waveDurationMs * 2);
  const repeat = collect(create(), waveDurationMs * 2);
  expect(demand(traces[0])).not.toEqual(demand(traces[1]));
  expect(demand(traces[0])).toEqual(demand(repeat[0]));
  expect(demand(traces[1])).toEqual(demand(repeat[1]));
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

it.each([0, 1] as const)('gives trailing board %i faster offers, earlier stars and shorter windows without changing the leader', loser => {
  const baseline = create(), trailing = create();
  trailing.state.players[loser].score = -80;
  const normal = collect(baseline, waveDurationMs * 5), faster = collect(trailing, waveDurationMs * 5);
  const leader = loser === 0 ? 1 : 0;
  expect(demand(faster[leader])).toEqual(demand(normal[leader]));
  expect(faster[loser].filter(target => target.origin === 'natural').length).toBeGreaterThan(normal[loser].filter(target => target.origin === 'natural').length);
  const stars = faster[loser].filter(target => target.kind === 'star');
  expect(stars[0].born).toBeLessThan(config.pacing.starOffsetsMs[0]);
  expect(stars.length).toBeGreaterThan(normal[loser].filter(target => target.kind === 'star').length);
  for (const target of faster[loser]) {
    const pace = playerPacingAt(target.born, -80, 0);
    expect(target.expires - target.born).toBe(Math.round(target.kind === 'star' ? pace.starLifetimeMs : pace.lifetimeMs));
  }
});
it('bounds score pressure smoothly, follows the current deficit and ignores round wins/absolute scores', () => {
  const elapsed = 12000;
  const tied = playerPacingAt(elapsed, 20, 20), losing = playerPacingAt(elapsed, -50, 0);
  expect(tied.deficit).toBe(0); expect(tied.clockRate).toBe(1);
  expect(losing.clockRate).toBeCloseTo(1 / 0.975);
  expect(losing.lifetimeMs).toBeCloseTo(pacingAt(elapsed).lifetimeMs * 0.975);
  expect(playerPacingAt(elapsed, 950, 1000)).toEqual(losing);
  expect(playerPacingAt(elapsed, 50, 0)).toEqual(playerPacingAt(elapsed, 0, 0));
  expect(playerPacingAt(elapsed, -1000, 0)).toEqual(playerPacingAt(elapsed, -100, 0));
  for(let time=0;time<300000;time+=173) {
    const pace = playerPacingAt(time,-99,0);
    expect(pace.clockRate).toBeLessThanOrEqual(1 / (1 - config.pacing.scoreIntervalReduction));
    expect(pace.intervalMs).toBeGreaterThanOrEqual(config.pacing.minIntervalMs);
    expect(pace.lifetimeMs).toBeGreaterThanOrEqual(config.pacing.minLifetimeMs);
    expect(pace.starLifetimeMs).toBeGreaterThanOrEqual(config.pacing.minLifetimeMs);
  }
});
it('does not shorten a target that is already visible when the score changes', () => {
  const match = create(); match.advance(500);
  const target = match.state.players[0].holes.find(target=>target)!;
  const expires = target.expires;
  match.state.players[0].score = -80; match.advance(config.tickMs);
  expect(match.state.players[0].holes.find(item=>item?.id===target.id)?.expires).toBe(expires);
});
it('respects actual spawn floors and concurrency even when the lead reverses every tick', () => {
  const match = create(), seen = new Set<number>(), last=[-Infinity,-Infinity];
  for(let time=0;time<180000;time+=config.tickMs) {
    match.state.players.forEach((player,id)=>{player.score=(Math.floor(time/config.tickMs)%2===id)?-99:0;player.decoysUntil=300000;});
    match.advance(config.tickMs);
    for(const id of [0,1] as const) {
      const player=match.state.players[id];
      for(const target of player.holes)if(target&&!seen.has(target.id)) {
        seen.add(target.id);
        if(target.origin==='natural') {expect(target.born-last[id]).toBeGreaterThanOrEqual(config.pacing.minIntervalMs);last[id]=target.born;}
      }
      expect(player.holes.filter(target=>target?.origin==='magic').length).toBeLessThanOrEqual(config.pacing.maxMagicTargets);
      expect(player.holes.filter(target=>target?.kind==='star').length).toBeLessThanOrEqual(1);
      expect(player.holes.filter(Boolean).length).toBeLessThanOrEqual(8);
      player.holes.fill(null);
    }
  }
});
