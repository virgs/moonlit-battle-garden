# Character homes, round bar, and board effects

## Animated shared bar

Restore the original shared blue/red presentation across the top HUD. Blue always represents the left/local player (Player 1 locally); red represents the opponent. Keep numeric points secondary.

The user clarified the mechanic: the bar represents the difference between two scores. Equal scores mean 50/50, and a lead of X ends the round with one color filling the bar. The current formula is bluePercent = clamp(50 + 50 × (blueScore − redScore) / X, 0, 100). X is configurable and starts at a provisional 100. Scores may be negative; absolute totals do not decide the round. There is no independent health or linked-life pool. Scores and bar reset each round. The finished bar remains visible above the results scrim while its original easing completes.

The bar now uses the oldest game's actual efeitoLife.pcx (1010×164, four 41-pixel rows) and bordalife.pcx (499×45), converted to PNG with Allegro's magenta transparency mask. Life.cpp reveals a single 493-pixel source window at x=5+500×(1-blueShare), not tiled images or separate blue/red strips. The source window shifts through the original joined blue/red sheet, with the four animation frames at the original 12 fps and incremental smoothing. The border and viewport scale together uniformly, keeping one bar at its native aspect ratio. Pause freezes animation; reduced motion uses a static frame and immediate updates. Separate per-player health bars are removed; numeric points remain.

## Board decoration

The oldest version draws static roots within TabuleiroProfissional.pcx and overlays terra.pcx falling earth (four 45×45 frames). Both originals are now used, replacing the misplaced animated root.png motifs from the later game.

Fase.cpp places boards at (50,200)/(450,200) and earth at (110,560), (610,560), and (710,560). Therefore the restored board-local earth positions are left (60,360), right (160,360) and (260,360). The left sequence is reversed and the right sequences are offset, matching the old code. The opponent's underground strip is mirrored so root placement also differs, while the upper board and hole geometry remain unchanged. Player.cpp::mudaCor identifies pure green RGB(0,255,0) pixels below source row 310 as a side-color mask. The renderer replaces those pixels with blue RGB(0,0,128) for local/left and red RGB(128,0,0) for the opponent, preserving all other artwork and alpha. Network seat/character do not affect side color. Earth and roots scale uniformly with the board; layout reserves the falling-earth tail before the bottom HUD. They have no collision or influence on game randomness. Pause/reduced motion freeze decorative animation.

## Character homes

Every character should eventually own a distinctive background and music track. A match's stage always belongs to one of the current participating characters and is purely cosmetic: no change to rules, pacing, spell strength, AI difficulty, score, or hit geometry.

Current default: choose an eligible owner deterministically at match creation using a separate seed hash, and keep that home across the match's rounds. The online host announces raw match options to both clients; the shared seed and raw character order select the same home before local-side remapping.

Initial home names are provisional: Sir Champignon's **Sporelight Keep** and Andy's **Moonlit Hideout**. Each now has a distinct configured background/music path in src/assets/config/presentation.yaml. Final files are absent; background-castle.png and backgroundMusic.mp3 remain fallbacks. The final background loads asynchronously after the playable scene, then switches in without delaying the countdown. It uses uniform cover scaling with configurable focal cropping and opacity. Home music has its own source, shared fallback, volume, and optional intro/loop segment points. Missing/unsupported audio falls back once; mute, pause, round end, and exit control its lifecycle.

Code and browser/audio fallback tests are ready; distinct artwork/music files remain for the asset pass. Extend the same manifest to the other six characters later. See public/assets/ASSET-CONTRACT.md for exact paths and formats.

## Spell-cast character animation

The user authorized implementing the portrait/cast playback pipeline now, with final assets deferred. Portraits load in the lobby and player HUD, falling back to emblems. Each character/tier has its own cast sheet metadata: path, frame size/count/columns, fps, hold duration, and optional sound.

A successful cast emits tier, player, logical time, and round before consuming stars. HUD cameo playback uses that event once, preserves aspect ratio, freezes on pause, clamps the final frame, and ignores old-round events. Reduced motion uses a static pose. The cameo occupies the player header and never covers holes, captures input, delays spells, or stops the simulation. Missing/invalid sheets show a short emblem/spell flourish. Browser tests supply valid/invalid synthetic sheets to verify both paths. Actual portraits and cast art are still absent.


## Star containers and round trophies

Use the original estrelinhas.bmp sheet (seven 60×200 columns, five charge rows) with magenta transparency. The horizontal HUD recomposes the four source star/container slots, ordered from the first small star to the fourth large star, without stretching or cutting rotating tips. Each charge change plays frames 0–1 once, then loops frames 2–5 at 12 fps, matching Fase.cpp and the later browser SpecialBar. Frame 6 is the old active-magic red pose and is not used as a charge state. The compact mobile opponent HUD uses the same art. Star animations follow logical match time and freeze on pause; reduced motion selects static frame 2. The dedicated Cast button remains the casting control. There are no Unicode star replacements in the HUD or cast captions.

Use the original trofeu.bmp sheet (six 150×75 columns, three rows representing 0/1/2 wins). A pair of trophy indicators sits immediately below the left/right ends of the shared score bar, replacing the player-header diamonds. The opponent frames are mirrored, matching the oldest game. Winning a round updates that player's trophy row; counts persist into subsequent rounds and reach two at match victory. Zero wins uses the blank row, not an invented placeholder. Layout permanently reserves this row so gaining a trophy never moves the boards.

Every round/match verdict shows a large original trophy in the central result card. It fades in over 600 ms and plays appearance frames 0–1, then spins through frames 2–5 at 12 fps. Presentation time keeps it moving after the simulation stops at round end. HUD trophies pause with the game. Reduced motion removes the fade and keeps a static trophy pose. No trophy animation changes scores, adds a delay to magic, or advances rounds automatically.
