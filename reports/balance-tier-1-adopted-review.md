# Adopted one-star casting baseline

Historical before the continuous Sweep correction and longer Bud/Tending trials. Current rules/results: continuous-sweep-duration-review.md and balance-tier-1.md.

Current [pooled overview and Easy/Medium/Hard matrices](balance-tier-1.md); complete outcomes in balance-tier-1.json. This is an isolated one-star trial: one slot, no other tiers. Scaled is now the default, with 100 ms on-board visibility and 200–400 ms decision delay multiplied by Easy3/Medium2/Hard1. Normal full-kit AI is unchanged. Pacing and reaction settings remain fixed.

## Verification

Fresh 7,500-match run: 100 seeds per pairing/difficulty, swapped distinct-character sides (200 games per distinct cell/difficulty, 600 pooled) and 100 mirrors per hero/difficulty. Base seed 20261119. Zero timeouts. **All 7,500 per-match outcomes, casts, timing and decision metrics reproduce the prior explicitly selected scaled trial exactly.** Adoption therefore adds no untested numeric tuning. Reference profile comparison and full raw records remain in casting-delay-review.md and casting-scaled.json.

158 tests, production build and six desktop/mobile browser cases passed. Historical-baseline opportunity tests explicitly select their old profile and restore the adopted default afterward. Normal four-slot mode remains on its prior strategy.

## Current one-star spells

| Hero | Spell | Current actual rule |
|---|---|---|
| Sir Champignon | Clean Sweep | Busiest fixed column, immediate strike then every 1.5 s, 3 s active window; normal hits. |
| Andromoss | Borrowed Spark | Steal all enemy stars after 650 ms warning; charge cap one in this trial/four normally. Empty target wastes cast. |
| Captain Bramble | Tin Caps | Armor one enemy mole, one extra hit, 3 s active window. |
| Duskmantle | Ominous Bud | Mark one enemy mole within 8 s; missing it adds 4 points to the normal 8-point penalty. |
| Sprig | Gentle Tending | Add 700 ms to every current target, once per target; includes moles/rabbits/stars. |

All spells cost one charge in this mode. Mole+10, rabbit−12 unless guarded, star+25/+one charge; animations fit inside total lifetime. No strength changes in this adoption. Faster Sweep and Tin Caps affecting at least three moles remain recorded preferences for the next strength pass; Borrowed Spark/Sticky Fingers assignment review remains deferred.

## Interpretation

Champignon remains favored against every opponent in the pooled overview and every per-level matrix. Andromoss/Sprig and Duskmantle/Sprig show small observed favored-side flips (6.5-point spreads), flagged despite the near 50% rates; these are descriptive, not significance claims. No spread exceeds 20 points in this run. Per-hero tier coverage, mirrors and decision cancellations remain available. Only tier 1 is enabled, so tiers 2–4 are deliberately untested. Human playtesting and later full-kit checks remain necessary.

Reproduce: `pnpm balance:roster --tier=1 --casting=opportunity --seeds=100 --seed=20261119` (no profile flag required).
