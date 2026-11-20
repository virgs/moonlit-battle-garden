# Five-character roster diagnostic

Isolated tier 2: 2-slot charge cap; only tier 2 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep/Tines useful/urgent selected column, no active refresh; Tin Caps visible unarmored enemy mole; Riot/Veil visible enemy mole/star, no active effect refresh or casting into wards. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-20T17:59:49.905Z. Revision 2126adc + working changes; config 7bd160b8515f; simulation eafc2e335fdc5594; base seed 20261119. Tuning overrides: {"columnAutomationMs":10000,"helpingTinesMode":"pulse"}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨54.5%* | 🟨42.7%* | 🟨43.8%* | 🟨44.2%* |
| Andromoss | 🟨45.5%* | — | 🟥32.8% | 🟥33.7% | 🟨55.5%* |
| Captain Bramble | 🟨57.3%* | 🟩67.2% | — | 🟨50.0%* | 🟨46.2%* |
| Duskmantle | 🟨56.2%* | 🟩66.3% | 🟨50.0%* | — | 🟨47.0%* |
| Sprig | 🟨55.8%* | 🟨44.5%* | 🟨53.8%* | 🟨53.0%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨59.5% | 🟨50.5% | 🟨55.0% | 🟥37.5% |
| Andromoss | 🟨40.5% | — | 🟨41.0% | 🟨42.5% | 🟥33.5% |
| Captain Bramble | 🟨49.5% | 🟨59.0% | — | 🟨59.0% | 🟥32.5% |
| Duskmantle | 🟨45.0% | 🟨57.5% | 🟨41.0% | — | 🟥30.5% |
| Sprig | 🟩62.5% | 🟩66.5% | 🟩67.5% | 🟩69.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨56.0% | 🟨42.5% | 🟨43.5% | 🟥38.5% |
| Andromoss | 🟨44.0% | — | 🟥30.5% | 🟥36.0% | 🟨51.0% |
| Captain Bramble | 🟨57.5% | 🟩69.5% | — | 🟨53.0% | 🟨43.0% |
| Duskmantle | 🟨56.5% | 🟩64.0% | 🟨47.0% | — | 🟨41.0% |
| Sprig | 🟩61.5% | 🟨49.0% | 🟨57.0% | 🟨59.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨48.0% | 🟥35.0% | 🟥33.0% | 🟨56.5% |
| Andromoss | 🟨52.0% | — | 🟥27.0% | 🟥22.5% | 🟩82.0% |
| Captain Bramble | 🟩65.0% | 🟩73.0% | — | 🟥38.0% | 🟩63.0% |
| Duskmantle | 🟩67.0% | 🟩77.5% | 🟩62.0% | — | 🟩69.5% |
| Sprig | 🟨43.5% | 🟥18.0% | 🟥37.0% | 🟥30.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 59.5%, medium 56.0%, hard 48.0%; spread 11.5 points; observed favored-side flip.
- Sir Champignon vs Captain Bramble: easy 50.5%, medium 42.5%, hard 35.0%; spread 15.5 points; observed favored-side flip.
- Sir Champignon vs Duskmantle: easy 55.0%, medium 43.5%, hard 33.0%; spread 22.0 points; observed favored-side flip.
- Sir Champignon vs Sprig: easy 37.5%, medium 38.5%, hard 56.5%; spread 19.0 points; observed favored-side flip.
- Andromoss vs Sprig: easy 33.5%, medium 51.0%, hard 82.0%; spread 48.5 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 59.0%, medium 53.0%, hard 38.0%; spread 21.0 points; observed favored-side flip.
- Captain Bramble vs Sprig: easy 32.5%, medium 43.0%, hard 63.0%; spread 30.5 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 30.5%, medium 41.0%, hard 69.5%; spread 39.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 63 left-side wins | 0 | 44.5 | 135.1 | 0/431/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 119 / 81 | 0 | 44.6 | 137.6 | 0/437/0/0 · 0/413/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 101 / 99 | 0 | 44.5 | 132.8 | 0/424/0/0 · 0/414/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 110 / 90 | 0 | 45.7 | 129.0 | 0/424/0/0 · 0/421/0/0 |
| easy | Sir Champignon / Sprig | 200 | 75 / 125 | 0 | 43.6 | 118.8 | 0/416/0/0 · 0/429/0/0 |
| easy | Andromoss / Andromoss | 100 | 57 left-side wins | 0 | 45.4 | 144.7 | 0/431/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 82 / 118 | 0 | 44.3 | 143.2 | 0/436/0/0 · 0/430/0/0 |
| easy | Andromoss / Duskmantle | 200 | 85 / 115 | 0 | 47.2 | 136.0 | 0/432/0/0 · 0/442/0/0 |
| easy | Andromoss / Sprig | 200 | 67 / 133 | 0 | 42.9 | 115.7 | 0/407/0/0 · 0/413/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 60 left-side wins | 0 | 43.9 | 134.8 | 0/424/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 118 / 82 | 0 | 45.1 | 140.8 | 0/420/0/0 · 0/429/0/0 |
| easy | Captain Bramble / Sprig | 200 | 65 / 135 | 0 | 44.3 | 116.8 | 0/423/0/0 · 0/434/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 55 left-side wins | 0 | 46.2 | 150.4 | 0/438/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 61 / 139 | 0 | 44.5 | 121.6 | 0/416/0/0 · 0/442/0/0 |
| easy | Sprig / Sprig | 100 | 57 left-side wins | 0 | 43.0 | 114.7 | 0/421/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 60 left-side wins | 0 | 57.3 | 152.1 | 0/963/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 112 / 88 | 0 | 59.1 | 149.1 | 0/925/0/0 · 0/975/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 85 / 115 | 0 | 54.8 | 140.9 | 0/982/0/0 · 0/972/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 87 / 113 | 0 | 53.6 | 141.4 | 0/926/0/0 · 0/910/0/0 |
| medium | Sir Champignon / Sprig | 200 | 77 / 123 | 0 | 53.7 | 138.4 | 0/950/0/0 · 0/952/0/0 |
| medium | Andromoss / Andromoss | 100 | 55 left-side wins | 0 | 56.6 | 152.2 | 0/979/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 61 / 139 | 0 | 53.0 | 134.3 | 0/919/0/0 · 0/913/0/0 |
| medium | Andromoss / Duskmantle | 200 | 72 / 128 | 0 | 56.8 | 148.9 | 0/966/0/0 · 0/988/0/0 |
| medium | Andromoss / Sprig | 200 | 102 / 98 | 0 | 51.1 | 138.9 | 0/901/0/0 · 0/928/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 61 left-side wins | 0 | 50.3 | 144.1 | 0/935/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 106 / 94 | 0 | 50.7 | 141.8 | 0/904/0/0 · 0/908/0/0 |
| medium | Captain Bramble / Sprig | 200 | 86 / 114 | 0 | 53.1 | 132.3 | 0/954/0/0 · 0/974/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 47 left-side wins | 0 | 57.1 | 152.3 | 0/972/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 82 / 118 | 0 | 53.0 | 138.6 | 0/947/0/0 · 0/954/0/0 |
| medium | Sprig / Sprig | 100 | 56 left-side wins | 0 | 54.3 | 139.8 | 0/943/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 52 left-side wins | 0 | 78.3 | 218.8 | 0/1820/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 96 / 104 | 0 | 77.7 | 209.0 | 0/1803/0/0 · 0/1821/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 70 / 130 | 0 | 77.8 | 199.6 | 0/1810/0/0 · 0/1756/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 66 / 134 | 0 | 76.0 | 179.9 | 0/1466/0/0 · 0/1475/0/0 |
| hard | Sir Champignon / Sprig | 200 | 113 / 87 | 0 | 76.0 | 190.4 | 0/1672/0/0 · 0/1688/0/0 |
| hard | Andromoss / Andromoss | 100 | 53 left-side wins | 0 | 79.9 | 214.7 | 0/1834/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 54 / 146 | 0 | 76.2 | 190.7 | 0/1619/0/0 · 0/1642/0/0 |
| hard | Andromoss / Duskmantle | 200 | 45 / 155 | 0 | 77.1 | 175.6 | 0/1429/0/0 · 0/1488/0/0 |
| hard | Andromoss / Sprig | 200 | 164 / 36 | 0 | 67.8 | 174.2 | 0/1498/0/0 · 0/1512/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 50 left-side wins | 0 | 75.3 | 200.6 | 0/1643/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 76 / 124 | 0 | 74.7 | 182.5 | 0/1467/0/0 · 0/1501/0/0 |
| hard | Captain Bramble / Sprig | 200 | 126 / 74 | 0 | 74.5 | 183.8 | 0/1609/0/0 · 0/1702/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 75.8 | 175.9 | 0/1484/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 139 / 61 | 0 | 76.0 | 183.2 | 0/1494/0/0 · 0/1523/0/0 |
| hard | Sprig / Sprig | 100 | 58 left-side wins | 0 | 75.7 | 193.3 | 0/1762/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 405/800 (50.6%) | 0 | 0/2132/0/0 | 1, 3, 4 |
| easy | Andromoss | 315/800 (39.4%) | 0 | 0/2119/0/0 | 1, 3, 4 |
| easy | Captain Bramble | 400/800 (50.0%) | 0 | 0/2111/0/0 | 1, 3, 4 |
| easy | Duskmantle | 348/800 (43.5%) | 0 | 0/2146/0/0 | 1, 3, 4 |
| easy | Sprig | 532/800 (66.5%) | 0 | 0/2139/0/0 | 1, 3, 4 |
| medium | Sir Champignon | 361/800 (45.1%) | 0 | 0/4746/0/0 | 1, 3, 4 |
| medium | Andromoss | 323/800 (40.4%) | 0 | 0/4740/0/0 | 1, 3, 4 |
| medium | Captain Bramble | 446/800 (55.8%) | 0 | 0/4678/0/0 | 1, 3, 4 |
| medium | Duskmantle | 417/800 (52.1%) | 0 | 0/4725/0/0 | 1, 3, 4 |
| medium | Sprig | 453/800 (56.6%) | 0 | 0/4751/0/0 | 1, 3, 4 |
| hard | Sir Champignon | 345/800 (43.1%) | 0 | 0/8571/0/0 | 1, 3, 4 |
| hard | Andromoss | 367/800 (45.9%) | 0 | 0/8201/0/0 | 1, 3, 4 |
| hard | Captain Bramble | 478/800 (59.8%) | 0 | 0/8117/0/0 | 1, 3, 4 |
| hard | Duskmantle | 552/800 (69.0%) | 0 | 0/7442/0/0 | 1, 3, 4 |
| hard | Sprig | 258/800 (32.3%) | 0 | 0/8187/0/0 | 1, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 2.13 | 790.42 / 1350.83 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 2.11 | 759.89 / 1462.43 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Captain Bramble | 2.11 | 756.11 / 1501.29 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 2.13 | 768.63 / 1482.35 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 2.15 | 811.75 / 1130.75 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 4.73 | 1614.44 / 447.96 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 4.70 | 1557.96 / 450.64 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Captain Bramble | 4.68 | 1545.81 / 425.07 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 4.69 | 1554.65 / 405.64 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 4.76 | 1635.23 / 431.99 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 8.44 | 3001.31 / 271.20 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 7.96 | 2805.60 / 241.50 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Captain Bramble | 8.09 | 2856.07 / 232.70 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 7.45 | 2569.60 / 202.61 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 8.03 | 2822.38 / 311.65 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed benefit from the cast. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 15.80 | 86.2% | 1701 / 41 | 905 | 3568 / 0 |
| easy | Andromoss | 18.70 | 88.3% | 1688 / 62 | 903 | 5022 / 0 |
| easy | Captain Bramble | 15.25 | 85.9% | 1687 / 36 | 899 | 3812 / 0 |
| easy | Duskmantle | 17.09 | 87.2% | 1708 / 48 | 901 | 3312 / 0 |
| easy | Sprig | 18.01 | 87.7% | 1718 / 56 | 902 | 5102 / 0 |
| medium | Sir Champignon | 21.48 | 77.7% | 3783 / 52 | 603 | 2948 / 260 |
| medium | Andromoss | 22.13 | 78.5% | 3761 / 46 | 602 | 3240 / 247 |
| medium | Captain Bramble | 19.54 | 75.7% | 3743 / 56 | 602 | 2762 / 224 |
| medium | Duskmantle | 22.16 | 78.4% | 3753 / 69 | 602 | 3067 / 228 |
| medium | Sprig | 20.65 | 76.7% | 3808 / 44 | 603 | 2653 / 242 |
| hard | Sir Champignon | 28.69 | 70.4% | 6751 / 33 | 301 | 8017 / 2111 |
| hard | Andromoss | 33.54 | 76.1% | 6367 / 39 | 301 | 8366 / 1918 |
| hard | Captain Bramble | 33.17 | 75.5% | 6474 / 33 | 301 | 7845 / 1903 |
| hard | Duskmantle | 30.97 | 75.8% | 5958 / 31 | 301 | 6359 / 1435 |
| hard | Sprig | 27.30 | 70.4% | 6425 / 31 | 301 | 7460 / 1900 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=2 --casting=opportunity --cast-profile=scaled --report=tines10-duration-only --tines-mode=pulse --tines-ms=10000`.

Explicit reproduction:

`pnpm balance:roster --tier=2 --seeds=100 --seed=20261119 --tines-mode=pulse --tines-ms=10000 --report=tines10-duration-only`
