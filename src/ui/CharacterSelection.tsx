import { useEffect, useRef, useState, type ReactNode } from 'react';
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
import { DifficultyCarousel } from './DifficultyCarousel';

export type CarouselSlot = { character:CharacterId|null; ready:boolean; controlled:boolean; canConfirm?:boolean; label:string };
const roster=Object.keys(characters) as CharacterId[];
export function CharacterSelection({ mode, slots, pick, ready, back, start, difficulty, changeDifficulty, footer, status }: {
  mode:'ai'|'local'|'online'; slots:[CarouselSlot,CarouselSlot]; pick:(id:PlayerId,character:CharacterId)=>void; ready:(id:PlayerId,value:boolean)=>void;
  back:()=>void; start?:()=>void; difficulty?:Difficulty; changeDifficulty?:(difficulty:Difficulty)=>void; footer?:ReactNode; status?:string;
}) {
  const root=useRef<HTMLElement>(null),[activeSide,setActiveSide]=useState<PlayerId>(0);
  const step=mode==='ai'?(!slots[0].ready?0:!slots[1].ready?1:2):activeSide;
  const available=(id:PlayerId)=>slots[id].controlled&&(mode!=='ai'||id===0||slots[0].ready);
  const setReady=(id:PlayerId,value:boolean)=>{ready(id,value);if(mode==='local'&&value&&!slots[id===0?1:0].ready)setActiveSide(id===0?1:0);};
  const goBack=()=>{if(mode==='ai'&&step>0)ready(step===2?1:0,false);else back();};
  const confirm=()=>{
    if(start&&slots.every(slot=>slot.ready)){start();return;}
    const id=(step===2?0:step) as PlayerId,slot=slots[id];
    if(available(id)&&slot.character&&slot.canConfirm!==false&&!slot.ready)setReady(id,true);
  };
  const move=(delta:number)=>{
    if(mode==='ai'&&step===2&&difficulty){const levels:Difficulty[]=['easy','medium','hard'];changeDifficulty?.(levels[(levels.indexOf(difficulty)+delta+3)%3]);return;}
    const id=step as PlayerId,slot=slots[id];if(!available(id)||slot.ready||!slot.character)return;pick(id,roster[(roster.indexOf(slot.character)+delta+roster.length)%roster.length]);
  };
  useEffect(()=>{
    if(mode==='ai')root.current?.querySelector(step===2?'.difficulty-carousel':`.carousel-side-${step}`)?.scrollIntoView({block:'nearest'});
  },[mode,step]);
  useEffect(()=>{
    const key=(event:KeyboardEvent)=>{
      if(event.repeat||event.ctrlKey||event.metaKey||event.altKey)return;
      if(event.key==='Escape'){event.preventDefault();goBack();return;}
      if(event.target instanceof HTMLSelectElement||event.target instanceof HTMLInputElement)return;
      const id=event.code==='KeyR'?0:event.code==='NumpadAdd'||event.key==='+'?1:null;
      if(id!==null){if((mode!=='ai'||step===id)&&available(id)&&slots[id].character&&slots[id].canConfirm!==false){event.preventDefault();setReady(id,!slots[id].ready);}return;}
      if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();move(event.key==='ArrowRight'?1:-1);}
      if(event.key==='Enter'){event.preventDefault();confirm();}
    };
    window.addEventListener('keydown',key);return ()=>window.removeEventListener('keydown',key);
  });
  const canConfirm=start&&slots.every(slot=>slot.ready)||available((step===2?0:step) as PlayerId)&&slots[(step===2?0:step)].canConfirm!==false&&!slots[(step===2?0:step)].ready;
  return <main ref={root} className={`front-screen selection-screen selection-${mode}`} aria-label="Character selection" data-step={mode==='ai'?['player','opponent','difficulty'][step]:'characters'}><Backdrop />
    <header className="selection-heading"><h1><ModeIcon mode={mode} decorative /><span>{menuLabels[mode]}</span></h1></header>
    <div className="selection-carousels">{slots.map((slot,id)=><Carousel key={id} slot={slot} id={id as PlayerId} available={available(id as PlayerId)} activate={()=>{if(mode==='local')setActiveSide(id as PlayerId);}} pick={character=>pick(id as PlayerId,character)} ready={value=>setReady(id as PlayerId,value)} difficultySlot={mode==='ai'} difficulty={id===1?difficulty:undefined} changeDifficulty={changeDifficulty}/>)}</div>
    <footer className="selection-footer">
      {status&&<p className="selection-status" role="status">{status}</p>}{footer}
      <div className="selection-actions"><button className="front-link" aria-label="Back to menu" onClick={goBack}><KeyHint label="Esc"/>Back</button>
        <button className="front-action" disabled={!canConfirm} aria-label={start&&slots.every(slot=>slot.ready)?'Enter the garden':'Confirm selection'} onClick={confirm}><KeyHint label="Enter"/>Confirm</button>
      </div>
    </footer>
  </main>;
}

function Carousel({slot,id,available,activate,pick,ready,difficultySlot,difficulty,changeDifficulty}:{slot:CarouselSlot;id:PlayerId;available:boolean;activate:()=>void;pick:(character:CharacterId)=>void;ready:(value:boolean)=>void;difficultySlot:boolean;difficulty?:Difficulty;changeDifficulty?:(value:Difficulty)=>void}) {
  const swipe=useRef<number|null>(null);
  const move=(step:number)=>{if(!available||slot.ready||!slot.character)return;pick(roster[(roster.indexOf(slot.character)+step+roster.length)%roster.length]);};
  return <section className={`character-carousel carousel-side-${id}`} aria-label={`${slot.label} character`} data-character={slot.character??'waiting'} data-ready={slot.ready} data-controlled={slot.controlled} data-available={available} onPointerDown={activate}>
    <div className="carousel-player" aria-hidden="true" />
    <div className="carousel-stage" onPointerDown={event=>{if(event.button===0)swipe.current=event.clientX;}} onPointerUp={event=>{if(swipe.current!==null&&Math.abs(event.clientX-swipe.current)>35)move(event.clientX<swipe.current?1:-1);swipe.current=null;}} onPointerCancel={()=>{swipe.current=null;}}>
      <button className="carousel-arrow" aria-label={`Previous character for ${slot.label}`} disabled={!available||slot.ready||!slot.character} onClick={()=>move(-1)}><span aria-hidden="true"><ControlKey label="ArrowLeft" /></span></button>
      <div className="carousel-art" key={`${slot.character}-${slot.ready}`} data-animation={slot.ready?'victory':'idle'}>{slot.character ? slot.ready ? <VictoryHero character={slot.character} loop={false} /> : <StandingHero character={slot.character} /> : <div className="carousel-placeholder" aria-hidden="true" />}{slot.ready&&slot.character&&<span className="selected-stamp">Selected</span>}</div>
      <button className="carousel-arrow" aria-label={`Next character for ${slot.label}`} disabled={!available||slot.ready||!slot.character} onClick={()=>move(1)}><span aria-hidden="true"><ControlKey label="ArrowRight" /></span></button>
    </div>
    <h3 className="carousel-name">{slot.character?characters[slot.character].name:'—'}</h3>
    <p className="carousel-position">{slot.character?`${roster.indexOf(slot.character)+1} / ${roster.length}`:'—'}</p>
    <ol className="carousel-spells" aria-label={`${slot.label} magic`}>{slot.character?characters[slot.character].spells.map((spell,tier)=><li key={spell.name} aria-label={`${tier+1} ${tier?'stars':'star'}: ${spell.name}`}><SpellStars count={tier+1} />{spell.name}</li>):[1,2,3,4].map(tier=><li key={tier} className="spell-placeholder"><SpellStars count={tier} /><i /></li>)}</ol>
    {slot.controlled&&slot.character?<button className="carousel-confirm front-action" disabled={!available||slot.canConfirm===false} aria-label={slot.ready?`Change selection for ${slot.label}`:`Confirm ${slot.label}`} aria-pressed={slot.ready} onClick={()=>ready(!slot.ready)}><KeyHint label={id===0?'R':'+'} />{slot.ready?'Change':'Choose'}</button>:<div className="carousel-action-space" aria-hidden="true" />}
    {difficultySlot&&<div className="carousel-difficulty-slot">{id===1&&slot.ready&&difficulty&&<DifficultyCarousel difficulty={difficulty} change={value=>changeDifficulty?.(value)}/>}</div>}
  </section>;
}
