# Andromoss against fixed opponent spells

12000 actual-simulation games,100 paired seeds,200 games/cell/difficulty. Every opponent uses only4★ and keeps that meter capacity across all Andromoss rows. Andromoss uses only the row’s selected tier/capacity. Same seeds/side swaps/hit settings/scaled opportunity delays. Revisione9faf67 +working changes; config26bdb9b0a7e5; simulationf5fce78d977f08ab.

Rows are spell costs, columns fixed enemy abilities, **not a symmetric character matrix**. Percentages are Andromoss wins; pooled by completed counts. 🟩>60%, 🟨40–60%, 🟥<40%; * means spread>20 points or observed favored-side flip.

| Andromoss vs → | Sir Champignon 4★ | Andromoss 4★ | Captain Bramble 4★ | Duskmantle 4★ | Sprig 4★ |
|---|---:|---:|---:|---:|---:|
| 1★ | 🟩65.2% | 🟨57.8% | 🟨46.5%* | 🟩63.2% | 🟩70.5% |
| 2★ | 🟨50.7%* | 🟨52.0%* | 🟨40.0%* | 🟨57.0% | 🟨54.0% |
| 3★ | 🟨48.7% | 🟨49.5% | 🟨48.2% | 🟨49.7%* | 🟨48.3% |
| 4★ | 🟨55.0%* | 🟨50.0% | 🟥38.8%* | 🟨53.7% | 🟨58.7%* |

## easy

| Andromoss vs → | Sir Champignon 4★ | Andromoss 4★ | Captain Bramble 4★ | Duskmantle 4★ | Sprig 4★ |
|---|---:|---:|---:|---:|---:|
| 1★ | 🟩65.5% | 🟩64.5% | 🟩72.0% | 🟩69.0% | 🟩69.0% |
| 2★ | 🟨49.0% | 🟨51.5% | 🟨54.5% | 🟨55.5% | 🟨54.0% |
| 3★ | 🟨48.5% | 🟨50.0% | 🟨50.0% | 🟨50.0% | 🟨49.0% |
| 4★ | 🟨47.0% | 🟨50.0% | 🟨52.0% | 🟨52.5% | 🟨48.5% |

## medium

| Andromoss vs → | Sir Champignon 4★ | Andromoss 4★ | Captain Bramble 4★ | Duskmantle 4★ | Sprig 4★ |
|---|---:|---:|---:|---:|---:|
| 1★ | 🟩60.5% | 🟨55.0% | 🟨42.0% | 🟩65.0% | 🟩66.0% |
| 2★ | 🟨55.0% | 🟨55.0% | 🟨43.5% | 🟩63.0% | 🟨57.0% |
| 3★ | 🟨48.5% | 🟨49.0% | 🟨46.0% | 🟨48.5% | 🟨47.0% |
| 4★ | 🟨56.0% | 🟨50.0% | 🟨41.5% | 🟨57.0% | 🟩61.0% |

## hard

| Andromoss vs → | Sir Champignon 4★ | Andromoss 4★ | Captain Bramble 4★ | Duskmantle 4★ | Sprig 4★ |
|---|---:|---:|---:|---:|---:|
| 1★ | 🟩69.5% | 🟨54.0% | 🟥25.5% | 🟨55.5% | 🟩76.5% |
| 2★ | 🟨48.0% | 🟨49.5% | 🟥22.0% | 🟨52.5% | 🟨51.0% |
| 3★ | 🟨49.0% | 🟨49.5% | 🟨48.5% | 🟨50.5% | 🟨49.0% |
| 4★ | 🟩62.0% | 🟨50.0% | 🟥23.0% | 🟨51.5% | 🟩66.5% |

## Difficulty flags

- 1★ vs Captain Bramble: easy 72.0%, medium 42.0%, hard 25.5%; spread46.5 points; observed favored-side flip.
- 2★ vs Sir Champignon: easy 49.0%, medium 55.0%, hard 48.0%; spread7.0 points; observed favored-side flip.
- 2★ vs Andromoss: easy 51.5%, medium 55.0%, hard 49.5%; spread5.5 points; observed favored-side flip.
- 2★ vs Captain Bramble: easy 54.5%, medium 43.5%, hard 22.0%; spread32.5 points; observed favored-side flip.
- 3★ vs Duskmantle: easy 50.0%, medium 48.5%, hard 50.5%; spread2.0 points; observed favored-side flip.
- 4★ vs Sir Champignon: easy 47.0%, medium 56.0%, hard 62.0%; spread15.0 points; observed favored-side flip.
- 4★ vs Captain Bramble: easy 52.0%, medium 41.5%, hard 23.0%; spread29.0 points; observed favored-side flip.
- 4★ vs Sprig: easy 48.5%, medium 61.0%, hard 66.5%; spread18.0 points; observed favored-side flip.

No unfinished games are invented as wins. Identical4vs4 Andromoss paired mirrors must be50%, including when capped pairs are excluded. Normal play has a four-slot meter and can change spell as charge grows; here the row fixes its cap. In particular3★ theft can remove four enemy stars but receive only three, unlike normal play’s capacity4. These tests compare selected-spell builds against constant opposition, not optimal full-kit choices or equal resource-efficiency/per-cast value. Human playtesting remains necessary.

Reproduce: `pnpm balance:andromoss --seeds=100 --seed=20261119 --enemy-tier=4`.
