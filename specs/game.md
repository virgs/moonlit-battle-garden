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
