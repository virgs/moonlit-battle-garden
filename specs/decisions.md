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

## Current proposals, not yet confirmed

- Current roster: the five approved heroes per D100; the original two-character implementation milestone is historical.
- 3×3 boards and best-of-three matches. Victory uses the user-confirmed score-difference threshold, not health.
- Four collectible stars maximum; one cast button uses the spell matching the current star count and consumes those stars.
- The earlier PartyServer backend proposal is superseded by D25. Private invites use PeerJS signaling and player-hosted WebRTC matches; no gameplay backend is deployed.
- Mobile delivery is the ordinary browser website per D26. PWA/native packaging is deferred.
- Desktop shows both boards; D30 removes the mobile opponent statistics strip in favor of the shared bar/names/trophies.
- Safe automatic clearing, readable spell warnings, limits on overlapping disruption, and distinct tactical roles for each spell tier. Exact rules remain to be specified.

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
