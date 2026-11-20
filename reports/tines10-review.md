# Helping Tines: immediate continuous column for10 seconds

## Current two-star spells and before→after

| Hero | Spell | Before | Adopted |
|---|---|---|---|
| Sir Champignon | Clean Sweep | Immediate/continuous busiest column,3 s | Unchanged |
| Andromoss | Rabbit Riot | Extra enemy rabbits every0.95 s subject to limits,7.5 s | Unchanged |
| Captain Bramble | Tin Caps | Next three future enemy moles, one extra hit each, no duration | Unchanged |
| Duskmantle | Violet Veil | Target opacity72%,6.5 s; existing+200 ms bot reaction | Unchanged |
| Sprig | Helping Tines | Busiest fixed column; first action after250 ms, one target per250 ms for6.5 s | Hit all selected targets immediately; intercept arrivals continuously for**10 active seconds** |

No hostile warnings. Both guards stay at one star, block two mistakes with no expiry; other one-star powers unchanged. No first/two-star swap reversal, hit AI timing change, higher-tier tuning, or new art.

## Exact behavior

Choose the busiest column at cast start with stable leftmost ties, keep it fixed, and hit every current target there immediately. On each50 ms simulation tick after spawns, hit every remaining/new target in that column once while time<automationUntil. Includes natural, star and magic arrivals on their birth tick, with no200 ms visibility gate. Armor consumes one extra strike per hit; do not apply all armor strikes in one hit. Mole/star rewards and rabbit penalties use the same normal hit path (including ordinary guards if present). Cast/pause freezes all active time; round reset clears state; exact10 s boundary is excluded.

The initial hit resolves before shared cast freeze ends; a round win still waits for that animation. Protocol15 protects the semantic change. Shared hitColumns also serves Clean Sweep/Royal Cleanup, whose behavior is unchanged. **Garden Clockwork stays4 stars/two columns/8 s/one target per250 ms**, retaining its visibility condition; no initial/full-column instant hit was added to it.

## Controlled comparisons

Four7,500-match runs: pulse6.5 s control, continuous6.5 s, pulse10 s, continuous10 s, plus7,500-match adopted-default verification: **37,500 simulated matches**, zero unfinished.100 paired seeds per matchup/difficulty:200 games per distinct pairing/level and100 mirrors per hero/level. Same seed20261119, actual simulation and bots, isolated tier2/two-slot meter/opportunity policy/scaled delays. All7,500 old control battle records reproduce the prior swap report exactly. All7,500 adopted records and config hash equal the combined trial. Historical control config hash differs from the prior revision because the explicit mode setting is new; behavior and records match.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨54.5%* | 🟨42.7%* | 🟨43.8%* | 🟥37.0% |
| Andromoss | 🟨45.5%* | — | 🟥32.8% | 🟥33.7% | 🟨52.5%* |
| Captain Bramble | 🟨57.3%* | 🟩67.2% | — | 🟨50.0%* | 🟨41.3%* |
| Duskmantle | 🟨56.2%* | 🟩66.3% | 🟨50.0%* | — | 🟨42.2%* |
| Sprig | 🟩63.0% | 🟨47.5%* | 🟨58.7%* | 🟨57.8%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨59.5% | 🟨50.5% | 🟨55.0% | 🟥32.5% |
| Andromoss | 🟨40.5% | — | 🟨41.0% | 🟨42.5% | 🟥36.0% |
| Captain Bramble | 🟨49.5% | 🟨59.0% | — | 🟨59.0% | 🟥33.0% |
| Duskmantle | 🟨45.0% | 🟨57.5% | 🟨41.0% | — | 🟥23.5% |
| Sprig | 🟩67.5% | 🟩64.0% | 🟩67.0% | 🟩76.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨56.0% | 🟨42.5% | 🟨43.5% | 🟥31.5% |
| Andromoss | 🟨44.0% | — | 🟥30.5% | 🟥36.0% | 🟨44.0% |
| Captain Bramble | 🟨57.5% | 🟩69.5% | — | 🟨53.0% | 🟥36.0% |
| Duskmantle | 🟨56.5% | 🟩64.0% | 🟨47.0% | — | 🟥35.5% |
| Sprig | 🟩68.5% | 🟨56.0% | 🟩64.0% | 🟩64.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨48.0% | 🟥35.0% | 🟥33.0% | 🟨47.0% |
| Andromoss | 🟨52.0% | — | 🟥27.0% | 🟥22.5% | 🟩77.5% |
| Captain Bramble | 🟩65.0% | 🟩73.0% | — | 🟥38.0% | 🟨55.0% |
| Duskmantle | 🟩67.0% | 🟩77.5% | 🟩62.0% | — | 🟩67.5% |
| Sprig | 🟨53.0% | 🟥22.5% | 🟨45.0% | 🟥32.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 59.5%, medium 56.0%, hard 48.0%; spread 11.5 points; observed favored-side flip.
- Sir Champignon vs Captain Bramble: easy 50.5%, medium 42.5%, hard 35.0%; spread 15.5 points; observed favored-side flip.
- Sir Champignon vs Duskmantle: easy 55.0%, medium 43.5%, hard 33.0%; spread 22.0 points; observed favored-side flip.
- Andromoss vs Sprig: easy 36.0%, medium 44.0%, hard 77.5%; spread 41.5 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 59.0%, medium 53.0%, hard 38.0%; spread 21.0 points; observed favored-side flip.
- Captain Bramble vs Sprig: easy 33.0%, medium 36.0%, hard 55.0%; spread 22.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 23.5%, medium 35.5%, hard 67.5%; spread 44.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.


## Sprig pooled versus comparison

| Opponent | Old pulse6.5 s | Continuous6.5 s | Pulse10 s | Adopted continuous10 s |
|---|---:|---:|---:|---:|
| champignon | 52.5% | 55.5% | 55.8% | 63.0% |
| andromoss | 47.8% | 50.0% | 44.5% | 47.5% |
| captain-bramble | 45.3% | 50.7% | 53.8% | 58.7% |
| duskmantle | 50.7% | 51.3% | 53.0% | 57.8% |

## Observed automation coverage

Distinct-opponent games. Averages per Sprig appearance, not per cast; current targets can be hit at cast and arrivals repeatedly. Mole/star counters are final hits only (armor strikes excluded), rabbit hits are actual normal penalties. Different match lengths/cast counts influence totals; these are observations, not counterfactual value.

| Run | AI | Casts/match | Mole hits/match | Star hits/match | Rabbit hits/match |
|---|---|---:|---:|---:|---:|
| Old | easy | 2.17 | 7.10 | 0.58 | 1.26 |
| Old | medium | 4.75 | 17.10 | 0.90 | 3.78 |
| Old | hard | 8.17 | 22.53 | 0.76 | 7.18 |
| Continuous only | easy | 2.12 | 8.56 | 0.62 | 1.39 |
| Continuous only | medium | 4.75 | 21.64 | 1.16 | 4.21 |
| Continuous only | hard | 8.48 | 41.03 | 1.32 | 8.29 |
| Duration only | easy | 2.15 | 9.76 | 0.71 | 1.93 |
| Duration only | medium | 4.76 | 23.86 | 1.54 | 5.69 |
| Duration only | hard | 8.03 | 31.54 | 1.85 | 10.62 |
| Adopted | easy | 2.11 | 11.21 | 0.73 | 2.06 |
| Adopted | medium | 4.65 | 28.23 | 1.66 | 5.87 |
| Adopted | hard | 8.04 | 53.13 | 2.67 | 11.58 |

## Findings and limits

Sprig’s pooled win rate improves versus Champignon52.5→63%, Bramble45.3→58.7% and Duskmantle50.7→57.8%; versus Andromoss47.8→47.5% is effectively unchanged descriptively (not a significance claim). Duration and continuous coverage interact; neither isolated trial alone predicts the combined effect.

Sprig now wins every Easy/Medium matchup, while Duskmantle wins every Hard matchup. On Hard, Sprig beats Champignon53% but loses to Andromoss22.5%, Bramble45% and Duskmantle32.5%. Large reversals remain: Andromoss/Sprig36/44/77.5%; Duskmantle/Sprig23.5/35.5/67.5%. Do not interpret pooled rates as equal experience across difficulties.

Normal rabbit penalties can limit continuous automation against rabbit pressure; the bot policy still chooses useful/urgent columns and avoids active-effect refresh. Veil uses a+200 ms bot reaction approximation, not a human input penalty. Same-tier AI diagnostics do not prove full-kit/human balance; keep observed strategy/coverage caveats and avoid further unrequested tuning. One-star isolated rules are unchanged and were not rerun in this pass.

## Reproduction

- [tines10-old-control](tines10-old-control.md), [data](tines10-old-control.json): `pnpm balance:roster --tier=2 --seeds=100 --seed=20261119 --tines-mode=pulse --tines-ms=6500 --report=tines10-old-control`
- [tines10-continuous-only](tines10-continuous-only.md), [data](tines10-continuous-only.json): `pnpm balance:roster --tier=2 --seeds=100 --seed=20261119 --tines-mode=continuous --tines-ms=6500 --report=tines10-continuous-only`
- [tines10-duration-only](tines10-duration-only.md), [data](tines10-duration-only.json): `pnpm balance:roster --tier=2 --seeds=100 --seed=20261119 --tines-mode=pulse --tines-ms=10000 --report=tines10-duration-only`
- [tines10-combined](tines10-combined.md), [data](tines10-combined.json): `pnpm balance:roster --tier=2 --seeds=100 --seed=20261119 --tines-mode=continuous --tines-ms=10000 --report=tines10-combined`

Validation:187 simulation tests, production build and18 desktop/mobile browser cases pass (16 unchanged cases from the full run plus2 targeted Tines rechecks). The initial new browser expiry assertion encountered a legitimate round win before10 seconds; corrected to validate interception while playing and frozen/hidden effects after round end. The simulation test independently proves the exact10 s boundary without a score outcome. Online sync/reconnect, swapped costs, guards, shared cast animation and unchanged Garden Clockwork were checked.
