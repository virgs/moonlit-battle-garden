# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep useful/urgent selected column, theft enemy charge, armor unarmored enemy mole, mark unmarked enemy mole, tending unextended own mole near escape. No refresh of an active Sweep. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell powers unchanged.

Generated 2026-11-19T21:59:33.675Z. Revision a1841a7 + working changes; config b38aa0610d6e; simulation dc53c29eb61a6bee; base seed 20261119. Tuning overrides: {"ominousMarkMs":12000,"extensionMs":1200}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.8% | 🟩68.8%* | 🟩79.8% | 🟩79.0% |
| Andromoss | 🟥38.2% | — | 🟨44.3% | 🟨48.0% | 🟨50.3%* |
| Captain Bramble | 🟥31.2%* | 🟨55.7% | — | 🟩60.5% | 🟩60.5% |
| Duskmantle | 🟥20.2% | 🟨52.0% | 🟥39.5% | — | 🟨52.8%* |
| Sprig | 🟥21.0% | 🟨49.7%* | 🟥39.5% | 🟨47.2%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩64.5% | 🟩78.0% | 🟩84.0% | 🟩79.5% |
| Andromoss | 🟥35.5% | — | 🟨44.0% | 🟨48.5% | 🟨53.0% |
| Captain Bramble | 🟥22.0% | 🟨56.0% | — | 🟩60.5% | 🟨54.5% |
| Duskmantle | 🟥16.0% | 🟨51.5% | 🟥39.5% | — | 🟨51.5% |
| Sprig | 🟥20.5% | 🟨47.0% | 🟨45.5% | 🟨48.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.0% | 🟩71.5% | 🟩83.0% | 🟩83.0% |
| Andromoss | 🟥39.0% | — | 🟨44.0% | 🟨49.0% | 🟨48.5% |
| Captain Bramble | 🟥28.5% | 🟨56.0% | — | 🟨57.0% | 🟨60.0% |
| Duskmantle | 🟥17.0% | 🟨51.0% | 🟨43.0% | — | 🟨48.0% |
| Sprig | 🟥17.0% | 🟨51.5% | 🟨40.0% | 🟨52.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨60.0% | 🟨57.0% | 🟩72.5% | 🟩74.5% |
| Andromoss | 🟨40.0% | — | 🟨45.0% | 🟨46.5% | 🟨49.5% |
| Captain Bramble | 🟨43.0% | 🟨55.0% | — | 🟩64.0% | 🟩67.0% |
| Duskmantle | 🟥27.5% | 🟨53.5% | 🟥36.0% | — | 🟨59.0% |
| Sprig | 🟥25.5% | 🟨50.5% | 🟥33.0% | 🟨41.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 78.0%, medium 71.5%, hard 57.0%; spread 21.0 points.
- Andromoss vs Sprig: easy 53.0%, medium 48.5%, hard 49.5%; spread 4.5 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 51.5%, medium 48.0%, hard 59.0%; spread 11.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 46.7 | 120.5 | 1127/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 129 / 71 | 0 | 46.8 | 137.1 | 480/0/0/0 · 883/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 156 / 44 | 0 | 47.5 | 140.6 | 1099/0/0/0 · 1090/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 168 / 32 | 0 | 46.5 | 120.5 | 1045/0/0/0 · 1015/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 159 / 41 | 0 | 45.3 | 112.7 | 1018/0/0/0 · 925/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 59 left-side wins | 0 | 48.0 | 153.3 | 547/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 88 / 112 | 0 | 50.1 | 144.9 | 859/0/0/0 · 574/0/0/0 |
| easy | Andromoss / Duskmantle | 200 | 97 / 103 | 0 | 48.9 | 143.1 | 836/0/0/0 · 568/0/0/0 |
| easy | Andromoss / Sprig | 200 | 106 / 94 | 0 | 50.0 | 149.6 | 1035/0/0/0 · 277/0/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 61 left-side wins | 0 | 50.9 | 154.8 | 1111/0/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 121 / 79 | 0 | 50.6 | 147.4 | 1129/0/0/0 · 1111/0/0/0 |
| easy | Captain Bramble / Sprig | 200 | 109 / 91 | 0 | 51.9 | 159.3 | 1175/0/0/0 · 1068/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 59 left-side wins | 0 | 52.6 | 153.6 | 1151/0/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 103 / 97 | 0 | 51.0 | 156.4 | 1166/0/0/0 · 1046/0/0/0 |
| easy | Sprig / Sprig | 100 | 57 left-side wins | 0 | 49.0 | 142.5 | 969/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 60 left-side wins | 0 | 64.7 | 173.7 | 2181/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 122 / 78 | 0 | 57.5 | 150.9 | 822/0/0/0 · 1830/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 143 / 57 | 0 | 60.6 | 160.3 | 2114/0/0/0 · 1987/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 166 / 34 | 0 | 62.8 | 151.7 | 2072/0/0/0 · 2006/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 166 / 34 | 0 | 60.1 | 149.2 | 1992/0/0/0 · 1765/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 59.3 | 159.6 | 1154/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 88 / 112 | 0 | 59.0 | 162.8 | 1856/0/0/0 · 980/0/0/0 |
| medium | Andromoss / Duskmantle | 200 | 98 / 102 | 0 | 59.5 | 161.7 | 1816/0/0/0 · 949/0/0/0 |
| medium | Andromoss / Sprig | 200 | 97 / 103 | 0 | 58.4 | 157.8 | 2019/0/0/0 · 576/0/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 55 left-side wins | 0 | 64.8 | 182.7 | 2179/0/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 114 / 86 | 0 | 62.4 | 165.2 | 2144/0/0/0 · 2199/0/0/0 |
| medium | Captain Bramble / Sprig | 200 | 120 / 80 | 0 | 63.0 | 169.3 | 2223/0/0/0 · 2094/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 56 left-side wins | 0 | 63.4 | 171.7 | 2211/0/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 96 / 104 | 0 | 62.0 | 160.3 | 2169/0/0/0 · 1963/0/0/0 |
| medium | Sprig / Sprig | 100 | 53 left-side wins | 0 | 63.0 | 163.2 | 1899/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 51 left-side wins | 0 | 96.0 | 239.0 | 3954/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 120 / 80 | 0 | 85.4 | 235.8 | 1614/0/0/0 · 3693/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 114 / 86 | 0 | 90.5 | 227.6 | 3786/0/0/0 · 3546/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 145 / 55 | 0 | 90.6 | 240.4 | 3787/0/0/0 · 3638/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 149 / 51 | 0 | 88.3 | 227.3 | 3873/0/0/0 · 3432/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 87.5 | 220.9 | 2278/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 90 / 110 | 0 | 83.8 | 216.5 | 3560/0/0/0 · 1495/0/0/0 |
| hard | Andromoss / Duskmantle | 200 | 93 / 107 | 0 | 89.7 | 232.7 | 3775/0/0/0 · 1557/0/0/0 |
| hard | Andromoss / Sprig | 200 | 99 / 101 | 0 | 88.0 | 234.1 | 3901/0/0/0 · 1431/0/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 48 left-side wins | 0 | 90.0 | 229.6 | 3722/0/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 128 / 72 | 0 | 89.0 | 231.8 | 3622/0/0/0 · 3601/0/0/0 |
| hard | Captain Bramble / Sprig | 200 | 134 / 66 | 0 | 88.4 | 235.4 | 3719/0/0/0 · 3406/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 57 left-side wins | 0 | 88.5 | 240.6 | 3805/0/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 118 / 82 | 0 | 90.0 | 239.5 | 3972/0/0/0 · 3610/0/0/0 |
| hard | Sprig / Sprig | 100 | 51 left-side wins | 0 | 88.8 | 243.1 | 3636/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 612/800 (76.5%) | 0 | 4769/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 362/800 (45.3%) | 0 | 4160/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 386/800 (48.3%) | 0 | 5079/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 317/800 (39.6%) | 0 | 5011/0/0/0 | 2, 3, 4 |
| easy | Sprig | 323/800 (40.4%) | 0 | 4285/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 597/800 (74.6%) | 0 | 9181/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 361/800 (45.1%) | 0 | 8675/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 403/800 (50.4%) | 0 | 9513/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 318/800 (39.8%) | 0 | 9534/0/0/0 | 2, 3, 4 |
| medium | Sprig | 321/800 (40.1%) | 0 | 8297/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 528/800 (66.0%) | 0 | 17014/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 362/800 (45.3%) | 0 | 17207/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 458/800 (57.3%) | 0 | 16104/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 352/800 (44.0%) | 0 | 16573/0/0/0 | 2, 3, 4 |
| hard | Sprig | 300/800 (37.5%) | 0 | 15515/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 4.55 | 798.60 / 1398.28 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 4.52 | 785.86 / 1756.75 | 0.00 | 3.55 / 3.52 | 0.93 |
| easy | Captain Bramble | 4.96 | 780.32 / 1614.25 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 4.83 | 763.79 / 1656.33 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 4.14 | 769.52 / 1704.82 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 8.75 | 1614.79 / 402.62 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 9.40 | 1655.49 / 498.20 | 0.00 | 7.15 / 6.89 | 2.17 |
| medium | Captain Bramble | 9.17 | 1638.47 / 488.15 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 9.15 | 1624.60 / 474.50 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 8.00 | 1617.84 / 470.14 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 16.32 | 3346.16 / 264.52 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 18.66 | 3473.72 / 277.81 | 0.00 | 13.29 / 11.51 | 5.24 |
| hard | Captain Bramble | 15.48 | 3178.94 / 250.00 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 15.96 | 3313.87 / 265.48 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 14.85 | 3382.66 / 272.50 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed useful after hostile warning. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 31.63 | 85.3% | 3642 / 88 | 903 | 8914 / 0 |
| easy | Andromoss | 5.27 | 13.7% | 3613 / 22 | 902 | 0 / 0 |
| easy | Captain Bramble | 25.50 | 80.2% | 3968 / 74 | 903 | 4352 / 0 |
| easy | Duskmantle | 28.69 | 82.9% | 3860 / 58 | 901 | 7530 / 0 |
| easy | Sprig | 37.00 | 88.5% | 3316 / 91 | 901 | 7855 / 0 |
| medium | Sir Champignon | 36.89 | 76.0% | 7000 / 88 | 602 | 4673 / 448 |
| medium | Andromoss | 10.87 | 13.3% | 7521 / 17 | 605 | 613 / 569 |
| medium | Captain Bramble | 38.69 | 76.0% | 7334 / 90 | 601 | 5564 / 440 |
| medium | Duskmantle | 38.53 | 76.0% | 7323 / 78 | 602 | 5630 / 418 |
| medium | Sprig | 39.37 | 79.3% | 6398 / 107 | 601 | 5643 / 474 |
| hard | Sir Champignon | 57.08 | 71.3% | 13060 / 65 | 300 | 17329 / 4431 |
| hard | Andromoss | 20.50 | 8.8% | 14929 / 22 | 301 | 5757 / 5232 |
| hard | Captain Bramble | 61.81 | 74.8% | 12382 / 69 | 300 | 16548 / 4056 |
| hard | Duskmantle | 64.53 | 75.1% | 12768 / 74 | 300 | 18262 / 4404 |
| hard | Sprig | 46.97 | 68.3% | 11879 / 46 | 301 | 17261 / 4869 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --casting=opportunity --cast-profile=scaled --report=sweep-both-longer --ominous-ms=12000 --extension-ms=1200`.
