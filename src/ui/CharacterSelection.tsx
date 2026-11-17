import { useEffect, useRef, type ReactNode } from 'react';
import { characters } from '../game/config';
import type { CharacterId, Difficulty, PlayerId } from '../game/types';
import { Backdrop } from './FrontScreens';
import { StandingHero } from './StandingHero';
import { VictoryHero } from './VictoryHero';
import './character-selection.css';

export type CarouselSlot = { character:CharacterId|null; ready:boolean; controlled:boolean; canConfirm?:boolean; label:string };
const roster=Object.keys(characters) as CharacterId[];
export function CharacterSelection({ mode, slots, pick, ready, back, start, difficulty, changeDifficulty, footer, status }: {
  mode:'ai'|'local'|'online'; slots:[CarouselSlot,CarouselSlot]; pick:(id:PlayerId,character:CharacterId)=>void; ready:(id:PlayerId,value:boolean)=>void;
  back:()=>void; start?:()=>void; difficulty?:Difficulty; changeDifficulty?:(difficulty:Difficulty)=>void; footer?:ReactNode; status?:string;
}) {
  const root=useRef<HTMLElement>(null);
  useEffect(()=>{root.current?.querySelector<HTMLButtonElement>('.carousel-confirm:not(:disabled)')?.focus({preventScroll:true});},[]);
  return <main ref={root} className={`front-screen selection-screen selection-${mode}`} aria-label="Character selection" onKeyDown={event=>{if(event.key==='Escape'){event.preventDefault();back();}}}><Backdrop />
    <header className="selection-heading"><p className="eyebrow">{mode==='ai'?'Versus computer':mode==='local'?'Local two player':'Online rival'}</p><h1>Choose your champions</h1></header>
    <div className="selection-carousels">{slots.map((slot,id)=><Carousel key={id} slot={slot} id={id as PlayerId} pick={character=>pick(id as PlayerId,character)} ready={value=>ready(id as PlayerId,value)} />)}</div>
    <footer className="selection-footer">
      {status&&<p role="status" className="selection-status">{status}</p>}
      {footer}
      <div className="selection-actions"><button className="front-link" onClick={back}>Back to menu</button>
        {mode==='ai'&&<label>Difficulty<select aria-label="Difficulty" value={difficulty} onChange={event=>changeDifficulty?.(event.target.value as Difficulty)}><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option></select></label>}
        {start&&<button className="front-action" disabled={!slots.every(slot=>slot.ready)} onClick={start}>Enter the garden</button>}
      </div>
    </footer>
  </main>;
}
function Carousel({slot,id,pick,ready}:{slot:CarouselSlot;id:PlayerId;pick:(character:CharacterId)=>void;ready:(value:boolean)=>void}) {
  const swipe=useRef<number|null>(null);
  const move=(step:number)=>{if(!slot.controlled||slot.ready||!slot.character)return;pick(roster[(roster.indexOf(slot.character)+step+roster.length)%roster.length]);};
  return <section className={`character-carousel carousel-side-${id}`} aria-label={`${slot.label} character`} data-character={slot.character??'waiting'} data-ready={slot.ready} data-controlled={slot.controlled} tabIndex={0}
    onKeyDown={event=>{if(event.target!==event.currentTarget)return;if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();move(event.key==='ArrowRight'?1:-1);}if(event.key==='Enter'&&slot.controlled&&slot.canConfirm!==false&&slot.character){event.preventDefault();ready(!slot.ready);}}}>
    <div className="carousel-player"><h2>{slot.label}</h2><span className={`carousel-state ${slot.ready?'is-ready':''}`}>{slot.ready?'Ready':slot.character?'Choosing…':'Waiting for rival…'}</span></div>
    <div className="carousel-stage" onPointerDown={event=>{if(event.button===0)swipe.current=event.clientX;}} onPointerUp={event=>{if(swipe.current!==null&&Math.abs(event.clientX-swipe.current)>35)move(event.clientX<swipe.current?1:-1);swipe.current=null;}} onPointerCancel={()=>{swipe.current=null;}}>
      <button className="carousel-arrow" aria-label={`Previous character for ${slot.label}`} disabled={!slot.controlled||slot.ready||!slot.character} onClick={()=>move(-1)}>‹</button>
      <div className="carousel-art" key={`${slot.character}-${slot.ready}`} data-animation={slot.ready?'victory':'idle'}>{slot.character ? slot.ready ? <VictoryHero character={slot.character} loop={false} /> : <StandingHero character={slot.character} /> : <div className="carousel-placeholder" aria-hidden="true" />}</div>
      <button className="carousel-arrow" aria-label={`Next character for ${slot.label}`} disabled={!slot.controlled||slot.ready||!slot.character} onClick={()=>move(1)}>›</button>
    </div>
    <h3 className="carousel-name">{slot.character?characters[slot.character].name:'Your rival'}</h3>
    <p className="carousel-position">{slot.character?`${roster.indexOf(slot.character)+1} / ${roster.length}`:'—'}</p>
    <ol className="carousel-spells" aria-label={`${slot.label} magic`}>{slot.character?characters[slot.character].spells.map((spell,tier)=><li key={spell.name}><span>{tier+1}</span>{spell.name}</li>):[1,2,3,4].map(tier=><li key={tier} className="spell-placeholder"><span>{tier}</span><i /></li>)}</ol>
    {slot.controlled&&slot.character?<button className="carousel-confirm front-action" disabled={slot.canConfirm===false} aria-label={slot.ready?`Change selection for ${slot.label}`:`Confirm ${slot.label}`} aria-pressed={slot.ready} onClick={()=>ready(!slot.ready)}>{slot.ready?'Change selection':'Choose'}</button>:<p className="carousel-remote-note">{slot.ready?'Your rival is ready':slot.character?'Your rival is choosing here':'Their choice will appear here'}</p>}
  </section>;
}
