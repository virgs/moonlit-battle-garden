# Approved hero art and per-spell effects

Five heroes are playable: Sir Champignon (`champignon`), Andromoss (`andromoss`), Captain Bramble (`captain-bramble`), Duskmantle (`duskmantle`) and Sprig (`sprig`). Their approved hero art is installed and wired into selection, HUD, pause and round/match results. No new generation was needed for roster integration.

A **hero** has idle, victory and **one shared casting animation**. Each **individual spell** owns a separate spell-effect animation. The thematic trail inside a casting gesture does not replace that spell’s effect. Effect files are grouped under their owner’s directory for organization only.

## Installed hero assets

| File under `characters/CHARACTER/` | Native contract |
|---|---|
| `standing.png` | 960×192 PNG: five 192×192 frames at 3 fps, looping |
| `victory.png` | 1728×192 PNG: nine 192×192 frames at 8 fps |
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
