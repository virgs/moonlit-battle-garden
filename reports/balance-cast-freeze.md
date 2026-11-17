# Offline AI balance report

Generated: 2026-11-17T16:49:12.744Z

Revision: e468efd + working changes. Config hash: 7db8b0493f9b. Base seed: 20261116. Score pressure: enabled.

100 seeds × two player-side assignments × three difficulties = 600 best-of-three matches. Both bots use the same difficulty. The engine and bots are identical to browser play. Duration and the diagnostic cap include the shared cast freeze; target and spell timers pause during it. Command order alternates each tick. Winning score difference: 100 points. No health pools or time-based round wins.

| Difficulty | Matches | Champignon wins | Andy wins | Draws / unfinished | Champignon win % | Andy win % | Avg seconds |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| easy | 200 | 110 | 90 | 0 / 0 | 55.0 | 45.0 | 200.7 |
| medium | 200 | 137 | 63 | 0 / 0 | 68.5 | 31.5 | 397.9 |
| hard | 200 | 143 | 51 | 0 / 6 | 71.5 | 25.5 | 739.0 |

## Spell coverage

Casts at tiers 1 / 2 / 3 / 4:

- easy: Champignon 1715 / 255 / 59 / 3; Andy 665 / 325 / 302 / 139
- medium: Champignon 1989 / 821 / 551 / 142; Andy 646 / 738 / 1304 / 570
- hard: Champignon 1855 / 1215 / 1752 / 543; Andy 1242 / 1667 / 3020 / 1129

## Interpretation

This is a balance diagnostic, not proof of human fairness. Results include bot strategy preferences, target-reading assumptions, and prototype tuning. Paired games share seeds and swap sides, but are correlated; do not treat them as independent statistical samples. Inspect spell coverage before judging a character: an unused tier is untested by these policies. The diagnostic time cap does not end an in-game round: unfinished matches are reported separately from draws, and no winner is invented. Use --fail-on-cap to make unfinished simulations a failing strict check. Human touch/keyboard playtests and multiple bot policies remain necessary. Preserve this baseline before tuning, and compare subsequent runs with the same seed range.

Reproduce: `pnpm balance --seeds=100 --seed=20261116 --report=balance-cast-freeze`. Full per-match records: balance-cast-freeze.json.
