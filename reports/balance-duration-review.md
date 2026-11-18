# AI randomness and round-duration tuning

2026-11-17. Adopted candidate: `random-wave-errors-feedback` in balance-duration-validation.json. Historical reference: balance-duration-reference.json. Baseline/candidate use identical held-out seeds and real Match/Bot simulation.

## Selected behavior

- Each visible target gets one seeded reaction delay: ±25% on Easy/Medium, ±30% on Hard. The sample is retained, rather than rerolled every frame.
- Action intervals vary ±25%. Occasional action-to-action hesitations: Easy 8% for 600–1100 ms, Medium 6% for 500–900 ms, Hard 4% for 400–850 ms. Timing uses a separate seeded stream from accuracy/spell decisions.
- Accuracy becomes 70% / 87% / 92% (was 72% / 90% / 97%). Base reaction times 900 / 560 / 280 ms and base intervals 600 / 360 / 220 ms remain. Hard retains the quickest and most reliable configuration. Rabbit-error probabilities and spell policies are unchanged.
- Preserve 12 s build / 5 s peak / 8 s recovery. Baseline ramps over 60 s, toward 600 ms natural interval / 1300 ms lifetime. Stronger peak multiplier 0.40 and 300 ms actual spawn floor create busier peaks while calm intervals remain slower. Initial intervals/windows, 1150 ms minimum target lifetime and five-natural/two-magic/one-star concurrency bounds remain.
- Keep losing-board catch-up, reduced from up to 10% to 5% faster offers/shorter fresh windows. Faster star opportunities remain. Scores, score-difference threshold 100, best-of-three rules, cast holds, and spells are unchanged. No round timer/winner cutoff was added. Every round restarts the same pacing curve.

## Independent validation

500 deterministically mixed, well-spread held-out 32-bit seeds per matchup: two mirrors plus both mixed-character side assignments, at every AI level. 6,000 actual matches per configuration, 12,000 total. Capped matches: original 124/6000; selected 0/6000. This is evidence from these samples, not a guarantee of no future stalemates.

The following table is mixed-character battles (1,000 per difficulty/configuration). Times are seconds; wins use decided matches.

| AI | Median round, before → after | Median match, before → after | Match p95, before → after | Champignon win rate after |
| --- | ---: | ---: | ---: | ---: |
| easy | 73.9 → 53.4 | 200.1 → 149.5 | 396.0 → 309.4 | 45.5% |
| medium | 137.9 → 65.9 | 362.6 → 171.4 | 795.1 → 358.4 | 49.5% |
| hard | 252.6 → 89.2 | 682.3 → 245.3 | 1665.3 → 507.2 | 64.2% |

Durations include countdowns and cast freezes; result-screen input holds are excluded. Round-duration summaries include completed rounds only, with unfinished matches recorded separately. The 30-minute diagnostic cap applies to a whole simulated match and never ends actual gameplay.

Held-out selected mirrors give left-side win rates: Andy 48.8/47.4/47.0%, Champignon 53.2/49.0/48.0% (Easy/Medium/Hard). No obvious consistent side advantage appears. The separate original 1,000-consecutive-seed mirror cohort also completed all 6,000 selected-config matches without caps: left rates Andy 46.9/49.6/50.4%, Champignon 47.3/49.7/52.3%. Andy Easy is borderline outside its individual nominal 95% reference interval; the held-out seed check does not reproduce that deviation. Do not tune a side to force an exact split across multiple correlated comparisons.

## Experiments retained

- balance-duration-experiments: accuracy-only 95%/94%, moderate faster ramp, and combination against baseline. These helped, but Hard matches remained long.
- balance-duration-dense: faster cadence throughout later waves. Rejected: Medium cross-character results shifted to 36% Champignon and calm periods became much busier.
- balance-duration-feedback: catch-up strength and stronger peak controls. Gentler feedback alone was insufficient.
- balance-duration-randomness: seeded timing variants. Timing alone did not solve the long ties; stronger peaks helped.
- balance-duration-random-errors: fallibility across all levels, with/without gentler catch-up; selected the latter for independent validation.
- balance-duration-validation: frozen baseline versus selected candidate on held-out seeds; full per-match round times and tier cast totals retained.
- balance-mirrors-duration-final: selected production YAML through the regular mirror runner, 1,000 original-cohort seeds per group.
- balance-duration-final: selected production YAML through the regular paired-character runner, 100 original-cohort seeds per side/difficulty. Wins Champignon/Andy: 92/108 Easy, 98/102 Medium, 130/70 Hard; no caps.

## Limits and remaining work

Medium is close to an even character split in this bot sample; Hard remains Champignon-favored at 64.2%. No spell strengths were changed to chase a bot-only 50%. Hard mirror tails remain: Champignon Hard median about 4m49s and p95 about 10m06s in held-out matches. Human playtesting must assess how the busier peaks and less mechanical opponents feel, particularly on touch screens. The suggested 45–90 s round / few-minute match target is met for mixed-character medians, not for every matchup or the long tail.

Reproduce independent comparison:

```sh
pnpm balance:experiments --seeds=500 --seed=20300101 --spread-seeds --profiles=baseline,random-wave-errors-feedback --report=balance-duration-validation
```

97 unit tests and 12 desktop/mobile browser checks passed, including seeded reaction bounds, polling-independent samples, hesitation cooldown, pause/cast gating, per-round duration accounting, actual score pressure, cast presentation and online synchronization. Production build passed.
