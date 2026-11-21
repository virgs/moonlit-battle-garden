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
