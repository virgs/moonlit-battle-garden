# Five-character roster diagnostic

Isolated tier 4: 4-slot charge cap; only tier 4 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Royal useful visible own mole/star, no active sweep refresh; Clockwork useful/urgent busiest two columns, no active refresh; hostile effects avoid wards and active same-effect renewal, with visible enemy witnesses. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-21T00:04:52.047Z. Revision 551e756 + working changes; config d5bd5581763d; simulation cf309d2e10bcd778; base seed 20261118. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨57.2% | 🟨49.5%* | 🟩66.3% | 🟨57.3% |
| Andromoss | 🟨42.8% | — | 🟥37.0%* | 🟨54.8% | 🟩60.5%* |
| Captain Bramble | 🟨50.5%* | 🟩63.0%* | — | 🟩68.7%* | 🟨59.2%* |
| Duskmantle | 🟥33.7% | 🟨45.2% | 🟥31.3%* | — | 🟨45.7%* |
| Sprig | 🟨42.7% | 🟥39.5%* | 🟨40.8%* | 🟨54.3%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨51.5% | 🟨55.5% | 🟨57.5% | 🟨51.0% |
| Andromoss | 🟨48.5% | — | 🟨52.5% | 🟨54.5% | 🟨49.0% |
| Captain Bramble | 🟨44.5% | 🟨47.5% | — | 🟨51.5% | 🟨45.0% |
| Duskmantle | 🟨42.5% | 🟨45.5% | 🟨48.5% | — | 🟨41.0% |
| Sprig | 🟨49.0% | 🟨51.0% | 🟨55.0% | 🟨59.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨59.5% | 🟨51.5% | 🟩70.0% | 🟨50.5% |
| Andromoss | 🟨40.5% | — | 🟥39.0% | 🟨56.5% | 🟨56.5% |
| Captain Bramble | 🟨48.5% | 🟩61.0% | — | 🟩73.5% | 🟨55.5% |
| Duskmantle | 🟥30.0% | 🟨43.5% | 🟥26.5% | — | 🟨41.5% |
| Sprig | 🟨49.5% | 🟨43.5% | 🟨44.5% | 🟨58.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩60.5% | 🟨41.5% | 🟩71.5% | 🟩70.5% |
| Andromoss | 🟥39.5% | — | 🟥19.5% | 🟨53.5% | 🟩76.0% |
| Captain Bramble | 🟨58.5% | 🟩80.5% | — | 🟩81.0% | 🟩77.0% |
| Duskmantle | 🟥28.5% | 🟨46.5% | 🟥19.0% | — | 🟨54.5% |
| Sprig | 🟥29.5% | 🟥24.0% | 🟥23.0% | 🟨45.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 55.5%, medium 51.5%, hard 41.5%; spread 14.0 points; observed favored-side flip.
- Andromoss vs Captain Bramble: easy 52.5%, medium 39.0%, hard 19.5%; spread 33.0 points; observed favored-side flip.
- Andromoss vs Sprig: easy 49.0%, medium 56.5%, hard 76.0%; spread 27.0 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 51.5%, medium 73.5%, hard 81.0%; spread 29.5 points.
- Captain Bramble vs Sprig: easy 45.0%, medium 55.5%, hard 77.0%; spread 32.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 41.0%, medium 41.5%, hard 54.5%; spread 13.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 56 left-side wins | 0 | 42.5 | 120.1 | 0/0/0/79 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 103 / 97 | 0 | 42.0 | 112.8 | 0/0/0/77 · 0/0/0/82 |
| easy | Sir Champignon / Captain Bramble | 200 | 111 / 89 | 0 | 42.4 | 119.8 | 0/0/0/86 · 0/0/0/79 |
| easy | Sir Champignon / Duskmantle | 200 | 115 / 85 | 0 | 42.5 | 120.8 | 0/0/0/89 · 0/0/0/73 |
| easy | Sir Champignon / Sprig | 200 | 102 / 98 | 0 | 42.3 | 113.5 | 0/0/0/87 · 0/0/0/58 |
| easy | Andromoss / Andromoss | 100 | 55 left-side wins | 0 | 43.3 | 124.5 | 0/0/0/86 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 105 / 95 | 0 | 43.1 | 120.3 | 0/0/0/85 · 0/0/0/84 |
| easy | Andromoss / Duskmantle | 200 | 109 / 91 | 0 | 43.3 | 133.0 | 0/0/0/90 · 0/0/0/83 |
| easy | Andromoss / Sprig | 200 | 98 / 102 | 0 | 43.1 | 118.7 | 0/0/0/84 · 0/0/0/60 |
| easy | Captain Bramble / Captain Bramble | 100 | 62 left-side wins | 0 | 42.9 | 126.6 | 0/0/0/83 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 103 / 97 | 0 | 42.6 | 127.1 | 0/0/0/86 · 0/0/0/83 |
| easy | Captain Bramble / Sprig | 200 | 90 / 110 | 0 | 42.9 | 120.1 | 0/0/0/85 · 0/0/0/69 |
| easy | Duskmantle / Duskmantle | 100 | 59 left-side wins | 0 | 43.0 | 135.8 | 0/0/0/85 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 82 / 118 | 0 | 43.0 | 120.3 | 0/0/0/80 · 0/0/0/70 |
| easy | Sprig / Sprig | 100 | 54 left-side wins | 0 | 43.8 | 118.5 | 0/0/0/60 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 54 left-side wins | 0 | 50.6 | 139.3 | 0/0/0/365 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 119 / 81 | 0 | 49.9 | 137.6 | 0/0/0/375 · 0/0/0/349 |
| medium | Sir Champignon / Captain Bramble | 200 | 103 / 97 | 0 | 48.4 | 132.6 | 0/0/0/354 · 0/0/0/344 |
| medium | Sir Champignon / Duskmantle | 200 | 140 / 60 | 0 | 48.7 | 135.6 | 0/0/0/363 · 0/0/0/348 |
| medium | Sir Champignon / Sprig | 200 | 101 / 99 | 0 | 51.5 | 139.5 | 0/0/0/377 · 0/0/0/351 |
| medium | Andromoss / Andromoss | 100 | 62 left-side wins | 0 | 53.1 | 129.0 | 0/0/0/358 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 78 / 122 | 0 | 46.8 | 125.2 | 0/0/0/324 · 0/0/0/338 |
| medium | Andromoss / Duskmantle | 200 | 113 / 87 | 0 | 51.5 | 136.9 | 0/0/0/365 · 0/0/0/372 |
| medium | Andromoss / Sprig | 200 | 113 / 87 | 0 | 50.3 | 136.2 | 0/0/0/357 · 0/0/0/346 |
| medium | Captain Bramble / Captain Bramble | 100 | 60 left-side wins | 0 | 46.0 | 125.3 | 0/0/0/332 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 147 / 53 | 0 | 47.0 | 129.4 | 0/0/0/353 · 0/0/0/333 |
| medium | Captain Bramble / Sprig | 200 | 111 / 89 | 0 | 48.9 | 133.4 | 0/0/0/359 · 0/0/0/333 |
| medium | Duskmantle / Duskmantle | 100 | 57 left-side wins | 0 | 52.5 | 148.1 | 0/0/0/390 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 83 / 117 | 0 | 49.9 | 128.1 | 0/0/0/353 · 0/0/0/350 |
| medium | Sprig / Sprig | 100 | 58 left-side wins | 0 | 54.5 | 147.9 | 0/0/0/378 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 53 left-side wins | 0 | 79.3 | 207.1 | 0/0/0/897 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 121 / 79 | 0 | 74.6 | 210.7 | 0/0/0/817 · 0/0/0/809 |
| hard | Sir Champignon / Captain Bramble | 200 | 83 / 117 | 0 | 71.0 | 184.1 | 0/0/0/745 · 0/0/0/747 |
| hard | Sir Champignon / Duskmantle | 200 | 143 / 57 | 0 | 74.2 | 190.4 | 0/0/0/804 · 0/0/0/795 |
| hard | Sir Champignon / Sprig | 200 | 141 / 59 | 0 | 74.5 | 186.2 | 0/0/0/774 · 0/0/0/784 |
| hard | Andromoss / Andromoss | 100 | 53 left-side wins | 0 | 76.0 | 206.9 | 0/0/0/863 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 39 / 161 | 0 | 72.7 | 171.2 | 0/0/0/670 · 0/0/0/700 |
| hard | Andromoss / Duskmantle | 200 | 107 / 93 | 0 | 74.9 | 201.3 | 0/0/0/840 · 0/0/0/856 |
| hard | Andromoss / Sprig | 200 | 152 / 48 | 0 | 61.1 | 153.6 | 0/0/0/699 · 0/0/0/719 |
| hard | Captain Bramble / Captain Bramble | 100 | 51 left-side wins | 0 | 71.8 | 180.5 | 0/0/0/719 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 162 / 38 | 0 | 72.6 | 172.8 | 0/0/0/682 · 0/0/0/652 |
| hard | Captain Bramble / Sprig | 200 | 154 / 46 | 0 | 71.6 | 170.8 | 0/0/0/702 · 0/0/0/699 |
| hard | Duskmantle / Duskmantle | 100 | 53 left-side wins | 0 | 73.8 | 203.3 | 0/0/0/858 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 109 / 91 | 0 | 72.5 | 190.0 | 0/0/0/763 · 0/0/0/783 |
| hard | Sprig / Sprig | 100 | 62 left-side wins | 0 | 75.8 | 192.6 | 0/0/0/843 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 431/800 (53.9%) | 0 | 0/0/0/418 | 1, 2, 3 |
| easy | Andromoss | 409/800 (51.1%) | 0 | 0/0/0/427 | 1, 2, 3 |
| easy | Captain Bramble | 377/800 (47.1%) | 0 | 0/0/0/417 | 1, 2, 3 |
| easy | Duskmantle | 355/800 (44.4%) | 0 | 0/0/0/404 | 1, 2, 3 |
| easy | Sprig | 428/800 (53.5%) | 0 | 0/0/0/317 | 1, 2, 3 |
| medium | Sir Champignon | 463/800 (57.9%) | 0 | 0/0/0/1834 | 1, 2, 3 |
| medium | Andromoss | 385/800 (48.1%) | 0 | 0/0/0/1753 | 1, 2, 3 |
| medium | Captain Bramble | 477/800 (59.6%) | 0 | 0/0/0/1726 | 1, 2, 3 |
| medium | Duskmantle | 283/800 (35.4%) | 0 | 0/0/0/1796 | 1, 2, 3 |
| medium | Sprig | 392/800 (49.0%) | 0 | 0/0/0/1758 | 1, 2, 3 |
| hard | Sir Champignon | 488/800 (61.0%) | 0 | 0/0/0/4037 | 1, 2, 3 |
| hard | Andromoss | 377/800 (47.1%) | 0 | 0/0/0/3881 | 1, 2, 3 |
| hard | Captain Bramble | 594/800 (74.3%) | 0 | 0/0/0/3550 | 1, 2, 3 |
| hard | Duskmantle | 297/800 (37.1%) | 0 | 0/0/0/3924 | 1, 2, 3 |
| hard | Sprig | 244/800 (30.5%) | 0 | 0/0/0/3828 | 1, 2, 3 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 0.42 | 787.65 / 1243.91 | 8.42 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 0.43 | 785.36 / 1375.30 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Captain Bramble | 0.42 | 780.02 / 1362.89 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 0.40 | 773.48 / 1364.92 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 0.32 | 790.91 / 1221.57 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 1.84 | 1615.29 / 411.88 | 43.96 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 1.74 | 1569.21 / 440.92 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Captain Bramble | 1.74 | 1520.60 / 411.28 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 1.76 | 1563.31 / 451.10 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 1.73 | 1645.95 / 464.77 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 3.92 | 3206.34 / 214.46 | 90.86 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 3.77 | 3039.09 / 254.95 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Captain Bramble | 3.54 | 2805.29 / 218.04 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 3.83 | 3110.81 / 258.47 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 3.73 | 3001.84 / 312.30 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed benefit from the cast. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 6.46 | 93.2% | 339 / 15 | 900 | 1604 / 0 |
| easy | Andromoss | 10.27 | 95.5% | 341 / 28 | 899 | 4549 / 0 |
| easy | Captain Bramble | 7.32 | 94.0% | 334 / 18 | 900 | 2752 / 0 |
| easy | Duskmantle | 5.81 | 92.8% | 319 / 14 | 897 | 1813 / 0 |
| easy | Sprig | 32.99 | 98.8% | 257 / 62 | 897 | 17307 / 0 |
| medium | Sir Champignon | 7.84 | 76.3% | 1469 / 19 | 598 | 1670 / 159 |
| medium | Andromoss | 9.78 | 81.6% | 1395 / 42 | 602 | 1859 / 126 |
| medium | Captain Bramble | 8.15 | 78.2% | 1394 / 29 | 599 | 1256 / 111 |
| medium | Duskmantle | 8.66 | 79.2% | 1406 / 35 | 599 | 1753 / 137 |
| medium | Sprig | 21.44 | 91.6% | 1380 / 57 | 602 | 4594 / 130 |
| hard | Sir Champignon | 12.97 | 69.6% | 3140 / 16 | 301 | 5283 / 1454 |
| hard | Andromoss | 17.42 | 78.2% | 3018 / 22 | 301 | 6222 / 1342 |
| hard | Captain Bramble | 15.55 | 77.1% | 2831 / 12 | 301 | 5015 / 1174 |
| hard | Duskmantle | 16.43 | 76.5% | 3066 / 26 | 301 | 5949 / 1392 |
| hard | Sprig | 20.71 | 81.8% | 2985 / 31 | 301 | 9798 / 1314 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261118 --tier=4 --casting=opportunity --cast-profile=scaled --report=balance-tier-4`.
