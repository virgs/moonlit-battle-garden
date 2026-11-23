# Half-frequency stars

Human request: stars should take at least twice as long to appear. Implement exactly2× first, through configurable `pacing.starScheduleScale`. This is a resource cadence change, not sprite-speed or target-lifetime tuning.

| Baseline slot | Before | Current |
|---|---:|---:|
| First |5s|10s|
| Second |14s|28s|
| Third |22s|44s|
| Fourth |30s|60s|
| Fifth |39s|78s|
| Sixth |47s|94s|
| Repeating resource cycle |3 slots/25s|3 slots/50s|

Slots follow each board's active virtual clock. Existing score catch-up can advance a losing board by up to5%; pauses/casting stop the clock. Natural25s waves, target lifetimes/animations, star25-point reward, four-star capacity, one-live-star/free-hole checks, skipped blocked offers, all spells and AI strategies remain unchanged. Every round restarts the same schedule.

## Diagnostics

[Current pooled and Easy/Medium/Hard versus matrices](slower-stars-roster.md), [compressed raw outcomes](slower-stars-roster.json.gz). Compare with the [previous cadence matrices](gentler-pacing-roster.md).100 paired seeds per distinct matchup/difficulty (200 games),100 mirrors per hero/level,7500 best-of-three games total, zero30-minute caps.

| AI | Median mixed-character round, before→after | Casts per player per mixed-character match, before→after |
|---|---:|---:|
| Easy |59.9→67.7s|5.77→3.21|
| Medium |92.8→97.8s|8.06→4.93|
| Hard |123.7→123.5s|11.08→6.64|

Halving scheduled opportunities does not force exactly half as many casts: saving, theft, opportunities, coverage and match length still matter. Champignon remains favored in these bots. Easy Champignon used only1★, leaving2/3/4★ untested in its normal policy. Do not interpret this as human-balanced spell strength or tune toward50% without investigating that strategy bias.

Per-level flags: Champignon vs Sprig64.5/80.0/88.5% (24-point spread); Andromoss vs Duskmantle52.5/52.0/43.0% (observed favored-side flip). These descriptive differences are preserved in the matrices, not hidden by pooling. Long tails remain: maximum round704.45s and complete match1024.45s. No automatic spell changes adopted.

Verification covers actual star births, shared lifetimes, per-round reset and catch-up, spell interaction with natural stars, first-star UI collection/casting, meter hold and real WebRTC synchronization. The production-base phone smoke plays mole targets while waiting for the later star.

Reproduce: `pnpm exec vite-node scripts/balance-roster.ts --seeds=100 --report=slower-stars-roster`, then `gzip -9 reports/slower-stars-roster.json`.
