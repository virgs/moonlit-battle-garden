# Player-hosted online matches

Implemented 2026-11-16 per D25. A dedicated gameplay server is deliberately unnecessary; cheating resistance is not a requirement.

## Connection and hosting

- The creator is network seat 0 and runs the existing Match simulation at 50 ms ticks. The joining player is seat 1 and never advances its own simulation.
- PeerJS Cloud is the default signaling service. WebRTC reliable ordered data channels carry inputs and full snapshots. The `peer` dev dependency is exclusively for local signaling in tests.
- Each player chooses their character before connecting. Share a URL containing the host's peer ID (`?join=...`), or paste the ID/link into the join form. A ready handshake waits for the guest arena before advancing the first countdown.
- Rooms accept only one guest token. Additional browsers are rejected. Wire protocol version and gameplay config/character definitions must match. The protocol version must be bumped when simulation or wire semantics change.
- Both screens render the local player as blue/left. Guest snapshots swap players, winner, pending-spell senders, event identities and result wording. Home selection uses original match options on both devices. Mobile shows only the local board and opponent HUD.

## Input and timing

Host owns targets, scores, stars, spells, clock, outcomes and round changes. The guest sends hit/cast commands for its own seat; the host assigns that seat rather than accepting an arbitrary player ID. Hits include the visible target ID (or null for a genuine empty hit). If the target has disappeared/replaced before receipt, the input is ignored instead of punishing a stale click or hitting a new mole. Standard Match rules validate holes, phase, cooldown, stars and paused state.

Snapshots arrive every simulation tick and after commands, including the recent event history for sound/cast playback. Superseded snapshots are dropped when the RTC send buffer exceeds 64 KiB. Inputs and control messages remain reliable. There is no rollback, prediction or guest clock advancement. High latency therefore affects guest responsiveness and favors the host; human internet playtesting remains necessary. Ping/pong provides round-trip latency feedback once per second.

Either player can pause/resume, including Escape, and either can advance a finished round. Hiding either game tab requests shared pause. Sound/mute remains local. UI and Session prevent acting on the remote board. There is no public matchmaking, spectator mode, account system or anti-cheat.

## Interruption and lifecycle

- An explicit leave sends `bye` and closes resources. The other player sees that the match has ended.
- A closed/errored data channel or 6 seconds without traffic freezes play. The guest attempts reconnection every 2.5 seconds using the same in-memory token. The host reserves the guest seat.
- Recovery has a 30-second grace period. Both browsers retain the match; the host sends current state on rejoin. The game remains paused until a player resumes.
- After the grace period, the connection is closed and the user returns to setup to create another match. Initial join/registration attempts time out after 25 seconds; a registered host can wait indefinitely for an invite to be used.
- Reloading either page loses its in-memory session/token. Host closure/refresh cannot be recovered; there is no host migration. A refreshed guest must start a new match rather than take over the reserved seat.
- Browser background throttling/mobile suspension can interrupt the connection. Shared pause helps but does not replace physical-device testing.

## Deployment configuration

Deploy the Vite output as a static HTTPS site. No game server process is needed. Local/AI play does not initialize PeerJS or depend on signaling.

Default PeerJS signaling is an external service, so availability is outside this project's control. `VITE_PEER_HOST`, `VITE_PEER_PORT`, `VITE_PEER_PATH`, `VITE_PEER_SECURE` override the service. `VITE_ICE_SERVERS` overrides the public WebRTC ICE configuration. See `.env.example` for syntax.

A signaling server introduces browsers; STUN helps discover possible routes. Restrictive NAT/firewalls may require TURN to relay actual traffic. No managed TURN service or credentials are currently provisioned, so direct connections can fail on those networks. This is a known delivery gap, not a guarantee of universal connectivity. Browser environment variables are compiled into public assets. Use short-lived credentials from a managed service/credential endpoint rather than embedding a permanent secret; that provisioning is not implemented here.

## Verification

Unit tests cover host-only clock progression/readiness, seat/event/winner remapping, stale target rejection, guest spells, synchronized pause/round changes and reconnect freezing. Browser tests use actual PeerJS plus real RTC data channels between independent contexts through a local-only PeerServer. Desktop and mobile-sized cases cover invites, independent characters, synchronized hits/scores, opponent controls, capacity rejection, forced channel closure/recovery, round winners/advancement and leaving. The regular local/AI/presentation checks remain in the suite.

A production-build smoke test also registered a host through default public PeerJS Cloud signaling and connected a real guest, with no JavaScript errors. Both clients ran on this machine; this verifies the configured public service path, not different-network reachability.

Still required: actual devices on different residential/mobile/corporate networks; relay provisioning if supported networks need it; human assessment of guest latency. Local signaling tests do not establish public-service or cross-network reliability.
