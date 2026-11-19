# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep useful/urgent selected column, theft enemy charge, armor unarmored enemy mole, mark unmarked enemy mole, tending unextended own mole near escape. No refresh of an active Sweep. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell powers unchanged.

Generated 2026-11-19T21:45:03.647Z. Revision d4d69f9 + working changes; config eb14dc75fe13; simulation 204785115e38003c; base seed 20261119. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.3% | 🟩62.8% | 🟩70.8% | 🟩74.5% |
| Andromoss | 🟥38.7% | — | 🟨44.3% | 🟨48.0% | 🟨50.3%* |
| Captain Bramble | 🟥37.2% | 🟨55.7% | — | 🟩60.5% | 🟨59.5% |
| Duskmantle | 🟥29.2% | 🟨52.0% | 🟥39.5% | — | 🟨51.5%* |
| Sprig | 🟥25.5% | 🟨49.7%* | 🟨40.5% | 🟨48.5%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩63.0% | 🟩66.0% | 🟩73.5% | 🟩74.0% |
| Andromoss | 🟥37.0% | — | 🟨44.0% | 🟨48.5% | 🟨53.0% |
| Captain Bramble | 🟥34.0% | 🟨56.0% | — | 🟩60.5% | 🟨55.0% |
| Duskmantle | 🟥26.5% | 🟨51.5% | 🟥39.5% | — | 🟨49.0% |
| Sprig | 🟥26.0% | 🟨47.0% | 🟨45.0% | 🟨51.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.5% | 🟩65.5% | 🟩70.0% | 🟩73.5% |
| Andromoss | 🟥38.5% | — | 🟨44.0% | 🟨49.0% | 🟨46.5% |
| Captain Bramble | 🟥34.5% | 🟨56.0% | — | 🟨57.0% | 🟩60.5% |
| Duskmantle | 🟥30.0% | 🟨51.0% | 🟨43.0% | — | 🟨50.0% |
| Sprig | 🟥26.5% | 🟨53.5% | 🟥39.5% | 🟨50.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨59.5% | 🟨57.0% | 🟩69.0% | 🟩76.0% |
| Andromoss | 🟨40.5% | — | 🟨45.0% | 🟨46.5% | 🟨51.5% |
| Captain Bramble | 🟨43.0% | 🟨55.0% | — | 🟩64.0% | 🟩63.0% |
| Duskmantle | 🟥31.0% | 🟨53.5% | 🟥36.0% | — | 🟨55.5% |
| Sprig | 🟥24.0% | 🟨48.5% | 🟥37.0% | 🟨44.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Andromoss vs Sprig: easy 53.0%, medium 46.5%, hard 51.5%; spread 6.5 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 49.0%, medium 50.0%, hard 55.5%; spread 6.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 56 left-side wins | 0 | 51.5 | 152.9 | 1121/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 126 / 74 | 0 | 47.0 | 138.7 | 482/0/0/0 · 888/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 132 / 68 | 0 | 47.8 | 132.2 | 1115/0/0/0 · 1121/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 147 / 53 | 0 | 48.6 | 140.5 | 1075/0/0/0 · 1100/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 148 / 52 | 0 | 49.1 | 142.3 | 1080/0/0/0 · 983/0/0/0 |
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
| medium | Sir Champignon / Sir Champignon | 100 | 59 left-side wins | 0 | 67.0 | 166.7 | 2209/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 123 / 77 | 0 | 59.8 | 159.8 | 846/0/0/0 · 1846/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 131 / 69 | 0 | 62.3 | 165.8 | 2176/0/0/0 · 2149/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 140 / 60 | 0 | 61.5 | 160.7 | 2103/0/0/0 · 2064/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 147 / 53 | 0 | 61.4 | 160.1 | 2142/0/0/0 · 1934/0/0/0 |
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
| hard | Sir Champignon / Sir Champignon | 100 | 55 left-side wins | 0 | 95.0 | 269.0 | 4378/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 119 / 81 | 0 | 84.5 | 232.7 | 1613/0/0/0 · 3632/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 114 / 86 | 0 | 91.0 | 236.4 | 3973/0/0/0 · 3823/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 138 / 62 | 0 | 88.6 | 232.1 | 3837/0/0/0 · 3756/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 152 / 48 | 0 | 89.1 | 229.0 | 3803/0/0/0 · 3375/0/0/0 |
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
| easy | Sir Champignon | 553/800 (69.1%) | 0 | 4873/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 365/800 (45.6%) | 0 | 4137/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 411/800 (51.4%) | 0 | 5092/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 333/800 (41.6%) | 0 | 5063/0/0/0 | 2, 3, 4 |
| easy | Sprig | 338/800 (42.3%) | 0 | 4362/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 541/800 (67.6%) | 0 | 9476/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 356/800 (44.5%) | 0 | 8705/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 416/800 (52.0%) | 0 | 9701/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 348/800 (43.5%) | 0 | 9656/0/0/0 | 2, 3, 4 |
| medium | Sprig | 339/800 (42.4%) | 0 | 8502/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 523/800 (65.4%) | 0 | 17604/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 367/800 (45.9%) | 0 | 16994/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 450/800 (56.3%) | 0 | 16427/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 352/800 (44.0%) | 0 | 16498/0/0/0 | 2, 3, 4 |
| hard | Sprig | 308/800 (38.5%) | 0 | 15334/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 4.69 | 804.49 / 1533.62 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 4.49 | 784.26 / 1744.47 | 0.00 | 3.51 / 3.49 | 0.93 |
| easy | Captain Bramble | 4.98 | 781.70 / 1591.26 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 4.89 | 769.74 / 1626.04 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 4.16 | 778.94 / 1656.21 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 9.08 | 1677.60 / 459.99 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 9.44 | 1679.18 / 510.38 | 0.00 | 7.22 / 6.98 | 2.15 |
| medium | Captain Bramble | 9.40 | 1660.41 / 495.01 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 9.31 | 1649.91 / 499.12 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 8.18 | 1670.96 / 505.08 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 16.53 | 3372.50 / 245.11 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 18.39 | 3429.77 / 273.09 | 0.00 | 13.10 / 11.45 | 5.17 |
| hard | Captain Bramble | 15.88 | 3245.19 / 257.49 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 15.87 | 3275.06 / 262.54 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 14.48 | 3288.02 / 264.73 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed useful after hostile warning. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 29.52 | 83.8% | 3752 / 70 | 904 | 6648 / 0 |
| easy | Andromoss | 5.22 | 13.4% | 3590 / 24 | 902 | 0 / 0 |
| easy | Captain Bramble | 26.49 | 80.9% | 3981 / 74 | 904 | 5053 / 0 |
| easy | Duskmantle | 29.03 | 82.9% | 3912 / 69 | 901 | 7470 / 0 |
| easy | Sprig | 36.05 | 88.1% | 3328 / 102 | 902 | 6616 / 0 |
| medium | Sir Champignon | 37.84 | 75.7% | 7267 / 87 | 601 | 5128 / 507 |
| medium | Andromoss | 10.96 | 13.7% | 7551 / 17 | 605 | 583 / 531 |
| medium | Captain Bramble | 39.66 | 76.0% | 7522 / 91 | 602 | 5783 / 484 |
| medium | Duskmantle | 39.15 | 76.0% | 7445 / 84 | 601 | 5956 / 473 |
| medium | Sprig | 40.17 | 79.3% | 6544 / 100 | 601 | 5980 / 521 |
| hard | Sir Champignon | 58.31 | 71.5% | 13226 / 82 | 300 | 18330 / 4639 |
| hard | Andromoss | 20.20 | 8.8% | 14716 / 24 | 301 | 5583 / 5094 |
| hard | Captain Bramble | 63.66 | 74.9% | 12705 / 70 | 300 | 17469 / 4247 |
| hard | Duskmantle | 64.47 | 75.2% | 12693 / 75 | 301 | 18083 / 4292 |
| hard | Sprig | 45.21 | 67.8% | 11582 / 57 | 300 | 16443 / 4582 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --casting=opportunity --cast-profile=scaled --report=balance-tier-1`.
