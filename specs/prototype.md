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

Casting freezes both boards for 1500 ms with a separate presentation clock; target/effect/pacing/cooldown timers and input stop for that hold. Casting consumes the exact current charge, with at least 1800 ms between casts. Andromoss's hostile spells warn for 650 ms before resolving. Spore Ward blocks any one hostile spell, including star copying/theft, then is consumed.

| Character / tier | Behavior |
| --- | --- |
| Champignon 1 | Block one mistake within 12 seconds. |
| Champignon 2 | Safely remove current moles/rabbits; leave stars. No clearing score or automatic star rewards. |
| Champignon 3 | Block the next hostile spell within 12 seconds. |
| Champignon 4 | Safe sweep plus three mistake blocks within 12 seconds. |
| Andromoss 1 | Copy one available enemy star without removing it. Since one star was spent, this does not generate net charge. If no enemy star is available, gain a one-mistake guard instead. |
| Andromoss 2 | Add extra rabbits for 7.5 seconds without replacing the normal mole/star spawn schedule. |
| Andromoss 3 | Transfer up to two enemy stars, capped at four total. If none are available, gain a one-mistake guard instead. |
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

All heroes use the same stars, 1500 ms casting freeze, cooldown and 650 ms hostile warning. Champignon and Andromoss retain their original numeric rules. Wards block any hostile cast before its target modifiers apply. Refreshes do not accumulate unlimited charges. New values live in `game.yaml` under `rosterSpells`.

| Hero | 1 star | 2 stars | 3 stars | 4 stars |
|---|---|---|---|---|
| Captain Bramble | Bramble Brace: one mistake block for 8 s | Tin Caps: enemy current/new moles take one extra strike for 6 s | Iron Resolve: three mistake blocks for 8 s | Heavy Harvest: enemy current/new moles take two extra strikes for 6 s |
| Duskmantle | Ominous Bud: mark one current/upcoming enemy mole within 8 s, +4 miss penalty | Violet Veil: target sprite opacity 72% for 6.5 s, shapes remain readable | Twilight Siphon: +2 points per manual mole hit for 7 s | Withering Pact: mark four current/upcoming moles within 8 s, +6 miss penalty each |
| Sprig | Gentle Tending: +700 ms to current targets, at most once per target | Helping Tines: automate one column for 6.5 s | Weed Out: clear hostile pending/active effects and block one hostile spell for 6 s | Garden Clockwork: automate all columns for 8 s |

Armor never changes stars/rabbits. A strike removes one armor pip without points or clearing the mole; the final hit earns the ordinary mole score. Armor expires even on surviving targets, and a weaker armor cast cannot replace stronger active armor. Marked mole misses use the normal mistake shield. Marks and unused marking charges expire with the 8 s window; cleanse removes both marks and armor. No automatic spell damage is added.

Sprig chooses the column with most currently visible moles (stable left-first ties, no future knowledge). Automation has one action every 750 ms, checks at least 200 ms of visibility and remaining lifetime, and gives 6 points per mole cleared. Armor consumes automation actions too. Automation never hits rabbits, collects stars, or receives Duskmantle’s manual-hit bonus. It replaces/refreshes an existing automation window rather than stacking.

All modifier windows, automation actions, warnings and target lifetimes use simulation time and stop during casting/pause/recovery. New-round players reset every modifier. Bots may retry surviving armored targets on later actions, prioritize marked moles after stars and use cleanse when afflicted; camouflage adds 200 ms reaction delay while leaving target kinds visible. This is one policy family, not proof of fair human play.

A 1,500-match paired/mirror diagnostic (20 seeds; all matchups; three levels) had zero caps. Bramble distinct-pair win rates were 66.3% Easy, 87.5% Medium, 85.0% Hard. The new three kits received coverage at all tiers after correcting Bramble’s early-guard policy; Champignon Easy tier 4 remains unused and Medium tier 4 rare in this small run. Inspect `reports/balance-roster.md`/JSON before tuning. Higher-level armor pressure remains an explicit imbalance under these bots. Do not tune solely to 50%; human playtesting and policy comparisons remain necessary.

The initial roster policy/report is preserved separately. Bramble’s inherited busy-board emergency was narrowed to actual guard tiers when unguarded and behind, restoring all-tier coverage without changing spell values. See `reports/balance-roster-review.md` for the before/after and remaining Champignon tier-coverage limits. Original-pair control matches are identical across this correction.
