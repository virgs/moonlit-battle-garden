# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot casts on the first available simulation tick when full/cooldown-ready, irrespective of target value, enemy resources or hit-action timing. Hit behavior still follows difficulty. Spell powers unchanged.

Generated 2026-11-19T17:06:39.953Z. Revision 5d2cfcb + working changes; config 87c48ed2b980; simulation 6a914643b58dbe79; base seed 20261119. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Versus matrices by AI level

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩91.0% | 🟩76.0% | 🟩87.5% | 🟩88.5% |
| Andromoss | 🟥9.0% | — | 🟥15.0% | 🟨47.0% | 🟥36.5% |
| Captain Bramble | 🟥24.0% | 🟩85.0% | — | 🟩83.0% | 🟩73.5% |
| Duskmantle | 🟥12.5% | 🟨53.0% | 🟥17.0% | — | 🟨45.0% |
| Sprig | 🟥11.5% | 🟩63.5% | 🟥26.5% | 🟨55.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩72.5% | 🟨47.5% | 🟩67.5% | 🟩71.5% |
| Andromoss | 🟥27.5% | — | 🟥14.0% | 🟨42.5% | 🟨48.0% |
| Captain Bramble | 🟨52.5% | 🟩86.0% | — | 🟩79.5% | 🟩84.5% |
| Duskmantle | 🟥32.5% | 🟨57.5% | 🟥20.5% | — | 🟨53.5% |
| Sprig | 🟥28.5% | 🟨52.0% | 🟥15.5% | 🟨46.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟥39.5% | 🟥28.5% | 🟥35.0% | 🟥37.0% |
| Andromoss | 🟩60.5% | — | 🟥30.5% | 🟨47.5% | 🟨50.0% |
| Captain Bramble | 🟩71.5% | 🟩69.5% | — | 🟩67.0% | 🟩68.0% |
| Duskmantle | 🟩65.0% | 🟨52.5% | 🟥33.0% | — | 🟨56.5% |
| Sprig | 🟩63.0% | 🟨50.0% | 🟥32.0% | 🟨43.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 54 left-side wins | 0 | 50.5 | 148.2 | 1829/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 182 / 18 | 0 | 49.4 | 120.2 | 1524/0/0/0 · 1553/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 152 / 48 | 0 | 50.3 | 131.8 | 1712/0/0/0 · 1702/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 175 / 25 | 0 | 48.2 | 116.5 | 1484/0/0/0 · 1455/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 177 / 23 | 0 | 48.4 | 128.2 | 1586/0/0/0 · 1557/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 53 left-side wins | 0 | 53.5 | 159.0 | 2083/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 30 / 170 | 0 | 54.8 | 135.3 | 1784/0/0/0 · 1721/0/0/0 |
| easy | Andromoss / Duskmantle | 200 | 94 / 106 | 0 | 54.5 | 158.7 | 2211/0/0/0 · 2156/0/0/0 |
| easy | Andromoss / Sprig | 200 | 73 / 127 | 0 | 57.0 | 168.3 | 2177/0/0/0 · 2168/0/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 58 left-side wins | 0 | 50.5 | 136.8 | 1897/0/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 166 / 34 | 0 | 51.5 | 132.3 | 1737/0/0/0 · 1704/0/0/0 |
| easy | Captain Bramble / Sprig | 200 | 147 / 53 | 0 | 56.5 | 142.0 | 1916/0/0/0 · 1926/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 58 left-side wins | 0 | 54.8 | 154.2 | 2155/0/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 90 / 110 | 0 | 52.0 | 144.6 | 2003/0/0/0 · 2005/0/0/0 |
| easy | Sprig / Sprig | 100 | 52 left-side wins | 0 | 58.9 | 168.2 | 2119/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 61 left-side wins | 0 | 62.8 | 178.7 | 2842/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 145 / 55 | 0 | 69.7 | 170.4 | 2835/0/0/0 · 2878/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 95 / 105 | 0 | 65.3 | 178.6 | 2809/0/0/0 · 2836/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 135 / 65 | 0 | 64.3 | 167.9 | 2789/0/0/0 · 2753/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 143 / 57 | 0 | 63.5 | 177.3 | 2751/0/0/0 · 2737/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 57 left-side wins | 0 | 71.8 | 194.8 | 3195/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 28 / 172 | 0 | 63.7 | 173.1 | 2822/0/0/0 · 2752/0/0/0 |
| medium | Andromoss / Duskmantle | 200 | 85 / 115 | 0 | 72.5 | 200.0 | 3287/0/0/0 · 3219/0/0/0 |
| medium | Andromoss / Sprig | 200 | 96 / 104 | 0 | 75.3 | 200.0 | 3285/0/0/0 · 3191/0/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 52 left-side wins | 0 | 63.4 | 194.7 | 2994/0/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 159 / 41 | 0 | 68.5 | 173.1 | 2703/0/0/0 · 2711/0/0/0 |
| medium | Captain Bramble / Sprig | 200 | 169 / 31 | 0 | 61.2 | 167.7 | 2735/0/0/0 · 2682/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 56 left-side wins | 0 | 72.5 | 194.8 | 3159/0/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 107 / 93 | 0 | 69.0 | 200.0 | 3207/0/0/0 · 3221/0/0/0 |
| medium | Sprig / Sprig | 100 | 44 left-side wins | 0 | 75.9 | 200.7 | 3254/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 62 left-side wins | 0 | 89.0 | 222.9 | 4033/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 79 / 121 | 0 | 91.5 | 246.3 | 4219/0/0/0 · 4289/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 57 / 143 | 0 | 92.5 | 243.8 | 4162/0/0/0 · 4133/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 70 / 130 | 0 | 87.9 | 248.8 | 4242/0/0/0 · 4245/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 74 / 126 | 0 | 90.0 | 251.4 | 4402/0/0/0 · 4404/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 95.8 | 288.0 | 4796/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 61 / 139 | 0 | 93.3 | 259.4 | 4410/0/0/0 · 4325/0/0/0 |
| hard | Andromoss / Duskmantle | 200 | 95 / 105 | 0 | 95.1 | 270.6 | 4824/0/0/0 · 4685/0/0/0 |
| hard | Andromoss / Sprig | 200 | 100 / 100 | 0 | 97.5 | 285.2 | 4980/0/0/0 · 4869/0/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 52 left-side wins | 0 | 99.5 | 291.7 | 4798/0/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 134 / 66 | 0 | 92.6 | 249.7 | 4228/0/0/0 · 4220/0/0/0 |
| hard | Captain Bramble / Sprig | 200 | 136 / 64 | 0 | 93.0 | 262.4 | 4407/0/0/0 · 4435/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 56 left-side wins | 0 | 102.5 | 286.3 | 4777/0/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 113 / 87 | 0 | 96.0 | 268.1 | 4976/0/0/0 · 4997/0/0/0 |
| hard | Sprig / Sprig | 100 | 55 left-side wins | 0 | 95.1 | 290.8 | 4892/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 686/800 (85.8%) | 0 | 8135/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 215/800 (26.9%) | 0 | 9808/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 531/800 (66.4%) | 0 | 8973/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 255/800 (31.9%) | 0 | 9473/0/0/0 | 2, 3, 4 |
| easy | Sprig | 313/800 (39.1%) | 0 | 9775/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 518/800 (64.8%) | 0 | 14026/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 264/800 (33.0%) | 0 | 15467/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 605/800 (75.6%) | 0 | 14020/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 328/800 (41.0%) | 0 | 15049/0/0/0 | 2, 3, 4 |
| medium | Sprig | 285/800 (35.6%) | 0 | 15085/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 280/800 (35.0%) | 0 | 21058/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 377/800 (47.1%) | 0 | 23299/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 552/800 (69.0%) | 0 | 21891/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 414/800 (51.7%) | 0 | 22903/0/0/0 | 2, 3, 4 |
| hard | Sprig | 377/800 (47.1%) | 0 | 23597/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 7.88 | 1068.67 / 423.41 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 9.66 | 1173.01 / 624.39 | 0.00 | 0.11 / 0.11 | 9.47 |
| easy | Captain Bramble | 8.85 | 1108.07 / 549.64 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 9.15 | 1129.31 / 586.62 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 9.57 | 1177.58 / 594.14 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 13.98 | 2155.95 / 314.73 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 15.34 | 2257.71 / 338.40 | 0.00 | 0.17 / 0.17 | 15.08 |
| medium | Captain Bramble | 13.78 | 2050.31 / 286.29 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 14.86 | 2221.54 / 324.95 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 14.79 | 2206.79 / 318.95 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 21.28 | 3543.97 / 331.08 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 23.13 | 3771.54 / 253.12 | 0.00 | 0.28 / 0.28 | 22.70 |
| hard | Captain Bramble | 21.37 | 3512.34 / 227.66 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 22.66 | 3749.03 / 248.09 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 23.38 | 3866.64 / 258.25 | 0.00 | 0.00 / 0.00 | 0.00 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting is uniform and intentionally ignores spell usefulness/resources; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --report=balance-tier-1`.
