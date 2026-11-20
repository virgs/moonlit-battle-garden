# Five-character roster diagnostic

Normal four-slot meter and character-aware casting strategy.

Generated 2026-11-20T23:42:02.581Z. Revision 39fce99 + working changes; config 11554567b230; simulation 629810c0772b8b08; base seed 20261119. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩70.0%* | 🟨56.7% | 🟩74.0% | 🟩69.3%* |
| Andromoss | 🟥30.0%* | — | 🟥39.0% | 🟨50.3%* | 🟨48.5%* |
| Captain Bramble | 🟨43.3% | 🟩61.0% | — | 🟩67.5% | 🟨59.8%* |
| Duskmantle | 🟥26.0% | 🟨49.7%* | 🟥32.5% | — | 🟨49.5%* |
| Sprig | 🟥30.7%* | 🟨51.5%* | 🟨40.2%* | 🟨50.5%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨58.0% | 🟨54.5% | 🟩70.0% | 🟨54.5% |
| Andromoss | 🟨42.0% | — | 🟨44.0% | 🟨56.0% | 🟨45.0% |
| Captain Bramble | 🟨45.5% | 🟨56.0% | — | 🟩65.0% | 🟨50.0% |
| Duskmantle | 🟥30.0% | 🟨44.0% | 🟥35.0% | — | 🟨43.0% |
| Sprig | 🟨45.5% | 🟨55.0% | 🟨50.0% | 🟨57.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩70.0% | 🟩63.5% | 🟩73.5% | 🟩67.0% |
| Andromoss | 🟥30.0% | — | 🟨44.0% | 🟨54.5% | 🟨51.0% |
| Captain Bramble | 🟥36.5% | 🟨56.0% | — | 🟩63.5% | 🟨50.5% |
| Duskmantle | 🟥26.5% | 🟨45.5% | 🟥36.5% | — | 🟨45.0% |
| Sprig | 🟥33.0% | 🟨49.0% | 🟨49.5% | 🟨55.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩82.0% | 🟨52.0% | 🟩78.5% | 🟩86.5% |
| Andromoss | 🟥18.0% | — | 🟥29.0% | 🟨40.5% | 🟨49.5% |
| Captain Bramble | 🟨48.0% | 🟩71.0% | — | 🟩74.0% | 🟩79.0% |
| Duskmantle | 🟥21.5% | 🟨59.5% | 🟥26.0% | — | 🟩60.5% |
| Sprig | 🟥13.5% | 🟨50.5% | 🟥21.0% | 🟥39.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 58.0%, medium 70.0%, hard 82.0%; spread 24.0 points.
- Sir Champignon vs Sprig: easy 54.5%, medium 67.0%, hard 86.5%; spread 32.0 points.
- Andromoss vs Duskmantle: easy 56.0%, medium 54.5%, hard 40.5%; spread 15.5 points; observed favored-side flip.
- Andromoss vs Sprig: easy 45.0%, medium 51.0%, hard 49.5%; spread 6.0 points; observed favored-side flip.
- Captain Bramble vs Sprig: easy 50.0%, medium 50.5%, hard 79.0%; spread 29.0 points.
- Duskmantle vs Sprig: easy 43.0%, medium 45.0%, hard 60.5%; spread 17.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 59 left-side wins | 0 | 56.3 | 156.8 | 1253/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 116 / 84 | 0 | 46.6 | 145.8 | 1220/0/0/0 · 293/99/22/46 |
| easy | Sir Champignon / Captain Bramble | 200 | 109 / 91 | 0 | 51.3 | 157.7 | 1244/1/0/0 · 565/75/69/14 |
| easy | Sir Champignon / Duskmantle | 200 | 140 / 60 | 0 | 47.8 | 144.6 | 1240/0/0/0 · 300/106/56/33 |
| easy | Sir Champignon / Sprig | 200 | 109 / 91 | 0 | 48.8 | 148.4 | 1254/0/0/0 · 309/126/56/29 |
| easy | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 45.5 | 137.4 | 306/122/66/12 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 88 / 112 | 0 | 48.5 | 149.8 | 306/124/79/22 · 531/81/50/12 |
| easy | Andromoss / Duskmantle | 200 | 112 / 88 | 0 | 47.5 | 144.4 | 313/124/73/27 · 309/98/39/13 |
| easy | Andromoss / Sprig | 200 | 90 / 110 | 0 | 46.5 | 149.9 | 298/131/100/20 · 286/103/64/11 |
| easy | Captain Bramble / Captain Bramble | 100 | 54 left-side wins | 0 | 52.3 | 210.4 | 530/92/75/25 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 130 / 70 | 0 | 49.8 | 153.6 | 520/78/82/19 · 315/114/48/25 |
| easy | Captain Bramble / Sprig | 200 | 100 / 100 | 0 | 47.5 | 153.7 | 539/86/65/24 · 303/124/63/21 |
| easy | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 48.4 | 170.0 | 327/99/52/42 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 86 / 114 | 0 | 45.8 | 137.2 | 306/98/51/25 · 313/111/68/18 |
| easy | Sprig / Sprig | 100 | 55 left-side wins | 0 | 45.5 | 133.0 | 297/106/57/24 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 55 left-side wins | 0 | 75.3 | 189.8 | 2065/116/17/8 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 140 / 60 | 0 | 59.1 | 153.2 | 1837/57/5/2 · 204/213/143/201 |
| medium | Sir Champignon / Captain Bramble | 200 | 127 / 73 | 0 | 63.5 | 164.5 | 2074/88/12/4 · 555/204/207/126 |
| medium | Sir Champignon / Duskmantle | 200 | 147 / 53 | 0 | 57.8 | 139.2 | 1800/102/11/4 · 200/191/132/172 |
| medium | Sir Champignon / Sprig | 200 | 134 / 66 | 0 | 57.9 | 147.6 | 1791/91/12/6 · 198/201/143/155 |
| medium | Andromoss / Andromoss | 100 | 53 left-side wins | 0 | 51.3 | 138.8 | 157/213/263/69 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 88 / 112 | 0 | 56.9 | 152.1 | 208/258/304/184 · 428/161/125/57 |
| medium | Andromoss / Duskmantle | 200 | 109 / 91 | 0 | 59.5 | 146.8 | 195/239/371/158 · 144/160/110/79 |
| medium | Andromoss / Sprig | 200 | 102 / 98 | 0 | 58.6 | 146.6 | 206/236/372/156 · 160/165/134/49 |
| medium | Captain Bramble / Captain Bramble | 100 | 57 left-side wins | 0 | 62.5 | 158.2 | 515/191/197/146 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 127 / 73 | 0 | 54.0 | 143.4 | 448/184/181/122 · 192/192/148/181 |
| medium | Captain Bramble / Sprig | 200 | 101 / 99 | 0 | 54.5 | 144.5 | 478/189/182/112 · 194/211/185/143 |
| medium | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 53.4 | 138.9 | 195/186/123/183 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 90 / 110 | 0 | 53.5 | 145.6 | 200/194/121/170 · 209/212/201/120 |
| medium | Sprig / Sprig | 100 | 53 left-side wins | 0 | 51.6 | 134.3 | 193/189/121/172 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 55 left-side wins | 0 | 102.1 | 279.0 | 3058/351/179/140 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 164 / 36 | 0 | 79.3 | 205.3 | 2127/173/87/36 · 273/370/394/412 |
| hard | Sir Champignon / Captain Bramble | 200 | 104 / 96 | 0 | 88.3 | 240.8 | 2580/293/161/110 · 766/334/399/335 |
| hard | Sir Champignon / Duskmantle | 200 | 157 / 43 | 0 | 81.0 | 212.2 | 2223/296/162/96 · 301/316/280/408 |
| hard | Sir Champignon / Sprig | 200 | 173 / 27 | 0 | 81.3 | 203.7 | 2229/252/154/103 · 322/308/263/419 |
| hard | Andromoss / Andromoss | 100 | 53 left-side wins | 0 | 77.0 | 194.9 | 243/373/576/158 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 58 / 142 | 0 | 80.0 | 203.2 | 313/427/766/335 · 517/223/182/155 |
| hard | Andromoss / Duskmantle | 200 | 81 / 119 | 0 | 74.2 | 207.2 | 297/440/774/320 · 229/228/162/195 |
| hard | Andromoss / Sprig | 200 | 99 / 101 | 0 | 77.0 | 200.4 | 289/476/837/310 · 224/239/284/98 |
| hard | Captain Bramble / Captain Bramble | 100 | 50 left-side wins | 0 | 83.7 | 235.8 | 724/339/399/351 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 148 / 52 | 0 | 77.8 | 193.0 | 566/312/350/304 · 312/277/244/409 |
| hard | Captain Bramble / Sprig | 200 | 158 / 42 | 0 | 75.7 | 183.6 | 548/315/328/335 · 309/328/378/330 |
| hard | Duskmantle / Duskmantle | 100 | 55 left-side wins | 0 | 75.6 | 194.9 | 308/310/249/398 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 121 / 79 | 0 | 73.8 | 184.2 | 288/302/268/376 · 329/318/405/280 |
| hard | Sprig / Sprig | 100 | 49 left-side wins | 0 | 73.0 | 177.2 | 289/281/231/400 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 474/800 (59.3%) | 0 | 6211/1/0/0 | 3, 4 |
| easy | Andromoss | 374/800 (46.8%) | 0 | 1516/600/340/127 | none |
| easy | Captain Bramble | 433/800 (54.1%) | 0 | 2685/412/341/94 | none |
| easy | Duskmantle | 304/800 (38.0%) | 0 | 1557/515/246/138 | none |
| easy | Sprig | 415/800 (51.9%) | 0 | 1508/570/308/103 | none |
| medium | Sir Champignon | 548/800 (68.5%) | 0 | 9567/454/57/24 | none |
| medium | Andromoss | 359/800 (44.9%) | 0 | 970/1159/1453/768 | none |
| medium | Captain Bramble | 413/800 (51.6%) | 0 | 2424/929/892/563 | none |
| medium | Duskmantle | 307/800 (38.4%) | 0 | 931/923/634/785 | none |
| medium | Sprig | 373/800 (46.6%) | 0 | 954/978/784/639 | none |
| hard | Sir Champignon | 598/800 (74.8%) | 0 | 12217/1365/743/485 | none |
| hard | Andromoss | 274/800 (34.3%) | 0 | 1415/2086/3347/1535 | none |
| hard | Captain Bramble | 544/800 (68.0%) | 0 | 3121/1523/1658/1480 | none |
| hard | Duskmantle | 335/800 (41.9%) | 0 | 1438/1433/1203/1786 | none |
| hard | Sprig | 249/800 (31.1%) | 0 | 1473/1474/1561/1527 | none |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 6.20 | 771.09 / 1508.24 | 100.98 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 2.60 | 782.39 / 1638.57 | 0.00 | 0.60 / 0.60 | 0.00 |
| easy | Captain Bramble | 3.51 | 803.39 / 1775.20 | 52.02 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 2.42 | 779.16 / 1679.40 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 2.51 | 809.61 / 1614.96 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 9.87 | 1563.84 / 338.31 | 146.94 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 4.56 | 1632.69 / 499.20 | 0.00 | 2.93 / 2.93 | 0.00 |
| medium | Captain Bramble | 4.70 | 1633.89 / 468.52 | 50.89 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 3.23 | 1596.09 / 482.76 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 3.35 | 1616.69 / 450.21 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 13.85 | 3188.34 / 109.27 | 184.17 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 8.79 | 3163.29 / 264.59 | 0.00 | 6.67 / 6.67 | 0.00 |
| hard | Captain Bramble | 7.46 | 3214.08 / 206.65 | 61.57 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 5.74 | 3113.59 / 259.36 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 6.04 | 3153.26 / 292.18 | 0.00 | 0.00 / 0.00 | 0.00 |

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

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119`.
