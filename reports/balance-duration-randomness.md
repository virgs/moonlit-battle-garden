# AI accuracy and pacing experiment

Revision 60fa9b1 + working changes. Seeds 20261117–20261216. 100 seeds/group; mixed groups swap character sides. 4000 actual simulations; identical effective configurations reuse outcomes instead of running duplicates. No production configuration changed by this experiment.

Baseline is 97% Hard accuracy / 120 s ramp / 780 ms endpoint interval / 1500 ms endpoint lifetime. Accuracy-only variants use 95% or 94%. Faster-ramp variant uses a 60 s ramp, 600 ms endpoint interval and 1300 ms endpoint lifetime. Dense variants use the same 60 s ramp with a 360 ms endpoint interval and 300 ms interval floor. Start values, 25 s waves/recovery, 1150 ms lifetime floor, concurrency, scoring and spells remain fixed. Combined variants change both accuracy and pacing. Profile definitions: [{"name":"random-timing","accuracy":0.97,"pacing":{},"timing":{"easy":{"reactionJitter":0.25,"intervalJitter":0.25,"hesitationChance":0.08,"hesitationMinMs":600,"hesitationMaxMs":1100},"medium":{"reactionJitter":0.25,"intervalJitter":0.25,"hesitationChance":0.06,"hesitationMinMs":500,"hesitationMaxMs":900},"hard":{"reactionJitter":0.3,"intervalJitter":0.25,"hesitationChance":0.04,"hesitationMinMs":400,"hesitationMaxMs":850}}},{"name":"random-timing-faster","accuracy":0.97,"pacing":{"rampMs":60000,"endIntervalMs":600,"endLifetimeMs":1300},"timing":{"easy":{"reactionJitter":0.25,"intervalJitter":0.25,"hesitationChance":0.08,"hesitationMinMs":600,"hesitationMaxMs":1100},"medium":{"reactionJitter":0.25,"intervalJitter":0.25,"hesitationChance":0.06,"hesitationMinMs":500,"hesitationMaxMs":900},"hard":{"reactionJitter":0.3,"intervalJitter":0.25,"hesitationChance":0.04,"hesitationMinMs":400,"hesitationMaxMs":850}}},{"name":"random-timing-94-faster","accuracy":0.94,"pacing":{"rampMs":60000,"endIntervalMs":600,"endLifetimeMs":1300},"timing":{"easy":{"reactionJitter":0.25,"intervalJitter":0.25,"hesitationChance":0.08,"hesitationMinMs":600,"hesitationMaxMs":1100},"medium":{"reactionJitter":0.25,"intervalJitter":0.25,"hesitationChance":0.06,"hesitationMinMs":500,"hesitationMaxMs":900},"hard":{"reactionJitter":0.3,"intervalJitter":0.25,"hesitationChance":0.04,"hesitationMinMs":400,"hesitationMaxMs":850}}},{"name":"random-timing-wave","accuracy":0.94,"pacing":{"rampMs":60000,"endIntervalMs":600,"endLifetimeMs":1300,"minIntervalMs":300,"intervalPeak":0.4},"timing":{"easy":{"reactionJitter":0.25,"intervalJitter":0.25,"hesitationChance":0.08,"hesitationMinMs":600,"hesitationMaxMs":1100},"medium":{"reactionJitter":0.25,"intervalJitter":0.25,"hesitationChance":0.06,"hesitationMinMs":500,"hesitationMaxMs":900},"hard":{"reactionJitter":0.3,"intervalJitter":0.25,"hesitationChance":0.04,"hesitationMinMs":400,"hesitationMaxMs":850}}}].

Durations include countdowns and shared cast freezes; result-screen input holds are excluded. Round metrics include **completed** rounds only, so caps must be considered alongside them. The cap is still 30 minutes for a whole simulated best-of-three match, not an in-game timer.

| Variant | AI | Matchup | Match median / p95 s | Round median / p95 s | Capped | Champ or left win % of decided |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| random-timing | easy | andy-mirror | 174.3 / 324.8 | 62.4 / 171.7 | 0/100 | 57.0 |
| random-timing | easy | champignon-mirror | 199.4 / 413.6 | 66.8 / 204.3 | 0/100 | 55.0 |
| random-timing | easy | mixed | 196.2 / 366.5 | 68.1 / 191.7 | 0/200 | 56.5 |
| random-timing | medium | andy-mirror | 345.8 / 705.9 | 120.1 / 313.3 | 0/100 | 54.0 |
| random-timing | medium | champignon-mirror | 402.8 / 928.3 | 143.9 / 479.2 | 0/100 | 53.0 |
| random-timing | medium | mixed | 335.9 / 684.0 | 129.7 / 328.5 | 0/200 | 59.5 |
| random-timing | hard | andy-mirror | 599.0 / 1382.9 | 222.1 / 656.3 | 3/100 | 48.5 |
| random-timing | hard | champignon-mirror | 987.7 / 1800.0 | 314.6 / 1021.9 | 16/100 | 45.2 |
| random-timing | hard | mixed | 640.5 / 1736.6 | 251.3 / 791.5 | 9/200 | 74.3 |
| random-timing-faster | easy | andy-mirror | 149.8 / 329.6 | 54.0 / 140.2 | 0/100 | 57.0 |
| random-timing-faster | easy | champignon-mirror | 171.9 / 323.6 | 63.8 / 170.2 | 0/100 | 46.0 |
| random-timing-faster | easy | mixed | 158.3 / 315.9 | 57.6 / 160.5 | 0/200 | 45.5 |
| random-timing-faster | medium | andy-mirror | 226.4 / 519.7 | 88.8 / 262.5 | 0/100 | 53.0 |
| random-timing-faster | medium | champignon-mirror | 306.5 / 737.9 | 117.1 / 370.6 | 0/100 | 49.0 |
| random-timing-faster | medium | mixed | 277.2 / 590.4 | 101.5 / 264.4 | 0/200 | 67.5 |
| random-timing-faster | hard | andy-mirror | 466.4 / 1092.8 | 166.2 / 488.8 | 0/100 | 52.0 |
| random-timing-faster | hard | champignon-mirror | 604.9 / 1732.1 | 259.3 / 749.7 | 4/100 | 41.7 |
| random-timing-faster | hard | mixed | 483.7 / 1307.7 | 194.2 / 557.7 | 0/200 | 68.5 |
| random-timing-94-faster | easy | andy-mirror | 149.8 / 329.6 | 54.0 / 140.2 | 0/100 | 57.0 |
| random-timing-94-faster | easy | champignon-mirror | 171.9 / 323.6 | 63.8 / 170.2 | 0/100 | 46.0 |
| random-timing-94-faster | easy | mixed | 158.3 / 315.9 | 57.6 / 160.5 | 0/200 | 45.5 |
| random-timing-94-faster | medium | andy-mirror | 226.4 / 519.7 | 88.8 / 262.5 | 0/100 | 53.0 |
| random-timing-94-faster | medium | champignon-mirror | 306.5 / 737.9 | 117.1 / 370.6 | 0/100 | 49.0 |
| random-timing-94-faster | medium | mixed | 277.2 / 590.4 | 101.5 / 264.4 | 0/200 | 67.5 |
| random-timing-94-faster | hard | andy-mirror | 379.8 / 846.5 | 131.7 / 417.8 | 0/100 | 57.0 |
| random-timing-94-faster | hard | champignon-mirror | 486.3 / 1033.3 | 190.9 / 567.8 | 1/100 | 49.5 |
| random-timing-94-faster | hard | mixed | 414.4 / 875.3 | 146.8 / 449.3 | 0/200 | 68.0 |
| random-timing-wave | easy | andy-mirror | 144.9 / 251.1 | 51.4 / 128.6 | 0/100 | 55.0 |
| random-timing-wave | easy | champignon-mirror | 156.7 / 263.2 | 56.3 / 138.3 | 0/100 | 55.0 |
| random-timing-wave | easy | mixed | 152.7 / 308.9 | 55.1 / 139.6 | 0/200 | 42.0 |
| random-timing-wave | medium | andy-mirror | 176.3 / 416.4 | 72.0 / 165.3 | 0/100 | 51.0 |
| random-timing-wave | medium | champignon-mirror | 202.9 / 404.7 | 80.3 / 201.5 | 0/100 | 58.0 |
| random-timing-wave | medium | mixed | 191.1 / 384.4 | 74.5 / 182.9 | 0/200 | 47.0 |
| random-timing-wave | hard | andy-mirror | 344.3 / 662.1 | 121.5 / 295.0 | 0/100 | 60.0 |
| random-timing-wave | hard | champignon-mirror | 363.6 / 866.6 | 132.3 / 458.3 | 0/100 | 50.0 |
| random-timing-wave | hard | mixed | 317.8 / 770.5 | 117.5 / 355.6 | 0/200 | 65.5 |

Pilot sample sizes are descriptive, not a declaration of balanced human play. Full records include per-round durations and tier cast coverage. Reproduce: `pnpm exec vite-node scripts/balance-experiments.ts --seeds=100 --seed=20261117 --report=balance-duration-randomness --profiles=random-timing,random-timing-faster,random-timing-94-faster,random-timing-wave`.
