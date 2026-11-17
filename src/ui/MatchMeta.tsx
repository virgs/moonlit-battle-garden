import type { CSSProperties } from 'react';
import type { MatchOptions,MatchState } from '../game/types';
import type { ArenaLayout } from '../render/layout';
import { roundClock } from '../presentation/roundClock';
import { menuLabels } from './menuContent';
import { ModeIcon } from './ModeIcon';
import './match-meta.css';

export function MatchMeta({state,mode,area,paused=false}:{state:MatchState;mode:MatchOptions['mode'];area?:ArenaLayout['score'];paused?:boolean}) {
  const elapsed=Math.max(0,state.time-state.roundStart);
  return <div className={`match-meta ${paused?'pause-match-meta':area?.metaAside?'match-meta-aside':'match-meta-top'}`} style={area?.metaAside?{'--metadata-width':`${Math.max(88,area.x-36)}px`} as CSSProperties:undefined}>
    <span className="match-mode-name">{!paused&&<ModeIcon mode={mode} decorative />}<span>{menuLabels[mode]}</span></span>
    <span className="match-round-clock"><span>Round {state.round}</span><time role="timer" aria-live="off" aria-label="Round elapsed time" dateTime={`PT${Math.floor(elapsed/1000)}S`} data-elapsed-ms={elapsed}>{roundClock(elapsed)}</time></span>
  </div>;
}
