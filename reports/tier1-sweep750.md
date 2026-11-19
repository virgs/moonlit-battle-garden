# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a shared 300–700ms random delay (identical across difficulties), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep useful/urgent selected column, theft enemy charge, armor unarmored enemy mole, mark unmarked enemy mole, tending unextended own mole near escape. No refresh of an active Sweep. Visibility 200ms; urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell powers unchanged.

Generated 2026-11-19T17:49:42.976Z. Revision 9db9287 + working changes; config 71c6bd3692a2; simulation afb30df4868ee8eb; base seed 20261119. Tuning overrides: {"sweepIntervalMs":750}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Versus matrices by AI level

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩87.0% | 🟩68.0% | 🟩92.0% | 🟩93.5% |
| Andromoss | 🟥13.0% | — | 🟥17.0% | 🟨49.5% | 🟨50.5% |
| Captain Bramble | 🟥32.0% | 🟩83.0% | — | 🟩80.5% | 🟩80.0% |
| Duskmantle | 🟥8.0% | 🟨50.5% | 🟥19.5% | — | 🟨48.0% |
| Sprig | 🟥6.5% | 🟨49.5% | 🟥20.0% | 🟨52.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩67.5% | 🟨55.5% | 🟩84.0% | 🟩83.5% |
| Andromoss | 🟥32.5% | — | 🟥28.0% | 🟨46.5% | 🟨49.5% |
| Captain Bramble | 🟨44.5% | 🟩72.0% | — | 🟩75.5% | 🟩82.5% |
| Duskmantle | 🟥16.0% | 🟨53.5% | 🟥24.5% | — | 🟨57.0% |
| Sprig | 🟥16.5% | 🟨50.5% | 🟥17.5% | 🟨43.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨58.0% | 🟩76.5% | 🟩87.5% | 🟩92.0% |
| Andromoss | 🟨42.0% | — | 🟨45.0% | 🟨51.5% | 🟨52.5% |
| Captain Bramble | 🟥23.5% | 🟨55.0% | — | 🟨57.5% | 🟩63.5% |
| Duskmantle | 🟥12.5% | 🟨48.5% | 🟨42.5% | — | 🟨57.5% |
| Sprig | 🟥8.0% | 🟨47.5% | 🟥36.5% | 🟨42.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 53 left-side wins | 0 | 50.4 | 129.4 | 1696/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 174 / 26 | 0 | 48.6 | 119.0 | 1237/0/0/0 · 1071/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 136 / 64 | 0 | 49.7 | 139.1 | 1744/0/0/0 · 1738/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 184 / 16 | 0 | 49.1 | 123.2 | 1513/0/0/0 · 1546/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 187 / 13 | 0 | 49.5 | 130.2 | 1645/0/0/0 · 1688/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 53 left-side wins | 0 | 48.4 | 142.9 | 1006/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 34 / 166 | 0 | 50.0 | 138.0 | 1120/0/0/0 · 1483/0/0/0 |
| easy | Andromoss / Duskmantle | 200 | 99 / 101 | 0 | 51.0 | 150.1 | 1218/0/0/0 · 1687/0/0/0 |
| easy | Andromoss / Sprig | 200 | 101 / 99 | 0 | 49.8 | 150.2 | 1444/0/0/0 · 1270/0/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 56 left-side wins | 0 | 55.0 | 147.6 | 1922/0/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 161 / 39 | 0 | 52.1 | 139.7 | 1815/0/0/0 · 1858/0/0/0 |
| easy | Captain Bramble / Sprig | 200 | 160 / 40 | 0 | 54.0 | 142.3 | 1887/0/0/0 · 1872/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 53 left-side wins | 0 | 53.5 | 165.7 | 2053/0/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 96 / 104 | 0 | 52.5 | 154.4 | 2043/0/0/0 · 2041/0/0/0 |
| easy | Sprig / Sprig | 100 | 54 left-side wins | 0 | 54.1 | 153.2 | 2038/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 50 left-side wins | 0 | 68.4 | 188.8 | 2909/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 135 / 65 | 0 | 69.5 | 170.3 | 1378/0/0/0 · 2487/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 111 / 89 | 0 | 70.0 | 192.0 | 3090/0/0/0 · 3034/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 168 / 32 | 0 | 68.5 | 170.8 | 2664/0/0/0 · 2645/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 167 / 33 | 0 | 62.3 | 158.3 | 2702/0/0/0 · 2440/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 57 left-side wins | 0 | 64.8 | 174.4 | 1616/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 56 / 144 | 0 | 63.3 | 169.3 | 2325/0/0/0 · 1509/0/0/0 |
| medium | Andromoss / Duskmantle | 200 | 93 / 107 | 0 | 66.2 | 180.8 | 2474/0/0/0 · 1684/0/0/0 |
| medium | Andromoss / Sprig | 200 | 99 / 101 | 0 | 69.1 | 176.9 | 2923/0/0/0 · 1108/0/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 55 left-side wins | 0 | 75.0 | 191.4 | 2833/0/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 151 / 49 | 0 | 62.0 | 170.8 | 2563/0/0/0 · 2576/0/0/0 |
| medium | Captain Bramble / Sprig | 200 | 165 / 35 | 0 | 65.5 | 173.2 | 2718/0/0/0 · 2564/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 51 left-side wins | 0 | 72.8 | 198.9 | 3100/0/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 114 / 86 | 0 | 71.3 | 191.6 | 3029/0/0/0 · 2718/0/0/0 |
| medium | Sprig / Sprig | 100 | 53 left-side wins | 0 | 66.4 | 196.3 | 2670/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 59 left-side wins | 0 | 97.8 | 244.9 | 3114/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 116 / 84 | 0 | 87.0 | 254.5 | 668/0/0/0 · 4596/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 153 / 47 | 0 | 83.5 | 222.0 | 2802/0/0/0 · 2705/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 175 / 25 | 0 | 82.5 | 196.3 | 2417/0/0/0 · 2494/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 184 / 16 | 0 | 82.3 | 188.8 | 2396/0/0/0 · 2776/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 85.3 | 256.5 | 2510/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 90 / 110 | 0 | 86.0 | 243.7 | 4395/0/0/0 · 952/0/0/0 |
| hard | Andromoss / Duskmantle | 200 | 103 / 97 | 0 | 86.2 | 259.4 | 4362/0/0/0 · 952/0/0/0 |
| hard | Andromoss / Sprig | 200 | 105 / 95 | 0 | 85.8 | 264.0 | 4609/0/0/0 · 825/0/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 53 left-side wins | 0 | 88.5 | 248.5 | 3389/0/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 115 / 85 | 0 | 87.7 | 226.3 | 3184/0/0/0 · 3164/0/0/0 |
| hard | Captain Bramble / Sprig | 200 | 127 / 73 | 0 | 83.8 | 238.3 | 3213/0/0/0 · 3062/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 60 left-side wins | 0 | 85.4 | 242.7 | 3471/0/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 115 / 85 | 0 | 89.9 | 252.7 | 3459/0/0/0 · 3313/0/0/0 |
| hard | Sprig / Sprig | 100 | 50 left-side wins | 0 | 88.9 | 260.2 | 3251/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 681/800 (85.1%) | 0 | 7835/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 260/800 (32.5%) | 0 | 5859/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 551/800 (68.9%) | 0 | 8845/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 252/800 (31.5%) | 0 | 9187/0/0/0 | 2, 3, 4 |
| easy | Sprig | 256/800 (32.0%) | 0 | 8909/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 581/800 (72.6%) | 0 | 12743/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 313/800 (39.1%) | 0 | 11825/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 549/800 (68.6%) | 0 | 12657/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 302/800 (37.8%) | 0 | 13034/0/0/0 | 2, 3, 4 |
| medium | Sprig | 255/800 (31.9%) | 0 | 11500/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 628/800 (78.5%) | 0 | 11397/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 382/800 (47.8%) | 0 | 20472/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 399/800 (49.9%) | 0 | 13443/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 322/800 (40.3%) | 0 | 13540/0/0/0 | 2, 3, 4 |
| hard | Sprig | 269/800 (33.6%) | 0 | 13227/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 7.67 | 1136.59 / 468.76 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 6.07 | 1215.13 / 641.73 | 0.00 | 2.61 / 2.38 | 3.39 |
| easy | Captain Bramble | 8.65 | 1157.84 / 579.25 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 8.92 | 1170.18 / 614.00 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 8.59 | 1198.65 / 615.77 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 12.29 | 2294.67 / 303.45 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 12.76 | 2375.00 / 347.14 | 0.00 | 8.52 / 7.86 | 4.13 |
| medium | Captain Bramble | 12.28 | 2160.48 / 303.54 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 12.42 | 2180.24 / 315.70 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 11.04 | 2254.22 / 326.97 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 10.35 | 3576.32 / 198.84 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 22.45 | 4008.31 / 258.29 | 0.00 | 19.54 / 17.51 | 2.77 |
| hard | Captain Bramble | 12.57 | 3639.66 / 237.81 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 12.59 | 3632.89 / 237.28 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 12.47 | 3668.16 / 245.59 | 0.00 | 0.00 / 0.00 | 0.00 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but delay distribution is identical across heroes and difficulties; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --casting=opportunity --report=tier1-sweep750 --sweep-interval-ms=750`.
