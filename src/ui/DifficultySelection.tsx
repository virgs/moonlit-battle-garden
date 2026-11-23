import {useEffect,useRef} from 'react';
import type {Difficulty} from '../game/types';
import {Backdrop} from './FrontScreens';
import {ControlKey,KeyHint} from './ControlKey';
import {ModeIcon} from './ModeIcon';
const levels:Difficulty[]=['easy','medium','hard'];
const descriptions={easy:'A gentler rival. More time to find your rhythm.',medium:'A watchful rival. A lively garden duel.',hard:'A sharp rival. Bring your quickest hands.'};
export function DifficultySelection({difficulty,change,back,start}:{difficulty:Difficulty;change:(value:Difficulty)=>void;back:()=>void;start:()=>void}){
 const swipe=useRef<number|null>(null),root=useRef<HTMLElement>(null);
 const move=(step:number)=>change(levels[(levels.indexOf(difficulty)+step+3)%3]);
 useEffect(()=>{root.current?.focus();},[]);
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.repeat||e.ctrlKey||e.metaKey||e.altKey)return;if(e.key==='Escape'){e.preventDefault();back();}if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(e.key==='ArrowRight'?1:-1);}if(e.key==='Enter'){e.preventDefault();start();}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[difficulty,change,back,start]);
 return <main ref={root} tabIndex={-1} className="front-screen difficulty-screen" aria-label="Difficulty selection"><Backdrop/>
  <header className="selection-heading"><h1>Difficulty</h1></header>
  <section className="difficulty-carousel" aria-label="AI difficulty" data-difficulty={difficulty} onPointerDown={e=>{swipe.current=e.clientX;}} onPointerUp={e=>{if(swipe.current!==null&&Math.abs(e.clientX-swipe.current)>35)move(e.clientX<swipe.current?1:-1);swipe.current=null;}} onPointerCancel={()=>{swipe.current=null;}}>
   <button className="carousel-arrow" aria-label="Previous difficulty" onClick={()=>move(-1)}><ControlKey label="ArrowLeft"/></button>
   <div className="difficulty-card" aria-live="polite"><ModeIcon mode="ai" decorative/><h2>{difficulty}</h2><p>{descriptions[difficulty]}</p><div className="difficulty-steps" aria-label={`${levels.indexOf(difficulty)+1} of 3`}>{levels.map(level=><button key={level} aria-label={`${level} difficulty`} aria-pressed={level===difficulty} onClick={()=>change(level)}><span/></button>)}</div></div>
   <button className="carousel-arrow" aria-label="Next difficulty" onClick={()=>move(1)}><ControlKey label="ArrowRight"/></button>
  </section>
  <footer className="selection-actions"><button className="front-link" aria-label="Back to characters" onClick={back}><KeyHint label="Esc"/>Back</button><button className="front-action" aria-label="Enter the garden" onClick={start}><KeyHint label="Enter"/>Battle</button></footer>
 </main>;
}
