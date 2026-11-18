# Implementation audit

Updated 2026-11-17 after comparing the remake with the oldest Dig Hole Battle Garden sources and artwork.

## Implemented

- Public static website at https://virgs.github.io/moonlit-battle-garden/, automatically deployed from main. User authorized the public repository. Deployment checks and a live HTTPS invite/WebRTC/touch smoke test passed.

- Private player-hosted online 1v1 with invite links, real WebRTC transport, local-side remapping, target-aware inputs, synchronized round transitions, local non-pausing online menus and automatic reconnect recovery, version/capacity checks, heartbeat RTT and 30-second transient reconnect grace.
- Local two-player and three AI difficulties; Sir Champignon and Andy each have four functional spells.
- Full-viewport canvas, HUD overlays, uniform sprite scale, measured hole anchors, and a fixed left/local player identity. Responsive single-board mobile presentation. D30 replaces permanent panels with a minimal HUD.
- One shared animated bar using the oldest efeitoLife.pcx and bordalife.pcx artwork, a moving source window, four frames at 12 fps, and the original incremental easing. No repeated/tiled mini-bars or separate player health meters. Numeric scores are hidden; the bar is driven solely by score difference.
- Minimal play HUD with no score/portrait/spell/wave panels; original vertical star containers cast on tap/click (horizontal on narrow portrait layouts), and tapping the bar/Escape opens controls (pause only in AI/local modes).
- Enlarged names/trophies (2× phone, 3× desktop) and larger responsive star controls. Target rising/hiding are ordered full-sheet sequences, idle/dancing loops, and independent hit feedback covers moles, stars and rabbit penalties.
- Original sprite-based star containers/charge animations, blue/red board-base palette replacement, spinning round-win trophies in the central verdict, and persistent 0/1/2 trophy rows below each side of the score bar.
- Original board artwork and falling earth aligned at board-local coordinates. Different earth counts, positions, and animation phases on the two boards; the opponent's underground root strip is mirrored without moving its holes.
- All 33 recovered sound effects/variants and shared fallback music enabled on entry, with gesture unlocking, bounded overlapping playback, mute/pause/exit cleanup and native decoding/playback browser checks.
- Button-free final-match hero/winner overlay over the preserved arena with a four-second delayed fresh-key/tap/controller prompt back to setup.
- Cosmetic home selection constrained to the participating characters, and sound/mute/pause lifecycle.
- Repeatable seeded offline AI tournaments, swapped sides, per-difficulty win reports, and spell-use coverage.
- Rising 25-second pressure/recovery waves, independent board clocks, score-based trailing-player pressure, identical per-round baseline reset and explicit concurrency/reaction-window bounds.
- Asset-ready presentation manifest: character portraits in selection; per-tier cast sheets with event-driven playback; per-home background/music loading, focal cropping, volume/loop points, and fallbacks. Browser tests exercise valid and invalid temporary images. See public/assets/ASSET-CONTRACT.md.

- CI repair verified in [Checks run 44140185767](https://github.com/virgs/moonlit-battle-garden/actions/runs/44140185767) at f32530d: both desktop/mobile jobs pass unit tests, production builds, asset validation, all browser checks, and balance diagnostics. The session now accounts for delayed callbacks using fixed 50 ms steps (including bot decisions), limits catch-up to 250 ms, and discards paused/disconnected time. CI browser projects run on separate runners with one worker each; per-case budgets are 60 seconds and assertion deadlines are unchanged. Layout checks keep all nine viewports, grouped into phone/tablet/desktop resize sequences, and batch each frame's geometry reads to avoid software-WebGL/DevTools contention. Regression tests cover late callbacks and pause recovery. The earlier failed runs are superseded by this passing verification.

## Missing from the initial two-character game

| Priority | Feature | Current gap |
| --- | --- | --- |
| 1 | Internet/mobile online QA | Player-hosted online works in real two-browser desktop/mobile tests. A fresh QR phone-to-Mac automatic check passed after cellular/Wi-Fi-off instructions: 11/10 hits, one cast each, actual channel interruption/recovery, direct UDP host/srflx and 27–36 ms heartbeat RTT. See reports/network-qa.md. Other device/network combinations and background suspension remain to test. PeerJS bundles shared STUN/TURN entries, but no project-managed relay is provisioned and relay reachability is unverified. No prediction/rollback, host migration or page-refresh recovery. |
| 2 | Balance | The harness exists, but balance is unfinished. Latest 1500 ms cast-freeze diagnostic: Champignon wins 110/200 easy, 137/200 medium, 143/200 hard; Andy wins 90/63/51, with six Hard matches unfinished. The cap/duration now include presentation holds; prior reports used active time only. See reports/balance-cast-freeze.md. Independent clocks alone gave better Medium/Hard bot balance than the score modifier; see reports/balance-score-pressure-comparison.md. Tune pacing/magic, examine bot-policy bias and long ties, then validate human keyboard/mouse/touch play. |
| 3 | Final presentation files | Code is ready; 26 final files remain: two home backgrounds, two home music tracks, two portraits, two character icons, two standing/idle sheets, eight tier-specific cast sheets and eight spell-effect sheets. Two generated victory sheets are already bundled. They drop into stable configured paths; missing assets use current fallbacks. Both heroes now have generated victory sprite sheets; CSS image wiggling is removed. Richer spell effects remain; defeat/hurt character reactions are excluded by user request. Active shields/wards, incoming hostile magic and attack expiry now have procedural edge placeholders; final effect art and richer block/arrival cues remain. |
| 4 | Small-screen/browser QA | Browser-based mobile is the current delivery target. Automated touch tests cover hitting stars, casting by tapping the star container, 320×568/390×844 portrait and 844×390 landscape. Physical-device and browser-chrome/safe-area QA remain. |

## Confirmed round mechanic

The user clarified that the bar represents score difference, with a winning threshold X. This now replaces the earlier independent-health scaffold. Hits earn points, mistakes subtract points, equal scores center the bar, and a lead of X wins the round and fills one color. X=100 is provisional and configurable. No separate health, linked-life pool, or time-based round winner remains. Scores and pacing restart each round. The 30-minute cap belongs only to offline diagnostic simulations.

## Intentionally later

PWA installation/offline startup caching and native/store packaging are deferred by user request; they are not release blockers.

The other six adopted characters and their spell sets stay deferred until the initial two-character game is ready. Keyboard-mapping shuffle remains excluded. PixelLab victory sprite animations are bundled for both initial heroes; final portraits, pause/round icons, cast art and home assets remain.


D38: per-player score pressure and independent natural clocks are implemented. The 10%/10% default improves Hard relative to the old synchronized baseline but does not balance Medium/Hard. Paired diagnostic results, a no-pressure control and the rejected stronger feedback are preserved in reports/balance-score-pressure-comparison.md. D39 defers all new sprite generation until remaining game development is finished.


D41 places names above their trophies and centers them on the same columns, with reserved wrap room on desktop and bounded label widths on phones. No gameplay or balance parameters changed in this UI pass.

D42 replaces the text-heavy pause reference with large left-side actions, a centered Pause title, CraftPix 3×3 keyboard maps and spell titles only. Key mappings are shared with gameplay; modal keyboard navigation and narrow-screen scrolling are covered by browser tests.

D46 aligns portrait pause character headings and prepares dedicated per-character icon slots in pause references and round results. Icon generation remains deferred; D47 replaces absent files with recovered hero art.

D47 adds visible recovered-art placeholders, standing/idle previews, tier-specific spell-effect slots with procedural fallbacks, and a shared 1500 ms cast freeze. Both boards’ targets, inputs, pending spells, effect lifetimes and pacing freeze; cast presentation advances independently and pauses on manual pause/reconnection. Victory sheets remain the existing actual sprite clips. A 600-match diagnostic is preserved in reports/balance-cast-freeze.md.

D48 shows captured star cost beneath the casting character using 1–4 original charged stars and a blue/red caster accent. It works in single-board mode for either caster. Defeat/hurt assets are removed from planned scope.

D49 defers further asset/animation creation during screen work. Simple semi-transparent color boxes are acceptable temporary visuals. Core game modes and match flow are implemented; balance (including long AI ties) and real-device/cross-network QA remain validation work, while title/menu/setup presentation can proceed.

D50 replaces the website-style setup page with a full-screen title and main menu. AI/local character setup and online create/join/invites share the main menu; Options persists sound and How to Play explains controls. Direct invites bypass the title. Existing castle/hero art is reused without generation. Responsive and keyboard/touch flow checks are included.

D51 separates mode/options from a dedicated two-carousel character screen. Solo keeps an editable bot carousel; local players confirm independently; online highlights and ready states synchronize live before match creation. Existing idle slots/still fallbacks and one-shot victory sheets are used without asset generation. Pre-match reconnect clears readiness and pending starts.

D52 renames the modes to Night Watch / Garden Grudge / Beyond the Hedge, with Garden Shed and Field Notes for settings/help. Selection copy is reduced to one Ready marker per hero; redundant instructions and visible player-role labels are removed. Existing CraftPix key icons are paired with working confirmation/start/back controls.

### Mode identification and round clock

Implemented: consistent mode icons across menus, character selection, gameplay and pause; enlarged keyboard hints; explicit Back to title action; original star sprites for spell costs. Gameplay and pause show mode, Round N and elapsed active round time. It resets each round and freezes with gameplay; score-difference victory remains unchanged. Verified with unit checks, production/Pages build and desktop/mobile browser checks for clock progression, pause/cast freezes, round reset and responsive layout clearance.

### AI mirror-match audit

2026-11-17: 1,000 seeds for each character/difficulty group (6,000 actual best-of-three matches), using unchanged simulation, bot logic and tuning. Left-side decided win rates: Andy 49.8% Easy / 49.7% Medium / 48.8% Hard; Champignon 48.0% / 49.5% / 50.0%. All six nominal 95% reference intervals include 50%; no obvious side bias found in this check. Mirror cases run once per seed, without duplicate identical-character side swaps. Caps remain separate: Andy Hard 12/1000, Champignon Medium 1/1000, Champignon Hard 164/1000. Champignon Hard median duration is 997.9 seconds, exposing a stalemate/duration issue even in symmetric matches. See reports/balance-mirrors.md and its full JSON. No balance changes were made.
