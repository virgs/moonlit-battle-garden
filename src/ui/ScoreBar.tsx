import type { CSSProperties } from 'react';
import { characters } from '../game/config';
import { roundStanding } from '../game/standing';
import type { MatchState } from '../game/types';
import './score-bar.css';

export function ScoreBar({ state }: { state: MatchState }) {
  const { bluePercent, leader } = roundStanding(state);
  const names = state.players.map(player => characters[player.character].name);
  const description = leader === null ? 'Even match' : `${names[leader]} leads`;
  return <section className={`score-bar ${state.paused || state.phase !== 'playing' ? 'still' : ''}`} aria-label="Round standing">
    <div className="score-track" role="meter" aria-label="Blue versus red round advantage" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(bluePercent)} aria-valuetext={`${description}. Health first; score breaks ties.`} style={{ '--blue-share': `${bluePercent}%` } as CSSProperties}>
      <div className="score-liquid blue" /><div className="score-liquid red" />
      <span className="score-midpoint" /><span className="score-boundary" />
    </div>
    <div className="score-legend"><span>◆ {names[0]}</span><span>{description}</span><span>{names[1]} ◆</span></div>
  </section>;
}
