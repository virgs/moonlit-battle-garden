import type { CharacterId, MatchOptions } from './types';
import { presentation } from '../presentation/config';

export type CharacterHome = { owner: CharacterId } & typeof presentation[CharacterId]['home'];

// Per-character final paths and fallback assets come from the presentation manifest.
export const homes: Record<CharacterId, CharacterHome> = {
  champignon: { owner: 'champignon', ...presentation.champignon.home },
  andromoss: { owner: 'andromoss', ...presentation.andromoss.home },
};

export function chooseHome(options: MatchOptions): CharacterHome {
  // Do not consume gameplay randomness or change difficulty/spawn schedules.
  let value = options.seed >>> 0;
  value ^= value >>> 16;
  value = Math.imul(value, 0x45d9f3b);
  value ^= value >>> 16;
  return homes[options.characters[value & 1]];
}
