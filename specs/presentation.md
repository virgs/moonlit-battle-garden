# Character homes, round bar, and board effects

## Animated shared bar

Restore the original shared blue/red presentation across the top HUD. Blue always represents the left/local player (Player 1 locally); red represents the opponent. Keep numeric points secondary.

The user clarified the mechanic: the bar represents the difference between two scores. Equal scores mean 50/50, and a lead of X ends the round with one color filling the bar. The current formula is bluePercent = clamp(50 + 50 × (blueScore − redScore) / X, 0, 100). X is configurable and starts at a provisional 100. Scores may be negative; absolute totals do not decide the round. There is no independent health or linked-life pool. Scores and bar reset each round. The finished bar remains visible above the results scrim while its original easing completes.

The bar now uses the oldest game's actual efeitoLife.pcx (1010×164, four 41-pixel rows) and bordalife.pcx (499×45), converted to PNG with Allegro's magenta transparency mask. Life.cpp reveals a single 493-pixel source window at x=5+500×(1-blueShare), not tiled images or separate blue/red strips. The source window shifts through the original joined blue/red sheet, with the four animation frames at the original 12 fps and incremental smoothing. The border and viewport scale together uniformly, keeping one bar at its native aspect ratio. Pause freezes animation; reduced motion uses a static frame and immediate updates. Separate per-player health bars are removed; numeric points remain.

## Board decoration

The oldest version draws static roots within TabuleiroProfissional.pcx and overlays terra.pcx falling earth (four 45×45 frames). Both originals are now used, replacing the misplaced animated root.png motifs from the later game.

Fase.cpp places boards at (50,200)/(450,200) and earth at (110,560), (610,560), and (710,560). Therefore the restored board-local earth positions are left (60,360), right (160,360) and (260,360). The left sequence is reversed and the right sequences are offset, matching the old code. The opponent's underground strip is mirrored so root placement also differs, while the upper board and hole geometry remain unchanged. Earth and roots scale uniformly with the board; layout reserves the falling-earth tail before the bottom HUD. They have no collision or influence on game randomness. Pause/reduced motion freeze decorative animation.

## Character homes

Every character should eventually own a distinctive background and music track. A match's stage always belongs to one of the current participating characters and is purely cosmetic: no change to rules, pacing, spell strength, AI difficulty, score, or hit geometry.

Current default: choose an eligible owner deterministically at match creation using a separate seed hash, and keep that home across the match's rounds. A future online server must announce the chosen home to both clients rather than deriving it from client-local player-side order.

Initial home names are provisional: Sir Champignon's **Sporelight Keep** and Andy's **Moonlit Hideout**. Both currently reuse background-castle.png with different color tints and share backgroundMusic.mp3. These are temporary assets, not completed distinct home illustrations or soundtracks. Backgrounds scale uniformly to cover the viewport, cropping rather than stretching. Music starts only through the Sound control, loops quietly, pauses with the game/round end, and stops on exit or mute.

Distinct artwork/music for the two initial characters remains for the asset pass; extend this system to the six remaining characters later.

## Spell-cast character animation

Character-specific cast animations are desired but explicitly deferred for now. Plan for a recognizable character flourish tied to the spell event. This pass does not generate character animation assets or replace them with claims of finished animations.
