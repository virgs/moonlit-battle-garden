import type { CSSProperties } from 'react';
import type { Snapshot } from '../game/Session';
import { config } from '../game/config';
import { targetStatuses } from '../presentation/targetStatus';
import type { GardenLayout } from '../render/layout';
import { OneStarSprite } from './OneStarEffects';
import './target-markers.css';
import { targetFrame } from '../render/targetAnimation';
import { SpellGlyph } from './SpellGlyph';

/** Non-interactive target cues anchored to the same hole geometry as the sprites. */
export function TargetMarkers({snapshot,garden}:{snapshot:Snapshot;garden:GardenLayout}) {
  const {state}=snapshot,player=state.players[garden.id];
  if(state.phase==='countdown')return null;
  return <div className="target-markers-layer" style={{left:garden.x,top:garden.y,width:garden.width,height:garden.height}} data-affected-player={garden.id}>
    {player.holes.map((target,hole)=>{
      if(!target)return null;const statuses=targetStatuses(player,target,state.time);
      const impact=[...snapshot.events].reverse().find(e=>e.player===garden.id&&e.round===state.round&&e.hole===hole&&e.kind==='shield'&&e.targetKind==='mole'&&!e.reason&&state.time-e.time>=0&&state.time-e.time<280);
      if(!statuses.length&&!impact)return null;
      const position=garden.holes[hole];
      const armor=statuses.find(s=>s.kind==='armor'),frame=targetFrame(target,state.time)%24;
      const phase=targetFrame(target,state.time),reveal=phase>=72?(frame+1)/8:phase>=48?1-frame/8:1;
      const shieldStyle={left:position.feet.x-garden.x,top:position.feet.y-garden.y-77*garden.scale,width:78*garden.scale,height:80*garden.scale,'--shield-reveal':Math.max(.15,reveal),'--shield-flash':impact?1-(state.time-impact.time)/280:0} as CSSProperties;
      return <div className="target-marker-group" key={target.id} data-target-id={target.id} data-hole={hole}>
        {(armor||impact)&&<span className="target-force-field" data-status={armor?'armor':undefined} data-value={armor?.value} data-layers={armor?armor.value-1:0} data-affected-player={garden.id} style={shieldStyle} role="img" aria-label={armor?.label??'Shield layer broken'}>
          <svg viewBox="0 0 78 80" aria-hidden="true" shapeRendering="crispEdges">
            {armor&&<g className="shield-shell"><path d="M24 5H54V9H64V17H70V29H73V53H69V65H61V72H49V75H29V72H17V65H9V53H5V29H8V17H14V9H24Z" fill="#ed715c" fillOpacity=".06" stroke="#ed715c" strokeWidth="2"/><path d="M15 25V18H22V13H34 M64 51V59H59V65H49" fill="none" stroke="#ffdab0" strokeWidth="2"/>
            {armor.value>=3&&<path d="M23 20V16H32 M55 16H60V23H64V33 M63 55V61H55 M21 63H16V52" fill="none" stroke="#ed715c" strokeWidth="3"/>}</g>}
            {impact&&<g className="shield-impact" style={{opacity:1-(state.time-impact.time)/280}}><path d="M9 14L3 8 M65 13L73 5 M6 51L0 55 M69 57L77 62 M29 6L26 0 M49 72L53 79" stroke="#ffdab0" strokeWidth="3"/><path d="M20 10L16 3 M62 35L76 31 M19 69L12 77" stroke="#ed715c" strokeWidth="3"/></g>}
          </svg>
        </span>}
        <div className="target-status-row" data-target-id={target.id} data-hole={hole} style={{left:position.feet.x-garden.x,top:position.hit.y-garden.y-2*garden.scale,'--marker-unit':`${garden.scale}px`,'--marker-width':`${78*garden.scale}px`} as CSSProperties}>
        {statuses.filter(status=>status.kind!=='armor').map(status=><span className={`target-status status-${status.kind}`} key={status.kind} data-status={status.kind} data-value={status.value} data-effect={status.kind==='curse'?'curse':undefined} data-character={status.kind==='curse'?'duskmantle':undefined} data-tier={status.kind==='curse'?(status.value===config.rosterSpells.markBonus?1:4):undefined} data-affected-player={garden.id} role="img" aria-label={status.label}>
          {status.kind==='curse'&&status.value===config.rosterSpells.markBonus?<OneStarSprite character="duskmantle" time={state.time} outlined/>:status.kind==='curse'?<SpellGlyph character="duskmantle" tier={4} time={state.time} outlined/>:status.kind==='bonus'?<SpellGlyph character="duskmantle" tier={3} time={state.time} outlined/>:status.kind==='rush'?<SpellGlyph character="andromoss" tier={2} time={state.time} outlined/>:<SpellGlyph character="sprig" tier={1} time={state.time} outlined/>}
        </span>)}
      </div></div>;
    })}
  </div>;
}
