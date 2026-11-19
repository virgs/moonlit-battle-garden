# Round pacing

Status: implemented; final balance/tuning ongoing.

## Accepted direction

- Difficulty rises with elapsed time inside a round, with smooth waves of pressure and recovery.
- Every round starts the same curve from the beginning. Round number and match score never increase baseline difficulty: the first, second, and third round have identical rules and pacing.
- Vary spawn intervals, target reaction windows, and overlapping target demands together. Include concurrency limits so peaks remain playable.
- Recovery still contains targets and opportunities to collect magic; it is not a complete stop.
- Both players share the underlying pressure wave. Natural timing/types now use independent seeded board schedules. The trailing board gets bounded score pressure (D38); magic adds separate pressure.
- Rabbits should add recognition challenges rather than replace so many moles that the game gets easier.
- Keep randomness bounded by minimum reaction windows and concurrency limits.
- Stage ownership/background/music do not change pacing.

## Implemented wave

25-second waves: 12 seconds of build, 5 seconds at peak, 8 seconds of recovery. Cubic smoothstep transitions avoid timing jumps at boundaries. A separate 60-second baseline ramp makes later waves harder; round number, rounds won, character, home, and bot difficulty never affect that baseline curve. Current-round score only adds the bounded D38 modifier. Every round resets the same natural scheduling seed and curve. Hole-position streams continue so the board layout is not repeated.

Natural intervals start from 1350 ms and ramp toward 600 ms, multiplied by 1.1 in calm periods through 0.40 at peak. Per-board ±8% timing jitter is clamped to a 300 ms minimum. Natural lifetimes start from 2200 ms and ramp toward 1300 ms, with calm/peak multipliers 1.08/0.88 and a 1150 ms floor. Deadlines are integer milliseconds to preserve exact round-relative timing.

Natural concurrency starts at two targets, grows to four, and allows one extra near peaks. Rabbit probability rises gently from 10% toward 15%, plus at most 3% at peaks; natural rabbit streaks are capped at two. Each board draws its own deterministic natural type/timing offers with the same baseline distribution; positions also use separate streams. A player already at their natural concurrency cap may miss an offer until they clear space.

Stars have baseline opportunities at virtual-clock offsets 5, 14, and 22 seconds per 25-second cycle, with a baseline 2200 ms lifetime and at most one visible star per board. Losing-score pressure advances that board’s natural/star virtual clock faster and shortens newly spawned star windows. Natural timing jitter, extra magical targets and blocked offers never advance the star index. Tied clocks therefore retain the baseline star schedule, while sustained deficits bring opportunities sooner.

Magic adds separately scheduled pressure, capped at two magical targets at once. Rabbit Riot adds rabbits; Double Trouble adds rabbit-heavy waves with a 30% mole chance. It no longer advances either natural clock. At most five natural targets, two magic targets, and one star can coexist. The ninth hole remains spare. This preserves readable bounds while attacks deliberately add work.

All values live in src/assets/config/game.yaml. SpawnDirector separates per-board scheduling randomness, each player's positions, and each player's magical target selection. Cosmetic asset loading cannot perturb these streams. Tests cover phase transitions, minimum windows, concurrency, independent demand, score pressure, separate stars, and identical reset in later rounds.

## Balance diagnostics

Re-run the seeded tournament after tuning. Long score ties are allowed by the game, so the diagnostic cap records unfinished matches separately and never invents a winner/draw. `pnpm balance --fail-on-cap` enables a strict nonzero exit for such runs. Final balance remains open; see the latest report.


## Oldest-code comparison: score-linked pressure

Verified in digHoleBattleGarden commit 39984888c3a9d2de2a77bedecad7d841a92ea55a: Fase.cpp lines 213–216 derive each player's spawn delay from the opponent's semTop plus the shared wave speed. semTop increases toward 100 for the losing side, so the losing player receives the smaller delay. Player.cpp lines 121–133 use that delay for spawn cadence and target lifetime; the star counter advances per spawn (one star about every 30 offers), so faster spawning also speeds up star opportunities. The integer division makes the original score adjustment stepwise.

D38 adopts this direction with smooth bounded pressure rather than the original stepwise formula. Each board has a virtual spawn/star clock. Its rate is `1 / (1 - 0.05 * deficit)`, where deficit is the positive opponent lead divided by the winning threshold, clamped to 0–1. New natural/star lifetimes multiply by `1 - 0.05 * deficit`. The winning board gets no slowdown. Existing targets keep their original expiry; magic cast cooldowns, warning times, attack durations and magical spawn cadence are unchanged.

The base wave always uses real round time, so both boards still share build/peak/recovery and the 60-second ramp. Losing-score modifiers depend only on the current round lead, never rounds won or character. Clocks, seeds, star indices and rabbit streaks reset every round. Natural scheduling/type RNG is independent per board; hole and magic RNG remain separate. Safety limits remain: at least 300 real milliseconds between natural offers, at least 1150 ms for newly spawned natural/star targets, maximum five natural/two magic/one star. The real-time interval guard survives sudden lead reversals; missed/full-board offers do not accumulate a burst backlog.

The 20% interval / 15% lifetime prototype produced 44/200 unfinished Hard matches. The historical default was reduced to 10%/10% to avoid that strong feedback. See reports/balance-score-pressure-comparison.md for baseline, independent-clock control, rejected stronger pressure and final results. This is not a claim of balanced characters.

## Duration tuning, 2026-11-17

Current defaults use the 60-second ramp, stronger peaks, 300 ms arrival floor and 5%/5% losing-board modifier described above. These supersede the historical 120-second / 500 ms / 10% controls. AI timing also varies with seeded per-target reaction samples, per-action jitter and occasional hesitation. Minimum target visibility remains 1150 ms; score threshold, spell effects, cast freezes, concurrency and identical per-round reset remain. See reports/balance-duration-review.md for controlled experiments, held-out validation, and the unresolved Hard character advantage/tails.


## Current tuning discussion (D110–D112/I09)

User wants moles, rabbits and stars to follow the wave, including shorter target lifetimes near 0.5 s at the fastest peaks. Easy AI may fail to react there; target pacing must not be clamped to Easy reaction speed. Work order: plot and understand the curve → tune pacing → reaction times → casting delay → spell strength.

The conversation preview uses the actual current pacing formula, 25-second waves (12 build / 5 peak / 8 recovery) and a 60-second baseline ramp. Current natural lifetime starts at a 2200 ms base and ends at 1300 ms, floored at 1150 ms; stars separately stay for a 2200 ms base. Draft only: end base 600 ms / floor 500 ms, giving about 528 ms at a late peak at equal scores, shared across all three target types. Current spawn frequency is shown separately, without changing it. Curves exclude timing jitter, occupancy, spells and score catch-up; they describe requested lifetime/schedule envelopes, not guaranteed spawn counts. These draft numbers have not been applied.

## Oldest source timing audit (2026-11-19)

Read the local digHoleBattleGarden checkout at commit `39984888c3a9d2de2a77bedecad7d841a92ea55a` (not the later browser remake). These are source-derived nominal timings, not a measured run:

- `main.cpp:28` constructs the stage at 12 FPS. `Fase.cpp:58,181–216` starts its sine at the slow trough, uses `5 + 4*sin(phase)`, and advances by `2*pi/(FPS*60*20)` per active update: approximately a 20-minute full wave, first fast peak around 10 minutes. The comment claiming a ten-minute full cycle is inconsistent with the code. `fimRound:222` advances the existing phase by 120 steps; it does not reset to the same starting pace each round.
- At tied score 50/50, `veloTop = int(1 + 12/veloGeral)`. `Player.cpp:121–131` offers a spawn every `veloTop + 2` updates (post-increment plus strict greater-than). Nominal slow/mid/fast spawn gaps are approximately 1.25 / 0.417 / 0.333 s. At the initial floating-point near-trough the delay can truncate to 12 rather than 13, giving 1.167 s instead of 1.25 s. Score pressure changes delays by integer steps.
- Lifetime is randomized relative to that delay, approximately `(1.2..5.0) * veloTop` frames for ordinary moles/rabbits and `(0.2..4.0) * veloTop` for stars, with integer truncation. The duration is assigned for the next spawn, rather than the current one. The first initial target starts with a 48-frame lifetime parameter.
- Crucially, `Toupeira.cpp:222–250` has an eight-update retreat sequence and accepts hits while active, including during retreat. With no hits/spells, actual active/hittable duration is `max(8, lifetimeParameter - 1)` updates, not simply `lifetimeParameter/FPS`. At 12 FPS this creates an approximately 0.667 s floor. This includes animation time, not solely the fully emerged pose.
- At the tied-score fast peak (`veloTop=2`), ordinary moles/rabbits stay active about 0.667–0.750 s; stars about 0.667 s. At mid-speed (`veloTop=3`), ordinary targets are about 0.667–1.167 s and stars 0.667–0.917 s. At a mathematically exact slow trough (`veloTop=13`), ordinary targets are about 1.167–5.333 s and stars 0.667–4.250 s; integer/float timing near the trough can shorten these slightly. The initial 48-frame target is active about 47/12 = 3.917 s.
- Stars are offered about every 30 spawns and have shorter duration parameters; faster spawning therefore speeds star opportunities too. Losing-side pressure accelerates offers/shortens randomized durations, but the eight-frame retreat still limits actual minimum active duration.

Interpretation: the original's roughly 0.3 s fastest spawn gap must not be mistaken for a 0.3 s target lifetime. A 0.3 s active window in the remake would be substantially shorter than the oldest game's ordinary fastest active window. No gameplay or tuning changed during this audit.

Sources: [Fase.cpp](https://github.com/virgs/digHoleBattleGarden/blob/39984888c3a9d2de2a77bedecad7d841a92ea55a/Fase.cpp#L181), [Player.cpp](https://github.com/virgs/digHoleBattleGarden/blob/39984888c3a9d2de2a77bedecad7d841a92ea55a/Player.cpp#L121), [Toupeira.cpp](https://github.com/virgs/digHoleBattleGarden/blob/39984888c3a9d2de2a77bedecad7d841a92ea55a/Toupeira.cpp#L222), [main.cpp](https://github.com/virgs/digHoleBattleGarden/blob/39984888c3a9d2de2a77bedecad7d841a92ea55a/main.cpp#L28).
