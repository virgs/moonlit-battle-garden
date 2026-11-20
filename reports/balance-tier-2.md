# Five-character roster diagnostic

Isolated tier 2: 2-slot charge cap; only tier 2 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep/Tines useful/urgent selected column, no active refresh; Tin Caps visible unarmored enemy mole; Shortening/Veil visible enemy mole/star, no active effect refresh or casting into wards. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-20T23:41:46.597Z. Revision 39fce99 + working changes; config 11554567b230; simulation 629810c0772b8b08; base seed 20261119. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨56.3% | 🟨42.7%* | 🟨43.8%* | 🟥37.0% |
| Andromoss | 🟨43.7% | — | 🟥34.8% | 🟥36.8%* | 🟥31.5% |
| Captain Bramble | 🟨57.3%* | 🟩65.2% | — | 🟨50.0%* | 🟨41.3%* |
| Duskmantle | 🟨56.2%* | 🟩63.2%* | 🟨50.0%* | — | 🟨42.2%* |
| Sprig | 🟩63.0% | 🟩68.5% | 🟨58.7%* | 🟨57.8%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨58.0% | 🟨50.5% | 🟨55.0% | 🟥32.5% |
| Andromoss | 🟨42.0% | — | 🟨41.0% | 🟨51.0% | 🟥27.5% |
| Captain Bramble | 🟨49.5% | 🟨59.0% | — | 🟨59.0% | 🟥33.0% |
| Duskmantle | 🟨45.0% | 🟨49.0% | 🟨41.0% | — | 🟥23.5% |
| Sprig | 🟩67.5% | 🟩72.5% | 🟩67.0% | 🟩76.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨51.5% | 🟨42.5% | 🟨43.5% | 🟥31.5% |
| Andromoss | 🟨48.5% | — | 🟥37.0% | 🟨41.0% | 🟥31.0% |
| Captain Bramble | 🟨57.5% | 🟩63.0% | — | 🟨53.0% | 🟥36.0% |
| Duskmantle | 🟨56.5% | 🟨59.0% | 🟨47.0% | — | 🟥35.5% |
| Sprig | 🟩68.5% | 🟩69.0% | 🟩64.0% | 🟩64.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨59.5% | 🟥35.0% | 🟥33.0% | 🟨47.0% |
| Andromoss | 🟨40.5% | — | 🟥26.5% | 🟥18.5% | 🟥36.0% |
| Captain Bramble | 🟩65.0% | 🟩73.5% | — | 🟥38.0% | 🟨55.0% |
| Duskmantle | 🟩67.0% | 🟩81.5% | 🟩62.0% | — | 🟩67.5% |
| Sprig | 🟨53.0% | 🟩64.0% | 🟨45.0% | 🟥32.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 50.5%, medium 42.5%, hard 35.0%; spread 15.5 points; observed favored-side flip.
- Sir Champignon vs Duskmantle: easy 55.0%, medium 43.5%, hard 33.0%; spread 22.0 points; observed favored-side flip.
- Andromoss vs Duskmantle: easy 51.0%, medium 41.0%, hard 18.5%; spread 32.5 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 59.0%, medium 53.0%, hard 38.0%; spread 21.0 points; observed favored-side flip.
- Captain Bramble vs Sprig: easy 33.0%, medium 36.0%, hard 55.0%; spread 22.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 23.5%, medium 35.5%, hard 67.5%; spread 44.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 63 left-side wins | 0 | 44.5 | 135.1 | 0/431/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 116 / 84 | 0 | 45.6 | 125.7 | 0/418/0/0 · 0/406/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 101 / 99 | 0 | 44.5 | 132.8 | 0/424/0/0 · 0/414/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 110 / 90 | 0 | 45.7 | 129.0 | 0/424/0/0 · 0/421/0/0 |
| easy | Sir Champignon / Sprig | 200 | 65 / 135 | 0 | 43.4 | 111.8 | 0/411/0/0 · 0/424/0/0 |
| easy | Andromoss / Andromoss | 100 | 63 left-side wins | 0 | 45.3 | 144.7 | 0/444/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 82 / 118 | 0 | 44.5 | 131.3 | 0/419/0/0 · 0/424/0/0 |
| easy | Andromoss / Duskmantle | 200 | 102 / 98 | 0 | 46.3 | 135.8 | 0/441/0/0 · 0/425/0/0 |
| easy | Andromoss / Sprig | 200 | 55 / 145 | 0 | 43.5 | 104.9 | 0/417/0/0 · 0/423/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 60 left-side wins | 0 | 43.9 | 134.8 | 0/424/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 118 / 82 | 0 | 45.1 | 140.8 | 0/420/0/0 · 0/429/0/0 |
| easy | Captain Bramble / Sprig | 200 | 66 / 134 | 0 | 43.3 | 115.4 | 0/420/0/0 · 0/421/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 55 left-side wins | 0 | 46.2 | 150.4 | 0/438/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 47 / 153 | 0 | 43.3 | 115.2 | 0/418/0/0 · 0/426/0/0 |
| easy | Sprig / Sprig | 100 | 58 left-side wins | 0 | 43.1 | 108.0 | 0/431/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 60 left-side wins | 0 | 57.3 | 152.1 | 0/963/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 103 / 97 | 0 | 54.8 | 141.6 | 0/940/0/0 · 0/928/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 85 / 115 | 0 | 54.8 | 140.9 | 0/982/0/0 · 0/972/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 87 / 113 | 0 | 53.6 | 141.4 | 0/926/0/0 · 0/910/0/0 |
| medium | Sir Champignon / Sprig | 200 | 63 / 137 | 0 | 56.0 | 134.2 | 0/965/0/0 · 0/955/0/0 |
| medium | Andromoss / Andromoss | 100 | 57 left-side wins | 0 | 58.0 | 153.3 | 0/1004/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 74 / 126 | 0 | 52.5 | 142.3 | 0/947/0/0 · 0/954/0/0 |
| medium | Andromoss / Duskmantle | 200 | 82 / 118 | 0 | 54.4 | 146.3 | 0/965/0/0 · 0/999/0/0 |
| medium | Andromoss / Sprig | 200 | 62 / 138 | 0 | 54.0 | 132.4 | 0/893/0/0 · 0/911/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 61 left-side wins | 0 | 50.3 | 144.1 | 0/935/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 106 / 94 | 0 | 50.7 | 141.8 | 0/904/0/0 · 0/908/0/0 |
| medium | Captain Bramble / Sprig | 200 | 72 / 128 | 0 | 53.0 | 138.2 | 0/917/0/0 · 0/967/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 47 left-side wins | 0 | 57.1 | 152.3 | 0/972/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 71 / 129 | 0 | 52.7 | 131.7 | 0/894/0/0 · 0/901/0/0 |
| medium | Sprig / Sprig | 100 | 54 left-side wins | 0 | 54.5 | 137.9 | 0/941/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 52 left-side wins | 0 | 78.3 | 218.8 | 0/1820/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 119 / 81 | 0 | 78.3 | 210.2 | 0/1826/0/0 · 0/1791/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 70 / 130 | 0 | 77.8 | 199.6 | 0/1810/0/0 · 0/1756/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 66 / 134 | 0 | 76.0 | 179.9 | 0/1466/0/0 · 0/1475/0/0 |
| hard | Sir Champignon / Sprig | 200 | 94 / 106 | 0 | 75.0 | 203.8 | 0/1715/0/0 · 0/1746/0/0 |
| hard | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 86.0 | 242.5 | 0/1979/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 53 / 147 | 0 | 76.3 | 188.3 | 0/1631/0/0 · 0/1629/0/0 |
| hard | Andromoss / Duskmantle | 200 | 37 / 163 | 0 | 78.3 | 180.1 | 0/1495/0/0 · 0/1509/0/0 |
| hard | Andromoss / Sprig | 200 | 72 / 128 | 0 | 79.8 | 205.9 | 0/1783/0/0 · 0/1867/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 50 left-side wins | 0 | 75.3 | 200.6 | 0/1643/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 76 / 124 | 0 | 74.7 | 182.5 | 0/1467/0/0 · 0/1501/0/0 |
| hard | Captain Bramble / Sprig | 200 | 110 / 90 | 0 | 75.8 | 179.6 | 0/1595/0/0 · 0/1666/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 75.8 | 175.9 | 0/1484/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 135 / 65 | 0 | 75.9 | 177.3 | 0/1460/0/0 · 0/1483/0/0 |
| hard | Sprig / Sprig | 100 | 56 left-side wins | 0 | 76.0 | 190.6 | 0/1731/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 392/800 (49.0%) | 0 | 0/2108/0/0 | 1, 3, 4 |
| easy | Andromoss | 323/800 (40.4%) | 0 | 0/2127/0/0 | 1, 3, 4 |
| easy | Captain Bramble | 401/800 (50.1%) | 0 | 0/2102/0/0 | 1, 3, 4 |
| easy | Duskmantle | 317/800 (39.6%) | 0 | 0/2131/0/0 | 1, 3, 4 |
| easy | Sprig | 567/800 (70.9%) | 0 | 0/2125/0/0 | 1, 3, 4 |
| medium | Sir Champignon | 338/800 (42.3%) | 0 | 0/4776/0/0 | 1, 3, 4 |
| medium | Andromoss | 315/800 (39.4%) | 0 | 0/4737/0/0 | 1, 3, 4 |
| medium | Captain Bramble | 419/800 (52.4%) | 0 | 0/4682/0/0 | 1, 3, 4 |
| medium | Duskmantle | 396/800 (49.5%) | 0 | 0/4683/0/0 | 1, 3, 4 |
| medium | Sprig | 532/800 (66.5%) | 0 | 0/4675/0/0 | 1, 3, 4 |
| hard | Sir Champignon | 349/800 (43.6%) | 0 | 0/8637/0/0 | 1, 3, 4 |
| hard | Andromoss | 243/800 (30.4%) | 0 | 0/8679/0/0 | 1, 3, 4 |
| hard | Captain Bramble | 463/800 (57.9%) | 0 | 0/8090/0/0 | 1, 3, 4 |
| hard | Duskmantle | 556/800 (69.5%) | 0 | 0/7429/0/0 | 1, 3, 4 |
| hard | Sprig | 389/800 (48.6%) | 0 | 0/8493/0/0 | 1, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 2.10 | 775.77 / 1364.26 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 2.10 | 748.78 / 1380.05 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Captain Bramble | 2.10 | 749.73 / 1396.63 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 2.12 | 758.50 / 1399.38 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 2.12 | 810.99 / 1029.85 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 4.77 | 1591.03 / 419.24 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 4.67 | 1544.78 / 430.56 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Captain Bramble | 4.68 | 1545.25 / 418.19 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 4.64 | 1526.43 / 402.08 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 4.67 | 1601.67 / 381.02 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 8.52 | 3015.53 / 256.08 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 8.38 | 2967.42 / 251.07 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Captain Bramble | 8.06 | 2856.87 / 230.68 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 7.43 | 2569.81 / 198.75 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 8.45 | 3006.06 / 284.92 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed benefit from the cast. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 16.83 | 87.2% | 1677 / 40 | 904 | 4749 / 0 |
| easy | Andromoss | 17.75 | 87.8% | 1683 / 53 | 902 | 4393 / 0 |
| easy | Captain Bramble | 16.54 | 87.0% | 1678 / 40 | 900 | 4874 / 0 |
| easy | Duskmantle | 17.46 | 87.5% | 1693 / 48 | 901 | 3884 / 0 |
| easy | Sprig | 14.81 | 85.4% | 1694 / 40 | 904 | 3124 / 0 |
| medium | Sir Champignon | 20.73 | 76.6% | 3813 / 68 | 603 | 2805 / 242 |
| medium | Andromoss | 21.64 | 78.1% | 3733 / 58 | 602 | 2956 / 228 |
| medium | Captain Bramble | 19.25 | 75.4% | 3747 / 40 | 602 | 2539 / 211 |
| medium | Duskmantle | 21.95 | 78.5% | 3711 / 64 | 601 | 3124 / 220 |
| medium | Sprig | 20.16 | 76.5% | 3734 / 59 | 603 | 2455 / 230 |
| hard | Sir Champignon | 28.50 | 70.0% | 6817 / 32 | 301 | 8292 / 2121 |
| hard | Andromoss | 34.93 | 75.9% | 6700 / 34 | 301 | 9226 / 2084 |
| hard | Captain Bramble | 32.62 | 75.2% | 6447 / 32 | 301 | 7584 / 1884 |
| hard | Duskmantle | 30.15 | 75.2% | 5945 / 33 | 301 | 5882 / 1387 |
| hard | Sprig | 28.45 | 70.1% | 6762 / 40 | 301 | 8009 / 2076 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=2 --casting=opportunity --cast-profile=scaled --report=balance-tier-2`.
