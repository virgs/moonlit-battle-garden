# Spell-free reaction diagnostic

Generated 2026-11-19T20:42:56.765Z; revision 437036d + working changes; config eb14dc75fe13; simulation 1d9655169f8d2e0e.

## Method

1500 fixed-duration sessions: 100 per hero/difficulty, all five heroes, both boards using the same AI difficulty. Each runs 120 active seconds without spells or score-difference victory, then drains remaining targets. Actual simulation, spawn rules, scoring/score-pressure and bot hit behavior are used; AI settings are unchanged. Fixed length ensures late waves are sampled rather than ending/resetting before the ramp completes. Normal match victory rules are unchanged.

Every hero produces exactly the same cohort outcomes for the same seed/difficulty, verified across all sessions. Primary tables use one hero only (100 distinct seeds, two boards each per difficulty); other heroes are duplicate controls, not five times the independent evidence. These are reaction measurements, not a versus balance tournament: there are no winners or meaningful hero win matrices with powers disabled.

Cohorts follow **target birth phase**, and ramp = before 60 seconds / steady = from 60 seconds onward. Denominator = actual targets appearing, not requested spawn offers or only attempted hits. Each cohort resolves fully; expired stars/rabbits count in its denominator, and no pending target is silently classified as missed. Rabbit-hit percentage is mistakes, so lower is better; zero at short lifetimes can mean inability to react rather than perfect recognition. Successful hit-age sums and actual lifetime ranges are in JSON. Spawn randomness, occupancy and score catch-up remain active. Casting is blocked in both Match and Bot; zero casts verified in every run.

## Late waves (after the ramp)

| AI | Wave phase | Moles hit | Stars collected | Rabbits hit (mistakes) |
|---|---|---:|---:|---:|
| easy | build | 0.0% (0/10005) | 0.0% (0/579) | 0.0% (0/2008) |
| easy | peak | 0.0% (0/7778) | 0.0% (0/446) | 0.0% (0/1669) |
| easy | recovery | 0.0% (0/7777) | 0.0% (0/459) | 0.0% (0/1529) |
| medium | build | 33.3% (3326/9998) | 37.2% (201/541) | 2.3% (47/2030) |
| medium | peak | 21.4% (1661/7759) | 22.2% (103/465) | 1.4% (23/1667) |
| medium | recovery | 31.2% (2431/7780) | 32.6% (156/478) | 2.3% (35/1525) |
| hard | build | 89.1% (8869/9950) | 89.3% (435/487) | 1.9% (39/2018) |
| hard | peak | 86.4% (6643/7693) | 80.2% (412/514) | 1.5% (25/1661) |
| hard | recovery | 87.7% (6790/7742) | 86.5% (397/459) | 1.8% (27/1528) |

## Ramp-up (first 60 active seconds)

| AI | Wave phase | Moles hit | Stars collected | Rabbits hit (mistakes) |
|---|---|---:|---:|---:|
| easy | build | 42.1% (3610/8582) | 44.8% (269/600) | 8.6% (122/1415) |
| easy | peak | 41.5% (1555/3749) | 47.0% (188/400) | 9.9% (69/694) |
| easy | recovery | 44.5% (1909/4293) | 48.5% (194/400) | 10.6% (75/710) |
| medium | build | 76.3% (6579/8624) | 78.3% (470/600) | 5.8% (83/1425) |
| medium | peak | 80.6% (3169/3934) | 83.3% (333/400) | 4.7% (34/725) |
| medium | recovery | 83.6% (3732/4463) | 83.3% (333/400) | 6.6% (48/726) |
| hard | build | 91.9% (7926/8629) | 90.7% (544/600) | 1.8% (26/1412) |
| hard | peak | 91.3% (3676/4025) | 90.5% (362/400) | 2.6% (19/737) |
| hard | recovery | 91.9% (4135/4498) | 90.8% (363/400) | 3.0% (22/742) |

## Interpretation

These rates combine reaction jitter, hit-action spacing, hit accuracy, hesitations and target prioritization. They do not measure a pure reaction-time probability alone. Stars get priority in the unchanged bot. No AI, casting or spell tuning in this pass; lower levels being unable to hit the fastest peaks is allowed. Full-kit balance reports predate this pacing change and need a later rerun; human playtesting remains necessary.

Reproduce: `pnpm diagnostic:reaction --seeds=100 --seed=20261119`.
