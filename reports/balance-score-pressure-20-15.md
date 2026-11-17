# Offline AI balance report

Generated: 2026-11-17T05:07:29.615Z

Revision: 0e158aa + working changes. Config hash: 0603ed982e4b. Base seed: 20261116. Score pressure: enabled.

100 seeds × two player-side assignments × three difficulties = 600 best-of-three matches. Both bots use the same difficulty. The engine and bots are identical to browser play. Command order alternates each tick. Winning score difference: 100 points. No health pools or time-based round wins.

| Difficulty | Matches | Champignon wins | Andy wins | Draws / unfinished | Champignon win % | Andy win % | Avg seconds |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| easy | 200 | 96 | 104 | 0 / 0 | 48.0 | 52.0 | 180.2 |
| medium | 200 | 131 | 69 | 0 / 0 | 65.5 | 34.5 | 418.4 |
| hard | 200 | 130 | 26 | 0 / 44 | 65.0 | 13.0 | 1135.9 |

## Spell coverage

Casts at tiers 1 / 2 / 3 / 4:

- easy: Champignon 1883 / 262 / 66 / 3; Andy 661 / 329 / 313 / 163
- medium: Champignon 2360 / 1039 / 659 / 154; Andy 706 / 933 / 1679 / 735
- hard: Champignon 2795 / 1999 / 3244 / 1041; Andy 2143 / 2961 / 5801 / 2050

## Interpretation

This is a balance diagnostic, not proof of human fairness. Results include bot strategy preferences, target-reading assumptions, and prototype tuning. Paired games share seeds and swap sides, but are correlated; do not treat them as independent statistical samples. Inspect spell coverage before judging a character: an unused tier is untested by these policies. The diagnostic time cap does not end an in-game round: unfinished matches are reported separately from draws, and no winner is invented. Use --fail-on-cap to make unfinished simulations a failing strict check. Human touch/keyboard playtests and multiple bot policies remain necessary. Preserve this baseline before tuning, and compare subsequent runs with the same seed range.

Reproduce: `pnpm balance --seeds=100 --seed=20261116`. Full per-match records: balance-score-pressure-20-15.json.
