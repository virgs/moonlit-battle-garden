import type { CSSProperties } from 'react';
import type { Snapshot } from '../game/Session';
import { targetStatuses } from '../presentation/targetStatus';
import type { GardenLayout } from '../render/layout';
import './target-markers.css';

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
      const armor=statuses.find(s=>s.kind==='armor');
      const shieldStyle={left:position.feet.x-garden.x,top:position.feet.y-garden.y-77*garden.scale,width:78*garden.scale,height:80*garden.scale} as CSSProperties;
      return <div className="target-marker-group" key={target.id} data-target-id={target.id} data-hole={hole}>
        {(armor||impact)&&<span className="target-force-field" data-renderer="phaser-rear" data-status={armor?'armor':undefined} data-value={armor?.value} data-layers={armor?armor.value-1:0} data-affected-player={garden.id} style={shieldStyle} role="img" aria-label={armor?.label??'Shield layer broken'}>
          {impact&&<span className="shield-impact" aria-hidden="true"/>}
        </span>}
        <div className="target-status-row" data-target-id={target.id} data-hole={hole} style={{left:position.feet.x-garden.x,top:position.hit.y-garden.y-2*garden.scale,'--marker-unit':`${garden.scale}px`,'--marker-width':`${78*garden.scale}px`} as CSSProperties}>
        {statuses.filter(status=>status.kind!=='armor').map(status=><span className={`target-status status-${status.kind}`} key={status.kind} data-status={status.kind} data-value={status.value} data-renderer="phaser-reactive" data-affected-player={garden.id} role="img" aria-label={status.label}/>)}
      </div></div>;
    })}
  </div>;
}
