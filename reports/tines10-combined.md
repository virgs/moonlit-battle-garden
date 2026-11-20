# Five-character roster diagnostic

Isolated tier 2: 2-slot charge cap; only tier 2 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep/Tines useful/urgent selected column, no active refresh; Tin Caps visible unarmored enemy mole; Riot/Veil visible enemy mole/star, no active effect refresh or casting into wards. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-20T17:59:50.612Z. Revision 2126adc + working changes; config f9cd31f40944; simulation eafc2e335fdc5594; base seed 20261119. Tuning overrides: {"columnAutomationMs":10000,"helpingTinesMode":"continuous"}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨54.5%* | 🟨42.7%* | 🟨43.8%* | 🟥37.0% |
| Andromoss | 🟨45.5%* | — | 🟥32.8% | 🟥33.7% | 🟨52.5%* |
| Captain Bramble | 🟨57.3%* | 🟩67.2% | — | 🟨50.0%* | 🟨41.3%* |
| Duskmantle | 🟨56.2%* | 🟩66.3% | 🟨50.0%* | — | 🟨42.2%* |
| Sprig | 🟩63.0% | 🟨47.5%* | 🟨58.7%* | 🟨57.8%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨59.5% | 🟨50.5% | 🟨55.0% | 🟥32.5% |
| Andromoss | 🟨40.5% | — | 🟨41.0% | 🟨42.5% | 🟥36.0% |
| Captain Bramble | 🟨49.5% | 🟨59.0% | — | 🟨59.0% | 🟥33.0% |
| Duskmantle | 🟨45.0% | 🟨57.5% | 🟨41.0% | — | 🟥23.5% |
| Sprig | 🟩67.5% | 🟩64.0% | 🟩67.0% | 🟩76.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨56.0% | 🟨42.5% | 🟨43.5% | 🟥31.5% |
| Andromoss | 🟨44.0% | — | 🟥30.5% | 🟥36.0% | 🟨44.0% |
| Captain Bramble | 🟨57.5% | 🟩69.5% | — | 🟨53.0% | 🟥36.0% |
| Duskmantle | 🟨56.5% | 🟩64.0% | 🟨47.0% | — | 🟥35.5% |
| Sprig | 🟩68.5% | 🟨56.0% | 🟩64.0% | 🟩64.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨48.0% | 🟥35.0% | 🟥33.0% | 🟨47.0% |
| Andromoss | 🟨52.0% | — | 🟥27.0% | 🟥22.5% | 🟩77.5% |
| Captain Bramble | 🟩65.0% | 🟩73.0% | — | 🟥38.0% | 🟨55.0% |
| Duskmantle | 🟩67.0% | 🟩77.5% | 🟩62.0% | — | 🟩67.5% |
| Sprig | 🟨53.0% | 🟥22.5% | 🟨45.0% | 🟥32.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 59.5%, medium 56.0%, hard 48.0%; spread 11.5 points; observed favored-side flip.
- Sir Champignon vs Captain Bramble: easy 50.5%, medium 42.5%, hard 35.0%; spread 15.5 points; observed favored-side flip.
- Sir Champignon vs Duskmantle: easy 55.0%, medium 43.5%, hard 33.0%; spread 22.0 points; observed favored-side flip.
- Andromoss vs Sprig: easy 36.0%, medium 44.0%, hard 77.5%; spread 41.5 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 59.0%, medium 53.0%, hard 38.0%; spread 21.0 points; observed favored-side flip.
- Captain Bramble vs Sprig: easy 33.0%, medium 36.0%, hard 55.0%; spread 22.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 23.5%, medium 35.5%, hard 67.5%; spread 44.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 63 left-side wins | 0 | 44.5 | 135.1 | 0/431/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 119 / 81 | 0 | 44.6 | 137.6 | 0/437/0/0 · 0/413/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 101 / 99 | 0 | 44.5 | 132.8 | 0/424/0/0 · 0/414/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 110 / 90 | 0 | 45.7 | 129.0 | 0/424/0/0 · 0/421/0/0 |
| easy | Sir Champignon / Sprig | 200 | 65 / 135 | 0 | 43.4 | 111.8 | 0/411/0/0 · 0/424/0/0 |
| easy | Andromoss / Andromoss | 100 | 57 left-side wins | 0 | 45.4 | 144.7 | 0/431/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 82 / 118 | 0 | 44.3 | 143.2 | 0/436/0/0 · 0/430/0/0 |
| easy | Andromoss / Duskmantle | 200 | 85 / 115 | 0 | 47.2 | 136.0 | 0/432/0/0 · 0/442/0/0 |
| easy | Andromoss / Sprig | 200 | 72 / 128 | 0 | 44.3 | 111.3 | 0/406/0/0 · 0/417/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 60 left-side wins | 0 | 43.9 | 134.8 | 0/424/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 118 / 82 | 0 | 45.1 | 140.8 | 0/420/0/0 · 0/429/0/0 |
| easy | Captain Bramble / Sprig | 200 | 66 / 134 | 0 | 43.3 | 115.4 | 0/420/0/0 · 0/421/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 55 left-side wins | 0 | 46.2 | 150.4 | 0/438/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 47 / 153 | 0 | 43.3 | 115.2 | 0/418/0/0 · 0/426/0/0 |
| easy | Sprig / Sprig | 100 | 58 left-side wins | 0 | 43.1 | 108.0 | 0/431/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 60 left-side wins | 0 | 57.3 | 152.1 | 0/963/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 112 / 88 | 0 | 59.1 | 149.1 | 0/925/0/0 · 0/975/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 85 / 115 | 0 | 54.8 | 140.9 | 0/982/0/0 · 0/972/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 87 / 113 | 0 | 53.6 | 141.4 | 0/926/0/0 · 0/910/0/0 |
| medium | Sir Champignon / Sprig | 200 | 63 / 137 | 0 | 56.0 | 134.2 | 0/965/0/0 · 0/955/0/0 |
| medium | Andromoss / Andromoss | 100 | 55 left-side wins | 0 | 56.6 | 152.2 | 0/979/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 61 / 139 | 0 | 53.0 | 134.3 | 0/919/0/0 · 0/913/0/0 |
| medium | Andromoss / Duskmantle | 200 | 72 / 128 | 0 | 56.8 | 148.9 | 0/966/0/0 · 0/988/0/0 |
| medium | Andromoss / Sprig | 200 | 88 / 112 | 0 | 53.0 | 137.8 | 0/881/0/0 · 0/895/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 61 left-side wins | 0 | 50.3 | 144.1 | 0/935/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 106 / 94 | 0 | 50.7 | 141.8 | 0/904/0/0 · 0/908/0/0 |
| medium | Captain Bramble / Sprig | 200 | 72 / 128 | 0 | 53.0 | 138.2 | 0/917/0/0 · 0/967/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 47 left-side wins | 0 | 57.1 | 152.3 | 0/972/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 71 / 129 | 0 | 52.7 | 131.7 | 0/894/0/0 · 0/901/0/0 |
| medium | Sprig / Sprig | 100 | 54 left-side wins | 0 | 54.5 | 137.9 | 0/941/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 52 left-side wins | 0 | 78.3 | 218.8 | 0/1820/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 96 / 104 | 0 | 77.7 | 209.0 | 0/1803/0/0 · 0/1821/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 70 / 130 | 0 | 77.8 | 199.6 | 0/1810/0/0 · 0/1756/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 66 / 134 | 0 | 76.0 | 179.9 | 0/1466/0/0 · 0/1475/0/0 |
| hard | Sir Champignon / Sprig | 200 | 94 / 106 | 0 | 75.0 | 203.8 | 0/1715/0/0 · 0/1746/0/0 |
| hard | Andromoss / Andromoss | 100 | 53 left-side wins | 0 | 79.9 | 214.7 | 0/1834/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 54 / 146 | 0 | 76.2 | 190.7 | 0/1619/0/0 · 0/1642/0/0 |
| hard | Andromoss / Duskmantle | 200 | 45 / 155 | 0 | 77.1 | 175.6 | 0/1429/0/0 · 0/1488/0/0 |
| hard | Andromoss / Sprig | 200 | 155 / 45 | 0 | 69.5 | 163.8 | 0/1504/0/0 · 0/1536/0/0 |
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
| easy | Sir Champignon | 395/800 (49.4%) | 0 | 0/2127/0/0 | 1, 3, 4 |
| easy | Andromoss | 320/800 (40.0%) | 0 | 0/2118/0/0 | 1, 3, 4 |
| easy | Captain Bramble | 401/800 (50.1%) | 0 | 0/2108/0/0 | 1, 3, 4 |
| easy | Duskmantle | 334/800 (41.8%) | 0 | 0/2148/0/0 | 1, 3, 4 |
| easy | Sprig | 550/800 (68.8%) | 0 | 0/2119/0/0 | 1, 3, 4 |
| medium | Sir Champignon | 347/800 (43.4%) | 0 | 0/4761/0/0 | 1, 3, 4 |
| medium | Andromoss | 309/800 (38.6%) | 0 | 0/4720/0/0 | 1, 3, 4 |
| medium | Captain Bramble | 432/800 (54.0%) | 0 | 0/4641/0/0 | 1, 3, 4 |
| medium | Duskmantle | 406/800 (50.7%) | 0 | 0/4672/0/0 | 1, 3, 4 |
| medium | Sprig | 506/800 (63.2%) | 0 | 0/4659/0/0 | 1, 3, 4 |
| hard | Sir Champignon | 326/800 (40.8%) | 0 | 0/8614/0/0 | 1, 3, 4 |
| hard | Andromoss | 358/800 (44.8%) | 0 | 0/8207/0/0 | 1, 3, 4 |
| hard | Captain Bramble | 462/800 (57.8%) | 0 | 0/8103/0/0 | 1, 3, 4 |
| hard | Duskmantle | 548/800 (68.5%) | 0 | 0/7408/0/0 | 1, 3, 4 |
| hard | Sprig | 306/800 (38.3%) | 0 | 0/8162/0/0 | 1, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 2.12 | 787.49 / 1338.95 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 2.11 | 761.65 / 1494.73 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Captain Bramble | 2.10 | 758.39 / 1471.10 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 2.14 | 764.76 / 1437.93 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 2.11 | 813.65 / 1072.54 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 4.75 | 1615.69 / 450.56 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 4.68 | 1550.54 / 445.13 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Captain Bramble | 4.63 | 1535.86 / 413.96 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 4.63 | 1532.24 / 395.93 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 4.65 | 1609.19 / 399.67 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 8.49 | 3025.51 / 272.23 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 7.97 | 2814.38 / 241.76 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Captain Bramble | 8.07 | 2857.50 / 233.72 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 7.41 | 2557.67 / 201.59 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 8.04 | 2862.98 / 310.23 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed benefit from the cast. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 16.03 | 86.5% | 1696 / 41 | 905 | 3762 / 0 |
| easy | Andromoss | 19.33 | 88.7% | 1687 / 56 | 903 | 5547 / 0 |
| easy | Captain Bramble | 16.32 | 86.8% | 1684 / 39 | 900 | 4735 / 0 |
| easy | Duskmantle | 17.50 | 87.5% | 1710 / 44 | 902 | 3838 / 0 |
| easy | Sprig | 16.78 | 87.1% | 1688 / 44 | 902 | 4320 / 0 |
| medium | Sir Champignon | 21.64 | 77.7% | 3798 / 59 | 603 | 2956 / 263 |
| medium | Andromoss | 21.89 | 78.3% | 3741 / 53 | 602 | 3328 / 246 |
| medium | Captain Bramble | 18.88 | 75.2% | 3706 / 47 | 602 | 2514 / 208 |
| medium | Duskmantle | 21.36 | 78.0% | 3700 / 66 | 602 | 2820 / 205 |
| medium | Sprig | 20.76 | 77.3% | 3718 / 56 | 603 | 2444 / 229 |
| hard | Sir Champignon | 28.86 | 70.4% | 6794 / 31 | 301 | 8045 / 2114 |
| hard | Andromoss | 33.16 | 75.8% | 6373 / 38 | 301 | 8132 / 1908 |
| hard | Captain Bramble | 32.63 | 75.1% | 6460 / 32 | 301 | 7657 / 1905 |
| hard | Duskmantle | 30.43 | 75.5% | 5924 / 31 | 301 | 6045 / 1423 |
| hard | Sprig | 27.22 | 70.3% | 6431 / 33 | 301 | 7188 / 1872 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=2 --casting=opportunity --cast-profile=scaled --report=tines10-combined --tines-mode=continuous --tines-ms=10000`.

Explicit reproduction:

`pnpm balance:roster --tier=2 --seeds=100 --seed=20261119 --tines-mode=continuous --tines-ms=10000 --report=tines10-combined`
