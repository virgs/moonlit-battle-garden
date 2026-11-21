import type { CSSProperties } from 'react';
import type { Snapshot } from '../game/Session';
import { config } from '../game/config';
import { targetStatuses,type TargetStatus } from '../presentation/targetStatus';
import type { GardenLayout } from '../render/layout';
import { OneStarSprite } from './OneStarEffects';
import './target-markers.css';

/** Readable, non-interactive badges anchored to the same hole geometry as the sprites. */
export function TargetMarkers({snapshot,garden}:{snapshot:Snapshot;garden:GardenLayout}) {
  const {state}=snapshot,player=state.players[garden.id];
  if(state.phase==='countdown')return null;
  return <div className="target-markers-layer" style={{left:garden.x,top:garden.y,width:garden.width,height:garden.height}} data-affected-player={garden.id}>
    {player.holes.map((target,hole)=>{
      if(!target)return null;const statuses=targetStatuses(player,target,state.time);if(!statuses.length)return null;
      const position=garden.holes[hole];
      return <div className="target-status-row" key={target.id} data-target-id={target.id} data-hole={hole} style={{left:position.feet.x-garden.x,top:position.hit.y-garden.y-2*garden.scale,'--marker-unit':`${garden.scale}px`,'--marker-width':`${78*garden.scale}px`} as CSSProperties}>
        {statuses.map(status=><span className={`target-status status-${status.kind}`} key={status.kind} data-status={status.kind} data-value={status.value} data-effect={status.kind==='curse'?'curse':undefined} data-character={status.kind==='curse'?'duskmantle':undefined} data-tier={status.kind==='curse'?(status.value===config.rosterSpells.markBonus?1:4):undefined} data-affected-player={garden.id} role="img" aria-label={status.label}>
          {status.kind==='curse'?<OneStarSprite character="duskmantle" time={state.time}/>:<StatusGlyph kind={status.kind}/>}
          {(status.kind==='armor'||status.kind==='curse'||status.kind==='bonus')&&<span aria-hidden="true">{status.kind==='armor'?'':status.kind==='curse'?'−':'+'}{status.value}</span>}
        </span>)}
      </div>;
    })}
  </div>;
}
function StatusGlyph({kind}:{kind:TargetStatus['kind']}) {
  return <svg viewBox="0 0 16 16" aria-hidden="true" className="target-status-icon" shapeRendering="crispEdges">
    {kind==='armor'?<><path d="M3 1H13V9L11 12L8 15L5 12L3 9Z" fill="#8aa6bb"/><path d="M5 3H11V9L8 12L5 9Z" fill="#dae7e7"/></>
      :kind==='bonus'?<><path d="M4 1H12V3H14V13H12V15H4V13H2V3H4Z" fill="#bf812e"/><path d="M5 3H11V13H5Z" fill="#f4d97d"/></>
      :kind==='rush'?<><path d="M3 1H13V3H11V5L8 8L11 11V13H13V15H3V13H5V11L8 8L5 5V3H3Z" fill="#e7aa70"/><path d="M7 3H9V5H7ZM7 11H9V13H7Z" fill="#fff0be"/></>
      :<><path d="M2 10V6L6 2H14V10L10 14H6Z" fill="#73bd85"/><path d="M3 13L11 5L12 6L4 14Z" fill="#def0b2"/></>}
  </svg>;
}
