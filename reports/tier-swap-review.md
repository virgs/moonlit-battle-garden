# First/two-star spell swap — Helping Tines clarification pending

## Adopted loadouts and reminders

| Hero | One star | Two stars | Before → after |
|---|---|---|---|
| Sir Champignon | Mushroom Guard: next two mistakes, no expiry | Clean Sweep: immediate busiest-column hit and continuous arrivals for3 s, normal rewards/rabbit penalties | Guard2→1 star; Sweep1→2 stars; powers unchanged |
| Andromoss | Borrowed Spark: all enemy charge at cast start, cap4, empty meter wasted | Rabbit Riot: extra enemy rabbits every0.95 s subject to spawn limits,7.5 s | Unchanged, zero warning |
| Captain Bramble | Bramble Brace: next two mistakes, no expiry | Tin Caps: next three future enemy moles, one extra hit each, no duration | Guard2→1 star; Tin Caps1→2 stars; powers unchanged |
| Duskmantle | Ominous Bud: three marks within8 s,+8 missed-mark penalty (16 total) | Violet Veil: target opacity72%,6.5 s; bots receive existing+200 ms reaction | Unchanged, zero warning |
| Sprig | Gentle Tending:+0.75 s once per current/arriving target,6 s aura | Helping Tines: busiest column,250 ms normal hits,6.5 s (requested change pending) | Unchanged until required Tines clarification |

Guards refresh to two rather than stack; cleanse preserves positive guards; round reset clears them. Sweep/Tin Caps actual effect and HUD tiers follow costs. Bots’ isolated opportunity conditions and full-kit emergency/ward/active-guard checks move with the spell. No tier3/4 changes, hit-timing changes, art or warning restoration. Protocol14 distinguishes layouts. Internal mode is mistakeGuardMode, CLI --guard-mode; old reports need their original revision.

## Violet Veil against humans

GardenScene.ts sets target sprite alpha to0.72 while camouflageUntil is active, for6.5 s. Target kinds, positions, hitboxes, lifetimes, points and input timing remain unchanged. This is visual transparency only for humans; Bot.ts’s+200 ms reaction is an AI perception approximation, not a forced human delay. Human disruption is not established by AI win rates.

## Helping Tines is not complete

The duration arrived as “10**8s**”. Required clarification asks8 vs10 seconds, and whether after the requested immediate column hit it should intercept new arrivals continuously like Sweep or retain250 ms cadence. Neither answer is assumed; current6.5 s/250 ms delayed-first-hit behavior remains. These results isolate the swap and must not be represented as the completed requested Tines buff.

## Diagnostic method

15,000 actual-simulation matches:7,500 per tier,100 paired seeds/pair/difficulty,200 games per distinct pairing/level,100 mirrors per hero/level. No unfinished matches. All heroes/levels exercised their selected tier. Seed20261119 retained; opportunity/scaled delays remain, full-kit bots adapt conditions to new prices but these reports are isolated-tier diagnostics. Same-tier tables cannot establish value between different star costs. Preserve human/full-kit testing and strategy caveats.

## Tier1 matrices after swap

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨54.0% | 🟨50.0% | 🟩77.2%* | 🟨58.2%* |
| Andromoss | 🟨46.0% | — | 🟨46.0% | 🟨47.3% | 🟨49.3%* |
| Captain Bramble | 🟨50.0% | 🟨54.0% | — | 🟩77.2%* | 🟨58.2%* |
| Duskmantle | 🟥22.8%* | 🟨52.7% | 🟥22.8%* | — | 🟨42.2%* |
| Sprig | 🟨41.8%* | 🟨50.7%* | 🟨41.8%* | 🟨57.8%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨54.5% | 🟨50.0% | 🟨59.5% | 🟨43.5% |
| Andromoss | 🟨45.5% | — | 🟨45.5% | 🟨47.5% | 🟨47.0% |
| Captain Bramble | 🟨50.0% | 🟨54.5% | — | 🟨59.5% | 🟨43.5% |
| Duskmantle | 🟨40.5% | 🟨52.5% | 🟨40.5% | — | 🟥36.5% |
| Sprig | 🟨56.5% | 🟨53.0% | 🟨56.5% | 🟩63.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨53.5% | 🟨50.0% | 🟩80.5% | 🟨51.5% |
| Andromoss | 🟨46.5% | — | 🟨46.5% | 🟨48.0% | 🟨51.0% |
| Captain Bramble | 🟨50.0% | 🟨53.5% | — | 🟩80.5% | 🟨51.5% |
| Duskmantle | 🟥19.5% | 🟨52.0% | 🟥19.5% | — | 🟥38.0% |
| Sprig | 🟨48.5% | 🟨49.0% | 🟨48.5% | 🟩62.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨54.0% | 🟨50.0% | 🟩91.5% | 🟩79.5% |
| Andromoss | 🟨46.0% | — | 🟨46.0% | 🟨46.5% | 🟨50.0% |
| Captain Bramble | 🟨50.0% | 🟨54.0% | — | 🟩91.5% | 🟩79.5% |
| Duskmantle | 🟥8.5% | 🟨53.5% | 🟥8.5% | — | 🟨52.0% |
| Sprig | 🟥20.5% | 🟨50.0% | 🟥20.5% | 🟨48.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Duskmantle: easy 59.5%, medium 80.5%, hard 91.5%; spread 32.0 points.
- Sir Champignon vs Sprig: easy 43.5%, medium 51.5%, hard 79.5%; spread 36.0 points; observed favored-side flip.
- Andromoss vs Sprig: easy 47.0%, medium 51.0%, hard 50.0%; spread 4.0 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 59.5%, medium 80.5%, hard 91.5%; spread 32.0 points.
- Captain Bramble vs Sprig: easy 43.5%, medium 51.5%, hard 79.5%; spread 36.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 36.5%, medium 38.0%, hard 52.0%; spread 15.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.


## Tier2 matrices after swap

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨54.5%* | 🟨42.7%* | 🟨43.8%* | 🟨47.5%* |
| Andromoss | 🟨45.5%* | — | 🟥32.8% | 🟥33.7% | 🟨52.2%* |
| Captain Bramble | 🟨57.3%* | 🟩67.2% | — | 🟨50.0%* | 🟨54.7%* |
| Duskmantle | 🟨56.2%* | 🟩66.3% | 🟨50.0%* | — | 🟨49.3%* |
| Sprig | 🟨52.5%* | 🟨47.8%* | 🟨45.3%* | 🟨50.7%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨59.5% | 🟨50.5% | 🟨55.0% | 🟨46.0% |
| Andromoss | 🟨40.5% | — | 🟨41.0% | 🟨42.5% | 🟨42.5% |
| Captain Bramble | 🟨49.5% | 🟨59.0% | — | 🟨59.0% | 🟨45.5% |
| Duskmantle | 🟨45.0% | 🟨57.5% | 🟨41.0% | — | 🟥29.5% |
| Sprig | 🟨54.0% | 🟨57.5% | 🟨54.5% | 🟩70.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨56.0% | 🟨42.5% | 🟨43.5% | 🟨45.5% |
| Andromoss | 🟨44.0% | — | 🟥30.5% | 🟥36.0% | 🟨48.0% |
| Captain Bramble | 🟨57.5% | 🟩69.5% | — | 🟨53.0% | 🟨48.5% |
| Duskmantle | 🟨56.5% | 🟩64.0% | 🟨47.0% | — | 🟨46.0% |
| Sprig | 🟨54.5% | 🟨52.0% | 🟨51.5% | 🟨54.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨48.0% | 🟥35.0% | 🟥33.0% | 🟨51.0% |
| Andromoss | 🟨52.0% | — | 🟥27.0% | 🟥22.5% | 🟩66.0% |
| Captain Bramble | 🟩65.0% | 🟩73.0% | — | 🟥38.0% | 🟩70.0% |
| Duskmantle | 🟩67.0% | 🟩77.5% | 🟩62.0% | — | 🟩72.5% |
| Sprig | 🟨49.0% | 🟥34.0% | 🟥30.0% | 🟥27.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 59.5%, medium 56.0%, hard 48.0%; spread 11.5 points; observed favored-side flip.
- Sir Champignon vs Captain Bramble: easy 50.5%, medium 42.5%, hard 35.0%; spread 15.5 points; observed favored-side flip.
- Sir Champignon vs Duskmantle: easy 55.0%, medium 43.5%, hard 33.0%; spread 22.0 points; observed favored-side flip.
- Sir Champignon vs Sprig: easy 46.0%, medium 45.5%, hard 51.0%; spread 5.5 points; observed favored-side flip.
- Andromoss vs Sprig: easy 42.5%, medium 48.0%, hard 66.0%; spread 23.5 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 59.0%, medium 53.0%, hard 38.0%; spread 21.0 points; observed favored-side flip.
- Captain Bramble vs Sprig: easy 45.5%, medium 48.5%, hard 70.0%; spread 24.5 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 29.5%, medium 46.0%, hard 72.5%; spread 43.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.


## Findings

The two one-star guards now give identical matchup rates and50% head-to-head, expected for mechanically identical spells under paired seeds. The new two-star offensive loadouts separate Champignon and Bramble again; pooled two-star cells are mostly40–60%, with Bramble/Andromoss67.2% and Duskmantle/Andromoss66.3% beyond that range. This is not a claim of equal human/full-kit balance.

Difficulty flips remain significant descriptively: tier2 Duskmantle vs Sprig29.5/46/72.5% (43-point spread); Champignon vs Duskmantle55/43.5/33%; Bramble vs Sprig45.5/48.5/70%. Do not tune only pooled values. All per-level flags retained above. No additional tuning applied while Tines clarification is outstanding.

Reproduce on this loadout revision:

- `pnpm balance:roster --tier=1 --seeds=100 --seed=20261119`
- `pnpm balance:roster --tier=2 --seeds=100 --seed=20261119`

[Raw tier1](balance-tier-1.json) · [Raw tier2](balance-tier-2.json). Prior warning/guard/loadout reports require their recorded Git revision, not this changed layout.

Validation:183 simulation tests, production build and16 desktop/mobile browser checks passed, including actual1-star guard costs,2-star Sweep/Tin Caps costs/effects, online synchronization/reconnect and shared cast sprites. One-star guards beat Duskmantle77.2% pooled; this large pooled imbalance finding is retained alongside level flags, without unsolicited further tuning.
