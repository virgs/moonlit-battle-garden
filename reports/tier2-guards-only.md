# Five-character roster diagnostic

Isolated tier 2: 2-slot charge cap; only tier 2 can cast. Every bot casts on the first free tick when full/cooldown-ready, irrespective of usefulness. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-20T03:20:27.050Z. Revision 80754e2 + working changes; config c8543e5d6a4c; simulation 4cb2da04504f5860; base seed 20261119. Tuning overrides: {"twoStarGuardMode":"charges","warningMs":0}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩65.3%* | 🟨50.0% | 🟨48.2%* | 🟨59.7%* |
| Andromoss | 🟥34.7%* | — | 🟥34.7%* | 🟥37.2% | 🟩64.8%* |
| Captain Bramble | 🟨50.0% | 🟩65.3%* | — | 🟨48.2%* | 🟨59.7%* |
| Duskmantle | 🟨51.8%* | 🟩62.8% | 🟨51.8%* | — | 🟨55.0%* |
| Sprig | 🟨40.3%* | 🟥35.2%* | 🟨40.3%* | 🟨45.0%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨51.0% | 🟨50.0% | 🟨53.5% | 🟨41.5% |
| Andromoss | 🟨49.0% | — | 🟨49.0% | 🟨46.0% | 🟨42.0% |
| Captain Bramble | 🟨50.0% | 🟨51.0% | — | 🟨53.5% | 🟨41.5% |
| Duskmantle | 🟨46.5% | 🟨54.0% | 🟨46.5% | — | 🟥36.5% |
| Sprig | 🟨58.5% | 🟨58.0% | 🟨58.5% | 🟩63.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩66.5% | 🟨50.0% | 🟨50.0% | 🟨54.5% |
| Andromoss | 🟥33.5% | — | 🟥33.5% | 🟥39.0% | 🟩64.0% |
| Captain Bramble | 🟨50.0% | 🟩66.5% | — | 🟨50.0% | 🟨54.5% |
| Duskmantle | 🟨50.0% | 🟩61.0% | 🟨50.0% | — | 🟨54.0% |
| Sprig | 🟨45.5% | 🟥36.0% | 🟨45.5% | 🟨46.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩78.5% | 🟨50.0% | 🟨41.0% | 🟩83.0% |
| Andromoss | 🟥21.5% | — | 🟥21.5% | 🟥26.5% | 🟩88.5% |
| Captain Bramble | 🟨50.0% | 🟩78.5% | — | 🟨41.0% | 🟩83.0% |
| Duskmantle | 🟨59.0% | 🟩73.5% | 🟨59.0% | — | 🟩74.5% |
| Sprig | 🟥17.0% | 🟥11.5% | 🟥17.0% | 🟥25.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 51.0%, medium 66.5%, hard 78.5%; spread 27.5 points.
- Sir Champignon vs Duskmantle: easy 53.5%, medium 50.0%, hard 41.0%; spread 12.5 points; observed favored-side flip.
- Sir Champignon vs Sprig: easy 41.5%, medium 54.5%, hard 83.0%; spread 41.5 points; observed favored-side flip.
- Andromoss vs Captain Bramble: easy 49.0%, medium 33.5%, hard 21.5%; spread 27.5 points.
- Andromoss vs Sprig: easy 42.0%, medium 64.0%, hard 88.5%; spread 46.5 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 53.5%, medium 50.0%, hard 41.0%; spread 12.5 points; observed favored-side flip.
- Captain Bramble vs Sprig: easy 41.5%, medium 54.5%, hard 83.0%; spread 41.5 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 36.5%, medium 54.0%, hard 74.5%; spread 38.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 49.6 | 142.9 | 0/462/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 102 / 98 | 0 | 46.9 | 141.0 | 0/457/0/0 · 0/482/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 100 / 100 | 0 | 49.6 | 142.9 | 0/462/0/0 · 0/462/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 107 / 93 | 0 | 46.0 | 133.6 | 0/463/0/0 · 0/467/0/0 |
| easy | Sir Champignon / Sprig | 200 | 83 / 117 | 0 | 44.5 | 127.7 | 0/472/0/0 · 0/470/0/0 |
| easy | Andromoss / Andromoss | 100 | 54 left-side wins | 0 | 45.5 | 133.8 | 0/447/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 98 / 102 | 0 | 46.9 | 141.0 | 0/482/0/0 · 0/457/0/0 |
| easy | Andromoss / Duskmantle | 200 | 92 / 108 | 0 | 45.6 | 140.4 | 0/467/0/0 · 0/467/0/0 |
| easy | Andromoss / Sprig | 200 | 84 / 116 | 0 | 44.4 | 128.6 | 0/462/0/0 · 0/462/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 58 left-side wins | 0 | 49.6 | 142.9 | 0/462/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 107 / 93 | 0 | 46.0 | 133.6 | 0/463/0/0 · 0/467/0/0 |
| easy | Captain Bramble / Sprig | 200 | 83 / 117 | 0 | 44.5 | 127.7 | 0/472/0/0 · 0/470/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 57 left-side wins | 0 | 44.4 | 112.7 | 0/431/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 73 / 127 | 0 | 42.5 | 116.3 | 0/449/0/0 · 0/446/0/0 |
| easy | Sprig / Sprig | 100 | 53 left-side wins | 0 | 44.0 | 126.8 | 0/450/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 53 left-side wins | 0 | 56.9 | 152.9 | 0/1021/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 133 / 67 | 0 | 58.8 | 150.8 | 0/1010/0/0 · 0/1031/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 100 / 100 | 0 | 56.9 | 152.9 | 0/1021/0/0 · 0/1021/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 100 / 100 | 0 | 59.2 | 154.3 | 0/1040/0/0 · 0/1062/0/0 |
| medium | Sir Champignon / Sprig | 200 | 109 / 91 | 0 | 54.6 | 155.7 | 0/1038/0/0 · 0/1033/0/0 |
| medium | Andromoss / Andromoss | 100 | 55 left-side wins | 0 | 64.1 | 141.1 | 0/1003/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 67 / 133 | 0 | 58.8 | 150.8 | 0/1031/0/0 · 0/1010/0/0 |
| medium | Andromoss / Duskmantle | 200 | 78 / 122 | 0 | 56.6 | 139.8 | 0/993/0/0 · 0/1027/0/0 |
| medium | Andromoss / Sprig | 200 | 128 / 72 | 0 | 51.8 | 135.9 | 0/960/0/0 · 0/975/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 53 left-side wins | 0 | 56.9 | 152.9 | 0/1021/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 100 / 100 | 0 | 59.2 | 154.3 | 0/1040/0/0 · 0/1062/0/0 |
| medium | Captain Bramble / Sprig | 200 | 109 / 91 | 0 | 54.6 | 155.7 | 0/1038/0/0 · 0/1033/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 53 left-side wins | 0 | 56.4 | 140.5 | 0/987/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 108 / 92 | 0 | 55.2 | 142.3 | 0/986/0/0 · 0/954/0/0 |
| medium | Sprig / Sprig | 100 | 61 left-side wins | 0 | 62.5 | 156.7 | 0/1074/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 60 left-side wins | 0 | 89.5 | 242.8 | 0/2120/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 157 / 43 | 0 | 83.7 | 203.7 | 0/1880/0/0 · 0/1884/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 100 / 100 | 0 | 89.5 | 242.8 | 0/2120/0/0 · 0/2120/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 82 / 118 | 0 | 80.5 | 196.1 | 0/1629/0/0 · 0/1689/0/0 |
| hard | Sir Champignon / Sprig | 200 | 166 / 34 | 0 | 79.3 | 193.3 | 0/1752/0/0 · 0/1758/0/0 |
| hard | Andromoss / Andromoss | 100 | 51 left-side wins | 0 | 76.4 | 216.6 | 0/1894/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 43 / 157 | 0 | 83.7 | 203.7 | 0/1884/0/0 · 0/1880/0/0 |
| hard | Andromoss / Duskmantle | 200 | 53 / 147 | 0 | 79.5 | 180.6 | 0/1527/0/0 · 0/1559/0/0 |
| hard | Andromoss / Sprig | 200 | 177 / 23 | 0 | 64.0 | 152.3 | 0/1481/0/0 · 0/1484/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 60 left-side wins | 0 | 89.5 | 242.8 | 0/2120/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 82 / 118 | 0 | 80.5 | 196.1 | 0/1629/0/0 · 0/1689/0/0 |
| hard | Captain Bramble / Sprig | 200 | 166 / 34 | 0 | 79.3 | 193.3 | 0/1752/0/0 · 0/1758/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 56 left-side wins | 0 | 78.3 | 180.1 | 0/1577/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 149 / 51 | 0 | 77.6 | 173.9 | 0/1524/0/0 · 0/1477/0/0 |
| hard | Sprig / Sprig | 100 | 57 left-side wins | 0 | 79.3 | 211.6 | 0/1853/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 392/800 (49.0%) | 0 | 0/2316/0/0 | 1, 3, 4 |
| easy | Andromoss | 372/800 (46.5%) | 0 | 0/2340/0/0 | 1, 3, 4 |
| easy | Captain Bramble | 392/800 (49.0%) | 0 | 0/2316/0/0 | 1, 3, 4 |
| easy | Duskmantle | 367/800 (45.9%) | 0 | 0/2281/0/0 | 1, 3, 4 |
| easy | Sprig | 477/800 (59.6%) | 0 | 0/2298/0/0 | 1, 3, 4 |
| medium | Sir Champignon | 442/800 (55.3%) | 0 | 0/5130/0/0 | 1, 3, 4 |
| medium | Andromoss | 340/800 (42.5%) | 0 | 0/5018/0/0 | 1, 3, 4 |
| medium | Captain Bramble | 442/800 (55.3%) | 0 | 0/5130/0/0 | 1, 3, 4 |
| medium | Duskmantle | 430/800 (53.8%) | 0 | 0/5124/0/0 | 1, 3, 4 |
| medium | Sprig | 346/800 (43.3%) | 0 | 0/5069/0/0 | 1, 3, 4 |
| hard | Sir Champignon | 505/800 (63.1%) | 0 | 0/9501/0/0 | 1, 3, 4 |
| hard | Andromoss | 316/800 (39.5%) | 0 | 0/8670/0/0 | 1, 3, 4 |
| hard | Captain Bramble | 505/800 (63.1%) | 0 | 0/9501/0/0 | 1, 3, 4 |
| hard | Duskmantle | 532/800 (66.5%) | 0 | 0/8038/0/0 | 1, 3, 4 |
| hard | Sprig | 142/800 (17.8%) | 0 | 0/8330/0/0 | 1, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 2.32 | 780.28 / 1597.78 | 36.73 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 2.37 | 770.82 / 1645.55 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Captain Bramble | 2.32 | 780.28 / 1597.78 | 36.73 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 2.31 | 771.04 / 1521.48 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 2.31 | 814.92 / 1421.69 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 5.14 | 1652.31 / 411.05 | 76.39 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 5.02 | 1607.30 / 475.26 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Captain Bramble | 5.14 | 1652.31 / 411.05 | 76.39 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 5.17 | 1628.47 / 421.88 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 4.99 | 1648.15 / 461.19 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 9.23 | 3205.88 / 146.50 | 122.58 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 8.47 | 2891.69 / 234.96 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Captain Bramble | 9.23 | 3205.88 / 146.50 | 122.58 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 8.08 | 2716.72 / 203.97 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 8.10 | 2797.47 / 298.64 | 0.00 | 0.00 / 0.00 | 0.00 |

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

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=2 --casting=immediate --cast-profile=baseline --report=tier2-guards-only --warning-ms=0 --two-star-guards=charges`.

Explicit reproduction:

`pnpm balance:roster --tier=2 --seeds=100 --seed=20261119 --casting=immediate --two-star-guards=charges --warning-ms=0 --report=tier2-guards-only`
