import type { CSSProperties } from 'react';
import type { Snapshot } from '../game/Session';
import type { CharacterId,MatchState } from '../game/types';
import { oneStarEffects,type OneStarEffect } from '../presentation/oneStarEffects';
import type { GardenLayout } from '../render/layout';
import './spell-effects.css';
import { config } from '../game/config';
import { higherSpellEffects } from '../presentation/spellEffects';
import { SpellGlyph } from './SpellGlyph';

/** Same shaded raster sheet at board, target-marker and hidden-opponent HUD sizes. */
export function OneStarSprite({character,time,style}:{character:CharacterId;time:number;style?:CSSProperties}) {
  return <SpellGlyph character={character} tier={1} time={time} style={style} className="one-star-sprite"/>;
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
  const higher=higherSpellEffects({state,events:[]},side);
  const player=state.players[side];
  for(const [kind,character,tier,live] of [
    ['armor','captain-bramble',player.holes.some(t=>(t?.armor??0)>=2)?4:2,player.holes.filter(t=>!!t?.armor&&t.expires>state.time).length],
    ['curse','duskmantle',4,player.holes.filter(t=>t?.missBonus===config.rosterSpells.curseBonus&&t.expires>state.time).length],
    ['rush','andromoss',2,player.holes.filter(t=>!!t?.rushReductionMs&&t.expires>state.time).length],
  ] as const){
    const existing=higher.find(e=>e.kind===kind);
    if(existing&&(kind==='armor'||kind==='curse'))existing.count+=live;
    else if(!existing&&live>0&&!(kind==='rush'&&higher.some(e=>e.kind==='decoys')))higher.push({kind,character,tier,count:live,columns:[]});
  }
  if(!effects.length&&!higher.length)return null;
  return <span className="hidden-board-effects" data-affected-player={side} role="group" aria-label="Hidden garden spell effects">{effects.map(effect=><span key={effect.kind} className="hidden-board-effect" role="img" aria-label={effect.label} data-effect={effect.kind} data-count={effect.count}>
    {Array.from({length:effect.kind==='guard'?effect.count:1},(_,index)=><OneStarSprite key={index} character={effect.character} time={state.time}/>)}
    {effect.kind==='curse'&&<span className="effect-quota" aria-hidden="true">{effect.count}</span>}
  </span>)}{higher.map(effect=><span key={`higher-${effect.kind}`} className="hidden-board-effect" role="img" aria-label={`${effect.tier}-star ${effect.kind}: ${effect.count}`} data-effect={effect.kind} data-count={effect.count}><SpellGlyph character={effect.character} tier={effect.tier} time={state.time}/>{effect.count>1&&<span className="effect-quota">{effect.count}</span>}</span>)}</span>;
}
