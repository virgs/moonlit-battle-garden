Historical tuning, superseded by [Gentle Tending +750 ms update](tending750-review.md).

# Three-mole armor, stronger marks and six-second Tending

| Hero | Spell | Before | Current |
|---|---|---|---|
| Sir Champignon | Clean Sweep | Same | Busiest fixed column, initial hit and arrivals continuously / 3 s / normal rewards and rabbit penalties |
| Andromoss | Borrowed Spark | Same | All enemy charge at resolution, capacity capped; 650 ms hostile warning after cast freeze, empty meter wasted |
| Captain Bramble | Tin Caps | One mole / 3 s | Three enemy moles / 3 s / one extra hit each |
| Duskmantle | Ominous Bud | Three marks / 8 s / +6 missed-mark penalty | Three marks / 8 s / +8 missed-mark penalty (16 total) |
| Sprig | Gentle Tending | +0.5 s once per target / 4.5 s aura | +0.5 s once per target / 6 s aura |

Tending includes current/arriving moles, rabbits and stars; its earned bonus persists after aura end, with no second bonus on recasts. Other powers, pacing, reaction and scaled casting decisions unchanged. Hostile warning timing is explained, not changed; stars can be spent during the warning and wards can block theft.

## Method

Previous baseline retained in [raw reference](before-three-mole-tuning.json). Three independent trials, one combined trial and an adopted-default verification: **37,500 matches**, zero unfinished. Each 7,500-match run uses 100 paired seeds, 200 games per distinct pairing/difficulty, 100 mirrors per hero/difficulty, real simulation and bots. Isolated one-star meter; other tiers disabled. All 7,500 adopted outcomes and numeric config hash exactly match combined trial.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.8% | 🟨46.5%* | 🟩71.0% | 🟨60.0% |
| Andromoss | 🟥38.2% | — | 🟥31.0% | 🟨41.8% | 🟨41.8% |
| Captain Bramble | 🟨53.5%* | 🟩69.0% | — | 🟩74.0% | 🟨57.8% |
| Duskmantle | 🟥29.0% | 🟨58.2% | 🟥26.0% | — | 🟨43.3%* |
| Sprig | 🟨40.0% | 🟨58.2% | 🟨42.2% | 🟨56.7%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩64.5% | 🟩62.0% | 🟩71.0% | 🟩63.5% |
| Andromoss | 🟥35.5% | — | 🟥35.5% | 🟨41.0% | 🟨41.5% |
| Captain Bramble | 🟥38.0% | 🟩64.5% | — | 🟩65.5% | 🟨53.0% |
| Duskmantle | 🟥29.0% | 🟨59.0% | 🟥34.5% | — | 🟥35.0% |
| Sprig | 🟥36.5% | 🟨58.5% | 🟨47.0% | 🟩65.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩61.0% | 🟨44.0% | 🟩74.5% | 🟨54.0% |
| Andromoss | 🟥39.0% | — | 🟥30.5% | 🟨41.5% | 🟨42.0% |
| Captain Bramble | 🟨56.0% | 🟩69.5% | — | 🟩79.0% | 🟨54.5% |
| Duskmantle | 🟥25.5% | 🟨58.5% | 🟥21.0% | — | 🟥39.0% |
| Sprig | 🟨46.0% | 🟨58.0% | 🟨45.5% | 🟩61.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨60.0% | 🟥33.5% | 🟩67.5% | 🟩62.5% |
| Andromoss | 🟨40.0% | — | 🟥27.0% | 🟨43.0% | 🟨42.0% |
| Captain Bramble | 🟩66.5% | 🟩73.0% | — | 🟩77.5% | 🟩66.0% |
| Duskmantle | 🟥32.5% | 🟨57.0% | 🟥22.5% | — | 🟨56.0% |
| Sprig | 🟥37.5% | 🟨58.0% | 🟥34.0% | 🟨44.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 62.0%, medium 44.0%, hard 33.5%; spread 28.5 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 35.0%, medium 39.0%, hard 56.0%; spread 21.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.


## Independent changes, pooled versus comparisons

Row hero wins against opponent, percentages.

| Hero | Opponent | Previous | Tin Caps only | Bud only | Tending only | Combined |
|---|---|---:|---:|---:|---:|---:|
| captain-bramble | champignon | 31.2% | 53.5% | 31.2% | 31.2% | 53.5% |
| captain-bramble | andromoss | 55.7% | 69.0% | 55.7% | 55.7% | 69.0% |
| captain-bramble | duskmantle | 52.0% | 76.0% | 48.7% | 52.0% | 74.0% |
| captain-bramble | sprig | 40.8% | 66.5% | 40.8% | 33.7% | 57.8% |
| duskmantle | champignon | 26.5% | 26.5% | 29.0% | 26.5% | 29.0% |
| duskmantle | andromoss | 55.0% | 55.0% | 58.2% | 55.0% | 58.2% |
| duskmantle | captain-bramble | 48.0% | 24.0% | 51.3% | 48.0% | 26.0% |
| duskmantle | sprig | 47.5% | 47.5% | 53.2% | 38.5% | 43.3% |
| sprig | champignon | 34.2% | 34.2% | 34.2% | 40.0% | 40.0% |
| sprig | andromoss | 56.7% | 56.7% | 56.7% | 58.2% | 58.2% |
| sprig | captain-bramble | 59.2% | 33.5% | 59.2% | 66.3% | 42.2% |
| sprig | duskmantle | 52.5% | 52.5% | 46.8% | 61.5% | 56.7% |

## Interpretation

Three-mole Tin Caps is a substantial buff: Bramble now has a pooled advantage over Champignon and is strongly favored against Duskmantle. Champignon remains strong against other opponents; Andromoss remains behind. Higher miss penalty and longer aura cannot be treated as universally balanced by pooled percentages: Bramble/Champignon and Duskmantle/Sprig have level-dependent flips; see exact flags above. No further unrequested tuning applied.

Bots use one accuracy attempt per target unless surviving armor allows another strike, and cast only under opportunity/urgency conditions. Examine spell coverage and human play before targeting 50%; these runs do not establish full-kit balance or statistical significance of small differences.

## Reproduction

- [tin3-only](tin3-only.md), [data](tin3-only.json): `pnpm balance:roster --tier=1 --seeds=100 --seed=20261119 --armor-targets=3 --mark-bonus=6 --tending-ms=4500 --report=tin3-only`
- [bud8-extra8-only](bud8-extra8-only.md), [data](bud8-extra8-only.json): `pnpm balance:roster --tier=1 --seeds=100 --seed=20261119 --armor-targets=1 --mark-bonus=8 --tending-ms=4500 --report=bud8-extra8-only`
- [tending6-only](tending6-only.md), [data](tending6-only.json): `pnpm balance:roster --tier=1 --seeds=100 --seed=20261119 --armor-targets=1 --mark-bonus=6 --tending-ms=6000 --report=tending6-only`
- [tin3-bud8-tending6](tin3-bud8-tending6.md), [data](tin3-bud8-tending6.json): `pnpm balance:roster --tier=1 --seeds=100 --seed=20261119 --armor-targets=3 --mark-bonus=8 --tending-ms=6000 --report=tin3-bud8-tending6`

Validation: 167 simulation tests, production build and 8 desktop/mobile browser cases passed, including six-second expiry/pause and online armor/aura synchronization.
