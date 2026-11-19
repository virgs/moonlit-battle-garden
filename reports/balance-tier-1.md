# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a shared 300–700ms random delay (identical across difficulties), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep useful/urgent selected column, theft enemy charge, armor unarmored enemy mole, mark unmarked enemy mole, tending unextended own mole near escape. No refresh of an active Sweep. Visibility 200ms; urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell powers unchanged.

Generated 2026-11-19T17:52:41.287Z. Revision 9db9287 + working changes; config 1d17944a872d; simulation 532151b7837d8722; base seed 20261119. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Versus matrices by AI level

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩82.0% | 🟩75.5% | 🟩86.5% | 🟩87.0% |
| Andromoss | 🟥18.0% | — | 🟥31.5% | 🟨49.5% | 🟨50.5% |
| Captain Bramble | 🟥24.5% | 🟩68.5% | — | 🟩67.0% | 🟩61.5% |
| Duskmantle | 🟥13.5% | 🟨50.5% | 🟥33.0% | — | 🟨48.0% |
| Sprig | 🟥13.0% | 🟨49.5% | 🟥38.5% | 🟨52.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩63.5% | 🟩62.5% | 🟩77.5% | 🟩81.5% |
| Andromoss | 🟥36.5% | — | 🟥36.0% | 🟨46.5% | 🟨49.5% |
| Captain Bramble | 🟥37.5% | 🟩64.0% | — | 🟩61.0% | 🟩66.0% |
| Duskmantle | 🟥22.5% | 🟨53.5% | 🟥39.0% | — | 🟨57.0% |
| Sprig | 🟥18.5% | 🟨50.5% | 🟥34.0% | 🟨43.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩63.5% | 🟩83.0% | 🟩88.0% | 🟩91.0% |
| Andromoss | 🟥36.5% | — | 🟨51.0% | 🟨51.5% | 🟨52.5% |
| Captain Bramble | 🟥17.0% | 🟨49.0% | — | 🟨50.5% | 🟨56.5% |
| Duskmantle | 🟥12.0% | 🟨48.5% | 🟨49.5% | — | 🟨57.5% |
| Sprig | 🟥9.0% | 🟨47.5% | 🟨43.5% | 🟨42.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 63 left-side wins | 0 | 56.9 | 152.3 | 2045/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 164 / 36 | 0 | 48.4 | 134.3 | 1279/0/0/0 · 1124/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 151 / 49 | 0 | 52.8 | 142.3 | 1771/0/0/0 · 1851/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 173 / 27 | 0 | 50.0 | 132.8 | 1632/0/0/0 · 1694/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 174 / 26 | 0 | 52.3 | 135.2 | 1719/0/0/0 · 1774/0/0/0 |
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
| medium | Sir Champignon / Sir Champignon | 100 | 54 left-side wins | 0 | 77.0 | 200.7 | 3111/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 127 / 73 | 0 | 70.1 | 175.1 | 1371/0/0/0 · 2579/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 125 / 75 | 0 | 72.9 | 184.4 | 2919/0/0/0 · 2932/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 155 / 45 | 0 | 67.7 | 177.4 | 2688/0/0/0 · 2735/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 163 / 37 | 0 | 72.2 | 174.6 | 2819/0/0/0 · 2577/0/0/0 |
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
| hard | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 90.1 | 230.2 | 3148/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 127 / 73 | 0 | 86.8 | 261.6 | 669/0/0/0 · 4763/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 166 / 34 | 0 | 80.8 | 222.8 | 2729/0/0/0 · 2731/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 176 / 24 | 0 | 82.0 | 200.9 | 2473/0/0/0 · 2593/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 182 / 18 | 0 | 78.5 | 182.1 | 2271/0/0/0 · 2584/0/0/0 |
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
| easy | Sir Champignon | 662/800 (82.8%) | 0 | 8446/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 299/800 (37.4%) | 0 | 5960/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 443/800 (55.4%) | 0 | 9619/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 290/800 (36.3%) | 0 | 9518/0/0/0 | 2, 3, 4 |
| easy | Sprig | 306/800 (38.3%) | 0 | 9169/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 570/800 (71.3%) | 0 | 12908/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 337/800 (42.1%) | 0 | 12122/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 457/800 (57.1%) | 0 | 13845/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 344/800 (43.0%) | 0 | 13446/0/0/0 | 2, 3, 4 |
| medium | Sprig | 292/800 (36.5%) | 0 | 12069/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 651/800 (81.4%) | 0 | 11290/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 383/800 (47.9%) | 0 | 20725/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 346/800 (43.3%) | 0 | 14428/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 335/800 (41.9%) | 0 | 13863/0/0/0 | 2, 3, 4 |
| hard | Sprig | 285/800 (35.6%) | 0 | 13536/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 8.00 | 1178.12 / 505.37 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 6.19 | 1269.60 / 669.87 | 0.00 | 2.68 / 2.44 | 3.44 |
| easy | Captain Bramble | 9.44 | 1259.79 / 657.85 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 9.33 | 1231.29 / 646.00 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 8.91 | 1246.12 / 639.79 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 12.25 | 2302.31 / 296.94 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 13.13 | 2457.69 / 355.93 | 0.00 | 8.69 / 8.01 | 4.32 |
| medium | Captain Bramble | 13.56 | 2389.47 / 342.03 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 12.93 | 2271.24 / 323.98 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 11.75 | 2403.57 / 344.24 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 10.18 | 3580.08 / 188.43 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 22.77 | 4067.78 / 261.40 | 0.00 | 19.88 / 17.86 | 2.74 |
| hard | Captain Bramble | 13.40 | 3866.93 / 254.79 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 12.99 | 3718.53 / 239.72 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 12.86 | 3758.89 / 249.46 | 0.00 | 0.00 / 0.00 | 0.00 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but delay distribution is identical across heroes and difficulties; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --casting=opportunity --report=balance-tier-1`.
