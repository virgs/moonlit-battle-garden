# Drop-in character assets

The playback code is ready. Supply these seven files for **each** of `champignon` and `andy` (14 files total), then reload the game:

```text
public/assets/characters/CHARACTER/portrait.png
public/assets/characters/CHARACTER/cast-1.png
public/assets/characters/CHARACTER/cast-2.png
public/assets/characters/CHARACTER/cast-3.png
public/assets/characters/CHARACTER/cast-4.png
public/assets/homes/CHARACTER/background.png
public/assets/homes/CHARACTER/music.mp3
```

| Asset | Default contract |
| --- | --- |
| Portrait | Transparent PNG, recommended 256×256. Other aspect ratios are contained without stretching. Used in character selection; the minimal match HUD has no persistent portraits. |
| Cast sheets 1–4 | One PNG per star tier. Each is **1024×128**: eight 128×128 frames, left to right, no gutters. 12 fps, play once, hold the final frame for 250 ms. Transparent background. |
| Home background | PNG, recommended 1920×1080 or larger. Uniform cover scaling with cropping on narrow screens. Keep important details near the configured focal point. |
| Home music | Browser-playable MP3. Default full-track looping at 12% volume. Loop segment start/end can be supplied in the manifest if the track includes an intro. |

For these defaults, adding the files is sufficient; no game code or configuration changes are needed. `src/assets/config/presentation.yaml` holds paths, frame sizes/counts/columns, fps, final-pose hold time, background opacity/focal points, music volume, loop points, and optional cast sound paths. Change data there for a different sheet layout or audio loop.

Missing portraits use the character emblem. Missing backgrounds/music use the existing castle/track. Missing or incorrectly sized cast sheets render no extra HUD. Optional presentation files do not block startup or gameplay. Casts show as art-only cameos in the star-control region without covering holes or capturing input; logical animation time freezes during pause and reduced-motion mode uses a static pose.

Checks:

```sh
pnpm assets:check
pnpm assets:check --strict
```

The regular check reports missing final files and validates supplied sprite-sheet dimensions. Strict mode also fails on missing final files. The existing fallback files must remain available. Temporary browser-test images are supplied through request interception and are not saved here as final assets.
