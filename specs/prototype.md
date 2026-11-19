# First playable: implementation defaults

Updated 2026-11-16. The user authorized coding and selected **Moonlit Battle Garden**. These values are provisional, reviewable defaults, not immutable requirements.

## Implemented

- Sir Champignon, Andromoss, Captain Bramble, Duskmantle and Sprig; four spells each.
- Offline local versus and easy/medium/hard AI.
- 3×3 gardens, both scores start at zero, winning lead X=100 (configurable), first to two round wins, three-second countdown.
- Empty hit: −4 points. Rabbit hit: −12. Missed mole: −8. Missing stars/rabbits is safe.
- Mole hit: 10 score. Star hit: 25 score and one magic star, capped at four. No combos yet.
- 25-second build/peak/recovery waves over a rising 60-second baseline, with independent natural clocks and bounded concurrency. Star opportunities use baseline virtual-clock offsets 5/14/22 seconds per wave, accelerated on the trailing board. See pacing.md and game.yaml.
- A score lead of at least X ends the round, with no real-time round limit. Simultaneous expiry penalties are resolved together before checking the difference. Ties continue with a centered bar. Scores/stars reset for the next round; round wins persist. The headless runner has a separate 30-minute total simulation cap to catch stalls; it does not award in-game wins.
- Mouse/touch and original keyboard grids. R/numpad + casts; Escape pauses. Local modes pause on tab hiding.
- One full-viewport Phaser canvas renders both gardens and the backdrop. React adds HUD and accessible hit areas over the canvas. Match play has no document scrolling or surrounding page header/footer.
- Desktop shows both boards. Mobile AI mode shows only the human board plus opponent status; narrow-screen local versus exposes both boards side by side. Short landscape single-board views move HUD panels to the sides to preserve playable target size.
- Local identity is always rendered left on two-board views, regardless of character. Same-computer Player 1 is left. Online play preserves this rule regardless of network seat; the guest view remaps players, winners, pending spells and events. See online.md.
- Boards preserve garden.png's 301×383 aspect ratio with one uniform scale. Every sprite and accessible hit region uses the same measured irregular source-art anchors in src/render/layout.ts. Resizing changes garden positions and a common scale, not independent x/y stretch factors.
- Shared fixed-step simulation with seeded randomness and independent bot randomness; no renderer dependency.
- Exactly one blue/red round-standing bar, using the oldest original sheet and border with a moving source window and 12 fps frames. Separate health is removed entirely. The bar maps score difference to progress toward X, reaching one color at a winning lead. Numeric scores remain secondary.
- The oldest board's roots and falling-earth animation follow garden position/scale. Left/right have different earth positions, counts, frame timing, and underground root orientation; the hole anchors remain unchanged.
- Cosmetic home ownership is chosen from the current characters and stays fixed across rounds. Distinct home background/music paths, portraits, and cast playback are prepared in presentation.yaml. Missing final files use the reused castle/music and recovered hero placeholders. Only final files remain for these presentation slots. See presentation.md.
- Wave scheduling resets identically each round. Natural demand, independent star opportunities, and magical pressure have separate scheduling rules and random streams. See pacing.md.

## Exact initial spells

Casting freezes both boards for 1500 ms with a separate presentation clock; target/effect/pacing/cooldown timers and input stop for that hold. Casting consumes the exact current charge, with at least 1800 ms between casts. Hostile spells warn for 650 ms before resolving. Spore Ward blocks any one hostile spell, including star copying/theft, then is consumed.

| Character / tier | Behavior |
| --- | --- |
| Champignon 1 | Clean Sweep: hit current/new targets in one fixed column for 3 active seconds: normal mole points, rabbit penalties and star collection. |
| Champignon 2 | Mushroom Guard: block one mistake within 12 seconds. |
| Champignon 3 | Block the next hostile spell within 12 seconds. |
| Champignon 4 | Three-second normal-hit sweep plus three mistake blocks within 12 seconds. |
| Andromoss 1 | Steal all enemy stars at hostile resolution after the warning, filling own charge up to four. If no enemy star is available, there is no effect; the charge is still spent. |
| Andromoss 2 | Add extra rabbits for 7.5 seconds without replacing the normal mole/star spawn schedule. |
| Andromoss 3 | Transfer up to two enemy stars, capped at four total. If none are available, there is no effect; the charge is still spent. |
| Andromoss 4 | Extra rabbit-heavy magical waves for 8.5 seconds, with a 30% mole chance and bounded magical concurrency. Natural clocks and the score-pressure modifier are unchanged by the attack. |

Stronger pressure replaces weaker pressure; identical effects refresh duration rather than multiplying it. Extra rabbits only occupy empty holes. Shields cover missed moles, empty hits, and rabbit hits. Fresh guards replace existing guards rather than accumulating unlimited charges.

## AI balance

`pnpm balance` runs 100 paired seeds per difficulty (600 matches). Every seed swaps character sides; tick command order alternates. Reports include wins, draws/caps, duration, tier-by-tier spell coverage, and per-match JSON. Same-difficulty matchups are implemented; mixed-difficulty matrices and alternative policies remain future extensions.

Historical independent-health baseline Champignon win rates: 53% easy, 100% medium, 91% hard. Preserved in `reports/balance-baseline.*`. Medium/hard Andromoss never used tiers 1, 3, or 4; the first invasion also replaced moles with rabbits, easing an accurate defender's load.

The first bot iteration varied seeded spell-saving thresholds, added resource/ward-aware decisions, and spawned extra rabbits without replacing normal targets. All tiers now receive coverage. The score-difference rules supersede those old health-based results. The pre-wave score run gave Champignon 46.5% easy, 71.5% medium, and 95% hard. Wave pacing supersedes that baseline; see balance-latest.md for the current results and unfinished-match diagnostics. Balance is unfinished; consult the latest report and do not declare the game balanced.

## Pending

- Additional physical-network QA and an optional TURN relay; player-hosted rooms/recovery are already implemented.
- Cached/installable PWA startup and native mobile packaging.
- Per-spell effect art and optional large portraits; all five hero animation/icon sets and assigned homes/music are installed. No new asset generation in this phase.
- Final spell/bot balance, input rebinding, physical mobile testing, and release acceptance criteria.
- Mallow, Miyaya and Rootbeard remain deferred.


Score pressure now uses independent board clocks and up to 5% shorter natural/star intervals and new target lifetimes on the trailing board. Shared wave phases and all round resets remain identical. See pacing.md and reports/balance-score-pressure-comparison.md; Medium/Hard remain Champignon-favored, and three final Hard diagnostics were unfinished.

## Current AI and duration tuning

All levels use reproducible bounded reaction/action jitter and occasional hesitation; accuracy is 70% Easy, 87% Medium, 92% Hard. Hard retains 280 ms base reactions / 220 ms intervals versus Medium 560/360 and Easy 900/600. Stronger wave peaks and a 60-second ramp, plus a gentler 5% catch-up modifier, shorten matches. A 12,000-match held-out baseline/candidate comparison found no candidate caps in 6,000 matches. Mixed-character median rounds are 53/66/89 seconds; median matches 150/171/245 seconds. Hard remains Champignon-favored at 64.2%; this does not establish human balance. See reports/balance-duration-review.md.

## Five-character provisional kits (2026-11-18)

All heroes use the same stars, 1500 ms casting freeze, cooldown and 650 ms hostile warning. The latest swaps, active sweep and empty-theft rules supersede the original pair’s earlier defaults. Wards block any hostile cast before its target modifiers apply. Refreshes do not accumulate unlimited charges. New values live in `game.yaml` under `rosterSpells`.

| Hero | 1 star | 2 stars | 3 stars | 4 stars |
|---|---|---|---|---|
| Captain Bramble | Tin Caps: enemy current/new moles take one extra strike for 2 s | Bramble Brace: one mistake block for 8 s | Iron Resolve: three mistake blocks for 8 s | Heavy Harvest: enemy current/new moles take two extra strikes for 2 s |
| Duskmantle | Ominous Bud: mark one current/upcoming enemy mole within 8 s, +4 miss penalty | Violet Veil: target sprite opacity 72% for 6.5 s, shapes remain readable | Twilight Siphon: +2 points per manual mole hit for 7 s | Withering Pact: mark four current/upcoming moles within 8 s, +6 miss penalty each |
| Sprig | Gentle Tending: +700 ms to current targets, at most once per target | Helping Tines: automate one column for 6.5 s, including stars and normal rabbit penalties | Weed Out: clear hostile pending/active effects and block one hostile spell for 6 s | Garden Clockwork: automate two columns for 8 s, including stars and normal rabbit penalties |

Armor never changes stars/rabbits. A strike removes one armor pip without points or clearing the mole; the final hit earns the ordinary mole score. Armor expires even on surviving targets, and a weaker armor cast cannot replace stronger active armor. Marked mole misses use the normal mistake shield. Marks and unused marking charges expire with the 8 s window; cleanse removes both marks and armor. No automatic spell damage is added.

Sprig chooses the busiest one/two columns by current target count (all kinds; stable left-first ties). Automation uses one global action every **250 ms**, checks at least 200 ms of visibility and remaining lifetime, and hits every target kind in those columns. Each mole armor pip takes one separate action; the final hit clears the mole for the normal 10 points. Stars give normal 25 points plus one charge (capped at four). Rabbits give the normal −12 penalty, with normal mistake-shield handling. No empty-hole hits occur. Automation does not receive Duskmantle’s manual-hit bonus and replaces/refreshes a prior automation window rather than stacking. Its selected columns have faint green bounds anchored to actual hole regions.

Clean Sweep hits its selected column immediately and then on every simulation update after new spawns, for 3 active seconds. Royal Cleanup keeps its full-board initial hit and 250 ms pulses for 3 active seconds. Each pulse strikes every occupied, unexpired hole within its selected columns once. Clean Sweep chooses the busiest column at cast time (leftmost ties), keeping it fixed even if another column fills later. Base rewards match manual hits: mole +10, rabbit −12 (normal guards apply), star +25 and +1 charge capped at four. Armored moles take repeated strikes. Sprig automation uses these same base rewards. A winning initial sweep completes its casting presentation before resolving the round. All gameplay windows freeze during casts/pauses. Bots use sweep for danger or a clean multi-mole harvest; automated hits do not receive Duskmantle's manual-hit bonus.

Bramble armor lasts 3 seconds and applies to at most one/four moles at tiers 1/4, respectively, with one/two extra hits each. Existing targets consume the quota first; remaining quota applies to new arrivals. Stars/rabbits never consume it. Expiry/cleanse/round reset remove unused quota and armor. Target limits are provisional balance values.

All modifier windows, automation actions, warnings and target lifetimes use simulation time and stop during casting/pause/recovery. New-round players reset every modifier. Bots may retry surviving armored targets on later actions, prioritize marked moles after stars and use cleanse when afflicted; camouflage adds 200 ms reaction delay while leaving target kinds visible. This is one policy family, not proof of fair human play.

A 1,500-match paired/mirror diagnostic (20 seeds; all matchups; three levels) had zero caps. Bramble distinct-pair win rates were 66.3% Easy, 87.5% Medium, 85.0% Hard. The new three kits received coverage at all tiers after correcting Bramble’s early-guard policy; Champignon Easy tier 4 remains unused and Medium tier 4 rare in this small run. Inspect `reports/balance-roster.md`/JSON before tuning. Higher-level armor pressure remains an explicit imbalance under these bots. Do not tune solely to 50%; human playtesting and policy comparisons remain necessary.

The initial roster policy/report is preserved separately. Bramble’s inherited busy-board emergency was narrowed to actual guard tiers when unguarded and behind, restoring all-tier coverage without changing spell values. See `reports/balance-roster-review.md` for the before/after and remaining Champignon tier-coverage limits. Original-pair control matches are identical across this correction.

## Expanded before/after benchmark

D101 raises the default to 100 paired seeds per matchup: 200 matches per distinct cell and 100 mirrors per hero/level, totaling 7,500 matches per run. The before-retune and final runs share seed 20261118 and both finish without caps. Full current data is in `reports/balance-roster.json`; baseline in `balance-roster-before-retune.json`; comparison/matrices in `balance-retune-review.md`. The prior 20-seed findings above are historical, not the current sample.

An intermediate retuned run with the old Champignon policy exposed a severe scoring-opportunity regression. Its pair/coverage aggregates are retained in `balance-retune-initial-ai.json`. The final policy uses defensive sweeps for real danger rather than inheriting the old one-star guard spending behavior. The new mechanics still leave Bramble dominant and Champignon weak on Easy/Medium; do not call them balanced or hide unused spell-tier coverage. These tests inform the next design decision rather than authorizing unrequested spell changes.

## Current duration defaults and matrix view

I03 supersedes the earlier 3-second sweep / 6-second armor defaults: **Clean Sweep/Royal Cleanup clear for 1 active second; Tin Caps/Heavy Harvest armor lasts 2 active seconds**. Guard/ward/automation values, scoring, extra-hit counts, costs and AI policies were held fixed for duration trials.

Five candidates each ran 7,500 matches on the same 100 paired seeds, with no caps. The chosen settings improved every pooled Champignon matchup and reduced every Bramble matchup advantage versus the saved reference. A fresh default-config run reproduced the chosen trial’s full raw outcomes exactly. See `reports/balance-duration-review.md` and compact per-profile records. Baseline raw data is preserved in Git; the current full run remains `balance-roster.json`.

The main report is now a **pooled versus matrix**, using actual win counts rather than averaging unequal-sample percentages. Each distinct cell pools600 games (200 per AI level). Diagonals are omitted; mirrors are side-win diagnostics. Cells marked * have a greater-than-20-point difficulty spread, not a formal significance label. Keep the per-level data: Champignon vs Sprig is27.5% Easy, 30.5% Medium, 78.5% Hard despite 45.5% pooled. Duration tuning improves but does not solve the zero-point sweep tradeoff, cheap extra-hit pressure or missing Easy Champignon tier 3/4 bot coverage.


## Current correction (D104/D105/I04)

The one-second zero-reward sweep/two-second armor notes above are historical. Lasting spell windows now have a three-second minimum. Current diagnostics lead with three separate AI-level matrices. Instant transfers/extensions, action intervals, warning/cast/cooldown timing are exempt from that window minimum. See [normal-hit review](../reports/balance-normal-hits-review.md).


### Scope/resource correction (D106/I05)

One-star Sweep is limited to one column; only four-star Royal Cleanup covers the full board. Borrowed Spark steals all enemy charge (up to caster capacity four), and is wasted if the enemy has none. Ward/warning/cooldown remain. The prior full-board results in balance-normal-hits-review.md are historical and used the wrong spell scope. See balance-column-theft-review.md for corrected diagnostics.


## Tier-isolated balance harness (D107/I06)

Offline only: MatchOptions.isolatedSpellTier (1–4) caps both pickup/theft charge at that tier and rejects partial/lower-tier casting. All normal spell rules/costs remain; only full meter can cast the selected tier and empty it. The first immediate policy is historical (D107), retained through --casting=immediate; current tier-1 casting uses D108/I07 below. Human/browser matches omit this option and retain four-slot play and existing bot strategy. Phase/pause/cast freeze still gate input. No special points or altered difficulty values. The simulator alternates command order and swaps sides for distinct matchups as before.

`pnpm balance:roster --tier=1 --seeds=100 --seed=20261119` writes separate balance-tier-1 reports (7,500 matches: 200 per distinct cell, 100 mirrors per hero/level). CLI accepts tiers 2–4 for later trials; only tier 1 is run initially. Track points earned/lost, exact guard-saved penalties, accepted pickup charge, stolen/received charge, empty thefts and ward blocks. These observations do not estimate offensive counterfactuals. The immediate baseline wastes theft against empty meters; opportunity casting waits for charge but can still lose it during the warning. Narrow capacity changes its normal value. Tier isolation does not prove complete-kit balance.


### Opportunity casting (D108/I07)

One-star isolated bots use a shared 300–700 ms seeded random decision delay, independent from hit accuracy/timing RNG and identical across heroes/difficulties. Delay samples align to simulation ticks and are taken once per valid opportunity. Cooldown/full charge must be ready before scheduling; phase/pause/cast freezes stop decisions. Bots keep hitting while waiting. A lost opportunity cancels its pending decision; a new opportunity receives a fresh delay. Round/match reset clears pending decisions. Valid additions to a target group do not continually restart the same target witness.

Conditions use targets visible for at least 200 ms, with positive remaining lifetime. Sweep considers its actual busiest column: a mole/star without rabbits, or a mole within 1,000 ms of escape even if rabbits are present; no recast while its sweep is active. Tin Caps requires a currently unarmored enemy mole; Ominous Bud requires an unmarked enemy mole; Gentle Tending requires an unextended own mole within 1,000 ms of escape. Borrowed Spark requires enemy charge now, rechecked before casting; spending it during the 650 ms warning is legitimate counterplay. These opportunity thresholds are provisional, not spell-strength tuning.

`pnpm balance:roster --tier=1 --casting=opportunity --seeds=100 --seed=20261119` writes current balance-tier-1 results. `--casting=immediate` reproduces the old policy in balance-tier-1-immediate. Higher-tier conditions are not designed yet; tiers 2–4 retain immediate baseline casting and reject explicit opportunity policy. Normal four-slot gameplay is unchanged.


### Current one-star nerfs (D109/I08)

Clean Sweep retains the immediate hit, but subsequent strikes are 1500 ms apart within its three-second window (one further pulse at 1.5 s; no hit at the expired 3 s boundary). Royal Cleanup retains its separate 250 ms cadence. Tin Caps affects only one mole total across existing targets/new arrivals, with one extra hit until the three-second window expires; Heavy Harvest retains four moles/two extra hits. Both ordinary and isolated modes share these powers. The controlled tier-1 trials held casting policy, scoring and all other powers fixed. Current three matrices are balance-tier-1.md, with trial comparisons/limitations in balance-tier-1-strength-review.md. Full-kit numbers are historical until rerun, not a current balance claim.


### Adaptive target animation frame selection (D114/I11)

Target lifetime remains the entire hittable window, including rising and retreating. The renderer derives its phase duration from that lifetime and reserves room for both phases; dancing occupies any remainder. It uses all eight source poses whenever the phase has at least 400 ms (20 distinct frames/s budget), or evenly selects intermediate poses while retaining both endpoints for shorter phases. Example rise/retreat sequences: 300 ms total → [0,4,7] each; 500 ms → [0,2,4,5,7] each; 800 ms → all [0..7] each. Existing longer lifetimes retain their full original sequences. Choosing a larger minimum lifetime in game.yaml automatically restores poses on the resulting longer-lived targets; no asset changes are required. Reduced-motion and hit feedback retain their existing behavior. Rendering cadence can still drop visual frames on a stalled device; the simulation never extends the lifetime to wait for drawing. No pacing, bot or spell values changed in this step.


### Applied fast pacing and reaction baseline (D115/I12)

Late lifetime base is now 600 ms, minimum 500 ms, shared across moles/rabbits/stars and magical targets. Existing 25-second pressure/recovery waves and 60-second ramp remain. Target windows include adaptive rise/retreat and do not gain animation grace time. AI timing/accuracy settings stay unchanged. Explicit local-only `diagnosticMode: 'reaction'` disables spell casts and score-difference victory for fixed-length sampling; ordinary modes keep their normal rules. See pacing.md and reports/reaction-pacing.md for the first 1,500-session diagnostic and its denominator/phase limitations. Current full-kit/one-star win matrices predate this pacing change.


### Casting-delay trials (D117/I13)

One-star opportunity diagnostics now accept --cast-profile=baseline|fast|scaled. Baseline remains shared200 ms visibility/300–700 ms decision delay. Fast uses100 ms visibility/200–400 ms decision delay shared across difficulties. Scaled keeps that100 ms visibility and multiplies only decision delay by Easy3/Medium2/Hard1. Thus target-based notice+decision takes700–1300 /500–900 /300–500 ms; enemy-charge theft uses decision delay directly. Full charge/cooldown must be ready; witness/resource loss cancels the wait. Base-delay sampling uses independent seeded RNG and the simulation tick grid; hit reaction/accuracy/pacing values are unchanged.

Schedules, cancellations, executions, terminal pending decisions and ramp/steady counts are tracked per bot. Execution is opportunity-valid at cast start, distinct from effect success after warning. Completed decisions equal actual cast counts, and scheduled=cancelled+executed+pending is asserted. All three profiles ran100 paired seeds (7,500 matches each), no caps. Fast/scaled Hard outcomes match exactly. No profile is auto-adopted into full-kit AI or the default baseline. Results, pooled/per-level matrices and limitations: reports/casting-delay-review.md. Spell strength and the deferred theft assignment review remain later steps.


### Adopted one-star casting baseline (D118/I14)

Scaled is now the default isolated one-star opportunity profile: target visibility100 ms, decision200–400 ms multiplied by Easy3/Medium2/Hard1. Only decision delay is scaled. Theft still watches enemy charge directly. Explicit --cast-profile=baseline|fast preserves earlier controls. Ordinary four-slot AI and higher-tier behavior remain unchanged. Pacing/reaction/spell-strength values are frozen for the next tuning comparison. Current one-star powers: Sweep immediate hit then1500 ms cadence/3 s; Borrowed Spark steals all enemy charge after650 ms warning; Tin Caps one mole/+one hit/3 s; Ominous Bud one mark/+4 miss penalty/8 s; Gentle Tending +700 ms to current targets once. Faster Sweep/at least three Tin Caps moles are pending preferences, not silently implemented. Current baseline/report verification: balance-tier-1-adopted-review.md.


### Continuous Sweep and longer duration trials (D119/I15)

Clean Sweep hits the fixed busiest column immediately and keeps hitting whatever appears there throughout its3 active seconds. Each tick expires old targets, runs ordinary spawns, then applies one normal strike to each occupied unexpired hole in that column. New arrivals are resolved on their birth update. Armor takes one strike per tick until cleared; normal rabbit penalties/guards, star points/charge and mole points apply exactly once. The3 s boundary is exclusive; pauses/casts freeze it. Royal Cleanup remains initial full-board hit plus 250 ms pulses. The obsolete one-star sweepIntervalMs setting/override is removed/rejected; historical cadence reports require their recorded revision.

Ominous Bud now uses ominousMarkMs=12000, independent of Withering Pact’s unchanged markMs=8000. It still marks only one mole with +4 missed-mole penalty; target lifetime is not extended. Extra marking-window duration did not change any of 7,500 control outcomes because the single mark is spent before it matters. Gentle Tending uses extensionMs=1200, instantly added once to all currently present targets, including rabbits/stars; no active aura and no extension of future arrivals without another cast. Both longer values are provisional playtest settings. Casting profile, reaction settings and other spell powers remain fixed. Review continuous-sweep-duration-review.md for mixed extension results and the bot’s one-accuracy-attempt-per-target limitation.


### Current mark quota and Tending aura (D120/D121/I16)

**Duskmantle — Ominous Bud:** ominousMarks=3 (was 1), ominousMarkMs=12000 and +4 miss penalty unchanged. Existing eligible moles consume quota first; remaining charges apply to future moles within the window. A mole receives only one mark, no rabbit/star marking. Withering Pact remains four marks/8 s and its previous penalty.

**Sprig — Gentle Tending:** tendingMs=3000, extensionMs=500 (was instant 1200 ms). Extend every current unexpired target immediately, then apply the same bonus to arrivals through shared spawn modifiers until the exclusive window end. Applies to natural/star/magical targets and every kind. Once per target across recasts; refresh the aura end instead of stacking time, retain earned expiry bonuses after aura end, no resurrection. Tending is a positive effect preserved by cleanse and freezes with the simulation; round reset initializes tendingUntil=0. Protocol 11 carries this new field to the guest; effect-tending is a procedural placeholder, not a generated asset. Legacy tendingMs=0 is available only for reproducing the old instant-only control.

Four 100-seed profiles (control, marks-only, aura-only, both) plus adopted-default rerun total 37,500 matches, no caps. The control reproduces every pre-change outcome; defaults reproduce all combined outcomes. Most mark-only matchups and all aura-only matchups improved; combined results/phase spreads remain in mark-aura-review.md. Hit reaction/accuracy, scaled casting decisions and other spell powers are unchanged. All spell tables should include the owning hero.
