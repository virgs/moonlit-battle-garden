import { assetUrl } from '../assets/url';
import type { CharacterId } from '../game/types';
import { heroStill, presentation } from '../presentation/config';
import { useHeroPlayback } from './useHeroPlayback';

/** Selection idle preview with elapsed-time sprite playback and a still fallback. */
export function StandingHero({ character }: { character: CharacterId }) {
  const clip = presentation[character].standing;
  const {ready,frame,reduced}=useHeroPlayback(clip);
  return ready ? <svg className="standing-hero" data-asset="ready" viewBox={`0 0 ${clip.frameWidth} ${clip.frameHeight}`} data-frame={frame} data-fps={clip.fps} data-reduced-motion={reduced} aria-hidden="true"><svg width={clip.frameWidth} height={clip.frameHeight} viewBox={`0 0 ${clip.frameWidth} ${clip.frameHeight}`} overflow="hidden"><image href={assetUrl(clip.src)} width={clip.columns*clip.frameWidth} height={Math.ceil(clip.frameCount/clip.columns)*clip.frameHeight} x={-(frame%clip.columns)*clip.frameWidth} y={-Math.floor(frame/clip.columns)*clip.frameHeight} /></svg></svg>
    : <img className="standing-hero" data-asset="fallback" src={assetUrl(heroStill(character))} alt="" />;
}
