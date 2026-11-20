# Five-character roster diagnostic

Isolated tier 1: 1-slot charge cap; only tier 1 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep useful/urgent selected column, theft enemy charge, armor unarmored enemy mole, mark unmarked enemy mole, tending unextended own mole near escape. No refresh of an active Sweep. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-20T00:23:35.362Z. Revision 2aa4349 + working changes; config c48c5dad991e; simulation f0a9453ed9529a27; base seed 20261119. Tuning overrides: {"tinCapsMode":"timed"}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.8% | 🟨46.5%* | 🟩71.0% | 🟨57.7% |
| Andromoss | 🟥38.2% | — | 🟥31.0% | 🟨41.8% | 🟨43.2% |
| Captain Bramble | 🟨53.5%* | 🟩69.0% | — | 🟩74.0% | 🟨56.7% |
| Duskmantle | 🟥29.0% | 🟨58.2% | 🟥26.0% | — | 🟨42.5%* |
| Sprig | 🟨42.3% | 🟨56.8% | 🟨43.3% | 🟨57.5%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩64.5% | 🟩62.0% | 🟩71.0% | 🟨59.5% |
| Andromoss | 🟥35.5% | — | 🟥35.5% | 🟨41.0% | 🟨45.0% |
| Captain Bramble | 🟥38.0% | 🟩64.5% | — | 🟩65.5% | 🟨53.5% |
| Duskmantle | 🟥29.0% | 🟨59.0% | 🟥34.5% | — | 🟥37.5% |
| Sprig | 🟨40.5% | 🟨55.0% | 🟨46.5% | 🟩62.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.0% | 🟨44.0% | 🟩74.5% | 🟨51.5% |
| Andromoss | 🟥39.0% | — | 🟥30.5% | 🟨41.5% | 🟨42.0% |
| Captain Bramble | 🟨56.0% | 🟩69.5% | — | 🟩79.0% | 🟨50.5% |
| Duskmantle | 🟥25.5% | 🟨58.5% | 🟥21.0% | — | 🟥37.0% |
| Sprig | 🟨48.5% | 🟨58.0% | 🟨49.5% | 🟩63.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨60.0% | 🟥33.5% | 🟩67.5% | 🟩62.0% |
| Andromoss | 🟨40.0% | — | 🟥27.0% | 🟨43.0% | 🟨42.5% |
| Captain Bramble | 🟩66.5% | 🟩73.0% | — | 🟩77.5% | 🟩66.0% |
| Duskmantle | 🟥32.5% | 🟨57.0% | 🟥22.5% | — | 🟨53.0% |
| Sprig | 🟥38.0% | 🟨57.5% | 🟥34.0% | 🟨47.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 62.0%, medium 44.0%, hard 33.5%; spread 28.5 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 37.5%, medium 37.0%, hard 53.0%; spread 16.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 46.7 | 120.5 | 1127/0/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 129 / 71 | 0 | 46.8 | 137.1 | 480/0/0/0 · 883/0/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 124 / 76 | 0 | 48.5 | 133.3 | 1114/0/0/0 · 1087/0/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 142 / 58 | 0 | 46.6 | 118.9 | 1018/0/0/0 · 1044/0/0/0 |
| easy | Sir Champignon / Sprig | 200 | 119 / 81 | 0 | 46.8 | 128.7 | 1117/0/0/0 · 988/0/0/0 |
| easy | Andromoss / Andromoss | 100 | 59 left-side wins | 0 | 48.0 | 153.3 | 547/0/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 71 / 129 | 0 | 48.4 | 148.4 | 818/0/0/0 · 516/0/0/0 |
| easy | Andromoss / Duskmantle | 200 | 82 / 118 | 0 | 46.6 | 141.6 | 831/0/0/0 · 551/0/0/0 |
| easy | Andromoss / Sprig | 200 | 90 / 110 | 0 | 50.9 | 153.3 | 1021/0/0/0 · 264/0/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 58 left-side wins | 0 | 50.1 | 161.8 | 1167/0/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 131 / 69 | 0 | 45.3 | 138.9 | 1080/0/0/0 · 1097/0/0/0 |
| easy | Captain Bramble / Sprig | 200 | 107 / 93 | 0 | 48.5 | 127.2 | 1152/0/0/0 · 1059/0/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 44.6 | 139.6 | 1081/0/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 75 / 125 | 0 | 47.9 | 116.3 | 1102/0/0/0 · 972/0/0/0 |
| easy | Sprig / Sprig | 100 | 63 left-side wins | 0 | 50.7 | 127.5 | 1013/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 60 left-side wins | 0 | 64.7 | 173.7 | 2181/0/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 122 / 78 | 0 | 57.5 | 150.9 | 822/0/0/0 · 1830/0/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 88 / 112 | 0 | 59.0 | 155.4 | 2071/0/0/0 · 2017/0/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 149 / 51 | 0 | 59.7 | 155.5 | 2000/0/0/0 · 1946/0/0/0 |
| medium | Sir Champignon / Sprig | 200 | 103 / 97 | 0 | 61.7 | 149.8 | 2037/0/0/0 · 1735/0/0/0 |
| medium | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 59.3 | 159.6 | 1154/0/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 61 / 139 | 0 | 55.4 | 137.8 | 1703/0/0/0 · 893/0/0/0 |
| medium | Andromoss / Duskmantle | 200 | 83 / 117 | 0 | 57.3 | 157.9 | 1801/0/0/0 · 928/0/0/0 |
| medium | Andromoss / Sprig | 200 | 84 / 116 | 0 | 58.8 | 151.5 | 1998/0/0/0 · 505/0/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 62 left-side wins | 0 | 58.4 | 148.5 | 1994/0/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 158 / 42 | 0 | 57.0 | 141.5 | 1919/0/0/0 · 1923/0/0/0 |
| medium | Captain Bramble / Sprig | 200 | 101 / 99 | 0 | 61.5 | 155.6 | 2089/0/0/0 · 1876/0/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 56.0 | 150.9 | 2030/0/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 74 / 126 | 0 | 58.2 | 144.9 | 1956/0/0/0 · 1638/0/0/0 |
| medium | Sprig / Sprig | 100 | 55 left-side wins | 0 | 61.4 | 150.9 | 1768/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 51 left-side wins | 0 | 96.0 | 239.0 | 3954/0/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 120 / 80 | 0 | 85.4 | 235.8 | 1614/0/0/0 · 3693/0/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 67 / 133 | 0 | 85.4 | 202.0 | 3395/0/0/0 · 3164/0/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 135 / 65 | 0 | 86.8 | 225.1 | 3546/0/0/0 · 3394/0/0/0 |
| hard | Sir Champignon / Sprig | 200 | 124 / 76 | 0 | 89.3 | 234.6 | 3951/0/0/0 · 3333/0/0/0 |
| hard | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 87.5 | 220.9 | 2278/0/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 54 / 146 | 0 | 82.3 | 204.8 | 3275/0/0/0 · 1386/0/0/0 |
| hard | Andromoss / Duskmantle | 200 | 86 / 114 | 0 | 84.3 | 227.0 | 3598/0/0/0 · 1546/0/0/0 |
| hard | Andromoss / Sprig | 200 | 85 / 115 | 0 | 85.0 | 220.3 | 3479/0/0/0 · 1232/0/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 55 left-side wins | 0 | 81.8 | 224.7 | 3329/0/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 155 / 45 | 0 | 80.3 | 185.6 | 2876/0/0/0 · 2873/0/0/0 |
| hard | Captain Bramble / Sprig | 200 | 132 / 68 | 0 | 87.1 | 239.9 | 3755/0/0/0 · 3369/0/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 52 left-side wins | 0 | 83.7 | 219.8 | 3684/0/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 106 / 94 | 0 | 82.2 | 220.1 | 3533/0/0/0 · 2976/0/0/0 |
| hard | Sprig / Sprig | 100 | 51 left-side wins | 0 | 86.2 | 224.3 | 3318/0/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 514/800 (64.3%) | 0 | 4856/0/0/0 | 2, 3, 4 |
| easy | Andromoss | 314/800 (39.3%) | 0 | 4100/0/0/0 | 2, 3, 4 |
| easy | Captain Bramble | 443/800 (55.4%) | 0 | 5002/0/0/0 | 2, 3, 4 |
| easy | Duskmantle | 320/800 (40.0%) | 0 | 4875/0/0/0 | 2, 3, 4 |
| easy | Sprig | 409/800 (51.1%) | 0 | 4296/0/0/0 | 2, 3, 4 |
| medium | Sir Champignon | 462/800 (57.8%) | 0 | 9111/0/0/0 | 2, 3, 4 |
| medium | Andromoss | 306/800 (38.3%) | 0 | 8486/0/0/0 | 2, 3, 4 |
| medium | Captain Bramble | 510/800 (63.7%) | 0 | 8912/0/0/0 | 2, 3, 4 |
| medium | Duskmantle | 284/800 (35.5%) | 0 | 8783/0/0/0 | 2, 3, 4 |
| medium | Sprig | 438/800 (54.8%) | 0 | 7522/0/0/0 | 2, 3, 4 |
| hard | Sir Champignon | 446/800 (55.8%) | 0 | 16460/0/0/0 | 2, 3, 4 |
| hard | Andromoss | 305/800 (38.1%) | 0 | 16323/0/0/0 | 2, 3, 4 |
| hard | Captain Bramble | 566/800 (70.8%) | 0 | 14510/0/0/0 | 2, 3, 4 |
| hard | Duskmantle | 330/800 (41.3%) | 0 | 15030/0/0/0 | 2, 3, 4 |
| hard | Sprig | 353/800 (44.1%) | 0 | 14228/0/0/0 | 2, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 4.66 | 810.06 / 1392.04 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 4.44 | 766.54 / 1788.06 | 0.00 | 3.52 / 3.49 | 0.89 |
| easy | Captain Bramble | 4.79 | 756.48 / 1566.60 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 4.74 | 731.40 / 1435.74 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 4.10 | 782.14 / 1251.32 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 8.66 | 1590.21 / 388.57 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 9.16 | 1586.77 / 454.20 | 0.00 | 7.01 / 6.76 | 2.07 |
| medium | Captain Bramble | 8.65 | 1498.84 / 375.17 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 8.44 | 1479.69 / 393.47 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 7.19 | 1540.66 / 313.65 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 15.63 | 3193.28 / 267.58 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 17.56 | 3242.31 / 269.56 | 0.00 | 12.47 / 10.86 | 4.95 |
| hard | Captain Bramble | 13.98 | 2832.26 / 228.28 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 14.18 | 2899.47 / 240.44 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 13.64 | 3192.14 / 249.12 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed useful after hostile warning. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 31.86 | 85.0% | 3729 / 85 | 903 | 8954 / 0 |
| easy | Andromoss | 5.12 | 12.9% | 3553 / 18 | 902 | 0 / 0 |
| easy | Captain Bramble | 27.70 | 82.4% | 3835 / 66 | 902 | 7089 / 0 |
| easy | Duskmantle | 25.78 | 81.2% | 3794 / 76 | 901 | 5676 / 0 |
| easy | Sprig | 39.34 | 89.1% | 3283 / 139 | 902 | 11138 / 0 |
| medium | Sir Champignon | 35.86 | 75.5% | 6930 / 107 | 602 | 3554 / 335 |
| medium | Andromoss | 10.58 | 13.1% | 7332 / 22 | 605 | 516 / 482 |
| medium | Captain Bramble | 33.64 | 74.0% | 6918 / 89 | 602 | 3115 / 264 |
| medium | Duskmantle | 32.64 | 73.8% | 6753 / 84 | 601 | 3178 / 263 |
| medium | Sprig | 30.98 | 76.4% | 5754 / 94 | 601 | 3222 / 230 |
| hard | Sir Champignon | 54.47 | 71.2% | 12506 / 56 | 300 | 15504 / 3878 |
| hard | Andromoss | 19.34 | 9.0% | 14045 / 25 | 301 | 5016 / 4527 |
| hard | Captain Bramble | 55.58 | 74.7% | 11181 / 55 | 301 | 12501 / 3126 |
| hard | Duskmantle | 56.27 | 74.7% | 11346 / 53 | 300 | 12973 / 3229 |
| hard | Sprig | 40.15 | 65.8% | 10910 / 64 | 301 | 14243 / 4367 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --casting=opportunity --cast-profile=scaled --report=tin-next-control --tin-caps=timed`.
