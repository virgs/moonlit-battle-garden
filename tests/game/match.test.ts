import { describe, expect, it } from 'vitest';
import { Match } from '../../src/game/Match';
import { Bot } from '../../src/game/Bot';
import { config } from '../../src/game/config';
import type { CharacterId, Difficulty, PlayerId, TargetKind } from '../../src/game/types';

function create(characters: [CharacterId, CharacterId] = ['champignon', 'andy']) {
  const match = new Match({ characters, mode: 'local', difficulty: 'medium', seed: 42 });
  match.advance(config.countdownMs);
  return match;
}
function target(match: Match, kind: TargetKind, player: PlayerId = 0, hole = 0) {
  match.state.players[player].holes[hole] = { id: 999 + hole, kind, born: match.state.time, expires: match.state.time + 2000 };
}

describe('match rules', () => {
  it('runs deterministically regardless of update batch sizes', () => {
    const a = create(), b = create();
    a.advance(12000);
    for (let i = 0; i < 240; i++) b.advance(50);
    expect(a.state).toEqual(b.state);
  });
  it('ignores actions during countdown and pause', () => {
    const match = new Match({ characters: ['champignon', 'andy'], mode: 'local', difficulty: 'easy', seed: 1 });
    match.action({ type: 'hit', player: 0, hole: 0 });
    match.state.paused = true; match.advance(10000);
    expect(match.state.time).toBe(0); expect(match.state.players[0].score).toBe(0);
  });
  it('awards hits and stars, and subtracts points for rabbits and empty hits', () => {
    const match = create(); const player = match.state.players[0];
    target(match, 'mole'); match.action({ type: 'hit', player: 0, hole: 0 });
    expect(player.score).toBeGreaterThan(0);
    target(match, 'star'); match.action({ type: 'hit', player: 0, hole: 0 });
    expect(player.stars).toBe(1);
    const earned = player.score;
    target(match, 'rabbit'); match.action({ type: 'hit', player: 0, hole: 0 });
    expect(player.score).toBeLessThan(earned);
    const afterRabbit = player.score;
    match.action({ type: 'hit', player: 0, hole: 0 });
    expect(player.score).toBeLessThan(afterRabbit);
  });
  it('only missed moles subtract points', () => {
    const match = create();
    target(match, 'star', 0, 0); target(match, 'rabbit', 0, 1);
    match.advance(2000);
    expect(match.state.players[0].score).toBe(0);
    target(match, 'mole', 0, 0); match.advance(2000);
    expect(match.state.players[0].score).toBeLessThan(0);
  });
  it('wins at X points of lead, resets scores, and finishes at two round wins', () => {
    const match = create();
    for (let i = 0; i < 2; i++) {
      match.state.players[0].score = config.winScoreDifference - config.points.mole;
      target(match, 'mole'); match.action({ type: 'hit', player: 0, hole: 0 });
      expect(match.state.players[0].wins).toBe(i + 1);
      if (!i) {
        expect(match.state.phase).toBe('round-over'); match.nextRound();
        expect(match.state.players.map(p => p.score)).toEqual([0, 0]);
        match.advance(config.countdownMs);
      }
    }
    expect(match.state.phase).toBe('match-over'); match.nextRound();
    expect(match.state.phase).toBe('match-over');
  });
  it('resolves simultaneous equal misses together without falsely awarding a round', () => {
    const match = create();
    for (const player of match.state.players) player.holes[0] = { id: 1, kind: 'mole', born: 0, expires: match.state.time + config.tickMs };
    match.advance(config.tickMs);
    expect(match.state.phase).toBe('playing'); expect(match.state.winner).toBeNull();
    expect(match.state.players[0].score).toBe(match.state.players[1].score);
  });
  it('a penalty can give the opponent the winning lead, even with negative scores', () => {
    const match = create();
    match.state.players[1].score = config.winScoreDifference - config.penalties.empty;
    match.action({ type: 'hit', player: 0, hole: 0 });
    expect(match.state.winner).toBe(1); expect(match.state.phase).toBe('round-over');
    expect(match.state.players[0].score).toBeLessThan(0);
  });
  it('absolute score and elapsed time cannot end a tied round', () => {
    const match = create();
    match.state.players.forEach(player => { player.score = 10000; player.nextSpawn = Infinity; });
    match.advance(181000);
    expect(match.state.phase).toBe('playing'); expect(match.state.winner).toBeNull();
  });
});

describe('magic', () => {
  it('sweeps safely without awarding score or consuming stars on the board', () => {
    const match = create(); const player = match.state.players[0];
    target(match, 'mole', 0, 0); target(match, 'rabbit', 0, 1); target(match, 'star', 0, 2);
    player.stars = 2;
    match.action({ type: 'cast', player: 0 }); match.advance(config.spells.castFreezeMs);
    expect(player.holes.slice(0, 2)).toEqual([null, null]);
    expect(player.holes[2]?.kind).toBe('star');
    expect(player.stars).toBe(0); expect(player.score).toBe(0);
  });
  it('a mistake guard absorbs one hit then expires', () => {
    const match = create(); const player = match.state.players[0];
    player.stars = 1; match.action({ type: 'cast', player: 0 }); match.advance(config.spells.castFreezeMs);
    match.action({ type: 'hit', player: 0, hole: 0 });
    expect(player.score).toBe(0);
    match.action({ type: 'hit', player: 0, hole: 0 });
    expect(player.score).toBeLessThan(0);
  });
  it('warns before applying an invasion and lets a ward block it', () => {
    const match = create(); const [guardian, andy] = match.state.players;
    guardian.stars = 3; andy.stars = 2;
    match.action({ type: 'cast', player: 1 }); match.advance(config.spells.castFreezeMs);
    expect(guardian.pending).toHaveLength(1); expect(guardian.invasionUntil).toBe(0);
    match.action({ type: 'cast', player: 0 }); match.advance(config.spells.castFreezeMs); match.advance(config.spells.warningMs);
    expect(guardian.invasionUntil).toBe(0); expect(guardian.magicShieldUntil).toBe(0);
  });
  it('steals at most two stars and obeys cooldown', () => {
    const match = create(); const [guardian, andy] = match.state.players;
    guardian.stars = 4; andy.stars = 3;
    match.action({ type: 'cast', player: 1 }); match.advance(config.spells.castFreezeMs); match.advance(config.spells.warningMs);
    expect(guardian.stars).toBe(2); expect(andy.stars).toBe(2);
    match.action({ type: 'cast', player: 1 }); match.advance(config.spells.castFreezeMs); expect(andy.stars).toBe(2);
  });
  it('copying cannot generate stars without an opponent resource; empty targets give guard', () => {
    const match = create(); const andy = match.state.players[1];
    andy.stars = 1; match.action({ type: 'cast', player: 1 }); match.advance(config.spells.castFreezeMs); match.advance(config.spells.warningMs);
    expect(andy.stars).toBe(0); expect(andy.mistakeShield).toBe(1);
  });
  it('four-star cleanup grants three mistake blocks', () => {
    const match = create(); const player = match.state.players[0];
    player.stars = 4; match.action({ type: 'cast', player: 0 }); match.advance(config.spells.castFreezeMs);
    for (let i = 0; i < 3; i++) match.action({ type: 'hit', player: 0, hole: 0 });
    expect(player.score).toBe(0);
    expect(player.mistakeShield).toBe(0);
    expect(player.shieldTier).toBe(4);
  });
  it('copy preserves opponent stars and does not net extra charge', () => {
    const match = create(); const [guardian, andy] = match.state.players;
    guardian.stars = 2; andy.stars = 1;
    match.action({ type: 'cast', player: 1 }); match.advance(config.spells.castFreezeMs); match.advance(config.spells.warningMs);
    expect(guardian.stars).toBe(2); expect(andy.stars).toBe(1);
  });
  it('stronger pressure replaces invasion and ends at its deadline', () => {
    const match = create(); const [guardian, andy] = match.state.players;
    andy.stars = 2; match.action({ type: 'cast', player: 1 }); match.advance(config.spells.castFreezeMs); match.advance(config.spells.warningMs);
    expect(guardian.invasionUntil).toBeGreaterThan(match.state.time);
    match.advance(config.spells.cooldownMs);
    andy.stars = 4; match.action({ type: 'cast', player: 1 }); match.advance(config.spells.castFreezeMs); match.advance(config.spells.warningMs);
    expect(guardian.invasionUntil).toBe(0);
    expect(guardian.decoysUntil).toBeGreaterThan(match.state.time);
    match.state.players.forEach(p => { p.nextSpawn = Infinity; p.holes.fill(null); });
    match.advance(config.spells.decoysMs);
    expect(guardian.decoysUntil).toBeLessThanOrEqual(match.state.time);
  });
  it('a ward protects resources from theft, then is consumed', () => {
    const match = create(); const [guardian, andy] = match.state.players;
    guardian.magicShieldUntil = match.state.time + 2000; guardian.stars = 4; andy.stars = 3;
    match.action({ type: 'cast', player: 1 }); match.advance(config.spells.castFreezeMs); match.advance(config.spells.warningMs);
    expect(guardian.stars).toBe(4); expect(andy.stars).toBe(0); expect(guardian.magicShieldUntil).toBe(0);
  });
});

describe('computer opponents', () => {
  it('does not act before its reaction delay', () => {
    const match = create(); const bot = new Bot('hard', 7);
    target(match, 'mole', 1); bot.update(match);
    expect(match.state.players[1].holes[0]?.kind).toBe('mole');
    match.advance(config.ai.hard.reactionMs + config.tickMs); bot.update(match);
    expect(match.state.players[1].holes[0]).toBeNull();
  });
  it('hard bots outperform easy bots over the same visible target sequence', () => {
    const run = (difficulty: Difficulty) => {
      const match = create(); const bot = new Bot(difficulty, 123);
      // Isolate reactions/accuracy from random spawns and resource strategy.
      match.state.players.forEach(p => { p.nextSpawn = Infinity; });
      for (let i = 0; i < 100; i++) {
        match.state.players[1].holes[0] = { id: i, kind: 'mole', born: match.state.time, expires: match.state.time + 800 };
        for (let j = 0; j < 16; j++) { match.advance(50); bot.update(match); }
        if (match.state.phase !== 'playing') break;
      }
      return match.state.players[1].score;
    };
    expect(run('hard')).toBeGreaterThan(run('easy'));
  });
});
