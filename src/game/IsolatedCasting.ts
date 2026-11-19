import type { Match } from './Match';
import { config } from './config';
import { Random } from './random';
import { busiestColumns } from './targetColumns';
import type { PlayerId, Target } from './types';

// Provisional shared diagnostic settings, identical for every hero/difficulty.
export const isolatedCasting = { minDelayMs: 300, maxDelayMs: 700, visibleMs: 200, urgentMs: 1000 } as const;

/** A visible witness keeps new targets from continually restarting a valid opportunity. */
export function opportunityKey(match: Match, id: PlayerId): string | null {
  const { time } = match.state, player = match.state.players[id], enemy = match.state.players[id === 0 ? 1 : 0];
  const visible = (target: Target | null): target is Target => !!target && target.expires > time && time-target.born >= isolatedCasting.visibleMs;
  const witness = (targets: Target[], prefix: string) => {
    const first = targets.sort((a,b)=>a.expires-b.expires || a.id-b.id)[0];
    return first ? `${prefix}:${first.id}` : null;
  };
  switch (player.character) {
    case 'champignon': {
      if (player.sweepUntil > time) return null;
      const column = busiestColumns(player,1)[0];
      const targets = player.holes.filter((_,hole)=>hole%3===column).filter(visible);
      const urgent = targets.filter(t=>t.kind==='mole' && t.expires-time <= isolatedCasting.urgentMs);
      const useful = targets.some(t=>t.kind==='rabbit') ? [] : targets.filter(t=>t.kind==='mole'||t.kind==='star');
      return witness(urgent.length ? urgent : useful, `sweep:${column}`);
    }
    case 'andromoss': return enemy.stars > 0 ? 'enemy-charge' : null;
    case 'captain-bramble': return witness(enemy.holes.filter(visible).filter(t=>t.kind==='mole'&&!t.armor),'armor');
    case 'duskmantle': return witness(enemy.holes.filter(visible).filter(t=>t.kind==='mole'&&!t.missBonus),'mark');
    case 'sprig': return witness(player.holes.filter(visible).filter(t=>t.kind==='mole'&&!t.extended&&t.expires-time<=isolatedCasting.urgentMs),'extend');
  }
}

export class IsolatedCasting {
  private random: Random;
  private match: Match | undefined;
  private round = 0;
  private key: string | null = null;
  private readyAt = 0;
  constructor(seed: number) { this.random = new Random(seed ^ 0x52a7c913); }

  tryCast(match: Match, id: PlayerId): boolean {
    if (this.match !== match || this.round !== match.state.round) {
      this.match = match; this.round = match.state.round; this.key = null;
    }
    const player = match.state.players[id], time = match.state.time;
    if (player.stars !== match.options.isolatedSpellTier || time < player.nextCast) { this.key = null; return false; }
    const key = opportunityKey(match,id);
    if (!key) { this.key = null; return false; }
    if (key !== this.key) {
      this.key = key;
      // Sample once per opportunity, on the simulation tick grid; never per frame.
      const steps = (isolatedCasting.maxDelayMs-isolatedCasting.minDelayMs)/config.tickMs;
      this.readyAt = time + isolatedCasting.minDelayMs + Math.floor(this.random.next()*(steps+1))*config.tickMs;
      return false;
    }
    if (time < this.readyAt) return false;
    match.action({type:'cast',player:id});
    this.key = null;
    return !!match.state.casting;
  }
}
