# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep useful/urgent selected column, theft enemy charge, armor unarmored enemy mole, mark unmarked enemy mole, tending unextended own mole near escape. No refresh of an active Sweep. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell powers unchanged.

Generated 2026-11-19T23:41:19.608Z. Revision cb19384 + working changes; config 8c71b4f660e7; simulation efd9ed909229ae8b; base seed 20261119. Tuning overrides: {"markBonus":8}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.8% | 🟩68.8%* | 🟩71.0% | 🟩65.8% |
| Andromoss | 🟥38.2% | — | 🟨44.3% | 🟨41.8% | 🟨43.3% |
| Captain Bramble | 🟥31.2%* | 🟨55.7% | — | 🟨48.7%* | 🟨40.8% |
| Duskmantle | 🟥29.0% | 🟨58.2% | 🟨51.3%* | — | 🟨53.2%* |
| Sprig | 🟥34.2% | 🟨56.7% | 🟨59.2% | 🟨46.8%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩64.5% | 🟩78.0% | 🟩71.0% | 🟩70.0% |
| Andromoss | 🟥35.5% | — | 🟨44.0% | 🟨41.0% | 🟨48.0% |
| Captain Bramble | 🟥22.0% | 🟨56.0% | — | 🟨44.5% | 🟥37.5% |
| Duskmantle | 🟥29.0% | 🟨59.0% | 🟨55.5% | — | 🟨48.0% |
| Sprig | 🟥30.0% | 🟨52.0% | 🟩62.5% | 🟨52.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.0% | 🟩71.5% | 🟩74.5% | 🟩62.5% |
| Andromoss | 🟥39.0% | — | 🟨44.0% | 🟨41.5% | 🟨40.5% |
| Captain Bramble | 🟥28.5% | 🟨56.0% | — | 🟨47.5% | 🟥36.5% |
| Duskmantle | 🟥25.5% | 🟨58.5% | 🟨52.5% | — | 🟨50.0% |
| Sprig | 🟥37.5% | 🟨59.5% | 🟩63.5% | 🟨50.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨60.0% | 🟨57.0% | 🟩67.5% | 🟩65.0% |
| Andromoss | 🟨40.0% | — | 🟨45.0% | 🟨43.0% | 🟨41.5% |
| Captain Bramble | 🟨43.0% | 🟨55.0% | — | 🟨54.0% | 🟨48.5% |
| Duskmantle | 🟥32.5% | 🟨57.0% | 🟨46.0% | — | 🟩61.5% |
| Sprig | 🟥35.0% | 🟨58.5% | 🟨51.5% | 🟥38.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 78.0%, medium 71.5%, hard 57.0%; spread 21.0 points.
- Captain Bramble vs Duskmantle: easy 44.5%, medium 47.5%, hard 54.0%; spread 9.5 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 48.0%, medium 50.0%, hard 61.5%; spread 13.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 46.7 | 120.5 | 1127/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 129 / 71 | 0 | 46.8 | 137.1 | 480/0/0/0 · 883/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 156 / 44 | 0 | 47.5 | 140.6 | 1099/0/0/0 · 1090/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 142 / 58 | 0 | 46.6 | 118.9 | 1018/0/0/0 · 1044/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 140 / 60 | 0 | 46.0 | 129.2 | 1043/0/0/0 · 949/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 59 left-side wins | 0 | 48.0 | 153.3 | 547/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 88 / 112 | 0 | 50.1 | 144.9 | 859/0/0/0 · 574/0/0/0 |
| easy | Andromoss / Duskmantle | 200 | 82 / 118 | 0 | 46.6 | 141.6 | 831/0/0/0 · 551/0/0/0 |
| easy | Andromoss / Sprig | 200 | 96 / 104 | 0 | 50.0 | 149.3 | 992/0/0/0 · 275/0/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 61 left-side wins | 0 | 50.9 | 154.8 | 1111/0/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 89 / 111 | 0 | 47.8 | 151.3 | 1093/0/0/0 · 1091/0/0/0 |
| easy | Captain Bramble / Sprig | 200 | 75 / 125 | 0 | 51.8 | 149.0 | 1189/0/0/0 · 1073/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 44.6 | 139.6 | 1081/0/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 96 / 104 | 0 | 47.9 | 128.4 | 1116/0/0/0 · 952/0/0/0 |
| easy | Sprig / Sprig | 100 | 56 left-side wins | 0 | 50.9 | 146.2 | 1027/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 60 left-side wins | 0 | 64.7 | 173.7 | 2181/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 122 / 78 | 0 | 57.5 | 150.9 | 822/0/0/0 · 1830/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 143 / 57 | 0 | 60.6 | 160.3 | 2114/0/0/0 · 1987/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 149 / 51 | 0 | 59.7 | 155.5 | 2000/0/0/0 · 1946/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 125 / 75 | 0 | 61.6 | 158.6 | 2118/0/0/0 · 1861/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 59.3 | 159.6 | 1154/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 88 / 112 | 0 | 59.0 | 162.8 | 1856/0/0/0 · 980/0/0/0 |
| medium | Andromoss / Duskmantle | 200 | 83 / 117 | 0 | 57.3 | 157.9 | 1801/0/0/0 · 928/0/0/0 |
| medium | Andromoss / Sprig | 200 | 81 / 119 | 0 | 59.8 | 154.3 | 2018/0/0/0 · 530/0/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 55 left-side wins | 0 | 64.8 | 182.7 | 2179/0/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 95 / 105 | 0 | 60.0 | 157.0 | 2124/0/0/0 · 2134/0/0/0 |
| medium | Captain Bramble / Sprig | 200 | 73 / 127 | 0 | 65.3 | 163.9 | 2168/0/0/0 · 1980/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 56.0 | 150.9 | 2030/0/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 100 / 100 | 0 | 59.5 | 157.2 | 2076/0/0/0 · 1769/0/0/0 |
| medium | Sprig / Sprig | 100 | 59 left-side wins | 0 | 64.7 | 165.0 | 1982/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 51 left-side wins | 0 | 96.0 | 239.0 | 3954/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 120 / 80 | 0 | 85.4 | 235.8 | 1614/0/0/0 · 3693/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 114 / 86 | 0 | 90.5 | 227.6 | 3786/0/0/0 · 3546/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 135 / 65 | 0 | 86.8 | 225.1 | 3546/0/0/0 · 3394/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 130 / 70 | 0 | 89.7 | 239.6 | 3871/0/0/0 · 3369/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 87.5 | 220.9 | 2278/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 90 / 110 | 0 | 83.8 | 216.5 | 3560/0/0/0 · 1495/0/0/0 |
| hard | Andromoss / Duskmantle | 200 | 86 / 114 | 0 | 84.3 | 227.0 | 3598/0/0/0 · 1546/0/0/0 |
| hard | Andromoss / Sprig | 200 | 83 / 117 | 0 | 84.0 | 220.8 | 3635/0/0/0 · 1325/0/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 48 left-side wins | 0 | 90.0 | 229.6 | 3722/0/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 108 / 92 | 0 | 82.0 | 215.9 | 3426/0/0/0 · 3399/0/0/0 |
| hard | Captain Bramble / Sprig | 200 | 97 / 103 | 0 | 90.0 | 231.5 | 3815/0/0/0 · 3419/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 52 left-side wins | 0 | 83.7 | 219.8 | 3684/0/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 123 / 77 | 0 | 83.3 | 216.7 | 3670/0/0/0 · 3213/0/0/0 |
| hard | Sprig / Sprig | 100 | 50 left-side wins | 0 | 92.1 | 274.2 | 3974/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 567/800 (70.9%) | 0 | 4767/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 337/800 (42.1%) | 0 | 4112/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 320/800 (40.0%) | 0 | 5057/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 383/800 (47.9%) | 0 | 4883/0/0/0 | 2, 3, 4 |
| easy | Sprig | 393/800 (49.1%) | 0 | 4276/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 539/800 (67.4%) | 0 | 9235/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 330/800 (41.3%) | 0 | 8659/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 337/800 (42.1%) | 0 | 9438/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 373/800 (46.6%) | 0 | 9114/0/0/0 | 2, 3, 4 |
| medium | Sprig | 421/800 (52.6%) | 0 | 8122/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 499/800 (62.4%) | 0 | 16771/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 339/800 (42.4%) | 0 | 16764/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 401/800 (50.1%) | 0 | 16004/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 394/800 (49.3%) | 0 | 15693/0/0/0 | 2, 3, 4 |
| hard | Sprig | 367/800 (45.9%) | 0 | 15300/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 4.55 | 805.36 / 1418.18 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 4.46 | 780.31 / 1722.31 | 0.00 | 3.50 / 3.47 | 0.92 |
| easy | Captain Bramble | 4.93 | 774.72 / 1607.32 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 4.75 | 750.04 / 1464.27 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 4.06 | 781.29 / 1528.04 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 8.82 | 1624.34 / 405.82 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 9.38 | 1639.71 / 487.73 | 0.00 | 7.17 / 6.92 | 2.13 |
| medium | Captain Bramble | 9.07 | 1609.76 / 449.64 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 8.86 | 1560.21 / 423.66 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 7.67 | 1618.66 / 376.60 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 16.02 | 3282.92 / 265.41 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 18.11 | 3363.48 / 273.45 | 0.00 | 12.83 / 11.14 | 5.14 |
| hard | Captain Bramble | 15.35 | 3154.36 / 261.64 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 15.01 | 3078.69 / 246.37 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 14.16 | 3269.08 / 257.70 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed useful after hostile warning. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 32.53 | 85.7% | 3640 / 80 | 904 | 9902 / 0 |
| easy | Andromoss | 5.17 | 13.4% | 3565 / 21 | 903 | 0 / 0 |
| easy | Captain Bramble | 24.06 | 79.2% | 3946 / 64 | 904 | 3631 / 0 |
| easy | Duskmantle | 24.33 | 80.1% | 3802 / 73 | 901 | 4550 / 0 |
| easy | Sprig | 38.92 | 89.2% | 3249 / 119 | 901 | 10422 / 0 |
| medium | Sir Champignon | 37.35 | 76.1% | 7054 / 87 | 602 | 4567 / 446 |
| medium | Andromoss | 10.85 | 13.3% | 7505 / 19 | 605 | 585 / 537 |
| medium | Captain Bramble | 36.10 | 74.5% | 7259 / 93 | 602 | 4013 / 304 |
| medium | Duskmantle | 35.02 | 74.4% | 7084 / 80 | 601 | 3897 / 323 |
| medium | Sprig | 34.59 | 77.5% | 6140 / 72 | 601 | 3486 / 284 |
| hard | Sir Champignon | 56.01 | 71.2% | 12817 / 71 | 300 | 16419 / 4200 |
| hard | Andromoss | 19.91 | 8.9% | 14486 / 23 | 301 | 5351 / 4846 |
| hard | Captain Bramble | 60.63 | 74.5% | 12282 / 65 | 300 | 16011 / 4015 |
| hard | Duskmantle | 60.12 | 74.9% | 12009 / 60 | 300 | 15455 / 3824 |
| hard | Sprig | 43.51 | 67.3% | 11326 / 67 | 301 | 15580 / 4530 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --casting=opportunity --cast-profile=scaled --report=bud8-extra8-only --mark-bonus=8`.

Explicit reproduction against current defaults:

`pnpm balance:roster --tier=1 --seeds=100 --seed=20261119 --armor-targets=1 --mark-bonus=8 --tending-ms=4500 --report=bud8-extra8-only`
