import { parse } from 'yaml';
import source from '../assets/config/game.yaml?raw';
import type { CharacterId, Difficulty } from './types';

type BotConfig = { reactionMs: number; intervalMs: number; accuracy: number; rabbitMistake: number };
type Config = {
  winScoreDifference: number; roundWins: number; tickMs: number; countdownMs: number; maxSimulationMs: number;
  spawnStartMs: number; spawnMinMs: number; spawnRampMs: number;
  targetLifeMs: number; minTargetLifeMs: number; starEvery: number; rabbitChance: number;
  points: { mole: number; star: number };
  penalties: { miss: number; empty: number; rabbit: number };
  spells: { cooldownMs: number; warningMs: number; invasionMs: number; decoysMs: number; shieldMs: number };
  ai: Record<Difficulty, BotConfig>;
};

export const config = parse(source) as Config;
// Fail early on malformed tuning data rather than allowing an invalid simulation.
function validate(value: unknown, path: string): void {
  if (typeof value === 'number' && (!Number.isFinite(value) || value < 0)) throw new Error(`Invalid config: ${path}`);
  if (value && typeof value === 'object') Object.entries(value).forEach(([key, item]) => validate(item, `${path}.${key}`));
}
validate(config, 'game');
if (!config.winScoreDifference || !config.maxSimulationMs || !config.tickMs || !config.starEvery || !config.spawnRampMs) throw new Error('Game limits and timings must be positive');

export const characters: Record<CharacterId, { name: string; role: string; color: string; emblem: string; spells: { name: string; description: string }[] }> = {
  champignon: {
    name: 'Sir Champignon', role: 'The garden guardian', color: '#c9e586', emblem: '♜',
    spells: [
      { name: 'Mushroom Guard', description: 'Block the next mistake for 12 seconds.' },
      { name: 'Clean Sweep', description: 'Safely clear moles and rabbits. Leave stars to collect.' },
      { name: 'Spore Ward', description: 'Block the next hostile spell for 12 seconds.' },
      { name: 'Royal Cleanup', description: 'Sweep the board and block three mistakes for 12 seconds.' },
    ],
  },
  andy: {
    name: 'Andy', role: 'The star-stealing troublemaker', color: '#ffb27c', emblem: '✦',
    spells: [
      { name: 'Borrowed Spark', description: 'Copy one enemy star. Gain a guard if they have none.' },
      { name: 'Rabbit Riot', description: 'Fill upcoming enemy waves with extra rabbits for 7.5 seconds.' },
      { name: 'Sticky Fingers', description: 'Steal up to two enemy stars. Gain a guard if they have none.' },
      { name: 'Double Trouble', description: 'Send faster, rabbit-heavy waves for 8.5 seconds.' },
    ],
  },
};
