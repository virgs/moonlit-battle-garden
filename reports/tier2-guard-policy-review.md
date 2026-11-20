Historical pre-swap loadout, superseded by [current swap review](tier-swap-review.md).

# Two-star guards, opportunity casting and no hostile warnings

## Adopted rules and spell reminders

| Hero | Two-star spell | Before | Current |
|---|---|---|---|
| Sir Champignon | Mushroom Guard | One mistake blocked / 12 s | Next **two mistakes**, **no expiry** |
| Andromoss | Rabbit Riot | Extra enemy rabbits / 7.5 s / 650 ms warning | Same power / **7.5 s**, **no warning** |
| Captain Bramble | Bramble Brace | One mistake blocked / 8 s | Next **two mistakes**, **no expiry** |
| Duskmantle | Violet Veil | Readable dimming +200 ms bot reaction / 6.5 s / 650 ms warning | Same power / **6.5 s**, **no warning** |
| Sprig | Helping Tines | Busiest column, hit every250 ms / 6.5 s | Same power / **6.5 s** |

Guards cover missed moles, rabbit hits and empty hits, refresh remaining charges to two without stacking, survive cleanse, and clear each round. Other-tier guards remain timed/unchanged. No tier swap adopted: stronger guards should be reviewed before moving spells, and same-tier matrices do not establish cross-tier resource value.

All spells have zero hostile warning unless a future exception is explicitly requested. Effects resolve at cast start before shared cast freeze; no defender action can occur between cast and application. Already-active wards can block. No Incoming message. Animation still freezes targets, effect clocks, decision timers and inputs. Protocol13 carries permanent guard state without Infinity.

## Adopted isolated two-star casting

100 ms target visibility;200–400 ms random decision delay sampled once per opportunity, ×3Easy/×2Medium/×1Hard. Target-based notice+decision minima/ranges depend on urgency; after becoming eligible decision delay is600–1200/400–800/200–400 ms. Hitting continues during decisions. Invalid witnesses cancel/restart; pause/cast freeze decision clocks.

Both guards use the identical unguarded own near-escape mole condition (≤1000 ms remaining); never top up active charges. Tines selects a useful/urgent busiest column, avoids rabbit columns unless a mole is urgent, and avoids renewing active automation. Riot/Veil require a visible enemy mole/star and avoid active effects/wards. Full-kit bot decision schedule is otherwise unchanged; this opportunity adoption is for isolated tiers1/2. Tier3/4 diagnostics retain immediate casting. No hero-specific cast probabilities or hit-policy changes.

## Controlled runs

Five tier2 factor runs plus a default rerun (45,000 matches), and a tier1 zero-warning audit (7,500): **52,500 matches**, zero unfinished. Every run uses100 paired seeds,200 games per distinct pairing/difficulty,100 mirrors per hero/difficulty, actual simulation/bots, seed20261119. Historical control reproduces all7,500 prior battle records/metrics excluding three new automation counters. Combined trial equals every adopted-default battle record, counters and config hash.

| Run | Hostile warning | Guards | Tier2 casting |
|---|---|---|---|
| Old control | 650 ms | one charge/12 or8 s | immediate |
| No-warning control | 0 | old timed | immediate |
| Policy only | 0 | old timed | useful opportunity/scaled delay |
| Guards only | 0 | two permanent charges | immediate |
| Combined/adopted | 0 | two permanent charges | useful opportunity/scaled delay |

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩63.8%* | 🟨50.0% | 🟨43.3% | 🟨53.5%* |
| Andromoss | 🟥36.2%* | — | 🟥36.2%* | 🟥33.7% | 🟨52.2%* |
| Captain Bramble | 🟨50.0% | 🟩63.8%* | — | 🟨43.3% | 🟨53.5%* |
| Duskmantle | 🟨56.7% | 🟩66.3% | 🟨56.7% | — | 🟨49.3%* |
| Sprig | 🟨46.5%* | 🟨47.8%* | 🟨46.5%* | 🟨50.7%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨52.0% | 🟨50.0% | 🟨50.0% | 🟥34.5% |
| Andromoss | 🟨48.0% | — | 🟨48.0% | 🟨42.5% | 🟨42.5% |
| Captain Bramble | 🟨50.0% | 🟨52.0% | — | 🟨50.0% | 🟥34.5% |
| Duskmantle | 🟨50.0% | 🟨57.5% | 🟨50.0% | — | 🟥29.5% |
| Sprig | 🟩65.5% | 🟨57.5% | 🟩65.5% | 🟩70.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩64.0% | 🟨50.0% | 🟨41.0% | 🟨52.5% |
| Andromoss | 🟥36.0% | — | 🟥36.0% | 🟥36.0% | 🟨48.0% |
| Captain Bramble | 🟨50.0% | 🟩64.0% | — | 🟨41.0% | 🟨52.5% |
| Duskmantle | 🟨59.0% | 🟩64.0% | 🟨59.0% | — | 🟨46.0% |
| Sprig | 🟨47.5% | 🟨52.0% | 🟨47.5% | 🟨54.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩75.5% | 🟨50.0% | 🟥39.0% | 🟩73.5% |
| Andromoss | 🟥24.5% | — | 🟥24.5% | 🟥22.5% | 🟩66.0% |
| Captain Bramble | 🟨50.0% | 🟩75.5% | — | 🟥39.0% | 🟩73.5% |
| Duskmantle | 🟩61.0% | 🟩77.5% | 🟩61.0% | — | 🟩72.5% |
| Sprig | 🟥26.5% | 🟥34.0% | 🟥26.5% | 🟥27.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 52.0%, medium 64.0%, hard 75.5%; spread 23.5 points.
- Sir Champignon vs Sprig: easy 34.5%, medium 52.5%, hard 73.5%; spread 39.0 points; observed favored-side flip.
- Andromoss vs Captain Bramble: easy 48.0%, medium 36.0%, hard 24.5%; spread 23.5 points.
- Andromoss vs Sprig: easy 42.5%, medium 48.0%, hard 66.0%; spread 23.5 points; observed favored-side flip.
- Captain Bramble vs Sprig: easy 34.5%, medium 52.5%, hard 73.5%; spread 39.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 29.5%, medium 46.0%, hard 72.5%; spread 43.0 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.


## Pooled pair comparisons

Row hero wins; do not substitute these pooled changes for per-level findings.

| Row vs column | Old | Warning removal only | Policy only (no warning) | Guards only (no warning) | Combined |
|---|---:|---:|---:|---:|---:|
| champignon vs andromoss | 53.7% | 54.7% | 53.0% | 65.3% | 63.8% |
| champignon vs captain-bramble | 51.7% | 51.7% | 50.7% | 50.0% | 50.0% |
| champignon vs duskmantle | 41.5% | 37.7% | 38.0% | 48.2% | 43.3% |
| champignon vs sprig | 50.8% | 50.8% | 43.5% | 59.7% | 53.5% |
| andromoss vs captain-bramble | 47.3% | 46.3% | 45.8% | 34.7% | 36.2% |
| andromoss vs duskmantle | 37.8% | 37.2% | 33.7% | 37.2% | 33.7% |
| andromoss vs sprig | 62.8% | 64.8% | 52.2% | 64.8% | 52.2% |
| captain-bramble vs duskmantle | 40.5% | 36.2% | 37.0% | 48.2% | 43.3% |
| captain-bramble vs sprig | 49.0% | 49.0% | 43.0% | 59.7% | 53.5% |
| duskmantle vs sprig | 56.8% | 55.0% | 49.3% | 55.0% | 49.3% |

## Observed coverage

Distinct-opponent games, averages per character appearance. Guard points prevented are exact observed blocked penalties; automatic rabbit hits are actual penalties, not human mistakes inferred from accuracy. These totals do not establish counterfactual benefit.

| Run | AI | Hero | Casts/match | Guard points prevented/match | Automated mole/star/rabbit hits per match |
|---|---|---|---:|---:|---|
| Old | easy | champignon | 2.37 | 18.94 | 0.00/0.00/0.00 |
| Old | easy | captain-bramble | 2.37 | 18.67 | 0.00/0.00/0.00 |
| Old | easy | sprig | 2.25 | 0.00 | 8.42/0.00/1.83 |
| Old | medium | champignon | 5.29 | 40.05 | 0.00/0.00/0.00 |
| Old | medium | captain-bramble | 5.27 | 37.98 | 0.00/0.00/0.00 |
| Old | medium | sprig | 5.07 | 0.00 | 20.23/0.00/5.18 |
| Old | hard | champignon | 9.25 | 62.93 | 0.00/0.00/0.00 |
| Old | hard | captain-bramble | 9.21 | 54.12 | 0.00/0.00/0.00 |
| Old | hard | sprig | 8.54 | 0.00 | 23.94/0.00/8.98 |
| No warning | easy | champignon | 2.35 | 18.77 | 0.00/0.00/0.00 |
| No warning | easy | captain-bramble | 2.34 | 18.47 | 0.00/0.00/0.00 |
| No warning | easy | sprig | 2.25 | 0.00 | 8.31/0.00/1.84 |
| No warning | medium | champignon | 5.21 | 39.80 | 0.00/0.00/0.00 |
| No warning | medium | captain-bramble | 5.25 | 38.13 | 0.00/0.00/0.00 |
| No warning | medium | sprig | 5.00 | 0.00 | 19.86/0.00/5.47 |
| No warning | hard | champignon | 9.30 | 63.15 | 0.00/0.00/0.00 |
| No warning | hard | captain-bramble | 9.36 | 54.84 | 0.00/0.00/0.00 |
| No warning | hard | sprig | 8.48 | 0.00 | 23.84/0.00/9.26 |
| Policy only | easy | champignon | 2.03 | 16.20 | 0.00/0.00/0.00 |
| Policy only | easy | captain-bramble | 2.03 | 16.20 | 0.00/0.00/0.00 |
| Policy only | easy | sprig | 2.16 | 0.00 | 7.08/0.59/1.26 |
| Policy only | medium | champignon | 4.70 | 36.56 | 0.00/0.00/0.00 |
| Policy only | medium | captain-bramble | 4.71 | 36.24 | 0.00/0.00/0.00 |
| Policy only | medium | sprig | 4.80 | 0.00 | 17.41/0.93/3.81 |
| Policy only | hard | champignon | 8.52 | 63.42 | 0.00/0.00/0.00 |
| Policy only | hard | captain-bramble | 8.53 | 59.55 | 0.00/0.00/0.00 |
| Policy only | hard | sprig | 8.55 | 0.00 | 23.81/0.90/7.45 |
| Guards only | easy | champignon | 2.32 | 36.73 | 0.00/0.00/0.00 |
| Guards only | easy | captain-bramble | 2.32 | 36.73 | 0.00/0.00/0.00 |
| Guards only | easy | sprig | 2.31 | 0.00 | 8.55/0.00/1.85 |
| Guards only | medium | champignon | 5.14 | 76.39 | 0.00/0.00/0.00 |
| Guards only | medium | captain-bramble | 5.14 | 76.39 | 0.00/0.00/0.00 |
| Guards only | medium | sprig | 4.99 | 0.00 | 19.69/0.00/5.55 |
| Guards only | hard | champignon | 9.23 | 122.58 | 0.00/0.00/0.00 |
| Guards only | hard | captain-bramble | 9.23 | 122.58 | 0.00/0.00/0.00 |
| Guards only | hard | sprig | 8.10 | 0.00 | 22.58/0.00/8.74 |
| Adopted | easy | champignon | 2.00 | 31.57 | 0.00/0.00/0.00 |
| Adopted | easy | captain-bramble | 2.00 | 31.57 | 0.00/0.00/0.00 |
| Adopted | easy | sprig | 2.20 | 0.00 | 7.24/0.60/1.31 |
| Adopted | medium | champignon | 4.76 | 73.81 | 0.00/0.00/0.00 |
| Adopted | medium | captain-bramble | 4.76 | 73.81 | 0.00/0.00/0.00 |
| Adopted | medium | sprig | 4.96 | 0.00 | 17.66/0.98/3.92 |
| Adopted | hard | champignon | 8.43 | 126.86 | 0.00/0.00/0.00 |
| Adopted | hard | captain-bramble | 8.43 | 126.86 | 0.00/0.00/0.00 |
| Adopted | hard | sprig | 8.55 | 0.00 | 23.92/0.85/7.58 |

## Interpretation

- Identical permanent guards plus identical opportunities produce identical distinct-opponent win rates and50% head-to-head. This is expected paired-seed behavior for mechanically identical spells, not independent evidence of perfect balance. Guard points prevented roughly double.
- No hero dominates every level: Sprig wins all Easy matchups, Duskmantle all Hard matchups. Large level flips remain; do not optimize a pooled table toward50%.
- Tines casting avoids many rabbit exposures but automation still incurs normal rabbit penalties; observed Hard rabbit hits/match fall from about9.3 in no-warning/immediate control to7.6 adopted. That is a coverage finding, not proof all outcome movement is caused by rabbits.
- Veil still has its existing+200 ms bot reaction model; dimming itself does not create recognition errors. Human and full-kit playtesting remain necessary.
- Removing warnings also improves immediate resource theft and changes one-star outcomes. Accepted one-star numerical powers remain fixed; the explicitly requested global timing change is separately audited in tier1-no-warning-review.md.
- Tier swapping is deferred rather than silently adopted. New guards provide two future blocks instead of one timed block; test this version in normal resource choices before deciding whether guard/offense should switch cost.

## Reproduction

- [tier2-old-control](tier2-old-control.md), [data](tier2-old-control.json): `pnpm balance:roster --tier=2 --seeds=100 --seed=20261119 --casting=immediate --two-star-guards=timed --warning-ms=650 --report=tier2-old-control`
- [tier2-no-warning-control](tier2-no-warning-control.md), [data](tier2-no-warning-control.json): `pnpm balance:roster --tier=2 --seeds=100 --seed=20261119 --casting=immediate --two-star-guards=timed --warning-ms=0 --report=tier2-no-warning-control`
- [tier2-policy-only](tier2-policy-only.md), [data](tier2-policy-only.json): `pnpm balance:roster --tier=2 --seeds=100 --seed=20261119 --casting=opportunity --two-star-guards=timed --warning-ms=0 --report=tier2-policy-only`
- [tier2-guards-only](tier2-guards-only.md), [data](tier2-guards-only.json): `pnpm balance:roster --tier=2 --seeds=100 --seed=20261119 --casting=immediate --two-star-guards=charges --warning-ms=0 --report=tier2-guards-only`
- [tier2-guards-combined](tier2-guards-combined.md), [data](tier2-guards-combined.json): `pnpm balance:roster --tier=2 --seeds=100 --seed=20261119 --casting=opportunity --two-star-guards=charges --warning-ms=0 --report=tier2-guards-combined`

Validation: 183 simulation tests, production build and 16 desktop/mobile browser cases pass (12 existing cases plus four new guard cases on targeted rerun). Initial new browser assertions used the wrong HUD container and advanced past cast completion, allowing natural misses to consume charges; corrected to the shared HUD and exact frozen boundary, with explicit two-charge assertions retained.
