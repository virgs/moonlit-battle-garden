# Three-mark Bud and three-second Tending aura

Current [pooled overview and per-level matrices](balance-tier-1.md), full adopted outcomes in balance-tier-1.json.

## Current one-star spells (owner included)

| Owner | Spell | Current rule |
|---|---|---|
| Sir Champignon | Clean Sweep | Immediately hit the busiest fixed column and everything arriving there for 3 active seconds; normal rewards/penalties/armor strikes. |
| Andromoss | Borrowed Spark | Steal all enemy stars after 650 ms warning; cap one in this test/four normally. Empty meter wastes cast. |
| Captain Bramble | Tin Caps | Armor one enemy mole; one extra hit, 3 s window. |
| Duskmantle | Ominous Bud | Mark three enemy moles within 12 s; each missed mark adds 4 penalty points (normal 8 →12). |
| Sprig | Gentle Tending | For3 s, add 500 ms to every current/arriving target once; all kinds/origins, including rabbits and stars. |

Duskmantle’s prior one-star rule marked one mole within the same 12 s window. Withering Pact remains four marks/8 s with its prior penalty. Sprig’s prior rule instantly added 1200 ms only to current targets. New Tending refreshes its 3 s coverage window on recast but never adds a second lifetime bonus to an already extended target. A target arriving just before aura end keeps its earned 500 ms afterward; arrivals at/after the end do not receive it. Expired targets are not revived. Positive Tending survives hostile cleanse and freezes with gameplay; new rounds reset it.

## Controlled method

Four 7,500-match profiles: old-rule control (one mark/instant 1200 ms), three marks only, 500 ms/3 s aura only, both. Then fresh 7,500-match default rerun: **37,500 matches, zero caps**. Each uses 100 paired seeds, base 20261119, both distinct-character side assignments, three levels, 100 mirrors per hero/level. Each distinct cell has 200 games per level / 600 pooled. Pacing, reaction settings, scaled casting decisions, Sweep, Tin Caps and all unrelated powers are fixed.

The old-rule control reproduces all 7,500 pre-change outcome records at Git commit 5d45259 exactly. The adopted defaults reproduce all 7,500 combined-trial outcome/statistic records exactly. Three independent profile JSON files retain all raw outcomes; the combined trial references the identical adopted records. Each profile has explicit reproduction settings, including legacy tending-ms=0; this avoids inheriting changed defaults when rerunning historical controls. No new artwork.

## Duskmantle — Ominous Bud: one mark → three

Each cell is Duskmantle’s win rate before → after changing only mark quota. The 12 s window and +4 penalty stay fixed.

| AI | vs Champignon | vs Andromoss | vs Bramble | vs Sprig |
|---|---:|---:|---:|---:|
| easy | 16.0% → 23.0% | 51.5% → 56.0% | 39.5% → 44.5% | 51.5% → 54.0% |
| medium | 17.0% → 23.0% | 51.0% → 51.5% | 43.0% → 45.5% | 48.0% → 54.5% |
| hard | 27.5% → 27.5% | 53.5% → 52.5% | 36.0% → 43.5% | 59.0% → 60.5% |

## Sprig — Gentle Tending: instant +1200 ms → +500 ms/current and arriving targets for 3 s

Each cell is Sprig’s win rate before → after changing only Tending. Bud stays at one mark in this comparison.

| AI | vs Champignon | vs Andromoss | vs Bramble | vs Duskmantle |
|---|---:|---:|---:|---:|
| easy | 20.5% → 24.5% | 47.0% → 52.0% | 45.5% → 53.0% | 48.5% → 57.5% |
| medium | 17.0% → 30.5% | 51.5% → 59.5% | 40.0% → 55.5% | 52.0% → 63.0% |
| hard | 25.5% → 29.0% | 50.5% → 55.0% | 33.0% → 44.0% | 41.0% → 49.0% |

## Interpretation

Three marks improve most Duskmantle cells; extending a single mark’s timer had not done so. Tending’s aura improves Sprig in every independently tested cell, unlike the previous larger instant-only extension. In the combined matrix the two strengthened heroes affect each other’s results; one hero’s aggregate win rate would hide this. These are observed bot outcomes, not human-balance guarantees.

Champignon remains favored in all pooled/per-level matchups. Champignon/Bramble spreads 78/71.5/57% (21 points); Bramble/Sprig and Duskmantle/Sprig have observed favored-side flips, flagged alongside all per-level data. Small flips near 50% are not significance claims. The prior one-attempt accuracy policy still limits how bots exploit extra time; no bot compensation or hit-score change was introduced to force 50%. Only one-star kits are tested here; later full-kit/human tests remain necessary. Faster Sweep is already corrected; the request for Tin Caps affecting at least three moles remains pending its own comparison, not folded into this trial.

## Verification

165 tests, production build and 14 desktop/mobile browser cases passed. New tests cover three marks across current/new moles, all-type/all-origin Tending spawns, once-only/non-stacking extension, strict aura-end boundary, retained earned time, expiry/no revival, pause/cast freeze, cleanse and round reset. Browser tests verify aura lifetime/pause, plus actual host/guest synchronization and side remapping. A protocol version bump rejects incompatible old snapshots; no permanent HUD panels or new sprite assets.

Reproduce adopted rules: `pnpm balance:roster --tier=1 --seeds=100 --seed=20261119`. Trial-specific explicit commands are in mark-aura-control.md, mark3-only.md, tending-aura-only.md and mark3-tending-aura.md.
