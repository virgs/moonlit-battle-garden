import type { CharacterId, MatchOptions } from './types';

export type CharacterHome = { owner: CharacterId; name: string; tint: number; background: string; music: string };

// Reused scene/music are temporary art-pass assets. Each home has its own identity;
// unique illustrations and tracks can replace these paths without touching rules.
export const homes: Record<CharacterId, CharacterHome> = {
  champignon: { owner: 'champignon', name: 'Sporelight Keep', tint: 0xa7d6b0, background: '/assets/background-castle.png', music: '/assets/backgroundMusic.mp3' },
  andy: { owner: 'andy', name: 'Moonlit Hideout', tint: 0xd5acc9, background: '/assets/background-castle.png', music: '/assets/backgroundMusic.mp3' },
};

export function chooseHome(options: MatchOptions): CharacterHome {
  // Do not consume gameplay randomness or change difficulty/spawn schedules.
  let value = options.seed >>> 0;
  value ^= value >>> 16;
  value = Math.imul(value, 0x45d9f3b);
  value ^= value >>> 16;
  return homes[options.characters[value & 1]];
}
