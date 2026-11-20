# Five-character roster diagnostic

Isolated tier 2: 2-slot charge cap; only tier 2 can cast. Every bot casts on the first free tick when full/cooldown-ready, irrespective of usefulness. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-20T03:20:25.886Z. Revision 80754e2 + working changes; config dee5e248da77; simulation 4cb2da04504f5860; base seed 20261119. Tuning overrides: {"twoStarGuardMode":"timed","warningMs":0}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨54.7%* | 🟨51.7% | 🟥37.7%* | 🟨50.8%* |
| Andromoss | 🟨45.3%* | — | 🟨46.3%* | 🟥37.2% | 🟩64.8%* |
| Captain Bramble | 🟨48.3% | 🟨53.7%* | — | 🟥36.2%* | 🟨49.0%* |
| Duskmantle | 🟩62.3%* | 🟩62.8% | 🟩63.8%* | — | 🟨55.0%* |
| Sprig | 🟨49.2%* | 🟥35.2%* | 🟨51.0%* | 🟨45.0%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨44.5% | 🟨51.0% | 🟨48.5% | 🟥39.0% |
| Andromoss | 🟨55.5% | — | 🟨55.5% | 🟨46.0% | 🟨42.0% |
| Captain Bramble | 🟨49.0% | 🟨44.5% | — | 🟨48.5% | 🟥39.0% |
| Duskmantle | 🟨51.5% | 🟨54.0% | 🟨51.5% | — | 🟥36.5% |
| Sprig | 🟩61.0% | 🟨58.0% | 🟩61.0% | 🟩63.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨55.0% | 🟨51.0% | 🟥36.0% | 🟨42.5% |
| Andromoss | 🟨45.0% | — | 🟨46.5% | 🟥39.0% | 🟩64.0% |
| Captain Bramble | 🟨49.0% | 🟨53.5% | — | 🟥35.0% | 🟨41.0% |
| Duskmantle | 🟩64.0% | 🟩61.0% | 🟩65.0% | — | 🟨54.0% |
| Sprig | 🟨57.5% | 🟥36.0% | 🟨59.0% | 🟨46.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩64.5% | 🟨53.0% | 🟥28.5% | 🟩71.0% |
| Andromoss | 🟥35.5% | — | 🟥37.0% | 🟥26.5% | 🟩88.5% |
| Captain Bramble | 🟨47.0% | 🟩63.0% | — | 🟥25.0% | 🟩67.0% |
| Duskmantle | 🟩71.5% | 🟩73.5% | 🟩75.0% | — | 🟩74.5% |
| Sprig | 🟥29.0% | 🟥11.5% | 🟥33.0% | 🟥25.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 44.5%, medium 55.0%, hard 64.5%; spread 20.0 points; observed favored-side flip.
- Sir Champignon vs Duskmantle: easy 48.5%, medium 36.0%, hard 28.5%; spread 20.0 points.
- Sir Champignon vs Sprig: easy 39.0%, medium 42.5%, hard 71.0%; spread 32.0 points; observed favored-side flip.
- Andromoss vs Captain Bramble: easy 55.5%, medium 46.5%, hard 37.0%; spread 18.5 points; observed favored-side flip.
- Andromoss vs Sprig: easy 42.0%, medium 64.0%, hard 88.5%; spread 46.5 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 48.5%, medium 35.0%, hard 25.0%; spread 23.5 points.
- Captain Bramble vs Sprig: easy 39.0%, medium 41.0%, hard 67.0%; spread 28.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 36.5%, medium 54.0%, hard 74.5%; spread 38.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 59 left-side wins | 0 | 48.0 | 155.2 | 0/479/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 89 / 111 | 0 | 46.2 | 139.0 | 0/475/0/0 · 0/472/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 102 / 98 | 0 | 48.0 | 155.2 | 0/484/0/0 · 0/479/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 97 / 103 | 0 | 46.1 | 141.9 | 0/470/0/0 · 0/466/0/0 |
| easy | Sir Champignon / Sprig | 200 | 78 / 122 | 0 | 44.6 | 140.8 | 0/450/0/0 · 0/445/0/0 |
| easy | Andromoss / Andromoss | 100 | 54 left-side wins | 0 | 45.5 | 133.8 | 0/447/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 111 / 89 | 0 | 46.2 | 139.4 | 0/471/0/0 · 0/474/0/0 |
| easy | Andromoss / Duskmantle | 200 | 92 / 108 | 0 | 45.6 | 140.4 | 0/467/0/0 · 0/467/0/0 |
| easy | Andromoss / Sprig | 200 | 84 / 116 | 0 | 44.4 | 128.6 | 0/462/0/0 · 0/462/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 57 left-side wins | 0 | 48.6 | 165.7 | 0/484/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 97 / 103 | 0 | 46.1 | 141.9 | 0/471/0/0 · 0/466/0/0 |
| easy | Captain Bramble / Sprig | 200 | 78 / 122 | 0 | 44.5 | 140.8 | 0/447/0/0 · 0/446/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 57 left-side wins | 0 | 44.4 | 112.7 | 0/431/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 73 / 127 | 0 | 42.5 | 116.3 | 0/449/0/0 · 0/446/0/0 |
| easy | Sprig / Sprig | 100 | 53 left-side wins | 0 | 44.0 | 126.8 | 0/450/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 57 left-side wins | 0 | 56.6 | 154.9 | 0/1047/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 110 / 90 | 0 | 55.5 | 153.7 | 0/1034/0/0 · 0/1053/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 102 / 98 | 0 | 56.7 | 157.5 | 0/1066/0/0 · 0/1063/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 72 / 128 | 0 | 60.0 | 147.7 | 0/1019/0/0 · 0/1056/0/0 |
| medium | Sir Champignon / Sprig | 200 | 85 / 115 | 0 | 57.1 | 153.8 | 0/1050/0/0 · 0/1030/0/0 |
| medium | Andromoss / Andromoss | 100 | 55 left-side wins | 0 | 64.1 | 141.1 | 0/1003/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 93 / 107 | 0 | 56.9 | 153.8 | 0/1050/0/0 · 0/1042/0/0 |
| medium | Andromoss / Duskmantle | 200 | 78 / 122 | 0 | 56.6 | 139.8 | 0/993/0/0 · 0/1027/0/0 |
| medium | Andromoss / Sprig | 200 | 128 / 72 | 0 | 51.8 | 135.9 | 0/960/0/0 · 0/975/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 57 left-side wins | 0 | 56.5 | 160.6 | 0/1062/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 70 / 130 | 0 | 62.6 | 148.8 | 0/1038/0/0 · 0/1071/0/0 |
| medium | Captain Bramble / Sprig | 200 | 82 / 118 | 0 | 56.8 | 153.4 | 0/1053/0/0 · 0/1045/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 53 left-side wins | 0 | 56.4 | 140.5 | 0/987/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 108 / 92 | 0 | 55.2 | 142.3 | 0/986/0/0 · 0/954/0/0 |
| medium | Sprig / Sprig | 100 | 61 left-side wins | 0 | 62.5 | 156.7 | 0/1074/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 53 left-side wins | 0 | 84.8 | 217.9 | 0/2032/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 129 / 71 | 0 | 82.3 | 226.8 | 0/1991/0/0 · 0/1977/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 106 / 94 | 0 | 84.5 | 226.9 | 0/2033/0/0 · 0/2040/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 57 / 143 | 0 | 79.9 | 186.1 | 0/1544/0/0 · 0/1612/0/0 |
| hard | Sir Champignon / Sprig | 200 | 142 / 58 | 0 | 82.8 | 199.8 | 0/1871/0/0 · 0/1910/0/0 |
| hard | Andromoss / Andromoss | 100 | 51 left-side wins | 0 | 76.4 | 216.6 | 0/1894/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 74 / 126 | 0 | 82.5 | 223.6 | 0/1983/0/0 · 0/2003/0/0 |
| hard | Andromoss / Duskmantle | 200 | 53 / 147 | 0 | 79.5 | 180.6 | 0/1527/0/0 · 0/1559/0/0 |
| hard | Andromoss / Sprig | 200 | 177 / 23 | 0 | 64.0 | 152.3 | 0/1481/0/0 · 0/1484/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 56 left-side wins | 0 | 85.5 | 235.2 | 0/2128/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 50 / 150 | 0 | 79.9 | 184.6 | 0/1572/0/0 · 0/1650/0/0 |
| hard | Captain Bramble / Sprig | 200 | 134 / 66 | 0 | 80.8 | 205.5 | 0/1870/0/0 · 0/1913/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 56 left-side wins | 0 | 78.3 | 180.1 | 0/1577/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 149 / 51 | 0 | 77.6 | 173.9 | 0/1524/0/0 · 0/1477/0/0 |
| hard | Sprig / Sprig | 100 | 57 left-side wins | 0 | 79.3 | 211.6 | 0/1853/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 366/800 (45.8%) | 0 | 0/2358/0/0 | 1, 3, 4 |
| easy | Andromoss | 398/800 (49.8%) | 0 | 0/2319/0/0 | 1, 3, 4 |
| easy | Captain Bramble | 362/800 (45.3%) | 0 | 0/2355/0/0 | 1, 3, 4 |
| easy | Duskmantle | 387/800 (48.4%) | 0 | 0/2279/0/0 | 1, 3, 4 |
| easy | Sprig | 487/800 (60.9%) | 0 | 0/2249/0/0 | 1, 3, 4 |
| medium | Sir Champignon | 369/800 (46.1%) | 0 | 0/5216/0/0 | 1, 3, 4 |
| medium | Andromoss | 389/800 (48.6%) | 0 | 0/5059/0/0 | 1, 3, 4 |
| medium | Captain Bramble | 357/800 (44.6%) | 0 | 0/5258/0/0 | 1, 3, 4 |
| medium | Duskmantle | 488/800 (61.0%) | 0 | 0/5127/0/0 | 1, 3, 4 |
| medium | Sprig | 397/800 (49.6%) | 0 | 0/5078/0/0 | 1, 3, 4 |
| hard | Sir Champignon | 434/800 (54.3%) | 0 | 0/9471/0/0 | 1, 3, 4 |
| hard | Andromoss | 375/800 (46.9%) | 0 | 0/8862/0/0 | 1, 3, 4 |
| hard | Captain Bramble | 404/800 (50.5%) | 0 | 0/9613/0/0 | 1, 3, 4 |
| hard | Duskmantle | 589/800 (73.6%) | 0 | 0/7922/0/0 | 1, 3, 4 |
| hard | Sprig | 198/800 (24.8%) | 0 | 0/8637/0/0 | 1, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 2.35 | 778.94 / 1667.97 | 18.77 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 2.34 | 763.11 / 1595.57 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Captain Bramble | 2.34 | 778.34 / 1675.15 | 18.47 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 2.31 | 773.51 / 1570.26 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 2.25 | 803.90 / 1438.73 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 5.21 | 1664.04 / 466.32 | 39.80 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 5.07 | 1612.87 / 476.65 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Captain Bramble | 5.25 | 1670.61 / 473.20 | 38.13 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 5.17 | 1624.04 / 426.08 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 5.00 | 1651.20 / 472.98 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 9.30 | 3239.03 / 204.71 | 63.15 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 8.71 | 3004.68 / 244.70 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Captain Bramble | 9.36 | 3259.55 / 214.69 | 54.84 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 7.93 | 2658.14 / 197.18 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 8.48 | 2919.20 / 313.94 | 0.00 | 0.00 / 0.00 | 0.00 |

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

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=2 --casting=immediate --cast-profile=baseline --report=tier2-no-warning-control --warning-ms=0 --two-star-guards=timed`.

Explicit reproduction:

`pnpm balance:roster --tier=2 --seeds=100 --seed=20261119 --casting=immediate --two-star-guards=timed --warning-ms=0 --report=tier2-no-warning-control`
