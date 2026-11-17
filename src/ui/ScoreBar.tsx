import { assetUrl } from '../assets/url';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { characters, config } from '../game/config';
import { roundStanding } from '../game/standing';
import type { MatchState } from '../game/types';
import { barSourceOffset, easeLegacyBar, legacyBar } from '../render/legacyPresentation';
import type { ArenaLayout } from '../render/layout';
import './score-bar.css';
import { CharacterIcon } from './CharacterIcon';
import { StarMeter, Trophy } from './LegacyRewards';

export function ScoreBar({ state, area, onPause, controlLabel, opponentStars, trophyCenters }: { state: MatchState; area: ArenaLayout['score']; onPause?: () => void; controlLabel?: string; opponentStars?: number; trophyCenters?: number[] }) {
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
  const centers = trophyCenters ?? [area.trophyWidth / 2, area.width - area.trophyWidth / 2];
  const nameWidths = centers.map(center => Math.min(240, 2 * Math.min(area.x + center, area.viewportWidth - area.x - center) - 8, Math.abs(centers[1] - centers[0]) - 8));
  const description = leader === null ? 'Even match' : `${names[leader]} leads`;
  return <section className="score-bar" aria-label="Round standing" style={{ left: area.x, top: area.y, width: area.width, height: area.height, '--name-size': `${area.nameSize}px`, '--name-height': `${area.nameHeight}px`, '--trophy-width': `${area.trophyWidth}px`, '--trophy-height': `${area.trophyHeight}px` } as CSSProperties}>
    <div className="score-track" role="meter" aria-label="Blue versus red round advantage" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(bluePercent)} aria-valuetext={`${description}. Score lead ${Math.abs(state.players[0].score - state.players[1].score)} of ${config.winScoreDifference} points needed to win.`}>
      <svg className="legacy-score-art" viewBox="0 0 499 45" aria-hidden="true" data-frame={paint.frame} data-offset={barSourceOffset(paint.percent)}>
        <svg x="3" y="2" width="493" height="41" viewBox="0 0 493 41" overflow="hidden">
          <image href={assetUrl('/assets/legacy/bar-sheet.png')} width="1010" height="164" x={-barSourceOffset(paint.percent)} y={-paint.frame * legacyBar.frameHeight} />
        </svg>
        <image href={assetUrl('/assets/legacy/bar-border.png')} width="499" height="45" />
      </svg>
      {onPause && <button className="score-pause" aria-label={controlLabel ?? (state.paused ? 'Resume' : 'Pause')} title="Tap the score bar or press Escape for game controls" onClick={onPause} />}
    </div>
    <div className="score-legend">{names.map((name, side) => <span key={side} style={{ left: centers[side] - nameWidths[side] / 2, width: nameWidths[side], '--name-width': `${nameWidths[side]}px` } as CSSProperties}><CharacterIcon character={state.players[side].character} placeholder="box" /><span className="score-character-name">{name}</span></span>)}</div>
    <div className={`score-trophies ${trophyCenters ? "column-aligned" : ""}`} aria-label="Rounds won">{state.players.map((player, side) => <Trophy key={`${side}-${player.wins}`} wins={player.wins} paused={state.paused} mirror={side === 1} style={trophyCenters ? { position: "absolute", left: trophyCenters[side] - area.trophyWidth / 2 } : undefined} />)}</div>
    {opponentStars !== undefined && <div className="opponent-charge" role="group" aria-label={`Opponent magic: ${opponentStars} of 4 stars`}><span>Rival</span><StarMeter count={opponentStars} time={state.time} horizontal /></div>}
  </section>;
}
