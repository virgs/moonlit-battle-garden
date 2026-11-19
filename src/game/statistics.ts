/** Observed totals, not counterfactual estimates of spell value. */
export function playerStatistics() {
  return { pointsEarned: 0, pointsLost: 0, guardBlocks: 0, guardPointsPrevented: 0, starsCollected: 0, starsStolen: 0, stolenStarsReceived: 0, emptyThefts: 0, wardBlocks: 0 };
}
export type PlayerStatistics = ReturnType<typeof playerStatistics>;
export type MatchStatistics = [PlayerStatistics, PlayerStatistics];
