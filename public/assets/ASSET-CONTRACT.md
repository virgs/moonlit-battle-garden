# Approved hero art and per-spell effects

Five heroes are playable: Sir Champignon (`champignon`), Andromoss (`andromoss`), Captain Bramble (`captain-bramble`), Duskmantle (`duskmantle`) and Sprig (`sprig`). Their approved hero art is installed and wired into selection, HUD, pause and round/match results. No new generation was needed for roster integration.

A **hero** has idle, victory and **one shared casting animation**. Each **individual spell** owns a separate spell-effect animation. The thematic trail inside a casting gesture does not replace that spell’s effect. Effect files are grouped under their owner’s directory for organization only.

## Installed hero assets

| File under `characters/CHARACTER/` | Native contract |
|---|---|
| `standing.png` | 960×192 PNG: five 192×192 frames at 12 fps, looping |
| `victory.png` | 1728×192 PNG: nine 192×192 frames at 12 fps |
| `cast.png` | 1728×192 PNG: nine 192×192 frames at 9 fps plus 500 ms final hold, shared by all four spells |
| `icon.png` | Transparent 192×192 head-and-shoulders image for HUD, pause and round result |

Exact prompts, source base, frame counts, jobs and hashes are in each character folder’s `provenance.json` and `icon-provenance.json`. The user reviews visual quality; technical checks do not establish artistic fidelity. Avoid unsolicited cleanup of approved art.

The two initial heroes retain recovered legacy still fallbacks. The other three use their approved bases (Sprig uses base-v6). The configured optional large `portrait.png` is reserved for future portrait-based UI; current selection uses idle/victory and other screens use icons.

## Remaining per-spell files

Default effect contract: transparent 1024×128 PNG, eight 128×128 frames at 12 fps. Put files at `characters/CHARACTER/effect-N.png` for the corresponding spell. Loop only for the authoritative spell lifetime; instantaneous effects have a short impact window. Keep target centers readable.

| Character | effect-1 | effect-2 | effect-3 | effect-4 |
|---|---|---|---|---|
| Sir Champignon | Clean Sweep | Mushroom Guard | Spore Ward | Royal Cleanup |
| Andromoss | Borrowed Spark | Rabbit Riot | Sticky Fingers | Double Trouble |
| Captain Bramble | Tin Caps | Bramble Brace | Iron Resolve | Heavy Harvest |
| Duskmantle | Ominous Bud | Violet Veil | Twilight Siphon | Withering Pact |
| Sprig | Gentle Tending | Helping Tines | Weed Out | Garden Clockwork |

These 20 per-spell files remain deferred and use procedural board-edge placeholders. Armored moles have procedural helmet arcs/hit pips and marked moles have violet rings; these readable indicators work without generated effect assets. Five large portraits remain optional. There are no additional hero-specific spell-effect animations to generate.

## Homes and configuration

All eight home background/music pairs are bundled, with verified source hashes and licenses in `homes/`. Five are assigned to playable heroes; three remain staged. The review collection is `homes/index.html`. Manifest paths may differ from character IDs because garden locations have their own names.

`src/assets/config/presentation.yaml` defines paths, frame dimensions/counts/columns, fps, holds, optional custom cast sounds, home opacity/focal points and music loop parameters. Different sheet layouts require manifest changes. Preserve alpha, nearest-neighbor presentation and uniform scaling; never stretch sprite axes independently.

Missing/invalid optional files use existing fallbacks and do not block play. Casting shows the same shared hero clip for every star tier while separately displaying the actual stars spent. Both boards and all gameplay timers freeze for the 1500 ms cast; pause/reconnection also freezes presentation time. Reduced motion uses a static pose.

## Checks

```sh
pnpm assets:check
pnpm assets:check --strict
```

Current result: **36 ready, 25 missing, 0 invalid** including staged homes. Missing: 20 individual spell effects and five optional large portraits. The regular check allows intentional placeholders; strict mode also fails on missing files. Browser-test fixtures are synthetic pixels and are never installed as game assets.


## One-star effects: ready for user visual review

The five one-star gameplay loops now live at `/assets/effects/one-star/{hero}.png`, with GIF previews, frame metadata and editable source/provenance alongside. Eight48×48 frames,6 FPS, looped by simulation time; each descriptor records its actual sheet columns. Both board and hidden-board HUD use the same sprite and uniform scaling. Existing character casts remain shared across all spell tiers. No activation/ending variants were created. `/assets/effects/one-star/index.html` previews all five at3×; visual review remains with the user.


## Adopted reactive effects and latest polish

The historical per-spell placeholder list above is superseded by the approved runtime effects in `effects/reactive/`, the approved energy arcs and column renderers. Nine looping PixelLab families use native48×48 frames (ward64×64),9 frames per horizontal strip at12fps. Four additional one-shot strips (`mushroom-finish`, `thorn-finish`, `curse-finish`, `ward-finish`) share the same native dimensions and9 frames. Source generation IDs are beside each new strip. Finisher windows are500ms after guardian interception,650ms for curse miss/ward consumption; only the relevant actual simulation event triggers one.

Title actors use nine native frames per horizontal strip: bat/pumpkin48×48 and owl48×64. Uniform draw scaling preserves the owl aspect ratio. Wing frames run at12fps; slower owl/pumpkin poses are decorative and independent of match time. Reduced motion holds frame0. Models do not visually inspect user artwork.

New sound files in `sfx/spells/` are downloaded CC0 Kenney clips, unmodified; see the bundled license and source hashes. All spell numbers, target timing and guard/armor semantics remain authoritative in the simulation.


## Menu feedback sounds

`sfx/menu/{move,confirm,back,error}.wav` contains four original unmodified Kenney CC0 Interface Sounds clips. License and source hashes are beside them. Logical UI actions trigger these cues, including keyboard/buttons/swipes, with saved/current mute handling. Menu effects unlock Web Audio on the user gesture without priming background music; they share decoded files with the game while owning their own playback/mute lifecycle. No generated audio or new image assets.


D182/I66: idle/victory rendering uses elapsed-time-based6/12fps playback across all five heroes. Five/nine source poses and all PNG bytes are unchanged; no interpolation or frame generation. One-shot victories hold their final pose, loops repeat, background tabs hold time and reduced motion uses frame0. Casting timing remains unchanged.

D183/I67 supersedes the idle rate above: both idle and victory now play at12fps. Source frame counts, PNG bytes and elapsed-time playback are unchanged.
