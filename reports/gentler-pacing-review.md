# Gentler opening: human-playtest adjustment

The human reports that the16-second opening peak is already too difficult. This iteration changes shared pacing, keeping all spells, AI reaction/accuracy/casting policy and round rules fixed. Exact tuning is provisional until another human playtest.

| Parameter | Before | Current |
|---|---:|---:|
| Baseline ramp |60s|120s|
| Base target lifetime |2200→600ms|2800→800ms|
| Lifetime peak multiplier / safety floor |.88 /500ms|.90 /650ms|
| Base spawn interval |1350→600ms|1550→650ms|
| Interval peak multiplier / floor |.40 /300ms|.55 /350ms|
| Lifetime at16s, equal scores |1561ms|2280ms|
| Offer interval at16s, equal scores |460ms|786.5ms|

The25s build/peak/recovery structure, concurrency, star slots and5% trailing-board adjustments remain. Moles/rabbits/stars all use the same shared lifetime. Natural steady peaks are720ms (684ms with the maximum trailing adjustment); earned85% mole shortening is still applied afterward, and Tending still adds its750ms once. Every round resets the same pacing.

## Versus diagnostics

[Full pooled and Easy/Medium/Hard matrices, pairing durations and spell coverage](gentler-pacing-roster.md). [Raw results](gentler-pacing-roster.json.gz). Raw per-match detail is gzip-compressed; the Markdown matrices remain directly readable. Actual simulation,100 paired seeds per distinct matchup/difficulty (200 games),100 mirrors per hero/difficulty,7500 best-of-three matches overall. No30-minute caps, no observed favored-side flips or spreads above20 points across AI levels.

The pooled matrix strongly favors Champignon. This is **not** a human balance claim or proof that Andromoss1★ is weak: full-kit bots avoid most rabbits and heavily favor defensive spending. Easy Champignon never reached4★ in this run (9976/73/9/0 casts by tier); Medium9496/1800/1405/175, Hard7183/2055/3525/886. Do not tune spells toward50% without examining that policy/coverage bias. Andromoss powers are unchanged.

Distinct-character median rounds: Easy59.9s, Medium92.8s, Hard123.7s.95th percentiles:153.55/186.6/278.35s. Long tails remain: maximum mixed-character round573.2s; maximum mirror round897.25s (Hard Champignon mirror). The longest complete match was1387.95s. Zero caps does not imply that all rounds are short. This is a known cost of gentler pacing and still requires human feedback. No additional automatic tuning is adopted.

Reaction diagnostic horizons now cover the full configured ramp plus at least two waves; fixed120s runs would miss the new steady-state cohorts. Unit tests verify deterministic ramp/steady coverage, shared target-type lifetimes and curve bounds.

Reproduce: `pnpm exec vite-node scripts/balance-roster.ts --seeds=100 --report=gentler-pacing-roster`, then `gzip -9 reports/gentler-pacing-roster.json` to archive the raw data.
