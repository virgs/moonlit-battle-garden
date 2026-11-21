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


### Current one-star timing and penalty update (D122/I17)

**Duskmantle — Ominous Bud:** mark **three enemy moles within 8 active seconds** (previously 12 s). Each missed marked mole adds **6 penalty points** (previously 4), making the normal 8-point mole miss **14 total**. Quota, target eligibility and warning are unchanged.

**Sprig — Gentle Tending:** active window **4.5 seconds** (previously 3 s, +50%). Add **0.5 seconds once per target** to current and arriving own moles, rabbits and stars. The bonus remains after the aura ends; recasts never extend an already treated target again. Pause/cast freezes still apply.

Other spells, pacing, hit reactions and casting decisions are held fixed. These are provisional tuning values. Current pooled and per-difficulty versus matrices: [balance report](../reports/balance-tier-1.md); independent/combined trials: [comparison](../reports/bud-penalty-aura-review.md). Always include the owning hero and explicit duration when discussing spell changes.


### Current three-mole / penalty / aura tuning (D124/I18)

Supersedes earlier numeric tuning. **Captain Bramble — Tin Caps:** three enemy moles within **3 s**, one extra hit each (was one mole). **Duskmantle — Ominous Bud:** three marks within **8 s**, **+8** extra miss penalty (was +6), **16 total** per marked miss. **Sprig — Gentle Tending:** **6 s** aura (was 4.5 s), unchanged **+0.5 s once per current/arriving target**, including stars/rabbits; no repeated stacking. Hostile spells retain the 650 ms active-gameplay warning after the shared cast freeze; Borrowed Spark steals the enemy stars present at resolution, not at cast start. Empty resolution is wasted; ward can block. No theft timing change in this pass.

Other powers, pacing, reaction and scaled one-star casting remain fixed. Independent/combined trials and current versus matrices: [review](../reports/three-mole-penalty-tending-review.md), [matrices](../reports/balance-tier-1.md). These are provisional human-playtest settings, not proof of balance.


### Current Gentle Tending bonus and separate theft trial (D125/I19)

**Sprig — Gentle Tending:** +**0.75 s once per target** (was +0.5 s), **6 s aura unchanged**, covers current/arriving moles, stars and rabbits. Earned time persists after aura, recasts do not re-extend a target. **Andromoss — Borrowed Spark** live behavior remains all enemy stars up to the ordinary four-star capacity, after **650 ms warning** following cast freeze. A configurable cap3 was tested separately in normal full-kit/four-slot play and is **not adopted**. Other one-star powers unchanged: Champignon busiest-column continuous hits/3 s; Bramble three armored moles/3 s/one extra hit; Duskmantle three marks/8 s/+8 miss penalty (16 total).

Flat simulation counters report extended-target hits/expiries by kind and hits during extra time, excluding unresolved targets from resolved fractions. They do not affect gameplay, RNG, networking or bot decisions. Hits in extra time are observations rather than counterfactual points gained; rabbit hits retain penalties.

Current pooled and per-level matrices, before→after spell reminders, coverage and separate full-kit theft trial: [review](../reports/tending750-review.md). Mixed matchup improvements, difficulty flips and bot-policy limitations remain; no claim of final human balance.


### Current Tin Caps future-mole rule (D126/I20)

**Captain Bramble — Tin Caps:** armor the **next three enemy moles to appear after resolution**, **no duration**, **one extra hit each**. Previously affected current/future moles within 3 s and armor expired with that timer. Already visible moles are now unaffected. Pending quota survives indefinitely within the round; stars/rabbits do not consume it. Recast refreshes remaining quota to three, without queueing charges; existing armored targets keep their remaining extra hit. Cleanse removes pending quota and armor; round reset clears both. The 650 ms hostile warning after cast freeze and ward blocking remain. Armor ends on its extra hit or target disappearance. Stronger Heavy Harvest takes precedence without stacking hits; its 3 s/four-mole/two-extra-hit rules are unchanged, and a future mole under stronger armor still consumes a Tin Caps charge.

New state: player.tinCharges, target.persistentArmor; no Infinity values/timer sent online. Protocol12 rejects older rulesets. HUD effect remains while quota or active persistent armor exists; normal bot cleanse/sweep awareness recognizes new armor state. Isolated cast visibility/delay/opportunity policy otherwise unchanged (still witnesses visible unarmored moles, a potential strategy limitation for future-only armor).

Other current one-star spells unchanged: Champignon continuous busiest-column hits/3 s; Andromoss all stars/650 ms warning (cap3 experimental only); Duskmantle three marks/8 s/+8 miss penalty; Sprig +0.75 s once per target/6 s aura. [Current matrices, before→after and limitations](../reports/tin-next-review.md).


### Two-star baseline started (D128/I21)

One-star D127 remains accepted/fixed; no strength/timing changes in this pass. Current tier2: **Champignon — Mushroom Guard**, one mistake blocked/**12 s**; **Andromoss — Rabbit Riot**, extra enemy rabbits every0.95 s subject to spawn limits/**7.5 s**; **Bramble — Bramble Brace**, one mistake blocked/**8 s**; **Duskmantle — Violet Veil**, readable dimming and existing **+0.2 s bot reaction**/**6.5 s**; **Sprig — Helping Tines**, busiest fixed column, one normal hit every0.25 s/**6.5 s**, including star collection, rabbit penalties and separate armor strikes.

7,500 matches, no unfinished; immediate full-two-star-meter casting remains the existing tier2 diagnostic, unlike the adopted tier1 opportunity/delay policy. Sprig leads Easy, Duskmantle Medium/Hard; large spreads/flips and bot-model caveats preserved. No duration/AI changes adopted. [Current matrices, spells and interpretation](../reports/balance-tier-2-review.md).


### Current two-star guards, casting policy and zero warnings (D129/D130/I22/I23)

**All hostile warnings are removed** (warningMs=0) unless a future per-spell exception is explicitly requested. Hostile effects apply synchronously at cast start, before shared casting freeze; the opponent has no window to spend stars/cast a defense after the spell starts. An already-active ward still blocks the effect. No Incoming warning message appears. The shared cast animation remains: simulation clocks, targets, active effects and input freeze until it finishes. Historical warning flags exist only for controlled reproduction.

**Champignon — Mushroom Guard** and **Bramble — Bramble Brace** are identical **two-star spells: next two mistakes blocked, no time limit** (was one mistake/12 s and one/8 s respectively). Covers missed moles, rabbit hits and empty hits. Recasting refreshes to two rather than adding; cleansing preserves positive protection; round reset clears charges/flag. No Infinity values online. Royal Cleanup’s three guards/12 s and Iron Resolve’s three/8 s remain unchanged. No tier swap adopted; reassess after this strengthened guard test.

Isolated tier2 now adopts tier1’s100 ms visibility and a seeded200–400 ms decision delay, multiplied×3Easy/×2Medium/×1Hard. A sample persists per opportunity, invalidation cancels, pause/cast freezes it. Guards require an unprotected urgent own mole; Tines a useful/urgent fixed busiest column, no active refresh; Riot/Veil visible enemy mole/star, no active refresh or casting into active wards. Bots continue hitting while deciding. Normal full-kit casting retains its prior schedule/strategy, recognizing permanent guards.

Other tier2 rules unchanged: **Andromoss — Rabbit Riot7.5 s** / extra rabbits every0.95 s subject to spawn limits; **Duskmantle — Violet Veil6.5 s**, dimming plus existing+0.2 s bot reaction; **Sprig — Helping Tines6.5 s**, one fixed-column hit every0.25 s, normal star/mole rewards and rabbit penalties. Flat observed automation counters do not alter rules.

Protocol13 adds shieldPermanent; UI guards remain until charges are consumed. One-star numerical spell powers stay accepted, but the explicitly requested global warning removal changes their application timing too, so tier1 was rerun. [Current two-star matrices, before→after and factor/coverage comparison](../reports/tier2-guard-policy-review.md); [current one-star no-warning audit](../reports/tier1-no-warning-review.md). No final human/full-kit balance claim.


### Current first/two-star swap (D131/I24/D132)

| Hero | One star | Two stars |
|---|---|---|
| Sir Champignon | **Mushroom Guard**, next two mistakes blocked/no expiry (was2 stars) | **Clean Sweep**, immediate busiest-column hit and continuous arrivals for3 s, normal rewards/rabbit penalties (was1 star) |
| Captain Bramble | **Bramble Brace**, identical two-mistake guard/no expiry (was2 stars) | **Tin Caps**, next three future enemy moles/one extra hit each/no duration (was1 star) |

Bot opportunity conditions, full-kit emergency/ward checks, effect tiers, spell-name/star HUD and tests follow the new costs. Higher tiers, numerical spell powers and zero-warning rule remain unchanged. Protocol14 captures the loadout change. Internal setting is now mistakeGuardMode and CLI --guard-mode (old reports require their original revision). Current pooled/per-level matrices and findings: [swap review](../reports/tier-swap-review.md).

**Violet Veil against humans:** target sprites have72% opacity for6.5 s. Hitboxes, input timing, target types/positions/lifetimes remain unchanged. Bots’+200 ms reaction is a separate perception approximation, not an imposed human input delay or measured human penalty. No Veil change adopted.

**Helping Tines pending:** requested duration “10**8s**” needs clarification (8 or10 s); follow-up question asks continuous arrivals vs immediate hit plus250 ms cadence. Until answered, keep6.5 s and existing250 ms delayed-first-hit behavior; do not claim the requested Tines change is complete.


### Current Helping Tines: immediate/continuous10 seconds (D133/I25)

P01 is resolved: user chose **10 s** and **continuous hits like Clean Sweep**. **Sprig — Helping Tines costs2 stars**, chooses the busiest column at cast time (stable leftmost ties), hits all targets there immediately, then intercepts current/new targets once per simulation tick after spawns throughout10 active seconds. The column stays fixed even if another becomes busier. **Normal rewards and rabbit penalties**; collect stars normally; armor requires its extra strikes, one per hit/tick. Natural/star/magical arrivals are eligible from their birth tick without a visibility minimum. The exact end boundary is excluded. Casting/pause freezes the window; reset clears it. No warning.

Previously it lasted6.5 s, waited250 ms for its first pulse and hit one target per250 ms. The simulation’s shared hitColumns method now serves continuous Sweep/Tines. **Garden Clockwork is unchanged**:4 stars, two columns,8 s, one single-target action per250 ms with existing visibility condition. Royal Cleanup unchanged. Current loadouts retain1-star guards/2-star Sweep and Tin Caps. No new art. Protocol15 captures new rules; historical pulse mode/timing flags are controls, not an alternative game menu.

[Current two-star matrices, before→after spells and independent duration/cadence comparisons](../reports/tines10-review.md). Last one-star swap diagnostic remains applicable to unchanged one-star powers; do not claim a new one-star run in this pass.


### Tier2 accepted; tier3 baseline with role caveats (D134/I26)

No universal tier2 loser across all levels; user accepts the current powers/costs and moves on. Tier3 powers unchanged: **Champignon — Spore Ward**, next hostile spell blocked/**12 s**; **Andromoss — Sticky Fingers**, instant steal up to2 stars; **Bramble — Iron Resolve**, next3 mistakes/**8 s**; **Duskmantle — Twilight Siphon**, +2 per final manual mole hit/**7 s**; **Sprig — Weed Out**, instant harmful-effect cleanse then one-spell ward/**6 s**. No warnings, no new art.

Extend isolated tier3 diagnostics to the same useful-opportunity/scaled-delay policy, with immediate controls preserved. Wards react to public theft threat at enemy2+ charge; theft needs enemy2+ charge/no ward; Resolve needs unguarded urgent mole, Siphon visible mole, cleanse actual harm or theft threat. Normal full-kit decisions unchanged; tier4 still immediate. Flat siphonBonusPoints counter observes scoring without changing it.

15,000 matches, no unfinished. **Spore Ward/Weed Out cannot be fully evaluated in tier3-only games**: only Sticky Fingers is hostile and no active harmful modifier exists for cleanse. Zero ward blocks can reflect avoidance, not worthlessness. Keep paired matrices and casting/benefit coverage; mixed-tier/human checks needed before tuning. [Current matrices and spell reminders](../reports/tier3-baseline-review.md).


### Four-star baseline, no power tuning (D135/I27)

**Champignon — Royal Cleanup:** initial full-board hit then full-board pulses every0.25 s for**3 s**, plus3 mistake guards/**12 s**. **Andromoss — Double Trouble:** extra magical enemy targets every0.65 s (70% rabbits/30% moles),**8.5 s**, normal wave lifetimes unchanged. **Bramble — Heavy Harvest:**4 current/future enemy moles,2 extra hits each/**3 s**. **Duskmantle — Withering Pact:**4 current/future marks/**8 s**, extra miss penalty+6 (14 total). **Sprig — Garden Clockwork:**2 busiest fixed columns, one normal single-target action every0.25 s/**8 s**, with star rewards/rabbit penalties. No powers/costs/warnings/earlier tiers changed. Preserve weaker-than-cheaper-power concerns (Bud+8 vs Pact+6; continuous10 s Tines vs pulsed8 s Clockwork) for discussion, not silent changes.

All isolated tiers now default to shared useful-opportunity/random-delay casting; explicit immediate controls remain. Tier4 conditions follow each spell’s visible opportunity and avoid wards/active refresh. Full-kit bot policy unchanged. A flat markBonusPointsLost counter observes extra marked penalties actually lost after guard prevention without changing scoring/RNG.

15,000 games, zero unfinished,100 paired seeds/pair/level. Easy casts less than once per hero/match; Hard casts several times. Bramble wins every Hard matchup; Champignon wins Easy/Medium matchups with some near50% edges. No universal winner across all levels; do not infer equal/full-kit/human balance from that fact. [Current matrices, durations and coverage](../reports/tier4-baseline-review.md).


### Andromoss kit adoption baseline (D138/I28/I29; intervals superseded by D139)

| Stars | Effect | Duration |
|---|---|---|
| 1★ | Extra enemy rabbits every0.85 s, normal wave lifetimes and existing magic-target caps | 8 s |
| 2★ | Newly appearing enemy moles receive85% normal wave lifetime, once per target | 8 s |
| 3★ | Steal all enemy stars; received stars capped by own meter capacity; empty meter wasted | Instant |
| 4★ | Extra enemy rabbits every0.65 s plus the same85% new-mole lifetime effect; no extra moles or theft | 8 s |

All effects apply at cast start with no warning; spawning proceeds on the next simulation tick. Existing ward blocks the entire4★ combo atomically. Four-star pressure replaces weaker rabbit pressure; weaker1★ casts do not replace active4★ pressure. Recasts refresh windows rather than stack shortening. Two-star shortening affects future mole births only, not existing moles/rabbits/stars. Compute rounded normal lifetime×0.85 before adding Tending’s fixed750 ms; permit425 ms for a500 ms base, with complete adaptive rise/retreat endpoints. Shortened targets keep earned expiry after aura end. Cleanse clears all pressure clocks and restores removed time to live shortened targets (retaining positive Tending), without resurrection or double restoration. Round reset clears clocks/targets; pause/cast freezes game time.

New fields: moleRushUntil, moleRushTier; per-target rushed/rushReductionMs; protocol16. HUD uses a procedural rush placeholder, approved art unchanged. Internal cap setting is starTheftCap; normal capacity4. Discussion uses star counts; UI rabbit pressure occupies1★ and the new lifetime effect2★. Normal bot slot checks/active-effect avoidance and cleanse awareness follow new roles; no hero-specific casting weights or hit-timing changes.

Four current same-tier roster matrices, local per-player fixed-opponent diagnostics and full-kit snapshot: [review](../reports/andromoss-kit-review.md).49,500 actual-simulation games, no caps.208 simulation tests/build and28 desktop/mobile/online browser cases pass. All19,200 unaffected non-Andromoss records match prior outcomes/old metrics after excluding newly added counters. Per-player selected tiers are local-only; each keeps its selected cap, so3★ theft can remove4 but receive3 in that experiment, while normal play receives4. Do not claim these are optimal full-kit choices or equal resource efficiency.

4★ now combines the1★/2★ effects per cast and improves same-tier pooled matchups, but frequent1★ casts win more often in fixed-build tests. Cost, cast availability, automatic rabbit hits and normal AI’s refusal to bait wards are strategy limitations. Human/full-kit balance remains provisional; no extra tuning beyond the adopted kit.


### Current Andromoss intervals (D139)

User explicitly confirms **1★ rabbits every1 s** (was0.85 s) and **4★ rabbits every0.75 s** (was0.65 s), with **85% new-enemy-mole lifetime** unchanged. Both last **8 active seconds**. This lowers both rabbit rates; it is not an absolute4★ buff, despite the earlier stated goal. Four-star remains faster than1★ and includes2★ shortening. Two-star remains85% new-mole lifetime/8 s; three-star remains instant theft of all enemy stars up to receiving capacity. No other powers, AI decisions, lifetimes, casting or spawn caps change. See [interval comparison](../reports/andromoss-interval-review.md) for current matrices and limitations; the D138 review remains historical.


### Current simplified spell matrix (D140/D141)

Supersedes prior spell tables/tuning. The user clarifies both Duskmantle quotas affect **future mole arrivals only**, not visible moles; neither expires, and4★ uses6 moles.

| Hero | 1★ | 2★ | 3★ | 4★ |
|---|---|---|---|---|
| Champignon | Block2 mistakes; no expiry | Busiest fixed column: immediate/continuous hits,3 s | Block5 mistakes; no expiry | Busiest fixed column: immediate/continuous hits,6 s |
| Andromoss | Extra enemy rabbit every1 s/8 s | New enemy moles85% lifetime/8 s | Instant all-star theft, capacity capped | Extra enemy rabbit every0.75 s +85% new-mole lifetime/8 s |
| Bramble | Block2 mistakes; no expiry | Next3 enemy moles,1 extra hit each; no expiry | Block5 mistakes; no expiry | Next3 enemy moles,2 extra hits each; no expiry |
| Duskmantle | Next3 enemy moles marked,+8 miss penalty; no expiry | Dim enemy targets,6 s; AI reaction+200 ms | Manual mole kills+2 points/7 s | Next6 enemy moles marked,+6 miss penalty; no expiry |
| Sprig | Current/new targets+750 ms once,6 s aura | Busiest fixed column: immediate/continuous hits,4 s | Instant cleanse +one-spell ward6 s | Two busiest fixed columns: immediate/continuous hits,4 s |

Continuous automation strikes every selected live target once at cast start and once per50 ms tick after spawns; includes stars/rabbits and birth-tick arrivals. Each armor hit removes one extra hit, with score only at elimination; normal rewards/rabbit penalties. Exact end boundary is exclusive. No4★ Champignon guards/full-board hits; no Champignon3★ spell ward. Only Sprig3★ grants a spell ward now. Guards block missed moles, rabbit hits, empty hits, and refresh to2/5 without stacking; positive guards survive cleansing.

Future-mole armor/marks ignore stars/rabbits and existing targets. Pending quota and applied modifiers have no time limit, clear on cleanse/round reset, and use finite fields for online snapshots. Recasts replace/refresh pending quota, never add it; existing marked/armored moles retain their assigned bonus/remaining hits. Weaker Bramble2★ cannot downgrade outstanding4★ quota. Duskmantle cross-tier casts replace pending quota but do not alter existing marks. Actual mole arrivals consume quotas once; missing a marked mole adds the stated penalty to the normal8 points.

AI opportunities follow the changed slots: Champignon3★ uses the same urgent-mole guard opportunity as Bramble3★,4★ uses its actual one-column opportunity, and persistent harmful effects remain visible to cleanse/caster avoidance. Seeded delay/reaction settings stay unchanged; full-kit generic priorities remain provisional. Protocol17 rejects mismatched rules. No new art. Historical timed Tin Caps/one-star guards and pulsed two-star Tines remain explicit controls only.

Current pooled/per-level matrices and before→after reminders: [simplified-kit review](../reports/simplified-kits-review.md). Previous reviews are historical. Human balance remains unverified.


### One-star gameplay loops (D143)

Exactly one looping spell asset per hero’s1★ effect, separate from the existing shared hero casting clip. No extra activation, charge-consumption, ending clip or freeze. Existing1.5 s cast/stars-cost/SFX stay. PixelLab’s free VFX renderer exports8 frames at6 FPS on48×48 transparent canvases; the images are not AI-generated or model-reviewed. User visual approval is pending. Editable recipes, PixelLab effect links and export provenance live in public/assets/effects/one-star/provenance.json, and the preview gallery in the same folder. This explicit request reopens only the five one-star effect assets; other deferred art remains deferred.

Champignon and Bramble: two mushroom/leaf protection glyphs near board edges; remove one per remaining guard charge, disappear at zero. Andromoss: subtle alien-spore loops near the affected enemy board’s edges while its8 s pressure is active. Duskmantle: violet markers attached above affected live1★ moles; pending quota alone does not draw fake marked targets. Existing+8 marks remain identifiable after4★ casts;+6 marks retain the higher-tier placeholder. Sprig: gentle green leaf loops at own board edges during its6 s aura, independent of already earned target extensions. Higher-tier effects retain existing placeholders.

Only when the opponent board is hidden, reuse the very same loop beside the affected player’s portrait/name. Guard icons show remaining charges; the curse icon includes pending+live1★ mark count. These status indicators identify the affected board, not the caster. Hide during casting/outcomes like the board effects; freeze with simulation time on pause and use frame0 for reduced motion. Images scale uniformly, remain outside target silhouettes where possible, and never intercept input. One-star generic box/impact cues are replaced, without adding another gameplay animation. Rules, AI and balance remain unchanged.


### Casting backdrop and individual target statuses (D146)

A full-arena50% black overlay sits above boards, all HUD and existing effects, below the casting hero and star-cost display. Both caster and stars retain full opacity. It appears only during the existing1.5 s casting hold, requires no additional warning/freeze, and leaves pause/menu above it.

Individually affected targets carry compact pixel-style badges above their own hole/sprite, uniformly scaled with the board. Silver shield2/3 shows total hits remaining while armor exists, decrementing per strike and disappearing when armor is broken. Violet rune with−8/−6 shows extra miss penalty; reuse the existing single-loop curse art for both tiers. Gold+2 marks manual mole bonus points only during the actual7 s buff. Amber hourglass identifies targets with earned lifetime shortening; green leaf identifies targets with an earned lifetime extension, including stars/rabbits. Lifetime badges survive their originating aura while the target keeps the modification; cleansing removes shortening/curses/armor but keeps positive extension. No badges are inferred just from pending charges. Multiple actual modifiers can coexist, without altering hitboxes or rules.

Target status is a read-only presentation helper using the real snapshot, with accessible descriptions on the hole controls. Badges never capture input, clear with their target/effect, freeze on pause and remain part of a frozen outcome scene. Replace the old canvas-only armor/curse arcs and the separate1★ per-mole placement with the shared badge layer; retain board-wide higher-tier placeholders. No new assets, AI, simulation or balance changes.


### Star-meter timing around casting (D147/I36)

The star container holds a completed, fully formed charge pose during the hero’s casting scene. Its spending/reward/theft transition starts only after casting ends; there is no mid-transition container frozen behind the hero. This uses the user’s permitted after-cast option without postponing any spell or input. Logical star count, cast cost, scoring and network state still update immediately.

The caster uses the captured spell cost for its held visual charge, including when an online/coalesced snapshot skipped the final pickup or another cast’s gap. Opponent meters hold their previous visible count through theft. Auto-hit/theft star rewards earned during the cast are presented as the actual resulting charge afterward; unchanged opponent meters return directly to the complete pose. All vertical/horizontal board meters and the hidden opponent’s small meter share the same presentation helper. Normal pause still freezes animation; reduced motion and frozen outcome/countdown scenes use the complete pose directly. The independent stars-spent overlay continues with the hero’s presentation clock. No autonomous meter timers, new assets, simulation, AI or balance changes.


### Edge portraits, adaptive small-screen sizes and trophy previews (D149/D150)

Supersedes D148 sizing/placement. Desktop HUD portraits are128px and each hero pair is anchored12px from its own screen edge, farther from the centered score bar. Responsive exception approved by user: use96px on medium desktops,80px on tablets,64px on normal portrait phones and48px on narrow phones/short phone landscape (short wide windows use64px). Full names remain on one line; names move below portraits when the side space cannot fit a horizontal pair.

Wide desktop keeps horizontal icon/name pairs flanking the bar; intermediate desktop uses compact columns flanking it. Short landscape lets portraits use spare edge space around the bar row, keeps trophies under the bar and puts the compact opponent star meter between trophy columns; desktop trophies retain star-container alignment. Shared geometry reserves stacked-name/icon height where needed and preserves uniformly scaled boards and tested landscape touch targets.

Remove the persistent round-number label and the numbered countdown heading; retain the mode, elapsed timer and3–2–1 countdown. Trophies communicate round wins. Internal round rules are unchanged. `pnpm exec vite-node scripts/capture-hud-preview.ts` captures desktop/390px portrait/844px landscape/320px phone/667px compact landscape examples with one actual simulated round win per player through the standard Game renderer. The setup is isolated in ignored output/guard-flows and never changes normal match starts. Visual review remains with the user.


### Trophies centered beneath portraits (D151)

Supersedes the previous star-column/bar-end trophy alignment. HUD trophy width and height are80% of their previous values:134.4×67.2px in the larger HUD,89.6×44.8px in the compact HUD; preserve the source2:1 aspect ratio. Each trophy belongs to its hero group and is centered on the portrait. With a beside-portrait name, the trophy sits6px below the portrait. With a below-portrait name, it sits6px below the name, still centered on the portrait rather than on the text.

Use CSS anchors inside the portrait/name groups, with no browser measurement timers. Preserve trophy win-count animation/reset. Shared HUD geometry reserves the true portrait/name/trophy extent, including short landscape overflow; minimum edge inset increases only where needed to keep the centered trophy fully onscreen. The ordinary small opponent meter stays below the portrait HUD, with its compact landscape placement unchanged. Full names remain unwrapped. Round-result celebration trophies, character/spell assets, rules and balance are unchanged. Capture previews retain one actual round win per side and assert portrait centering/below-name placement at all five captured sizes.
