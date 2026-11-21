# Simplified five-hero kits (D140/D141)

## Current spell matrix

| Hero | 1★ | 2★ | 3★ | 4★ |
|---|---|---|---|---|
| Champignon | Block2 mistakes; no expiry | Busiest column continuous3 s | Block5 mistakes; no expiry | Busiest column continuous6 s |
| Andromoss | Enemy rabbit every1 s/8 s | New enemy moles85% lifetime/8 s | Instant all enemy stars, capacity capped | Enemy rabbit every0.75 s +85% new-mole lifetime/8 s |
| Bramble | Block2 mistakes; no expiry | Next3 enemy moles/+1 hit; no expiry | Block5 mistakes; no expiry | Next3 enemy moles/+2 hits; no expiry |
| Duskmantle | Next3 enemy moles/+8 miss penalty; no expiry | Dim enemy targets6 s; AI+200 ms reaction | Manual mole kills+2 points/7 s | Next6 enemy moles/+6 miss penalty; no expiry |
| Sprig | Current/new own targets+750 ms once;6 s aura | Busiest column continuous4 s | Cleanse, then one-spell ward6 s | Two busiest columns continuous4 s |

Automatic hits collect stars and apply normal rewards/rabbit penalties; one armor strike per50 ms tick, with rewards only on elimination. Columns are chosen once per cast. All continuous powers hit immediately and include birth-tick arrivals; exact end boundary exclusive. Shared1.5 s casting freeze, no hostile warning.

## Changed powers: before → after

| Hero/cost | Previous | Current |
|---|---|---|
| Champignon3★ | One-spell ward/12 s | Five mistake blocks/no expiry |
| Champignon4★ | All-board initial hit +250 ms pulses/3 s, plus3 mistake blocks/12 s | One column immediate/continuous6 s; no added guards |
| Bramble3★ | Three mistake blocks/8 s | Five mistake blocks/no expiry |
| Bramble4★ | Four current/future moles/+2 hits/3 s | Next3 moles/+2 hits/no expiry |
| Duskmantle1★ | Three current/future moles/+8 miss penalty/8 s | Next3 moles/+8/no expiry |
| Duskmantle2★ | Dimming6.5 s | Dimming6 s, same+200 ms bot reaction |
| Duskmantle4★ | Four current/future moles/+6 miss penalty/8 s | Next6 moles/+6/no expiry |
| Sprig2★ | Continuous one column10 s | Continuous one column4 s |
| Sprig4★ | Two columns, one target per250 ms/8 s | Two columns immediate/continuous4 s |

Other powers retain D139. Future quotas ignore existing targets/stars/rabbits, survive pauses/casts, and clear on cleanse/round reset. Recasts refresh/replace pending quota rather than stack; live targets retain assigned modifiers. Lower-cost Bramble armor does not downgrade outstanding heavy quota. Guards use finite permanent flags/charges and refresh without stacking. Cleanse keeps positive guards/Tending. Only Sprig3★ now grants a spell ward.

## Diagnostics and strategy limits

49,500 actual-simulation games, zero unfinished: four same-tier rosters plus normal full-kit (7,500 each), and12,000 fixed-enemy selected-tier games. Each distinct pair uses100 paired seeds with side swaps per difficulty; roster mirrors100/hero/level. Roster base seed20261118, fixed-enemy20261119. Baseline raw data at Git e9faf67. Previous tier2/3 reports use different base seed20261119, so this review makes no causal before→after rate comparison for those. Previous fixed opponents had different abilities; new fixed-enemy matrix is a current-build snapshot, not a single-factor interval comparison.

Opportunity casting remains100 ms visibility plus seeded200–400 ms decision delay×3/2/1 by difficulty. Champignon3★ now shares Bramble3★ urgent-own-mole guard behavior; Champignon4★ examines the actual busiest column rather than the whole board. Cleanse detects permanent pending/live hostile effects. No hit timing, accuracy or character-specific weights were tuned. Human testing and full-kit strategy remain provisional. Isolated theft receives at most its three-slot capacity while ordinary play can receive4; fixed-cost rows do not measure optimal full-kit/per-star value. Sprig’s tier3 cleanse has limited coverage against self-buff-only opponents.

## Significant findings

Normal full-kit Champignon wins all four matchups at every difficulty in this bot snapshot. Against Bramble the rates are51.5/56.5/57.0% (Easy/Medium/Hard), so the Easy margin is close; versus Andromoss56.5/72/85.5%, Duskmantle66/75.5/81.5%, Sprig63.5/71/85.5%. This is observed dominance under the current full-kit bot choices, not proof for human play or statistical certainty at every margin. Do not silently tune beyond the requested matrix.

Four-star-only Champignon loses to Andromoss/Bramble on Medium/Hard, Duskmantle on Hard and Sprig on Hard; it is not universally strongest at that tier. Champignon3★/Bramble3★ have identical effects and isolated opportunities, and their paired head-to-head is exactly50% at all levels. Cross-tier resource costs, cast coverage and generic full-kit priorities still matter; the per-level matrices/flags below are required context.

## Normal full-kit: pooled and per-level versus matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩71.3%* | 🟨55.0% | 🟩74.3% | 🟩73.3%* |
| Andromoss | 🟥28.7%* | — | 🟥34.5%* | 🟨49.7%* | 🟨51.7%* |
| Captain Bramble | 🟨45.0% | 🟩65.5%* | — | 🟩67.8% | 🟩67.5%* |
| Duskmantle | 🟥25.7% | 🟨50.3%* | 🟥32.2% | — | 🟨50.2%* |
| Sprig | 🟥26.7%* | 🟨48.3%* | 🟥32.5%* | 🟨49.8%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨56.5% | 🟨51.5% | 🟩66.0% | 🟩63.5% |
| Andromoss | 🟨43.5% | — | 🟨41.0% | 🟨53.5% | 🟨53.0% |
| Captain Bramble | 🟨48.5% | 🟨59.0% | — | 🟩61.5% | 🟨56.0% |
| Duskmantle | 🟥34.0% | 🟨46.5% | 🟥38.5% | — | 🟨45.0% |
| Sprig | 🟥36.5% | 🟨47.0% | 🟨44.0% | 🟨55.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩72.0% | 🟨56.5% | 🟩75.5% | 🟩71.0% |
| Andromoss | 🟥28.0% | — | 🟨43.0% | 🟨51.5% | 🟨52.5% |
| Captain Bramble | 🟨43.5% | 🟨57.0% | — | 🟩71.0% | 🟩67.0% |
| Duskmantle | 🟥24.5% | 🟨48.5% | 🟥29.0% | — | 🟨49.0% |
| Sprig | 🟥29.0% | 🟨47.5% | 🟥33.0% | 🟨51.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩85.5% | 🟨57.0% | 🟩81.5% | 🟩85.5% |
| Andromoss | 🟥14.5% | — | 🟥19.5% | 🟨44.0% | 🟨49.5% |
| Captain Bramble | 🟨43.0% | 🟩80.5% | — | 🟩71.0% | 🟩79.5% |
| Duskmantle | 🟥18.5% | 🟨56.0% | 🟥29.0% | — | 🟨56.5% |
| Sprig | 🟥14.5% | 🟨50.5% | 🟥20.5% | 🟨43.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 56.5%, medium 72.0%, hard 85.5%; spread 29.0 points.
- Sir Champignon vs Sprig: easy 63.5%, medium 71.0%, hard 85.5%; spread 22.0 points.
- Andromoss vs Captain Bramble: easy 41.0%, medium 43.0%, hard 19.5%; spread 23.5 points.
- Andromoss vs Duskmantle: easy 53.5%, medium 51.5%, hard 44.0%; spread 9.5 points; observed favored-side flip.
- Andromoss vs Sprig: easy 53.0%, medium 52.5%, hard 49.5%; spread 3.5 points; observed favored-side flip.
- Captain Bramble vs Sprig: easy 56.0%, medium 67.0%, hard 79.5%; spread 23.5 points.
- Duskmantle vs Sprig: easy 45.0%, medium 49.0%, hard 56.5%; spread 11.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.


## 1★ only: pooled and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩72.0%* | 🟨50.0% | 🟩77.2%* | 🟨57.8%* |
| Andromoss | 🟥28.0%* | — | 🟥28.0%* | 🟨49.0%* | 🟥39.2% |
| Captain Bramble | 🟨50.0% | 🟩72.0%* | — | 🟩77.2%* | 🟨57.8%* |
| Duskmantle | 🟥22.8%* | 🟨51.0%* | 🟥22.8%* | — | 🟥37.0% |
| Sprig | 🟨42.2%* | 🟩60.8% | 🟨42.2%* | 🟩63.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.0% | 🟨50.0% | 🟨59.5% | 🟨43.0% |
| Andromoss | 🟨50.0% | — | 🟨50.0% | 🟨52.0% | 🟨42.0% |
| Captain Bramble | 🟨50.0% | 🟨50.0% | — | 🟨59.5% | 🟨43.0% |
| Duskmantle | 🟨40.5% | 🟨48.0% | 🟨40.5% | — | 🟥36.0% |
| Sprig | 🟨57.0% | 🟨58.0% | 🟨57.0% | 🟩64.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩77.5% | 🟨50.0% | 🟩78.0% | 🟨51.0% |
| Andromoss | 🟥22.5% | — | 🟥22.5% | 🟨49.0% | 🟥37.0% |
| Captain Bramble | 🟨50.0% | 🟩77.5% | — | 🟩78.0% | 🟨51.0% |
| Duskmantle | 🟥22.0% | 🟨51.0% | 🟥22.0% | — | 🟥33.5% |
| Sprig | 🟨49.0% | 🟩63.0% | 🟨49.0% | 🟩66.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩88.5% | 🟨50.0% | 🟩94.0% | 🟩79.5% |
| Andromoss | 🟥11.5% | — | 🟥11.5% | 🟨46.0% | 🟥38.5% |
| Captain Bramble | 🟨50.0% | 🟩88.5% | — | 🟩94.0% | 🟩79.5% |
| Duskmantle | 🟥6.0% | 🟨54.0% | 🟥6.0% | — | 🟨41.5% |
| Sprig | 🟥20.5% | 🟩61.5% | 🟥20.5% | 🟨58.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 50.0%, medium 77.5%, hard 88.5%; spread 38.5 points.
- Sir Champignon vs Duskmantle: easy 59.5%, medium 78.0%, hard 94.0%; spread 34.5 points.
- Sir Champignon vs Sprig: easy 43.0%, medium 51.0%, hard 79.5%; spread 36.5 points; observed favored-side flip.
- Andromoss vs Captain Bramble: easy 50.0%, medium 22.5%, hard 11.5%; spread 38.5 points.
- Andromoss vs Duskmantle: easy 52.0%, medium 49.0%, hard 46.0%; spread 6.0 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 59.5%, medium 78.0%, hard 94.0%; spread 34.5 points.
- Captain Bramble vs Sprig: easy 43.0%, medium 51.0%, hard 79.5%; spread 36.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.


## 2★ only: pooled and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨56.2% | 🟨42.3%* | 🟨45.7%* | 🟨49.7%* |
| Andromoss | 🟨43.8% | — | 🟥35.2% | 🟥37.0%* | 🟨42.0% |
| Captain Bramble | 🟨57.7%* | 🟩64.8% | — | 🟨52.8%* | 🟨54.5%* |
| Duskmantle | 🟨54.3%* | 🟩63.0%* | 🟨47.2%* | — | 🟨54.3%* |
| Sprig | 🟨50.3%* | 🟨58.0% | 🟨45.5%* | 🟨45.7%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨58.5% | 🟨50.5% | 🟨56.0% | 🟨50.5% |
| Andromoss | 🟨41.5% | — | 🟨41.5% | 🟨49.5% | 🟨40.5% |
| Captain Bramble | 🟨49.5% | 🟨58.5% | — | 🟨58.5% | 🟨46.0% |
| Duskmantle | 🟨44.0% | 🟨50.5% | 🟨41.5% | — | 🟨45.5% |
| Sprig | 🟨49.5% | 🟨59.5% | 🟨54.0% | 🟨54.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.5% | 🟨42.0% | 🟨48.5% | 🟨48.0% |
| Andromoss | 🟨49.5% | — | 🟥37.0% | 🟨42.5% | 🟨41.5% |
| Captain Bramble | 🟨58.0% | 🟩63.0% | — | 🟨55.5% | 🟨51.0% |
| Duskmantle | 🟨51.5% | 🟨57.5% | 🟨44.5% | — | 🟨50.0% |
| Sprig | 🟨52.0% | 🟨58.5% | 🟨49.0% | 🟨50.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨59.5% | 🟥34.5% | 🟥32.5% | 🟨50.5% |
| Andromoss | 🟨40.5% | — | 🟥27.0% | 🟥19.0% | 🟨44.0% |
| Captain Bramble | 🟩65.5% | 🟩73.0% | — | 🟨44.5% | 🟩66.5% |
| Duskmantle | 🟩67.5% | 🟩81.0% | 🟨55.5% | — | 🟩67.5% |
| Sprig | 🟨49.5% | 🟨56.0% | 🟥33.5% | 🟥32.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 50.5%, medium 42.0%, hard 34.5%; spread 16.0 points; observed favored-side flip.
- Sir Champignon vs Duskmantle: easy 56.0%, medium 48.5%, hard 32.5%; spread 23.5 points; observed favored-side flip.
- Sir Champignon vs Sprig: easy 50.5%, medium 48.0%, hard 50.5%; spread 2.5 points; observed favored-side flip.
- Andromoss vs Duskmantle: easy 49.5%, medium 42.5%, hard 19.0%; spread 30.5 points.
- Captain Bramble vs Duskmantle: easy 58.5%, medium 55.5%, hard 44.5%; spread 14.0 points; observed favored-side flip.
- Captain Bramble vs Sprig: easy 46.0%, medium 51.0%, hard 66.5%; spread 20.5 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 45.5%, medium 50.0%, hard 67.5%; spread 22.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.


## 3★ only: pooled and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨53.0% | 🟨50.0% | 🟩64.0% | 🟩74.2%* |
| Andromoss | 🟨47.0% | — | 🟨47.0% | 🟨49.3% | 🟨50.0% |
| Captain Bramble | 🟨50.0% | 🟨53.0% | — | 🟩64.0% | 🟩74.2%* |
| Duskmantle | 🟥36.0% | 🟨50.7% | 🟥36.0% | — | 🟩63.3%* |
| Sprig | 🟥25.8%* | 🟨50.0% | 🟥25.8%* | 🟥36.7%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨53.0% | 🟨50.0% | 🟨58.0% | 🟩60.5% |
| Andromoss | 🟨47.0% | — | 🟨47.0% | 🟨49.0% | 🟨50.0% |
| Captain Bramble | 🟨50.0% | 🟨53.0% | — | 🟨58.0% | 🟩60.5% |
| Duskmantle | 🟨42.0% | 🟨51.0% | 🟨42.0% | — | 🟨52.5% |
| Sprig | 🟥39.5% | 🟨50.0% | 🟥39.5% | 🟨47.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨55.5% | 🟨50.0% | 🟩66.0% | 🟩72.0% |
| Andromoss | 🟨44.5% | — | 🟨44.5% | 🟨49.0% | 🟨50.0% |
| Captain Bramble | 🟨50.0% | 🟨55.5% | — | 🟩66.0% | 🟩72.0% |
| Duskmantle | 🟥34.0% | 🟨51.0% | 🟥34.0% | — | 🟩60.5% |
| Sprig | 🟥28.0% | 🟨50.0% | 🟥28.0% | 🟥39.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.5% | 🟨50.0% | 🟩68.0% | 🟩90.0% |
| Andromoss | 🟨49.5% | — | 🟨49.5% | 🟨50.0% | 🟨50.0% |
| Captain Bramble | 🟨50.0% | 🟨50.5% | — | 🟩68.0% | 🟩90.0% |
| Duskmantle | 🟥32.0% | 🟨50.0% | 🟥32.0% | — | 🟩77.0% |
| Sprig | 🟥10.0% | 🟨50.0% | 🟥10.0% | 🟥23.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Sprig: easy 60.5%, medium 72.0%, hard 90.0%; spread 29.5 points.
- Captain Bramble vs Sprig: easy 60.5%, medium 72.0%, hard 90.0%; spread 29.5 points.
- Duskmantle vs Sprig: easy 52.5%, medium 60.5%, hard 77.0%; spread 24.5 points.

Flips are descriptive changes across AI levels, not significance claims.


## 4★ only: pooled and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨45.0%* | 🟨40.8%* | 🟨53.8%* | 🟨51.5%* |
| Andromoss | 🟨55.0%* | — | 🟥39.0%* | 🟨53.8% | 🟨58.7%* |
| Captain Bramble | 🟨59.2%* | 🟩61.0%* | — | 🟩64.7%* | 🟨57.0%* |
| Duskmantle | 🟨46.2%* | 🟨46.2% | 🟥35.3%* | — | 🟨45.0% |
| Sprig | 🟨48.5%* | 🟨41.3%* | 🟨43.0%* | 🟨55.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨52.5% | 🟨54.0% | 🟨56.0% | 🟨55.0% |
| Andromoss | 🟨47.5% | — | 🟨52.5% | 🟨53.0% | 🟨49.0% |
| Captain Bramble | 🟨46.0% | 🟨47.5% | — | 🟨49.5% | 🟨46.0% |
| Duskmantle | 🟨44.0% | 🟨47.0% | 🟨50.5% | — | 🟨45.0% |
| Sprig | 🟨45.0% | 🟨51.0% | 🟨54.0% | 🟨55.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨44.5% | 🟨44.0% | 🟨58.0% | 🟨50.5% |
| Andromoss | 🟨55.5% | — | 🟨41.5% | 🟨57.0% | 🟩60.5% |
| Captain Bramble | 🟨56.0% | 🟨58.5% | — | 🟩68.5% | 🟨56.0% |
| Duskmantle | 🟨42.0% | 🟨43.0% | 🟥31.5% | — | 🟨44.0% |
| Sprig | 🟨49.5% | 🟥39.5% | 🟨44.0% | 🟨56.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟥38.0% | 🟥24.5% | 🟨47.5% | 🟨49.0% |
| Andromoss | 🟩62.0% | — | 🟥23.0% | 🟨51.5% | 🟩66.5% |
| Captain Bramble | 🟩75.5% | 🟩77.0% | — | 🟩76.0% | 🟩69.0% |
| Duskmantle | 🟨52.5% | 🟨48.5% | 🟥24.0% | — | 🟨46.0% |
| Sprig | 🟨51.0% | 🟥33.5% | 🟥31.0% | 🟨54.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 52.5%, medium 44.5%, hard 38.0%; spread 14.5 points; observed favored-side flip.
- Sir Champignon vs Captain Bramble: easy 54.0%, medium 44.0%, hard 24.5%; spread 29.5 points; observed favored-side flip.
- Sir Champignon vs Duskmantle: easy 56.0%, medium 58.0%, hard 47.5%; spread 10.5 points; observed favored-side flip.
- Sir Champignon vs Sprig: easy 55.0%, medium 50.5%, hard 49.0%; spread 6.0 points; observed favored-side flip.
- Andromoss vs Captain Bramble: easy 52.5%, medium 41.5%, hard 23.0%; spread 29.5 points; observed favored-side flip.
- Andromoss vs Sprig: easy 49.0%, medium 60.5%, hard 66.5%; spread 17.5 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 49.5%, medium 68.5%, hard 76.0%; spread 26.5 points; observed favored-side flip.
- Captain Bramble vs Sprig: easy 46.0%, medium 56.0%, hard 69.0%; spread 23.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.


## Selected Andromoss tier against fixed enemy4★

| Andromoss vs → | Sir Champignon 4★ | Andromoss 4★ | Captain Bramble 4★ | Duskmantle 4★ | Sprig 4★ |
|---|---:|---:|---:|---:|---:|
| 1★ | 🟩65.2% | 🟨57.8% | 🟨46.5%* | 🟩63.2% | 🟩70.5% |
| 2★ | 🟨50.7%* | 🟨52.0%* | 🟨40.0%* | 🟨57.0% | 🟨54.0% |
| 3★ | 🟨48.7% | 🟨49.5% | 🟨48.2% | 🟨49.7%* | 🟨48.3% |
| 4★ | 🟨55.0%* | 🟨50.0% | 🟥38.8%* | 🟨53.7% | 🟨58.7%* |

## easy

| Andromoss vs → | Sir Champignon 4★ | Andromoss 4★ | Captain Bramble 4★ | Duskmantle 4★ | Sprig 4★ |
|---|---:|---:|---:|---:|---:|
| 1★ | 🟩65.5% | 🟩64.5% | 🟩72.0% | 🟩69.0% | 🟩69.0% |
| 2★ | 🟨49.0% | 🟨51.5% | 🟨54.5% | 🟨55.5% | 🟨54.0% |
| 3★ | 🟨48.5% | 🟨50.0% | 🟨50.0% | 🟨50.0% | 🟨49.0% |
| 4★ | 🟨47.0% | 🟨50.0% | 🟨52.0% | 🟨52.5% | 🟨48.5% |

## medium

| Andromoss vs → | Sir Champignon 4★ | Andromoss 4★ | Captain Bramble 4★ | Duskmantle 4★ | Sprig 4★ |
|---|---:|---:|---:|---:|---:|
| 1★ | 🟩60.5% | 🟨55.0% | 🟨42.0% | 🟩65.0% | 🟩66.0% |
| 2★ | 🟨55.0% | 🟨55.0% | 🟨43.5% | 🟩63.0% | 🟨57.0% |
| 3★ | 🟨48.5% | 🟨49.0% | 🟨46.0% | 🟨48.5% | 🟨47.0% |
| 4★ | 🟨56.0% | 🟨50.0% | 🟨41.5% | 🟨57.0% | 🟩61.0% |

## hard

| Andromoss vs → | Sir Champignon 4★ | Andromoss 4★ | Captain Bramble 4★ | Duskmantle 4★ | Sprig 4★ |
|---|---:|---:|---:|---:|---:|
| 1★ | 🟩69.5% | 🟨54.0% | 🟥25.5% | 🟨55.5% | 🟩76.5% |
| 2★ | 🟨48.0% | 🟨49.5% | 🟥22.0% | 🟨52.5% | 🟨51.0% |
| 3★ | 🟨49.0% | 🟨49.5% | 🟨48.5% | 🟨50.5% | 🟨49.0% |
| 4★ | 🟩62.0% | 🟨50.0% | 🟥23.0% | 🟨51.5% | 🟩66.5% |

## Difficulty flags

- 1★ vs Captain Bramble: easy 72.0%, medium 42.0%, hard 25.5%; spread46.5 points; observed favored-side flip.
- 2★ vs Sir Champignon: easy 49.0%, medium 55.0%, hard 48.0%; spread7.0 points; observed favored-side flip.
- 2★ vs Andromoss: easy 51.5%, medium 55.0%, hard 49.5%; spread5.5 points; observed favored-side flip.
- 2★ vs Captain Bramble: easy 54.5%, medium 43.5%, hard 22.0%; spread32.5 points; observed favored-side flip.
- 3★ vs Duskmantle: easy 50.0%, medium 48.5%, hard 50.5%; spread2.0 points; observed favored-side flip.
- 4★ vs Sir Champignon: easy 47.0%, medium 56.0%, hard 62.0%; spread15.0 points; observed favored-side flip.
- 4★ vs Captain Bramble: easy 52.0%, medium 41.5%, hard 23.0%; spread29.0 points; observed favored-side flip.
- 4★ vs Sprig: easy 48.5%, medium 61.0%, hard 66.5%; spread18.0 points; observed favored-side flip.

No unfinished games are invented as wins. Identical4vs4 Andromoss paired mirrors must be50%, including when capped pairs are excluded. Normal play has a four-slot meter and can change spell as charge grows; here the row fixes its cap. In particular3★ theft can remove four enemy stars but receive only three, unlike normal play’s capacity4. These tests compare selected-spell builds against constant opposition, not optimal full-kit choices or equal resource-efficiency/per-cast value. Human playtesting remains necessary.

Reproduce: `pnpm balance:andromoss --seeds=100 --seed=20261119 --enemy-tier=4`.


## Verification

217 simulation tests, production build and40 distinct desktop/mobile/online browser scenarios pass across targeted runs:26 existing scenarios,12 new simplified-kit cases and2 online permanent-mark cases. Includes all20 hero/tier casts, exact sweep/automation boundaries and birth-tick interception, normal rewards/rabbit penalties, five mistake categories/charges, future3/6 quotas, original bonus preservation across cross-tier recasts, long waits, cleansing, round reset and finite synchronized state. Browser tests use real input and collect stars on both sides to avoid ending the round before a four-star cast; indicator assertions allow legitimate round completion. Initial test failures from early round wins, effect-selector scope, clock scheduling and overlapping artifact directories were corrected and affected cases passed afterward. No screenshots were analyzed and no assets were generated.

Reproduce simulation/build: `pnpm test`, `pnpm build`. Balance: `pnpm balance:roster --tier=N --seed=20261118` for N1..4, `pnpm balance:roster --seed=20261118`, `pnpm balance:andromoss`. Browser: `pnpm exec playwright test tests/e2e/andromoss-kit.spec.ts tests/e2e/retuned-spells.spec.ts tests/e2e/roster-online.spec.ts tests/e2e/simplified-kits.spec.ts --workers=1`.
