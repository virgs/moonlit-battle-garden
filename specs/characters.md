# Characters and magic

Status: all eight concepts were adopted on 2026-11-16. The playable roster is now Sir Champignon, Andromoss, Captain Bramble, Duskmantle and Sprig; the other three remain deferred. Spell names, numbers, durations, and interactions remain provisional; see prototype.md for actual behavior.

These spell assignments are new remake designs. The original repository has named artwork but only generic test loadouts, so do not describe these as recovered historical kits.

Artwork source: https://github.com/virgs/digHoleBattleGarden/tree/master/Personagens

## Approved identities and homes

Approved on 2026-11-17. These are eccentric caretakers of different corners of the same enchanted garden. The user approved all eight proposed identities, home/music assignments and minibios, initially choosing Nightshade, Duskmantle and Rootbeard as simplified names. On 2026-11-18 the user replaced Nightshade (legacy Andy) with **Andromoss**. Use those names consistently, including on the HUD. Original names below remain artwork/implementation references, not alternate display names. D80 supersedes the earlier stable-ID direction: Andromoss uses `andromoss` throughout runtime IDs, asset folders and configuration. Original source names and historical reports remain historical records.

| Display name | Original identity | Home | Existing music |
| --- | --- | --- | --- |
| Sir Champignon | Sir Champignon | Sporelight Keep | Forest Whisper Theme |
| Andromoss | Andy (legacy source) | Moonlit Hideout | Magic Town |
| Captain Bramble | Capitão Katyroba | Mossroot Path | Glizzy Elf Forest — Forest Loop |
| Duskmantle | Dindo | Violet Veil | Void Estate |
| Sprig | E-Mailson | Lanternbloom Garden | Exploration Theme |
| Mallow | Ming-Ding-Go | Stillwater Grove | Whispers in the Fog |
| Miyaya | Ninja Miyaya | Bluebell Thicket | Cathedral in the forest (ambient loop) |
| Rootbeard | Urthgar | Whispering Wood | Iremos Forest Theme Loop |

### Minibios

**Sir Champignon — Keeper of the Little Things**

With a mushroom shield and a well-worn broom, Sir Champignon guards the garden’s smallest inhabitants. He takes every oath seriously—even the one about keeping rabbits out of the cabbages.

**Andromoss — Borrower of Stars**

A wanderer from Andromeda who discovered that the brightest stars grow in moonlit gardens.

**Captain Bramble — The Unmovable Gardener**

Captain Bramble has held the old woodland path through storms, stampedes, and particularly determined rabbits. Beneath his intimidating scowl lies a fierce affection for anything small enough to need protecting.

**Duskmantle — Tender of Troublesome Things**

Duskmantle tends the flowers that bloom without sunlight and the roots that whisper after midnight. His curses began as remedies for garden pests. Some have become rather difficult to distinguish.

**Sprig — A Helping Claw**

Built to maintain a forgotten garden, Sprig continued working long after its maker disappeared. It now considers every living thing its responsibility. Its definition of ‘helping’ occasionally requires supervision.

**Mallow — Keeper of the Quiet Hours**

Mallow spends whole evenings watching a single bud unfold. Around the stillwater stream, hurried footsteps soften and falling leaves linger in the air. Somehow, the work is always finished by morning.

**Miyaya — A Shadow Among Bluebells**

Miyaya patrols the thicket without disturbing a single petal. Every strike is measured, every landing silent. The rabbits remain unimpressed, which she considers a deeply personal insult.

**Rootbeard — Champion of Second Helpings**

Rootbeard followed the scent of mushroom stew into Whispering Wood and never found a reason to leave. He gardens with tremendous enthusiasm and cooks enough for an army. Everyone is invited.

## Roster identity

| Character | Original appearance | Remake role |
| --- | --- | --- |
| Andromoss (legacy Andy) | Alien with a normal-sized adult head, fixed skin-continuous crown points and visible neck gills, sunglasses, leather jacket, chain and hook | Trickster; stars and disruption |
| Capitão Katyroba | Adult muscular rat with folded arms and a long rat tail; cool helmet has rounded rat-ear-shaped shells and red eye lenses | Brawler; armor and endurance |
| Dindo | Long bangs, huge scarf, cloak; line-art portrait | Curse specialist; draining and marked targets |
| E-Mailson | Robot with an @ emblem and mechanical claws | Automation and assistance |
| Ming-Ding-Go | Straw hat and green cloak | Timing and slowing effects |
| Ninja Miyaya | Black-and-white ninja cat with sword | Precision and quick attacks |
| Sir Champignon | Armored knight with mushroom shield and broom | Guardian; protection and sweeping |
| Urthgar | Blond Viking with braided beard, horned helmet, food utensils | Endurance; feasts and sustained accuracy |

## Adopted spell concepts

| Character | 1 star | 2 stars | 3 stars | 4 stars |
| --- | --- | --- | --- | --- |
| Andromoss | Copy one enemy star | Rabbit invasion | Steal a limited number of stars | Burst of decoy-heavy target waves |
| Capitão Katyroba | Block the next mistake's damage | Give enemy moles helmets | Absorb several mistakes temporarily | Short wave of heavily armored enemy moles |
| Dindo | Mark the next enemy mole; missing it hurts more | Brief target camouflage | Successful hits gradually recover points | Curse several upcoming enemy moles with larger miss penalties |
| E-Mailson | Extend current targets' lifetimes | Safely automate one column | Cancel an incoming debuff | Brief automation of mole clearing across the board |
| Ming-Ding-Go | Slow own spawns | Extend a protective timing window | Give enemy moles timed shields | Greatly slow own garden for a short recovery period |
| Ninja Miyaya | Automatically strike one mole | Brief rabbit invasion | Short, fast enemy target wave | Clear own board and launch a counterattack wave |
| Sir Champignon | Block one mistake | Sweep own board | Protect against the next hostile spell | Clear own board and grant a temporary shield |
| Urthgar | Recover some points | Gain bonus points from the next few successful hits | Send armored enemy moles | Feast rewards sustained accurate play with bonus points |

## Original two-character proposal (historical)

**Sir Champignon and Andromoss** offer contrasting defense and disruption and are the current implementation defaults following authorization to start coding.

The prototype resolves the following with provisional rules in prototype.md; revisit through playtesting:

- Andromoss's one-star copying versus the proposed consume-all-stars rule: net charge, timing of cost/reward, and protection against repeated resource generation.
- Andromoss's three-star steal cap, transfer rules, and behavior when the opponent has no stars.
- How rabbit invasion differs from decoy-heavy waves; decoys must have a readable identification rule.
- Sir Champignon's mistake shield: charges, duration, and whether all mistake types qualify.
- Sweep targeting and rewards, including rabbits and collectible stars.
- What counts as a hostile spell for protection, when protection is consumed, and how resource theft interacts with shields.
- Fourth-tier shield duration/charges and its distinction from lower-tier defensive tools.

## Roster refinement backlog

- Differentiate Andromoss and Miyaya's decoy/rabbit effects.
- Differentiate Katyroba and Urthgar's armor effects.
- Define Ming-Ding-Go's protective timing window concretely.
- Give camouflage a visible outline rather than making targets entirely unreadable.
- Give timed shields an obvious opening animation.
- Consider direct damage cautiously; current adopted kits mostly apply pressure through playable board mechanics.
- Keyboard-mapping shuffle is excluded. No character kit should depend on it.

## Approved character art and animation direction

Sir Champignon’s `public/assets/characters/champignon/base-v3.png` is the approved design. It is the clean, taller adult revision using the finished mole/rabbit/star/board reference plate. His idle, victory and shared casting sheets now use this 192×192 design; v1 animation records are preserved separately, and v2 was a proportion draft. Preserve v3’s identity, clean flat shading and thick outlines in future work.

The user requests expressive victory and casting actions: unmistakable body/limb movements, strong poses and clear silhouette changes. A small number of distinct key poses is sufficient. D70 revises idle for the entire roster: calm, subtle breathing and small secondary movement, with no large gestures or weight shifts. Whole-image CSS wiggling remains excluded. Visual review belongs to the user; do not inspect generated frames with model vision. The user restored access and authorized this animation pass on 2026-11-18.

Animation briefs (generated clips await user visual review):

- Idle: gentle breathing and a tiny plume sway. Keep the head direction, stance, broom and shield steady; no broad weight shifts, head turns or arm gestures. Five frames at 3 fps.
- Victory: crouch in anticipation, an exuberant full-body hop or proud step, an unmistakable raised broom/shield salute, then a readable proud landing/settle.
- Shared casting: brace and wind up, twist the torso into a broad broom sweep, present the shield, then follow through and settle. Add a compact golden-green magical spore trail that follows the broom bristles, with a few sparkles/motes dispersing behind it. Fit the established 1.5-second cast freeze and retain the separate stars-spent overlay.

For casting and victory, favor clear anticipation, action, follow-through and a short held pose over numerous small in-between changes. Keep equipment attached, preserve colors and leave enough canvas margin for gestures without clipping.

The current sheets contain the starting pose plus four generated idle frames (five total, 3 fps) and eight generated victory/casting frames (nine total; victory 8 fps, cast 9 fps plus 500 ms final-pose hold). All four casting tiers reference the same sheet. No generated spell-effect overlays or additional character assets are part of this pass.

### Defaults for every future character

- Idle is subtle: restrained breathing and small character-specific secondary motion. Save large gestures and clear silhouette changes for victory and casting.
- Casting includes visible, character-appropriate magic: a trail, sparkles, motes, smoke or a similar effect tied to the gesture/weapon. Keep it within the sprite canvas, readable, and clear of the face and stars-spent overlay.
- Casting magic is part of the one shared character casting animation. It does not replace each spell’s separate active-effect visuals.
- The user reviews all generated images and animations; perform technical file/playback checks only.

Sir Champignon’s static character icon is installed at `public/assets/characters/champignon/icon.png` (transparent 192×192), based on approved base-v3, for HUD, pause and round results. Exact prompt/job record: `icon-provenance.json`. The larger portrait remains optional; the user reviews the icon. Andromoss is the next character art pass.

### Andromoss art pass

Authorized after the user approved Champignon’s final icon framing. The first 192×192 base design is staged at `public/assets/characters/andromoss/base.png`, with prompts/references in `base-provenance.json`. Preserve the corrected identity: alien with face/scalp-continuous spikes (not blond hair), visible neck gills, sunglasses, leather jacket, short chain and hook. Include the user-permitted slim tail and small ponytail-like rear head appendage as alien anatomy. Draw fresh clean adult proportions using approved Champignon and the final game artwork as style references. The user reviews the base before animation/icon generation; existing runtime sheets remain unchanged. Home/music remain Moonlit Hideout / Magic Town.

Andromoss v2 is staged in `public/assets/characters/andromoss/base-v2.png`, with the full correction prompt in `base-provenance-v2.json`. Skin continues across face and spike crown without a hairline; gills are visible on the neck. Tail and head tendril share the skin material. Avoid stray/dead pixels and noisy single-pixel shading. The initial human/hair interpretation is superseded by the user’s alien identity correction.

Andromoss v2’s head was rejected as too wide and balloon-like. The intermediate request for a long, very thin straw-like head was superseded by D77: use normal adult head proportions. V3 (`base-v3.png`, record `base-provenance-v3.json`) is the head-only correction; body and outfit should remain intact. The user evaluates the result.

Current Andromoss head direction (D77): normal-sized adult head; the forehead continues directly into short, rigid skin points along its outer top contour. No division, hairline, separate cap, different hair color, strands or windblown hairstyle. Crown points remain fixed with the skull in future animation. Retain neck gills, tail and the small rear head tendril. The current review draft is `base-v4.png`, with its prompt in `base-provenance-v4.json`.

Andromoss refinement D78: preserve v4’s normal-sized head and continuous skin crown. Make the body tail slender and lion-like with a small compact tip tuft; make the rear head appendage a single very thin braid silhouette. Both appendages must remain readable and fit the canvas. The current review draft is `base-v5.png`, with prompt record `base-provenance-v5.json`.

### Andromoss approved base and installed animation pass

The user approved base-v5 on 2026-11-18, then selected **Andromoss** as his final name. His current internal ID and character/home folders are `andromoss`; historical Andy/Nightshade generation prompts and reports are retained unchanged. Base-v5 preserves the normal adult head, rigid skin-continuous crown, neck gills, slim tufted tail and narrow rear braid. Earlier draft notes above are historical design steps.

Native 192×192 sheets are installed: subtle idle (5 frames, 3 fps), expressive victory (9 frames, 8 fps), and one shared casting clip (9 frames, 9 fps plus 500 ms hold), with a requested violet hook trail and small gold sparks. A static 192×192 icon is installed for HUD/pause/round results. These new outputs await user visual review; file/playback checks do not establish visual quality. Exact prompts remain in `public/assets/characters/andromoss/provenance.json` and `icon-provenance.json`. Spell-effect artwork remains deferred.

The user approved Andromoss’s idle, victory, casting and icon. A targeted white-speck cleanup replaces 162 victory pixels and 178 casting pixels using free PixelLab exact patch operations; alpha, first frames, colored pixels, timing and all other pixels are unchanged. These counts describe technical changes, not a visual quality judgment. Cleanup previews await user review. Exact patches and before/after hashes are preserved in `cleanup-provenance.json`; the original generation record is `provenance-before-cleanup.json`.

The user requested broader cleanup after the exact-pixel pass still looked messy (D82). PixelLab `edit_animation` now polishes victory/casting frames 1–8 in four batches at native 192×192, with identical prompt/seed and a requested 48-color limit. Brief: coherent flat clusters, clean outlines, fewer white specks/noisy highlights, preserve existing poses/alien identity and violet/gold effects. Starting frame 0, nine-frame counts and timing remain unchanged; idle/icon are unchanged. Cost: 100 subscription generations. Full source mappings, prompt, jobs and hashes: `polish-provenance.json`; pre-edit record: `provenance-before-polish.json`. Visual fidelity and quality await user review.

D83 adds a second AI polish followed by firmer free PixelLab exact editing of its returned frames. The AI brief requests cleaner broad flat clusters with a 32-color limit; one rejected batch was retried with simpler positive wording, with the exact prompts/jobs retained. The free pass includes connected white/light-gray clusters up to 32 pixels (minimum RGB 135, maximum channel spread 50), replacing attached pale noise with neighboring existing material colors and erasing detached neutral islands. Changed 639 victory pixels and 776 casting pixels relative to the new AI outputs. Saturated source pixels and all unselected pixels are verified unchanged by the free pass. Original frame 0, native 192×192 size, nine frames per clip and timing remain unchanged; idle/icon unchanged. Successful AI batches cost 100 generations; free edits cost zero. Visual quality/fidelity awaits user review; records in `polish2-provenance.json` and `provenance-before-polish2.json`.

### Captain Bramble base draft

User clarified his species and equipment: Captain Bramble is a **rat**, wearing a cool helmet shaped around his rounded rat ears, with red helmet eyes/lenses. Preserve this identity, folded-arm confidence and long rat tail. A fresh native 192×192 base is staged at `public/assets/characters/captain-bramble/base.png` for user review using the old drawing for identity and approved Champignon/final target art for clean bold pixel style. This is a staged art draft, not playable roster expansion. Generate animations only after base review; idle subtle, victory/casting expressive, casting with thematic magic. User-only visual review remains in force.

The user approved Captain Bramble’s base and authorized his icon/idle/victory/shared casting pass (D85). Use the same source base for each entire animation, fixed original material colors and no batched AI polish. Idle: restrained breathing/tail motion. Victory: unfold crossed arms into a confident flex/salute and settle. Casting: brace, palm/forearm warding sweep and stomp, with compact moss-green arc/ground ripple and amber motes. Helmet ear shells stay rigid and red lenses stay steady. Stage files for visual review; he is not yet playable.

Captain Bramble’s three animation drafts are staged in `public/assets/characters/captain-bramble/`: `standing.png` (5 native 192×192 frames, 3 fps), `victory.png` (9 frames, 8 fps), and `cast.png` (9 frames, 9 fps plus 500 ms hold). Each full clip was generated from the same approved base in a single call. Technical checks verify alpha, dimensions, visible starting pixels and packed frame pixels; hidden RGB under full transparency may normalize. Exact requests/jobs/seeds/hashes are in `provenance.json`. The static 192×192 icon is also staged at `icon.png`, with exact prompt/job/cancelled-retry history in `icon-provenance.json`. User-only visual review; runtime roster remains the initial two heroes.

Captain Bramble’s idle, victory, shared casting animation and icon were all approved by the user on 2026-11-18. Preserve them without further unsolicited cleanup. Art is staged; playable roster expansion remains deferred.

### Duskmantle base draft

User confirms the original mysterious scarf-and-cloak identity and requests a simple design. Generate one clean adult base with a reserved, mostly concealed face, long bangs, an oversized scarf and a cloak with a few broad folds. Restrained flat colors, bold outlines and minimal detail; no added weapons/props or effects. Original Dindo drawing is retained as the identity reference. User reviews the base before animations; staged art does not expand the playable roster.

Duskmantle’s base was approved by the user on 2026-11-18. Authorized animation pass: subtle breathing/scarf-hem idle; expressive bow, cloak-opening victory gesture; shared open-hand curse casting with a compact violet ribbon and magenta motes. Preserve the simple mysterious scarf/cloak identity, concealed face and fixed costume palette. Each clip generated as a whole from the approved base; user-only visual review. Icon remains separate future work.

Duskmantle’s animation drafts are staged at `public/assets/characters/duskmantle/`: idle 5 frames at 3 fps; victory 9 frames at 8 fps; shared casting 9 frames at 9 fps plus 500 ms final hold. All frames are native 192×192; file/alpha/visible-source and packing checks passed. The three complete clips cost three subscription generations total. Exact requests, seeds, job IDs and hashes are in `provenance.json`. Visual quality awaits user review; no cleanup or playable roster expansion was applied.

Duskmantle’s idle, victory and one shared casting animation are user-approved. His head-and-shoulders icon is authorized. Spell-effect animations belong to individual spells, not heroes: every spell has its own effect animation, while the hero has one shared casting animation across all spells. Existing per-tier effect slots implement this separation; do not count them as extra hero animations. Large portraits remain optional.

Duskmantle’s static head-and-shoulders icon is staged at `public/assets/characters/duskmantle/icon.png` (transparent 192×192), with its exact prompt/job/hash in `icon-provenance.json`. User visual review pending. No new spell-effect animations or playable character implementation were included.

The user approved Duskmantle’s icon on 2026-11-18. His base, idle, victory, shared casting and icon are all approved; preserve without unsolicited cleanup.

### Sprig base draft

User authorizes Sprig’s new base, explicitly preserving his mailbox-shaped robot head and adding gardening tools. Retain original mechanical claws and @ identity. Keep a small readable tool set: hand trowel, clipped hand cultivator and compact watering attachment. Simple clean flat pixel art; no clutter or weaponry. Stage one base for user-only visual review before animations.

Sprig refinement D91: user likes the first base overall but wants a less literal mailbox head. Keep a subtle rounded-box hint while prioritizing a robotic housing and face panel; remove postal slot/door/flag details. Preserve body, gardening toolkit, palette and pose. Current refinement is a head-only v2 draft; original base retained.

Sprig refinement D92: user likes v2’s revised head and requests replacing the shovel-holding claw itself with an integrated wrist-mounted trowel attachment. The shovel blade is the end-effector, with no claw/fingers gripping a separate handle. Preserve the other claw, gardening toolkit, head, body, palette and pose. V3 is staged for user review before animations.

Sprig correction D93: v3 still looks handheld to the user. Remove the complete shovel handle/shaft and gripping claw. The wide shovel blade itself is the hand, attached flush to the forearm with no thin connector rod. V4 is a user-review correction; preserve all other approved design directions.

Sprig refinement D94: both hands are integrated gardening tools. Keep the shovel-blade hand; replace the remaining claw with a compact two/three-tine cultivator head attached flush to the forearm, with no gripped handle or shaft. Remove the redundant cultivator from the waist, preserving the watering attachment and rest of the design. V5 awaits user visual review.

Sprig final color refinement D95: user approves v5’s design and requests matching head/torso paint. Recolor the exterior head housing to the existing torso enamel hue/shading ramp; retain dark face/visor and mechanical details, all geometry and both integrated tool hands. V6 is the color-only draft.

Sprig base-v6 is user-approved. Authorized asset pass: subtle mechanical idle; expressive raised-tool victory; shared planting/tending cast with a compact leaf-green ribbon and amber seed-like motes; head-and-shoulders portrait/icon. Preserve identical head/torso paint, revised robot head, direct shovel/cultivator end-effectors without handles/fingers, and watering attachment. Complete animation clips are generated from the same approved base without batched polishing. One hero cast, separate future effects per spell. User-only visual review; no playable roster expansion.

Sprig’s art drafts are staged under `public/assets/characters/sprig/`: idle (5 native 192×192 frames at 3 fps), victory (9 at 8 fps), shared cast (9 at 9 fps plus 500 ms hold), and static 192×192 head-and-shoulders portrait/icon. Animation generation cost: three total; icon: ten. Native dimensions, transparency, visible source frame and packing checks passed. Exact requests/jobs/hashes are in `provenance.json` and `icon-provenance.json`. User visual review pending; no cleanup or playable roster expansion applied.

The user approved Sprig’s idle, victory, shared casting and portrait/icon on 2026-11-18. Preserve these approved assets without unsolicited cleanup. Five characters now have new base artwork: Sir Champignon, Andromoss, Captain Bramble, Duskmantle and Sprig. Four complete art sets are approved; Andromoss victory/casting remain unresolved after rejected cleanup passes. Mallow, Miyaya and Rootbeard remain for new artwork. Only the original pair is playable.

### Andromoss simplified restart

D97 authorizes a fresh simpler base before any animation retry. User permits removing sunglasses for large wide-open expressive eyes. Preserve a normal-sized adult head (no balloon/chibi proportions), slim adult body, rigid skin-continuous crown, simple gills and slender tufted tail. The new proposal drops hook/chain/rear braid and detailed jacket fittings, with a plain jacket/shirt and fewer broad flat colors. New draft is `base-v6.png`; prior art/runtime files remain unchanged pending user review.

Andromoss simplified base-v6 is user-approved (D98). Generate fresh full-clip idle, victory, shared casting and matching icon without polishing old animations. Subtle breathing/tail idle; expressive simple hop/salute victory; open-hand star-theft cast with compact violet ribbon/gold motes. Preserve exposed wide eyes, normal adult head, rigid skin crown, fixed simplified jacket colors, gills and tail; no glasses/hook/chain/rear braid. Existing presentation paths and clip timing remain the same, and prior records are retained. Generated outputs await user visual review.

The simplified Andromoss set is installed in existing paths: idle 5 frames at 3 fps, victory 9 frames at 8 fps, shared cast 9 frames at 9 fps plus 500 ms hold, and native 192×192 icon. New outputs use approved base-v6 and await user visual review; no cleanup was performed. Existing rules and presentation timing remain unchanged. Original detailed-design records are retained in `provenance-before-simple-restart.json` and `icon-provenance-before-simple-restart.json`; all binaries remain in Git history. Exact new requests/jobs/hashes are in current provenance files. Three animation generations plus ten icon generations.

### Current approved art milestone

The user adopted the fresh simplified Andromoss animations/icon on 2026-11-18. **All five sets are now approved:** Sir Champignon, Andromoss, Captain Bramble, Duskmantle and Sprig. Use the current assets; defer new character generation for Mallow/Miyaya/Rootbeard. Every current set has idle, victory, one shared casting animation and a head-and-shoulders icon. Individual spell-effect assets remain separate and use existing placeholders. Current playable kits are still Champignon/Andromoss; roster expansion requires explicit implemented rules, bot support and network validation rather than giving the staged heroes another character’s kit.

### Five-character gameplay adoption

User explicitly requested all five approved heroes be playable. Runtime IDs match display names: `champignon`, `andromoss`, `captain-bramble`, `duskmantle`, `sprig`. All 20 spells now execute in the shared rules, not merely character-selection labels. See `specs/prototype.md` for new provisional timings and semantics. The approved art and home/music files are wired into selection, HUD, pause, cast/round/match results, AI/local matches and online rooms. No new PixelLab work. Historical art-staging notes above are superseded by this milestone.

### Current spell costs and automation (D101/D102)

Champignon now has Clean Sweep at 1 star (3-second clearing window), Mushroom Guard at 2, Spore Ward at 3 and Royal Cleanup at 4 (same sweep window plus three guards). Andromoss’s Borrowed Spark/Sticky Fingers have no fallback when the enemy has no stars; Double Trouble still affects the opponent. Bramble now has Tin Caps at 1 and Bramble Brace at 2; tiers 3/4 unchanged. Sprig automation strikes every 250 ms in one column (tier2,6.5s) or two (tier4,8s), collecting stars and taking normal rabbit penalties; armor consumes repeated strikes. Weed Out remains cleanse plus one 6-second hostile ward. No art changes; old concept/kit tables above are historical where they conflict with these current rules.

Current duration update I03: Clean Sweep and Royal Cleanup now have a 1-second active clearing window; Bramble Tin Caps/Heavy Harvest apply armor for 2 seconds. Other values and approved art remain unchanged. These override prior3/6-second notes. User prefers the pooled versus-matrix view, with underlying difficulty detail retained.


### Current normal-hit correction (D104/D105/I04)

Supersedes I03: Sweep/Royal Cleanup and Bramble armor last 3 seconds. Sweep hits current/all arriving target types every 250 ms using normal mole points, rabbit penalties/guards and star collection. Sprig automation uses normal mole points too. Tin Caps/Heavy Harvest armor at most two/four moles within their window, with one/two extra strikes each. All other active durations remain unchanged. Report Easy/Medium/Hard separately. Quotas remain provisional; review reports/balance-normal-hits-review.md before more tuning.


### Current column/theft correction (D106/I05)

Clean Sweep (one star) hits one fixed column for three seconds; Royal Cleanup (four) keeps full-board coverage and its guards. The provisional selector chooses the busiest column at cast time, leftmost on ties. Borrowed Spark steals **all** enemy charge at resolution, up to the caster’s four-star capacity, and is wasted against an empty meter. Other spells remain unchanged, including Sticky Fingers stealing at most two stars. The resulting tier-1/tier-3 resource overlap needs future design review, rather than silently changing tier 3. Previous copy-one/full-board-one-star descriptions are historical.


D107: initial isolated-tier diagnostics make no changes to these powers or costs. Borrowed Spark/Sticky Fingers assignment changes remain deferred. One-slot tests alter the resource economy and omit cross-tier options; preserve that limitation when interpreting each hero’s spell strength.

D108: one-star diagnostics now use spell-specific useful-opportunity conditions and the same 300–700 ms decision-delay distribution for all heroes/difficulties. Spell powers and the deferred Borrowed Spark/Sticky Fingers assignment remain unchanged. See prototype.md for thresholds and historical immediate-cast comparison.


D109/I08 current one-star strength pass: Clean Sweep hits its fixed column immediately and then every **1.5 seconds** during its **3-second** window. Tin Caps armors **one** enemy mole (one extra hit, 3-second window). Royal Cleanup stays at 250 ms/full board/3 seconds plus its prior guards; Heavy Harvest stays four moles/two extra hits/3 seconds. Other spells and the postponed Andromoss assignment review stay unchanged. These values supersede older cadence/quota notes above and remain provisional.


D115/I12: targets now share the faster per-board wave lifetime regardless of kind/origin. No spell cost, duration, target quota or hero-specific AI change in this pass. Earlier kit win rates predate this new pacing; reaction tests disable powers and verify hero identities do not alter hitting behavior.


D117/I13 casting trials use the same base decision-delay distribution for all heroes, with optional Easy3/Medium2/Hard1 multipliers. No per-character probability or power tuning. Profiles are experimental; full-kit AI and baseline defaults stay unchanged. Faster opponents can spend stars before Borrowed Spark resolves, so more completed casts need not mean better theft.


D118/I14 freezes the adopted one-star casting profile while keeping current spell rules unchanged. Current baseline powers: Sweep1500 ms cadence/3 s; all-charge Borrowed Spark; one-mole Tin Caps/3 s; one-mole Ominous Bud +4 miss/8 s; Gentle Tending +700 ms once. The preference for faster Sweep and at least three Tin Caps moles remains pending, to be compared against this measured baseline.


D119/I15 current one-star rules supersede earlier cadence/duration notes: Clean Sweep hits the busiest fixed column immediately and continuously intercepts its arrivals for 3 s; normal rewards/rabbit penalties and repeated armor strikes. Ominous Bud one mark/+4 miss has a 12 s window (8 s before); Withering Pact remains 8 s/four marks. Gentle Tending instantly extends current targets by1.2 s once (0.7 s before), without a lasting aura. These longer values are provisional, not proven balance improvements; controls showed no Bud outcome change and mixed Tending results. Tin Caps remains one mole/one extra hit/3 s; other powers and scaled casting profile unchanged.


D120/D121/I16 current owner/rules: **Duskmantle — Ominous Bud** marks three enemy moles within 12 s (+4 missed-mole penalty each); **Sprig — Gentle Tending** applies +0.5 s once to current and arriving own targets for 3 s, including moles/rabbits/stars. These replace one mark/12 s and instant +1.2 s respectively. No repeated lifetime stacking, no other spell changes. Preserve the owner column in all future spell tables. Current isolated results and limitations are in mark-aura-review.md.


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


### Current Andromoss kit adopted (D138/I28/I29)

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
