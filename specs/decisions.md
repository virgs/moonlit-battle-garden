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

## Current proposals, not yet confirmed

- Initial implementation pair: **Sir Champignon and Andy**, following the recommendation and authorization to start; these are the current prototype defaults.
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
