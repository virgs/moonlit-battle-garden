# Online network QA — 2026-11-17

Production diagnostic revision: 179c8cb. The fresh QR phone session passed through its opt-in automatic link.

| Check | Result | Scope |
| --- | --- | --- |
| Public Pages + public PeerJS, Chromium desktop | Passed | Actual RTC data channels; this Mac on both ends |
| Public Pages + public PeerJS, Chromium phone-sized | Passed | Browser emulation, not a physical phone |
| Delayed sends, desktop/mobile-sized | Passed | 150 ms injected before each RTC send, both directions; not OS packet shaping |
| Silent link + heartbeat recovery, desktop/mobile-sized | Passed | Real channel left open, sends discarded until interruption detected; freezes and recovers |
| Hands-free phone-link page, desktop/mobile-sized | Passed | Auto selection/readiness, ordinary hit/cast inputs, actual data-channel closure and reconnection |
| WebKit automation | Unresolved | First public/local run did not establish a usable channel; physical Safari result must be assessed separately |
| Physical phone QR session to Mac | Passed | 20 seconds; 11/10 hits, 1/1 casts; actual channel closure and recovery |

Public Chromium runs covered live hero selection, readiness, target hits/score synchronization, local non-pausing menus, capacity rejection, pre-match/game reconnects, synchronized round transitions, guest next-round input and leaving. Privacy-safe selected-route summaries showed direct host/host UDP, around 1 ms transport RTT on this Mac. That does not establish NAT traversal or TURN reachability.

The installed PeerJS bundle includes STUN and shared TURN entries. No project-managed relay is provisioned. The presence of bundled entries does not prove those relays work on a given network. Physical test route summaries exclude IP addresses, credentials and invite IDs.

No gameplay balance changed. Unit checks: 93 passed; production build and Pages mobile test passed. Public tests are opt-in (`pnpm e2e:online`) and remain independent from normal CI's local signaling. The test menu helper now preserves the website base path.

The first shared diagnostic link was opened on the desktop (confirmed by the user). It passed at 20 seconds with 11/10 hits, 1/1 casts and reconnect recovery, using host/host UDP around 1 ms. This run is explicitly not counted as a physical phone or cross-network result. A fresh invite/QR was generated for the phone.

## Fresh QR phone result

The fresh QR invite completed automatically on the phone after the Wi-Fi-off/cellular instructions. Host/phone recorded 11/10 successful hits and one magic cast each. The guest data channel was deliberately closed at eight seconds and recovered by the next sampled second; both sides met the success criteria at 20 seconds. The Mac selected a direct UDP path with a local host candidate and remote server-reflexive (`srflx`) candidate. Sampled application heartbeat RTT was 27–36 ms (36 ms at completion). No relay candidate was selected for this run. The privacy-safe result is preserved in network-qa-phone.json; no IP addresses, peer IDs or credentials are included.

This establishes that this Mac/phone connection works, including natural target-aware gameplay traffic, magic and recovery. It does not establish universal carrier/NAT compatibility, TURN relay availability, phone touch/audio behavior or background/screen-lock recovery. Phone model/browser/OS were not collected, so this cannot resolve the separate automated WebKit failure.
