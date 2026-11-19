# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep useful/urgent selected column, theft enemy charge, armor unarmored enemy mole, mark unmarked enemy mole, tending unextended own mole near escape. No refresh of an active Sweep. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell powers unchanged.

Generated 2026-11-19T23:41:18.505Z. Revision cb19384 + working changes; config 61923bcecd87; simulation efd9ed909229ae8b; base seed 20261119. Tuning overrides: {"armorTargets":3}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.8% | 🟨46.5%* | 🟩73.5% | 🟩65.8% |
| Andromoss | 🟥38.2% | — | 🟥31.0% | 🟨45.0% | 🟨43.3% |
| Captain Bramble | 🟨53.5%* | 🟩69.0% | — | 🟩76.0% | 🟩66.5% |
| Duskmantle | 🟥26.5% | 🟨55.0% | 🟥24.0% | — | 🟨47.5%* |
| Sprig | 🟥34.2% | 🟨56.7% | 🟥33.5% | 🟨52.5%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩64.5% | 🟩62.0% | 🟩74.0% | 🟩70.0% |
| Andromoss | 🟥35.5% | — | 🟥35.5% | 🟨44.0% | 🟨48.0% |
| Captain Bramble | 🟥38.0% | 🟩64.5% | — | 🟩66.0% | 🟩61.0% |
| Duskmantle | 🟥26.0% | 🟨56.0% | 🟥34.0% | — | 🟨45.0% |
| Sprig | 🟥30.0% | 🟨52.0% | 🟥39.0% | 🟨55.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.0% | 🟨44.0% | 🟩78.5% | 🟩62.5% |
| Andromoss | 🟥39.0% | — | 🟥30.5% | 🟨46.0% | 🟨40.5% |
| Captain Bramble | 🟨56.0% | 🟩69.5% | — | 🟩80.5% | 🟩66.5% |
| Duskmantle | 🟥21.5% | 🟨54.0% | 🟥19.5% | — | 🟨41.0% |
| Sprig | 🟥37.5% | 🟨59.5% | 🟥33.5% | 🟨59.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨60.0% | 🟥33.5% | 🟩68.0% | 🟩65.0% |
| Andromoss | 🟨40.0% | — | 🟥27.0% | 🟨45.0% | 🟨41.5% |
| Captain Bramble | 🟩66.5% | 🟩73.0% | — | 🟩81.5% | 🟩72.0% |
| Duskmantle | 🟥32.0% | 🟨55.0% | 🟥18.5% | — | 🟨56.5% |
| Sprig | 🟥35.0% | 🟨58.5% | 🟥28.0% | 🟨43.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 62.0%, medium 44.0%, hard 33.5%; spread 28.5 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 45.0%, medium 41.0%, hard 56.5%; spread 15.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 46.7 | 120.5 | 1127/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 129 / 71 | 0 | 46.8 | 137.1 | 480/0/0/0 · 883/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 124 / 76 | 0 | 48.5 | 133.3 | 1114/0/0/0 · 1087/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 148 / 52 | 0 | 46.3 | 128.3 | 1002/0/0/0 · 1039/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 140 / 60 | 0 | 46.0 | 129.2 | 1043/0/0/0 · 949/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 59 left-side wins | 0 | 48.0 | 153.3 | 547/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 71 / 129 | 0 | 48.4 | 148.4 | 818/0/0/0 · 516/0/0/0 |
| easy | Andromoss / Duskmantle | 200 | 88 / 112 | 0 | 48.5 | 147.4 | 834/0/0/0 · 574/0/0/0 |
| easy | Andromoss / Sprig | 200 | 96 / 104 | 0 | 50.0 | 149.3 | 992/0/0/0 · 275/0/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 58 left-side wins | 0 | 50.1 | 161.8 | 1167/0/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 132 / 68 | 0 | 46.4 | 142.4 | 1058/0/0/0 · 1123/0/0/0 |
| easy | Captain Bramble / Sprig | 200 | 122 / 78 | 0 | 47.3 | 147.6 | 1106/0/0/0 · 1024/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 47.0 | 151.0 | 1094/0/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 90 / 110 | 0 | 50.5 | 145.4 | 1155/0/0/0 · 1004/0/0/0 |
| easy | Sprig / Sprig | 100 | 56 left-side wins | 0 | 50.9 | 146.2 | 1027/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 60 left-side wins | 0 | 64.7 | 173.7 | 2181/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 122 / 78 | 0 | 57.5 | 150.9 | 822/0/0/0 · 1830/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 88 / 112 | 0 | 59.0 | 155.4 | 2071/0/0/0 · 2017/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 157 / 43 | 0 | 61.2 | 154.4 | 2050/0/0/0 · 2011/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 125 / 75 | 0 | 61.6 | 158.6 | 2118/0/0/0 · 1861/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 59.3 | 159.6 | 1154/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 61 / 139 | 0 | 55.4 | 137.8 | 1703/0/0/0 · 893/0/0/0 |
| medium | Andromoss / Duskmantle | 200 | 92 / 108 | 0 | 57.5 | 163.1 | 1794/0/0/0 · 944/0/0/0 |
| medium | Andromoss / Sprig | 200 | 81 / 119 | 0 | 59.8 | 154.3 | 2018/0/0/0 · 530/0/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 62 left-side wins | 0 | 58.4 | 148.5 | 1994/0/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 161 / 39 | 0 | 57.1 | 132.4 | 1859/0/0/0 · 1883/0/0/0 |
| medium | Captain Bramble / Sprig | 200 | 133 / 67 | 0 | 60.5 | 155.9 | 2048/0/0/0 · 1902/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 57 left-side wins | 0 | 57.3 | 159.0 | 2104/0/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 82 / 118 | 0 | 59.3 | 155.5 | 2044/0/0/0 · 1766/0/0/0 |
| medium | Sprig / Sprig | 100 | 59 left-side wins | 0 | 64.7 | 165.0 | 1982/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 51 left-side wins | 0 | 96.0 | 239.0 | 3954/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 120 / 80 | 0 | 85.4 | 235.8 | 1614/0/0/0 · 3693/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 67 / 133 | 0 | 85.4 | 202.0 | 3395/0/0/0 · 3164/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 136 / 64 | 0 | 86.0 | 242.3 | 3697/0/0/0 · 3570/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 130 / 70 | 0 | 89.7 | 239.6 | 3871/0/0/0 · 3369/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 87.5 | 220.9 | 2278/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 54 / 146 | 0 | 82.3 | 204.8 | 3275/0/0/0 · 1386/0/0/0 |
| hard | Andromoss / Duskmantle | 200 | 90 / 110 | 0 | 88.7 | 231.8 | 3728/0/0/0 · 1617/0/0/0 |
| hard | Andromoss / Sprig | 200 | 83 / 117 | 0 | 84.0 | 220.8 | 3635/0/0/0 · 1325/0/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 55 left-side wins | 0 | 81.8 | 224.7 | 3329/0/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 163 / 37 | 0 | 80.5 | 184.8 | 2856/0/0/0 · 2836/0/0/0 |
| hard | Captain Bramble / Sprig | 200 | 144 / 56 | 0 | 85.9 | 205.8 | 3407/0/0/0 · 3139/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 53 left-side wins | 0 | 86.0 | 218.3 | 3665/0/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 113 / 87 | 0 | 84.2 | 222.9 | 3729/0/0/0 · 3307/0/0/0 |
| hard | Sprig / Sprig | 100 | 50 left-side wins | 0 | 92.1 | 274.2 | 3974/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 541/800 (67.6%) | 0 | 4766/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 326/800 (40.8%) | 0 | 4074/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 459/800 (57.4%) | 0 | 4934/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 322/800 (40.3%) | 0 | 4985/0/0/0 | 2, 3, 4 |
| easy | Sprig | 352/800 (44.0%) | 0 | 4279/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 492/800 (61.5%) | 0 | 9242/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 312/800 (39.0%) | 0 | 8499/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 545/800 (68.1%) | 0 | 8811/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 272/800 (34.0%) | 0 | 8986/0/0/0 | 2, 3, 4 |
| medium | Sprig | 379/800 (47.4%) | 0 | 8041/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 453/800 (56.6%) | 0 | 16531/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 307/800 (38.4%) | 0 | 16609/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 586/800 (73.3%) | 0 | 14142/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 324/800 (40.5%) | 0 | 15417/0/0/0 | 2, 3, 4 |
| hard | Sprig | 330/800 (41.3%) | 0 | 15114/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 4.55 | 800.10 / 1428.70 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 4.41 | 769.54 / 1780.87 | 0.00 | 3.47 / 3.45 | 0.90 |
| easy | Captain Bramble | 4.71 | 752.90 / 1668.26 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 4.86 | 747.91 / 1511.14 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 4.07 | 767.23 / 1562.12 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 8.83 | 1612.18 / 406.13 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 9.18 | 1596.44 / 455.91 | 0.00 | 7.00 / 6.77 | 2.09 |
| medium | Captain Bramble | 8.52 | 1495.61 / 379.95 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 8.60 | 1504.08 / 410.02 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 7.57 | 1575.75 / 377.84 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 15.72 | 3211.32 / 266.25 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 17.91 | 3316.68 / 274.93 | 0.00 | 12.69 / 11.03 | 5.09 |
| hard | Captain Bramble | 13.52 | 2751.36 / 217.65 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 14.69 | 3030.09 / 251.91 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 13.93 | 3183.83 / 255.04 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed useful after hostile warning. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 29.03 | 83.9% | 3639 / 92 | 904 | 7208 / 0 |
| easy | Andromoss | 5.12 | 13.4% | 3527 / 20 | 902 | 0 / 0 |
| easy | Captain Bramble | 28.07 | 82.9% | 3767 / 69 | 902 | 7069 / 0 |
| easy | Duskmantle | 26.34 | 81.2% | 3891 / 79 | 902 | 5650 / 0 |
| easy | Sprig | 42.61 | 90.1% | 3252 / 118 | 902 | 13746 / 0 |
| medium | Sir Champignon | 36.05 | 75.2% | 7061 / 98 | 601 | 3868 / 403 |
| medium | Andromoss | 10.60 | 13.3% | 7345 / 9 | 605 | 521 / 485 |
| medium | Captain Bramble | 33.89 | 74.5% | 6817 / 87 | 602 | 3387 / 266 |
| medium | Duskmantle | 33.65 | 74.1% | 6882 / 81 | 602 | 3548 / 318 |
| medium | Sprig | 33.74 | 77.3% | 6059 / 75 | 602 | 3852 / 294 |
| hard | Sir Champignon | 54.75 | 71.1% | 12577 / 69 | 300 | 15735 / 3930 |
| hard | Andromoss | 19.72 | 9.0% | 14331 / 25 | 302 | 5250 / 4738 |
| hard | Captain Bramble | 53.77 | 74.7% | 10813 / 61 | 301 | 11463 / 2854 |
| hard | Duskmantle | 58.39 | 74.7% | 11752 / 66 | 300 | 14944 / 3652 |
| hard | Sprig | 42.29 | 66.9% | 11140 / 67 | 301 | 14881 / 4330 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --casting=opportunity --cast-profile=scaled --report=tin3-only --armor-targets=3`.

Explicit reproduction against current defaults:

`pnpm balance:roster --tier=1 --seeds=100 --seed=20261119 --armor-targets=3 --mark-bonus=6 --tending-ms=4500 --report=tin3-only`
