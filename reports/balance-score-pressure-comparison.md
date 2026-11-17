# Score-pressure balance comparison

Each condition uses the same 100 seeds per difficulty, both character-side assignments, unchanged bots/spells/scoring and the actual browser simulation: 600 matches per condition, 2,400 total. Unfinished means the headless 30-minute diagnostic cap, not a timed in-game result.

| Condition | Difficulty | Champignon wins | Andy wins | Unfinished | Average seconds |
| --- | --- | ---: | ---: | ---: | ---: |
| Synchronized baseline | easy | 112 / 200 | 88 / 200 | 0 | 189.0 |
| Synchronized baseline | medium | 130 / 200 | 70 / 200 | 0 | 339.3 |
| Synchronized baseline | hard | 172 / 200 | 22 / 200 | 6 | 724.6 |
| Independent clocks, no score modifier | easy | 115 / 200 | 85 / 200 | 0 | 172.2 |
| Independent clocks, no score modifier | medium | 120 / 200 | 80 / 200 | 0 | 250.7 |
| Independent clocks, no score modifier | hard | 137 / 200 | 63 / 200 | 0 | 423.3 |
| 20% intervals / 15% lifetimes (rejected) | easy | 96 / 200 | 104 / 200 | 0 | 180.2 |
| 20% intervals / 15% lifetimes (rejected) | medium | 131 / 200 | 69 / 200 | 0 | 418.4 |
| 20% intervals / 15% lifetimes (rejected) | hard | 130 / 200 | 26 / 200 | 44 | 1135.9 |
| 10% intervals / 10% lifetimes (current) | easy | 110 / 200 | 90 / 200 | 0 | 174.7 |
| 10% intervals / 10% lifetimes (current) | medium | 137 / 200 | 63 / 200 | 0 | 347.3 |
| 10% intervals / 10% lifetimes (current) | hard | 144 / 200 | 53 / 200 | 3 | 649.5 |

The stronger modifier was rejected because 22% of Hard matches remained unfinished. The gentler current default cuts Hard unfinished matches from six in the old baseline to three and reduces Champignon's overall Hard win share from 86% to 72%. Easy remains close (55% Champignon). Medium worsens slightly against the old baseline (65% → 68.5% Champignon).

Independent clocks alone produced 60% Medium and 68.5% Hard Champignon wins, with zero unfinished matches. Thus the score modifier itself is not established as a character-balance improvement: it supplies the requested comeback opportunities/pressure but increases duration and favors Champignon relative to that control. More star opportunities also increase spell throughput. No spell or bot tuning was bundled into this change.

All four spell tiers receive casts in every condition; Champignon tier four remains sparsely exercised on Easy. Paired seeds are correlated, and different RNG schedules change individual matches. These runs diagnose strategy/pacing interactions, not human fairness or statistical proof of improvement. Avoid tuning toward a bot-only 50% outcome. Human Medium playtesting and spell-strategy review remain necessary.

## Reproduce

- Old synchronized baseline: revision `0e158aa`, `pnpm balance --seeds=100 --seed=20261116`; archive in balance-before-score-pressure.md/json.
- Independent-clock control on the new implementation: `pnpm balance --seeds=100 --seed=20261116 --no-score-pressure --report=balance-independent-control`.
- Rejected stronger pressure: set `scoreIntervalReduction: 0.20` and `scoreLifetimeReduction: 0.15` in game.yaml; run `pnpm balance --seeds=100 --seed=20261116 --report=balance-score-pressure-20-15`.
- Current default (both reductions 0.10): `pnpm balance --seeds=100 --seed=20261116`.

Reports retain config hashes, timestamps, working-tree status, cast coverage and full per-match JSON. The baseline was re-run before editing. Three Hard matches remain unfinished at the current diagnostic cap; this is an open pacing/balance issue, not an awarded draw or win.
