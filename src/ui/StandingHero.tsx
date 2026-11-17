import { useEffect, useState } from 'react';
import { assetUrl } from '../assets/url';
import type { CharacterId } from '../game/types';
import { presentation, validSheet } from '../presentation/config';
import { inspectImage } from '../presentation/images';

/** Selection's idle preview; recovered still art is its temporary pose. */
export function StandingHero({ character }: { character: CharacterId }) {
  const clip = presentation[character].standing;
  const [ready, setReady] = useState(false), [frame, setFrame] = useState(0);
  useEffect(() => {
    let alive = true;
    void inspectImage(clip.src).then(image => { if (alive) setReady(!!image && validSheet(clip, image.width, image.height)); });
    return () => { alive = false; };
  }, [clip]);
  useEffect(() => {
    if (!ready || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setFrame(value => (value + 1) % clip.frameCount), 1000 / clip.fps);
    return () => clearInterval(timer);
  }, [ready, clip]);
  return ready ? <svg className="standing-hero" data-asset="ready" viewBox={`0 0 ${clip.frameWidth} ${clip.frameHeight}`} data-frame={frame} aria-hidden="true"><svg width={clip.frameWidth} height={clip.frameHeight} viewBox={`0 0 ${clip.frameWidth} ${clip.frameHeight}`} overflow="hidden"><image href={assetUrl(clip.src)} width={clip.columns*clip.frameWidth} height={Math.ceil(clip.frameCount/clip.columns)*clip.frameHeight} x={-(frame%clip.columns)*clip.frameWidth} y={-Math.floor(frame/clip.columns)*clip.frameHeight} /></svg></svg>
    : <img className="standing-hero" data-asset="fallback" src={assetUrl(`/assets/legacy/${character}-hero.png`)} alt="" />;
}
