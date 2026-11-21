import { useEffect,useState,type CSSProperties } from 'react';
import { assetUrl } from '../assets/url';
import type { Snapshot } from '../game/Session';
import type { CharacterId,MatchState } from '../game/types';
import { presentation,validSheet } from '../presentation/config';
import { inspectImage } from '../presentation/images';
import { oneStarEffects,type OneStarEffect } from '../presentation/oneStarEffects';
import type { GardenLayout } from '../render/layout';
import './spell-effects.css';

/** The same eight-frame artwork is reused at board and HUD sizes, with uniform scaling. */
export function OneStarSprite({character,time,style}:{character:CharacterId;time:number;style?:CSSProperties}) {
  const clip=presentation[character].effects[1];
  const [ready,setReady]=useState(false);
  useEffect(()=>{let alive=true;void inspectImage(clip.src).then(image=>{if(alive)setReady(!!image&&validSheet(clip,image.width,image.height));});return()=>{alive=false;};},[clip]);
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const frame=reduced?0:Math.floor(time*clip.fps/1000)%clip.frameCount;
  return <svg className="one-star-sprite" style={style} viewBox={`0 0 ${clip.frameWidth} ${clip.frameHeight}`} overflow="hidden" aria-hidden="true" data-character={character} data-frame={frame} data-asset={ready?'ready':'loading'}>
    <image href={assetUrl(clip.src)} width={clip.columns*clip.frameWidth} height={Math.ceil(clip.frameCount/clip.columns)*clip.frameHeight} x={-(frame%clip.columns)*clip.frameWidth} y={-Math.floor(frame/clip.columns)*clip.frameHeight}/>
  </svg>;
}

export function OneStarBoardEffects({snapshot,garden}:{snapshot:Snapshot;garden:GardenLayout}) {
  const {state}=snapshot;
  if(state.phase!=='playing'||state.casting)return null;
  return <>{oneStarEffects(state.players[garden.id],state.time).filter(effect=>effect.kind!=='curse').map(effect=><BoardEffect key={effect.kind} effect={effect} time={state.time} garden={garden}/>)}</>;
}
function BoardEffect({effect,time,garden}:{effect:OneStarEffect;time:number;garden:GardenLayout}) {
  const size=(effect.kind==='curse'?38:effect.kind==='guard'?62:48)*garden.scale;
  const point=(x:number,y:number):CSSProperties=>({left:x-size/2,top:y-size/2,width:size,height:size});
  const positions=effect.kind==='curse'
    ? effect.holes.map(hole=>point(garden.holes[hole].feet.x-garden.x,garden.holes[hole].hit.y-garden.y-6*garden.scale))
    : effect.kind==='guard'
      ? Array.from({length:effect.count},(_,index)=>point(garden.width*(index===0?.35:.65),garden.height*.9))
      : [[0,.3],[1,.3],[0,.7],[1,.7]].map(([x,y])=>point(garden.width*x,garden.height*y));
  return <div className={`spell-effect effect-${effect.kind} one-star-effect`} data-effect={effect.kind} data-character={effect.character} data-tier="1" data-charges={effect.count} data-affected-player={garden.id}>
    {positions.map((style,index)=><OneStarSprite key={effect.kind==='curse'?effect.holes[index]:index} character={effect.character} time={time} style={style}/>)}
  </div>;
}

/** Only needed when a board is hidden; attaches to that affected player's name, not the caster. */
export function HiddenBoardEffects({state,side}:{state:MatchState;side:0|1}) {
  if(state.phase!=='playing'||state.casting)return null;
  const effects=oneStarEffects(state.players[side],state.time);
  if(!effects.length)return null;
  return <span className="hidden-board-effects" data-affected-player={side} role="group" aria-label="Hidden garden spell effects">{effects.map(effect=><span key={effect.kind} className="hidden-board-effect" role="img" aria-label={effect.label} data-effect={effect.kind} data-count={effect.count}>
    {Array.from({length:effect.kind==='guard'?effect.count:1},(_,index)=><OneStarSprite key={index} character={effect.character} time={state.time}/>)}
    {effect.kind==='curse'&&<span className="effect-quota" aria-hidden="true">{effect.count}</span>}
  </span>)}</span>;
}
