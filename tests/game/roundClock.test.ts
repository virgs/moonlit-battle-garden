import { expect, test } from 'vitest';
import { roundClock } from '../../src/presentation/roundClock';

test('round clock formats elapsed gameplay time without rounding up', () => {
  expect(roundClock(-50)).toBe('00:00');
  expect(roundClock(999)).toBe('00:00');
  expect(roundClock(32_900)).toBe('00:32');
  expect(roundClock(60_000)).toBe('01:00');
  expect(roundClock(3_599_999)).toBe('59:59');
  expect(roundClock(3_661_000)).toBe('1:01:01');
});
