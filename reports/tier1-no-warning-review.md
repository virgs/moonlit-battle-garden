Historical pre-swap loadout, superseded by [current swap review](tier-swap-review.md).

# One-star audit after removing all hostile warnings

The user accepted one-star numerical powers in D127, then explicitly removed all spell warnings in D130. This audit changes only application timing: hostile spells now apply synchronously at cast start before shared freeze. Champignon continuous column/3 s, Andromoss all-charge theft (cap4), Bramble next three mole arrivals/no duration/one extra hit, Duskmantle three marks/8 s/+8 miss penalty, Sprig+750 ms once/6 s aura remain unchanged. Two-star guards cannot cast in this audit.

7,500 actual simulation matches, no unfinished,100 paired seeds,200 games per distinct pairing/difficulty,100 mirrors per hero/level. Same scaled tier1 opportunity policy. Do not treat the old warning as still active or retune accepted powers silently.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨55.3% | 🟨42.2%* | 🟩69.3% | 🟨57.7% |
| Andromoss | 🟨44.7% | — | 🟨43.7% | 🟨47.3% | 🟨49.3%* |
| Captain Bramble | 🟨57.8%* | 🟨56.3% | — | 🟩75.0% | 🟨58.7% |
| Duskmantle | 🟥30.7% | 🟨52.7% | 🟥25.0% | — | 🟨42.2%* |
| Sprig | 🟨42.3% | 🟨50.7%* | 🟨41.3% | 🟨57.8%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨55.5% | 🟨53.5% | 🟩70.0% | 🟨59.5% |
| Andromoss | 🟨44.5% | — | 🟨44.0% | 🟨47.5% | 🟨47.0% |
| Captain Bramble | 🟨46.5% | 🟨56.0% | — | 🟩69.5% | 🟨54.5% |
| Duskmantle | 🟥30.0% | 🟨52.5% | 🟥30.5% | — | 🟥36.5% |
| Sprig | 🟨40.5% | 🟨53.0% | 🟨45.5% | 🟩63.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨59.0% | 🟨41.0% | 🟩74.5% | 🟨51.5% |
| Andromoss | 🟨41.0% | — | 🟨43.0% | 🟨48.0% | 🟨51.0% |
| Captain Bramble | 🟨59.0% | 🟨57.0% | — | 🟩78.0% | 🟨56.0% |
| Duskmantle | 🟥25.5% | 🟨52.0% | 🟥22.0% | — | 🟥38.0% |
| Sprig | 🟨48.5% | 🟨49.0% | 🟨44.0% | 🟩62.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨51.5% | 🟥32.0% | 🟩63.5% | 🟩62.0% |
| Andromoss | 🟨48.5% | — | 🟨44.0% | 🟨46.5% | 🟨50.0% |
| Captain Bramble | 🟩68.0% | 🟨56.0% | — | 🟩77.5% | 🟩65.5% |
| Duskmantle | 🟥36.5% | 🟨53.5% | 🟥22.5% | — | 🟨52.0% |
| Sprig | 🟥38.0% | 🟨50.0% | 🟥34.5% | 🟨48.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 53.5%, medium 41.0%, hard 32.0%; spread 21.5 points; observed favored-side flip.
- Andromoss vs Sprig: easy 47.0%, medium 51.0%, hard 50.0%; spread 4.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 36.5%, medium 38.0%, hard 52.0%; spread 15.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.


## Before→after pooled pairs

| Row vs column | Previous650 ms | Current0 ms |
|---|---:|---:|
| champignon vs andromoss | 61.8% | 55.3% |
| champignon vs captain-bramble | 42.8% | 42.2% |
| champignon vs duskmantle | 71.0% | 69.3% |
| champignon vs sprig | 57.7% | 57.7% |
| andromoss vs captain-bramble | 28.0% | 43.7% |
| andromoss vs duskmantle | 41.8% | 47.3% |
| andromoss vs sprig | 43.2% | 49.3% |
| captain-bramble vs duskmantle | 78.0% | 75.0% |
| captain-bramble vs sprig | 59.0% | 58.7% |
| duskmantle vs sprig | 42.5% | 42.2% |

Andromoss benefits from stealing charge before it can be spent after casting. That explains the intended timing difference, not a claim of human balance or statistical significance of each rate movement. Existing difficulty flags/strategy caveats remain. [Full records](balance-tier-1.json). Reproduce: `pnpm balance:roster --tier=1 --seeds=100 --seed=20261119 --warning-ms=0`.
