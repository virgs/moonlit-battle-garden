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

Use the original trofeu.bmp sheet (six 150×75 columns, three rows representing 0/1/2 wins). Trophy indicators sit beneath each end of the shared score bar on phones; desktop indicators align above the star columns. The opponent frames are mirrored, matching the oldest game. Winning a round updates that player's trophy row; counts persist into subsequent rounds and reach two at match victory. Zero wins uses the blank row, not an invented placeholder. Layout permanently reserves this row so gaining a trophy never moves the boards.

Every round verdict shows a large original trophy in the central overlay; match verdicts use the winning hero sprite. It fades in over 600 ms and plays appearance frames 0–1, then spins through frames 2–5 at 12 fps. Presentation time keeps it moving after the simulation stops at round end. HUD trophies pause with the game. Reduced motion removes the fade and keeps a static trophy pose. No trophy animation changes scores, adds a delay to magic, or advances rounds automatically.


## Minimal play screen (D30)

During active play the visible HUD contains only the shared bar, character names above trophies, per-side trophies and star controls alongside the board(s). Remove numeric score panels, portrait/name headers, spell names/descriptions, wave/messages, effect-tag text, keycaps, VS labels, online latency text and the permanent toolbar. The score bar doubles as the menu control; Escape remains supported. AI/local modes pause, while online menus keep the match running. Sound, exit and resume controls appear only in the pause/results overlay. Countdown, victory and connection-interruption overlays remain transient. The lobby explains tapping stars to cast and tapping the bar to pause.

Layout uses the released header/footer space for uniformly larger boards. Desktop columns stand outside each player's board; narrow portrait layouts put the horizontal control below the board, with no overlap against holes, roots or trophies. Phone landscape uses a vertical star column to the left of the horizontally centered board. Source hit-region bleed above the garden is included in the top clearance even at 4K sizes. Cosmetic homes/music and character spell logic are unchanged.


## Readability sizes and animation audit (D31)

Per-side HUD trophies scale from 56×28 to 112×56 on phone-sized screens and 168×84 on desktop. Name fonts scale from 9 to 18 px on narrow phones, and 10 to 30 px on desktop, with corresponding reserved line/trophy space. Vertical star columns grow from a nominal 64 to 96 px wide where space permits; horizontal strips grow from 240 to up to 320 px wide. Short phone landscape layouts keep the vertical column left of the centered board. Compact victory cards remain below the shared bar/trophies in landscape.

The original target atlas rows are alive/idle (including the dancing movement), hit, miss/hide, and raise, each with eight frames per kind. Rising and hiding now traverse their frames in order relative to target age/expiry, instead of taking hiding frames from global time. They adapt to the existing target lifetime and allow at least eight simulation ticks per transition; reaction windows and score rules do not change. Idle loops at 12 fps. Hits use all eight frames at 12 fps, including rabbit hits and shielded rabbit penalties. Events carry the actual target kind, avoiding guesses from the last rendered hole. An independent hit-feedback sprite finishes its sequence even if a new target appears; it becomes translucent over the new target without delaying or hiding gameplay.

Star-container charge changes already play their two-frame appearing intro at 12 fps and then the four-frame idle loop. This is independent from the rising/hiding animation of collectible stars inside holes. Reduced motion uses static poses; pause freezes logical target/charge animation. Match winners now play dedicated PixelLab victory sprite sheets derived from the correct original named hero illustrations. Defeat clips remain deferred. Final hero cast sheets remain asset slots.


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

Original named hero illustrations from Personagens/SIR CHAMPIGNON.bmp and ANDY.bmp are converted with magenta transparency. They are retained as static error fallbacks; successful match victories use generated sprite frames. The unrelated prototype Fx/Personagem sheets are not assigned to named heroes. Both hero victory.png sheets are now supplied: nine 128×160 frames at 8 fps, including the original pose and eight PixelLab motion frames. Missing/invalid sheets use the still illustration, never a wobble. Reduced motion disables celebration movement and uses a static sheet frame.


## Clear result overlays and large countdown

Round/match result surfaces have no background fill, background image or backdrop filter. Keep the original canvas mounted and rendered beneath the text/art, with board pixels unobscured away from result content. Countdown uses a 50 px round label (previously 10 px) and a 225 px numeral (previously up to 45 px), capped at 55% viewport height on short landscape screens. Both stay centered without a panel, fill or blur. Browser coverage verifies the same canvas identity, unchanged rendered board patches with/without the result overlay, nonblank artwork, frozen simulation time, exact countdown sizes and viewport fit. Screenshots cover desktop, phone portrait and phone landscape.


## Outlined text, column alignment and sprite victories (D37)

Eight directional dark shadows plus a lower soft shadow outline match/lobby text, including names, results, countdowns and pause references. Light action buttons and form fields keep their contrasting text without the dark outline.

On desktop with vertical star columns, round trophy centers use the same horizontal coordinates as their corresponding columns, beneath the score/name line. The desktop outer margin reserves room for the enlarged trophy width. Phone portrait keeps trophy positions beneath the bar. Phone landscape centers the board itself in the viewport and places a vertical original star column to its left, preserving uniform scales and hole anchors.

Match wins play the bundled 9-frame 128×160 transparent sprite sheets at 8 fps, with articulated pose changes. There is no CSS translation/rotation animation. Reduced motion holds frame 0. PixelLab provenance, job IDs and original artwork references are in assets/characters/victory-provenance.json. Raw generated frames can be repacked using scripts/pack-victory-sprites.mjs.


Text outline width is now 2 px in each of the eight directions (doubled from 1 px), with a 4 px offset / 6 px blur lower shadow.


## Names and trophies (D40, revised D41)

The current order is score bar → character names → round trophies (D41 supersedes D40). Each name is centered on its own trophy. Desktop trophy/star column alignment is preserved; phone names use the corresponding compact trophy positions. Name widths respect viewport edges and the opposing label; desktop reserves room for a two-line long name on narrow column layouts. Name text does not truncate or stretch. Portrait rival stars remain below the names; landscape rival charge remains beside the bar.

Previewed at 1440×900 desktop, 768×1024 tablet, 390×844 and 320×568 portrait, 844×390 landscape, plus narrow local two-player layouts in both orientations. Preview-only staged state uses one win per player and three/four stars, without adding production debug controls.

Narrow local two-player landscape also uses vertical star columns, so large horizontal strips do not consume the boards’ limited height. Portrait local layouts retain horizontal strips below each board.


## Reference-style pause menu (D42)

The menu follows the supplied shinobi-arena/output/hud/pause.jpeg reference: centered top Pause title, a large vertical action list on the left and controls/magic references on the right. The active action has a garden-colored brush highlight. There are no filled information panels, walls of help text or spell descriptions. Current heroes show only their names and four numbered magic titles.

The supplied CraftPix free keyboard/mouse pack provides exact-pixel cropped keycaps and mouse sprites. Controlled players get a 3×3 key map matching row-major board order, plus a casting key. AI/online opponents show spells only because their physical input is not local. Board hit labels, actual keyboard input and menu key maps share src/game/controls.ts.

Resume/Mute/Unmute/Quit behavior is preserved. Up/Down navigate actions, Enter activates, Tab stays within the modal including its scrollable reference region, and Escape closes ordinary menus. Disconnection disables Resume and keeps recovery status, mute and quit; online menus still do not pause the match. On narrow phones actions remain left and available while the reference region scrolls; short landscape uses two hero columns. Source/license notes are in public/assets/input/README.md. No AI sprite generation was used.

The Esc/Back visual hint is removed; Escape still closes the menu. Keys and spell names have a 56 px desktop gap, 28 px stacked portrait gap, and 24 px stacked landscape gap.


## Menu typography hierarchy (D44)

PAUSE uses locally bundled Cinzel variable (700 weight), uppercase and .08em tracking: up to 128 px desktop, 72 px portrait phones and 64 px short landscape. Connection/online status titles use a separate smaller responsive size. Action labels stay Almendra and scale with their sidebar (about 82 px at 1440 desktop, 35 px at 390 portrait, 48 px landscape). Selected/hovered brush highlights use fully opaque green with no opacity fade.

Reference keycaps shrink to 40 px desktop and 24 px compact; spell titles shrink to at most 23 px desktop and 18 px compact. Portrait action columns get more width to keep larger labels readable, while the reference region retains independent scrolling. Existing key-to-magic spacing remains. The title font is self-hosted with its OFL license; no image/sprite generation is involved. Browser checks cover the hierarchy, highlight opacity, clipping, key layouts, navigation and production font loading.
