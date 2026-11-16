import { assetUrl } from '../assets/url';
import { useEffect, useRef, useState } from 'react';
import { characters, config } from '../game/config';
import { roundStanding } from '../game/standing';
import type { MatchState } from '../game/types';
import { barSourceOffset, easeLegacyBar, legacyBar } from '../render/legacyPresentation';
import type { Rect } from '../render/layout';
import './score-bar.css';

export function ScoreBar({ state, area }: { state: MatchState; area: Rect }) {
  const { bluePercent, leader } = roundStanding(state);
  const [paint, setPaint] = useState({ percent: 50, frame: 0 });
  const latest = useRef({ bluePercent, paused: state.paused, animate: state.phase === 'playing' });
  latest.current = { bluePercent, paused: state.paused, animate: state.phase === 'playing' };
  useEffect(() => { setPaint({ percent: 50, frame: 0 }); }, [state.round]);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const timer = setInterval(() => {
      const current = latest.current;
      if (current.paused) return;
      setPaint(previous => {
        const percent = motion.matches ? current.bluePercent : easeLegacyBar(previous.percent, current.bluePercent);
        const frame = current.animate && !motion.matches ? (previous.frame + 1) % 4 : previous.frame;
        return percent === previous.percent && frame === previous.frame ? previous : { percent, frame };
      });
    }, 1000 / legacyBar.fps);
    return () => clearInterval(timer);
  }, []);
  const names = state.players.map(player => characters[player.character].name);
  const description = leader === null ? 'Even match' : `${names[leader]} leads`;
  return <section className="score-bar" aria-label="Round standing" style={{ left: area.x, top: area.y, width: area.width, height: area.height }}>
    <div className="score-track" role="meter" aria-label="Blue versus red round advantage" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(bluePercent)} aria-valuetext={`${description}. Score lead ${Math.abs(state.players[0].score - state.players[1].score)} of ${config.winScoreDifference} points needed to win.`}>
      <svg className="legacy-score-art" viewBox="0 0 499 45" aria-hidden="true" data-frame={paint.frame} data-offset={barSourceOffset(paint.percent)}>
        <svg x="3" y="2" width="493" height="41" viewBox="0 0 493 41" overflow="hidden">
          <image href={assetUrl('/assets/legacy/bar-sheet.png')} width="1010" height="164" x={-barSourceOffset(paint.percent)} y={-paint.frame * legacyBar.frameHeight} />
        </svg>
        <image href={assetUrl('/assets/legacy/bar-border.png')} width="499" height="45" />
      </svg>
    </div>
    <div className="score-legend"><span>◆ {names[0]}</span><span>{description}</span><span>{names[1]} ◆</span></div>
  </section>;
}
