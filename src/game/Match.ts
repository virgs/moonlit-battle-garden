import { config } from './config';
import { SpawnDirector } from './SpawnDirector';
import { castSpell, message, resolveSpells } from './spells';
import type { GameAction, GameEvent, MatchOptions, MatchState, Player, PlayerId, TargetKind } from './types';

export class Match {
  readonly state: MatchState;
  events: GameEvent[] = [];
  private spawns: SpawnDirector;
  private eventId = 0;
  private accumulator = 0;

  constructor(readonly options: MatchOptions) {
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
      nextDecoy: 0, nextCast: 0, mistakeShield: 0, shieldTier: 1, shieldUntil: 0, magicShieldUntil: 0,
      invasionUntil: 0, decoysUntil: 0, armorUntil: 0, armorHits: 0, armorTier: 2, markUntil: 0, markCharges: 0, markBonus: 0, markTier: 1, camouflageUntil: 0, drainUntil: 0, automationUntil: 0, automationColumn: null, automationTier: 2, nextAutomation: 0, pending: [], message: '', messageUntil: 0,
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
      if (state.casting.remainingMs <= 0) state.casting = null;
      return;
    }
    state.time += config.tickMs;
    if (state.phase === 'countdown') {
      if (state.time >= state.countdownUntil) state.phase = 'playing';
      return;
    }
    resolveSpells(state);
    state.players.forEach((player, id) => {
      if (player.automationUntil > state.time && state.time >= player.nextAutomation) {
        player.nextAutomation = state.time + config.rosterSpells.automationIntervalMs;
        const hole = player.holes.findIndex((target, index) => target?.kind === 'mole' && target.expires > state.time && state.time - target.born >= 200 && (player.automationColumn === null || index % 3 === player.automationColumn));
        if (hole >= 0) {
          const target = player.holes[hole]!;
          if (target.armor) target.armor--;
          else { player.holes[hole] = null; player.score += config.rosterSpells.automationPoints; this.emit(id as PlayerId, 'hit', hole, undefined, 'mole'); }
        }
      }
      player.holes.forEach((target, hole) => {
        if (target && target.expires <= state.time) {
          if (target.kind === 'mole') this.penalize(id as PlayerId, config.penalties.miss + (target.missBonus ?? 0), undefined, undefined, 'miss');
          player.holes[hole] = null;
        }
      });
      if (player.shieldUntil <= state.time) player.mistakeShield = 0;
    });
    this.spawns.update(state);
    this.checkOutcome();
  }

  action(action: GameAction): void {
    if (this.state.phase !== 'playing' || this.state.paused || this.state.casting) return;
    if (action.player !== 0 && action.player !== 1) return;
    if (action.type === 'cast') {
      const tier = this.state.players[action.player].stars;
      if (castSpell(this.state, action.player)) {
        this.emit(action.player, 'cast', undefined, tier);
        this.state.casting = { player: action.player, tier, remainingMs: config.spells.castFreezeMs };
      }
      return;
    }
    if (!Number.isInteger(action.hole) || action.hole < 0 || action.hole >= 9) return;
    const player = this.state.players[action.player];
    const target = player.holes[action.hole];
    if (!target) this.penalize(action.player, config.penalties.empty, undefined, undefined, 'empty');
    else {
      if (target.kind === 'mole' && target.armor) {
        target.armor--;
        this.emit(action.player, 'shield', undefined, undefined, 'mole');
        return;
      }
      player.holes[action.hole] = null;
      if (target.kind === 'rabbit') this.penalize(action.player, config.penalties.rabbit, action.hole, 'rabbit', 'rabbit');
      else {
        player.score += config.points[target.kind] + (target.kind === 'mole' && player.drainUntil > this.state.time ? config.rosterSpells.drainBonus : 0);
        if (target.kind === 'star') player.stars = Math.min(4, player.stars + 1);
        this.emit(action.player, target.kind === 'star' ? 'star' : 'hit', action.hole, undefined, target.kind);
      }
    }
    this.checkOutcome();
  }

  private penalize(id: PlayerId, amount: number, hole?: number, targetKind?: TargetKind, reason?: GameEvent['reason']): void {
    const player = this.state.players[id];
    if (player.mistakeShield > 0 && player.shieldUntil > this.state.time) {
      player.mistakeShield--;
      message(player, 'Guard absorbed a mistake', this.state.time);
      this.emit(id, 'shield', hole, undefined, targetKind, reason);
    } else {
      player.score -= amount;
      this.emit(id, 'penalty', hole, undefined, targetKind, reason);
    }
  }

  private emit(player: PlayerId, kind: GameEvent['kind'], hole?: number, tier?: number, targetKind?: TargetKind, reason?: GameEvent['reason']): void {
    this.events.push({ id: ++this.eventId, time: this.state.time, round: this.state.round, player, kind, hole, tier, targetKind, reason });
    this.events = this.events.slice(-32);
  }

  private checkOutcome(): void {
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
