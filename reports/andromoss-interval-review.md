# Andromoss rabbit interval tuning (D139)

## Current spells and change

| Hero | Stars | Before → current effect | Duration |
|---|---|---|---|
| Andromoss | 1★ | Extra enemy rabbits every0.85 s → **1 s** | 8 active seconds |
| Andromoss | 2★ | New enemy moles receive85% normal wave lifetime, unchanged | 8 active seconds |
| Andromoss | 3★ | Steal all enemy stars, received amount capped by own capacity, unchanged | Instant |
| Andromoss | 4★ | Extra enemy rabbits every0.65 s → **0.75 s**, plus unchanged85% new-mole lifetime | 8 active seconds |

Both rabbit rates decrease, as explicitly confirmed by the user. Four-star is not an absolute buff. No new assets, other hero powers, casting rules, target lifetime rules, caps or bot policy changes. Existing wards still block hostile casts, with no warning. Gameplay pauses during the shared1.5 s cast animation.

## Same-seed interval comparison

The previous fixed-opponent raw run is preserved at Git551e756:reports/andromoss-fixed-opponents.json; compact pre-change metadata/results in andromoss-interval-before.json. Both use100 paired seeds starting20261119,200 games/cell/difficulty,600 pooled/cell. Opponents use only4★. Enemy Andromoss also changes, so its comparison is not against an unchanged enemy power. Other four opponents remain identical.

| Andromoss tier | Champignon4★ before → now | Andromoss4★ before → now | Bramble4★ before → now | Duskmantle4★ before → now | Sprig4★ before → now |
|---|---:|---:|---:|---:|---:|
| 1★ | 61.7% → 54.3% | 59.7% → 57.8% | 45.7% → 43.2% | 64.3% → 60.3% | 76.2% → 73.2% |
| 2★ | 40.5% → 40.5% | 50.7% → 52.0% | 37.3% → 37.3% | 56.2% → 56.2% | 49.3% → 49.3% |
| 3★ | 47.7% → 47.7% | 49.8% → 49.5% | 48.8% → 48.8% | 49.2% → 49.2% | 48.8% → 48.8% |
| 4★ | 43.5% → 42.8% | 50.0% → 50.0% | 36.3% → 36.8% | 54.8% → 54.7% | 60.2% → 60.3% |

One-star wins fall2.5–7.3 points against the four unchanged enemies. Four-star results move less than1 point either way; this run does not establish that the new4★ is stronger. Cheaper1★ still wins more often than4★ in each pooled fixed-enemy matchup; per-level counter flips remain. Hard1★ versus Bramble4★ is20%, but versus Sprig4★ is88.5%; Easy is70.5% and63%. The outcome depends on enemy ability and hit/decision behavior, not just nominal rabbit rate.

3,200 unaffected2★/3★ records versus non-Andromoss enemies reproduce the prior run exactly, including statistics. Selected-tier meters remain capped at the selected cost, so3★ can remove4 stars but receive only3 here; ordinary full-kit capacity is4. This is not a per-cast/resource-efficiency or optimal strategy ranking. Normal bots may favor theft instead of saving4★; human playtesting remains necessary.

## Fixed-opponent pooled and per-level matrices

| Andromoss vs → | Sir Champignon 4★ | Andromoss 4★ | Captain Bramble 4★ | Duskmantle 4★ | Sprig 4★ |
|---|---:|---:|---:|---:|---:|
| 1★ | 🟨54.3%* | 🟨57.8% | 🟨43.2%* | 🟩60.3%* | 🟩73.2%* |
| 2★ | 🟨40.5% | 🟨52.0%* | 🟥37.3%* | 🟨56.2% | 🟨49.3%* |
| 3★ | 🟨47.7% | 🟨49.5% | 🟨48.8% | 🟨49.2% | 🟨48.8% |
| 4★ | 🟨42.8% | 🟨50.0% | 🟥36.8%* | 🟨54.7% | 🟩60.3%* |

## easy

| Andromoss vs → | Sir Champignon 4★ | Andromoss 4★ | Captain Bramble 4★ | Duskmantle 4★ | Sprig 4★ |
|---|---:|---:|---:|---:|---:|
| 1★ | 🟩61.5% | 🟩64.5% | 🟩70.5% | 🟩71.5% | 🟩63.0% |
| 2★ | 🟨47.0% | 🟨51.5% | 🟨53.5% | 🟨56.5% | 🟨49.0% |
| 3★ | 🟨48.5% | 🟨50.0% | 🟨50.0% | 🟨49.0% | 🟨49.0% |
| 4★ | 🟨48.0% | 🟨50.0% | 🟨52.0% | 🟨54.0% | 🟨48.5% |

## medium

| Andromoss vs → | Sir Champignon 4★ | Andromoss 4★ | Captain Bramble 4★ | Duskmantle 4★ | Sprig 4★ |
|---|---:|---:|---:|---:|---:|
| 1★ | 🟨53.5% | 🟨55.0% | 🟥39.0% | 🟩61.0% | 🟩68.0% |
| 2★ | 🟨45.5% | 🟨55.0% | 🟨42.0% | 🟩62.0% | 🟨46.5% |
| 3★ | 🟨46.5% | 🟨49.0% | 🟨47.5% | 🟨48.5% | 🟨48.5% |
| 4★ | 🟨40.5% | 🟨50.0% | 🟥39.0% | 🟨56.5% | 🟨56.5% |

## hard

| Andromoss vs → | Sir Champignon 4★ | Andromoss 4★ | Captain Bramble 4★ | Duskmantle 4★ | Sprig 4★ |
|---|---:|---:|---:|---:|---:|
| 1★ | 🟨48.0% | 🟨54.0% | 🟥20.0% | 🟨48.5% | 🟩88.5% |
| 2★ | 🟥29.0% | 🟨49.5% | 🟥16.5% | 🟨50.0% | 🟨52.5% |
| 3★ | 🟨48.0% | 🟨49.5% | 🟨49.0% | 🟨50.0% | 🟨49.0% |
| 4★ | 🟨40.0% | 🟨50.0% | 🟥19.5% | 🟨53.5% | 🟩76.0% |

## Difficulty flags

- 1★ vs Sir Champignon: easy 61.5%, medium 53.5%, hard 48.0%; spread13.5 points; observed favored-side flip.
- 1★ vs Captain Bramble: easy 70.5%, medium 39.0%, hard 20.0%; spread50.5 points; observed favored-side flip.
- 1★ vs Duskmantle: easy 71.5%, medium 61.0%, hard 48.5%; spread23.0 points; observed favored-side flip.
- 1★ vs Sprig: easy 63.0%, medium 68.0%, hard 88.5%; spread25.5 points.
- 2★ vs Andromoss: easy 51.5%, medium 55.0%, hard 49.5%; spread5.5 points; observed favored-side flip.
- 2★ vs Captain Bramble: easy 53.5%, medium 42.0%, hard 16.5%; spread37.0 points; observed favored-side flip.
- 2★ vs Sprig: easy 49.0%, medium 46.5%, hard 52.5%; spread6.0 points; observed favored-side flip.
- 4★ vs Captain Bramble: easy 52.0%, medium 39.0%, hard 19.5%; spread32.5 points; observed favored-side flip.
- 4★ vs Sprig: easy 48.5%, medium 56.5%, hard 76.0%; spread27.5 points; observed favored-side flip.

No unfinished games are invented as wins. Identical4vs4 Andromoss paired mirrors must be50%, including when capped pairs are excluded. Normal play has a four-slot meter and can change spell as charge grows; here the row fixes its cap. In particular3★ theft can remove four enemy stars but receive only three, unlike normal play’s capacity4. These tests compare selected-spell builds against constant opposition, not optimal full-kit choices or equal resource-efficiency/per-cast value. Human playtesting remains necessary.

Reproduce: `pnpm balance:andromoss --seeds=100 --seed=20261119 --enemy-tier=4`.

## Same-tier1★ roster

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩72.0%* | 🟨50.0% | 🟩77.0%* | 🟨57.8%* |
| Andromoss | 🟥28.0%* | — | 🟥28.0%* | 🟨45.5%* | 🟥39.2% |
| Captain Bramble | 🟨50.0% | 🟩72.0%* | — | 🟩77.0%* | 🟨57.8%* |
| Duskmantle | 🟥23.0%* | 🟨54.5%* | 🟥23.0%* | — | 🟨42.5%* |
| Sprig | 🟨42.2%* | 🟩60.8% | 🟨42.2%* | 🟨57.5%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.0% | 🟨50.0% | 🟨59.5% | 🟨43.0% |
| Andromoss | 🟨50.0% | — | 🟨50.0% | 🟨53.0% | 🟨42.0% |
| Captain Bramble | 🟨50.0% | 🟨50.0% | — | 🟨59.5% | 🟨43.0% |
| Duskmantle | 🟨40.5% | 🟨47.0% | 🟨40.5% | — | 🟥37.0% |
| Sprig | 🟨57.0% | 🟨58.0% | 🟨57.0% | 🟩63.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩77.5% | 🟨50.0% | 🟩80.0% | 🟨51.0% |
| Andromoss | 🟥22.5% | — | 🟥22.5% | 🟨45.5% | 🟥37.0% |
| Captain Bramble | 🟨50.0% | 🟩77.5% | — | 🟩80.0% | 🟨51.0% |
| Duskmantle | 🟥20.0% | 🟨54.5% | 🟥20.0% | — | 🟥38.0% |
| Sprig | 🟨49.0% | 🟩63.0% | 🟨49.0% | 🟩62.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩88.5% | 🟨50.0% | 🟩91.5% | 🟩79.5% |
| Andromoss | 🟥11.5% | — | 🟥11.5% | 🟥38.0% | 🟥38.5% |
| Captain Bramble | 🟨50.0% | 🟩88.5% | — | 🟩91.5% | 🟩79.5% |
| Duskmantle | 🟥8.5% | 🟩62.0% | 🟥8.5% | — | 🟨52.5% |
| Sprig | 🟥20.5% | 🟩61.5% | 🟥20.5% | 🟨47.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 50.0%, medium 77.5%, hard 88.5%; spread 38.5 points.
- Sir Champignon vs Duskmantle: easy 59.5%, medium 80.0%, hard 91.5%; spread 32.0 points.
- Sir Champignon vs Sprig: easy 43.0%, medium 51.0%, hard 79.5%; spread 36.5 points; observed favored-side flip.
- Andromoss vs Captain Bramble: easy 50.0%, medium 22.5%, hard 11.5%; spread 38.5 points.
- Andromoss vs Duskmantle: easy 53.0%, medium 45.5%, hard 38.0%; spread 15.0 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 59.5%, medium 80.0%, hard 91.5%; spread 32.0 points.
- Captain Bramble vs Sprig: easy 43.0%, medium 51.0%, hard 79.5%; spread 36.5 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 37.0%, medium 38.0%, hard 52.5%; spread 15.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.


## Same-tier4★ roster

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨57.2% | 🟨49.5%* | 🟩66.3% | 🟨57.3% |
| Andromoss | 🟨42.8% | — | 🟥37.0%* | 🟨54.8% | 🟩60.5%* |
| Captain Bramble | 🟨50.5%* | 🟩63.0%* | — | 🟩68.7%* | 🟨59.2%* |
| Duskmantle | 🟥33.7% | 🟨45.2% | 🟥31.3%* | — | 🟨45.7%* |
| Sprig | 🟨42.7% | 🟥39.5%* | 🟨40.8%* | 🟨54.3%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨51.5% | 🟨55.5% | 🟨57.5% | 🟨51.0% |
| Andromoss | 🟨48.5% | — | 🟨52.5% | 🟨54.5% | 🟨49.0% |
| Captain Bramble | 🟨44.5% | 🟨47.5% | — | 🟨51.5% | 🟨45.0% |
| Duskmantle | 🟨42.5% | 🟨45.5% | 🟨48.5% | — | 🟨41.0% |
| Sprig | 🟨49.0% | 🟨51.0% | 🟨55.0% | 🟨59.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨59.5% | 🟨51.5% | 🟩70.0% | 🟨50.5% |
| Andromoss | 🟨40.5% | — | 🟥39.0% | 🟨56.5% | 🟨56.5% |
| Captain Bramble | 🟨48.5% | 🟩61.0% | — | 🟩73.5% | 🟨55.5% |
| Duskmantle | 🟥30.0% | 🟨43.5% | 🟥26.5% | — | 🟨41.5% |
| Sprig | 🟨49.5% | 🟨43.5% | 🟨44.5% | 🟨58.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩60.5% | 🟨41.5% | 🟩71.5% | 🟩70.5% |
| Andromoss | 🟥39.5% | — | 🟥19.5% | 🟨53.5% | 🟩76.0% |
| Captain Bramble | 🟨58.5% | 🟩80.5% | — | 🟩81.0% | 🟩77.0% |
| Duskmantle | 🟥28.5% | 🟨46.5% | 🟥19.0% | — | 🟨54.5% |
| Sprig | 🟥29.5% | 🟥24.0% | 🟥23.0% | 🟨45.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Captain Bramble: easy 55.5%, medium 51.5%, hard 41.5%; spread 14.0 points; observed favored-side flip.
- Andromoss vs Captain Bramble: easy 52.5%, medium 39.0%, hard 19.5%; spread 33.0 points; observed favored-side flip.
- Andromoss vs Sprig: easy 49.0%, medium 56.5%, hard 76.0%; spread 27.0 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 51.5%, medium 73.5%, hard 81.0%; spread 29.5 points.
- Captain Bramble vs Sprig: easy 45.0%, medium 55.5%, hard 77.0%; spread 32.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 41.0%, medium 41.5%, hard 54.5%; spread 13.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.


## Normal full-kit roster

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩71.2%* | 🟨56.3% | 🟩74.0% | 🟩69.0%* |
| Andromoss | 🟥28.8%* | — | 🟥36.2% | 🟨50.0%* | 🟨48.7% |
| Captain Bramble | 🟨43.7% | 🟩63.8% | — | 🟩67.7% | 🟨60.0%* |
| Duskmantle | 🟥26.0% | 🟨50.0%* | 🟥32.3% | — | 🟨49.3%* |
| Sprig | 🟥31.0%* | 🟨51.3% | 🟨40.0%* | 🟨50.7%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨56.5% | 🟨54.0% | 🟩70.0% | 🟨54.0% |
| Andromoss | 🟨43.5% | — | 🟨42.0% | 🟨55.0% | 🟨48.0% |
| Captain Bramble | 🟨46.0% | 🟨58.0% | — | 🟩65.0% | 🟨50.0% |
| Duskmantle | 🟥30.0% | 🟨45.0% | 🟥35.0% | — | 🟨43.0% |
| Sprig | 🟨46.0% | 🟨52.0% | 🟨50.0% | 🟨57.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩72.0% | 🟩63.5% | 🟩73.5% | 🟩66.5% |
| Andromoss | 🟥28.0% | — | 🟨43.0% | 🟨50.5% | 🟨48.5% |
| Captain Bramble | 🟥36.5% | 🟨57.0% | — | 🟩63.5% | 🟨50.5% |
| Duskmantle | 🟥26.5% | 🟨49.5% | 🟥36.5% | — | 🟨44.5% |
| Sprig | 🟥33.5% | 🟨51.5% | 🟨49.5% | 🟨55.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩85.0% | 🟨51.5% | 🟩78.5% | 🟩86.5% |
| Andromoss | 🟥15.0% | — | 🟥23.5% | 🟨44.5% | 🟨49.5% |
| Captain Bramble | 🟨48.5% | 🟩76.5% | — | 🟩74.5% | 🟩79.5% |
| Duskmantle | 🟥21.5% | 🟨55.5% | 🟥25.5% | — | 🟩60.5% |
| Sprig | 🟥13.5% | 🟨50.5% | 🟥20.5% | 🟥39.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 56.5%, medium 72.0%, hard 85.0%; spread 28.5 points.
- Sir Champignon vs Sprig: easy 54.0%, medium 66.5%, hard 86.5%; spread 32.5 points.
- Andromoss vs Duskmantle: easy 55.0%, medium 50.5%, hard 44.5%; spread 10.5 points; observed favored-side flip.
- Captain Bramble vs Sprig: easy 50.0%, medium 50.5%, hard 79.5%; spread 29.5 points.
- Duskmantle vs Sprig: easy 43.0%, medium 44.5%, hard 60.5%; spread 17.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.


## Validation and interpretation

34,500 games total:12,000 fixed-opponent plus7,500 each for same-tier1★, same-tier4★ and full-kit. All complete. Each run meets100 paired seeds per distinct matchup/difficulty with side swaps. New roster snapshots use runner default base20261118, whereas the previous D138 roster used20261119; no causal before→after claim is made for those roster snapshots. Fixed-opponent before→after uses identical20261119 seeds. Unchanged tier2/3 same-tier powers retain their prior reports.

208 simulation tests and production build pass;8 desktop/mobile browser cases pass. The timing test checks first birth, exact1000/750 ms spacing and8/11 births respectively over an8 s window when slots are cleared; real games remain subject to board occupancy and two-magical-target caps. Existing85% target shortening/cleanse/freeze rules remain covered. No deployment wait.
