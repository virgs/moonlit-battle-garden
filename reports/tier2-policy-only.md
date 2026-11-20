# Five-character roster diagnostic

Isolated tier 2: 2-slot charge cap; only tier 2 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Guard unguarded own mole near escape; Tines useful/urgent selected column, no active automation refresh; Riot/Veil visible enemy mole/star, no active effect refresh or casting into wards. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-20T03:20:27.716Z. Revision 80754e2 + working changes; config dee5e248da77; simulation 4cb2da04504f5860; base seed 20261119. Tuning overrides: {"twoStarGuardMode":"timed","warningMs":0}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨53.0%* | 🟨50.7%* | 🟥38.0% | 🟨43.5%* |
| Andromoss | 🟨47.0%* | — | 🟨45.8%* | 🟥33.7% | 🟨52.2%* |
| Captain Bramble | 🟨49.3%* | 🟨54.2%* | — | 🟥37.0%* | 🟨43.0%* |
| Duskmantle | 🟩62.0% | 🟩66.3% | 🟩63.0%* | — | 🟨49.3%* |
| Sprig | 🟨56.5%* | 🟨47.8%* | 🟨57.0%* | 🟨50.7%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨45.5% | 🟨50.0% | 🟨48.0% | 🟥32.5% |
| Andromoss | 🟨54.5% | — | 🟨54.5% | 🟨42.5% | 🟨42.5% |
| Captain Bramble | 🟨50.0% | 🟨45.5% | — | 🟨48.0% | 🟥33.0% |
| Duskmantle | 🟨52.0% | 🟨57.5% | 🟨52.0% | — | 🟥29.5% |
| Sprig | 🟩67.5% | 🟨57.5% | 🟩67.0% | 🟩70.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨54.0% | 🟨49.5% | 🟥37.5% | 🟥38.0% |
| Andromoss | 🟨46.0% | — | 🟨45.0% | 🟥36.0% | 🟨48.0% |
| Captain Bramble | 🟨50.5% | 🟨55.0% | — | 🟥37.5% | 🟥38.5% |
| Duskmantle | 🟩62.5% | 🟩64.0% | 🟩62.5% | — | 🟨46.0% |
| Sprig | 🟩62.0% | 🟨52.0% | 🟩61.5% | 🟨54.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨59.5% | 🟨52.5% | 🟥28.5% | 🟨60.0% |
| Andromoss | 🟨40.5% | — | 🟥38.0% | 🟥22.5% | 🟩66.0% |
| Captain Bramble | 🟨47.5% | 🟩62.0% | — | 🟥25.5% | 🟨57.5% |
| Duskmantle | 🟩71.5% | 🟩77.5% | 🟩74.5% | — | 🟩72.5% |
| Sprig | 🟨40.0% | 🟥34.0% | 🟨42.5% | 🟥27.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 45.5%, medium 54.0%, hard 59.5%; spread 14.0 points; observed favored-side flip.
- Sir Champignon vs Captain Bramble: easy 50.0%, medium 49.5%, hard 52.5%; spread 3.0 points; observed favored-side flip.
- Sir Champignon vs Sprig: easy 32.5%, medium 38.0%, hard 60.0%; spread 27.5 points; observed favored-side flip.
- Andromoss vs Captain Bramble: easy 54.5%, medium 45.0%, hard 38.0%; spread 16.5 points; observed favored-side flip.
- Andromoss vs Sprig: easy 42.5%, medium 48.0%, hard 66.0%; spread 23.5 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 48.0%, medium 37.5%, hard 25.5%; spread 22.5 points.
- Captain Bramble vs Sprig: easy 33.0%, medium 38.5%, hard 57.5%; spread 24.5 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 29.5%, medium 46.0%, hard 72.5%; spread 43.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 60 left-side wins | 0 | 46.6 | 145.3 | 0/411/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 91 / 109 | 0 | 47.2 | 167.1 | 0/433/0/0 · 0/454/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 100 / 100 | 0 | 46.6 | 145.3 | 0/411/0/0 · 0/411/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 96 / 104 | 0 | 47.7 | 140.7 | 0/401/0/0 · 0/423/0/0 |
| easy | Sir Champignon / Sprig | 200 | 65 / 135 | 0 | 44.5 | 124.2 | 0/380/0/0 · 0/429/0/0 |
| easy | Andromoss / Andromoss | 100 | 57 left-side wins | 0 | 45.4 | 144.7 | 0/431/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 109 / 91 | 0 | 47.2 | 167.1 | 0/454/0/0 · 0/433/0/0 |
| easy | Andromoss / Duskmantle | 200 | 85 / 115 | 0 | 47.2 | 136.0 | 0/432/0/0 · 0/442/0/0 |
| easy | Andromoss / Sprig | 200 | 85 / 115 | 0 | 43.9 | 128.1 | 0/415/0/0 · 0/428/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 60 left-side wins | 0 | 46.6 | 145.3 | 0/411/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 96 / 104 | 0 | 47.7 | 140.7 | 0/401/0/0 · 0/423/0/0 |
| easy | Captain Bramble / Sprig | 200 | 66 / 134 | 0 | 44.5 | 124.2 | 0/381/0/0 · 0/429/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 55 left-side wins | 0 | 46.2 | 150.4 | 0/438/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 59 / 141 | 0 | 43.9 | 122.9 | 0/428/0/0 · 0/444/0/0 |
| easy | Sprig / Sprig | 100 | 60 left-side wins | 0 | 44.3 | 122.3 | 0/444/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 55 left-side wins | 0 | 56.9 | 149.6 | 0/1000/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 108 / 92 | 0 | 56.6 | 148.8 | 0/947/0/0 · 0/985/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 99 / 101 | 0 | 56.7 | 149.6 | 0/1000/0/0 · 0/999/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 75 / 125 | 0 | 55.2 | 146.3 | 0/904/0/0 · 0/980/0/0 |
| medium | Sir Champignon / Sprig | 200 | 76 / 124 | 0 | 55.3 | 146.3 | 0/905/0/0 · 0/984/0/0 |
| medium | Andromoss / Andromoss | 100 | 55 left-side wins | 0 | 56.6 | 152.2 | 0/979/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 90 / 110 | 0 | 56.5 | 148.8 | 0/991/0/0 · 0/954/0/0 |
| medium | Andromoss / Duskmantle | 200 | 72 / 128 | 0 | 56.8 | 148.9 | 0/966/0/0 · 0/988/0/0 |
| medium | Andromoss / Sprig | 200 | 96 / 104 | 0 | 53.0 | 141.1 | 0/904/0/0 · 0/928/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 56 left-side wins | 0 | 56.7 | 149.6 | 0/999/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 75 / 125 | 0 | 55.3 | 147.1 | 0/908/0/0 · 0/983/0/0 |
| medium | Captain Bramble / Sprig | 200 | 77 / 123 | 0 | 55.1 | 145.1 | 0/904/0/0 · 0/980/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 47 left-side wins | 0 | 57.1 | 152.3 | 0/972/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 92 / 108 | 0 | 53.3 | 140.8 | 0/964/0/0 · 0/952/0/0 |
| medium | Sprig / Sprig | 100 | 61 left-side wins | 0 | 57.3 | 138.3 | 0/965/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 54 left-side wins | 0 | 83.5 | 229.3 | 0/1794/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 119 / 81 | 0 | 81.2 | 209.4 | 0/1804/0/0 · 0/1898/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 105 / 95 | 0 | 83.5 | 228.8 | 0/1816/0/0 · 0/1815/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 57 / 143 | 0 | 77.4 | 188.1 | 0/1453/0/0 · 0/1576/0/0 |
| hard | Sir Champignon / Sprig | 200 | 120 / 80 | 0 | 81.7 | 210.4 | 0/1746/0/0 · 0/1879/0/0 |
| hard | Andromoss / Andromoss | 100 | 53 left-side wins | 0 | 79.9 | 214.7 | 0/1834/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 76 / 124 | 0 | 81.7 | 214.8 | 0/1912/0/0 · 0/1824/0/0 |
| hard | Andromoss / Duskmantle | 200 | 45 / 155 | 0 | 77.1 | 175.6 | 0/1429/0/0 · 0/1488/0/0 |
| hard | Andromoss / Sprig | 200 | 132 / 68 | 0 | 73.6 | 184.7 | 0/1590/0/0 · 0/1596/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 55 left-side wins | 0 | 82.1 | 228.8 | 0/1840/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 51 / 149 | 0 | 77.3 | 185.6 | 0/1430/0/0 · 0/1562/0/0 |
| hard | Captain Bramble / Sprig | 200 | 115 / 85 | 0 | 81.2 | 209.4 | 0/1751/0/0 · 0/1883/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 75.8 | 175.9 | 0/1484/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 145 / 55 | 0 | 75.4 | 181.6 | 0/1485/0/0 · 0/1481/0/0 |
| hard | Sprig / Sprig | 100 | 59 left-side wins | 0 | 77.8 | 186.2 | 0/1750/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 352/800 (44.0%) | 0 | 0/2036/0/0 | 1, 3, 4 |
| easy | Andromoss | 388/800 (48.5%) | 0 | 0/2186/0/0 | 1, 3, 4 |
| easy | Captain Bramble | 353/800 (44.1%) | 0 | 0/2037/0/0 | 1, 3, 4 |
| easy | Duskmantle | 382/800 (47.8%) | 0 | 0/2154/0/0 | 1, 3, 4 |
| easy | Sprig | 525/800 (65.6%) | 0 | 0/2174/0/0 | 1, 3, 4 |
| medium | Sir Champignon | 358/800 (44.8%) | 0 | 0/4756/0/0 | 1, 3, 4 |
| medium | Andromoss | 350/800 (43.8%) | 0 | 0/4825/0/0 | 1, 3, 4 |
| medium | Captain Bramble | 363/800 (45.4%) | 0 | 0/4764/0/0 | 1, 3, 4 |
| medium | Duskmantle | 470/800 (58.8%) | 0 | 0/4887/0/0 | 1, 3, 4 |
| medium | Sprig | 459/800 (57.4%) | 0 | 0/4809/0/0 | 1, 3, 4 |
| hard | Sir Champignon | 401/800 (50.1%) | 0 | 0/8613/0/0 | 1, 3, 4 |
| hard | Andromoss | 334/800 (41.8%) | 0 | 0/8663/0/0 | 1, 3, 4 |
| hard | Captain Bramble | 385/800 (48.1%) | 0 | 0/8660/0/0 | 1, 3, 4 |
| hard | Duskmantle | 592/800 (74.0%) | 0 | 0/7595/0/0 | 1, 3, 4 |
| hard | Sprig | 288/800 (36.0%) | 0 | 0/8589/0/0 | 1, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 2.03 | 791.04 / 1721.34 | 16.20 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 2.19 | 786.31 / 1700.08 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Captain Bramble | 2.03 | 790.91 / 1724.17 | 16.20 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 2.15 | 790.20 / 1611.87 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 2.16 | 808.64 / 1323.78 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 4.70 | 1657.62 / 453.75 | 36.56 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 4.81 | 1629.89 / 473.23 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Captain Bramble | 4.71 | 1660.42 / 454.76 | 36.24 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 4.89 | 1620.67 / 418.23 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 4.80 | 1650.93 / 442.06 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 8.52 | 3207.90 / 203.73 | 63.42 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 8.54 | 3047.77 / 249.89 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Captain Bramble | 8.53 | 3202.53 / 206.06 | 59.55 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 7.64 | 2628.19 / 195.81 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 8.55 | 3042.76 / 293.67 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed useful after hostile warning. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 21.38 | 90.2% | 1625 / 56 | 903 | 4286 / 0 |
| easy | Andromoss | 17.31 | 87.0% | 1755 / 42 | 903 | 3925 / 0 |
| easy | Captain Bramble | 21.39 | 90.2% | 1626 / 56 | 903 | 4286 / 0 |
| easy | Duskmantle | 20.69 | 89.2% | 1716 / 66 | 901 | 6101 / 0 |
| easy | Sprig | 18.71 | 88.1% | 1730 / 47 | 903 | 5512 / 0 |
| medium | Sir Champignon | 25.16 | 80.9% | 3756 / 80 | 602 | 3376 / 283 |
| medium | Andromoss | 22.63 | 78.4% | 3846 / 59 | 602 | 3640 / 245 |
| medium | Captain Bramble | 25.17 | 80.9% | 3765 / 81 | 602 | 3333 / 283 |
| medium | Duskmantle | 22.69 | 78.1% | 3915 / 55 | 601 | 3172 / 231 |
| medium | Sprig | 22.17 | 78.0% | 3844 / 52 | 602 | 2983 / 291 |
| hard | Sir Champignon | 28.40 | 69.8% | 6819 / 38 | 301 | 9024 / 2490 |
| hard | Andromoss | 34.41 | 75.0% | 6829 / 41 | 300 | 9533 / 2220 |
| hard | Captain Bramble | 28.61 | 70.0% | 6820 / 42 | 301 | 9033 / 2461 |
| hard | Duskmantle | 30.79 | 75.1% | 6111 / 26 | 301 | 6068 / 1528 |
| hard | Sprig | 30.34 | 71.7% | 6839 / 39 | 301 | 8916 / 2269 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=2 --casting=opportunity --cast-profile=scaled --report=tier2-policy-only --warning-ms=0 --two-star-guards=timed`.

Explicit reproduction:

`pnpm balance:roster --tier=2 --seeds=100 --seed=20261119 --casting=opportunity --two-star-guards=timed --warning-ms=0 --report=tier2-policy-only`
