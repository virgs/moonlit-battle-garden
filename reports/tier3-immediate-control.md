# Five-character roster diagnostic

Isolated tier 3: 3-slot charge cap; only tier 3 can cast. Every bot casts on the first free tick when full/cooldown-ready, irrespective of usefulness. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-20T19:04:15.617Z. Revision 3524427 + working changes; config f9cd31f40944; simulation 8268bc2bb3c8d99e; base seed 20261119. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.0% | 🟨40.5% | 🟥37.2%* | 🟨50.0% |
| Andromoss | 🟨50.0% | — | 🟨45.2% | 🟨44.0% | 🟨50.0% |
| Captain Bramble | 🟨59.5% | 🟨54.8% | — | 🟨46.3%* | 🟨59.5% |
| Duskmantle | 🟩62.8%* | 🟨56.0% | 🟨53.7%* | — | 🟩62.8%* |
| Sprig | 🟨50.0% | 🟨50.0% | 🟨40.5% | 🟥37.2%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.0% | 🟨45.5% | 🟨46.5% | 🟨50.0% |
| Andromoss | 🟨50.0% | — | 🟨46.5% | 🟨49.0% | 🟨50.0% |
| Captain Bramble | 🟨54.5% | 🟨53.5% | — | 🟨55.0% | 🟨54.5% |
| Duskmantle | 🟨53.5% | 🟨51.0% | 🟨45.0% | — | 🟨53.5% |
| Sprig | 🟨50.0% | 🟨50.0% | 🟨45.5% | 🟨46.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.0% | 🟥38.5% | 🟥39.5% | 🟨50.0% |
| Andromoss | 🟨50.0% | — | 🟨43.0% | 🟨45.5% | 🟨50.0% |
| Captain Bramble | 🟩61.5% | 🟨57.0% | — | 🟨49.0% | 🟩61.5% |
| Duskmantle | 🟩60.5% | 🟨54.5% | 🟨51.0% | — | 🟩60.5% |
| Sprig | 🟨50.0% | 🟨50.0% | 🟥38.5% | 🟥39.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.0% | 🟥37.5% | 🟥25.5% | 🟨50.0% |
| Andromoss | 🟨50.0% | — | 🟨46.0% | 🟥37.5% | 🟨50.0% |
| Captain Bramble | 🟩62.5% | 🟨54.0% | — | 🟥35.0% | 🟩62.5% |
| Duskmantle | 🟩74.5% | 🟩62.5% | 🟩65.0% | — | 🟩74.5% |
| Sprig | 🟨50.0% | 🟨50.0% | 🟥37.5% | 🟥25.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Duskmantle: easy 46.5%, medium 39.5%, hard 25.5%; spread 21.0 points.
- Captain Bramble vs Duskmantle: easy 55.0%, medium 49.0%, hard 35.0%; spread 20.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 53.5%, medium 60.5%, hard 74.5%; spread 21.0 points.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 59 left-side wins | 0 | 46.5 | 147.0 | 0/0/238/0 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 100 / 100 | 0 | 46.5 | 145.5 | 0/0/166/0 · 0/0/302/0 |
| easy | Sir Champignon / Captain Bramble | 200 | 91 / 109 | 0 | 45.9 | 128.1 | 0/0/244/0 · 0/0/238/0 |
| easy | Sir Champignon / Duskmantle | 200 | 93 / 107 | 0 | 44.8 | 130.0 | 0/0/236/0 · 0/0/238/0 |
| easy | Sir Champignon / Sprig | 200 | 100 / 100 | 0 | 46.5 | 147.0 | 0/0/238/0 · 0/0/238/0 |
| easy | Andromoss / Andromoss | 100 | 59 left-side wins | 0 | 46.5 | 145.5 | 0/0/228/0 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 93 / 107 | 0 | 46.0 | 139.1 | 0/0/312/0 · 0/0/170/0 |
| easy | Andromoss / Duskmantle | 200 | 98 / 102 | 0 | 45.1 | 135.9 | 0/0/314/0 · 0/0/167/0 |
| easy | Andromoss / Sprig | 200 | 100 / 100 | 0 | 46.5 | 145.5 | 0/0/302/0 · 0/0/166/0 |
| easy | Captain Bramble / Captain Bramble | 100 | 60 left-side wins | 0 | 45.5 | 138.2 | 0/0/247/0 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 110 / 90 | 0 | 45.2 | 135.3 | 0/0/249/0 · 0/0/243/0 |
| easy | Captain Bramble / Sprig | 200 | 109 / 91 | 0 | 45.9 | 128.1 | 0/0/238/0 · 0/0/244/0 |
| easy | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 45.6 | 140.6 | 0/0/248/0 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 107 / 93 | 0 | 44.8 | 130.0 | 0/0/238/0 · 0/0/236/0 |
| easy | Sprig / Sprig | 100 | 59 left-side wins | 0 | 46.5 | 147.0 | 0/0/238/0 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 58 left-side wins | 0 | 56.3 | 153.3 | 0/0/603/0 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 100 / 100 | 0 | 56.3 | 153.2 | 0/0/352/0 · 0/0/834/0 |
| medium | Sir Champignon / Captain Bramble | 200 | 77 / 123 | 0 | 55.7 | 148.3 | 0/0/604/0 · 0/0/603/0 |
| medium | Sir Champignon / Duskmantle | 200 | 79 / 121 | 0 | 51.3 | 136.3 | 0/0/593/0 · 0/0/598/0 |
| medium | Sir Champignon / Sprig | 200 | 100 / 100 | 0 | 56.3 | 153.3 | 0/0/603/0 · 0/0/603/0 |
| medium | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 56.3 | 153.2 | 0/0/581/0 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 86 / 114 | 0 | 55.1 | 151.4 | 0/0/880/0 · 0/0/334/0 |
| medium | Andromoss / Duskmantle | 200 | 91 / 109 | 0 | 52.5 | 141.3 | 0/0/825/0 · 0/0/310/0 |
| medium | Andromoss / Sprig | 200 | 100 / 100 | 0 | 56.3 | 153.2 | 0/0/843/0 · 0/0/343/0 |
| medium | Captain Bramble / Captain Bramble | 100 | 49 left-side wins | 0 | 61.7 | 154.7 | 0/0/615/0 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 98 / 102 | 0 | 51.8 | 137.7 | 0/0/572/0 · 0/0/596/0 |
| medium | Captain Bramble / Sprig | 200 | 123 / 77 | 0 | 55.7 | 148.3 | 0/0/603/0 · 0/0/604/0 |
| medium | Duskmantle / Duskmantle | 100 | 54 left-side wins | 0 | 51.5 | 140.1 | 0/0/575/0 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 121 / 79 | 0 | 51.3 | 136.3 | 0/0/598/0 · 0/0/593/0 |
| medium | Sprig / Sprig | 100 | 58 left-side wins | 0 | 56.3 | 153.3 | 0/0/603/0 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 56 left-side wins | 0 | 82.7 | 205.9 | 0/0/1241/0 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 100 / 100 | 0 | 82.8 | 205.9 | 0/0/626/0 · 0/0/1828/0 |
| hard | Sir Champignon / Captain Bramble | 200 | 75 / 125 | 0 | 78.5 | 206.3 | 0/0/1189/0 · 0/0/1175/0 |
| hard | Sir Champignon / Duskmantle | 200 | 51 / 149 | 0 | 74.3 | 189.7 | 0/0/1093/0 · 0/0/1112/0 |
| hard | Sir Champignon / Sprig | 200 | 100 / 100 | 0 | 82.7 | 205.9 | 0/0/1241/0 · 0/0/1241/0 |
| hard | Andromoss / Andromoss | 100 | 56 left-side wins | 0 | 82.8 | 207.4 | 0/0/1214/0 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 92 / 108 | 0 | 78.8 | 201.9 | 0/0/1783/0 · 0/0/564/0 |
| hard | Andromoss / Duskmantle | 200 | 75 / 125 | 0 | 76.9 | 200.7 | 0/0/1743/0 · 0/0/542/0 |
| hard | Andromoss / Sprig | 200 | 100 / 100 | 0 | 82.8 | 205.9 | 0/0/1866/0 · 0/0/581/0 |
| hard | Captain Bramble / Captain Bramble | 100 | 58 left-side wins | 0 | 78.2 | 215.7 | 0/0/1280/0 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 70 / 130 | 0 | 77.8 | 206.2 | 0/0/1201/0 · 0/0/1220/0 |
| hard | Captain Bramble / Sprig | 200 | 125 / 75 | 0 | 78.5 | 206.3 | 0/0/1175/0 · 0/0/1189/0 |
| hard | Duskmantle / Duskmantle | 100 | 53 left-side wins | 0 | 74.9 | 192.5 | 0/0/1185/0 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 149 / 51 | 0 | 74.3 | 189.7 | 0/0/1112/0 · 0/0/1093/0 |
| hard | Sprig / Sprig | 100 | 56 left-side wins | 0 | 82.7 | 205.9 | 0/0/1241/0 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 384/800 (48.0%) | 0 | 0/0/1122/0 | 1, 2, 4 |
| easy | Andromoss | 391/800 (48.9%) | 0 | 0/0/1458/0 | 1, 2, 4 |
| easy | Captain Bramble | 435/800 (54.4%) | 0 | 0/0/1142/0 | 1, 2, 4 |
| easy | Duskmantle | 406/800 (50.7%) | 0 | 0/0/1134/0 | 1, 2, 4 |
| easy | Sprig | 384/800 (48.0%) | 0 | 0/0/1122/0 | 1, 2, 4 |
| medium | Sir Champignon | 356/800 (44.5%) | 0 | 0/0/2755/0 | 1, 2, 4 |
| medium | Andromoss | 377/800 (47.1%) | 0 | 0/0/3963/0 | 1, 2, 4 |
| medium | Captain Bramble | 458/800 (57.3%) | 0 | 0/0/2727/0 | 1, 2, 4 |
| medium | Duskmantle | 453/800 (56.6%) | 0 | 0/0/2677/0 | 1, 2, 4 |
| medium | Sprig | 356/800 (44.5%) | 0 | 0/0/2746/0 | 1, 2, 4 |
| hard | Sir Champignon | 326/800 (40.8%) | 0 | 0/0/5390/0 | 1, 2, 4 |
| hard | Andromoss | 367/800 (45.9%) | 0 | 0/0/8434/0 | 1, 2, 4 |
| hard | Captain Bramble | 428/800 (53.5%) | 0 | 0/0/5395/0 | 1, 2, 4 |
| hard | Duskmantle | 553/800 (69.1%) | 0 | 0/0/5171/0 | 1, 2, 4 |
| hard | Sprig | 326/800 (40.8%) | 0 | 0/0/5345/0 | 1, 2, 4 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 1.10 | 786.30 / 1767.97 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 1.54 | 790.51 / 1785.99 | 0.00 | 1.62 / 1.62 | 0.35 |
| easy | Captain Bramble | 1.12 | 789.44 / 1604.32 | 22.29 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 1.11 | 794.13 / 1621.73 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 1.10 | 786.30 / 1767.97 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 2.69 | 1680.45 / 507.46 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 4.23 | 1696.94 / 514.15 | 0.00 | 4.34 / 4.34 | 0.98 |
| medium | Captain Bramble | 2.64 | 1677.02 / 462.89 | 31.33 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 2.63 | 1666.67 / 473.10 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 2.68 | 1680.45 / 507.46 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 5.19 | 3356.77 / 260.41 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 9.03 | 3394.01 / 263.43 | 0.00 | 9.72 / 9.72 | 1.63 |
| hard | Captain Bramble | 5.14 | 3362.69 / 220.53 | 43.77 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 4.98 | 3290.75 / 248.46 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 5.13 | 3356.77 / 260.41 | 0.00 | 0.00 / 0.00 | 0.00 |

## Casting decisions

Distinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed benefit from the cast. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.

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

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=3 --casting=immediate --cast-profile=baseline --report=tier3-immediate-control`.
