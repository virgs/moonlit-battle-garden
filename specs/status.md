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


D108/I07: one-star diagnostics now use useful-opportunity conditions and shared 300–700 ms decision delays, with cancellation/reconsideration. No power changes. Paired-seed 7,500-match run has zero caps; matrices/metrics and comparison are in balance-tier-1.md / balance-tier-1-review.md. Immediate-policy history preserved separately. Normal mode and higher-tier strategy unchanged.


D109/I08: adopted one-star Sweep cadence 1.5 s (immediate hit retained) and Tin Caps quota one, both active windows still 3 s. Royal Cleanup 0.25 s and Heavy Harvest four moles unchanged. Five controlled 7,500-match trials plus exact adopted-default rerun (45,000 matches, no caps); current matrices and limitations are in balance-tier-1.md / balance-tier-1-strength-review.md. Champignon remains favored, with mixed Hard cadence-only changes; no balanced-roster claim. 145 tests/build/eight browser cases passed; full-kit/human balance still needs follow-up.


D115/I12: shared 500 ms-floor / 600 ms-late-base lifetime curve applied to all target kinds/origins. AI reaction/action/jitter/accuracy/hesitation configuration verified unchanged. Spell-free diagnostic: 1,500 fixed two-minute sessions (100 per hero/difficulty), all cohorts resolved, zero casts, identical hero outputs. Late-peak mole capture Easy 0%, Medium 21.4%, Hard 86.4%; Easy also captures zero in late recovery/build. Reports/reaction-pacing.md/.json preserve method, phase counts and raw sessions; no spell/AI compensation applied. 152 tests, production build and 12 desktop/mobile browser checks passed. Normal victory unchanged; fixed-length no-victory behavior is local diagnostic only. Casting delay and spell balance are still subsequent steps.


D117/I13 casting-delay comparison complete: 22,500 matches across baseline/fast/scaled, same100 seeds, no caps. Scaled target-based timing Easy700–1300 ms /Medium500–900 ms /Hard300–500 ms; only decision delay is multiplied. Ordinary full-kit AI/default baseline unchanged. Counters reconcile pending/cancelled/completed decisions; Hard fast/scaled results identical across2,500 matches. Pooled/per-level matrices and counterplay findings in reports/casting-delay-review.md. 157 tests/build/six browser checks passed. No spell strength changes; user review of the experimental profile precedes adoption/full-kit follow-up.


D118/I14: scaled profile adopted as default for isolated one-star opportunity tests. Fresh7,500-match run (100 seeds/pairing/level), zero caps, exactly reproduces all outcomes/casts/decision metrics from explicit scaled trial. Current pooled/per-level matrices and spell reminders are in balance-tier-1.md / balance-tier-1-adopted-review.md. 158 tests/build/six desktop/mobile browser checks passed. No spell-strength, pacing or reaction-setting changes; ordinary full-kit AI unchanged. Faster Sweep/at least three Tin Caps moles are still pending preferences for next strength comparison.


D119/I15: corrected Clean Sweep to immediate +same-update arrival hits for its 3 s column window. Tested Bud 8→12 s and Tending 700→1200 ms independently/together; adopted provisionally, not claimed balanced. Four 7,500-match trials +exact default rerun (37,500, no caps); Bud has zero outcome effect from longer duration, Tending mixed due partly to one-attempt bot strategy/occupancy. Royal Cleanup/Withering Pact and other powers unchanged. 161 tests/build/12 browser checks passed. Current pooled/per-level matrices and spell reminders in balance-tier-1.md and continuous-sweep-duration-review.md.


D120/D121/I16: Ominous Bud marks three within 12 s; Gentle Tending applies +500 ms once to all current/new targets for 3 s, with active aura placeholder and protocol 11 synchronization. Four 7,500-match controls plus exact default rerun = 37,500, no caps; control matches pre-change records, adopted outcomes match combined trial. Three marks improve most matchups; aura improves every independently tested matchup. 165 tests/build/14 desktop/mobile browser cases passed, including actual guest aura synchronization and pause/lifetime checks. Current spell tables include owner; data/current matrices in mark-aura-review.md and balance-tier-1.md. No new artwork or other strength/timing changes.


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
