import type { Match } from './Match';
import { hasGuard } from './targetModifiers';
import { config } from './config';
import { Random } from './random';
import { busiestColumns } from './targetColumns';
import type { Difficulty, PlayerId, Target } from './types';

export type CastingSettings = { minDelayMs:number; maxDelayMs:number; visibleMs:number; urgentMs:number; delayMultipliers:Record<Difficulty,number> };
export const castingProfiles:Record<'baseline'|'fast'|'scaled',CastingSettings> = {
  baseline:{minDelayMs:300,maxDelayMs:700,visibleMs:200,urgentMs:1000,delayMultipliers:{easy:1,medium:1,hard:1}},
  fast:{minDelayMs:200,maxDelayMs:400,visibleMs:100,urgentMs:1000,delayMultipliers:{easy:1,medium:1,hard:1}},
  scaled:{minDelayMs:200,maxDelayMs:400,visibleMs:100,urgentMs:1000,delayMultipliers:{easy:3,medium:2,hard:1}},
};
export const defaultCastingProfile = 'scaled' as const;
// Explicit trial profiles can override the adopted default; full-kit casting is separate.
export const isolatedCasting:CastingSettings = {...castingProfiles[defaultCastingProfile],delayMultipliers:{...castingProfiles[defaultCastingProfile].delayMultipliers}};
export function useCastingProfile(name:keyof typeof castingProfiles):void {
  Object.assign(isolatedCasting,castingProfiles[name],{delayMultipliers:{...castingProfiles[name].delayMultipliers}});
}
export type CastingStatistics = {scheduled:number;cancelled:number;executed:number;pending:number;delaySumMs:number;rampScheduled:number;steadyScheduled:number;rampExecuted:number;steadyExecuted:number};

/** A visible witness keeps new targets from continually restarting a valid opportunity. */
export function opportunityKey(match: Match, id: PlayerId): string | null {
  const { time } = match.state, player = match.state.players[id], enemy = match.state.players[id === 0 ? 1 : 0];
  const visible = (target: Target | null): target is Target => !!target && target.expires > time && time-target.born >= isolatedCasting.visibleMs;
  const witness = (targets: Target[], prefix: string) => {
    const first = targets.sort((a,b)=>a.expires-b.expires || a.id-b.id)[0];
    return first ? `${prefix}:${first.id}` : null;
  };
  if(match.options.isolatedSpellTier===2) {
    if(player.character==='champignon'||player.character==='captain-bramble') {
      if(hasGuard(player,time))return null;
      return witness(player.holes.filter(visible).filter(t=>t.kind==='mole'&&t.expires-time<=isolatedCasting.urgentMs),'guard');
    }
    if(player.character==='sprig') {
      if(player.automationUntil>time)return null;
      const column=busiestColumns(player,1)[0];
      const targets=player.holes.filter((_,hole)=>hole%3===column).filter(visible);
      const urgent=targets.filter(t=>t.kind==='mole'&&t.expires-time<=isolatedCasting.urgentMs);
      const useful=targets.some(t=>t.kind==='rabbit')?[]:targets.filter(t=>t.kind==='mole'||t.kind==='star');
      return witness(urgent.length?urgent:useful,`tines:${column}`);
    }
    if(enemy.magicShieldUntil>time)return null;
    if(player.character==='andromoss'&&(enemy.invasionUntil>time||enemy.decoysUntil>time))return null;
    if(player.character==='duskmantle'&&enemy.camouflageUntil>time)return null;
    return witness(enemy.holes.filter(visible).filter(t=>t.kind==='mole'||t.kind==='star'),player.character==='andromoss'?'riot':'veil');
  }
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
  private totals = {scheduled:0,cancelled:0,executed:0,delaySumMs:0,rampScheduled:0,steadyScheduled:0,rampExecuted:0,steadyExecuted:0};
  get statistics():CastingStatistics { return {...this.totals,pending:this.key?1:0}; }
  private cancel():void { if(this.key) this.totals.cancelled++;this.key=null; }
  constructor(seed: number, private difficulty:Difficulty) { this.random = new Random(seed ^ 0x52a7c913); }

  tryCast(match: Match, id: PlayerId): boolean {
    if (this.match !== match || this.round !== match.state.round) {
      this.cancel(); this.match = match; this.round = match.state.round;
    }
    const player = match.state.players[id], time = match.state.time;
    if (player.stars !== match.options.isolatedSpellTier || time < player.nextCast) { this.cancel(); return false; }
    const key = opportunityKey(match,id);
    if (!key) { this.cancel(); return false; }
    if (key !== this.key) {
      this.cancel();this.key = key;
      // Sample once per opportunity, on the simulation tick grid; never per frame.
      const steps = (isolatedCasting.maxDelayMs-isolatedCasting.minDelayMs)/config.tickMs;
      const delay = (isolatedCasting.minDelayMs + Math.floor(this.random.next()*(steps+1))*config.tickMs)*isolatedCasting.delayMultipliers[this.difficulty];
      this.readyAt = time + delay;
      this.totals.scheduled++;this.totals.delaySumMs+=delay;
      this.totals[time-match.state.roundStart<config.pacing.rampMs?'rampScheduled':'steadyScheduled']++;
      return false;
    }
    if (time < this.readyAt) return false;
    match.action({type:'cast',player:id});
    if (match.state.casting?.player===id) {
      this.totals.executed++;this.totals[time-match.state.roundStart<config.pacing.rampMs?'rampExecuted':'steadyExecuted']++;
      this.key=null;return true;
    }
    this.cancel();return false;
  }
}
