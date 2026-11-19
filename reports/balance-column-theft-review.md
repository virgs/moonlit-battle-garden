# One-column Sweep and all-star Borrowed Spark

D106 corrects two implementation assumptions: one-star Clean Sweep covers one column, not the full board; Borrowed Spark steals every enemy star rather than copying one. The preceding full-board balance diagnosis was based on incorrect scope.

## Exact rules

- Clean Sweep selects the busiest column at cast time, leftmost on ties, and stays on that column for three active seconds. It hits immediately then every 250 ms; normal mole rewards, rabbit penalties/guards, star points/charge and extra armor strikes apply. The selector is provisional implementation behavior, not a separately user-confirmed choice.
- Royal Cleanup keeps all three columns for three seconds plus three mistake guards for 12 seconds.
- Borrowed Spark spends one charge then, after the existing hostile warning, removes every enemy star and adds that amount to the caster, capped at four. A ward blocks it; an empty meter wastes the cast. It awards no points. Resolution uses charge at resolution time, including changes during the warning.
- All other spell durations, costs and scoring are unchanged. Sticky Fingers still steals up to two stars for three-star cost; this now overlaps poorly with Borrowed Spark and needs explicit design review. No silent tier-3 redesign.
- Bots judge Sweep harvest/danger only inside the same selected column. No theft-priority changes or special bot rewards. One-column placeholders and shared snapshots show the actual affected column; round reset clears selection.

## Sampling

7,500 best-of-three matches, seed 20261118, 100 seeds per pairing/AI level, swapped sides for distinct pairings (200 per distinct matrix cell), 100 mirrors per hero/level. Zero unfinished matches. Config 87c48ed2b980; simulation fc62e9ff2c8e461c. Full data and command in balance-roster.json/.md.

## Corrected versus matrices

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩88.0% | 🟩87.5% | 🟩92.5% | 🟩87.0% |
| Andromoss | 🟥12.0% | — | 🟨40.0% | 🟨48.0% | 🟥38.0% |
| Captain Bramble | 🟥12.5% | 🟨60.0% | — | 🟩63.0% | 🟨45.0% |
| Duskmantle | 🟥7.5% | 🟨52.0% | 🟥37.0% | — | 🟨42.0% |
| Sprig | 🟥13.0% | 🟩62.0% | 🟨55.0% | 🟨58.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩80.5% | 🟩70.5% | 🟩80.0% | 🟩80.5% |
| Andromoss | 🟥19.5% | — | 🟥39.0% | 🟨43.0% | 🟨49.0% |
| Captain Bramble | 🟥29.5% | 🟩61.0% | — | 🟩64.0% | 🟨54.0% |
| Duskmantle | 🟥20.0% | 🟨57.0% | 🟥36.0% | — | 🟨53.0% |
| Sprig | 🟥19.5% | 🟨51.0% | 🟨46.0% | 🟨47.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩79.5% | 🟨59.5% | 🟩70.0% | 🟩79.5% |
| Andromoss | 🟥20.5% | — | 🟥33.0% | 🟥35.0% | 🟨46.0% |
| Captain Bramble | 🟨40.5% | 🟩67.0% | — | 🟩65.5% | 🟩68.5% |
| Duskmantle | 🟥30.0% | 🟩65.0% | 🟥34.5% | — | 🟩66.0% |
| Sprig | 🟥20.5% | 🟨54.0% | 🟥31.5% | 🟥34.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.


## Comparison limits and findings

Compared with the saved full-board/normal-hit run, Champignon’s aggregate distinct-opponent win rates fall from 98.0% to 88.8% (Easy), 85.9% to 77.9% (Medium), and 75.6% to 72.1% (Hard). These aggregates are context only; the matrices above retain opponent differences. Champignon remains favored. Both spell corrections plus scope-aware bot decisions changed together, so the differences do not isolate a duration or theft effect.

Andromoss’s aggregate wins move 29.9% → 34.5% Easy, 36.1% → 37.6% Medium, and 34.8% → 33.6% Hard. The correction does not establish a consistent buff across all difficulties. Review tier choices, timing and the now-overlapping theft spells before another numerical tuning pass. Easy Champignon still never casts tiers 3/4; more seeds do not resolve policy coverage. Human playtests remain needed.

The previous run’s aggregate rows/coverage/hashes are in normal-armor2-4.json; its full raw outcomes are preserved at Git commit 662dbf8. Do not compare against historical zero-point sweeping as though only scope changed.

## Verification

129 unit/simulation tests and production build passed. Tests cover fixed-column scope/new arrivals, stable selection/ties, normal rewards and penalties, armor, freeze/reset, full-board Royal Cleanup, all 1–4 enemy charge amounts, transfer cap, warning delay, empty-meter waste and wards. All 12 desktop/mobile browser cases passed, including one-column effect geometry and shared gameplay/online behavior.
