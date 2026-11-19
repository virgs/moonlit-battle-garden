import { assetUrl } from '../assets/url';
import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import type { PlayerId } from '../game/types';
import type { Snapshot } from '../game/Session';
import type { GardenLayout } from '../render/layout';
import { CastStars } from './LegacyRewards';
import { characters, config } from '../game/config';
import { heroStill, presentation, clipFrame, validSheet } from '../presentation/config';
import { inspectImage } from '../presentation/images';
import './presentation.css';

export function CastOverlay({ snapshot, garden, player }: { snapshot: Snapshot; garden: GardenLayout; player: PlayerId }) {
  const character = snapshot.state.players[player].character;
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
  const casting = snapshot.state.casting;
  if (!casting || snapshot.state.phase !== 'playing' || casting.player !== player) return null;
  const clip = presentation[character].casts[casting.tier];
  const elapsed = config.spells.castFreezeMs - casting.remainingMs;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const frame = clipFrame(clip, elapsed, reduced);
  const artReady = ready[casting.tier];
  const style = { left: garden.x, top: garden.y, width: garden.width, height: garden.height } as CSSProperties;
  return <div className={`cast-banner cast-side-${player} ${snapshot.state.paused ? 'paused' : ''}`} style={style} data-character={character} data-tier={casting.tier} data-frame={frame} data-asset={artReady ? 'ready' : 'fallback'} role="status" aria-label={`${characters[character].name} casts ${casting.tier}-star magic`}>
    {artReady ? <svg className="cast-art" viewBox={`0 0 ${clip.frameWidth} ${clip.frameHeight}`} overflow="hidden" aria-hidden="true">
      <image href={assetUrl(clip.src)} width={clip.columns * clip.frameWidth} height={Math.ceil(clip.frameCount / clip.columns) * clip.frameHeight} x={-(frame % clip.columns) * clip.frameWidth} y={-Math.floor(frame / clip.columns) * clip.frameHeight} />
    </svg> : <img aria-hidden="true" className="cast-placeholder" src={assetUrl(heroStill(character))} alt="" />}
    <div className="cast-cost"><CastStars count={casting.tier} time={elapsed} reduced={reduced} /></div>
  </div>;
}
