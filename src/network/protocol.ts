import { config, characters } from '../game/config';
import type { GameAction, MatchOptions, PlayerId } from '../game/types';
import type { Snapshot } from '../game/Session';

// Bump when simulation or wire semantics change; config changes also reject mismatched builds.
export const RULESET = `moonlit-2:${JSON.stringify({ config, characters })}`;
export type Input = { type: 'hit'; hole: number; target: number | null } | { type: 'cast' };
export type Command = { kind: 'input'; input: Input } | { kind: 'next' };
export type Wire = Command | { kind: 'state'; snapshot: Snapshot } | { kind: 'ready' }
  | { kind: 'hello'; rules: string; character: string; token: string }
  | { kind: 'welcome'; options: MatchOptions; snapshot: Snapshot }
  | { kind: 'reject'; reason: string } | { kind: 'bye' }
  | { kind: 'ping'; time: number } | { kind: 'pong'; time: number };
export type LinkState = 'connected' | 'reconnecting' | 'ended';
export type NetworkLink = { seat: PlayerId; send: (message: Wire) => void; close: () => void };

export function isWire(value: unknown): value is Wire {
  return !!value && typeof value === 'object' && 'kind' in value && typeof value.kind === 'string';
}
export function inputAction(input: Input, player: PlayerId, snapshot: Snapshot): GameAction | null {
  if (input.type === 'cast') return { type: 'cast', player };
  if (input.type !== 'hit' || !Number.isInteger(input.hole) || input.hole < 0 || input.hole > 8) return null;
  // Never punish a delayed click as an empty hit or hit a replacement mole.
  const target = snapshot.state.players[player].holes[input.hole];
  if ((target?.id ?? null) !== input.target) return null;
  return { type: 'hit', player, hole: input.hole };
}

/** Network seat never determines visual side. Rewrite every identity-bearing field. */
export function localView(raw: Snapshot, seat: PlayerId): Snapshot {
  const view = structuredClone(raw);
  if (seat === 1) {
    view.state.players.reverse();
    for (const player of view.state.players) for (const spell of player.pending) spell.from = spell.from === 0 ? 1 : 0;
    view.state.winner = view.state.winner === null ? null : view.state.winner === 0 ? 1 : 0;
    view.events.forEach(event => { event.player = event.player === 0 ? 1 : 0; });
  }
  if (view.state.winner !== null) view.state.result = `${view.state.winner === 0 ? 'You win' : 'Your opponent wins'} ${view.state.phase === 'match-over' ? 'the match' : 'the round'}!`;
  return view;
}
