# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep useful/urgent selected column, theft enemy charge, armor unarmored enemy mole, mark unmarked enemy mole, tending unextended own mole near escape. No refresh of an active Sweep. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell powers unchanged.

Generated 2026-11-19T22:29:22.094Z. Revision 5d45259 + working changes; config 0cd75c0883a3; simulation fb0d14642c3fb5fe; base seed 20261119. Tuning overrides: {"ominousMarks":3}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.8% | 🟩68.8%* | 🟩75.5% | 🟩79.0% |
| Andromoss | 🟥38.2% | — | 🟨44.3% | 🟨46.7% | 🟨50.3%* |
| Captain Bramble | 🟥31.2%* | 🟨55.7% | — | 🟨55.5% | 🟩60.5% |
| Duskmantle | 🟥24.5% | 🟨53.3% | 🟨44.5% | — | 🟨56.3% |
| Sprig | 🟥21.0% | 🟨49.7%* | 🟥39.5% | 🟨43.7% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩64.5% | 🟩78.0% | 🟩77.0% | 🟩79.5% |
| Andromoss | 🟥35.5% | — | 🟨44.0% | 🟨44.0% | 🟨53.0% |
| Captain Bramble | 🟥22.0% | 🟨56.0% | — | 🟨55.5% | 🟨54.5% |
| Duskmantle | 🟥23.0% | 🟨56.0% | 🟨44.5% | — | 🟨54.0% |
| Sprig | 🟥20.5% | 🟨47.0% | 🟨45.5% | 🟨46.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.0% | 🟩71.5% | 🟩77.0% | 🟩83.0% |
| Andromoss | 🟥39.0% | — | 🟨44.0% | 🟨48.5% | 🟨48.5% |
| Captain Bramble | 🟥28.5% | 🟨56.0% | — | 🟨54.5% | 🟨60.0% |
| Duskmantle | 🟥23.0% | 🟨51.5% | 🟨45.5% | — | 🟨54.5% |
| Sprig | 🟥17.0% | 🟨51.5% | 🟨40.0% | 🟨45.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨60.0% | 🟨57.0% | 🟩72.5% | 🟩74.5% |
| Andromoss | 🟨40.0% | — | 🟨45.0% | 🟨47.5% | 🟨49.5% |
| Captain Bramble | 🟨43.0% | 🟨55.0% | — | 🟨56.5% | 🟩67.0% |
| Duskmantle | 🟥27.5% | 🟨52.5% | 🟨43.5% | — | 🟩60.5% |
| Sprig | 🟥25.5% | 🟨50.5% | 🟥33.0% | 🟥39.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 78.0%, medium 71.5%, hard 57.0%; spread 21.0 points.
- Andromoss vs Sprig: easy 53.0%, medium 48.5%, hard 49.5%; spread 4.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 46.7 | 120.5 | 1127/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 129 / 71 | 0 | 46.8 | 137.1 | 480/0/0/0 · 883/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 156 / 44 | 0 | 47.5 | 140.6 | 1099/0/0/0 · 1090/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 154 / 46 | 0 | 45.9 | 121.8 | 1024/0/0/0 · 1044/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 159 / 41 | 0 | 45.3 | 112.7 | 1018/0/0/0 · 925/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 59 left-side wins | 0 | 48.0 | 153.3 | 547/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 88 / 112 | 0 | 50.1 | 144.9 | 859/0/0/0 · 574/0/0/0 |
| easy | Andromoss / Duskmantle | 200 | 88 / 112 | 0 | 48.3 | 141.0 | 815/0/0/0 · 587/0/0/0 |
| easy | Andromoss / Sprig | 200 | 106 / 94 | 0 | 50.0 | 149.6 | 1035/0/0/0 · 277/0/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 61 left-side wins | 0 | 50.9 | 154.8 | 1111/0/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 111 / 89 | 0 | 49.5 | 147.9 | 1127/0/0/0 · 1104/0/0/0 |
| easy | Captain Bramble / Sprig | 200 | 109 / 91 | 0 | 51.9 | 159.3 | 1175/0/0/0 · 1068/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 56 left-side wins | 0 | 50.7 | 149.8 | 1168/0/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 108 / 92 | 0 | 51.5 | 158.0 | 1148/0/0/0 · 1045/0/0/0 |
| easy | Sprig / Sprig | 100 | 57 left-side wins | 0 | 49.0 | 142.5 | 969/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 60 left-side wins | 0 | 64.7 | 173.7 | 2181/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 122 / 78 | 0 | 57.5 | 150.9 | 822/0/0/0 · 1830/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 143 / 57 | 0 | 60.6 | 160.3 | 2114/0/0/0 · 1987/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 154 / 46 | 0 | 60.2 | 147.8 | 1993/0/0/0 · 1946/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 166 / 34 | 0 | 60.1 | 149.2 | 1992/0/0/0 · 1765/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 59.3 | 159.6 | 1154/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 88 / 112 | 0 | 59.0 | 162.8 | 1856/0/0/0 · 980/0/0/0 |
| medium | Andromoss / Duskmantle | 200 | 97 / 103 | 0 | 59.2 | 162.1 | 1809/0/0/0 · 931/0/0/0 |
| medium | Andromoss / Sprig | 200 | 97 / 103 | 0 | 58.4 | 157.8 | 2019/0/0/0 · 576/0/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 55 left-side wins | 0 | 64.8 | 182.7 | 2179/0/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 109 / 91 | 0 | 61.0 | 163.7 | 2172/0/0/0 · 2194/0/0/0 |
| medium | Captain Bramble / Sprig | 200 | 120 / 80 | 0 | 63.0 | 169.3 | 2223/0/0/0 · 2094/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 57 left-side wins | 0 | 61.4 | 168.1 | 2224/0/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 109 / 91 | 0 | 58.1 | 153.4 | 2071/0/0/0 · 1877/0/0/0 |
| medium | Sprig / Sprig | 100 | 53 left-side wins | 0 | 63.0 | 163.2 | 1899/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 51 left-side wins | 0 | 96.0 | 239.0 | 3954/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 120 / 80 | 0 | 85.4 | 235.8 | 1614/0/0/0 · 3693/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 114 / 86 | 0 | 90.5 | 227.6 | 3786/0/0/0 · 3546/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 145 / 55 | 0 | 87.8 | 230.2 | 3688/0/0/0 · 3523/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 149 / 51 | 0 | 88.3 | 227.3 | 3873/0/0/0 · 3432/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 87.5 | 220.9 | 2278/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 90 / 110 | 0 | 83.8 | 216.5 | 3560/0/0/0 · 1495/0/0/0 |
| hard | Andromoss / Duskmantle | 200 | 95 / 105 | 0 | 88.3 | 227.0 | 3675/0/0/0 · 1523/0/0/0 |
| hard | Andromoss / Sprig | 200 | 99 / 101 | 0 | 88.0 | 234.1 | 3901/0/0/0 · 1431/0/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 48 left-side wins | 0 | 90.0 | 229.6 | 3722/0/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 113 / 87 | 0 | 84.3 | 225.4 | 3551/0/0/0 · 3528/0/0/0 |
| hard | Captain Bramble / Sprig | 200 | 134 / 66 | 0 | 88.4 | 235.4 | 3719/0/0/0 · 3406/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 87.5 | 235.9 | 3609/0/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 121 / 79 | 0 | 85.3 | 236.0 | 3799/0/0/0 · 3388/0/0/0 |
| hard | Sprig / Sprig | 100 | 51 left-side wins | 0 | 88.8 | 243.1 | 3636/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 598/800 (74.8%) | 0 | 4748/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 353/800 (44.1%) | 0 | 4139/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 376/800 (47.0%) | 0 | 5077/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 355/800 (44.4%) | 0 | 5051/0/0/0 | 2, 3, 4 |
| easy | Sprig | 318/800 (39.8%) | 0 | 4284/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 585/800 (73.1%) | 0 | 9102/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 360/800 (45.0%) | 0 | 8668/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 398/800 (49.8%) | 0 | 9541/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 349/800 (43.6%) | 0 | 9366/0/0/0 | 2, 3, 4 |
| medium | Sprig | 308/800 (38.5%) | 0 | 8211/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 528/800 (66.0%) | 0 | 16915/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 364/800 (45.5%) | 0 | 17107/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 443/800 (55.4%) | 0 | 16033/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 368/800 (46.0%) | 0 | 15982/0/0/0 | 2, 3, 4 |
| hard | Sprig | 297/800 (37.1%) | 0 | 15293/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 4.53 | 801.14 / 1375.45 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 4.49 | 784.17 / 1721.96 | 0.00 | 3.52 / 3.50 | 0.93 |
| easy | Captain Bramble | 4.96 | 780.63 / 1618.27 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 4.85 | 764.27 / 1560.51 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 4.14 | 765.81 / 1678.57 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 8.65 | 1602.96 / 405.21 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 9.39 | 1651.89 / 492.94 | 0.00 | 7.17 / 6.90 | 2.14 |
| medium | Captain Bramble | 9.20 | 1637.29 / 484.13 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 8.93 | 1587.42 / 450.25 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 7.89 | 1597.29 / 468.25 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 16.20 | 3322.09 / 265.06 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 18.54 | 3458.68 / 278.12 | 0.00 | 13.23 / 11.44 | 5.18 |
| hard | Captain Bramble | 15.39 | 3160.82 / 253.21 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 15.47 | 3205.46 / 256.30 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 14.57 | 3335.88 / 271.93 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed useful after hostile warning. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 31.68 | 85.4% | 3621 / 86 | 903 | 9064 / 0 |
| easy | Andromoss | 5.25 | 14.0% | 3592 / 23 | 902 | 0 / 0 |
| easy | Captain Bramble | 25.37 | 80.1% | 3966 / 66 | 902 | 4457 / 0 |
| easy | Duskmantle | 27.93 | 82.3% | 3883 / 79 | 903 | 6844 / 0 |
| easy | Sprig | 35.70 | 88.0% | 3315 / 99 | 901 | 6752 / 0 |
| medium | Sir Champignon | 35.85 | 75.6% | 6921 / 89 | 601 | 4241 / 427 |
| medium | Andromoss | 10.89 | 13.5% | 7514 / 23 | 605 | 612 / 559 |
| medium | Captain Bramble | 38.51 | 75.8% | 7362 / 101 | 602 | 5433 / 423 |
| medium | Duskmantle | 36.81 | 75.4% | 7142 / 95 | 601 | 5210 / 406 |
| medium | Sprig | 38.40 | 79.1% | 6312 / 104 | 601 | 5476 / 472 |
| hard | Sir Champignon | 56.94 | 71.4% | 12961 / 70 | 300 | 17265 / 4346 |
| hard | Andromoss | 20.39 | 9.0% | 14829 / 19 | 301 | 5663 / 5145 |
| hard | Captain Bramble | 61.39 | 74.8% | 12311 / 69 | 300 | 16066 / 3985 |
| hard | Duskmantle | 61.91 | 74.9% | 12373 / 72 | 300 | 16372 / 4029 |
| hard | Sprig | 45.94 | 68.1% | 11657 / 55 | 301 | 16401 / 4625 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce with explicit settings against the adopted defaults: `pnpm balance:roster --tier=1 --seeds=100 --seed=20261119 --ominous-marks=3 --ominous-ms=12000 --extension-ms=1200 --tending-ms=0 --report=mark3-only`.
