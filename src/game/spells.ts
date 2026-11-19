import { config, characters } from './config';
import type { MatchState, Player, PlayerId } from './types';
import { cleanse, expireTargetModifiers, modifyTarget } from './targetModifiers';

export function message(player: Player, text: string, time: number): void {
  player.message = text;
  player.messageUntil = time + 2200;
}

export function sweep(player: Player): void {
  player.holes = player.holes.map(target => target?.kind === 'star' ? target : null);
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
    if (tier === 1 || tier === 4) { sweep(player); player.sweepUntil = state.time + config.rosterSpells.cleanSweepMs; player.sweepTier = tier; }
    if (tier === 3) player.magicShieldUntil = state.time + config.spells.shieldMs;
  } else if (player.character === 'captain-bramble' && (tier === 2 || tier === 3)) {
    guard(player, state.time, tier === 3 ? 3 : 1, tier, config.rosterSpells.brambleGuardMs);
  } else if (player.character === 'duskmantle' && tier === 3) {
    player.drainUntil = state.time + config.rosterSpells.drainMs;
  } else if (player.character === 'sprig') {
    if (tier === 1) for (const target of player.holes) if (target && !target.extended) {
      target.expires += config.rosterSpells.extensionMs; target.extended = true;
    }
    if (tier === 2 || tier === 4) {
      const counts = [0, 1, 2].map(column => ({ column, count: player.holes.filter((target, hole) => target && hole % 3 === column).length }));
      player.automationColumns = counts.sort((a,b) => b.count-a.count || a.column-b.column).slice(0,tier === 4 ? 2 : 1).map(value => value.column);
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

export function resolveSpells(state: MatchState): void {
  expireTargetModifiers(state);
  for (const player of state.players) {
    const due = player.pending.filter(spell => spell.at <= state.time);
    player.pending = player.pending.filter(spell => spell.at > state.time);
    for (const spell of due) {
      if (player.magicShieldUntil > state.time) {
        player.magicShieldUntil = 0;
        message(player, `${characters[player.character].spells[2].name} blocked the spell!`, state.time);
        continue;
      }
      const caster = state.players[spell.from];
      if (caster.character === 'captain-bramble') {
        const hits = spell.tier === 4 ? 2 : 1;
        if (player.armorUntil > state.time && player.armorHits > hits) continue;
        player.armorHits = hits; player.armorTier = spell.tier;
        player.armorUntil = state.time + config.rosterSpells.armorMs;
        for (const target of player.holes) if (target) modifyTarget(player, target, state.time);
        continue;
      }
      if (caster.character === 'duskmantle') {
        if (spell.tier === 2) player.camouflageUntil = state.time + config.rosterSpells.camouflageMs;
        else {
          player.markTier = spell.tier;
          player.markUntil = state.time + config.rosterSpells.markMs;
          player.markCharges = spell.tier === 4 ? 4 : 1;
          player.markBonus = spell.tier === 4 ? config.rosterSpells.curseBonus : config.rosterSpells.markBonus;
          for (const target of player.holes) if (target) modifyTarget(player, target, state.time);
        }
        continue;
      }
      if (spell.tier === 1 || spell.tier === 3) {
        const stars = Math.min(player.stars, spell.tier === 1 ? 1 : 2);
        if (spell.tier === 3) player.stars -= stars;
        caster.stars = Math.min(4, caster.stars + stars);
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
