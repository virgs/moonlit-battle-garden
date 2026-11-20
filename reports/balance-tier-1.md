# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep useful/urgent selected column, theft enemy charge, armor unarmored enemy mole, mark unmarked enemy mole, tending unextended own mole near escape. No refresh of active Sweep. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-20T03:22:03.825Z. Revision 80754e2 + working changes; config c8543e5d6a4c; simulation 4cb2da04504f5860; base seed 20261119. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨55.3% | 🟨42.2%* | 🟩69.3% | 🟨57.7% |
| Andromoss | 🟨44.7% | — | 🟨43.7% | 🟨47.3% | 🟨49.3%* |
| Captain Bramble | 🟨57.8%* | 🟨56.3% | — | 🟩75.0% | 🟨58.7% |
| Duskmantle | 🟥30.7% | 🟨52.7% | 🟥25.0% | — | 🟨42.2%* |
| Sprig | 🟨42.3% | 🟨50.7%* | 🟨41.3% | 🟨57.8%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨55.5% | 🟨53.5% | 🟩70.0% | 🟨59.5% |
| Andromoss | 🟨44.5% | — | 🟨44.0% | 🟨47.5% | 🟨47.0% |
| Captain Bramble | 🟨46.5% | 🟨56.0% | — | 🟩69.5% | 🟨54.5% |
| Duskmantle | 🟥30.0% | 🟨52.5% | 🟥30.5% | — | 🟥36.5% |
| Sprig | 🟨40.5% | 🟨53.0% | 🟨45.5% | 🟩63.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨59.0% | 🟨41.0% | 🟩74.5% | 🟨51.5% |
| Andromoss | 🟨41.0% | — | 🟨43.0% | 🟨48.0% | 🟨51.0% |
| Captain Bramble | 🟨59.0% | 🟨57.0% | — | 🟩78.0% | 🟨56.0% |
| Duskmantle | 🟥25.5% | 🟨52.0% | 🟥22.0% | — | 🟥38.0% |
| Sprig | 🟨48.5% | 🟨49.0% | 🟨44.0% | 🟩62.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨51.5% | 🟥32.0% | 🟩63.5% | 🟩62.0% |
| Andromoss | 🟨48.5% | — | 🟨44.0% | 🟨46.5% | 🟨50.0% |
| Captain Bramble | 🟩68.0% | 🟨56.0% | — | 🟩77.5% | 🟩65.5% |
| Duskmantle | 🟥36.5% | 🟨53.5% | 🟥22.5% | — | 🟨52.0% |
| Sprig | 🟥38.0% | 🟨50.0% | 🟥34.5% | 🟨48.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 53.5%, medium 41.0%, hard 32.0%; spread 21.5 points; observed favored-side flip.
- Andromoss vs Sprig: easy 47.0%, medium 51.0%, hard 50.0%; spread 4.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 36.5%, medium 38.0%, hard 52.0%; spread 15.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 46.7 | 120.5 | 1127/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 111 / 89 | 0 | 47.4 | 138.3 | 248/0/0/0 · 928/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 107 / 93 | 0 | 45.0 | 123.3 | 1043/0/0/0 · 1041/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 140 / 60 | 0 | 47.3 | 134.7 | 1063/0/0/0 · 1060/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 119 / 81 | 0 | 46.8 | 128.7 | 1117/0/0/0 · 988/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 59 left-side wins | 0 | 47.8 | 154.5 | 553/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 88 / 112 | 0 | 46.8 | 143.2 | 895/0/0/0 · 274/0/0/0 |
| easy | Andromoss / Duskmantle | 200 | 95 / 105 | 0 | 47.5 | 135.6 | 867/0/0/0 · 306/0/0/0 |
| easy | Andromoss / Sprig | 200 | 94 / 106 | 0 | 48.7 | 159.6 | 1048/0/0/0 · 154/0/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 57 left-side wins | 0 | 45.6 | 134.7 | 1083/0/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 139 / 61 | 0 | 44.5 | 134.1 | 1031/0/0/0 · 1066/0/0/0 |
| easy | Captain Bramble / Sprig | 200 | 109 / 91 | 0 | 46.5 | 127.0 | 1129/0/0/0 · 1022/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 55 left-side wins | 0 | 47.9 | 146.3 | 1102/0/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 73 / 127 | 0 | 48.0 | 121.2 | 1107/0/0/0 · 977/0/0/0 |
| easy | Sprig / Sprig | 100 | 63 left-side wins | 0 | 50.7 | 127.5 | 1013/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 60 left-side wins | 0 | 64.7 | 173.7 | 2181/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 118 / 82 | 0 | 57.5 | 152.3 | 333/0/0/0 · 1972/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 82 / 118 | 0 | 59.5 | 148.1 | 2039/0/0/0 · 2002/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 149 / 51 | 0 | 59.6 | 155.7 | 2045/0/0/0 · 1971/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 103 / 97 | 0 | 61.7 | 149.8 | 2037/0/0/0 · 1735/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 59.3 | 162.2 | 1188/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 86 / 114 | 0 | 56.4 | 152.0 | 1846/0/0/0 · 394/0/0/0 |
| medium | Andromoss / Duskmantle | 200 | 96 / 104 | 0 | 55.0 | 152.1 | 1886/0/0/0 · 400/0/0/0 |
| medium | Andromoss / Sprig | 200 | 102 / 98 | 0 | 58.4 | 162.2 | 2084/0/0/0 · 212/0/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 60 left-side wins | 0 | 56.1 | 145.2 | 1925/0/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 156 / 44 | 0 | 54.9 | 134.9 | 1856/0/0/0 · 1852/0/0/0 |
| medium | Captain Bramble / Sprig | 200 | 112 / 88 | 0 | 57.9 | 146.7 | 1948/0/0/0 · 1820/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 58 left-side wins | 0 | 57.5 | 146.2 | 2049/0/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 76 / 124 | 0 | 57.1 | 144.1 | 1969/0/0/0 · 1662/0/0/0 |
| medium | Sprig / Sprig | 100 | 55 left-side wins | 0 | 61.4 | 150.9 | 1768/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 51 left-side wins | 0 | 96.0 | 239.0 | 3954/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 103 / 97 | 0 | 84.2 | 220.1 | 458/0/0/0 · 3728/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 64 / 136 | 0 | 85.5 | 228.7 | 3580/0/0/0 · 3385/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 127 / 73 | 0 | 90.4 | 235.1 | 3759/0/0/0 · 3558/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 124 / 76 | 0 | 89.3 | 234.6 | 3951/0/0/0 · 3333/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 87.5 | 222.4 | 2393/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 88 / 112 | 0 | 83.8 | 218.7 | 3823/0/0/0 · 345/0/0/0 |
| hard | Andromoss / Duskmantle | 200 | 93 / 107 | 0 | 82.3 | 213.8 | 3822/0/0/0 · 348/0/0/0 |
| hard | Andromoss / Sprig | 200 | 100 / 100 | 0 | 85.3 | 221.8 | 3783/0/0/0 · 351/0/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 56 left-side wins | 0 | 80.2 | 195.1 | 3122/0/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 155 / 45 | 0 | 81.8 | 191.7 | 2993/0/0/0 · 3042/0/0/0 |
| hard | Captain Bramble / Sprig | 200 | 131 / 69 | 0 | 83.3 | 227.3 | 3597/0/0/0 · 3208/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 57 left-side wins | 0 | 80.3 | 186.3 | 3277/0/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 104 / 96 | 0 | 82.0 | 211.8 | 3416/0/0/0 · 2897/0/0/0 |
| hard | Sprig / Sprig | 100 | 51 left-side wins | 0 | 86.2 | 224.3 | 3318/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 477/800 (59.6%) | 0 | 4598/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 366/800 (45.8%) | 0 | 4291/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 453/800 (56.6%) | 0 | 4558/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 299/800 (37.4%) | 0 | 4641/0/0/0 | 2, 3, 4 |
| easy | Sprig | 405/800 (50.6%) | 0 | 4154/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 452/800 (56.5%) | 0 | 8635/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 366/800 (45.8%) | 0 | 8976/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 500/800 (62.5%) | 0 | 8125/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 275/800 (34.4%) | 0 | 8241/0/0/0 | 2, 3, 4 |
| medium | Sprig | 407/800 (50.9%) | 0 | 7197/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 418/800 (52.3%) | 0 | 15702/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 378/800 (47.3%) | 0 | 17549/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 534/800 (66.8%) | 0 | 13442/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 329/800 (41.1%) | 0 | 13641/0/0/0 | 2, 3, 4 |
| hard | Sprig | 341/800 (42.6%) | 0 | 13107/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 4.34 | 802.49 / 1337.78 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 4.67 | 776.99 / 1833.09 | 0.00 | 4.67 / 4.67 | 0.00 |
| easy | Captain Bramble | 4.34 | 742.96 / 1300.34 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 4.42 | 729.15 / 1376.94 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 3.93 | 773.94 / 1308.64 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 8.07 | 1615.96 / 406.14 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 9.73 | 1666.42 / 495.11 | 0.00 | 9.73 / 9.73 | 0.00 |
| medium | Captain Bramble | 7.75 | 1496.58 / 377.38 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 7.74 | 1479.83 / 401.85 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 6.79 | 1529.79 / 325.39 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 14.69 | 3287.86 / 282.04 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 18.95 | 3446.86 / 274.68 | 0.00 | 18.95 / 18.95 | 0.00 |
| hard | Captain Bramble | 12.90 | 2975.27 / 244.25 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 12.96 | 2990.41 / 250.18 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 12.24 | 3182.96 / 251.12 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed useful after hostile warning. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 28.11 | 84.2% | 3471 / 82 | 903 | 6626 / 0 |
| easy | Andromoss | 5.43 | 13.4% | 3738 / 26 | 903 | 0 / 0 |
| easy | Captain Bramble | 23.95 | 81.6% | 3475 / 60 | 902 | 5039 / 0 |
| easy | Duskmantle | 23.30 | 80.7% | 3539 / 58 | 902 | 4776 / 0 |
| easy | Sprig | 38.59 | 89.4% | 3141 / 141 | 902 | 10970 / 0 |
| medium | Sir Champignon | 34.14 | 76.1% | 6454 / 85 | 601 | 3541 / 289 |
| medium | Andromoss | 11.26 | 13.2% | 7788 / 27 | 605 | 657 / 603 |
| medium | Captain Bramble | 31.67 | 75.3% | 6200 / 67 | 602 | 2781 / 224 |
| medium | Duskmantle | 31.34 | 75.0% | 6192 / 79 | 602 | 3494 / 238 |
| medium | Sprig | 28.53 | 75.9% | 5429 / 83 | 601 | 3109 / 203 |
| hard | Sir Champignon | 52.03 | 71.6% | 11748 / 54 | 301 | 15056 / 3744 |
| hard | Andromoss | 20.75 | 8.6% | 15156 / 15 | 301 | 5797 / 5266 |
| hard | Captain Bramble | 53.24 | 75.7% | 10320 / 47 | 301 | 11918 / 2826 |
| hard | Duskmantle | 53.83 | 75.8% | 10364 / 64 | 300 | 12864 / 3012 |
| hard | Sprig | 37.09 | 66.8% | 9789 / 52 | 301 | 12867 / 3793 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --casting=opportunity --cast-profile=scaled --report=balance-tier-1`.
