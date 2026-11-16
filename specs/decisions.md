# Decisions and open questions

Last updated: 2026-11-16.

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

## Current proposals, not yet confirmed

- Initial implementation pair: **Sir Champignon and Andy**, following the recommendation and authorization to start; these are the current prototype defaults.
- 3×3 boards, survival through health, and best-of-three matches, following the original game.
- Four collectible stars maximum; one cast button uses the spell matching the current star count and consumes those stars.
- PartyServer on Cloudflare Durable Objects, with one authoritative room per online match. This is the recommended backend, not a finalized hosting decision.
- Installable mobile browser game/PWA first; native store packaging later if requested.
- Desktop shows both boards; mobile includes a compact opponent status strip.
- Safe automatic clearing, readable spell warnings, limits on overlapping disruption, and distinct tactical roles for each spell tier. Exact rules remain to be specified.

## Open before implementation

1. Playtest the initial two characters.
2. Review the match rules and star/casting defaults in prototype.md.
3. Define health, scoring, combos if any, spawn progression, and round/draw rules.
4. Detail the first two characters' spells: durations, targeting, rewards, damage, counters, stacking, and star-steal behavior.
5. Decide input bindings, mouse/touch support, simultaneous hits, and cross-device competitive policy.
6. Confirm online backend and initial online flow (suggested: private invite rooms), disconnect handling, and timing tolerance.
7. Confirm mobile delivery scope and minimum supported screen sizes/orientations.
8. Define the completion criteria for the two-character release before expanding the roster.

## Implementation status

Local and AI play are implemented. See prototype.md for exact defaults and known imbalance. Balance runs use the real simulation, paired seeds, swapped sides, and tier-by-tier spell coverage. Online and PWA delivery remain pending.

## Research facts

- The original repository contains eight named character artwork files.
- Personagem.cpp only assigns two generic test loadouts; it does not establish named character spell sets. Written instructions and test code differ.
- The original written rules describe 3×3 boards, penalties for missed moles/empty hits/rabbit hits, up to four stars, and first to two round wins.
- The checked shinobi-arena package includes React 19, Phaser 4, TypeScript, Vite, pnpm, Vitest, and Playwright. A physics dependency exists there; this game has no identified need for one.
- PartyKit's official migration guide directs new projects to PartyServer because its managed platform closed in October 2026: https://docs.partykit.io/guides/migrate-to-partyserver/
