# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep useful/urgent selected column, theft enemy charge, armor unarmored enemy mole, mark unmarked enemy mole, tending unextended own mole near escape. No refresh of an active Sweep. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-20T00:23:36.077Z. Revision 2aa4349 + working changes; config 250311203379; simulation f0a9453ed9529a27; base seed 20261119. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.8% | 🟨42.8%* | 🟩71.0% | 🟨57.7% |
| Andromoss | 🟥38.2% | — | 🟥28.0% | 🟨41.8% | 🟨43.2% |
| Captain Bramble | 🟨57.2%* | 🟩72.0% | — | 🟩78.0% | 🟨59.0% |
| Duskmantle | 🟥29.0% | 🟨58.2% | 🟥22.0% | — | 🟨42.5%* |
| Sprig | 🟨42.3% | 🟨56.8% | 🟨41.0% | 🟨57.5%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩64.5% | 🟨56.0% | 🟩71.0% | 🟨59.5% |
| Andromoss | 🟥35.5% | — | 🟥33.0% | 🟨41.0% | 🟨45.0% |
| Captain Bramble | 🟨44.0% | 🟩67.0% | — | 🟩71.0% | 🟨56.0% |
| Duskmantle | 🟥29.0% | 🟨59.0% | 🟥29.0% | — | 🟥37.5% |
| Sprig | 🟨40.5% | 🟨55.0% | 🟨44.0% | 🟩62.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.0% | 🟨44.5% | 🟩74.5% | 🟨51.5% |
| Andromoss | 🟥39.0% | — | 🟥25.0% | 🟨41.5% | 🟨42.0% |
| Captain Bramble | 🟨55.5% | 🟩75.0% | — | 🟩82.0% | 🟨57.5% |
| Duskmantle | 🟥25.5% | 🟨58.5% | 🟥18.0% | — | 🟥37.0% |
| Sprig | 🟨48.5% | 🟨58.0% | 🟨42.5% | 🟩63.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨60.0% | 🟥28.0% | 🟩67.5% | 🟩62.0% |
| Andromoss | 🟨40.0% | — | 🟥26.0% | 🟨43.0% | 🟨42.5% |
| Captain Bramble | 🟩72.0% | 🟩74.0% | — | 🟩81.0% | 🟩63.5% |
| Duskmantle | 🟥32.5% | 🟨57.0% | 🟥19.0% | — | 🟨53.0% |
| Sprig | 🟥38.0% | 🟨57.5% | 🟥36.5% | 🟨47.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 56.0%, medium 44.5%, hard 28.0%; spread 28.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 37.5%, medium 37.0%, hard 53.0%; spread 16.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 46.7 | 120.5 | 1127/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 129 / 71 | 0 | 46.8 | 137.1 | 480/0/0/0 · 883/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 112 / 88 | 0 | 46.7 | 130.4 | 1079/0/0/0 · 1079/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 142 / 58 | 0 | 46.6 | 118.9 | 1018/0/0/0 · 1044/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 119 / 81 | 0 | 46.8 | 128.7 | 1117/0/0/0 · 988/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 59 left-side wins | 0 | 48.0 | 153.3 | 547/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 66 / 134 | 0 | 46.3 | 134.3 | 786/0/0/0 · 518/0/0/0 |
| easy | Andromoss / Duskmantle | 200 | 82 / 118 | 0 | 46.6 | 141.6 | 831/0/0/0 · 551/0/0/0 |
| easy | Andromoss / Sprig | 200 | 90 / 110 | 0 | 50.9 | 153.3 | 1021/0/0/0 · 264/0/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 53 left-side wins | 0 | 45.3 | 138.0 | 1089/0/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 142 / 58 | 0 | 44.6 | 129.7 | 1010/0/0/0 · 1065/0/0/0 |
| easy | Captain Bramble / Sprig | 200 | 112 / 88 | 0 | 47.5 | 128.1 | 1114/0/0/0 · 1040/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 44.6 | 139.6 | 1081/0/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 75 / 125 | 0 | 47.9 | 116.3 | 1102/0/0/0 · 972/0/0/0 |
| easy | Sprig / Sprig | 100 | 63 left-side wins | 0 | 50.7 | 127.5 | 1013/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 60 left-side wins | 0 | 64.7 | 173.7 | 2181/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 122 / 78 | 0 | 57.5 | 150.9 | 822/0/0/0 · 1830/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 89 / 111 | 0 | 58.0 | 153.0 | 2023/0/0/0 · 1962/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 149 / 51 | 0 | 59.7 | 155.5 | 2000/0/0/0 · 1946/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 103 / 97 | 0 | 61.7 | 149.8 | 2037/0/0/0 · 1735/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 59.3 | 159.6 | 1154/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 50 / 150 | 0 | 56.6 | 145.3 | 1776/0/0/0 · 887/0/0/0 |
| medium | Andromoss / Duskmantle | 200 | 83 / 117 | 0 | 57.3 | 157.9 | 1801/0/0/0 · 928/0/0/0 |
| medium | Andromoss / Sprig | 200 | 84 / 116 | 0 | 58.8 | 151.5 | 1998/0/0/0 · 505/0/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 52 left-side wins | 0 | 57.3 | 156.8 | 1997/0/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 164 / 36 | 0 | 56.3 | 136.1 | 1831/0/0/0 · 1840/0/0/0 |
| medium | Captain Bramble / Sprig | 200 | 115 / 85 | 0 | 56.4 | 145.3 | 1967/0/0/0 · 1805/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 56.0 | 150.9 | 2030/0/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 74 / 126 | 0 | 58.2 | 144.9 | 1956/0/0/0 · 1638/0/0/0 |
| medium | Sprig / Sprig | 100 | 55 left-side wins | 0 | 61.4 | 150.9 | 1768/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 51 left-side wins | 0 | 96.0 | 239.0 | 3954/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 120 / 80 | 0 | 85.4 | 235.8 | 1614/0/0/0 · 3693/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 56 / 144 | 0 | 85.6 | 208.4 | 3414/0/0/0 · 3186/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 135 / 65 | 0 | 86.8 | 225.1 | 3546/0/0/0 · 3394/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 124 / 76 | 0 | 89.3 | 234.6 | 3951/0/0/0 · 3333/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 87.5 | 220.9 | 2278/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 52 / 148 | 0 | 82.5 | 209.2 | 3259/0/0/0 · 1409/0/0/0 |
| hard | Andromoss / Duskmantle | 200 | 86 / 114 | 0 | 84.3 | 227.0 | 3598/0/0/0 · 1546/0/0/0 |
| hard | Andromoss / Sprig | 200 | 85 / 115 | 0 | 85.0 | 220.3 | 3479/0/0/0 · 1232/0/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 52 left-side wins | 0 | 79.3 | 212.5 | 3216/0/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 162 / 38 | 0 | 80.5 | 185.8 | 2871/0/0/0 · 2883/0/0/0 |
| hard | Captain Bramble / Sprig | 200 | 127 / 73 | 0 | 85.4 | 221.9 | 3601/0/0/0 · 3227/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 52 left-side wins | 0 | 83.7 | 219.8 | 3684/0/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 106 / 94 | 0 | 82.2 | 220.1 | 3533/0/0/0 · 2976/0/0/0 |
| hard | Sprig / Sprig | 100 | 51 left-side wins | 0 | 86.2 | 224.3 | 3318/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 502/800 (62.7%) | 0 | 4821/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 309/800 (38.6%) | 0 | 4068/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 476/800 (59.5%) | 0 | 4810/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 309/800 (38.6%) | 0 | 4843/0/0/0 | 2, 3, 4 |
| easy | Sprig | 404/800 (50.5%) | 0 | 4277/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 463/800 (57.9%) | 0 | 9063/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 295/800 (36.9%) | 0 | 8559/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 540/800 (67.5%) | 0 | 8644/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 278/800 (34.8%) | 0 | 8700/0/0/0 | 2, 3, 4 |
| medium | Sprig | 424/800 (53.0%) | 0 | 7451/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 435/800 (54.4%) | 0 | 16479/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 303/800 (37.9%) | 0 | 16307/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 581/800 (72.6%) | 0 | 14283/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 323/800 (40.4%) | 0 | 15040/0/0/0 | 2, 3, 4 |
| hard | Sprig | 358/800 (44.8%) | 0 | 14086/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 4.62 | 804.52 / 1325.99 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 4.40 | 760.79 / 1697.16 | 0.00 | 3.46 / 3.44 | 0.90 |
| easy | Captain Bramble | 4.65 | 741.21 / 1342.85 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 4.70 | 723.34 / 1372.32 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 4.08 | 776.65 / 1254.88 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 8.60 | 1586.68 / 391.75 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 9.26 | 1597.85 / 464.06 | 0.00 | 7.11 / 6.86 | 2.07 |
| medium | Captain Bramble | 8.31 | 1483.23 / 379.58 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 8.34 | 1469.39 / 390.24 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 7.10 | 1521.74 / 314.42 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 15.66 | 3196.35 / 270.18 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 17.54 | 3231.96 / 267.00 | 0.00 | 12.41 / 10.80 | 4.99 |
| hard | Captain Bramble | 13.83 | 2793.93 / 223.75 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 14.20 | 2899.39 / 241.00 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 13.46 | 3157.04 / 247.38 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed useful after hostile warning. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 31.00 | 84.8% | 3694 / 82 | 903 | 8422 / 0 |
| easy | Andromoss | 5.09 | 13.1% | 3521 / 20 | 902 | 0 / 0 |
| easy | Captain Bramble | 25.56 | 81.4% | 3721 / 74 | 904 | 5531 / 0 |
| easy | Duskmantle | 24.66 | 80.6% | 3762 / 67 | 902 | 5144 / 0 |
| easy | Sprig | 40.82 | 89.6% | 3264 / 127 | 901 | 12364 / 0 |
| medium | Sir Champignon | 35.81 | 75.6% | 6882 / 96 | 602 | 3692 / 331 |
| medium | Andromoss | 10.68 | 13.1% | 7405 / 23 | 606 | 531 / 499 |
| medium | Captain Bramble | 33.26 | 74.7% | 6647 / 85 | 602 | 3048 / 258 |
| medium | Duskmantle | 32.60 | 74.1% | 6670 / 87 | 601 | 3164 / 243 |
| medium | Sprig | 30.44 | 76.3% | 5683 / 87 | 602 | 3446 / 223 |
| hard | Sir Champignon | 54.80 | 71.3% | 12525 / 55 | 300 | 15602 / 3919 |
| hard | Andromoss | 19.27 | 8.9% | 14029 / 22 | 301 | 4954 / 4471 |
| hard | Captain Bramble | 54.70 | 74.6% | 11067 / 41 | 300 | 12240 / 2999 |
| hard | Duskmantle | 56.53 | 74.8% | 11356 / 54 | 300 | 12744 / 3181 |
| hard | Sprig | 39.60 | 65.8% | 10768 / 70 | 301 | 13960 / 4257 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --casting=opportunity --cast-profile=scaled --report=balance-tier-1`.
