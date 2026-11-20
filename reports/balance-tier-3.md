# Five-character roster diagnostic

Isolated tier 3: 3-slot charge cap; only tier 3 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Ward before enemy theft readiness (2+ charge), no active refresh; theft 2+ enemy stars and no ward; Resolve unguarded own near-escape mole; Siphon visible own mole/no active refresh; Weed Out hostile effects or ward threat. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-20T19:04:18.087Z. Revision 3524427 + working changes; config f9cd31f40944; simulation 8268bc2bb3c8d99e; base seed 20261119. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.0% | 🟥37.5% | 🟥36.8%* | 🟨50.0% |
| Andromoss | 🟨50.0% | — | 🟨47.8% | 🟨49.3%* | 🟨50.0% |
| Captain Bramble | 🟩62.5% | 🟨52.2% | — | 🟨49.8%* | 🟩62.5% |
| Duskmantle | 🟩63.2%* | 🟨50.7%* | 🟨50.2%* | — | 🟩63.2%* |
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
| Andromoss | 🟨50.0% | — | 🟨47.5% | 🟨48.5% | 🟨50.0% |
| Captain Bramble | 🟩65.5% | 🟨52.5% | — | 🟨54.0% | 🟩65.5% |
| Duskmantle | 🟩60.5% | 🟨51.5% | 🟨46.0% | — | 🟩60.5% |
| Sprig | 🟨50.0% | 🟨50.0% | 🟥34.5% | 🟥39.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.0% | 🟥32.0% | 🟥23.5% | 🟨50.0% |
| Andromoss | 🟨50.0% | — | 🟨48.0% | 🟨50.5% | 🟨50.0% |
| Captain Bramble | 🟩68.0% | 🟨52.0% | — | 🟨42.0% | 🟩68.0% |
| Duskmantle | 🟩76.5% | 🟨49.5% | 🟨58.0% | — | 🟩76.5% |
| Sprig | 🟨50.0% | 🟨50.0% | 🟥32.0% | 🟥23.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Duskmantle: easy 47.5%, medium 39.5%, hard 23.5%; spread 24.0 points.
- Andromoss vs Duskmantle: easy 49.0%, medium 48.5%, hard 50.5%; spread 2.0 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 53.5%, medium 54.0%, hard 42.0%; spread 12.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 52.5%, medium 60.5%, hard 76.5%; spread 24.0 points.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 59 left-side wins | 0 | 44.6 | 142.5 | 0/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 100 / 100 | 0 | 45.5 | 145.5 | 0/0/135/0 · 0/0/181/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 92 / 108 | 0 | 44.6 | 125.7 | 0/0/0/0 · 0/0/208/0 |
| easy | Sir Champignon / Duskmantle | 200 | 95 / 105 | 0 | 44.3 | 133.4 | 0/0/0/0 · 0/0/224/0 |
| easy | Sir Champignon / Sprig | 200 | 100 / 100 | 0 | 44.6 | 142.5 | 0/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 59 left-side wins | 0 | 45.5 | 145.5 | 0/0/165/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 96 / 104 | 0 | 45.6 | 134.5 | 0/0/241/0 · 0/0/106/0 |
| easy | Andromoss / Duskmantle | 200 | 98 / 102 | 0 | 44.6 | 136.6 | 0/0/222/0 · 0/0/125/0 |
| easy | Andromoss / Sprig | 200 | 100 / 100 | 0 | 45.5 | 145.5 | 0/0/181/0 · 0/0/135/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 59 left-side wins | 0 | 45.6 | 141.1 | 0/0/216/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 107 / 93 | 0 | 44.3 | 129.9 | 0/0/206/0 · 0/0/217/0 |
| easy | Captain Bramble / Sprig | 200 | 108 / 92 | 0 | 44.6 | 125.7 | 0/0/208/0 · 0/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 59 left-side wins | 0 | 44.6 | 141.0 | 0/0/223/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 105 / 95 | 0 | 44.3 | 133.4 | 0/0/224/0 · 0/0/0/0 |
| easy | Sprig / Sprig | 100 | 59 left-side wins | 0 | 44.6 | 142.5 | 0/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 53.3 | 145.1 | 0/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 100 / 100 | 0 | 54.8 | 150.8 | 0/0/220/0 · 0/0/656/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 69 / 131 | 0 | 55.8 | 138.1 | 0/0/0/0 · 0/0/539/0 |
| medium | Sir Champignon / Duskmantle | 200 | 79 / 121 | 0 | 50.0 | 133.6 | 0/0/0/0 · 0/0/552/0 |
| medium | Sir Champignon / Sprig | 200 | 100 / 100 | 0 | 53.3 | 145.1 | 0/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 55.1 | 151.8 | 0/0/462/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 95 / 105 | 0 | 53.9 | 151.8 | 0/0/822/0 · 0/0/105/0 |
| medium | Andromoss / Duskmantle | 200 | 97 / 103 | 0 | 53.1 | 148.1 | 0/0/758/0 · 0/0/142/0 |
| medium | Andromoss / Sprig | 200 | 100 / 100 | 0 | 54.8 | 150.8 | 0/0/656/0 · 0/0/220/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 54 left-side wins | 0 | 57.3 | 143.6 | 0/0/549/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 108 / 92 | 0 | 50.8 | 139.8 | 0/0/528/0 · 0/0/556/0 |
| medium | Captain Bramble / Sprig | 200 | 131 / 69 | 0 | 55.8 | 138.1 | 0/0/539/0 · 0/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 58 left-side wins | 0 | 49.5 | 136.4 | 0/0/524/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 121 / 79 | 0 | 50.0 | 133.6 | 0/0/552/0 · 0/0/0/0 |
| medium | Sprig / Sprig | 100 | 58 left-side wins | 0 | 53.3 | 145.1 | 0/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 56 left-side wins | 0 | 75.3 | 189.4 | 0/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 100 / 100 | 0 | 80.0 | 201.4 | 0/0/244/0 · 0/0/1600/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 64 / 136 | 0 | 76.0 | 198.7 | 0/0/0/0 · 0/0/1142/0 |
| hard | Sir Champignon / Duskmantle | 200 | 47 / 153 | 0 | 70.5 | 173.7 | 0/0/0/0 · 0/0/1071/0 |
| hard | Sir Champignon / Sprig | 200 | 100 / 100 | 0 | 75.3 | 189.4 | 0/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 81.3 | 201.4 | 0/0/963/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 96 / 104 | 0 | 79.3 | 201.2 | 0/0/1843/0 · 0/0/61/0 |
| hard | Andromoss / Duskmantle | 200 | 101 / 99 | 0 | 77.8 | 208.8 | 0/0/1779/0 · 0/0/106/0 |
| hard | Andromoss / Sprig | 200 | 100 / 100 | 0 | 80.0 | 201.4 | 0/0/1600/0 · 0/0/244/0 |
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
| easy | Sir Champignon | 387/800 (48.4%) | 0 | 0/0/135/0 | 1, 2, 4 |
| easy | Andromoss | 394/800 (49.3%) | 0 | 0/0/990/0 | 1, 2, 4 |
| easy | Captain Bramble | 427/800 (53.4%) | 0 | 0/0/944/0 | 1, 2, 4 |
| easy | Duskmantle | 405/800 (50.6%) | 0 | 0/0/1013/0 | 1, 2, 4 |
| easy | Sprig | 387/800 (48.4%) | 0 | 0/0/135/0 | 1, 2, 4 |
| medium | Sir Champignon | 348/800 (43.5%) | 0 | 0/0/220/0 | 1, 2, 4 |
| medium | Andromoss | 392/800 (49.0%) | 0 | 0/0/3354/0 | 1, 2, 4 |
| medium | Captain Bramble | 475/800 (59.4%) | 0 | 0/0/2260/0 | 1, 2, 4 |
| medium | Duskmantle | 437/800 (54.6%) | 0 | 0/0/2326/0 | 1, 2, 4 |
| medium | Sprig | 348/800 (43.5%) | 0 | 0/0/220/0 | 1, 2, 4 |
| hard | Sir Champignon | 311/800 (38.9%) | 0 | 0/0/244/0 | 1, 2, 4 |
| hard | Andromoss | 397/800 (49.6%) | 0 | 0/0/7785/0 | 1, 2, 4 |
| hard | Captain Bramble | 460/800 (57.5%) | 0 | 0/0/4672/0 | 1, 2, 4 |
| hard | Duskmantle | 521/800 (65.1%) | 0 | 0/0/4617/0 | 1, 2, 4 |
| hard | Sprig | 311/800 (38.9%) | 0 | 0/0/244/0 | 1, 2, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 0.17 | 785.41 / 1750.74 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 1.03 | 792.03 / 1786.41 | 0.00 | 2.06 / 2.06 | 0.00 |
| easy | Captain Bramble | 0.91 | 778.79 / 1615.33 | 20.64 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 0.99 | 796.36 / 1607.26 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 0.17 | 785.41 / 1750.74 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 0.28 | 1666.55 / 492.19 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 3.62 | 1703.58 / 523.48 | 0.00 | 7.23 / 7.23 | 0.00 |
| medium | Captain Bramble | 2.14 | 1672.61 / 451.06 | 38.88 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 2.25 | 1656.67 / 460.69 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 0.28 | 1666.55 / 492.19 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 0.30 | 3379.74 / 262.64 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 8.53 | 3481.54 / 270.27 | 0.00 | 17.05 / 17.05 | 0.00 |
| hard | Captain Bramble | 4.35 | 3446.14 / 210.78 | 60.53 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 4.30 | 3339.54 / 251.92 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 0.30 | 3379.74 / 262.64 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed benefit from the cast. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 0.22 | 24.6% | 135 / 0 | 852 | 0 / 0 |
| easy | Andromoss | 1.18 | 12.1% | 825 / 7 | 862 | 0 / 0 |
| easy | Captain Bramble | 12.61 | 92.5% | 728 / 28 | 903 | 4467 / 0 |
| easy | Duskmantle | 10.18 | 90.0% | 790 / 23 | 900 | 3654 / 0 |
| easy | Sprig | 0.22 | 24.6% | 135 / 0 | 852 | 0 / 0 |
| medium | Sir Champignon | 0.42 | 34.1% | 220 / 0 | 564 | 4 / 3 |
| medium | Andromoss | 3.98 | 9.0% | 2892 / 7 | 591 | 316 / 308 |
| medium | Captain Bramble | 11.83 | 81.7% | 1711 / 25 | 602 | 2138 / 129 |
| medium | Duskmantle | 9.19 | 75.1% | 1802 / 27 | 602 | 1587 / 117 |
| medium | Sprig | 0.42 | 34.1% | 220 / 0 | 564 | 4 / 3 |
| hard | Sir Champignon | 0.45 | 32.2% | 244 / 0 | 284 | 3 / 3 |
| hard | Andromoss | 8.97 | 4.7% | 6822 / 16 | 301 | 2999 / 2972 |
| hard | Captain Bramble | 15.68 | 72.1% | 3479 / 25 | 301 | 4823 / 1352 |
| hard | Duskmantle | 15.12 | 71.4% | 3440 / 18 | 301 | 3977 / 1136 |
| hard | Sprig | 0.45 | 32.2% | 244 / 0 | 284 | 3 / 3 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=3 --casting=opportunity --cast-profile=scaled --report=balance-tier-3`.
