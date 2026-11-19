# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep useful/urgent selected column, theft enemy charge, armor unarmored enemy mole, mark unmarked enemy mole, tending unextended own mole near escape. No refresh of an active Sweep. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell powers unchanged.

Generated 2026-11-19T23:42:22.058Z. Revision cb19384 + working changes; config 06446be3aa7e; simulation 086b8456c794be14; base seed 20261119. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.8% | 🟨46.5%* | 🟩71.0% | 🟨60.0% |
| Andromoss | 🟥38.2% | — | 🟥31.0% | 🟨41.8% | 🟨41.8% |
| Captain Bramble | 🟨53.5%* | 🟩69.0% | — | 🟩74.0% | 🟨57.8% |
| Duskmantle | 🟥29.0% | 🟨58.2% | 🟥26.0% | — | 🟨43.3%* |
| Sprig | 🟨40.0% | 🟨58.2% | 🟨42.2% | 🟨56.7%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩64.5% | 🟩62.0% | 🟩71.0% | 🟩63.5% |
| Andromoss | 🟥35.5% | — | 🟥35.5% | 🟨41.0% | 🟨41.5% |
| Captain Bramble | 🟥38.0% | 🟩64.5% | — | 🟩65.5% | 🟨53.0% |
| Duskmantle | 🟥29.0% | 🟨59.0% | 🟥34.5% | — | 🟥35.0% |
| Sprig | 🟥36.5% | 🟨58.5% | 🟨47.0% | 🟩65.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.0% | 🟨44.0% | 🟩74.5% | 🟨54.0% |
| Andromoss | 🟥39.0% | — | 🟥30.5% | 🟨41.5% | 🟨42.0% |
| Captain Bramble | 🟨56.0% | 🟩69.5% | — | 🟩79.0% | 🟨54.5% |
| Duskmantle | 🟥25.5% | 🟨58.5% | 🟥21.0% | — | 🟥39.0% |
| Sprig | 🟨46.0% | 🟨58.0% | 🟨45.5% | 🟩61.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨60.0% | 🟥33.5% | 🟩67.5% | 🟩62.5% |
| Andromoss | 🟨40.0% | — | 🟥27.0% | 🟨43.0% | 🟨42.0% |
| Captain Bramble | 🟩66.5% | 🟩73.0% | — | 🟩77.5% | 🟩66.0% |
| Duskmantle | 🟥32.5% | 🟨57.0% | 🟥22.5% | — | 🟨56.0% |
| Sprig | 🟥37.5% | 🟨58.0% | 🟥34.0% | 🟨44.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 62.0%, medium 44.0%, hard 33.5%; spread 28.5 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 35.0%, medium 39.0%, hard 56.0%; spread 21.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 46.7 | 120.5 | 1127/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 129 / 71 | 0 | 46.8 | 137.1 | 480/0/0/0 · 883/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 124 / 76 | 0 | 48.5 | 133.3 | 1114/0/0/0 · 1087/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 142 / 58 | 0 | 46.6 | 118.9 | 1018/0/0/0 · 1044/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 127 / 73 | 0 | 46.2 | 125.8 | 1102/0/0/0 · 976/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 59 left-side wins | 0 | 48.0 | 153.3 | 547/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 71 / 129 | 0 | 48.4 | 148.4 | 818/0/0/0 · 516/0/0/0 |
| easy | Andromoss / Duskmantle | 200 | 82 / 118 | 0 | 46.6 | 141.6 | 831/0/0/0 · 551/0/0/0 |
| easy | Andromoss / Sprig | 200 | 83 / 117 | 0 | 50.3 | 151.8 | 1014/0/0/0 · 268/0/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 58 left-side wins | 0 | 50.1 | 161.8 | 1167/0/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 131 / 69 | 0 | 45.3 | 138.9 | 1080/0/0/0 · 1097/0/0/0 |
| easy | Captain Bramble / Sprig | 200 | 106 / 94 | 0 | 48.0 | 129.4 | 1119/0/0/0 · 1016/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 44.6 | 139.6 | 1081/0/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 70 / 130 | 0 | 49.1 | 121.2 | 1101/0/0/0 · 983/0/0/0 |
| easy | Sprig / Sprig | 100 | 68 left-side wins | 0 | 50.3 | 147.3 | 1046/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 60 left-side wins | 0 | 64.7 | 173.7 | 2181/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 122 / 78 | 0 | 57.5 | 150.9 | 822/0/0/0 · 1830/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 88 / 112 | 0 | 59.0 | 155.4 | 2071/0/0/0 · 2017/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 149 / 51 | 0 | 59.7 | 155.5 | 2000/0/0/0 · 1946/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 108 / 92 | 0 | 61.5 | 157.8 | 2056/0/0/0 · 1762/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 59.3 | 159.6 | 1154/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 61 / 139 | 0 | 55.4 | 137.8 | 1703/0/0/0 · 893/0/0/0 |
| medium | Andromoss / Duskmantle | 200 | 83 / 117 | 0 | 57.3 | 157.9 | 1801/0/0/0 · 928/0/0/0 |
| medium | Andromoss / Sprig | 200 | 84 / 116 | 0 | 58.4 | 150.4 | 2009/0/0/0 · 501/0/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 62 left-side wins | 0 | 58.4 | 148.5 | 1994/0/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 158 / 42 | 0 | 57.0 | 141.5 | 1919/0/0/0 · 1923/0/0/0 |
| medium | Captain Bramble / Sprig | 200 | 109 / 91 | 0 | 60.8 | 163.3 | 2112/0/0/0 · 1909/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 56.0 | 150.9 | 2030/0/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 78 / 122 | 0 | 58.3 | 144.3 | 1975/0/0/0 · 1651/0/0/0 |
| medium | Sprig / Sprig | 100 | 56 left-side wins | 0 | 60.7 | 153.8 | 1825/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 51 left-side wins | 0 | 96.0 | 239.0 | 3954/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 120 / 80 | 0 | 85.4 | 235.8 | 1614/0/0/0 · 3693/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 67 / 133 | 0 | 85.4 | 202.0 | 3395/0/0/0 · 3164/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 135 / 65 | 0 | 86.8 | 225.1 | 3546/0/0/0 · 3394/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 125 / 75 | 0 | 88.5 | 235.9 | 3967/0/0/0 · 3379/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 87.5 | 220.9 | 2278/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 54 / 146 | 0 | 82.3 | 204.8 | 3275/0/0/0 · 1386/0/0/0 |
| hard | Andromoss / Duskmantle | 200 | 86 / 114 | 0 | 84.3 | 227.0 | 3598/0/0/0 · 1546/0/0/0 |
| hard | Andromoss / Sprig | 200 | 84 / 116 | 0 | 85.0 | 220.8 | 3578/0/0/0 · 1294/0/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 55 left-side wins | 0 | 81.8 | 224.7 | 3329/0/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 155 / 45 | 0 | 80.3 | 185.6 | 2876/0/0/0 · 2873/0/0/0 |
| hard | Captain Bramble / Sprig | 200 | 132 / 68 | 0 | 86.3 | 217.8 | 3543/0/0/0 · 3179/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 52 left-side wins | 0 | 83.7 | 219.8 | 3684/0/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 112 / 88 | 0 | 83.2 | 218.3 | 3587/0/0/0 · 3038/0/0/0 |
| hard | Sprig / Sprig | 100 | 52 left-side wins | 0 | 87.5 | 224.9 | 3553/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 522/800 (65.3%) | 0 | 4841/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 307/800 (38.4%) | 0 | 4093/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 442/800 (55.3%) | 0 | 4969/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 315/800 (39.4%) | 0 | 4874/0/0/0 | 2, 3, 4 |
| easy | Sprig | 414/800 (51.7%) | 0 | 4289/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 467/800 (58.4%) | 0 | 9130/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 306/800 (38.3%) | 0 | 8497/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 518/800 (64.8%) | 0 | 8935/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 288/800 (36.0%) | 0 | 8802/0/0/0 | 2, 3, 4 |
| medium | Sprig | 421/800 (52.6%) | 0 | 7648/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 447/800 (55.9%) | 0 | 16476/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 304/800 (38.0%) | 0 | 16422/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 566/800 (70.8%) | 0 | 14298/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 336/800 (42.0%) | 0 | 15084/0/0/0 | 2, 3, 4 |
| hard | Sprig | 347/800 (43.4%) | 0 | 14443/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 4.64 | 807.65 / 1405.46 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 4.43 | 766.90 / 1773.28 | 0.00 | 3.51 / 3.49 | 0.88 |
| easy | Captain Bramble | 4.75 | 753.66 / 1596.87 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 4.74 | 733.76 / 1458.23 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 4.05 | 781.47 / 1304.99 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 8.69 | 1593.32 / 391.88 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 9.18 | 1585.88 / 454.62 | 0.00 | 7.01 / 6.79 | 2.08 |
| medium | Captain Bramble | 8.68 | 1507.81 / 385.88 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 8.46 | 1482.09 / 394.18 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 7.28 | 1555.31 / 334.93 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 15.65 | 3201.06 / 267.23 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 17.68 | 3265.76 / 271.62 | 0.00 | 12.53 / 10.90 | 5.01 |
| hard | Captain Bramble | 13.71 | 2780.55 / 224.19 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 14.25 | 2918.46 / 241.97 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 13.61 | 3190.98 / 252.95 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed useful after hostile warning. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 30.81 | 84.6% | 3714 / 71 | 903 | 8288 / 0 |
| easy | Andromoss | 5.12 | 12.9% | 3546 / 20 | 902 | 0 / 0 |
| easy | Captain Bramble | 27.55 | 82.4% | 3802 / 68 | 903 | 6678 / 0 |
| easy | Duskmantle | 25.03 | 80.7% | 3793 / 70 | 902 | 5403 / 0 |
| easy | Sprig | 36.51 | 88.5% | 3243 / 119 | 904 | 8751 / 0 |
| medium | Sir Champignon | 35.77 | 75.4% | 6949 / 105 | 601 | 3643 / 346 |
| medium | Andromoss | 10.59 | 13.1% | 7343 / 18 | 605 | 508 / 474 |
| medium | Captain Bramble | 33.71 | 73.9% | 6941 / 85 | 601 | 3224 / 285 |
| medium | Duskmantle | 32.99 | 74.0% | 6772 / 77 | 601 | 3180 / 262 |
| medium | Sprig | 31.17 | 76.4% | 5823 / 71 | 601 | 3431 / 257 |
| hard | Sir Champignon | 54.48 | 71.1% | 12522 / 61 | 300 | 15627 / 3926 |
| hard | Andromoss | 19.46 | 9.0% | 14144 / 25 | 302 | 5089 / 4594 |
| hard | Captain Bramble | 54.84 | 74.8% | 10969 / 67 | 301 | 11974 / 2914 |
| hard | Duskmantle | 56.60 | 74.7% | 11400 / 60 | 300 | 13336 / 3312 |
| hard | Sprig | 40.33 | 66.1% | 10890 / 62 | 301 | 14342 / 4341 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --casting=opportunity --cast-profile=scaled --report=balance-tier-1`.
