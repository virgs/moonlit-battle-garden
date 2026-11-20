Historical Andromoss kit; [current adopted kit and matrices](andromoss-kit-review.md) supersede its Andromoss rows. Other heroes’ powers are unchanged.

# Four-star baseline with useful opportunities

## Current spells, before→after

All powers and durations below are **unchanged**; this pass measures the fourth tier and extends the existing diagnostic casting policy. Tiers1–3 remain fixed. No hostile warnings, new art or normal-mode AI changes.

| Hero | Four-star spell | Current effect | Duration |
|---|---|---|---|
| Sir Champignon | Royal Cleanup | Immediate full-board normal hit, then full-board hits every250 ms; also3 mistake guards | Sweep3 s; guards12 s or consumed |
| Andromoss | Double Trouble | Extra enemy targets every650 ms,70% rabbits/30% moles, subject to magical-target/empty-hole caps | 8.5 s |
| Captain Bramble | Heavy Harvest | Armor4 current/future enemy moles,2 extra hits each (3 hits total) | 3 s armor/quota window |
| Duskmantle | Withering Pact | Mark4 current/future enemy moles; each miss adds6 penalty points (14 total) | 8 s mark/quota window |
| Sprig | Garden Clockwork | Fix the2 busiest columns; one normal single-target action every250 ms across them; stars collected, rabbit penalties applied, armor takes separate actions | 8 s |

Royal guards apply before the initial hit and can absorb rabbit penalties; all normal rewards/guard/armor/expiry rules remain. Double Trouble accelerates **extra magical arrivals**, not the opponent’s natural wave clock or target lifetimes; those still follow pacing. Clockwork retains its200 ms visibility condition, does not hit both full columns per pulse, and has no new immediate hit.

Cross-tier findings preserved for future discussion: one-star Ominous Bud is3 marks/+8 whereas Withering Pact is4/+6 with the same8 s window. Two-star Helping Tines is immediate/continuous for10 s versus Clockwork’s delayed250 ms single-target pulses/8 s. This baseline does not silently correct these differences or assume higher cost guarantees better value.

## Adopted isolated four-star opportunities

Same100 ms target visibility and seeded200–400 ms decision delay×3/2/1 for Easy/Medium/Hard, sampled once per opportunity. Continue hitting during decisions; cancel/restart if witness/columns/validity change; pause/cast freezes clocks. All four isolated tiers now default to opportunity casting; explicit immediate policy remains for controls. Normal full-kit priorities/schedule unchanged.

- Royal Cleanup: visible own mole/star, no active sweep refresh. Rabbits are not an automatic veto because the spell adds3 mistake guards.
- Double Trouble: visible enemy mole/star, no active stronger pressure renewal, no casting into a ward.
- Heavy Harvest: visible enemy mole needing heavy armor, no active heavy-armor renewal, no ward; light armor may be upgraded.
- Withering Pact: visible unmarked enemy mole, no active mark window renewal, no ward.
- Garden Clockwork: useful/urgent target in the two busiest columns; avoid rabbit-containing selections unless a mole is urgent; no active automation renewal.

Spawn-affecting spells still use current visible witnesses, a strategy assumption that can cancel beneficial future-oriented casts. Do not reinterpret the matrix as optimal play.

## Method

15,000 actual-simulation matches:7,500 immediate controls and7,500 adopted-opportunity games,100 paired seeds per matchup/difficulty (200 distinct games/level),100 mirrors per hero/level, seed20261119, zero unfinished. Four-slot cap, only tier4 enabled. New flat markBonusPointsLost counter tracks only extra marked-miss points actually lost after guards; scoring/RNG remain unchanged. All earlier-tier rules/tests preserved.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩68.8%* | 🟨49.7%* | 🟩66.3% | 🟨57.5%* |
| Andromoss | 🟥31.2%* | — | 🟥30.8%* | 🟨43.2%* | 🟨46.0%* |
| Captain Bramble | 🟨50.3%* | 🟩69.2%* | — | 🟩68.8%* | 🟨59.2%* |
| Duskmantle | 🟥33.7% | 🟨56.8%* | 🟥31.2%* | — | 🟨45.7%* |
| Sprig | 🟨42.5%* | 🟨54.0%* | 🟨40.8%* | 🟨54.3%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨55.5% | 🟨55.5% | 🟨57.5% | 🟨51.0% |
| Andromoss | 🟨44.5% | — | 🟨48.5% | 🟨51.5% | 🟨44.0% |
| Captain Bramble | 🟨44.5% | 🟨51.5% | — | 🟨51.5% | 🟨45.0% |
| Duskmantle | 🟨42.5% | 🟨48.5% | 🟨48.5% | — | 🟨41.0% |
| Sprig | 🟨49.0% | 🟨56.0% | 🟨55.0% | 🟨59.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩68.0% | 🟨52.0% | 🟩70.0% | 🟨50.5% |
| Andromoss | 🟥32.0% | — | 🟥33.0% | 🟨50.5% | 🟨42.0% |
| Captain Bramble | 🟨48.0% | 🟩67.0% | — | 🟩74.0% | 🟨55.5% |
| Duskmantle | 🟥30.0% | 🟨49.5% | 🟥26.0% | — | 🟨41.5% |
| Sprig | 🟨49.5% | 🟨58.0% | 🟨44.5% | 🟨58.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩83.0% | 🟨41.5% | 🟩71.5% | 🟩71.0% |
| Andromoss | 🟥17.0% | — | 🟥11.0% | 🟥27.5% | 🟨52.0% |
| Captain Bramble | 🟨58.5% | 🟩89.0% | — | 🟩81.0% | 🟩77.0% |
| Duskmantle | 🟥28.5% | 🟩72.5% | 🟥19.0% | — | 🟨54.5% |
| Sprig | 🟥29.0% | 🟨48.0% | 🟥23.0% | 🟨45.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 55.5%, medium 68.0%, hard 83.0%; spread 27.5 points.
- Sir Champignon vs Captain Bramble: easy 55.5%, medium 52.0%, hard 41.5%; spread 14.0 points; observed favored-side flip.
- Sir Champignon vs Sprig: easy 51.0%, medium 50.5%, hard 71.0%; spread 20.5 points.
- Andromoss vs Captain Bramble: easy 48.5%, medium 33.0%, hard 11.0%; spread 37.5 points.
- Andromoss vs Duskmantle: easy 51.5%, medium 50.5%, hard 27.5%; spread 24.0 points; observed favored-side flip.
- Andromoss vs Sprig: easy 44.0%, medium 42.0%, hard 52.0%; spread 10.0 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 51.5%, medium 74.0%, hard 81.0%; spread 29.5 points.
- Captain Bramble vs Sprig: easy 45.0%, medium 55.5%, hard 77.0%; spread 32.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 41.0%, medium 41.5%, hard 54.5%; spread 13.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.


## Observed coverage

Distinct-opponent averages per character appearance; mark extra lost is on the victim’s row, not damage attributed to the casting hero. Guard prevention includes normal and marked penalties. Automation counters are final hits only, excluding intermediate armor strikes. These observations do not estimate counterfactual spell value.

| Policy | AI | Hero | Casts/match | Guard points prevented/match | Extra marked-miss points lost/match | Automation mole/star/rabbit hits per match |
|---|---|---|---:|---:|---:|---|
| Immediate | easy | champignon | 0.54 | 11.34 | 1.16 | 0.00/0.00/0.00 |
| Immediate | easy | andromoss | 0.52 | 0.00 | 1.51 | 0.00/0.00/0.00 |
| Immediate | easy | captain-bramble | 0.54 | 0.00 | 1.51 | 0.00/0.00/0.00 |
| Immediate | easy | duskmantle | 0.52 | 0.00 | 0.00 | 0.00/0.00/0.00 |
| Immediate | easy | sprig | 0.51 | 0.00 | 1.33 | 3.84/0.08/0.83 |
| Immediate | medium | champignon | 1.92 | 46.84 | 1.25 | 0.00/0.00/0.00 |
| Immediate | medium | andromoss | 1.85 | 0.00 | 2.73 | 0.00/0.00/0.00 |
| Immediate | medium | captain-bramble | 1.90 | 0.00 | 2.47 | 0.00/0.00/0.00 |
| Immediate | medium | duskmantle | 1.91 | 0.00 | 0.00 | 0.00/0.00/0.00 |
| Immediate | medium | sprig | 1.89 | 0.00 | 2.11 | 16.84/0.26/4.32 |
| Immediate | hard | champignon | 3.88 | 90.65 | 1.25 | 0.00/0.00/0.00 |
| Immediate | hard | andromoss | 3.65 | 0.00 | 2.76 | 0.00/0.00/0.00 |
| Immediate | hard | captain-bramble | 3.54 | 0.00 | 2.57 | 0.00/0.00/0.00 |
| Immediate | hard | duskmantle | 3.90 | 0.00 | 0.00 | 0.00/0.00/0.00 |
| Immediate | hard | sprig | 3.80 | 0.00 | 2.12 | 23.99/0.44/9.11 |
| Opportunity | easy | champignon | 0.45 | 9.04 | 1.11 | 0.00/0.00/0.00 |
| Opportunity | easy | andromoss | 0.43 | 0.00 | 1.52 | 0.00/0.00/0.00 |
| Opportunity | easy | captain-bramble | 0.44 | 0.00 | 1.39 | 0.00/0.00/0.00 |
| Opportunity | easy | duskmantle | 0.41 | 0.00 | 0.00 | 0.00/0.00/0.00 |
| Opportunity | easy | sprig | 0.33 | 0.00 | 1.26 | 2.21/0.17/0.48 |
| Opportunity | medium | champignon | 1.85 | 44.14 | 1.74 | 0.00/0.00/0.00 |
| Opportunity | medium | andromoss | 1.75 | 0.00 | 3.20 | 0.00/0.00/0.00 |
| Opportunity | medium | captain-bramble | 1.79 | 0.00 | 2.71 | 0.00/0.00/0.00 |
| Opportunity | medium | duskmantle | 1.78 | 0.00 | 0.00 | 0.00/0.00/0.00 |
| Opportunity | medium | sprig | 1.75 | 0.00 | 2.21 | 15.49/0.84/3.56 |
| Opportunity | hard | champignon | 3.80 | 87.21 | 2.08 | 0.00/0.00/0.00 |
| Opportunity | hard | andromoss | 3.40 | 0.00 | 3.73 | 0.00/0.00/0.00 |
| Opportunity | hard | captain-bramble | 3.40 | 0.00 | 3.19 | 0.00/0.00/0.00 |
| Opportunity | hard | duskmantle | 3.68 | 0.00 | 0.00 | 0.00/0.00/0.00 |
| Opportunity | hard | sprig | 3.82 | 0.00 | 2.69 | 24.28/1.16/8.35 |

## Pooled policy comparison

| Row vs column | Immediate | Useful opportunity |
|---|---:|---:|
| champignon vs andromoss | 64.3% | 68.8% |
| champignon vs captain-bramble | 52.5% | 49.7% |
| champignon vs duskmantle | 64.7% | 66.3% |
| champignon vs sprig | 59.3% | 57.5% |
| andromoss vs captain-bramble | 30.3% | 30.8% |
| andromoss vs duskmantle | 41.2% | 43.2% |
| andromoss vs sprig | 52.2% | 46.0% |
| captain-bramble vs duskmantle | 66.5% | 68.8% |
| captain-bramble vs sprig | 59.8% | 59.2% |
| duskmantle vs sprig | 45.7% | 45.7% |

## Findings and limits

- Champignon wins all Easy/Medium pairings, but several are near50% (e.g.50.5% against Sprig Medium). Bramble wins all Hard pairings:58.5% against Champignon and77–89% against the other three. No hero wins every matchup at every level.
- Bramble is pooled50.3% against Champignon,69.2% against Andromoss,68.8% against Duskmantle and59.2% against Sprig; its0.3-point edge against Champignon is not a significance claim. Do not call near50% a proven dominance relationship.
- Easy averages only0.33–0.45 casts per hero/match; Hard3.4–3.82. Easy’s close results involve much less spell exposure, so they do not prove equal spell strength. Paired cast coverage matters as much as pooled percentages.
- Large difficulty spreads remain: Bramble/Andromoss51.5/67/89%; Bramble/Sprig45/55.5/77%, with a favored-side flip. Earlier-tier reaction differences are intentional.
- Inference from rules: heavy armor’s two extra strikes can make otherwise reachable fast targets escape, while slow Easy bots already miss many such targets. Royal’s board hits plus guards can mitigate penalties; observed prevented points average87.2 per Hard Champignon game. No causal counterfactual test of armor is claimed here.
- Clockwork’s normal rabbit penalties remain measurable, about8.4 automated rabbit hits per Hard game. Extra Double Trouble moles can also feed opponent rewards; origin-specific benefit attribution would require further coverage probes. Do not silently change these rules from that hypothesis.
- This is not full-kit/human balance. Different costs/earlier counters and normal bot spell choices are excluded. Preserve cross-tier concerns and the tier3 ward/cleanse blind spots for full-kit or targeted mixed-tier tests before concluding the roster is balanced. No power tuning adopted in this pass.

Validation:199 simulation tests and production build pass. No player-facing UI/rule changes, so browser checks were not repeated.

Reproduce:

- `pnpm balance:roster --tier=4 --casting=immediate --seeds=100 --seed=20261119 --report=tier4-immediate-control`
- `pnpm balance:roster --tier=4 --seeds=100 --seed=20261119`

[Immediate matrices](tier4-immediate-control.md) · [Current matrices](balance-tier-4.md).
