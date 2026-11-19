# Continuous Sweep and longer one-star spell trials

Current [pooled overview and difficulty matrices](balance-tier-1.md). This pass corrects Clean Sweep semantics, then tests duration-only changes for Ominous Bud and Gentle Tending.

## Current rules: before → after

| Spell | Before | Current provisional rule |
|---|---|---|
| Clean Sweep | Initial selected-column hit, then every 1.5 s for 3 s | Hit selected column immediately and keep hitting whatever appears there for 3 active seconds; no artificial strike interval. |
| Ominous Bud | One mark, +4 missed-mole penalty, 8 s window | Same one mark/+4 penalty, 12 s window. |
| Gentle Tending | Instant +700 ms to current targets, once per target | Instant +1200 ms to current targets, once per target. |

Clean Sweep applies a normal hit to every occupied unexpired hole in its fixed busiest column on cast, and once per 50 ms simulation tick after new spawns are placed. New arrivals are therefore hit on the same update they appear. Rabbit penalties, star points/charge, guards and repeated armor strikes use the normal shared hit path; no duplicate scoring. It stops at the 3 s boundary, freezes with gameplay, and does not affect other columns. Royal Cleanup retains full-board 250 ms pulses and guards. The obsolete cadence flag is rejected rather than silently ignored; older cadence trials require their recorded Git revision.

Ominous Bud’s window is now independently configured so Withering Pact retains its existing 8 s duration/four-mark quota. A single mark is spent on one mole; the mole’s own lifetime is not extended. When it is hit/escapes, the mark is gone. Gentle Tending has no active aura: it changes expiry instantly for all current moles/rabbits/stars, including marked targets, and never repeatedly extends the same target. Future arrivals are unaffected until another cast. No Tin Caps, theft, pacing, AI reaction or adopted casting-delay change.

## Controlled runs

Four 7,500-match profiles, each using 100 paired seeds per matchup/difficulty, base 20261119: corrected-Sweep control (Bud 8 s/Tending 700 ms), Bud 12 s only, Tending 1200 ms only, both. Then a fresh 7,500-match default run: **37,500 matches total, zero caps**. Distinct per-level cells have 200 matches; pooled cells 600; mirrors 100 per hero/level.

All 7,500 default per-match outcomes/statistics reproduce the combined trial exactly. Bud 12 s alone reproduces every control outcome exactly; adding Bud 12 s to Tending 1200 ms reproduces every Tending-only outcome exactly. Raw outcomes are retained once for the control and once for the final combined setting; trial JSON files explicitly reference the identical outcome set while retaining their own configuration, overrides, source hashes and aggregates. The pre-correction cadence reference is in sweep-duration-reference.json; full earlier raw records remain at Git commit a1841a7.

## Findings

**Longer Ominous Bud did not improve these results.** The 8 s window already covers the single marked mole; extra seconds do not add marks or make that mole remain alive longer. No hidden penalty/quota buff was added. 12 s remains a provisional duration as requested, not a demonstrated balance improvement.

**Longer Gentle Tending has mixed effects.** The comparison below holds the corrected Sweep fixed; each cell is Sprig wins before → after increasing only the extension.

| AI | vs Champignon | vs Andromoss | vs Bramble | vs Duskmantle |
|---|---:|---:|---:|---:|
| easy | 17.0% → 20.5% | 47.0% → 47.0% | 45.0% → 45.5% | 51.0% → 48.5% |
| medium | 23.0% → 17.0% | 53.5% → 51.5% | 39.5% → 40.0% | 50.0% → 52.0% |
| hard | 24.0% → 25.5% | 48.5% → 50.5% | 37.0% → 33.0% | 44.5% → 41.0% |

Do not interpret this as a clean estimate of human spell value. Bots roll accuracy once per ordinary target and do not reconsider a target deliberately skipped by that roll; extra time therefore does not grant a fresh accuracy attempt. It can still help a target awaiting reaction/action, while extending rabbits and keeping holes occupied too. Human players can use extra time differently. No bot strategy change or probability compensation was made to chase 50%.

Corrected Sweep increases Champignon’s advantage; pooled wins are 61.8–79.8% across opponents. The Champignon/Bramble matchup spreads 78% Easy / 71.5% Medium / 57% Hard (21 points), flagged alongside smaller observed favored-side flips. Use the per-level matrices, coverage and future human tests. These provisional changes do not establish balanced spells.

## Verification

161 tests, production build and 12 desktop/mobile browser checks passed. New tests exercise real same-tick natural-spawn interception, correct column, normal rewards/penalties, one armor strike per tick, three-second cutoff, unchanged quarter-second Royal Cleanup, separate tier-1/tier-4 mark durations and one-mark quota, and instant all-target/non-stacking extension. All active spell windows still meet the three-second floor; the extension is an instant lifetime change.

Reproduce final: `pnpm balance:roster --tier=1 --seeds=100 --seed=20261119`.

Reproduce corrected control: add `--ominous-ms=8000 --extension-ms=700 --report=sweep-continuous-control`. Use the trial-specific commands in sweep-bud12.md / sweep-tending1200.md / sweep-both-longer.md for individual profiles.
