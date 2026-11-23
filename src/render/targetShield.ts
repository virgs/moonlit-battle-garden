import type {Target} from '../game/types';
import {targetFrame} from './targetAnimation';
/** Pure presentation poses; all timing follows the simulation, including pause/casting. */
export function targetShield(target:Target|null,time:number,reduced=false,hitTime=-Infinity){
 const layers=target?.kind==='mole'&&target.expires>time?target.armor??0:0;
 const age=time-hitTime,burst=age>=0&&age<280;
 const phase=target?targetFrame(target,time,reduced):0,step=phase%24;
 const reveal=reduced?1:phase>=72?(step+1)/8:phase>=48?1-step/8:1;
 return {layers,frame:reduced?0:Math.floor(time/(1000/12))%9,burst,burstFrame:reduced?2:Math.min(4,Math.max(0,Math.floor(age/56))),reveal:Math.max(.15,reveal),pulse:reduced?1:1+Math.sin(time/100)*.025};
}

/** Clip the approved raster to its upper curved band; never draw a replacement outline. */
export const shieldArcs={frameSize:64,innerRadius:22,outerRadius:31.5,topLimit:24,primarySize:84,secondarySize:144,centerOffset:52};
export function shieldArcPixel(x:number,y:number,burst=false):boolean{
 const radius=Math.hypot(x+.5-32,y+.5-32);
 return y<shieldArcs.topLimit&&radius>=(burst?18:shieldArcs.innerRadius)&&radius<=shieldArcs.outerRadius;
}
export function shieldArcGap(scale=1):number{
 return (shieldArcs.secondarySize*shieldArcs.innerRadius/shieldArcs.frameSize-shieldArcs.primarySize*shieldArcs.outerRadius/shieldArcs.frameSize)*scale;
}
