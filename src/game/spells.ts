import { config, characters } from './config';
import { busiestColumns } from './targetColumns';
import type { MatchStatistics } from './statistics';
import type { MatchState, Player, PlayerId } from './types';
import { cleanse, expireTargetModifiers, modifyTarget, extendTarget } from './targetModifiers';

export function message(player: Player, text: string, time: number): void {
  player.message = text;
  player.messageUntil = time + 2200;
}

function guard(player: Player, time: number, charges = 1, tier = 1, duration = config.spells.shieldMs): void {
  player.mistakeShield = charges;
  player.shieldTier = tier;
  player.shieldUntil = time + duration;
}

export function castSpell(state: MatchState, id: PlayerId): boolean {
  const player = state.players[id];
  if (!player.stars || state.time < player.nextCast) return false;
  const tier = player.stars;
  player.stars = 0;
  player.nextCast = state.time + config.spells.cooldownMs;
  message(player, characters[player.character].spells[tier - 1].name, state.time);
  if (player.character === 'champignon') {
    if (tier === 2 || tier === 4) guard(player, state.time, tier === 4 ? 3 : 1, tier);
    if (tier === 1 || tier === 4) { player.nextSweep = tier === 4 ? state.time + config.rosterSpells.royalSweepIntervalMs : 0; player.sweepUntil = state.time + config.rosterSpells.cleanSweepMs; player.sweepTier = tier; player.sweepColumns = tier === 1 ? busiestColumns(player, 1) : [0, 1, 2]; }
    if (tier === 3) player.magicShieldUntil = state.time + config.spells.shieldMs;
  } else if (player.character === 'captain-bramble' && (tier === 2 || tier === 3)) {
    guard(player, state.time, tier === 3 ? 3 : 1, tier, config.rosterSpells.brambleGuardMs);
  } else if (player.character === 'duskmantle' && tier === 3) {
    player.drainUntil = state.time + config.rosterSpells.drainMs;
  } else if (player.character === 'sprig') {
    if (tier === 1) {
      player.tendingUntil=state.time+config.rosterSpells.tendingMs;
      for(const target of player.holes)if(target)extendTarget(target,state.time);
    }
    if (tier === 2 || tier === 4) {
      player.automationColumns = busiestColumns(player, tier === 4 ? 2 : 1);
      player.automationTier = tier;
      player.automationUntil = state.time + (tier === 4 ? config.rosterSpells.fullAutomationMs : config.rosterSpells.columnAutomationMs);
      player.nextAutomation = state.time + config.rosterSpells.automationIntervalMs;
    }
    if (tier === 3) { cleanse(player); player.magicShieldUntil = state.time + config.rosterSpells.cleanseWardMs; }
  } else {
    const opponent = state.players[id === 0 ? 1 : 0];
    opponent.pending.push({ tier, from: id, at: state.time + config.spells.warningMs });
    message(opponent, `Incoming: ${characters[player.character].spells[tier - 1].name}`, state.time);
  }
  return true;
}

export function resolveSpells(state: MatchState, starCapacity = 4, statistics?: MatchStatistics): void {
  expireTargetModifiers(state);
  for (const [id, player] of state.players.entries()) {
    const due = player.pending.filter(spell => spell.at <= state.time);
    player.pending = player.pending.filter(spell => spell.at > state.time);
    for (const spell of due) {
      if (player.magicShieldUntil > state.time) {
        player.magicShieldUntil = 0;
        if (statistics) statistics[id].wardBlocks++;
        message(player, `${characters[player.character].spells[2].name} blocked the spell!`, state.time);
        continue;
      }
      const caster = state.players[spell.from];
      if (caster.character === 'captain-bramble') {
        const hits = spell.tier === 4 ? 2 : 1;
        if (player.armorUntil > state.time && player.armorHits > hits) continue;
        player.armorHits = hits; player.armorTier = spell.tier;
        player.armorCharges = spell.tier === 4 ? config.rosterSpells.heavyArmorTargets : config.rosterSpells.armorTargets;
        player.armorUntil = state.time + config.rosterSpells.armorMs;
        for (const target of player.holes) if (target) modifyTarget(player, target, state.time);
        continue;
      }
      if (caster.character === 'duskmantle') {
        if (spell.tier === 2) player.camouflageUntil = state.time + config.rosterSpells.camouflageMs;
        else {
          player.markTier = spell.tier;
          player.markUntil = state.time + (spell.tier === 1 ? config.rosterSpells.ominousMarkMs : config.rosterSpells.markMs);
          player.markCharges = spell.tier === 4 ? 4 : config.rosterSpells.ominousMarks;
          player.markBonus = spell.tier === 4 ? config.rosterSpells.curseBonus : config.rosterSpells.markBonus;
          for (const target of player.holes) if (target) modifyTarget(player, target, state.time);
        }
        continue;
      }
      if (spell.tier === 1 || spell.tier === 3) {
        const stars = spell.tier === 1 ? player.stars : Math.min(player.stars, 2);
        player.stars -= stars;
        const received = Math.min(starCapacity - caster.stars, stars);
        caster.stars = Math.min(starCapacity, caster.stars + stars);
        if (statistics) {
          statistics[spell.from].starsStolen += stars;
          statistics[spell.from].stolenStarsReceived += received;
          if (!stars) statistics[spell.from].emptyThefts++;
        }
        // Empty theft has no fallback effect; the cast still spends its charge.
      }
      // A stronger pressure spell replaces the weaker one, rather than stacking.
      if (spell.tier === 2 && player.decoysUntil <= state.time) {
        player.invasionUntil = state.time + config.spells.invasionMs;
        player.nextDecoy = state.time;
      }
      if (spell.tier === 4) {
        player.invasionUntil = 0;
        player.decoysUntil = state.time + config.spells.decoysMs;
        player.nextDecoy = state.time;
      }
    }
  }
}
