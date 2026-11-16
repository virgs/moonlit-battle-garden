# Reused assets

`characters.png`, `garden.png`, `background-castle.png`, `root.png`, `life.png`, `backgroundMusic.mp3`, `die0.wav`, `starHit.wav`, and `wrongHit.wav` are copied unchanged from https://github.com/virgs/molecideGaiden/tree/master/assets.

The repository's license is preserved in `MOLECIDE-LICENSE.txt`. Original Dig Hole Battle Garden graphics are credited to Bruno Moraes in its README. Complete per-asset provenance review before a public release; repository presence alone does not establish ownership of every sound or music track.

No PixelLab generations have been made for this prototype. The final portrait, cast, and home asset slots now have working loaders/playback and safe fallbacks. See [ASSET-CONTRACT.md](ASSET-CONTRACT.md) for the 14 drop-in files and `pnpm assets:check`. The castle and shared music remain fallbacks. The later root.png/life.png are retained as source references but are no longer rendered.

## Oldest game assets restored

The files under `legacy/` are PNG conversions of https://github.com/virgs/digHoleBattleGarden/tree/master/Fx:

- `bar-sheet.png`: efeitoLife.pcx, 1010×164, four animation rows.
- `bar-border.png`: bordalife.pcx, 499×45.
- `earth.png`: terra.pcx, four 45×45 frames.
- `garden.png`: TabuleiroProfissional.pcx, 301×383 with its original root artwork.
- `star-meter.png`: estrelinhas.bmp, 420×1000; seven 60×200 frames in each of five charge rows.
- `trophy-sheet.png`: trofeu.bmp, 900×225; six 150×75 frames in each of three win-count rows.

RGB pixels are preserved, with Allegro's magenta mask converted to transparency. Reproduce with `python3 scripts/import-legacy-art.py PATH_TO_OLDEST_REPO/Fx public/assets/legacy`. Original graphics are credited to Bruno Moraes in the oldest repository's README. Board-local attachment positions and bar source-window behavior come from Fase.cpp, Life.cpp, and Animacao.cpp. Player.cpp replaces the exact green board-base mask below row 310 with blue RGB(0,0,128) or red RGB(128,0,0); the renderer now does the same without altering the source PNG. Star containers, charge animations and trophy appearance/spin frames are reused from the original sheets. The later browser version also uses two charge transition frames followed by a four-frame idle loop at 12 fps.
