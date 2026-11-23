import { useLayoutEffect,useRef,useState } from 'react';
import type { Snapshot } from '../game/Session';
import type { GardenLayout } from '../render/layout';
import { spellMotionTime,spellSceneModel } from '../presentation/spellScene';
import { paintSpellScene } from '../render/spellScene';

/** Smooth decorative poses between ticks, bounded to confirmed game state. */
export function BoardSpellScene({snapshot,garden}:{snapshot:Snapshot;garden:GardenLayout}){
 const ref=useRef<HTMLCanvasElement>(null),lastVisual=useRef(0),lastConfirmed=useRef<number|null>(null),[reduced,setReduced]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 useLayoutEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)'),change=()=>setReduced(media.matches);media.addEventListener('change',change);return()=>media.removeEventListener('change',change);},[]);
 const [droneSheet,setDroneSheet]=useState<HTMLImageElement>();
 useLayoutEffect(()=>{const image=new Image();let active=true;image.onload=()=>{if(active)setDroneSheet(image);};image.src=import.meta.env.BASE_URL+'assets/legacy/helicopter-killer.png';return()=>{active=false;};},[]);
 const model=spellSceneModel(snapshot,garden);
 useLayoutEffect(()=>{
  const canvas=ref.current,ctx=canvas?.getContext('2d');if(!canvas||!ctx)return;
  let request=0;const received=performance.now(),paused=snapshot.state.paused;
  const hold=Math.max(model.time,Math.min(model.time+49,lastVisual.current));
  const offset=lastConfirmed.current===model.time?hold-model.time:0;lastConfirmed.current=model.time;
  const draw=(now:number)=>{
   const visual=reduced?model.time:paused?hold:spellMotionTime(model.time,now-received+offset);lastVisual.current=visual;
   ctx.setTransform(2,0,0,2,0,0);paintSpellScene(ctx,model,garden,reduced,visual,droneSheet);canvas.dataset.visualTime=visual.toFixed(2);
   if(!paused&&!reduced&&now-received<50)request=requestAnimationFrame(draw);
  };
  draw(received);return()=>cancelAnimationFrame(request);
 },[snapshot,garden,reduced,droneSheet]);
 if(!model.columns.length)return null;
 return <canvas ref={ref} className="board-spell-scene" width={602} height={766} aria-hidden="true" data-drone-art={droneSheet?'legacy':'loading'} data-time={model.time} data-columns={model.columns.map(c=>c.column).join(',')} data-column-spans={model.columns.map(c=>Math.round(c.bottom-c.top)).join(',')} data-choreography={model.effects.map(e=>`${e.character}:${e.tier}:${e.kind}`).join(',')} data-reduced={reduced}/>;
}
