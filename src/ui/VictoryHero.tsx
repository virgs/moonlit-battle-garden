import { useEffect, useState } from 'react';
import { assetUrl } from '../assets/url';
import { characters } from '../game/config';
import type { CharacterId } from '../game/types';
import { heroStill, presentation, validSheet } from '../presentation/config';
import { inspectImage } from '../presentation/images';

/** Play actual sprite frames; a failed asset keeps a still hero portrait. */
export function VictoryHero({ character, loop = true }: { character: CharacterId; loop?: boolean }) {
  const clip = presentation[character].victory;
  const [ready, setReady] = useState(false);
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    let alive = true;
    void inspectImage(clip.src).then(image => { if (alive) setReady(!!image && validSheet(clip, image.width, image.height)); });
    return () => { alive = false; };
  }, [clip]);
  useEffect(() => {
    if (!ready || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setFrame(value => loop ? (value + 1) % clip.frameCount : Math.min(clip.frameCount-1,value+1)), 1000 / clip.fps);
    return () => clearInterval(timer);
  }, [ready, clip, loop]);
  const label = `${characters[character].name} celebrates victory`;
  return ready ? <svg className="victory-hero victory-sheet" role="img" aria-label={label} data-frame={frame} viewBox={`0 0 ${clip.frameWidth} ${clip.frameHeight}`} overflow="hidden">
    <svg width={clip.frameWidth} height={clip.frameHeight} viewBox={`0 0 ${clip.frameWidth} ${clip.frameHeight}`} overflow="hidden"><image href={assetUrl(clip.src)} width={clip.columns * clip.frameWidth} height={Math.ceil(clip.frameCount / clip.columns) * clip.frameHeight} x={-(frame % clip.columns) * clip.frameWidth} y={-Math.floor(frame / clip.columns) * clip.frameHeight} />
    </svg>
  </svg> : <img className="victory-hero" src={assetUrl(heroStill(character))} alt={label} />;
}
