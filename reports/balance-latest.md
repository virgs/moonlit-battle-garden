# Offline AI balance report

Generated: 2026-11-16T17:58:59.896Z

Revision: 2b51178. Config hash: 3171426f1e9c. Base seed: 20261116.

100 seeds × two player-side assignments × three difficulties = 600 best-of-three matches. Both bots use the same difficulty. The engine and bots are identical to browser play. Command order alternates each tick.

| Difficulty | Matches | Champignon wins | Andy wins | Draws / capped | Champignon win % | Andy win % | Avg seconds |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| easy | 200 | 136 | 64 | 0 / 0 | 68.0 | 32.0 | 153.9 |
| medium | 200 | 175 | 25 | 0 / 0 | 87.5 | 12.5 | 309.6 |
| hard | 200 | 111 | 89 | 0 / 0 | 55.5 | 44.5 | 455.3 |

## Spell coverage

Casts at tiers 1 / 2 / 3 / 4:

- easy: Champignon 1829 / 420 / 241 / 60; Andy 976 / 484 / 479 / 206
- medium: Champignon 3532 / 1570 / 1346 / 480; Andy 1061 / 1306 / 2334 / 1227
- hard: Champignon 1456 / 2457 / 3540 / 1421; Andy 1700 / 2271 / 4740 / 1977

## Interpretation

This is a balance diagnostic, not proof of human fairness. Results include bot strategy preferences, target-reading assumptions, and prototype tuning. Paired games share seeds and swap sides, but are correlated; do not treat them as independent statistical samples. Inspect spell coverage before judging a character: an unused tier is untested by these policies. Capped matches are counted as draws and flagged separately in the JSON. Human touch/keyboard playtests and multiple bot policies remain necessary. Preserve this baseline before tuning, and compare subsequent runs with the same seed range.

Reproduce: `pnpm balance --seeds=100 --seed=20261116`. Full per-match records: balance-latest.json.
