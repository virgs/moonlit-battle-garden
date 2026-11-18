# AI accuracy and pacing experiment

Revision 60fa9b1 + working changes. Seeds 20261117–20261216. 100 seeds/group; mixed groups swap character sides. 2000 actual simulations; identical effective configurations reuse outcomes instead of running duplicates. No production configuration changed by this experiment.

Baseline is 97% Hard accuracy / 120 s ramp / 780 ms endpoint interval / 1500 ms endpoint lifetime. Accuracy-only variants use 95% or 94%. Faster-ramp variant uses a 60 s ramp, 600 ms endpoint interval and 1300 ms endpoint lifetime. Dense variants use the same 60 s ramp with a 360 ms endpoint interval and 300 ms interval floor. Start values, 25 s waves/recovery, 1150 ms lifetime floor, concurrency, scoring and spells remain fixed. Combined variants change both accuracy and pacing. Profile definitions: [{"name":"dense-97","accuracy":0.97,"pacing":{"rampMs":60000,"endIntervalMs":360,"endLifetimeMs":1300,"minIntervalMs":300}},{"name":"dense-95","accuracy":0.95,"pacing":{"rampMs":60000,"endIntervalMs":360,"endLifetimeMs":1300,"minIntervalMs":300}},{"name":"dense-94","accuracy":0.94,"pacing":{"rampMs":60000,"endIntervalMs":360,"endLifetimeMs":1300,"minIntervalMs":300}}].

Durations include countdowns and shared cast freezes; result-screen input holds are excluded. Round metrics include **completed** rounds only, so caps must be considered alongside them. The cap is still 30 minutes for a whole simulated best-of-three match, not an in-game timer.

| Variant | AI | Matchup | Match median / p95 s | Round median / p95 s | Capped | Champ or left win % of decided |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| dense-97 | easy | andy-mirror | 161.7 / 295.6 | 56.6 / 124.3 | 0/100 | 63.0 |
| dense-97 | easy | champignon-mirror | 167.2 / 321.1 | 61.1 / 138.3 | 0/100 | 61.0 |
| dense-97 | easy | mixed | 150.8 / 284.1 | 54.5 / 131.8 | 0/200 | 51.0 |
| dense-97 | medium | andy-mirror | 239.8 / 478.6 | 80.3 / 216.3 | 0/100 | 54.0 |
| dense-97 | medium | champignon-mirror | 258.7 / 557.2 | 98.5 / 276.7 | 0/100 | 56.0 |
| dense-97 | medium | mixed | 240.2 / 519.5 | 91.0 / 225.2 | 0/200 | 36.0 |
| dense-97 | hard | andy-mirror | 429.4 / 957.5 | 164.1 / 476.2 | 0/100 | 46.0 |
| dense-97 | hard | champignon-mirror | 547.7 / 1258.5 | 204.0 / 636.9 | 0/100 | 46.0 |
| dense-97 | hard | mixed | 415.5 / 1025.5 | 164.9 / 483.8 | 0/200 | 69.0 |
| dense-95 | easy | andy-mirror | 161.7 / 295.6 | 56.6 / 124.3 | 0/100 | 63.0 |
| dense-95 | easy | champignon-mirror | 167.2 / 321.1 | 61.1 / 138.3 | 0/100 | 61.0 |
| dense-95 | easy | mixed | 150.8 / 284.1 | 54.5 / 131.8 | 0/200 | 51.0 |
| dense-95 | medium | andy-mirror | 239.8 / 478.6 | 80.3 / 216.3 | 0/100 | 54.0 |
| dense-95 | medium | champignon-mirror | 258.7 / 557.2 | 98.5 / 276.7 | 0/100 | 56.0 |
| dense-95 | medium | mixed | 240.2 / 519.5 | 91.0 / 225.2 | 0/200 | 36.0 |
| dense-95 | hard | andy-mirror | 345.3 / 750.4 | 127.2 / 364.1 | 0/100 | 48.0 |
| dense-95 | hard | champignon-mirror | 464.6 / 947.6 | 167.3 / 493.1 | 0/100 | 48.0 |
| dense-95 | hard | mixed | 353.5 / 782.0 | 134.0 / 393.1 | 0/200 | 70.0 |
| dense-94 | easy | andy-mirror | 161.7 / 295.6 | 56.6 / 124.3 | 0/100 | 63.0 |
| dense-94 | easy | champignon-mirror | 167.2 / 321.1 | 61.1 / 138.3 | 0/100 | 61.0 |
| dense-94 | easy | mixed | 150.8 / 284.1 | 54.5 / 131.8 | 0/200 | 51.0 |
| dense-94 | medium | andy-mirror | 239.8 / 478.6 | 80.3 / 216.3 | 0/100 | 54.0 |
| dense-94 | medium | champignon-mirror | 258.7 / 557.2 | 98.5 / 276.7 | 0/100 | 56.0 |
| dense-94 | medium | mixed | 240.2 / 519.5 | 91.0 / 225.2 | 0/200 | 36.0 |
| dense-94 | hard | andy-mirror | 317.9 / 653.6 | 120.6 / 343.4 | 0/100 | 49.0 |
| dense-94 | hard | champignon-mirror | 379.1 / 782.0 | 147.8 / 427.8 | 0/100 | 47.0 |
| dense-94 | hard | mixed | 337.4 / 727.3 | 132.6 / 338.3 | 0/200 | 64.5 |

Pilot sample sizes are descriptive, not a declaration of balanced human play. Full records include per-round durations and tier cast coverage. Reproduce: `pnpm exec vite-node scripts/balance-experiments.ts --seeds=100 --seed=20261117 --report=balance-duration-dense --profiles=dense-97,dense-95,dense-94`.
