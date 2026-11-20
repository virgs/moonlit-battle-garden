# Tin Caps: next three moles without a timer

| Hero | Spell | Before → current |
|---|---|---|
| Sir Champignon | Clean Sweep | Unchanged: immediate busiest-column hit and continuous arrivals / 3 s / normal rewards and rabbit penalties |
| Andromoss | Borrowed Spark | Unchanged live: all enemy charge at resolution, capacity capped, 650 ms warning following cast freeze. Empty meter wastes cast. Three-star cap is experimental, not adopted. |
| Captain Bramble | Tin Caps | Three current/future moles within 3 s → next three future mole arrivals, no duration, one extra hit each |
| Duskmantle | Ominous Bud | Unchanged: three marks / 8 s / +8 miss penalty (16 total) |
| Sprig | Gentle Tending | Unchanged: +0.75 s once per current/arriving target / 6 s aura, includes stars/rabbits |

## Exact semantics

Tin Caps begins at hostile resolution after the existing 650 ms warning following cast freeze. It does not alter visible moles. Three pending charges consume only newly appearing moles, regardless of natural/magic origin; stars/rabbits do not consume charges. No clock expires pending quota or applied armor. Each affected target keeps its extra strike until used, target expiry/disappearance or cleanse. Recast refreshes remaining quota to three rather than adding charges; already armored targets retain armor. Cleanse/round reset clears quota/armor. Stronger Heavy Harvest takes precedence rather than stacking armor: a future mole already receiving stronger armor still consumes a Tin Caps charge. Heavy Harvest remains four moles/two extra hits/3 s.

The effect HUD shows pending quota or active persistent armor, then disappears. New tinCharges/persistentArmor fields synchronize with protocol12. Normal bot cleanse/sweep awareness now recognizes these states; isolated opportunity policy remains the same visible-unarmored-mole witness and delays, even though future-only armor could warrant a different strategy later. No pacing, accuracy, reaction, casting-delay, point, other-power or sprite changes.

## Method

**15,000 matches**, zero unfinished: 7,500 historical timed-control and 7,500 adopted next-mole games. Both use 100 paired seeds, 200 matches per distinct pairing/difficulty, 100 mirrors per hero/difficulty, real simulation/bots, seed20261119, isolated tier1 with one charge slot. All 7,500 control battle records exactly reproduce the previous adopted report, including statistics. New timed-control code path retained only for reproduction.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.8% | 🟨42.8%* | 🟩71.0% | 🟨57.7% |
| Andromoss | 🟥38.2% | — | 🟥28.0% | 🟨41.8% | 🟨43.2% |
| Captain Bramble | 🟨57.2%* | 🟩72.0% | — | 🟩78.0% | 🟨59.0% |
| Duskmantle | 🟥29.0% | 🟨58.2% | 🟥22.0% | — | 🟨42.5%* |
| Sprig | 🟨42.3% | 🟨56.8% | 🟨41.0% | 🟨57.5%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩64.5% | 🟨56.0% | 🟩71.0% | 🟨59.5% |
| Andromoss | 🟥35.5% | — | 🟥33.0% | 🟨41.0% | 🟨45.0% |
| Captain Bramble | 🟨44.0% | 🟩67.0% | — | 🟩71.0% | 🟨56.0% |
| Duskmantle | 🟥29.0% | 🟨59.0% | 🟥29.0% | — | 🟥37.5% |
| Sprig | 🟨40.5% | 🟨55.0% | 🟨44.0% | 🟩62.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.0% | 🟨44.5% | 🟩74.5% | 🟨51.5% |
| Andromoss | 🟥39.0% | — | 🟥25.0% | 🟨41.5% | 🟨42.0% |
| Captain Bramble | 🟨55.5% | 🟩75.0% | — | 🟩82.0% | 🟨57.5% |
| Duskmantle | 🟥25.5% | 🟨58.5% | 🟥18.0% | — | 🟥37.0% |
| Sprig | 🟨48.5% | 🟨58.0% | 🟨42.5% | 🟩63.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨60.0% | 🟥28.0% | 🟩67.5% | 🟩62.0% |
| Andromoss | 🟨40.0% | — | 🟥26.0% | 🟨43.0% | 🟨42.5% |
| Captain Bramble | 🟩72.0% | 🟩74.0% | — | 🟩81.0% | 🟩63.5% |
| Duskmantle | 🟥32.5% | 🟨57.0% | 🟥19.0% | — | 🟨53.0% |
| Sprig | 🟥38.0% | 🟨57.5% | 🟥36.5% | 🟨47.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 56.0%, medium 44.5%, hard 28.0%; spread 28.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 37.5%, medium 37.0%, hard 53.0%; spread 16.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.


## Bramble versus before → after

| Opponent | Pooled | Easy | Medium | Hard |
|---|---:|---:|---:|---:|
| champignon | 53.5% → 57.2% | 38.0% → 44.0% | 56.0% → 55.5% | 66.5% → 72.0% |
| andromoss | 69.0% → 72.0% | 64.5% → 67.0% | 69.5% → 75.0% | 73.0% → 74.0% |
| duskmantle | 74.0% → 78.0% | 65.5% → 71.0% | 79.0% → 82.0% | 77.5% → 81.0% |
| sprig | 56.7% → 59.0% | 53.5% → 56.0% | 50.5% → 57.5% | 66.0% → 63.5% |

## Findings and limitations

Removing the timer strengthens Bramble in every pooled matchup, with mixed individual-level movement. It now beats every opponent on Hard; its Champignon matchup still flips between Easy and harder levels, and Bramble remains strongly favored against Duskmantle. This is a reliable way to deliver all three armor charges, not a demonstrated balance improvement. Small changes are descriptive, not statistical-significance claims.

This is a one-star diagnostic, not a full-kit or human verdict. The existing visible-target cast witness is an imperfect strategy for a future-target spell and can cancel/restart decisions before queued charges could be useful. Recast refresh and one-attempt ordinary hit accuracy versus repeat armor strikes also influence results; preserve this policy for controls rather than tune blindly to 50%. Human playtests and spell coverage/strategy checks remain necessary.

## Reproduction

- [tin-next-control](tin-next-control.md), [raw data](tin-next-control.json): `pnpm balance:roster --tier=1 --seeds=100 --seed=20261119 --tin-caps=timed --report=tin-next-control`
- [balance-tier-1](balance-tier-1.md), [raw data](balance-tier-1.json): `pnpm balance:roster --tier=1 --seeds=100 --seed=20261119 --tin-caps=next --report=balance-tier-1`

Validation: 172 simulation tests, production build and 12 desktop/mobile browser checks passed, including exact future quota, persistent armor, aura presentation, online synchronization, reconnect and host departure.
