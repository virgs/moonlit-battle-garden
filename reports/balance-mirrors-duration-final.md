# AI mirror-match audit

Generated: 2026-11-18T03:02:52.934Z. Revision: 60fa9b1 + working changes. Config hash: 95f65d1d0d8a. Base seed: 20261117.

1000 seeds × two characters × three difficulties = 6000 actual best-of-three matches. Same character and AI difficulty on both sides. Uses the production simulateBattle/Match/Bot code, existing side-specific bot RNG seeds, alternating tick command order, score pressure, cast freezes and 30-minute diagnostic cap. The runner does not alter spell, bot, pacing or gameplay tuning. Each seed runs **once** per mirror matchup: swapping identical character names would merely duplicate the same deterministic match.

| Character | AI | Left wins | Right wins | Left % of decided | Nominal 95% interval | Unfinished | Median / p95 seconds |
| --- | --- | ---: | ---: | ---: | --- | ---: | --- |
| andy | easy | 469 | 531 | 46.9% | 43.8%–50.0% | 0/1000 | 140.2 / 277.6 |
| andy | medium | 496 | 504 | 49.6% | 46.5%–52.7% | 0/1000 | 165.6 / 325.9 |
| andy | hard | 504 | 496 | 50.4% | 47.3%–53.5% | 0/1000 | 219.3 / 471.6 |
| champignon | easy | 473 | 527 | 47.3% | 44.2%–50.4% | 0/1000 | 170.4 / 318.4 |
| champignon | medium | 497 | 503 | 49.7% | 46.6%–52.8% | 0/1000 | 197.8 / 415.7 |
| champignon | hard | 523 | 477 | 52.3% | 49.2%–55.4% | 0/1000 | 285.4 / 608.7 |

## Spell coverage by side

Tier 1 / 2 / 3 / 4 total casts, including capped matches:

- andy easy: left 1860 / 1288 / 1317 / 179; right 1819 / 1214 / 1371 / 171.
- andy medium: left 902 / 1427 / 2610 / 409; right 873 / 1430 / 2583 / 421.
- andy hard: left 1281 / 2037 / 4159 / 729; right 1220 / 2251 / 4262 / 672.
- champignon easy: left 9783 / 567 / 16 / 0; right 9747 / 547 / 23 / 0.
- champignon medium: left 10765 / 2342 / 278 / 97; right 10773 / 2357 / 277 / 63.
- champignon hard: left 9403 / 3987 / 1662 / 1033; right 9495 / 3902 / 1704 / 1029.

## Interpretation limits

Approximately 50/50 side wins are expected for symmetric rules and equally skilled bots over representative seeds, not exactly 50/50 in a finite batch. Wilson intervals are descriptive reference intervals: these deterministic consecutive-seed experiments are not a guarantee of independent random samples, and six groups are inspected. An isolated interval excluding 50% requires follow-up, not automatic tuning. Unfinished matches are neither draws nor wins and are excluded from decided-win percentages; high cap rates can hide bias and are a separate match-duration problem. Mirror symmetry checks side/harness bias but cannot establish cross-character balance, human fairness, or that both bots have strong spell strategies.

Reproduce: `pnpm balance:mirrors --seeds=1000 --seed=20261117 --report=balance-mirrors-duration-final`. Per-match records: balance-mirrors-duration-final.json.
