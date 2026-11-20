# Five-character roster diagnostic

Isolated tier 2: 2-slot charge cap; only tier 2 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep/Tines useful/urgent selected column, no active refresh; Tin Caps visible unarmored enemy mole; Riot/Veil visible enemy mole/star, no active effect refresh or casting into wards. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-20T17:29:12.279Z. Revision 77a5e1d + working changes; config 8f6d2f0ed25c; simulation 910d0d88c912c35b; base seed 20261119. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨54.5%* | 🟨42.7%* | 🟨43.8%* | 🟨47.5%* |
| Andromoss | 🟨45.5%* | — | 🟥32.8% | 🟥33.7% | 🟨52.2%* |
| Captain Bramble | 🟨57.3%* | 🟩67.2% | — | 🟨50.0%* | 🟨54.7%* |
| Duskmantle | 🟨56.2%* | 🟩66.3% | 🟨50.0%* | — | 🟨49.3%* |
| Sprig | 🟨52.5%* | 🟨47.8%* | 🟨45.3%* | 🟨50.7%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨59.5% | 🟨50.5% | 🟨55.0% | 🟨46.0% |
| Andromoss | 🟨40.5% | — | 🟨41.0% | 🟨42.5% | 🟨42.5% |
| Captain Bramble | 🟨49.5% | 🟨59.0% | — | 🟨59.0% | 🟨45.5% |
| Duskmantle | 🟨45.0% | 🟨57.5% | 🟨41.0% | — | 🟥29.5% |
| Sprig | 🟨54.0% | 🟨57.5% | 🟨54.5% | 🟩70.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨56.0% | 🟨42.5% | 🟨43.5% | 🟨45.5% |
| Andromoss | 🟨44.0% | — | 🟥30.5% | 🟥36.0% | 🟨48.0% |
| Captain Bramble | 🟨57.5% | 🟩69.5% | — | 🟨53.0% | 🟨48.5% |
| Duskmantle | 🟨56.5% | 🟩64.0% | 🟨47.0% | — | 🟨46.0% |
| Sprig | 🟨54.5% | 🟨52.0% | 🟨51.5% | 🟨54.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨48.0% | 🟥35.0% | 🟥33.0% | 🟨51.0% |
| Andromoss | 🟨52.0% | — | 🟥27.0% | 🟥22.5% | 🟩66.0% |
| Captain Bramble | 🟩65.0% | 🟩73.0% | — | 🟥38.0% | 🟩70.0% |
| Duskmantle | 🟩67.0% | 🟩77.5% | 🟩62.0% | — | 🟩72.5% |
| Sprig | 🟨49.0% | 🟥34.0% | 🟥30.0% | 🟥27.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 59.5%, medium 56.0%, hard 48.0%; spread 11.5 points; observed favored-side flip.
- Sir Champignon vs Captain Bramble: easy 50.5%, medium 42.5%, hard 35.0%; spread 15.5 points; observed favored-side flip.
- Sir Champignon vs Duskmantle: easy 55.0%, medium 43.5%, hard 33.0%; spread 22.0 points; observed favored-side flip.
- Sir Champignon vs Sprig: easy 46.0%, medium 45.5%, hard 51.0%; spread 5.5 points; observed favored-side flip.
- Andromoss vs Sprig: easy 42.5%, medium 48.0%, hard 66.0%; spread 23.5 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 59.0%, medium 53.0%, hard 38.0%; spread 21.0 points; observed favored-side flip.
- Captain Bramble vs Sprig: easy 45.5%, medium 48.5%, hard 70.0%; spread 24.5 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 29.5%, medium 46.0%, hard 72.5%; spread 43.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 63 left-side wins | 0 | 44.5 | 135.1 | 0/431/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 119 / 81 | 0 | 44.6 | 137.6 | 0/437/0/0 · 0/413/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 101 / 99 | 0 | 44.5 | 132.8 | 0/424/0/0 · 0/414/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 110 / 90 | 0 | 45.7 | 129.0 | 0/424/0/0 · 0/421/0/0 |
| easy | Sir Champignon / Sprig | 200 | 92 / 108 | 0 | 44.4 | 134.3 | 0/428/0/0 · 0/441/0/0 |
| easy | Andromoss / Andromoss | 100 | 57 left-side wins | 0 | 45.4 | 144.7 | 0/431/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 82 / 118 | 0 | 44.3 | 143.2 | 0/436/0/0 · 0/430/0/0 |
| easy | Andromoss / Duskmantle | 200 | 85 / 115 | 0 | 47.2 | 136.0 | 0/432/0/0 · 0/442/0/0 |
| easy | Andromoss / Sprig | 200 | 85 / 115 | 0 | 43.9 | 128.1 | 0/415/0/0 · 0/428/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 60 left-side wins | 0 | 43.9 | 134.8 | 0/424/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 118 / 82 | 0 | 45.1 | 140.8 | 0/420/0/0 · 0/429/0/0 |
| easy | Captain Bramble / Sprig | 200 | 91 / 109 | 0 | 44.0 | 124.7 | 0/403/0/0 · 0/424/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 55 left-side wins | 0 | 46.2 | 150.4 | 0/438/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 59 / 141 | 0 | 43.9 | 122.9 | 0/428/0/0 · 0/444/0/0 |
| easy | Sprig / Sprig | 100 | 60 left-side wins | 0 | 44.3 | 122.3 | 0/444/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 60 left-side wins | 0 | 57.3 | 152.1 | 0/963/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 112 / 88 | 0 | 59.1 | 149.1 | 0/925/0/0 · 0/975/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 85 / 115 | 0 | 54.8 | 140.9 | 0/982/0/0 · 0/972/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 87 / 113 | 0 | 53.6 | 141.4 | 0/926/0/0 · 0/910/0/0 |
| medium | Sir Champignon / Sprig | 200 | 91 / 109 | 0 | 54.1 | 134.9 | 0/949/0/0 · 0/957/0/0 |
| medium | Andromoss / Andromoss | 100 | 55 left-side wins | 0 | 56.6 | 152.2 | 0/979/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 61 / 139 | 0 | 53.0 | 134.3 | 0/919/0/0 · 0/913/0/0 |
| medium | Andromoss / Duskmantle | 200 | 72 / 128 | 0 | 56.8 | 148.9 | 0/966/0/0 · 0/988/0/0 |
| medium | Andromoss / Sprig | 200 | 96 / 104 | 0 | 53.0 | 141.1 | 0/904/0/0 · 0/928/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 61 left-side wins | 0 | 50.3 | 144.1 | 0/935/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 106 / 94 | 0 | 50.7 | 141.8 | 0/904/0/0 · 0/908/0/0 |
| medium | Captain Bramble / Sprig | 200 | 97 / 103 | 0 | 52.8 | 143.2 | 0/948/0/0 · 0/967/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 47 left-side wins | 0 | 57.1 | 152.3 | 0/972/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 92 / 108 | 0 | 53.3 | 140.8 | 0/964/0/0 · 0/952/0/0 |
| medium | Sprig / Sprig | 100 | 61 left-side wins | 0 | 57.3 | 138.3 | 0/965/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 52 left-side wins | 0 | 78.3 | 218.8 | 0/1820/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 96 / 104 | 0 | 77.7 | 209.0 | 0/1803/0/0 · 0/1821/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 70 / 130 | 0 | 77.8 | 199.6 | 0/1810/0/0 · 0/1756/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 66 / 134 | 0 | 76.0 | 179.9 | 0/1466/0/0 · 0/1475/0/0 |
| hard | Sir Champignon / Sprig | 200 | 102 / 98 | 0 | 76.3 | 202.2 | 0/1791/0/0 · 0/1800/0/0 |
| hard | Andromoss / Andromoss | 100 | 53 left-side wins | 0 | 79.9 | 214.7 | 0/1834/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 54 / 146 | 0 | 76.2 | 190.7 | 0/1619/0/0 · 0/1642/0/0 |
| hard | Andromoss / Duskmantle | 200 | 45 / 155 | 0 | 77.1 | 175.6 | 0/1429/0/0 · 0/1488/0/0 |
| hard | Andromoss / Sprig | 200 | 132 / 68 | 0 | 73.6 | 184.7 | 0/1590/0/0 · 0/1596/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 50 left-side wins | 0 | 75.3 | 200.6 | 0/1643/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 76 / 124 | 0 | 74.7 | 182.5 | 0/1467/0/0 · 0/1501/0/0 |
| hard | Captain Bramble / Sprig | 200 | 140 / 60 | 0 | 76.3 | 190.0 | 0/1638/0/0 · 0/1661/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 75.8 | 175.9 | 0/1484/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 145 / 55 | 0 | 75.4 | 181.6 | 0/1485/0/0 · 0/1481/0/0 |
| hard | Sprig / Sprig | 100 | 59 left-side wins | 0 | 77.8 | 186.2 | 0/1750/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 422/800 (52.8%) | 0 | 0/2144/0/0 | 1, 3, 4 |
| easy | Andromoss | 333/800 (41.6%) | 0 | 0/2127/0/0 | 1, 3, 4 |
| easy | Captain Bramble | 426/800 (53.3%) | 0 | 0/2091/0/0 | 1, 3, 4 |
| easy | Duskmantle | 346/800 (43.3%) | 0 | 0/2158/0/0 | 1, 3, 4 |
| easy | Sprig | 473/800 (59.1%) | 0 | 0/2181/0/0 | 1, 3, 4 |
| medium | Sir Champignon | 375/800 (46.9%) | 0 | 0/4745/0/0 | 1, 3, 4 |
| medium | Andromoss | 317/800 (39.6%) | 0 | 0/4743/0/0 | 1, 3, 4 |
| medium | Captain Bramble | 457/800 (57.1%) | 0 | 0/4672/0/0 | 1, 3, 4 |
| medium | Duskmantle | 427/800 (53.4%) | 0 | 0/4742/0/0 | 1, 3, 4 |
| medium | Sprig | 424/800 (53.0%) | 0 | 0/4769/0/0 | 1, 3, 4 |
| hard | Sir Champignon | 334/800 (41.8%) | 0 | 0/8690/0/0 | 1, 3, 4 |
| hard | Andromoss | 335/800 (41.9%) | 0 | 0/8293/0/0 | 1, 3, 4 |
| hard | Captain Bramble | 492/800 (61.5%) | 0 | 0/8146/0/0 | 1, 3, 4 |
| hard | Duskmantle | 558/800 (69.8%) | 0 | 0/7433/0/0 | 1, 3, 4 |
| hard | Sprig | 281/800 (35.1%) | 0 | 0/8288/0/0 | 1, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 2.14 | 793.16 / 1438.50 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 2.12 | 764.19 / 1563.08 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Captain Bramble | 2.08 | 755.66 / 1582.55 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 2.15 | 769.54 / 1489.34 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 2.17 | 800.60 / 1412.49 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 4.73 | 1619.56 / 458.53 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 4.71 | 1562.04 / 459.56 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Captain Bramble | 4.67 | 1543.54 / 425.18 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 4.71 | 1554.66 / 400.65 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 4.75 | 1618.58 / 437.95 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 8.59 | 3058.32 / 276.47 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 8.07 | 2848.94 / 245.88 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Captain Bramble | 8.13 | 2860.26 / 233.13 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 7.44 | 2554.72 / 201.10 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 8.17 | 2892.31 / 290.71 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed benefit from the cast. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 15.26 | 85.6% | 1713 / 41 | 904 | 3191 / 0 |
| easy | Andromoss | 19.38 | 88.7% | 1696 / 57 | 902 | 5305 / 0 |
| easy | Captain Bramble | 16.57 | 87.1% | 1667 / 40 | 900 | 4807 / 0 |
| easy | Duskmantle | 16.74 | 86.8% | 1720 / 54 | 902 | 3020 / 0 |
| easy | Sprig | 20.63 | 89.2% | 1737 / 53 | 903 | 7085 / 0 |
| medium | Sir Champignon | 21.76 | 78.0% | 3782 / 56 | 603 | 3071 / 268 |
| medium | Andromoss | 22.46 | 78.8% | 3764 / 51 | 602 | 3450 / 255 |
| medium | Captain Bramble | 19.63 | 75.8% | 3737 / 59 | 602 | 2805 / 219 |
| medium | Duskmantle | 22.07 | 78.3% | 3770 / 59 | 601 | 2968 / 219 |
| medium | Sprig | 21.02 | 77.1% | 3804 / 45 | 603 | 2462 / 253 |
| hard | Sir Champignon | 29.43 | 70.7% | 6870 / 31 | 301 | 8409 / 2213 |
| hard | Andromoss | 33.95 | 76.1% | 6459 / 39 | 301 | 8518 / 1944 |
| hard | Captain Bramble | 33.06 | 75.3% | 6503 / 35 | 301 | 7929 / 1928 |
| hard | Duskmantle | 30.64 | 75.6% | 5949 / 30 | 301 | 6123 / 1434 |
| hard | Sprig | 27.95 | 70.6% | 6538 / 33 | 301 | 7676 / 1994 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=2 --casting=opportunity --cast-profile=scaled`.
