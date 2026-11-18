import { expect, it } from 'vitest';
import { Match } from '../../src/game/Match';
import { config } from '../../src/game/config';
import { presentation, clipDuration, clipFrame, validSheet } from '../../src/presentation/config';

it('captures the tier and logical time before consuming stars, once per successful cast', () => {
  for (const character of ['champignon', 'andromoss'] as const) for (const tier of [1, 2, 3, 4]) {
    const match = new Match({ characters: [character, 'andromoss'], mode: 'local', difficulty: 'easy', seed: 42 });
    match.advance(config.countdownMs);
    match.state.players[0].stars = tier;
    match.action({ type: 'cast', player: 0 });
    expect(match.events.at(-1)).toMatchObject({ kind: 'cast', player: 0, time: match.state.time, round: 1, tier });
    match.state.players[0].stars = tier;
    match.action({ type: 'cast', player: 0 });
    expect(match.events.filter(event => event.kind === 'cast')).toHaveLength(1);
    const before = match.state.time; match.advance(500);
    expect(match.state.time).toBe(before);
    expect(match.state.casting?.remainingMs).toBe(config.spells.castFreezeMs - 500);
    match.advance(config.spells.castFreezeMs - 500 + config.tickMs);
    expect(match.state.time).toBe(before + config.tickMs);
  }
});
it('supports grid sprite sheets, clamps the final frame, and honors reduced motion', () => {
  const clip = { ...presentation.andromoss.casts[1], columns: 4 };
  expect(validSheet(clip, clip.frameWidth * 4, clip.frameHeight * Math.ceil(clip.frameCount / 4))).toBe(true);
  expect(validSheet(clip, 128, 128)).toBe(false);
  expect(clipFrame(clip, 0)).toBe(0);
  expect(clipFrame(clip, 200)).toBeGreaterThan(0);
  expect(clipFrame(clip, clipDuration(clip))).toBe(clip.frameCount - 1);
  expect(clipFrame(clip, 200, true)).toBe(0);
});

it('freezes both players, targets, pending spells and input; manual pause also freezes the cast', () => {
  const match = new Match({ characters:['champignon','andromoss'], mode:'local', difficulty:'hard', seed:42 });
  match.advance(config.countdownMs);
  const player = match.state.players[0]; player.stars = 3;
  match.state.players[1].holes[0] = { id:999, kind:'mole', born:match.state.time, expires:match.state.time + 100 };
  match.action({ type:'cast', player:0 });
  const before = structuredClone(match.state.players);
  match.action({ type:'hit', player:1, hole:0 });
  match.action({ type:'cast', player:1 });
  match.advance(1000);
  expect(match.state.players).toEqual(before);
  match.state.paused = true; const remaining = match.state.casting?.remainingMs;
  match.advance(5000); expect(match.state.casting?.remainingMs).toBe(remaining);
  match.state.paused = false; match.advance(500);
  expect(match.state.casting).toBeNull(); expect(match.state.players).toEqual(before);
  match.advance(100); expect(match.state.players[1].holes[0]).toBeNull();
});
