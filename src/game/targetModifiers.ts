import { config } from './config';
import type { MatchState, Player, Target } from './types';

/** A target receives its lifetime bonus at most once, including across recasts. */
export function extendTarget(target:Target,time:number):void {
  if(!target.extended&&target.expires>time) {target.expires+=config.rosterSpells.extensionMs;target.extended=true;}
}

/** Shared spawn modifiers: tending reaches all kinds; armor and marks only moles. */
export function modifyTarget(player: Player, target: Target, time: number, arrival = false): void {
  // Scale the normal spawn lifetime once; fixed positive Tending time is added after.
  if(arrival && target.kind==='mole' && player.moleRushUntil>time && !target.rushed) {
    const lifetime=target.expires-target.born;
    target.rushReductionMs=lifetime-Math.round(lifetime*config.spells.moleLifetimeScale);
    target.expires-=target.rushReductionMs;target.rushed=true;
  }
  if(player.tendingUntil>time)extendTarget(target,time);
  if (target.kind !== 'mole') return;
  if (player.armorUntil > time && player.armorCharges > 0 && (target.armor ?? 0) < player.armorHits) {
    target.armor = player.armorHits;
    delete target.persistentArmor;
    player.armorCharges--;
  }
  if(arrival && player.tinCharges>0) {
    player.tinCharges--;
    // Stronger timed armor wins; Tin Caps never adds a third armor strike.
    if((target.armor??0)<player.tinHits) {target.armor=player.tinHits;target.persistentArmor=true;}
  }
  if ((player.markPermanent ? arrival : player.markUntil > time) && player.markCharges > 0 && !target.missBonus) {
    target.missBonus = player.markBonus;
    if(player.markPermanent)target.persistentMark=true;
    player.markCharges--;
  }
}

export function expireTargetModifiers(state: MatchState): void {
  for (const player of state.players) {
    if (!player.markPermanent && player.markUntil <= state.time) player.markCharges = 0;
    if (player.armorUntil <= state.time) player.armorCharges = 0;
    for (const target of player.holes) if (target) {
      if (player.armorUntil <= state.time && !target.persistentArmor) delete target.armor;
      if (!target.persistentMark && player.markUntil <= state.time) delete target.missBonus;
    }
  }
}

export function cleanse(player: Player, time:number): void {
  player.pending = [];
  player.invasionUntil = player.moleRushUntil = player.decoysUntil = player.armorUntil = player.markUntil = player.camouflageUntil = 0;
  player.markCharges = 0;player.markPermanent=false;
  player.armorCharges = 0;
  player.tinCharges = 0;
  for (const target of player.holes) if (target) {
    if(target.rushReductionMs && target.expires>time)target.expires+=target.rushReductionMs;
    delete target.rushReductionMs;delete target.armor;delete target.persistentArmor;delete target.missBonus;delete target.persistentMark;
  }
}

/** Pending Tin Caps and persistent target armor have no timer. */
export function hasTinCaps(player:Player):boolean {
  return player.tinCharges>0 || player.holes.some(target=>target?.persistentArmor && !!target.armor);
}

/** Charge-only guards do not need a timer or non-finite online values. */
export function hasGuard(player:Player,time:number):boolean {
  return player.mistakeShield>0 && (player.shieldPermanent || player.shieldUntil>time);
}

/** Pending future marks and already marked live moles remain harmful until consumed. */
export function hasMarks(player:Player,time:number):boolean {
  return ((player.markPermanent || player.markUntil>time) && player.markCharges>0) || player.holes.some(t=>!!t?.missBonus && t.expires>time);
}
