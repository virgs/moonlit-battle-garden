import { Bot } from './Bot';
import { Match } from './Match';
import { config } from './config';
import type { CharacterId, Difficulty, PlayerId } from './types';

export type BattleResult = {
  winner: CharacterId | null;
  winnerSide: PlayerId | null;
  rounds: number;
  durationMs: number;
  roundDurationsMs: number[];
  unfinishedRoundMs: number | null;
  scores: [number, number];
  casts: [number[], number[]];
  timedOut: boolean;
};

/** Same match and bot code as the browser; no rendering, timers, or network. */
export function simulateBattle(characters: [CharacterId, CharacterId], difficulty: Difficulty, seed: number): BattleResult {
  const match = new Match({ characters, difficulty, mode: 'local', seed });
  const bots = [new Bot(difficulty, seed ^ 0x123456, 0), new Bot(difficulty, seed ^ 0x654321, 1)];
  const casts: [number[], number[]] = [[0, 0, 0, 0], [0, 0, 0, 0]];
  const scores: [number, number] = [0, 0];
  // A cap catches stalemates/regressions rather than allowing a batch to hang.
  let elapsedMs = 0, roundStartedMs = 0;
  const roundDurationsMs:number[]=[];
  const capMs = config.maxSimulationMs;
  while (match.state.phase !== 'match-over' && elapsedMs < capMs) {
    if (match.state.phase === 'round-over') {
      roundDurationsMs.push(elapsedMs-roundStartedMs);
      roundStartedMs=elapsedMs;
      for (const id of [0, 1] as const) scores[id] += match.state.players[id].score;
      match.nextRound();
    }
    match.advance(config.tickMs);
    elapsedMs += config.tickMs;
    // Alternate command order by simulation tick to avoid a fixed first-action advantage.
    const order = Math.floor(match.state.time / config.tickMs) % 2 ? [0, 1] as const : [1, 0] as const;
    for (const id of order) {
      const player = match.state.players[id];
      const tier = player.stars;
      const castTime = player.nextCast;
      bots[id].update(match);
      if (player.nextCast !== castTime && tier > 0) casts[id][tier - 1]++;
    }
  }
  for (const id of [0, 1] as const) scores[id] += match.state.players[id].score;
  const timedOut = match.state.phase !== 'match-over';
  if(!timedOut||match.state.phase==='round-over')roundDurationsMs.push(elapsedMs-roundStartedMs);
  return {
    winner: !timedOut && match.state.winner !== null ? characters[match.state.winner] : null,
    winnerSide: timedOut ? null : match.state.winner,
    rounds: match.state.round, durationMs: elapsedMs, roundDurationsMs, unfinishedRoundMs:timedOut&&match.state.phase!=='round-over'?elapsedMs-roundStartedMs:null, scores, casts, timedOut,
  };
}
