# AI accuracy and pacing experiment

Revision 60fa9b1 + working changes. Seeds 20261117–20261216. 100 seeds/group; mixed groups swap character sides. 2400 actual simulations; identical effective configurations reuse outcomes instead of running duplicates. No production configuration changed by this experiment.

Baseline is 97% Hard accuracy / 120 s ramp / 780 ms endpoint interval / 1500 ms endpoint lifetime. Accuracy-only variants use 95% or 94%. Faster-ramp variant uses a 60 s ramp, 600 ms endpoint interval and 1300 ms endpoint lifetime. Dense variants use the same 60 s ramp with a 360 ms endpoint interval and 300 ms interval floor. Start values, 25 s waves/recovery, 1150 ms lifetime floor, concurrency, scoring and spells remain fixed. Combined variants change both accuracy and pacing. Profile definitions: [{"name":"random-wave-errors","accuracy":0.92,"accuracies":{"easy":0.7,"medium":0.87},"pacing":{"rampMs":60000,"endIntervalMs":600,"endLifetimeMs":1300,"minIntervalMs":300,"intervalPeak":0.4},"timing":{"easy":{"reactionJitter":0.25,"intervalJitter":0.25,"hesitationChance":0.08,"hesitationMinMs":600,"hesitationMaxMs":1100},"medium":{"reactionJitter":0.25,"intervalJitter":0.25,"hesitationChance":0.06,"hesitationMinMs":500,"hesitationMaxMs":900},"hard":{"reactionJitter":0.3,"intervalJitter":0.25,"hesitationChance":0.04,"hesitationMinMs":400,"hesitationMaxMs":850}}},{"name":"random-wave-errors-feedback","accuracy":0.92,"accuracies":{"easy":0.7,"medium":0.87},"pacing":{"rampMs":60000,"endIntervalMs":600,"endLifetimeMs":1300,"minIntervalMs":300,"intervalPeak":0.4,"scoreIntervalReduction":0.05,"scoreLifetimeReduction":0.05},"timing":{"easy":{"reactionJitter":0.25,"intervalJitter":0.25,"hesitationChance":0.08,"hesitationMinMs":600,"hesitationMaxMs":1100},"medium":{"reactionJitter":0.25,"intervalJitter":0.25,"hesitationChance":0.06,"hesitationMinMs":500,"hesitationMaxMs":900},"hard":{"reactionJitter":0.3,"intervalJitter":0.25,"hesitationChance":0.04,"hesitationMinMs":400,"hesitationMaxMs":850}}}].

Durations include countdowns and shared cast freezes; result-screen input holds are excluded. Round metrics include **completed** rounds only, so caps must be considered alongside them. The cap is still 30 minutes for a whole simulated best-of-three match, not an in-game timer.

| Variant | AI | Matchup | Match median / p95 s | Round median / p95 s | Capped | Champ or left win % of decided |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| random-wave-errors | easy | andy-mirror | 141.1 / 305.6 | 49.8 / 134.7 | 0/100 | 59.0 |
| random-wave-errors | easy | champignon-mirror | 154.2 / 327.4 | 52.3 / 137.4 | 0/100 | 56.0 |
| random-wave-errors | easy | mixed | 144.9 / 289.5 | 52.0 / 136.4 | 0/200 | 43.5 |
| random-wave-errors | medium | andy-mirror | 169.6 / 324.4 | 62.6 / 178.3 | 0/100 | 55.0 |
| random-wave-errors | medium | champignon-mirror | 206.5 / 432.1 | 82.4 / 207.1 | 0/100 | 46.0 |
| random-wave-errors | medium | mixed | 180.3 / 351.5 | 70.7 / 175.5 | 0/200 | 49.5 |
| random-wave-errors | hard | andy-mirror | 247.6 / 632.4 | 94.9 / 280.9 | 0/100 | 56.0 |
| random-wave-errors | hard | champignon-mirror | 300.3 / 655.5 | 117.3 / 352.3 | 0/100 | 51.0 |
| random-wave-errors | hard | mixed | 277.1 / 606.0 | 106.0 / 303.4 | 0/200 | 66.5 |
| random-wave-errors-feedback | easy | andy-mirror | 160.2 / 293.3 | 55.5 / 140.2 | 0/100 | 55.0 |
| random-wave-errors-feedback | easy | champignon-mirror | 175.4 / 318.4 | 60.0 / 158.0 | 0/100 | 50.0 |
| random-wave-errors-feedback | easy | mixed | 150.2 / 269.3 | 53.0 / 136.6 | 0/200 | 46.5 |
| random-wave-errors-feedback | medium | andy-mirror | 168.6 / 330.3 | 67.2 / 165.3 | 0/100 | 52.0 |
| random-wave-errors-feedback | medium | champignon-mirror | 216.6 / 475.9 | 78.3 / 212.8 | 0/100 | 47.0 |
| random-wave-errors-feedback | medium | mixed | 181.9 / 363.1 | 74.2 / 160.8 | 0/200 | 49.5 |
| random-wave-errors-feedback | hard | andy-mirror | 226.6 / 448.4 | 82.0 / 208.3 | 0/100 | 52.0 |
| random-wave-errors-feedback | hard | champignon-mirror | 314.9 / 623.6 | 109.5 / 322.1 | 0/100 | 56.0 |
| random-wave-errors-feedback | hard | mixed | 241.7 / 515.0 | 88.2 / 253.6 | 0/200 | 65.0 |

Pilot sample sizes are descriptive, not a declaration of balanced human play. Full records include per-round durations and tier cast coverage. Reproduce: `pnpm exec vite-node scripts/balance-experiments.ts --seeds=100 --seed=20261117 --report=balance-duration-random-errors --profiles=random-wave-errors,random-wave-errors-feedback`.
