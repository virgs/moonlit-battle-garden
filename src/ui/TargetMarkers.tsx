import type { CSSProperties } from 'react';
import type { Snapshot } from '../game/Session';
import { config } from '../game/config';
import { targetStatuses } from '../presentation/targetStatus';
import type { GardenLayout } from '../render/layout';
import { OneStarSprite } from './OneStarEffects';
import './target-markers.css';
import { assetUrl } from '../assets/url';
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
          {armor&&<span className="shield-shell"><ShieldSprite kind="idle" frame={Math.floor(state.time/125)%5}/>{armor.value>=3&&<span className="shield-inner"><ShieldSprite kind="idle" frame={(Math.floor(state.time/125)+2)%5}/></span>}</span>}
          {impact&&<span className="shield-impact"><ShieldSprite kind="break" frame={Math.min(4,Math.floor((state.time-impact.time)/56))}/></span>}
        </span>}
        <div className="target-status-row" data-target-id={target.id} data-hole={hole} style={{left:position.feet.x-garden.x,top:position.hit.y-garden.y-2*garden.scale,'--marker-unit':`${garden.scale}px`,'--marker-width':`${78*garden.scale}px`} as CSSProperties}>
        {statuses.filter(status=>status.kind!=='armor').map(status=><span className={`target-status status-${status.kind}`} key={status.kind} data-status={status.kind} data-value={status.value} data-effect={status.kind==='curse'?'curse':undefined} data-character={status.kind==='curse'?'duskmantle':undefined} data-tier={status.kind==='curse'?(status.value===config.rosterSpells.markBonus?1:4):undefined} data-affected-player={garden.id} role="img" aria-label={status.label}>
          {status.kind==='curse'&&status.value===config.rosterSpells.markBonus?<OneStarSprite character="duskmantle" time={state.time} outlined/>:status.kind==='curse'?<SpellGlyph character="duskmantle" tier={4} time={state.time} outlined/>:status.kind==='bonus'?<SpellGlyph character="duskmantle" tier={3} time={state.time} outlined/>:status.kind==='rush'?<SpellGlyph character="andromoss" tier={2} time={state.time} outlined/>:<SpellGlyph character="sprig" tier={1} time={state.time} outlined/>}
        </span>)}
      </div></div>;
    })}
  </div>;
}

function ShieldSprite({kind,frame}:{kind:'idle'|'break';frame:number}){
 const reduced=typeof window!=='undefined'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const pose=reduced?0:frame;
 return <svg className="shield-sprite" viewBox="0 0 64 80" overflow="hidden" aria-hidden="true" data-art="pixellab" data-frame={pose}><image href={assetUrl(`/assets/effects/bramble-shield/${kind}.png`)} x={-pose*64} width={320} height={80}/></svg>;
}
