# Five-character roster diagnostic

Isolated tier 2: 2-slot charge cap; only tier 2 can cast. Every bot casts on the first free tick when full/cooldown-ready, irrespective of usefulness. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-20T03:20:24.590Z. Revision 80754e2 + working changes; config 55110479c8c7; simulation 4cb2da04504f5860; base seed 20261119. Tuning overrides: {"twoStarGuardMode":"timed","warningMs":650}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨53.7%* | 🟨51.7% | 🟨41.5%* | 🟨50.8%* |
| Andromoss | 🟨46.3%* | — | 🟨47.3%* | 🟥37.8%* | 🟩62.8%* |
| Captain Bramble | 🟨48.3% | 🟨52.7%* | — | 🟨40.5%* | 🟨49.0%* |
| Duskmantle | 🟨58.5%* | 🟩62.2%* | 🟨59.5%* | — | 🟨56.8%* |
| Sprig | 🟨49.2%* | 🟥37.2%* | 🟨51.0%* | 🟨43.2%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.5% | 🟨51.0% | 🟨52.0% | 🟥39.0% |
| Andromoss | 🟨49.5% | — | 🟨50.5% | 🟨50.0% | 🟨42.0% |
| Captain Bramble | 🟨49.0% | 🟨49.5% | — | 🟨52.0% | 🟥39.0% |
| Duskmantle | 🟨48.0% | 🟨50.0% | 🟨48.0% | — | 🟥37.0% |
| Sprig | 🟩61.0% | 🟨58.0% | 🟩61.0% | 🟩63.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨46.5% | 🟨51.0% | 🟨44.5% | 🟨42.5% |
| Andromoss | 🟨53.5% | — | 🟨52.0% | 🟨40.0% | 🟩62.5% |
| Captain Bramble | 🟨49.0% | 🟨48.0% | — | 🟨43.0% | 🟨41.0% |
| Duskmantle | 🟨55.5% | 🟨60.0% | 🟨57.0% | — | 🟨55.0% |
| Sprig | 🟨57.5% | 🟥37.5% | 🟨59.0% | 🟨45.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩64.0% | 🟨53.0% | 🟥28.0% | 🟩71.0% |
| Andromoss | 🟥36.0% | — | 🟥39.5% | 🟥23.5% | 🟩84.0% |
| Captain Bramble | 🟨47.0% | 🟩60.5% | — | 🟥26.5% | 🟩67.0% |
| Duskmantle | 🟩72.0% | 🟩76.5% | 🟩73.5% | — | 🟩78.5% |
| Sprig | 🟥29.0% | 🟥16.0% | 🟥33.0% | 🟥21.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 50.5%, medium 46.5%, hard 64.0%; spread 17.5 points; observed favored-side flip.
- Sir Champignon vs Duskmantle: easy 52.0%, medium 44.5%, hard 28.0%; spread 24.0 points; observed favored-side flip.
- Sir Champignon vs Sprig: easy 39.0%, medium 42.5%, hard 71.0%; spread 32.0 points; observed favored-side flip.
- Andromoss vs Captain Bramble: easy 50.5%, medium 52.0%, hard 39.5%; spread 12.5 points; observed favored-side flip.
- Andromoss vs Duskmantle: easy 50.0%, medium 40.0%, hard 23.5%; spread 26.5 points.
- Andromoss vs Sprig: easy 42.0%, medium 62.5%, hard 84.0%; spread 42.0 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 52.0%, medium 43.0%, hard 26.5%; spread 25.5 points; observed favored-side flip.
- Captain Bramble vs Sprig: easy 39.0%, medium 41.0%, hard 67.0%; spread 28.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 37.0%, medium 55.0%, hard 78.5%; spread 41.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 59 left-side wins | 0 | 48.0 | 155.2 | 0/479/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 101 / 99 | 0 | 45.6 | 133.8 | 0/477/0/0 · 0/457/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 102 / 98 | 0 | 48.0 | 155.2 | 0/484/0/0 · 0/479/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 104 / 96 | 0 | 47.1 | 135.3 | 0/483/0/0 · 0/451/0/0 |
| easy | Sir Champignon / Sprig | 200 | 78 / 122 | 0 | 44.6 | 140.8 | 0/450/0/0 · 0/445/0/0 |
| easy | Andromoss / Andromoss | 100 | 63 left-side wins | 0 | 45.8 | 141.4 | 0/471/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 101 / 99 | 0 | 45.6 | 133.8 | 0/459/0/0 · 0/480/0/0 |
| easy | Andromoss / Duskmantle | 200 | 100 / 100 | 0 | 45.5 | 132.7 | 0/474/0/0 · 0/463/0/0 |
| easy | Andromoss / Sprig | 200 | 84 / 116 | 0 | 44.5 | 138.6 | 0/458/0/0 · 0/458/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 57 left-side wins | 0 | 48.6 | 165.7 | 0/484/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 104 / 96 | 0 | 47.4 | 137.4 | 0/486/0/0 · 0/452/0/0 |
| easy | Captain Bramble / Sprig | 200 | 78 / 122 | 0 | 44.5 | 140.8 | 0/447/0/0 · 0/446/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 59 left-side wins | 0 | 45.2 | 115.3 | 0/475/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 74 / 126 | 0 | 43.5 | 124.8 | 0/456/0/0 · 0/449/0/0 |
| easy | Sprig / Sprig | 100 | 53 left-side wins | 0 | 44.0 | 126.8 | 0/450/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 57 left-side wins | 0 | 56.6 | 154.9 | 0/1047/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 93 / 107 | 0 | 57.5 | 153.2 | 0/1082/0/0 · 0/1100/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 102 / 98 | 0 | 56.7 | 157.5 | 0/1066/0/0 · 0/1063/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 89 / 111 | 0 | 56.6 | 149.2 | 0/1032/0/0 · 0/1047/0/0 |
| medium | Sir Champignon / Sprig | 200 | 85 / 115 | 0 | 57.1 | 153.8 | 0/1050/0/0 · 0/1030/0/0 |
| medium | Andromoss / Andromoss | 100 | 60 left-side wins | 0 | 66.7 | 168.8 | 0/1087/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 104 / 96 | 0 | 57.5 | 153.2 | 0/1095/0/0 · 0/1064/0/0 |
| medium | Andromoss / Duskmantle | 200 | 80 / 120 | 0 | 60.9 | 148.8 | 0/1032/0/0 · 0/1058/0/0 |
| medium | Andromoss / Sprig | 200 | 125 / 75 | 0 | 51.8 | 140.9 | 0/971/0/0 · 0/969/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 57 left-side wins | 0 | 56.5 | 160.6 | 0/1062/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 86 / 114 | 0 | 58.5 | 150.8 | 0/1038/0/0 · 0/1058/0/0 |
| medium | Captain Bramble / Sprig | 200 | 82 / 118 | 0 | 56.8 | 153.4 | 0/1053/0/0 · 0/1045/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 57 left-side wins | 0 | 56.2 | 135.6 | 0/1010/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 110 / 90 | 0 | 56.7 | 150.8 | 0/1055/0/0 · 0/1012/0/0 |
| medium | Sprig / Sprig | 100 | 61 left-side wins | 0 | 62.5 | 156.7 | 0/1074/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 53 left-side wins | 0 | 84.8 | 217.9 | 0/2032/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 128 / 72 | 0 | 82.7 | 216.4 | 0/1921/0/0 · 0/1927/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 106 / 94 | 0 | 84.5 | 226.9 | 0/2033/0/0 · 0/2040/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 56 / 144 | 0 | 80.2 | 184.9 | 0/1575/0/0 · 0/1621/0/0 |
| hard | Sir Champignon / Sprig | 200 | 142 / 58 | 0 | 82.8 | 199.8 | 0/1871/0/0 · 0/1910/0/0 |
| hard | Andromoss / Andromoss | 100 | 45 left-side wins | 0 | 80.1 | 219.3 | 0/1966/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 79 / 121 | 0 | 79.9 | 213.8 | 0/1842/0/0 · 0/1844/0/0 |
| hard | Andromoss / Duskmantle | 200 | 47 / 153 | 0 | 77.7 | 183.1 | 0/1504/0/0 · 0/1570/0/0 |
| hard | Andromoss / Sprig | 200 | 168 / 32 | 0 | 66.9 | 160.5 | 0/1506/0/0 · 0/1505/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 56 left-side wins | 0 | 85.5 | 235.2 | 0/2128/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 53 / 147 | 0 | 80.8 | 186.0 | 0/1616/0/0 · 0/1639/0/0 |
| hard | Captain Bramble / Sprig | 200 | 134 / 66 | 0 | 80.8 | 205.5 | 0/1870/0/0 · 0/1913/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 55 left-side wins | 0 | 76.3 | 175.7 | 0/1578/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 157 / 43 | 0 | 75.8 | 178.3 | 0/1544/0/0 · 0/1503/0/0 |
| hard | Sprig / Sprig | 100 | 57 left-side wins | 0 | 79.3 | 211.6 | 0/1853/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 385/800 (48.1%) | 0 | 0/2373/0/0 | 1, 3, 4 |
| easy | Andromoss | 384/800 (48.0%) | 0 | 0/2319/0/0 | 1, 3, 4 |
| easy | Captain Bramble | 379/800 (47.4%) | 0 | 0/2376/0/0 | 1, 3, 4 |
| easy | Duskmantle | 366/800 (45.8%) | 0 | 0/2297/0/0 | 1, 3, 4 |
| easy | Sprig | 486/800 (60.8%) | 0 | 0/2248/0/0 | 1, 3, 4 |
| medium | Sir Champignon | 369/800 (46.1%) | 0 | 0/5277/0/0 | 1, 3, 4 |
| medium | Andromoss | 416/800 (52.0%) | 0 | 0/5285/0/0 | 1, 3, 4 |
| medium | Captain Bramble | 362/800 (45.3%) | 0 | 0/5280/0/0 | 1, 3, 4 |
| medium | Duskmantle | 455/800 (56.9%) | 0 | 0/5228/0/0 | 1, 3, 4 |
| medium | Sprig | 398/800 (49.8%) | 0 | 0/5130/0/0 | 1, 3, 4 |
| hard | Sir Champignon | 432/800 (54.0%) | 0 | 0/9432/0/0 | 1, 3, 4 |
| hard | Andromoss | 366/800 (45.8%) | 0 | 0/8745/0/0 | 1, 3, 4 |
| hard | Captain Bramble | 402/800 (50.2%) | 0 | 0/9498/0/0 | 1, 3, 4 |
| hard | Duskmantle | 601/800 (75.1%) | 0 | 0/7952/0/0 | 1, 3, 4 |
| hard | Sprig | 199/800 (24.9%) | 0 | 0/8684/0/0 | 1, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 2.37 | 782.66 / 1581.09 | 18.94 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 2.31 | 768.47 / 1458.78 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Captain Bramble | 2.37 | 782.88 / 1589.98 | 18.67 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 2.28 | 771.51 / 1537.81 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 2.25 | 806.88 / 1563.23 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 5.29 | 1683.40 / 462.63 | 40.05 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 5.25 | 1658.25 / 475.63 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Captain Bramble | 5.27 | 1686.67 / 471.56 | 37.98 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 5.27 | 1655.96 / 445.24 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 5.07 | 1672.15 / 487.45 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 9.25 | 3217.58 / 204.51 | 62.93 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 8.47 | 2905.44 / 235.33 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Captain Bramble | 9.21 | 3192.03 / 210.94 | 54.12 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 7.97 | 2674.39 / 199.63 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 8.54 | 2941.52 / 313.74 | 0.00 | 0.00 / 0.00 | 0.00 |

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

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=2 --casting=immediate --cast-profile=baseline --report=tier2-old-control --warning-ms=650 --two-star-guards=timed`.

Explicit reproduction:

`pnpm balance:roster --tier=2 --seeds=100 --seed=20261119 --casting=immediate --two-star-guards=timed --warning-ms=650 --report=tier2-old-control`
