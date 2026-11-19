# One-star opportunity-casting trial

Current three-difficulty matrices and full per-match data: [tier1-strength-reference.md](tier1-strength-reference.md) / compact tier1-strength-reference.json; full raw data at Git commit 9db9287. Historical immediate-policy results: [balance-tier-1-immediate.md](balance-tier-1-immediate.md); compact rows, metrics and hashes in balance-tier-1-immediate.json, full raw outcomes at Git commit eaa9436.

## What changed

Only the one-star diagnostic casting policy changed. Both runs use 100 seeds per pairing/difficulty, seed 20261119, swapped sides for distinct pairs and mirrors: 7,500 best-of-three matches each, zero caps. Ordinary spell powers, hit rules, score values, pacing, costs, durations and difficulty values remain unchanged.

Every hero now requires a visible useful opportunity, then a shared 300–700 active ms random delay. It is sampled once per opportunity on the tick grid with an independent seeded RNG, identical across difficulties. Bots continue hitting while they decide. Lost/invalid target witnesses or enemy charge cancel/restart the decision; round reset clears it. Valid additions do not continually restart the same witness. Full meter/cooldown readiness is still required. Conditions and thresholds are provisional implementation choices, documented in prototype.md (D108/I07).

- Sweep: its actual busiest column contains a mole/star without rabbits, or an urgent mole within 1,000 ms of escape. Avoid renewing an active sweep.
- Borrowed Spark: enemy charge exists at scheduling and immediately before casting. The enemy may still spend it during the existing hostile warning.
- Tin Caps / Ominous Bud: enemy has an unarmored / unmarked visible mole, respectively.
- Gentle Tending: own unextended visible mole is within 1,000 ms of escape.
- Visible means at least 200 ms old and not expired. No character-specific casting probability, difficulty-dependent casting delay, future-spawn knowledge or extra bot rewards.

## Findings

| AI | Immediate theft empty at resolution | Opportunity theft empty at resolution |
|---|---:|---:|
| Easy | 98.0% | 55.4% |
| Medium | 98.3% | 31.8% |
| Hard | 98.2% | 12.4% |

Empty resolution is legitimate warning-time counterplay under the current one-slot economy. It is distinct from casting when the enemy already has no charge, which this policy avoids. The shared casting delay does not make opportunity persistence or enemy hit timing equal across difficulties.

Champignon is favored against every opponent at every level: 75.5–90% Easy, 62.5–87.5% Medium, 61–89% Hard. Its prior Hard losses under indiscriminate immediate casting do not survive this policy. Bramble beats every opponent except Champignon on all three levels. These comparisons show that decision policy materially affects measured spell strength; they do not yet prove any specific numeric nerf is correct. No power tuning performed.

Mirrors show 50–60/100 left wins across fifteen hero/difficulty groups (Champignon 50/53/54). The earlier 61–62% Champignon signals are absent in this sample; this is not proof the harness has no bias. Duskmantle Hard is 60/100. Fine tuning still needs larger independent mirror samples and human tests. Swapped distinct-character sides and fixed seeds are controls, not guarantees.

Points/penalties in reports are observed totals from all play; guard savings are exact. No counterfactual offensive spell value is claimed. The one-slot meter still restricts theft and removes normal cross-tier counters. Borrowed Spark/Sticky Fingers reassignment remains deferred. Higher-tier opportunity conditions are not designed/run; explicit opportunity policy is restricted to tier 1, while immediate remains available for baseline work.

## Verification and reproduction

143 unit/simulation tests, production build and six desktop/mobile browser cases passed. New tests cover per-spell usefulness, visibility/expiry, shared delay across difficulties, lost opportunities/new delays, stable witnesses, pause/round reset, cooldown and warning-time counterplay. Six normal-mode matches reproduce saved outcomes exactly; six immediate-policy matches reproduce historical outcomes, timing, casts and metrics exactly. Browser/full-kit gameplay is unchanged.

Current: `pnpm balance:roster --tier=1 --casting=opportunity --seeds=100 --seed=20261119`.

Historical policy: `pnpm balance:roster --tier=1 --casting=immediate --seeds=100 --seed=20261119` (separate default report name protects current results).
