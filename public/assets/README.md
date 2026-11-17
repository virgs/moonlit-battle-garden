# Reused assets

`characters.png`, `garden.png`, `background-castle.png`, `root.png`, `life.png`, `backgroundMusic.mp3`, `die0.wav`, `starHit.wav`, and `wrongHit.wav` are copied unchanged from https://github.com/virgs/molecideGaiden/tree/master/assets.

The repository's license is preserved in `MOLECIDE-LICENSE.txt`. Original Dig Hole Battle Garden graphics are credited to Bruno Moraes in its README. Complete per-asset provenance review before a public release; repository presence alone does not establish ownership of every sound or music track.

No PixelLab generations have been made for this prototype. The final portrait, cast, and home asset slots now have working loaders/playback and safe fallbacks. See [ASSET-CONTRACT.md](ASSET-CONTRACT.md) for the 16 drop-in files and `pnpm assets:check`. The castle and shared music remain fallbacks. The later root.png/life.png are retained as source references but are no longer rendered.

## Oldest game assets restored

The files under `legacy/` are PNG conversions of https://github.com/virgs/digHoleBattleGarden/tree/master/Fx:

- `bar-sheet.png`: efeitoLife.pcx, 1010×164, four animation rows.
- `bar-border.png`: bordalife.pcx, 499×45.
- `earth.png`: terra.pcx, four 45×45 frames.
- `garden.png`: TabuleiroProfissional.pcx, 301×383 with its original root artwork.
- `star-meter.png`: estrelinhas.bmp, 420×1000; seven 60×200 frames in each of five charge rows.
- `trophy-sheet.png`: trofeu.bmp, 900×225; six 150×75 frames in each of three win-count rows.

RGB pixels are preserved, with Allegro's magenta mask converted to transparency. Reproduce with `python3 scripts/import-legacy-art.py PATH_TO_OLDEST_REPO/Fx public/assets/legacy`. Original graphics are credited to Bruno Moraes in the oldest repository's README. Board-local attachment positions and bar source-window behavior come from Fase.cpp, Life.cpp, and Animacao.cpp. Player.cpp replaces the exact green board-base mask below row 310 with blue RGB(0,0,128) or red RGB(128,0,0); the renderer now does the same without altering the source PNG. Star containers, charge animations and trophy appearance/spin frames are reused from the original sheets. The later browser version also uses two charge transition frames followed by a four-frame idle loop at 12 fps.


## Enabled sound effects

`assets/sfx/` contains the 12 browser-version effect files from molecideGaiden/assets/sounds and all 21 WAV effects from digHoleBattleGarden/Sounds, copied unchanged (older files have an `original-` prefix). The 33-file bank covers spawn pops, all hit voice variations, impacts, rabbit hits, star appearance/collection, wrong empty hits, magic/cast, magical sweep and game-over cues. The manifest is `src/presentation/soundFiles.ts`; variation is cosmetic and does not consume game RNG. Missing a mole is distinct from hitting an empty hole and does not play the wrong-hit sound.

Music and effects start enabled on match entry. The entry/Create/Join gesture unlocks Web Audio and primes the reusable music element. The existing shared MP3 is the home-music fallback; distinct final home tracks remain asset slots. Mute, pause, interruption and exit silence playback appropriately. Simultaneous spawn sounds are coalesced; at most 12 Web Audio voices overlap. The original MIDI collection is retained in the source reference repository rather than bundled as browser-playable music.


Named hero victory illustrations `legacy/champignon-hero.png` and `legacy/andy-hero.png` come from digHoleBattleGarden/Personagens/SIR CHAMPIGNON.bmp and ANDY.bmp. They preserve source RGB pixels with the exact magenta mask converted to alpha, using `convert_bmp` in scripts/import-legacy-art.py (now supporting 24-bit BMP). They are static source illustrations animated with presentation motion until final victory sheets are supplied. The prototype’s unrelated robot/sumo victory sheets are not presented as these heroes.
