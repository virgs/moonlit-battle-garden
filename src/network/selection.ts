import { isCharacterId, type CharacterId, type PlayerId } from '../game/types';
export type CharacterPick = { character: CharacterId; ready: boolean };
export type LobbyPicks = [CharacterPick, CharacterPick | null];
/** Always local first, irrespective of which browser hosts. */
export type SelectionView = { players: [CharacterPick, CharacterPick | null]; connected: boolean };
export function validPick(value: unknown): value is CharacterPick {
  if(!value||typeof value!=='object')return false;
  const pick=value as CharacterPick;
  return isCharacterId(pick.character)&&typeof pick.ready==='boolean';
}
export function validPicks(value: unknown): value is LobbyPicks {
  return Array.isArray(value)&&value.length===2&&validPick(value[0])&&(value[1]===null||validPick(value[1]));
}
export function selectionView(picks: LobbyPicks, seat: PlayerId, connected: boolean, local: CharacterId): SelectionView {
  return {players:structuredClone(seat===0?[picks[0],connected?picks[1]:null]:[picks[1]??{character:local,ready:false},connected?picks[0]:null]),connected};
}
