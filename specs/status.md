# Implementation audit

Updated 2026-11-18: normal-hit correction (D104/D105), three-second windows and separate AI matrices verified. See reports/balance-normal-hits-review.md. Earlier audit followed comparing the remake with the oldest Dig Hole Battle Garden sources and artwork.

## Implemented

- Eight sourced background/music pairs, including five active homes and three future homes. The approved Sporelight Keep, Moonlit Hideout, Whispering Wood and Violet Veil are preserved; the rejected town/harbor/lava/chapel have been replaced by garden/woodland scenes. Fourteen files are CC0, Bluebell Thicket art is CC BY 4.0 with visible attribution, and Stillwater Grove art has explicit creator permission. A responsive review collection at assets/homes/index.html shows the artwork and plays one looping track at a time. All approved identities remain in characters.md; three-character gameplay expansion remains deferred. No new artwork or music generated.

- Public static website at https://virgs.github.io/moonlit-battle-garden/, automatically deployed from main. User authorized the public repository. Deployment checks and a live HTTPS invite/WebRTC/touch smoke test passed.

- Private player-hosted online 1v1 with invite links, real WebRTC transport, local-side remapping, target-aware inputs, synchronized round transitions, local non-pausing online menus and automatic reconnect recovery, version/capacity checks, heartbeat RTT and 30-second transient reconnect grace.
- Local two-player and three AI difficulties; five heroes each have four functional spells (Champignon, Andromoss, Captain Bramble, Duskmantle, Sprig).
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
- Asset-ready presentation manifest: character portraits in selection; one shared casting sheet per character with event-driven playback; per-home background/music loading, focal cropping, volume/loop points, and fallbacks. Browser tests exercise valid and invalid temporary images. See public/assets/ASSET-CONTRACT.md.

- CI repair verified in [Checks run 44140185767](https://github.com/virgs/moonlit-battle-garden/actions/runs/44140185767) at f32530d: both desktop/mobile jobs pass unit tests, production builds, asset validation, all browser checks, and balance diagnostics. The session now accounts for delayed callbacks using fixed 50 ms steps (including bot decisions), limits catch-up to 250 ms, and discards paused/disconnected time. CI browser projects run on separate runners with one worker each; per-case budgets are 60 seconds and assertion deadlines are unchanged. Layout checks keep all nine viewports, grouped into phone/tablet/desktop resize sequences, and batch each frame's geometry reads to avoid software-WebGL/DevTools contention. Regression tests cover late callbacks and pause recovery. The earlier failed runs are superseded by this passing verification.

## Missing from the initial two-character game

| Priority | Feature | Current gap |
| --- | --- | --- |
| 1 | Internet/mobile online QA | Player-hosted online works in real two-browser desktop/mobile tests. A fresh QR phone-to-Mac automatic check passed after cellular/Wi-Fi-off instructions: 11/10 hits, one cast each, actual channel interruption/recovery, direct UDP host/srflx and 27–36 ms heartbeat RTT. See reports/network-qa.md. Other device/network combinations and background suspension remain to test. PeerJS bundles shared STUN/TURN entries, but no project-managed relay is provisioned and relay reachability is unverified. No prediction/rollback, host migration or page-refresh recovery. |
| 2 | Balance | Duration tuning substantially improves stalls: 0/6000 selected vs 124/6000 original held-out matches capped. Mixed-character median rounds 53/66/89 s (Easy/Medium/Hard), matches 150/171/245 s. Medium bot character split is near even; Hard still favors Champignon (64.2%) and some Hard mirrors remain long. See reports/balance-duration-review.md. Human keyboard/mouse/touch playtesting and spell/bot-policy review remain. |
| 3 | Final presentation files | Home backgrounds and music are installed. Sir Champignon’s subtle idle, expressive victory and magic-trail shared cast clips are installed as review drafts based on the user-approved 192×192 base-v3 and its final mole/rabbit/star/board style references. Visual review belongs to the user; technical checks cover files and playback. Champignon’s head-and-shoulders icon is installed for HUD/pause/round results. Andromoss now has a matching native 192×192 icon, subtle idle, expressive victory and shared violet-trail casting clips, awaiting user visual review. Remaining: eight spell-effect sheets and two optional portraits. Two generated victory sheets are already bundled. They drop into stable configured paths; missing assets use current fallbacks. Both heroes now have generated victory sprite sheets; CSS image wiggling is removed. Richer spell effects remain; defeat/hurt character reactions are excluded by user request. Active shields/wards, incoming hostile magic and attack expiry now have procedural edge placeholders; final effect art and richer block/arrival cues remain. |
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

2026-11-17: 1,000 seeds for each character/difficulty group (6,000 actual best-of-three matches), using unchanged simulation, bot logic and tuning. Left-side decided win rates: Andromoss 49.8% Easy / 49.7% Medium / 48.8% Hard; Champignon 48.0% / 49.5% / 50.0%. All six nominal 95% reference intervals include 50%; no obvious side bias found in this check. Mirror cases run once per seed, without duplicate identical-character side swaps. Caps remain separate: Andromoss Hard 12/1000, Champignon Medium 1/1000, Champignon Hard 164/1000. Champignon Hard median duration is 997.9 seconds, exposing a stalemate/duration issue even in symmetric matches. See reports/balance-mirrors.md and its full JSON. No balance changes were made.

### AI randomness and shorter matches (supersedes prior tuning findings)

All AI levels now have seeded per-target reaction jitter, per-action timing variation and occasional hesitation. Accuracy 70/87/92%; base reaction/action times preserve Easy/Medium/Hard ordering. Stronger wave peaks, a 60-second ramp and 5% losing-board pressure replace the prior 120-second ramp/10% modifier. Minimum target lifetimes, concurrency, spells, scoring and identical per-round reset remain. Held-out baseline vs selected tuning: 12,000 simulated matches, capped 124/6000 before and 0/6000 after. Mixed-character median rounds 53/66/89 seconds; matches 150/171/245 seconds. Medium Champignon win rate 49.5%; Hard 64.2%, still unfinished balance work. Production-config mirror rerun: 0/6000 capped, with no consistent side advantage across the original and held-out cohorts. See reports/balance-duration-review.md for all controls, duration tails and raw data.

### Sourced character-home assets

Four CC0 assets are installed at the configured home paths: Champignon uses the original first frame of Castle in the Dark plus Forest Whisper Theme; Andromoss uses the creator-published composite Dark forest PNG plus Magic Town. Sources, creators, license and file hashes are preserved in public/assets/homes/. Static source pixels are retained; no image/music generation was performed. Background opacity/focal framing keeps the night mood and HUD readable. Browser checks cover both real backgrounds and tracks loading, native playback/looping/pause, and fallback controls on desktop/mobile.

### Andromoss naming and art verification (2026-11-18)

The approved alien base-v5 now drives installed idle (5 frames), victory (9 frames), shared cast (9 frames) and icon assets. Runtime IDs, home/character paths, CSS, networking and diagnostic scripts use `andromoss`; source artwork names and old balance reports remain historical records. Network rules version is bumped to reject incompatible builds. No rule, bot strategy or tuning changes were made. A 60-match seeded smoke diagnostic completed without unfinished games; the small sample is not a new balance conclusion. See `reports/balance-andromoss-rename-smoke.md`. Generated visuals await user review.

## Current five-character milestone (2026-11-18)

User authorized all five approved heroes as playable. All five can be selected for either side/AI level and online rooms; their approved art and distinct homes/music are wired in. Twenty functional spells use the shared simulation, with new armor/mark/camouflage/siphon/extension/cleanse/automation semantics documented in prototype.md. Previous art-only staging/two-hero scope notes above are historical. Source-of-truth roster validation now serves selection, presentation and networking, with wire version bumped for the new state schema. No new artwork.

Current checks: 109 simulation tests, production build, native-asset validation and 48 desktop/phone browser cases (four legacy carousel tests rerun after fixing two-roster assumptions); 1,500 paired/mirror AI matches completed with no caps. Bramble dominates current Medium/Hard bot matchups (87.5/85.0% distinct-pair wins). Remaining: human balancing, physical-device/network QA, optional relay service, per-spell final effect assets and optional large portraits. Remaining three heroes and new art stay deferred.

## Current spell-retune milestone

D101/D102 swaps Champignon/Bramble tiers1/2, adds a 3-second active sweep, removes empty-theft shields and makes Sprig hit every target kind every250ms in one/two columns. Normal rabbit penalties are explicitly user-selected. Double Trouble still targets the opponent. The current wire schema is version8.

119 simulation tests and 22 targeted desktop/phone cases passed (two clock-loading tests rerun after fixing the test setup). Before and final 100-seed roster runs each completed 7,500 matches without caps. A stale sweep-spending policy was identified, preserved and corrected; the current outcomes still show weak Easy/Medium Champignon and dominant Bramble. See `balance-retune-review.md` for full matrices, mirrors and spell coverage. Previous launch counts/results above are historical. No new artwork.

## Current duration-only iteration

The primary balance view is now the user-requested versus matrix, pooled equally across AI levels with per-cell difficulty-spread flags and underlying per-level rows. Weighted pooling, reversed pair orientation, mirror side results and cap handling have unit checks. Five 100-seed duration variants each completed 7,500 matches without caps;1-second sweep/2-second armor was adopted and its new default-config run exactly matches the selected trial. 121 simulation/reporting tests, 12 desktop/phone checks and the build passed. No assets were generated or modified. Duration changes help but do not resolve Bramble dominance or low-level Champignon weaknesses.


D106 correction: one-star Sweep now uses one fixed column (busiest at cast time, leftmost ties); Royal Cleanup remains full-board. Borrowed Spark steals all enemy stars subject to the four-charge caster cap; empty meter wastes it, wards still block. See reports/balance-column-theft-review.md for the new 7,500-match run; previous full-board results are historical. No additional durations/points or other spells changed.


D107: offline tier-isolated harness implemented, with one-slot/one-star trials and uniform immediate casting. First tier-1 run: 7,500 matches, no caps; no power changes. Three matrices, measured impact and interpretation limits are in reports/balance-tier-1.md and balance-tier-1-review.md. Borrowed Spark is wasted against an empty meter about 98% of casts under this restrictive policy; Champignon changes from Easy-favored to Hard-unfavored; mirror samples have 61–62% Champignon side-win signals requiring follow-up before fine tuning. Higher tiers are supported but not yet run. Normal browser mode remains unchanged.
