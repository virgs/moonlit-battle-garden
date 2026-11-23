# Five-character roster diagnostic

Normal four-slot meter and character-aware casting strategy.

Generated 2026-11-23T20:07:12.288Z. Revision c5ec901 + working changes; config c4e11db8fbbd; simulation 57dbe178279dcb6c; base seed 20261118. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩74.5% | 🟨59.5% | 🟩79.7% | 🟩77.7%* |
| Andromoss | 🟥25.5% | — | 🟥38.2% | 🟨49.2%* | 🟨50.8% |
| Captain Bramble | 🟨40.5% | 🟩61.8% | — | 🟩70.0% | 🟩69.3% |
| Duskmantle | 🟥20.3% | 🟨50.8%* | 🟥30.0% | — | 🟨53.5% |
| Sprig | 🟥22.3%* | 🟨49.2% | 🟥30.7% | 🟨46.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩64.5% | 🟨56.0% | 🟩70.0% | 🟩64.5% |
| Andromoss | 🟥35.5% | — | 🟨42.5% | 🟨52.5% | 🟨51.5% |
| Captain Bramble | 🟨44.0% | 🟨57.5% | — | 🟩63.5% | 🟩62.5% |
| Duskmantle | 🟥30.0% | 🟨47.5% | 🟥36.5% | — | 🟨51.0% |
| Sprig | 🟥35.5% | 🟨48.5% | 🟥37.5% | 🟨49.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩76.5% | 🟨57.5% | 🟩80.5% | 🟩80.0% |
| Andromoss | 🟥23.5% | — | 🟨40.5% | 🟨52.0% | 🟨50.0% |
| Captain Bramble | 🟨42.5% | 🟨59.5% | — | 🟩71.0% | 🟩70.5% |
| Duskmantle | 🟥19.5% | 🟨48.0% | 🟥29.0% | — | 🟨52.5% |
| Sprig | 🟥20.0% | 🟨50.0% | 🟥29.5% | 🟨47.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩82.5% | 🟩65.0% | 🟩88.5% | 🟩88.5% |
| Andromoss | 🟥17.5% | — | 🟥31.5% | 🟨43.0% | 🟨51.0% |
| Captain Bramble | 🟥35.0% | 🟩68.5% | — | 🟩75.5% | 🟩75.0% |
| Duskmantle | 🟥11.5% | 🟨57.0% | 🟥24.5% | — | 🟨57.0% |
| Sprig | 🟥11.5% | 🟨49.0% | 🟥25.0% | 🟨43.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Sprig: easy 64.5%, medium 80.0%, hard 88.5%; spread 24.0 points.
- Andromoss vs Duskmantle: easy 52.5%, medium 52.0%, hard 43.0%; spread 9.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 62 left-side wins | 0 | 70.1 | 182.7 | 1229/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 129 / 71 | 0 | 64.2 | 174.1 | 1127/0/0/0 · 241/84/32/43 |
| easy | Sir Champignon / Captain Bramble | 200 | 112 / 88 | 0 | 74.3 | 213.2 | 1337/0/0/0 · 580/85/71/27 |
| easy | Sir Champignon / Duskmantle | 200 | 140 / 60 | 0 | 65.6 | 167.3 | 1137/0/0/0 · 246/82/52/42 |
| easy | Sir Champignon / Sprig | 200 | 129 / 71 | 0 | 65.2 | 173.5 | 1157/0/0/0 · 263/83/50/44 |
| easy | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 66.7 | 161.8 | 236/90/83/29 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 85 / 115 | 0 | 67.5 | 178.8 | 267/118/90/42 · 488/63/51/18 |
| easy | Andromoss / Duskmantle | 200 | 105 / 95 | 0 | 63.5 | 171.4 | 248/119/116/30 · 225/68/47/31 |
| easy | Andromoss / Sprig | 200 | 103 / 97 | 0 | 66.8 | 180.9 | 244/98/111/36 · 230/90/53/21 |
| easy | Captain Bramble / Captain Bramble | 100 | 57 left-side wins | 0 | 76.8 | 200.8 | 536/76/92/37 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 127 / 73 | 0 | 69.0 | 185.3 | 490/71/67/25 · 253/83/57/52 |
| easy | Captain Bramble / Sprig | 200 | 125 / 75 | 0 | 70.1 | 194.2 | 525/68/66/25 · 265/97/75/47 |
| easy | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 62.5 | 176.3 | 248/82/65/44 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 102 / 98 | 0 | 67.9 | 173.1 | 247/76/61/49 · 253/93/85/33 |
| easy | Sprig / Sprig | 100 | 51 left-side wins | 0 | 68.0 | 177.9 | 244/101/51/44 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 49 left-side wins | 0 | 112.1 | 280.0 | 2101/94/30/1 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 153 / 47 | 0 | 94.2 | 233.6 | 1815/31/8/0 · 165/169/136/210 |
| medium | Sir Champignon / Captain Bramble | 200 | 115 / 85 | 0 | 110.3 | 265.7 | 2152/72/20/0 · 551/149/223/158 |
| medium | Sir Champignon / Duskmantle | 200 | 161 / 39 | 0 | 94.0 | 220.1 | 1791/55/26/0 · 153/128/116/192 |
| medium | Sir Champignon / Sprig | 200 | 160 / 40 | 0 | 93.7 | 221.3 | 1790/59/21/0 · 148/149/113/183 |
| medium | Andromoss / Andromoss | 100 | 54 left-side wins | 0 | 94.1 | 229.1 | 131/172/289/80 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 81 / 119 | 0 | 102.8 | 249.8 | 178/232/386/171 · 481/103/117/67 |
| medium | Andromoss / Duskmantle | 200 | 104 / 96 | 0 | 94.8 | 238.7 | 165/213/404/155 · 129/96/78/99 |
| medium | Andromoss / Sprig | 200 | 100 / 100 | 0 | 94.7 | 234.1 | 166/237/401/147 · 123/107/129/77 |
| medium | Captain Bramble / Captain Bramble | 100 | 48 left-side wins | 0 | 113.5 | 278.4 | 605/180/214/164 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 142 / 58 | 0 | 99.5 | 246.8 | 423/137/195/157 · 165/138/122/229 |
| medium | Captain Bramble / Sprig | 200 | 141 / 59 | 0 | 100.5 | 233.8 | 444/134/176/155 · 164/153/182/174 |
| medium | Duskmantle / Duskmantle | 100 | 52 left-side wins | 0 | 89.5 | 221.9 | 149/134/114/220 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 105 / 95 | 0 | 89.8 | 226.6 | 176/149/119/199 · 170/166/196/144 |
| medium | Sprig / Sprig | 100 | 52 left-side wins | 0 | 96.2 | 234.9 | 166/143/119/217 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 54 left-side wins | 0 | 152.8 | 383.3 | 2304/231/261/21 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 165 / 35 | 0 | 117.0 | 284.6 | 1771/100/83/1 · 210/266/350/291 |
| hard | Sir Champignon / Captain Bramble | 200 | 130 / 70 | 0 | 141.8 | 370.3 | 2292/225/216/16 · 592/268/389/271 |
| hard | Sir Champignon / Duskmantle | 200 | 177 / 23 | 0 | 116.1 | 298.1 | 1647/205/205/10 · 226/203/189/314 |
| hard | Sir Champignon / Sprig | 200 | 177 / 23 | 0 | 118.2 | 271.5 | 1473/194/218/8 · 178/174/182/311 |
| hard | Andromoss / Andromoss | 100 | 53 left-side wins | 0 | 129.1 | 301.4 | 182/270/497/146 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 63 / 137 | 0 | 126.8 | 325.2 | 245/351/613/286 · 468/169/185/134 |
| hard | Andromoss / Duskmantle | 200 | 86 / 114 | 0 | 124.8 | 317.1 | 244/352/685/246 · 164/141/135/176 |
| hard | Andromoss / Sprig | 200 | 102 / 98 | 0 | 124.1 | 322.9 | 218/346/702/264 · 175/147/193/123 |
| hard | Captain Bramble / Captain Bramble | 100 | 52 left-side wins | 0 | 149.6 | 378.8 | 646/296/377/336 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 151 / 49 | 0 | 123.8 | 300.9 | 417/232/287/267 · 225/216/192/353 |
| hard | Captain Bramble / Sprig | 200 | 150 / 50 | 0 | 129.2 | 325.9 | 483/224/278/292 · 239/214/287/313 |
| hard | Duskmantle / Duskmantle | 100 | 53 left-side wins | 0 | 120.4 | 306.6 | 235/198/205/369 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 114 / 86 | 0 | 119.8 | 327.8 | 285/208/226/375 · 261/228/360/266 |
| hard | Sprig / Sprig | 100 | 58 left-side wins | 0 | 118.8 | 290.1 | 233/189/223/343 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 510/800 (63.7%) | 0 | 5987/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 364/800 (45.5%) | 0 | 1236/509/432/180 | none |
| easy | Captain Bramble | 455/800 (56.9%) | 0 | 2619/363/347/132 | none |
| easy | Duskmantle | 330/800 (41.3%) | 0 | 1219/391/282/218 | none |
| easy | Sprig | 341/800 (42.6%) | 0 | 1255/464/314/189 | none |
| medium | Sir Champignon | 589/800 (73.6%) | 0 | 9649/311/105/1 | none |
| medium | Andromoss | 332/800 (41.5%) | 0 | 805/1023/1616/763 | none |
| medium | Captain Bramble | 487/800 (60.9%) | 0 | 2504/703/925/701 | none |
| medium | Duskmantle | 298/800 (37.3%) | 0 | 772/645/549/939 | none |
| medium | Sprig | 294/800 (36.8%) | 0 | 771/718/739/795 | none |
| hard | Sir Champignon | 649/800 (81.1%) | 0 | 9487/955/983/56 | none |
| hard | Andromoss | 286/800 (35.8%) | 0 | 1099/1585/2847/1233 | none |
| hard | Captain Bramble | 508/800 (63.5%) | 0 | 2606/1189/1516/1300 | none |
| hard | Duskmantle | 300/800 (37.5%) | 0 | 1135/966/947/1587 | none |
| hard | Sprig | 257/800 (32.1%) | 0 | 1086/952/1245/1356 | none |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 5.95 | 1157.41 / 527.63 | 94.13 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 2.40 | 1175.29 / 615.04 | 0.00 | 0.76 / 0.76 | 0.00 |
| easy | Captain Bramble | 3.40 | 1237.36 / 664.91 | 53.21 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 2.09 | 1180.94 / 623.23 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 2.23 | 1207.13 / 621.90 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 9.80 | 2312.74 / 192.54 | 150.19 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 4.42 | 2388.11 / 338.51 | 0.00 | 3.19 / 3.19 | 0.00 |
| medium | Captain Bramble | 4.59 | 2490.72 / 294.09 | 67.18 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 2.86 | 2314.65 / 328.57 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 2.97 | 2325.22 / 330.80 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 10.83 | 3565.09 / 92.47 | 166.04 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 7.09 | 3739.47 / 268.19 | 0.00 | 5.45 / 5.45 | 0.00 |
| hard | Captain Bramble | 6.20 | 3960.18 / 203.06 | 81.02 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 4.54 | 3689.64 / 264.75 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 4.56 | 3679.69 / 277.39 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed benefit from the cast. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 0.00 | — | 0 / 0 | — | 0 / 0 |
| easy | Andromoss | 0.00 | — | 0 / 0 | — | 0 / 0 |
| easy | Captain Bramble | 0.00 | — | 0 / 0 | — | 0 / 0 |
| easy | Duskmantle | 0.00 | — | 0 / 0 | — | 0 / 0 |
| easy | Sprig | 0.00 | — | 0 / 0 | — | 0 / 0 |
| medium | Sir Champignon | 0.00 | — | 0 / 0 | — | 0 / 0 |
| medium | Andromoss | 0.00 | — | 0 / 0 | — | 0 / 0 |
| medium | Captain Bramble | 0.00 | — | 0 / 0 | — | 0 / 0 |
| medium | Duskmantle | 0.00 | — | 0 / 0 | — | 0 / 0 |
| medium | Sprig | 0.00 | — | 0 / 0 | — | 0 / 0 |
| hard | Sir Champignon | 0.00 | — | 0 / 0 | — | 0 / 0 |
| hard | Andromoss | 0.00 | — | 0 / 0 | — | 0 / 0 |
| hard | Captain Bramble | 0.00 | — | 0 / 0 | — | 0 / 0 |
| hard | Duskmantle | 0.00 | — | 0 / 0 | — | 0 / 0 |
| hard | Sprig | 0.00 | — | 0 / 0 | — | 0 / 0 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. The same bot priorities currently serve all heroes, with resource/ward/cleanse awareness and repeated armor strikes; Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261118 --report=slower-stars-roster`.
