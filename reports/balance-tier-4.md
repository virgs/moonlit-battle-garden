# Five-character roster diagnostic

Isolated tier 4: 4-slot charge cap; only tier 4 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Royal useful visible own mole/star, no active sweep refresh; Clockwork useful/urgent busiest two columns, no active refresh; hostile effects avoid wards and active same-effect renewal, with visible enemy witnesses. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-20T23:41:52.158Z. Revision 39fce99 + working changes; config 11554567b230; simulation 629810c0772b8b08; base seed 20261119. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨56.5% | 🟨49.7%* | 🟩66.3% | 🟨57.5%* |
| Andromoss | 🟨43.5% | — | 🟥36.3%* | 🟨54.8% | 🟩60.2%* |
| Captain Bramble | 🟨50.3%* | 🟩63.7%* | — | 🟩68.8%* | 🟨59.2%* |
| Duskmantle | 🟥33.7% | 🟨45.2% | 🟥31.2%* | — | 🟨45.7%* |
| Sprig | 🟨42.5%* | 🟥39.8%* | 🟨40.8%* | 🟨54.3%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨52.5% | 🟨55.5% | 🟨57.5% | 🟨51.0% |
| Andromoss | 🟨47.5% | — | 🟨52.5% | 🟨53.5% | 🟨45.0% |
| Captain Bramble | 🟨44.5% | 🟨47.5% | — | 🟨51.5% | 🟨45.0% |
| Duskmantle | 🟨42.5% | 🟨46.5% | 🟨48.5% | — | 🟨41.0% |
| Sprig | 🟨49.0% | 🟨55.0% | 🟨55.0% | 🟨59.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩60.5% | 🟨52.0% | 🟩70.0% | 🟨50.5% |
| Andromoss | 🟥39.5% | — | 🟥35.0% | 🟨55.5% | 🟨59.0% |
| Captain Bramble | 🟨48.0% | 🟩65.0% | — | 🟩74.0% | 🟨55.5% |
| Duskmantle | 🟥30.0% | 🟨44.5% | 🟥26.0% | — | 🟨41.5% |
| Sprig | 🟨49.5% | 🟨41.0% | 🟨44.5% | 🟨58.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨56.5% | 🟨41.5% | 🟩71.5% | 🟩71.0% |
| Andromoss | 🟨43.5% | — | 🟥21.5% | 🟨55.5% | 🟩76.5% |
| Captain Bramble | 🟨58.5% | 🟩78.5% | — | 🟩81.0% | 🟩77.0% |
| Duskmantle | 🟥28.5% | 🟨44.5% | 🟥19.0% | — | 🟨54.5% |
| Sprig | 🟥29.0% | 🟥23.5% | 🟥23.0% | 🟨45.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 55.5%, medium 52.0%, hard 41.5%; spread 14.0 points; observed favored-side flip.
- Sir Champignon vs Sprig: easy 51.0%, medium 50.5%, hard 71.0%; spread 20.5 points.
- Andromoss vs Captain Bramble: easy 52.5%, medium 35.0%, hard 21.5%; spread 31.0 points; observed favored-side flip.
- Andromoss vs Sprig: easy 45.0%, medium 59.0%, hard 76.5%; spread 31.5 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 51.5%, medium 74.0%, hard 81.0%; spread 29.5 points.
- Captain Bramble vs Sprig: easy 45.0%, medium 55.5%, hard 77.0%; spread 32.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 41.0%, medium 41.5%, hard 54.5%; spread 13.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 55 left-side wins | 0 | 42.5 | 120.1 | 0/0/0/80 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 105 / 95 | 0 | 41.8 | 112.8 | 0/0/0/84 · 0/0/0/79 |
| easy | Sir Champignon / Captain Bramble | 200 | 111 / 89 | 0 | 42.5 | 119.8 | 0/0/0/87 · 0/0/0/80 |
| easy | Sir Champignon / Duskmantle | 200 | 115 / 85 | 0 | 42.5 | 120.8 | 0/0/0/90 · 0/0/0/74 |
| easy | Sir Champignon / Sprig | 200 | 102 / 98 | 0 | 42.3 | 112.8 | 0/0/0/88 · 0/0/0/59 |
| easy | Andromoss / Andromoss | 100 | 55 left-side wins | 0 | 42.8 | 116.3 | 0/0/0/87 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 105 / 95 | 0 | 42.9 | 117.6 | 0/0/0/88 · 0/0/0/87 |
| easy | Andromoss / Duskmantle | 200 | 107 / 93 | 0 | 43.5 | 123.8 | 0/0/0/88 · 0/0/0/88 |
| easy | Andromoss / Sprig | 200 | 90 / 110 | 0 | 42.9 | 118.2 | 0/0/0/85 · 0/0/0/64 |
| easy | Captain Bramble / Captain Bramble | 100 | 61 left-side wins | 0 | 42.9 | 126.6 | 0/0/0/84 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 103 / 97 | 0 | 42.9 | 127.1 | 0/0/0/87 · 0/0/0/84 |
| easy | Captain Bramble / Sprig | 200 | 90 / 110 | 0 | 42.9 | 119.8 | 0/0/0/86 · 0/0/0/70 |
| easy | Duskmantle / Duskmantle | 100 | 58 left-side wins | 0 | 43.0 | 135.8 | 0/0/0/86 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 82 / 118 | 0 | 43.2 | 120.1 | 0/0/0/81 · 0/0/0/71 |
| easy | Sprig / Sprig | 100 | 53 left-side wins | 0 | 43.8 | 118.2 | 0/0/0/61 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 54 left-side wins | 0 | 51.1 | 139.3 | 0/0/0/368 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 121 / 79 | 0 | 49.5 | 136.4 | 0/0/0/372 · 0/0/0/355 |
| medium | Sir Champignon / Captain Bramble | 200 | 104 / 96 | 0 | 48.6 | 134.8 | 0/0/0/357 · 0/0/0/348 |
| medium | Sir Champignon / Duskmantle | 200 | 140 / 60 | 0 | 48.7 | 135.7 | 0/0/0/364 · 0/0/0/351 |
| medium | Sir Champignon / Sprig | 200 | 101 / 99 | 0 | 51.5 | 139.8 | 0/0/0/379 · 0/0/0/353 |
| medium | Andromoss / Andromoss | 100 | 55 left-side wins | 0 | 52.1 | 137.8 | 0/0/0/335 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 70 / 130 | 0 | 47.5 | 129.5 | 0/0/0/341 · 0/0/0/364 |
| medium | Andromoss / Duskmantle | 200 | 111 / 89 | 0 | 51.9 | 144.3 | 0/0/0/384 · 0/0/0/373 |
| medium | Andromoss / Sprig | 200 | 118 / 82 | 0 | 49.2 | 135.2 | 0/0/0/359 · 0/0/0/348 |
| medium | Captain Bramble / Captain Bramble | 100 | 60 left-side wins | 0 | 46.0 | 125.8 | 0/0/0/334 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 148 / 52 | 0 | 47.5 | 129.4 | 0/0/0/354 · 0/0/0/333 |
| medium | Captain Bramble / Sprig | 200 | 111 / 89 | 0 | 49.0 | 133.4 | 0/0/0/360 · 0/0/0/334 |
| medium | Duskmantle / Duskmantle | 100 | 57 left-side wins | 0 | 53.0 | 150.2 | 0/0/0/392 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 83 / 117 | 0 | 50.3 | 128.4 | 0/0/0/355 · 0/0/0/352 |
| medium | Sprig / Sprig | 100 | 58 left-side wins | 0 | 54.9 | 147.9 | 0/0/0/380 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 54 left-side wins | 0 | 79.8 | 208.7 | 0/0/0/905 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 113 / 87 | 0 | 72.2 | 182.5 | 0/0/0/735 · 0/0/0/723 |
| hard | Sir Champignon / Captain Bramble | 200 | 83 / 117 | 0 | 71.5 | 187.9 | 0/0/0/746 · 0/0/0/749 |
| hard | Sir Champignon / Duskmantle | 200 | 143 / 57 | 0 | 75.2 | 194.4 | 0/0/0/809 · 0/0/0/800 |
| hard | Sir Champignon / Sprig | 200 | 142 / 58 | 0 | 74.8 | 187.7 | 0/0/0/783 · 0/0/0/791 |
| hard | Andromoss / Andromoss | 100 | 57 left-side wins | 0 | 75.3 | 194.8 | 0/0/0/828 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 43 / 157 | 0 | 72.3 | 164.0 | 0/0/0/655 · 0/0/0/698 |
| hard | Andromoss / Duskmantle | 200 | 111 / 89 | 0 | 74.3 | 197.3 | 0/0/0/806 · 0/0/0/826 |
| hard | Andromoss / Sprig | 200 | 153 / 47 | 0 | 60.6 | 148.1 | 0/0/0/645 · 0/0/0/664 |
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
| easy | Sir Champignon | 433/800 (54.1%) | 0 | 0/0/0/429 | 1, 2, 3 |
| easy | Andromoss | 397/800 (49.6%) | 0 | 0/0/0/427 | 1, 2, 3 |
| easy | Captain Bramble | 377/800 (47.1%) | 0 | 0/0/0/424 | 1, 2, 3 |
| easy | Duskmantle | 357/800 (44.6%) | 0 | 0/0/0/413 | 1, 2, 3 |
| easy | Sprig | 436/800 (54.5%) | 0 | 0/0/0/325 | 1, 2, 3 |
| medium | Sir Champignon | 466/800 (58.3%) | 0 | 0/0/0/1840 | 1, 2, 3 |
| medium | Andromoss | 378/800 (47.3%) | 0 | 0/0/0/1774 | 1, 2, 3 |
| medium | Captain Bramble | 485/800 (60.6%) | 0 | 0/0/0/1760 | 1, 2, 3 |
| medium | Duskmantle | 284/800 (35.5%) | 0 | 0/0/0/1804 | 1, 2, 3 |
| medium | Sprig | 387/800 (48.4%) | 0 | 0/0/0/1767 | 1, 2, 3 |
| hard | Sir Champignon | 481/800 (60.1%) | 0 | 0/0/0/3978 | 1, 2, 3 |
| hard | Andromoss | 394/800 (49.3%) | 0 | 0/0/0/3657 | 1, 2, 3 |
| hard | Captain Bramble | 590/800 (73.8%) | 0 | 0/0/0/3559 | 1, 2, 3 |
| hard | Duskmantle | 293/800 (36.6%) | 0 | 0/0/0/3922 | 1, 2, 3 |
| hard | Sprig | 242/800 (30.3%) | 0 | 0/0/0/3796 | 1, 2, 3 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 0.44 | 784.69 / 1235.35 | 8.63 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 0.42 | 774.49 / 1307.68 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Captain Bramble | 0.42 | 775.84 / 1345.78 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 0.41 | 768.47 / 1344.11 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 0.33 | 788.59 / 1220.91 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 1.84 | 1622.59 / 421.26 | 43.87 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 1.80 | 1596.65 / 458.96 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Captain Bramble | 1.78 | 1540.64 / 419.95 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 1.76 | 1580.78 / 460.46 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 1.73 | 1641.42 / 460.54 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 3.84 | 3126.35 / 211.41 | 88.94 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 3.54 | 2851.84 / 238.81 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Captain Bramble | 3.55 | 2793.44 / 218.11 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 3.81 | 3089.24 / 257.84 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 3.69 | 2965.89 / 308.11 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed benefit from the cast. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 6.11 | 92.5% | 349 / 18 | 901 | 1251 / 0 |
| easy | Andromoss | 11.25 | 95.9% | 340 / 29 | 898 | 5284 / 0 |
| easy | Captain Bramble | 6.54 | 93.1% | 340 / 19 | 901 | 2141 / 0 |
| easy | Duskmantle | 4.95 | 91.4% | 327 / 13 | 898 | 1112 / 0 |
| easy | Sprig | 34.84 | 98.8% | 264 / 67 | 898 | 18259 / 0 |
| medium | Sir Champignon | 7.89 | 76.4% | 1472 / 18 | 597 | 1652 / 153 |
| medium | Andromoss | 9.57 | 80.7% | 1439 / 38 | 601 | 1587 / 129 |
| medium | Captain Bramble | 8.37 | 78.3% | 1426 / 30 | 600 | 1383 / 113 |
| medium | Duskmantle | 8.47 | 78.6% | 1412 / 39 | 600 | 1566 / 130 |
| medium | Sprig | 21.74 | 91.7% | 1387 / 59 | 601 | 4735 / 128 |
| hard | Sir Champignon | 12.73 | 69.7% | 3073 / 15 | 301 | 5107 / 1400 |
| hard | Andromoss | 16.52 | 78.4% | 2829 / 28 | 301 | 5409 / 1182 |
| hard | Captain Bramble | 15.91 | 77.6% | 2840 / 11 | 301 | 5063 / 1174 |
| hard | Duskmantle | 16.35 | 76.5% | 3050 / 25 | 301 | 5904 / 1383 |
| hard | Sprig | 20.29 | 81.7% | 2948 / 28 | 301 | 9411 / 1267 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=4 --casting=opportunity --cast-profile=scaled --report=balance-tier-4`.
