# Offline AI balance report

Generated: 2026-11-16T17:55:02.912Z

Revision: 0990b2b + working changes. Config hash: 3171426f1e9c. Base seed: 20261116.

100 seeds × two player-side assignments × three difficulties = 600 best-of-three matches. Both bots use the same difficulty. The engine and bots are identical to browser play. Command order alternates each tick.

| Difficulty | Matches | Champignon wins | Andy wins | Draws / capped | Champignon win % | Andy win % | Avg seconds |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| easy | 200 | 106 | 94 | 0 / 0 | 53.0 | 47.0 | 228.7 |
| medium | 200 | 200 | 0 | 0 / 0 | 100.0 | 0.0 | 258.0 |
| hard | 200 | 182 | 18 | 0 / 0 | 91.0 | 9.0 | 418.3 |

## Spell coverage

Casts at tiers 1 / 2 / 3 / 4:

- easy: Champignon 6788 / 0 / 0 / 0; Andy 6752 / 0 / 0 / 0
- medium: Champignon 5029 / 2524 / 383 / 59; Andy 0 / 5663 / 0 / 0
- hard: Champignon 5066 / 7860 / 902 / 41; Andy 0 / 11821 / 0 / 0

## Interpretation

This is a balance diagnostic, not proof of human fairness. Results include bot strategy preferences, target-reading assumptions, and prototype tuning. Paired games share seeds and swap sides, but are correlated; do not treat them as independent statistical samples. Inspect spell coverage before judging a character: an unused tier is untested by these policies. Capped matches are counted as draws and flagged separately in the JSON. Human touch/keyboard playtests and multiple bot policies remain necessary. Preserve this baseline before tuning, and compare subsequent runs with the same seed range.

Reproduce: `pnpm balance --seeds=100 --seed=20261116`. Full per-match records: balance-latest.json.
