import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { assetUrl } from '../assets/url';
import { legacyRewardFrame, legacyStars, legacyTrophy } from '../render/legacyPresentation';
import './rewards.css';

/** Use the intact original column, or recompose its slots for narrow portrait layouts. */
export function StarMeter({ count, time, horizontal = false }: { count: number; time: number; horizontal?: boolean }) {
  const transition = useRef({ count, since: time });
  if (transition.current.count !== count) transition.current = { count, since: time };
  const frame = legacyRewardFrame(time - transition.current.since, window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  // Original sheet: largest slot at the top, first collected star at the bottom.
  const slots = [{ y: 157, height: 31 }, { y: 117, height: 39 }, { y: 72, height: 44 }, { y: 15, height: 54 }];
  return <svg className={`stars sprite-stars ${horizontal ? 'horizontal-stars' : 'vertical-stars'}`} viewBox={horizontal ? '0 0 240 60' : '0 0 60 200'} role="img" aria-label={`${count} stars`} data-charge={count} data-frame={frame}>
    {!horizontal && <image href={assetUrl('/assets/legacy/star-meter.png')} width={420} height={1000} x={-frame * 60} y={-count * 200} />}
    {horizontal && slots.map((slot, index) => <svg key={index} x={index * 60} y={(60 - slot.height) / 2} width="60" height={slot.height} viewBox={`0 ${slot.y} 60 ${slot.height}`} overflow="hidden" aria-hidden="true">
      <image href={assetUrl('/assets/legacy/star-meter.png')} width={legacyStars.width * legacyStars.columns} height={legacyStars.height * legacyStars.rows} x={-frame * legacyStars.width} y={-count * legacyStars.height} />
    </svg>)}
  </svg>;
}

export function Trophy({ wins, paused = false, celebration = false, mirror = false, style }: { wins: number; paused?: boolean; celebration?: boolean; mirror?: boolean; style?: CSSProperties }) {
  const [elapsed, setElapsed] = useState(0);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  useEffect(() => {
    if (paused || reduced || !wins) return;
    const timer = setInterval(() => setElapsed(value => value + 1000 / legacyTrophy.fps), 1000 / legacyTrophy.fps);
    return () => clearInterval(timer);
  }, [paused, reduced, wins]);
  const frame = legacyRewardFrame(elapsed, reduced);
  return <svg className={`trophy-art ${celebration ? 'celebration-trophy' : ''} ${mirror ? 'mirror-trophy' : ''} ${paused ? 'paused' : ''}`} style={style} viewBox="0 0 150 75" role="img" aria-label={celebration ? 'Round victory trophy' : `${wins} rounds won`} data-wins={wins} data-frame={frame}>
    <image href={assetUrl('/assets/legacy/trophy-sheet.png')} width={legacyTrophy.width * legacyTrophy.columns} height={legacyTrophy.height * legacyTrophy.rows} x={-frame * legacyTrophy.width} y={-Math.min(2, wins) * legacyTrophy.height} />
  </svg>;
}
