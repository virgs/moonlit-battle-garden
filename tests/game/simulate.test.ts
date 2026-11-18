import { expect, it } from 'vitest';
import { config } from '../../src/game/config';
import { simulateBattle } from '../../src/game/simulate';

it('reproduces a headless best-of-three match with a real winner and spell coverage', () => {
  const first = simulateBattle(['champignon', 'andy'], 'medium', 1234);
  const repeated = simulateBattle(['champignon', 'andy'], 'medium', 1234);
  expect(first).toEqual(repeated);
  expect(first.timedOut).toBe(false);
  expect(first.roundDurationsMs).toHaveLength(first.rounds);
  expect(first.roundDurationsMs.reduce((sum,time)=>sum+time,0)).toBe(first.durationMs);
  expect(first.unfinishedRoundMs).toBeNull();
  expect(first.winner).not.toBeNull();
  expect(first.rounds).toBeGreaterThanOrEqual(2);
  expect(first.casts.flat().reduce((sum, count) => sum + count, 0)).toBeGreaterThan(0);
});

it('keeps an unfinished round separate from completed round durations at the diagnostic cap',()=>{
  const original=config.maxSimulationMs;
  try{
    config.maxSimulationMs=500;
    const result=simulateBattle(['andy','andy'],'hard',1234);
    expect(result.timedOut).toBe(true);expect(result.winnerSide).toBeNull();
    expect(result.roundDurationsMs).toEqual([]);expect(result.unfinishedRoundMs).toBe(500);
    expect(result.durationMs).toBe(500);
  }finally{config.maxSimulationMs=original;}
});
