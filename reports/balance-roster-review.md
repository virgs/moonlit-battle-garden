# Roster integration: historical 20-seed balance review

This is the preserved launch review from commit 956e06e. The current expanded retune comparison is in [balance-retune-review.md](balance-retune-review.md). The launch raw dataset remains in Git history.

The user requested all five approved heroes as playable. These runs validate the shared simulation and expose provisional-kit issues; they are not a human-balance claim.

Two 1,500-match diagnostic stages used 20 seeds, all distinct pairings in both player-side assignments, and all mirrors at Easy/Medium/Hard. Both stages had **zero unfinished matches**. Full current data is in [balance-roster.md](balance-roster.md) and [balance-roster.json](balance-roster.json); the first policy is preserved separately.

## Strategy bias found and corrected

The first Bramble bot inherited Champignon’s emergency trigger for a busy board. It spent charges on one-star guards instead of reaching higher tiers. Easy never cast tier 4; Medium did so only twice across the roster run. Bramble now uses a defensive emergency only at actual guard tiers (1/3), when behind by at least 65 points and unguarded. Its ordinary randomized saving thresholds are retained. This corrects kit-specific decision logic; no spell numbers were changed to chase 50%.

| AI | Initial Bramble wins vs other heroes | Corrected-policy wins | Corrected tier 1/2/3/4 casts |
|---|---:|---:|---|
| easy | 89/160 (55.6%) | 106/160 (66.2%) | 606/117/90/51 |
| medium | 133/160 (83.1%) | 140/160 (87.5%) | 509/190/189/166 |
| hard | 142/160 (88.8%) | 136/160 (85.0%) | 567/229/263/256 |

## Limits and next balance work

- Bramble remains especially strong against Medium/Hard bots. Multi-hit armor consumes action budget and compounds per-strike accuracy; this is a human-facing mechanic plus a policy sensitivity, not just a number to equalize blindly.
- All tiers of the three new kits are exercised by current bots. Champignon Easy tier 4 remains unused and Medium tier 4 appears only once in this small run. Those policy/tier combinations are not adequately assessed by these results.
- Mirrors use only 20 seeds per hero/level here; they are smoke diagnostics, not a replacement for the earlier 1,000-seed harness validation.
- Original Champignon/Andromoss control battles are identical between the initial and corrected Bramble-policy runs. Their spell numbers and policy branches were preserved.
- Human keyboard/touch testing, alternative bot policies, armor counterplay and spell coverage should guide further tuning.

Current simulation hash: `136bb75a57b23163`. Reproduce with `pnpm balance:roster --seeds=20 --seed=20261118`.
