import { config } from './config';
import { Random } from './random';
import { castSpell, message, resolveSpells } from './spells';
import type { GameAction, GameEvent, MatchOptions, MatchState, Player, PlayerId, TargetKind } from './types';

export class Match {
  readonly state: MatchState;
  events: GameEvent[] = [];
  private random: Random;
  private targetId = 0;
  private eventId = 0;
  private accumulator = 0;

  constructor(readonly options: MatchOptions) {
    this.random = new Random(options.seed);
    this.state = {
      phase: 'countdown', time: 0, round: 1, roundStart: config.countdownMs,
      countdownUntil: config.countdownMs, players: [this.createPlayer(0), this.createPlayer(1)],
      winner: null, result: '', paused: false,
    };
  }

  private createPlayer(id: PlayerId, wins = 0): Player {
    return {
      character: this.options.characters[id], score: 0, stars: 0, wins,
      holes: Array.from({ length: 9 }, () => null), spawned: 0, nextSpawn: config.countdownMs + 250,
      nextDecoy: 0, nextCast: 0, mistakeShield: 0, shieldUntil: 0, magicShieldUntil: 0,
      invasionUntil: 0, decoysUntil: 0, pending: [], message: '', messageUntil: 0,
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
    state.time += config.tickMs;
    if (state.phase === 'countdown') {
      if (state.time >= state.countdownUntil) state.phase = 'playing';
      return;
    }
    resolveSpells(state);
    state.players.forEach((player, id) => {
      player.holes.forEach((target, hole) => {
        if (target && target.expires <= state.time) {
          if (target.kind === 'mole') this.penalize(id as PlayerId, config.penalties.miss);
          player.holes[hole] = null;
        }
      });
      if (player.shieldUntil <= state.time) player.mistakeShield = 0;
      if (state.time >= player.nextSpawn) this.spawn(player);
      if ((player.invasionUntil > state.time || player.decoysUntil > state.time) && state.time >= player.nextDecoy) this.spawnDecoy(player);
    });
    this.checkOutcome();
  }

  private spawn(player: Player): void {
    const empty = player.holes.flatMap((target, index) => target ? [] : [index]);
    const progress = Math.min(1, (this.state.time - this.state.roundStart) / config.spawnRampMs);
    const decoys = player.decoysUntil > this.state.time;
    const interval = config.spawnStartMs - progress * (config.spawnStartMs - config.spawnMinMs);
    player.nextSpawn = this.state.time + interval * (decoys ? 0.75 : 1);
    if (!empty.length) return;
    const hole = empty[Math.floor(this.random.next() * empty.length)];
    let kind: TargetKind = this.random.next() < config.rabbitChance ? 'rabbit' : 'mole';
    if (++player.spawned % config.starEvery === 0) kind = 'star';
    player.holes[hole] = {
      id: ++this.targetId, kind, born: this.state.time,
      expires: this.state.time + config.targetLifeMs - progress * (config.targetLifeMs - config.minTargetLifeMs),
    };
  }

  private spawnDecoy(player: Player): void {
    const empty = player.holes.flatMap((target, index) => target ? [] : [index]);
    player.nextDecoy = this.state.time + (player.decoysUntil > this.state.time ? 650 : 950);
    if (!empty.length) return;
    const hole = empty[Math.floor(this.random.next() * empty.length)];
    player.holes[hole] = { id: ++this.targetId, kind: 'rabbit', born: this.state.time, expires: this.state.time + 1450 };
  }

  action(action: GameAction): void {
    if (this.state.phase !== 'playing' || this.state.paused) return;
    if (action.player !== 0 && action.player !== 1) return;
    if (action.type === 'cast') {
      if (castSpell(this.state, action.player)) this.emit(action.player, 'cast');
      return;
    }
    if (!Number.isInteger(action.hole) || action.hole < 0 || action.hole >= 9) return;
    const player = this.state.players[action.player];
    const target = player.holes[action.hole];
    if (!target) this.penalize(action.player, config.penalties.empty);
    else {
      player.holes[action.hole] = null;
      if (target.kind === 'rabbit') this.penalize(action.player, config.penalties.rabbit);
      else {
        player.score += config.points[target.kind];
        if (target.kind === 'star') player.stars = Math.min(4, player.stars + 1);
        this.emit(action.player, target.kind === 'star' ? 'star' : 'hit', action.hole);
      }
    }
    this.checkOutcome();
  }

  private penalize(id: PlayerId, amount: number): void {
    const player = this.state.players[id];
    if (player.mistakeShield > 0 && player.shieldUntil > this.state.time) {
      player.mistakeShield--;
      message(player, 'Guard absorbed a mistake', this.state.time);
      this.emit(id, 'shield');
    } else {
      player.score -= amount;
      this.emit(id, 'penalty');
    }
  }

  private emit(player: PlayerId, kind: GameEvent['kind'], hole?: number): void {
    this.events.push({ id: ++this.eventId, player, kind, hole });
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
    this.state.result = '';
    this.state.countdownUntil = this.state.time + config.countdownMs;
    this.state.roundStart = this.state.countdownUntil;
    this.state.players.forEach(player => { player.nextSpawn = this.state.roundStart + 250; });
    this.accumulator = 0;
  }
}
