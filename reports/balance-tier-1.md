# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Guards unguarded own mole near escape; rabbit pressure visible enemy target/no active pressure; mark unmarked enemy mole; tending unextended own mole near escape. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-20T23:41:50.720Z. Revision 39fce99 + working changes; config 11554567b230; simulation 629810c0772b8b08; base seed 20261119. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩69.0%* | 🟨50.0% | 🟩77.2%* | 🟨58.2%* |
| Andromoss | 🟥31.0%* | — | 🟥31.0%* | 🟨48.8%* | 🟥38.5% |
| Captain Bramble | 🟨50.0% | 🟩69.0%* | — | 🟩77.2%* | 🟨58.2%* |
| Duskmantle | 🟥22.8%* | 🟨51.2%* | 🟥22.8%* | — | 🟨42.2%* |
| Sprig | 🟨41.8%* | 🟩61.5% | 🟨41.8%* | 🟨57.8%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨46.0% | 🟨50.0% | 🟨59.5% | 🟨43.5% |
| Andromoss | 🟨54.0% | — | 🟨54.0% | 🟨59.0% | 🟨42.5% |
| Captain Bramble | 🟨50.0% | 🟨46.0% | — | 🟨59.5% | 🟨43.5% |
| Duskmantle | 🟨40.5% | 🟨41.0% | 🟨40.5% | — | 🟥36.5% |
| Sprig | 🟨56.5% | 🟨57.5% | 🟨56.5% | 🟩63.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩74.5% | 🟨50.0% | 🟩80.5% | 🟨51.5% |
| Andromoss | 🟥25.5% | — | 🟥25.5% | 🟨48.5% | 🟥32.5% |
| Captain Bramble | 🟨50.0% | 🟩74.5% | — | 🟩80.5% | 🟨51.5% |
| Duskmantle | 🟥19.5% | 🟨51.5% | 🟥19.5% | — | 🟥38.0% |
| Sprig | 🟨48.5% | 🟩67.5% | 🟨48.5% | 🟩62.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩86.5% | 🟨50.0% | 🟩91.5% | 🟩79.5% |
| Andromoss | 🟥13.5% | — | 🟥13.5% | 🟥39.0% | 🟨40.5% |
| Captain Bramble | 🟨50.0% | 🟩86.5% | — | 🟩91.5% | 🟩79.5% |
| Duskmantle | 🟥8.5% | 🟩61.0% | 🟥8.5% | — | 🟨52.0% |
| Sprig | 🟥20.5% | 🟨59.5% | 🟥20.5% | 🟨48.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 46.0%, medium 74.5%, hard 86.5%; spread 40.5 points; observed favored-side flip.
- Sir Champignon vs Duskmantle: easy 59.5%, medium 80.5%, hard 91.5%; spread 32.0 points.
- Sir Champignon vs Sprig: easy 43.5%, medium 51.5%, hard 79.5%; spread 36.0 points; observed favored-side flip.
- Andromoss vs Captain Bramble: easy 54.0%, medium 25.5%, hard 13.5%; spread 40.5 points; observed favored-side flip.
- Andromoss vs Duskmantle: easy 59.0%, medium 48.5%, hard 39.0%; spread 20.0 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 59.5%, medium 80.5%, hard 91.5%; spread 32.0 points.
- Captain Bramble vs Sprig: easy 43.5%, medium 51.5%, hard 79.5%; spread 36.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 36.5%, medium 38.0%, hard 52.0%; spread 15.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 65 left-side wins | 0 | 48.8 | 139.3 | 949/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 92 / 108 | 0 | 46.5 | 145.2 | 958/0/0/0 · 1026/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 100 / 100 | 0 | 48.8 | 139.3 | 949/0/0/0 · 949/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 119 / 81 | 0 | 47.5 | 133.7 | 954/0/0/0 · 1057/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 87 / 113 | 0 | 50.5 | 127.0 | 1017/0/0/0 · 1041/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 48.7 | 145.3 | 1021/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 108 / 92 | 0 | 46.5 | 145.2 | 1026/0/0/0 · 958/0/0/0 |
| easy | Andromoss / Duskmantle | 200 | 118 / 82 | 0 | 42.9 | 135.2 | 970/0/0/0 · 1049/0/0/0 |
| easy | Andromoss / Sprig | 200 | 85 / 115 | 0 | 48.1 | 129.0 | 1025/0/0/0 · 996/0/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 65 left-side wins | 0 | 48.8 | 139.3 | 949/0/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 119 / 81 | 0 | 47.5 | 133.7 | 954/0/0/0 · 1057/0/0/0 |
| easy | Captain Bramble / Sprig | 200 | 87 / 113 | 0 | 50.5 | 127.0 | 1017/0/0/0 · 1041/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 55 left-side wins | 0 | 47.9 | 146.3 | 1102/0/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 73 / 127 | 0 | 48.0 | 121.2 | 1107/0/0/0 · 977/0/0/0 |
| easy | Sprig / Sprig | 100 | 63 left-side wins | 0 | 50.7 | 127.5 | 1013/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 52 left-side wins | 0 | 76.7 | 175.9 | 1995/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 149 / 51 | 0 | 64.0 | 158.1 | 1845/0/0/0 · 1959/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 100 / 100 | 0 | 76.7 | 175.9 | 1995/0/0/0 · 1995/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 161 / 39 | 0 | 61.5 | 148.6 | 1677/0/0/0 · 2038/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 103 / 97 | 0 | 62.6 | 155.3 | 1623/0/0/0 · 1725/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 59.0 | 137.8 | 1801/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 51 / 149 | 0 | 64.0 | 158.1 | 1959/0/0/0 · 1845/0/0/0 |
| medium | Andromoss / Duskmantle | 200 | 97 / 103 | 0 | 59.0 | 161.6 | 1892/0/0/0 · 2085/0/0/0 |
| medium | Andromoss / Sprig | 200 | 65 / 135 | 0 | 63.3 | 154.1 | 1843/0/0/0 · 1726/0/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 52 left-side wins | 0 | 76.7 | 175.9 | 1995/0/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 161 / 39 | 0 | 61.5 | 148.6 | 1677/0/0/0 · 2038/0/0/0 |
| medium | Captain Bramble / Sprig | 200 | 103 / 97 | 0 | 62.6 | 155.3 | 1623/0/0/0 · 1725/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 58 left-side wins | 0 | 57.5 | 146.2 | 2049/0/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 76 / 124 | 0 | 57.1 | 144.1 | 1969/0/0/0 · 1662/0/0/0 |
| medium | Sprig / Sprig | 100 | 55 left-side wins | 0 | 61.4 | 150.9 | 1768/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 56 left-side wins | 0 | 109.2 | 260.2 | 3521/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 173 / 27 | 0 | 86.5 | 222.4 | 2714/0/0/0 · 3288/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 100 / 100 | 0 | 109.2 | 260.2 | 3521/0/0/0 · 3521/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 183 / 17 | 0 | 87.1 | 197.7 | 2403/0/0/0 · 3450/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 159 / 41 | 0 | 92.9 | 237.3 | 2935/0/0/0 · 3622/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 55 left-side wins | 0 | 85.2 | 224.2 | 3197/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 27 / 173 | 0 | 86.5 | 222.4 | 3288/0/0/0 · 2714/0/0/0 |
| hard | Andromoss / Duskmantle | 200 | 78 / 122 | 0 | 83.3 | 203.6 | 3045/0/0/0 · 3403/0/0/0 |
| hard | Andromoss / Sprig | 200 | 81 / 119 | 0 | 87.2 | 231.2 | 3438/0/0/0 · 3341/0/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 56 left-side wins | 0 | 109.2 | 260.2 | 3521/0/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 183 / 17 | 0 | 87.1 | 197.7 | 2403/0/0/0 · 3450/0/0/0 |
| hard | Captain Bramble / Sprig | 200 | 159 / 41 | 0 | 92.9 | 237.3 | 2935/0/0/0 · 3622/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 57 left-side wins | 0 | 80.3 | 186.3 | 3277/0/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 104 / 96 | 0 | 82.0 | 211.8 | 3416/0/0/0 · 2897/0/0/0 |
| hard | Sprig / Sprig | 100 | 51 left-side wins | 0 | 86.2 | 224.3 | 3318/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 398/800 (49.8%) | 0 | 4827/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 419/800 (52.4%) | 0 | 5068/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 398/800 (49.8%) | 0 | 4827/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 317/800 (39.6%) | 0 | 5372/0/0/0 | 2, 3, 4 |
| easy | Sprig | 468/800 (58.5%) | 0 | 5068/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 513/800 (64.1%) | 0 | 9135/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 264/800 (33.0%) | 0 | 9454/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 513/800 (64.1%) | 0 | 9135/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 257/800 (32.1%) | 0 | 10179/0/0/0 | 2, 3, 4 |
| medium | Sprig | 453/800 (56.6%) | 0 | 8606/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 615/800 (76.9%) | 0 | 15094/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 213/800 (26.6%) | 0 | 16256/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 615/800 (76.9%) | 0 | 15094/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 260/800 (32.5%) | 0 | 16996/0/0/0 | 2, 3, 4 |
| hard | Sprig | 297/800 (37.1%) | 0 | 16800/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 4.85 | 762.11 / 1399.16 | 83.19 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 5.06 | 757.02 / 1397.42 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Captain Bramble | 4.85 | 762.11 / 1399.16 | 83.19 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 5.34 | 736.01 / 1340.42 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 5.07 | 807.28 / 1154.73 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 8.93 | 1627.41 / 353.45 | 151.41 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 9.57 | 1595.79 / 465.73 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Captain Bramble | 8.93 | 1627.41 / 353.45 | 151.41 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 10.16 | 1528.34 / 415.31 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 8.55 | 1523.39 / 278.98 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 14.47 | 3465.07 / 68.44 | 237.82 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 16.32 | 3143.27 / 262.15 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Captain Bramble | 14.47 | 3465.07 / 68.44 | 237.82 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 17.15 | 2914.24 / 232.74 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 16.85 | 3391.11 / 252.15 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed benefit from the cast. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 40.01 | 87.5% | 3878 / 120 | 901 | 6771 / 0 |
| easy | Andromoss | 34.44 | 85.0% | 4047 / 86 | 901 | 8361 / 0 |
| easy | Captain Bramble | 40.01 | 87.5% | 3878 / 120 | 901 | 6771 / 0 |
| easy | Duskmantle | 28.64 | 81.1% | 4270 / 65 | 899 | 6720 / 0 |
| easy | Sprig | 52.10 | 89.9% | 4055 / 153 | 902 | 16328 / 0 |
| medium | Sir Champignon | 43.65 | 79.2% | 7140 / 136 | 602 | 7566 / 567 |
| medium | Andromoss | 43.20 | 77.5% | 7653 / 116 | 601 | 7978 / 561 |
| medium | Captain Bramble | 43.65 | 79.2% | 7140 / 136 | 602 | 7566 / 567 |
| medium | Duskmantle | 38.98 | 73.5% | 8130 / 129 | 602 | 5128 / 368 |
| medium | Sprig | 35.76 | 75.8% | 6838 / 97 | 601 | 5073 / 301 |
| hard | Sir Champignon | 45.73 | 68.2% | 11573 / 70 | 301 | 18886 / 5446 |
| hard | Andromoss | 63.91 | 74.3% | 13059 / 93 | 300 | 17884 / 4476 |
| hard | Captain Bramble | 45.73 | 68.2% | 11573 / 70 | 301 | 18886 / 5446 |
| hard | Duskmantle | 63.83 | 73.0% | 13719 / 67 | 300 | 16221 / 4252 |
| hard | Sprig | 51.56 | 67.2% | 13482 / 65 | 300 | 20052 / 6103 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --casting=opportunity --cast-profile=scaled --report=balance-tier-1`.
