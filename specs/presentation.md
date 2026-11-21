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

Retune presentation: Clean Sweep’s procedural edge effect follows its 3-second gameplay window. Sprig’s active one/two columns have faint green bounds derived from actual hole hit areas, scaled uniformly with the board. Both hero casting animations and stars-spent overlays remain unchanged. Automation star pickups use the ordinary charge animation/SFX; rabbit hits use ordinary penalty/guard feedback. New snapshot fields use wire version8; mismatched clients must refresh.

Duration-only update: the sweep edge cue now follows a 1-second window, and helmet arcs/pips follow2-second armor. Casting clips/freezes, source artwork and other effect timing remain unchanged.


### One-star gameplay loops (D143)

Exactly one looping spell asset per hero’s1★ effect, separate from the existing shared hero casting clip. No extra activation, charge-consumption, ending clip or freeze. Existing1.5 s cast/stars-cost/SFX stay. PixelLab’s free VFX renderer exports8 frames at6 FPS on48×48 transparent canvases; the images are not AI-generated or model-reviewed. User visual approval is pending. Editable recipes, PixelLab effect links and export provenance live in public/assets/effects/one-star/provenance.json, and the preview gallery in the same folder. This explicit request reopens only the five one-star effect assets; other deferred art remains deferred.

Champignon and Bramble: two mushroom/leaf protection glyphs near board edges; remove one per remaining guard charge, disappear at zero. Andromoss: subtle alien-spore loops near the affected enemy board’s edges while its8 s pressure is active. Duskmantle: violet markers attached above affected live1★ moles; pending quota alone does not draw fake marked targets. Existing+8 marks remain identifiable after4★ casts;+6 marks retain the higher-tier placeholder. Sprig: gentle green leaf loops at own board edges during its6 s aura, independent of already earned target extensions. Higher-tier effects retain existing placeholders.

Only when the opponent board is hidden, reuse the very same loop beside the affected player’s portrait/name. Guard icons show remaining charges; the curse icon includes pending+live1★ mark count. These status indicators identify the affected board, not the caster. Hide during casting/outcomes like the board effects; freeze with simulation time on pause and use frame0 for reduced motion. Images scale uniformly, remain outside target silhouettes where possible, and never intercept input. One-star generic box/impact cues are replaced, without adding another gameplay animation. Rules, AI and balance remain unchanged.


Guard-loop retry (D144): revision2 removes the shared halo/ring entirely. Champignon uses a larger pink mushroom cap and pale stem with rising spores; Bramble uses a tall green thorned leaf shield with rim glints. Both remain8 frames at6 FPS on48px transparent canvases. The free PixelLab VFX renderer draws custom pixel motifs; no AI credits used, no model image review. Earlier recipes/export URLs are retained under previousVersions in provenance.json and physical assets in Gitbe5dd26. The other three loops and all gameplay remain unchanged. User visual approval pending.
