# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep useful/urgent selected column, theft enemy charge, armor unarmored enemy mole, mark unmarked enemy mole, tending unextended own mole near escape. No refresh of an active Sweep. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell powers unchanged.

Generated 2026-11-19T22:44:28.299Z. Revision 0343197 + working changes; config d5f90c0096f7; simulation 676cc72ffa349ea7; base seed 20261119. Tuning overrides: {"ominousMarkMs":8000,"markBonus":6}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.8% | 🟩68.8%* | 🟩73.5% | 🟩72.0% |
| Andromoss | 🟥38.2% | — | 🟨44.3% | 🟨45.0% | 🟨44.5% |
| Captain Bramble | 🟥31.2%* | 🟨55.7% | — | 🟨52.0%* | 🟨49.2%* |
| Duskmantle | 🟥26.5% | 🟨55.0% | 🟨48.0%* | — | 🟨50.8%* |
| Sprig | 🟥28.0% | 🟨55.5% | 🟨50.8%* | 🟨49.2%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩64.5% | 🟩78.0% | 🟩74.0% | 🟩75.5% |
| Andromoss | 🟥35.5% | — | 🟨44.0% | 🟨44.0% | 🟨48.0% |
| Captain Bramble | 🟥22.0% | 🟨56.0% | — | 🟨47.5% | 🟨47.0% |
| Duskmantle | 🟥26.0% | 🟨56.0% | 🟨52.5% | — | 🟨47.0% |
| Sprig | 🟥24.5% | 🟨52.0% | 🟨53.0% | 🟨53.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.0% | 🟩71.5% | 🟩78.5% | 🟩69.5% |
| Andromoss | 🟥39.0% | — | 🟨44.0% | 🟨46.0% | 🟨40.5% |
| Captain Bramble | 🟥28.5% | 🟨56.0% | — | 🟨52.5% | 🟨44.5% |
| Duskmantle | 🟥21.5% | 🟨54.0% | 🟨47.5% | — | 🟨48.0% |
| Sprig | 🟥30.5% | 🟨59.5% | 🟨55.5% | 🟨52.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨60.0% | 🟨57.0% | 🟩68.0% | 🟩71.0% |
| Andromoss | 🟨40.0% | — | 🟨45.0% | 🟨45.0% | 🟨45.0% |
| Captain Bramble | 🟨43.0% | 🟨55.0% | — | 🟨56.0% | 🟨56.0% |
| Duskmantle | 🟥32.0% | 🟨55.0% | 🟨44.0% | — | 🟨57.5% |
| Sprig | 🟥29.0% | 🟨55.0% | 🟨44.0% | 🟨42.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 78.0%, medium 71.5%, hard 57.0%; spread 21.0 points.
- Captain Bramble vs Duskmantle: easy 47.5%, medium 52.5%, hard 56.0%; spread 8.5 points; observed favored-side flip.
- Captain Bramble vs Sprig: easy 47.0%, medium 44.5%, hard 56.0%; spread 11.5 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 47.0%, medium 48.0%, hard 57.5%; spread 10.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 46.7 | 120.5 | 1127/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 129 / 71 | 0 | 46.8 | 137.1 | 480/0/0/0 · 883/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 156 / 44 | 0 | 47.5 | 140.6 | 1099/0/0/0 · 1090/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 148 / 52 | 0 | 46.3 | 128.3 | 1002/0/0/0 · 1039/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 151 / 49 | 0 | 45.8 | 118.5 | 1027/0/0/0 · 941/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 59 left-side wins | 0 | 48.0 | 153.3 | 547/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 88 / 112 | 0 | 50.1 | 144.9 | 859/0/0/0 · 574/0/0/0 |
| easy | Andromoss / Duskmantle | 200 | 88 / 112 | 0 | 48.5 | 147.4 | 834/0/0/0 · 574/0/0/0 |
| easy | Andromoss / Sprig | 200 | 96 / 104 | 0 | 50.0 | 163.3 | 1018/0/0/0 · 281/0/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 61 left-side wins | 0 | 50.9 | 154.8 | 1111/0/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 95 / 105 | 0 | 49.9 | 140.4 | 1080/0/0/0 · 1085/0/0/0 |
| easy | Captain Bramble / Sprig | 200 | 94 / 106 | 0 | 50.1 | 161.0 | 1201/0/0/0 · 1055/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 47.0 | 151.0 | 1094/0/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 94 / 106 | 0 | 49.5 | 135.7 | 1134/0/0/0 · 1000/0/0/0 |
| easy | Sprig / Sprig | 100 | 62 left-side wins | 0 | 49.1 | 154.8 | 1001/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 60 left-side wins | 0 | 64.7 | 173.7 | 2181/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 122 / 78 | 0 | 57.5 | 150.9 | 822/0/0/0 · 1830/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 143 / 57 | 0 | 60.6 | 160.3 | 2114/0/0/0 · 1987/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 157 / 43 | 0 | 61.2 | 154.4 | 2050/0/0/0 · 2011/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 139 / 61 | 0 | 60.5 | 148.7 | 2044/0/0/0 · 1783/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 59.3 | 159.6 | 1154/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 88 / 112 | 0 | 59.0 | 162.8 | 1856/0/0/0 · 980/0/0/0 |
| medium | Andromoss / Duskmantle | 200 | 92 / 108 | 0 | 57.5 | 163.1 | 1794/0/0/0 · 944/0/0/0 |
| medium | Andromoss / Sprig | 200 | 81 / 119 | 0 | 59.0 | 154.3 | 2026/0/0/0 · 579/0/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 55 left-side wins | 0 | 64.8 | 182.7 | 2179/0/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 105 / 95 | 0 | 61.5 | 172.2 | 2173/0/0/0 · 2170/0/0/0 |
| medium | Captain Bramble / Sprig | 200 | 89 / 111 | 0 | 62.3 | 163.6 | 2169/0/0/0 · 1979/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 57 left-side wins | 0 | 57.3 | 159.0 | 2104/0/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 96 / 104 | 0 | 59.5 | 154.5 | 2092/0/0/0 · 1799/0/0/0 |
| medium | Sprig / Sprig | 100 | 60 left-side wins | 0 | 61.3 | 166.6 | 1930/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 51 left-side wins | 0 | 96.0 | 239.0 | 3954/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 120 / 80 | 0 | 85.4 | 235.8 | 1614/0/0/0 · 3693/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 114 / 86 | 0 | 90.5 | 227.6 | 3786/0/0/0 · 3546/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 136 / 64 | 0 | 86.0 | 242.3 | 3697/0/0/0 · 3570/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 142 / 58 | 0 | 89.8 | 238.2 | 3845/0/0/0 · 3368/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 87.5 | 220.9 | 2278/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 90 / 110 | 0 | 83.8 | 216.5 | 3560/0/0/0 · 1495/0/0/0 |
| hard | Andromoss / Duskmantle | 200 | 90 / 110 | 0 | 88.7 | 231.8 | 3728/0/0/0 · 1617/0/0/0 |
| hard | Andromoss / Sprig | 200 | 90 / 110 | 0 | 84.5 | 222.8 | 3698/0/0/0 · 1338/0/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 48 left-side wins | 0 | 90.0 | 229.6 | 3722/0/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 112 / 88 | 0 | 84.3 | 226.7 | 3505/0/0/0 · 3453/0/0/0 |
| hard | Captain Bramble / Sprig | 200 | 112 / 88 | 0 | 87.2 | 225.3 | 3768/0/0/0 · 3432/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 53 left-side wins | 0 | 86.0 | 218.3 | 3665/0/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 115 / 85 | 0 | 84.2 | 223.4 | 3701/0/0/0 · 3292/0/0/0 |
| hard | Sprig / Sprig | 100 | 53 left-side wins | 0 | 91.0 | 236.7 | 3570/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 584/800 (73.0%) | 0 | 4735/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 343/800 (42.9%) | 0 | 4141/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 345/800 (43.1%) | 0 | 5056/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 363/800 (45.4%) | 0 | 4926/0/0/0 | 2, 3, 4 |
| easy | Sprig | 365/800 (45.6%) | 0 | 4278/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 561/800 (70.1%) | 0 | 9211/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 339/800 (42.4%) | 0 | 8660/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 363/800 (45.4%) | 0 | 9488/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 342/800 (42.8%) | 0 | 9321/0/0/0 | 2, 3, 4 |
| medium | Sprig | 395/800 (49.4%) | 0 | 8070/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 512/800 (64.0%) | 0 | 16896/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 350/800 (43.8%) | 0 | 16957/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 420/800 (52.5%) | 0 | 16036/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 377/800 (47.1%) | 0 | 16006/0/0/0 | 2, 3, 4 |
| hard | Sprig | 341/800 (42.6%) | 0 | 15000/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 4.51 | 805.78 / 1386.52 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 4.49 | 784.66 / 1777.82 | 0.00 | 3.52 / 3.50 | 0.93 |
| easy | Captain Bramble | 4.93 | 776.77 / 1556.60 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 4.79 | 759.29 / 1458.88 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 4.10 | 787.40 / 1581.92 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 8.79 | 1622.09 / 405.27 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 9.38 | 1642.98 / 486.77 | 0.00 | 7.13 / 6.88 | 2.17 |
| medium | Captain Bramble | 9.14 | 1626.60 / 468.57 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 9.02 | 1589.30 / 440.20 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 7.67 | 1609.07 / 405.09 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 16.18 | 3313.14 / 265.72 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 18.35 | 3424.24 / 276.54 | 0.00 | 13.05 / 11.30 | 5.18 |
| hard | Captain Bramble | 15.39 | 3154.08 / 256.15 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 15.43 | 3180.89 / 254.62 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 14.29 | 3270.74 / 259.15 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed useful after hostile warning. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 31.00 | 85.1% | 3608 / 94 | 903 | 8727 / 0 |
| easy | Andromoss | 5.24 | 13.7% | 3594 / 23 | 903 | 0 / 0 |
| easy | Captain Bramble | 26.16 | 80.8% | 3945 / 73 | 904 | 5069 / 0 |
| easy | Duskmantle | 25.61 | 80.9% | 3832 / 74 | 901 | 5266 / 0 |
| easy | Sprig | 33.43 | 87.3% | 3277 / 110 | 902 | 5355 / 0 |
| medium | Sir Champignon | 37.04 | 76.0% | 7030 / 92 | 602 | 4455 / 423 |
| medium | Andromoss | 10.85 | 13.4% | 7506 / 13 | 605 | 601 / 553 |
| medium | Captain Bramble | 37.26 | 75.1% | 7309 / 101 | 602 | 4752 / 358 |
| medium | Duskmantle | 36.65 | 75.1% | 7217 / 92 | 601 | 4626 / 409 |
| medium | Sprig | 36.68 | 78.7% | 6140 / 99 | 602 | 4265 / 332 |
| hard | Sir Champignon | 56.84 | 71.4% | 12942 / 64 | 300 | 17051 / 4299 |
| hard | Andromoss | 20.21 | 9.1% | 14679 / 22 | 301 | 5511 / 4980 |
| hard | Captain Bramble | 60.62 | 74.5% | 12314 / 68 | 300 | 15907 / 3973 |
| hard | Duskmantle | 61.11 | 74.6% | 12341 / 61 | 300 | 16494 / 4014 |
| hard | Sprig | 44.55 | 67.7% | 11430 / 68 | 301 | 15883 / 4444 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --casting=opportunity --cast-profile=scaled --report=bud8-penalty6-only --mark-bonus=6 --ominous-ms=8000`.

Reproduce against current defaults with all changed parameters explicit:

`pnpm balance:roster --tier=1 --seeds=100 --seed=20261119 --ominous-marks=3 --ominous-ms=8000 --mark-bonus=6 --extension-ms=500 --tending-ms=3000 --report=bud8-penalty6-only`
