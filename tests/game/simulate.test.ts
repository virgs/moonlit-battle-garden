import { expect, it } from 'vitest';
import { simulateBattle } from '../../src/game/simulate';

it('reproduces a headless best-of-three match with a real winner and spell coverage', () => {
  const first = simulateBattle(['champignon', 'andy'], 'medium', 1234);
  const repeated = simulateBattle(['champignon', 'andy'], 'medium', 1234);
  expect(first).toEqual(repeated);
  expect(first.timedOut).toBe(false);
  expect(first.winner).not.toBeNull();
  expect(first.rounds).toBeGreaterThanOrEqual(2);
  expect(first.casts.flat().reduce((sum, count) => sum + count, 0)).toBeGreaterThan(0);
});
