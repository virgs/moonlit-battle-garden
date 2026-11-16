import { assetUrl } from '../assets/url';
import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Snapshot } from '../game/Session';
import type { GardenLayout } from '../render/layout';
import { presentation, clipDuration, clipFrame, validSheet } from '../presentation/config';
import { inspectImage } from '../presentation/images';
import './presentation.css';

export function CastOverlay({ snapshot, garden }: { snapshot: Snapshot; garden: GardenLayout }) {
  const character = snapshot.state.players[garden.id].character;
  const [ready, setReady] = useState<Record<number, boolean>>({});
  useEffect(() => {
    let alive = true;
    Object.entries(presentation[character].casts).forEach(([tier, clip]) => {
      void inspectImage(clip.src).then(image => {
        if (alive) setReady(previous => ({ ...previous, [tier]: image !== null && validSheet(clip, image.width, image.height) }));
      });
    });
    return () => { alive = false; };
  }, [character]);
  const event = [...snapshot.events].reverse().find(item => item.kind === 'cast' && item.player === garden.id && item.round === snapshot.state.round);
  if (!event?.tier || snapshot.state.phase !== 'playing') return null;
  const clip = presentation[character].casts[event.tier];
  const elapsed = snapshot.state.time - event.time;
  if (elapsed < 0 || elapsed >= clipDuration(clip)) return null;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const frame = clipFrame(clip, elapsed, reduced);
  const artReady = ready[event.tier];
  if (!artReady) return null;
  const style = { left: garden.stars.x, top: garden.stars.y, width: garden.stars.width, height: garden.stars.height } as CSSProperties;
  return <div key={event.id} className={`cast-banner ${snapshot.state.paused ? 'paused' : ''}`} style={style} data-character={character} data-tier={event.tier} data-frame={frame} data-asset="ready" aria-hidden="true">
    <svg className="cast-art" viewBox={`0 0 ${clip.frameWidth} ${clip.frameHeight}`} overflow="hidden" aria-hidden="true">
      <image href={assetUrl(clip.src)} width={clip.columns * clip.frameWidth} height={Math.ceil(clip.frameCount / clip.columns) * clip.frameHeight} x={-(frame % clip.columns) * clip.frameWidth} y={-Math.floor(frame / clip.columns) * clip.frameHeight} />
    </svg>
  </div>;
}
