# Offline AI balance report

Generated: 2026-11-17T05:04:08.357Z

Revision: 0e158aa. Config hash: c2318c0518be. Base seed: 20261116.

100 seeds × two player-side assignments × three difficulties = 600 best-of-three matches. Both bots use the same difficulty. The engine and bots are identical to browser play. Command order alternates each tick. Winning score difference: 100 points. No health pools or time-based round wins.

| Difficulty | Matches | Champignon wins | Andy wins | Draws / unfinished | Champignon win % | Andy win % | Avg seconds |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| easy | 200 | 112 | 88 | 0 / 0 | 56.0 | 44.0 | 189.0 |
| medium | 200 | 130 | 70 | 0 / 0 | 65.0 | 35.0 | 339.3 |
| hard | 200 | 172 | 22 | 0 / 6 | 86.0 | 11.0 | 724.6 |

## Spell coverage

Casts at tiers 1 / 2 / 3 / 4:

- easy: Champignon 1862 / 278 / 72 / 4; Andy 704 / 322 / 321 / 180
- medium: Champignon 1847 / 711 / 597 / 152; Andy 588 / 686 / 1255 / 532
- hard: Champignon 2254 / 1255 / 2069 / 645; Andy 1286 / 1612 / 3520 / 1084

## Interpretation

This is a balance diagnostic, not proof of human fairness. Results include bot strategy preferences, target-reading assumptions, and prototype tuning. Paired games share seeds and swap sides, but are correlated; do not treat them as independent statistical samples. Inspect spell coverage before judging a character: an unused tier is untested by these policies. The diagnostic time cap does not end an in-game round: unfinished matches are reported separately from draws, and no winner is invented. Use --fail-on-cap to make unfinished simulations a failing strict check. Human touch/keyboard playtests and multiple bot policies remain necessary. Preserve this baseline before tuning, and compare subsequent runs with the same seed range.

Reproduce: `pnpm balance --seeds=100 --seed=20261116`. Full per-match records: balance-before-score-pressure.json.
