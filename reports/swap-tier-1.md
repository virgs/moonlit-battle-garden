# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Guards unguarded own mole near escape, theft enemy charge, mark unmarked enemy mole, tending unextended own mole near escape. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-20T17:29:14.419Z. Revision 77a5e1d + working changes; config 8f6d2f0ed25c; simulation 910d0d88c912c35b; base seed 20261119. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨54.0% | 🟨50.0% | 🟩77.2%* | 🟨58.2%* |
| Andromoss | 🟨46.0% | — | 🟨46.0% | 🟨47.3% | 🟨49.3%* |
| Captain Bramble | 🟨50.0% | 🟨54.0% | — | 🟩77.2%* | 🟨58.2%* |
| Duskmantle | 🟥22.8%* | 🟨52.7% | 🟥22.8%* | — | 🟨42.2%* |
| Sprig | 🟨41.8%* | 🟨50.7%* | 🟨41.8%* | 🟨57.8%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨54.5% | 🟨50.0% | 🟨59.5% | 🟨43.5% |
| Andromoss | 🟨45.5% | — | 🟨45.5% | 🟨47.5% | 🟨47.0% |
| Captain Bramble | 🟨50.0% | 🟨54.5% | — | 🟨59.5% | 🟨43.5% |
| Duskmantle | 🟨40.5% | 🟨52.5% | 🟨40.5% | — | 🟥36.5% |
| Sprig | 🟨56.5% | 🟨53.0% | 🟨56.5% | 🟩63.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨53.5% | 🟨50.0% | 🟩80.5% | 🟨51.5% |
| Andromoss | 🟨46.5% | — | 🟨46.5% | 🟨48.0% | 🟨51.0% |
| Captain Bramble | 🟨50.0% | 🟨53.5% | — | 🟩80.5% | 🟨51.5% |
| Duskmantle | 🟥19.5% | 🟨52.0% | 🟥19.5% | — | 🟥38.0% |
| Sprig | 🟨48.5% | 🟨49.0% | 🟨48.5% | 🟩62.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨54.0% | 🟨50.0% | 🟩91.5% | 🟩79.5% |
| Andromoss | 🟨46.0% | — | 🟨46.0% | 🟨46.5% | 🟨50.0% |
| Captain Bramble | 🟨50.0% | 🟨54.0% | — | 🟩91.5% | 🟩79.5% |
| Duskmantle | 🟥8.5% | 🟨53.5% | 🟥8.5% | — | 🟨52.0% |
| Sprig | 🟥20.5% | 🟨50.0% | 🟥20.5% | 🟨48.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Duskmantle: easy 59.5%, medium 80.5%, hard 91.5%; spread 32.0 points.
- Sir Champignon vs Sprig: easy 43.5%, medium 51.5%, hard 79.5%; spread 36.0 points; observed favored-side flip.
- Andromoss vs Sprig: easy 47.0%, medium 51.0%, hard 50.0%; spread 4.0 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 59.5%, medium 80.5%, hard 91.5%; spread 32.0 points.
- Captain Bramble vs Sprig: easy 43.5%, medium 51.5%, hard 79.5%; spread 36.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 36.5%, medium 38.0%, hard 52.0%; spread 15.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 65 left-side wins | 0 | 48.8 | 139.3 | 949/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 109 / 91 | 0 | 47.6 | 147.9 | 181/0/0/0 · 996/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 100 / 100 | 0 | 48.8 | 139.3 | 949/0/0/0 · 949/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 119 / 81 | 0 | 47.5 | 133.7 | 954/0/0/0 · 1057/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 87 / 113 | 0 | 50.5 | 127.0 | 1017/0/0/0 · 1041/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 59 left-side wins | 0 | 47.8 | 154.5 | 553/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 91 / 109 | 0 | 47.6 | 147.9 | 996/0/0/0 · 181/0/0/0 |
| easy | Andromoss / Duskmantle | 200 | 95 / 105 | 0 | 47.5 | 135.6 | 867/0/0/0 · 306/0/0/0 |
| easy | Andromoss / Sprig | 200 | 94 / 106 | 0 | 48.7 | 159.6 | 1048/0/0/0 · 154/0/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 65 left-side wins | 0 | 48.8 | 139.3 | 949/0/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 119 / 81 | 0 | 47.5 | 133.7 | 954/0/0/0 · 1057/0/0/0 |
| easy | Captain Bramble / Sprig | 200 | 87 / 113 | 0 | 50.5 | 127.0 | 1017/0/0/0 · 1041/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 55 left-side wins | 0 | 47.9 | 146.3 | 1102/0/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 73 / 127 | 0 | 48.0 | 121.2 | 1107/0/0/0 · 977/0/0/0 |
| easy | Sprig / Sprig | 100 | 63 left-side wins | 0 | 50.7 | 127.5 | 1013/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 52 left-side wins | 0 | 76.7 | 175.9 | 1995/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 107 / 93 | 0 | 58.2 | 158.6 | 208/0/0/0 · 2149/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 100 / 100 | 0 | 76.7 | 175.9 | 1995/0/0/0 · 1995/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 161 / 39 | 0 | 61.5 | 148.6 | 1677/0/0/0 · 2038/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 103 / 97 | 0 | 62.6 | 155.3 | 1623/0/0/0 · 1725/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 59.3 | 162.2 | 1188/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 93 / 107 | 0 | 58.2 | 158.6 | 2149/0/0/0 · 208/0/0/0 |
| medium | Andromoss / Duskmantle | 200 | 96 / 104 | 0 | 55.0 | 152.1 | 1886/0/0/0 · 400/0/0/0 |
| medium | Andromoss / Sprig | 200 | 102 / 98 | 0 | 58.4 | 162.2 | 2084/0/0/0 · 212/0/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 52 left-side wins | 0 | 76.7 | 175.9 | 1995/0/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 161 / 39 | 0 | 61.5 | 148.6 | 1677/0/0/0 · 2038/0/0/0 |
| medium | Captain Bramble / Sprig | 200 | 103 / 97 | 0 | 62.6 | 155.3 | 1623/0/0/0 · 1725/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 58 left-side wins | 0 | 57.5 | 146.2 | 2049/0/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 76 / 124 | 0 | 57.1 | 144.1 | 1969/0/0/0 · 1662/0/0/0 |
| medium | Sprig / Sprig | 100 | 55 left-side wins | 0 | 61.4 | 150.9 | 1768/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 56 left-side wins | 0 | 109.2 | 260.2 | 3521/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 108 / 92 | 0 | 84.0 | 217.2 | 333/0/0/0 · 3862/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 100 / 100 | 0 | 109.2 | 260.2 | 3521/0/0/0 · 3521/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 183 / 17 | 0 | 87.1 | 197.7 | 2403/0/0/0 · 3450/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 159 / 41 | 0 | 92.9 | 237.3 | 2935/0/0/0 · 3622/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 87.5 | 222.4 | 2393/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 92 / 108 | 0 | 84.0 | 217.2 | 3862/0/0/0 · 333/0/0/0 |
| hard | Andromoss / Duskmantle | 200 | 93 / 107 | 0 | 82.3 | 213.8 | 3822/0/0/0 · 348/0/0/0 |
| hard | Andromoss / Sprig | 200 | 100 / 100 | 0 | 85.3 | 221.8 | 3783/0/0/0 · 351/0/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 56 left-side wins | 0 | 109.2 | 260.2 | 3521/0/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 183 / 17 | 0 | 87.1 | 197.7 | 2403/0/0/0 · 3450/0/0/0 |
| hard | Captain Bramble / Sprig | 200 | 159 / 41 | 0 | 92.9 | 237.3 | 2935/0/0/0 · 3622/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 57 left-side wins | 0 | 80.3 | 186.3 | 3277/0/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 104 / 96 | 0 | 82.0 | 211.8 | 3416/0/0/0 · 2897/0/0/0 |
| hard | Sprig / Sprig | 100 | 51 left-side wins | 0 | 86.2 | 224.3 | 3318/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 415/800 (51.9%) | 0 | 4050/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 371/800 (46.4%) | 0 | 4460/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 415/800 (51.9%) | 0 | 4050/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 340/800 (42.5%) | 0 | 4629/0/0/0 | 2, 3, 4 |
| easy | Sprig | 459/800 (57.4%) | 0 | 4226/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 471/800 (58.9%) | 0 | 7498/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 384/800 (48.0%) | 0 | 9456/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 471/800 (58.9%) | 0 | 7498/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 258/800 (32.3%) | 0 | 8494/0/0/0 | 2, 3, 4 |
| medium | Sprig | 416/800 (52.0%) | 0 | 7092/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 550/800 (68.8%) | 0 | 12713/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 377/800 (47.1%) | 0 | 17722/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 550/800 (68.8%) | 0 | 12713/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 245/800 (30.6%) | 0 | 13941/0/0/0 | 2, 3, 4 |
| hard | Sprig | 278/800 (34.8%) | 0 | 13810/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 3.88 | 772.94 / 1493.47 | 66.90 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 4.88 | 794.04 / 1926.32 | 0.00 | 4.88 / 4.88 | 0.00 |
| easy | Captain Bramble | 3.88 | 772.94 / 1493.47 | 66.90 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 4.41 | 750.47 / 1450.35 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 4.02 | 812.74 / 1366.02 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 6.88 | 1647.22 / 378.20 | 118.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 10.34 | 1700.62 / 514.77 | 0.00 | 10.34 / 10.34 | 0.00 |
| medium | Captain Bramble | 6.88 | 1647.22 / 378.20 | 118.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 8.06 | 1548.79 / 416.82 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 6.66 | 1558.63 / 321.95 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 11.49 | 3550.36 / 111.36 | 191.66 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 19.16 | 3470.46 / 273.69 | 0.00 | 19.16 / 19.16 | 0.00 |
| hard | Captain Bramble | 11.49 | 3550.36 / 111.36 | 191.66 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 13.33 | 3056.90 / 236.62 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 13.12 | 3406.45 / 254.00 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed benefit from the cast. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 32.41 | 87.6% | 3101 / 102 | 902 | 4858 / 0 |
| easy | Andromoss | 5.44 | 9.7% | 3907 / 24 | 900 | 0 / 0 |
| easy | Captain Bramble | 32.41 | 87.6% | 3101 / 102 | 902 | 4858 / 0 |
| easy | Duskmantle | 24.30 | 81.6% | 3527 / 47 | 899 | 5177 / 0 |
| easy | Sprig | 44.59 | 90.6% | 3213 / 133 | 902 | 13855 / 0 |
| medium | Sir Champignon | 35.63 | 80.3% | 5503 / 117 | 602 | 5688 / 415 |
| medium | Andromoss | 11.52 | 9.9% | 8268 / 34 | 605 | 678 / 624 |
| medium | Captain Bramble | 35.63 | 80.3% | 5503 / 117 | 602 | 5688 / 415 |
| medium | Duskmantle | 32.31 | 74.7% | 6445 / 97 | 603 | 3703 / 257 |
| medium | Sprig | 30.14 | 77.6% | 5324 / 71 | 601 | 4115 / 238 |
| hard | Sir Champignon | 38.78 | 70.2% | 9192 / 56 | 300 | 16665 / 4459 |
| hard | Andromoss | 20.82 | 7.9% | 15329 / 16 | 301 | 5852 / 5291 |
| hard | Captain Bramble | 38.78 | 70.2% | 9192 / 56 | 300 | 16665 / 4459 |
| hard | Duskmantle | 52.31 | 74.4% | 10664 / 48 | 300 | 13914 / 3363 |
| hard | Sprig | 42.52 | 69.0% | 10492 / 48 | 300 | 16948 / 4805 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --casting=opportunity --cast-profile=scaled`.

This is the swap-only diagnostic; Helping Tines clarification remains pending.
