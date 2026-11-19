# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep useful/urgent selected column, theft enemy charge, armor unarmored enemy mole, mark unmarked enemy mole, tending unextended own mole near escape. No refresh of an active Sweep. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell powers unchanged.

Generated 2026-11-19T21:59:29.921Z. Revision a1841a7 + working changes; config 318956a6b6e8; simulation dc53c29eb61a6bee; base seed 20261119. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.8% | 🟩68.8%* | 🟩79.8% | 🟩78.7% |
| Andromoss | 🟥38.2% | — | 🟨44.3% | 🟨48.0% | 🟨50.3%* |
| Captain Bramble | 🟥31.2%* | 🟨55.7% | — | 🟩60.5% | 🟨59.5% |
| Duskmantle | 🟥20.2% | 🟨52.0% | 🟥39.5% | — | 🟨51.5%* |
| Sprig | 🟥21.3% | 🟨49.7%* | 🟨40.5% | 🟨48.5%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩64.5% | 🟩78.0% | 🟩84.0% | 🟩83.0% |
| Andromoss | 🟥35.5% | — | 🟨44.0% | 🟨48.5% | 🟨53.0% |
| Captain Bramble | 🟥22.0% | 🟨56.0% | — | 🟩60.5% | 🟨55.0% |
| Duskmantle | 🟥16.0% | 🟨51.5% | 🟥39.5% | — | 🟨49.0% |
| Sprig | 🟥17.0% | 🟨47.0% | 🟨45.0% | 🟨51.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.0% | 🟩71.5% | 🟩83.0% | 🟩77.0% |
| Andromoss | 🟥39.0% | — | 🟨44.0% | 🟨49.0% | 🟨46.5% |
| Captain Bramble | 🟥28.5% | 🟨56.0% | — | 🟨57.0% | 🟩60.5% |
| Duskmantle | 🟥17.0% | 🟨51.0% | 🟨43.0% | — | 🟨50.0% |
| Sprig | 🟥23.0% | 🟨53.5% | 🟥39.5% | 🟨50.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨60.0% | 🟨57.0% | 🟩72.5% | 🟩76.0% |
| Andromoss | 🟨40.0% | — | 🟨45.0% | 🟨46.5% | 🟨51.5% |
| Captain Bramble | 🟨43.0% | 🟨55.0% | — | 🟩64.0% | 🟩63.0% |
| Duskmantle | 🟥27.5% | 🟨53.5% | 🟥36.0% | — | 🟨55.5% |
| Sprig | 🟥24.0% | 🟨48.5% | 🟥37.0% | 🟨44.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 78.0%, medium 71.5%, hard 57.0%; spread 21.0 points.
- Andromoss vs Sprig: easy 53.0%, medium 46.5%, hard 51.5%; spread 6.5 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 49.0%, medium 50.0%, hard 55.5%; spread 6.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 46.7 | 120.5 | 1127/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 129 / 71 | 0 | 46.8 | 137.1 | 480/0/0/0 · 883/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 156 / 44 | 0 | 47.5 | 140.6 | 1099/0/0/0 · 1090/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 168 / 32 | 0 | 46.5 | 120.5 | 1045/0/0/0 · 1015/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 166 / 34 | 0 | 45.6 | 116.2 | 1012/0/0/0 · 927/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 59 left-side wins | 0 | 48.0 | 153.3 | 547/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 88 / 112 | 0 | 50.1 | 144.9 | 859/0/0/0 · 574/0/0/0 |
| easy | Andromoss / Duskmantle | 200 | 97 / 103 | 0 | 48.9 | 143.1 | 836/0/0/0 · 568/0/0/0 |
| easy | Andromoss / Sprig | 200 | 106 / 94 | 0 | 49.1 | 141.8 | 1007/0/0/0 · 279/0/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 61 left-side wins | 0 | 50.9 | 154.8 | 1111/0/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 121 / 79 | 0 | 50.6 | 147.4 | 1129/0/0/0 · 1111/0/0/0 |
| easy | Captain Bramble / Sprig | 200 | 110 / 90 | 0 | 51.0 | 156.1 | 1157/0/0/0 · 1065/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 59 left-side wins | 0 | 52.6 | 153.6 | 1151/0/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 98 / 102 | 0 | 50.1 | 144.8 | 1133/0/0/0 · 1001/0/0/0 |
| easy | Sprig / Sprig | 100 | 60 left-side wins | 0 | 51.7 | 174.3 | 1034/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 60 left-side wins | 0 | 64.7 | 173.7 | 2181/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 122 / 78 | 0 | 57.5 | 150.9 | 822/0/0/0 · 1830/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 143 / 57 | 0 | 60.6 | 160.3 | 2114/0/0/0 · 1987/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 166 / 34 | 0 | 62.8 | 151.7 | 2072/0/0/0 · 2006/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 154 / 46 | 0 | 60.8 | 142.9 | 2018/0/0/0 · 1825/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 59.3 | 159.6 | 1154/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 88 / 112 | 0 | 59.0 | 162.8 | 1856/0/0/0 · 980/0/0/0 |
| medium | Andromoss / Duskmantle | 200 | 98 / 102 | 0 | 59.5 | 161.7 | 1816/0/0/0 · 949/0/0/0 |
| medium | Andromoss / Sprig | 200 | 93 / 107 | 0 | 60.8 | 160.4 | 2033/0/0/0 · 585/0/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 55 left-side wins | 0 | 64.8 | 182.7 | 2179/0/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 114 / 86 | 0 | 62.4 | 165.2 | 2144/0/0/0 · 2199/0/0/0 |
| medium | Captain Bramble / Sprig | 200 | 121 / 79 | 0 | 62.4 | 168.8 | 2249/0/0/0 · 2062/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 56 left-side wins | 0 | 63.4 | 171.7 | 2211/0/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 100 / 100 | 0 | 61.6 | 171.9 | 2233/0/0/0 · 1963/0/0/0 |
| medium | Sprig / Sprig | 100 | 57 left-side wins | 0 | 60.9 | 158.0 | 1958/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 51 left-side wins | 0 | 96.0 | 239.0 | 3954/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 120 / 80 | 0 | 85.4 | 235.8 | 1614/0/0/0 · 3693/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 114 / 86 | 0 | 90.5 | 227.6 | 3786/0/0/0 · 3546/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 145 / 55 | 0 | 90.6 | 240.4 | 3787/0/0/0 · 3638/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 152 / 48 | 0 | 89.2 | 223.4 | 3778/0/0/0 · 3362/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 87.5 | 220.9 | 2278/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 90 / 110 | 0 | 83.8 | 216.5 | 3560/0/0/0 · 1495/0/0/0 |
| hard | Andromoss / Duskmantle | 200 | 93 / 107 | 0 | 89.7 | 232.7 | 3775/0/0/0 · 1557/0/0/0 |
| hard | Andromoss / Sprig | 200 | 103 / 97 | 0 | 86.8 | 227.2 | 3749/0/0/0 · 1348/0/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 48 left-side wins | 0 | 90.0 | 229.6 | 3722/0/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 128 / 72 | 0 | 89.0 | 231.8 | 3622/0/0/0 · 3601/0/0/0 |
| hard | Captain Bramble / Sprig | 200 | 126 / 74 | 0 | 89.5 | 227.7 | 3765/0/0/0 · 3445/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 57 left-side wins | 0 | 88.5 | 240.6 | 3805/0/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 111 / 89 | 0 | 89.8 | 227.3 | 3779/0/0/0 · 3414/0/0/0 |
| hard | Sprig / Sprig | 100 | 56 left-side wins | 0 | 90.1 | 255.8 | 3752/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 619/800 (77.4%) | 0 | 4763/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 362/800 (45.3%) | 0 | 4132/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 387/800 (48.4%) | 0 | 5061/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 312/800 (39.0%) | 0 | 4978/0/0/0 | 2, 3, 4 |
| easy | Sprig | 320/800 (40.0%) | 0 | 4306/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 585/800 (73.1%) | 0 | 9207/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 357/800 (44.6%) | 0 | 8689/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 404/800 (50.5%) | 0 | 9539/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 322/800 (40.3%) | 0 | 9598/0/0/0 | 2, 3, 4 |
| medium | Sprig | 332/800 (41.5%) | 0 | 8393/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 531/800 (66.4%) | 0 | 16919/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 366/800 (45.8%) | 0 | 17055/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 450/800 (56.3%) | 0 | 16150/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 345/800 (43.1%) | 0 | 16380/0/0/0 | 2, 3, 4 |
| hard | Sprig | 308/800 (38.5%) | 0 | 15321/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 4.54 | 798.26 / 1383.23 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 4.48 | 784.42 / 1737.19 | 0.00 | 3.52 / 3.50 | 0.92 |
| easy | Captain Bramble | 4.94 | 776.98 / 1604.82 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 4.78 | 758.35 / 1558.82 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 4.09 | 764.49 / 1570.67 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 8.78 | 1624.67 / 405.24 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 9.42 | 1659.63 / 504.24 | 0.00 | 7.17 / 6.92 | 2.18 |
| medium | Captain Bramble | 9.20 | 1639.19 / 483.71 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 9.23 | 1636.46 / 481.96 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 8.04 | 1649.02 / 483.71 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 16.21 | 3320.76 / 261.95 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 18.47 | 3436.14 / 273.99 | 0.00 | 13.16 / 11.43 | 5.18 |
| hard | Captain Bramble | 15.54 | 3188.55 / 251.88 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 15.72 | 3258.91 / 260.56 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 14.46 | 3277.44 / 262.78 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed useful after hostile warning. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 33.22 | 86.0% | 3636 / 91 | 904 | 10144 / 0 |
| easy | Andromoss | 5.23 | 13.8% | 3585 / 22 | 903 | 0 / 0 |
| easy | Captain Bramble | 25.32 | 80.2% | 3950 / 67 | 904 | 4390 / 0 |
| easy | Duskmantle | 25.99 | 81.3% | 3827 / 61 | 901 | 5499 / 0 |
| easy | Sprig | 34.70 | 87.9% | 3272 / 100 | 901 | 6027 / 0 |
| medium | Sir Champignon | 37.18 | 76.1% | 7026 / 86 | 602 | 4681 / 436 |
| medium | Andromoss | 10.89 | 13.3% | 7535 / 15 | 605 | 609 / 560 |
| medium | Captain Bramble | 38.45 | 75.8% | 7360 / 94 | 601 | 5391 / 429 |
| medium | Duskmantle | 38.86 | 76.0% | 7387 / 81 | 602 | 5701 / 443 |
| medium | Sprig | 39.67 | 79.4% | 6435 / 108 | 601 | 5576 / 464 |
| hard | Sir Champignon | 56.90 | 71.4% | 12965 / 71 | 300 | 16977 / 4308 |
| hard | Andromoss | 20.28 | 8.8% | 14777 / 21 | 301 | 5643 / 5133 |
| hard | Captain Bramble | 61.92 | 74.8% | 12428 / 68 | 300 | 16713 / 4076 |
| hard | Duskmantle | 63.67 | 75.2% | 12575 / 71 | 301 | 17588 / 4196 |
| hard | Sprig | 45.02 | 67.7% | 11569 / 55 | 300 | 15937 / 4484 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --casting=opportunity --cast-profile=scaled --report=sweep-continuous-control`.
