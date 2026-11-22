import { useLayoutEffect,useRef,useState } from 'react';
import type { Snapshot } from '../game/Session';
import type { GardenLayout } from '../render/layout';
import { spellSceneModel } from '../presentation/spellScene';
import { paintSpellScene } from '../render/spellScene';

/** Full-board spell choreography advances only when simulation time advances. */
export function BoardSpellScene({snapshot,garden}:{snapshot:Snapshot;garden:GardenLayout}){
 const ref=useRef<HTMLCanvasElement>(null),[reduced,setReduced]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 useLayoutEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)'),change=()=>setReduced(media.matches);media.addEventListener('change',change);return()=>media.removeEventListener('change',change);},[]);
 const model=spellSceneModel(snapshot,garden);
 useLayoutEffect(()=>{const canvas=ref.current,ctx=canvas?.getContext('2d');if(!canvas||!ctx)return;paintSpellScene(ctx,model,garden,reduced);},[snapshot,garden,reduced]);
 if(!model.effects.length&&!model.blocks.length&&!model.targets.some(t=>t.statuses.length))return null;
 return <canvas ref={ref} className="board-spell-scene" width={301} height={383} aria-hidden="true" data-time={model.time} data-columns={model.columns.map(c=>c.column).join(',')} data-column-spans={model.columns.map(c=>Math.round(c.bottom-c.top)).join(',')} data-choreography={model.effects.map(e=>`${e.character}:${e.tier}:${e.kind}`).join(',')} data-reduced={reduced}/>;
}
