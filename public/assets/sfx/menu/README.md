# Menu action sounds

Four unmodified WAVs from Kenney **Interface Sounds 1.0**, licensed CC0. Source: https://kenney.nl/assets/interface-sounds ; download mirror: https://github.com/Calinou/kenney-interface-sounds . Original license text is in LICENSE.txt; sources.json records filenames, durations and SHA-256 hashes. No generation or audio editing.

| Game cue | Original file | Purpose |
|---|---|---|
| move | select_001.wav | Mode/hero/difficulty and pause-action navigation |
| confirm | confirmation_001.wav | Entry, selection, start, unmute and valid online actions |
| back | back_001.wav | Back, change, cancel, resume and quit |
| error | error_001.wav | Invalid invites or failed room/copy actions |

Muted actions never start/unlock audio or replay later. Pure hover, rendering, text entry and remote lobby changes are silent. These cues reuse the game's short-effect player and shared decoded-buffer cache; they do not alter game sounds, rules or randomness.
