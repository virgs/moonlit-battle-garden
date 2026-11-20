# Two-star baseline: no spell tuning yet

The accepted D127 one-star rules remain fixed. These games enable only tier2 spells with a two-star meter, using the real simulation/bots. No durations, powers, hit reactions, pacing, art or networking changes.

| Hero | Two-star spell | Current effect | Duration | Before → after |
|---|---|---|---|---|
| Sir Champignon | Mushroom Guard | Block the next mistake (missed mole, rabbit hit or empty hit), one charge | 12 s | Unchanged baseline |
| Andromoss | Rabbit Riot | Add enemy rabbits, at most one every 0.95 s and subject to magical-target concurrency/empty-hole limits; normal target lifetimes follow waves | 7.5 s | Unchanged baseline |
| Captain Bramble | Bramble Brace | Block the next mistake, one charge | 8 s | Unchanged baseline |
| Duskmantle | Violet Veil | Dim enemy targets while preserving shapes; bot reaction has +0.2 s while active, with no target-type recognition errors | 6.5 s | Unchanged baseline |
| Sprig | Helping Tines | Fix the busiest column at casting; one normal hit every 0.25 s; armor takes repeated strikes, stars collect normally, rabbits incur normal penalties | 6.5 s | Unchanged baseline |

Hostile Rabbit Riot/Veil resolve after the existing 650 ms warning following shared cast freeze. Effect timers freeze with pause/casting. Helping Tines starts pulses after 250 ms rather than an initial immediate hit. Guards expire after one mistake or their window.

## Method and limitations

7,500 best-of-three matches, zero unfinished, seed20261119: 100 paired seeds, 200 matches per distinct pairing/difficulty, 100 mirrors per hero/difficulty. Current tier2 isolated bot casts immediately on the first available tick at full meter/cooldown; it does **not** use tier1’s visibility/usefulness and randomized decision delay. This is an initial reference, not an equal-strategy comparison with the accepted one-star report or a tuned tier2 casting strategy. No spell changes in this pass.

Violet Veil’s existing +200 ms bot reaction rule is in Bot.ts; this is not purely cosmetic in these tests. An earlier progress message incorrectly called it cosmetic and was corrected before reporting conclusions. Shapes/kinds remain known to bots, so the reaction rule is a model of human visibility difficulty, not measured human behavior.

## Pooled versus overview and per-level matrices

Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.

🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points or an observed favored-side flip across AI levels; per-level results remain below.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨53.7%* | 🟨51.7% | 🟨41.5%* | 🟨50.8%* |
| Andromoss | 🟨46.3%* | — | 🟨47.3%* | 🟥37.8%* | 🟩62.8%* |
| Captain Bramble | 🟨48.3% | 🟨52.7%* | — | 🟨40.5%* | 🟨49.0%* |
| Duskmantle | 🟨58.5%* | 🟩62.2%* | 🟨59.5%* | — | 🟨56.8%* |
| Sprig | 🟨49.2%* | 🟥37.2%* | 🟨51.0%* | 🟨43.2%* | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨50.5% | 🟨51.0% | 🟨52.0% | 🟥39.0% |
| Andromoss | 🟨49.5% | — | 🟨50.5% | 🟨50.0% | 🟨42.0% |
| Captain Bramble | 🟨49.0% | 🟨49.5% | — | 🟨52.0% | 🟥39.0% |
| Duskmantle | 🟨48.0% | 🟨50.0% | 🟨48.0% | — | 🟥37.0% |
| Sprig | 🟩61.0% | 🟨58.0% | 🟩61.0% | 🟩63.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟨46.5% | 🟨51.0% | 🟨44.5% | 🟨42.5% |
| Andromoss | 🟨53.5% | — | 🟨52.0% | 🟨40.0% | 🟩62.5% |
| Captain Bramble | 🟨49.0% | 🟨48.0% | — | 🟨43.0% | 🟨41.0% |
| Duskmantle | 🟨55.5% | 🟨60.0% | 🟨57.0% | — | 🟨55.0% |
| Sprig | 🟨57.5% | 🟥37.5% | 🟨59.0% | 🟨45.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩64.0% | 🟨53.0% | 🟥28.0% | 🟩71.0% |
| Andromoss | 🟥36.0% | — | 🟥39.5% | 🟥23.5% | 🟩84.0% |
| Captain Bramble | 🟨47.0% | 🟩60.5% | — | 🟥26.5% | 🟩67.0% |
| Duskmantle | 🟩72.0% | 🟩76.5% | 🟩73.5% | — | 🟩78.5% |
| Sprig | 🟥29.0% | 🟥16.0% | 🟥33.0% | 🟥21.5% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

## Difficulty flags

- Sir Champignon vs Andromoss: easy 50.5%, medium 46.5%, hard 64.0%; spread 17.5 points; observed favored-side flip.
- Sir Champignon vs Duskmantle: easy 52.0%, medium 44.5%, hard 28.0%; spread 24.0 points; observed favored-side flip.
- Sir Champignon vs Sprig: easy 39.0%, medium 42.5%, hard 71.0%; spread 32.0 points; observed favored-side flip.
- Andromoss vs Captain Bramble: easy 50.5%, medium 52.0%, hard 39.5%; spread 12.5 points; observed favored-side flip.
- Andromoss vs Duskmantle: easy 50.0%, medium 40.0%, hard 23.5%; spread 26.5 points.
- Andromoss vs Sprig: easy 42.0%, medium 62.5%, hard 84.0%; spread 42.0 points; observed favored-side flip.
- Captain Bramble vs Duskmantle: easy 52.0%, medium 43.0%, hard 26.5%; spread 25.5 points; observed favored-side flip.
- Captain Bramble vs Sprig: easy 39.0%, medium 41.0%, hard 67.0%; spread 28.0 points; observed favored-side flip.
- Duskmantle vs Sprig: easy 37.0%, medium 55.0%, hard 78.5%; spread 41.5 points; observed favored-side flip.

Flips are descriptive changes across AI levels, not significance claims.


## Findings

- No hero wins every distinct matchup at every difficulty. Sprig wins every Easy matchup, Duskmantle every Medium and Hard matchup; Andromoss strongly counters Sprig on Hard. Pooled results conceal major flips/spreads and must not drive tuning alone.
- The most pronounced reversal is Andromoss vs Sprig: 42% Easy, 62.5% Medium, 84% Hard (42-point spread). Violet Veil is strong on Hard, with Duskmantle rates72–78.5% against every opponent, yet loses three Easy matchups and ties Andromoss.
- Inference from rules: +200 ms Veil delay can shift otherwise reachable Hard targets beyond fast-wave lifetimes; Easy already fails many such targets. Therefore its marginal impact can increase with AI skill. This requires coverage/human validation, not an automatic duration nerf.
- Inference from rules: Helping Tines is more useful when manual hits are slow, while forcing normal rabbit penalties that strong bots usually avoid. Extra Rabbit Riot arrivals may exacerbate that cost. Existing total point-loss metrics do not isolate these automatic rabbit hits, so do not claim a quantified causal explanation.
- Guards have near-identical head-to-head results (Champignon51–53% by level against Bramble). Both block one mistake; the 12 vs8 s window appears a smaller distinction here than other effects.

## Spell coverage

Distinct-opponent matches, averages per character appearance. Guard prevention is observed exactly; it is not comparable to total spell value. Casts must be read alongside immediate policy and two-slot resource acquisition.

| AI | Hero | Tier2 casts / match | Guard points prevented / match |
|---|---|---:|---:|
| easy | champignon | 2.37 | 18.94 |
| easy | andromoss | 2.31 | 0.00 |
| easy | captain-bramble | 2.37 | 18.67 |
| easy | duskmantle | 2.28 | 0.00 |
| easy | sprig | 2.25 | 0.00 |
| medium | champignon | 5.29 | 40.05 |
| medium | andromoss | 5.25 | 0.00 |
| medium | captain-bramble | 5.27 | 37.98 |
| medium | duskmantle | 5.27 | 0.00 |
| medium | sprig | 5.07 | 0.00 |
| hard | champignon | 9.25 | 62.93 |
| hard | andromoss | 8.47 | 0.00 |
| hard | captain-bramble | 9.21 | 54.12 |
| hard | duskmantle | 7.97 | 0.00 |
| hard | sprig | 8.54 | 0.00 |

## Next tuning decision

Before interpreting spell strength as a duration problem, consider extending useful-opportunity/random-delay casting to tier2 and observe actual effect coverage (especially Veil’s delayed hits, automation rabbits and refreshed/unused guard charges). No such strategy or strength changes are adopted by this baseline. Existing per-level AI accuracy/reaction differences remain intentional. Human/full-kit playtests are still required.

Validation: 172 simulation tests and production build passed. No user-facing game change, so no new browser checks were needed.

Reproduce: `pnpm balance:roster --tier=2 --seeds=100 --seed=20261119`

[Full matrix report](balance-tier-2.md) · [Raw battle records](balance-tier-2.json).
