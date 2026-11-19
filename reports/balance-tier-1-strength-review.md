# Controlled one-star strength pass

Historical: these trials precede the shared half-second pacing and adopted scaled casting baseline. Current results are in balance-tier-1.md; this report preserves the earlier controlled comparisons.

Current [Easy/Medium/Hard matrices](balance-tier-1.md) and full per-match records in balance-tier-1.json. This pass changes only Clean Sweep cadence and Tin Caps target quota.

## Adopted settings

- Clean Sweep: immediate selected-column hit, then **1500 ms** between pulses during the same **3-second** window. Previously 250 ms. Normal mole rewards, rabbit penalties, star pickup and armor strikes remain.
- Tin Caps: **one mole**, previously two, with one extra hit during the same **3-second** window. Existing targets consume quota first; it can otherwise affect a new arrival.
- Royal Cleanup retains its separate **250 ms** cadence, full-board coverage, three-second window and original guards. Heavy Harvest retains four armored moles/two extra hits/three seconds. All other powers, hit scores, casting policy/decision delays and pacing unchanged.

## Controlled sampling and validation

Five candidates, each 7,500 matches: Sweep750 only, TinCaps1 only, combined750/1, Sweep1500 only and combined1500/1. The selected defaults were run again for another 7,500; **45,000 matches in this pass**, all completed without caps. Every candidate uses 100 seeds per pairing/difficulty, base seed 20261119, both sides for distinct pairs and 100 mirrors per hero/difficulty. The saved pre-change opportunity-policy reference uses the same seeds/sample.

The adopted-default rerun reproduces **all 7,500 selected combined1500 outcomes exactly**, including casts, timing and statistics. Config 1d17944a872d, simulation 532151b7837d8722. Full selected raw outcomes are stored once in balance-tier-1.json; compact trial rows/metrics/hashes and reproduction commands remain in the five tier1 trial reports. Reference raw data is at Git commit 9db9287. The source now splits Royal Cleanup cadence from Sweep so this tier-1 change does not spill into tier 4.

## Sweep-only effect, keeping Tin Caps unchanged

Cells show **Champignon wins before → after** the 1500 ms cadence change, against each opponent. These isolate the cadence effect, not the combined setting.

| AI | vs Andromoss | vs Bramble | vs Duskmantle | vs Sprig |
|---|---:|---:|---:|---:|
| Easy | 86.5% → 82.0% | 75.5% → 53.0% | 90.0% → 86.5% | 90.0% → 87.0% |
| Medium | 66.5% → 63.5% | 62.5% → 42.0% | 85.5% → 77.5% | 87.5% → 81.5% |
| Hard | 61.0% → 63.5% | 80.5% → 74.5% | 87.5% → 88.0% | 89.0% → 91.0% |

## Tin Caps-only effect, keeping Sweep unchanged

Cells show **Bramble wins before → after** the one-mole quota.

| AI | vs Champignon | vs Andromoss | vs Duskmantle | vs Sprig |
|---|---:|---:|---:|---:|
| Easy | 24.5% → 12.5% | 83.0% → 68.5% | 80.5% → 67.0% | 80.0% → 61.5% |
| Medium | 37.5% → 21.5% | 72.0% → 64.0% | 75.5% → 61.0% | 82.5% → 66.0% |
| Hard | 19.5% → 14.5% | 55.0% → 49.0% | 57.5% → 50.5% | 63.5% → 56.5% |

## Interpretation and remaining work

The 750 ms Sweep trial made only small changes. 1500 ms lowers its action capacity further and reduces wins in most Easy/Medium cells, but Hard results are mixed: fewer automatic strikes can also avoid rabbit penalties. This is a provisional mechanical nerf, not evidence of a consistent win-rate reduction. The initial multi-target column hit remains powerful; interval tuning alone does not establish balance. Do not silently remove normal hit rewards to force 50%.

Tin Caps quota one reduces Bramble’s results materially in the isolated trial. Combining it with a Sweep nerf changes their mutual matchup, so neither hero’s pooled win rate alone establishes improvement. Review the three current matrices. Champignon remains favored against every opponent; Bramble’s Hard performance is much less dominant. Further tuning should consider the initial Sweep hit/target budget or other heroes’ strength, with explicit review, rather than continue shortening active windows.

Casting opportunities, 300–700 ms delay, score values and other characters are held fixed. Theft still has one-slot/warning-time limitations; counterfactual spell value and human fairness are not inferred from these bots. Borrowed Spark/Sticky Fingers reassignment stays deferred. No full-kit tournament was run in this pass; prior full-kit results are historical after these changes. Human tests remain necessary.

## Verification

145 unit/simulation tests and production build passed. Cadence tests cover initial scoring, delayed subsequent hit, normal rewards and unchanged quarter-second Royal Cleanup. Existing armor-quota/freeze/reset/ward/target tests pass with the one-mole setting. All eight desktop/mobile browser cases passed, including lasting Sweep, Sprig automation, ordinary real WebRTC input/recovery, and Bramble armor synchronization.
