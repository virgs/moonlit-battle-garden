# Historical immediate-casting one-star trial

Full three-difficulty matrices, matchup counts, mirrors, coverage and observed impact are in [balance-tier-1-immediate.md](balance-tier-1-immediate.md); full per-match records are in balance-tier-1.json at Git commit eaa9436.

## Rules and sample

- One charge slot, only tier 1 can cast; all bots cast on the first free simulation tick when full/cooldown-ready. No character-specific casting strategy or usefulness checks.
- Ordinary scoring, hit difficulty, spells, duration, warning, freeze and spawn rules unchanged. No spell renames/swaps or tuning in this pass.
- 100 seeds per pairing/difficulty, both sides for distinct pairs, 100 mirrors per hero/difficulty: 7,500 best-of-three matches. Seed 20261119. Zero timeouts. Every recorded cast is tier 1.
- This is an offline diagnostic, not a new browser menu mode. Higher-tier harness support is present but tiers 2–4 have not been run or balanced.

## Findings

- **Difficulty still matters strongly.** Champignon wins every Easy matchup (76–91%), but loses every Hard matchup (28.5–39.5%). This demonstrates that a uniform casting policy does not make spell strength independent of hitting skill.
- **Bramble is strong across all levels.** It beats every opponent except Champignon on Easy; its lowest Medium/Hard win rates are 52.5%/67%. Target quota/extra-hit pressure remains a candidate for a later, controlled adjustment; none made now.
- **Borrowed Spark is almost always wasted in this setup.** Empty-meter casts are 98.0% Easy, 98.3% Medium and 98.2% Hard. With one slot and immediate casting, opponents rarely retain stars through the hostile warning. This is a restriction of this resource-economy test, not enough evidence to buff theft's ordinary four-slot version. The requested Borrowed Spark/Sticky Fingers assignment review remains deferred.
- **A uniform policy can cast at poor times.** For example, Sweep can hit rabbits; its negative Hard outcome needs examination against normal hit accuracy and actual target mix. Do not attribute the entire difference to any one cause from win rates alone.
- **Mirror results need caution.** Left-side wins span 44–62/100. Champignon is 61% Medium and 62% Hard, which warrant a larger independent-seed mirror follow-up before fine percentage-based tuning. Fifteen mirror groups were inspected; a finite 100-seed group is not proof of side bias or 50/50 fairness. Paired seeds and swapped sides reduce orientation confounding in distinct-character matrices but are not a substitute for auditing the harness.

## What the metrics mean

Per-match points earned/lost include all hits and penalties, not only spell effects. Guard prevention counts exact absorbed penalties; stolen/received charge distinguishes enemy loss from caster overflow. These are observations, not estimates of how many points an offensive spell would have prevented in a counterfactual match. No cast probabilities or point rewards were adjusted to force 50%.

## Verification

136 tests and production build passed. Six desktop/mobile browser checks passed for ordinary gameplay/real local WebRTC. Six saved normal-mode matches across all difficulties reproduced exactly (winner, timing, scores and casts) after adding the diagnostic. New tests exercise tier capacity, lower-tier rejection, uniform casting across all five heroes/all difficulties/all tiers, cooldown/pause/freeze gates, theft capacity/empty casts, metrics and deterministic tier-1 simulation.

Next: resolve the resource-spell interpretation and audit the mirror signals before making one controlled tier-1 adjustment. Complete-kit and human testing remain necessary after isolated-tier tuning.
