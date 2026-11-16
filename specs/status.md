# Implementation audit

Updated 2026-11-16 after comparing the remake with the oldest Dig Hole Battle Garden sources and artwork.

## Implemented

- Local two-player and three AI difficulties; Sir Champignon and Andy each have four functional spells.
- Full-viewport canvas, HUD overlays, uniform sprite scale, measured hole anchors, and a fixed left/local player identity. Responsive single-board mobile presentation with opponent HUD.
- One shared animated bar using the oldest efeitoLife.pcx and bordalife.pcx artwork, a moving source window, four frames at 12 fps, and the original incremental easing. No repeated/tiled mini-bars or separate player health meters. Numeric scores remain secondary; the bar is driven solely by score difference.
- Original board artwork and falling earth aligned at board-local coordinates. Different earth counts, positions, and animation phases on the two boards; the opponent's underground root strip is mirrored without moving its holes.
- Cosmetic home selection constrained to the participating characters, and sound/mute/pause lifecycle.
- Repeatable seeded offline AI tournaments, swapped sides, per-difficulty win reports, and spell-use coverage.

## Missing from the initial two-character game

| Priority | Feature | Current gap |
| --- | --- | --- |
| 1 | Pressure/recovery wave pacing | Still the linear spawn/lifetime ramp, with stars every fifth regular spawn. Smooth rising waves, explicit concurrency bounds, shared natural-pressure scheduling, and independent star opportunities remain to implement/tune. Round-relative difficulty already resets each round. |
| 2 | Online 1v1 | No authoritative server/rooms, invite flow, action validation, latency policy, reconnect/disconnect handling, or cross-device online sessions yet. |
| 3 | Balance | The harness exists, but balance is unfinished. Latest score-difference run gave Champignon 46.5% easy, 71.5% medium, and 95% hard. Repeat after pacing/magic changes, examine bot-policy bias, then validate human keyboard/mouse/touch play. Faster enemy spawning can also feed points to an accurate opponent under the new score model; attack spells need explicit evaluation. |
| 4 | Distinct character homes | Home ownership works; both characters still use the castle illustration with different tints and the same temporary music. Each needs distinct final art and music. |
| 5 | Installable/offline mobile delivery | Responsive browser play works; cached startup/PWA installation and physical mobile QA remain. Native packaging/store delivery is a later option, not implemented. |
| 6 | Character presentation | Character portraits are still emblems. Character-specific spell-cast animations are explicitly deferred; distinct spell audiovisual effects remain an art/polish task. |

## Confirmed round mechanic

The user clarified that the bar represents score difference, with a winning threshold X. This now replaces the earlier independent-health scaffold. Hits earn points, mistakes subtract points, equal scores center the bar, and a lead of X wins the round and fills one color. X=100 is provisional and configurable. No separate health, linked-life pool, or time-based round winner remains. Scores and pacing restart each round. The 30-minute cap belongs only to offline diagnostic simulations.

## Intentionally later

The other six adopted characters and their spell sets stay deferred until the initial two-character game is ready. Keyboard-mapping shuffle remains excluded. No PixelLab-generated character or home assets have been created yet.
