# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep useful/urgent selected column, theft enemy charge, armor unarmored enemy mole, mark unmarked enemy mole, tending unextended own mole near escape. No refresh of an active Sweep. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell powers unchanged.

Generated 2026-11-19T23:41:20.136Z. Revision cb19384 + working changes; config ca6fcc075bc8; simulation efd9ed909229ae8b; base seed 20261119. Tuning overrides: {"tendingMs":6000}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.8% | 🟩68.8%* | 🟩73.5% | 🟨60.0% |
| Andromoss | 🟥38.2% | — | 🟨44.3% | 🟨45.0% | 🟨41.8% |
| Captain Bramble | 🟥31.2%* | 🟨55.7% | — | 🟨52.0%* | 🟥33.7% |
| Duskmantle | 🟥26.5% | 🟨55.0% | 🟨48.0%* | — | 🟥38.5% |
| Sprig | 🟨40.0% | 🟨58.2% | 🟩66.3% | 🟩61.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩64.5% | 🟩78.0% | 🟩74.0% | 🟩63.5% |
| Andromoss | 🟥35.5% | — | 🟨44.0% | 🟨44.0% | 🟨41.5% |
| Captain Bramble | 🟥22.0% | 🟨56.0% | — | 🟨47.5% | 🟥32.0% |
| Duskmantle | 🟥26.0% | 🟨56.0% | 🟨52.5% | — | 🟥34.0% |
| Sprig | 🟥36.5% | 🟨58.5% | 🟩68.0% | 🟩66.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.0% | 🟩71.5% | 🟩78.5% | 🟨54.0% |
| Andromoss | 🟥39.0% | — | 🟨44.0% | 🟨46.0% | 🟨42.0% |
| Captain Bramble | 🟥28.5% | 🟨56.0% | — | 🟨52.5% | 🟥27.5% |
| Duskmantle | 🟥21.5% | 🟨54.0% | 🟨47.5% | — | 🟥33.0% |
| Sprig | 🟨46.0% | 🟨58.0% | 🟩72.5% | 🟩67.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨60.0% | 🟨57.0% | 🟩68.0% | 🟩62.5% |
| Andromoss | 🟨40.0% | — | 🟨45.0% | 🟨45.0% | 🟨42.0% |
| Captain Bramble | 🟨43.0% | 🟨55.0% | — | 🟨56.0% | 🟨41.5% |
| Duskmantle | 🟥32.0% | 🟨55.0% | 🟨44.0% | — | 🟨48.5% |
| Sprig | 🟥37.5% | 🟨58.0% | 🟨58.5% | 🟨51.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 78.0%, medium 71.5%, hard 57.0%; spread 21.0 points.
- Captain Bramble vs Duskmantle: easy 47.5%, medium 52.5%, hard 56.0%; spread 8.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 46.7 | 120.5 | 1127/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 129 / 71 | 0 | 46.8 | 137.1 | 480/0/0/0 · 883/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 156 / 44 | 0 | 47.5 | 140.6 | 1099/0/0/0 · 1090/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 148 / 52 | 0 | 46.3 | 128.3 | 1002/0/0/0 · 1039/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 127 / 73 | 0 | 46.2 | 125.8 | 1102/0/0/0 · 976/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 59 left-side wins | 0 | 48.0 | 153.3 | 547/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 88 / 112 | 0 | 50.1 | 144.9 | 859/0/0/0 · 574/0/0/0 |
| easy | Andromoss / Duskmantle | 200 | 88 / 112 | 0 | 48.5 | 147.4 | 834/0/0/0 · 574/0/0/0 |
| easy | Andromoss / Sprig | 200 | 83 / 117 | 0 | 50.3 | 151.8 | 1014/0/0/0 · 268/0/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 61 left-side wins | 0 | 50.9 | 154.8 | 1111/0/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 95 / 105 | 0 | 49.9 | 140.4 | 1080/0/0/0 · 1085/0/0/0 |
| easy | Captain Bramble / Sprig | 200 | 64 / 136 | 0 | 51.0 | 126.4 | 1137/0/0/0 · 1012/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 47.0 | 151.0 | 1094/0/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 68 / 132 | 0 | 50.8 | 124.2 | 1141/0/0/0 · 1002/0/0/0 |
| easy | Sprig / Sprig | 100 | 68 left-side wins | 0 | 50.3 | 147.3 | 1046/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 60 left-side wins | 0 | 64.7 | 173.7 | 2181/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 122 / 78 | 0 | 57.5 | 150.9 | 822/0/0/0 · 1830/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 143 / 57 | 0 | 60.6 | 160.3 | 2114/0/0/0 · 1987/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 157 / 43 | 0 | 61.2 | 154.4 | 2050/0/0/0 · 2011/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 108 / 92 | 0 | 61.5 | 157.8 | 2056/0/0/0 · 1762/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 59.3 | 159.6 | 1154/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 88 / 112 | 0 | 59.0 | 162.8 | 1856/0/0/0 · 980/0/0/0 |
| medium | Andromoss / Duskmantle | 200 | 92 / 108 | 0 | 57.5 | 163.1 | 1794/0/0/0 · 944/0/0/0 |
| medium | Andromoss / Sprig | 200 | 84 / 116 | 0 | 58.4 | 150.4 | 2009/0/0/0 · 501/0/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 55 left-side wins | 0 | 64.8 | 182.7 | 2179/0/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 105 / 95 | 0 | 61.5 | 172.2 | 2173/0/0/0 · 2170/0/0/0 |
| medium | Captain Bramble / Sprig | 200 | 55 / 145 | 0 | 62.1 | 151.6 | 2030/0/0/0 · 1806/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 57 left-side wins | 0 | 57.3 | 159.0 | 2104/0/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 66 / 134 | 0 | 60.8 | 150.7 | 2051/0/0/0 · 1723/0/0/0 |
| medium | Sprig / Sprig | 100 | 56 left-side wins | 0 | 60.7 | 153.8 | 1825/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 51 left-side wins | 0 | 96.0 | 239.0 | 3954/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 120 / 80 | 0 | 85.4 | 235.8 | 1614/0/0/0 · 3693/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 114 / 86 | 0 | 90.5 | 227.6 | 3786/0/0/0 · 3546/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 136 / 64 | 0 | 86.0 | 242.3 | 3697/0/0/0 · 3570/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 125 / 75 | 0 | 88.5 | 235.9 | 3967/0/0/0 · 3379/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 87.5 | 220.9 | 2278/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 90 / 110 | 0 | 83.8 | 216.5 | 3560/0/0/0 · 1495/0/0/0 |
| hard | Andromoss / Duskmantle | 200 | 90 / 110 | 0 | 88.7 | 231.8 | 3728/0/0/0 · 1617/0/0/0 |
| hard | Andromoss / Sprig | 200 | 84 / 116 | 0 | 85.0 | 220.8 | 3578/0/0/0 · 1294/0/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 48 left-side wins | 0 | 90.0 | 229.6 | 3722/0/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 112 / 88 | 0 | 84.3 | 226.7 | 3505/0/0/0 · 3453/0/0/0 |
| hard | Captain Bramble / Sprig | 200 | 83 / 117 | 0 | 89.3 | 236.1 | 3754/0/0/0 · 3253/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 53 left-side wins | 0 | 86.0 | 218.3 | 3665/0/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 97 / 103 | 0 | 87.3 | 229.7 | 3779/0/0/0 · 3238/0/0/0 |
| hard | Sprig / Sprig | 100 | 52 left-side wins | 0 | 87.5 | 224.9 | 3553/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 560/800 (70.0%) | 0 | 4810/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 330/800 (41.3%) | 0 | 4137/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 315/800 (39.4%) | 0 | 4992/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 337/800 (42.1%) | 0 | 4933/0/0/0 | 2, 3, 4 |
| easy | Sprig | 458/800 (57.3%) | 0 | 4304/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 530/800 (66.3%) | 0 | 9223/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 342/800 (42.8%) | 0 | 8643/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 329/800 (41.1%) | 0 | 9349/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 312/800 (39.0%) | 0 | 9280/0/0/0 | 2, 3, 4 |
| medium | Sprig | 487/800 (60.9%) | 0 | 7617/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 495/800 (61.9%) | 0 | 17018/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 344/800 (43.0%) | 0 | 16837/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 391/800 (48.9%) | 0 | 16022/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 359/800 (44.9%) | 0 | 16084/0/0/0 | 2, 3, 4 |
| hard | Sprig | 411/800 (51.4%) | 0 | 14717/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 4.60 | 814.36 / 1343.45 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 4.49 | 782.94 / 1710.30 | 0.00 | 3.52 / 3.50 | 0.93 |
| easy | Captain Bramble | 4.85 | 763.84 / 1453.65 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 4.80 | 757.17 / 1365.94 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 4.07 | 796.54 / 1253.32 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 8.80 | 1623.40 / 393.68 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 9.36 | 1630.75 / 473.49 | 0.00 | 7.14 / 6.89 | 2.14 |
| medium | Captain Bramble | 8.96 | 1597.28 / 447.25 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 8.97 | 1577.33 / 422.65 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 7.24 | 1577.46 / 320.40 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 16.33 | 3345.13 / 268.12 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 18.20 | 3393.72 / 274.08 | 0.00 | 12.92 / 11.19 | 5.15 |
| hard | Captain Bramble | 15.38 | 3146.66 / 255.60 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 15.52 | 3195.99 / 256.26 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 13.96 | 3296.99 / 247.24 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed useful after hostile warning. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 31.40 | 85.0% | 3683 / 77 | 903 | 8714 / 0 |
| easy | Andromoss | 5.23 | 13.6% | 3590 / 23 | 903 | 0 / 0 |
| easy | Captain Bramble | 23.46 | 79.0% | 3881 / 66 | 902 | 3455 / 0 |
| easy | Duskmantle | 26.44 | 81.5% | 3839 / 75 | 901 | 6083 / 0 |
| easy | Sprig | 37.87 | 88.8% | 3258 / 136 | 903 | 9756 / 0 |
| medium | Sir Champignon | 36.71 | 75.7% | 7042 / 96 | 601 | 4116 / 379 |
| medium | Andromoss | 10.80 | 13.2% | 7489 / 14 | 605 | 572 / 528 |
| medium | Captain Bramble | 35.90 | 74.7% | 7170 / 94 | 602 | 4218 / 316 |
| medium | Duskmantle | 35.60 | 74.5% | 7176 / 97 | 601 | 4086 / 351 |
| medium | Sprig | 32.10 | 77.1% | 5792 / 82 | 601 | 3853 / 261 |
| hard | Sir Champignon | 57.31 | 71.4% | 13064 / 69 | 300 | 17639 / 4438 |
| hard | Andromoss | 20.03 | 9.0% | 14559 / 21 | 302 | 5400 / 4882 |
| hard | Captain Bramble | 60.84 | 74.6% | 12300 / 71 | 300 | 15889 / 3927 |
| hard | Duskmantle | 61.45 | 74.6% | 12419 / 72 | 300 | 16513 / 4059 |
| hard | Sprig | 42.03 | 66.6% | 11164 / 72 | 301 | 15208 / 4580 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --casting=opportunity --cast-profile=scaled --report=tending6-only --tending-ms=6000`.

Explicit reproduction against current defaults:

`pnpm balance:roster --tier=1 --seeds=100 --seed=20261119 --armor-targets=1 --mark-bonus=6 --tending-ms=6000 --report=tending6-only`
