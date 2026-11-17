# Moonlit Battle Garden

A browser remake of Dig Hole Battle Garden: competitive Whac-A-Mole with character-specific magic inspired by Tetris Battle Gaiden. No stacking mechanics.

## Play locally

```sh
pnpm install
pnpm dev
```

Press any key or tap at the title screen, then choose a mode in the main menu, then use the two character carousels to confirm Sir Champignon or Andy and play against an easy/medium/hard computer opponent, a second human on the same computer, or an online rival by invite. First to two round wins takes the match.

- Player 1: QWE / ASD / ZXC. Cast with R.
- Player 2: numpad 789 / 456 / 123. Cast with numpad +.
- Mouse/touch: press a hole; tap/click the star container to cast.
- Escape or a tap/click on the score bar opens controls, including sound and exit. AI/local modes pause; online play continues behind its local menu. Hidden tabs pause only AI/local games.
- Hit moles and stars; avoid rabbits and empty holes. Collect up to four stars. The exact current star count selects your spell; casting consumes the charge.

Matches use one full-screen canvas with a HUD overlay. Artwork scales uniformly, with sprites and hit areas anchored to the actual holes. Desktop shows both gardens with you always on the left; same-computer Player 1 is always left. Mobile AI/online mode shows only your garden and star container; both sides remain represented by the shared bar, names and trophies. Local two-human mode keeps both gardens side by side on narrow screens.

A single animated blue/red bar shows score difference, with blue on your side. Ties center it; reaching a lead of X points wins the round and fills one color (X=100 for now). Hits earn points and mistakes subtract points; there is no health pool. Dust/root effects move with each board; the board-base marker is blue on the left and red on the right. Original star-container sprites animate charge, and original trophies spin at round victory and show each player’s round wins beneath their side of the shared bar. Matches choose one participating character's cosmetic home; current homes reuse tinted castle artwork and a shared music track. Music and all restored SFX start enabled on entry; the Sound control can mute them. Each character has configured drop-in home backgrounds/music, portraits, and per-tier cast sheets; the playback/fallback code is ready and final files remain for the art pass. See [asset contract](public/assets/ASSET-CONTRACT.md).

## Current milestone

Playable local/AI prototype using the original mole, rabbit, star, and garden artwork. Both initial characters have four spells, with early balance values in `src/assets/config/game.yaml`. Missing portraits/icons use recovered hero illustrations; absent/invalid cast sheets show a recovered hero during the shared 1.5-second cast freeze. Both boards and their gameplay timers stop during casts. Spell edge effects have visible procedural fallbacks and follow their actual lifetimes. Standing/idle preview sheets have drop-in paths too. Pacing runs in shared build/peak/recovery waves that restart identically each round, with independent board clocks, faster offers/shorter reaction windows for the trailing player, and concurrency limits. Private player-hosted online matches are implemented. Mobile delivery uses the ordinary browser website; PWA/offline-cached startup and native packaging are deferred. Six remaining characters stay deferred too. Further sprite generation is deferred until the remaining game development is complete. Open the published website or use a local development server to load the game; loaded local/AI matches do not require an external service.

Menu modes are **Night Watch** (solo), **Garden Grudge** (shared keyboard), and **Beyond the Hedge** (online). **Garden Shed** contains sound settings and **Field Notes** explains play. During selection, R confirms/changes your hero, numpad + the second editable hero, Enter starts when both are ready, and Esc goes back. Key hints reuse the supplied CraftPix pack and hide on touch-primary devices.

Typography uses bundled Almendra for titles/character names, Cinzel for the pause heading, and Literata for supporting text, with their free font licenses included.

Stack: TypeScript, React, Phaser, Vite, pnpm, Vitest, and Playwright. Phaser loads when entering a match. Rules and bots run independently of rendering with the same simulation used by local play, AI diagnostics, and the hosting browser.

## GitHub Pages and phone controls

The workflow builds from `main` and publishes through `.github/workflows/pages.yml` to `https://virgs.github.io/moonlit-battle-garden/`. The repository is public with user authorization; Pages is enabled and the repository variable `PAGES_ENABLED=true` activates automatic deployment. The build sets `VITE_BASE_PATH=/moonlit-battle-garden/`; runtime images/audio and invite links preserve that subpath. Local development keeps the root base. The deployment runs unit checks plus a production-subpath mobile touch test before publishing.

On phones, tap targets directly in the single local garden. Tap/click the **star container itself** to cast the spell at the current tier and consume the charge. It is disabled without stars, during cooldown or pause. Larger original vertical columns sit beside desktop boards. Phone landscape centers the board horizontally with a vertical star container on its left. Desktop trophies align directly above the star columns, with character names above the trophies. Narrow portrait lanes use a horizontal strip below the board when that preserves larger targets. During play a compact mode badge, round number and elapsed active round timer accompany the board(s), star container(s), shared bar, names centered above their trophies, and round trophies. The clock resets each round and freezes with gameplay during pauses, casting and connection recovery; it adds no round time limit. No persistent portraits, numeric scores, spell names/descriptions, wave text, keycaps or toolbar. Tap the score bar or press Escape for the reference-style menu: Resume/Mute/Quit on the left, sprite key maps and both heroes’ spell titles on the right. AI/local games pause; online games keep running. Connection loss opens the recovery menu automatically. Single-board screens include a read-only rival star meter. Round and match results overlay the final game scene: a trophy for round wins, the winning hero’s PixelLab sprite animation for match wins. After four seconds a fresh key/tap/controller prompt starts the next round or returns to the menu respectively. Menu panels use transparent, borderless surfaces. PWA installation/cached startup is intentionally deferred; play in a normal browser.

To verify the deployed-path build locally:

```sh
VITE_BASE_PATH=/moonlit-battle-garden/ pnpm build
pnpm exec playwright test --config=playwright.pages.config.ts
```

## Online play without a game server

Choose **Beyond the Hedge → Create online garden**, then share the invite link. Your friend opens it and joins. Both players then see two live character carousels, browse their own hero, and confirm Ready. Both confirmations start the match after the existing victory clips. Both players see themselves on the left (or on their own single mobile board). Only the creator runs the simulation; the other browser sends hit/cast inputs. Scores, targets, magic, round outcomes and connection-recovery freezes come from the host. Mouse, touch and QWE/ASD/ZXC + R work for your own board.

The static site can be deployed over HTTPS. There is no dedicated gameplay backend, account system, or matchmaking service. PeerJS Cloud provides signaling by default; WebRTC carries gameplay directly between browsers. Some mobile/corporate networks require a TURN relay. No managed relay is configured yet, so connections on those networks can fail. Optional signaling/ICE overrides are documented in `.env.example`; browser configuration is public and must not contain permanent TURN secrets. See [online architecture](specs/online.md).

Either player can start the next round. Online matches cannot be manually paused: opening the local menu or hiding a tab does not ask the other browser to stop. Brief link interruptions freeze play and retry for up to 30 seconds with the same browser identity; the ready handshake resumes recovered games automatically. Leaving, reloading, or closing the host ends the match. There is no host migration or recovery across a page refresh. Guest inputs use target IDs so delayed clicks cannot hit a replacement mole; there is no rollback/prediction and the host retains a latency advantage.

Session timing catches up delayed timer callbacks in fixed 50 ms steps, with one bot update per step and a 250 ms catch-up limit. Paused/disconnected time is discarded. CI browser projects run on separate desktop/mobile runners with one worker each and a 60-second per-test budget; assertion deadlines remain unchanged. Resize checks retain all nine viewports in three groups and read each frame’s geometry in one browser call, avoiding repeated software-WebGL stalls.

Browser tests use a **local-only** PeerServer on port 9000 and an isolated Vite preview on 4174. They exercise real RTC data channels between browser contexts without relying on public signaling. These are test processes, not a required deployment backend. Local/AI play never contacts PeerJS.

## Checks and AI balance

```sh
pnpm test
pnpm build
pnpm exec playwright install chromium
pnpm e2e
pnpm balance --seeds=100 --seed=20261116
pnpm assets:check
```

The balance command runs 600 best-of-three AI matches: 100 seeds, both player-side assignments, and three same-difficulty pairings. Reports include wins, draws, match duration, tier-by-tier cast coverage, and per-match JSON. Unfinished matches at the diagnostic cap are reported separately; --fail-on-cap makes them a strict failure. These are diagnostics, not a claim that human play is balanced. See [latest results](reports/balance-latest.md).

## Specifications

- [Decisions and open questions](specs/decisions.md): the source of truth for what has been agreed.
- [Game specification](specs/game.md): match rules, modes, presentation, AI, and technical direction.
- [Characters and magic](specs/characters.md): adopted roster and initial spell designs.
- [Prototype rules](specs/prototype.md): actual behavior, provisional tuning, and balance findings.
- [Round pacing](specs/pacing.md): implemented pressure/recovery waves, independent stars, and identical reset each round.
- [Presentation](specs/presentation.md): shared bar, board effects, asset-ready character homes, portraits, and cast playback.
- [Online architecture](specs/online.md): player-hosted matches, signaling/relay configuration, reconnect behavior and limits.
- [Implementation audit](specs/status.md): what works, what is missing, and the confirmed score-difference win rule.

Preserve agreed decisions across chats; update these files when behavior or decisions change. Distinguish implementation defaults from confirmed requirements.

## References

- https://github.com/virgs/digHoleBattleGarden — original game, rules, characters, and assets.
- https://github.com/virgs/molecideGaiden — later browser version, animations, art, and audio.
- Local sibling project `../shinobi-arena` — reference frontend stack.

See [asset notes](public/assets/README.md) and the preserved source license for reused artwork and sounds.
