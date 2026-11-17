# Offline AI balance report

Generated: 2026-11-17T05:07:29.615Z

Revision: 0e158aa + working changes. Config hash: 858e4fdb49e1. Base seed: 20261116. Score pressure: disabled (independent-clock control).

100 seeds × two player-side assignments × three difficulties = 600 best-of-three matches. Both bots use the same difficulty. The engine and bots are identical to browser play. Command order alternates each tick. Winning score difference: 100 points. No health pools or time-based round wins.

| Difficulty | Matches | Champignon wins | Andy wins | Draws / unfinished | Champignon win % | Andy win % | Avg seconds |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| easy | 200 | 115 | 85 | 0 / 0 | 57.5 | 42.5 | 172.2 |
| medium | 200 | 120 | 80 | 0 / 0 | 60.0 | 40.0 | 250.7 |
| hard | 200 | 137 | 63 | 0 / 0 | 68.5 | 31.5 | 423.3 |

## Spell coverage

Casts at tiers 1 / 2 / 3 / 4:

- easy: Champignon 1666 / 244 / 55 / 8; Andy 625 / 317 / 294 / 150
- medium: Champignon 1340 / 555 / 437 / 114; Andy 451 / 539 / 815 / 358
- hard: Champignon 1386 / 793 / 1164 / 334; Andy 761 / 983 / 1908 / 610

## Interpretation

This is a balance diagnostic, not proof of human fairness. Results include bot strategy preferences, target-reading assumptions, and prototype tuning. Paired games share seeds and swap sides, but are correlated; do not treat them as independent statistical samples. Inspect spell coverage before judging a character: an unused tier is untested by these policies. The diagnostic time cap does not end an in-game round: unfinished matches are reported separately from draws, and no winner is invented. Use --fail-on-cap to make unfinished simulations a failing strict check. Human touch/keyboard playtests and multiple bot policies remain necessary. Preserve this baseline before tuning, and compare subsequent runs with the same seed range.

Reproduce: `pnpm balance --seeds=100 --seed=20261116 --no-score-pressure --report=balance-independent-control`. Full per-match records: balance-independent-control.json.
