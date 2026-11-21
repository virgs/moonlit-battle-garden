import type { CSSProperties } from 'react';
import type { Snapshot } from '../game/Session';
import { config } from '../game/config';
import { targetStatuses } from '../presentation/targetStatus';
import type { GardenLayout } from '../render/layout';
import { OneStarSprite } from './OneStarEffects';
import './target-markers.css';
import { SpellGlyph } from './SpellGlyph';

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
          {status.kind==='curse'&&status.value===config.rosterSpells.markBonus?<OneStarSprite character="duskmantle" time={state.time} outlined/>:status.kind==='curse'?<SpellGlyph character="duskmantle" tier={4} time={state.time} outlined/>:status.kind==='armor'?<SpellGlyph character="captain-bramble" tier={status.value>=3?4:2} time={state.time} outlined/>:status.kind==='bonus'?<SpellGlyph character="duskmantle" tier={3} time={state.time} outlined/>:status.kind==='rush'?<SpellGlyph character="andromoss" tier={2} time={state.time} outlined/>:<SpellGlyph character="sprig" tier={1} time={state.time} outlined/>}
          {status.kind==='armor'&&<span className="target-hit-count" aria-hidden="true">{status.value}</span>}
        </span>)}
      </div>;
    })}
  </div>;
}
