import type { MatchOptions,MatchState } from '../game/types';
import { roundClock } from '../presentation/roundClock';
import { menuLabels } from './menuContent';
import { ModeIcon } from './ModeIcon';
import './match-meta.css';

export function MatchMeta({state,mode,paused=false}:{state:MatchState;mode:MatchOptions['mode'];paused?:boolean}) {
  const elapsed=Math.max(0,state.time-state.roundStart);
  return <div className={`match-meta ${paused?'pause-match-meta':'match-meta-top'}`}>
    <span className="match-mode-name">{!paused&&<ModeIcon mode={mode} decorative />}<span>{menuLabels[mode]}</span></span>
    <span className="match-round-clock"><time role="timer" aria-live="off" aria-label="Round elapsed time" dateTime={`PT${Math.floor(elapsed/1000)}S`} data-elapsed-ms={elapsed}>{roundClock(elapsed)}</time></span>
  </div>;
}
