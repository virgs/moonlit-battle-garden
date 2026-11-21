# Five-character roster diagnostic

Isolated tier 3: 3-slot charge cap; only tier 3 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Both five-charge guards use an unguarded own near-escape mole; theft 2+ enemy stars and no ward; Siphon visible own mole/no active refresh; Sprig cleanses harmful effects or prepares its sole spell ward against public enemy threat. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-21T03:57:42.483Z. Revision e9faf67 + working changes; config 26bdb9b0a7e5; simulation f5fce78d977f08ab; base seed 20261118. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨53.0% | 🟨50.0% | 🟩64.0% | 🟩74.2%* |
| Andromoss | 🟨47.0% | — | 🟨47.0% | 🟨49.3% | 🟨50.0% |
| Captain Bramble | 🟨50.0% | 🟨53.0% | — | 🟩64.0% | 🟩74.2%* |
| Duskmantle | 🟥36.0% | 🟨50.7% | 🟥36.0% | — | 🟩63.3%* |
| Sprig | 🟥25.8%* | 🟨50.0% | 🟥25.8%* | 🟥36.7%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨53.0% | 🟨50.0% | 🟨58.0% | 🟩60.5% |
| Andromoss | 🟨47.0% | — | 🟨47.0% | 🟨49.0% | 🟨50.0% |
| Captain Bramble | 🟨50.0% | 🟨53.0% | — | 🟨58.0% | 🟩60.5% |
| Duskmantle | 🟨42.0% | 🟨51.0% | 🟨42.0% | — | 🟨52.5% |
| Sprig | 🟥39.5% | 🟨50.0% | 🟥39.5% | 🟨47.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨55.5% | 🟨50.0% | 🟩66.0% | 🟩72.0% |
| Andromoss | 🟨44.5% | — | 🟨44.5% | 🟨49.0% | 🟨50.0% |
| Captain Bramble | 🟨50.0% | 🟨55.5% | — | 🟩66.0% | 🟩72.0% |
| Duskmantle | 🟥34.0% | 🟨51.0% | 🟥34.0% | — | 🟩60.5% |
| Sprig | 🟥28.0% | 🟨50.0% | 🟥28.0% | 🟥39.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.5% | 🟨50.0% | 🟩68.0% | 🟩90.0% |
| Andromoss | 🟨49.5% | — | 🟨49.5% | 🟨50.0% | 🟨50.0% |
| Captain Bramble | 🟨50.0% | 🟨50.5% | — | 🟩68.0% | 🟩90.0% |
| Duskmantle | 🟥32.0% | 🟨50.0% | 🟥32.0% | — | 🟩77.0% |
| Sprig | 🟥10.0% | 🟨50.0% | 🟥10.0% | 🟥23.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Sprig: easy 60.5%, medium 72.0%, hard 90.0%; spread 29.5 points.
- Captain Bramble vs Sprig: easy 60.5%, medium 72.0%, hard 90.0%; spread 29.5 points.
- Duskmantle vs Sprig: easy 52.5%, medium 60.5%, hard 77.0%; spread 24.5 points.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 60 left-side wins | 0 | 44.4 | 139.8 | 0/0/211/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 106 / 94 | 0 | 44.5 | 131.2 | 0/0/99/0 · 0/0/213/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 100 / 100 | 0 | 44.4 | 139.8 | 0/0/211/0 · 0/0/211/0 |
| easy | Sir Champignon / Duskmantle | 200 | 116 / 84 | 0 | 44.4 | 120.1 | 0/0/204/0 · 0/0/214/0 |
| easy | Sir Champignon / Sprig | 200 | 121 / 79 | 0 | 43.3 | 121.3 | 0/0/205/0 · 0/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 60 left-side wins | 0 | 45.3 | 148.8 | 0/0/154/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 94 / 106 | 0 | 44.5 | 131.2 | 0/0/213/0 · 0/0/99/0 |
| easy | Andromoss / Duskmantle | 200 | 98 / 102 | 0 | 44.5 | 139.1 | 0/0/200/0 · 0/0/124/0 |
| easy | Andromoss / Sprig | 200 | 100 / 100 | 0 | 45.3 | 148.8 | 0/0/173/0 · 0/0/132/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 60 left-side wins | 0 | 44.4 | 139.8 | 0/0/211/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 116 / 84 | 0 | 44.4 | 120.1 | 0/0/204/0 · 0/0/214/0 |
| easy | Captain Bramble / Sprig | 200 | 121 / 79 | 0 | 43.3 | 121.3 | 0/0/205/0 · 0/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 60 left-side wins | 0 | 44.8 | 143.4 | 0/0/223/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 105 / 95 | 0 | 44.3 | 135.0 | 0/0/223/0 · 0/0/0/0 |
| easy | Sprig / Sprig | 100 | 60 left-side wins | 0 | 44.2 | 145.8 | 0/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 52 left-side wins | 0 | 59.7 | 147.0 | 0/0/538/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 111 / 89 | 0 | 54.8 | 150.3 | 0/0/95/0 · 0/0/729/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 100 / 100 | 0 | 59.7 | 147.0 | 0/0/538/0 · 0/0/538/0 |
| medium | Sir Champignon / Duskmantle | 200 | 132 / 68 | 0 | 53.8 | 137.9 | 0/0/522/0 · 0/0/562/0 |
| medium | Sir Champignon / Sprig | 200 | 144 / 56 | 0 | 51.6 | 126.5 | 0/0/506/0 · 0/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 54.8 | 149.3 | 0/0/410/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 89 / 111 | 0 | 54.8 | 150.3 | 0/0/729/0 · 0/0/95/0 |
| medium | Andromoss / Duskmantle | 200 | 98 / 102 | 0 | 53.3 | 146.6 | 0/0/679/0 · 0/0/138/0 |
| medium | Andromoss / Sprig | 200 | 100 / 100 | 0 | 54.8 | 149.3 | 0/0/606/0 · 0/0/216/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 52 left-side wins | 0 | 59.7 | 147.0 | 0/0/538/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 132 / 68 | 0 | 53.8 | 137.9 | 0/0/522/0 · 0/0/562/0 |
| medium | Captain Bramble / Sprig | 200 | 144 / 56 | 0 | 51.6 | 126.5 | 0/0/506/0 · 0/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 59 left-side wins | 0 | 49.2 | 135.9 | 0/0/521/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 121 / 79 | 0 | 50.0 | 133.0 | 0/0/550/0 · 0/0/0/0 |
| medium | Sprig / Sprig | 100 | 58 left-side wins | 0 | 52.1 | 144.3 | 0/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 53 left-side wins | 0 | 101.3 | 254.6 | 0/0/1406/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 101 / 99 | 0 | 79.8 | 198.6 | 0/0/53/0 · 0/0/1705/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 100 / 100 | 0 | 101.3 | 254.6 | 0/0/1406/0 · 0/0/1406/0 |
| hard | Sir Champignon / Duskmantle | 200 | 136 / 64 | 0 | 78.5 | 205.3 | 0/0/1090/0 · 0/0/1203/0 |
| hard | Sir Champignon / Sprig | 200 | 180 / 20 | 0 | 74.2 | 180.6 | 0/0/946/0 · 0/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 55 left-side wins | 0 | 80.0 | 199.3 | 0/0/900/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 99 / 101 | 0 | 79.8 | 198.6 | 0/0/1705/0 · 0/0/53/0 |
| hard | Andromoss / Duskmantle | 200 | 100 / 100 | 0 | 77.8 | 207.3 | 0/0/1656/0 · 0/0/101/0 |
| hard | Andromoss / Sprig | 200 | 100 / 100 | 0 | 79.8 | 198.8 | 0/0/1550/0 · 0/0/236/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 53 left-side wins | 0 | 101.3 | 254.6 | 0/0/1406/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 136 / 64 | 0 | 78.5 | 205.3 | 0/0/1090/0 · 0/0/1203/0 |
| hard | Captain Bramble / Sprig | 200 | 180 / 20 | 0 | 74.2 | 180.6 | 0/0/946/0 · 0/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 59 left-side wins | 0 | 73.7 | 212.8 | 0/0/1170/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 154 / 46 | 0 | 70.5 | 173.6 | 0/0/1075/0 · 0/0/0/0 |
| hard | Sprig / Sprig | 100 | 55 left-side wins | 0 | 75.3 | 187.3 | 0/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 443/800 (55.4%) | 0 | 0/0/930/0 | 1, 2, 4 |
| easy | Andromoss | 386/800 (48.3%) | 0 | 0/0/953/0 | 1, 2, 4 |
| easy | Captain Bramble | 443/800 (55.4%) | 0 | 0/0/930/0 | 1, 2, 4 |
| easy | Duskmantle | 375/800 (46.9%) | 0 | 0/0/998/0 | 1, 2, 4 |
| easy | Sprig | 353/800 (44.1%) | 0 | 0/0/132/0 | 1, 2, 4 |
| medium | Sir Champignon | 487/800 (60.9%) | 0 | 0/0/2199/0 | 1, 2, 4 |
| medium | Andromoss | 376/800 (47.0%) | 0 | 0/0/3153/0 | 1, 2, 4 |
| medium | Captain Bramble | 487/800 (60.9%) | 0 | 0/0/2199/0 | 1, 2, 4 |
| medium | Duskmantle | 359/800 (44.9%) | 0 | 0/0/2333/0 | 1, 2, 4 |
| medium | Sprig | 291/800 (36.4%) | 0 | 0/0/216/0 | 1, 2, 4 |
| hard | Sir Champignon | 517/800 (64.6%) | 0 | 0/0/4901/0 | 1, 2, 4 |
| hard | Andromoss | 398/800 (49.8%) | 0 | 0/0/7516/0 | 1, 2, 4 |
| hard | Captain Bramble | 517/800 (64.6%) | 0 | 0/0/4901/0 | 1, 2, 4 |
| hard | Duskmantle | 382/800 (47.8%) | 0 | 0/0/4752/0 | 1, 2, 4 |
| hard | Sprig | 186/800 (23.3%) | 0 | 0/0/236/0 | 1, 2, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 0.90 | 780.79 / 1541.53 | 32.77 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 1.00 | 792.39 / 1733.68 | 0.00 | 2.34 / 2.34 | 0.00 |
| easy | Captain Bramble | 0.90 | 780.79 / 1541.53 | 32.77 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 0.97 | 790.01 / 1538.63 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 0.17 | 782.03 / 1618.28 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 2.08 | 1631.52 / 392.90 | 72.13 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 3.43 | 1698.70 / 524.21 | 0.00 | 7.83 / 7.83 | 0.00 |
| medium | Captain Bramble | 2.08 | 1631.52 / 392.90 | 72.13 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 2.27 | 1657.10 / 467.69 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 0.27 | 1585.99 / 446.86 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 4.37 | 3643.54 / 140.85 | 149.61 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 8.27 | 3469.57 / 269.80 | 0.00 | 17.75 / 17.75 | 0.00 |
| hard | Captain Bramble | 4.37 | 3643.54 / 140.85 | 149.61 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 4.48 | 3475.55 / 265.20 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 0.29 | 3191.51 / 247.95 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed benefit from the cast. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 11.13 | 91.5% | 719 / 35 | 902 | 3193 / 0 |
| easy | Andromoss | 1.11 | 9.3% | 799 / 6 | 864 | 0 / 0 |
| easy | Captain Bramble | 11.13 | 91.5% | 719 / 35 | 902 | 3193 / 0 |
| easy | Duskmantle | 9.14 | 89.1% | 775 / 23 | 900 | 3022 / 0 |
| easy | Sprig | 0.22 | 25.0% | 132 / 0 | 850 | 0 / 0 |
| medium | Sir Champignon | 10.88 | 80.5% | 1661 / 33 | 601 | 1756 / 135 |
| medium | Andromoss | 3.67 | 6.5% | 2743 / 7 | 592 | 314 / 313 |
| medium | Captain Bramble | 10.88 | 80.5% | 1661 / 33 | 601 | 1756 / 135 |
| medium | Duskmantle | 8.99 | 74.4% | 1812 / 28 | 600 | 1526 / 131 |
| medium | Sprig | 0.41 | 34.3% | 216 / 0 | 564 | 6 / 4 |
| hard | Sir Champignon | 16.05 | 72.6% | 3495 / 24 | 301 | 6171 / 1707 |
| hard | Andromoss | 8.54 | 3.0% | 6616 / 9 | 300 | 2900 / 2876 |
| hard | Captain Bramble | 16.05 | 72.6% | 3495 / 24 | 301 | 6171 / 1707 |
| hard | Duskmantle | 15.79 | 71.5% | 3582 / 13 | 301 | 4569 / 1283 |
| hard | Sprig | 0.44 | 32.6% | 236 / 0 | 284 | 2 / 1 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261118 --tier=3 --casting=opportunity --cast-profile=scaled --report=balance-tier-3`.
