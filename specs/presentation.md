# Character homes, round bar, and board effects

## Animated shared bar

Restore the original shared blue/red presentation across the top HUD. Blue always represents the left/local player (Player 1 locally); red represents the opponent. Keep numeric points hidden. Names sit at the left/right extremes immediately below the bar; there is no center leader caption.

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

The user authorized implementing the portrait/cast playback pipeline now, with final assets deferred. Portraits load in the lobby, falling back to emblems. D30 removes persistent in-game portraits. Each character/tier has its own cast sheet metadata: path, frame size/count/columns, fps, hold duration, and optional sound.

A successful cast emits tier, player, logical time, and round before consuming stars. HUD cameo playback uses that event once, preserves aspect ratio, freezes on pause, clamps the final frame, and ignores old-round events. Reduced motion uses a static pose. The cameo is art-only and occupies the star-control region, never covering holes, capturing input, delaying spells or stopping the simulation. Spell/character captions and emblem fallbacks are removed from play; missing/invalid sheets render nothing. Browser tests supply valid/invalid synthetic sheets to verify both paths. Actual portraits and cast art are still absent.


## Star containers and round trophies

Use the original estrelinhas.bmp sheet (seven 60×200 columns, five charge rows) with magenta transparency. The default HUD uses the intact original vertical 60×200 column, with charge building from the small bottom star toward the large top star. Narrow portrait lanes can recompose the four slots horizontally below the board, ordered from the first small star to the fourth large star, without stretching or cutting rotating tips. Each charge change plays frames 0–1 once, then loops frames 2–5 at 12 fps, matching Fase.cpp and the later browser SpecialBar. Frame 6 is the old active-magic red pose and is not used as a charge state. The mobile opponent statistics panel is removed. On a single-board view only the local star container is shown. Star animations follow logical match time and freeze on pause; reduced motion selects static frame 2. The star container itself is the casting button, including keyboard focus/activation; R/numpad+ still cast normally. There are no Unicode star replacements in the HUD or cast captions.

Use the original trofeu.bmp sheet (six 150×75 columns, three rows representing 0/1/2 wins). A pair of trophy indicators sits immediately below the left/right ends of the shared score bar, replacing the player-header diamonds. The opponent frames are mirrored, matching the oldest game. Winning a round updates that player's trophy row; counts persist into subsequent rounds and reach two at match victory. Zero wins uses the blank row, not an invented placeholder. Layout permanently reserves this row so gaining a trophy never moves the boards.

Every round/match verdict shows a large original trophy in the central result card. It fades in over 600 ms and plays appearance frames 0–1, then spins through frames 2–5 at 12 fps. Presentation time keeps it moving after the simulation stops at round end. HUD trophies pause with the game. Reduced motion removes the fade and keeps a static trophy pose. No trophy animation changes scores, adds a delay to magic, or advances rounds automatically.


## Minimal play screen (D30)

During active play the visible HUD contains only the shared bar, outer-end character names, per-side trophies and star controls alongside the board(s). Remove numeric score panels, portrait/name headers, spell names/descriptions, wave/messages, effect-tag text, keycaps, VS labels, online latency text and the permanent toolbar. The score bar doubles as the menu control; Escape remains supported. AI/local modes pause, while online menus keep the match running. Sound, exit and resume controls appear only in the pause/results overlay. Countdown, victory and connection-interruption overlays remain transient. The lobby explains tapping stars to cast and tapping the bar to pause.

Layout uses the released header/footer space for uniformly larger boards. Desktop columns stand outside each player's board; narrow portrait layouts put the horizontal control below the board, with no overlap against holes, roots or trophies. Phone landscape can use a horizontal strip beside the board to preserve target size while enlarging the HUD. Source hit-region bleed above the garden is included in the top clearance even at 4K sizes. Cosmetic homes/music and character spell logic are unchanged.


## Readability sizes and animation audit (D31)

Per-side HUD trophies scale from 56×28 to 112×56 on phone-sized screens and 168×84 on desktop. Name fonts scale from 9 to 18 px on narrow phones, and 10 to 30 px on desktop, with corresponding reserved line/trophy space. Vertical star columns grow from a nominal 64 to 96 px wide where space permits; horizontal strips grow from 240 to up to 320 px wide. Short phone landscape layouts can place a horizontal strip beside the board so the enlarged header does not make the holes too small. Compact victory cards remain below the shared bar/trophies in landscape.

The original target atlas rows are alive/idle (including the dancing movement), hit, miss/hide, and raise, each with eight frames per kind. Rising and hiding now traverse their frames in order relative to target age/expiry, instead of taking hiding frames from global time. They adapt to the existing target lifetime and allow at least eight simulation ticks per transition; reaction windows and score rules do not change. Idle loops at 12 fps. Hits use all eight frames at 12 fps, including rabbit hits and shielded rabbit penalties. Events carry the actual target kind, avoiding guesses from the last rendered hole. An independent hit-feedback sprite finishes its sequence even if a new target appears; it becomes translucent over the new target without delaying or hiding gameplay.

Star-container charge changes already play their two-frame appearing intro at 12 fps and then the four-frame idle loop. This is independent from the rising/hiding animation of collectible stars inside holes. Reduced motion uses static poses; pause freezes logical target/charge animation. Match winners now show the correct original named hero illustration with celebratory motion, or a dedicated victory sheet when supplied. Defeat clips remain deferred. Final hero cast sheets remain asset slots.


## Audio and match ending (D32)

All 33 recovered effect files/variants are enabled through a manifest: browser spawn/hit/rabbit/star/cast/game-over samples plus the oldest WAV voice/impact variations. Play one spawn cue per snapshot rather than doubling simultaneous board offers. Explicit event reasons distinguish empty mistakes from missed moles; rabbit penalties retain their distinct hit cue. Hit and impact sounds can overlap, sweep casts have their original effect, and a match-over edge plays the game-over cue once. Effect voice rotation is cosmetic and never touches simulation RNG. Web Audio buffers are preloaded/decoded and capped at 12 simultaneous sources; unsupported contexts use a bounded native-audio fallback. Muted/paused/interrupted events are consumed without later replay, pending decoded effects are cancelled on silence/exit, and custom per-tier cast audio remains supported.

Audio starts enabled on Enter/Create/Join gestures. Web Audio is unlocked immediately and the same native music element is primed for asynchronous online matchmaking. Home music retains its per-character path/shared fallback and configurable looping. Mute remains in the menu. The original non-browser MIDI collection is not bundled; the configured shared MP3 is currently audible until final home music files are supplied.

Results overlay the final arena without unmounting its canvas or replacing its home background. Round wins show the spinning trophy; match wins show the winning hero. Both retain the score bar, boards and trophies under a fully transparent overlay (no color fill, image or blur), with gameplay inputs disabled. After four real-time seconds a fresh key, tap/click or controller press starts the next round or returns to setup. Early/held input is ignored. Match results take precedence over a peer leaving. Audio and network resources release on return to setup.


The selected pairing is Almendra for titles and character names, with Literata for menus, controls and supporting text. Fonts are bundled locally with their SIL Open Font Licenses, so loading them needs no external font service. Literata uses its variable weight/optical-size face; Almendra includes regular and bold.


## Round results and menu panels (D34)

Round and match victories share the same winner/prompt overlay, with a round trophy or winning hero respectively. Both ignore early input and reveal the prompt after four seconds; a fresh key, tap/click or gamepad press then starts the next round or returns to setup respectively. The final boards, score bar and trophies remain visible underneath; gameplay is frozen. Either online player can advance; connection interruption still shows the recovery/exit screen.

Setup, online and pause/countdown menu panels have transparent backgrounds, no borders and no shadows. Character cards also have transparent surfaces, with a selection outline identifying the chosen hero. Form controls and action buttons retain their visual affordances. The page/arena backdrop remains visible behind menus.


## Mobile charge, controls and hero victory (D35)

Single-board layouts show a compact read-only original star meter for the rival under the red side of the shared bar. Portrait reserves its space; landscape places it beside the bar to preserve hole targets. Desktop/two-board layouts already show each board’s stars.

Escape or tapping the bar opens a transparent borderless menu. AI/local play pauses; online play continues behind its local menu. Resume, Mute/Unmute, Quit, keyboard grids/cast keys, touch guidance and both selected heroes’ four spells are included. Connection interruption uses the same menu with frozen-play status, disabled Resume and automatic recovery. Mute and Quit remain available. Long content scrolls within the viewport on small/short screens.

Original named hero illustrations from Personagens/SIR CHAMPIGNON.bmp and ANDY.bmp are converted with magenta transparency. Their looping celebratory motion is a temporary presentation, not recovered multi-frame hero animation. The unrelated prototype Fx/Personagem sheets are not assigned to named heroes. Dedicated 8-frame victory sheets can be dropped into each hero’s victory.png slot; missing/invalid sheets use the animated illustration. Reduced motion disables celebration movement and uses a static sheet frame.


## Clear result overlays and large countdown

Round/match result surfaces have no background fill, background image or backdrop filter. Keep the original canvas mounted and rendered beneath the text/art, with board pixels unobscured away from result content. Countdown uses a 50 px round label (previously 10 px) and a 225 px numeral (previously up to 45 px), capped at 55% viewport height on short landscape screens. Both stay centered without a panel, fill or blur. Browser coverage verifies the same canvas identity, unchanged rendered board patches with/without the result overlay, nonblank artwork, frozen simulation time, exact countdown sizes and viewport fit. Screenshots cover desktop, phone portrait and phone landscape.
