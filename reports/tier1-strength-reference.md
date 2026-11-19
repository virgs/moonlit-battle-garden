# Historical pre-nerf one-star opportunity diagnostic

Sweep250 ms / Tin Caps two moles. Superseded by D109/I08; current results are in balance-tier-1.md.

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a shared 300–700ms random delay (identical across difficulties), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep useful/urgent selected column, theft enemy charge, armor unarmored enemy mole, mark unmarked enemy mole, tending unextended own mole near escape. No refresh of an active Sweep. Visibility 200ms; urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell powers unchanged.

Generated 2026-11-19T17:29:05.677Z. Revision eaa9436 + working changes; config 87c48ed2b980; simulation dded98242ea4dc16; base seed 20261119. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Versus matrices by AI level

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩86.5% | 🟩75.5% | 🟩90.0% | 🟩90.0% |
| Andromoss | 🟥13.5% | — | 🟥17.0% | 🟨49.5% | 🟨50.5% |
| Captain Bramble | 🟥24.5% | 🟩83.0% | — | 🟩80.5% | 🟩80.0% |
| Duskmantle | 🟥10.0% | 🟨50.5% | 🟥19.5% | — | 🟨48.0% |
| Sprig | 🟥10.0% | 🟨49.5% | 🟥20.0% | 🟨52.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩66.5% | 🟩62.5% | 🟩85.5% | 🟩87.5% |
| Andromoss | 🟥33.5% | — | 🟥28.0% | 🟨46.5% | 🟨49.5% |
| Captain Bramble | 🟥37.5% | 🟩72.0% | — | 🟩75.5% | 🟩82.5% |
| Duskmantle | 🟥14.5% | 🟨53.5% | 🟥24.5% | — | 🟨57.0% |
| Sprig | 🟥12.5% | 🟨50.5% | 🟥17.5% | 🟨43.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.0% | 🟩80.5% | 🟩87.5% | 🟩89.0% |
| Andromoss | 🟥39.0% | — | 🟨45.0% | 🟨51.5% | 🟨52.5% |
| Captain Bramble | 🟥19.5% | 🟨55.0% | — | 🟨57.5% | 🟩63.5% |
| Duskmantle | 🟥12.5% | 🟨48.5% | 🟨42.5% | — | 🟨57.5% |
| Sprig | 🟥11.0% | 🟨47.5% | 🟥36.5% | 🟨42.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 50 left-side wins | 0 | 51.6 | 152.3 | 1836/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 173 / 27 | 0 | 46.3 | 112.8 | 1135/0/0/0 · 971/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 151 / 49 | 0 | 48.4 | 134.7 | 1659/0/0/0 · 1660/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 180 / 20 | 0 | 47.9 | 121.1 | 1444/0/0/0 · 1484/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 180 / 20 | 0 | 50.0 | 117.7 | 1514/0/0/0 · 1544/0/0/0 |
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
| medium | Sir Champignon / Sir Champignon | 100 | 53 left-side wins | 0 | 72.0 | 198.7 | 3114/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 133 / 67 | 0 | 65.8 | 159.2 | 1225/0/0/0 · 2381/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 125 / 75 | 0 | 65.3 | 172.5 | 2818/0/0/0 · 2805/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 171 / 29 | 0 | 69.8 | 162.5 | 2629/0/0/0 · 2609/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 175 / 25 | 0 | 69.3 | 164.5 | 2683/0/0/0 · 2394/0/0/0 |
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
| hard | Sir Champignon / Sir Champignon | 100 | 54 left-side wins | 0 | 88.8 | 236.2 | 2765/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 122 / 78 | 0 | 85.3 | 255.8 | 667/0/0/0 · 4551/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 161 / 39 | 0 | 83.7 | 217.9 | 2905/0/0/0 · 2730/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 175 / 25 | 0 | 76.8 | 202.9 | 2283/0/0/0 · 2273/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 178 / 22 | 0 | 79.3 | 189.7 | 2311/0/0/0 · 2690/0/0/0 |
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
| easy | Sir Champignon | 684/800 (85.5%) | 0 | 7588/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 261/800 (32.6%) | 0 | 5759/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 536/800 (67.0%) | 0 | 8767/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 256/800 (32.0%) | 0 | 9125/0/0/0 | 2, 3, 4 |
| easy | Sprig | 263/800 (32.9%) | 0 | 8765/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 604/800 (75.5%) | 0 | 12469/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 315/800 (39.4%) | 0 | 11719/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 535/800 (66.9%) | 0 | 12428/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 299/800 (37.4%) | 0 | 12998/0/0/0 | 2, 3, 4 |
| medium | Sprig | 247/800 (30.9%) | 0 | 11454/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 636/800 (79.5%) | 0 | 10931/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 376/800 (47.0%) | 0 | 20427/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 391/800 (48.9%) | 0 | 13468/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 322/800 (40.3%) | 0 | 13319/0/0/0 | 2, 3, 4 |
| hard | Sprig | 275/800 (34.4%) | 0 | 13141/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 7.19 | 1068.21 / 422.14 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 5.94 | 1193.61 / 627.27 | 0.00 | 2.58 / 2.36 | 3.29 |
| easy | Captain Bramble | 8.56 | 1138.14 / 567.30 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 8.84 | 1158.97 / 604.99 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 8.41 | 1178.13 / 603.28 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 11.69 | 2189.41 / 283.24 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 12.63 | 2333.14 / 339.50 | 0.00 | 8.48 / 7.83 | 4.02 |
| medium | Captain Bramble | 11.99 | 2109.77 / 296.37 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 12.37 | 2170.78 / 314.39 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 10.98 | 2240.99 / 325.27 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 10.21 | 3529.09 / 199.75 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 22.40 | 3996.15 / 258.31 | 0.00 | 19.49 / 17.43 | 2.77 |
| hard | Captain Bramble | 12.60 | 3676.66 / 240.53 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 12.31 | 3587.97 / 234.46 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 12.36 | 3633.22 / 242.49 | 0.00 | 0.00 / 0.00 | 0.00 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but delay distribution is identical across heroes and difficulties; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --casting=opportunity --report=balance-tier-1`.
