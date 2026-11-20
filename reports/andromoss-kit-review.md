# Adopted Andromoss kit: four tiers, fixed opponents and full-kit snapshot

## Current rules (D138)

| Stars | Previous | Adopted | Duration |
|---|---|---|---|
| 1★ | All-star theft | Pure extra enemy rabbits every850 ms | 8 active seconds |
| 2★ | Pure rabbits every950 ms/7.5 s | Newly appearing enemy moles receive85% normal wave lifetime | 8 active seconds |
| 3★ | Steal up to2 stars | Steal all enemy stars, received amount limited by own capacity | Instant |
| 4★ | Targets every650 ms,70% rabbits/30% moles,8.5 s | Pure rabbits every650 ms plus the2★ shortening effect | 8 active seconds |

The adopted4★ does not steal stars or create reward-bearing moles. It has both1★/2★ effects per cast; this does not guarantee the best resource-efficient build or more wins in every counter matchup. An existing ward blocks the entire combo atomically. No hostile warning, no new art, all other heroes’ powers unchanged. Normal gameplay capacity stays4.

## Lifetime and integration details

Shortening applies once at spawn, only to new moles/all origins during the exclusive8 s window. Existing moles/rabbits/stars are unchanged. Scale the rounded normal wave lifetime before adding positive fixed Tending time:500→425 ms;500 with+750 Tending→1175 ms. Do not clamp again to the natural500 ms floor. Adaptive rising/retreat phases retain complete endpoints at425 ms; physics runs on50 ms ticks, so expiry cleanup occurs on the next simulation tick. Recasts refresh windows without re-shortening old targets. Earned shortening remains after aura end.

Cleanse cancels rabbit/shortening clocks and restores removed time to live shortened targets, retaining Tending and never reviving expired targets or restoring twice. Existing generated rabbits retain their normal remaining lifetimes, matching prior cleanse semantics. Weak pressure does not replace active stronger rabbit pressure;4★ replaces weak pressure. Pause/cast freezes timers, reset clears state. New player/target fields synchronize through protocol16; procedural rush HUD/approved shared cast sprites reused. Internal capacity setting is starTheftCap and the2★ lifetime effect has its own role-aligned UI title; conversation uses star numbers.

## AI and comparison design

Selected-tier bots keep100 ms target visibility and seeded200–400 ms decision delay×3/2/1.1★/2★ use visible enemy activity and avoid active-effect renewal/wards;3★ uses worthwhile enemy charge≥2 and avoids wards;4★ waits for visible activity and avoids renewing a fully active combo/wards. Full-kit bot slot checks/cleanse awareness follow the new roles, but no character-specific cast probability weights or hit accuracy/reaction settings changed. Ward threat detection now reads the public actual opposing selected tier in mixed-tier diagnostics.

**49,500 real-simulation games**, zero unfinished:

- Four same-tier roster runs:30,000 games,100 paired seeds/pair/difficulty,200 distinct games/cell/level and100 mirrors/hero/level.
- Fixed-opponent comparison:12,000 games, each Andromoss cost1–4 versus each hero fixed at4★, same seeds and both sides,200 games/cell/level.
- Current normal full-kit snapshot:7,500 games with ordinary four-slot meters and normal AI priorities.

All19,200 non-Andromoss same-tier battle records reproduce prior outcomes and prior metric columns exactly after removing newly added observability columns. Saved old metadata/rows in andromoss-kit-before.json; raw prior data remains at Git39fce99. No independent before/after claim for the full-kit snapshot: older full-kit runs used other historical rules.

## Main fixed-opponent comparison

Andromoss row cost against a constant4★ opponent; these are selected-spell builds, not same-cost strength equivalence. Pooled600 completed games/cell. Own meter cap equals selected cost;3★ can remove4 enemy stars but receive3 here, whereas normal gameplay receives4 (verified in browser and both-side tests). Resource timing/overflow and inability to change powers are intentional diagnostic restrictions.

| Andromoss vs → | Sir Champignon 4★ | Andromoss 4★ | Captain Bramble 4★ | Duskmantle 4★ | Sprig 4★ |
|---|---:|---:|---:|---:|---:|
| 1★ | 🟩61.7% | 🟨59.7% | 🟨45.7%* | 🟩64.3% | 🟩76.2%* |
| 2★ | 🟨40.5% | 🟨50.7%* | 🟥37.3%* | 🟨56.2% | 🟨49.3%* |
| 3★ | 🟨47.7% | 🟨49.8%* | 🟨48.8% | 🟨49.2% | 🟨48.8% |
| 4★ | 🟨43.5% | 🟨50.0% | 🟥36.3%* | 🟨54.8% | 🟩60.2%* |

## easy

| Andromoss vs → | Sir Champignon 4★ | Andromoss 4★ | Captain Bramble 4★ | Duskmantle 4★ | Sprig 4★ |
|---|---:|---:|---:|---:|---:|
| 1★ | 🟩70.0% | 🟩69.5% | 🟩71.0% | 🟩70.5% | 🟩66.0% |
| 2★ | 🟨47.0% | 🟨53.5% | 🟨53.5% | 🟨56.5% | 🟨49.0% |
| 3★ | 🟨48.5% | 🟨50.0% | 🟨50.0% | 🟨49.0% | 🟨49.0% |
| 4★ | 🟨47.5% | 🟨50.0% | 🟨52.5% | 🟨53.5% | 🟨45.0% |

## medium

| Andromoss vs → | Sir Champignon 4★ | Andromoss 4★ | Captain Bramble 4★ | Duskmantle 4★ | Sprig 4★ |
|---|---:|---:|---:|---:|---:|
| 1★ | 🟨58.0% | 🟨56.0% | 🟨47.5% | 🟩68.5% | 🟩70.5% |
| 2★ | 🟨45.5% | 🟨53.5% | 🟨42.0% | 🟩62.0% | 🟨46.5% |
| 3★ | 🟨46.5% | 🟨48.0% | 🟨47.5% | 🟨48.5% | 🟨48.5% |
| 4★ | 🟥39.5% | 🟨50.0% | 🟥35.0% | 🟨55.5% | 🟨59.0% |

## hard

| Andromoss vs → | Sir Champignon 4★ | Andromoss 4★ | Captain Bramble 4★ | Duskmantle 4★ | Sprig 4★ |
|---|---:|---:|---:|---:|---:|
| 1★ | 🟨57.0% | 🟨53.5% | 🟥18.5% | 🟨54.0% | 🟩92.0% |
| 2★ | 🟥29.0% | 🟨45.0% | 🟥16.5% | 🟨50.0% | 🟨52.5% |
| 3★ | 🟨48.0% | 🟨51.5% | 🟨49.0% | 🟨50.0% | 🟨49.0% |
| 4★ | 🟨43.5% | 🟨50.0% | 🟥21.5% | 🟨55.5% | 🟩76.5% |

## Difficulty flags

- 1★ vs Captain Bramble: easy 71.0%, medium 47.5%, hard 18.5%; spread52.5 points; observed favored-side flip.
- 1★ vs Sprig: easy 66.0%, medium 70.5%, hard 92.0%; spread26.0 points.
- 2★ vs Andromoss: easy 53.5%, medium 53.5%, hard 45.0%; spread8.5 points; observed favored-side flip.
- 2★ vs Captain Bramble: easy 53.5%, medium 42.0%, hard 16.5%; spread37.0 points; observed favored-side flip.
- 2★ vs Sprig: easy 49.0%, medium 46.5%, hard 52.5%; spread6.0 points; observed favored-side flip.
- 3★ vs Andromoss: easy 50.0%, medium 48.0%, hard 51.5%; spread3.5 points; observed favored-side flip.
- 4★ vs Captain Bramble: easy 52.5%, medium 35.0%, hard 21.5%; spread31.0 points; observed favored-side flip.
- 4★ vs Sprig: easy 45.0%, medium 59.0%, hard 76.5%; spread31.5 points; observed favored-side flip.


## What the comparison establishes

- Four-star effects are mechanically a superset of1★/2★ per cast, but **1★ wins more than4★ against all fixed4★ opponents in pooled selected-build tests**. Its lower cost/earlier availability and rabbit-sensitive enemy automation are plausible contributors, not isolated causal estimates. Do not claim4★ is now the best strategy.
- Three-star effects control resources rather than scoring directly; its selected cap3 understates receiving4 in normal play and excludes follow-up switching to4★. Its near50% rows do not prove equal full-kit value.
- Hard1★ vs Sprig4★ reaches92%; automatic rabbit hits are a meaningful counter interaction. Against Bramble4★, Hard1★ is18.5% and4★21.5%. Do not tune toward50% using only one counter matchup.

## Four-star same-tier before→after

Pooled Andromoss row wins against the same cost/opponent abilities; only Andromoss’ kit/matching cast conditions changed.

| Opponent | Old4★ | Adopted4★ |
|---|---:|---:|
| champignon | 31.2% | 43.5% |
| captain-bramble | 30.8% | 36.3% |
| duskmantle | 43.2% | 54.8% |
| sprig | 46.0% | 60.2% |

## All same-tier Andromoss changes

| Own/opponent tier | Opponent | Previous | Adopted |
|---|---|---:|---:|
| 1★ | champignon | 46.0% | 31.0% |
| 1★ | captain-bramble | 46.0% | 31.0% |
| 1★ | duskmantle | 47.3% | 48.8% |
| 1★ | sprig | 49.3% | 38.5% |
| 2★ | champignon | 45.5% | 43.7% |
| 2★ | captain-bramble | 32.8% | 34.8% |
| 2★ | duskmantle | 33.7% | 36.8% |
| 2★ | sprig | 52.5% | 31.5% |
| 3★ | champignon | 50.0% | 50.0% |
| 3★ | captain-bramble | 47.8% | 48.0% |
| 3★ | duskmantle | 49.3% | 49.3% |
| 3★ | sprig | 50.0% | 50.0% |
| 4★ | champignon | 31.2% | 43.5% |
| 4★ | captain-bramble | 30.8% | 36.3% |
| 4★ | duskmantle | 43.2% | 54.8% |
| 4★ | sprig | 46.0% | 60.2% |

## Current same-tier matrices and difficulty flags

### 1★

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩69.0%* | 🟨50.0% | 🟩77.2%* | 🟨58.2%* |
| Andromoss | 🟥31.0%* | — | 🟥31.0%* | 🟨48.8%* | 🟥38.5% |
| Captain Bramble | 🟨50.0% | 🟩69.0%* | — | 🟩77.2%* | 🟨58.2%* |
| Duskmantle | 🟥22.8%* | 🟨51.2%* | 🟥22.8%* | — | 🟨42.2%* |
| Sprig | 🟨41.8%* | 🟩61.5% | 🟨41.8%* | 🟨57.8%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨46.0% | 🟨50.0% | 🟨59.5% | 🟨43.5% |
| Andromoss | 🟨54.0% | — | 🟨54.0% | 🟨59.0% | 🟨42.5% |
| Captain Bramble | 🟨50.0% | 🟨46.0% | — | 🟨59.5% | 🟨43.5% |
| Duskmantle | 🟨40.5% | 🟨41.0% | 🟨40.5% | — | 🟥36.5% |
| Sprig | 🟨56.5% | 🟨57.5% | 🟨56.5% | 🟩63.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩74.5% | 🟨50.0% | 🟩80.5% | 🟨51.5% |
| Andromoss | 🟥25.5% | — | 🟥25.5% | 🟨48.5% | 🟥32.5% |
| Captain Bramble | 🟨50.0% | 🟩74.5% | — | 🟩80.5% | 🟨51.5% |
| Duskmantle | 🟥19.5% | 🟨51.5% | 🟥19.5% | — | 🟥38.0% |
| Sprig | 🟨48.5% | 🟩67.5% | 🟨48.5% | 🟩62.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩86.5% | 🟨50.0% | 🟩91.5% | 🟩79.5% |
| Andromoss | 🟥13.5% | — | 🟥13.5% | 🟥39.0% | 🟨40.5% |
| Captain Bramble | 🟨50.0% | 🟩86.5% | — | 🟩91.5% | 🟩79.5% |
| Duskmantle | 🟥8.5% | 🟩61.0% | 🟥8.5% | — | 🟨52.0% |
| Sprig | 🟥20.5% | 🟨59.5% | 🟥20.5% | 🟨48.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 46.0%, medium 74.5%, hard 86.5%; spread 40.5 points; observed favored-side flip.
- Sir Champignon vs Duskmantle: easy 59.5%, medium 80.5%, hard 91.5%; spread 32.0 points.
- Sir Champignon vs Sprig: easy 43.5%, medium 51.5%, hard 79.5%; spread 36.0 points; observed favored-side flip.
- Andromoss vs Captain Bramble: easy 54.0%, medium 25.5%, hard 13.5%; spread 40.5 points; observed favored-side flip.
- Andromoss vs Duskmantle: easy 59.0%, medium 48.5%, hard 39.0%; spread 20.0 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 59.5%, medium 80.5%, hard 91.5%; spread 32.0 points.
- Captain Bramble vs Sprig: easy 43.5%, medium 51.5%, hard 79.5%; spread 36.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 36.5%, medium 38.0%, hard 52.0%; spread 15.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.


### 2★

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨56.3% | 🟨42.7%* | 🟨43.8%* | 🟥37.0% |
| Andromoss | 🟨43.7% | — | 🟥34.8% | 🟥36.8%* | 🟥31.5% |
| Captain Bramble | 🟨57.3%* | 🟩65.2% | — | 🟨50.0%* | 🟨41.3%* |
| Duskmantle | 🟨56.2%* | 🟩63.2%* | 🟨50.0%* | — | 🟨42.2%* |
| Sprig | 🟩63.0% | 🟩68.5% | 🟨58.7%* | 🟨57.8%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨58.0% | 🟨50.5% | 🟨55.0% | 🟥32.5% |
| Andromoss | 🟨42.0% | — | 🟨41.0% | 🟨51.0% | 🟥27.5% |
| Captain Bramble | 🟨49.5% | 🟨59.0% | — | 🟨59.0% | 🟥33.0% |
| Duskmantle | 🟨45.0% | 🟨49.0% | 🟨41.0% | — | 🟥23.5% |
| Sprig | 🟩67.5% | 🟩72.5% | 🟩67.0% | 🟩76.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨51.5% | 🟨42.5% | 🟨43.5% | 🟥31.5% |
| Andromoss | 🟨48.5% | — | 🟥37.0% | 🟨41.0% | 🟥31.0% |
| Captain Bramble | 🟨57.5% | 🟩63.0% | — | 🟨53.0% | 🟥36.0% |
| Duskmantle | 🟨56.5% | 🟨59.0% | 🟨47.0% | — | 🟥35.5% |
| Sprig | 🟩68.5% | 🟩69.0% | 🟩64.0% | 🟩64.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨59.5% | 🟥35.0% | 🟥33.0% | 🟨47.0% |
| Andromoss | 🟨40.5% | — | 🟥26.5% | 🟥18.5% | 🟥36.0% |
| Captain Bramble | 🟩65.0% | 🟩73.5% | — | 🟥38.0% | 🟨55.0% |
| Duskmantle | 🟩67.0% | 🟩81.5% | 🟩62.0% | — | 🟩67.5% |
| Sprig | 🟨53.0% | 🟩64.0% | 🟨45.0% | 🟥32.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 50.5%, medium 42.5%, hard 35.0%; spread 15.5 points; observed favored-side flip.
- Sir Champignon vs Duskmantle: easy 55.0%, medium 43.5%, hard 33.0%; spread 22.0 points; observed favored-side flip.
- Andromoss vs Duskmantle: easy 51.0%, medium 41.0%, hard 18.5%; spread 32.5 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 59.0%, medium 53.0%, hard 38.0%; spread 21.0 points; observed favored-side flip.
- Captain Bramble vs Sprig: easy 33.0%, medium 36.0%, hard 55.0%; spread 22.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 23.5%, medium 35.5%, hard 67.5%; spread 44.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.


### 3★

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.0% | 🟥37.5% | 🟥36.8%* | 🟨50.0% |
| Andromoss | 🟨50.0% | — | 🟨48.0% | 🟨49.3% | 🟨50.0% |
| Captain Bramble | 🟩62.5% | 🟨52.0% | — | 🟨49.8%* | 🟩62.5% |
| Duskmantle | 🟩63.2%* | 🟨50.7% | 🟨50.2%* | — | 🟩63.2%* |
| Sprig | 🟨50.0% | 🟨50.0% | 🟥37.5% | 🟥36.8%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.0% | 🟨46.0% | 🟨47.5% | 🟨50.0% |
| Andromoss | 🟨50.0% | — | 🟨48.0% | 🟨49.0% | 🟨50.0% |
| Captain Bramble | 🟨54.0% | 🟨52.0% | — | 🟨53.5% | 🟨54.0% |
| Duskmantle | 🟨52.5% | 🟨51.0% | 🟨46.5% | — | 🟨52.5% |
| Sprig | 🟨50.0% | 🟨50.0% | 🟨46.0% | 🟨47.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.0% | 🟥34.5% | 🟥39.5% | 🟨50.0% |
| Andromoss | 🟨50.0% | — | 🟨47.5% | 🟨49.0% | 🟨50.0% |
| Captain Bramble | 🟩65.5% | 🟨52.5% | — | 🟨54.0% | 🟩65.5% |
| Duskmantle | 🟩60.5% | 🟨51.0% | 🟨46.0% | — | 🟩60.5% |
| Sprig | 🟨50.0% | 🟨50.0% | 🟥34.5% | 🟥39.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.0% | 🟥32.0% | 🟥23.5% | 🟨50.0% |
| Andromoss | 🟨50.0% | — | 🟨48.5% | 🟨50.0% | 🟨50.0% |
| Captain Bramble | 🟩68.0% | 🟨51.5% | — | 🟨42.0% | 🟩68.0% |
| Duskmantle | 🟩76.5% | 🟨50.0% | 🟨58.0% | — | 🟩76.5% |
| Sprig | 🟨50.0% | 🟨50.0% | 🟥32.0% | 🟥23.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Duskmantle: easy 47.5%, medium 39.5%, hard 23.5%; spread 24.0 points.
- Captain Bramble vs Duskmantle: easy 53.5%, medium 54.0%, hard 42.0%; spread 12.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 52.5%, medium 60.5%, hard 76.5%; spread 24.0 points.

Flips are descriptive changes across AI levels, not significance claims.


### 4★

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨56.5% | 🟨49.7%* | 🟩66.3% | 🟨57.5%* |
| Andromoss | 🟨43.5% | — | 🟥36.3%* | 🟨54.8% | 🟩60.2%* |
| Captain Bramble | 🟨50.3%* | 🟩63.7%* | — | 🟩68.8%* | 🟨59.2%* |
| Duskmantle | 🟥33.7% | 🟨45.2% | 🟥31.2%* | — | 🟨45.7%* |
| Sprig | 🟨42.5%* | 🟥39.8%* | 🟨40.8%* | 🟨54.3%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨52.5% | 🟨55.5% | 🟨57.5% | 🟨51.0% |
| Andromoss | 🟨47.5% | — | 🟨52.5% | 🟨53.5% | 🟨45.0% |
| Captain Bramble | 🟨44.5% | 🟨47.5% | — | 🟨51.5% | 🟨45.0% |
| Duskmantle | 🟨42.5% | 🟨46.5% | 🟨48.5% | — | 🟨41.0% |
| Sprig | 🟨49.0% | 🟨55.0% | 🟨55.0% | 🟨59.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩60.5% | 🟨52.0% | 🟩70.0% | 🟨50.5% |
| Andromoss | 🟥39.5% | — | 🟥35.0% | 🟨55.5% | 🟨59.0% |
| Captain Bramble | 🟨48.0% | 🟩65.0% | — | 🟩74.0% | 🟨55.5% |
| Duskmantle | 🟥30.0% | 🟨44.5% | 🟥26.0% | — | 🟨41.5% |
| Sprig | 🟨49.5% | 🟨41.0% | 🟨44.5% | 🟨58.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨56.5% | 🟨41.5% | 🟩71.5% | 🟩71.0% |
| Andromoss | 🟨43.5% | — | 🟥21.5% | 🟨55.5% | 🟩76.5% |
| Captain Bramble | 🟨58.5% | 🟩78.5% | — | 🟩81.0% | 🟩77.0% |
| Duskmantle | 🟥28.5% | 🟨44.5% | 🟥19.0% | — | 🟨54.5% |
| Sprig | 🟥29.0% | 🟥23.5% | 🟥23.0% | 🟨45.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 55.5%, medium 52.0%, hard 41.5%; spread 14.0 points; observed favored-side flip.
- Sir Champignon vs Sprig: easy 51.0%, medium 50.5%, hard 71.0%; spread 20.5 points.
- Andromoss vs Captain Bramble: easy 52.5%, medium 35.0%, hard 21.5%; spread 31.0 points; observed favored-side flip.
- Andromoss vs Sprig: easy 45.0%, medium 59.0%, hard 76.5%; spread 31.5 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 51.5%, medium 74.0%, hard 81.0%; spread 29.5 points.
- Captain Bramble vs Sprig: easy 45.0%, medium 55.5%, hard 77.0%; spread 32.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 41.0%, medium 41.5%, hard 54.5%; spread 13.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.



## Current normal full-kit snapshot

Unlike selected-tier tests, all powers and ordinary four-slot resource choices are available. These are the existing generic normal bot priorities with corrected slot semantics, not the selected-tier opportunity policy.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩70.0%* | 🟨56.7% | 🟩74.0% | 🟩69.3%* |
| Andromoss | 🟥30.0%* | — | 🟥39.0% | 🟨50.3%* | 🟨48.5%* |
| Captain Bramble | 🟨43.3% | 🟩61.0% | — | 🟩67.5% | 🟨59.8%* |
| Duskmantle | 🟥26.0% | 🟨49.7%* | 🟥32.5% | — | 🟨49.5%* |
| Sprig | 🟥30.7%* | 🟨51.5%* | 🟨40.2%* | 🟨50.5%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨58.0% | 🟨54.5% | 🟩70.0% | 🟨54.5% |
| Andromoss | 🟨42.0% | — | 🟨44.0% | 🟨56.0% | 🟨45.0% |
| Captain Bramble | 🟨45.5% | 🟨56.0% | — | 🟩65.0% | 🟨50.0% |
| Duskmantle | 🟥30.0% | 🟨44.0% | 🟥35.0% | — | 🟨43.0% |
| Sprig | 🟨45.5% | 🟨55.0% | 🟨50.0% | 🟨57.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩70.0% | 🟩63.5% | 🟩73.5% | 🟩67.0% |
| Andromoss | 🟥30.0% | — | 🟨44.0% | 🟨54.5% | 🟨51.0% |
| Captain Bramble | 🟥36.5% | 🟨56.0% | — | 🟩63.5% | 🟨50.5% |
| Duskmantle | 🟥26.5% | 🟨45.5% | 🟥36.5% | — | 🟨45.0% |
| Sprig | 🟥33.0% | 🟨49.0% | 🟨49.5% | 🟨55.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩82.0% | 🟨52.0% | 🟩78.5% | 🟩86.5% |
| Andromoss | 🟥18.0% | — | 🟥29.0% | 🟨40.5% | 🟨49.5% |
| Captain Bramble | 🟨48.0% | 🟩71.0% | — | 🟩74.0% | 🟩79.0% |
| Duskmantle | 🟥21.5% | 🟨59.5% | 🟥26.0% | — | 🟩60.5% |
| Sprig | 🟥13.5% | 🟨50.5% | 🟥21.0% | 🟥39.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 58.0%, medium 70.0%, hard 82.0%; spread 24.0 points.
- Sir Champignon vs Sprig: easy 54.5%, medium 67.0%, hard 86.5%; spread 32.0 points.
- Andromoss vs Duskmantle: easy 56.0%, medium 54.5%, hard 40.5%; spread 15.5 points; observed favored-side flip.
- Andromoss vs Sprig: easy 45.0%, medium 51.0%, hard 49.5%; spread 6.0 points; observed favored-side flip.
- Captain Bramble vs Sprig: easy 50.0%, medium 50.5%, hard 79.0%; spread 29.0 points.
- Duskmantle vs Sprig: easy 43.0%, medium 45.0%, hard 60.5%; spread 17.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.


Andromoss currently wins30% vs Champignon,39% vs Bramble,50.3% vs Duskmantle and48.5% vs Sprig, pooled. No claim of a balanced final roster. The bot’s generic priorities, tendency to take3★ theft rather than save, and refusal to bait a ward with a cheap spell can matter; human playtests and strategy coverage remain necessary.

| AI | Andromoss1★ casts/match | 2★ | 3★ | 4★ |
|---|---:|---:|---:|---:|
| easy | 1.51 | 0.60 | 0.34 | 0.14 |
| medium | 1.02 | 1.18 | 1.49 | 0.87 |
| hard | 1.47 | 2.14 | 3.46 | 1.72 |

## Coverage and limits

Rushed mole hit/miss counters count targets resolved while still shortened, including guarded physical misses; they are not damage estimates. Cleansed/terminal-unresolved targets are excluded from those completed counts. Normal state time/score pressure and all other heroes’ rules are unchanged. Full per-level matrices/coverage remain in canonical reports; small favored-side flips are descriptive, not significance claims.

Validation:208 simulation tests, production build and28 desktop/mobile browser cases pass, including actual425 ms animation poses, lifetime once/stacking/cleanse/freeze/reset rules, full-capacity3★ theft, atomic wards, per-player capacities on either side, and real WebRTC shortening/Tending synchronization.4★ vs4★ paired same-character controls are exactly50%. No image creation or visual art review was performed.

Reproduce:

- `pnpm balance:roster --tier=1 --seeds=100 --seed=20261119` (repeat tier2/3/4)
- `pnpm balance:andromoss --seeds=100 --seed=20261119 --enemy-tier=4`
- `pnpm balance:roster --seeds=100 --seed=20261119`

[Fixed-opponent matrices/data](andromoss-fixed-opponents.md) · [Normal full-kit matrices](balance-roster.md). Canonical JSON files retain all raw current outcomes; compact pre-change metadata references original Git records.
