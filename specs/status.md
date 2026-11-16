# Implementation audit

Updated 2026-11-16 after comparing the remake with the oldest Dig Hole Battle Garden sources and artwork.

## Implemented

- Public static website at https://virgs.github.io/moonlit-battle-garden/, automatically deployed from main. User authorized the public repository. Deployment checks and a live HTTPS invite/WebRTC/touch smoke test passed.

- Private player-hosted online 1v1 with invite links, real WebRTC transport, local-side remapping, target-aware inputs, shared pause/round transitions, version/capacity checks, heartbeat RTT and 30-second transient reconnect grace.
- Local two-player and three AI difficulties; Sir Champignon and Andy each have four functional spells.
- Full-viewport canvas, HUD overlays, uniform sprite scale, measured hole anchors, and a fixed left/local player identity. Responsive single-board mobile presentation with opponent HUD.
- One shared animated bar using the oldest efeitoLife.pcx and bordalife.pcx artwork, a moving source window, four frames at 12 fps, and the original incremental easing. No repeated/tiled mini-bars or separate player health meters. Numeric scores remain secondary; the bar is driven solely by score difference.
- Original sprite-based star containers/charge animations, blue/red board-base palette replacement, spinning round-win trophies in the central verdict, and persistent 0/1/2 trophy rows below each side of the score bar.
- Original board artwork and falling earth aligned at board-local coordinates. Different earth counts, positions, and animation phases on the two boards; the opponent's underground root strip is mirrored without moving its holes.
- Cosmetic home selection constrained to the participating characters, and sound/mute/pause lifecycle.
- Repeatable seeded offline AI tournaments, swapped sides, per-difficulty win reports, and spell-use coverage.
- Rising 25-second pressure/recovery waves, identical natural demand/reset between players and rounds, independent star opportunities, and explicit concurrency/reaction-window bounds.
- Asset-ready presentation manifest: character portraits in selection/player/opponent HUDs; per-tier cast sheets with event-driven playback; per-home background/music loading, focal cropping, volume/loop points, and fallbacks. Browser tests exercise valid and invalid temporary images. See public/assets/ASSET-CONTRACT.md.

## Missing from the initial two-character game

| Priority | Feature | Current gap |
| --- | --- | --- |
| 1 | Internet/mobile online QA | Player-hosted online works in real two-browser desktop/mobile tests. Physical devices and different networks remain to test. No managed TURN relay is provisioned: restrictive networks may fail to connect. No prediction/rollback, host migration or page-refresh recovery. |
| 2 | Balance | The harness exists, but balance is unfinished. Current wave run: Champignon wins 112/200 easy, 130/200 medium, 172/200 hard; Andy wins 88/70/22, with six hard matches unfinished at the diagnostic cap. Tune pacing/magic, examine bot-policy bias and long ties, then validate human keyboard/mouse/touch play. |
| 3 | Final presentation files | Code is ready; 14 final files remain: two home backgrounds, two home music tracks, two portraits, and eight tier-specific cast sheets. They drop into stable configured paths; missing assets use current fallbacks. Richer spell effects can be added later. |
| 4 | Small-screen/browser QA | Browser-based mobile is the current delivery target. Automated touch tests cover hitting stars, casting via a dedicated button, 320×568/390×844 portrait and 844×390 landscape. Physical-device and browser-chrome/safe-area QA remain. |

## Confirmed round mechanic

The user clarified that the bar represents score difference, with a winning threshold X. This now replaces the earlier independent-health scaffold. Hits earn points, mistakes subtract points, equal scores center the bar, and a lead of X wins the round and fills one color. X=100 is provisional and configurable. No separate health, linked-life pool, or time-based round winner remains. Scores and pacing restart each round. The 30-minute cap belongs only to offline diagnostic simulations.

## Intentionally later

PWA installation/offline startup caching and native/store packaging are deferred by user request; they are not release blockers.

The other six adopted characters and their spell sets stay deferred until the initial two-character game is ready. Keyboard-mapping shuffle remains excluded. No PixelLab-generated character or home assets have been created yet.
