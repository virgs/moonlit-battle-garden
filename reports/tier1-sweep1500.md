# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a shared 300–700ms random delay (identical across difficulties), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep useful/urgent selected column, theft enemy charge, armor unarmored enemy mole, mark unmarked enemy mole, tending unextended own mole near escape. No refresh of an active Sweep. Visibility 200ms; urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell powers unchanged.

Generated 2026-11-19T17:51:02.623Z. Revision 9db9287 + working changes; config 8368400c88fb; simulation afb30df4868ee8eb; base seed 20261119. Tuning overrides: {"sweepIntervalMs":1500}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Versus matrices by AI level

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩82.0% | 🟨53.0% | 🟩86.5% | 🟩87.0% |
| Andromoss | 🟥18.0% | — | 🟥17.0% | 🟨49.5% | 🟨50.5% |
| Captain Bramble | 🟨47.0% | 🟩83.0% | — | 🟩80.5% | 🟩80.0% |
| Duskmantle | 🟥13.5% | 🟨50.5% | 🟥19.5% | — | 🟨48.0% |
| Sprig | 🟥13.0% | 🟨49.5% | 🟥20.0% | 🟨52.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩63.5% | 🟨42.0% | 🟩77.5% | 🟩81.5% |
| Andromoss | 🟥36.5% | — | 🟥28.0% | 🟨46.5% | 🟨49.5% |
| Captain Bramble | 🟨58.0% | 🟩72.0% | — | 🟩75.5% | 🟩82.5% |
| Duskmantle | 🟥22.5% | 🟨53.5% | 🟥24.5% | — | 🟨57.0% |
| Sprig | 🟥18.5% | 🟨50.5% | 🟥17.5% | 🟨43.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩63.5% | 🟩74.5% | 🟩88.0% | 🟩91.0% |
| Andromoss | 🟥36.5% | — | 🟨45.0% | 🟨51.5% | 🟨52.5% |
| Captain Bramble | 🟥25.5% | 🟨55.0% | — | 🟨57.5% | 🟩63.5% |
| Duskmantle | 🟥12.0% | 🟨48.5% | 🟨42.5% | — | 🟨57.5% |
| Sprig | 🟥9.0% | 🟨47.5% | 🟥36.5% | 🟨42.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 63 left-side wins | 0 | 56.9 | 152.3 | 2045/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 164 / 36 | 0 | 48.4 | 134.3 | 1279/0/0/0 · 1124/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 106 / 94 | 0 | 53.7 | 148.6 | 1891/0/0/0 · 1921/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 173 / 27 | 0 | 50.0 | 132.8 | 1632/0/0/0 · 1694/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 174 / 26 | 0 | 52.3 | 135.2 | 1719/0/0/0 · 1774/0/0/0 |
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
| medium | Sir Champignon / Sir Champignon | 100 | 54 left-side wins | 0 | 77.0 | 200.7 | 3111/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 127 / 73 | 0 | 70.1 | 175.1 | 1371/0/0/0 · 2579/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 84 / 116 | 0 | 73.9 | 197.3 | 3069/0/0/0 · 3089/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 155 / 45 | 0 | 67.7 | 177.4 | 2688/0/0/0 · 2735/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 163 / 37 | 0 | 72.2 | 174.6 | 2819/0/0/0 · 2577/0/0/0 |
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
| hard | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 90.1 | 230.2 | 3148/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 127 / 73 | 0 | 86.8 | 261.6 | 669/0/0/0 · 4763/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 149 / 51 | 0 | 84.0 | 216.8 | 2793/0/0/0 · 2759/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 176 / 24 | 0 | 82.0 | 200.9 | 2473/0/0/0 · 2593/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 182 / 18 | 0 | 78.5 | 182.1 | 2271/0/0/0 · 2584/0/0/0 |
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
| easy | Sir Champignon | 617/800 (77.1%) | 0 | 8566/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 270/800 (33.8%) | 0 | 5912/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 581/800 (72.6%) | 0 | 9028/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 263/800 (32.9%) | 0 | 9335/0/0/0 | 2, 3, 4 |
| easy | Sprig | 269/800 (33.6%) | 0 | 8995/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 529/800 (66.1%) | 0 | 13058/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 321/800 (40.1%) | 0 | 11917/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 576/800 (72.0%) | 0 | 12712/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 315/800 (39.4%) | 0 | 13124/0/0/0 | 2, 3, 4 |
| medium | Sprig | 259/800 (32.4%) | 0 | 11637/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 634/800 (79.3%) | 0 | 11354/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 371/800 (46.4%) | 0 | 20639/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 403/800 (50.4%) | 0 | 13497/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 321/800 (40.1%) | 0 | 13639/0/0/0 | 2, 3, 4 |
| hard | Sprig | 271/800 (33.9%) | 0 | 13035/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 8.15 | 1185.68 / 522.69 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 6.13 | 1230.52 / 651.97 | 0.00 | 2.67 / 2.43 | 3.39 |
| easy | Captain Bramble | 8.88 | 1182.59 / 593.97 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 9.10 | 1190.04 / 627.76 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 8.70 | 1208.69 / 622.38 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 12.43 | 2318.31 / 308.44 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 12.88 | 2385.39 / 347.58 | 0.00 | 8.59 / 7.91 | 4.16 |
| medium | Captain Bramble | 12.35 | 2162.22 / 302.12 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 12.53 | 2187.73 / 316.79 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 11.21 | 2281.67 / 331.52 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 10.26 | 3565.84 / 190.81 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 22.66 | 4041.58 / 260.99 | 0.00 | 19.75 / 17.73 | 2.77 |
| hard | Captain Bramble | 12.63 | 3634.81 / 237.32 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 12.71 | 3658.22 / 238.37 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 12.23 | 3610.31 / 241.35 | 0.00 | 0.00 / 0.00 | 0.00 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but delay distribution is identical across heroes and difficulties; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --casting=opportunity --report=tier1-sweep1500 --sweep-interval-ms=1500`.
