# Spell retune: 100-seed comparison

## Sample and controls

- Same base seed (20261118), actual simulation and bot code, best-of-three matches.
- Baseline: 7,500 matches. Final: 7,500 matches. Neither run had unfinished games.
- Every distinct pairing has 200 matches (100 seeds played in both side assignments). Each mirror has 100 matches per AI level.
- Each hero participates in 800 distinct-opponent games plus 100 mirrors per level. Paired seeds are correlated; these are diagnostics, not independent human trials.
- Full baseline: `balance-roster-before-retune.json` / `.md`. Final: `balance-roster.json` / `.md`. Source hashes identify the exact simulation for each run.

## Aggregate wins against other heroes

| Hero | Easy: before → after | Medium: before → after | Hard: before → after |
|---|---:|---:|---:|
| Champignon | 41.0% → 12.8% | 38.8% → 12.0% | 44.1% → 43.3% |
| Andromoss | 45.3% → 46.3% | 42.3% → 53.5% | 34.5% → 39.3% |
| Bramble | 69.4% → 87.0% | 80.1% → 82.3% | 82.6% → 83.9% |
| Duskmantle | 46.0% → 49.4% | 44.1% → 57.3% | 47.8% → 54.1% |
| Sprig | 48.4% → 54.6% | 44.8% → 45.0% | 41.0% → 29.5% |

## Current matchup matrices

Row hero win rate against column hero. Green >60%, yellow 40–60%, red <40%. Diagonal omitted; mirror side results follow.

### Easy

| Against → | Champignon | Andromoss | Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Champignon | — | 🟥18.5% | 🟥4.5% | 🟥16.5% | 🟥11.5% |
| Andromoss | 🟩81.5% | — | 🟥15.0% | 🟨47.0% | 🟨41.5% |
| Bramble | 🟩95.5% | 🟩85.0% | — | 🟩86.0% | 🟩81.5% |
| Duskmantle | 🟩83.5% | 🟨53.0% | 🟥14.0% | — | 🟨47.0% |
| Sprig | 🟩88.5% | 🟨58.5% | 🟥18.5% | 🟨53.0% | — |

### Medium

| Against → | Champignon | Andromoss | Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Champignon | — | 🟥11.0% | 🟥7.5% | 🟥10.0% | 🟥19.5% |
| Andromoss | 🟩89.0% | — | 🟥24.0% | 🟨44.0% | 🟨57.0% |
| Bramble | 🟩92.5% | 🟩76.0% | — | 🟩78.5% | 🟩82.0% |
| Duskmantle | 🟩90.0% | 🟨56.0% | 🟥21.5% | — | 🟩61.5% |
| Sprig | 🟩80.5% | 🟨43.0% | 🟥18.0% | 🟥38.5% | — |

### Hard

| Against → | Champignon | Andromoss | Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Champignon | — | 🟨53.5% | 🟥11.5% | 🟥37.5% | 🟩70.5% |
| Andromoss | 🟨46.5% | — | 🟥20.5% | 🟥36.0% | 🟨54.0% |
| Bramble | 🟩88.5% | 🟩79.5% | — | 🟩79.0% | 🟩88.5% |
| Duskmantle | 🟩62.5% | 🟩64.0% | 🟥21.0% | — | 🟩69.0% |
| Sprig | 🟥29.5% | 🟨46.0% | 🟥11.5% | 🟥31.0% | — |

## Mirrors: left-side wins out of 100

| Hero | Easy | Medium | Hard |
|---|---:|---:|---:|
| Champignon | 51/100 | 56/100 | 50/100 |
| Andromoss | 65/100 | 54/100 | 54/100 |
| Bramble | 53/100 | 56/100 | 63/100 |
| Duskmantle | 49/100 | 51/100 | 53/100 |
| Sprig | 53/100 | 54/100 | 54/100 |

## Mechanics and policy findings

- One-star Clean Sweep lasts 3 active seconds, clearing moles/rabbits with zero clearing points; two-star Mushroom Guard keeps its 12-second window. Royal Cleanup shares the sweep window plus three guards.
- Empty Borrowed Spark / Sticky Fingers have no fallback shield; their star cost is still spent. Double Trouble still affects the opponent.
- Bramble one-star Tin Caps applies one extra mole strike for 6 seconds; two-star Bramble Brace blocks one mistake for up to 8 seconds. Tiers 3/4 retain their prior values.
- Sprig automation hits all targets in its busiest one/two selected columns every 250 ms, collecting stars and applying ordinary rabbit penalties. Armor consumes repeated separate strikes. Mole clears retain the prior 6-point reward; stars give ordinary 25 points plus one charge. Durations remain 6.5/8 seconds. Weed Out remains cleanse plus a 6-second hostile ward.
- The intermediate retuned run exposed a stale Champignon strategy: cheap zero-point clearing erased its own scoring opportunities. The preserved pair/coverage aggregates are in `balance-retune-initial-ai.json`. Its Medium/Hard win rates were 4.8%/10.6%.
- The corrected bot uses one-star sweep for actual near-expiry/armor/marked-target danger, avoids renewing an active sweep, and uses the swapped guard tiers correctly. This improves Hard Champignon substantially, but Easy/Medium still suffer from zero-point clearing. No numeric values were changed to chase 50%.
- Bramble remains dominant after moving armor to one star. Sprig’s faster automation adds star income but also rabbit mistakes; it is not safe clearing.
- Easy Champignon still does not use tiers 3/4 in the final run. More matches do not repair that policy-coverage gap; those tiers cannot be judged on those bot results.
- Next design choices: whether a lasting sweep should award mole points or preserve scoring targets while protecting against misses; and whether Bramble’s cheap armor needs shorter/weaker pressure. Human playtesting and alternate strategies remain needed.

No new assets or animations were generated.
