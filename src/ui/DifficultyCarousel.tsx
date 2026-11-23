import {useRef} from 'react';
import type {Difficulty} from '../game/types';
import {ControlKey} from './ControlKey';
const levels:Difficulty[]=['easy','medium','hard'];
export function DifficultyCarousel({difficulty,change}:{difficulty:Difficulty;change:(value:Difficulty)=>void}){
 const swipe=useRef<number|null>(null),move=(step:number)=>change(levels[(levels.indexOf(difficulty)+step+3)%3]);
 return <section className="difficulty-carousel" aria-label="Computer difficulty" data-difficulty={difficulty} tabIndex={0}
  onKeyDown={e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.stopPropagation();e.preventDefault();move(e.key==='ArrowRight'?1:-1);}}}
  onPointerDown={e=>{swipe.current=e.clientX;}} onPointerUp={e=>{if(swipe.current!==null&&Math.abs(e.clientX-swipe.current)>35)move(e.clientX<swipe.current?1:-1);swipe.current=null;}} onPointerCancel={()=>{swipe.current=null;}}>
  <h4>Difficulty</h4><div className="difficulty-inline-controls"><button className="carousel-arrow" aria-label="Previous difficulty" onClick={()=>move(-1)}><ControlKey label="ArrowLeft"/></button><strong aria-live="polite">{difficulty}</strong><button className="carousel-arrow" aria-label="Next difficulty" onClick={()=>move(1)}><ControlKey label="ArrowRight"/></button></div>
 </section>;
}
