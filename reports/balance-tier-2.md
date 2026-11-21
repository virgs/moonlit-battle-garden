# Five-character roster diagnostic

Isolated tier 2: 2-slot charge cap; only tier 2 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep/Tines useful/urgent selected column, no active refresh; Tin Caps visible unarmored enemy mole; Shortening/Veil visible enemy mole/star, no active effect refresh or casting into wards. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-21T03:57:09.261Z. Revision e9faf67 + working changes; config 26bdb9b0a7e5; simulation f5fce78d977f08ab; base seed 20261118. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨56.2% | 🟨42.3%* | 🟨45.7%* | 🟨49.7%* |
| Andromoss | 🟨43.8% | — | 🟥35.2% | 🟥37.0%* | 🟨42.0% |
| Captain Bramble | 🟨57.7%* | 🟩64.8% | — | 🟨52.8%* | 🟨54.5%* |
| Duskmantle | 🟨54.3%* | 🟩63.0%* | 🟨47.2%* | — | 🟨54.3%* |
| Sprig | 🟨50.3%* | 🟨58.0% | 🟨45.5%* | 🟨45.7%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨58.5% | 🟨50.5% | 🟨56.0% | 🟨50.5% |
| Andromoss | 🟨41.5% | — | 🟨41.5% | 🟨49.5% | 🟨40.5% |
| Captain Bramble | 🟨49.5% | 🟨58.5% | — | 🟨58.5% | 🟨46.0% |
| Duskmantle | 🟨44.0% | 🟨50.5% | 🟨41.5% | — | 🟨45.5% |
| Sprig | 🟨49.5% | 🟨59.5% | 🟨54.0% | 🟨54.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.5% | 🟨42.0% | 🟨48.5% | 🟨48.0% |
| Andromoss | 🟨49.5% | — | 🟥37.0% | 🟨42.5% | 🟨41.5% |
| Captain Bramble | 🟨58.0% | 🟩63.0% | — | 🟨55.5% | 🟨51.0% |
| Duskmantle | 🟨51.5% | 🟨57.5% | 🟨44.5% | — | 🟨50.0% |
| Sprig | 🟨52.0% | 🟨58.5% | 🟨49.0% | 🟨50.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨59.5% | 🟥34.5% | 🟥32.5% | 🟨50.5% |
| Andromoss | 🟨40.5% | — | 🟥27.0% | 🟥19.0% | 🟨44.0% |
| Captain Bramble | 🟩65.5% | 🟩73.0% | — | 🟨44.5% | 🟩66.5% |
| Duskmantle | 🟩67.5% | 🟩81.0% | 🟨55.5% | — | 🟩67.5% |
| Sprig | 🟨49.5% | 🟨56.0% | 🟥33.5% | 🟥32.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 50.5%, medium 42.0%, hard 34.5%; spread 16.0 points; observed favored-side flip.
- Sir Champignon vs Duskmantle: easy 56.0%, medium 48.5%, hard 32.5%; spread 23.5 points; observed favored-side flip.
- Sir Champignon vs Sprig: easy 50.5%, medium 48.0%, hard 50.5%; spread 2.5 points; observed favored-side flip.
- Andromoss vs Duskmantle: easy 49.5%, medium 42.5%, hard 19.0%; spread 30.5 points.
- Captain Bramble vs Duskmantle: easy 58.5%, medium 55.5%, hard 44.5%; spread 14.0 points; observed favored-side flip.
- Captain Bramble vs Sprig: easy 46.0%, medium 51.0%, hard 66.5%; spread 20.5 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 45.5%, medium 50.0%, hard 67.5%; spread 22.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 64 left-side wins | 0 | 44.5 | 135.1 | 0/433/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 117 / 83 | 0 | 45.5 | 125.7 | 0/415/0/0 · 0/403/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 101 / 99 | 0 | 44.5 | 133.1 | 0/421/0/0 · 0/417/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 112 / 88 | 0 | 45.0 | 125.0 | 0/424/0/0 · 0/414/0/0 |
| easy | Sir Champignon / Sprig | 200 | 101 / 99 | 0 | 44.1 | 133.5 | 0/437/0/0 · 0/421/0/0 |
| easy | Andromoss / Andromoss | 100 | 63 left-side wins | 0 | 45.3 | 144.7 | 0/444/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 83 / 117 | 0 | 44.7 | 132.8 | 0/418/0/0 · 0/426/0/0 |
| easy | Andromoss / Duskmantle | 200 | 99 / 101 | 0 | 46.3 | 135.8 | 0/435/0/0 · 0/430/0/0 |
| easy | Andromoss / Sprig | 200 | 81 / 119 | 0 | 44.4 | 133.1 | 0/412/0/0 · 0/417/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 61 left-side wins | 0 | 44.1 | 136.9 | 0/424/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 117 / 83 | 0 | 45.8 | 141.7 | 0/426/0/0 · 0/439/0/0 |
| easy | Captain Bramble / Sprig | 200 | 92 / 108 | 0 | 44.5 | 143.8 | 0/418/0/0 · 0/428/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 52 left-side wins | 0 | 46.8 | 148.2 | 0/433/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 91 / 109 | 0 | 44.1 | 124.5 | 0/422/0/0 · 0/416/0/0 |
| easy | Sprig / Sprig | 100 | 61 left-side wins | 0 | 44.1 | 128.7 | 0/437/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 60 left-side wins | 0 | 58.0 | 152.1 | 0/961/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 101 / 99 | 0 | 54.6 | 141.6 | 0/935/0/0 · 0/929/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 84 / 116 | 0 | 54.8 | 140.9 | 0/985/0/0 · 0/972/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 97 / 103 | 0 | 55.3 | 143.9 | 0/937/0/0 · 0/925/0/0 |
| medium | Sir Champignon / Sprig | 200 | 96 / 104 | 0 | 55.3 | 148.2 | 0/961/0/0 · 0/960/0/0 |
| medium | Andromoss / Andromoss | 100 | 57 left-side wins | 0 | 57.9 | 153.3 | 0/1002/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 74 / 126 | 0 | 52.6 | 140.9 | 0/944/0/0 · 0/952/0/0 |
| medium | Andromoss / Duskmantle | 200 | 85 / 115 | 0 | 57.0 | 144.2 | 0/979/0/0 · 0/987/0/0 |
| medium | Andromoss / Sprig | 200 | 83 / 117 | 0 | 56.5 | 149.8 | 0/963/0/0 · 0/1003/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 61 left-side wins | 0 | 50.0 | 143.3 | 0/930/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 111 / 89 | 0 | 50.5 | 143.6 | 0/921/0/0 · 0/913/0/0 |
| medium | Captain Bramble / Sprig | 200 | 102 / 98 | 0 | 57.4 | 146.1 | 0/997/0/0 · 0/979/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 49 left-side wins | 0 | 53.8 | 152.3 | 0/983/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 100 / 100 | 0 | 53.6 | 146.0 | 0/952/0/0 · 0/947/0/0 |
| medium | Sprig / Sprig | 100 | 60 left-side wins | 0 | 55.5 | 143.8 | 0/940/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 51 left-side wins | 0 | 78.3 | 218.8 | 0/1816/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 119 / 81 | 0 | 78.3 | 210.7 | 0/1824/0/0 · 0/1792/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 69 / 131 | 0 | 77.8 | 199.6 | 0/1801/0/0 · 0/1748/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 65 / 135 | 0 | 76.8 | 183.4 | 0/1495/0/0 · 0/1494/0/0 |
| hard | Sir Champignon / Sprig | 200 | 101 / 99 | 0 | 83.5 | 207.9 | 0/1928/0/0 · 0/1939/0/0 |
| hard | Andromoss / Andromoss | 100 | 55 left-side wins | 0 | 85.7 | 229.1 | 0/1973/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 54 / 146 | 0 | 76.3 | 188.3 | 0/1628/0/0 · 0/1627/0/0 |
| hard | Andromoss / Duskmantle | 200 | 38 / 162 | 0 | 77.5 | 176.7 | 0/1488/0/0 · 0/1527/0/0 |
| hard | Andromoss / Sprig | 200 | 88 / 112 | 0 | 76.8 | 207.9 | 0/1790/0/0 · 0/1840/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 50 left-side wins | 0 | 75.3 | 200.6 | 0/1653/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 89 / 111 | 0 | 74.8 | 179.6 | 0/1454/0/0 · 0/1475/0/0 |
| hard | Captain Bramble / Sprig | 200 | 133 / 67 | 0 | 76.7 | 200.6 | 0/1687/0/0 · 0/1731/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 57 left-side wins | 0 | 75.3 | 172.9 | 0/1454/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 135 / 65 | 0 | 74.6 | 175.7 | 0/1463/0/0 · 0/1452/0/0 |
| hard | Sprig / Sprig | 100 | 52 left-side wins | 0 | 81.0 | 239.1 | 0/1986/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 431/800 (53.9%) | 0 | 0/2130/0/0 | 1, 3, 4 |
| easy | Andromoss | 346/800 (43.3%) | 0 | 0/2112/0/0 | 1, 3, 4 |
| easy | Captain Bramble | 425/800 (53.1%) | 0 | 0/2111/0/0 | 1, 3, 4 |
| easy | Duskmantle | 363/800 (45.4%) | 0 | 0/2138/0/0 | 1, 3, 4 |
| easy | Sprig | 435/800 (54.4%) | 0 | 0/2119/0/0 | 1, 3, 4 |
| medium | Sir Champignon | 378/800 (47.3%) | 0 | 0/4779/0/0 | 1, 3, 4 |
| medium | Andromoss | 341/800 (42.6%) | 0 | 0/4817/0/0 | 1, 3, 4 |
| medium | Captain Bramble | 455/800 (56.9%) | 0 | 0/4772/0/0 | 1, 3, 4 |
| medium | Duskmantle | 407/800 (50.9%) | 0 | 0/4760/0/0 | 1, 3, 4 |
| medium | Sprig | 419/800 (52.4%) | 0 | 0/4829/0/0 | 1, 3, 4 |
| hard | Sir Champignon | 354/800 (44.3%) | 0 | 0/8864/0/0 | 1, 3, 4 |
| hard | Andromoss | 261/800 (32.6%) | 0 | 0/8671/0/0 | 1, 3, 4 |
| hard | Captain Bramble | 499/800 (62.4%) | 0 | 0/8169/0/0 | 1, 3, 4 |
| hard | Duskmantle | 543/800 (67.9%) | 0 | 0/7413/0/0 | 1, 3, 4 |
| hard | Sprig | 343/800 (42.9%) | 0 | 0/8948/0/0 | 1, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 2.12 | 781.99 / 1437.99 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 2.08 | 748.01 / 1450.66 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Captain Bramble | 2.11 | 754.33 / 1503.85 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 2.13 | 761.80 / 1452.90 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 2.10 | 787.48 / 1397.26 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 4.77 | 1617.84 / 446.00 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 4.77 | 1584.55 / 459.69 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Captain Bramble | 4.80 | 1577.63 / 446.50 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 4.72 | 1567.73 / 439.24 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 4.86 | 1658.03 / 462.10 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 8.81 | 3125.72 / 265.43 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 8.37 | 2963.36 / 250.87 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Captain Bramble | 8.14 | 2891.21 / 231.36 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 7.45 | 2567.11 / 198.17 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 8.70 | 3092.63 / 267.24 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed benefit from the cast. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 16.96 | 87.2% | 1697 / 41 | 903 | 4769 / 0 |
| easy | Andromoss | 18.60 | 88.4% | 1668 / 56 | 902 | 4725 / 0 |
| easy | Captain Bramble | 18.11 | 88.1% | 1687 / 39 | 901 | 5897 / 0 |
| easy | Duskmantle | 17.73 | 87.7% | 1705 / 41 | 902 | 4000 / 0 |
| easy | Sprig | 19.10 | 88.8% | 1682 / 30 | 903 | 6463 / 0 |
| medium | Sir Champignon | 20.61 | 76.5% | 3818 / 60 | 602 | 2856 / 275 |
| medium | Andromoss | 22.64 | 78.6% | 3815 / 59 | 602 | 3381 / 256 |
| medium | Captain Bramble | 20.02 | 75.7% | 3842 / 45 | 603 | 2808 / 234 |
| medium | Duskmantle | 22.71 | 78.9% | 3777 / 62 | 602 | 3543 / 257 |
| medium | Sprig | 21.05 | 76.6% | 3889 / 57 | 602 | 3037 / 299 |
| hard | Sir Champignon | 30.02 | 70.5% | 7048 / 34 | 301 | 9315 / 2325 |
| hard | Andromoss | 34.81 | 75.8% | 6698 / 32 | 301 | 9004 / 2076 |
| hard | Captain Bramble | 33.23 | 75.4% | 6516 / 36 | 301 | 7903 / 1967 |
| hard | Duskmantle | 30.18 | 75.2% | 5959 / 41 | 301 | 5843 / 1381 |
| hard | Sprig | 29.56 | 70.4% | 6962 / 37 | 301 | 8959 / 2258 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261118 --tier=2 --casting=opportunity --cast-profile=scaled --report=balance-tier-2`.
