# Andromoss against fixed opponent spells

12000 actual-simulation games,100 paired seeds,200 games/cell/difficulty. Every opponent uses only4★ and keeps that meter capacity across all Andromoss rows. Andromoss uses only the row’s selected tier/capacity. Same seeds/side swaps/hit settings/scaled opportunity delays. Revision551e756 +working changes; configd5bd5581763d; simulationcf309d2e10bcd778.

Rows are spell costs, columns fixed enemy abilities, **not a symmetric character matrix**. Percentages are Andromoss wins; pooled by completed counts. 🟩>60%, 🟨40–60%, 🟥<40%; * means spread>20 points or observed favored-side flip.

| Andromoss vs → | Sir Champignon 4★ | Andromoss 4★ | Captain Bramble 4★ | Duskmantle 4★ | Sprig 4★ |
|---|---:|---:|---:|---:|---:|
| 1★ | 🟨54.3%* | 🟨57.8% | 🟨43.2%* | 🟩60.3%* | 🟩73.2%* |
| 2★ | 🟨40.5% | 🟨52.0%* | 🟥37.3%* | 🟨56.2% | 🟨49.3%* |
| 3★ | 🟨47.7% | 🟨49.5% | 🟨48.8% | 🟨49.2% | 🟨48.8% |
| 4★ | 🟨42.8% | 🟨50.0% | 🟥36.8%* | 🟨54.7% | 🟩60.3%* |

## easy

| Andromoss vs → | Sir Champignon 4★ | Andromoss 4★ | Captain Bramble 4★ | Duskmantle 4★ | Sprig 4★ |
|---|---:|---:|---:|---:|---:|
| 1★ | 🟩61.5% | 🟩64.5% | 🟩70.5% | 🟩71.5% | 🟩63.0% |
| 2★ | 🟨47.0% | 🟨51.5% | 🟨53.5% | 🟨56.5% | 🟨49.0% |
| 3★ | 🟨48.5% | 🟨50.0% | 🟨50.0% | 🟨49.0% | 🟨49.0% |
| 4★ | 🟨48.0% | 🟨50.0% | 🟨52.0% | 🟨54.0% | 🟨48.5% |

## medium

| Andromoss vs → | Sir Champignon 4★ | Andromoss 4★ | Captain Bramble 4★ | Duskmantle 4★ | Sprig 4★ |
|---|---:|---:|---:|---:|---:|
| 1★ | 🟨53.5% | 🟨55.0% | 🟥39.0% | 🟩61.0% | 🟩68.0% |
| 2★ | 🟨45.5% | 🟨55.0% | 🟨42.0% | 🟩62.0% | 🟨46.5% |
| 3★ | 🟨46.5% | 🟨49.0% | 🟨47.5% | 🟨48.5% | 🟨48.5% |
| 4★ | 🟨40.5% | 🟨50.0% | 🟥39.0% | 🟨56.5% | 🟨56.5% |

## hard

| Andromoss vs → | Sir Champignon 4★ | Andromoss 4★ | Captain Bramble 4★ | Duskmantle 4★ | Sprig 4★ |
|---|---:|---:|---:|---:|---:|
| 1★ | 🟨48.0% | 🟨54.0% | 🟥20.0% | 🟨48.5% | 🟩88.5% |
| 2★ | 🟥29.0% | 🟨49.5% | 🟥16.5% | 🟨50.0% | 🟨52.5% |
| 3★ | 🟨48.0% | 🟨49.5% | 🟨49.0% | 🟨50.0% | 🟨49.0% |
| 4★ | 🟨40.0% | 🟨50.0% | 🟥19.5% | 🟨53.5% | 🟩76.0% |

## Difficulty flags

- 1★ vs Sir Champignon: easy 61.5%, medium 53.5%, hard 48.0%; spread13.5 points; observed favored-side flip.
- 1★ vs Captain Bramble: easy 70.5%, medium 39.0%, hard 20.0%; spread50.5 points; observed favored-side flip.
- 1★ vs Duskmantle: easy 71.5%, medium 61.0%, hard 48.5%; spread23.0 points; observed favored-side flip.
- 1★ vs Sprig: easy 63.0%, medium 68.0%, hard 88.5%; spread25.5 points.
- 2★ vs Andromoss: easy 51.5%, medium 55.0%, hard 49.5%; spread5.5 points; observed favored-side flip.
- 2★ vs Captain Bramble: easy 53.5%, medium 42.0%, hard 16.5%; spread37.0 points; observed favored-side flip.
- 2★ vs Sprig: easy 49.0%, medium 46.5%, hard 52.5%; spread6.0 points; observed favored-side flip.
- 4★ vs Captain Bramble: easy 52.0%, medium 39.0%, hard 19.5%; spread32.5 points; observed favored-side flip.
- 4★ vs Sprig: easy 48.5%, medium 56.5%, hard 76.0%; spread27.5 points; observed favored-side flip.

No unfinished games are invented as wins. Identical4vs4 Andromoss paired mirrors must be50%, including when capped pairs are excluded. Normal play has a four-slot meter and can change spell as charge grows; here the row fixes its cap. In particular3★ theft can remove four enemy stars but receive only three, unlike normal play’s capacity4. These tests compare selected-spell builds against constant opposition, not optimal full-kit choices or equal resource-efficiency/per-cast value. Human playtesting remains necessary.

Reproduce: `pnpm balance:andromoss --seeds=100 --seed=20261119 --enemy-tier=4`.
