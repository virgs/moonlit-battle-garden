# Five-character roster diagnostic

Isolated tier 4: 4-slot charge cap; only tier 4 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Royal useful/urgent busiest one column, no active sweep refresh; Clockwork useful/urgent busiest two columns, no active refresh; hostile effects avoid wards and active same-effect renewal, with visible enemy witnesses. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-21T03:58:13.151Z. Revision e9faf67 + working changes; config 26bdb9b0a7e5; simulation f5fce78d977f08ab; base seed 20261118. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨45.0%* | 🟨40.8%* | 🟨53.8%* | 🟨51.5%* |
| Andromoss | 🟨55.0%* | — | 🟥39.0%* | 🟨53.8% | 🟨58.7%* |
| Captain Bramble | 🟨59.2%* | 🟩61.0%* | — | 🟩64.7%* | 🟨57.0%* |
| Duskmantle | 🟨46.2%* | 🟨46.2% | 🟥35.3%* | — | 🟨45.0% |
| Sprig | 🟨48.5%* | 🟨41.3%* | 🟨43.0%* | 🟨55.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨52.5% | 🟨54.0% | 🟨56.0% | 🟨55.0% |
| Andromoss | 🟨47.5% | — | 🟨52.5% | 🟨53.0% | 🟨49.0% |
| Captain Bramble | 🟨46.0% | 🟨47.5% | — | 🟨49.5% | 🟨46.0% |
| Duskmantle | 🟨44.0% | 🟨47.0% | 🟨50.5% | — | 🟨45.0% |
| Sprig | 🟨45.0% | 🟨51.0% | 🟨54.0% | 🟨55.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨44.5% | 🟨44.0% | 🟨58.0% | 🟨50.5% |
| Andromoss | 🟨55.5% | — | 🟨41.5% | 🟨57.0% | 🟩60.5% |
| Captain Bramble | 🟨56.0% | 🟨58.5% | — | 🟩68.5% | 🟨56.0% |
| Duskmantle | 🟨42.0% | 🟨43.0% | 🟥31.5% | — | 🟨44.0% |
| Sprig | 🟨49.5% | 🟥39.5% | 🟨44.0% | 🟨56.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟥38.0% | 🟥24.5% | 🟨47.5% | 🟨49.0% |
| Andromoss | 🟩62.0% | — | 🟥23.0% | 🟨51.5% | 🟩66.5% |
| Captain Bramble | 🟩75.5% | 🟩77.0% | — | 🟩76.0% | 🟩69.0% |
| Duskmantle | 🟨52.5% | 🟨48.5% | 🟥24.0% | — | 🟨46.0% |
| Sprig | 🟨51.0% | 🟥33.5% | 🟥31.0% | 🟨54.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 52.5%, medium 44.5%, hard 38.0%; spread 14.5 points; observed favored-side flip.
- Sir Champignon vs Captain Bramble: easy 54.0%, medium 44.0%, hard 24.5%; spread 29.5 points; observed favored-side flip.
- Sir Champignon vs Duskmantle: easy 56.0%, medium 58.0%, hard 47.5%; spread 10.5 points; observed favored-side flip.
- Sir Champignon vs Sprig: easy 55.0%, medium 50.5%, hard 49.0%; spread 6.0 points; observed favored-side flip.
- Andromoss vs Captain Bramble: easy 52.5%, medium 41.5%, hard 23.0%; spread 29.5 points; observed favored-side flip.
- Andromoss vs Sprig: easy 49.0%, medium 60.5%, hard 66.5%; spread 17.5 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 49.5%, medium 68.5%, hard 76.0%; spread 26.5 points; observed favored-side flip.
- Captain Bramble vs Sprig: easy 46.0%, medium 56.0%, hard 69.0%; spread 23.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 42.6 | 121.5 | 0/0/0/86 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 105 / 95 | 0 | 42.9 | 121.0 | 0/0/0/80 · 0/0/0/88 |
| easy | Sir Champignon / Captain Bramble | 200 | 108 / 92 | 0 | 42.9 | 122.5 | 0/0/0/85 · 0/0/0/88 |
| easy | Sir Champignon / Duskmantle | 200 | 112 / 88 | 0 | 42.9 | 121.5 | 0/0/0/91 · 0/0/0/87 |
| easy | Sir Champignon / Sprig | 200 | 110 / 90 | 0 | 42.1 | 123.4 | 0/0/0/92 · 0/0/0/62 |
| easy | Andromoss / Andromoss | 100 | 55 left-side wins | 0 | 43.3 | 124.5 | 0/0/0/86 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 105 / 95 | 0 | 43.1 | 124.5 | 0/0/0/80 · 0/0/0/84 |
| easy | Andromoss / Duskmantle | 200 | 106 / 94 | 0 | 43.0 | 133.0 | 0/0/0/89 · 0/0/0/84 |
| easy | Andromoss / Sprig | 200 | 98 / 102 | 0 | 42.9 | 120.1 | 0/0/0/92 · 0/0/0/63 |
| easy | Captain Bramble / Captain Bramble | 100 | 62 left-side wins | 0 | 42.9 | 127.1 | 0/0/0/83 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 99 / 101 | 0 | 42.9 | 123.2 | 0/0/0/91 · 0/0/0/87 |
| easy | Captain Bramble / Sprig | 200 | 92 / 108 | 0 | 43.0 | 123.8 | 0/0/0/93 · 0/0/0/64 |
| easy | Duskmantle / Duskmantle | 100 | 59 left-side wins | 0 | 43.3 | 133.2 | 0/0/0/94 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 90 / 110 | 0 | 43.0 | 127.4 | 0/0/0/96 · 0/0/0/78 |
| easy | Sprig / Sprig | 100 | 58 left-side wins | 0 | 42.9 | 123.5 | 0/0/0/65 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 54 left-side wins | 0 | 57.5 | 144.5 | 0/0/0/398 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 89 / 111 | 0 | 51.3 | 138.0 | 0/0/0/361 · 0/0/0/360 |
| medium | Sir Champignon / Captain Bramble | 200 | 88 / 112 | 0 | 49.1 | 135.1 | 0/0/0/356 · 0/0/0/361 |
| medium | Sir Champignon / Duskmantle | 200 | 116 / 84 | 0 | 53.0 | 143.7 | 0/0/0/396 · 0/0/0/369 |
| medium | Sir Champignon / Sprig | 200 | 101 / 99 | 0 | 53.3 | 140.1 | 0/0/0/370 · 0/0/0/360 |
| medium | Andromoss / Andromoss | 100 | 62 left-side wins | 0 | 53.1 | 129.0 | 0/0/0/358 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 83 / 117 | 0 | 49.0 | 132.8 | 0/0/0/346 · 0/0/0/344 |
| medium | Andromoss / Duskmantle | 200 | 114 / 86 | 0 | 51.9 | 138.6 | 0/0/0/370 · 0/0/0/366 |
| medium | Andromoss / Sprig | 200 | 121 / 79 | 0 | 49.0 | 135.4 | 0/0/0/352 · 0/0/0/343 |
| medium | Captain Bramble / Captain Bramble | 100 | 54 left-side wins | 0 | 48.1 | 138.3 | 0/0/0/353 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 137 / 63 | 0 | 48.6 | 133.8 | 0/0/0/371 · 0/0/0/354 |
| medium | Captain Bramble / Sprig | 200 | 112 / 88 | 0 | 51.5 | 134.8 | 0/0/0/368 · 0/0/0/350 |
| medium | Duskmantle / Duskmantle | 100 | 57 left-side wins | 0 | 53.0 | 145.2 | 0/0/0/367 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 88 / 112 | 0 | 51.5 | 136.7 | 0/0/0/367 · 0/0/0/358 |
| medium | Sprig / Sprig | 100 | 56 left-side wins | 0 | 61.3 | 151.2 | 0/0/0/362 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 55 left-side wins | 0 | 73.1 | 191.6 | 0/0/0/828 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 76 / 124 | 0 | 70.1 | 174.2 | 0/0/0/742 · 0/0/0/740 |
| hard | Sir Champignon / Captain Bramble | 200 | 49 / 151 | 0 | 72.5 | 185.8 | 0/0/0/734 · 0/0/0/739 |
| hard | Sir Champignon / Duskmantle | 200 | 95 / 105 | 0 | 75.7 | 198.8 | 0/0/0/857 · 0/0/0/845 |
| hard | Sir Champignon / Sprig | 200 | 98 / 102 | 0 | 75.5 | 181.7 | 0/0/0/799 · 0/0/0/807 |
| hard | Andromoss / Andromoss | 100 | 53 left-side wins | 0 | 76.0 | 206.9 | 0/0/0/863 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 46 / 154 | 0 | 73.3 | 172.2 | 0/0/0/710 · 0/0/0/753 |
| hard | Andromoss / Duskmantle | 200 | 103 / 97 | 0 | 74.5 | 201.1 | 0/0/0/847 · 0/0/0/851 |
| hard | Andromoss / Sprig | 200 | 133 / 67 | 0 | 70.0 | 178.2 | 0/0/0/766 · 0/0/0/781 |
| hard | Captain Bramble / Captain Bramble | 100 | 54 left-side wins | 0 | 73.7 | 177.7 | 0/0/0/728 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 152 / 48 | 0 | 73.0 | 171.4 | 0/0/0/718 · 0/0/0/703 |
| hard | Captain Bramble / Sprig | 200 | 138 / 62 | 0 | 70.7 | 169.7 | 0/0/0/719 · 0/0/0/701 |
| hard | Duskmantle / Duskmantle | 100 | 58 left-side wins | 0 | 77.0 | 208.8 | 0/0/0/897 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 92 / 108 | 0 | 72.5 | 187.8 | 0/0/0/815 · 0/0/0/845 |
| hard | Sprig / Sprig | 100 | 54 left-side wins | 0 | 73.5 | 202.1 | 0/0/0/800 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 435/800 (54.4%) | 0 | 0/0/0/434 | 1, 2, 3 |
| easy | Andromoss | 404/800 (50.5%) | 0 | 0/0/0/435 | 1, 2, 3 |
| easy | Captain Bramble | 378/800 (47.3%) | 0 | 0/0/0/439 | 1, 2, 3 |
| easy | Duskmantle | 373/800 (46.6%) | 0 | 0/0/0/448 | 1, 2, 3 |
| easy | Sprig | 410/800 (51.2%) | 0 | 0/0/0/332 | 1, 2, 3 |
| medium | Sir Champignon | 394/800 (49.3%) | 0 | 0/0/0/1881 | 1, 2, 3 |
| medium | Andromoss | 429/800 (53.6%) | 0 | 0/0/0/1786 | 1, 2, 3 |
| medium | Captain Bramble | 478/800 (59.8%) | 0 | 0/0/0/1797 | 1, 2, 3 |
| medium | Duskmantle | 321/800 (40.1%) | 0 | 0/0/0/1823 | 1, 2, 3 |
| medium | Sprig | 378/800 (47.3%) | 0 | 0/0/0/1773 | 1, 2, 3 |
| hard | Sir Champignon | 318/800 (39.8%) | 0 | 0/0/0/3960 | 1, 2, 3 |
| hard | Andromoss | 406/800 (50.7%) | 0 | 0/0/0/3926 | 1, 2, 3 |
| hard | Captain Bramble | 595/800 (74.4%) | 0 | 0/0/0/3657 | 1, 2, 3 |
| hard | Duskmantle | 342/800 (42.8%) | 0 | 0/0/0/4111 | 1, 2, 3 |
| hard | Sprig | 339/800 (42.4%) | 0 | 0/0/0/3934 | 1, 2, 3 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 0.43 | 791.34 / 1387.77 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 0.44 | 784.58 / 1409.02 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Captain Bramble | 0.45 | 776.77 / 1374.18 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 0.44 | 777.47 / 1344.48 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 0.33 | 794.04 / 1304.22 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 1.85 | 1659.79 / 467.43 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 1.78 | 1577.04 / 441.67 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Captain Bramble | 1.80 | 1572.56 / 450.78 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 1.82 | 1617.97 / 487.21 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 1.76 | 1654.42 / 485.15 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 3.92 | 3181.81 / 288.23 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 3.83 | 3089.08 / 257.69 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Captain Bramble | 3.66 | 2875.49 / 222.97 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 4.02 | 3245.09 / 269.70 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 3.92 | 3166.40 / 292.13 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed benefit from the cast. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 6.89 | 93.4% | 348 / 17 | 895 | 2935 / 0 |
| easy | Andromoss | 10.55 | 95.5% | 349 / 28 | 897 | 4832 / 0 |
| easy | Captain Bramble | 7.13 | 93.5% | 356 / 14 | 897 | 2525 / 0 |
| easy | Duskmantle | 7.15 | 93.6% | 354 / 13 | 897 | 2719 / 0 |
| easy | Sprig | 38.69 | 99.0% | 267 / 54 | 898 | 21283 / 0 |
| medium | Sir Champignon | 8.54 | 78.0% | 1483 / 24 | 600 | 1554 / 158 |
| medium | Andromoss | 9.01 | 79.8% | 1428 / 29 | 601 | 1518 / 134 |
| medium | Captain Bramble | 8.47 | 78.1% | 1444 / 38 | 601 | 1763 / 146 |
| medium | Duskmantle | 8.44 | 77.9% | 1456 / 38 | 600 | 1864 / 145 |
| medium | Sprig | 21.87 | 91.6% | 1411 / 57 | 601 | 4932 / 151 |
| hard | Sir Champignon | 14.83 | 73.4% | 3132 / 18 | 301 | 5976 / 1434 |
| hard | Andromoss | 16.34 | 76.4% | 3063 / 20 | 301 | 5812 / 1376 |
| hard | Captain Bramble | 14.71 | 75.0% | 2929 / 14 | 301 | 5062 / 1267 |
| hard | Duskmantle | 15.98 | 74.7% | 3214 / 20 | 301 | 5939 / 1503 |
| hard | Sprig | 21.74 | 81.8% | 3134 / 26 | 301 | 10272 / 1443 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261118 --tier=4 --casting=opportunity --cast-profile=scaled --report=balance-tier-4`.
