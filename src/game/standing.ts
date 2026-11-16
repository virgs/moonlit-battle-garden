import { config } from './config';
import type { MatchState } from './types';

/** Presentation only: follow the round's health-first, score-tiebreak ordering. */
export function roundStanding(state: MatchState): { bluePercent: number; leader: 0 | 1 | null } {
  const [blue, red] = state.players;
  const healthDifference = blue.health - red.health;
  const scoreDifference = blue.score - red.score;
  const difference = healthDifference || scoreDifference;
  if (state.phase === 'round-over' || state.phase === 'match-over') {
    return { bluePercent: state.winner === null ? 50 : state.winner === 0 ? 100 : 0, leader: state.winner };
  }
  if (state.phase === 'countdown' || difference === 0) return { bluePercent: 50, leader: null };
  const scoreHint = 4 * scoreDifference / Math.max(1, blue.score + red.score);
  const bluePercent = healthDifference ? 50 + 50 * healthDifference / config.health : 50 + scoreHint;
  return { bluePercent: Math.max(0, Math.min(100, bluePercent)), leader: difference > 0 ? 0 : 1 };
}
