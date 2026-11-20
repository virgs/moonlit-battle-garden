import { hasGuard } from './targetModifiers';
import { config } from './config';
import { playerStatistics, type MatchStatistics } from './statistics';
import { SpawnDirector } from './SpawnDirector';
import { castSpell, message, resolveSpells } from './spells';
import type { GameAction, GameEvent, MatchOptions, MatchState, Player, PlayerId, TargetKind } from './types';

export class Match {
  readonly state: MatchState;
  events: GameEvent[] = [];
  readonly statistics: MatchStatistics = [playerStatistics(), playerStatistics()];
  get isolatedCastingPolicy(): 'normal' | 'immediate' | 'opportunity' {
    return this.options.isolatedSpellTier ? this.options.isolatedCastingPolicy ?? (this.options.isolatedSpellTier <= 2 ? 'opportunity' : 'immediate') : 'normal';
  }
  get starCapacity(): number { return this.options.isolatedSpellTier ?? 4; }
  private spawns: SpawnDirector;
  private eventId = 0;
  private accumulator = 0;

  constructor(readonly options: MatchOptions) {
    if (options.isolatedSpellTier !== undefined && ![1,2,3,4].includes(options.isolatedSpellTier)) throw Error('Isolated tier must be 1..4');
    if (options.isolatedCastingPolicy && !options.isolatedSpellTier) throw Error('Casting policy requires an isolated tier');
    if (options.isolatedCastingPolicy === 'opportunity' && ![1,2].includes(options.isolatedSpellTier ?? 0)) throw Error('Opportunity conditions currently cover tiers 1 and 2 only');
    if (options.diagnosticMode && (options.mode !== 'local' || options.isolatedSpellTier || options.isolatedCastingPolicy)) throw Error('Reaction diagnostics require local mode and no isolated spell policy');
    this.spawns = new SpawnDirector(options.seed);
    this.spawns.reset(config.countdownMs);
    this.state = {
      phase: 'countdown', time: 0, round: 1, roundStart: config.countdownMs,
      countdownUntil: config.countdownMs, players: [this.createPlayer(0), this.createPlayer(1)],
      winner: null, result: '', paused: false, casting: null,
    };
  }

  private createPlayer(id: PlayerId, wins = 0): Player {
    return {
      character: this.options.characters[id], score: 0, stars: 0, wins,
      holes: Array.from({ length: 9 }, () => null), spawned: 0, nextSpawn: config.countdownMs + config.pacing.firstSpawnMs,
      nextDecoy: 0, nextCast: 0, mistakeShield: 0, shieldTier: 1, shieldUntil: 0, shieldPermanent: false, magicShieldUntil: 0,
      invasionUntil: 0, decoysUntil: 0, armorUntil: 0, armorHits: 0, armorCharges: 0, tinCharges: 0, armorTier: 2, markUntil: 0, markCharges: 0, markBonus: 0, markTier: 1, camouflageUntil: 0, drainUntil: 0, tendingUntil: 0, automationUntil: 0, automationColumns: [], sweepUntil: 0, sweepColumns: [], sweepTier: 1, nextSweep: 0, automationTier: 2, nextAutomation: 0, pending: [], message: '', messageUntil: 0,
    };
  }

  advance(ms: number): void {
    if (this.state.paused || !Number.isFinite(ms) || ms <= 0) return;
    this.accumulator += ms;
    while (this.accumulator >= config.tickMs) {
      this.accumulator -= config.tickMs;
      this.tick();
    }
  }

  private tick(): void {
    const state = this.state;
    if (state.phase === 'round-over' || state.phase === 'match-over') return;
    if (state.casting) {
      state.casting.remainingMs -= config.tickMs;
      if (state.casting.remainingMs <= 0) { state.casting = null; this.checkOutcome(); }
      return;
    }
    state.time += config.tickMs;
    if (state.phase === 'countdown') {
      if (state.time >= state.countdownUntil) state.phase = 'playing';
      return;
    }
    resolveSpells(state, this.starCapacity, this.statistics);
    state.players.forEach((player, id) => {
      if (player.sweepTier === 4 && player.sweepUntil > state.time && state.time >= player.nextSweep) {
        player.nextSweep = state.time + config.rosterSpells.royalSweepIntervalMs;
        this.sweepBoard(id as PlayerId);
      }
      if (player.automationUntil > state.time && state.time >= player.nextAutomation) {
        player.nextAutomation = state.time + config.rosterSpells.automationIntervalMs;
        const hole = player.holes.findIndex((target, index) => target && target.expires > state.time && state.time - target.born >= 200 && player.automationColumns.includes(index % 3));
        if (hole >= 0) this.hitTarget(id as PlayerId, hole, true);
      }
      player.holes.forEach((target, hole) => {
        if (target && target.expires <= state.time) {
          if(target.extended)this.statistics[id as PlayerId][target.kind==='mole'?'tendingMoleExpiries':target.kind==='star'?'tendingStarExpiries':'tendingRabbitExpiries']++;
          if (target.kind === 'mole') this.penalize(id as PlayerId, config.penalties.miss + (target.missBonus ?? 0), undefined, undefined, 'miss');
          player.holes[hole] = null;
        }
      });
      if (!player.shieldPermanent && player.shieldUntil <= state.time) player.mistakeShield = 0;
    });
    this.spawns.update(state);
    // Tier 1 owns its column for the full window: include targets born this tick.
    state.players.forEach((player,id)=>{
      if(player.sweepTier===1 && player.sweepUntil>state.time)this.sweepBoard(id as PlayerId);
    });
    this.checkOutcome();
  }

  action(action: GameAction): void {
    if (this.state.phase !== 'playing' || this.state.paused || this.state.casting) return;
    if (action.player !== 0 && action.player !== 1) return;
    if (action.type === 'cast') {
      if (this.options.diagnosticMode === 'reaction') return;
      const tier = this.state.players[action.player].stars;
      if (this.options.isolatedSpellTier && tier !== this.options.isolatedSpellTier) return;
      if (castSpell(this.state, action.player)) {
        if(config.spells.warningMs===0)resolveSpells(this.state,this.starCapacity,this.statistics);
        this.emit(action.player, 'cast', undefined, tier);
        this.state.casting = { player: action.player, tier, remainingMs: config.spells.castFreezeMs };
        if (this.state.players[action.player].character === 'champignon' && (tier === 1 || tier === 4)) this.sweepBoard(action.player);
      }
      return;
    }
    if (!Number.isInteger(action.hole) || action.hole < 0 || action.hole >= 9) return;
    this.hitTarget(action.player, action.hole);
    this.checkOutcome();
  }

  private sweepBoard(id: PlayerId): void {
    const player = this.state.players[id];
    for (let hole = 0; hole < player.holes.length; hole++) {
      const target = player.holes[hole];
      if (target && target.expires > this.state.time && player.sweepColumns.includes(hole % 3)) this.hitTarget(id, hole, true);
    }
  }

  /** Manual hits and all automatic hits share the same base rewards and penalties. */
  private hitTarget(id: PlayerId, hole: number, automated = false): void {
    const player = this.state.players[id], target = player.holes[hole];
    if (!target) { if (!automated) this.penalize(id, config.penalties.empty, undefined, undefined, 'empty'); return; }
    if (target.kind === 'mole' && target.armor) {
      target.armor--;
      this.emit(id, 'shield', undefined, undefined, 'mole');
      return;
    }
    if(automated && player.character==='sprig')this.statistics[id][target.kind==='mole'?'automationMoleHits':target.kind==='star'?'automationStarHits':'automationRabbitHits']++;
    if(target.extended) {
      const stats=this.statistics[id];
      stats[target.kind==='mole'?'tendingMoleHits':target.kind==='star'?'tendingStarHits':'tendingRabbitHits']++;
      // Observed hits during earned extra time, not a counterfactual benefit estimate.
      if(this.state.time>=target.expires-config.rosterSpells.extensionMs)
        stats[target.kind==='mole'?'tendingLateMoleHits':target.kind==='star'?'tendingLateStarHits':'tendingLateRabbitHits']++;
    }
    player.holes[hole] = null;
    if (target.kind === 'rabbit') {
      this.penalize(id, config.penalties.rabbit, hole, 'rabbit', 'rabbit');
      return;
    }
    const points = config.points[target.kind]
      + (!automated && target.kind === 'mole' && player.drainUntil > this.state.time ? config.rosterSpells.drainBonus : 0);
    player.score += points;
    this.statistics[id].pointsEarned += points;
    if (target.kind === 'star') {
      this.statistics[id].starsCollected += Math.min(1, this.starCapacity - player.stars);
      player.stars = Math.min(this.starCapacity, player.stars + 1);
    }
    this.emit(id, target.kind === 'star' ? 'star' : 'hit', hole, undefined, target.kind);
  }

  private penalize(id: PlayerId, amount: number, hole?: number, targetKind?: TargetKind, reason?: GameEvent['reason']): void {
    const player = this.state.players[id];
    if (hasGuard(player,this.state.time)) {
      player.mistakeShield--;
      this.statistics[id].guardBlocks++;
      this.statistics[id].guardPointsPrevented += amount;
      message(player, 'Guard absorbed a mistake', this.state.time);
      this.emit(id, 'shield', hole, undefined, targetKind, reason);
    } else {
      player.score -= amount;
      this.statistics[id].pointsLost += amount;
      this.emit(id, 'penalty', hole, undefined, targetKind, reason);
    }
  }

  private emit(player: PlayerId, kind: GameEvent['kind'], hole?: number, tier?: number, targetKind?: TargetKind, reason?: GameEvent['reason']): void {
    this.events.push({ id: ++this.eventId, time: this.state.time, round: this.state.round, player, kind, hole, tier, targetKind, reason });
    this.events = this.events.slice(-32);
  }

  private checkOutcome(): void {
    if (this.options.diagnosticMode === 'reaction') return;
    const state = this.state;
    if (state.phase !== 'playing') return;
    const [a, b] = state.players;
    const difference = a.score - b.score;
    if (Math.abs(difference) < config.winScoreDifference) return;
    state.winner = difference > 0 ? 0 : 1;
    state.players[state.winner].wins++;
    state.phase = state.players.some(player => player.wins >= config.roundWins) ? 'match-over' : 'round-over';
    state.result = state.winner === null ? 'A draw! Play another round.' : `${state.winner === 0 ? 'Player 1' : 'Player 2'} wins ${state.phase === 'match-over' ? 'the match' : 'the round'}!`;
  }

  nextRound(): void {
    if (this.state.phase !== 'round-over') return;
    const wins = this.state.players.map(player => player.wins);
    this.state.players = [this.createPlayer(0, wins[0]), this.createPlayer(1, wins[1])];
    this.state.round++;
    this.state.phase = 'countdown';
    this.state.winner = null;
    this.state.casting = null;
    this.state.result = '';
    this.state.countdownUntil = this.state.time + config.countdownMs;
    this.state.roundStart = this.state.countdownUntil;
    this.state.players.forEach(player => { player.nextSpawn = this.state.roundStart + config.pacing.firstSpawnMs; });
    this.spawns.reset(this.state.roundStart);
    this.accumulator = 0;
  }
}
