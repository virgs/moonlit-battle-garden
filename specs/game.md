# Game specification

Status: design in progress. See decisions.md for agreement status; proposals here must not silently become confirmed requirements.

## Identity and loop

Two rival gardens. Each player hits moles before they retreat, avoids rabbits and empty holes, collects stars, and casts character-specific magic to survive or disrupt the opponent. No stacking mechanic.

Each garden is a 3×3 board. Hits earn points; missed moles and incorrect hits subtract points. A score lead of X wins the round; first to two round wins wins the match. The shared blue/red bar maps score difference linearly: ties center it, and a lead of X fills one color. X is configurable (currently a provisional 100). There are no separate health pools or time-based round wins. Both scores and pacing reset each round.

Proposed magic economy: collectible stars charge a meter capped at four. Casting uses the character's spell at the exact current tier and consumes the charge. Lower tiers should remain useful tactical choices rather than strictly weaker versions of higher tiers.

## Playable roster

Five approved heroes are playable: Sir Champignon, Andromoss, Captain Bramble, Duskmantle and Sprig. Each has a distinct four-spell kit, approved art and assigned home/music. Exact provisional effects are in prototype.md. Mallow, Miyaya and Rootbeard remain deferred; no more character generation is part of this integration phase.

## Modes and presentation

| Mode | Presentation | Connection |
| --- | --- | --- |
| Local human versus human | Two boards on one computer | Offline |
| Online human versus human | Two-board desktop layout; own board on mobile | Online |
| Human versus AI | Device-appropriate layout | Offline supported |

Mobile must prioritize large touch targets and the player's board, score, stars, and casting control. D30 removes the opponent statistics strip; the shared bar and per-side trophies represent both players. Cross-device matches are intended; input fairness needs playtesting and a policy decision.

Matches fill the viewport with one canvas; menus, status, controls, and pause/results UI are HUD overlays. Preserve image proportions with uniform scaling and responsive positioning. Sprite feet and hit areas share measured source-art anchors. On two-board views, the local player is always left, and same-computer Player 1 is always left. No side selector is needed. Online transport maps network seat into this local presentation. Single-board mobile views show the local player; phone landscape can place HUDs beside the board to keep targets large.

Original direct keyboard layout is a starting proposal: QWE/ASD/ZXC for one player and numpad 789/456/123 for the other. Casting keys, rebinding, mouse, gamepad, and touch details are not finalized. Keyboard-mapping shuffle is excluded.

## AI

Easy, medium, and hard opponents must run offline. Use ordinary game logic, not an external language model.

Proposed differentiation:

- Easy: slower reactions, more misses and rabbit mistakes, predictable casting.
- Medium: moderate reaction speed and accuracy, basic recovery and star-saving decisions.
- Hard: fast but fallible reactions, target prioritization, strategic spell timing.

Proposed fairness constraints: bots react only after targets become visible, obey a minimum interval between actions, and respect the same spell and hit rules as humans. Do not grant advance spawn knowledge or free points. Difficulty values require playtesting.

## Technical direction

Frontend: TypeScript, React, Phaser, Vite, pnpm; follow shinobi-arena's tooling conventions, including Vitest and Playwright where appropriate. React handles menus/room screens; Phaser handles board rendering, animation, and effects. No physics requirement has been identified.

Implemented architecture: shared TypeScript rules independent of rendering/networking. Local/AI matches run locally. Online matches run the same rules in the creator's browser; the guest sends target-identified hit/cast inputs and receives authoritative snapshots. Each client maps its own seat to the left. No cheating protection or dedicated gameplay server is required by the user.

PeerJS Cloud signaling is the default; WebRTC data channels carry gameplay. Optional ICE overrides allow a managed TURN relay on networks where direct connection fails. Private invite links, version/config checks, two-player capacity, non-pausing online menus and synchronized round changes, heartbeat/latency feedback and 30-second reconnect grace are implemented. Host exit ends the match; no host migration or refresh recovery. See online.md for exact behavior and known limits. Networking services are never required for local/AI modes.

Confirmed mobile delivery: responsive browser website, hosted on GitHub Pages. PWA installation/offline caching and native packaging are deferred. Phone players tap holes and tap the star container to cast. Tap the bar or press Escape for controls. AI/local modes pause; online continues behind its menu.

## Art and sound

Reuse suitable assets from Molecide Gaiden and Dig Hole Battle Garden. Molecide supplies a character atlas, rise/idle/hit/miss animations, gardens, HUD assets, and sound effects. The older game supplies character portraits and additional effects/art/audio. Inspect assets and their provenance before selecting final release content; avoid assuming every repository asset is original.

PixelLab fills specific asset gaps after the initial character and spell requirements are defined. Preserve the original cast's playful identities and recognizable props.

## Proposed spell readability rules

- Show the currently available spell next to the star meter.
- Give hostile spells a brief recognizable visual/audio warning and clear duration feedback.
- Limit simultaneous disruptive effects so boards remain playable.
- Define automatic clearing explicitly: proposed safe rabbit removal, no mole combo rewards, and stars left for manual collection.
- Casts use a brief shared 1500 ms freeze with character presentation; do not extend the freeze to wait for assets.

## Delivery scope

First release focuses on two characters with complete magic kits, local versus, online versus, mobile presentation, and three AI difficulties. Exact release checks and sequencing are still open. Keep the other six character concepts documented for expansion after this version is ready. Local/AI play is now implemented; see prototype.md for actual defaults. Offline AI self-play at all three difficulties is required to evaluate balance. Private online play is implemented; cross-network/mobile QA, optional relay provisioning remain pending. PWA delivery is deferred.


Current hit semantics (D105): Sweep and Sprig automation use the same base target rules as manual hits—moles award normal points, rabbits incur the normal penalty unless guarded, stars award normal points and charge. Armor takes extra strikes. Lasting spell windows have a three-second minimum (D104); instant actions and presentation/action timing are separate. Current exact values are in prototype.md.

D106 limits one-star Clean Sweep to one column; only Royal Cleanup covers all columns. Borrowed Spark transfers all enemy stars, capped at four on the caster, and wastes its charge against an empty meter. The existing hostile warning and ward protection apply. Column selection is fixed at cast time using the provisional busiest-column rule.


D107 adds offline tier-isolated diagnostics only, initially one-star spells/one charge slot. All bots cast whenever full/cooldown-ready; lower tiers are disabled when testing a higher tier. Normal browser gameplay, powers and star economy stay unchanged. See prototype.md for exact harness rules and caveats.

D108 supersedes immediate casting for current one-star diagnostics: visible spell-specific opportunity conditions, followed by one shared random delay across difficulties; cancel/reconsider when the opportunity vanishes. Full-kit casting and spell powers remain unchanged. Exact provisional settings are in prototype.md.

D109/I08: shared normal/diagnostic rules now use 1.5-second one-star Sweep strikes after the initial hit and one-mole Tin Caps. Both windows remain three seconds; Royal Cleanup/Heavy Harvest and all other powers stay unchanged. Consult the separate tier-1 matrices rather than treating historical full-kit diagnostics as current balance.


D115/I12 applies the shared target lifetime wave with a 500 ms floor and 600 ms late-round base. AI timing is unchanged. Spell-free fixed-duration diagnostics measure target handling by birth phase, separate from competitive win matrices. Normal match victory/pause/network rules remain unchanged. See pacing.md for the actual curve and first measured results.


D117/I13 adds experimental baseline/fast/scaled delay profiles to isolated one-star diagnostics; scaling applies only to decision delay, with shared target visibility. Pooled versus overview retains per-level flags/details per D116. Normal full-kit AI, pacing and spell powers stay unchanged during this test.


D118/I14 adopts the scaled casting profile for isolated one-star diagnostics only. Normal full-kit AI remains separate. No spell-strength or pacing/reaction changes accompany this adoption; current spell rules are reiterated in the baseline review and prototype.md before the next power-tuning pass.


D119/I15 clarifies Clean Sweep owns its selected column for 3 active seconds and hits all arrivals on the same update, using normal hit rules; there is no 1500 ms strike delay. Longer provisional one-star durations are Ominous Bud 12 s marking window and Gentle Tending instant +1.2 s target extension. No additional mark quota/aura or other spell changes. See prototype.md and continuous-sweep-duration-review.md for exact rules and controlled results.


D121/I16 changes Duskmantle’s one-star mark quota to three and Sprig’s one-star extension to an all-target three-second aura (+500 ms once per current/arriving target). Pacing, hit reaction and scaled casting rules are held fixed. Exact coverage, expiry, freeze/reset and recast rules are in prototype.md; current pooled and per-level diagnostics are in balance-tier-1.md / mark-aura-review.md.


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
