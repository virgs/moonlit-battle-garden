# AI accuracy and pacing experiment

Revision 60fa9b1 + working changes. Seeds 20261117–20261216. 100 seeds/group; mixed groups swap character sides. 4000 actual simulations; identical effective configurations reuse outcomes instead of running duplicates. No production configuration changed by this experiment.

Baseline is 97% Hard accuracy / 120 s ramp / 780 ms endpoint interval / 1500 ms endpoint lifetime. Accuracy-only variants use 95% or 94%. Faster-ramp variant uses a 60 s ramp, 600 ms endpoint interval and 1300 ms endpoint lifetime. Dense variants use the same 60 s ramp with a 360 ms endpoint interval and 300 ms interval floor. Start values, 25 s waves/recovery, 1150 ms lifetime floor, concurrency, scoring and spells remain fixed. Combined variants change both accuracy and pacing. Profile definitions: [{"name":"catchup-05","accuracy":0.97,"pacing":{"scoreIntervalReduction":0.05,"scoreLifetimeReduction":0.05}},{"name":"hard94-catchup-05","accuracy":0.94,"pacing":{"scoreIntervalReduction":0.05,"scoreLifetimeReduction":0.05}},{"name":"hard94-faster-catchup-05","accuracy":0.94,"pacing":{"rampMs":60000,"endIntervalMs":600,"endLifetimeMs":1300,"scoreIntervalReduction":0.05,"scoreLifetimeReduction":0.05}},{"name":"hard94-wave-peaks","accuracy":0.94,"pacing":{"rampMs":60000,"endIntervalMs":600,"endLifetimeMs":1300,"minIntervalMs":300,"intervalPeak":0.4}}].

Durations include countdowns and shared cast freezes; result-screen input holds are excluded. Round metrics include **completed** rounds only, so caps must be considered alongside them. The cap is still 30 minutes for a whole simulated best-of-three match, not an in-game timer.

| Variant | AI | Matchup | Match median / p95 s | Round median / p95 s | Capped | Champ or left win % of decided |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| catchup-05 | easy | andy-mirror | 182.9 / 380.6 | 67.0 / 182.5 | 0/100 | 52.0 |
| catchup-05 | easy | champignon-mirror | 202.3 / 429.9 | 78.2 / 192.9 | 0/100 | 56.0 |
| catchup-05 | easy | mixed | 187.3 / 406.8 | 68.5 / 197.3 | 0/200 | 53.0 |
| catchup-05 | medium | andy-mirror | 287.8 / 672.5 | 109.5 / 268.7 | 0/100 | 54.0 |
| catchup-05 | medium | champignon-mirror | 392.9 / 1033.2 | 142.0 / 440.6 | 0/100 | 53.0 |
| catchup-05 | medium | mixed | 322.1 / 679.0 | 115.9 / 361.6 | 0/200 | 63.5 |
| catchup-05 | hard | andy-mirror | 492.1 / 1025.5 | 194.3 / 535.4 | 1/100 | 44.4 |
| catchup-05 | hard | champignon-mirror | 751.6 / 1488.5 | 274.8 / 694.4 | 1/100 | 43.4 |
| catchup-05 | hard | mixed | 538.9 / 1177.2 | 203.7 / 537.8 | 0/200 | 74.5 |
| hard94-catchup-05 | easy | andy-mirror | 182.9 / 380.6 | 67.0 / 182.5 | 0/100 | 52.0 |
| hard94-catchup-05 | easy | champignon-mirror | 202.3 / 429.9 | 78.2 / 192.9 | 0/100 | 56.0 |
| hard94-catchup-05 | easy | mixed | 187.3 / 406.8 | 68.5 / 197.3 | 0/200 | 53.0 |
| hard94-catchup-05 | medium | andy-mirror | 287.8 / 672.5 | 109.5 / 268.7 | 0/100 | 54.0 |
| hard94-catchup-05 | medium | champignon-mirror | 392.9 / 1033.2 | 142.0 / 440.6 | 0/100 | 53.0 |
| hard94-catchup-05 | medium | mixed | 322.1 / 679.0 | 115.9 / 361.6 | 0/200 | 63.5 |
| hard94-catchup-05 | hard | andy-mirror | 439.3 / 875.4 | 155.4 / 429.6 | 0/100 | 50.0 |
| hard94-catchup-05 | hard | champignon-mirror | 564.5 / 1172.1 | 192.4 / 589.3 | 0/100 | 48.0 |
| hard94-catchup-05 | hard | mixed | 437.6 / 1006.9 | 165.3 / 453.6 | 1/200 | 74.9 |
| hard94-faster-catchup-05 | easy | andy-mirror | 162.3 / 328.7 | 62.0 / 151.9 | 0/100 | 56.0 |
| hard94-faster-catchup-05 | easy | champignon-mirror | 187.1 / 374.1 | 62.9 / 202.3 | 0/100 | 53.0 |
| hard94-faster-catchup-05 | easy | mixed | 165.9 / 336.3 | 59.4 / 183.6 | 0/200 | 53.0 |
| hard94-faster-catchup-05 | medium | andy-mirror | 256.8 / 475.1 | 88.2 / 258.7 | 0/100 | 50.0 |
| hard94-faster-catchup-05 | medium | champignon-mirror | 325.1 / 686.4 | 110.1 / 304.9 | 0/100 | 50.0 |
| hard94-faster-catchup-05 | medium | mixed | 256.0 / 520.7 | 96.0 / 234.3 | 0/200 | 60.5 |
| hard94-faster-catchup-05 | hard | andy-mirror | 398.9 / 729.8 | 132.2 / 340.8 | 0/100 | 53.0 |
| hard94-faster-catchup-05 | hard | champignon-mirror | 443.9 / 973.6 | 168.0 / 420.0 | 0/100 | 53.0 |
| hard94-faster-catchup-05 | hard | mixed | 362.6 / 716.0 | 135.0 / 351.9 | 0/200 | 69.5 |
| hard94-wave-peaks | easy | andy-mirror | 143.5 / 338.8 | 53.4 / 143.0 | 0/100 | 54.0 |
| hard94-wave-peaks | easy | champignon-mirror | 165.1 / 295.3 | 59.0 / 152.0 | 0/100 | 54.0 |
| hard94-wave-peaks | easy | mixed | 144.1 / 301.6 | 53.6 / 141.6 | 0/200 | 46.5 |
| hard94-wave-peaks | medium | andy-mirror | 197.4 / 495.9 | 78.1 / 212.8 | 0/100 | 51.0 |
| hard94-wave-peaks | medium | champignon-mirror | 294.8 / 670.1 | 110.5 / 293.6 | 0/100 | 46.0 |
| hard94-wave-peaks | medium | mixed | 241.7 / 572.1 | 87.8 / 278.8 | 0/200 | 43.5 |
| hard94-wave-peaks | hard | andy-mirror | 362.6 / 700.0 | 128.5 / 349.1 | 0/100 | 46.0 |
| hard94-wave-peaks | hard | champignon-mirror | 439.6 / 1067.5 | 166.1 / 477.6 | 0/100 | 48.0 |
| hard94-wave-peaks | hard | mixed | 361.1 / 809.1 | 132.6 / 390.9 | 0/200 | 69.0 |

Pilot sample sizes are descriptive, not a declaration of balanced human play. Full records include per-round durations and tier cast coverage. Reproduce: `pnpm exec vite-node scripts/balance-experiments.ts --seeds=100 --seed=20261117 --report=balance-duration-feedback --profiles=catchup-05,hard94-catchup-05,hard94-faster-catchup-05,hard94-wave-peaks`.
