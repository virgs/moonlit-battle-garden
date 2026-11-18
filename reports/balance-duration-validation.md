# AI accuracy and pacing experiment

Revision 60fa9b1 + working changes. Seed source 20300101–20300600; schedule: mixed 32-bit seeds. 500 seeds/group; mixed groups swap character sides. 12000 actual simulations; identical effective configurations reuse outcomes instead of running duplicates. No production configuration changed by this experiment.

Baseline is 97% Hard accuracy / 120 s ramp / 780 ms endpoint interval / 1500 ms endpoint lifetime. Accuracy-only variants use 95% or 94%. Faster-ramp variant uses a 60 s ramp, 600 ms endpoint interval and 1300 ms endpoint lifetime. Dense variants use the same 60 s ramp with a 360 ms endpoint interval and 300 ms interval floor. Start values, 25 s waves/recovery, 1150 ms lifetime floor, concurrency, scoring and spells remain fixed. Combined variants change both accuracy and pacing. Profile definitions: [{"name":"baseline","accuracy":0.97,"pacing":{}},{"name":"random-wave-errors-feedback","accuracy":0.92,"accuracies":{"easy":0.7,"medium":0.87},"pacing":{"rampMs":60000,"endIntervalMs":600,"endLifetimeMs":1300,"minIntervalMs":300,"intervalPeak":0.4,"scoreIntervalReduction":0.05,"scoreLifetimeReduction":0.05},"timing":{"easy":{"reactionJitter":0.25,"intervalJitter":0.25,"hesitationChance":0.08,"hesitationMinMs":600,"hesitationMaxMs":1100},"medium":{"reactionJitter":0.25,"intervalJitter":0.25,"hesitationChance":0.06,"hesitationMinMs":500,"hesitationMaxMs":900},"hard":{"reactionJitter":0.3,"intervalJitter":0.25,"hesitationChance":0.04,"hesitationMinMs":400,"hesitationMaxMs":850}}}].

Durations include countdowns and shared cast freezes; result-screen input holds are excluded. Round metrics include **completed** rounds only, so caps must be considered alongside them. The cap is still 30 minutes for a whole simulated best-of-three match, not an in-game timer.

| Variant | AI | Matchup | Match median / p95 s | Round median / p95 s | Capped | Champ or left win % of decided |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| baseline | easy | andy-mirror | 189.7 / 364.6 | 67.1 / 183.0 | 0/500 | 47.8 |
| baseline | easy | champignon-mirror | 220.7 / 421.4 | 79.5 / 208.0 | 0/500 | 48.8 |
| baseline | easy | mixed | 200.1 / 396.0 | 73.9 / 190.5 | 0/1000 | 56.5 |
| baseline | medium | andy-mirror | 316.6 / 687.7 | 122.0 / 316.1 | 0/500 | 47.8 |
| baseline | medium | champignon-mirror | 457.6 / 1012.5 | 167.7 / 536.0 | 1/500 | 49.3 |
| baseline | medium | mixed | 362.6 / 795.1 | 137.9 / 377.2 | 0/1000 | 63.4 |
| baseline | hard | andy-mirror | 584.9 / 1409.2 | 221.3 / 692.6 | 7/500 | 49.9 |
| baseline | hard | champignon-mirror | 985.3 / 1800.0 | 342.1 / 1073.8 | 84/500 | 47.1 |
| baseline | hard | mixed | 682.3 / 1665.3 | 252.6 / 782.7 | 32/1000 | 74.8 |
| random-wave-errors-feedback | easy | andy-mirror | 149.5 / 285.3 | 51.9 / 144.2 | 0/500 | 48.8 |
| random-wave-errors-feedback | easy | champignon-mirror | 160.8 / 326.9 | 58.5 / 157.6 | 0/500 | 53.2 |
| random-wave-errors-feedback | easy | mixed | 149.5 / 309.4 | 53.4 / 147.8 | 0/1000 | 45.5 |
| random-wave-errors-feedback | medium | andy-mirror | 160.4 / 306.6 | 62.0 / 152.0 | 0/500 | 47.4 |
| random-wave-errors-feedback | medium | champignon-mirror | 195.2 / 373.9 | 72.3 / 202.4 | 0/500 | 49.0 |
| random-wave-errors-feedback | medium | mixed | 171.4 / 358.4 | 65.9 / 174.8 | 0/1000 | 49.5 |
| random-wave-errors-feedback | hard | andy-mirror | 215.3 / 466.1 | 79.2 / 227.6 | 0/500 | 47.0 |
| random-wave-errors-feedback | hard | champignon-mirror | 288.6 / 605.9 | 107.2 / 305.0 | 0/500 | 48.0 |
| random-wave-errors-feedback | hard | mixed | 245.3 / 507.2 | 89.2 / 254.6 | 0/1000 | 64.2 |

Pilot sample sizes are descriptive, not a declaration of balanced human play. Full records include per-round durations and tier cast coverage. Reproduce: `pnpm exec vite-node scripts/balance-experiments.ts --seeds=500 --seed=20300101 --report=balance-duration-validation --profiles=baseline,random-wave-errors-feedback --spread-seeds`.
