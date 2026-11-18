# Offline AI balance report

Generated: 2026-11-18T03:02:54.086Z

Revision: 60fa9b1 + working changes. Config hash: 95f65d1d0d8a. Base seed: 20261116. Score pressure: enabled.

100 seeds × two player-side assignments × three difficulties = 600 best-of-three matches. Both bots use the same difficulty. The engine and bots are identical to browser play. Duration and the diagnostic cap include the shared cast freeze; target and spell timers pause during it. Command order alternates each tick. Winning score difference: 100 points. No health pools or time-based round wins.

| Difficulty | Matches | Champignon wins | Andy wins | Draws / unfinished | Champignon win % | Andy win % | Avg seconds |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| easy | 200 | 92 | 108 | 0 / 0 | 46.0 | 54.0 | 156.7 |
| medium | 200 | 98 | 102 | 0 / 0 | 49.0 | 51.0 | 191.2 |
| hard | 200 | 130 | 70 | 0 / 0 | 65.0 | 35.0 | 255.9 |

## Spell coverage

Casts at tiers 1 / 2 / 3 / 4:

- easy: Champignon 1756 / 85 / 3 / 0; Andy 519 / 176 / 153 / 104
- medium: Champignon 1967 / 350 / 46 / 2; Andy 300 / 303 / 338 / 271
- hard: Champignon 1683 / 588 / 279 / 26; Andy 404 / 483 / 694 / 375

## Interpretation

This is a balance diagnostic, not proof of human fairness. Results include bot strategy preferences, target-reading assumptions, and prototype tuning. Paired games share seeds and swap sides, but are correlated; do not treat them as independent statistical samples. Inspect spell coverage before judging a character: an unused tier is untested by these policies. The diagnostic time cap does not end an in-game round: unfinished matches are reported separately from draws, and no winner is invented. Use --fail-on-cap to make unfinished simulations a failing strict check. Human touch/keyboard playtests and multiple bot policies remain necessary. Preserve this baseline before tuning, and compare subsequent runs with the same seed range.

Reproduce: `pnpm balance --seeds=100 --seed=20261116 --report=balance-duration-final`. Full per-match records: balance-duration-final.json.
