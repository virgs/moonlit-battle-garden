# Offline AI balance report

Generated: 2026-11-18T18:58:59.088Z

Revision: 5047f29 + working changes. Config hash: 95f65d1d0d8a. Base seed: 20261118. Score pressure: enabled.

10 seeds × two player-side assignments × three difficulties = 60 best-of-three matches. Both bots use the same difficulty. The engine and bots are identical to browser play. Duration and the diagnostic cap include the shared cast freeze; target and spell timers pause during it. Command order alternates each tick. Winning score difference: 100 points. No health pools or time-based round wins.

| Difficulty | Matches | Champignon wins | Andromoss wins | Draws / unfinished | Champignon win % | Andromoss win % | Avg seconds |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| easy | 20 | 10 | 10 | 0 / 0 | 50.0 | 50.0 | 135.7 |
| medium | 20 | 8 | 12 | 0 / 0 | 40.0 | 60.0 | 229.2 |
| hard | 20 | 12 | 8 | 0 / 0 | 60.0 | 40.0 | 252.9 |

## Spell coverage

Casts at tiers 1 / 2 / 3 / 4:

- easy: Champignon 152 / 7 / 0 / 0; Andromoss 44 / 14 / 13 / 7
- medium: Champignon 235 / 51 / 4 / 0; Andromoss 35 / 35 / 39 / 36
- hard: Champignon 170 / 53 / 24 / 3; Andromoss 39 / 42 / 71 / 39

## Interpretation

This is a balance diagnostic, not proof of human fairness. Results include bot strategy preferences, target-reading assumptions, and prototype tuning. Paired games share seeds and swap sides, but are correlated; do not treat them as independent statistical samples. Inspect spell coverage before judging a character: an unused tier is untested by these policies. The diagnostic time cap does not end an in-game round: unfinished matches are reported separately from draws, and no winner is invented. Use --fail-on-cap to make unfinished simulations a failing strict check. Human touch/keyboard playtests and multiple bot policies remain necessary. Preserve this baseline before tuning, and compare subsequent runs with the same seed range.

Reproduce: `pnpm balance --seeds=10 --seed=20261118 --report=balance-andromoss-rename-smoke`. Full per-match records: balance-andromoss-rename-smoke.json.
