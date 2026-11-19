import type { Player } from './types';

/** Pick once at cast time; equal counts choose the leftmost column. */
export function busiestColumns(player: Player, count: number): number[] {
  return [0, 1, 2].map(column => ({ column, count: player.holes.filter((target, hole) => target && hole % 3 === column).length }))
    .sort((a,b) => b.count-a.count || a.column-b.column).slice(0,count).map(value => value.column);
}
