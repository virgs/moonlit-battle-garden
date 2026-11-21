# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Guards unguarded own mole near escape; rabbit pressure visible enemy target/no active pressure; marks visible unmarked enemy mole/no outstanding marks or ward; tending unextended own mole near escape. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-21T03:56:37.885Z. Revision e9faf67 + working changes; config 26bdb9b0a7e5; simulation f5fce78d977f08ab; base seed 20261118. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩72.0%* | 🟨50.0% | 🟩77.2%* | 🟨57.8%* |
| Andromoss | 🟥28.0%* | — | 🟥28.0%* | 🟨49.0%* | 🟥39.2% |
| Captain Bramble | 🟨50.0% | 🟩72.0%* | — | 🟩77.2%* | 🟨57.8%* |
| Duskmantle | 🟥22.8%* | 🟨51.0%* | 🟥22.8%* | — | 🟥37.0% |
| Sprig | 🟨42.2%* | 🟩60.8% | 🟨42.2%* | 🟩63.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.0% | 🟨50.0% | 🟨59.5% | 🟨43.0% |
| Andromoss | 🟨50.0% | — | 🟨50.0% | 🟨52.0% | 🟨42.0% |
| Captain Bramble | 🟨50.0% | 🟨50.0% | — | 🟨59.5% | 🟨43.0% |
| Duskmantle | 🟨40.5% | 🟨48.0% | 🟨40.5% | — | 🟥36.0% |
| Sprig | 🟨57.0% | 🟨58.0% | 🟨57.0% | 🟩64.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩77.5% | 🟨50.0% | 🟩78.0% | 🟨51.0% |
| Andromoss | 🟥22.5% | — | 🟥22.5% | 🟨49.0% | 🟥37.0% |
| Captain Bramble | 🟨50.0% | 🟩77.5% | — | 🟩78.0% | 🟨51.0% |
| Duskmantle | 🟥22.0% | 🟨51.0% | 🟥22.0% | — | 🟥33.5% |
| Sprig | 🟨49.0% | 🟩63.0% | 🟨49.0% | 🟩66.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩88.5% | 🟨50.0% | 🟩94.0% | 🟩79.5% |
| Andromoss | 🟥11.5% | — | 🟥11.5% | 🟨46.0% | 🟥38.5% |
| Captain Bramble | 🟨50.0% | 🟩88.5% | — | 🟩94.0% | 🟩79.5% |
| Duskmantle | 🟥6.0% | 🟨54.0% | 🟥6.0% | — | 🟨41.5% |
| Sprig | 🟥20.5% | 🟩61.5% | 🟥20.5% | 🟨58.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 50.0%, medium 77.5%, hard 88.5%; spread 38.5 points.
- Sir Champignon vs Duskmantle: easy 59.5%, medium 78.0%, hard 94.0%; spread 34.5 points.
- Sir Champignon vs Sprig: easy 43.0%, medium 51.0%, hard 79.5%; spread 36.5 points; observed favored-side flip.
- Andromoss vs Captain Bramble: easy 50.0%, medium 22.5%, hard 11.5%; spread 38.5 points.
- Andromoss vs Duskmantle: easy 52.0%, medium 49.0%, hard 46.0%; spread 6.0 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 59.5%, medium 78.0%, hard 94.0%; spread 34.5 points.
- Captain Bramble vs Sprig: easy 43.0%, medium 51.0%, hard 79.5%; spread 36.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 65 left-side wins | 0 | 48.8 | 139.6 | 950/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 100 / 100 | 0 | 48.3 | 134.7 | 1042/0/0/0 · 1059/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 100 / 100 | 0 | 48.8 | 139.6 | 950/0/0/0 · 950/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 119 / 81 | 0 | 48.7 | 148.5 | 990/0/0/0 · 1117/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 86 / 114 | 0 | 50.3 | 127.0 | 1015/0/0/0 · 1038/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 59 left-side wins | 0 | 48.4 | 156.2 | 1003/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 100 / 100 | 0 | 48.3 | 134.7 | 1059/0/0/0 · 1042/0/0/0 |
| easy | Andromoss / Duskmantle | 200 | 104 / 96 | 0 | 49.0 | 139.8 | 1033/0/0/0 · 1134/0/0/0 |
| easy | Andromoss / Sprig | 200 | 84 / 116 | 0 | 49.2 | 125.5 | 1112/0/0/0 · 1047/0/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 65 left-side wins | 0 | 48.8 | 139.6 | 950/0/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 119 / 81 | 0 | 48.7 | 148.5 | 990/0/0/0 · 1117/0/0/0 |
| easy | Captain Bramble / Sprig | 200 | 86 / 114 | 0 | 50.3 | 127.0 | 1015/0/0/0 · 1038/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 53 left-side wins | 0 | 48.9 | 146.0 | 1099/0/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 72 / 128 | 0 | 48.5 | 125.7 | 1119/0/0/0 · 972/0/0/0 |
| easy | Sprig / Sprig | 100 | 64 left-side wins | 0 | 50.4 | 125.5 | 1010/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 52 left-side wins | 0 | 76.8 | 175.9 | 1990/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 155 / 45 | 0 | 59.0 | 155.4 | 1737/0/0/0 · 1909/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 100 / 100 | 0 | 76.8 | 175.9 | 1990/0/0/0 · 1990/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 156 / 44 | 0 | 62.1 | 143.8 | 1659/0/0/0 · 2037/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 102 / 98 | 0 | 63.6 | 155.4 | 1622/0/0/0 · 1725/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 53 left-side wins | 0 | 60.5 | 153.6 | 1896/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 45 / 155 | 0 | 59.0 | 155.4 | 1909/0/0/0 · 1737/0/0/0 |
| medium | Andromoss / Duskmantle | 200 | 98 / 102 | 0 | 58.0 | 159.9 | 1884/0/0/0 · 2086/0/0/0 |
| medium | Andromoss / Sprig | 200 | 74 / 126 | 0 | 59.5 | 155.4 | 1809/0/0/0 · 1660/0/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 52 left-side wins | 0 | 76.8 | 175.9 | 1990/0/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 156 / 44 | 0 | 62.1 | 143.8 | 1659/0/0/0 · 2037/0/0/0 |
| medium | Captain Bramble / Sprig | 200 | 102 / 98 | 0 | 63.6 | 155.4 | 1622/0/0/0 · 1725/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 57 left-side wins | 0 | 59.8 | 169.6 | 2185/0/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 67 / 133 | 0 | 59.1 | 146.9 | 1944/0/0/0 · 1642/0/0/0 |
| medium | Sprig / Sprig | 100 | 54 left-side wins | 0 | 61.6 | 150.9 | 1772/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 55 left-side wins | 0 | 109.2 | 261.3 | 3527/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 177 / 23 | 0 | 85.4 | 205.2 | 2419/0/0/0 · 3010/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 100 / 100 | 0 | 109.2 | 261.3 | 3527/0/0/0 · 3527/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 188 / 12 | 0 | 88.2 | 209.1 | 2495/0/0/0 · 3568/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 159 / 41 | 0 | 92.7 | 237.3 | 2936/0/0/0 · 3621/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 50 left-side wins | 0 | 84.7 | 230.3 | 3283/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 23 / 177 | 0 | 85.4 | 205.2 | 3010/0/0/0 · 2419/0/0/0 |
| hard | Andromoss / Duskmantle | 200 | 92 / 108 | 0 | 88.6 | 238.7 | 3393/0/0/0 · 3822/0/0/0 |
| hard | Andromoss / Sprig | 200 | 77 / 123 | 0 | 86.0 | 232.1 | 3334/0/0/0 · 3198/0/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 55 left-side wins | 0 | 109.2 | 261.3 | 3527/0/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 188 / 12 | 0 | 88.2 | 209.1 | 2495/0/0/0 · 3568/0/0/0 |
| hard | Captain Bramble / Sprig | 200 | 159 / 41 | 0 | 92.7 | 237.3 | 2936/0/0/0 · 3621/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 57 left-side wins | 0 | 81.7 | 222.6 | 3575/0/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 83 / 117 | 0 | 83.7 | 225.5 | 3690/0/0/0 · 3148/0/0/0 |
| hard | Sprig / Sprig | 100 | 50 left-side wins | 0 | 86.4 | 221.8 | 3304/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 405/800 (50.6%) | 0 | 4947/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 388/800 (48.5%) | 0 | 5266/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 405/800 (50.6%) | 0 | 4947/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 330/800 (41.3%) | 0 | 5586/0/0/0 | 2, 3, 4 |
| easy | Sprig | 472/800 (59.0%) | 0 | 5105/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 513/800 (64.1%) | 0 | 8998/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 262/800 (32.8%) | 0 | 9407/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 513/800 (64.1%) | 0 | 8998/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 257/800 (32.1%) | 0 | 10289/0/0/0 | 2, 3, 4 |
| medium | Sprig | 455/800 (56.9%) | 0 | 8524/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 624/800 (78.0%) | 0 | 14904/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 215/800 (26.9%) | 0 | 16030/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 624/800 (78.0%) | 0 | 14904/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 215/800 (26.9%) | 0 | 18223/0/0/0 | 2, 3, 4 |
| hard | Sprig | 322/800 (40.3%) | 0 | 16892/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 5.00 | 772.17 / 1446.49 | 83.98 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 5.33 | 782.20 / 1468.54 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Captain Bramble | 5.00 | 772.17 / 1446.49 | 83.98 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 5.61 | 766.24 / 1434.90 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 5.12 | 813.69 / 1074.55 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 8.76 | 1619.41 / 341.18 | 143.25 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 9.39 | 1573.88 / 445.01 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Captain Bramble | 8.76 | 1619.41 / 341.18 | 143.25 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 10.13 | 1530.91 / 412.63 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 8.44 | 1515.87 / 270.05 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 14.22 | 3435.15 / 64.86 | 223.34 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 15.93 | 3077.04 / 245.97 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Captain Bramble | 14.22 | 3435.15 / 64.86 | 223.34 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 18.31 | 3136.46 / 251.51 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 16.98 | 3428.17 / 241.83 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed benefit from the cast. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 40.47 | 87.3% | 3997 / 122 | 900 | 7104 / 0 |
| easy | Andromoss | 37.90 | 85.6% | 4263 / 108 | 901 | 9458 / 0 |
| easy | Captain Bramble | 40.47 | 87.3% | 3997 / 122 | 900 | 7104 / 0 |
| easy | Duskmantle | 31.19 | 81.7% | 4487 / 73 | 902 | 7817 / 0 |
| easy | Sprig | 55.41 | 90.4% | 4095 / 159 | 902 | 18335 / 0 |
| medium | Sir Champignon | 42.35 | 78.9% | 7008 / 130 | 602 | 6794 / 546 |
| medium | Andromoss | 43.51 | 78.0% | 7511 / 151 | 601 | 8560 / 498 |
| medium | Captain Bramble | 42.35 | 78.9% | 7008 / 130 | 602 | 6794 / 546 |
| medium | Duskmantle | 37.96 | 73.0% | 8104 / 103 | 603 | 4530 / 360 |
| medium | Sprig | 35.39 | 75.9% | 6752 / 86 | 602 | 4535 / 293 |
| hard | Sir Champignon | 45.28 | 68.4% | 11377 / 68 | 300 | 18781 / 5337 |
| hard | Andromoss | 63.10 | 74.5% | 12747 / 103 | 300 | 16642 / 4142 |
| hard | Captain Bramble | 45.28 | 68.4% | 11377 / 68 | 300 | 18781 / 5337 |
| hard | Duskmantle | 67.97 | 72.9% | 14648 / 69 | 300 | 18535 / 4944 |
| hard | Sprig | 52.09 | 67.2% | 13588 / 70 | 300 | 19919 / 6065 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261118 --tier=1 --casting=opportunity --cast-profile=scaled --report=balance-tier-1`.
