import { config } from './config';
import type { MatchState } from './types';

/** A score lead of X fills the whole bar; equal scores always center it. */
export function roundStanding(state: MatchState): { bluePercent: number; leader: 0 | 1 | null } {
  const [blue, red] = state.players;
  const difference = blue.score - red.score;
  if (state.phase === 'round-over' || state.phase === 'match-over') {
    return { bluePercent: state.winner === null ? 50 : state.winner === 0 ? 100 : 0, leader: state.winner };
  }
  if (state.phase === 'countdown' || difference === 0) return { bluePercent: 50, leader: null };
  const bluePercent = 50 + 50 * difference / config.winScoreDifference;
  return { bluePercent: Math.max(0, Math.min(100, bluePercent)), leader: difference > 0 ? 0 : 1 };
}
