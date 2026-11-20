# Five-character roster diagnostic

Isolated tier 3: 3-slot charge cap; only tier 3 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Ward before enemy theft readiness (2+ charge), no active refresh; theft 2+ enemy stars and no ward; Resolve unguarded own near-escape mole; Siphon visible own mole/no active refresh; Weed Out hostile effects or ward threat. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-20T23:41:51.522Z. Revision 39fce99 + working changes; config 11554567b230; simulation 629810c0772b8b08; base seed 20261119. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.0% | 🟥37.5% | 🟥36.8%* | 🟨50.0% |
| Andromoss | 🟨50.0% | — | 🟨48.0% | 🟨49.3% | 🟨50.0% |
| Captain Bramble | 🟩62.5% | 🟨52.0% | — | 🟨49.8%* | 🟩62.5% |
| Duskmantle | 🟩63.2%* | 🟨50.7% | 🟨50.2%* | — | 🟩63.2%* |
| Sprig | 🟨50.0% | 🟨50.0% | 🟥37.5% | 🟥36.8%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.0% | 🟨46.0% | 🟨47.5% | 🟨50.0% |
| Andromoss | 🟨50.0% | — | 🟨48.0% | 🟨49.0% | 🟨50.0% |
| Captain Bramble | 🟨54.0% | 🟨52.0% | — | 🟨53.5% | 🟨54.0% |
| Duskmantle | 🟨52.5% | 🟨51.0% | 🟨46.5% | — | 🟨52.5% |
| Sprig | 🟨50.0% | 🟨50.0% | 🟨46.0% | 🟨47.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.0% | 🟥34.5% | 🟥39.5% | 🟨50.0% |
| Andromoss | 🟨50.0% | — | 🟨47.5% | 🟨49.0% | 🟨50.0% |
| Captain Bramble | 🟩65.5% | 🟨52.5% | — | 🟨54.0% | 🟩65.5% |
| Duskmantle | 🟩60.5% | 🟨51.0% | 🟨46.0% | — | 🟩60.5% |
| Sprig | 🟨50.0% | 🟨50.0% | 🟥34.5% | 🟥39.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.0% | 🟥32.0% | 🟥23.5% | 🟨50.0% |
| Andromoss | 🟨50.0% | — | 🟨48.5% | 🟨50.0% | 🟨50.0% |
| Captain Bramble | 🟩68.0% | 🟨51.5% | — | 🟨42.0% | 🟩68.0% |
| Duskmantle | 🟩76.5% | 🟨50.0% | 🟨58.0% | — | 🟩76.5% |
| Sprig | 🟨50.0% | 🟨50.0% | 🟥32.0% | 🟥23.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Duskmantle: easy 47.5%, medium 39.5%, hard 23.5%; spread 24.0 points.
- Captain Bramble vs Duskmantle: easy 53.5%, medium 54.0%, hard 42.0%; spread 12.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 52.5%, medium 60.5%, hard 76.5%; spread 24.0 points.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 59 left-side wins | 0 | 44.6 | 142.5 | 0/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 100 / 100 | 0 | 45.5 | 145.5 | 0/0/132/0 · 0/0/173/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 92 / 108 | 0 | 44.6 | 125.7 | 0/0/0/0 · 0/0/208/0 |
| easy | Sir Champignon / Duskmantle | 200 | 95 / 105 | 0 | 44.3 | 133.4 | 0/0/0/0 · 0/0/224/0 |
| easy | Sir Champignon / Sprig | 200 | 100 / 100 | 0 | 44.6 | 142.5 | 0/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 59 left-side wins | 0 | 45.5 | 145.5 | 0/0/154/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 96 / 104 | 0 | 45.6 | 134.5 | 0/0/218/0 · 0/0/104/0 |
| easy | Andromoss / Duskmantle | 200 | 98 / 102 | 0 | 44.5 | 136.6 | 0/0/200/0 · 0/0/124/0 |
| easy | Andromoss / Sprig | 200 | 100 / 100 | 0 | 45.5 | 145.5 | 0/0/173/0 · 0/0/132/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 59 left-side wins | 0 | 45.6 | 141.1 | 0/0/216/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 107 / 93 | 0 | 44.3 | 129.9 | 0/0/206/0 · 0/0/217/0 |
| easy | Captain Bramble / Sprig | 200 | 108 / 92 | 0 | 44.6 | 125.7 | 0/0/208/0 · 0/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 59 left-side wins | 0 | 44.6 | 141.0 | 0/0/223/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 105 / 95 | 0 | 44.3 | 133.4 | 0/0/224/0 · 0/0/0/0 |
| easy | Sprig / Sprig | 100 | 59 left-side wins | 0 | 44.6 | 142.5 | 0/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 53.3 | 145.1 | 0/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 100 / 100 | 0 | 54.8 | 150.3 | 0/0/216/0 · 0/0/609/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 69 / 131 | 0 | 55.8 | 138.1 | 0/0/0/0 · 0/0/539/0 |
| medium | Sir Champignon / Duskmantle | 200 | 79 / 121 | 0 | 50.0 | 133.6 | 0/0/0/0 · 0/0/552/0 |
| medium | Sir Champignon / Sprig | 200 | 100 / 100 | 0 | 53.3 | 145.1 | 0/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 55.1 | 151.7 | 0/0/412/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 95 / 105 | 0 | 56.3 | 151.8 | 0/0/734/0 · 0/0/95/0 |
| medium | Andromoss / Duskmantle | 200 | 98 / 102 | 0 | 53.3 | 147.7 | 0/0/682/0 · 0/0/137/0 |
| medium | Andromoss / Sprig | 200 | 100 / 100 | 0 | 54.8 | 150.3 | 0/0/609/0 · 0/0/216/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 54 left-side wins | 0 | 57.3 | 143.6 | 0/0/549/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 108 / 92 | 0 | 50.8 | 139.8 | 0/0/528/0 · 0/0/556/0 |
| medium | Captain Bramble / Sprig | 200 | 131 / 69 | 0 | 55.8 | 138.1 | 0/0/539/0 · 0/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 58 left-side wins | 0 | 49.5 | 136.4 | 0/0/524/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 121 / 79 | 0 | 50.0 | 133.6 | 0/0/552/0 · 0/0/0/0 |
| medium | Sprig / Sprig | 100 | 58 left-side wins | 0 | 53.3 | 145.1 | 0/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 56 left-side wins | 0 | 75.3 | 189.4 | 0/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 100 / 100 | 0 | 79.8 | 201.4 | 0/0/236/0 · 0/0/1557/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 64 / 136 | 0 | 76.0 | 198.7 | 0/0/0/0 · 0/0/1142/0 |
| hard | Sir Champignon / Duskmantle | 200 | 47 / 153 | 0 | 70.5 | 173.7 | 0/0/0/0 · 0/0/1071/0 |
| hard | Sir Champignon / Sprig | 200 | 100 / 100 | 0 | 75.3 | 189.4 | 0/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 80.0 | 201.4 | 0/0/905/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 97 / 103 | 0 | 79.5 | 201.4 | 0/0/1722/0 · 0/0/48/0 |
| hard | Andromoss / Duskmantle | 200 | 100 / 100 | 0 | 77.7 | 207.6 | 0/0/1659/0 · 0/0/100/0 |
| hard | Andromoss / Sprig | 200 | 100 / 100 | 0 | 79.8 | 201.4 | 0/0/1557/0 · 0/0/236/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 61 left-side wins | 0 | 81.2 | 206.3 | 0/0/1193/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 84 / 116 | 0 | 79.7 | 210.4 | 0/0/1134/0 · 0/0/1192/0 |
| hard | Captain Bramble / Sprig | 200 | 136 / 64 | 0 | 76.0 | 198.7 | 0/0/1142/0 · 0/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 60 left-side wins | 0 | 73.8 | 213.4 | 0/0/1177/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 153 / 47 | 0 | 70.5 | 173.7 | 0/0/1071/0 · 0/0/0/0 |
| hard | Sprig / Sprig | 100 | 56 left-side wins | 0 | 75.3 | 189.4 | 0/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 387/800 (48.4%) | 0 | 0/0/132/0 | 1, 2, 4 |
| easy | Andromoss | 394/800 (49.3%) | 0 | 0/0/918/0 | 1, 2, 4 |
| easy | Captain Bramble | 427/800 (53.4%) | 0 | 0/0/942/0 | 1, 2, 4 |
| easy | Duskmantle | 405/800 (50.6%) | 0 | 0/0/1012/0 | 1, 2, 4 |
| easy | Sprig | 387/800 (48.4%) | 0 | 0/0/132/0 | 1, 2, 4 |
| medium | Sir Champignon | 348/800 (43.5%) | 0 | 0/0/216/0 | 1, 2, 4 |
| medium | Andromoss | 393/800 (49.1%) | 0 | 0/0/3046/0 | 1, 2, 4 |
| medium | Captain Bramble | 475/800 (59.4%) | 0 | 0/0/2250/0 | 1, 2, 4 |
| medium | Duskmantle | 436/800 (54.5%) | 0 | 0/0/2321/0 | 1, 2, 4 |
| medium | Sprig | 348/800 (43.5%) | 0 | 0/0/216/0 | 1, 2, 4 |
| hard | Sir Champignon | 311/800 (38.9%) | 0 | 0/0/236/0 | 1, 2, 4 |
| hard | Andromoss | 397/800 (49.6%) | 0 | 0/0/7400/0 | 1, 2, 4 |
| hard | Captain Bramble | 459/800 (57.4%) | 0 | 0/0/4659/0 | 1, 2, 4 |
| hard | Duskmantle | 522/800 (65.3%) | 0 | 0/0/4611/0 | 1, 2, 4 |
| hard | Sprig | 311/800 (38.9%) | 0 | 0/0/236/0 | 1, 2, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 0.17 | 785.41 / 1750.74 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 0.95 | 791.08 / 1790.78 | 0.00 | 2.21 / 2.21 | 0.00 |
| easy | Captain Bramble | 0.91 | 778.32 / 1623.38 | 20.57 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 0.99 | 795.98 / 1603.79 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 0.17 | 785.41 / 1750.74 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 0.27 | 1666.55 / 492.19 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 3.29 | 1707.13 / 526.51 | 0.00 | 7.40 / 7.40 | 0.00 |
| medium | Captain Bramble | 2.13 | 1672.34 / 450.72 | 38.70 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 2.25 | 1659.66 / 464.17 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 0.27 | 1666.55 / 492.19 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 0.29 | 3379.74 / 262.64 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 8.12 | 3479.86 / 270.29 | 0.00 | 17.25 / 17.25 | 0.00 |
| hard | Captain Bramble | 4.33 | 3447.62 / 211.11 | 60.38 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 4.29 | 3336.42 / 251.66 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 0.29 | 3379.74 / 262.64 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed benefit from the cast. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 0.22 | 25.0% | 132 / 0 | 850 | 0 / 0 |
| easy | Andromoss | 1.10 | 12.8% | 764 / 7 | 863 | 0 / 0 |
| easy | Captain Bramble | 12.58 | 92.5% | 726 / 28 | 903 | 4467 / 0 |
| easy | Duskmantle | 10.14 | 90.0% | 789 / 23 | 900 | 3654 / 0 |
| easy | Sprig | 0.22 | 25.0% | 132 / 0 | 850 | 0 / 0 |
| medium | Sir Champignon | 0.41 | 34.3% | 216 / 0 | 563 | 6 / 4 |
| medium | Andromoss | 3.65 | 9.6% | 2634 / 4 | 590 | 321 / 316 |
| medium | Captain Bramble | 11.76 | 81.6% | 1701 / 26 | 602 | 2141 / 128 |
| medium | Duskmantle | 9.15 | 75.1% | 1797 / 27 | 602 | 1598 / 119 |
| medium | Sprig | 0.41 | 34.3% | 216 / 0 | 563 | 6 / 4 |
| hard | Sir Champignon | 0.44 | 32.8% | 236 / 0 | 284 | 2 / 1 |
| hard | Andromoss | 8.54 | 4.8% | 6495 / 11 | 300 | 2912 / 2887 |
| hard | Captain Bramble | 15.64 | 72.1% | 3466 / 25 | 301 | 4822 / 1350 |
| hard | Duskmantle | 15.08 | 71.4% | 3434 / 18 | 301 | 3973 / 1135 |
| hard | Sprig | 0.44 | 32.8% | 236 / 0 | 284 | 2 / 1 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=3 --casting=opportunity --cast-profile=scaled --report=balance-tier-3`.
