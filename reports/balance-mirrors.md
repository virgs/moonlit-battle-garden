# AI mirror-match audit

Generated: 2026-11-18T02:37:25.288Z. Revision: 4939487 + working changes. Config hash: 7db8b0493f9b. Base seed: 20261117.

1000 seeds × two characters × three difficulties = 6000 actual best-of-three matches. Same character and AI difficulty on both sides. Uses the unmodified simulateBattle/Match/Bot code, existing side-specific bot RNG seeds, alternating tick command order, score pressure, cast freezes and 30-minute diagnostic cap. No spell, bot, pacing or gameplay tuning. Each seed runs **once** per mirror matchup: swapping identical character names would merely duplicate the same deterministic match.

| Character | AI | Left wins | Right wins | Left % of decided | Nominal 95% interval | Unfinished | Median / p95 seconds |
| --- | --- | ---: | ---: | ---: | --- | ---: | --- |
| andy | easy | 498 | 502 | 49.8% | 46.7%–52.9% | 0/1000 | 185.1 / 369.4 |
| andy | medium | 497 | 503 | 49.7% | 46.6%–52.8% | 0/1000 | 333.5 / 665.8 |
| andy | hard | 482 | 506 | 48.8% | 45.7%–51.9% | 12/1000 | 614.6 / 1502.0 |
| champignon | easy | 480 | 520 | 48.0% | 44.9%–51.1% | 0/1000 | 223.7 / 442.9 |
| champignon | medium | 495 | 504 | 49.5% | 46.5%–52.6% | 1/1000 | 458.4 / 1085.7 |
| champignon | hard | 418 | 418 | 50.0% | 46.6%–53.4% | 164/1000 | 997.9 / 1800.0 |

## Spell coverage by side

Tier 1 / 2 / 3 / 4 total casts, including capped matches:

- andy easy: left 2466 / 1847 / 2156 / 253; right 2417 / 1847 / 2079 / 278.
- andy medium: left 1797 / 3252 / 6421 / 1137; right 1837 / 3271 / 6293 / 1167.
- andy hard: left 3792 / 7178 / 14181 / 2617; right 3879 / 7395 / 14286 / 2614.
- champignon easy: left 9906 / 1932 / 472 / 100; right 9876 / 1999 / 464 / 116.
- champignon medium: left 10845 / 5532 / 3445 / 3410; right 10820 / 5508 / 3443 / 3440.
- champignon hard: left 13533 / 9446 / 7387 / 12511; right 13507 / 9488 / 7483 / 12435.

## Interpretation limits

Approximately 50/50 side wins are expected for symmetric rules and equally skilled bots over representative seeds, not exactly 50/50 in a finite batch. Wilson intervals are descriptive reference intervals: these deterministic consecutive-seed experiments are not a guarantee of independent random samples, and six groups are inspected. An isolated interval excluding 50% requires follow-up, not automatic tuning. Unfinished matches are neither draws nor wins and are excluded from decided-win percentages; high cap rates can hide bias and are a separate match-duration problem. Mirror symmetry checks side/harness bias but cannot establish cross-character balance, human fairness, or that both bots have strong spell strategies.

Reproduce: `pnpm balance:mirrors --seeds=1000 --seed=20261117`. Per-match records: balance-mirrors.json.

## Assessment of this run

Left-side decided win rates range from 48.0% to 50.0%; all six descriptive 95% Wilson intervals include 50%. This provides no obvious evidence of a left/right advantage in the current harness, while not proving all simulation/bot behavior is correct.

Duration is a separate unresolved issue. Andy Hard capped 12/1000 matches; Champignon Medium capped 1/1000; Champignon Hard capped 164/1000 (16.4%) and had a median simulated match duration of 997.9 seconds (about 16 minutes 38 seconds). Other groups had no capped matches. The 30-minute cap is diagnostic only; real matches do not award a time-based winner. These results support investigating stalemates and spell/bot interactions before further tuning based only on character win rates.
