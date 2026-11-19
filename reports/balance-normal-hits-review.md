# Normal-hit correction and three-second spell windows

Sweep previously erased moles/rabbits without rewards and preserved stars. That was an implementation assumption, corrected by D105. Sweep and Sprig automation now share normal hit rules: mole +10, rabbit −12 unless guarded, star +25/+1 charge capped at four. Armor needs repeated strikes. Sweep hits immediately then every 250 ms for three active seconds.

Bramble armor lasts three seconds, with one/two extra hits at tiers 1/4. The provisional nerf limits it to two/four affected moles per cast, including new arrivals. Other lasting spell windows stay unchanged and all exceed the three-second minimum. No new art.

## Sampling and limits

Two runs of 7,500 best-of-three matches each: 100 seeds per pairing/AI level, both sides for distinct pairs (200 matches per cell), 100 mirrors per hero/level. Seed 20261118; zero capped matches in both runs. The selected run uses the default config and retains full per-match data in balance-roster.json. Trial summaries, reproduction commands and hashes are retained in normal-wide and normal-armor2-4 reports.

The old one-second sweep/two-second armor reference is preserved in power-reference.json (raw data in Git commit 100af6f). It uses different hit rules and bot decisions, so its changes cannot be attributed to duration alone. The new uncapped-vs-limited comparison holds normal hit rules, bot policy and three-second windows fixed; only armor quotas change.

## Current versus matrices

### Easy

Row hero win rate against column hero; Easy AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩98.5% | 🟩97.5% | 🟩99.0% | 🟩97.0% |
| Andromoss | 🟥1.5% | — | 🟥33.5% | 🟨47.0% | 🟥37.5% |
| Captain Bramble | 🟥2.5% | 🟩66.5% | — | 🟩63.0% | 🟨45.0% |
| Duskmantle | 🟥1.0% | 🟨53.0% | 🟥37.0% | — | 🟨42.0% |
| Sprig | 🟥3.0% | 🟩62.5% | 🟨55.0% | 🟨58.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Medium

Row hero win rate against column hero; Medium AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩79.0% | 🟩86.0% | 🟩90.0% | 🟩88.5% |
| Andromoss | 🟥21.0% | — | 🟥33.5% | 🟨44.0% | 🟨46.0% |
| Captain Bramble | 🟥14.0% | 🟩66.5% | — | 🟩64.0% | 🟨54.0% |
| Duskmantle | 🟥10.0% | 🟨56.0% | 🟥36.0% | — | 🟨53.0% |
| Sprig | 🟥11.5% | 🟨54.0% | 🟨46.0% | 🟨47.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.

### Hard

Row hero win rate against column hero; Hard AI only.

🟩 >60% · 🟨 40–60% · 🟥 <40%.

| Against → | Sir Champignon | Andromoss | Captain Bramble | Duskmantle | Sprig |
|---|---:|---:|---:|---:|---:|
| Sir Champignon | — | 🟩75.0% | 🟩71.0% | 🟩75.0% | 🟩81.5% |
| Andromoss | 🟥25.0% | — | 🟥30.5% | 🟥36.0% | 🟨47.5% |
| Captain Bramble | 🟥29.0% | 🟩69.5% | — | 🟩65.5% | 🟩68.5% |
| Duskmantle | 🟥25.0% | 🟩64.0% | 🟥34.5% | — | 🟩66.0% |
| Sprig | 🟥18.5% | 🟨52.5% | 🟥31.5% | 🟥34.0% | — |

Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.


## What changed with the armor quota

Each cell below is **Bramble’s win percentage, uncapped → limited**. This keeps AI levels and opponents visible. The uncapped trial uses a quota of 99, beyond the number of targets a three-second window can reach.

| AI | vs Champignon | vs Andromoss | vs Duskmantle | vs Sprig |
|---|---:|---:|---:|---:|
| Easy | 3.0% → 2.5% | 81.5% → 66.5% | 72.0% → 63.0% | 53.5% → 45.0% |
| Medium | 15.0% → 14.0% | 71.0% → 66.5% | 74.0% → 64.0% | 64.5% → 54.0% |
| Hard | 33.0% → 29.0% | 76.0% → 69.5% | 72.5% → 65.5% | 74.5% → 68.5% |

## Findings and next tuning decision

- The target quota reduces Bramble’s advantage without a sub-three-second effect. Keep two/four as a provisional starting point; a more severe one/three trial was not pursued because Champignon is now clearly overpowered in these diagnostics.
- Champignon wins 97–99% of Easy matchups, and remains favored against every opponent on Medium/Hard. This is not balanced. Normal hit scoring remains intact; consider a target/column limit or a higher star cost before another tuning run, with user review.
- Easy Champignon never casts tiers 3/4; Medium/Hard cover all tiers. Sweep harvest/emergency decisions can bias results toward tier 1. Higher sample count does not fix missing strategy coverage. Human tests and alternative policy checks remain necessary.
- Three separate matrices are the primary view. Do not pool difficulty levels to hide flips or use aggregate hero win rates as the main comparison.

## Verification

126 simulation/unit tests, production build, and 12 desktop/mobile browser cases passed. Coverage includes normal sweep rewards/penalties/stars, guarded rabbits, charge cap, multi-hit armor, three-second lifetime/new arrivals, freeze/reset, win resolution after casting, shared cast assets, real local WebRTC input/recovery and armor synchronization. Browser screenshots are diagnostic outputs, not committed assets.
