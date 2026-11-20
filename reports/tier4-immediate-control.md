# Five-character roster diagnostic

Isolated tier 4: 4-slot charge cap; only tier 4 can cast. Every bot casts on the first free tick when full/cooldown-ready, irrespective of usefulness. Hit behavior still follows difficulty. Spell rules use the recorded configuration and tuning overrides.

Generated 2026-11-20T20:37:48.474Z. Revision 3a166ba + working changes; config f9cd31f40944; simulation 8dd135ec1165a444; base seed 20261119. Tuning overrides: {}. 7500 best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩64.3% | 🟨52.5%* | 🟩64.7% | 🟨59.3%* |
| Andromoss | 🟥35.7% | — | 🟥30.3%* | 🟨41.2%* | 🟨52.2%* |
| Captain Bramble | 🟨47.5%* | 🟩69.7%* | — | 🟩66.5%* | 🟨59.8%* |
| Duskmantle | 🟥35.3% | 🟨58.8%* | 🟥33.5%* | — | 🟨45.7%* |
| Sprig | 🟨40.7%* | 🟨47.8%* | 🟨40.2%* | 🟨54.3%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨56.5% | 🟨54.0% | 🟨58.5% | 🟨51.0% |
| Andromoss | 🟨43.5% | — | 🟨47.5% | 🟨52.0% | 🟨44.5% |
| Captain Bramble | 🟨46.0% | 🟨52.5% | — | 🟨55.5% | 🟨46.5% |
| Duskmantle | 🟨41.5% | 🟨48.0% | 🟨44.5% | — | 🟨42.5% |
| Sprig | 🟨49.0% | 🟨55.5% | 🟨53.5% | 🟨57.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.0% | 🟩60.5% | 🟩65.0% | 🟨55.0% |
| Andromoss | 🟥39.0% | — | 🟥33.0% | 🟨45.0% | 🟨50.0% |
| Captain Bramble | 🟥39.5% | 🟩67.0% | — | 🟩67.0% | 🟨54.5% |
| Duskmantle | 🟥35.0% | 🟨55.0% | 🟥33.0% | — | 🟥38.5% |
| Sprig | 🟨45.0% | 🟨50.0% | 🟨45.5% | 🟩61.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩75.5% | 🟨43.0% | 🟩70.5% | 🟩72.0% |
| Andromoss | 🟥24.5% | — | 🟥10.5% | 🟥26.5% | 🟩62.0% |
| Captain Bramble | 🟨57.0% | 🟩89.5% | — | 🟩77.0% | 🟩78.5% |
| Duskmantle | 🟥29.5% | 🟩73.5% | 🟥23.0% | — | 🟨56.0% |
| Sprig | 🟥28.0% | 🟥38.0% | 🟥21.5% | 🟨44.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 54.0%, medium 60.5%, hard 43.0%; spread 17.5 points; observed favored-side flip.
- Sir Champignon vs Sprig: easy 51.0%, medium 55.0%, hard 72.0%; spread 21.0 points.
- Andromoss vs Captain Bramble: easy 47.5%, medium 33.0%, hard 10.5%; spread 37.0 points.
- Andromoss vs Duskmantle: easy 52.0%, medium 45.0%, hard 26.5%; spread 25.5 points; observed favored-side flip.
- Andromoss vs Sprig: easy 44.5%, medium 50.0%, hard 62.0%; spread 17.5 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 55.5%, medium 67.0%, hard 77.0%; spread 21.5 points.
- Captain Bramble vs Sprig: easy 46.5%, medium 54.5%, hard 78.5%; spread 32.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 42.5%, medium 38.5%, hard 56.0%; spread 17.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.

## Per-difficulty diagnostic detail

| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |
|---|---|---:|---|---:|---:|---:|---|
| easy | Sir Champignon / Sir Champignon | 100 | 46 left-side wins | 0 | 43.1 | 112.8 | 0/0/0/104 · 0/0/0/0 |
| easy | Sir Champignon / Andromoss | 200 | 113 / 87 | 0 | 41.8 | 118.7 | 0/0/0/112 · 0/0/0/99 |
| easy | Sir Champignon / Captain Bramble | 200 | 108 / 92 | 0 | 42.1 | 113.6 | 0/0/0/106 · 0/0/0/102 |
| easy | Sir Champignon / Duskmantle | 200 | 117 / 83 | 0 | 43.0 | 112.8 | 0/0/0/111 · 0/0/0/101 |
| easy | Sir Champignon / Sprig | 200 | 102 / 98 | 0 | 42.0 | 109.9 | 0/0/0/102 · 0/0/0/95 |
| easy | Andromoss / Andromoss | 100 | 53 left-side wins | 0 | 42.1 | 130.9 | 0/0/0/105 · 0/0/0/0 |
| easy | Andromoss / Captain Bramble | 200 | 95 / 105 | 0 | 42.9 | 129.2 | 0/0/0/105 · 0/0/0/112 |
| easy | Andromoss / Duskmantle | 200 | 104 / 96 | 0 | 44.0 | 128.3 | 0/0/0/113 · 0/0/0/107 |
| easy | Andromoss / Sprig | 200 | 89 / 111 | 0 | 41.8 | 111.5 | 0/0/0/99 · 0/0/0/106 |
| easy | Captain Bramble / Captain Bramble | 100 | 54 left-side wins | 0 | 41.8 | 118.5 | 0/0/0/110 · 0/0/0/0 |
| easy | Captain Bramble / Duskmantle | 200 | 111 / 89 | 0 | 43.8 | 122.9 | 0/0/0/112 · 0/0/0/105 |
| easy | Captain Bramble / Sprig | 200 | 93 / 107 | 0 | 42.0 | 111.5 | 0/0/0/105 · 0/0/0/103 |
| easy | Duskmantle / Duskmantle | 100 | 56 left-side wins | 0 | 45.1 | 125.5 | 0/0/0/113 · 0/0/0/0 |
| easy | Duskmantle / Sprig | 200 | 85 / 115 | 0 | 42.2 | 110.2 | 0/0/0/102 · 0/0/0/103 |
| easy | Sprig / Sprig | 100 | 54 left-side wins | 0 | 41.2 | 104.9 | 0/0/0/91 · 0/0/0/0 |
| medium | Sir Champignon / Sir Champignon | 100 | 54 left-side wins | 0 | 51.9 | 141.7 | 0/0/0/387 · 0/0/0/0 |
| medium | Sir Champignon / Andromoss | 200 | 122 / 78 | 0 | 50.5 | 136.9 | 0/0/0/394 · 0/0/0/372 |
| medium | Sir Champignon / Captain Bramble | 200 | 121 / 79 | 0 | 49.3 | 128.1 | 0/0/0/366 · 0/0/0/366 |
| medium | Sir Champignon / Duskmantle | 200 | 130 / 70 | 0 | 50.5 | 133.4 | 0/0/0/393 · 0/0/0/371 |
| medium | Sir Champignon / Sprig | 200 | 110 / 90 | 0 | 51.9 | 134.3 | 0/0/0/380 · 0/0/0/378 |
| medium | Andromoss / Andromoss | 100 | 54 left-side wins | 0 | 51.3 | 140.4 | 0/0/0/391 · 0/0/0/0 |
| medium | Andromoss / Captain Bramble | 200 | 66 / 134 | 0 | 47.3 | 130.8 | 0/0/0/356 · 0/0/0/383 |
| medium | Andromoss / Duskmantle | 200 | 90 / 110 | 0 | 53.6 | 140.9 | 0/0/0/389 · 0/0/0/403 |
| medium | Andromoss / Sprig | 200 | 100 / 100 | 0 | 50.8 | 134.3 | 0/0/0/361 · 0/0/0/376 |
| medium | Captain Bramble / Captain Bramble | 100 | 60 left-side wins | 0 | 46.9 | 124.7 | 0/0/0/334 · 0/0/0/0 |
| medium | Captain Bramble / Duskmantle | 200 | 134 / 66 | 0 | 48.4 | 129.2 | 0/0/0/393 · 0/0/0/359 |
| medium | Captain Bramble / Sprig | 200 | 109 / 91 | 0 | 48.8 | 125.2 | 0/0/0/377 · 0/0/0/355 |
| medium | Duskmantle / Duskmantle | 100 | 59 left-side wins | 0 | 53.3 | 150.4 | 0/0/0/416 · 0/0/0/0 |
| medium | Duskmantle / Sprig | 200 | 77 / 123 | 0 | 52.2 | 134.1 | 0/0/0/391 · 0/0/0/401 |
| medium | Sprig / Sprig | 100 | 53 left-side wins | 0 | 52.3 | 138.2 | 0/0/0/386 · 0/0/0/0 |
| hard | Sir Champignon / Sir Champignon | 100 | 54 left-side wins | 0 | 81.9 | 228.7 | 0/0/0/926 · 0/0/0/0 |
| hard | Sir Champignon / Andromoss | 200 | 151 / 49 | 0 | 70.3 | 178.8 | 0/0/0/730 · 0/0/0/739 |
| hard | Sir Champignon / Captain Bramble | 200 | 86 / 114 | 0 | 73.3 | 191.3 | 0/0/0/763 · 0/0/0/803 |
| hard | Sir Champignon / Duskmantle | 200 | 141 / 59 | 0 | 75.2 | 192.8 | 0/0/0/832 · 0/0/0/841 |
| hard | Sir Champignon / Sprig | 200 | 144 / 56 | 0 | 73.7 | 188.1 | 0/0/0/783 · 0/0/0/787 |
| hard | Andromoss / Andromoss | 100 | 58 left-side wins | 0 | 70.5 | 190.1 | 0/0/0/790 · 0/0/0/0 |
| hard | Andromoss / Captain Bramble | 200 | 21 / 179 | 0 | 65.3 | 148.8 | 0/0/0/606 · 0/0/0/626 |
| hard | Andromoss / Duskmantle | 200 | 53 / 147 | 0 | 71.8 | 182.2 | 0/0/0/792 · 0/0/0/772 |
| hard | Andromoss / Sprig | 200 | 124 / 76 | 0 | 69.9 | 179.4 | 0/0/0/785 · 0/0/0/775 |
| hard | Captain Bramble / Captain Bramble | 100 | 52 left-side wins | 0 | 68.8 | 183.8 | 0/0/0/725 · 0/0/0/0 |
| hard | Captain Bramble / Duskmantle | 200 | 154 / 46 | 0 | 72.3 | 172.3 | 0/0/0/717 · 0/0/0/694 |
| hard | Captain Bramble / Sprig | 200 | 157 / 43 | 0 | 70.8 | 166.0 | 0/0/0/686 · 0/0/0/661 |
| hard | Duskmantle / Duskmantle | 100 | 53 left-side wins | 0 | 73.8 | 197.9 | 0/0/0/868 · 0/0/0/0 |
| hard | Duskmantle / Sprig | 200 | 112 / 88 | 0 | 73.5 | 178.4 | 0/0/0/811 · 0/0/0/816 |
| hard | Sprig / Sprig | 100 | 54 left-side wins | 0 | 73.5 | 200.5 | 0/0/0/809 · 0/0/0/0 |

## Aggregate and coverage

Mirrors excluded from win rates; all battles included in tier coverage.

| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |
|---|---|---:|---:|---|---|
| easy | Sir Champignon | 440/800 (55.0%) | 0 | 0/0/0/535 | 1, 2, 3 |
| easy | Andromoss | 375/800 (46.9%) | 0 | 0/0/0/521 | 1, 2, 3 |
| easy | Captain Bramble | 401/800 (50.1%) | 0 | 0/0/0/541 | 1, 2, 3 |
| easy | Duskmantle | 353/800 (44.1%) | 0 | 0/0/0/528 | 1, 2, 3 |
| easy | Sprig | 431/800 (53.9%) | 0 | 0/0/0/498 | 1, 2, 3 |
| medium | Sir Champignon | 483/800 (60.4%) | 0 | 0/0/0/1920 | 1, 2, 3 |
| medium | Andromoss | 334/800 (41.8%) | 0 | 0/0/0/1869 | 1, 2, 3 |
| medium | Captain Bramble | 456/800 (57.0%) | 0 | 0/0/0/1853 | 1, 2, 3 |
| medium | Duskmantle | 323/800 (40.4%) | 0 | 0/0/0/1940 | 1, 2, 3 |
| medium | Sprig | 404/800 (50.5%) | 0 | 0/0/0/1896 | 1, 2, 3 |
| hard | Sir Champignon | 522/800 (65.3%) | 0 | 0/0/0/4034 | 1, 2, 3 |
| hard | Andromoss | 247/800 (30.9%) | 0 | 0/0/0/3712 | 1, 2, 3 |
| hard | Captain Bramble | 604/800 (75.5%) | 0 | 0/0/0/3557 | 1, 2, 3 |
| hard | Duskmantle | 364/800 (45.5%) | 0 | 0/0/0/3986 | 1, 2, 3 |
| hard | Sprig | 263/800 (32.9%) | 0 | 0/0/0/3848 | 1, 2, 3 |

## Observed impact per match

Distinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.

| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |
|---|---|---:|---:|---:|---:|---:|
| easy | Sir Champignon | 0.54 | 783.03 / 1192.51 | 11.34 | 0.00 / 0.00 | 0.00 |
| easy | Andromoss | 0.52 | 773.46 / 1435.13 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Captain Bramble | 0.54 | 773.69 / 1329.31 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Duskmantle | 0.52 | 769.55 / 1380.83 | 0.00 | 0.00 / 0.00 | 0.00 |
| easy | Sprig | 0.51 | 782.97 / 1177.68 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sir Champignon | 1.92 | 1613.42 / 409.29 | 46.84 | 0.00 / 0.00 | 0.00 |
| medium | Andromoss | 1.85 | 1583.57 / 455.49 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Captain Bramble | 1.90 | 1551.84 / 437.68 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Duskmantle | 1.91 | 1618.33 / 481.21 | 0.00 | 0.00 / 0.00 | 0.00 |
| medium | Sprig | 1.89 | 1625.02 / 450.36 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sir Champignon | 3.88 | 3135.03 / 216.83 | 90.65 | 0.00 / 0.00 | 0.00 |
| hard | Andromoss | 3.65 | 2783.34 / 224.04 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Captain Bramble | 3.54 | 2688.72 / 205.47 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Duskmantle | 3.90 | 3074.54 / 257.46 | 0.00 | 0.00 / 0.00 | 0.00 |
| hard | Sprig | 3.80 | 3019.90 / 325.61 | 0.00 | 0.00 / 0.00 | 0.00 |

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

Reproduce: `pnpm balance:roster --seeds=100 --seed=20261119 --tier=4 --casting=immediate --cast-profile=baseline --report=tier4-immediate-control`.
