# Andromoss against fixed opponent spells

12000 actual-simulation games,100 paired seeds,200 games/cell/difficulty. Every opponent uses only4★ and keeps that meter capacity across all Andromoss rows. Andromoss uses only the row’s selected tier/capacity. Same seeds/side swaps/hit settings/scaled opportunity delays. Revision39fce99 +working changes; config11554567b230; simulation629810c0772b8b08.

Rows are spell costs, columns fixed enemy abilities, **not a symmetric character matrix**. Percentages are Andromoss wins; pooled by completed counts. 🟩>60%, 🟨40–60%, 🟥<40%; * means spread>20 points or observed favored-side flip.

| Andromoss vs → | Sir Champignon 4★ | Andromoss 4★ | Captain Bramble 4★ | Duskmantle 4★ | Sprig 4★ |
|---|---:|---:|---:|---:|---:|
| 1★ | 🟩61.7% | 🟨59.7% | 🟨45.7%* | 🟩64.3% | 🟩76.2%* |
| 2★ | 🟨40.5% | 🟨50.7%* | 🟥37.3%* | 🟨56.2% | 🟨49.3%* |
| 3★ | 🟨47.7% | 🟨49.8%* | 🟨48.8% | 🟨49.2% | 🟨48.8% |
| 4★ | 🟨43.5% | 🟨50.0% | 🟥36.3%* | 🟨54.8% | 🟩60.2%* |

## easy

| Andromoss vs → | Sir Champignon 4★ | Andromoss 4★ | Captain Bramble 4★ | Duskmantle 4★ | Sprig 4★ |
|---|---:|---:|---:|---:|---:|
| 1★ | 🟩70.0% | 🟩69.5% | 🟩71.0% | 🟩70.5% | 🟩66.0% |
| 2★ | 🟨47.0% | 🟨53.5% | 🟨53.5% | 🟨56.5% | 🟨49.0% |
| 3★ | 🟨48.5% | 🟨50.0% | 🟨50.0% | 🟨49.0% | 🟨49.0% |
| 4★ | 🟨47.5% | 🟨50.0% | 🟨52.5% | 🟨53.5% | 🟨45.0% |

## medium

| Andromoss vs → | Sir Champignon 4★ | Andromoss 4★ | Captain Bramble 4★ | Duskmantle 4★ | Sprig 4★ |
|---|---:|---:|---:|---:|---:|
| 1★ | 🟨58.0% | 🟨56.0% | 🟨47.5% | 🟩68.5% | 🟩70.5% |
| 2★ | 🟨45.5% | 🟨53.5% | 🟨42.0% | 🟩62.0% | 🟨46.5% |
| 3★ | 🟨46.5% | 🟨48.0% | 🟨47.5% | 🟨48.5% | 🟨48.5% |
| 4★ | 🟥39.5% | 🟨50.0% | 🟥35.0% | 🟨55.5% | 🟨59.0% |

## hard

| Andromoss vs → | Sir Champignon 4★ | Andromoss 4★ | Captain Bramble 4★ | Duskmantle 4★ | Sprig 4★ |
|---|---:|---:|---:|---:|---:|
| 1★ | 🟨57.0% | 🟨53.5% | 🟥18.5% | 🟨54.0% | 🟩92.0% |
| 2★ | 🟥29.0% | 🟨45.0% | 🟥16.5% | 🟨50.0% | 🟨52.5% |
| 3★ | 🟨48.0% | 🟨51.5% | 🟨49.0% | 🟨50.0% | 🟨49.0% |
| 4★ | 🟨43.5% | 🟨50.0% | 🟥21.5% | 🟨55.5% | 🟩76.5% |

## Difficulty flags

- 1★ vs Captain Bramble: easy 71.0%, medium 47.5%, hard 18.5%; spread52.5 points; observed favored-side flip.
- 1★ vs Sprig: easy 66.0%, medium 70.5%, hard 92.0%; spread26.0 points.
- 2★ vs Andromoss: easy 53.5%, medium 53.5%, hard 45.0%; spread8.5 points; observed favored-side flip.
- 2★ vs Captain Bramble: easy 53.5%, medium 42.0%, hard 16.5%; spread37.0 points; observed favored-side flip.
- 2★ vs Sprig: easy 49.0%, medium 46.5%, hard 52.5%; spread6.0 points; observed favored-side flip.
- 3★ vs Andromoss: easy 50.0%, medium 48.0%, hard 51.5%; spread3.5 points; observed favored-side flip.
- 4★ vs Captain Bramble: easy 52.5%, medium 35.0%, hard 21.5%; spread31.0 points; observed favored-side flip.
- 4★ vs Sprig: easy 45.0%, medium 59.0%, hard 76.5%; spread31.5 points; observed favored-side flip.

No unfinished games are invented as wins. Identical4vs4 Andromoss paired mirrors must be50%, including when capped pairs are excluded. Normal play has a four-slot meter and can change spell as charge grows; here the row fixes its cap. In particular3★ theft can remove four enemy stars but receive only three, unlike normal play’s capacity4. These tests compare selected-spell builds against constant opposition, not optimal full-kit choices or equal resource-efficiency/per-cast value. Human playtesting remains necessary.

Reproduce: `pnpm balance:andromoss --seeds=100 --seed=20261119 --enemy-tier=4`.
