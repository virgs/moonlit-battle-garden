# Five-character roster diagnostic

Normal four-slot meter and character-aware casting strategy.

Generated 2026-11-21T03:58:54.662Z. Revision e9faf67 + working changes; config 26bdb9b0a7e5; simulation f5fce78d977f08ab; base seed 20261118. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩71.3%* | 🟨55.0% | 🟩74.3% | 🟩73.3%* |
| Andromoss | 🟥28.7%* | — | 🟥34.5%* | 🟨49.7%* | 🟨51.7%* |
| Captain Bramble | 🟨45.0% | 🟩65.5%* | — | 🟩67.8% | 🟩67.5%* |
| Duskmantle | 🟥25.7% | 🟨50.3%* | 🟥32.2% | — | 🟨50.2%* |
| Sprig | 🟥26.7%* | 🟨48.3%* | 🟥32.5%* | 🟨49.8%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨56.5% | 🟨51.5% | 🟩66.0% | 🟩63.5% |
| Andromoss | 🟨43.5% | — | 🟨41.0% | 🟨53.5% | 🟨53.0% |
| Captain Bramble | 🟨48.5% | 🟨59.0% | — | 🟩61.5% | 🟨56.0% |
| Duskmantle | 🟥34.0% | 🟨46.5% | 🟥38.5% | — | 🟨45.0% |
| Sprig | 🟥36.5% | 🟨47.0% | 🟨44.0% | 🟨55.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩72.0% | 🟨56.5% | 🟩75.5% | 🟩71.0% |
| Andromoss | 🟥28.0% | — | 🟨43.0% | 🟨51.5% | 🟨52.5% |
| Captain Bramble | 🟨43.5% | 🟨57.0% | — | 🟩71.0% | 🟩67.0% |
| Duskmantle | 🟥24.5% | 🟨48.5% | 🟥29.0% | — | 🟨49.0% |
| Sprig | 🟥29.0% | 🟨47.5% | 🟥33.0% | 🟨51.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩85.5% | 🟨57.0% | 🟩81.5% | 🟩85.5% |
| Andromoss | 🟥14.5% | — | 🟥19.5% | 🟨44.0% | 🟨49.5% |
| Captain Bramble | 🟨43.0% | 🟩80.5% | — | 🟩71.0% | 🟩79.5% |
| Duskmantle | 🟥18.5% | 🟨56.0% | 🟥29.0% | — | 🟨56.5% |
| Sprig | 🟥14.5% | 🟨50.5% | 🟥20.5% | 🟨43.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 56.5%, medium 72.0%, hard 85.5%; spread 29.0 points.
- Sir Champignon vs Sprig: easy 63.5%, medium 71.0%, hard 85.5%; spread 22.0 points.
- Andromoss vs Captain Bramble: easy 41.0%, medium 43.0%, hard 19.5%; spread 23.5 points.
- Andromoss vs Duskmantle: easy 53.5%, medium 51.5%, hard 44.0%; spread 9.5 points; observed favored-side flip.
- Andromoss vs Sprig: easy 53.0%, medium 52.5%, hard 49.5%; spread 3.5 points; observed favored-side flip.
- Captain Bramble vs Sprig: easy 56.0%, medium 67.0%, hard 79.5%; spread 23.5 points.
- Duskmantle vs Sprig: easy 45.0%, medium 49.0%, hard 56.5%; spread 11.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 56.5 | 156.8 | 1252/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 113 / 87 | 0 | 48.9 | 148.7 | 1152/0/0/0 · 300/104/34/47 |
| easy | Sir Champignon / Captain Bramble | 200 | 103 / 97 | 0 | 51.4 | 158.4 | 1248/1/0/0 · 557/68/69/15 |
| easy | Sir Champignon / Duskmantle | 200 | 132 / 68 | 0 | 46.0 | 137.6 | 1222/0/0/0 · 296/104/57/29 |
| easy | Sir Champignon / Sprig | 200 | 127 / 73 | 0 | 49.0 | 155.6 | 1255/0/0/0 · 304/119/61/23 |
| easy | Andromoss / Andromoss | 100 | 57 left-side wins | 0 | 47.1 | 139.1 | 305/113/77/17 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 82 / 118 | 0 | 48.1 | 150.6 | 325/123/77/25 · 528/88/46/12 |
| easy | Andromoss / Duskmantle | 200 | 107 / 93 | 0 | 47.5 | 140.5 | 309/118/91/28 · 313/98/31/16 |
| easy | Andromoss / Sprig | 200 | 106 / 94 | 0 | 47.1 | 146.8 | 301/129/99/27 · 291/100/47/8 |
| easy | Captain Bramble / Captain Bramble | 100 | 58 left-side wins | 0 | 52.9 | 206.9 | 547/91/74/26 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 123 / 77 | 0 | 47.3 | 137.7 | 490/74/81/19 · 294/103/48/24 |
| easy | Captain Bramble / Sprig | 200 | 112 / 88 | 0 | 47.5 | 149.9 | 538/84/71/22 · 319/129/58/21 |
| easy | Duskmantle / Duskmantle | 100 | 53 left-side wins | 0 | 50.7 | 157.9 | 311/86/55/37 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 90 / 110 | 0 | 45.7 | 143.8 | 292/93/52/29 · 320/107/65/20 |
| easy | Sprig / Sprig | 100 | 57 left-side wins | 0 | 47.6 | 132.9 | 298/106/57/22 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 57 left-side wins | 0 | 77.0 | 190.7 | 2044/122/27/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 144 / 56 | 0 | 58.0 | 151.4 | 1835/64/7/0 · 196/205/134/205 |
| medium | Sir Champignon / Captain Bramble | 200 | 113 / 87 | 0 | 67.0 | 169.3 | 2083/103/17/0 · 478/202/228/139 |
| medium | Sir Champignon / Duskmantle | 200 | 151 / 49 | 0 | 60.6 | 137.3 | 1848/97/17/0 · 199/195/128/171 |
| medium | Sir Champignon / Sprig | 200 | 142 / 58 | 0 | 59.9 | 146.8 | 1862/92/16/0 · 180/190/141/149 |
| medium | Andromoss / Andromoss | 100 | 54 left-side wins | 0 | 55.1 | 140.1 | 162/224/260/68 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 86 / 114 | 0 | 57.6 | 148.4 | 206/246/311/167 · 451/158/111/52 |
| medium | Andromoss / Duskmantle | 200 | 103 / 97 | 0 | 52.5 | 144.6 | 194/261/335/144 · 160/155/102/74 |
| medium | Andromoss / Sprig | 200 | 105 / 95 | 0 | 57.1 | 144.3 | 207/265/367/144 · 167/160/128/42 |
| medium | Captain Bramble / Captain Bramble | 100 | 51 left-side wins | 0 | 67.3 | 158.9 | 518/201/210/147 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 142 / 58 | 0 | 55.5 | 142.3 | 398/186/187/123 · 190/188/152/175 |
| medium | Captain Bramble / Sprig | 200 | 134 / 66 | 0 | 56.5 | 139.5 | 403/192/187/125 · 209/195/180/147 |
| medium | Duskmantle / Duskmantle | 100 | 50 left-side wins | 0 | 52.1 | 133.2 | 185/182/133/164 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 98 / 102 | 0 | 52.4 | 144.7 | 200/179/140/175 · 187/196/191/134 |
| medium | Sprig / Sprig | 100 | 52 left-side wins | 0 | 54.1 | 151.8 | 217/213/137/182 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 54 left-side wins | 0 | 99.7 | 270.8 | 2407/387/349/38 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 171 / 29 | 0 | 80.2 | 207.2 | 2123/189/159/3 · 330/418/477/384 |
| hard | Sir Champignon / Captain Bramble | 200 | 114 / 86 | 0 | 91.6 | 241.8 | 2466/386/287/26 · 652/417/400/346 |
| hard | Sir Champignon / Duskmantle | 200 | 163 / 37 | 0 | 82.0 | 201.3 | 2028/367/265/25 · 324/313/272/415 |
| hard | Sir Champignon / Sprig | 200 | 171 / 29 | 0 | 80.3 | 190.9 | 1741/312/295/22 · 310/289/258/365 |
| hard | Andromoss / Andromoss | 100 | 55 left-side wins | 0 | 78.3 | 207.9 | 243/403/565/154 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 39 / 161 | 0 | 81.5 | 218.7 | 344/428/761/342 · 495/253/211/146 |
| hard | Andromoss / Duskmantle | 200 | 88 / 112 | 0 | 77.0 | 209.6 | 317/492/824/323 · 218/221/166/231 |
| hard | Andromoss / Sprig | 200 | 99 / 101 | 0 | 77.7 | 204.4 | 300/430/831/299 · 233/224/274/109 |
| hard | Captain Bramble / Captain Bramble | 100 | 45 left-side wins | 0 | 80.8 | 216.5 | 563/361/413/351 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 142 / 58 | 0 | 77.7 | 193.3 | 440/341/342/307 · 317/290/270/407 |
| hard | Captain Bramble / Sprig | 200 | 159 / 41 | 0 | 77.5 | 199.8 | 464/366/334/325 · 301/319/388/322 |
| hard | Duskmantle / Duskmantle | 100 | 57 left-side wins | 0 | 74.8 | 195.0 | 308/299/267/404 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 113 / 87 | 0 | 74.0 | 201.5 | 288/333/253/394 · 337/338/420/272 |
| hard | Sprig / Sprig | 100 | 52 left-side wins | 0 | 76.3 | 185.4 | 312/307/242/411 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 475/800 (59.4%) | 0 | 6129/1/0/0 | 3, 4 |
| easy | Andromoss | 382/800 (47.8%) | 0 | 1540/587/378/144 | none |
| easy | Captain Bramble | 450/800 (56.3%) | 0 | 2660/405/341/94 | none |
| easy | Duskmantle | 328/800 (41.0%) | 0 | 1506/484/243/135 | none |
| easy | Sprig | 365/800 (45.6%) | 0 | 1532/561/288/94 | none |
| medium | Sir Champignon | 550/800 (68.8%) | 0 | 9672/478/84/0 | 4 |
| medium | Andromoss | 350/800 (43.8%) | 0 | 965/1201/1407/728 | none |
| medium | Captain Bramble | 477/800 (59.6%) | 0 | 2248/939/923/586 | none |
| medium | Duskmantle | 302/800 (37.8%) | 0 | 934/899/655/759 | none |
| medium | Sprig | 321/800 (40.1%) | 0 | 960/954/777/654 | none |
| hard | Sir Champignon | 619/800 (77.4%) | 0 | 10765/1641/1355/114 | none |
| hard | Andromoss | 255/800 (31.9%) | 0 | 1534/2171/3458/1502 | none |
| hard | Captain Bramble | 548/800 (68.5%) | 0 | 2614/1738/1700/1475 | none |
| hard | Duskmantle | 320/800 (40.0%) | 0 | 1455/1456/1228/1851 | none |
| hard | Sprig | 258/800 (32.3%) | 0 | 1493/1477/1582/1479 | none |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 6.10 | 771.49 / 1607.66 | 98.38 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 2.67 | 783.48 / 1691.24 | 0.00 | 0.67 / 0.67 | 0.00 |
| easy | Captain Bramble | 3.45 | 796.88 / 1714.19 | 55.44 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 2.35 | 773.96 / 1597.45 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 2.49 | 794.79 / 1699.12 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 10.05 | 1580.13 / 348.65 | 150.89 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 4.48 | 1599.94 / 475.59 | 0.00 | 2.79 / 2.79 | 0.00 |
| medium | Captain Bramble | 4.53 | 1628.86 / 449.81 | 64.87 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 3.23 | 1586.01 / 470.99 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 3.25 | 1614.97 / 473.15 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 13.37 | 3214.10 / 91.72 | 199.25 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 9.13 | 3266.32 / 275.48 | 0.00 | 6.82 / 6.82 | 0.00 |
| hard | Captain Bramble | 7.30 | 3291.87 / 184.64 | 89.45 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 5.89 | 3202.36 / 267.69 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 5.95 | 3114.65 / 269.52 | 0.00 | 0.00 / 0.00 | 0.00 |

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
