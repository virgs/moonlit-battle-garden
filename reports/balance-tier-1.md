# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep useful/urgent selected column, theft enemy charge, armor unarmored enemy mole, mark unmarked enemy mole, tending unextended own mole near escape. No refresh of an active Sweep. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell powers unchanged.

Generated 2026-11-19T22:47:44.919Z. Revision 0343197 + working changes; config c12db558bc66; simulation efd9ed909229ae8b; base seed 20261119. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.8% | 🟩68.8%* | 🟩73.5% | 🟩65.8% |
| Andromoss | 🟥38.2% | — | 🟨44.3% | 🟨45.0% | 🟨43.3% |
| Captain Bramble | 🟥31.2%* | 🟨55.7% | — | 🟨52.0%* | 🟨40.8% |
| Duskmantle | 🟥26.5% | 🟨55.0% | 🟨48.0%* | — | 🟨47.5%* |
| Sprig | 🟥34.2% | 🟨56.7% | 🟨59.2% | 🟨52.5%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩64.5% | 🟩78.0% | 🟩74.0% | 🟩70.0% |
| Andromoss | 🟥35.5% | — | 🟨44.0% | 🟨44.0% | 🟨48.0% |
| Captain Bramble | 🟥22.0% | 🟨56.0% | — | 🟨47.5% | 🟥37.5% |
| Duskmantle | 🟥26.0% | 🟨56.0% | 🟨52.5% | — | 🟨45.0% |
| Sprig | 🟥30.0% | 🟨52.0% | 🟩62.5% | 🟨55.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.0% | 🟩71.5% | 🟩78.5% | 🟩62.5% |
| Andromoss | 🟥39.0% | — | 🟨44.0% | 🟨46.0% | 🟨40.5% |
| Captain Bramble | 🟥28.5% | 🟨56.0% | — | 🟨52.5% | 🟥36.5% |
| Duskmantle | 🟥21.5% | 🟨54.0% | 🟨47.5% | — | 🟨41.0% |
| Sprig | 🟥37.5% | 🟨59.5% | 🟩63.5% | 🟨59.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨60.0% | 🟨57.0% | 🟩68.0% | 🟩65.0% |
| Andromoss | 🟨40.0% | — | 🟨45.0% | 🟨45.0% | 🟨41.5% |
| Captain Bramble | 🟨43.0% | 🟨55.0% | — | 🟨56.0% | 🟨48.5% |
| Duskmantle | 🟥32.0% | 🟨55.0% | 🟨44.0% | — | 🟨56.5% |
| Sprig | 🟥35.0% | 🟨58.5% | 🟨51.5% | 🟨43.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 78.0%, medium 71.5%, hard 57.0%; spread 21.0 points.
- Captain Bramble vs Duskmantle: easy 47.5%, medium 52.5%, hard 56.0%; spread 8.5 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 45.0%, medium 41.0%, hard 56.5%; spread 15.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 46.7 | 120.5 | 1127/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 129 / 71 | 0 | 46.8 | 137.1 | 480/0/0/0 · 883/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 156 / 44 | 0 | 47.5 | 140.6 | 1099/0/0/0 · 1090/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 148 / 52 | 0 | 46.3 | 128.3 | 1002/0/0/0 · 1039/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 140 / 60 | 0 | 46.0 | 129.2 | 1043/0/0/0 · 949/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 59 left-side wins | 0 | 48.0 | 153.3 | 547/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 88 / 112 | 0 | 50.1 | 144.9 | 859/0/0/0 · 574/0/0/0 |
| easy | Andromoss / Duskmantle | 200 | 88 / 112 | 0 | 48.5 | 147.4 | 834/0/0/0 · 574/0/0/0 |
| easy | Andromoss / Sprig | 200 | 96 / 104 | 0 | 50.0 | 149.3 | 992/0/0/0 · 275/0/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 61 left-side wins | 0 | 50.9 | 154.8 | 1111/0/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 95 / 105 | 0 | 49.9 | 140.4 | 1080/0/0/0 · 1085/0/0/0 |
| easy | Captain Bramble / Sprig | 200 | 75 / 125 | 0 | 51.8 | 149.0 | 1189/0/0/0 · 1073/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 47.0 | 151.0 | 1094/0/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 90 / 110 | 0 | 50.5 | 145.4 | 1155/0/0/0 · 1004/0/0/0 |
| easy | Sprig / Sprig | 100 | 56 left-side wins | 0 | 50.9 | 146.2 | 1027/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 60 left-side wins | 0 | 64.7 | 173.7 | 2181/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 122 / 78 | 0 | 57.5 | 150.9 | 822/0/0/0 · 1830/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 143 / 57 | 0 | 60.6 | 160.3 | 2114/0/0/0 · 1987/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 157 / 43 | 0 | 61.2 | 154.4 | 2050/0/0/0 · 2011/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 125 / 75 | 0 | 61.6 | 158.6 | 2118/0/0/0 · 1861/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 59.3 | 159.6 | 1154/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 88 / 112 | 0 | 59.0 | 162.8 | 1856/0/0/0 · 980/0/0/0 |
| medium | Andromoss / Duskmantle | 200 | 92 / 108 | 0 | 57.5 | 163.1 | 1794/0/0/0 · 944/0/0/0 |
| medium | Andromoss / Sprig | 200 | 81 / 119 | 0 | 59.8 | 154.3 | 2018/0/0/0 · 530/0/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 55 left-side wins | 0 | 64.8 | 182.7 | 2179/0/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 105 / 95 | 0 | 61.5 | 172.2 | 2173/0/0/0 · 2170/0/0/0 |
| medium | Captain Bramble / Sprig | 200 | 73 / 127 | 0 | 65.3 | 163.9 | 2168/0/0/0 · 1980/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 57 left-side wins | 0 | 57.3 | 159.0 | 2104/0/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 82 / 118 | 0 | 59.3 | 155.5 | 2044/0/0/0 · 1766/0/0/0 |
| medium | Sprig / Sprig | 100 | 59 left-side wins | 0 | 64.7 | 165.0 | 1982/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 51 left-side wins | 0 | 96.0 | 239.0 | 3954/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 120 / 80 | 0 | 85.4 | 235.8 | 1614/0/0/0 · 3693/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 114 / 86 | 0 | 90.5 | 227.6 | 3786/0/0/0 · 3546/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 136 / 64 | 0 | 86.0 | 242.3 | 3697/0/0/0 · 3570/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 130 / 70 | 0 | 89.7 | 239.6 | 3871/0/0/0 · 3369/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 87.5 | 220.9 | 2278/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 90 / 110 | 0 | 83.8 | 216.5 | 3560/0/0/0 · 1495/0/0/0 |
| hard | Andromoss / Duskmantle | 200 | 90 / 110 | 0 | 88.7 | 231.8 | 3728/0/0/0 · 1617/0/0/0 |
| hard | Andromoss / Sprig | 200 | 83 / 117 | 0 | 84.0 | 220.8 | 3635/0/0/0 · 1325/0/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 48 left-side wins | 0 | 90.0 | 229.6 | 3722/0/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 112 / 88 | 0 | 84.3 | 226.7 | 3505/0/0/0 · 3453/0/0/0 |
| hard | Captain Bramble / Sprig | 200 | 97 / 103 | 0 | 90.0 | 231.5 | 3815/0/0/0 · 3419/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 53 left-side wins | 0 | 86.0 | 218.3 | 3665/0/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 113 / 87 | 0 | 84.2 | 222.9 | 3729/0/0/0 · 3307/0/0/0 |
| hard | Sprig / Sprig | 100 | 50 left-side wins | 0 | 92.1 | 274.2 | 3974/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 573/800 (71.6%) | 0 | 4751/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 343/800 (42.9%) | 0 | 4115/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 326/800 (40.8%) | 0 | 5044/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 359/800 (44.9%) | 0 | 4947/0/0/0 | 2, 3, 4 |
| easy | Sprig | 399/800 (49.9%) | 0 | 4328/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 547/800 (68.4%) | 0 | 9285/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 339/800 (42.4%) | 0 | 8652/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 347/800 (43.4%) | 0 | 9487/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 328/800 (41.0%) | 0 | 9273/0/0/0 | 2, 3, 4 |
| medium | Sprig | 439/800 (54.9%) | 0 | 8119/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 500/800 (62.5%) | 0 | 16922/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 343/800 (42.9%) | 0 | 16894/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 405/800 (50.6%) | 0 | 16083/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 375/800 (46.9%) | 0 | 16034/0/0/0 | 2, 3, 4 |
| hard | Sprig | 377/800 (47.1%) | 0 | 15394/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 4.53 | 806.08 / 1392.43 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 4.46 | 782.94 / 1720.10 | 0.00 | 3.49 / 3.46 | 0.93 |
| easy | Captain Bramble | 4.92 | 773.08 / 1590.80 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 4.82 | 759.99 / 1487.16 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 4.13 | 788.67 / 1582.29 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 8.88 | 1633.30 / 406.88 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 9.37 | 1640.51 / 481.26 | 0.00 | 7.15 / 6.90 | 2.14 |
| medium | Captain Bramble | 9.13 | 1625.26 / 457.54 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 8.96 | 1580.70 / 432.48 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 7.67 | 1617.35 / 368.89 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 16.21 | 3319.16 / 266.28 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 18.27 | 3404.06 / 275.42 | 0.00 | 12.95 / 11.23 | 5.18 |
| hard | Captain Bramble | 15.45 | 3167.61 / 257.90 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 15.46 | 3191.64 / 255.37 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 14.28 | 3290.26 / 254.94 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed useful after hostile warning. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 31.08 | 85.1% | 3624 / 89 | 904 | 8768 / 0 |
| easy | Andromoss | 5.20 | 13.8% | 3568 / 22 | 903 | 0 / 0 |
| easy | Captain Bramble | 24.45 | 79.6% | 3933 / 65 | 903 | 3962 / 0 |
| easy | Duskmantle | 27.14 | 81.9% | 3853 / 80 | 902 | 6318 / 0 |
| easy | Sprig | 39.73 | 89.3% | 3301 / 115 | 902 | 11071 / 0 |
| medium | Sir Champignon | 37.17 | 75.8% | 7104 / 88 | 602 | 4454 / 441 |
| medium | Andromoss | 10.83 | 13.3% | 7498 / 12 | 605 | 585 / 538 |
| medium | Captain Bramble | 36.71 | 74.8% | 7308 / 100 | 602 | 4333 / 327 |
| medium | Duskmantle | 36.02 | 74.8% | 7169 / 92 | 601 | 4304 / 374 |
| medium | Sprig | 34.63 | 77.6% | 6137 / 76 | 601 | 3598 / 302 |
| hard | Sir Champignon | 56.79 | 71.3% | 12968 / 74 | 300 | 17083 / 4321 |
| hard | Andromoss | 20.10 | 9.0% | 14616 / 22 | 302 | 5456 / 4936 |
| hard | Captain Bramble | 60.88 | 74.5% | 12361 / 58 | 300 | 16045 / 3992 |
| hard | Duskmantle | 61.40 | 74.7% | 12369 / 68 | 300 | 16594 / 4057 |
| hard | Sprig | 43.88 | 67.3% | 11420 / 68 | 301 | 15851 / 4596 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --casting=opportunity --cast-profile=scaled --report=balance-tier-1`.
