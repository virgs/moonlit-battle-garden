# First playable: implementation defaults

Updated 2026-11-16. The user authorized coding and selected **Moonlit Battle Garden**. These values are provisional, reviewable defaults, not immutable requirements.

## Implemented

- Sir Champignon and Andy; four spells each.
- Offline local versus and easy/medium/hard AI.
- 3×3 gardens, both scores start at zero, winning lead X=100 (configurable), first to two round wins, three-second countdown.
- Empty hit: −4 points. Rabbit hit: −12. Missed mole: −8. Missing stars/rabbits is safe.
- Mole hit: 10 score. Star hit: 25 score and one magic star, capped at four. No combos yet.
- 25-second build/peak/recovery waves over a rising 120-second baseline, with independent natural clocks and bounded concurrency. Star opportunities use baseline virtual-clock offsets 5/14/22 seconds per wave, accelerated on the trailing board. See pacing.md and game.yaml.
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

Casting freezes both boards for 1500 ms with a separate presentation clock; target/effect/pacing/cooldown timers and input stop for that hold. Casting consumes the exact current charge, with at least 1800 ms between casts. Andy's hostile spells warn for 650 ms before resolving. Spore Ward blocks any one hostile spell, including star copying/theft, then is consumed.

| Character / tier | Behavior |
| --- | --- |
| Champignon 1 | Block one mistake within 12 seconds. |
| Champignon 2 | Safely remove current moles/rabbits; leave stars. No clearing score or automatic star rewards. |
| Champignon 3 | Block the next hostile spell within 12 seconds. |
| Champignon 4 | Safe sweep plus three mistake blocks within 12 seconds. |
| Andy 1 | Copy one available enemy star without removing it. Since one star was spent, this does not generate net charge. If no enemy star is available, gain a one-mistake guard instead. |
| Andy 2 | Add extra rabbits for 7.5 seconds without replacing the normal mole/star spawn schedule. |
| Andy 3 | Transfer up to two enemy stars, capped at four total. If none are available, gain a one-mistake guard instead. |
| Andy 4 | Extra rabbit-heavy magical waves for 8.5 seconds, with a 30% mole chance and bounded magical concurrency. Natural clocks and the score-pressure modifier are unchanged by the attack. |

Stronger pressure replaces weaker pressure; identical effects refresh duration rather than multiplying it. Extra rabbits only occupy empty holes. Shields cover missed moles, empty hits, and rabbit hits. Fresh guards replace existing guards rather than accumulating unlimited charges.

## AI balance

`pnpm balance` runs 100 paired seeds per difficulty (600 matches). Every seed swaps character sides; tick command order alternates. Reports include wins, draws/caps, duration, tier-by-tier spell coverage, and per-match JSON. Same-difficulty matchups are implemented; mixed-difficulty matrices and alternative policies remain future extensions.

Historical independent-health baseline Champignon win rates: 53% easy, 100% medium, 91% hard. Preserved in `reports/balance-baseline.*`. Medium/hard Andy never used tiers 1, 3, or 4; the first invasion also replaced moles with rabbits, easing an accurate defender's load.

The first bot iteration varied seeded spell-saving thresholds, added resource/ward-aware decisions, and spawned extra rabbits without replacing normal targets. All tiers now receive coverage. The score-difference rules supersede those old health-based results. The pre-wave score run gave Champignon 46.5% easy, 71.5% medium, and 95% hard. Wave pacing supersedes that baseline; see balance-latest.md for the current results and unfinished-match diagnostics. Balance is unfinished; consult the latest report and do not declare the game balanced.

## Pending

- Online authoritative rooms and network timing/disconnect policy.
- Cached/installable PWA startup and native mobile packaging.
- Final home/portrait/cast files and richer spell effects. The configured playback/fallback pipeline is ready; existing victory sprites are retained; further sprite generation is deferred until remaining development is complete.
- Final spell/bot balance, input rebinding, physical mobile testing, and release acceptance criteria.
- Remaining six characters after the initial two-character game is ready.


Score pressure now uses independent board clocks and up to 10% shorter natural/star intervals and new target lifetimes on the trailing board. Shared wave phases and all round resets remain identical. See pacing.md and reports/balance-score-pressure-comparison.md; Medium/Hard remain Champignon-favored, and three final Hard diagnostics were unfinished.
