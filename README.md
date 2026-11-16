# Moonlit Battle Garden

A browser remake of Dig Hole Battle Garden: competitive Whac-A-Mole with character-specific magic inspired by Tetris Battle Gaiden. No stacking mechanics.

## Play locally

```sh
pnpm install
pnpm dev
```

Choose Sir Champignon or Andy, then play against an easy/medium/hard computer opponent or a second human on the same computer. First to two round wins takes the match.

- Player 1: QWE / ASD / ZXC. Cast with R.
- Player 2: numpad 789 / 456 / 123. Cast with numpad +.
- Mouse/touch: press a hole; press the spell button to cast.
- Escape pauses. Local games also pause when the tab is hidden.
- Hit moles and stars; avoid rabbits and empty holes. Collect up to four stars. The exact current star count selects your spell; casting consumes the charge.

Matches use one full-screen canvas with a HUD overlay. Artwork scales uniformly, with sprites and hit areas anchored to the actual holes. Desktop shows both gardens with you always on the left; same-computer Player 1 is always left. Mobile AI mode shows your garden and compact opponent status, with side HUDs in landscape. Local two-human mode keeps both gardens side by side on narrow screens.

An animated blue/red bar shows round standing, with blue on your side. Dust/root effects move with each board. Matches choose one participating character's cosmetic home; current homes reuse tinted castle artwork and a shared music track. Enable music and SFX with the Sound control. Distinct character backgrounds, music, and spell-cast animations are still part of the upcoming art pass.

## Current milestone

Playable local/AI prototype using the original mole, rabbit, star, and garden artwork. Both initial characters have four spells, with early balance values in `src/assets/config/game.yaml`. Character portraits are placeholders. Online rooms, installable/offline-cached PWA delivery, native packaging, and six remaining characters are not implemented yet. A local server is currently required to load the game; loaded local/AI matches do not require an external service.

Stack: TypeScript, React, Phaser, Vite, pnpm, Vitest, and Playwright. Phaser loads when entering a match. Rules and bots run independently of rendering so the simulation can later run on an authoritative server.

## Checks and AI balance

```sh
pnpm test
pnpm build
pnpm exec playwright install chromium
pnpm e2e
pnpm balance --seeds=100 --seed=20261116
```

The balance command runs 600 best-of-three AI matches: 100 seeds, both player-side assignments, and three same-difficulty pairings. Reports include wins, draws, match duration, tier-by-tier cast coverage, and per-match JSON. These are diagnostics, not a claim that human play is balanced. See [latest results](reports/balance-latest.md).

## Specifications

- [Decisions and open questions](specs/decisions.md): the source of truth for what has been agreed.
- [Game specification](specs/game.md): match rules, modes, presentation, AI, and technical direction.
- [Characters and magic](specs/characters.md): adopted roster and initial spell designs.
- [Prototype rules](specs/prototype.md): actual behavior, provisional tuning, and balance findings.
- [Round pacing](specs/pacing.md): agreed wave direction and identical difficulty reset each round; implementation pending.
- [Presentation](specs/presentation.md): shared bar, board effects, character homes, and deferred cast animations.

Preserve agreed decisions across chats; update these files when behavior or decisions change. Distinguish implementation defaults from confirmed requirements.

## References

- https://github.com/virgs/digHoleBattleGarden — original game, rules, characters, and assets.
- https://github.com/virgs/molecideGaiden — later browser version, animations, art, and audio.
- Local sibling project `../shinobi-arena` — reference frontend stack.

See [asset notes](public/assets/README.md) and the preserved source license for reused artwork and sounds.
