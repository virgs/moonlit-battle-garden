# Moonlit Battle Garden

Read README.md and specs/decisions.md before changing the game. Consult specs/game.md, specs/characters.md, and specs/prototype.md for relevant rules. Preserve decisions across chats; distinguish requirements from provisional tuning.

- Use pnpm and the existing TypeScript/React/Phaser/Vite stack.
- Keep rules independent of React, Phaser, browser timers, and networking. Bots and balance runs must use the actual simulation.
- Prefer small focused changes with visible value. Update specs when behavior changes.
- User requested frequent meaningful Git commits and pushes. Do not wait for deployments after each commit; the user will say when they want to test the published build. Never commit credentials, build output, or dependencies.
- Run relevant simulation tests and the production build. Run browser checks for user-facing changes and balance simulations for bot/magic/tuning changes.
- Preserve significant balance findings. Do not tune toward a bot-only 50% result without examining spell coverage and strategy bias. Human playtesting remains required.
- Initial scope is Sir Champignon and Andy. Preserve the other six characters in specs for later expansion.
