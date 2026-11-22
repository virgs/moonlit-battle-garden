import type { CSSProperties } from 'react';
import type { Snapshot } from '../game/Session';
import type { GardenLayout } from '../render/layout';
import { higherSpellEffects,type SpellEffect } from '../presentation/spellEffects';
import { OneStarBoardEffects } from './OneStarEffects';
import { SpellGlyph } from './SpellGlyph';
import './spell-effects.css';
import { BoardSpellScene } from './BoardSpellScene';
export function SpellEffects({snapshot,garden}:{snapshot:Snapshot;garden:GardenLayout}){
  const {state}=snapshot;
  if(state.phase!=='playing'||state.casting)return null;
  return <div className="spell-effects" style={{left:garden.x,top:garden.y,width:garden.width,height:garden.height}} aria-hidden="true">
    <BoardSpellScene snapshot={snapshot} garden={garden}/>
    <OneStarBoardEffects snapshot={snapshot} garden={garden}/>
    {higherSpellEffects(snapshot,garden.id).map(effect=><BoardEffect key={effect.kind} effect={effect} time={state.time} garden={garden}/>)}
  </div>;
}
function BoardEffect({effect,time,garden}:{effect:SpellEffect;time:number;garden:GardenLayout}){
  const {kind,character,tier,count,columns}=effect,s=garden.scale;
  const positions=columns.length?columns.map(column=>({x:garden.holes[column+6].feet.x-garden.x,y:garden.height*.89}))
    :kind==='veil'?[{x:0,y:garden.height*.3},{x:garden.width,y:garden.height*.7}]
    :kind==='rush'||kind==='decoys'?[{x:garden.width*.12,y:garden.height*.12},{x:garden.width*.88,y:garden.height*.12}]
    :[{x:garden.width*.5,y:garden.height*.9}];
  const size=(kind==='veil'?76:columns.length?72:64)*s;
  const bounds:CSSProperties=columns.length?{left:Math.min(...positions.map(p=>p.x))-size/2,width:Math.max(...positions.map(p=>p.x))-Math.min(...positions.map(p=>p.x))+size}:{};
  const offset=columns.length?Number(bounds.left):0;
  return <div className={`spell-effect higher-spell-effect effect-${kind}`} style={bounds} data-effect={kind} data-character={character} data-tier={tier} data-charges={count} data-asset="ready" data-affected-player={garden.id}>
    {positions.map(({x,y},index)=><SpellGlyph key={index} character={character} tier={tier} time={time} remaining={effect.remaining} backed style={{position:'absolute',left:x-size/2-offset,top:y-size/2,width:size,height:size}}/>)}
    {count>1&&!columns.length&&<span className="spell-charge-pips" style={{left:garden.width*.5-offset,top:garden.height*.9+size*.37}}>{Array.from({length:count},(_,i)=><i key={i}/>)}</span>}
  </div>;
}
