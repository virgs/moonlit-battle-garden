import { assetUrl } from '../assets/url';
import { characters } from '../game/config';
import type { CharacterId } from '../game/types';
import { heroStill, presentation } from '../presentation/config';
import { useHeroPlayback } from './useHeroPlayback';

/** Play actual sprite frames; a failed asset keeps a still hero portrait. */
export function VictoryHero({ character, loop = true }: { character: CharacterId; loop?: boolean }) {
  const clip = presentation[character].victory;
  const {ready,frame,reduced}=useHeroPlayback(clip,loop);
  const label = `${characters[character].name} celebrates victory`;
  return ready ? <svg className="victory-hero victory-sheet" role="img" aria-label={label} data-frame={frame} data-fps={clip.fps} data-reduced-motion={reduced} viewBox={`0 0 ${clip.frameWidth} ${clip.frameHeight}`} overflow="hidden">
    <svg width={clip.frameWidth} height={clip.frameHeight} viewBox={`0 0 ${clip.frameWidth} ${clip.frameHeight}`} overflow="hidden"><image href={assetUrl(clip.src)} width={clip.columns * clip.frameWidth} height={Math.ceil(clip.frameCount / clip.columns) * clip.frameHeight} x={-(frame % clip.columns) * clip.frameWidth} y={-Math.floor(frame / clip.columns) * clip.frameHeight} />
    </svg>
  </svg> : <img className="victory-hero" src={assetUrl(heroStill(character))} alt={label} />;
}
