import type { Snapshot } from '../game/Session';
import type { CharacterId,GameEvent } from '../game/types';
import type { GardenLayout } from '../render/layout';
import { higherSpellEffects } from './spellEffects';
import { oneStarEffects } from './oneStarEffects';
import { targetStatuses } from './targetStatus';
export type SceneEffect={kind:string;character:CharacterId;tier:number;count:number;columns:number[];remaining?:number};
export function columnEffectGeometry(garden:GardenLayout,column:number){
 const holes=[column,column+3,column+6].map(i=>({x:(garden.holes[i].feet.x-garden.x)/garden.scale,y:(garden.holes[i].feet.y-garden.y)/garden.scale-35}));
 return {column,holes,top:Math.max(10,(garden.holes[column].hit.y-garden.y)/garden.scale+10),bottom:(garden.holes[column+6].feet.y-garden.y)/garden.scale+6};
}
/** Presentation-only scene description; no randomness, timers or simulation mutation. */
export function spellSceneModel(snapshot:Snapshot,garden:GardenLayout){
 const {state}=snapshot,p=state.players[garden.id];
 const effects:SceneEffect[]=state.phase==='playing'&&!state.casting?[
  ...oneStarEffects(p,state.time).map(e=>({...e,tier:1,columns:[]})),...higherSpellEffects(snapshot,garden.id),
 ]:[];
 const targets=state.phase==='playing'&&!state.casting?p.holes.flatMap((target,hole)=>target&&target.expires>state.time?[{hole,target,statuses:targetStatuses(p,target,state.time)}]:[]):[];
 const hits:GameEvent[]=effects.length?snapshot.events.filter(e=>e.player===garden.id&&e.round===state.round&&e.hole!==undefined&&state.time-e.time>=0&&state.time-e.time<600&&(e.kind==='hit'||e.kind==='star'||e.kind==='penalty')):[];
 const blocks=state.phase==='playing'&&!state.casting?snapshot.events.filter(e=>e.player===garden.id&&e.round===state.round&&e.kind==='shield'&&e.reason&&state.time-e.time>=0&&state.time-e.time<400):[];
 return {time:state.time,owner:p.character,effects,targets,hits,blocks,columns:effects.flatMap(effect=>effect.columns.map(col=>({...columnEffectGeometry(garden,col),character:effect.character,tier:effect.tier}))) };
}
