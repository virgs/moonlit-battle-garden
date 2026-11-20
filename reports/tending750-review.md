# Gentle Tending +750 ms and separate theft-cap experiment

## Current spells

| Hero | One-star spell | Previous → current |
|---|---|---|
| Sir Champignon | Clean Sweep | Unchanged: initial hit and continuous arrivals in busiest fixed column / 3 s; normal rewards and rabbit penalties |
| Andromoss | Borrowed Spark | Unchanged live: steals all enemy charge, capacity capped, after 650 ms hostile warning following cast freeze; empty meter wasted. Cap3 remains an experiment. |
| Captain Bramble | Tin Caps | Unchanged: three moles / 3 s / one extra hit each |
| Duskmantle | Ominous Bud | Unchanged: three marks / 8 s / +8 miss penalty (16 total) |
| Sprig | Gentle Tending | +0.5→+0.75 s once per current/arriving target; aura stays 6 s, includes stars/rabbits, no repeat stacking |

Only the extension changes in live play. No bot, pacing, point or other spell changes. Flat observed coverage counters do not influence rules, RNG or decisions.

## Method

Three 7,500-match isolated tier-1 runs: 500 ms control, 750 ms trial and adopted-default verification (22,500). Control reproduces every previous outcome (compare excluding the newly added statistics fields); adopted defaults reproduce all 7,500 trial records including statistics. Source/config hashes differ across adoption because an explicitly default-four theft-cap tuning parameter was added for the separate experiment; outcomes exactly match.

Two separate 7,500-match normal four-slot/full-kit runs compare theft caps4/3 with extension750 held fixed. Total **37,500 matches**, zero unfinished. Each run uses 100 paired seeds, 200 games per distinct matchup per difficulty and 100 mirrors per hero/difficulty; real simulation/bots. Full-kit tests retain the existing normal bot policy, distinct from isolated opportunity casting.

## Current isolated one-star matrices

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


## Sprig versus change

| Opponent | Previous +500 ms | Adopted +750 ms |
|---|---:|---:|
| champignon | 40.0% | 42.3% |
| andromoss | 58.2% | 56.8% |
| captain-bramble | 42.2% | 43.3% |
| duskmantle | 56.7% | 57.5% |

## Observed Tending coverage

Distinct-opponent matches only. Hits/removals versus expiries among extended targets resolved before round/match end; unresolved targets discarded by round end are excluded. Rabbit hits are penalties, not successful benefits. “Extra-time hits” occur at/after original expiry, before extended expiry; these are observations, not a causal estimate of extra points: extending targets also changes future board occupancy and decisions.

| AI | Bonus | Mole hit / resolved | Star hit / resolved | Rabbit hit / resolved | Mole hits in extra time | Star hits in extra time | Rabbit hits in extra time |
|---|---|---:|---:|---:|---:|---:|---:|
| easy | +0.5 s | 16668/28044 (59.4%) | 1481/2278 (65.0%) | 625/3979 (15.7%) | 4567 | 286 | 186 |
| medium | +0.5 s | 45936/57665 (79.7%) | 3135/3661 (85.6%) | 521/9000 (5.8%) | 7389 | 243 | 101 |
| hard | +0.5 s | 111782/126857 (88.1%) | 4893/5354 (91.4%) | 472/22014 (2.1%) | 6759 | 121 | 31 |
| easy | +0.75 s | 16729/27695 (60.4%) | 1602/2319 (69.1%) | 609/3884 (15.7%) | 5189 | 354 | 208 |
| medium | +0.75 s | 45279/56087 (80.7%) | 3138/3620 (86.7%) | 533/8662 (6.2%) | 7836 | 272 | 115 |
| hard | +0.75 s | 112447/127102 (88.5%) | 4908/5352 (91.7%) | 468/21962 (2.1%) | 8271 | 140 | 39 |

## Separate full-meter theft experiment (not adopted)

Compare cap4/cap3 with Sprig750 identical in both. 2/7,500 battle records differ outside statistics; 1/7,500 winners differ. This policy shows little sensitivity to the cap, and does not establish that four-star theft is safe against humans. The matrix reflects every spell and normal cast choices, not isolated Borrowed Spark strength.

| Andromoss against | Cap4 | Cap3 |
|---|---:|---:|
| champignon | 22.7% | 22.7% |
| captain-bramble | 37.5% | 37.5% |
| duskmantle | 42.7% | 42.8% |
| sprig | 44.0% | 44.0% |

Full-kit pooled/per-level matrices: [cap4 control](theft-full-meter-control.md), [experimental cap3](theft-full-meter-cap3.md). Keep these distinct from current one-star results.

## Findings and limits

The extension buff is modest and mixed by matchup, not a universal improvement; Andromoss slightly improves against Sprig. Existing target accuracy skips and urgency-based cast conditions influence coverage. Bramble is still strongest on Hard and Andromoss remains behind; do not tune solely toward 50% bot wins. Per-level spreads/flips are descriptive rather than significance claims; human and full-kit playtests still needed.

## Reproduction

- [tending750-control](tending750-control.md), [data](tending750-control.json): `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --extension-ms=500 --report=tending750-control`
- [tending750-trial](tending750-trial.md), [data](tending750-trial.json): `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --extension-ms=750 --report=tending750-trial`
- [balance-tier-1](balance-tier-1.md), [data](balance-tier-1.json): `pnpm balance:roster --seeds=100 --seed=20261119 --tier=1 --extension-ms=750 --report=balance-tier-1`
- [theft-full-meter-control](theft-full-meter-control.md), [data](theft-full-meter-control.json): `pnpm balance:roster --seeds=100 --seed=20261119 --extension-ms=750 --theft-cap=4 --report=theft-full-meter-control`
- [theft-full-meter-cap3](theft-full-meter-cap3.md), [data](theft-full-meter-cap3.json): `pnpm balance:roster --seeds=100 --seed=20261119 --extension-ms=750 --theft-cap=3 --report=theft-full-meter-cap3`

Validation: 169 simulation tests, production build and 8 desktop/mobile browser checks passed, including aura duration/pause and online synchronization.
