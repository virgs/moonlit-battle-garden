# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep useful/urgent selected column, theft enemy charge, armor unarmored enemy mole, mark unmarked enemy mole, tending unextended own mole near escape. No refresh of an active Sweep. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell powers unchanged.

Generated 2026-11-19T22:44:27.537Z. Revision 0343197 + working changes; config 15b28c474bb1; simulation 676cc72ffa349ea7; base seed 20261119. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.8% | 🟩68.8%* | 🟩75.5% | 🟩72.0% |
| Andromoss | 🟥38.2% | — | 🟨44.3% | 🟨46.7% | 🟨44.5% |
| Captain Bramble | 🟥31.2%* | 🟨55.7% | — | 🟨55.5% | 🟨49.2%* |
| Duskmantle | 🟥24.5% | 🟨53.3% | 🟨44.5% | — | 🟨47.2%* |
| Sprig | 🟥28.0% | 🟨55.5% | 🟨50.8%* | 🟨52.8%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩64.5% | 🟩78.0% | 🟩77.0% | 🟩75.5% |
| Andromoss | 🟥35.5% | — | 🟨44.0% | 🟨44.0% | 🟨48.0% |
| Captain Bramble | 🟥22.0% | 🟨56.0% | — | 🟨55.5% | 🟨47.0% |
| Duskmantle | 🟥23.0% | 🟨56.0% | 🟨44.5% | — | 🟨45.0% |
| Sprig | 🟥24.5% | 🟨52.0% | 🟨53.0% | 🟨55.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.0% | 🟩71.5% | 🟩77.0% | 🟩69.5% |
| Andromoss | 🟥39.0% | — | 🟨44.0% | 🟨48.5% | 🟨40.5% |
| Captain Bramble | 🟥28.5% | 🟨56.0% | — | 🟨54.5% | 🟨44.5% |
| Duskmantle | 🟥23.0% | 🟨51.5% | 🟨45.5% | — | 🟨45.5% |
| Sprig | 🟥30.5% | 🟨59.5% | 🟨55.5% | 🟨54.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨60.0% | 🟨57.0% | 🟩72.5% | 🟩71.0% |
| Andromoss | 🟨40.0% | — | 🟨45.0% | 🟨47.5% | 🟨45.0% |
| Captain Bramble | 🟨43.0% | 🟨55.0% | — | 🟨56.5% | 🟨56.0% |
| Duskmantle | 🟥27.5% | 🟨52.5% | 🟨43.5% | — | 🟨51.0% |
| Sprig | 🟥29.0% | 🟨55.0% | 🟨44.0% | 🟨49.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 78.0%, medium 71.5%, hard 57.0%; spread 21.0 points.
- Captain Bramble vs Sprig: easy 47.0%, medium 44.5%, hard 56.0%; spread 11.5 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 45.0%, medium 45.5%, hard 51.0%; spread 6.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 46.7 | 120.5 | 1127/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 129 / 71 | 0 | 46.8 | 137.1 | 480/0/0/0 · 883/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 156 / 44 | 0 | 47.5 | 140.6 | 1099/0/0/0 · 1090/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 154 / 46 | 0 | 45.9 | 121.8 | 1024/0/0/0 · 1044/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 151 / 49 | 0 | 45.8 | 118.5 | 1027/0/0/0 · 941/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 59 left-side wins | 0 | 48.0 | 153.3 | 547/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 88 / 112 | 0 | 50.1 | 144.9 | 859/0/0/0 · 574/0/0/0 |
| easy | Andromoss / Duskmantle | 200 | 88 / 112 | 0 | 48.3 | 141.0 | 815/0/0/0 · 587/0/0/0 |
| easy | Andromoss / Sprig | 200 | 96 / 104 | 0 | 50.0 | 163.3 | 1018/0/0/0 · 281/0/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 61 left-side wins | 0 | 50.9 | 154.8 | 1111/0/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 111 / 89 | 0 | 49.5 | 147.9 | 1127/0/0/0 · 1104/0/0/0 |
| easy | Captain Bramble / Sprig | 200 | 94 / 106 | 0 | 50.1 | 161.0 | 1201/0/0/0 · 1055/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 56 left-side wins | 0 | 50.7 | 149.8 | 1168/0/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 90 / 110 | 0 | 51.6 | 153.7 | 1159/0/0/0 · 1026/0/0/0 |
| easy | Sprig / Sprig | 100 | 62 left-side wins | 0 | 49.1 | 154.8 | 1001/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 60 left-side wins | 0 | 64.7 | 173.7 | 2181/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 122 / 78 | 0 | 57.5 | 150.9 | 822/0/0/0 · 1830/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 143 / 57 | 0 | 60.6 | 160.3 | 2114/0/0/0 · 1987/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 154 / 46 | 0 | 60.2 | 147.8 | 1993/0/0/0 · 1946/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 139 / 61 | 0 | 60.5 | 148.7 | 2044/0/0/0 · 1783/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 59.3 | 159.6 | 1154/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 88 / 112 | 0 | 59.0 | 162.8 | 1856/0/0/0 · 980/0/0/0 |
| medium | Andromoss / Duskmantle | 200 | 97 / 103 | 0 | 59.2 | 162.1 | 1809/0/0/0 · 931/0/0/0 |
| medium | Andromoss / Sprig | 200 | 81 / 119 | 0 | 59.0 | 154.3 | 2026/0/0/0 · 579/0/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 55 left-side wins | 0 | 64.8 | 182.7 | 2179/0/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 109 / 91 | 0 | 61.0 | 163.7 | 2172/0/0/0 · 2194/0/0/0 |
| medium | Captain Bramble / Sprig | 200 | 89 / 111 | 0 | 62.3 | 163.6 | 2169/0/0/0 · 1979/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 57 left-side wins | 0 | 61.4 | 168.1 | 2224/0/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 91 / 109 | 0 | 62.7 | 161.6 | 2127/0/0/0 · 1881/0/0/0 |
| medium | Sprig / Sprig | 100 | 60 left-side wins | 0 | 61.3 | 166.6 | 1930/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 51 left-side wins | 0 | 96.0 | 239.0 | 3954/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 120 / 80 | 0 | 85.4 | 235.8 | 1614/0/0/0 · 3693/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 114 / 86 | 0 | 90.5 | 227.6 | 3786/0/0/0 · 3546/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 145 / 55 | 0 | 87.8 | 230.2 | 3688/0/0/0 · 3523/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 142 / 58 | 0 | 89.8 | 238.2 | 3845/0/0/0 · 3368/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 87.5 | 220.9 | 2278/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 90 / 110 | 0 | 83.8 | 216.5 | 3560/0/0/0 · 1495/0/0/0 |
| hard | Andromoss / Duskmantle | 200 | 95 / 105 | 0 | 88.3 | 227.0 | 3675/0/0/0 · 1523/0/0/0 |
| hard | Andromoss / Sprig | 200 | 90 / 110 | 0 | 84.5 | 222.8 | 3698/0/0/0 · 1338/0/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 48 left-side wins | 0 | 90.0 | 229.6 | 3722/0/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 113 / 87 | 0 | 84.3 | 225.4 | 3551/0/0/0 · 3528/0/0/0 |
| hard | Captain Bramble / Sprig | 200 | 112 / 88 | 0 | 87.2 | 225.3 | 3768/0/0/0 · 3432/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 87.5 | 235.9 | 3609/0/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 102 / 98 | 0 | 85.4 | 229.3 | 3793/0/0/0 · 3400/0/0/0 |
| hard | Sprig / Sprig | 100 | 53 left-side wins | 0 | 91.0 | 236.7 | 3570/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 590/800 (73.8%) | 0 | 4757/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 343/800 (42.9%) | 0 | 4122/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 361/800 (45.1%) | 0 | 5103/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 337/800 (42.1%) | 0 | 5062/0/0/0 | 2, 3, 4 |
| easy | Sprig | 369/800 (46.1%) | 0 | 4304/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 558/800 (69.8%) | 0 | 9154/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 344/800 (43.0%) | 0 | 8675/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 367/800 (45.9%) | 0 | 9487/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 331/800 (41.4%) | 0 | 9422/0/0/0 | 2, 3, 4 |
| medium | Sprig | 400/800 (50.0%) | 0 | 8152/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 521/800 (65.1%) | 0 | 16887/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 355/800 (44.4%) | 0 | 16904/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 421/800 (52.6%) | 0 | 16082/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 349/800 (43.6%) | 0 | 15976/0/0/0 | 2, 3, 4 |
| hard | Sprig | 354/800 (44.3%) | 0 | 15108/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 4.54 | 806.05 / 1359.15 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 4.47 | 785.07 / 1774.90 | 0.00 | 3.51 / 3.48 | 0.92 |
| easy | Captain Bramble | 4.99 | 782.44 / 1587.06 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 4.87 | 767.35 / 1554.82 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 4.13 | 790.42 / 1668.94 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 8.72 | 1611.64 / 397.37 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 9.40 | 1649.61 / 493.00 | 0.00 | 7.18 / 6.92 | 2.15 |
| medium | Captain Bramble | 9.13 | 1623.19 / 458.92 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 9.00 | 1596.48 / 438.86 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 7.78 | 1619.87 / 405.94 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 16.17 | 3306.51 / 263.19 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 18.28 | 3411.60 / 273.95 | 0.00 | 13.08 / 11.35 | 5.08 |
| hard | Captain Bramble | 15.45 | 3170.03 / 254.92 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 15.46 | 3205.95 / 256.63 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 14.42 | 3295.74 / 256.04 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed useful after hostile warning. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 31.00 | 85.0% | 3630 / 91 | 903 | 8580 / 0 |
| easy | Andromoss | 5.23 | 14.0% | 3575 / 24 | 902 | 0 / 0 |
| easy | Captain Bramble | 26.67 | 81.0% | 3992 / 66 | 904 | 5555 / 0 |
| easy | Duskmantle | 26.44 | 81.2% | 3894 / 80 | 904 | 5726 / 0 |
| easy | Sprig | 36.73 | 88.4% | 3303 / 114 | 901 | 7661 / 0 |
| medium | Sir Champignon | 36.40 | 75.7% | 6973 / 93 | 602 | 4182 / 406 |
| medium | Andromoss | 10.90 | 13.5% | 7521 / 20 | 605 | 606 / 550 |
| medium | Captain Bramble | 37.37 | 75.2% | 7308 / 105 | 602 | 4754 / 366 |
| medium | Duskmantle | 36.71 | 75.2% | 7198 / 92 | 601 | 4563 / 368 |
| medium | Sprig | 36.94 | 78.7% | 6222 / 80 | 602 | 4137 / 333 |
| hard | Sir Champignon | 56.79 | 71.4% | 12933 / 66 | 300 | 16715 / 4226 |
| hard | Andromoss | 20.13 | 9.0% | 14626 / 21 | 301 | 5478 / 4961 |
| hard | Captain Bramble | 60.93 | 74.5% | 12360 / 74 | 300 | 16152 / 4064 |
| hard | Duskmantle | 61.44 | 74.7% | 12367 / 65 | 300 | 16253 / 4035 |
| hard | Sprig | 44.72 | 67.6% | 11538 / 66 | 300 | 15873 / 4506 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --casting=opportunity --cast-profile=scaled --report=bud-aura-timing-control`.

Reproduce against current defaults with all changed parameters explicit:

`pnpm balance:roster --tier=1 --seeds=100 --seed=20261119 --ominous-marks=3 --ominous-ms=12000 --mark-bonus=4 --extension-ms=500 --tending-ms=3000 --report=bud-aura-timing-control`
