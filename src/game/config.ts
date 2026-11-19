import { parse } from 'yaml';
import source from '../assets/config/game.yaml?raw';
import type { CharacterId, Difficulty } from './types';

type BotConfig = { reactionMs: number; intervalMs: number; accuracy: number; rabbitMistake: number; reactionJitter?: number; intervalJitter?: number; hesitationChance?: number; hesitationMinMs?: number; hesitationMaxMs?: number };
type Config = {
  winScoreDifference: number; roundWins: number; tickMs: number; countdownMs: number; maxSimulationMs: number;
  pacing: {
    buildMs: number; peakMs: number; recoveryMs: number; rampMs: number; firstSpawnMs: number;
    startIntervalMs: number; endIntervalMs: number; intervalCalm: number; intervalPeak: number;
    minIntervalMs: number; jitter: number; startLifetimeMs: number; endLifetimeMs: number;
    lifetimeCalm: number; lifetimePeak: number; minLifetimeMs: number;
    scoreIntervalReduction: number; scoreLifetimeReduction: number;
    startNaturalCap: number; endNaturalCap: number; peakExtraTarget: number; maxMagicTargets: number;
    rabbitStart: number; rabbitEnd: number; rabbitPeakExtra: number; maxRabbitStreak: number;
    starOffsetsMs: number[]; starLifetimeMs: number;
  };
  points: { mole: number; star: number };
  penalties: { miss: number; empty: number; rabbit: number };
  spells: { castFreezeMs: number; cooldownMs: number; warningMs: number; invasionMs: number; decoysMs: number; shieldMs: number };
  rosterSpells: { cleanSweepMs: number; brambleGuardMs: number; armorMs: number; markMs: number; markBonus: number; curseBonus: number; camouflageMs: number; drainMs: number; drainBonus: number; extensionMs: number; columnAutomationMs: number; fullAutomationMs: number; automationIntervalMs: number; automationPoints: number; cleanseWardMs: number };
  ai: Record<Difficulty, BotConfig>;
};

export const config = parse(source) as Config;
// Fail early on malformed tuning data rather than allowing an invalid simulation.
function validate(value: unknown, path: string): void {
  if (typeof value === 'number' && (!Number.isFinite(value) || value < 0)) throw new Error(`Invalid config: ${path}`);
  if (value && typeof value === 'object') Object.entries(value).forEach(([key, item]) => validate(item, `${path}.${key}`));
}
validate(config, 'game');
if (!config.winScoreDifference || !config.maxSimulationMs || !config.tickMs) throw new Error('Game limits and timings must be positive');
for(const [difficulty,bot] of Object.entries(config.ai)) {
  if(bot.reactionMs<=0||bot.intervalMs<=0||[bot.accuracy,bot.rabbitMistake,bot.hesitationChance??0].some(value=>value>1))throw new Error(`Invalid AI probabilities/timing: ${difficulty}`);
  if([bot.reactionJitter??0,bot.intervalJitter??0].some(value=>value>=1)||(bot.hesitationMinMs??0)>(bot.hesitationMaxMs??0))throw new Error(`Invalid AI timing variation: ${difficulty}`);
}
const pace = config.pacing;
const waveMs = pace.buildMs + pace.peakMs + pace.recoveryMs;
if ([pace.buildMs, pace.peakMs, pace.recoveryMs, pace.rampMs, pace.minIntervalMs, pace.minLifetimeMs].some(value => !value)) throw new Error('Pacing durations must be positive');
if ([pace.scoreIntervalReduction, pace.scoreLifetimeReduction].some(value => value > 0.3)) throw new Error('Score pressure reductions must be bounded at 30%');
if (pace.jitter > 0.25 || pace.endNaturalCap + pace.peakExtraTarget + pace.maxMagicTargets + 1 > 9) throw new Error('Pacing exceeds safe board limits');
if (!pace.starOffsetsMs.length || pace.starOffsetsMs.some((time, index, values) => time <= (values[index - 1] ?? 0) || time >= waveMs)) throw new Error('Star opportunities must be ordered within the wave');

export const characters: Record<CharacterId, { name: string; role: string; color: string; emblem: string; spells: { name: string; description: string }[] }> = {
  champignon: {
    name: 'Sir Champignon', role: 'The garden guardian', color: '#c9e586', emblem: '♜',
    spells: [
      { name: 'Clean Sweep', description: 'Clear current and new moles/rabbits for 1 second. Leave stars.' },
      { name: 'Mushroom Guard', description: 'Block the next mistake for 12 seconds.' },
      { name: 'Spore Ward', description: 'Block the next hostile spell for 12 seconds.' },
      { name: 'Royal Cleanup', description: 'Sweep for 1 second and block three mistakes for 12 seconds.' },
    ],
  },
  andromoss: {
    name: 'Andromoss', role: 'The star-stealing troublemaker', color: '#ffb27c', emblem: '✦',
    spells: [
      { name: 'Borrowed Spark', description: 'Copy one enemy star, if available.' },
      { name: 'Rabbit Riot', description: 'Fill upcoming enemy waves with extra rabbits for 7.5 seconds.' },
      { name: 'Sticky Fingers', description: 'Steal up to two enemy stars, if available.' },
      { name: 'Double Trouble', description: 'Send faster, rabbit-heavy waves for 8.5 seconds.' },
    ],
  },
  'captain-bramble': {
    name: 'Captain Bramble', role: 'The steadfast garden sentinel', color: '#da956b', emblem: '♜',
    spells: [
      { name: 'Tin Caps', description: 'Enemy moles need one extra hit for 2 seconds.' },
      { name: 'Bramble Brace', description: 'Block one mistake for 8 seconds.' },
      { name: 'Iron Resolve', description: 'Block three mistakes for 8 seconds.' },
      { name: 'Heavy Harvest', description: 'Enemy moles need two extra hits for 2 seconds.' },
    ],
  },
  duskmantle: {
    name: 'Duskmantle', role: 'The keeper of garden curses', color: '#bd94e7', emblem: '☾',
    spells: [
      { name: 'Ominous Bud', description: 'Mark one enemy mole; missing it costs 4 extra points.' },
      { name: 'Violet Veil', description: 'Dim enemy targets for 6.5 seconds; their shapes stay visible.' },
      { name: 'Twilight Siphon', description: 'Earn 2 extra points on manual mole hits for 7 seconds.' },
      { name: 'Withering Pact', description: 'Mark four enemy moles; each miss costs 6 extra points.' },
    ],
  },
  sprig: {
    name: 'Sprig', role: 'The tireless garden helper', color: '#9dccab', emblem: '⚙',
    spells: [
      { name: 'Gentle Tending', description: 'Extend current targets by 0.7 seconds, once per target.' },
      { name: 'Helping Tines', description: 'Work one column every 0.25 seconds for 6.5 seconds; collect stars.' },
      { name: 'Weed Out', description: 'Remove hostile magic, then block one spell for 6 seconds.' },
      { name: 'Garden Clockwork', description: 'Work two columns every 0.25 seconds for 8 seconds; collect stars.' },
    ],
  },
};
