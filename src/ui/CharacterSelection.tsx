import { useEffect, useRef, type ReactNode } from 'react';
import { ModeIcon } from './ModeIcon';
import { SpellStars } from './LegacyRewards';
import { KeyHint, ControlKey } from './ControlKey';
import { menuLabels } from './menuContent';
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
  useEffect(()=>{
    // A confirmation can disable the focused arrow; shortcuts still work from body focus.
    const key=(event:KeyboardEvent)=>{
      if(event.repeat||event.ctrlKey||event.metaKey||event.altKey)return;
      if(event.key==='Escape'){event.preventDefault();back();return;}
      if(event.target instanceof HTMLSelectElement||event.target instanceof HTMLInputElement)return;
      const id=event.code==='KeyR'?0:event.code==='NumpadAdd'||event.key==='+'?1:null;
      if(id!==null&&slots[id].controlled&&slots[id].character&&slots[id].canConfirm!==false){event.preventDefault();ready(id,!slots[id].ready);return;}
      if(event.key==='Enter'&&start&&slots.every(slot=>slot.ready)){event.preventDefault();start();}
    };
    window.addEventListener('keydown',key);return ()=>window.removeEventListener('keydown',key);
  },[slots,ready,back,start]);
  return <main ref={root} className={`front-screen selection-screen selection-${mode}`} aria-label="Character selection"><Backdrop />
    <header className="selection-heading"><h1><ModeIcon mode={mode} decorative /><span>{menuLabels[mode]}</span></h1></header>
    <div className="selection-carousels">{slots.map((slot,id)=><Carousel key={id} slot={slot} id={id as PlayerId} pick={character=>pick(id as PlayerId,character)} ready={value=>ready(id as PlayerId,value)} />)}</div>
    <footer className="selection-footer">
      {status&&<p role="status" className="selection-status">{status}</p>}
      {footer}
      <div className="selection-actions"><button className="front-link" aria-label="Back to menu" onClick={back}><KeyHint label="Esc" />Back</button>
        {mode==='ai'&&<label>Difficulty<select aria-label="Difficulty" value={difficulty} onChange={event=>changeDifficulty?.(event.target.value as Difficulty)}><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option></select></label>}
        {start&&<button className="front-action" disabled={!slots.every(slot=>slot.ready)} aria-label="Enter the garden" onClick={start}><KeyHint label="Enter" />Battle</button>}
      </div>
    </footer>
  </main>;
}
function Carousel({slot,id,pick,ready}:{slot:CarouselSlot;id:PlayerId;pick:(character:CharacterId)=>void;ready:(value:boolean)=>void}) {
  const swipe=useRef<number|null>(null);
  const move=(step:number)=>{if(!slot.controlled||slot.ready||!slot.character)return;pick(roster[(roster.indexOf(slot.character)+step+roster.length)%roster.length]);};
  return <section className={`character-carousel carousel-side-${id}`} aria-label={`${slot.label} character`} data-character={slot.character??'waiting'} data-ready={slot.ready} data-controlled={slot.controlled} tabIndex={0}
    onKeyDown={event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();move(event.key==='ArrowRight'?1:-1);}}}>
    <div className="carousel-player"><span className={`carousel-state ${slot.ready?'is-ready':''}`}>{slot.ready?'Ready':''}</span></div>
    <div className="carousel-stage" onPointerDown={event=>{if(event.button===0)swipe.current=event.clientX;}} onPointerUp={event=>{if(swipe.current!==null&&Math.abs(event.clientX-swipe.current)>35)move(event.clientX<swipe.current?1:-1);swipe.current=null;}} onPointerCancel={()=>{swipe.current=null;}}>
      <button className="carousel-arrow" aria-label={`Previous character for ${slot.label}`} disabled={!slot.controlled||slot.ready||!slot.character} onClick={()=>move(-1)}><span aria-hidden="true"><ControlKey label="ArrowLeft" /></span></button>
      <div className="carousel-art" key={`${slot.character}-${slot.ready}`} data-animation={slot.ready?'victory':'idle'}>{slot.character ? slot.ready ? <VictoryHero character={slot.character} loop={false} /> : <StandingHero character={slot.character} /> : <div className="carousel-placeholder" aria-hidden="true" />}</div>
      <button className="carousel-arrow" aria-label={`Next character for ${slot.label}`} disabled={!slot.controlled||slot.ready||!slot.character} onClick={()=>move(1)}><span aria-hidden="true"><ControlKey label="ArrowRight" /></span></button>
    </div>
    <h3 className="carousel-name">{slot.character?characters[slot.character].name:'—'}</h3>
    <p className="carousel-position">{slot.character?`${roster.indexOf(slot.character)+1} / ${roster.length}`:'—'}</p>
    <ol className="carousel-spells" aria-label={`${slot.label} magic`}>{slot.character?characters[slot.character].spells.map((spell,tier)=><li key={spell.name} aria-label={`${tier+1} ${tier?'stars':'star'}: ${spell.name}`}><SpellStars count={tier+1} />{spell.name}</li>):[1,2,3,4].map(tier=><li key={tier} className="spell-placeholder"><SpellStars count={tier} /><i /></li>)}</ol>
    {slot.controlled&&slot.character?<button className="carousel-confirm front-action" disabled={slot.canConfirm===false} aria-label={slot.ready?`Change selection for ${slot.label}`:`Confirm ${slot.label}`} aria-pressed={slot.ready} onClick={()=>ready(!slot.ready)}><KeyHint label={id===0?'R':'+'} />{slot.ready?'Change':'Choose'}</button>:<div className="carousel-action-space" aria-hidden="true" />}
  </section>;
}
