# Offline AI balance report

Generated: 2026-11-16T19:14:41.873Z

Revision: a42c573. Config hash: 93aa290e19cd. Base seed: 20261116.

100 seeds × two player-side assignments × three difficulties = 600 best-of-three matches. Both bots use the same difficulty. The engine and bots are identical to browser play. Command order alternates each tick. Winning score difference: 100 points. No health pools or time-based round wins.

| Difficulty | Matches | Champignon wins | Andy wins | Draws / capped | Champignon win % | Andy win % | Avg seconds |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| easy | 200 | 93 | 107 | 0 / 0 | 46.5 | 53.5 | 157.9 |
| medium | 200 | 143 | 57 | 0 / 0 | 71.5 | 28.5 | 232.3 |
| hard | 200 | 190 | 10 | 0 / 0 | 95.0 | 5.0 | 282.2 |

## Spell coverage

Casts at tiers 1 / 2 / 3 / 4:

- easy: Champignon 1660 / 483 / 303 / 88; Andy 1007 / 529 / 589 / 247
- medium: Champignon 1389 / 1041 / 1073 / 407; Andy 794 / 923 / 1767 / 765
- hard: Champignon 1014 / 1388 / 1880 / 696; Andy 1002 / 1289 / 2553 / 1110

## Interpretation

This is a balance diagnostic, not proof of human fairness. Results include bot strategy preferences, target-reading assumptions, and prototype tuning. Paired games share seeds and swap sides, but are correlated; do not treat them as independent statistical samples. Inspect spell coverage before judging a character: an unused tier is untested by these policies. Capped matches are counted as draws and flagged separately in the JSON. Human touch/keyboard playtests and multiple bot policies remain necessary. Preserve this baseline before tuning, and compare subsequent runs with the same seed range.

Reproduce: `pnpm balance --seeds=100 --seed=20261116`. Full per-match records: balance-latest.json.
