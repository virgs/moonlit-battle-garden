import { expect, it } from 'vitest';
import { Match } from '../../src/game/Match';
import { roundStanding } from '../../src/game/standing';
import { chooseHome } from '../../src/game/homes';
import type { MatchOptions } from '../../src/game/types';
import { config } from '../../src/game/config';

const options: MatchOptions = { characters: ['champignon', 'andromoss'], mode: 'local', difficulty: 'medium', seed: 1234 };
function state() { const match = new Match(options); match.state.phase = 'playing'; return match.state; }

it('starts centered and uses only score difference', () => {
  const match = state();
  expect(roundStanding(match)).toEqual({ bluePercent: 50, leader: null });
  match.players[0].score = 10;
  match.players[1].score = 20;
  expect(roundStanding(match).leader).toBe(1);
  expect(roundStanding(match).bluePercent).toBeLessThan(50);
});
it('scales linearly from a tie through half the winning lead to a full bar', () => {
  const match = state();
  match.players[0].score = config.winScoreDifference / 2;
  const standing = roundStanding(match);
  expect(standing.leader).toBe(0);
  expect(standing.bluePercent).toBe(75);
  match.players[0].score = config.winScoreDifference;
  expect(roundStanding(match).bluePercent).toBe(100);
  match.players[0].score = -config.winScoreDifference;
  expect(roundStanding(match).bluePercent).toBe(0);
  match.players[1].score = -config.winScoreDifference;
  expect(roundStanding(match)).toEqual({ bluePercent: 50, leader: null });
});
it('settles on the authoritative round result', () => {
  const match = state();
  match.phase = 'round-over'; match.players[0].score = 500;
  expect(roundStanding(match)).toEqual({ bluePercent: 50, leader: null });
  match.winner = 1;
  expect(roundStanding(match)).toEqual({ bluePercent: 0, leader: 1 });
  match.winner = 0;
  expect(roundStanding(match)).toEqual({ bluePercent: 100, leader: 0 });
});
it('resets the indicator for a new round countdown', () => {
  const match = state(); match.players[0].score = 99; match.phase = 'countdown';
  expect(roundStanding(match)).toEqual({ bluePercent: 50, leader: null });
});
it('selects one participating character home deterministically without consuming gameplay random state', () => {
  const owners = new Set<string>();
  for (let seed = 0; seed < 30; seed++) {
    const input = { ...options, seed };
    const home = chooseHome(input);
    expect(options.characters).toContain(home.owner);
    expect(chooseHome(input)).toEqual(home);
    owners.add(home.owner);
  }
  expect(owners.size).toBe(2);
  expect(chooseHome({ ...options, characters: ['andromoss', 'andromoss'] }).owner).toBe('andromoss');
  const before = new Match(options); chooseHome(options); const after = new Match(options);
  before.advance(10000); after.advance(10000);
  expect(after.state).toEqual(before.state);
});
