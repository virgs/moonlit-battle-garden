import { lazy, Suspense, useCallback, useEffect, useState, type ReactNode } from 'react';
import { Session } from '../game/Session';
import { characters } from '../game/config';
import type { CharacterId, Difficulty } from '../game/types';
import { prepareAudio } from '../presentation/audioGesture';
import { CharacterPicker, FrontMenu, TitleScreen, type MenuPane } from './FrontScreens';
import './presentation.css';
const OnlinePlay = lazy(() => import('./OnlinePlay').then(module => ({ default: module.OnlinePlay })));
const Game = lazy(() => import('./Game').then(module => ({ default: module.Game })));

export function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [title, setTitle] = useState(()=>!new URLSearchParams(location.search).has('join'));
  const [pane, setPane] = useState<MenuPane>(()=>new URLSearchParams(location.search).has('join')?'online':'ai');
  const [character, setCharacter] = useState<CharacterId>('champignon');
  const [opponent, setOpponent] = useState<CharacterId>('andy');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [sound, setSound] = useState(()=>{try{return localStorage.getItem('moonlit-sound')!=='off';}catch{return true;}});
  useEffect(()=>{try{localStorage.setItem('moonlit-sound',sound?'on':'off');}catch{/* Storage is optional. */}},[sound]);
  const enter = useCallback(()=>setTitle(false),[]);
  const choose = (next: MenuPane) => { if(pane==='online'&&next!=='online') history.replaceState(null,'',location.pathname);setPane(next); };
  const start = () => {
    if(pane!=='ai'&&pane!=='local')return;
    if(sound)prepareAudio();
    const next = new Session({characters:[character,opponent],mode:pane,difficulty,seed:crypto.getRandomValues(new Uint32Array(1))[0]});
    if(sound)next.enableSound();setSession(next);
  };
  const menu = (content:ReactNode) => <FrontMenu pane={pane} choose={choose} title={()=>{history.replaceState(null,'',location.pathname);setTitle(true);}}>{content}</FrontMenu>;
  if(title)return <TitleScreen enter={enter} />;
  if(session)return <Suspense fallback={<p className="development-note">Opening the garden…</p>}><Game session={session} leave={()=>{session.stop();setSound(!session.muted);setSession(null);}} /></Suspense>;
  if(pane==='online')return <Suspense fallback={menu(<p role="status">Opening online gardens…</p>)}><OnlinePlay initialCharacter={character} sound={sound} changeCharacter={setCharacter} renderLobby={menu} leave={muted=>{if(typeof muted==='boolean')setSound(!muted);history.replaceState(null,'',location.pathname);setPane('ai');}} /></Suspense>;
  if(pane==='options')return menu(<><p className="eyebrow">Make yourself at home</p><h2>Options</h2><label className="sound-option"><input type="checkbox" checked={sound} onChange={event=>setSound(event.target.checked)} />Enable sound and music</label><p className="front-note">You can also mute or unmute from the pause menu.</p></>);
  if(pane==='help')return menu(<><p className="eyebrow">Quick hands. A little magic.</p><h2>How to play</h2><div className="front-instructions"><h3>Whack with care</h3><p>Hit moles and stars. Avoid rabbits and empty holes. A lead of 100 points wins the round; first to two rounds wins the match.</p><h3>Spend your stars</h3><p>Collect up to four stars. Tap the star container or press your cast key to use the spell at that tier. Casting briefly freezes both boards.</p><h3>Your controls</h3><p>Player 1: QWE / ASD / ZXC. Magic: R.<br />Player 2: numpad 789 / 456 / 123. Magic: numpad +.<br />Mouse or phone: tap the holes and stars.</p><h3>Take a breather</h3><p>Escape or the score bar opens the menu. Solo and local play pause; online play continues. Connection loss freezes the match while it reconnects.</p></div></>);
  return menu(<><p className="eyebrow">{pane==='ai'?'Versus computer':'Share a keyboard'}</p><h2>Choose your champion</h2>
    <CharacterPicker character={character} change={id=>{setCharacter(id);setOpponent(id==='andy'?'champignon':'andy');}} />
    <ol className="selection-spells" aria-label={`${characters[character].name} magic`}>{characters[character].spells.map((spell,index)=><li key={spell.name}><span>{index+1}</span>{spell.name}</li>)}</ol>
    <div className="front-settings"><label>{pane==='local'?'Player 2':'Opponent'}<select aria-label={pane==='local'?'Player 2 character':'Opponent'} value={opponent} onChange={event=>setOpponent(event.target.value as CharacterId)}>{Object.entries(characters).map(([id,data])=><option key={id} value={id}>{data.name}</option>)}</select></label>{pane==='ai'&&<label>Difficulty<select value={difficulty} onChange={event=>setDifficulty(event.target.value as Difficulty)}><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option></select></label>}</div>
    <button className="front-action" onClick={start}>Enter the garden</button>
  </>);
}
