# Five-character roster diagnostic

Normal four-slot meter and character-aware casting strategy.

Generated 2026-11-21T00:05:30.436Z. Revision 551e756 + working changes; config d5bd5581763d; simulation cf309d2e10bcd778; base seed 20261118. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩71.2%* | 🟨56.3% | 🟩74.0% | 🟩69.0%* |
| Andromoss | 🟥28.8%* | — | 🟥36.2% | 🟨50.0%* | 🟨48.7% |
| Captain Bramble | 🟨43.7% | 🟩63.8% | — | 🟩67.7% | 🟨60.0%* |
| Duskmantle | 🟥26.0% | 🟨50.0%* | 🟥32.3% | — | 🟨49.3%* |
| Sprig | 🟥31.0%* | 🟨51.3% | 🟨40.0%* | 🟨50.7%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨56.5% | 🟨54.0% | 🟩70.0% | 🟨54.0% |
| Andromoss | 🟨43.5% | — | 🟨42.0% | 🟨55.0% | 🟨48.0% |
| Captain Bramble | 🟨46.0% | 🟨58.0% | — | 🟩65.0% | 🟨50.0% |
| Duskmantle | 🟥30.0% | 🟨45.0% | 🟥35.0% | — | 🟨43.0% |
| Sprig | 🟨46.0% | 🟨52.0% | 🟨50.0% | 🟨57.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩72.0% | 🟩63.5% | 🟩73.5% | 🟩66.5% |
| Andromoss | 🟥28.0% | — | 🟨43.0% | 🟨50.5% | 🟨48.5% |
| Captain Bramble | 🟥36.5% | 🟨57.0% | — | 🟩63.5% | 🟨50.5% |
| Duskmantle | 🟥26.5% | 🟨49.5% | 🟥36.5% | — | 🟨44.5% |
| Sprig | 🟥33.5% | 🟨51.5% | 🟨49.5% | 🟨55.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩85.0% | 🟨51.5% | 🟩78.5% | 🟩86.5% |
| Andromoss | 🟥15.0% | — | 🟥23.5% | 🟨44.5% | 🟨49.5% |
| Captain Bramble | 🟨48.5% | 🟩76.5% | — | 🟩74.5% | 🟩79.5% |
| Duskmantle | 🟥21.5% | 🟨55.5% | 🟥25.5% | — | 🟩60.5% |
| Sprig | 🟥13.5% | 🟨50.5% | 🟥20.5% | 🟥39.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 56.5%, medium 72.0%, hard 85.0%; spread 28.5 points.
- Sir Champignon vs Sprig: easy 54.0%, medium 66.5%, hard 86.5%; spread 32.5 points.
- Andromoss vs Duskmantle: easy 55.0%, medium 50.5%, hard 44.5%; spread 10.5 points; observed favored-side flip.
- Captain Bramble vs Sprig: easy 50.0%, medium 50.5%, hard 79.5%; spread 29.5 points.
- Duskmantle vs Sprig: easy 43.0%, medium 44.5%, hard 60.5%; spread 17.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 56.5 | 156.8 | 1252/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 113 / 87 | 0 | 48.9 | 148.7 | 1152/0/0/0 · 300/104/34/47 |
| easy | Sir Champignon / Captain Bramble | 200 | 108 / 92 | 0 | 51.3 | 158.4 | 1244/1/0/0 · 564/74/68/15 |
| easy | Sir Champignon / Duskmantle | 200 | 140 / 60 | 0 | 48.4 | 146.1 | 1240/0/0/0 · 301/103/57/33 |
| easy | Sir Champignon / Sprig | 200 | 108 / 92 | 0 | 48.7 | 147.8 | 1245/0/0/0 · 311/125/56/29 |
| easy | Andromoss / Andromoss | 100 | 57 left-side wins | 0 | 47.1 | 139.1 | 305/113/77/17 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 84 / 116 | 0 | 47.1 | 150.7 | 322/121/79/24 · 531/85/46/13 |
| easy | Andromoss / Duskmantle | 200 | 110 / 90 | 0 | 46.9 | 144.2 | 298/120/81/35 · 316/97/35/17 |
| easy | Andromoss / Sprig | 200 | 96 / 104 | 0 | 46.3 | 136.7 | 300/131/89/25 · 297/101/42/9 |
| easy | Captain Bramble / Captain Bramble | 100 | 55 left-side wins | 0 | 52.1 | 210.4 | 532/91/76/25 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 130 / 70 | 0 | 49.8 | 153.6 | 518/76/83/19 · 314/111/49/25 |
| easy | Captain Bramble / Sprig | 200 | 100 / 100 | 0 | 47.5 | 153.5 | 540/83/64/24 · 305/123/62/21 |
| easy | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 48.9 | 170.0 | 328/96/53/42 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 86 / 114 | 0 | 45.8 | 137.2 | 307/93/51/25 · 315/110/69/18 |
| easy | Sprig / Sprig | 100 | 56 left-side wins | 0 | 46.0 | 133.0 | 299/104/58/24 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 55 left-side wins | 0 | 75.3 | 189.8 | 2054/117/17/8 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 144 / 56 | 0 | 57.9 | 148.8 | 1833/65/6/1 · 198/202/132/203 |
| medium | Sir Champignon / Captain Bramble | 200 | 127 / 73 | 0 | 64.3 | 164.5 | 2087/89/12/4 · 556/203/206/129 |
| medium | Sir Champignon / Duskmantle | 200 | 147 / 53 | 0 | 58.0 | 139.2 | 1802/103/11/4 · 202/188/131/174 |
| medium | Sir Champignon / Sprig | 200 | 133 / 67 | 0 | 57.9 | 145.9 | 1778/92/12/6 · 200/196/140/154 |
| medium | Andromoss / Andromoss | 100 | 54 left-side wins | 0 | 55.1 | 140.1 | 162/224/260/68 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 86 / 114 | 0 | 57.6 | 148.7 | 213/260/332/160 · 440/154/107/52 |
| medium | Andromoss / Duskmantle | 200 | 101 / 99 | 0 | 53.5 | 142.3 | 189/252/327/148 · 173/156/111/71 |
| medium | Andromoss / Sprig | 200 | 97 / 103 | 0 | 58.2 | 147.1 | 208/241/371/157 · 172/152/132/50 |
| medium | Captain Bramble / Captain Bramble | 100 | 57 left-side wins | 0 | 63.1 | 158.2 | 515/193/197/148 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 127 / 73 | 0 | 54.0 | 142.2 | 448/183/178/123 · 195/190/146/181 |
| medium | Captain Bramble / Sprig | 200 | 101 / 99 | 0 | 54.4 | 142.3 | 479/188/181/110 · 196/208/182/144 |
| medium | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 53.4 | 138.9 | 198/186/122/180 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 89 / 111 | 0 | 53.4 | 144.8 | 203/191/120/170 · 211/212/196/121 |
| medium | Sprig / Sprig | 100 | 53 left-side wins | 0 | 51.7 | 134.0 | 196/190/118/171 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 54 left-side wins | 0 | 102.3 | 279.0 | 3060/349/179/138 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 170 / 30 | 0 | 82.2 | 219.4 | 2394/163/102/31 · 337/413/457/421 |
| hard | Sir Champignon / Captain Bramble | 200 | 103 / 97 | 0 | 88.3 | 236.8 | 2581/294/162/108 · 762/334/397/338 |
| hard | Sir Champignon / Duskmantle | 200 | 157 / 43 | 0 | 81.0 | 212.2 | 2226/299/163/95 · 303/314/278/410 |
| hard | Sir Champignon / Sprig | 200 | 173 / 27 | 0 | 81.5 | 203.7 | 2226/256/155/103 · 330/311/260/421 |
| hard | Andromoss / Andromoss | 100 | 55 left-side wins | 0 | 78.3 | 207.9 | 243/403/565/154 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 47 / 153 | 0 | 79.5 | 203.2 | 324/424/748/345 · 465/236/215/162 |
| hard | Andromoss / Duskmantle | 200 | 89 / 111 | 0 | 78.0 | 208.4 | 302/465/844/318 · 224/217/163/212 |
| hard | Andromoss / Sprig | 200 | 99 / 101 | 0 | 77.5 | 199.4 | 301/452/842/297 · 250/222/264/107 |
| hard | Captain Bramble / Captain Bramble | 100 | 49 left-side wins | 0 | 83.7 | 235.8 | 722/336/397/353 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 149 / 51 | 0 | 77.8 | 193.4 | 562/312/347/308 · 315/275/243/412 |
| hard | Captain Bramble / Sprig | 200 | 159 / 41 | 0 | 75.6 | 183.6 | 551/315/324/336 · 313/329/378/328 |
| hard | Duskmantle / Duskmantle | 100 | 55 left-side wins | 0 | 75.6 | 197.3 | 314/312/247/400 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 121 / 79 | 0 | 73.8 | 187.1 | 293/304/265/380 · 331/319/405/282 |
| hard | Sprig / Sprig | 100 | 48 left-side wins | 0 | 73.0 | 177.2 | 291/280/229/399 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 469/800 (58.6%) | 0 | 6133/1/0/0 | 3, 4 |
| easy | Andromoss | 377/800 (47.1%) | 0 | 1525/589/360/148 | none |
| easy | Captain Bramble | 438/800 (54.8%) | 0 | 2685/409/337/96 | none |
| easy | Duskmantle | 306/800 (38.3%) | 0 | 1566/500/245/142 | none |
| easy | Sprig | 410/800 (51.2%) | 0 | 1527/563/287/101 | none |
| medium | Sir Champignon | 551/800 (68.9%) | 0 | 9554/466/58/23 | none |
| medium | Andromoss | 340/800 (42.5%) | 0 | 970/1179/1422/736 | none |
| medium | Captain Bramble | 415/800 (51.9%) | 0 | 2438/921/869/562 | none |
| medium | Duskmantle | 314/800 (39.3%) | 0 | 971/911/630/776 | none |
| medium | Sprig | 380/800 (47.5%) | 0 | 975/958/768/640 | none |
| hard | Sir Champignon | 603/800 (75.4%) | 0 | 12487/1361/761/475 | none |
| hard | Andromoss | 265/800 (33.1%) | 0 | 1507/2157/3456/1535 | none |
| hard | Captain Bramble | 558/800 (69.8%) | 0 | 3062/1533/1680/1497 | none |
| hard | Duskmantle | 326/800 (40.8%) | 0 | 1449/1422/1196/1814 | none |
| hard | Sprig | 248/800 (31.0%) | 0 | 1515/1461/1536/1537 | none |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 6.10 | 772.24 / 1515.30 | 99.66 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 2.64 | 782.04 / 1629.47 | 0.00 | 0.62 / 0.62 | 0.00 |
| easy | Captain Bramble | 3.50 | 804.60 / 1776.72 | 51.87 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 2.42 | 780.75 / 1629.08 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 2.49 | 802.56 / 1612.24 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 9.88 | 1561.19 / 332.67 | 146.75 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 4.49 | 1604.81 / 474.63 | 0.00 | 2.81 / 2.81 | 0.00 |
| medium | Captain Bramble | 4.67 | 1628.58 / 466.51 | 50.69 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 3.25 | 1579.09 / 462.18 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 3.33 | 1610.44 / 447.56 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 14.20 | 3263.47 / 112.84 | 189.25 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 9.11 | 3279.93 / 278.60 | 0.00 | 6.83 / 6.83 | 0.00 |
| hard | Captain Bramble | 7.46 | 3230.24 / 207.61 | 61.40 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 5.76 | 3156.46 / 264.11 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 6.06 | 3149.69 / 291.85 | 0.00 | 0.00 / 0.00 | 0.00 |

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

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261118`.
