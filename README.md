# Moonlit Battle Garden

A browser remake of Dig Hole Battle Garden: competitive Whac-A-Mole with character-specific magic inspired by Tetris Battle Gaiden. No stacking mechanics.

## Play locally

```sh
pnpm install
pnpm dev
```

Press any key or tap at the title screen, then choose a mode in the main menu, then use the two character carousels to choose Sir Champignon, Andromoss, Captain Bramble, Duskmantle or Sprig and play against an easy/medium/hard computer opponent, a second human on the same computer, or an online rival by invite. First to two round wins takes the match.

- Player 1: QWE / ASD / ZXC. Cast with R.
- Player 2: numpad 789 / 456 / 123. Cast with numpad +.
- Mouse/touch: press a hole; tap/click the star container to cast.
- Escape or a tap/click on the score bar opens controls, including sound and exit. AI/local modes pause; online play continues behind its local menu. Hidden tabs pause only AI/local games.
- Hit moles and stars; avoid rabbits and empty holes. Collect up to four stars. The exact current star count selects your spell; casting consumes the charge.

Matches use one full-screen canvas with a HUD overlay. Artwork scales uniformly, with sprites and hit areas anchored to the actual holes. Desktop shows both gardens with you always on the left; same-computer Player 1 is always left. Mobile AI/online mode shows only your garden and star container; both sides remain represented by the shared bar, names and trophies. Local two-human mode keeps both gardens side by side on narrow screens.

A single animated blue/red bar shows score difference, with blue on your side. Ties center it; reaching a lead of X points wins the round and fills one color (X=100 for now). Hits earn points and mistakes subtract points; there is no health pool. Dust/root effects move with each board; the board-base marker is blue on the left and red on the right. Original star-container sprites animate charge, and original trophies spin at round victory and show each player’s round wins beneath their side of the shared bar. Matches choose one participating character's cosmetic home: Sporelight Keep has a purple moonlit castle and Forest Whisper Theme; Moonlit Hideout has a misty blue pixel forest and Magic Town. The home collection uses fourteen CC0 assets, one CC BY 4.0 background and one background with explicit creator permission; provenance, attribution and licenses are bundled in public/assets/homes/. Three additional homes are staged for the future roster, with foliage, roots, mist and magical woodland lighting. Review all eight backgrounds and music at `assets/homes/index.html` on the game server; their five playable-home assignments follow the approved roster. Music and all restored SFX start enabled on entry; the Sound control can mute them. Each character has configured drop-in home backgrounds/music, portraits, and one shared casting sheet per character; the playback/fallback code is ready and final files remain for the art pass. See [asset contract](public/assets/ASSET-CONTRACT.md).

## Current milestone

Five playable heroes use their approved idle, victory, shared casting and icon assets: Sir Champignon, Andromoss, Captain Bramble, Duskmantle and Sprig. All have four spells in the shared simulation, work as either human or AI opponents, and can be chosen in online rooms. Each match uses one participant’s distinct approved home/music. The same menus/HUD show all five heroes without extra permanent panels. Missing optional large portraits and per-spell effect sheets use existing fallbacks; no new artwork was generated for roster integration.

New kits are provisional: Bramble guards mistakes and puts extra-hit armor on enemy moles; Duskmantle marks misses, dims readable target shapes and rewards manual mole hits; Sprig extends current targets, automates one/two columns of hits—including star collection and rabbit penalties—and cleanses hostile magic. Armor shows a helmet arc/remaining-hit pips, marked moles have violet rings, and active magic has board-edge placeholders. All clocks freeze during casts/pauses/recovery and reset each round. One shared hero cast is distinct from each spell’s effect animation. See [exact defaults](specs/prototype.md).

Balance reports lead with **three versus matrices: Easy, Medium and Hard**. Sweep and Sprig automation use normal hits: mole +10, rabbit −12 (unless guarded), star +25/+1 charge. Sweep lasts 3 seconds; Bramble armor also lasts 3 seconds and provisionally affects at most two/four moles at tiers 1/4. All lasting spell windows have a three-second minimum. The corrected sweep materially strengthens Champignon; diagnostics still show imbalance and strategy/coverage gaps, so human playtesting remains necessary. See [normal-hit results and comparison](reports/balance-normal-hits-review.md). Mobile uses the normal browser; PWA/native packaging and the remaining three heroes stay deferred.

Menu modes are **Night Watch** (solo), **Garden Grudge** (shared keyboard), and **Beyond the Hedge** (online). **Garden Shed** contains sound settings and **Field Notes** explains play. During selection, R confirms/changes your hero, numpad + the second editable hero, Enter starts when both are ready, and Esc goes back. Key hints reuse the supplied CraftPix pack and hide on touch-primary devices.

Typography uses bundled Almendra for titles/character names, Cinzel for the pause heading, and Literata for supporting text, with their free font licenses included.

Stack: TypeScript, React, Phaser, Vite, pnpm, Vitest, and Playwright. Phaser loads when entering a match. Rules and bots run independently of rendering with the same simulation used by local play, AI diagnostics, and the hosting browser.

## GitHub Pages and phone controls

The workflow builds from `main` and publishes through `.github/workflows/pages.yml` to `https://virgs.github.io/moonlit-battle-garden/`. The repository is public with user authorization; Pages is enabled and the repository variable `PAGES_ENABLED=true` activates automatic deployment. The build sets `VITE_BASE_PATH=/moonlit-battle-garden/`; runtime images/audio and invite links preserve that subpath. Local development keeps the root base. The deployment runs unit checks plus a production-subpath mobile touch test before publishing.

On phones, tap targets directly in the single local garden. Tap/click the **star container itself** to cast the spell at the current tier and consume the charge. It is disabled without stars, during cooldown or pause. Larger original vertical columns sit beside desktop boards. Phone landscape centers the board horizontally with a vertical star container on its left. Desktop trophies align directly above the star columns, with character names above the trophies. Narrow portrait lanes use a horizontal strip below the board when that preserves larger targets. During play a compact mode badge, round number and elapsed active round timer accompany the board(s), star container(s), shared bar, names centered above their trophies, and round trophies. The clock resets each round and freezes with gameplay during pauses, casting and connection recovery; it adds no round time limit. Small character icons sit beside both HUD names, using semi-transparent colored boxes until their final files exist. No numeric scores, spell names/descriptions, wave text, keycaps or toolbar. Tap the score bar or press Escape for the reference-style menu: Resume/Mute/Quit on the left, sprite key maps and both heroes’ spell titles on the right. AI/local games pause; online games keep running. Connection loss opens the recovery menu automatically. Single-board screens include a read-only rival star meter. Round and match results overlay the final game scene: a trophy for round wins, the winning hero’s PixelLab sprite animation for match wins. After four seconds a fresh key/tap/controller prompt starts the next round or returns to the menu respectively. Menu panels use transparent, borderless surfaces. PWA installation/cached startup is intentionally deferred; play in a normal browser.

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
pnpm balance:mirrors --seeds=1000 --seed=20261117
pnpm assets:check
pnpm balance:roster --seeds=100 --seed=20261118
pnpm balance:duration-review
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

## Automatic connection check

Open `?network-check=host` on the website to create an automatic diagnostic room, then open its generated phone link on a second device/network. No playing or confirmation taps are needed: both clients use the real PeerRoom/Session, hit targets, collect/cast stars, and test recovery after closing the guest data channel once. Keep both pages visible. Success requires at least three hits and one cast from each side plus recovery, over at least 20 seconds; an incomplete test fails after 90 seconds. This verifies data-channel gameplay, not touch/audio or browser suspension. Route results include candidate types/protocol/RTT, without IP addresses.

`pnpm e2e:online` runs the online browser suite against the public Pages site/PeerJS service. `ONLINE_BROWSER=webkit pnpm e2e:online` selects WebKit (install it with Playwright first). `ONLINE_URL` can override the website URL. These external-service checks are opt-in and do not run in ordinary CI. Regular CI also covers controlled 150 ms send delays per direction and silent-link heartbeat recovery; these are application-level impairments, not OS packet shaping.

The [mirror-match audit](reports/balance-mirrors.md) checks Andromoss/Andromoss and Champignon/Champignon at each AI level with side wins and unfinished matches reported separately. Approximately 50/50 side results are a sanity check, not proof of bot strength or cross-character balance.

Current AI uses bounded seeded reaction/action variation and occasional hesitation on every difficulty, with 70/87/92% hit accuracy. Stronger wave peaks and a faster round ramp shorten matches; every round still starts identically. The [duration tuning review](reports/balance-duration-review.md) compares the original and selected settings on 12,000 held-out simulations: selected mixed-character median rounds 53/66/89 seconds, and no capped matches in 6,000 selected-config runs. Hard still favors Champignon; human playtesting and spell balance remain open.
