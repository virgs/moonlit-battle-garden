# Five-character roster diagnostic

Isolated tier 2: 2-slot charge cap; only tier 2 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep/Tines useful/urgent selected column, no active refresh; Tin Caps visible unarmored enemy mole; Riot/Veil visible enemy mole/star, no active effect refresh or casting into wards. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-20T17:59:48.427Z. Revision 2126adc + working changes; config a2b2446b60f2; simulation eafc2e335fdc5594; base seed 20261119. Tuning overrides: {"columnAutomationMs":6500,"helpingTinesMode":"continuous"}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨54.5%* | 🟨42.7%* | 🟨43.8%* | 🟨44.5%* |
| Andromoss | 🟨45.5%* | — | 🟥32.8% | 🟥33.7% | 🟨50.0%* |
| Captain Bramble | 🟨57.3%* | 🟩67.2% | — | 🟨50.0%* | 🟨49.3%* |
| Duskmantle | 🟨56.2%* | 🟩66.3% | 🟨50.0%* | — | 🟨48.7%* |
| Sprig | 🟨55.5%* | 🟨50.0%* | 🟨50.7%* | 🟨51.3%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨59.5% | 🟨50.5% | 🟨55.0% | 🟨41.5% |
| Andromoss | 🟨40.5% | — | 🟨41.0% | 🟨42.5% | 🟨40.5% |
| Captain Bramble | 🟨49.5% | 🟨59.0% | — | 🟨59.0% | 🟥39.5% |
| Duskmantle | 🟨45.0% | 🟨57.5% | 🟨41.0% | — | 🟥33.5% |
| Sprig | 🟨58.5% | 🟨59.5% | 🟩60.5% | 🟩66.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨56.0% | 🟨42.5% | 🟨43.5% | 🟨40.5% |
| Andromoss | 🟨44.0% | — | 🟥30.5% | 🟥36.0% | 🟨44.5% |
| Captain Bramble | 🟨57.5% | 🟩69.5% | — | 🟨53.0% | 🟨46.0% |
| Duskmantle | 🟨56.5% | 🟩64.0% | 🟨47.0% | — | 🟨41.0% |
| Sprig | 🟨59.5% | 🟨55.5% | 🟨54.0% | 🟨59.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨48.0% | 🟥35.0% | 🟥33.0% | 🟨51.5% |
| Andromoss | 🟨52.0% | — | 🟥27.0% | 🟥22.5% | 🟩65.0% |
| Captain Bramble | 🟩65.0% | 🟩73.0% | — | 🟥38.0% | 🟩62.5% |
| Duskmantle | 🟩67.0% | 🟩77.5% | 🟩62.0% | — | 🟩71.5% |
| Sprig | 🟨48.5% | 🟥35.0% | 🟥37.5% | 🟥28.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 59.5%, medium 56.0%, hard 48.0%; spread 11.5 points; observed favored-side flip.
- Sir Champignon vs Captain Bramble: easy 50.5%, medium 42.5%, hard 35.0%; spread 15.5 points; observed favored-side flip.
- Sir Champignon vs Duskmantle: easy 55.0%, medium 43.5%, hard 33.0%; spread 22.0 points; observed favored-side flip.
- Sir Champignon vs Sprig: easy 41.5%, medium 40.5%, hard 51.5%; spread 11.0 points; observed favored-side flip.
- Andromoss vs Sprig: easy 40.5%, medium 44.5%, hard 65.0%; spread 24.5 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 59.0%, medium 53.0%, hard 38.0%; spread 21.0 points; observed favored-side flip.
- Captain Bramble vs Sprig: easy 39.5%, medium 46.0%, hard 62.5%; spread 23.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 33.5%, medium 41.0%, hard 71.5%; spread 38.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 63 left-side wins | 0 | 44.5 | 135.1 | 0/431/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 119 / 81 | 0 | 44.6 | 137.6 | 0/437/0/0 · 0/413/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 101 / 99 | 0 | 44.5 | 132.8 | 0/424/0/0 · 0/414/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 110 / 90 | 0 | 45.7 | 129.0 | 0/424/0/0 · 0/421/0/0 |
| easy | Sir Champignon / Sprig | 200 | 83 / 117 | 0 | 43.9 | 116.7 | 0/419/0/0 · 0/414/0/0 |
| easy | Andromoss / Andromoss | 100 | 57 left-side wins | 0 | 45.4 | 144.7 | 0/431/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 82 / 118 | 0 | 44.3 | 143.2 | 0/436/0/0 · 0/430/0/0 |
| easy | Andromoss / Duskmantle | 200 | 85 / 115 | 0 | 47.2 | 136.0 | 0/432/0/0 · 0/442/0/0 |
| easy | Andromoss / Sprig | 200 | 81 / 119 | 0 | 43.4 | 125.3 | 0/416/0/0 · 0/415/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 60 left-side wins | 0 | 43.9 | 134.8 | 0/424/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 118 / 82 | 0 | 45.1 | 140.8 | 0/420/0/0 · 0/429/0/0 |
| easy | Captain Bramble / Sprig | 200 | 79 / 121 | 0 | 44.5 | 134.4 | 0/430/0/0 · 0/438/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 55 left-side wins | 0 | 46.2 | 150.4 | 0/438/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 67 / 133 | 0 | 43.0 | 116.7 | 0/424/0/0 · 0/427/0/0 |
| easy | Sprig / Sprig | 100 | 60 left-side wins | 0 | 42.5 | 119.2 | 0/430/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 60 left-side wins | 0 | 57.3 | 152.1 | 0/963/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 112 / 88 | 0 | 59.1 | 149.1 | 0/925/0/0 · 0/975/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 85 / 115 | 0 | 54.8 | 140.9 | 0/982/0/0 · 0/972/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 87 / 113 | 0 | 53.6 | 141.4 | 0/926/0/0 · 0/910/0/0 |
| medium | Sir Champignon / Sprig | 200 | 81 / 119 | 0 | 55.1 | 143.9 | 0/959/0/0 · 0/986/0/0 |
| medium | Andromoss / Andromoss | 100 | 55 left-side wins | 0 | 56.6 | 152.2 | 0/979/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 61 / 139 | 0 | 53.0 | 134.3 | 0/919/0/0 · 0/913/0/0 |
| medium | Andromoss / Duskmantle | 200 | 72 / 128 | 0 | 56.8 | 148.9 | 0/966/0/0 · 0/988/0/0 |
| medium | Andromoss / Sprig | 200 | 89 / 111 | 0 | 56.9 | 138.9 | 0/927/0/0 · 0/936/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 61 left-side wins | 0 | 50.3 | 144.1 | 0/935/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 106 / 94 | 0 | 50.7 | 141.8 | 0/904/0/0 · 0/908/0/0 |
| medium | Captain Bramble / Sprig | 200 | 92 / 108 | 0 | 53.6 | 141.8 | 0/943/0/0 · 0/944/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 47 left-side wins | 0 | 57.1 | 152.3 | 0/972/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 82 / 118 | 0 | 53.5 | 141.9 | 0/923/0/0 · 0/936/0/0 |
| medium | Sprig / Sprig | 100 | 59 left-side wins | 0 | 53.6 | 145.6 | 0/978/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 52 left-side wins | 0 | 78.3 | 218.8 | 0/1820/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 96 / 104 | 0 | 77.7 | 209.0 | 0/1803/0/0 · 0/1821/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 70 / 130 | 0 | 77.8 | 199.6 | 0/1810/0/0 · 0/1756/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 66 / 134 | 0 | 76.0 | 179.9 | 0/1466/0/0 · 0/1475/0/0 |
| hard | Sir Champignon / Sprig | 200 | 103 / 97 | 0 | 80.9 | 221.7 | 0/1894/0/0 · 0/1900/0/0 |
| hard | Andromoss / Andromoss | 100 | 53 left-side wins | 0 | 79.9 | 214.7 | 0/1834/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 54 / 146 | 0 | 76.2 | 190.7 | 0/1619/0/0 · 0/1642/0/0 |
| hard | Andromoss / Duskmantle | 200 | 45 / 155 | 0 | 77.1 | 175.6 | 0/1429/0/0 · 0/1488/0/0 |
| hard | Andromoss / Sprig | 200 | 130 / 70 | 0 | 72.7 | 203.7 | 0/1625/0/0 · 0/1648/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 50 left-side wins | 0 | 75.3 | 200.6 | 0/1643/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 76 / 124 | 0 | 74.7 | 182.5 | 0/1467/0/0 · 0/1501/0/0 |
| hard | Captain Bramble / Sprig | 200 | 125 / 75 | 0 | 79.0 | 192.8 | 0/1690/0/0 · 0/1721/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 75.8 | 175.9 | 0/1484/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 143 / 57 | 0 | 76.8 | 183.4 | 0/1529/0/0 · 0/1518/0/0 |
| hard | Sprig / Sprig | 100 | 58 left-side wins | 0 | 76.8 | 210.8 | 0/1768/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 413/800 (51.6%) | 0 | 0/2135/0/0 | 1, 3, 4 |
| easy | Andromoss | 329/800 (41.1%) | 0 | 0/2128/0/0 | 1, 3, 4 |
| easy | Captain Bramble | 414/800 (51.7%) | 0 | 0/2118/0/0 | 1, 3, 4 |
| easy | Duskmantle | 354/800 (44.3%) | 0 | 0/2154/0/0 | 1, 3, 4 |
| easy | Sprig | 490/800 (61.3%) | 0 | 0/2124/0/0 | 1, 3, 4 |
| medium | Sir Champignon | 365/800 (45.6%) | 0 | 0/4755/0/0 | 1, 3, 4 |
| medium | Andromoss | 310/800 (38.8%) | 0 | 0/4766/0/0 | 1, 3, 4 |
| medium | Captain Bramble | 452/800 (56.5%) | 0 | 0/4667/0/0 | 1, 3, 4 |
| medium | Duskmantle | 417/800 (52.1%) | 0 | 0/4701/0/0 | 1, 3, 4 |
| medium | Sprig | 456/800 (57.0%) | 0 | 0/4780/0/0 | 1, 3, 4 |
| hard | Sir Champignon | 335/800 (41.9%) | 0 | 0/8793/0/0 | 1, 3, 4 |
| hard | Andromoss | 333/800 (41.6%) | 0 | 0/8328/0/0 | 1, 3, 4 |
| hard | Captain Bramble | 477/800 (59.6%) | 0 | 0/8198/0/0 | 1, 3, 4 |
| hard | Duskmantle | 556/800 (69.5%) | 0 | 0/7477/0/0 | 1, 3, 4 |
| hard | Sprig | 299/800 (37.4%) | 0 | 0/8555/0/0 | 1, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 2.13 | 791.21 / 1381.62 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 2.12 | 765.29 / 1507.90 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Captain Bramble | 2.12 | 760.81 / 1553.21 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 2.15 | 768.52 / 1476.95 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 2.12 | 809.34 / 1256.25 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 4.74 | 1629.22 / 465.62 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 4.73 | 1572.14 / 463.89 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Captain Bramble | 4.67 | 1541.95 / 420.51 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 4.66 | 1544.83 / 396.49 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 4.75 | 1640.55 / 439.63 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 8.72 | 3102.04 / 278.70 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 8.12 | 2877.78 / 248.49 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Captain Bramble | 8.19 | 2891.10 / 236.75 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 7.49 | 2576.63 / 201.86 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 8.48 | 3029.71 / 302.69 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed benefit from the cast. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 16.62 | 86.9% | 1704 / 44 | 906 | 4181 / 0 |
| easy | Andromoss | 20.23 | 89.2% | 1697 / 58 | 903 | 6056 / 0 |
| easy | Captain Bramble | 16.25 | 86.7% | 1694 / 41 | 900 | 4393 / 0 |
| easy | Duskmantle | 16.83 | 86.9% | 1716 / 50 | 903 | 3047 / 0 |
| easy | Sprig | 16.83 | 87.1% | 1694 / 48 | 903 | 4486 / 0 |
| medium | Sir Champignon | 21.61 | 77.8% | 3792 / 54 | 603 | 2980 / 277 |
| medium | Andromoss | 22.76 | 78.9% | 3787 / 49 | 602 | 3673 / 257 |
| medium | Captain Bramble | 19.28 | 75.5% | 3732 / 52 | 603 | 2661 / 214 |
| medium | Duskmantle | 21.53 | 78.0% | 3729 / 64 | 601 | 2796 / 206 |
| medium | Sprig | 21.39 | 77.5% | 3802 / 46 | 602 | 2837 / 273 |
| hard | Sir Champignon | 29.91 | 70.7% | 6973 / 33 | 301 | 8751 / 2267 |
| hard | Andromoss | 34.09 | 76.0% | 6494 / 41 | 301 | 8640 / 2017 |
| hard | Captain Bramble | 33.05 | 75.1% | 6555 / 33 | 301 | 8016 / 1999 |
| hard | Duskmantle | 30.73 | 75.5% | 5993 / 31 | 301 | 6176 / 1438 |
| hard | Sprig | 29.11 | 70.7% | 6787 / 27 | 301 | 8468 / 2184 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=2 --casting=opportunity --cast-profile=scaled --report=tines10-continuous-only --tines-mode=continuous --tines-ms=6500`.

Explicit reproduction:

`pnpm balance:roster --tier=2 --seeds=100 --seed=20261119 --tines-mode=continuous --tines-ms=6500 --report=tines10-continuous-only`
