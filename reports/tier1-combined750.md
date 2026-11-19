# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a shared 300–700ms random delay (identical across difficulties), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep useful/urgent selected column, theft enemy charge, armor unarmored enemy mole, mark unmarked enemy mole, tending unextended own mole near escape. No refresh of an active Sweep. Visibility 200ms; urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell powers unchanged.

Generated 2026-11-19T17:49:45.312Z. Revision 9db9287 + working changes; config 31b5b221c776; simulation afb30df4868ee8eb; base seed 20261119. Tuning overrides: {"sweepIntervalMs":750,"armorTargets":1}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Versus matrices by AI level

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩87.0% | 🟩83.0% | 🟩92.0% | 🟩93.5% |
| Andromoss | 🟥13.0% | — | 🟥31.5% | 🟨49.5% | 🟨50.5% |
| Captain Bramble | 🟥17.0% | 🟩68.5% | — | 🟩67.0% | 🟩61.5% |
| Duskmantle | 🟥8.0% | 🟨50.5% | 🟥33.0% | — | 🟨48.0% |
| Sprig | 🟥6.5% | 🟨49.5% | 🟥38.5% | 🟨52.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩67.5% | 🟩69.5% | 🟩84.0% | 🟩83.5% |
| Andromoss | 🟥32.5% | — | 🟥36.0% | 🟨46.5% | 🟨49.5% |
| Captain Bramble | 🟥30.5% | 🟩64.0% | — | 🟩61.0% | 🟩66.0% |
| Duskmantle | 🟥16.0% | 🟨53.5% | 🟥39.0% | — | 🟨57.0% |
| Sprig | 🟥16.5% | 🟨50.5% | 🟥34.0% | 🟨43.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨58.0% | 🟩85.0% | 🟩87.5% | 🟩92.0% |
| Andromoss | 🟨42.0% | — | 🟨51.0% | 🟨51.5% | 🟨52.5% |
| Captain Bramble | 🟥15.0% | 🟨49.0% | — | 🟨50.5% | 🟨56.5% |
| Duskmantle | 🟥12.5% | 🟨48.5% | 🟨49.5% | — | 🟨57.5% |
| Sprig | 🟥8.0% | 🟨47.5% | 🟨43.5% | 🟨42.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 53 left-side wins | 0 | 50.4 | 129.4 | 1696/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 174 / 26 | 0 | 48.6 | 119.0 | 1237/0/0/0 · 1071/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 166 / 34 | 0 | 51.7 | 138.0 | 1705/0/0/0 · 1772/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 184 / 16 | 0 | 49.1 | 123.2 | 1513/0/0/0 · 1546/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 187 / 13 | 0 | 49.5 | 130.2 | 1645/0/0/0 · 1688/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 53 left-side wins | 0 | 48.4 | 142.9 | 1006/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 63 / 137 | 0 | 51.0 | 147.5 | 1168/0/0/0 · 1589/0/0/0 |
| easy | Andromoss / Duskmantle | 200 | 99 / 101 | 0 | 51.0 | 150.1 | 1218/0/0/0 · 1687/0/0/0 |
| easy | Andromoss / Sprig | 200 | 101 / 99 | 0 | 49.8 | 150.2 | 1444/0/0/0 · 1270/0/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 42 left-side wins | 0 | 56.8 | 160.5 | 2064/0/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 134 / 66 | 0 | 56.3 | 162.3 | 2036/0/0/0 · 2041/0/0/0 |
| easy | Captain Bramble / Sprig | 200 | 123 / 77 | 0 | 56.4 | 150.0 | 2079/0/0/0 · 2046/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 53 left-side wins | 0 | 53.5 | 165.7 | 2053/0/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 96 / 104 | 0 | 52.5 | 154.4 | 2043/0/0/0 · 2041/0/0/0 |
| easy | Sprig / Sprig | 100 | 54 left-side wins | 0 | 54.1 | 153.2 | 2038/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 50 left-side wins | 0 | 68.4 | 188.8 | 2909/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 135 / 65 | 0 | 69.5 | 170.3 | 1378/0/0/0 · 2487/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 139 / 61 | 0 | 73.5 | 182.8 | 2958/0/0/0 · 2965/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 168 / 32 | 0 | 68.5 | 170.8 | 2664/0/0/0 · 2645/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 167 / 33 | 0 | 62.3 | 158.3 | 2702/0/0/0 · 2440/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 57 left-side wins | 0 | 64.8 | 174.4 | 1616/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 72 / 128 | 0 | 70.1 | 183.0 | 2530/0/0/0 · 1741/0/0/0 |
| medium | Andromoss / Duskmantle | 200 | 93 / 107 | 0 | 66.2 | 180.8 | 2474/0/0/0 · 1684/0/0/0 |
| medium | Andromoss / Sprig | 200 | 99 / 101 | 0 | 69.1 | 176.9 | 2923/0/0/0 · 1108/0/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 55 left-side wins | 0 | 72.3 | 185.0 | 2994/0/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 122 / 78 | 0 | 64.8 | 180.6 | 2914/0/0/0 · 2898/0/0/0 |
| medium | Captain Bramble / Sprig | 200 | 132 / 68 | 0 | 67.5 | 197.5 | 3264/0/0/0 · 2996/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 51 left-side wins | 0 | 72.8 | 198.9 | 3100/0/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 114 / 86 | 0 | 71.3 | 191.6 | 3029/0/0/0 · 2718/0/0/0 |
| medium | Sprig / Sprig | 100 | 53 left-side wins | 0 | 66.4 | 196.3 | 2670/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 59 left-side wins | 0 | 97.8 | 244.9 | 3114/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 116 / 84 | 0 | 87.0 | 254.5 | 668/0/0/0 · 4596/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 170 / 30 | 0 | 81.6 | 210.2 | 2613/0/0/0 · 2579/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 175 / 25 | 0 | 82.5 | 196.3 | 2417/0/0/0 · 2494/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 184 / 16 | 0 | 82.3 | 188.8 | 2396/0/0/0 · 2776/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 85.3 | 256.5 | 2510/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 102 / 98 | 0 | 85.5 | 249.2 | 4481/0/0/0 · 924/0/0/0 |
| hard | Andromoss / Duskmantle | 200 | 103 / 97 | 0 | 86.2 | 259.4 | 4362/0/0/0 · 952/0/0/0 |
| hard | Andromoss / Sprig | 200 | 105 / 95 | 0 | 85.8 | 264.0 | 4609/0/0/0 · 825/0/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 57 left-side wins | 0 | 96.0 | 280.6 | 3704/0/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 101 / 99 | 0 | 89.3 | 238.2 | 3379/0/0/0 · 3388/0/0/0 |
| hard | Captain Bramble / Sprig | 200 | 113 / 87 | 0 | 94.3 | 264.8 | 3690/0/0/0 · 3563/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 60 left-side wins | 0 | 85.4 | 242.7 | 3471/0/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 115 / 85 | 0 | 89.9 | 252.7 | 3459/0/0/0 · 3313/0/0/0 |
| hard | Sprig / Sprig | 100 | 50 left-side wins | 0 | 88.9 | 260.2 | 3251/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 711/800 (88.9%) | 0 | 7796/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 289/800 (36.1%) | 0 | 5907/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 428/800 (53.5%) | 0 | 9540/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 279/800 (34.9%) | 0 | 9370/0/0/0 | 2, 3, 4 |
| easy | Sprig | 293/800 (36.6%) | 0 | 9083/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 609/800 (76.1%) | 0 | 12611/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 329/800 (41.1%) | 0 | 12030/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 443/800 (55.4%) | 0 | 13878/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 331/800 (41.4%) | 0 | 13356/0/0/0 | 2, 3, 4 |
| medium | Sprig | 288/800 (36.0%) | 0 | 11932/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 645/800 (80.6%) | 0 | 11208/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 394/800 (49.3%) | 0 | 20558/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 342/800 (42.8%) | 0 | 14276/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 336/800 (42.0%) | 0 | 13764/0/0/0 | 2, 3, 4 |
| hard | Sprig | 283/800 (35.4%) | 0 | 13728/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 7.63 | 1138.59 / 458.99 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 6.13 | 1254.21 / 659.63 | 0.00 | 2.63 / 2.39 | 3.44 |
| easy | Captain Bramble | 9.35 | 1248.41 / 646.85 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 9.15 | 1211.44 / 632.24 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 8.81 | 1236.08 / 633.20 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 12.13 | 2284.64 / 293.31 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 13.02 | 2447.31 / 355.49 | 0.00 | 8.62 / 7.96 | 4.29 |
| medium | Captain Bramble | 13.61 | 2400.11 / 345.11 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 12.82 | 2263.76 / 322.89 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 11.58 | 2376.13 / 339.69 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 10.12 | 3553.38 / 194.09 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 22.56 | 4034.51 / 258.70 | 0.00 | 19.67 / 17.65 | 2.74 |
| hard | Captain Bramble | 13.21 | 3832.69 / 252.62 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 12.87 | 3693.19 / 238.63 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 13.10 | 3816.74 / 253.69 | 0.00 | 0.00 / 0.00 | 0.00 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but delay distribution is identical across heroes and difficulties; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --casting=opportunity --report=tier1-combined750 --sweep-interval-ms=750 --armor-targets=1`.
