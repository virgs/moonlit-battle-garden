# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a 300–700ms base random delay, multiplied by {"easy":1,"medium":1,"hard":1} for difficulty (profile baseline), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep useful/urgent selected column, theft enemy charge, armor unarmored enemy mole, mark unmarked enemy mole, tending unextended own mole near escape. No refresh of an active Sweep. On-board target visibility 200ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell powers unchanged.

Generated 2026-11-19T21:20:52.936Z. Revision be5233c + working changes; config eb14dc75fe13; simulation b398a20a240fd428; base seed 20261119. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩62.3% | 🟩64.3% | 🟩75.0% | 🟩71.7% |
| Andromoss | 🟥37.7% | — | 🟨46.0%* | 🟨49.2%* | 🟨48.7%* |
| Captain Bramble | 🟥35.7% | 🟨54.0%* | — | 🟨56.0% | 🟨59.0% |
| Duskmantle | 🟥25.0% | 🟨50.8%* | 🟨44.0% | — | 🟨50.5%* |
| Sprig | 🟥28.3% | 🟨51.3%* | 🟨41.0% | 🟨49.5%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩71.0% | 🟨60.0% | 🟩73.5% | 🟩67.0% |
| Andromoss | 🟥29.0% | — | 🟨45.5% | 🟨50.0% | 🟨47.5% |
| Captain Bramble | 🟨40.0% | 🟨54.5% | — | 🟨58.0% | 🟨59.0% |
| Duskmantle | 🟥26.5% | 🟨50.0% | 🟨42.0% | — | 🟨51.0% |
| Sprig | 🟥33.0% | 🟨52.5% | 🟨41.0% | 🟨49.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.0% | 🟨59.0% | 🟩71.0% | 🟩72.0% |
| Andromoss | 🟥39.0% | — | 🟨41.5% | 🟨46.5% | 🟨46.5% |
| Captain Bramble | 🟨41.0% | 🟨58.5% | — | 🟨56.0% | 🟨56.5% |
| Duskmantle | 🟥29.0% | 🟨53.5% | 🟨44.0% | — | 🟨46.0% |
| Sprig | 🟥28.0% | 🟨53.5% | 🟨43.5% | 🟨54.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨55.0% | 🟩74.0% | 🟩80.5% | 🟩76.0% |
| Andromoss | 🟨45.0% | — | 🟨51.0% | 🟨51.0% | 🟨52.0% |
| Captain Bramble | 🟥26.0% | 🟨49.0% | — | 🟨54.0% | 🟩61.5% |
| Duskmantle | 🟥19.5% | 🟨49.0% | 🟨46.0% | — | 🟨54.5% |
| Sprig | 🟥24.0% | 🟨48.0% | 🟥38.5% | 🟨45.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Andromoss vs Captain Bramble: easy 45.5%, medium 41.5%, hard 51.0%; spread 9.5 points; observed favored-side flip.
- Andromoss vs Duskmantle: easy 50.0%, medium 46.5%, hard 51.0%; spread 4.5 points; observed favored-side flip.
- Andromoss vs Sprig: easy 47.5%, medium 46.5%, hard 52.0%; spread 5.5 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 51.0%, medium 46.0%, hard 54.5%; spread 8.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 51 left-side wins | 0 | 49.4 | 148.7 | 1183/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 142 / 58 | 0 | 48.8 | 141.1 | 878/0/0/0 · 700/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 120 / 80 | 0 | 51.5 | 147.7 | 1200/0/0/0 · 1198/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 147 / 53 | 0 | 49.9 | 135.9 | 1139/0/0/0 · 1191/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 134 / 66 | 0 | 49.1 | 136.5 | 1151/0/0/0 · 1143/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 59 left-side wins | 0 | 47.8 | 154.5 | 564/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 91 / 109 | 0 | 51.3 | 170.9 | 680/0/0/0 · 984/0/0/0 |
| easy | Andromoss / Duskmantle | 200 | 100 / 100 | 0 | 48.1 | 134.7 | 627/0/0/0 · 935/0/0/0 |
| easy | Andromoss / Sprig | 200 | 95 / 105 | 0 | 49.4 | 146.2 | 773/0/0/0 · 736/0/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 60 left-side wins | 0 | 53.2 | 182.5 | 1193/0/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 116 / 84 | 0 | 50.7 | 158.3 | 1207/0/0/0 · 1205/0/0/0 |
| easy | Captain Bramble / Sprig | 200 | 118 / 82 | 0 | 52.5 | 153.2 | 1227/0/0/0 · 1223/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 61 left-side wins | 0 | 49.6 | 147.7 | 1189/0/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 102 / 98 | 0 | 52.0 | 158.9 | 1236/0/0/0 · 1189/0/0/0 |
| easy | Sprig / Sprig | 100 | 59 left-side wins | 0 | 52.3 | 163.4 | 1215/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 56 left-side wins | 0 | 61.5 | 155.8 | 2068/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 122 / 78 | 0 | 58.1 | 153.2 | 961/0/0/0 · 1848/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 118 / 82 | 0 | 62.3 | 170.8 | 2247/0/0/0 · 2213/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 142 / 58 | 0 | 62.5 | 158.0 | 2029/0/0/0 · 2063/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 144 / 56 | 0 | 61.5 | 157.6 | 2072/0/0/0 · 1910/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 59.6 | 161.3 | 1148/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 83 / 117 | 0 | 60.1 | 163.7 | 1854/0/0/0 · 1090/0/0/0 |
| medium | Andromoss / Duskmantle | 200 | 93 / 107 | 0 | 57.8 | 159.8 | 1826/0/0/0 · 1093/0/0/0 |
| medium | Andromoss / Sprig | 200 | 93 / 107 | 0 | 59.5 | 160.4 | 2009/0/0/0 · 685/0/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 56 left-side wins | 0 | 62.1 | 158.3 | 2151/0/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 112 / 88 | 0 | 64.0 | 169.6 | 2181/0/0/0 · 2232/0/0/0 |
| medium | Captain Bramble / Sprig | 200 | 113 / 87 | 0 | 62.5 | 168.4 | 2276/0/0/0 · 2122/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 59 left-side wins | 0 | 62.3 | 167.3 | 2266/0/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 92 / 108 | 0 | 60.9 | 167.8 | 2215/0/0/0 · 1978/0/0/0 |
| medium | Sprig / Sprig | 100 | 52 left-side wins | 0 | 64.3 | 170.0 | 2029/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 57 left-side wins | 0 | 90.0 | 239.3 | 1932/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 110 / 90 | 0 | 85.3 | 222.8 | 348/0/0/0 · 3955/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 148 / 52 | 0 | 79.9 | 195.4 | 1785/0/0/0 · 1754/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 161 / 39 | 0 | 77.5 | 195.3 | 1691/0/0/0 · 1712/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 152 / 48 | 0 | 76.8 | 199.2 | 1678/0/0/0 · 1921/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 87.5 | 219.4 | 2176/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 102 / 98 | 0 | 87.5 | 208.8 | 3898/0/0/0 · 474/0/0/0 |
| hard | Andromoss / Duskmantle | 200 | 102 / 98 | 0 | 85.3 | 217.2 | 3970/0/0/0 · 466/0/0/0 |
| hard | Andromoss / Sprig | 200 | 104 / 96 | 0 | 85.0 | 221.3 | 4055/0/0/0 · 394/0/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 53 left-side wins | 0 | 80.8 | 207.2 | 2079/0/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 108 / 92 | 0 | 82.3 | 220.1 | 2140/0/0/0 · 2180/0/0/0 |
| hard | Captain Bramble / Sprig | 200 | 123 / 77 | 0 | 83.3 | 225.3 | 2381/0/0/0 · 2175/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 59 left-side wins | 0 | 82.9 | 212.3 | 2144/0/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 109 / 91 | 0 | 83.3 | 209.1 | 2300/0/0/0 · 2037/0/0/0 |
| hard | Sprig / Sprig | 100 | 53 left-side wins | 0 | 85.7 | 256.2 | 2238/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 543/800 (67.9%) | 0 | 5551/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 344/800 (43.0%) | 0 | 3344/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 423/800 (52.9%) | 0 | 5809/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 339/800 (42.4%) | 0 | 5756/0/0/0 | 2, 3, 4 |
| easy | Sprig | 351/800 (43.9%) | 0 | 5506/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 526/800 (65.8%) | 0 | 9377/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 347/800 (43.4%) | 0 | 8685/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 424/800 (53.0%) | 0 | 9911/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 345/800 (43.1%) | 0 | 9869/0/0/0 | 2, 3, 4 |
| medium | Sprig | 358/800 (44.8%) | 0 | 8724/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 571/800 (71.4%) | 0 | 7434/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 398/800 (49.8%) | 0 | 18054/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 381/800 (47.6%) | 0 | 8828/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 338/800 (42.3%) | 0 | 8802/0/0/0 | 2, 3, 4 |
| hard | Sprig | 312/800 (39.0%) | 0 | 8765/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 5.46 | 809.89 / 1443.12 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 3.48 | 789.74 / 1766.98 | 0.00 | 1.52 / 1.46 | 1.92 |
| easy | Captain Bramble | 5.77 | 797.17 / 1741.90 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 5.71 | 773.27 / 1623.20 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 5.36 | 783.08 / 1684.41 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 9.14 | 1661.48 / 448.47 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 9.42 | 1692.44 / 516.19 | 0.00 | 6.72 / 6.38 | 2.63 |
| medium | Captain Bramble | 9.70 | 1688.69 / 520.94 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 9.50 | 1639.47 / 495.04 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 8.37 | 1660.39 / 499.65 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 6.88 | 3238.09 / 217.07 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 19.85 | 3433.38 / 267.08 | 0.00 | 18.37 / 16.43 | 1.35 |
| hard | Captain Bramble | 8.44 | 3346.39 / 264.53 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 8.32 | 3317.22 / 262.98 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 8.16 | 3319.74 / 264.74 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed useful after hostile warning. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 9.89 | 44.6% | 4368 / 15 | 501 | 0 / 0 |
| easy | Andromoss | 4.90 | 28.8% | 2780 / 11 | 497 | 0 / 0 |
| easy | Captain Bramble | 10.27 | 43.6% | 4616 / 16 | 503 | 34 / 1 |
| easy | Duskmantle | 10.15 | 43.5% | 4567 / 18 | 502 | 4 / 1 |
| easy | Sprig | 11.49 | 53.1% | 4291 / 25 | 503 | 39 / 3 |
| medium | Sir Champignon | 34.77 | 73.5% | 7309 / 76 | 501 | 4932 / 422 |
| medium | Andromoss | 10.97 | 13.8% | 7537 / 22 | 503 | 581 / 543 |
| medium | Captain Bramble | 35.08 | 72.1% | 7760 / 68 | 501 | 5271 / 545 |
| medium | Duskmantle | 33.41 | 71.3% | 7603 / 60 | 501 | 4590 / 498 |
| medium | Sprig | 33.12 | 74.4% | 6695 / 78 | 502 | 4598 / 501 |
| hard | Sir Champignon | 162.01 | 95.5% | 5502 / 281 | 501 | 67487 / 1017 |
| hard | Andromoss | 20.58 | 3.3% | 15878 / 37 | 501 | 5816 / 5696 |
| hard | Captain Bramble | 158.87 | 94.5% | 6749 / 286 | 500 | 65752 / 1529 |
| hard | Duskmantle | 156.81 | 94.5% | 6658 / 290 | 500 | 64529 / 1497 |
| hard | Sprig | 128.07 | 93.4% | 6527 / 249 | 500 | 68281 / 1374 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --casting=opportunity --cast-profile=baseline --report=casting-baseline`.
