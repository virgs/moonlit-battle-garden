# Characters and magic

Status: all eight concepts were adopted on 2026-11-16. Sir Champignon and Andy are the initial implemented pair. Spell names, numbers, durations, and interactions remain provisional; see prototype.md for actual behavior.

These spell assignments are new remake designs. The original repository has named artwork but only generic test loadouts, so do not describe these as recovered historical kits.

Artwork source: https://github.com/virgs/digHoleBattleGarden/tree/master/Personagens

## Approved identities and homes

Approved on 2026-11-17. These are eccentric caretakers of different corners of the same enchanted garden. The user approved all eight proposed identities, home/music assignments and minibios, simplifying Andy Nightshade, Dindo Duskmantle and Urthgar Rootbeard to **Nightshade**, **Duskmantle** and **Rootbeard**. Use those names consistently, including on the HUD. Original names below remain artwork/implementation references, not alternate display names. Runtime renaming and future roster expansion remain separate implementation work; keep stable internal IDs and asset paths.

| Display name | Original identity | Home | Existing music |
| --- | --- | --- | --- |
| Sir Champignon | Sir Champignon | Sporelight Keep | Forest Whisper Theme |
| Nightshade | Andy | Moonlit Hideout | Magic Town |
| Captain Bramble | Capitão Katyroba | Mossroot Path | Glizzy Elf Forest — Forest Loop |
| Duskmantle | Dindo | Violet Veil | Void Estate |
| Sprig | E-Mailson | Lanternbloom Garden | Exploration Theme |
| Mallow | Ming-Ding-Go | Stillwater Grove | Whispers in the Fog |
| Miyaya | Ninja Miyaya | Bluebell Thicket | Cathedral in the forest (ambient loop) |
| Rootbeard | Urthgar | Whispering Wood | Iremos Forest Theme Loop |

### Minibios

**Sir Champignon — Keeper of the Little Things**

With a mushroom shield and a well-worn broom, Sir Champignon guards the garden’s smallest inhabitants. He takes every oath seriously—even the one about keeping rabbits out of the cabbages.

**Nightshade — Borrower of Stars**

Nightshade knows every shortcut through the hedges and every hiding place beneath them. Stars have a habit of finding their way into his pockets. He insists they’re happier there.

**Captain Bramble — The Unmovable Gardener**

Captain Bramble has held the old woodland path through storms, stampedes, and particularly determined rabbits. Beneath his intimidating scowl lies a fierce affection for anything small enough to need protecting.

**Duskmantle — Tender of Troublesome Things**

Duskmantle tends the flowers that bloom without sunlight and the roots that whisper after midnight. His curses began as remedies for garden pests. Some have become rather difficult to distinguish.

**Sprig — A Helping Claw**

Built to maintain a forgotten garden, Sprig continued working long after its maker disappeared. It now considers every living thing its responsibility. Its definition of ‘helping’ occasionally requires supervision.

**Mallow — Keeper of the Quiet Hours**

Mallow spends whole evenings watching a single bud unfold. Around the stillwater stream, hurried footsteps soften and falling leaves linger in the air. Somehow, the work is always finished by morning.

**Miyaya — A Shadow Among Bluebells**

Miyaya patrols the thicket without disturbing a single petal. Every strike is measured, every landing silent. The rabbits remain unimpressed, which she considers a deeply personal insult.

**Rootbeard — Champion of Second Helpings**

Rootbeard followed the scent of mushroom stew into Whispering Wood and never found a reason to leave. He gardens with tremendous enthusiasm and cooks enough for an army. Everyone is invited.

## Roster identity

| Character | Original appearance | Remake role |
| --- | --- | --- |
| Andy (Nightshade) | Alien with a long, very narrow straw-like head, skin-continuous spikes, visible neck gills, sunglasses, leather jacket, chain and hook | Trickster; stars and disruption |
| Capitão Katyroba | Muscular, long-tailed animal with folded arms; line-art portrait | Brawler; armor and endurance |
| Dindo | Long bangs, huge scarf, cloak; line-art portrait | Curse specialist; draining and marked targets |
| E-Mailson | Robot with an @ emblem and mechanical claws | Automation and assistance |
| Ming-Ding-Go | Straw hat and green cloak | Timing and slowing effects |
| Ninja Miyaya | Black-and-white ninja cat with sword | Precision and quick attacks |
| Sir Champignon | Armored knight with mushroom shield and broom | Guardian; protection and sweeping |
| Urthgar | Blond Viking with braided beard, horned helmet, food utensils | Endurance; feasts and sustained accuracy |

## Adopted spell concepts

| Character | 1 star | 2 stars | 3 stars | 4 stars |
| --- | --- | --- | --- | --- |
| Andy | Copy one enemy star | Rabbit invasion | Steal a limited number of stars | Burst of decoy-heavy target waves |
| Capitão Katyroba | Block the next mistake's damage | Give enemy moles helmets | Absorb several mistakes temporarily | Short wave of heavily armored enemy moles |
| Dindo | Mark the next enemy mole; missing it hurts more | Brief target camouflage | Successful hits gradually recover points | Curse several upcoming enemy moles with larger miss penalties |
| E-Mailson | Extend current targets' lifetimes | Safely automate one column | Cancel an incoming debuff | Brief automation of mole clearing across the board |
| Ming-Ding-Go | Slow own spawns | Extend a protective timing window | Give enemy moles timed shields | Greatly slow own garden for a short recovery period |
| Ninja Miyaya | Automatically strike one mole | Brief rabbit invasion | Short, fast enemy target wave | Clear own board and launch a counterattack wave |
| Sir Champignon | Block one mistake | Sweep own board | Protect against the next hostile spell | Clear own board and grant a temporary shield |
| Urthgar | Recover some points | Gain bonus points from the next few successful hits | Send armored enemy moles | Feast rewards sustained accurate play with bonus points |

## Initial two-character proposal

**Sir Champignon and Andy** offer contrasting defense and disruption and are the current implementation defaults following authorization to start coding.

The prototype resolves the following with provisional rules in prototype.md; revisit through playtesting:

- Andy's one-star copying versus the proposed consume-all-stars rule: net charge, timing of cost/reward, and protection against repeated resource generation.
- Andy's three-star steal cap, transfer rules, and behavior when the opponent has no stars.
- How rabbit invasion differs from decoy-heavy waves; decoys must have a readable identification rule.
- Sir Champignon's mistake shield: charges, duration, and whether all mistake types qualify.
- Sweep targeting and rewards, including rabbits and collectible stars.
- What counts as a hostile spell for protection, when protection is consumed, and how resource theft interacts with shields.
- Fourth-tier shield duration/charges and its distinction from lower-tier defensive tools.

## Roster refinement backlog

- Differentiate Andy and Miyaya's decoy/rabbit effects.
- Differentiate Katyroba and Urthgar's armor effects.
- Define Ming-Ding-Go's protective timing window concretely.
- Give camouflage a visible outline rather than making targets entirely unreadable.
- Give timed shields an obvious opening animation.
- Consider direct damage cautiously; current adopted kits mostly apply pressure through playable board mechanics.
- Keyboard-mapping shuffle is excluded. No character kit should depend on it.

## Approved character art and animation direction

Sir Champignon’s `public/assets/characters/champignon/base-v3.png` is the approved design. It is the clean, taller adult revision using the finished mole/rabbit/star/board reference plate. His idle, victory and shared casting sheets now use this 192×192 design; v1 animation records are preserved separately, and v2 was a proportion draft. Preserve v3’s identity, clean flat shading and thick outlines in future work.

The user requests expressive victory and casting actions: unmistakable body/limb movements, strong poses and clear silhouette changes. A small number of distinct key poses is sufficient. D70 revises idle for the entire roster: calm, subtle breathing and small secondary movement, with no large gestures or weight shifts. Whole-image CSS wiggling remains excluded. Visual review belongs to the user; do not inspect generated frames with model vision. The user restored access and authorized this animation pass on 2026-11-18.

Animation briefs (generated clips await user visual review):

- Idle: gentle breathing and a tiny plume sway. Keep the head direction, stance, broom and shield steady; no broad weight shifts, head turns or arm gestures. Five frames at 3 fps.
- Victory: crouch in anticipation, an exuberant full-body hop or proud step, an unmistakable raised broom/shield salute, then a readable proud landing/settle.
- Shared casting: brace and wind up, twist the torso into a broad broom sweep, present the shield, then follow through and settle. Add a compact golden-green magical spore trail that follows the broom bristles, with a few sparkles/motes dispersing behind it. Fit the established 1.5-second cast freeze and retain the separate stars-spent overlay.

For casting and victory, favor clear anticipation, action, follow-through and a short held pose over numerous small in-between changes. Keep equipment attached, preserve colors and leave enough canvas margin for gestures without clipping.

The current sheets contain the starting pose plus four generated idle frames (five total, 3 fps) and eight generated victory/casting frames (nine total; victory 8 fps, cast 9 fps plus 500 ms final-pose hold). All four casting tiers reference the same sheet. No generated spell-effect overlays or additional character assets are part of this pass.

### Defaults for every future character

- Idle is subtle: restrained breathing and small character-specific secondary motion. Save large gestures and clear silhouette changes for victory and casting.
- Casting includes visible, character-appropriate magic: a trail, sparkles, motes, smoke or a similar effect tied to the gesture/weapon. Keep it within the sprite canvas, readable, and clear of the face and stars-spent overlay.
- Casting magic is part of the one shared character casting animation. It does not replace each spell’s separate active-effect visuals.
- The user reviews all generated images and animations; perform technical file/playback checks only.

Sir Champignon’s static character icon is installed at `public/assets/characters/champignon/icon.png` (transparent 192×192), based on approved base-v3, for HUD, pause and round results. Exact prompt/job record: `icon-provenance.json`. The larger portrait remains optional; the user reviews the icon. Nightshade is the next character art pass.

### Nightshade art pass

Authorized after the user approved Champignon’s final icon framing. The first 192×192 base design is staged at `public/assets/characters/andy/base.png`, with prompts/references in `base-provenance.json`. Preserve the corrected identity: alien with face/scalp-continuous spikes (not blond hair), visible neck gills, sunglasses, leather jacket, short chain and hook. Include the user-permitted slim tail and small ponytail-like rear head appendage as alien anatomy. Draw fresh clean adult proportions using approved Champignon and the final game artwork as style references. The user reviews the base before animation/icon generation; existing runtime sheets remain unchanged. Home/music remain Moonlit Hideout / Magic Town.

Nightshade v2 is staged in `public/assets/characters/andy/base-v2.png`, with the full correction prompt in `base-provenance-v2.json`. Skin continues across face and spike crown without a hairline; gills are visible on the neck. Tail and head tendril share the skin material. Avoid stray/dead pixels and noisy single-pixel shading. The initial human/hair interpretation is superseded by the user’s alien identity correction.

Nightshade v2’s head was rejected as too wide and balloon-like. His face/skull must be elongated and very thin, like a straw: slim near-parallel sides, a small jaw, no bulbous crown or broad cheeks. V3 (`base-v3.png`, record `base-provenance-v3.json`) is the head-only correction; body and outfit should remain intact. The user evaluates the result.
