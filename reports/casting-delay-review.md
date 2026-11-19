# Casting-delay profile trial

The requested profile is implemented as an isolated tier-1 experiment. **Ordinary full-kit AI and the default baseline profile are unchanged.** Pacing, reaction/action/accuracy values, opportunity conditions, warning/cooldown/freeze times and spell powers were held fixed.

## Profiles

| Profile | On-board visibility | Base decision delay | Easy / Medium / Hard multipliers |
|---|---:|---:|---|
| Baseline | 200 ms | 300–700 ms | 1 / 1 / 1 |
| Fast control | 100 ms | 200–400 ms | 1 / 1 / 1 |
| Requested scaled | 100 ms | 200–400 ms | 3 / 2 / 1 |

Multipliers apply to **decision delay only**. For newly visible on-board target opportunities, minimum-to-maximum notice-plus-decision times are Easy 700–1300 ms, Medium 500–900 ms, Hard 300–500 ms. Full charge/cooldown readiness, opportunity continuity and existing hit actions may change the actual situation. Theft watches existing enemy charge directly and uses decision delay without an additional target-visibility threshold. Opportunities that disappear/replaced witnesses cancel; warning-time counterplay can still empty a valid theft.

## Sampling and integrity

Three runs of 7,500 best-of-three matches each: **22,500 total**, no timeouts. Each uses the same 100 seeds (base 20261119), swapped sides for distinct pairs (200 games per cell/difficulty) and 100 mirrors per hero/difficulty. All source/config hashes match across profiles; settings are recorded separately. All 2,500 Hard match records are identical between fast/scaled, as Hard has multiplier 1 in both. Full per-match outcomes and decision accounting are retained in all three JSON files.

Pooled versus matrices lead each profile report, with per-level matrices and descriptive favored-side flips/spreads retained. No aggregate per-hero win table substitutes for the versus comparison. Flips near 50% can be sampling variation; they are not significance claims.

- [Requested scaled matrices and details](casting-scaled.md)
- [Fast control matrices](casting-fast.md)
- [Baseline matrices](casting-baseline.md)

## Casting decisions

Distinct-character games only (2,000 matches, 4,000 bot appearances per difficulty/profile). Counts below sum across heroes. Scheduled opportunities and completed casts are observations, not per-second throughput or causal spell value: profile changes alter round durations, charge economy and the number of later opportunities. Cancellations divide by all scheduled opportunities; terminal pending decisions remain separate.

| Profile | AI | Scheduled | Completed casts | Cancelled | Pending at end | Late scheduled / completed |
|---|---|---:|---:|---:|---:|---:|
| baseline | easy | 37362 | 20622 | 44.6% | 85 | 77 / 5 |
| baseline | medium | 117880 | 36904 | 68.4% | 304 | 19972 / 2509 |
| baseline | hard | 501077 | 41314 | 91.5% | 1143 | 271865 / 11113 |
| fast | easy | 28787 | 21248 | 26.1% | 39 | 0 / 0 |
| fast | medium | 61909 | 40388 | 34.7% | 69 | 4757 / 2747 |
| fast | hard | 201477 | 64922 | 67.6% | 308 | 75908 / 22854 |
| scaled | easy | 101046 | 18563 | 81.3% | 339 | 25787 / 0 |
| scaled | medium | 134226 | 36329 | 72.7% | 379 | 23430 / 2516 |
| scaled | hard | 201477 | 64922 | 67.6% | 308 | 75908 / 22854 |

## Theft counterplay

Empty Borrowed Spark resolutions / its casts (distinct-character games):

| AI | Baseline | Fast control | Requested scaled |
|---|---:|---:|---:|
| easy | 55.2% | 80.4% | 20.8% |
| medium | 28.0% | 67.4% | 22.7% |
| hard | 6.8% | 28.1% | 28.1% |

Faster decisions are not uniformly smarter. Hard’s empty theft fraction rises from 6.8% to 28.1%, because both sides act sooner and the hostile warning still allows spending charge. The scaled profile improves Easy/Medium theft resolution relative to the fast control, while Hard is identical by construction. No theft/Sticky Fingers reassignment or warning-time buff was made.

## Findings and limits

- The scaled profile gives the intended timing separation. Easy/Medium cancel more often while waiting; Hard completes more casts than baseline (64,922 vs 41,314 across the same number of distinct matches), including 22,854 late casts vs 11,113. This is not a claim of higher casts-per-second or globally better strategy.
- Easy executes zero post-ramp casts in both faster controls. In the scaled run 25,787 late opportunities were scheduled and all failed to execute; the known half-second lifetime is shorter than its target-based notice/decision window. This behavior is allowed, not silently compensated.
- Medium is borderline at late peaks; Hard can sometimes act before expiry. Controlled half-second target tests confirm Easy/Medium cancellation at an exact 500 ms lifetime and feasible Hard casting with sufficiently short seeded delay.
- Requested-profile pooled wins still favor Champignon over every opponent (61.3–74.5%). Spell strength remains a separate later phase. Andromoss/Sprig and Duskmantle/Sprig show small favored-side flips across difficulty, flagged in the matrix report.
- Opportunity casting here is tier 1 only; full-kit heuristics remain unchanged. Profiles baseline/fast/scaled are available explicitly; this test does not auto-adopt scaled as the default. Hero-independent delay multipliers and shared opportunity rules avoid a per-character probability compensation layer.

## Verification

157 tests, production build and six desktop/mobile browser checks passed. Tests cover exact seeded difficulty scaling, shared visibility, old-profile restoration, cancellations/pending accounting, half-second opportunity expiry, freeze/reset/cooldown behavior and pooled counter-flip flags. Existing hit reaction and spell-free diagnostics remain passing. All batch decision totals reconcile scheduled=cancelled+completed+pending; completed decisions equal actual recorded casts.

Reproduce with `pnpm balance:roster --tier=1 --casting=opportunity --cast-profile=baseline|fast|scaled --seeds=100 --seed=20261119 --report=casting-baseline|casting-fast|casting-scaled` (choose matching individual profile/report names).
