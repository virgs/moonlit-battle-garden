# Decisions and open questions

Last updated: 2026-11-17.

This file records the discussion's current state. An accepted concept is not a claim that its numerical balance or implementation details are final. Revisit settled decisions only when the user requests a change or a concrete implementation/playtest finding warrants it.

## Agreed

| ID | Decision |
| --- | --- |
| D01 | Remake the oldest Dig Hole Battle Garden concept. Tetris Battle Gaiden contributes characters, magic, and versus structure; no stacking or falling-block mechanics. |
| D02 | Support online 1v1 and offline two-player play on one computer. |
| D03 | Support mobile. Mobile shows the player's own board and related HUD rather than two full boards. |
| D04 | Include offline computer opponents with easy, medium, and hard difficulty. |
| D05 | Follow shinobi-arena's frontend stack: TypeScript, React, Phaser, Vite, and pnpm. |
| D06 | Reuse most suitable images, sound effects, and animations from the two reference repositories. Generate missing assets with PixelLab later. |
| D07 | Exclude keyboard-mapping shuffle for now. |
| D08 | Adopt all eight recovered characters and the proposed four-tier spell concepts recorded in characters.md. These are remake proposals, not verified historical character loadouts. |
| D09 | Focus implementation and balancing on only two characters until the game is ready; extend the roster afterward. |
| D10 | Keep specifications in the repository so future discussions and implementation retain decisions. |
| D11 | Finish discussing the design before starting game code. |
| D12 | User authorized starting implementation on 2026-11-16; document provisional defaults for remaining tuning. D11's discussion phase is complete. |
| D13 | Name: **Moonlit Battle Garden**. Repository: `virgs/moonlit-battle-garden`. Keep frequent meaningful commits. |
| D14 | Run offline AI battles and report character wins at easy, medium, and hard to evaluate balance. |
| D15 | Matches use one canvas filling the viewport; all interface elements are HUD overlays. Preserve sprite aspect ratios; distribute/reposition gardens and HUDs on resize rather than stretching artwork. |
| D16 | The local player is always on the left against AI or online opponents; same-computer Player 1 is always left. There is no side selector. A single visible mobile board represents the local player. Future online transport must map local identity to this presentation independently of network seat. |
| D17 | Sprite feet and hit areas must share measured source-art hole anchors at every viewport size. |
| D18 | Within each round, pacing rises gradually with waves of pressure and recovery. Every round restarts the same curve; round number and match score add no difficulty. See pacing.md; waves are now implemented. |
| D19 | Restore the animated shared blue/red top bar. Numeric points are optional secondary information. The bar represents score difference; a lead of X ends the round and fills one color. Tied scores center it. |
| D20 | Restore dust/root decoration attached to boards. Each character should have a cosmetic home background and music; a match's home belongs to one of its participating characters. |
| D21 | Character-specific cast art remains for the asset pass; portrait/cast playback code is now implemented per D24. |
| D22 | Use the oldest version's actual bar/earth/board assets and animation behavior. Show exactly one shared bar; remove individual health meters. Root/earth placement must differ between boards while staying attached during resize. |
| D23 | User clarified: scores are the only competitive resource. Equal scores center the bar; a lead of X fills it and wins the round. No separate health pool or old linked-life mechanic. X=100 is a provisional configurable default. |
| D24 | Implement wave pacing and prepare distinct home backgrounds/music, portraits, and per-tier cast playback so only final asset files are needed. No final art/music generation requested in this pass. |
| D25 | Online matches use one player’s browser as host over WebRTC. No dedicated gameplay server; cheating resistance is not a priority. Hosted signaling and optional relays are connection infrastructure. Host exit ends the match. |
| D26 | Publish the static website with GitHub Pages. Mobile plays in ordinary browsers; PWA installation/offline caching is deferred and is not part of the current release work. Test small screens in portrait and landscape. |
| D27 | User explicitly authorized making virgs/moonlit-battle-garden public and publishing its static website on GitHub Pages. Pages is enabled with automatic deployment from main. |
| D28 | Continue committing/pushing without waiting for each deployment. The user will request published-build testing when desired. |
| D29 | Restore original star/container and trophy artwork/animations. Board-base green is replaced by left blue/right red; trophies fade in and spin at round victory and persist below each side of the shared bar as round-win counts. |
| D30 | Minimal active-play HUD: shared bar, outer-end names, boards, trophies and original vertical star containers only; horizontal stars may be used in narrow portrait layouts. Hide permanent character/score panels, spell names/descriptions and wave text. Tap stars to cast; tap the bar/Escape to access paused controls. |
| D31 | Enlarge names and per-side trophies 2× on phones and 3× on desktop; enlarge star controls responsively. Manual pause is limited to solo/AI and same-computer multiplayer. Online menus do not pause play; connection interruptions freeze and automatically recover via the ready handshake. Audit original target/charge animations. |
| D32 | Enable recovered sound effects and music on match entry. Final match screen has only trophy/winner text, then a small fresh-input prompt after a few seconds (four-second default), returning to the menu without buttons. Keep font choice open to non-pixel/fancier free fonts. |
| D33 | Use the selected Almendra + Literata pairing: Almendra titles/character names, Literata menu/body text. Self-host the free fonts with their licenses. |
| D34 | Round results mirror match results: trophy and winner only, then a fresh-input prompt after four seconds to start the next round. No result buttons. Remove background fills, borders and shadows from menu panels. |
| D35 | Preserve the final arena behind round/match results. Show rival stars on single-board screens. Expand Escape/tap-bar menus with resume, mute, quit, key maps and both spell lists; connection loss uses the same menu with recovery status. Match wins show the winning hero animation instead of a spinning trophy. |
| D36 | Result overlays must be fully transparent so the frozen arena remains clearly visible. Enlarge round label/countdown about 5×, fitting short screens, with rendered-pixel Playwright regression checks and desktop/phone screenshots. |
| D37 | Outline game text with multidirectional shadows. Align desktop trophy centers above the star columns. Center the board itself on landscape phones with a vertical star control to its left. Match victory must animate actual sprite frames, with no whole-image wiggle. |
| D38 | Restore independent per-player clocks and bounded current-score pressure: the trailing board gets faster natural/star opportunities and shorter new target windows. Preserve shared waves, safety floors, concurrency bounds and identical per-round resets. Evaluate through paired AI runs. Initial default after diagnostics: up to 10% shorter intervals/windows. |
| D39 | Defer all further sprite creation/PixelLab generation until remaining game development is finished. Retain the existing generated victory sprites. |
| D40 | Place character names below and centered with their round trophies. Desktop names follow the trophy/star columns; compact layouts keep the paired HUD below the score bar. Preserve full labels and responsive clearance. |
| D41 | Revise D40: character names sit above their trophies, centered on the same columns, beneath the score bar. |
| D42 | Redesign pause/menu after the Shinobi Arena reference: centered top title, large vertical Resume/Mute/Quit actions left, current control keys in board-shaped 3×3 layouts and only selected heroes’ spell titles right. Reuse the supplied CraftPix input artwork; no generation. Keep actions visible while references scroll on small screens. |
| D43 | Remove the Esc/Back menu hint and increase spacing between control keys and magic names across layouts. |
| D44 | Increase menu option sizes and make the active brush highlight opaque. Give PAUSE a larger distinct title font (bundled Cinzel), and reduce magic-name text and key sprite sizes while preserving responsive spacing. |
| D45 | Make PAUSE slightly smaller. Match the options’ left outer margin with the control/spell content’s right outer margin. On portrait phones, put options at the top and controls/magic near the bottom; keep larger-screen left/right composition. |

| D46 | Align both character names on portrait pause screens. Each character gets a dedicated icon for pause references and round results, separate from the match victory animation. Prepare drop-in paths now; defer PixelLab generation with the rest of the asset pass. |

| D47 | Use visible recovered/procedural placeholders for missing art. Casts freeze both players for 1–2 seconds (1500 ms default), with character presentation advancing separately from frozen gameplay timers. Active spell visuals persist for their actual effect lifetime. Keep match victory sprites; prepare standing/idle preview slots and defer PixelLab generation. |

| D48 | Show the cast’s spent tier as 1–4 original filled star sprites beneath the casting character throughout the freeze, with no empty slots and a blue/red caster accent. Use captured cast tier, including opponent casts on single-board phones. Exclude defeat/hurt character reactions from the asset scope. |

| D49 | Defer further animation and asset creation while working on the remaining screens. Simple single-color, semi-transparent boxes are sufficient placeholders for missing visuals; final spell/character animation polish is not a blocker for menu work. Existing game assets remain available. |

| D50 | Build a title screen and game-style main menu, merging online create/join/invite/connection controls into the main menu rather than a separate lobby screen. No image creation; reuse existing moonlit artwork and placeholder character art. Preserve direct invites, local/AI setup, responsive controls and keyboard/touch navigation. |

| D51 | Separate main-menu mode/options selection from character selection. Always show two independent character carousels in solo, local and online modes. Browsing uses idle art (still fallback while absent); confirming plays the existing victory clip once and marks Ready. Online highlights/readiness synchronize live, with the local player always left; both must confirm before match creation. No new assets/animations are generated. |

| D52 | Use Night Watch (solo), Garden Grudge (shared keyboard), Beyond the Hedge (online), Garden Shed (settings), and Field Notes (help), with brief mode descriptions in the main menu. Remove redundant selection instructions/player-role labels and show Ready once per confirmed hero. Reuse CraftPix key art beside keyboard actions, with real R/numpad+ confirmation, Enter start and Esc back shortcuts; hide keyboard-only hints on touch-primary devices. |

| D53 | Enlarge keyboard action hints/key glyphs. Use the explicit Back to title label. Replace numeric spell tiers in selection and pause with 1–4 original star sprites, and identify modes with consistent icons across menu, selection, gameplay and pause. No new generated art. |
| D54 | Add the mode, current round number and round clock to gameplay. Implementation default: elapsed active round time in mm:ss, reset each round, frozen during pauses, cast freezes and connection recovery. Victory remains score-difference based; this adds no time limit. |

| D55 | Center mode/icon, round number and clock at the very top on all gameplay layouts, above the score bar. Display just the round numeral, keeping its accessible Round N label. Enlarge gameplay header text roughly 2×, adapting to narrow screens. |

| D56 | Add a character icon beside each gameplay HUD name, above the trophies, on both sides including the rival on single-board phones. Missing final icons use semi-transparent character-colored boxes; reuse configured icon paths when supplied. No new image generation. |

| D57 | Provide an opt-in automatic phone connection-check link, using real player-hosted sessions with scripted hits/casts and a reconnect check. The user only opens it on cellular and leaves it visible; no playing is required. Keep actual physical-network results separate from same-machine/browser emulation and record route types without IP addresses. |

| D58 | Validate the AI balance harness with Andy-vs-Andy and Champignon-vs-Champignon at every AI level before further character tuning. Expect approximately 50/50 side wins over many seeds, report unfinished matches separately, and avoid treating symmetry as proof of full correctness. |

| D59 | Compare AI fallibility and stronger waves against the original settings before tuning. Include seeded timing variation and occasional hesitation across all AI levels, retaining difficulty ordering. Adopt the independently validated shorter-match configuration: 70/87/92% accuracy, stronger peaks with a 60-second ramp, and gentler 5% catch-up. Preserve minimum visible windows, target caps, score-based victory and identical per-round rules. Keep remaining Hard character imbalance and long tails explicit. |

| D60 | Organize the remaining asset checklist by character. Use one casting animation per character, shared across all four magic tiers; preserve distinct spell effects and actual stars-spent display. Each hero needs nine assets for current screens plus one optional portrait; victory animation already exists. |

| D61 | Source and install distinct backgrounds and music for both initial heroes, preserving the pixel-art moonlit mood. Use existing reusable art/music, with verified licenses/provenance; no new image generation. Selected homes use a purple moonlit castle/Forest Whisper Theme for Champignon and a blue dark forest/Magic Town for Andy. |

| D62 | Source eight total background/music pairs now, retaining the two approved homes. Stage six additional CC0 pairs under provisional theme names; defer character names/minibios and playable roster expansion. No new image or music generation. Keep credits, hashes, a browsable music/art collection and asset validation. |

| D63 | Preserve the approved Sporelight Keep, Moonlit Hideout, Whispering Wood and Violet Veil assets. Replace the four rejected town/harbor/lava/chapel homes with garden and woodland scenes: foliage, moss, roots, mist, moonlight and magical glow. Keep a cohesive garden setting rather than unrelated fantasy biomes; no new generation. Allow sourced assets with explicit compatible licenses and attribution. |

| D64 | Approve the eight caretaker identities, minibios and home/music assignments in characters.md. Simplify the proposed names to Nightshade, Duskmantle and Rootbeard; retain Sir Champignon, Captain Bramble, Sprig, Mallow and Miyaya. Preserve stable internal IDs and existing artwork paths when applying display names. PixelLab generation remains deferred; checking account access does not authorize generation. |

| D65 | Reopen PixelLab generation for Sir Champignon only: create a new base from his recovered drawing, using the final board/moles/rabbits/stars as style references, then idle, victory and one shared casting animation. Preserve his helmet, red plume, mushroom shield and broom. Icons, portraits and distinct spell effects remain separate future work. At the user’s request, leave visual review to the user from this point; perform only technical file/playback checks and show previews without model image inspection. |

| D66 | User rejected the first Champignon art pass as too close to the old illustration, too thin-lined and visually dirty. Redesign from scratch with the finished target sprites as the style authority: thicker outlines, simpler shapes, fewer colors and clean flat shading. Retain only the knight/broom/mushroom-shield concept from the old art. Show a new base for user visual review before generating more animations; do not inspect the result with model vision. Existing clips have 5 idle / 9 victory / 9 casting frames including the starting pose. |

| D67 | User prefers the clean v2 Champignon style but finds the proportions too cute/baby-like. Refine to a taller, leaner adult with a smaller relative helmet, longer torso/limbs and less rounded armor, preserving the bold outlines and clean shading. Include exact mole, rabbit, star and board art in the style references. Continue user-only visual review before new animation work. |

| D68 | User approved Champignon base-v3.png as the character design and style direction for the cast. Future idle/victory/shared-cast clips must be very expressive with clearly changing body poses and silhouettes; few strong frames are preferable to many nearly identical frames. Avoid barely perceptible motion and whole-image wiggling. Preserve clean bold outlines and adult proportions. Animation generation waits until the user restores PixelLab access; visual review stays with the user. |

| D69 | User restored PixelLab access and authorized resuming Champignon’s expressive idle/victory/shared-cast animations on 2026-11-18. Use the approved 192×192 base-v3 at native resolution, preserving its final-game reference style and adult proportions. Keep the existing 1.5-second casting freeze and actual stars-spent overlay. Visual quality review remains with the user. |

| D70 | User approved Champignon’s animation style but revises D68 for all future characters: idle must be subtle and calm; casting must include a visible magic effect fitting the character and following the gesture/weapon. Keep expressive victory and casting body motion. For Champignon, replace the overactive idle with gentle breathing/plume sway and add a narrow golden-green spore trail and a few fading sparkles along the existing broom sweep. Preserve the approved victory. Visual review remains user-only, and one casting sheet still serves all spell tiers. |

| D71 | Generate Champignon’s static head-and-shoulders character icon from the approved base-v3 identity for HUD, pause and round results. Preserve helmet, cyan eyes, red plume and clean thick pixel outlines. The large portrait remains optional/deferred because selection uses idle/victory animations. Visual review remains with the user. Nightshade is the next character art pass after this icon review. |

| D72 | User reports that the first Champignon icon crops away most of the head. Keep the icon frame/UI position fixed; move the character substantially right within the asset and restore the complete helmet/plume from the approved design. Preserve transparent margins around the head. Continue user-only visual review. |

| D73 | User approved the icon framing revision and requested another 10% rightward move. Apply an exact 19px horizontal pixel translation within the unchanged 192×192 frame, without regenerating the artwork or moving UI frames. User retains visual review. |

| D74 | User approved Champignon’s final icon shift and authorized the next character art pass. Start Nightshade (legacy/internal Andy) with a fresh base design for user review, taking identity cues from the original drawing and clean bold adult pixel-art style from approved Champignon and final mole/rabbit/star/board art. Keep existing runtime assets until the base is approved. Subsequent art follows D70: subtle idle, expressive victory, casting magic effect and a well-framed icon. |

| D75 | User corrects Nightshade’s identity: he is an alien, not a blond-haired human. The apparent hair spikes are continuous extensions of his face/scalp, like a spiked cartoon head, with no hairline. He has visible neck gills. User permits a tail and a small ponytail-like rear head appendage; include these as simple alien anatomy. Clean the base sprite’s stray/dead pixels and noisy shading into bold coherent flat-color clusters. Preserve the sunglasses, jacket and hook/chain identity and adult proportions. Visual review stays with the user. |

| D76 | User rejects Nightshade v2’s wide balloon-like head. His defining anatomy is a long, very narrow straw-like head/face with slender sides and a small jaw, not an enlarged skull. Narrow and elongate the head while retaining body/outfit, skin-continuous spikes, neck gills, slim tail and rear head tendril. User-only visual review remains required. |

| D77 | User revises D76: Nightshade now needs a normal-sized adult head. Forehead and short top spikes are one continuous skin/skull shape, with no hairline, seam, separate cap or hair-like locks. Spikes are fixed anatomy and must not sway like hair in future animations. Preserve body/outfit, gills, tail and rear head appendage. User-only visual review remains in force. |

| D78 | User likes Nightshade v4’s normal-head direction and requests two refinements only: a thinner lion-like body tail with a small tip tuft, and a much narrower rear ponytail/head appendage resembling a single slim Padawan braid. Preserve the approved head/forehead continuity, gills, body and outfit. Continue user-only visual review. |

| D79 | User approved the alien base-v5 and authorized subtle idle, expressive victory, one shared casting animation with character-themed magic, and an icon. Keep native 192×192 frames and the existing 1.5-second cast freeze/stars-spent overlay. User-only visual review remains required. |

| D80 | User selects **Andromoss**, replacing provisional Nightshade and legacy Andy. Keep display and internal names closely aligned: use `andromoss` for runtime character IDs, CSS selectors, asset/home folders, configuration, tests and diagnostics. Supersedes D64’s stable-ID direction for this character. Preserve exact old generation prompts, source identity and historical balance reports. Retain the approved minibio: “A wanderer from Andromeda who discovered that the brightest stars grow in moonlit gardens.” Bump wire compatibility so mixed old/new builds cannot join. |

| D81 | User approved all Andromoss animations/icon and requests cleanup of white dead pixels in victory and casting only. Preserve motion, timing, silhouette, transparency and colored magic; use exact PixelLab pixel operations rather than regenerating the character. User-only visual review remains in force. |

| D82 | User finds the exact white-pixel repair improved but still messy and authorizes a broader PixelLab edit_animation cleanup of Andromoss victory/casting: simplify noisy shading/highlights into broad coherent clusters and clean outlines while requesting unchanged poses, adult alien identity and violet/gold magic. Use four-frame batches with identical prompt/seed, retain native 192×192 layout, original starting frame and existing timing. Visual review stays with the user; preserve earlier files/records for comparison. |

| D83 | User authorizes one more PixelLab AI polish of Andromoss victory/casting followed by free exact pixel editing of the returned frames. Make the deterministic cleanup firmer: include light-gray specks and larger small noisy clusters, not only tiny white dots. Preserve adult alien identity, motion/timing and colored violet/gold magic; user retains visual review. Keep earlier versions for comparison. |

| D84 | User pauses Andromoss refinement and moves to Captain Bramble’s base draft. He is an adult RAT, with a cool helmet whose ear-shaped shells follow his rounded rat ears and with red helmet eye lenses. Generate a fresh clean base using original drawing identity and approved final-game style; user reviews the image. Do not expand the playable roster or generate animations before base approval. Keep tool responses concise and avoid exhaustive pixel-edit lists in model context. |

| D85 | User approves Captain Bramble’s base and authorizes icon, subtle idle, expressive victory and one shared magical casting animation. Generate each full animation together from the same approved native 192×192 base to reduce palette drift; no automatic iterative cleanup. Preserve helmet ear shapes and red lenses. Stage assets without expanding the playable roster. User-only visual review remains in force; keep tool output and file reads concise to reduce token use. |

| D86 | User approves all Captain Bramble animations and icon. Preserve these approved assets without further cleanup. Continue concise tool output and targeted reads to save tokens. This approves art only; playable roster expansion remains deferred. |

| D87 | User confirms Duskmantle’s mysterious scarf-and-cloak identity and authorizes a simple fresh base draft. Keep adult proportions, bold clean outlines, broad flat shading and minimal costume detail. Use original Dindo artwork for identity; no added props or elaborate decoration. User-only visual review; generate one base before further animation work. |

| D88 | User approves Duskmantle’s simple base and authorizes subtle idle, expressive victory and one shared magical casting animation. Generate complete clips from the same approved base, preserve fixed costume colors/simple shading and use a compact violet curse effect following the casting gesture. User-only visual review; stage art without playable roster expansion. Icon is separate future work. |

| D89 | User approves Duskmantle’s animations and authorizes his head-and-shoulders icon. Clarify ownership: every hero has ONE shared casting animation; EACH SPELL owns its distinct spell-effect animation, separate from the hero animation set. Thematically matching effects within a cast clip are not a substitute for spell effects. Generate only the icon now; user-only visual review. |

| D90 | User authorizes Sprig’s base draft: preserve the mailbox-like head and mechanical robot identity, add simple practical gardening tools. Keep a clean readable silhouette and stage one base for user review before generating animations. No playable roster expansion. |

| D91 | User likes Sprig overall but finds his head too literally mailbox-like. Refine the head into a primarily robotic housing/face, retaining only a subtle rounded-box reference. Remove literal postal details; preserve the body, tools, colors and pose. Supersedes D90’s strong mailbox resemblance. Stage v2 for user visual review before animations. |

| D92 | User likes Sprig’s revised head but finds the claw holding the small shovel awkward. Replace that claw hand itself with a directly wrist-mounted garden trowel end-effector; no hand gripping a separate handle. Preserve the other claw, tools, revised head, body and palette. Stage v3 for user review before animation work. |

| D93 | User reports Sprig v3 still appears to hold the shovel. Remove the entire handle/shaft (Portuguese cabo) and gripping claw/fingers: the broad shovel blade IS the hand and connects directly, flush to the forearm/wrist without an intervening rod. Preserve the remaining design; stage v4 for user visual review. |

| D94 | User requests that Sprig’s other hand also BE a gardening tool: replace the remaining claw with the cultivator currently hanging at his waist, directly attached without a handheld handle/shaft. Remove the redundant waist-mounted copy; preserve the shovel-blade hand and all other design. Stage v5 for user review. |

| D95 | User approves Sprig’s dual-tool-hand design and requests one final color correction: head housing and torso shell must share the same enamel color/material. Match head paint to existing torso palette, preserve face/visor details, shapes and all tools. Stage v6; no animation generation is part of this correction. |

| D96 | User approves Sprig base-v6 and authorizes idle, victory, one shared magical casting animation and head-and-shoulders portrait/icon. Preserve matched head/torso paint and directly integrated shovel/cultivator hands without handles or fingers. Generate each animation as one complete clip; no automatic cleanup. User-only visual review; stage assets without playable roster expansion. |

| D97 | User reopens Andromoss for one last from-scratch attempt with a much simpler design and permits removing glasses in favor of big wide-open eyes. Generate one fresh base first: normal adult head/body proportions, rigid skin-continuous crown, simple gills/tail; proposed simplified jacket and removal of hook/chain/rear braid reduce clutter. Tight palette, broad flat shapes and minimal shading. User reviews before new animations; preserve old runtime assets until replacement approval. |

| D98 | User approves simplified Andromoss base-v6 and authorizes fresh idle, expressive victory, one shared casting animation and matching icon. Generate each animation as a full clip from this same base, preserving the simple fixed material palette, adult normal-head proportions and exposed eyes. No cleanup or multi-batch polishing. New files replace existing presentation slots once generated and technically checked; user retains visual review. Preserve historical versions/provenance. |

| D99 | User approves/adopts the fresh simplified Andromoss animations and icon and requests deferring remaining new-character art to use the assets already created. All five current art sets are approved: Sir Champignon, Andromoss, Captain Bramble, Duskmantle and Sprig. Defer Mallow/Miyaya/Rootbeard artwork and any new PixelLab generation. Scope of playable roster expansion is being clarified separately; current live pair remains Champignon/Andromoss until new kits are implemented. |

| D100 | User explicitly selects **make all five playable**: Champignon, Andromoss, Captain Bramble, Duskmantle and Sprig. Supersedes initial two-character scope and art-only staging for these three. Adopt existing approved sprites/icons/homes/music across AI/local/online; implement distinct four-spell kits using the adopted concepts. Exact new values are provisional implementation defaults, not user-approved final balance. Preserve separate per-spell effect placeholders, simulation independence and bot diagnostics. Remaining three characters/art stay deferred. |

| I01 | Five-roster implementation defaults: preserve the original pair’s numeric rules; add bounded extra-hit mole armor/guards (Bramble), marked-miss/camouflage/manual-hit siphon (Duskmantle), and one-time target extension/column or board automation/cleanse (Sprig). Detailed values and limitations are in prototype.md and game.yaml. These are provisional engineering choices, not final user-approved balance. A 1,500-match diagnostic has zero caps but Bramble remains strong under current bots. Per-tier coverage and strategy bias are preserved in balance-roster-review.md before further tuning. |

| D101 | User requests balance changes: swap Champignon Clean Sweep/Mushroom Guard (Sweep=1 star, Guard=2), give Clean Sweep an active duration; remove empty-enemy fallback shields from Andromoss’s copy/theft; confirm Double Trouble targets the enemy; swap Bramble Tin Caps/Bramble Brace (armor=1 star, guard=2). Sprig automation must hit all target types, collect stars and repeat strikes for armored moles at 250 ms/action; Garden Clockwork covers two columns. Increase diagnostics to at least 50–100 matches per hero/difficulty. Other spell durations remain unchanged. |

| D102 | User explicitly chooses **normal rabbit-hit penalties** for Sprig’s automation. Each automated rabbit hit subtracts the ordinary rabbit penalty unless a normal mistake guard absorbs it. This applies to both one-column and two-column automation. |

| I02 | Retune defaults: Clean Sweep runs for 3 active seconds, clears current/new moles/rabbits without points and preserves stars; Royal Cleanup shares this window plus its existing three 12-second guards. Sprig selects the busiest one/two columns by current target count with stable left-first ties, spends one global action each 250 ms, and uses one action per armor strike; mole clears retain the prior 6-point reward and stars use normal +25/+1-charge rewards. Empty theft still consumes charge. Benchmark default is 100 seeds: 200 games per distinct pairing and 100 mirrors per hero/level, 7,500 total. Before/after runs share seeds. Champignon’s bot is updated for the new roles so it avoids safe-target one-star sweep spam and reacts to real missed-target/armor/marked-target danger. No extra numerical tuning toward 50%. These durations/policies are provisional implementation choices. |

| D103 | User requests duration-based Bramble nerfs and Champignon improvements and prefers a versus matrix over aggregate per-hero win-rate tables. A pooled AI-level matrix can be the overview; retain underlying matchup/difficulty data so pooling does not hide counters. |

| I03 | Controlled duration-only trials keep all hit counts, scoring rules, costs and bot policies fixed, with 100 seeds per pairing/level. Test armor 4 / sweep 3, armor 6 / sweep 1, armor 4 / sweep 1, armor 3 / sweep 1 and armor 2 / sweep 1 seconds against the saved armor 6 / sweep 3 reference. Adopt **armor 2 / sweep 1** as the best tested improvement across every pooled Champignon and Bramble matchup. This changes Clean Sweep/Royal Cleanup clearing to 1 active second and Tin Caps/Heavy Harvest armor to 2 active seconds. Other durations stay as before. Main report is a weighted pooled versus matrix (600 completed games/cell); mark spreads above 20 percentage points across levels and retain full level detail. Bramble remains dominant and Champignon Easy tier 3/4 coverage is still absent; no claim of final balance. |

| D104 | User rejects pooling as the primary balance view: show separate Easy, Medium and Hard versus matrices. Lasting spell windows must be at least 3 active seconds; weaken effects through strength/target limits instead of 1–2-second durations. Instant resource transfers/extensions, cast freezes, warnings and action intervals are not lasting spell windows. Consumable guards can be spent before their window expires. |

| D105 | Sweep must use ordinary hit rules: mole points, normal rabbit penalty/guard absorption, stars award points and spell charge. The previous zero-point safe-clear behavior was an implementation assumption, not an agreed requirement. Use the same base hit rewards for Sprig automation; armor requires separate strikes. |

| I04 | Restore Clean Sweep/Royal Cleanup and Bramble armor windows to 3 seconds. Sweep hits current targets immediately then every 250 ms, including arrivals; star charge caps at four and the casting display retains the spent tier. Provisional Bramble limits: Tin Caps affects at most two moles, Heavy Harvest four, across current targets/new arrivals. Extra-hit strength remains one/two. Bots recognize safe multi-mole harvest opportunities as well as emergencies. Full normal-hit sweep is powerful in diagnostics; do not silently reduce its rewards to force 50%. See reports/balance-normal-hits-review.md. These supersede I02/I03 where conflicting. |

| D106 | User corrects intended spell scope: Champignon’s one-star Clean Sweep affects **one column**, not the full board. Andromoss’s Borrowed Spark **steals every enemy star**, rather than copying one; an empty enemy meter wastes the cast. Normal hit rewards/penalties, four-star capacity, ward protection and existing timing remain. This supersedes the conflicting scope/resource assumptions in I04 and earlier notes. |

| I05 | Clean Sweep provisionally chooses the busiest column at cast time, with leftmost ties, and holds that column for the full three-second window. Uses 250 ms pulses and normal hit rules; Royal Cleanup keeps all three columns plus guards. Column selection is shared with Sprig and is visible in the effect placeholder and host snapshot. Borrowed Spark steals the enemy meter at hostile resolution after the existing 650 ms warning; transferred charge caps at four, no point reward and no empty-meter fallback. Other spells/costs/durations unchanged. New balance findings are in balance-column-theft-review.md; the full-board sweep diagnosis was based on the wrong scope. |

| D107 | User adopts tier-isolated balance trials, starting with one-star spells: one charge slot, only the one-star spell available. For later tiers the meter caps at that tier and only that tier can cast. Every bot casts immediately when full and cooldown-ready, without character-specific choice/probability or resource/ward usefulness checks. Preserve difficulty-dependent hitting, ordinary scoring/spawning and actual spell rules. Run separate Easy/Medium/Hard matrices, swapped sides and mirrors. Tune one thing at a time; no spell changes in the initial diagnostic. Sticky Fingers/Borrowed Spark assignment review is deferred. |

| I06 | Offline diagnostics use optional isolatedSpellTier on MatchOptions, shared simulation/bots, and `pnpm balance:roster --tier=1 --seeds=100 --seed=20261119`. Omit --tier for ordinary four-slot play and existing strategy; no menu/network variant added. Uniform casts bypass hit-action scheduling but respect phase/pause/cast freeze/cooldown. Partial charge cannot cast; both star pickup and theft respect the selected capacity. Track observed rewards/penalties, exact guard prevention, stolen vs received stars and empty thefts; do not claim counterfactual offensive-spell value. Separate reports preserve prior full-kit results. |

| D108 | User approves replacing immediate casting in the one-star isolated tests with useful-opportunity conditions and a shared random decision delay across difficulties. Sweep: useful/urgent targets in its selected column; theft: enemy has stars; armor: enemy has unarmored moles; mark: enemy has unmarked moles; tending: own moles approaching escape. Reconsider when the opportunity disappears. Preserve powers; postpone difficulty-dependent casting delays until complete-AI tests. |

| I07 | Provisional one-star diagnostic delay is 300–700 active ms, sampled once per opportunity using independent seeded RNG; 200 ms visibility and 1,000 ms remaining lifetime define notice/urgency identically for every difficulty. Bots continue hitting during the wait, with independent hit-action timing. An identifiable target witness/column anchors a pending decision; loss/invalidity or round reset cancels it, and new opportunities get a fresh delay. Sweep avoids rabbit columns unless a mole is urgent and avoids renewing an active sweep; Tending requires an unextended mole. The opponent may spend stars during theft’s existing warning, so a valid cast can still resolve empty. Normal four-slot play/strategy stays unchanged. `--casting=immediate` preserves baseline reproduction; opportunity rules currently cover tier 1 only. No spell strength/cost/duration changes. |

| D109 | User authorizes slowing one-star Clean Sweep strikes and weakening Bramble’s one-star Tin Caps while fine-tuning the isolated tier-1 spells. Keep normal rewards/penalties, one-column Sweep and the three-second active-window floor; keep powers of other characters unchanged. |

| I08 | Test cadence 750/1500 ms and Tin Caps quota one independently, then together, using 100 seeds/pairing/difficulty and fixed opportunity policy. Adopt Clean Sweep **1500 ms** cadence (initial column hit retained), and Tin Caps **one mole** with one extra strike within the same three-second window. Royal Cleanup gets a separate unchanged 250 ms cadence; Heavy Harvest remains four moles/two extra strikes/3 s. Other powers, cast decisions, point values and timings unchanged. These are provisional nerfs, not a balanced roster: Sweep cadence alone has mixed Hard results and Champignon remains favored. See balance-tier-1-strength-review.md. |

| D110 | When suggesting any spell change, always state its current effect/duration alongside the proposal so the user can compare without recalling prior messages. |

| D111 | User confirms stars and rabbits must follow the wave along with moles. Faster peaks should allow much shorter target lifetimes, around 0.5 s as a tuning candidate. It is acceptable for Easy AI to be unable to react at the fastest pace. Do not silently impose an Easy-reaction floor on target lifetime. |

| D112 | User sets the tuning sequence: visualize the wave first; tune pacing next; then reaction times; then casting delay; finally spell strength. Defer further spell adjustments while discussing pacing. The earlier preference for faster Sweep and at least three Tin Caps moles is retained for the later spell pass, not applied during this visualization step. |

| I09 | The wave explainer compares actual current target lifetimes with an explicitly unimplemented draft: late base 600 ms, lifetime floor 500 ms, shared lifetime for mole/rabbit/star; retain current 12 s build / 5 s peak / 8 s recovery, 60 s ramp and spawn rhythm. At equal scores the draft peaks reach about 528 ms. Show current stars separately at 2200 ms to expose their present mismatch. The plot excludes jitter, occupancy, spell effects and score-based catch-up; it is a pacing envelope, not a simulated spawn log. No game settings/AI/spells changed for this preview. |

| D113 | User permits dropping selected middle frames from rise/retreat during fast waves, rather than requiring all eight frames at every speed. Preserve recognizable start/end poses and complete rise/retreat phases; dancing can shorten/disappear. Consider slower devices when choosing animation playback and frame budgets. |

| I10 | Proposed, not yet implemented/adopted FPS values: target 60 FPS rendering with readability at 30 FPS, and use up to 20 distinct target-animation frames/s (matching the existing 50 ms simulation tick). Candidate fast windows: 0.5 s = five rise + five retreat frames; 0.3 s = three rise + three retreat frames, selecting endpoints plus intermediate poses. Keep gameplay lifetime time-based and independent of actual render FPS. These are visualization/animation recommendations; pacing is still the first tuning phase per D112. |

| D114 | User approves adaptive reduction of middle rise/retreat frames, with all original frames retained and automatically restored when minimum/actual target lifetime is increased. Longer hit windows must not require regenerating assets or manually rebuilding animation clips. |

| I11 | Implement frame selection in the renderer as a pure function of each target’s total lifetime, using a 20-distinct-frames/s budget and the 50 ms simulation cadence. Reserve rise/retreat inside the same hit window, select evenly spaced original poses with both endpoints preserved, and use leftover time for dancing. At 300/500/800 ms, select 3/5/8 poses per phase. Full source atlases and hit animations remain intact. Current wave/lifetime/AI/cast/spell settings are unchanged; faster lifetimes remain a separate pacing decision. |

| D115 | User authorizes steps 1–3: apply the approved shared lifetime wave (moles/rabbits/stars, fastest peaks around 0.5 s), keep existing AI reaction settings, and run spell-free measurements by wave phase. Do not tune AI reaction, casting delay or spell strength in this pass. Easy/Medium may fail at the fastest pace. |

| I12 | Applied late base 600 ms / floor 500 ms, keeping 12 s build / 5 s peak / 8 s recovery, 60 s ramp, spawn schedules, score-pressure rules and AI values. All newly spawned target kinds/origins use the same per-board lifetime curve, removing separate star lifetime and magic-target 1450 ms cap. At equal scores late peak =528 ms, calm endpoint =648 ms; score catch-up can reach the 500 ms floor. Fixed two-minute offline reaction sessions disable casts and score victory only in explicit diagnostic mode so every AI reaches late peaks; ordinary matches keep normal victory. Run 100 sessions per five heroes/three difficulties (1,500 total); hero equivalence and zero casts checked. Outcome cohorts follow birth phase and fully drain; reports/reaction-pacing.md/.json retain counts, parameters and source hash. Easy cannot hit any late target, not just peak targets, because the whole late envelope is below its minimum reaction time; record for review, do not silently compensate. |

| D116 | Updated project instructions require pooled versus matrices as the main balance overview, retaining all difficulty-specific diagnostics and flagging large spreads/observed favored-side flips. This supersedes the earlier presentation preference in D104; aggregate per-hero win tables do not replace versus matrices. |

| D117 | User requests a casting trial: 100 ms on-board visibility, 200–400 ms base decision delay, with candidate Easy×3 / Medium×2 / Hard×1 scaling. Interpret multipliers as decision-delay-only, keeping visibility shared. Compare current baseline, faster unscaled control and requested scaled profile with fixed seeds and unchanged pacing/reaction/spells. |

| I13 | Three isolated tier-1 profiles baseline/fast/scaled, selected through --cast-profile. Baseline remains visibility200 ms / delay300–700 ms / multipliers1; fast uses100 /200–400 /1; scaled uses100 /200–400 /3,2,1. Target-based notice+decision ranges700–1300 /500–900 /300–500 ms; theft watches enemy charge directly without extra target visibility. Preserve separate delay RNG, witness cancellation and frozen clocks. Profiles are experimental: ordinary full-kit strategy and default baseline unchanged. Each ran7,500 matches (22,500 total), no caps; full raw outcomes/counters/pooled and per-level matrices are in casting-*.json/.md, comparison in casting-delay-review.md. Completed opportunities are valid at cast start, not guaranteed useful after warning; scheduled/cancelled/completed/pending totals are reconciled. No spell power adjustment. |

| D118 | User adopts the tested scaled casting profile as the starting point for isolated one-star strength tuning, asks for tests/matrices and repeated reminders of current spells. Hold pacing, reaction settings and adopted casting delays fixed before further power changes. |

| I14 | Make scaled the single default for one-star opportunity diagnostics (100 ms target visibility, 200–400 ms base decision delay ×3/×2/×1 Easy/Medium/Hard). Keep explicit baseline/fast profiles for reproduction, keep higher tiers’ immediate baseline and ordinary full-kit heuristics unchanged until their own pass. Default adoption changes no spell strength; current one-star Sweep remains immediate +1500 ms pulses/3 s and Tin Caps remains one mole/one extra hit/3 s. The user’s preferred faster Sweep/at least three Tin Caps moles remains pending for the spell-strength pass. Run fresh100-seed default tournament and compare all 7,500 outcomes with prior explicit-scaled trial. |

| D119 | User corrects Clean Sweep: hit the busiest column immediately and keep hitting whatever appears there throughout 3 active seconds, with normal rewards/rabbit penalties. A 1500 ms strike interval is not the intended mechanic and must be removed. User asks for current Ominous Bud/Gentle Tending durations and trials of longer values. |

| I15 | Clean Sweep now strikes once per simulation tick after spawns, including same-update arrivals; initial strike remains immediate. Fixed column, normal armor/guard/scoring, pause/freeze and 3 s cutoff remain. Royal Cleanup remains 250 ms/full-board. Trial Ominous Bud 8→12 s and Gentle Tending instant extension 700→1200 ms separately/together, holding other powers/pacing/reaction/scaled casting fixed. Split tier-1 mark duration from Withering Pact’s unchanged 8 s. Adopt longer values provisionally for playtesting, not as proven buffs: all 7,500 Bud-only outcomes exactly match corrected-Sweep control, and Tending results are mixed under the current one-attempt-per-target bot accuracy policy. Four 7,500-match trials plus exact adopted rerun=37,500, no caps. Comparison/current matrix/spell reminders in continuous-sweep-duration-review.md and balance-tier-1.md. No hidden extra marks or lasting extension aura; Tin Caps remains one mole pending its later pass. |

## Current proposals, not yet confirmed

- Current roster: the five approved heroes per D100; the original two-character implementation milestone is historical.
- 3×3 boards and best-of-three matches. Victory uses the user-confirmed score-difference threshold, not health.
- Four collectible stars maximum; one cast button uses the spell matching the current star count and consumes those stars.
- The earlier PartyServer backend proposal is superseded by D25. Private invites use PeerJS signaling and player-hosted WebRTC matches; no gameplay backend is deployed.
- Mobile delivery is the ordinary browser website per D26. PWA/native packaging is deferred.
- Desktop shows both boards; D30 removes the mobile opponent statistics strip in favor of the shared bar/names/trophies.
- Normal-reward automatic hits per D105, readable spell warnings, limits on overlapping disruption, and distinct tactical roles for each spell tier. Exact rules remain to be specified.

## Open before implementation

1. Playtest the initial two characters.
2. Review the match rules and star/casting defaults in prototype.md.
3. Tune the winning score difference X, point awards/penalties, and spawn progression.
4. Detail the first two characters' spells: durations, targeting, rewards, damage, counters, stacking, and star-steal behavior.
5. Decide input bindings, mouse/touch support, simultaneous hits, and cross-device competitive policy.
6. Internet/mobile network playtesting, relay provisioning if needed, and competitive latency tuning. Private invites, 30-second reconnect grace, and host-exit behavior are implemented; see online.md.
7. Confirm mobile delivery scope and minimum supported screen sizes/orientations.
8. Define the completion criteria for the two-character release before expanding the roster.
9. Score-difference semantics are now confirmed; X remains a provisional tuning value.

## Implementation status

Local and AI play are implemented. See prototype.md for exact defaults and known imbalance. Balance runs use the real simulation, paired seeds, swapped sides, and tier-by-tier spell coverage. Private player-hosted online matches are implemented; real cross-network QA, optional relay provisioning remain pending. PWA delivery is deferred.

See status.md for the complete implementation audit and presentation.md for verified details from the oldest source code.

## Research facts

- The original repository contains eight named character artwork files.
- Personagem.cpp only assigns two generic test loadouts; it does not establish named character spell sets. Written instructions and test code differ.
- The original written rules describe 3×3 boards, penalties for missed moles/empty hits/rabbit hits, up to four stars, and first to two round wins.
- The checked shinobi-arena package includes React 19, Phaser 4, TypeScript, Vite, pnpm, Vitest, and Playwright. A physics dependency exists there; this game has no identified need for one.
- PartyKit's official migration guide directs new projects to PartyServer because its managed platform closed in October 2026: https://docs.partykit.io/guides/migrate-to-partyserver/
