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


### One-star tuning accepted (D127)

The user accepts D125/D126 as the baseline and closes tier1 tuning: no hero wins every matchup at every AI level. Preserve the existing imbalance/counter flips and bot-policy caveats; acceptance is not proof of human/full-kit balance. Next balance pass: tier2. Current rules and matrices remain in reports/tin-next-review.md and reports/balance-tier-1.md.


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

Validation for the one-star presentation pass:221 simulation/asset tests, production build and22 targeted desktop/mobile browser cases pass; assets check reports0 invalid. Real game input checks cover two-charge consumption, frozen frames on pause, reduced motion, uniform sprite scaling, guard glyphs clear of every hole, live mole attachment, effect expiry and portrait/landscape indicators. Existing HUD anchors/names/stars remain covered. No simulation, bot or balance values changed; no balance rerun required.


The user approved Champignon/Bramble guard revision2. Full in-game flow recordings are reproducible with `pnpm exec vite-node scripts/capture-guard-flow.ts` (requires FFmpeg on PATH). Actual menu and star/cast input produces before/casting/effect PNGs and4.6-second1280×800 GIFs under ignored `output/guard-flows/`. Capture assertions verify casting,1★ cost and active loaded guard sprites; file metadata verifies46 frames at10 FPS. No image inspection or mechanics changes.


### Casting backdrop and individual target statuses (D146)

A full-arena50% black overlay sits above boards, all HUD and existing effects, below the casting hero and star-cost display. Both caster and stars retain full opacity. It appears only during the existing1.5 s casting hold, requires no additional warning/freeze, and leaves pause/menu above it.

Individually affected targets carry compact pixel-style badges above their own hole/sprite, uniformly scaled with the board. Silver shield2/3 shows total hits remaining while armor exists, decrementing per strike and disappearing when armor is broken. Violet rune with−8/−6 shows extra miss penalty; reuse the existing single-loop curse art for both tiers. Gold+2 marks manual mole bonus points only during the actual7 s buff. Amber hourglass identifies targets with earned lifetime shortening; green leaf identifies targets with an earned lifetime extension, including stars/rabbits. Lifetime badges survive their originating aura while the target keeps the modification; cleansing removes shortening/curses/armor but keeps positive extension. No badges are inferred just from pending charges. Multiple actual modifiers can coexist, without altering hitboxes or rules.

Target status is a read-only presentation helper using the real snapshot, with accessible descriptions on the hole controls. Badges never capture input, clear with their target/effect, freeze on pause and remain part of a frozen outcome scene. Replace the old canvas-only armor/curse arcs and the separate1★ per-mole placement with the shared badge layer; retain board-wide higher-tier placeholders. No new assets, AI, simulation or balance changes.

D146 verification:225 simulation/presentation tests, production build and28 targeted desktop/mobile browser cases pass. Full arena50% dimming and caster/star separation are checked through computed styles/layer geometry, without image inspection. Real casts cover two/three-hit armor decrement, curses, manual bonus, shortened/extended lifetimes, mole alignment and pointer transparency. Refreshed full-flow GIFs and target screenshots are in ignored output/guard-flows, with index.html for user review. Rules/AI unchanged; no balance rerun or new art generation.


### Star-meter timing around casting (D147/I36)

The star container holds a completed, fully formed charge pose during the hero’s casting scene. Its spending/reward/theft transition starts only after casting ends; there is no mid-transition container frozen behind the hero. This uses the user’s permitted after-cast option without postponing any spell or input. Logical star count, cast cost, scoring and network state still update immediately.

The caster uses the captured spell cost for its held visual charge, including when an online/coalesced snapshot skipped the final pickup or another cast’s gap. Opponent meters hold their previous visible count through theft. Auto-hit/theft star rewards earned during the cast are presented as the actual resulting charge afterward; unchanged opponent meters return directly to the complete pose. All vertical/horizontal board meters and the hidden opponent’s small meter share the same presentation helper. Normal pause still freezes animation; reduced motion and frozen outcome/countdown scenes use the complete pose directly. The independent stars-spent overlay continues with the hero’s presentation clock. No autonomous meter timers, new assets, simulation, AI or balance changes.


### Single-line hero labels and larger HUD portraits (D148/I37)

All in-game hero names, including Captain Bramble, stay on one line, without ellipsis or truncation. HUD portraits double their previous sizes:64px normally,36px at widths≤700px,40px on short screens≤520px high (short-screen rule takes precedence). Portrait and name remain one pair, mirrored by player side. Give stacked pairs enough height and per-side width; fit font size to available label space. Trophies retain alignment with vertical star containers.

On wide desktop viewports (width≥1200,height≥580), and roomy landscape viewports (width≥640,height≤520), place both pairs outside the respective ends of the single centered score bar, vertically centered on the same row. Reserve the actual icon/bar row height; the bar preserves499:45 proportions. Other viewports keep pairs below the bar, bounded within their own halves of the screen. In landscape, the hidden-opponent charge strip moves below its name row and outside the trophy column; active hidden-board spell glyphs badge the larger portrait corner instead of intruding on names. Responsive board sizing and hole/star anchors remain shared with the HUD. No new art or mechanics changes.


### Edge portraits, adaptive small-screen sizes and trophy previews (D149/D150)

Supersedes D148 sizing/placement. Desktop HUD portraits are128px and each hero pair is anchored12px from its own screen edge, farther from the centered score bar. Responsive exception approved by user: use96px on medium desktops,80px on tablets,64px on normal portrait phones and48px on narrow phones/short phone landscape (short wide windows use64px). Full names remain on one line; names move below portraits when the side space cannot fit a horizontal pair.

Wide desktop keeps horizontal icon/name pairs flanking the bar; intermediate desktop uses compact columns flanking it. Short landscape lets portraits use spare edge space around the bar row, keeps trophies under the bar and puts the compact opponent star meter between trophy columns; desktop trophies retain star-container alignment. Shared geometry reserves stacked-name/icon height where needed and preserves uniformly scaled boards and tested landscape touch targets.

Remove the persistent round-number label and the numbered countdown heading; retain the mode, elapsed timer and3–2–1 countdown. Trophies communicate round wins. Internal round rules are unchanged. `pnpm exec vite-node scripts/capture-hud-preview.ts` captures desktop/390px portrait/844px landscape/320px phone/667px compact landscape examples with one actual simulated round win per player through the standard Game renderer. The setup is isolated in ignored output/guard-flows and never changes normal match starts. Visual review remains with the user.


### Trophies centered beneath portraits (D151)

Supersedes the previous star-column/bar-end trophy alignment. HUD trophy width and height are80% of their previous values:134.4×67.2px in the larger HUD,89.6×44.8px in the compact HUD; preserve the source2:1 aspect ratio. Each trophy belongs to its hero group and is centered on the portrait. With a beside-portrait name, the trophy sits6px below the portrait. With a below-portrait name, it sits6px below the name, still centered on the portrait rather than on the text.

Use CSS anchors inside the portrait/name groups, with no browser measurement timers. Preserve trophy win-count animation/reset. Shared HUD geometry reserves the true portrait/name/trophy extent, including short landscape overflow; minimum edge inset increases only where needed to keep the centered trophy fully onscreen. The ordinary small opponent meter stays below the portrait HUD, with its compact landscape placement unchanged. Full names remain unwrapped. Round-result celebration trophies, character/spell assets, rules and balance are unchanged. Capture previews retain one actual round win per side and assert portrait centering/below-name placement at all five captured sizes.

D151 verification:231 tests and production build pass, plus30 desktop/mobile browser cases. Geometry checks require each trophy center to equal its portrait center, top to follow the portrait/name bottom, dimensions to be80%, and the entire glyph to fit above gameplay and inside the viewport. Five real1–1 preview captures pass the same center/order/bounds checks; refreshed images/gallery remain in ignored output/guard-flows.

### Distinct higher-tier gameplay spell loops (D152)

All15 spells at2★/3★/4★ now have individual code-drawn silhouettes and motions, actual state/column/target anchoring, charge cues and hidden-opponent indicators. Hero casting,1★ artwork, spell durations, rewards and simulation/network behavior are unchanged. No sprite generation or image inspection. Manifest audit:41 installed assets +15 game-drawn effects; only5 optional portraits remain missing,0 invalid. Visual approval belongs to the user.

D152 verification:251 simulation/presentation tests and production build pass;40 desktop/mobile browser cases pass for actual casting, target markers, charges and column effects. Capture checks additionally cover15 unique animated silhouettes, reduced-motion pose0, paused pose stability and real desktop/single-board phone portrait/landscape cast flows, including hidden-opponent indicators. Balance reruns are unnecessary for this presentation-only change; no simulation, spell configuration, bot or protocol changes.

### Shaded raster artwork for all20 spells (D153)

Supersedes I40's vector-like visuals and the old active1★ sheets. All20 effects now use distinct shaded48px raster motifs and the hero's signature colour in each frame. Preserves cast freezes, durations, columns, target badges, charges, mobile hidden-opponent cues and reduced motion. Generated locally from authored pixel instructions, with provenance; no image inspection or external generation service. New art awaits user visual review.56 ready files,5 optional portraits missing,0 invalid.

D153 verification:252 tests and production build pass;54 desktop/mobile browser cases pass across all tiers and1★ replacement artwork. Export checks require20 distinct silhouettes,8fps/eight-frame sheets, at least8 palette colours and the exact hero accent in every frame, exclusively hard0/255 alpha, and genuinely different frame pixels. Capture checks require20 loaded raster images with pixelated sampling and no vector paths, reduced-motion pose0 and real desktop/phone cast/pause/hidden-opponent flows. No simulation/bot/spell/protocol changes or balance tuning.
