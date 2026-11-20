Historical Andromoss kit; [current adopted kit and matrices](andromoss-kit-review.md) supersede its Andromoss rows. Other heroes’ powers are unchanged.

# Three-star baseline with useful opportunities

## Accepted earlier tiers and next step

D134 closes the two-star pass under the user’s no-universal-loser condition: no hero loses every matchup across all levels. Andromoss loses all Easy/Medium tier2 pairings, but beats Champignon52% and Sprig77.5% on Hard; Champignon loses all Hard tier2 pairings but wins Easy/Medium matchups. Do not describe these as evenly balanced or erase the difficulty split. Freeze current spell powers/costs and move to tier3.

## Current three-star spells (no power changes)

| Hero | Spell | Effect | Duration | Before → after |
|---|---|---|---|---|
| Sir Champignon | Spore Ward | Block the next hostile spell; no undoing an effect already applied | 12 s, or consumed by one block | Unchanged |
| Andromoss | Sticky Fingers | Steal up to two available enemy stars, capacity capped; empty meter wasted | Instant | Unchanged |
| Captain Bramble | Iron Resolve | Block the next three mistakes (mole miss, rabbit or empty hit) | 8 s, or three charges consumed | Unchanged |
| Duskmantle | Twilight Siphon | +2 points for each final manual mole hit; stars and automatic hits get no bonus | 7 s | Unchanged |
| Sprig | Weed Out | Remove hostile effects/queued Tin Caps/persistent armor immediately, then block one hostile spell | Instant cleanse +6 s ward | Unchanged |

All cost3 stars; zero hostile warnings; shared cast freeze remains. Compared with the earlier-tier spells, the currently stronger one-star Borrowed Spark still steals all stars while three-star Sticky Fingers steals at most two; the earlier unresolved assignment/value concern is preserved, not silently fixed. One-star guards still have two permanent charges while Iron Resolve is three charges/8 s; this pass measures existing rules, not an assumption higher cost guarantees more value.

## Diagnostic casting carried forward

Adopt the same100 ms target visibility and seeded200–400 ms decision delay×3/2/1 for Easy/Medium/Hard. Tiers1/2 keep their accepted conditions. Tier3 now uses:

- Spore Ward: no active ward; public opponent loadout is Andromoss and enemy charge≥2 (prepare before zero-warning theft at3). No invented threat against self-buff-only tier3 heroes.
- Sticky Fingers: enemy charge≥2 and no active enemy ward; avoid paying3 to steal only one or casting into known protection.
- Iron Resolve: unguarded own visible mole with≤1000 ms remaining; no replacement of remaining guard charges.
- Twilight Siphon: visible own mole, no active Siphon renewal.
- Weed Out: active hostile effects/pending armor charges or persistent armor, otherwise the same theft-threat ward preparation. Cleanse may still be useful while its existing ward is active.

A valid opportunity gets one delay sample; loss/replacement cancels and returns get fresh samples. Bots keep hitting while waiting; pause/cast freeze decisions. Public charge checks do not add a target visibility gate. Normal full-kit bot decisions remain unchanged; this extends isolated tier3 diagnostics only. Tier4 remains immediate. A new flat siphonBonusPoints counter records exact bonus points without changing scoring/RNG.

## Method

15,000 real-simulation matches:7,500 retained immediate-casting controls and7,500 adopted-opportunity games,100 paired seeds/pair/difficulty,200 games per distinct pairing/level,100 mirrors per hero/level, seed20261119, zero unfinished. Three-slot cap; other tiers cannot cast. Spell powers, wave pacing, hit accuracy/reactions and warnings unchanged. This is a baseline strategy comparison, not strength tuning.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.0% | 🟥37.5% | 🟥36.8%* | 🟨50.0% |
| Andromoss | 🟨50.0% | — | 🟨47.8% | 🟨49.3%* | 🟨50.0% |
| Captain Bramble | 🟩62.5% | 🟨52.2% | — | 🟨49.8%* | 🟩62.5% |
| Duskmantle | 🟩63.2%* | 🟨50.7%* | 🟨50.2%* | — | 🟩63.2%* |
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
| Andromoss | 🟨50.0% | — | 🟨47.5% | 🟨48.5% | 🟨50.0% |
| Captain Bramble | 🟩65.5% | 🟨52.5% | — | 🟨54.0% | 🟩65.5% |
| Duskmantle | 🟩60.5% | 🟨51.5% | 🟨46.0% | — | 🟩60.5% |
| Sprig | 🟨50.0% | 🟨50.0% | 🟥34.5% | 🟥39.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.0% | 🟥32.0% | 🟥23.5% | 🟨50.0% |
| Andromoss | 🟨50.0% | — | 🟨48.0% | 🟨50.5% | 🟨50.0% |
| Captain Bramble | 🟩68.0% | 🟨52.0% | — | 🟨42.0% | 🟩68.0% |
| Duskmantle | 🟩76.5% | 🟨49.5% | 🟨58.0% | — | 🟩76.5% |
| Sprig | 🟨50.0% | 🟨50.0% | 🟥32.0% | 🟥23.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Duskmantle: easy 47.5%, medium 39.5%, hard 23.5%; spread 24.0 points.
- Andromoss vs Duskmantle: easy 49.0%, medium 48.5%, hard 50.5%; spread 2.0 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 53.5%, medium 54.0%, hard 42.0%; spread 12.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 52.5%, medium 60.5%, hard 76.5%; spread 24.0 points.

Flips are descriptive changes across AI levels, not significance claims.


## Why the ward/cleanse rows cannot establish full strength

Sticky Fingers is the only hostile tier3 spell. There is no curse, veil, rabbit pressure or Tin Caps in these isolated games; Sprig’s cleanse has no hostile modifier to remove. Spore Ward/Weed Out correctly cast only against Andromoss, leaving three distinct pairings per hero without any relevant counter target. Against each other they are effectively baseline hitting and produce50% paired results; they also have identical score outcomes against the other matchups despite12 vs6 s wards.

The theft bot avoids active wards. **Zero recorded ward blocks is not proof of zero defensive value**: protection can deter a cast, and spending charge on a ward also removes stealable charge. These diagnostics do not quantify counterfactual denial. Against heroes whose tier3 is a self-buff, defensive wards cannot directly change score, so losing rows are expected blind spots. Do not buff them toward50% from this matrix alone; mixed-tier/full-kit and human tests are required.

## Observed coverage

Distinct-opponent appearances only; most ward rows include three pairings where no cast is useful. Guard prevention and Siphon bonus points are exact observed totals, not counterfactual estimates. Stolen and received stars are separate because capacity overflow can occur.

| Casting | AI | Hero | Casts/match | Ward blocks | Guard points prevented/match | Siphon bonus points/match | Stars stolen/received per match |
|---|---|---|---:|---:|---:|---:|---|
| Immediate | easy | champignon | 1.10 | 73 | 0.00 | 0.00 | 0.00/0.00 |
| Immediate | easy | andromoss | 1.54 | 0 | 0.00 | 0.00 | 1.62/1.62 |
| Immediate | easy | captain-bramble | 1.12 | 0 | 22.29 | 0.00 | 0.00/0.00 |
| Immediate | easy | duskmantle | 1.11 | 0 | 0.00 | 9.22 | 0.00/0.00 |
| Immediate | easy | sprig | 1.10 | 46 | 0.00 | 0.00 | 0.00/0.00 |
| Immediate | medium | champignon | 2.69 | 238 | 0.00 | 0.00 | 0.00/0.00 |
| Immediate | medium | andromoss | 4.23 | 0 | 0.00 | 0.00 | 4.34/4.34 |
| Immediate | medium | captain-bramble | 2.64 | 0 | 31.33 | 0.00 | 0.00/0.00 |
| Immediate | medium | duskmantle | 2.63 | 0 | 0.00 | 30.27 | 0.00/0.00 |
| Immediate | medium | sprig | 2.68 | 143 | 0.00 | 0.00 | 0.00/0.00 |
| Immediate | hard | champignon | 5.19 | 522 | 0.00 | 0.00 | 0.00/0.00 |
| Immediate | hard | andromoss | 9.03 | 0 | 0.00 | 0.00 | 9.72/9.72 |
| Immediate | hard | captain-bramble | 5.14 | 0 | 43.77 | 0.00 | 0.00/0.00 |
| Immediate | hard | duskmantle | 4.98 | 0 | 0.00 | 83.72 | 0.00/0.00 |
| Immediate | hard | sprig | 5.13 | 305 | 0.00 | 0.00 | 0.00/0.00 |
| Opportunity | easy | champignon | 0.17 | 0 | 0.00 | 0.00 | 0.00/0.00 |
| Opportunity | easy | andromoss | 1.03 | 0 | 0.00 | 0.00 | 2.06/2.06 |
| Opportunity | easy | captain-bramble | 0.91 | 0 | 20.64 | 0.00 | 0.00/0.00 |
| Opportunity | easy | duskmantle | 0.99 | 0 | 0.00 | 7.99 | 0.00/0.00 |
| Opportunity | easy | sprig | 0.17 | 0 | 0.00 | 0.00 | 0.00/0.00 |
| Opportunity | medium | champignon | 0.28 | 0 | 0.00 | 0.00 | 0.00/0.00 |
| Opportunity | medium | andromoss | 3.62 | 0 | 0.00 | 0.00 | 7.23/7.23 |
| Opportunity | medium | captain-bramble | 2.14 | 0 | 38.88 | 0.00 | 0.00/0.00 |
| Opportunity | medium | duskmantle | 2.25 | 0 | 0.00 | 28.65 | 0.00/0.00 |
| Opportunity | medium | sprig | 0.28 | 0 | 0.00 | 0.00 | 0.00/0.00 |
| Opportunity | hard | champignon | 0.30 | 0 | 0.00 | 0.00 | 0.00/0.00 |
| Opportunity | hard | andromoss | 8.53 | 0 | 0.00 | 0.00 | 17.05/17.05 |
| Opportunity | hard | captain-bramble | 4.35 | 0 | 60.53 | 0.00 | 0.00/0.00 |
| Opportunity | hard | duskmantle | 4.30 | 0 | 0.00 | 83.23 | 0.00/0.00 |
| Opportunity | hard | sprig | 0.30 | 0 | 0.00 | 0.00 | 0.00/0.00 |

## Pairwise policy comparison, pooled

| Row vs column | Immediate | Useful opportunity |
|---|---:|---:|
| champignon vs andromoss | 50.0% | 50.0% |
| champignon vs captain-bramble | 40.5% | 37.5% |
| champignon vs duskmantle | 37.2% | 36.8% |
| champignon vs sprig | 50.0% | 50.0% |
| andromoss vs captain-bramble | 45.2% | 47.8% |
| andromoss vs duskmantle | 44.0% | 49.3% |
| andromoss vs sprig | 50.0% | 50.0% |
| captain-bramble vs duskmantle | 46.3% | 49.8% |
| captain-bramble vs sprig | 59.5% | 62.5% |
| duskmantle vs sprig | 62.8% | 63.2% |

## Interpretation and next discussion

Bramble’s three-block guard and Duskmantle’s manual-hit bonus yield measurable benefits against counter-only heroes. Siphon gains scale strongly with successful manual hits: about8/28.6/83.2 observed bonus points per game on Easy/Medium/Hard under opportunity casting. The Hard benefit is large, but this does not establish whether+2/7 s is too much when other-tier attacks/cleanses are available.

The near50% theft matchups are resource denial interactions; they do not justify treating Sticky Fingers as equally strong to one-star Borrowed Spark. Per-level flips/spreads remain; small differences and tiny flips (e.g. Andromoss/Duskmantle49–50.5%) are descriptive, not statistical-significance claims. Do not force all spells toward50% using a test that does not exercise their tactical role. No spell tuning adopted; discuss mixed-tier probes or intended tier3 roles next.

Validation:193 simulation tests and production build pass. No player-facing game behavior/UI change; normal-mode decisions unchanged, so browser checks were not repeated.

Reproduce:

- `pnpm balance:roster --tier=3 --casting=immediate --seeds=100 --seed=20261119 --report=tier3-immediate-control`
- `pnpm balance:roster --tier=3 --seeds=100 --seed=20261119`

[Immediate full matrices](tier3-immediate-control.md) · [Current full matrices](balance-tier-3.md).
