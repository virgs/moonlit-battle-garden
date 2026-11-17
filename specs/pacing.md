# Round pacing

Status: implemented; final balance/tuning ongoing.

## Accepted direction

- Difficulty rises with elapsed time inside a round, with smooth waves of pressure and recovery.
- Every round starts the same curve from the beginning. Round number and match score never increase baseline difficulty: the first, second, and third round have identical rules and pacing.
- Vary spawn intervals, target reaction windows, and overlapping target demands together. Include concurrency limits so peaks remain playable.
- Recovery still contains targets and opportunities to collect magic; it is not a complete stop.
- Both players share the underlying pressure wave. Random target positions may differ, while comparable counts and timing keep natural pressure fair. Magic deliberately changes pressure.
- Rabbits should add recognition challenges rather than replace so many moles that the game gets easier.
- Keep randomness bounded by minimum reaction windows and concurrency limits.
- Stage ownership/background/music do not change pacing.

## Implemented wave

25-second waves: 12 seconds of build, 5 seconds at peak, 8 seconds of recovery. Cubic smoothstep transitions avoid timing jumps at boundaries. A separate 120-second baseline ramp makes later waves harder; round number, score, character, home, and bot difficulty never affect that curve. Every round resets the same natural scheduling seed and curve. Hole-position streams continue so the board layout is not repeated.

Natural intervals start from 1350 ms and ramp toward 780 ms, multiplied by 1.1 in calm periods through 0.68 at peak. Shared ±8% timing jitter is clamped to a 500 ms minimum. Natural lifetimes start from 2200 ms and ramp toward 1500 ms, with calm/peak multipliers 1.08/0.88 and a 1150 ms floor. Deadlines are integer milliseconds to preserve exact round-relative timing.

Natural concurrency starts at two targets, grows to four, and allows one extra near peaks. Rabbit probability rises gently from 10% toward 15%, plus at most 3% at peaks; natural rabbit streaks are capped at two. Both players receive the same natural type/time/lifetime offers; only hole placement differs. A player already at their natural concurrency cap may miss an offer until they clear space.

Stars have independent opportunities at 5, 14, and 22 seconds inside every wave, with a 2200 ms lifetime and at most one visible star per board. Faster ordinary spawning and magic never change star opportunities.

Magic adds separately scheduled pressure, capped at two magical targets at once. Rabbit Riot adds rabbits; Double Trouble adds rabbit-heavy waves with a 30% mole chance. It no longer advances the shared natural clock. At most five natural targets, two magic targets, and one star can coexist. The ninth hole remains spare. This preserves readable bounds while attacks deliberately add work.

All values live in src/assets/config/game.yaml. SpawnDirector separates shared scheduling randomness, each player's positions, and each player's magical target selection. Cosmetic asset loading cannot perturb these streams. Tests cover phase transitions, minimum windows, concurrency, shared demand, independent stars, and identical reset in later rounds.

## Balance diagnostics

Re-run the seeded tournament after tuning. Long score ties are allowed by the game, so the diagnostic cap records unfinished matches separately and never invents a winner/draw. `pnpm balance --fail-on-cap` enables a strict nonzero exit for such runs. Final balance remains open; see the latest report.


## Oldest-code comparison: score-linked pressure

Verified in digHoleBattleGarden commit 39984888c3a9d2de2a77bedecad7d841a92ea55a: Fase.cpp lines 213–216 derive each player's spawn delay from the opponent's semTop plus the shared wave speed. semTop increases toward 100 for the losing side, so the losing player receives the smaller delay. Player.cpp lines 121–133 use that delay for spawn cadence and target lifetime; the star counter advances per spawn (one star about every 30 offers), so faster spawning also speeds up star opportunities. The integer division makes the original score adjustment stepwise.

The remake currently uses shared natural offers and independent positions, and does not yet apply score-linked pressure. The user proposed restoring faster spawns and shorter reaction windows on the losing board. This is a proposed rule revision to discuss/tune; it has not been silently added as part of the text-outline change. A bounded score-based modifier would preserve each round's identical baseline wave while giving the trailing player more scoring/magic opportunities and more demanding reactions.
