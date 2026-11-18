# Drop-in character assets

The eight-home collection is available at `homes/index.html`, with `homes/catalog.json`, credits, license text and verified file hashes. Six home pairs are staged and unassigned until the future character discussion; they do not expand the playable roster.

The playback code is ready. Both victory sheets and all four home background/music files are bundled. Sir Champignon now has review-draft idle, victory and shared casting sheets. The current screens still need 12 active assets + two optional portraits (14 missing unique files, 22 total configured files). All four spell tiers reuse one casting sheet per character. The unique paths for each character are listed below. Add or replace files, then reload the game:

```text
public/assets/characters/CHARACTER/portrait.png
public/assets/characters/CHARACTER/icon.png
public/assets/characters/CHARACTER/standing.png
public/assets/characters/CHARACTER/victory.png
public/assets/characters/CHARACTER/cast.png
public/assets/characters/CHARACTER/effect-1.png
public/assets/characters/CHARACTER/effect-2.png
public/assets/characters/CHARACTER/effect-3.png
public/assets/characters/CHARACTER/effect-4.png
public/assets/homes/CHARACTER/background.png
public/assets/homes/CHARACTER/music.mp3
```

| Asset | Default contract |
| --- | --- |
| Portrait | Transparent PNG, recommended 256×256. Other aspect ratios are contained without stretching. Reserved for portrait-based UI; the current selection carousels use standing/idle previews and pause/results use character icons. The minimal match HUD has no persistent portraits. |
| Character icon | Transparent square PNG, recommended 128×128 with consistent head/bust framing and padding across characters. Pause reference shows both icons above their names; round result shows the winner’s icon next to the verdict. Missing icons show recovered hero illustrations. Separate from selection portraits and victory sheets; PixelLab generation is deferred. |
| Standing / idle | Transparent 1024×160 PNG, eight 128×160 frames at 6 fps, looping as the unlocked carousel preview. Missing sheets use the original still hero illustration; no artificial image wiggle. |
| Spell effect sheets 1–4 | Transparent 1024×128 PNG, eight 128×128 frames at 12 fps. Loop for active shields/wards/invasions/decoys and incoming warnings; instantaneous spells get a 700 ms impact. Leave the board center clear so targets stay readable. Missing sheets use time-driven colored edge rings/markers. Lifetimes come from simulation state, including early consumption. |
| Casting animation | One PNG per character, shared by all four star tiers. Each is **1024×128**: eight 128×128 frames, left to right, no gutters. 12 fps, play once, hold the final frame through the shared 1500 ms cast freeze. Transparent background. |
| Victory sheet | Bundled transparent 1152×160 PNG: nine 128×160 frames, 8 fps, looping. Missing/invalid sheets use a still recovered hero illustration. Reduced motion uses frame 0. |
| Home background | PNG, recommended 1920×1080 or larger. Uniform cover scaling with cropping on narrow screens. Keep important details near the configured focal point. |
| Home music | Browser-playable MP3. Default full-track looping at 12% volume. Loop segment start/end can be supplied in the manifest if the track includes an intro. |

For these defaults, adding the files is sufficient; no game code or configuration changes are needed. `src/assets/config/presentation.yaml` holds paths, frame sizes/counts/columns, fps, final-pose hold time, background opacity/focal points, music volume, loop points, and optional cast sound paths. Change data there for a different sheet layout or audio loop.

Missing portraits/icons use recovered character illustrations. Missing backgrounds/music use the existing castle/track. Missing or incorrectly sized cast sheets show the recovered hero over the frozen board; on single-board screens the opponent’s cast appears there too. Optional presentation files do not block startup or gameplay. Casts temporarily occupy the caster’s board (or the visible mobile board) while both players are frozen and input is disabled; cast time advances separately from gameplay time and freezes during manual pause/reconnection and reduced-motion mode uses a static pose.

Checks:

```sh
pnpm assets:check
pnpm assets:check --strict
```

The regular check reports missing final files and validates supplied sprite-sheet dimensions. Strict mode also fails on missing final files. The existing fallback files must remain available. Temporary browser-test images are supplied through request interception and are not saved here as final assets.

## Remaining assets by character

### Sir Champignon — Sporelight Keep

- Character icon.
- Standing/idle animation: installed review draft, five 192×192 frames at 3 fps.
- One shared casting animation for all four spells: installed review draft, nine 192×192 frames at 9 fps and a 500 ms final-pose hold.
- Four spell effects: Mushroom Guard, Clean Sweep, Spore Ward, Royal Cleanup.
- Background and music are installed; see [credits](homes/CREDITS.md).
- Optional portrait, reserved for future portrait-based UI.

### Andy — Moonlit Hideout

- Character icon.
- Standing/idle animation.
- One shared casting animation for all four spells.
- Four spell effects: Borrowed Spark, Rabbit Riot, Sticky Fingers, Double Trouble.
- Background and music are installed; see [credits](homes/CREDITS.md).
- Optional portrait, reserved for future portrait-based UI.

Both characters have their victory animation, home background and music. Sir Champignon’s victory has been replaced with a matching review draft; his approved 192×192 base-v3 pose is used for all three expressive animation sheets. Exact prompts, seeds and PixelLab job IDs are recorded in characters/champignon/provenance.json, with first-pass history in animation-provenance-v1.json. User authorization D65 reopens this character’s art pass; other new generation remains deferred. The user handles visual review; technical checks only. The shared cast animation still displays the actual 1–4 stars spent; spell effects remain distinct per spell.

## Roster-wide animation requirements (D70)

All characters use subtle idle animation (gentle breathing and small secondary motion). Victory and casting remain expressive. Each character’s single shared casting animation includes a visible thematic magic effect following its action/weapon; this is separate from per-spell active-effect sheets. Champignon uses a golden-green spore/sparkle trail along his broom sweep. Preserve space for the stars-spent overlay. Only the user performs visual review.
