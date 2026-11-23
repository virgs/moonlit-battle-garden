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


### Casting backdrop and individual target statuses (D146)

A full-arena50% black overlay sits above boards, all HUD and existing effects, below the casting hero and star-cost display. Both caster and stars retain full opacity. It appears only during the existing1.5 s casting hold, requires no additional warning/freeze, and leaves pause/menu above it.

Individually affected targets carry compact pixel-style badges above their own hole/sprite, uniformly scaled with the board. Silver shield2/3 shows total hits remaining while armor exists, decrementing per strike and disappearing when armor is broken. Violet rune with−8/−6 shows extra miss penalty; reuse the existing single-loop curse art for both tiers. Gold+2 marks manual mole bonus points only during the actual7 s buff. Amber hourglass identifies targets with earned lifetime shortening; green leaf identifies targets with an earned lifetime extension, including stars/rabbits. Lifetime badges survive their originating aura while the target keeps the modification; cleansing removes shortening/curses/armor but keeps positive extension. No badges are inferred just from pending charges. Multiple actual modifiers can coexist, without altering hitboxes or rules.

Target status is a read-only presentation helper using the real snapshot, with accessible descriptions on the hole controls. Badges never capture input, clear with their target/effect, freeze on pause and remain part of a frozen outcome scene. Replace the old canvas-only armor/curse arcs and the separate1★ per-mole placement with the shared badge layer; retain board-wide higher-tier placeholders. No new assets, AI, simulation or balance changes.


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

### Higher-tier spell identities (D152 / I40)

Use15 code-drawn pixel motifs, without generating new sprites or additional hero clips. All have8 discrete poses at8fps, driven by simulation time; pause/casting freezes poses and reduced motion selects pose0. The existing50% casting blackout/shared hero animation comes first; gameplay effects are revealed after casting. No activation/ending cut-scenes or mechanical changes.

| Hero |2★|3★|4★|
|---|---|---|---|
|Sir Champignon|Rocking broom on the actual column|Mushroom fortress with remaining guard pips|Crowned spore cyclone on the actual column|
|Andromoss|Turning alien hourglass; actual shortened moles carry hourglass badges|Magnet drawing stars, brief1s successful-transfer cue|Rabbit-dispatching UFOs; shortened moles also carry hourglasses|
|Captain Bramble|Tin helmet quota and assigned-mole badges|Red-eyed helmet sentinel with remaining guard pips|Thorned iron cage quota and assigned-mole badges; damaged armor steps down to the remaining helmet layer|
|Duskmantle|Flowing side ribbons of ink|Swaying soul lantern; actual bonus moles carry lantern/+2 badges|Blinking thorn eye, pending quota and assigned-mole/−6 badges|
|Sprig|Working rake on the actual column|Opening garden shears for the active cleanse ward|Two geared cultivators on the actual columns|

Pending armor/curse quota appears on the board rim until allocated; assigned badges remain on live affected moles. Hidden opponent gardens retain compact effect/count indicators, including already assigned targets. Uniformly scale motifs with board geometry, keep them transparent to input, and retain existing readable target numbers. The manifest marks2–4 effects as procedural; their optional future PNG paths are no longer reported as missing assets.

`pnpm exec vite-node scripts/capture-higher-spells.ts` records the15-effect animated comparison and real Game cast/pause examples at desktop, phone portrait and landscape sizes. Captures stay in ignored output/guard-flows/higher-spells; the user reviews the images.

### Unified raster spell artwork (D153 / I41, supersedes D152 visuals)

All20 spells, including1★, now use transparent48×48 source frames in eight-frame horizontal PNG sheets at8fps. The previous vector paths are removed; SVG remains only as the clipped raster-sheet viewport. Integer source pixels, hard0/255 alpha, palette bands, bevels and upper-left highlights establish stepped edges and volume. Use nearest-neighbor/pixelated sampling at every board, marker, hidden-HUD and gallery size, with sharp offset shadows. Game time still owns frames; pause/casting freeze, and reduced motion selects frame0. No gameplay changes.

| Hero | Signature colour |1★ |2★ |3★ |4★ |
|---|---|---|---|---|---|
|Sir Champignon|Rose pink `#ed83ac`|Mushroom buckler|Banded broom|Mushroom fortress|Crowned spore cyclone|
|Andromoss|Moon cyan `#65d9ea`|Rabbit portal|Alien hourglass|Star magnet|Rabbit UFO|
|Captain Bramble|Ember red `#ed715c`|Metal-rimmed ember buckler|Tin helmet with ember visor|Red-eyed helmet sentinel|Iron cage with ember briars|
|Duskmantle|Twilight violet `#b292ef`|Amethyst rune|Ink veil with gold clasp|Violet soul lantern|Thorn eye with gold bezel|
|Sprig|Seedling green `#a7d76b`|Dewdrop leaf|Green-banded rake|Garden shears|Twin geared cultivators|

Each spell has a visible hero-colour element in every frame, while steel, wood, brass, cream and water ramps provide secondary material colours. Signature colours belong to heroes; the red/blue score bar and player-side board colours keep their separate meaning.

Source artwork lives in scripts/art/spell-pixels.ts. `pnpm assets:spells` deterministically writes20 PNG sheets and their provenance/palette manifest in public/assets/effects/pixel-spells. This pass uses no PixelLab/AI generation or image inspection. Original one-star exports remain archived; the configured active sheets now all use the new raster directory. The asset audit reports56 ready files and5 optional portraits missing,0 invalid.

The capture script now produces a five-hero × four-tier animated matrix with colour swatches, plus real desktop and single-board phone cast/pause examples in ignored output/guard-flows/pixel-spells. The user decides whether the visual result is approved; technical checks do not claim aesthetic approval.

### Separate bolder review candidate (D154 / I42)

The user likes I41 and requests another visual iteration before choosing. Preserve all baseline files in pixel-spells and keep them configured in the actual game. The20 new sheets in pixel-spells-bold are review candidates only; their manifest explicitly identifies the baseline and pending selection. Both sets retain the same hero accents, motifs,48px frame size and8fps/eight-frame contract.

Candidate changes: two-pixel contours on large shapes; additional material half-tones; cap squash and spring, wider tool sweeps, moving fortress caps/gate, expanding spore rings, rabbit ear/pop poses, quarter-turn hourglass flips, converging stolen stars, UFO/bunny movement, bracing shields, flaring helmet plates, moving cage bars/briars, orbiting runes, billowing cloth, flaring lantern flames, scanning/blinking eyes, falling dew, wider shears and sprung cultivators. These are artwork poses only; no effect timing or game rules change.

`pnpm assets:spells --bold` builds only the candidate. `pnpm exec vite-node scripts/capture-higher-spells.ts --bold` creates the same20-cell animated matrix and real desktop/phone cast/pause checks in ignored output/guard-flows/pixel-spells-bold. Its temporary fixtures change effect paths in memory; production presentation.yaml and baseline sheets remain untouched. Running either command without --bold retains baseline behavior. No image inspection or PixelLab service use; user review selects the version.

### Adopted bolder spell loops and placement (D155 / I43)

The user approved all20 bolder loops. presentation.yaml now points to pixel-spells-bold. The older pixel-spells directory remains archived and unchanged. Default `pnpm assets:spells` and `pnpm exec vite-node scripts/capture-higher-spells.ts` now use the adopted set; --bold remains accepted, while --baseline explicitly rebuilds/previews the archived version. Provenance is marked approved. This supersedes I42's pending-selection status, without changing spell powers, timing or placement.

Own/enemy is relative to the caster. “Foot” means the lower board margin beneath the holes, inside the uniformly scaled board. Target badges sit immediately above the corresponding hole, not over the clickable target artwork. Timed icons loop for their actual active duration; none is a countdown clock or draining time ring. Hourglass means shortened mole lifetime. Charges/quota have no expiry timer. Per-target modifications stay marked until that target resolves, including after their application window closes.

|Hero|1★|2★|3★|4★|
|---|---|---|---|---|
|Champignon|Two mushroom bucklers at own foot, one per remaining mistake block; no expiry|Broom at foot of the actual selected own column,3s|Fortress at own foot, remaining guard dots;5 blocks/no expiry|Cyclone at foot of the actual selected own column,6s|
|Andromoss|Portals at four enemy-board side points,8s|Hourglasses at two upper enemy-board corners for8s; badges on actually shortened moles|Magnet at own foot for1 gameplay second after successful theft; star meter updates; no successful-transfer cue for an empty steal|UFOs at upper enemy-board corners,8s; hourglass badges on shortened moles|
|Bramble|Two ember bucklers at own foot, one per remaining mistake block; no expiry|Helmet at enemy foot while3 future assignments remain, quota dots; assigned moles get helmet/hits-left badge; no expiry|Sentinel at own foot, remaining guard dots;5 blocks/no expiry|Cage at enemy foot while3 future assignments remain, quota dots; assigned moles get cage/3-hit badge, stepping down to helmet/2-hit badge after damage; no expiry|
|Duskmantle|Rune/−8 badge above each of next3 enemy moles, until hit/miss; no expiry on waiting assignments|Veil at two enemy-board side points,6s, alongside actual target dimming|Lantern at own foot,7s; lantern/+2 badges on own moles while manual-kill bonus is active|Eye at enemy foot with pending quota dots for next6 moles; eye/−6 badges on assigned moles until hit/miss; no expiry|
|Sprig|Dew leaves at four own-board side points,6s; existing leaf badges on individually extended targets persist for that target|Rake at foot of the actual selected own column,4s|Shears at own foot while the ward remains, up to6s or until it blocks one hostile spell; cleanse itself is immediate|One cultivator at foot of each of the two actual selected own columns,4s|

Existing column outlines continue to show the automated lanes. On single-board phone/online views, compact effect icons and relevant remaining counts beside the hidden opponent's portrait communicate offscreen effects. No extra spell-name panel or numeric-score HUD is introduced. Standard shared hero casting/50% dimming still reveals these gameplay loops after the freeze; paused/casting time does not consume effect duration.

### Duration inside timed icons (D156 / I44)

Supersedes D155's active/inactive-only indication. Apply top-to-bottom elapsed shading to all11 timed effects: Champignon2/4, Andromoss1/2/4, Duskmantle2/3 and Sprig1/2/3/4. Remaining bright area shrinks toward the bottom. The dark area retains a dark hero-colour tint, raster material variation, original animation frame and full alpha silhouette. The raster sheet itself is unchanged. Both cultivators and any repeated edge icons show the same fraction; compact hidden-opponent timed icons use it too.

Compute remaining fraction as clamp((deadline − simulation time)/configured duration,0,1), then darken round(frameHeight × elapsedFraction) whole source-pixel rows. Shared SVG viewport draws the regular raster and a clipped dark copy; colour matrix preserves alpha. No CSS transition, browser timer, number label or additional progress panel. At100% remaining the image is unchanged; at0% it is fully darkened, then the actual expired effect is removed. Pause/casting freezes the simulation time and therefore the shading. Refreshing a spell's deadline resets its visual fraction. Reduced motion freezes the sprite pose while keeping the duration indication functional.

Target badges remain full-colour because already granted lifetime changes can outlive the application window. Pending armor/curse assignments, mistake protection and instantaneous theft have no time-fill. The hourglass above a target still means shortened lifetime; only its board/HUD aura icon carries the spell duration. No target-life gauges or countdowns are introduced.

`pnpm exec vite-node scripts/capture-spell-duration.ts` records a100/75/50/10/0% comparison for broom, UFO, lantern and dew leaf, plus actual half-duration desktop broom, quarter-duration portrait UFO and matching quarter-duration landscape cultivators. The ignored output/guard-flows/spell-duration files are for user visual review. No image inspection or generation service is used.

### Contrast backings for spell icons (D157 / I45)

Board spell icons and compact hidden-opponent icons now have a fixed dark circular backing with a stepped pixel edge and a thin owning-hero-colour rim. Draw three integer-scanline paths (outer dark edge, hero rim, dark face) before the raster image and its elapsed-time copy. The backing is not filtered or duration-clipped, so it remains steady even when the sprite is almost fully darkened. It stays inside the existing48px viewport: no sprite shrink, added layout footprint, hitbox changes or new asset files.

The shared viewport's backing is opt-in. Board and hidden-opponent calls enable it; per-target badges leave it off and retain their current dark rectangular badge surfaces. Pause/cast/reduced-motion and all duration/charge semantics remain unchanged. The existing capture-spell-duration script now includes backing in the stage matrix; real Game screenshots show it automatically. User retains visual review.

### Target effect review captures

`pnpm exec vite-node scripts/capture-target-effects.ts` records12 close-ups from the normal Game/Phaser/TargetMarkers renderer: unmodified mole, Bramble2★/4★ armor, Duskmantle1★/4★ curse marks, Duskmantle3★ bonus, Andromoss2★ shortened lifetime, Sprig1★ extended mole/rabbit/star, Duskmantle2★ dimming, and the playable two-hero combination of Bramble4★ armor plus Duskmantle3★ bonus. It also records a single-board phone example with that combination, three armored moles and unaffected rabbit/star targets.

Fixtures use actual Match casts and modifyTarget for controlled arrivals, then advance into the dancing phase. No target appearance or gameplay changes; snapshots show the current implementation. Assertions cover expected marks/counts, unmodified controls and absence of duration shading/circular backings on target badges. Matrix/crops/full screenshots stay in ignored output/guard-flows/target-effects; visual review belongs to the user.

### Organic target markers, without point labels (D158 / I46)

Target markers now have transparent wrappers and a dark background/outline following each animated raster silhouette, replacing the rectangular badge plates. Clip the image sheet to its current48px frame first; an outer filter dilates that alpha by5 source pixels for a dark contour and2 for a subtle owning-hero-colour edge, then paints the unchanged source above both. This prevents adjacent atlas frames from leaking into the outline. Halo overflow is visible; the centered row reserves22 logical pixels of height for18px icons and contours. Click-through and hole anchoring remain unchanged.

Curse/bonus markers display only their icons, without −8/−6/+2 text. Armor alone retains its total hits-remaining number with a dark text outline. Exact point values remain in the simulation and accessibility descriptions; ordinary targets do not acquire score labels. Lifetime markers remain a cyan hourglass and the approved green leaf/dew raster. No new sprite generation or reward/penalty changes.

D157's fixed circular backings still apply to board/HUD spell icons; D156's time shading still applies only there. Target markers use neither circles nor duration shading. The refreshed capture-target-effects script writes target-outlines-matrix.png and phone-outlined-markers.png in ignored output/guard-flows/target-effects, with icon-only curse/reward labels and armor counts visible. User retains visual review.

### Doubled target markers and first-screen review (D159 / I47)

Double target spell raster viewports18→36 logical pixels (uniformly scaled by garden scale), with silhouette outlines scaling along with them. Double actionable armor text12→24 logical pixels and anchor it at the icon's lower corner. A44px row with4px gaps fits two36px icons into the78px target lane without pushing armor counts into a separate line. Keep transparent containers, above-hole anchors and icon-only curse/reward/lifetime markers. Board/HUD effect sizing is unchanged.

The target capture script verifies36×36 logical image dimensions and now writes a larger target-markers-double-matrix.png plus phone-double-markers.png. `pnpm exec vite-node scripts/capture-front-flow.ts` captures the unchanged title at1280×800,390×844 and844×390, plus actual desktop menu→two-character-selection navigation. Outputs are ignored under output/guard-flows/front-flow.

### First-screen scene direction — discussion pending (D160)

Current implementation: a single static castle backdrop, title text and key/tap prompt; title→mode menu→character selection→match, with online rooms/invites following their existing path. No title camera/parallax/ambient actor changes in this pass.

User-requested direction: living moonlit garden with tunneling moles, bats, shooting stars, owl head turns and blinking pumpkin faces, plus camera movement/parallax. Proposed composition, not yet adopted: keep one scene behind title/menu/selection; use a slow sky/distant-woods layer, middle garden layer and closer soil/foliage; short camera glides between screens while UI remains steady. Stagger ambient events and preserve reduced-motion behavior. Reuse approved mole/dust/star assets and defer missing actor assets, using placeholders if needed; no new art generation in this pass.

### Title tagline cleanup and garden/graveyard shortlist (D161 / I48)

Remove “A garden rivalry” from TitleScreen. Keep Moonlit / Battle Garden and the enter prompt. The live castle backdrop remains selected until the user reviews replacements.

Existing candidate: Violet Veil's CC0 source, GothicVania Cemetery by ansimuz (https://opengameart.org/content/gothicvania-cemetery-pack). The cached original archive contains background.png384×224, mountains.png192×179, graveyard.png384×123 and separate tree/gravestone props. The already-installed Violet Veil image uses only background.png. A review-only composition can layer the original PNGs and position props at the edges without editing their pixels or generating art. Lanternbloom Garden and Moonlit Hideout are also captured as existing-art alternatives.

CraftPix shortlist researched2026-11-21 from publisher descriptions:
- https://craftpix.net/freebies/free-1-bit-graveyard-pixel-art-backgrounds/ — four1-bit576×324 scenes, graves/dead trees, explicitly multilayered/seamless/parallax-ready. Monochrome style needs user review against the current palette.
- https://craftpix.net/freebies/forest-and-trees-free-pixel-backgrounds/ — eight576×324 seamless, layered forest scenes, explicitly parallax-ready.
- https://craftpix.net/freebies/free-vampires-locations-battle-background-pack/ — four3840×2160 PNG/PSD scenes; Dead Forest description explicitly includes tombstones, thorny plants and withered trees. Do not claim verified parallax layers; page does not specify them.

No CraftPix art is downloaded or installed. Forest download redirects to a sign-in page; graveyard download fetch failed. Actual license terms are at https://craftpix.net/file-licenses/. Revisit download/account access only if selecting a CraftPix option.

`pnpm exec vite-node scripts/capture-title-backgrounds.ts` takes an optional --archive=/path/to/cemetery.zip (default is the existing temporary home-art cache). It extracts only required CC0 PNGs into ignored output/guard-flows/title-backgrounds/assets, renders existing layers through an isolated TitleScreen fixture, verifies3 background layers/4 props load and the removed text stays absent, and records three option previews plus the actual live title. React effect mounting ensures layers attach after title creation. User reviews all images; model does not inspect them. No active background or home assignment changes.

### Animated homescreen with ping-pong camera (D162 / I49)

TitleScreen now uses TitleGarden, a decorative low-resolution canvas behind fixed title/entry UI. Original CC0 cemetery PNG layers/props are installed unchanged under public/assets/title-garden with creator/source/license and per-file hashes. Original mole/earth/star atlas frames are reused. Main-menu/selection backgrounds and match rules are unchanged.

The camera uses a20-second cosine cycle,0→140→0 source pixels (smaller distance on narrow phones). Sky/mountains/graveyard/trees/foreground use0.06/0.22/0.5/0.85/1 depth factors. No hard camera loop reset; both turnarounds ease to zero speed. The canvas maintains224 source pixels in height and adapts width to viewport aspect, preserving uniform artwork scaling and pixel sampling. Limit painting to30fps, discard hidden-tab time, cancel work/listeners when leaving and obey reduced-motion changes with a still camera/actors.

Ambient activity: staggered temporary pixel bats cross the sky; occasional original-star sprites trail shooting stars; a temporary owl turns front/side/back and blinks; temporary jack-o'-lantern eyes/grin pulse; original dust and moving soil disturbances lead into original mole raise/alive/hide poses. These bat/owl/pumpkin drawings are implementation placeholders, not newly generated/approved sprite assets. They can be replaced in the later art pass. Motion runs only on the homescreen and carries no input/gameplay effects or automatic sound.

`pnpm exec vite-node scripts/capture-title-garden.ts` records a full20s camera loop at8fps (720px-wide GIF), turnaround stills and portrait/landscape examples. Assertions verify camera reversal/return, stationary heading, menu exit, responsive overflow and reduced-motion freeze. Outputs remain ignored in output/guard-flows/title-garden. Model does not inspect screenshots; visual review belongs to the user.

### Current column spell presentation review

`pnpm exec vite-node scripts/capture-column-spells.ts` records real casts for Champignon2★/4★ and Sprig2★/4★, including hero freeze, immediate initial hits, controlled new mole/star/rabbit arrivals, active icon depletion and actual expiry. The four GIFs and active stills live in ignored output/guard-flows/column-spells. Tests assert fixed column count, empty intercepted holes, actual normal reward/rabbit-penalty totals and star collection; the fixture alone seeds targets and exposes inspection helpers.

Current visuals remain the previously approved footer broom/cyclone/rake/cultivator icons plus a faint green full-column fill/outline. No drone, hanging rope or animated full-height contact effect is implemented. Busiest column selection is fixed at cast time. Simulation hits the entire selected column(s) immediately and on each50ms tick, including newly spawned targets; armor consumes repeated strikes. User recalls the old drone/rope depiction and is reviewing how that compares. Reintroducing full-height action/ropes is a possible next presentation pass, not an adopted change here. No game code or art changes in this capture-only task.

### Full spell choreography (D163 / I50)

The earlier footer-only column review is superseded. A transparent pixel canvas now composes full-board action beneath the approved status/target icons, at the board's301×383 source resolution and uniform garden scale. Read-only spellSceneModel derives active effects, real column geometry, target modifiers and recent real hit/block events. paintSpellScene uses integer pixels; it owns no timers, randomness, input or rules. Pause/casting freezes through the existing simulation clock, and reduced motion uses still poses instead of decorative movement. Canvas is pointer-transparent.

| Hero | Added gameplay motion |
|---|---|
|Champignon|Full-height rising spore streams on2★ and a denser crowned four-strand storm on4★; mushroom barrier growth and edge glints for guards.|
|Andromoss|Portal/rush pressure pulses, speed lines on actual shortened moles, traces to actual newly spawned magical rabbits, and brief successful-theft resource motes. No fake targets.|
|Bramble|Thorn barrier growth, real blocked-mistake flashes (including the last charge), quota forge glints and sparks around actual armored moles. Armor strikes are not mistaken for blocked mistakes.|
|Duskmantle|Orbiting curse motes on actual marked moles, moving edge veils, lantern activity and soul trails from real mole-kill events during the bonus window.|
|Sprig|Two code-drawn rotor drones per selected column, swinging a full-height rope;4★ uses two columns and braided strands. Dew around extended targets, edge leaves, an initial cleanse leaf wave and an active ward border.|

Sprig ropes and Champignon streams follow each selected column's three actual hole centers, allowing the source art's varying x positions. Drones stay above the footer duration icons. Discrete impact bursts use actual events/hole coordinates. Original hero casts, duration icons,2× silhouette target markers and exact3/6/4/4-second column windows remain. Rope movement is illustrative: do not wait for physical rope contact or alter continuously active50ms auto-hits/rewards/rabbit penalties.

All new action is code-drawn placeholder VFX in the approved hero palette; approved raster sheets are reused unchanged and no assets are generated. Existing column highlights are lightly tinted to the owning hero. Main simulation, AI, networking and gameplay are untouched.

`pnpm exec vite-node scripts/capture-column-spells.ts` now records all four elaborate column flows in output/guard-flows/column-spells-elaborate (optional --only=champignon-4 etc). It verifies full-height spans, column count, actual arrival interception, rewards/star collection and expiry. `pnpm exec vite-node scripts/capture-spell-choreography.ts` records soul-reward hits, barrier blocks, real rabbit pressure and cleanse/ward effects (optional --only=ward etc), under output/guard-flows/spell-choreography. Outputs are ignored and visual review belongs to the user; no model image inspection.

### Smoother board-perspective column action (D164 / I51)

Remove the previous Phaser column rectangles entirely, including their fill. Full-height action and existing footer duration icons now communicate coverage.

Sprig drones show a shaded top face and front lip, with rotor planes foreshortened to0.42 vertical scale to follow the board's top-down perspective. Propellers rotate continuously; top/bottom drones hover and bank with their horizontal movement. Each rope is attached to the drones' exact projected attachment points. A continuous belly/wave supplies slack,4★ braids remain connected at the ends, and real hit events introduce a small decaying rope vibration. Drawing dark rope passes before bright strands avoids broken-looking joins. Champignon streams breathe in width, flow more gradually and fade spores at entry/exit instead of teleporting particles.

The scene draws into602×766 pixels while keeping301×383 logical board coordinates. Half-source-pixel placement and rasterized hulls preserve stepped pixel style while allowing finer motion. A bounded decorative clock paints between confirmed snapshots at display rate, at most49ms beyond the latest50ms simulation tick. It cannot change effects, targets, collisions, rewards, durations or expiry. Stale snapshots stop advancing beyond that small window; pause/casting stop animation, resume preserves cosmetic phase, and reduced motion stays still. Approved footer sheets/time fills and silhouette target badges are unchanged.

Updated capture-column-spells writes20fps full flows and board-focused detail GIFs to ignored output/guard-flows/column-spells-smooth. Full-cycle captures verify all four spells' real rewards/arrival interception/expiry, independent of rope position. Browser clock checks explicitly cover between-tick motion, bounded lookahead and pause/resume continuity. Model does not inspect images; visual review stays with the user.

### Original drone art and bold spore motion (D165 / I52)

Sprig2★/4★ now draw the original molecideGaiden helicopter-killer.png: two85×361 frames at12fps, scaled uniformly to column height. A small whole-rig sway/tilt supplements the authored rope/rotor poses; two-column4★ uses opposite frame phases and different sway phases. The previous procedural rig remains a loading/error fallback. Small green glints preserve Sprig identity. Source and existing license are recorded under public/assets/legacy/CREDITS.md. No asset generation.

Champignon2★ uses one shaded, dark-outlined4px spore ribbon;4★ uses three5px ribbons over a broader radius. Cream highlights, chunky rising mushroom caps, front/rear shading and real-hit radial glints add volume. Cycles are approximately0.48s/0.38s. The same snapshot-bound cosmetic clock, pause/cast/reduced-motion behavior, fixed columns, duration icons and all gameplay rules remain. Captures are now in output/guard-flows/column-spells-bold. User performs visual review; assistant does not inspect images.

### Champignon readability correction (D166)

Supersedes I52’s Champignon intensity:2★ uses one1.5px core,4★ two2px cores; soft dark edges are2px wider. Front/rear core alpha is0.65/0.3, outline0.4/0.18. Cycles slow to about1.13s/0.94s. Only3/5 small spores rise at a slower rate, with no travelling mushroom caps. Top mushroom/crown, real-hit glints and all spell rules remain. Sprig is unchanged. Captures: output/guard-flows/column-spells-readable.

### Per-target force fields (D167)

Bramble2★/4★ use one/two stepped red shield layers around the actual mole hit area instead of above-target armor badges/numbers. The center has only6% tint, with red edges and cream highlights. The visual reveal follows the mole's existing rise/retreat phase; reduced motion uses a full still shell. Actual armor-hit events carry their hole coordinate, driving280ms shield flashes/fragments even when the final layer disappears. Each removed layer plays one of the existing impact2/4 sounds at1.5× playback rate, without the death cue. Mute/disposal and event deduplication apply normally. Remaining hits stay in accessible labels. Other target cues remain unchanged.

Only Bramble currently has target armor; stone/brick treatment and matching sounds are a future identity option for another hero, not a new spell or roster change. Rules/rewards/durations/AI are unchanged; the simulation event gains existing optional hole metadata only.

Small-screen hole touch areas have a44×44px minimum centered on the original hit rectangle. Sprite/target-effect positions still use the source garden geometry.

### PixelLab shield art and clearer front flow (D168 / I53)

The procedural shield paths are replaced by native64×80 PixelLab raster sprites, packed unchanged into320×80 sheets with5 frames. Idle shimmer uses8fps; real-hit breaks use the same280ms window. Two extra hits draw a second78%-scale hollow layer; one extra hit draws one. Actual layer hit detection, existing impact SFX, accessible remaining-hit labels, phase reveal and reduced motion remain. Geometry no longer draws the force-field artwork. Generation IDs and dimensions are recorded beside the assets. Draft visual review belongs to the user, without model image inspection.

Only Night Watch, Garden Grudge and Beyond the Hedge remain in the main navigation. Their new64×64 PixelLab lantern/trowels/gateway icons replace the SVG mode pictograms across menus, selection, HUD and pause. Mute and controls remain in pause. Selected hero art is dimmed to48% brightness under a cream Selected stamp; victory animation still plays. The top-right Ready label is removed for all modes.

After both AI slots are confirmed, Next opens a separate difficulty carousel (Easy/Medium/Hard, medium initially). Left/right keys, arrows, swipe and direct dot buttons select a level; Enter/Battle starts the actual chosen difficulty. Back/Escape restores the confirmed character screen, preserving level and locks. Local and online do not gain this step. All gameplay values remain unchanged.

### Stable selection cards and inline AI difficulty (D169 / I54)

The right-side mode illustration rectangle was an unused placeholder and is removed. Confirmed hero stamps are retained. Superseding I53's separate difficulty screen, Easy/Medium/Hard now lives directly beneath the selected computer hero's card; unlocking hides the controls, reconfirming restores the previous level. Both AI-mode columns reserve equal difficulty space, and Battle starts directly. Keyboard arrows operate only the focused difficulty carousel, without changing the selected hero.

Hero preview boxes have fixed layout sizes, size/layout containment and absolutely fitted image/SVG children; intrinsic frame dimensions cannot resize the grid. Names have a fixed single-line row, spell rows reserve two lines, and controls do not shrink. Original sprite aspect ratios are preserved. Phone/short landscape sizes use fixed responsive dimensions. Browser geometry checks traverse all five heroes and compare card placement, art boxes, names, spells and controls across desktop, portrait,320px portrait and landscape.

A separate round hollow bubble overlay is preferred to regenerating all mole rise/idle/hit/retreat sprites. New PixelLab bubble drafts use64×64 native frames; existing1/2 armor layers and hit-event/SFX behavior remain. The user judges appearance; model does not inspect images.

### Rear energy barrier, no mole occlusion (D170 / I55)

Supersedes the foreground bubble overlay: board images are depth0, shields/pop sprites0.5, ordinary target sprites1 and outgoing hit sprites2. Shield art cannot paint over the mole's face/body. Targets retain their normal opacity (existing camouflage alone can lower it). Foreground armor DOM elements now carry accessible remaining-hit labels and metadata only, with no image/SVG artwork.

The new PixelLab energy draft uses lineless coral/peach/white plasma crescents,9 native64×64 frames at12fps, a2.5% breathing pulse and a5-frame280ms energy pop. Previous rejected drafts remain as files; new source IDs live in energy-generation.json. No image inspection by the model; user judges appearance. Frames are only packed horizontally, unchanged. One layer is84 logical pixels wide, two use94px outer/80px inner with a4-frame offset. Rise/retreat scale and position follow the existing target transition. Real armor hits trigger pops without mole death feedback. Pause/casting freeze all poses; reduced motion holds the barrier still. Clear impact memory at new rounds. Rules, hit counts and SFX remain unchanged.

Browser checks inspect actual sprite depth/alpha/frame/layer diagnostics on the arena canvas, rather than treating an empty foreground marker as evidence of rendered art. They verify animation, pause, reduced motion and two→one→zero layers on desktop and phone.

### Approved energy art as separated upper arches (D171 / I56)

Approved energy source PNGs and9-frame12fps animation remain unchanged. At scene creation, derive clipped canvas textures for the upper curved band (native64px frame, source y<24, radius22–31.5); popping uses the same upper area with radius18–31.5. No replacement vector stroke or new PixelLab generation. All remaining source colours/alpha are unchanged.

One extra hit shows the84px primary arch. Two add a144px secondary arch,4 frames out of phase, with a guaranteed8.15625 logical-pixel minimum radial gap before uniform responsive scale/pulse/reveal. Both share a center52 logical pixels above the mole feet, lifting the curved bands above its head. Removing the outer arch leaves the primary at its original size/position; pop size follows the consumed layer. The lower circle and interior are absent. All graphics remain behind the mole, preserving normal alpha and existing SFX, timings, freeze and reduced-motion behavior. Browser native diagnostics include upper-arc shape and the current gap.

### 300° arcs with a centered bottom opening (D172 / I57)

Supersedes the upper-only angular mask from I56. Approved source art now shows300° of its radial energy band, with a symmetric60° opening centered downwards (±30° from the downward axis). The same angle applies to pops. `shieldArcs.degrees` is the single presentation setting for changing coverage. Existing rear depth,84/144px sizes,8.15625px logical gap, center, animation and hit behavior remain. No new art or generation.

The visible arcs count extra hits, not total hits:2 arcs =3 total hits remaining;1 arc =2;0 arcs = the final normal hit. Every armor strike removes one arc. Browser checks explicitly confirm that the mole is still alive and unarmored after the last arc disappears.

### Full reactive spell presentation (D173 / I58)

Fourteen remaining spell tiers now have native gameplay actors using nine generated PixelLab families, each9 frames at12fps. Guardians/portal/rush/curse/mist/soul/dew frames are48×48; ward frames64×64. Frames are packed unchanged; provider jobs, prompts, dimensions and motion instructions are in public/assets/effects/reactive/generation.json. Eighteen successful generations (nine bases/nine loops); the user reviews all images, with no model visual inspection.

| Hero / stars | Unchanged rule | Reactive depiction |
|---|---|---|
| Champignon1★ /3★ | Block2/5 mistakes; no expiry | Rose mushroom guardians idle along the lower garden; the consumed guardian leaps to the actual mistake hole and bursts into spores. |
| Bramble1★ /3★ | Block2/5 mistakes; no expiry | Red living thorn buds use the same actual-charge logic, with their own expressive looping art and intercept reaction. |
| Andromoss1★ /4★ | Rabbit every1s /0.75s for8s | Cyan ground portals open only beneath real magic-origin rabbit arrivals and close as they emerge. |
| Andromoss2★ /4★ | New moles85% lifetime for8s | Cyan ribbons orbit only shortened moles, accelerating with the target's actual lifetime progress. |
| Andromoss3★ | Instant all-star theft, capacity capped | Original star sprites travel between the real HUD meters in either direction; only actual received stars arrive, excess fades, and an empty theft fizzles. Hidden caster feedback uses the compact meter. |
| Duskmantle1★ /4★ | Next3/6 moles marked; missed mark+8/+6; no expiry | Violet living shadows cling beneath actual marked moles, dissolve on a real kill, or snap on a real extra miss penalty. A guard-absorbed miss does not invent lost points. |
| Duskmantle2★ | Target dimming6s; AI+200ms | Airy violet edge/target wisps; existing72% target opacity remains. Hit wisps part and dissipate without hiding faces. |
| Duskmantle3★ | Manual mole kills+2 for7s | Small souls circle eligible moles; only genuinely rewarded manual kills release a soul toward the score bar, including a reward just before aura expiry. Automated kills emit none. |
| Sprig1★ | Current/new targets+750ms once;6s aura | Leaves unfurl under each actually extended mole/rabbit/star and a dew sparkle marks the exact initial grant. Recasts do not replay grants for already extended targets. |
| Sprig3★ | Instant cleanse; one-spell ward6s | A leaf wave accompanies cleansing, followed by an airy living wreath. A real blocked hostile cast disperses it; hidden opponent wards burst around their HUD portrait. |

Approved drone/rope and spore column action,300° armor arcs, hero casts, star-cost displays, original sound/music and all mechanics remain. All visible target badges are removed, while hit-button descriptions and accessible status metadata remain. Visible guard badge icons are replaced by the guardians themselves; hidden-board compact charge/effect indicators remain, as do timed spell duration icons.

The native ReactiveSpells renderer uses a pure reactiveSpellActors model, pooled sprites and a bounded49ms cosmetic interpolation over confirmed simulation time. Target effects and guardian intercepts stay below target bodies; earned soul/star transfers can travel in front as short feedback. Original target rise/hit/hide frames are unchanged. Existing actors hold during hero casting; new effects appear after the freeze. Pause/end states hold poses; reduced motion removes spatial movement and uses still frames while retaining functional feedback/fades. Readability does not rely on lowering normal mole opacity.

Exact presentation metadata is optional GameEvent.visual: actual theftTaken/theftReceived (including0), bonusPoints only on rewarded manual kills, marked kills, extra markPenalty, guardRemaining/guardTier, veiled hits, cleanse casts and wardBlocked casts. Targets record extendedAt only on their first real extension. These fields change no rewards, timing, RNG, stars or AI decisions. Empty/miss events carry actual hole coordinates; they do not play target death animations or false column impact bursts. Ruleset18 synchronizes the event schema; metadata has no extra player IDs to remap.

Controlled fixtures under tests/fixtures use real Session/Match casts/hits/spawn modifiers; they are not production entry points. scripts/capture-reactive-spells.ts records fifteen states (the fourteen upgraded tiers plus empty theft); --only=<case> / --only=guards supports focused recaptures. scripts/compose-reactive-review.ts creates the animated review matrix from those recorded GIFs. Artifacts live under ignored output/guard-flows/reactive-spells.
