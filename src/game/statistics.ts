/** Observed totals, not counterfactual estimates of spell value. */
export function playerStatistics() {
  return { pointsEarned: 0, pointsLost: 0, guardBlocks: 0, guardPointsPrevented: 0, starsCollected: 0, starsStolen: 0, stolenStarsReceived: 0, emptyThefts: 0, wardBlocks: 0, siphonBonusPoints: 0, automationMoleHits: 0, automationStarHits: 0, automationRabbitHits: 0, tendingMoleHits: 0, tendingStarHits: 0, tendingRabbitHits: 0, tendingMoleExpiries: 0, tendingStarExpiries: 0, tendingRabbitExpiries: 0, tendingLateMoleHits: 0, tendingLateStarHits: 0, tendingLateRabbitHits: 0 };
}
export type PlayerStatistics = ReturnType<typeof playerStatistics>;
export type MatchStatistics = [PlayerStatistics, PlayerStatistics];
