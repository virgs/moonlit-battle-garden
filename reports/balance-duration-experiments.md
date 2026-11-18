# AI accuracy and pacing experiment

Revision 60fa9b1 + working changes. Seeds 20261117–20261216. 100 seeds/group; mixed groups swap character sides. 3600 actual simulations; identical Easy/Medium configurations reuse baseline outcomes instead of running duplicates. No production configuration changed by this experiment.

Baseline is 97% Hard accuracy / 120 s ramp / 780 ms endpoint interval / 1500 ms endpoint lifetime. Accuracy-only variants use 95% or 94%. Faster-ramp variant uses a 60 s ramp, 600 ms endpoint interval and 1300 ms endpoint lifetime. Start values, 25 s waves/recovery, 500 ms interval floor, 1150 ms lifetime floor, concurrency, scoring and spells remain fixed. Combined variant applies 94% + faster ramp.

Durations include countdowns and shared cast freezes; result-screen input holds are excluded. Round metrics include **completed** rounds only, so caps must be considered alongside them. The cap is still 30 minutes for a whole simulated best-of-three match, not an in-game timer.

| Variant | AI | Matchup | Match median / p95 s | Round median / p95 s | Capped | Champ or left win % of decided |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| baseline | easy | andy-mirror | 186.7 / 321.3 | 57.6 / 154.5 | 0/100 | 55.0 |
| baseline | easy | champignon-mirror | 225.9 / 418.0 | 76.6 / 224.2 | 0/100 | 46.0 |
| baseline | easy | mixed | 192.3 / 352.9 | 70.9 / 193.3 | 0/200 | 55.0 |
| baseline | medium | andy-mirror | 304.9 / 624.1 | 118.0 / 309.8 | 0/100 | 56.0 |
| baseline | medium | champignon-mirror | 427.1 / 982.7 | 157.4 / 506.3 | 0/100 | 52.0 |
| baseline | medium | mixed | 375.7 / 758.6 | 139.7 / 422.1 | 0/200 | 68.5 |
| baseline | hard | andy-mirror | 640.4 / 1497.0 | 238.2 / 711.0 | 0/100 | 50.0 |
| baseline | hard | champignon-mirror | 978.8 / 1800.0 | 330.4 / 1007.0 | 15/100 | 49.4 |
| baseline | hard | mixed | 671.6 / 1617.3 | 254.2 / 770.7 | 6/200 | 74.2 |
| hard-95 | easy | andy-mirror | 186.7 / 321.3 | 57.6 / 154.5 | 0/100 | 55.0 |
| hard-95 | easy | champignon-mirror | 225.9 / 418.0 | 76.6 / 224.2 | 0/100 | 46.0 |
| hard-95 | easy | mixed | 192.3 / 352.9 | 70.9 / 193.3 | 0/200 | 55.0 |
| hard-95 | medium | andy-mirror | 304.9 / 624.1 | 118.0 / 309.8 | 0/100 | 56.0 |
| hard-95 | medium | champignon-mirror | 427.1 / 982.7 | 157.4 / 506.3 | 0/100 | 52.0 |
| hard-95 | medium | mixed | 375.7 / 758.6 | 139.7 / 422.1 | 0/200 | 68.5 |
| hard-95 | hard | andy-mirror | 509.1 / 1120.7 | 194.1 / 614.5 | 1/100 | 49.5 |
| hard-95 | hard | champignon-mirror | 704.6 / 1773.6 | 270.3 / 838.7 | 4/100 | 47.9 |
| hard-95 | hard | mixed | 549.8 / 1209.0 | 217.3 / 596.1 | 2/200 | 71.7 |
| hard-94 | easy | andy-mirror | 186.7 / 321.3 | 57.6 / 154.5 | 0/100 | 55.0 |
| hard-94 | easy | champignon-mirror | 225.9 / 418.0 | 76.6 / 224.2 | 0/100 | 46.0 |
| hard-94 | easy | mixed | 192.3 / 352.9 | 70.9 / 193.3 | 0/200 | 55.0 |
| hard-94 | medium | andy-mirror | 304.9 / 624.1 | 118.0 / 309.8 | 0/100 | 56.0 |
| hard-94 | medium | champignon-mirror | 427.1 / 982.7 | 157.4 / 506.3 | 0/100 | 52.0 |
| hard-94 | medium | mixed | 375.7 / 758.6 | 139.7 / 422.1 | 0/200 | 68.5 |
| hard-94 | hard | andy-mirror | 441.1 / 947.0 | 178.3 / 504.0 | 0/100 | 49.0 |
| hard-94 | hard | champignon-mirror | 650.6 / 1548.3 | 256.7 / 739.4 | 1/100 | 51.5 |
| hard-94 | hard | mixed | 535.5 / 1106.0 | 189.4 / 559.8 | 0/200 | 72.5 |
| faster-ramp | easy | andy-mirror | 162.2 / 304.9 | 57.6 / 155.4 | 0/100 | 56.0 |
| faster-ramp | easy | champignon-mirror | 188.2 / 449.3 | 66.5 / 201.5 | 0/100 | 53.0 |
| faster-ramp | easy | mixed | 166.5 / 357.3 | 63.1 / 173.5 | 0/200 | 50.5 |
| faster-ramp | medium | andy-mirror | 277.6 / 541.1 | 97.0 / 270.1 | 0/100 | 49.0 |
| faster-ramp | medium | champignon-mirror | 333.4 / 746.1 | 118.3 / 362.9 | 0/100 | 55.0 |
| faster-ramp | medium | mixed | 286.4 / 593.6 | 103.3 / 280.2 | 0/200 | 68.0 |
| faster-ramp | hard | andy-mirror | 515.3 / 929.5 | 183.2 / 593.8 | 0/100 | 53.0 |
| faster-ramp | hard | champignon-mirror | 656.3 / 1800.0 | 258.4 / 881.8 | 5/100 | 48.4 |
| faster-ramp | hard | mixed | 509.0 / 1219.0 | 205.2 / 590.1 | 0/200 | 77.0 |
| hard-94-faster-ramp | easy | andy-mirror | 162.2 / 304.9 | 57.6 / 155.4 | 0/100 | 56.0 |
| hard-94-faster-ramp | easy | champignon-mirror | 188.2 / 449.3 | 66.5 / 201.5 | 0/100 | 53.0 |
| hard-94-faster-ramp | easy | mixed | 166.5 / 357.3 | 63.1 / 173.5 | 0/200 | 50.5 |
| hard-94-faster-ramp | medium | andy-mirror | 277.6 / 541.1 | 97.0 / 270.1 | 0/100 | 49.0 |
| hard-94-faster-ramp | medium | champignon-mirror | 333.4 / 746.1 | 118.3 / 362.9 | 0/100 | 55.0 |
| hard-94-faster-ramp | medium | mixed | 286.4 / 593.6 | 103.3 / 280.2 | 0/200 | 68.0 |
| hard-94-faster-ramp | hard | andy-mirror | 358.4 / 838.9 | 130.9 / 395.3 | 0/100 | 57.0 |
| hard-94-faster-ramp | hard | champignon-mirror | 520.1 / 1018.6 | 186.1 / 547.0 | 0/100 | 53.0 |
| hard-94-faster-ramp | hard | mixed | 418.1 / 918.0 | 150.6 / 486.2 | 0/200 | 68.0 |

Pilot sample sizes are descriptive, not a declaration of balanced human play. Full records include per-round durations and tier cast coverage. Reproduce: `pnpm exec vite-node scripts/balance-experiments.ts --seeds=100 --seed=20261117 --report=balance-duration-experiments`.
