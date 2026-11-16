# First playable: implementation defaults

Updated 2026-11-16. The user authorized coding and selected **Moonlit Battle Garden**. These values are provisional, reviewable defaults, not immutable requirements.

## Implemented

- Sir Champignon and Andy; four spells each.
- Offline local versus and easy/medium/hard AI.
- 3×3 gardens, 100 health, first to two round wins, three-second countdown.
- Empty hit: 4 damage. Rabbit hit: 12. Missed mole: 8. Missing stars/rabbits is safe.
- Mole hit: 10 score. Star hit: 25 score and one magic star, capped at four. No combos yet.
- One star every five regular spawns. Regular spawn interval falls from 1150 to 470 ms over 120 seconds. Target lifetime falls from 2100 to 1150 ms.
- Round limit: 180 seconds; compare health, then score at timeout. Exact ties replay with no win. Simultaneous lethal expiry damage is a draw. Draws preserve previous round wins.
- Mouse/touch and original keyboard grids. R/numpad + casts; Escape pauses. Local modes pause on tab hiding.
- Desktop shows both boards. Mobile AI mode shows only the human board plus opponent status; narrow-screen local versus still exposes both boards.
- Shared fixed-step simulation with seeded randomness and independent bot randomness; no renderer dependency.

## Exact initial spells

Casting consumes the exact current charge, with at least 1800 ms between casts. Andy's hostile spells warn for 650 ms before resolving. Spore Ward blocks any one hostile spell, including star copying/theft, then is consumed.

| Character / tier | Behavior |
| --- | --- |
| Champignon 1 | Block one mistake within 12 seconds. |
| Champignon 2 | Safely remove current moles/rabbits; leave stars. No clearing score or automatic star rewards. |
| Champignon 3 | Block the next hostile spell within 12 seconds. |
| Champignon 4 | Safe sweep plus three mistake blocks within 12 seconds. |
| Andy 1 | Copy one available enemy star without removing it. Since one star was spent, this does not generate net charge. If no enemy star is available, gain a one-mistake guard instead. |
| Andy 2 | Add extra rabbits for 7.5 seconds without replacing the normal mole/star spawn schedule. |
| Andy 3 | Transfer up to two enemy stars, capped at four total. If none are available, gain a one-mistake guard instead. |
| Andy 4 | Extra rabbits and 25% shorter regular spawn intervals for 8.5 seconds. |

Stronger pressure replaces weaker pressure; identical effects refresh duration rather than multiplying it. Extra rabbits only occupy empty holes. Shields cover missed moles, empty hits, and rabbit hits. Fresh guards replace existing guards rather than accumulating unlimited charges.

## AI balance

`pnpm balance` runs 100 paired seeds per difficulty (600 matches). Every seed swaps character sides; tick command order alternates. Reports include wins, draws/caps, duration, tier-by-tier spell coverage, and per-match JSON. Same-difficulty matchups are implemented; mixed-difficulty matrices and alternative policies remain future extensions.

Initial baseline Champignon win rates: 53% easy, 100% medium, 91% hard. Preserved in `reports/balance-baseline.*`. Medium/hard Andy never used tiers 1, 3, or 4; the first invasion also replaced moles with rabbits, easing an accurate defender's load.

The next iteration varies seeded spell-saving thresholds, adds resource/ward-aware decisions, and spawns extra rabbits without replacing normal targets. All tiers now receive coverage. This is not proof of balanced characters: medium-difficulty defensive advantage remains unresolved. Consult the latest report and do not declare the game balanced.

## Pending

- Online authoritative rooms and network timing/disconnect policy.
- Cached/installable PWA startup and native mobile packaging.
- Character portraits, richer effects, and PixelLab additions.
- Final spell/bot balance, input rebinding, physical mobile testing, and release acceptance criteria.
- Remaining six characters after the initial two-character game is ready.
