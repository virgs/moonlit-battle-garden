import type {Snapshot} from '../game/Session';
import type {PlayerId} from '../game/types';
import {gardenArt} from '../render/layout';
import {hasGuard} from '../game/targetModifiers';
export const reactiveAssets={mushroom:48,thorn:48,portal:48,rush:48,curse:48,veil:48,soul:48,dew:48,ward:64} as const;
export type ReactiveArt=keyof typeof reactiveAssets;
export type SpellActor={key:string;kind:string;art:ReactiveArt;x:number;y:number;size:number;alpha:number;frame:number;rotation:number;depth:number;destination?:'score';progress?:number};
const clamp=(v:number)=>Math.max(0,Math.min(1,v));
/** Actual simulation state/events only. No browser clocks, RNG or inferred rewards. */
export function reactiveSpellActors(snapshot:Snapshot,id:PlayerId,reduced=false,visualTime=snapshot.state.time):SpellActor[]{
 const {state,events}=snapshot,p=state.players[id],time=state.time,motion=reduced?time:visualTime,out:SpellActor[]=[];
 if(state.phase==='countdown'||state.casting)return out;
 const recent=events.filter(e=>e.round===state.round&&time-e.time>=0&&time-e.time<1500);
 const frame=(offset=0)=>reduced?0:Math.floor(motion/83.333+offset+id*3)%9;
 const add=(key:string,kind:string,art:ReactiveArt,x:number,y:number,size:number,alpha=1,rotation=0,depth=.45,pose=frame())=>{const a:SpellActor={key,kind,art,x,y,size,alpha:clamp(alpha),rotation:reduced?0:rotation,depth,frame:reduced?0:pose};out.push(a);return a;};
 const hole=(index:number)=>gardenArt.holes[index];
 const own=recent.filter(e=>e.player===id);
 const guardian=p.character==='champignon'?'mushroom':'thorn';
 const capacity=p.shieldTier===3?5:2;
 const guardX=(index:number,slots=capacity)=>150+(index-(slots-1)/2)*36;
 if(hasGuard(p,time)&&(p.character==='champignon'||p.character==='captain-bramble'))for(let i=0;i<p.mistakeShield;i++)add(`guard-${i}`,'guardian',guardian,guardX(i),300+(reduced?0:Math.sin(motion/200+i)*2),28,1,0,.65,frame(i));
 for(const e of own){const age=Math.max(0,motion-e.time),u=clamp(age/550),at=e.hole===undefined?{x:150,y:170}:hole(e.hole);
  if(e.kind==='shield'&&e.reason&&age<550){const x=guardX(e.visual?.guardRemaining??p.mistakeShield,e.visual?.guardTier===3?5:2),v=reduced?1:u;
   add(`block-${e.id}`,'guard-intercept',guardian,x+(at.x-x)*v,300+(at.y-300)*v-Math.sin(v*Math.PI)*48,28+Math.sin(v*Math.PI)*12,1-u*.85,Math.sin(v*Math.PI)*.35,.65,frame(e.id));
   if(u>.65)add(`block-puff-${e.id}`,'guard-burst',guardian,at.x,at.y-8,reduced?35:35+(u-.65)*80,(1-u)*2.5,-u,.6,frame(e.id+3));
  }
  if(e.visual?.markPenalty&&e.kind==='penalty'&&age<650)add(`curse-miss-${e.id}`,'curse-snap','curse',at.x,at.y-5-(reduced?0:Math.sin(u*Math.PI)*10),reduced?60:60+Math.sin(u*Math.PI)*32,1-clamp(age/650),Math.sin(u*8)*.25,.6,frame(e.id));
  if(e.visual?.veiled&&(e.kind==='hit'||e.kind==='star'||e.reason==='rabbit')&&age<500)for(const sign of [-1,1])add(`veil-part-${e.id}-${sign}`,'veil-part','veil',at.x+sign*(reduced?40:20+u*35),at.y-30,45,(1-age/500)*.4,sign*u,.55,frame(e.id));
  if(e.kind==='hit'&&e.visual?.marked&&age<400)add(`curse-hit-${e.id}`,'curse-dissolve','curse',at.x,at.y-4,reduced?60:60+age/20,1-age/400,age/700,.35,frame(e.id));
  if(e.kind==='hit'&&(e.visual?.bonusPoints??0)>0&&age<1000){const a=add(`soul-hit-${e.id}`,'soul-reward','soul',at.x,at.y-28,30,1-clamp(age/1000)**2,0,2.4,frame(e.id));a.destination='score';a.progress=reduced?1:clamp(age/1000);}
  if(e.kind==='cast'&&e.visual?.cleanse&&age<850){const v=reduced?1:clamp(age/850);add(`cleanse-${e.id}`,'cleanse-wave','ward',150,165,30+v*320,(1-v)*.8,-v*.5,.55,frame(e.id));}
  if(e.kind==='cast'&&e.visual?.theftTaken===0&&!e.visual.wardBlocked&&age<650)add(`empty-${e.id}`,'empty-theft','rush',150,310,reduced?35:35*(1-clamp(age/650)),1-clamp(age/650),age/160,.6,frame(e.id));
 }
 const wardBreak=recent.find(e=>e.kind==='cast'&&e.player!==id&&e.visual?.wardBlocked&&time-e.time<650);
 if(p.magicShieldUntil>time||wardBreak){const u=wardBreak?clamp((motion-wardBreak.time)/650):0;add('ward','living-ward','ward',150,160,reduced?286:286*(1+u*.4),wardBreak?(1-u)*.65:.38,reduced?0:Math.sin(motion/450)*.035,.4,frame());}
 if(p.camouflageUntil>time)for(let side=0;side<2;side++)for(let row=0;row<3;row++)add(`veil-edge-${side}-${row}`,'veil-mist','veil',side?292:9,45+row*100+(reduced?0:Math.sin(motion/500+row)*6),56,.4,(side?1:-1)*.25,.55,frame(row+side*3));
 for(let index=0;index<9;index++){const t=p.holes[index];if(!t||t.expires<=time)continue;const at=hole(index),age=Math.max(0,motion-t.born),life=t.expires-t.born;
  if(t.kind==='rabbit'&&t.origin==='magic'&&age<750){const u=clamp(age/750),scale=Math.min(1,age/120)*Math.min(1,(750-age)/200);add(`portal-${t.id}`,'rabbit-portal','portal',at.x,at.y-3,reduced?60:60*scale,.9*(1-u*.25),0,.35,frame(index));}
  if(t.kind==='mole'&&t.rushReductionMs){const u=clamp(age/life);add(`rush-${t.id}`,'shortened-mole','rush',at.x,at.y-34,90,.8,0,.55,reduced?0:Math.floor(age*(1+u*2)/110)%9);}
  if(t.kind==='mole'&&t.missBonus)add(`curse-${t.id}`,'marked-mole','curse',at.x,at.y-4,reduced?64:64*(.4+.6*clamp(age/300)),.9,0,.35,frame(index));
  if(t.kind==='mole'&&p.drainUntil>time){const a=reduced?0:motion/400+index;add(`bonus-${t.id}`,'bonus-mole','soul',at.x+Math.cos(a)*28,at.y-28+Math.sin(a)*12,18,.8,Math.sin(a)*.12,.55,frame(index));}
  if(t.extended){const granted=t.extendedAt??t.born,ageSince=Math.max(0,motion-granted);add(`leaves-${t.id}`,'extended-target','dew',at.x,at.y-4,reduced?48:32+16*clamp(ageSince/350),.8,0,.4,frame(index));if(ageSince<650)add(`dew-${t.id}`,'time-granted','dew',at.x+20,at.y-55-(reduced?0:ageSince/35),25,1-clamp(ageSince/650),0,.6,frame(index+3));}
  if(p.camouflageUntil>time){const hit=own.find(e=>e.hole===index&&(e.kind==='hit'||e.kind==='star')&&time-e.time<500),split=!reduced&&hit?1-clamp((time-hit.time)/500):0;for(const sign of [-1,1])add(`veil-${t.id}-${sign}`,'veiled-target','veil',at.x+sign*(28+split*20),at.y-33,42,.28,-sign*.2,.55,frame(index+(sign===1?4:0)));}
 }
 return out;
}
