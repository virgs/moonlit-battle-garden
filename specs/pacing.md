# Round pacing

Status: direction agreed; wave implementation and final tuning pending.

## Accepted direction

- Difficulty rises with elapsed time inside a round, with smooth waves of pressure and recovery.
- Every round starts the same curve from the beginning. Round number and match score never increase baseline difficulty: the first, second, and third round have identical rules and pacing.
- Vary spawn intervals, target reaction windows, and overlapping target demands together. Include concurrency limits so peaks remain playable.
- Recovery still contains targets and opportunities to collect magic; it is not a complete stop.
- Both players share the underlying pressure wave. Random target positions may differ, while comparable counts and timing keep natural pressure fair. Magic deliberately changes pressure.
- Rabbits should add recognition challenges rather than replace so many moles that the game gets easier.
- Keep randomness bounded by minimum reaction windows and concurrency limits.
- Stage ownership/background/music do not change pacing.

## Starting proposal to tune

Approximately 25-second waves: 12 seconds of build, 5 seconds near peak, 8 seconds of recovery, with smooth transitions. Each successive wave has a higher baseline, so late-round recovery is harder than the opening. Exact durations and values require playtesting.

Consider scheduling star opportunities separately from ordinary spawns so accelerated play does not automatically accelerate magic charge. Some stars can arrive during recovery and others during pressure.

## Current implementation

The engine still uses the initial linear 120-second spawn/lifetime ramp and a star every five regular spawns. Its progress already uses round-relative time and resets each round. Do not describe the wave proposal or independent star scheduling as implemented yet. Re-run the offline AI balance suite when this changes.
