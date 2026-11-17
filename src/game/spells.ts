import { config, characters } from './config';
import type { MatchState, Player, PlayerId } from './types';

export function message(player: Player, text: string, time: number): void {
  player.message = text;
  player.messageUntil = time + 2200;
}

export function sweep(player: Player): void {
  player.holes = player.holes.map(target => target?.kind === 'star' ? target : null);
}

function guard(player: Player, time: number, charges = 1, tier = 1): void {
  player.mistakeShield = charges;
  player.shieldTier = tier;
  player.shieldUntil = time + config.spells.shieldMs;
}

export function castSpell(state: MatchState, id: PlayerId): boolean {
  const player = state.players[id];
  if (!player.stars || state.time < player.nextCast) return false;
  const tier = player.stars;
  player.stars = 0;
  player.nextCast = state.time + config.spells.cooldownMs;
  message(player, characters[player.character].spells[tier - 1].name, state.time);
  if (player.character === 'champignon') {
    if (tier === 1 || tier === 4) guard(player, state.time, tier === 4 ? 3 : 1, tier);
    if (tier === 2 || tier === 4) sweep(player);
    if (tier === 3) player.magicShieldUntil = state.time + config.spells.shieldMs;
  } else {
    const opponent = state.players[id === 0 ? 1 : 0];
    opponent.pending.push({ tier, from: id, at: state.time + config.spells.warningMs });
    message(opponent, `Incoming: ${characters.andy.spells[tier - 1].name}`, state.time);
  }
  return true;
}

export function resolveSpells(state: MatchState): void {
  for (const player of state.players) {
    const due = player.pending.filter(spell => spell.at <= state.time);
    player.pending = player.pending.filter(spell => spell.at > state.time);
    for (const spell of due) {
      if (player.magicShieldUntil > state.time) {
        player.magicShieldUntil = 0;
        message(player, 'Spore Ward blocked the spell!', state.time);
        continue;
      }
      const caster = state.players[spell.from];
      if (spell.tier === 1 || spell.tier === 3) {
        const stars = Math.min(player.stars, spell.tier === 1 ? 1 : 2);
        if (spell.tier === 3) player.stars -= stars;
        caster.stars = Math.min(4, caster.stars + stars);
        if (!stars) guard(caster, state.time, 1, spell.tier);
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
