# Moonlit Battle Garden

A browser remake of Dig Hole Battle Garden: competitive Whac-A-Mole with character-specific magic inspired by Tetris Battle Gaiden. No stacking mechanics.

Current rules are the [simplified five-hero spell matrix](specs/characters.md#current-simplified-spell-matrix-d140d141), with [pooled/per-level balance matrices](reports/simplified-kits-review.md). These D140/D141 rules supersede the historical tuning notes below.

[Spell artwork and placement](specs/presentation.md): all20 gameplay loops use the approved bolder pixel-art set, with distinct hero colours. The earlier raster set is archived; gameplay rules are unchanged. Timed spell icons darken from top to bottom as their active time runs out, retaining their silhouette; target badges and charge-based spells keep their normal colours. Column spells now have full-height drone ropes or spore streams; supporting particle/barrier/target animations follow actual game time and events. Extra-hit energy arches animate above and behind fully visible mole sprites; two extra hits show two separated arches.

## Play locally

```sh
pnpm install
pnpm dev
```

The title screen now shows a layered cemetery garden with a horizontal camera moving left, right and back, mole/dust activity and temporary animated bat/owl/pumpkin actors. Reduced-motion settings show a still scene. Press any key or tap at the title screen, then choose a mode in the main menu, then use the two character carousels to choose Sir Champignon, Andromoss, Captain Bramble, Duskmantle or Sprig and confirm them with a Selected stamp. AI play shows an Easy/Medium/Hard difficulty carousel beneath the selected computer hero. Play against a computer opponent, a second human on the same computer, or an online rival by invite. First to two round wins takes the match.

- Player 1: QWE / ASD / ZXC. Cast with R.
- Player 2: numpad 789 / 456 / 123. Cast with numpad +.
- Mouse/touch: press a hole; tap/click the star container to cast.
- Escape or a tap/click on the score bar opens controls, including sound and exit. AI/local modes pause; online play continues behind its local menu. Hidden tabs pause only AI/local games.
- Hit moles and stars; avoid rabbits and empty holes. Collect up to four stars. The exact current star count selects your spell; casting consumes the charge.

Matches use one full-screen canvas with a HUD overlay. Artwork scales uniformly, with sprites and hit areas anchored to the actual holes. Desktop shows both gardens with you always on the left; same-computer Player 1 is always left. Mobile AI/online mode shows only your garden and star container; both sides remain represented by the shared bar, names and trophies. Local two-human mode keeps both gardens side by side on narrow screens.

A single animated blue/red bar shows score difference, with blue on your side. Ties center it; reaching a lead of X points wins the round and fills one color (X=100 for now). Hits earn points and mistakes subtract points; there is no health pool. Dust/root effects move with each board; the board-base marker is blue on the left and red on the right. Original star-container sprites animate charge, and original trophies spin at round victory and show each player’s round wins beneath their side of the shared bar. Matches choose one participating character's cosmetic home: Sporelight Keep has a purple moonlit castle and Forest Whisper Theme; Moonlit Hideout has a misty blue pixel forest and Magic Town. The home collection uses fourteen CC0 assets, one CC BY 4.0 background and one background with explicit creator permission; provenance, attribution and licenses are bundled in public/assets/homes/. Three additional homes are staged for the future roster, with foliage, roots, mist and magical woodland lighting. Review all eight backgrounds and music at `assets/homes/index.html` on the game server; their five playable-home assignments follow the approved roster. Music and all restored SFX start enabled on entry; the Sound control can mute them. Each character has configured drop-in home backgrounds/music, portraits, and one shared casting sheet per character; the playback/fallback code is ready and final files remain for the art pass. See [asset contract](public/assets/ASSET-CONTRACT.md).

## Current milestone

Five playable heroes use their approved idle, victory, shared casting and icon assets: Sir Champignon, Andromoss, Captain Bramble, Duskmantle and Sprig. All have four spells in the shared simulation, work as either human or AI opponents, and can be chosen in online rooms. Each match uses one participant’s distinct approved home/music. The same menus/HUD show all five heroes without extra permanent panels. All20 spell-effect sheets use the approved bolder raster artwork. Missing optional large portraits retain existing fallbacks.

New kits are provisional: Bramble guards mistakes and puts extra-hit armor on enemy moles; Duskmantle marks misses, dims readable target shapes and rewards manual mole hits; Sprig extends current and arriving targets during a six-second aura, automates one/two columns of hits—including star collection and rabbit penalties—and cleanses hostile magic. Armor and marked/bonus/shortened targets carry silhouette-outlined sprite markers above their holes; only armor shows a numeric hit count; active magic uses board-rim and selected-column effects with relevant charge/quota cues. All clocks freeze during casts/pauses/recovery and reset each round. One shared hero cast is distinct from each spell’s effect animation. See [exact defaults](specs/prototype.md).

Balance reports lead with a **pooled versus overview**, retaining Easy/Medium/Hard matrices and flags for large difficulty spreads or observed favored-side flips. Sweep and Sprig automation use normal hits: mole +10, rabbit −12 (unless guarded), star +25/+1 charge. One-star Sweep covers one fixed column for 3 seconds, hitting immediately and intercepting all new arrivals on the same simulation update; four-star Royal Cleanup covers all columns at its unchanged 0.25-second cadence. Borrowed Spark steals every enemy star (caster capacity four), with no benefit against an empty meter. Tin Caps armors the next three enemy moles without a timer; Heavy Harvest affects four moles for 3 seconds. All lasting spell windows have a three-second minimum. Earlier full-board Sweep diagnostics used incorrect scope. See [corrected column/theft results](reports/balance-column-theft-review.md); human playtesting and strategy coverage checks remain necessary. Mobile uses the normal browser; PWA/native packaging and the remaining three heroes stay deferred.

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
pnpm diagnostic:reaction --seeds=100 --seed=20261119
pnpm balance:roster --tier=1 --seeds=100 --seed=20261119
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


Tier-isolated offline diagnostics start with [one-star results](reports/balance-tier-1.md): `--tier=1` gives one charge slot and only the one-star spell. `--tier=2..4` prepares later trials with matching capacity/cost and no lower-tier casts. One-star bots now wait for a useful visible opportunity and the adopted 200–400 ms base decision delay multiplied by Easy×3/Medium×2/Hard×1, with shared 100 ms target visibility; they cancel if the opportunity disappears. Hitting still follows difficulty. Use `--casting=immediate` to reproduce the archived baseline; higher tiers currently retain immediate casting until their conditions are designed. Normal browser play and reports without `--tier` retain the four-slot meter and existing strategy. No spell powers changed. These trials omit normal resource economy/cross-tier counters; compare spell coverage/impact and human play before tuning complete kits.


Historical one-star strength pass: Sweep cadence was 1.5 seconds and Tin Caps affected one mole; both retain three-second windows. Controlled independent/combined trials and remaining imbalances are in [strength review](reports/balance-tier-1-strength-review.md). Royal Cleanup and Heavy Harvest retain their prior strength. No tuning of the other heroes or bot decision policy in this pass; full-kit/human follow-up remains necessary.


Target rise/retreat animations now adapt to actual lifetime: shorter windows retain key start/end poses while omitting selected middle frames; increasing lifetime automatically restores the complete eight-frame sequences. Assets are preserved. The lifetime floor remains in `src/assets/config/game.yaml` (`pacing.minLifetimeMs`); that renderer-only step left pacing unchanged; the shared fast settings are now applied as described below.


Shared fast pacing is now active: moles, rabbits and stars use the same lifetime curve (2200→600 ms base over 60 seconds, 500 ms floor), including adaptive rise/retreat inside the hit window. At tied scores late peaks are about 0.53 s and calm endpoints 0.65 s. Spell settings and AI reaction/action/accuracy values are unchanged. [Spell-free reaction measurements](reports/reaction-pacing.md) cover 100 two-minute sessions per hero/difficulty, with fixed-length diagnostic rounds so late phases are sampled. Normal games retain score-difference victory. Easy misses every post-ramp target in this baseline; Medium/Hard late-peak mole capture is 21.4%/86.4%. Earlier win matrices are historical until the later casting/spell balance pass.


Casting-delay trials are available with `pnpm balance:roster --tier=1 --casting=opportunity --cast-profile=baseline|fast|scaled --seeds=100 --seed=20261119 --report=...` (choose one profile and report name). Baseline keeps 200 ms visibility/300–700 ms shared delay; fast tests 100 ms/200–400 ms; scaled multiplies only that faster decision delay by Easy3/Medium2/Hard1. Scaled is now the isolated one-star default; explicit baseline/fast remain historical controls. Ordinary full-kit casting is unchanged. [Trial comparison](reports/casting-delay-review.md) preserves all 22,500 matches and matrices/cancellation/theft findings.


Adopted one-star casting baseline: `pnpm balance:roster --tier=1 --seeds=100 --seed=20261119` now selects scaled automatically. [Current pooled/per-level matrices and current-spell reminder](reports/balance-tier-1.md) use unchanged spell powers, pacing and hit reaction settings. Test adoption is documented in [baseline review](reports/balance-tier-1-adopted-review.md); ordinary four-slot AI retains its separate strategy until that phase is addressed.


Clean Sweep now matches the intended continuous-column rule: immediate hit, then everything that appears in that column for 3 active seconds, with normal rewards/rabbit penalties/armor hits. There is no separate sweep interval to tune. Earlier duration-only trials kept Ominous Bud at one mark and tested instant Tending extensions; their results are historical. Current Ominous Bud marks three moles within 8 s (+6 missed-mark penalty); Gentle Tending gives +0.5 s once to current/arriving targets during a 4.5 s aura. [Historical duration-only trial review](reports/continuous-sweep-duration-review.md) preserves 37,500 matches and the current pooled/per-level matrices. Royal Cleanup and other powers were held fixed.


Current owner/spell tuning: **Duskmantle — Ominous Bud** marks three enemy moles within 8 s, each missed mark adding 6 penalty points. **Sprig — Gentle Tending** adds 0.5 s once to every current/arriving target for 4.5 active seconds, including rabbits and stars; recasts do not stack a second bonus on the same target. A procedural board aura shows its active window. [Controlled mark/aura comparison and current spells with owners](reports/bud-penalty-aura-review.md) preserves 37,500 matches and current pooled/per-level matrices. Other powers, pacing and AI timing remain fixed.


Historical tuning (D124; superseded by D125): **Captain Bramble — Tin Caps** affects three moles/one extra hit within 3 s (was one); **Duskmantle — Ominous Bud** marks three within 8 s with +8 miss penalty (was +6), 16 total per missed marked mole; **Sprig — Gentle Tending** applies +0.5 s once per current/arriving target for 6 s (was 4.5 s). Borrowed Spark retains its 650 ms hostile warning after cast freeze, stealing the enemy meter at resolution. [Current comparison and spell reminders](reports/three-mole-penalty-tending-review.md); [pooled and per-level matrices](reports/balance-tier-1.md). Prior tuning sections are historical.


Current D125 tuning: **Sprig — Gentle Tending** grants +**0.75 s once per current/arriving target**, for **6 s** (was +0.5 s/6 s). Other spells unchanged. Borrowed Spark remains live cap4/all enemy stars with 650 ms warning; cap3 was tested separately, not adopted. [Current matrices, spell reminders, coverage and normal-meter theft experiment](reports/tending750-review.md).


Historical D126 tuning (spell powers retained; warning superseded by D130): **Captain Bramble — Tin Caps** affects **the next three moles to appear, no duration, one extra hit each** (previously current/future within 3 s). Existing visible targets are unaffected. Pending charges persist within a round, recast refreshes to three, cleanse/reset clears them. Armor remains until used/target disappears/cleansed; Heavy Harvest unchanged. Protocol12 carries the new fields. [Current matrices and spell reminders](reports/tin-next-review.md).


Two-star baseline is now recorded without changing accepted one-star tuning or spell powers: [pooled/per-level matrices, spell durations and strategy limitations](reports/balance-tier-2-review.md). 7,500 real-simulation games; tier2 still uses immediate full-meter casting. Violet Veil already adds 200 ms bot reaction while dimming sprites; Helping Tines uses normal rabbit penalties. These results are a baseline for the next discussion, not adopted strength changes.


Current D129/D130 rules: **no hostile warning on any spell**; effects apply at cast start and the shared animation freezes gameplay. Existing wards still block. **Mushroom Guard and Bramble Brace** both block **two mistakes with no expiry**, remaining at tier2. Tier2 isolated bots now use useful-opportunity/random-delay casting; no full-kit policy/tier swap adopted. Protocol13 carries permanent guard state. [Current two-star matrices, spells and comparisons](reports/tier2-guard-policy-review.md); [one-star timing audit](reports/tier1-no-warning-review.md). Historical 650 ms references above are superseded.


Current D131 loadout: **Champignon:1★ Mushroom Guard /2★ Clean Sweep; Bramble:1★ Bramble Brace /2★ Tin Caps.** Both guards block two mistakes without expiry; Sweep remains3 s and Tin Caps remains next three future moles/no duration. Effects and AI conditions follow actual new costs; zero warnings persist. [Current swap results](reports/tier-swap-review.md). Helping Tines’ duration/cadence change is pending clarification of “10**8s**”; current6.5 s/250 ms behavior is unchanged for now.


Current D133 **Helping Tines**:2 stars, **immediate busiest-column hit plus continuous arrivals for10 active seconds**, normal rewards/rabbit penalties, one armor strike per tick. It replaces delayed250 ms pulses over6.5 s; the prior clarification is resolved. Column fixed at cast; pause/cast freezes; no warning. Garden Clockwork/Royal Cleanup keep their old timing. [Current two-star matrices and comparison](reports/tines10-review.md).


D134: tier2 tuning accepted under the no-universal-loser criterion; tier3 baseline now uses the established opportunity/scaled-delay diagnostics, with immediate controls. Powers unchanged. [Three-star matrices, durations and counter-spell coverage limits](reports/tier3-baseline-review.md) preserve15,000 games; wards/cleanse require mixed-tier/full-kit testing because only theft is hostile at tier3. Normal AI strategy remains unchanged.


Four-star baseline (D135): powers unchanged; all isolated tiers now use opportunity/scaled-delay casting with immediate controls available. [Matrices, spell durations and exposure findings](reports/tier4-baseline-review.md) preserve15,000 games. Easy’s low four-star casting coverage and earlier-tier counter limitations must be considered before full-kit/human balance conclusions.


Current D138 Andromoss:1★ rabbits every850 ms/8 s;2★85% lifetime for newly appearing enemy moles/8 s;3★all enemy stars up to capacity/instant;4★pure rabbits every650 ms plus the same mole shortening/8 s. No warnings; no extra reward-bearing4★ moles. Live shortened targets can be cleansed without resurrection; adaptive animation phases remain complete below the natural lifetime floor. [Current kit, versus matrices and fixed-opponent comparison](reports/andromoss-kit-review.md) preserve49,500 games, plus a full-kit snapshot. Per-player selected-tier diagnostics are local-only; real play retains four-star capacity. Protocol16 synchronizes new rush fields. All other heroes’ powers remain unchanged.
