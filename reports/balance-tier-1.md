# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Guards unguarded own mole near escape; rabbit pressure visible enemy target/no active pressure; mark unmarked enemy mole; tending unextended own mole near escape. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-21T00:04:19.611Z. Revision 551e756 + working changes; config d5bd5581763d; simulation 629810c0772b8b08; base seed 20261118. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩72.0%* | 🟨50.0% | 🟩77.0%* | 🟨57.8%* |
| Andromoss | 🟥28.0%* | — | 🟥28.0%* | 🟨45.5%* | 🟥39.2% |
| Captain Bramble | 🟨50.0% | 🟩72.0%* | — | 🟩77.0%* | 🟨57.8%* |
| Duskmantle | 🟥23.0%* | 🟨54.5%* | 🟥23.0%* | — | 🟨42.5%* |
| Sprig | 🟨42.2%* | 🟩60.8% | 🟨42.2%* | 🟨57.5%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.0% | 🟨50.0% | 🟨59.5% | 🟨43.0% |
| Andromoss | 🟨50.0% | — | 🟨50.0% | 🟨53.0% | 🟨42.0% |
| Captain Bramble | 🟨50.0% | 🟨50.0% | — | 🟨59.5% | 🟨43.0% |
| Duskmantle | 🟨40.5% | 🟨47.0% | 🟨40.5% | — | 🟥37.0% |
| Sprig | 🟨57.0% | 🟨58.0% | 🟨57.0% | 🟩63.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩77.5% | 🟨50.0% | 🟩80.0% | 🟨51.0% |
| Andromoss | 🟥22.5% | — | 🟥22.5% | 🟨45.5% | 🟥37.0% |
| Captain Bramble | 🟨50.0% | 🟩77.5% | — | 🟩80.0% | 🟨51.0% |
| Duskmantle | 🟥20.0% | 🟨54.5% | 🟥20.0% | — | 🟥38.0% |
| Sprig | 🟨49.0% | 🟩63.0% | 🟨49.0% | 🟩62.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩88.5% | 🟨50.0% | 🟩91.5% | 🟩79.5% |
| Andromoss | 🟥11.5% | — | 🟥11.5% | 🟥38.0% | 🟥38.5% |
| Captain Bramble | 🟨50.0% | 🟩88.5% | — | 🟩91.5% | 🟩79.5% |
| Duskmantle | 🟥8.5% | 🟩62.0% | 🟥8.5% | — | 🟨52.5% |
| Sprig | 🟥20.5% | 🟩61.5% | 🟥20.5% | 🟨47.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 50.0%, medium 77.5%, hard 88.5%; spread 38.5 points.
- Sir Champignon vs Duskmantle: easy 59.5%, medium 80.0%, hard 91.5%; spread 32.0 points.
- Sir Champignon vs Sprig: easy 43.0%, medium 51.0%, hard 79.5%; spread 36.5 points; observed favored-side flip.
- Andromoss vs Captain Bramble: easy 50.0%, medium 22.5%, hard 11.5%; spread 38.5 points.
- Andromoss vs Duskmantle: easy 53.0%, medium 45.5%, hard 38.0%; spread 15.0 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 59.5%, medium 80.0%, hard 91.5%; spread 32.0 points.
- Captain Bramble vs Sprig: easy 43.0%, medium 51.0%, hard 79.5%; spread 36.5 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 37.0%, medium 38.0%, hard 52.5%; spread 15.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 65 left-side wins | 0 | 48.8 | 139.6 | 950/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 100 / 100 | 0 | 48.3 | 134.7 | 1042/0/0/0 · 1059/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 100 / 100 | 0 | 48.8 | 139.6 | 950/0/0/0 · 950/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 119 / 81 | 0 | 48.0 | 136.7 | 953/0/0/0 · 1061/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 86 / 114 | 0 | 50.3 | 127.0 | 1015/0/0/0 · 1038/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 59 left-side wins | 0 | 48.4 | 156.2 | 1003/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 100 / 100 | 0 | 48.3 | 134.7 | 1059/0/0/0 · 1042/0/0/0 |
| easy | Andromoss / Duskmantle | 200 | 106 / 94 | 0 | 45.7 | 141.8 | 1008/0/0/0 · 1089/0/0/0 |
| easy | Andromoss / Sprig | 200 | 84 / 116 | 0 | 49.2 | 125.5 | 1112/0/0/0 · 1047/0/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 65 left-side wins | 0 | 48.8 | 139.6 | 950/0/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 119 / 81 | 0 | 48.0 | 136.7 | 953/0/0/0 · 1061/0/0/0 |
| easy | Captain Bramble / Sprig | 200 | 86 / 114 | 0 | 50.3 | 127.0 | 1015/0/0/0 · 1038/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 55 left-side wins | 0 | 47.7 | 145.1 | 1098/0/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 74 / 126 | 0 | 48.0 | 121.2 | 1106/0/0/0 · 973/0/0/0 |
| easy | Sprig / Sprig | 100 | 64 left-side wins | 0 | 50.4 | 125.5 | 1010/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 52 left-side wins | 0 | 76.8 | 175.9 | 1990/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 155 / 45 | 0 | 59.0 | 155.4 | 1737/0/0/0 · 1909/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 100 / 100 | 0 | 76.8 | 175.9 | 1990/0/0/0 · 1990/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 160 / 40 | 0 | 61.5 | 143.4 | 1673/0/0/0 · 2035/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 102 / 98 | 0 | 63.6 | 155.4 | 1622/0/0/0 · 1725/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 53 left-side wins | 0 | 60.5 | 153.6 | 1896/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 45 / 155 | 0 | 59.0 | 155.4 | 1909/0/0/0 · 1737/0/0/0 |
| medium | Andromoss / Duskmantle | 200 | 91 / 109 | 0 | 56.9 | 152.2 | 1774/0/0/0 · 1980/0/0/0 |
| medium | Andromoss / Sprig | 200 | 74 / 126 | 0 | 59.5 | 155.4 | 1809/0/0/0 · 1660/0/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 52 left-side wins | 0 | 76.8 | 175.9 | 1990/0/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 160 / 40 | 0 | 61.5 | 143.4 | 1673/0/0/0 · 2035/0/0/0 |
| medium | Captain Bramble / Sprig | 200 | 102 / 98 | 0 | 63.6 | 155.4 | 1622/0/0/0 · 1725/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 58 left-side wins | 0 | 57.5 | 143.8 | 2043/0/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 76 / 124 | 0 | 57.0 | 144.1 | 1967/0/0/0 · 1658/0/0/0 |
| medium | Sprig / Sprig | 100 | 54 left-side wins | 0 | 61.6 | 150.9 | 1772/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 55 left-side wins | 0 | 109.2 | 261.3 | 3527/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 177 / 23 | 0 | 85.4 | 205.2 | 2419/0/0/0 · 3010/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 100 / 100 | 0 | 109.2 | 261.3 | 3527/0/0/0 · 3527/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 183 / 17 | 0 | 87.2 | 201.2 | 2410/0/0/0 · 3464/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 159 / 41 | 0 | 92.7 | 237.3 | 2936/0/0/0 · 3621/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 50 left-side wins | 0 | 84.7 | 230.3 | 3283/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 23 / 177 | 0 | 85.4 | 205.2 | 3010/0/0/0 · 2419/0/0/0 |
| hard | Andromoss / Duskmantle | 200 | 76 / 124 | 0 | 86.2 | 221.1 | 3233/0/0/0 · 3629/0/0/0 |
| hard | Andromoss / Sprig | 200 | 77 / 123 | 0 | 86.0 | 232.1 | 3334/0/0/0 · 3198/0/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 55 left-side wins | 0 | 109.2 | 261.3 | 3527/0/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 183 / 17 | 0 | 87.2 | 201.2 | 2410/0/0/0 · 3464/0/0/0 |
| hard | Captain Bramble / Sprig | 200 | 159 / 41 | 0 | 92.7 | 237.3 | 2936/0/0/0 · 3621/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 56 left-side wins | 0 | 80.2 | 185.3 | 3261/0/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 105 / 95 | 0 | 81.7 | 205.6 | 3401/0/0/0 · 2879/0/0/0 |
| hard | Sprig / Sprig | 100 | 50 left-side wins | 0 | 86.4 | 221.8 | 3304/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 405/800 (50.6%) | 0 | 4910/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 390/800 (48.8%) | 0 | 5241/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 405/800 (50.6%) | 0 | 4910/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 330/800 (41.3%) | 0 | 5415/0/0/0 | 2, 3, 4 |
| easy | Sprig | 470/800 (58.8%) | 0 | 5106/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 517/800 (64.6%) | 0 | 9012/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 255/800 (31.9%) | 0 | 9297/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 517/800 (64.6%) | 0 | 9012/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 265/800 (33.1%) | 0 | 10060/0/0/0 | 2, 3, 4 |
| medium | Sprig | 446/800 (55.8%) | 0 | 8540/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 619/800 (77.4%) | 0 | 14819/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 199/800 (24.9%) | 0 | 15870/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 619/800 (77.4%) | 0 | 14819/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 263/800 (32.9%) | 0 | 17219/0/0/0 | 2, 3, 4 |
| hard | Sprig | 300/800 (37.5%) | 0 | 16623/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 4.95 | 767.53 / 1417.29 | 84.42 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 5.30 | 774.49 / 1412.30 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Captain Bramble | 4.95 | 767.53 / 1417.29 | 84.42 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 5.40 | 741.06 / 1349.97 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 5.12 | 811.48 / 1113.42 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 8.78 | 1620.22 / 344.94 | 148.74 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 9.25 | 1550.60 / 437.33 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Captain Bramble | 8.78 | 1620.22 / 344.94 | 148.74 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 10.02 | 1504.13 / 405.22 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 8.46 | 1514.66 / 274.96 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 14.12 | 3410.15 / 64.17 | 231.57 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 15.73 | 3035.42 / 251.81 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Captain Bramble | 14.12 | 3410.15 / 64.17 | 231.57 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 17.45 | 2972.43 / 237.07 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 16.65 | 3360.22 / 247.51 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed benefit from the cast. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 39.44 | 87.1% | 3960 / 124 | 900 | 6209 / 0 |
| easy | Andromoss | 37.94 | 85.7% | 4238 / 99 | 902 | 9694 / 0 |
| easy | Captain Bramble | 39.44 | 87.1% | 3960 / 124 | 900 | 6209 / 0 |
| easy | Duskmantle | 28.02 | 80.5% | 4317 / 61 | 900 | 6004 / 0 |
| easy | Sprig | 56.65 | 90.6% | 4096 / 165 | 902 | 19256 / 0 |
| medium | Sir Champignon | 42.80 | 79.1% | 7022 / 144 | 602 | 7087 / 556 |
| medium | Andromoss | 42.79 | 77.9% | 7401 / 148 | 601 | 8088 / 474 |
| medium | Captain Bramble | 42.80 | 79.1% | 7022 / 144 | 602 | 7087 / 556 |
| medium | Duskmantle | 37.57 | 73.0% | 8017 / 113 | 602 | 4614 / 362 |
| medium | Sprig | 35.57 | 75.9% | 6768 / 94 | 602 | 4741 / 290 |
| hard | Sir Champignon | 44.86 | 68.3% | 11292 / 68 | 300 | 18423 / 5248 |
| hard | Andromoss | 62.33 | 74.5% | 12587 / 105 | 300 | 16371 / 4074 |
| hard | Captain Bramble | 44.86 | 68.3% | 11292 / 68 | 300 | 18423 / 5248 |
| hard | Duskmantle | 65.56 | 73.3% | 13958 / 56 | 300 | 17070 / 4459 |
| hard | Sprig | 50.73 | 67.0% | 13319 / 74 | 300 | 19317 / 5900 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261118 --tier=1 --casting=opportunity --cast-profile=scaled --report=balance-tier-1`.
