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
 const hits:GameEvent[]=effects.length?snapshot.events.filter(e=>e.player===garden.id&&e.round===state.round&&e.hole!==undefined&&e.reason!=='empty'&&e.reason!=='miss'&&state.time-e.time>=0&&state.time-e.time<600&&(e.kind==='hit'||e.kind==='star'||e.kind==='penalty')):[];
 const blocks=state.phase==='playing'&&!state.casting?snapshot.events.filter(e=>e.player===garden.id&&e.round===state.round&&e.kind==='shield'&&e.reason&&state.time-e.time>=0&&state.time-e.time<400):[];
 return {time:state.time,owner:p.character,effects,targets,hits,blocks,columns:effects.flatMap(effect=>effect.columns.map(col=>({...columnEffectGeometry(garden,col),character:effect.character,tier:effect.tier}))) };
}

/** Cosmetic interpolation never runs more than one tick ahead of confirmed state. */
export function spellMotionTime(confirmed:number,elapsed:number,paused=false,reduced=false){
 return confirmed+(paused||reduced?0:Math.max(0,Math.min(49,elapsed)));
}
type Column=ReturnType<typeof columnEffectGeometry>;
export function columnCenterX(column:Column,y:number){
 const points=column.holes;if(y<=points[0].y)return points[0].x;if(y>=points[2].y)return points[2].x;
 const row=y<points[1].y?0:1,a=points[row],b=points[row+1];return a.x+(b.x-a.x)*(y-a.y)/(b.y-a.y);
}
export function droneRig(column:Column,time:number){
 const phase=time/650+column.column*.8;
 return {top:{x:columnCenterX(column,column.top)+Math.sin(phase)*11,y:column.top+Math.sin(time/430+column.column)*1.5,bank:Math.cos(phase)*.13},bottom:{x:columnCenterX(column,column.bottom)+Math.sin(phase*.83+1)*10,y:column.bottom+Math.sin(time/510+1)*1.5,bank:Math.cos(phase*.83+1)*.11}};
}
export function columnRopePoint(column:Column,time:number,u:number,strand=0,pulse=0,rig=droneRig(column,time)){
 const topY=rig.top.y+7,bottomY=rig.bottom.y-5,y=topY+(bottomY-topY)*u;
 const offset=(rig.top.x-columnCenterX(column,topY))*(1-u)+(rig.bottom.x-columnCenterX(column,bottomY))*u;
 const belly=Math.sin(Math.PI*u)*(Math.sin(time/570-u*2.8+column.column)*10+Math.sin(time/940+u*5)*3);
 const braid=strand*Math.sin(Math.PI*u)*Math.sin(u*36-time/170)*1.8;
 return {x:columnCenterX(column,y)+offset+belly+braid+Math.sin(Math.PI*u)*Math.sin(time/55-u*11)*pulse,y};
}
