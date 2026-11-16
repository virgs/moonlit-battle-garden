# Character homes, round bar, and board effects

## Animated shared bar

Restore the original shared blue/red presentation across the top HUD. Blue always represents the left/local player (Player 1 locally); red represents the opponent. Keep numeric points secondary.

The original Life.cpp animates a shared life meter; Fase.cpp links the old players' life totals. The remake currently has independent health and health-first win rules. The restored HUD does not silently change those mechanics: it shows health advantage, using a small score-based displacement when health is tied. At round end it settles on the actual winner, or the center for a draw. It resets to the center for the next countdown.

The bar reuses Molecide's four-frame life.png texture, with a red tint for the opponent, a smoothly moving boundary, and a fixed center marker. Pause freezes the liquid animation. Reduced-motion preferences disable it. Layout reserves a dedicated strip below match controls on every viewport.

## Board decoration

Reuse the original 16-frame root.png sheet as four four-frame dust/root motifs attached beneath each visible board. Decorations follow the board's position and uniform scale. They have no collision, hit areas, or influence on randomness. Animation follows simulation time so pause freezes it; reduced-motion mode uses static poses.

## Character homes

Every character should eventually own a distinctive background and music track. A match's stage always belongs to one of the current participating characters and is purely cosmetic: no change to rules, pacing, spell strength, AI difficulty, score, or hit geometry.

Current default: choose an eligible owner deterministically at match creation using a separate seed hash, and keep that home across the match's rounds. A future online server must announce the chosen home to both clients rather than deriving it from client-local player-side order.

Initial home names are provisional: Sir Champignon's **Sporelight Keep** and Andy's **Moonlit Hideout**. Both currently reuse background-castle.png with different color tints and share backgroundMusic.mp3. These are temporary assets, not completed distinct home illustrations or soundtracks. Backgrounds scale uniformly to cover the viewport, cropping rather than stretching. Music starts only through the Sound control, loops quietly, pauses with the game/round end, and stops on exit or mute.

Distinct artwork/music for the two initial characters remains for the asset pass; extend this system to the six remaining characters later.

## Spell-cast character animation

Character-specific cast animations are desired but explicitly deferred for now. Plan for a recognizable character flourish tied to the spell event. This pass does not generate character animation assets or replace them with claims of finished animations.
