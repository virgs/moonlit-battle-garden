Historical tuning, superseded by [three-mole / penalty / aura update](three-mole-penalty-tending-review.md).

# Bud penalty and Tending duration update

| Hero | Spell | Previous | Adopted |
|---|---|---|---|
| Duskmantle | Ominous Bud | Three marks / 12 s / +4 miss penalty | Three marks / **8 s** / **+6** miss penalty (14 total) |
| Sprig | Gentle Tending | +0.5 s once per target / 3 s aura | +0.5 s once per target / **4.5 s aura** (+50%) |

Only those parameters change. Normal point values, other powers, wave pacing, reaction times and scaled casting remain fixed. Current targets and arrivals receive Tending once, including stars/rabbits; bonuses survive aura expiry.

## Method and verification

Four independent/combined runs of 7,500 matches each, then a 7,500-match adopted-default rerun: **37,500 matches**, zero unfinished. Each run uses 100 paired seeds (200 games per distinct matchup per difficulty), 100 mirrors per hero/difficulty, isolated tier 1 with one charge slot, actual simulation and bots. Control reproduces all 7,500 previous outcomes exactly; adopted defaults reproduce all combined-trial outcomes and the numeric configuration hash exactly. Trial source hashes precede the final default/description edits.

## Current pooled versus matrix

Row wins against column, all three difficulties pooled. 🟩 >60%, 🟨 40–60%, 🟥 <40%. * marks >20-point difficulty spread or observed favored-side flip.

| Against → | Champignon | Andromoss | Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Champignon | — | 🟩61.8% | 🟩68.8%* | 🟩73.5% | 🟩65.8% |
| Andromoss | 🟥38.2% | — | 🟨44.3% | 🟨45.0% | 🟨43.3% |
| Bramble | 🟥31.2%* | 🟨55.7% | — | 🟨52.0%* | 🟨40.8% |
| Duskmantle | 🟥26.5% | 🟨55.0% | 🟨48.0%* | — | 🟨47.5%* |
| Sprig | 🟥34.2% | 🟨56.7% | 🟨59.2% | 🟨52.5%* | — |

[Easy / Medium / Hard matrices, spell coverage and full diagnostics](balance-tier-1.md).

## Duskmantle independent changes

Pooled row win rate; percentages, not percentage-point changes.

| Opponent | Old control | Bud only | Tending only | Both adopted |
|---|---:|---:|---:|---:|
| Champignon | 24.5% | 26.5% | 24.5% | 26.5% |
| Andromoss | 53.3% | 55.0% | 53.3% | 55.0% |
| Bramble | 44.5% | 48.0% | 44.5% | 48.0% |
| Sprig | 47.2% | 50.8% | 40.7% | 47.5% |
## Sprig independent changes

Pooled row win rate; percentages, not percentage-point changes.

| Opponent | Old control | Bud only | Tending only | Both adopted |
|---|---:|---:|---:|---:|
| Champignon | 28.0% | 28.0% | 34.2% | 34.2% |
| Andromoss | 55.5% | 55.5% | 56.7% | 56.7% |
| Bramble | 50.8% | 50.8% | 59.2% | 59.2% |
| Duskmantle | 52.8% | 49.2% | 59.3% | 52.5% |

## Difficulty sensitivity and limitations

- champignon vs captain-bramble: easy 78.0%, medium 71.5%, hard 57.0%. Spread 21.0 points.
- captain-bramble vs duskmantle: easy 47.5%, medium 52.5%, hard 56.0%. Observed favored-side flip. Spread 8.5 points.
- duskmantle vs sprig: easy 45.0%, medium 41.0%, hard 56.5%. Observed favored-side flip. Spread 15.5 points.

Both intended heroes improve in their independent pooled matchups; combined head-to-head effects are mixed by difficulty. Champignon remains favored. Flags are descriptive, not evidence of statistical significance. Same-seed controls isolate these changes under this bot policy; one-attempt target accuracy and urgency-based cast decisions affect benefit coverage. This does not establish full-kit or human balance. Keep the current tests/strategy rather than forcing a bot-only 50%.

## Reproduction and retained data

- [bud-aura-timing-control](bud-aura-timing-control.md), [data](bud-aura-timing-control.json): `pnpm balance:roster --tier=1 --seeds=100 --seed=20261119 --ominous-marks=3 --ominous-ms=12000 --mark-bonus=4 --extension-ms=500 --tending-ms=3000 --report=bud-aura-timing-control`
- [bud8-penalty6-only](bud8-penalty6-only.md), [data](bud8-penalty6-only.json): `pnpm balance:roster --tier=1 --seeds=100 --seed=20261119 --ominous-marks=3 --ominous-ms=8000 --mark-bonus=6 --extension-ms=500 --tending-ms=3000 --report=bud8-penalty6-only`
- [tending4500-only](tending4500-only.md), [data](tending4500-only.json): `pnpm balance:roster --tier=1 --seeds=100 --seed=20261119 --ominous-marks=3 --ominous-ms=12000 --mark-bonus=4 --extension-ms=500 --tending-ms=4500 --report=tending4500-only`
- [bud8-penalty6-tending4500](bud8-penalty6-tending4500.md), [data](bud8-penalty6-tending4500.json): `pnpm balance:roster --tier=1 --seeds=100 --seed=20261119 --ominous-marks=3 --ominous-ms=8000 --mark-bonus=6 --extension-ms=500 --tending-ms=4500 --report=bud8-penalty6-tending4500`

Validation: 166 simulation tests, production build and 14 desktop/mobile browser checks pass, including pause, aura expiry and online synchronization.

An additional explicit >3 s / 4.5 s boundary assertion passed desktop/mobile sequentially (2 cases). Its parallel attempt timed out before casting while waiting for a first star; the original 14-case run passed. This is a browser setup/timing limitation, not a failing duration assertion.
