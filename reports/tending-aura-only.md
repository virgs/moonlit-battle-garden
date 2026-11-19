# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep useful/urgent selected column, theft enemy charge, armor unarmored enemy mole, mark unmarked enemy mole, tending unextended own mole near escape. No refresh of an active Sweep. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell powers unchanged.

Generated 2026-11-19T22:29:23.698Z. Revision 5d45259 + working changes; config 91f86ca3c124; simulation fb0d14642c3fb5fe; base seed 20261119. Tuning overrides: {"extensionMs":500,"tendingMs":3000}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.8% | 🟩68.8%* | 🟩79.8% | 🟩72.0% |
| Andromoss | 🟥38.2% | — | 🟨44.3% | 🟨48.0% | 🟨44.5% |
| Captain Bramble | 🟥31.2%* | 🟨55.7% | — | 🟩60.5% | 🟨49.2%* |
| Duskmantle | 🟥20.2% | 🟨52.0% | 🟥39.5% | — | 🟨43.5%* |
| Sprig | 🟥28.0% | 🟨55.5% | 🟨50.8%* | 🟨56.5%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩64.5% | 🟩78.0% | 🟩84.0% | 🟩75.5% |
| Andromoss | 🟥35.5% | — | 🟨44.0% | 🟨48.5% | 🟨48.0% |
| Captain Bramble | 🟥22.0% | 🟨56.0% | — | 🟩60.5% | 🟨47.0% |
| Duskmantle | 🟥16.0% | 🟨51.5% | 🟥39.5% | — | 🟨42.5% |
| Sprig | 🟥24.5% | 🟨52.0% | 🟨53.0% | 🟨57.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.0% | 🟩71.5% | 🟩83.0% | 🟩69.5% |
| Andromoss | 🟥39.0% | — | 🟨44.0% | 🟨49.0% | 🟨40.5% |
| Captain Bramble | 🟥28.5% | 🟨56.0% | — | 🟨57.0% | 🟨44.5% |
| Duskmantle | 🟥17.0% | 🟨51.0% | 🟨43.0% | — | 🟥37.0% |
| Sprig | 🟥30.5% | 🟨59.5% | 🟨55.5% | 🟩63.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨60.0% | 🟨57.0% | 🟩72.5% | 🟩71.0% |
| Andromoss | 🟨40.0% | — | 🟨45.0% | 🟨46.5% | 🟨45.0% |
| Captain Bramble | 🟨43.0% | 🟨55.0% | — | 🟩64.0% | 🟨56.0% |
| Duskmantle | 🟥27.5% | 🟨53.5% | 🟥36.0% | — | 🟨51.0% |
| Sprig | 🟥29.0% | 🟨55.0% | 🟨44.0% | 🟨49.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 78.0%, medium 71.5%, hard 57.0%; spread 21.0 points.
- Captain Bramble vs Sprig: easy 47.0%, medium 44.5%, hard 56.0%; spread 11.5 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 42.5%, medium 37.0%, hard 51.0%; spread 14.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 46.7 | 120.5 | 1127/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 129 / 71 | 0 | 46.8 | 137.1 | 480/0/0/0 · 883/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 156 / 44 | 0 | 47.5 | 140.6 | 1099/0/0/0 · 1090/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 168 / 32 | 0 | 46.5 | 120.5 | 1045/0/0/0 · 1015/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 151 / 49 | 0 | 45.8 | 118.5 | 1027/0/0/0 · 941/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 59 left-side wins | 0 | 48.0 | 153.3 | 547/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 88 / 112 | 0 | 50.1 | 144.9 | 859/0/0/0 · 574/0/0/0 |
| easy | Andromoss / Duskmantle | 200 | 97 / 103 | 0 | 48.9 | 143.1 | 836/0/0/0 · 568/0/0/0 |
| easy | Andromoss / Sprig | 200 | 96 / 104 | 0 | 50.0 | 163.3 | 1018/0/0/0 · 281/0/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 61 left-side wins | 0 | 50.9 | 154.8 | 1111/0/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 121 / 79 | 0 | 50.6 | 147.4 | 1129/0/0/0 · 1111/0/0/0 |
| easy | Captain Bramble / Sprig | 200 | 94 / 106 | 0 | 50.1 | 161.0 | 1201/0/0/0 · 1055/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 59 left-side wins | 0 | 52.6 | 153.6 | 1151/0/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 85 / 115 | 0 | 51.9 | 148.7 | 1200/0/0/0 · 1034/0/0/0 |
| easy | Sprig / Sprig | 100 | 62 left-side wins | 0 | 49.1 | 154.8 | 1001/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 60 left-side wins | 0 | 64.7 | 173.7 | 2181/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 122 / 78 | 0 | 57.5 | 150.9 | 822/0/0/0 · 1830/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 143 / 57 | 0 | 60.6 | 160.3 | 2114/0/0/0 · 1987/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 166 / 34 | 0 | 62.8 | 151.7 | 2072/0/0/0 · 2006/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 139 / 61 | 0 | 60.5 | 148.7 | 2044/0/0/0 · 1783/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 59.3 | 159.6 | 1154/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 88 / 112 | 0 | 59.0 | 162.8 | 1856/0/0/0 · 980/0/0/0 |
| medium | Andromoss / Duskmantle | 200 | 98 / 102 | 0 | 59.5 | 161.7 | 1816/0/0/0 · 949/0/0/0 |
| medium | Andromoss / Sprig | 200 | 81 / 119 | 0 | 59.0 | 154.3 | 2026/0/0/0 · 579/0/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 55 left-side wins | 0 | 64.8 | 182.7 | 2179/0/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 114 / 86 | 0 | 62.4 | 165.2 | 2144/0/0/0 · 2199/0/0/0 |
| medium | Captain Bramble / Sprig | 200 | 89 / 111 | 0 | 62.3 | 163.6 | 2169/0/0/0 · 1979/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 56 left-side wins | 0 | 63.4 | 171.7 | 2211/0/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 74 / 126 | 0 | 62.8 | 165.4 | 2140/0/0/0 · 1878/0/0/0 |
| medium | Sprig / Sprig | 100 | 60 left-side wins | 0 | 61.3 | 166.6 | 1930/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 51 left-side wins | 0 | 96.0 | 239.0 | 3954/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 120 / 80 | 0 | 85.4 | 235.8 | 1614/0/0/0 · 3693/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 114 / 86 | 0 | 90.5 | 227.6 | 3786/0/0/0 · 3546/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 145 / 55 | 0 | 90.6 | 240.4 | 3787/0/0/0 · 3638/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 142 / 58 | 0 | 89.8 | 238.2 | 3845/0/0/0 · 3368/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 87.5 | 220.9 | 2278/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 90 / 110 | 0 | 83.8 | 216.5 | 3560/0/0/0 · 1495/0/0/0 |
| hard | Andromoss / Duskmantle | 200 | 93 / 107 | 0 | 89.7 | 232.7 | 3775/0/0/0 · 1557/0/0/0 |
| hard | Andromoss / Sprig | 200 | 90 / 110 | 0 | 84.5 | 222.8 | 3698/0/0/0 · 1338/0/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 48 left-side wins | 0 | 90.0 | 229.6 | 3722/0/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 128 / 72 | 0 | 89.0 | 231.8 | 3622/0/0/0 · 3601/0/0/0 |
| hard | Captain Bramble / Sprig | 200 | 112 / 88 | 0 | 87.2 | 225.3 | 3768/0/0/0 · 3432/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 57 left-side wins | 0 | 88.5 | 240.6 | 3805/0/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 102 / 98 | 0 | 87.5 | 230.1 | 3802/0/0/0 · 3392/0/0/0 |
| hard | Sprig / Sprig | 100 | 53 left-side wins | 0 | 91.0 | 236.7 | 3570/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 604/800 (75.5%) | 0 | 4778/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 352/800 (44.0%) | 0 | 4143/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 371/800 (46.4%) | 0 | 5105/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 299/800 (37.4%) | 0 | 5045/0/0/0 | 2, 3, 4 |
| easy | Sprig | 374/800 (46.8%) | 0 | 4312/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 570/800 (71.3%) | 0 | 9233/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 345/800 (43.1%) | 0 | 8682/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 372/800 (46.5%) | 0 | 9459/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 296/800 (37.0%) | 0 | 9505/0/0/0 | 2, 3, 4 |
| medium | Sprig | 417/800 (52.1%) | 0 | 8149/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 521/800 (65.1%) | 0 | 16986/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 353/800 (44.1%) | 0 | 17004/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 436/800 (54.5%) | 0 | 16153/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 336/800 (42.0%) | 0 | 16403/0/0/0 | 2, 3, 4 |
| hard | Sprig | 354/800 (44.3%) | 0 | 15100/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 4.56 | 803.51 / 1381.98 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 4.50 | 786.76 / 1809.69 | 0.00 | 3.53 / 3.50 | 0.93 |
| easy | Captain Bramble | 4.99 | 782.14 / 1583.05 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 4.87 | 764.66 / 1577.55 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 4.14 | 790.05 / 1620.64 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 8.81 | 1623.48 / 394.76 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 9.41 | 1653.21 / 498.25 | 0.00 | 7.16 / 6.92 | 2.17 |
| medium | Captain Bramble | 9.10 | 1624.37 / 462.95 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 9.12 | 1618.08 / 463.90 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 7.77 | 1626.19 / 408.51 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 16.29 | 3330.57 / 262.65 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 18.41 | 3426.64 / 273.63 | 0.00 | 13.14 / 11.41 | 5.14 |
| hard | Captain Bramble | 15.54 | 3188.14 / 251.72 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 15.75 | 3262.74 / 261.37 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 14.41 | 3291.74 / 251.97 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed useful after hostile warning. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 30.95 | 84.9% | 3651 / 93 | 903 | 8430 / 0 |
| easy | Andromoss | 5.25 | 13.8% | 3596 / 23 | 902 | 0 / 0 |
| easy | Captain Bramble | 26.80 | 81.0% | 3994 / 74 | 905 | 5450 / 0 |
| easy | Duskmantle | 27.25 | 81.9% | 3894 / 58 | 902 | 6419 / 0 |
| easy | Sprig | 33.42 | 87.2% | 3311 / 112 | 901 | 5112 / 0 |
| medium | Sir Champignon | 37.44 | 76.1% | 7052 / 92 | 602 | 4614 / 427 |
| medium | Andromoss | 10.88 | 13.4% | 7528 / 14 | 605 | 607 / 560 |
| medium | Captain Bramble | 37.55 | 75.4% | 7280 / 94 | 602 | 4885 / 383 |
| medium | Duskmantle | 37.75 | 75.6% | 7294 / 81 | 602 | 5140 / 396 |
| medium | Sprig | 37.33 | 78.9% | 6219 / 86 | 602 | 4546 / 366 |
| hard | Sir Champignon | 56.92 | 71.2% | 13032 / 61 | 300 | 16779 / 4311 |
| hard | Andromoss | 20.24 | 8.9% | 14726 / 24 | 301 | 5572 / 5048 |
| hard | Captain Bramble | 61.35 | 74.5% | 12431 / 74 | 300 | 16634 / 4135 |
| hard | Duskmantle | 63.36 | 75.0% | 12598 / 65 | 300 | 17562 / 4240 |
| hard | Sprig | 44.82 | 67.7% | 11530 / 66 | 300 | 16036 / 4515 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce with explicit settings against the adopted defaults: `pnpm balance:roster --tier=1 --seeds=100 --seed=20261119 --ominous-marks=1 --ominous-ms=12000 --extension-ms=500 --tending-ms=3000 --report=tending-aura-only`.
