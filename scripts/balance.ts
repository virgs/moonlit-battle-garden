import { mkdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { config } from '../src/game/config';
import { simulateBattle } from '../src/game/simulate';
import type { CharacterId, Difficulty } from '../src/game/types';

const count = Number(process.argv.find(arg => arg.startsWith('--seeds='))?.split('=')[1] ?? 100);
const baseSeed = Number(process.argv.find(arg => arg.startsWith('--seed='))?.split('=')[1] ?? 20261116);
if (!Number.isInteger(count) || count < 1 || count > 10000 || !Number.isSafeInteger(baseSeed)) {
  throw new Error('Use --seeds=1..10000 and an integer --seed.');
}
const stamp = new Date().toISOString();
const revision = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim();
const dirty = Boolean(execFileSync('git', ['status', '--porcelain', '--untracked-files=no'], { encoding: 'utf8' }).trim());
const configHash = createHash('sha256').update(JSON.stringify(config)).digest('hex').slice(0, 12);
const summaries = [];
const battles = [];
for (const difficulty of ['easy', 'medium', 'hard'] as Difficulty[]) {
  let champignon = 0, andy = 0, draws = 0, timedOut = 0, duration = 0, firstSideWins = 0;
  const casts = { champignon: [0, 0, 0, 0], andy: [0, 0, 0, 0] };
  for (let n = 0; n < count; n++) {
    for (const characters of [['champignon', 'andy'], ['andy', 'champignon']] as [CharacterId, CharacterId][]) {
      const seed = baseSeed + n;
      const result = simulateBattle(characters, difficulty, seed);
      battles.push({ difficulty, seed, characters, ...result });
      if (result.timedOut) { timedOut++; }
      else if (result.winner === 'champignon') champignon++;
      else if (result.winner === 'andy') andy++;
      else draws++;
      if (result.winnerSide === 0) firstSideWins++;
      duration += result.durationMs;
      for (const id of [0, 1] as const) result.casts[id].forEach((value, tier) => { casts[characters[id]][tier] += value; });
    }
  }
  const total = count * 2;
  const summary = { difficulty, total, champignon, andy, draws, timedOut, champignonWinRate: champignon / total, andyWinRate: andy / total, firstSideWins, averageSeconds: duration / total / 1000, casts };
  summaries.push(summary);
  console.log(`${difficulty.padEnd(6)} | Champignon ${champignon}/${total} (${(champignon / total * 100).toFixed(1)}%) | Andy ${andy}/${total} (${(andy / total * 100).toFixed(1)}%) | draws ${draws}, unfinished ${timedOut} | ${(summary.averageSeconds).toFixed(1)}s avg`);
}
const report = { rules: 'score-difference', winningLead: config.winScoreDifference, generatedAt: stamp, revision, dirty, configHash, baseSeed, pairedSeedsPerDifficulty: count, summaries, battles };
const markdown = `# Offline AI balance report\n\nGenerated: ${stamp}\n\nRevision: ${revision}${dirty ? ' + working changes' : ''}. Config hash: ${configHash}. Base seed: ${baseSeed}.\n\n${count} seeds × two player-side assignments × three difficulties = ${count * 6} best-of-three matches. Both bots use the same difficulty. The engine and bots are identical to browser play. Command order alternates each tick. Winning score difference: ${config.winScoreDifference} points. No health pools or time-based round wins.\n\n| Difficulty | Matches | Champignon wins | Andy wins | Draws / unfinished | Champignon win % | Andy win % | Avg seconds |\n| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |\n${summaries.map(row => `| ${row.difficulty} | ${row.total} | ${row.champignon} | ${row.andy} | ${row.draws} / ${row.timedOut} | ${(row.champignonWinRate * 100).toFixed(1)} | ${(row.andyWinRate * 100).toFixed(1)} | ${row.averageSeconds.toFixed(1)} |`).join('\n')}\n\n## Spell coverage\n\nCasts at tiers 1 / 2 / 3 / 4:\n\n${summaries.map(row => `- ${row.difficulty}: Champignon ${row.casts.champignon.join(' / ')}; Andy ${row.casts.andy.join(' / ')}`).join('\n')}\n\n## Interpretation\n\nThis is a balance diagnostic, not proof of human fairness. Results include bot strategy preferences, target-reading assumptions, and prototype tuning. Paired games share seeds and swap sides, but are correlated; do not treat them as independent statistical samples. Inspect spell coverage before judging a character: an unused tier is untested by these policies. The diagnostic time cap does not end an in-game round: unfinished matches are reported separately from draws, and no winner is invented. Use --fail-on-cap to make unfinished simulations a failing strict check. Human touch/keyboard playtests and multiple bot policies remain necessary. Preserve this baseline before tuning, and compare subsequent runs with the same seed range.\n\nReproduce: \`pnpm balance --seeds=${count} --seed=${baseSeed}\`. Full per-match records: balance-latest.json.\n`;
mkdirSync('reports', { recursive: true });
writeFileSync('reports/balance-latest.json', JSON.stringify(report, null, 2) + '\n');
writeFileSync('reports/balance-latest.md', markdown);
if (summaries.some(row => row.timedOut)) {
  console.warn('Some AI matches remained unfinished at the diagnostic cap; inspect duration and bot strategy before balance claims.');
  if (process.argv.includes('--fail-on-cap')) process.exitCode = 1;
}
