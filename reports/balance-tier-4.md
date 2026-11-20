# Five-character roster diagnostic

Isolated tier 4: 4-slot charge cap; only tier 4 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Royal useful visible own mole/star, no active sweep refresh; Clockwork useful/urgent busiest two columns, no active refresh; hostile effects avoid wards and active same-effect renewal, with visible enemy witnesses. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-20T20:37:50.474Z. Revision 3a166ba + working changes; config f9cd31f40944; simulation 8dd135ec1165a444; base seed 20261119. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩68.8%* | 🟨49.7%* | 🟩66.3% | 🟨57.5%* |
| Andromoss | 🟥31.2%* | — | 🟥30.8%* | 🟨43.2%* | 🟨46.0%* |
| Captain Bramble | 🟨50.3%* | 🟩69.2%* | — | 🟩68.8%* | 🟨59.2%* |
| Duskmantle | 🟥33.7% | 🟨56.8%* | 🟥31.2%* | — | 🟨45.7%* |
| Sprig | 🟨42.5%* | 🟨54.0%* | 🟨40.8%* | 🟨54.3%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨55.5% | 🟨55.5% | 🟨57.5% | 🟨51.0% |
| Andromoss | 🟨44.5% | — | 🟨48.5% | 🟨51.5% | 🟨44.0% |
| Captain Bramble | 🟨44.5% | 🟨51.5% | — | 🟨51.5% | 🟨45.0% |
| Duskmantle | 🟨42.5% | 🟨48.5% | 🟨48.5% | — | 🟨41.0% |
| Sprig | 🟨49.0% | 🟨56.0% | 🟨55.0% | 🟨59.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩68.0% | 🟨52.0% | 🟩70.0% | 🟨50.5% |
| Andromoss | 🟥32.0% | — | 🟥33.0% | 🟨50.5% | 🟨42.0% |
| Captain Bramble | 🟨48.0% | 🟩67.0% | — | 🟩74.0% | 🟨55.5% |
| Duskmantle | 🟥30.0% | 🟨49.5% | 🟥26.0% | — | 🟨41.5% |
| Sprig | 🟨49.5% | 🟨58.0% | 🟨44.5% | 🟨58.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩83.0% | 🟨41.5% | 🟩71.5% | 🟩71.0% |
| Andromoss | 🟥17.0% | — | 🟥11.0% | 🟥27.5% | 🟨52.0% |
| Captain Bramble | 🟨58.5% | 🟩89.0% | — | 🟩81.0% | 🟩77.0% |
| Duskmantle | 🟥28.5% | 🟩72.5% | 🟥19.0% | — | 🟨54.5% |
| Sprig | 🟥29.0% | 🟨48.0% | 🟥23.0% | 🟨45.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 55.5%, medium 68.0%, hard 83.0%; spread 27.5 points.
- Sir Champignon vs Captain Bramble: easy 55.5%, medium 52.0%, hard 41.5%; spread 14.0 points; observed favored-side flip.
- Sir Champignon vs Sprig: easy 51.0%, medium 50.5%, hard 71.0%; spread 20.5 points.
- Andromoss vs Captain Bramble: easy 48.5%, medium 33.0%, hard 11.0%; spread 37.5 points.
- Andromoss vs Duskmantle: easy 51.5%, medium 50.5%, hard 27.5%; spread 24.0 points; observed favored-side flip.
- Andromoss vs Sprig: easy 44.0%, medium 42.0%, hard 52.0%; spread 10.0 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 51.5%, medium 74.0%, hard 81.0%; spread 29.5 points.
- Captain Bramble vs Sprig: easy 45.0%, medium 55.5%, hard 77.0%; spread 32.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 41.0%, medium 41.5%, hard 54.5%; spread 13.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 55 left-side wins | 0 | 42.5 | 120.1 | 0/0/0/80 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 111 / 89 | 0 | 43.0 | 121.5 | 0/0/0/93 · 0/0/0/84 |
| easy | Sir Champignon / Captain Bramble | 200 | 111 / 89 | 0 | 42.5 | 119.8 | 0/0/0/87 · 0/0/0/80 |
| easy | Sir Champignon / Duskmantle | 200 | 115 / 85 | 0 | 42.5 | 120.8 | 0/0/0/90 · 0/0/0/74 |
| easy | Sir Champignon / Sprig | 200 | 102 / 98 | 0 | 42.3 | 112.8 | 0/0/0/88 · 0/0/0/59 |
| easy | Andromoss / Andromoss | 100 | 54 left-side wins | 0 | 43.8 | 132.5 | 0/0/0/94 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 97 / 103 | 0 | 44.0 | 134.3 | 0/0/0/90 · 0/0/0/99 |
| easy | Andromoss / Duskmantle | 200 | 103 / 97 | 0 | 44.1 | 128.9 | 0/0/0/87 · 0/0/0/93 |
| easy | Andromoss / Sprig | 200 | 88 / 112 | 0 | 43.8 | 123.0 | 0/0/0/83 · 0/0/0/66 |
| easy | Captain Bramble / Captain Bramble | 100 | 61 left-side wins | 0 | 42.9 | 126.6 | 0/0/0/84 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 103 / 97 | 0 | 42.9 | 127.1 | 0/0/0/87 · 0/0/0/84 |
| easy | Captain Bramble / Sprig | 200 | 90 / 110 | 0 | 42.9 | 119.8 | 0/0/0/86 · 0/0/0/70 |
| easy | Duskmantle / Duskmantle | 100 | 58 left-side wins | 0 | 43.0 | 135.8 | 0/0/0/86 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 82 / 118 | 0 | 43.2 | 120.1 | 0/0/0/81 · 0/0/0/71 |
| easy | Sprig / Sprig | 100 | 53 left-side wins | 0 | 43.8 | 118.2 | 0/0/0/61 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 54 left-side wins | 0 | 51.1 | 139.3 | 0/0/0/368 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 136 / 64 | 0 | 50.4 | 141.8 | 0/0/0/381 · 0/0/0/349 |
| medium | Sir Champignon / Captain Bramble | 200 | 104 / 96 | 0 | 48.6 | 134.8 | 0/0/0/357 · 0/0/0/348 |
| medium | Sir Champignon / Duskmantle | 200 | 140 / 60 | 0 | 48.7 | 135.7 | 0/0/0/364 · 0/0/0/351 |
| medium | Sir Champignon / Sprig | 200 | 101 / 99 | 0 | 51.5 | 139.8 | 0/0/0/379 · 0/0/0/353 |
| medium | Andromoss / Andromoss | 100 | 60 left-side wins | 0 | 55.4 | 151.7 | 0/0/0/387 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 66 / 134 | 0 | 47.9 | 128.3 | 0/0/0/330 · 0/0/0/369 |
| medium | Andromoss / Duskmantle | 200 | 101 / 99 | 0 | 51.1 | 140.9 | 0/0/0/363 · 0/0/0/386 |
| medium | Andromoss / Sprig | 200 | 84 / 116 | 0 | 51.0 | 135.8 | 0/0/0/356 · 0/0/0/360 |
| medium | Captain Bramble / Captain Bramble | 100 | 60 left-side wins | 0 | 46.0 | 125.8 | 0/0/0/334 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 148 / 52 | 0 | 47.5 | 129.4 | 0/0/0/354 · 0/0/0/333 |
| medium | Captain Bramble / Sprig | 200 | 111 / 89 | 0 | 49.0 | 133.4 | 0/0/0/360 · 0/0/0/334 |
| medium | Duskmantle / Duskmantle | 100 | 57 left-side wins | 0 | 53.0 | 150.2 | 0/0/0/392 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 83 / 117 | 0 | 50.3 | 128.4 | 0/0/0/355 · 0/0/0/352 |
| medium | Sprig / Sprig | 100 | 58 left-side wins | 0 | 54.9 | 147.9 | 0/0/0/380 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 54 left-side wins | 0 | 79.8 | 208.7 | 0/0/0/905 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 166 / 34 | 0 | 67.8 | 160.8 | 0/0/0/703 · 0/0/0/696 |
| hard | Sir Champignon / Captain Bramble | 200 | 83 / 117 | 0 | 71.5 | 187.9 | 0/0/0/746 · 0/0/0/749 |
| hard | Sir Champignon / Duskmantle | 200 | 143 / 57 | 0 | 75.2 | 194.4 | 0/0/0/809 · 0/0/0/800 |
| hard | Sir Champignon / Sprig | 200 | 142 / 58 | 0 | 74.8 | 187.7 | 0/0/0/783 · 0/0/0/791 |
| hard | Andromoss / Andromoss | 100 | 60 left-side wins | 0 | 70.5 | 186.4 | 0/0/0/771 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 22 / 178 | 0 | 61.4 | 138.2 | 0/0/0/552 · 0/0/0/578 |
| hard | Andromoss / Duskmantle | 200 | 55 / 145 | 0 | 70.8 | 183.3 | 0/0/0/724 · 0/0/0/717 |
| hard | Andromoss / Sprig | 200 | 104 / 96 | 0 | 68.0 | 179.3 | 0/0/0/750 · 0/0/0/772 |
| hard | Captain Bramble / Captain Bramble | 100 | 52 left-side wins | 0 | 72.2 | 176.4 | 0/0/0/719 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 162 / 38 | 0 | 72.8 | 173.7 | 0/0/0/687 · 0/0/0/657 |
| hard | Captain Bramble / Sprig | 200 | 154 / 46 | 0 | 72.2 | 172.8 | 0/0/0/706 · 0/0/0/704 |
| hard | Duskmantle / Duskmantle | 100 | 53 left-side wins | 0 | 73.8 | 206.7 | 0/0/0/872 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 109 / 91 | 0 | 73.0 | 192.2 | 0/0/0/767 · 0/0/0/789 |
| hard | Sprig / Sprig | 100 | 63 left-side wins | 0 | 76.3 | 200.4 | 0/0/0/848 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 439/800 (54.9%) | 0 | 0/0/0/438 | 1, 2, 3 |
| easy | Andromoss | 377/800 (47.1%) | 0 | 0/0/0/438 | 1, 2, 3 |
| easy | Captain Bramble | 385/800 (48.1%) | 0 | 0/0/0/436 | 1, 2, 3 |
| easy | Duskmantle | 361/800 (45.1%) | 0 | 0/0/0/418 | 1, 2, 3 |
| easy | Sprig | 438/800 (54.8%) | 0 | 0/0/0/327 | 1, 2, 3 |
| medium | Sir Champignon | 481/800 (60.1%) | 0 | 0/0/0/1849 | 1, 2, 3 |
| medium | Andromoss | 315/800 (39.4%) | 0 | 0/0/0/1785 | 1, 2, 3 |
| medium | Captain Bramble | 489/800 (61.1%) | 0 | 0/0/0/1765 | 1, 2, 3 |
| medium | Duskmantle | 294/800 (36.8%) | 0 | 0/0/0/1817 | 1, 2, 3 |
| medium | Sprig | 421/800 (52.6%) | 0 | 0/0/0/1779 | 1, 2, 3 |
| hard | Sir Champignon | 534/800 (66.8%) | 0 | 0/0/0/3946 | 1, 2, 3 |
| hard | Andromoss | 215/800 (26.9%) | 0 | 0/0/0/3493 | 1, 2, 3 |
| hard | Captain Bramble | 611/800 (76.4%) | 0 | 0/0/0/3439 | 1, 2, 3 |
| hard | Duskmantle | 349/800 (43.6%) | 0 | 0/0/0/3813 | 1, 2, 3 |
| hard | Sprig | 291/800 (36.4%) | 0 | 0/0/0/3904 | 1, 2, 3 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 0.45 | 789.49 / 1230.73 | 9.04 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 0.43 | 779.38 / 1296.77 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Captain Bramble | 0.44 | 779.71 / 1344.41 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 0.41 | 771.34 / 1333.38 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 0.33 | 792.75 / 1228.47 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 1.85 | 1631.64 / 424.03 | 44.14 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 1.75 | 1593.58 / 465.89 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Captain Bramble | 1.79 | 1540.16 / 422.82 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 1.78 | 1582.60 / 459.32 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 1.75 | 1665.75 / 470.21 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 3.80 | 3107.22 / 205.23 | 87.21 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 3.40 | 2708.36 / 219.68 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Captain Bramble | 3.40 | 2693.19 / 209.26 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 3.68 | 3013.91 / 250.13 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 3.82 | 3109.34 / 321.51 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed benefit from the cast. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 6.08 | 92.3% | 358 / 17 | 901 | 1124 / 0 |
| easy | Andromoss | 10.20 | 95.4% | 344 / 31 | 898 | 4527 / 0 |
| easy | Captain Bramble | 6.95 | 93.3% | 352 / 19 | 900 | 2361 / 0 |
| easy | Duskmantle | 5.32 | 91.9% | 332 / 13 | 897 | 1332 / 0 |
| easy | Sprig | 34.41 | 98.8% | 266 / 66 | 898 | 17738 / 0 |
| medium | Sir Champignon | 7.93 | 76.4% | 1481 / 18 | 597 | 1624 / 149 |
| medium | Andromoss | 9.89 | 81.9% | 1398 / 38 | 603 | 1806 / 123 |
| medium | Captain Bramble | 8.42 | 78.3% | 1431 / 28 | 599 | 1394 / 119 |
| medium | Duskmantle | 8.72 | 79.1% | 1425 / 32 | 599 | 1687 / 136 |
| medium | Sprig | 22.21 | 91.7% | 1399 / 71 | 601 | 4915 / 138 |
| hard | Sir Champignon | 12.68 | 69.9% | 3041 / 14 | 301 | 5059 / 1377 |
| hard | Andromoss | 16.13 | 78.8% | 2722 / 19 | 301 | 5324 / 1111 |
| hard | Captain Bramble | 15.14 | 77.4% | 2720 / 14 | 301 | 4692 / 1079 |
| hard | Duskmantle | 15.71 | 76.4% | 2941 / 25 | 301 | 5424 / 1275 |
| hard | Sprig | 21.67 | 82.2% | 3056 / 31 | 301 | 10204 / 1371 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=4 --casting=opportunity --cast-profile=scaled --report=balance-tier-4`.
