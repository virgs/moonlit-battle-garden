import type { MatchState, Player, Target } from './types';

/** Applied to existing targets and new spawns by the same rules. Never affects stars/rabbits. */
export function modifyTarget(player: Player, target: Target, time: number): void {
  if (target.kind !== 'mole') return;
  if (player.armorUntil > time && player.armorCharges > 0 && (target.armor ?? 0) < player.armorHits) {
    target.armor = player.armorHits;
    player.armorCharges--;
  }
  if (player.markUntil > time && player.markCharges > 0 && !target.missBonus) {
    target.missBonus = player.markBonus;
    player.markCharges--;
  }
}

export function expireTargetModifiers(state: MatchState): void {
  for (const player of state.players) {
    if (player.markUntil <= state.time) player.markCharges = 0;
    if (player.armorUntil <= state.time) player.armorCharges = 0;
    for (const target of player.holes) if (target) {
      if (player.armorUntil <= state.time) delete target.armor;
      if (player.markUntil <= state.time) delete target.missBonus;
    }
  }
}

export function cleanse(player: Player): void {
  player.pending = [];
  player.invasionUntil = player.decoysUntil = player.armorUntil = player.markUntil = player.camouflageUntil = 0;
  player.markCharges = 0;
  player.armorCharges = 0;
  for (const target of player.holes) if (target) { delete target.armor; delete target.missBonus; }
}
