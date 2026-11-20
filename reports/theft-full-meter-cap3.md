# Five-character roster diagnostic

Normal four-slot meter and character-aware casting strategy.

Generated 2026-11-20T00:06:11.370Z. Revision 9854d30 + working changes; config 6aa40d7f914b; simulation b8e918b3fdef466c; base seed 20261119. Tuning overrides: {"borrowedSparkCap":3}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩77.3% | 🟩67.7%* | 🟩75.8%* | 🟩76.5% |
| Andromoss | 🟥22.7% | — | 🟥37.5% | 🟨42.8% | 🟨44.0% |
| Captain Bramble | 🟥32.3%* | 🟩62.5% | — | 🟨57.5% | 🟨57.3% |
| Duskmantle | 🟥24.2%* | 🟨57.2% | 🟨42.5% | — | 🟨49.2%* |
| Sprig | 🟥23.5% | 🟨56.0% | 🟨42.7% | 🟨50.8%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩77.5% | 🟩80.5% | 🟩85.5% | 🟩81.0% |
| Andromoss | 🟥22.5% | — | 🟨42.5% | 🟨49.5% | 🟨44.5% |
| Captain Bramble | 🟥19.5% | 🟨57.5% | — | 🟨53.5% | 🟨50.0% |
| Duskmantle | 🟥14.5% | 🟨50.5% | 🟨46.5% | — | 🟨43.5% |
| Sprig | 🟥19.0% | 🟨55.5% | 🟨50.0% | 🟨56.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩80.0% | 🟩69.0% | 🟩79.0% | 🟩72.5% |
| Andromoss | 🟥20.0% | — | 🟨40.0% | 🟨44.5% | 🟨41.5% |
| Captain Bramble | 🟥31.0% | 🟨60.0% | — | 🟨58.0% | 🟨53.0% |
| Duskmantle | 🟥21.0% | 🟨55.5% | 🟨42.0% | — | 🟨41.5% |
| Sprig | 🟥27.5% | 🟨58.5% | 🟨47.0% | 🟨58.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩74.5% | 🟨53.5% | 🟩63.0% | 🟩76.0% |
| Andromoss | 🟥25.5% | — | 🟥30.0% | 🟥34.5% | 🟨46.0% |
| Captain Bramble | 🟨46.5% | 🟩70.0% | — | 🟩61.0% | 🟩69.0% |
| Duskmantle | 🟥37.0% | 🟩65.5% | 🟥39.0% | — | 🟩62.5% |
| Sprig | 🟥24.0% | 🟨54.0% | 🟥31.0% | 🟥37.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 80.5%, medium 69.0%, hard 53.5%; spread 27.0 points.
- Sir Champignon vs Duskmantle: easy 85.5%, medium 79.0%, hard 63.0%; spread 22.5 points.
- Duskmantle vs Sprig: easy 43.5%, medium 41.5%, hard 62.5%; spread 21.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 57 left-side wins | 0 | 48.6 | 124.2 | 1045/60/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 155 / 45 | 0 | 43.9 | 106.8 | 739/59/0/0 · 230/199/51/32 |
| easy | Sir Champignon / Captain Bramble | 200 | 161 / 39 | 0 | 44.5 | 112.0 | 940/60/0/0 · 322/179/60/9 |
| easy | Sir Champignon / Duskmantle | 200 | 171 / 29 | 0 | 43.9 | 108.9 | 941/56/0/0 · 289/101/50/24 |
| easy | Sir Champignon / Sprig | 200 | 162 / 38 | 0 | 44.7 | 104.3 | 946/55/0/0 · 312/111/46/14 |
| easy | Andromoss / Andromoss | 100 | 57 left-side wins | 0 | 46.0 | 165.7 | 201/206/70/9 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 85 / 115 | 0 | 46.8 | 155.7 | 223/232/94/16 · 278/141/35/8 |
| easy | Andromoss / Duskmantle | 200 | 99 / 101 | 0 | 49.0 | 175.4 | 239/229/107/22 · 264/83/40/18 |
| easy | Andromoss / Sprig | 200 | 89 / 111 | 0 | 48.9 | 154.3 | 221/226/99/16 · 280/98/49/8 |
| easy | Captain Bramble / Captain Bramble | 100 | 54 left-side wins | 0 | 47.5 | 167.6 | 332/176/59/19 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 107 / 93 | 0 | 47.5 | 146.3 | 315/190/53/25 · 323/109/49/30 |
| easy | Captain Bramble / Sprig | 200 | 100 / 100 | 0 | 48.9 | 147.2 | 323/187/53/23 · 315/103/77/18 |
| easy | Duskmantle / Duskmantle | 100 | 51 left-side wins | 0 | 47.1 | 165.8 | 313/99/45/39 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 87 / 113 | 0 | 45.4 | 139.6 | 316/94/46/32 · 310/114/73/15 |
| easy | Sprig / Sprig | 100 | 55 left-side wins | 0 | 45.5 | 132.1 | 297/103/50/26 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 69.8 | 163.2 | 1411/387/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 160 / 40 | 0 | 55.9 | 136.7 | 1221/266/0/0 · 156/222/186/150 |
| medium | Sir Champignon / Captain Bramble | 200 | 138 / 62 | 0 | 56.5 | 146.3 | 1354/354/0/0 · 225/391/150/102 |
| medium | Sir Champignon / Duskmantle | 200 | 158 / 42 | 0 | 53.6 | 130.8 | 1285/309/1/0 · 190/176/125/127 |
| medium | Sir Champignon / Sprig | 200 | 145 / 55 | 0 | 57.1 | 143.4 | 1338/361/0/0 · 164/192/129/164 |
| medium | Andromoss / Andromoss | 100 | 59 left-side wins | 0 | 57.2 | 151.6 | 141/284/283/56 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 80 / 120 | 0 | 55.3 | 149.6 | 150/321/379/108 · 187/291/88/44 |
| medium | Andromoss / Duskmantle | 200 | 89 / 111 | 0 | 55.0 | 145.1 | 154/343/400/96 · 166/159/99/74 |
| medium | Andromoss / Sprig | 200 | 83 / 117 | 0 | 56.3 | 143.6 | 157/303/360/78 · 173/163/210/38 |
| medium | Captain Bramble / Captain Bramble | 100 | 52 left-side wins | 0 | 53.0 | 140.0 | 220/351/151/126 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 116 / 84 | 0 | 51.8 | 144.8 | 225/321/169/122 · 187/196/126/163 |
| medium | Captain Bramble / Sprig | 200 | 106 / 94 | 0 | 53.9 | 143.9 | 224/372/146/134 · 200/198/185/160 |
| medium | Duskmantle / Duskmantle | 100 | 56 left-side wins | 0 | 53.8 | 143.5 | 190/175/127/195 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 83 / 117 | 0 | 54.5 | 142.8 | 196/176/137/187 · 191/189/191/148 |
| medium | Sprig / Sprig | 100 | 54 left-side wins | 0 | 54.6 | 142.3 | 192/197/126/189 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 50 left-side wins | 0 | 84.3 | 215.3 | 1289/1200/44/54 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 149 / 51 | 0 | 76.8 | 196.2 | 1128/763/58/9 · 263/423/489/282 |
| hard | Sir Champignon / Captain Bramble | 200 | 107 / 93 | 0 | 80.3 | 200.3 | 1240/1058/52/34 · 320/575/273/292 |
| hard | Sir Champignon / Duskmantle | 200 | 126 / 74 | 0 | 79.2 | 203.4 | 1353/1026/43/35 · 279/324/263/403 |
| hard | Sir Champignon / Sprig | 200 | 152 / 48 | 0 | 77.2 | 200.4 | 1212/1116/40/48 · 320/319/270/412 |
| hard | Andromoss / Andromoss | 100 | 51 left-side wins | 0 | 78.4 | 206.2 | 218/431/609/134 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 60 / 140 | 0 | 75.5 | 191.8 | 242/566/750/215 · 255/390/158/122 |
| hard | Andromoss / Duskmantle | 200 | 69 / 131 | 0 | 76.5 | 203.8 | 263/608/796/229 · 222/226/174/181 |
| hard | Andromoss / Sprig | 200 | 92 / 108 | 0 | 76.4 | 209.8 | 272/566/754/196 · 306/241/470/84 |
| hard | Captain Bramble / Captain Bramble | 100 | 54 left-side wins | 0 | 73.5 | 185.3 | 311/537/260/270 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 122 / 78 | 0 | 76.5 | 182.3 | 313/497/291/286 · 279/292/257/378 |
| hard | Captain Bramble / Sprig | 200 | 138 / 62 | 0 | 77.2 | 201.7 | 332/509/293/331 · 329/302/380/348 |
| hard | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 75.6 | 192.5 | 303/313/265/375 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 125 / 75 | 0 | 74.1 | 193.8 | 294/309/252/397 · 316/292/434/274 |
| hard | Sprig / Sprig | 100 | 59 left-side wins | 0 | 77.2 | 193.5 | 295/301/257/434 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 649/800 (81.1%) | 0 | 4611/290/0/0 | 3, 4 |
| easy | Andromoss | 318/800 (39.8%) | 0 | 1114/1092/421/95 | none |
| easy | Captain Bramble | 361/800 (45.1%) | 0 | 1570/873/260/84 | none |
| easy | Duskmantle | 310/800 (38.8%) | 0 | 1505/486/230/143 | none |
| easy | Sprig | 362/800 (45.3%) | 0 | 1514/529/295/81 | none |
| medium | Sir Champignon | 601/800 (75.1%) | 0 | 6609/1677/1/0 | 4 |
| medium | Andromoss | 292/800 (36.5%) | 0 | 758/1473/1608/488 | none |
| medium | Captain Bramble | 404/800 (50.5%) | 0 | 1081/1726/704/528 | none |
| medium | Duskmantle | 320/800 (40.0%) | 0 | 929/882/614/746 | none |
| medium | Sprig | 383/800 (47.9%) | 0 | 920/939/841/699 | none |
| hard | Sir Champignon | 534/800 (66.8%) | 0 | 6222/5163/237/180 | none |
| hard | Andromoss | 272/800 (34.0%) | 0 | 1258/2594/3398/1056 | none |
| hard | Captain Bramble | 493/800 (61.6%) | 0 | 1531/2508/1275/1301 | none |
| hard | Duskmantle | 408/800 (51.0%) | 0 | 1377/1464/1211/1734 | none |
| hard | Sprig | 293/800 (36.6%) | 0 | 1566/1455/1811/1552 | none |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 4.75 | 780.19 / 1057.73 | 2.26 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 2.79 | 767.16 / 1681.92 | 0.00 | 1.49 / 1.49 | 0.35 |
| easy | Captain Bramble | 2.75 | 771.02 / 1645.41 | 12.70 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 2.33 | 766.60 / 1642.81 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 2.43 | 774.49 / 1535.07 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 8.11 | 1572.31 / 374.32 | 12.46 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 4.45 | 1584.03 / 496.50 | 0.00 | 2.85 / 2.85 | 0.39 |
| medium | Captain Bramble | 3.99 | 1604.76 / 464.86 | 22.95 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 3.10 | 1565.55 / 471.93 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 3.37 | 1626.02 / 456.94 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 11.52 | 3107.32 / 217.23 | 39.22 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 8.64 | 3072.76 / 257.02 | 0.00 | 5.70 / 5.70 | 0.71 |
| hard | Captain Bramble | 6.55 | 3025.47 / 220.40 | 29.47 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 5.66 | 3075.59 / 253.46 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 6.37 | 3190.39 / 293.87 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed useful after hostile warning. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

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

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --report=theft-full-meter-cap3 --theft-cap=3`.
