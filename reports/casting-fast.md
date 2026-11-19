# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":1,"medium":1,"hard":1} for difficulty (profile fast), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep useful/urgent selected column, theft enemy charge, armor unarmored enemy mole, mark unmarked enemy mole, tending unextended own mole near escape. No refresh of an active Sweep. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell powers unchanged.

Generated 2026-11-19T21:20:55.016Z. Revision be5233c + working changes; config eb14dc75fe13; simulation b398a20a240fd428; base seed 20261119. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩65.8% | 🟨56.5% | 🟩69.2% | 🟩72.3% |
| Andromoss | 🟥34.2% | — | 🟨40.2% | 🟨47.7%* | 🟨48.3%* |
| Captain Bramble | 🟨43.5% | 🟨59.8% | — | 🟩62.8% | 🟩61.2% |
| Duskmantle | 🟥30.8% | 🟨52.3%* | 🟥37.2% | — | 🟨51.7%* |
| Sprig | 🟥27.7% | 🟨51.7%* | 🟥38.8% | 🟨48.3%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩72.5% | 🟩61.5% | 🟩71.0% | 🟩71.5% |
| Andromoss | 🟥27.5% | — | 🟨40.0% | 🟨50.5% | 🟨49.5% |
| Captain Bramble | 🟥38.5% | 🟨60.0% | — | 🟩61.5% | 🟨58.5% |
| Duskmantle | 🟥29.0% | 🟨49.5% | 🟥38.5% | — | 🟨49.5% |
| Sprig | 🟥28.5% | 🟨50.5% | 🟨41.5% | 🟨50.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩65.5% | 🟨51.0% | 🟩67.5% | 🟩69.5% |
| Andromoss | 🟥34.5% | — | 🟥35.5% | 🟨46.0% | 🟨44.0% |
| Captain Bramble | 🟨49.0% | 🟩64.5% | — | 🟩63.0% | 🟩62.0% |
| Duskmantle | 🟥32.5% | 🟨54.0% | 🟥37.0% | — | 🟨50.0% |
| Sprig | 🟥30.5% | 🟨56.0% | 🟥38.0% | 🟨50.0% | — |

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

- Andromoss vs Duskmantle: easy 50.5%, medium 46.0%, hard 46.5%; spread 4.5 points; observed favored-side flip.
- Andromoss vs Sprig: easy 49.5%, medium 44.0%, hard 51.5%; spread 7.5 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 49.5%, medium 50.0%, hard 55.5%; spread 6.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 56 left-side wins | 0 | 50.3 | 177.8 | 1248/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 145 / 55 | 0 | 47.8 | 133.7 | 1087/0/0/0 · 607/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 123 / 77 | 0 | 50.8 | 153.7 | 1201/0/0/0 · 1244/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 142 / 58 | 0 | 49.0 | 148.6 | 1178/0/0/0 · 1203/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 143 / 57 | 0 | 50.1 | 151.1 | 1165/0/0/0 · 1168/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 59 left-side wins | 0 | 48.0 | 156.0 | 580/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 80 / 120 | 0 | 51.8 | 172.7 | 578/0/0/0 · 1182/0/0/0 |
| easy | Andromoss / Duskmantle | 200 | 101 / 99 | 0 | 49.0 | 139.7 | 536/0/0/0 · 1120/0/0/0 |
| easy | Andromoss / Sprig | 200 | 99 / 101 | 0 | 49.5 | 153.2 | 651/0/0/0 · 957/0/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 65 left-side wins | 0 | 51.5 | 158.3 | 1242/0/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 123 / 77 | 0 | 53.0 | 172.9 | 1247/0/0/0 · 1252/0/0/0 |
| easy | Captain Bramble / Sprig | 200 | 117 / 83 | 0 | 52.4 | 158.4 | 1235/0/0/0 · 1219/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 50.5 | 159.7 | 1230/0/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 99 / 101 | 0 | 52.0 | 153.7 | 1237/0/0/0 · 1181/0/0/0 |
| easy | Sprig / Sprig | 100 | 62 left-side wins | 0 | 51.8 | 168.2 | 1218/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 56 left-side wins | 0 | 74.7 | 187.3 | 2369/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 131 / 69 | 0 | 63.8 | 167.3 | 1921/0/0/0 · 1496/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 102 / 98 | 0 | 67.0 | 170.3 | 2268/0/0/0 · 2308/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 135 / 65 | 0 | 66.5 | 168.2 | 2261/0/0/0 · 2311/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 139 / 61 | 0 | 66.2 | 171.6 | 2251/0/0/0 · 2086/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 59.9 | 159.6 | 1214/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 71 / 129 | 0 | 59.5 | 162.3 | 1486/0/0/0 · 2033/0/0/0 |
| medium | Andromoss / Duskmantle | 200 | 92 / 108 | 0 | 60.4 | 168.2 | 1452/0/0/0 · 2042/0/0/0 |
| medium | Andromoss / Sprig | 200 | 88 / 112 | 0 | 59.5 | 163.5 | 1794/0/0/0 · 1355/0/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 57 left-side wins | 0 | 68.8 | 161.3 | 2348/0/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 126 / 74 | 0 | 62.2 | 163.4 | 2238/0/0/0 · 2255/0/0/0 |
| medium | Captain Bramble / Sprig | 200 | 124 / 76 | 0 | 64.2 | 168.8 | 2269/0/0/0 · 2211/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 55 left-side wins | 0 | 60.4 | 173.1 | 2323/0/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 100 / 100 | 0 | 61.8 | 162.1 | 2274/0/0/0 · 2077/0/0/0 |
| medium | Sprig / Sprig | 100 | 55 left-side wins | 0 | 67.5 | 178.3 | 2186/0/0/0 · 0/0/0/0 |
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
| easy | Sir Champignon | 553/800 (69.1%) | 0 | 5879/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 335/800 (41.9%) | 0 | 2952/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 437/800 (54.6%) | 0 | 6150/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 333/800 (41.6%) | 0 | 6042/0/0/0 | 2, 3, 4 |
| easy | Sprig | 342/800 (42.8%) | 0 | 5743/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 507/800 (63.4%) | 0 | 11070/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 320/800 (40.0%) | 0 | 7442/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 477/800 (59.6%) | 0 | 11196/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 347/800 (43.4%) | 0 | 11205/0/0/0 | 2, 3, 4 |
| medium | Sprig | 349/800 (43.6%) | 0 | 9915/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 523/800 (65.4%) | 0 | 17604/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 367/800 (45.9%) | 0 | 16994/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 450/800 (56.3%) | 0 | 16427/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 352/800 (44.0%) | 0 | 16498/0/0/0 | 2, 3, 4 |
| hard | Sprig | 308/800 (38.5%) | 0 | 15334/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 5.79 | 816.03 / 1605.92 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 2.96 | 777.92 / 1760.54 | 0.00 | 0.54 / 0.52 | 2.38 |
| easy | Captain Bramble | 6.13 | 799.57 / 1812.41 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 6.01 | 775.41 / 1705.77 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 5.66 | 774.31 / 1691.22 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 10.88 | 1712.51 / 492.64 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 7.79 | 1687.92 / 524.46 | 0.00 | 2.48 / 2.29 | 5.25 |
| medium | Captain Bramble | 11.06 | 1645.63 / 485.82 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 11.10 | 1645.97 / 497.07 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 9.66 | 1659.06 / 489.90 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 16.53 | 3372.50 / 245.11 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 18.39 | 3429.77 / 273.09 | 0.00 | 13.10 / 11.45 | 5.17 |
| hard | Captain Bramble | 15.88 | 3245.19 / 257.49 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 15.87 | 3275.06 / 262.54 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 14.48 | 3288.02 / 264.73 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed useful after hostile warning. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 7.49 | 22.7% | 4631 / 5 | 302 | 0 / 0 |
| easy | Andromoss | 4.58 | 35.0% | 2372 / 9 | 299 | 0 / 0 |
| easy | Captain Bramble | 8.06 | 23.7% | 4908 / 8 | 302 | 0 / 0 |
| easy | Duskmantle | 7.86 | 23.3% | 4812 / 12 | 302 | 0 / 0 |
| easy | Sprig | 7.99 | 29.1% | 4525 / 5 | 302 | 0 / 0 |
| medium | Sir Champignon | 15.67 | 30.4% | 8701 / 20 | 302 | 1048 / 582 |
| medium | Andromoss | 10.41 | 25.1% | 6228 / 9 | 303 | 463 / 367 |
| medium | Captain Bramble | 16.02 | 30.9% | 8848 / 12 | 302 | 1085 / 609 |
| medium | Duskmantle | 16.11 | 31.0% | 8882 / 11 | 302 | 1105 / 604 |
| medium | Sprig | 19.18 | 49.5% | 7729 / 17 | 301 | 1056 / 585 |
| hard | Sir Champignon | 58.31 | 71.5% | 13226 / 82 | 300 | 18330 / 4639 |
| hard | Andromoss | 20.20 | 8.8% | 14716 / 24 | 301 | 5583 / 5094 |
| hard | Captain Bramble | 63.66 | 74.9% | 12705 / 70 | 300 | 17469 / 4247 |
| hard | Duskmantle | 64.47 | 75.2% | 12693 / 75 | 301 | 18083 / 4292 |
| hard | Sprig | 45.21 | 67.8% | 11582 / 57 | 300 | 16443 / 4582 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --casting=opportunity --cast-profile=fast --report=casting-fast`.
