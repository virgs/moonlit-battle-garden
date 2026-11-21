import { useEffect, useRef, type ReactNode, type KeyboardEvent } from 'react';
import { ModeIcon } from './ModeIcon';
import { KeyHint } from './ControlKey';
import { menuLabels } from './menuContent';
import { assetUrl } from '../assets/url';
import { characters } from '../game/config';
import type { CharacterId } from '../game/types';
import { Portrait } from './Portrait';
import './front-screens.css';

export type MenuPane = 'ai' | 'local' | 'online' | 'options' | 'help';
const choices: { id: MenuPane; label: string }[] = [
  { id:'ai', label:menuLabels.ai }, { id:'local', label:menuLabels.local },
  { id:'online', label:menuLabels.online }, { id:'options', label:menuLabels.options }, { id:'help', label:menuLabels.help },
];
export function Backdrop() { return <img className="front-backdrop" src={assetUrl('/assets/background-castle.png')} alt="" aria-hidden="true" />; }

export function TitleScreen({ enter }: { enter: () => void }) {
  useEffect(() => {
    const key = (event: globalThis.KeyboardEvent) => {
      if (event.repeat || event.ctrlKey || event.metaKey || event.altKey || ['Tab','Escape','Shift','Control','Alt','Meta'].includes(event.key)) return;
      event.preventDefault(); enter();
    };
    window.addEventListener('keydown',key); return () => window.removeEventListener('keydown',key);
  }, [enter]);
  return <main className="front-screen title-screen" aria-label="Title screen"><Backdrop />
    <div className="title-wordmark"><h1>Moonlit<span>Battle Garden</span></h1></div>
    <button className="title-enter" aria-label="Open main menu" onClick={enter}>Press any key or tap</button>
  </main>;
}

export function FrontMenu({ pane, choose, activate, title, children }: { pane: MenuPane; choose: (pane: MenuPane) => void; activate: (pane: MenuPane) => void; title: () => void; children: ReactNode }) {
  const nav = useRef<HTMLElement>(null), panel = useRef<HTMLElement>(null);
  useEffect(() => { nav.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')?.focus({ preventScroll:true }); }, []);
  const navigate = (event: KeyboardEvent<HTMLElement>) => {
    const index = choices.findIndex(choice => choice.id === pane);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); const next = (index+(event.key === 'ArrowDown' ? 1 : -1)+choices.length)%choices.length;
      choose(choices[next].id); nav.current?.querySelectorAll('button')[next]?.focus();
    }
    if (event.key === 'ArrowRight') { event.preventDefault(); panel.current?.querySelector<HTMLElement>('button:not(:disabled),input:not(:disabled),select:not(:disabled)')?.focus(); }
  };
  return <main className="front-screen front-menu" aria-label="Main menu" onKeyDown={event => { if(event.key==='Escape') { event.preventDefault();title(); } }}><Backdrop />
    <header className="front-heading"><a href={import.meta.env.BASE_URL} aria-label="Moonlit Battle Garden home">Moonlit <span>Battle Garden</span></a></header>
    <div className="front-content">
      <nav ref={nav} className="front-nav" aria-label="Game mode" onKeyDown={navigate}>{choices.map(choice => <button key={choice.id} aria-pressed={pane===choice.id} onClick={()=>activate(choice.id)}><ModeIcon mode={choice.id} decorative /><span>{choice.label}</span><KeyHint label="Enter" /></button>)}</nav>
      <section ref={panel} className="front-panel" aria-label="Game setup" key={pane}>{children}</section>
    </div>
    <footer className="front-footer"><button aria-label="Back to title" onClick={title}><KeyHint label="Esc" />Back to title</button></footer>
  </main>;
}

export function CharacterPicker({ character, change, disabled=false }: { character: CharacterId; change: (id: CharacterId) => void; disabled?: boolean }) {
  return <div className="character-selection" role="group" aria-label="Your character"><div className="character-options">{(Object.keys(characters) as CharacterId[]).map(id => <button key={id} disabled={disabled} className={`character-card ${id} ${character===id?'selected':''}`} aria-pressed={character===id} onClick={()=>change(id)}>
    <span className="character-emblem"><Portrait character={id} /></span><strong>{characters[id].name}</strong><small>{characters[id].role}</small>
  </button>)}</div></div>;
}
