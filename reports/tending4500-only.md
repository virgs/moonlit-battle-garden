# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep useful/urgent selected column, theft enemy charge, armor unarmored enemy mole, mark unmarked enemy mole, tending unextended own mole near escape. No refresh of an active Sweep. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell powers unchanged.

Generated 2026-11-19T22:44:28.879Z. Revision 0343197 + working changes; config 0579e2bc788e; simulation 676cc72ffa349ea7; base seed 20261119. Tuning overrides: {"tendingMs":4500}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.8% | 🟩68.8%* | 🟩75.5% | 🟩65.8% |
| Andromoss | 🟥38.2% | — | 🟨44.3% | 🟨46.7% | 🟨43.3% |
| Captain Bramble | 🟥31.2%* | 🟨55.7% | — | 🟨55.5% | 🟨40.8% |
| Duskmantle | 🟥24.5% | 🟨53.3% | 🟨44.5% | — | 🟨40.7% |
| Sprig | 🟥34.2% | 🟨56.7% | 🟨59.2% | 🟨59.3% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩64.5% | 🟩78.0% | 🟩77.0% | 🟩70.0% |
| Andromoss | 🟥35.5% | — | 🟨44.0% | 🟨44.0% | 🟨48.0% |
| Captain Bramble | 🟥22.0% | 🟨56.0% | — | 🟨55.5% | 🟥37.5% |
| Duskmantle | 🟥23.0% | 🟨56.0% | 🟨44.5% | — | 🟥37.5% |
| Sprig | 🟥30.0% | 🟨52.0% | 🟩62.5% | 🟩62.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.0% | 🟩71.5% | 🟩77.0% | 🟩62.5% |
| Andromoss | 🟥39.0% | — | 🟨44.0% | 🟨48.5% | 🟨40.5% |
| Captain Bramble | 🟥28.5% | 🟨56.0% | — | 🟨54.5% | 🟥36.5% |
| Duskmantle | 🟥23.0% | 🟨51.5% | 🟨45.5% | — | 🟥36.5% |
| Sprig | 🟥37.5% | 🟨59.5% | 🟩63.5% | 🟩63.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨60.0% | 🟨57.0% | 🟩72.5% | 🟩65.0% |
| Andromoss | 🟨40.0% | — | 🟨45.0% | 🟨47.5% | 🟨41.5% |
| Captain Bramble | 🟨43.0% | 🟨55.0% | — | 🟨56.5% | 🟨48.5% |
| Duskmantle | 🟥27.5% | 🟨52.5% | 🟨43.5% | — | 🟨48.0% |
| Sprig | 🟥35.0% | 🟨58.5% | 🟨51.5% | 🟨52.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 78.0%, medium 71.5%, hard 57.0%; spread 21.0 points.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 46.7 | 120.5 | 1127/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 129 / 71 | 0 | 46.8 | 137.1 | 480/0/0/0 · 883/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 156 / 44 | 0 | 47.5 | 140.6 | 1099/0/0/0 · 1090/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 154 / 46 | 0 | 45.9 | 121.8 | 1024/0/0/0 · 1044/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 140 / 60 | 0 | 46.0 | 129.2 | 1043/0/0/0 · 949/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 59 left-side wins | 0 | 48.0 | 153.3 | 547/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 88 / 112 | 0 | 50.1 | 144.9 | 859/0/0/0 · 574/0/0/0 |
| easy | Andromoss / Duskmantle | 200 | 88 / 112 | 0 | 48.3 | 141.0 | 815/0/0/0 · 587/0/0/0 |
| easy | Andromoss / Sprig | 200 | 96 / 104 | 0 | 50.0 | 149.3 | 992/0/0/0 · 275/0/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 61 left-side wins | 0 | 50.9 | 154.8 | 1111/0/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 111 / 89 | 0 | 49.5 | 147.9 | 1127/0/0/0 · 1104/0/0/0 |
| easy | Captain Bramble / Sprig | 200 | 75 / 125 | 0 | 51.8 | 149.0 | 1189/0/0/0 · 1073/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 56 left-side wins | 0 | 50.7 | 149.8 | 1168/0/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 75 / 125 | 0 | 51.5 | 147.3 | 1189/0/0/0 · 1021/0/0/0 |
| easy | Sprig / Sprig | 100 | 56 left-side wins | 0 | 50.9 | 146.2 | 1027/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 60 left-side wins | 0 | 64.7 | 173.7 | 2181/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 122 / 78 | 0 | 57.5 | 150.9 | 822/0/0/0 · 1830/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 143 / 57 | 0 | 60.6 | 160.3 | 2114/0/0/0 · 1987/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 154 / 46 | 0 | 60.2 | 147.8 | 1993/0/0/0 · 1946/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 125 / 75 | 0 | 61.6 | 158.6 | 2118/0/0/0 · 1861/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 59.3 | 159.6 | 1154/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 88 / 112 | 0 | 59.0 | 162.8 | 1856/0/0/0 · 980/0/0/0 |
| medium | Andromoss / Duskmantle | 200 | 97 / 103 | 0 | 59.2 | 162.1 | 1809/0/0/0 · 931/0/0/0 |
| medium | Andromoss / Sprig | 200 | 81 / 119 | 0 | 59.8 | 154.3 | 2018/0/0/0 · 530/0/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 55 left-side wins | 0 | 64.8 | 182.7 | 2179/0/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 109 / 91 | 0 | 61.0 | 163.7 | 2172/0/0/0 · 2194/0/0/0 |
| medium | Captain Bramble / Sprig | 200 | 73 / 127 | 0 | 65.3 | 163.9 | 2168/0/0/0 · 1980/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 57 left-side wins | 0 | 61.4 | 168.1 | 2224/0/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 73 / 127 | 0 | 59.8 | 154.8 | 2099/0/0/0 · 1784/0/0/0 |
| medium | Sprig / Sprig | 100 | 59 left-side wins | 0 | 64.7 | 165.0 | 1982/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 51 left-side wins | 0 | 96.0 | 239.0 | 3954/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 120 / 80 | 0 | 85.4 | 235.8 | 1614/0/0/0 · 3693/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 114 / 86 | 0 | 90.5 | 227.6 | 3786/0/0/0 · 3546/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 145 / 55 | 0 | 87.8 | 230.2 | 3688/0/0/0 · 3523/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 130 / 70 | 0 | 89.7 | 239.6 | 3871/0/0/0 · 3369/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 87.5 | 220.9 | 2278/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 90 / 110 | 0 | 83.8 | 216.5 | 3560/0/0/0 · 1495/0/0/0 |
| hard | Andromoss / Duskmantle | 200 | 95 / 105 | 0 | 88.3 | 227.0 | 3675/0/0/0 · 1523/0/0/0 |
| hard | Andromoss / Sprig | 200 | 83 / 117 | 0 | 84.0 | 220.8 | 3635/0/0/0 · 1325/0/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 48 left-side wins | 0 | 90.0 | 229.6 | 3722/0/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 113 / 87 | 0 | 84.3 | 225.4 | 3551/0/0/0 · 3528/0/0/0 |
| hard | Captain Bramble / Sprig | 200 | 97 / 103 | 0 | 90.0 | 231.5 | 3815/0/0/0 · 3419/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 87.5 | 235.9 | 3609/0/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 96 / 104 | 0 | 85.8 | 225.5 | 3654/0/0/0 · 3233/0/0/0 |
| hard | Sprig / Sprig | 100 | 50 left-side wins | 0 | 92.1 | 274.2 | 3974/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 579/800 (72.4%) | 0 | 4773/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 343/800 (42.9%) | 0 | 4096/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 342/800 (42.8%) | 0 | 5091/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 322/800 (40.3%) | 0 | 5092/0/0/0 | 2, 3, 4 |
| easy | Sprig | 414/800 (51.7%) | 0 | 4345/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 544/800 (68.0%) | 0 | 9228/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 344/800 (43.0%) | 0 | 8667/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 351/800 (43.9%) | 0 | 9486/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 313/800 (39.1%) | 0 | 9394/0/0/0 | 2, 3, 4 |
| medium | Sprig | 448/800 (56.0%) | 0 | 8137/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 509/800 (63.6%) | 0 | 16913/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 348/800 (43.5%) | 0 | 16841/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 406/800 (50.7%) | 0 | 16129/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 343/800 (42.9%) | 0 | 15837/0/0/0 | 2, 3, 4 |
| hard | Sprig | 394/800 (49.3%) | 0 | 15320/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 4.56 | 806.35 / 1365.07 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 4.44 | 783.36 / 1717.17 | 0.00 | 3.47 / 3.45 | 0.92 |
| easy | Captain Bramble | 4.97 | 778.76 / 1621.27 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 4.91 | 767.67 / 1509.81 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 4.15 | 792.92 / 1592.13 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 8.81 | 1622.85 / 398.98 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 9.39 | 1647.14 / 487.49 | 0.00 | 7.20 / 6.95 | 2.12 |
| medium | Captain Bramble | 9.13 | 1621.84 / 447.88 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 8.96 | 1583.54 / 429.29 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 7.69 | 1625.36 / 368.21 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 16.20 | 3312.53 / 263.75 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 18.20 | 3391.42 / 272.83 | 0.00 | 12.99 / 11.28 | 5.08 |
| hard | Captain Bramble | 15.51 | 3183.56 / 256.67 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 15.29 | 3175.78 / 254.16 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 14.18 | 3275.10 / 247.41 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed useful after hostile warning. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 31.08 | 85.0% | 3646 / 86 | 904 | 8621 / 0 |
| easy | Andromoss | 5.20 | 14.1% | 3549 / 23 | 902 | 0 / 0 |
| easy | Captain Bramble | 24.96 | 79.8% | 3980 / 58 | 904 | 4448 / 0 |
| easy | Duskmantle | 27.32 | 81.7% | 3924 / 78 | 904 | 6465 / 0 |
| easy | Sprig | 39.09 | 89.1% | 3318 / 105 | 901 | 10332 / 0 |
| medium | Sir Champignon | 36.53 | 75.6% | 7047 / 89 | 602 | 4181 / 424 |
| medium | Andromoss | 10.88 | 13.5% | 7513 / 19 | 605 | 590 / 535 |
| medium | Captain Bramble | 36.82 | 74.8% | 7307 / 104 | 602 | 4335 / 335 |
| medium | Duskmantle | 35.85 | 74.7% | 7170 / 88 | 601 | 4138 / 355 |
| medium | Sprig | 34.58 | 77.5% | 6155 / 78 | 601 | 3439 / 277 |
| hard | Sir Champignon | 56.74 | 71.3% | 12959 / 76 | 300 | 16747 / 4248 |
| hard | Andromoss | 20.01 | 8.9% | 14563 / 21 | 301 | 5423 / 4917 |
| hard | Captain Bramble | 61.18 | 74.5% | 12407 / 64 | 300 | 16290 / 4083 |
| hard | Duskmantle | 60.99 | 74.8% | 12228 / 69 | 300 | 16012 / 3960 |
| hard | Sprig | 43.59 | 67.3% | 11346 / 66 | 300 | 15577 / 4528 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --casting=opportunity --cast-profile=scaled --report=tending4500-only --tending-ms=4500`.

Reproduce against current defaults with all changed parameters explicit:

`pnpm balance:roster --tier=1 --seeds=100 --seed=20261119 --ominous-marks=3 --ominous-ms=12000 --mark-bonus=4 --extension-ms=500 --tending-ms=4500 --report=tending4500-only`
