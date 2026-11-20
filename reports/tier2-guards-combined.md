# Five-character roster diagnostic

Isolated tier 2: 2-slot charge cap; only tier 2 can cast. Every bot waits for a useful visible opportunity, then a 200–400ms base random delay, multiplied by {"easy":3,"medium":2,"hard":1} for difficulty (profile scaled), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Guard unguarded own mole near escape; Tines useful/urgent selected column, no active automation refresh; Riot/Veil visible enemy mole/star, no active effect refresh or casting into wards. On-board target visibility 100ms (theft watches enemy charge directly); urgent means at most 1000ms remaining. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-20T03:20:30.731Z. Revision 80754e2 + working changes; config c8543e5d6a4c; simulation 4cb2da04504f5860; base seed 20261119. Tuning overrides: {"twoStarGuardMode":"charges","warningMs":0}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩63.8%* | 🟨50.0% | 🟨43.3% | 🟨53.5%* |
| Andromoss | 🟥36.2%* | — | 🟥36.2%* | 🟥33.7% | 🟨52.2%* |
| Captain Bramble | 🟨50.0% | 🟩63.8%* | — | 🟨43.3% | 🟨53.5%* |
| Duskmantle | 🟨56.7% | 🟩66.3% | 🟨56.7% | — | 🟨49.3%* |
| Sprig | 🟨46.5%* | 🟨47.8%* | 🟨46.5%* | 🟨50.7%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨52.0% | 🟨50.0% | 🟨50.0% | 🟥34.5% |
| Andromoss | 🟨48.0% | — | 🟨48.0% | 🟨42.5% | 🟨42.5% |
| Captain Bramble | 🟨50.0% | 🟨52.0% | — | 🟨50.0% | 🟥34.5% |
| Duskmantle | 🟨50.0% | 🟨57.5% | 🟨50.0% | — | 🟥29.5% |
| Sprig | 🟩65.5% | 🟨57.5% | 🟩65.5% | 🟩70.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩64.0% | 🟨50.0% | 🟨41.0% | 🟨52.5% |
| Andromoss | 🟥36.0% | — | 🟥36.0% | 🟥36.0% | 🟨48.0% |
| Captain Bramble | 🟨50.0% | 🟩64.0% | — | 🟨41.0% | 🟨52.5% |
| Duskmantle | 🟨59.0% | 🟩64.0% | 🟨59.0% | — | 🟨46.0% |
| Sprig | 🟨47.5% | 🟨52.0% | 🟨47.5% | 🟨54.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩75.5% | 🟨50.0% | 🟥39.0% | 🟩73.5% |
| Andromoss | 🟥24.5% | — | 🟥24.5% | 🟥22.5% | 🟩66.0% |
| Captain Bramble | 🟨50.0% | 🟩75.5% | — | 🟥39.0% | 🟩73.5% |
| Duskmantle | 🟩61.0% | 🟩77.5% | 🟩61.0% | — | 🟩72.5% |
| Sprig | 🟥26.5% | 🟥34.0% | 🟥26.5% | 🟥27.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 52.0%, medium 64.0%, hard 75.5%; spread 23.5 points.
- Sir Champignon vs Sprig: easy 34.5%, medium 52.5%, hard 73.5%; spread 39.0 points; observed favored-side flip.
- Andromoss vs Captain Bramble: easy 48.0%, medium 36.0%, hard 24.5%; spread 23.5 points.
- Andromoss vs Sprig: easy 42.5%, medium 48.0%, hard 66.0%; spread 23.5 points; observed favored-side flip.
- Captain Bramble vs Sprig: easy 34.5%, medium 52.5%, hard 73.5%; spread 39.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 29.5%, medium 46.0%, hard 72.5%; spread 43.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 56 left-side wins | 0 | 45.6 | 140.7 | 0/415/0/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 104 / 96 | 0 | 46.0 | 149.1 | 0/403/0/0 · 0/430/0/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 100 / 100 | 0 | 45.6 | 140.7 | 0/415/0/0 · 0/415/0/0 |
| easy | Sir Champignon / Duskmantle | 200 | 100 / 100 | 0 | 46.1 | 130.6 | 0/396/0/0 · 0/422/0/0 |
| easy | Sir Champignon / Sprig | 200 | 69 / 131 | 0 | 45.1 | 124.1 | 0/383/0/0 · 0/445/0/0 |
| easy | Andromoss / Andromoss | 100 | 57 left-side wins | 0 | 45.4 | 144.7 | 0/431/0/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 96 / 104 | 0 | 46.0 | 149.1 | 0/430/0/0 · 0/403/0/0 |
| easy | Andromoss / Duskmantle | 200 | 85 / 115 | 0 | 47.2 | 136.0 | 0/432/0/0 · 0/442/0/0 |
| easy | Andromoss / Sprig | 200 | 85 / 115 | 0 | 43.9 | 128.1 | 0/415/0/0 · 0/428/0/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 56 left-side wins | 0 | 45.6 | 140.7 | 0/415/0/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 100 / 100 | 0 | 46.1 | 130.6 | 0/396/0/0 · 0/422/0/0 |
| easy | Captain Bramble / Sprig | 200 | 69 / 131 | 0 | 45.1 | 124.1 | 0/383/0/0 · 0/445/0/0 |
| easy | Duskmantle / Duskmantle | 100 | 55 left-side wins | 0 | 46.2 | 150.4 | 0/438/0/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 59 / 141 | 0 | 43.9 | 122.9 | 0/428/0/0 · 0/444/0/0 |
| easy | Sprig / Sprig | 100 | 60 left-side wins | 0 | 44.3 | 122.3 | 0/444/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 47 left-side wins | 0 | 57.2 | 146.2 | 0/964/0/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 128 / 72 | 0 | 57.5 | 155.9 | 0/968/0/0 · 0/1060/0/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 100 / 100 | 0 | 57.2 | 146.2 | 0/964/0/0 · 0/964/0/0 |
| medium | Sir Champignon / Duskmantle | 200 | 82 / 118 | 0 | 56.7 | 148.5 | 0/905/0/0 · 0/998/0/0 |
| medium | Sir Champignon / Sprig | 200 | 105 / 95 | 0 | 55.7 | 154.2 | 0/970/0/0 · 0/1045/0/0 |
| medium | Andromoss / Andromoss | 100 | 55 left-side wins | 0 | 56.6 | 152.2 | 0/979/0/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 72 / 128 | 0 | 57.5 | 155.9 | 0/1060/0/0 · 0/968/0/0 |
| medium | Andromoss / Duskmantle | 200 | 72 / 128 | 0 | 56.8 | 148.9 | 0/966/0/0 · 0/988/0/0 |
| medium | Andromoss / Sprig | 200 | 96 / 104 | 0 | 53.0 | 141.1 | 0/904/0/0 · 0/928/0/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 47 left-side wins | 0 | 57.2 | 146.2 | 0/964/0/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 82 / 118 | 0 | 56.7 | 148.5 | 0/905/0/0 · 0/998/0/0 |
| medium | Captain Bramble / Sprig | 200 | 105 / 95 | 0 | 55.7 | 154.2 | 0/970/0/0 · 0/1045/0/0 |
| medium | Duskmantle / Duskmantle | 100 | 47 left-side wins | 0 | 57.1 | 152.3 | 0/972/0/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 92 / 108 | 0 | 53.3 | 140.8 | 0/964/0/0 · 0/952/0/0 |
| medium | Sprig / Sprig | 100 | 61 left-side wins | 0 | 57.3 | 138.3 | 0/965/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 52 left-side wins | 0 | 85.5 | 223.2 | 0/1828/0/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 151 / 49 | 0 | 80.8 | 218.3 | 0/1742/0/0 · 0/1873/0/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 100 / 100 | 0 | 85.5 | 223.2 | 0/1828/0/0 · 0/1828/0/0 |
| hard | Sir Champignon / Duskmantle | 200 | 78 / 122 | 0 | 79.4 | 186.7 | 0/1473/0/0 · 0/1642/0/0 |
| hard | Sir Champignon / Sprig | 200 | 147 / 53 | 0 | 82.0 | 208.1 | 0/1697/0/0 · 0/1882/0/0 |
| hard | Andromoss / Andromoss | 100 | 53 left-side wins | 0 | 79.9 | 214.7 | 0/1834/0/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 49 / 151 | 0 | 80.8 | 218.3 | 0/1873/0/0 · 0/1742/0/0 |
| hard | Andromoss / Duskmantle | 200 | 45 / 155 | 0 | 77.1 | 175.6 | 0/1429/0/0 · 0/1488/0/0 |
| hard | Andromoss / Sprig | 200 | 132 / 68 | 0 | 73.6 | 184.7 | 0/1590/0/0 · 0/1596/0/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 52 left-side wins | 0 | 85.5 | 223.2 | 0/1828/0/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 78 / 122 | 0 | 79.4 | 186.7 | 0/1473/0/0 · 0/1642/0/0 |
| hard | Captain Bramble / Sprig | 200 | 147 / 53 | 0 | 82.0 | 208.1 | 0/1697/0/0 · 0/1882/0/0 |
| hard | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 75.8 | 175.9 | 0/1484/0/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 145 / 55 | 0 | 75.4 | 181.6 | 0/1485/0/0 · 0/1481/0/0 |
| hard | Sprig / Sprig | 100 | 59 left-side wins | 0 | 77.8 | 186.2 | 0/1750/0/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 373/800 (46.6%) | 0 | 0/2012/0/0 | 1, 3, 4 |
| easy | Andromoss | 362/800 (45.3%) | 0 | 0/2138/0/0 | 1, 3, 4 |
| easy | Captain Bramble | 373/800 (46.6%) | 0 | 0/2012/0/0 | 1, 3, 4 |
| easy | Duskmantle | 374/800 (46.8%) | 0 | 0/2152/0/0 | 1, 3, 4 |
| easy | Sprig | 518/800 (64.8%) | 0 | 0/2206/0/0 | 1, 3, 4 |
| medium | Sir Champignon | 415/800 (51.9%) | 0 | 0/4771/0/0 | 1, 3, 4 |
| medium | Andromoss | 312/800 (39.0%) | 0 | 0/4969/0/0 | 1, 3, 4 |
| medium | Captain Bramble | 415/800 (51.9%) | 0 | 0/4771/0/0 | 1, 3, 4 |
| medium | Duskmantle | 456/800 (57.0%) | 0 | 0/4920/0/0 | 1, 3, 4 |
| medium | Sprig | 402/800 (50.2%) | 0 | 0/4935/0/0 | 1, 3, 4 |
| hard | Sir Champignon | 476/800 (59.5%) | 0 | 0/8568/0/0 | 1, 3, 4 |
| hard | Andromoss | 275/800 (34.4%) | 0 | 0/8599/0/0 | 1, 3, 4 |
| hard | Captain Bramble | 476/800 (59.5%) | 0 | 0/8568/0/0 | 1, 3, 4 |
| hard | Duskmantle | 544/800 (68.0%) | 0 | 0/7741/0/0 | 1, 3, 4 |
| hard | Sprig | 229/800 (28.6%) | 0 | 0/8591/0/0 | 1, 3, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 2.00 | 774.64 / 1692.13 | 31.57 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 2.13 | 774.11 / 1700.15 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Captain Bramble | 2.00 | 774.64 / 1692.13 | 31.57 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 2.14 | 781.79 / 1491.45 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 2.20 | 811.40 / 1453.41 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 4.76 | 1691.94 / 445.02 | 73.81 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 4.99 | 1655.09 / 486.59 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Captain Bramble | 4.76 | 1691.94 / 445.02 | 73.81 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 4.93 | 1635.87 / 416.74 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 4.96 | 1690.83 / 469.87 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 8.43 | 3263.39 / 148.71 | 126.86 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 8.46 | 3030.32 / 245.19 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Captain Bramble | 8.43 | 3263.39 / 148.71 | 126.86 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 7.82 | 2707.43 / 203.53 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 8.55 | 3055.43 / 296.63 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed useful after hostile warning. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 21.60 | 90.4% | 1597 / 69 | 901 | 5310 / 0 |
| easy | Andromoss | 24.20 | 90.9% | 1707 / 52 | 902 | 9113 / 0 |
| easy | Captain Bramble | 21.60 | 90.4% | 1597 / 69 | 901 | 5310 / 0 |
| easy | Duskmantle | 17.21 | 87.1% | 1714 / 64 | 904 | 3613 / 0 |
| easy | Sprig | 18.67 | 87.9% | 1762 / 47 | 902 | 5258 / 0 |
| medium | Sir Champignon | 25.27 | 80.8% | 3807 / 68 | 602 | 3727 / 311 |
| medium | Andromoss | 23.32 | 78.2% | 3990 / 71 | 602 | 3867 / 291 |
| medium | Captain Bramble | 25.27 | 80.8% | 3807 / 68 | 602 | 3727 / 311 |
| medium | Duskmantle | 22.70 | 78.0% | 3948 / 49 | 600 | 3030 / 214 |
| medium | Sprig | 22.87 | 78.0% | 3970 / 53 | 603 | 2961 / 304 |
| hard | Sir Champignon | 26.74 | 68.3% | 6740 / 36 | 301 | 8597 / 2587 |
| hard | Andromoss | 34.42 | 75.3% | 6765 / 35 | 301 | 9458 / 2174 |
| hard | Captain Bramble | 26.74 | 68.3% | 6740 / 36 | 301 | 8597 / 2587 |
| hard | Duskmantle | 31.42 | 75.0% | 6257 / 23 | 300 | 6695 / 1624 |
| hard | Sprig | 30.37 | 71.7% | 6841 / 32 | 301 | 8773 / 2226 |

Provisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance. Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=2 --casting=opportunity --cast-profile=scaled --report=tier2-guards-combined --warning-ms=0 --two-star-guards=charges`.

Explicit reproduction:

`pnpm balance:roster --tier=2 --seeds=100 --seed=20261119 --casting=opportunity --two-star-guards=charges --warning-ms=0 --report=tier2-guards-combined`
