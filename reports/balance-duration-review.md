# Historical duration-only balance comparison

Superseded by D104/D105 and balance-normal-hits-review.md; these settings are not current defaults.

## Adopted durations

- Champignon Clean Sweep and Royal Cleanup clearing window: **3 → 1 active second**. Guards/wards retain their existing durations and charges.
- Bramble Tin Caps / Heavy Harvest armor window: **6 → 2 active seconds**. Extra-hit counts remain one/two; guards retain their 8-second window.
- No spell costs, scoring rules, bot policies or other spell values changed during these trials. No new artwork.

## Sampling and selection

All five candidates used the same 100 seeds as the reference: 200 games per distinct matchup and 100 mirrors per hero/level, or 7,500 matches each. All completed without caps. Difficulty contributions are equal. Paired seeds are correlated; these are not independent human trials.

The selected candidate improves every pooled Champignon matchup and reduces every pooled Bramble matchup advantage relative to the reference. It is the strongest tested duration-only improvement, not a claim that the roster is balanced. The adopted YAML was run again and reproduces the selected trial’s full per-match outcomes exactly.

| Variant | Armor s | Sweep s | Champignon vs Bramble | Bramble vs Andromoss | Bramble vs Duskmantle | Bramble vs Sprig |
|---|---:|---:|---:|---:|---:|---:|
| Reference | 6 | 3 | 7.8% | 80.2% | 81.2% | 84.0% |
| duration-armor4 | 4 | 3 | 10.8% | 75.5% | 78.2% | 79.3% |
| duration-sweep1 | 6 | 1 | 13.0% | 80.2% | 81.2% | 84.0% |
| duration-armor4-sweep1 | 4 | 1 | 16.2% | 75.5% | 78.2% | 79.3% |
| duration-armor3-sweep1 | 3 | 1 | 21.5% | 76.2% | 72.8% | 74.8% |
| duration-armor2-sweep1 | 2 | 1 | 24.3% | 66.5% | 66.8% | 69.7% |

## Main versus matrix after adoption

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨40.5%* | 🟥24.3% | 🟥34.8%* | 🟨45.5%* |
| Andromoss | 🟨59.5%* | — | 🟥33.5% | 🟨42.3% | 🟨50.8% |
| Captain Bramble | 🟩75.7% | 🟩66.5% | — | 🟩66.8% | 🟩69.7%* |
| Duskmantle | 🟩65.2%* | 🟨57.7% | 🟥33.2% | — | 🟨59.2%* |
| Sprig | 🟨54.5%* | 🟨49.2% | 🟥30.3%* | 🟨40.8%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Reference versus matrix

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟥27.7%* | 🟥7.8% | 🟥21.3%* | 🟥33.8%* |
| Andromoss | 🟩72.3%* | — | 🟥19.8% | 🟨42.3% | 🟨50.8% |
| Captain Bramble | 🟩92.2% | 🟩80.2% | — | 🟩81.2% | 🟩84.0% |
| Duskmantle | 🟩78.7%* | 🟨57.7% | 🟥18.8% | — | 🟨59.2%* |
| Sprig | 🟩66.2%* | 🟨49.2% | 🟥16.0% | 🟨40.8%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty differences remain relevant

Pooling is the overview, not a replacement for per-level checks. For example, adopted Champignon vs Sprig wins are **27.5% Easy, 30.5% Medium, 78.5% Hard**. The pooled 45.5% masks that counter flip; the asterisk exposes the spread. Historical level rows, mirrors and spell coverage remain in `power-reference.json`; full raw outcomes are preserved at Git commit 100af6f.

## Coverage and next decisions

Easy Champignon still never uses tiers 3/4 under the current policy. More samples do not repair that coverage gap. The zero-point clearing mechanic and timing-sensitive multi-hit armor remain structural questions; no extra policy/numeric changes were made to chase 50%. Bramble still wins most pairings, so more tuning and human input testing are required.

## Reproduction

Check out Git commit 100af6f to reproduce historical sub-three-second settings: `pnpm balance:roster --seeds=100 --seed=20261118 --report=duration-armor2-sweep1 --armor-ms=2000 --sweep-ms=1000`. The current runner rejects those settings per D104. Reference source/config hashes and per-level counts remain in `duration-reference.json`; trial parameters and aggregates stay in the five duration JSON files. Raw outcomes for that historical candidate are preserved in `balance-roster.json` at Git commit 100af6f; the current file uses D105 normal-hit rules.
