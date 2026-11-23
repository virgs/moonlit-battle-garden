import { lazy, Suspense, useCallback, useEffect, useState, type ReactNode } from 'react';
import { Session } from '../game/Session';
import type { CharacterId, Difficulty } from '../game/types';
import { prepareAudio } from '../presentation/audioGesture';
import { ModeIcon } from './ModeIcon';
import { menuLabels } from './menuContent';
import { CharacterSelection } from './CharacterSelection';
import { FrontMenu, TitleScreen, type MenuPane } from './FrontScreens';
import { useGameInteraction } from './useGameInteraction';
import './presentation.css';
const OnlinePlay = lazy(() => import('./OnlinePlay').then(module => ({ default: module.OnlinePlay })));
const Game = lazy(() => import('./Game').then(module => ({ default: module.Game })));

export function App() {
  useGameInteraction();
  const [selecting,setSelecting]=useState(false);
  const [ready,setReady]=useState<[boolean,boolean]>([false,false]);
  const [session, setSession] = useState<Session | null>(null);
  const [title, setTitle] = useState(()=>!new URLSearchParams(location.search).has('join'));
  const [pane, setPane] = useState<MenuPane>(()=>new URLSearchParams(location.search).has('join')?'online':'ai');
  const [character, setCharacter] = useState<CharacterId>('champignon');
  const [opponent, setOpponent] = useState<CharacterId>('andromoss');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [sound, setSound] = useState(()=>{try{return localStorage.getItem('moonlit-sound')!=='off';}catch{return true;}});
  useEffect(()=>{try{localStorage.setItem('moonlit-sound',sound?'on':'off');}catch{/* Storage is optional. */}},[sound]);
  const enter = useCallback(()=>setTitle(false),[]);
  const choose = (next: MenuPane) => { if(pane==='online'&&next!=='online') history.replaceState(null,'',location.pathname);setPane(next); };
  const activate=(next:MenuPane)=>{choose(next);if(next==='ai'||next==='local'){setReady([false,false]);setSelecting(true);}};
  const start = () => {
    if((pane!=='ai'&&pane!=='local')||!ready.every(Boolean))return;
    if(sound)prepareAudio();
    const next = new Session({characters:[character,opponent],mode:pane,difficulty,seed:crypto.getRandomValues(new Uint32Array(1))[0]});
    if(sound)next.enableSound();setSelecting(false);setSession(next);
  };
  const menu = (content:ReactNode,pending=false) => <FrontMenu pending={pending} pane={pane} choose={choose} activate={activate} title={()=>{history.replaceState(null,'',location.pathname);setTitle(true);}}>{content}</FrontMenu>;
  if(title)return <TitleScreen enter={enter} />;
  if(session)return <Suspense fallback={<p className="development-note">Opening the garden…</p>}><Game session={session} leave={()=>{session.stop();setSound(!session.muted);setSession(null);}} /></Suspense>;
  if(selecting&&(pane==='ai'||pane==='local'))return <CharacterSelection mode={pane} slots={[
    {character,ready:ready[0],controlled:true,label:'Player 1'},
    {character:opponent,ready:ready[1],controlled:true,label:pane==='ai'?'Computer':'Player 2'},
  ]} pick={(id,value)=>{if(id===0)setCharacter(value);else setOpponent(value);setReady(previous=>id===0?[false,pane==='ai'?false:previous[1]]:[previous[0],false]);}}
    ready={(id,value)=>setReady(previous=>id===0?[value,pane==='ai'?false:previous[1]]:[previous[0],value])} back={()=>setSelecting(false)} start={start} difficulty={difficulty} changeDifficulty={setDifficulty} />;
  if(pane==='online')return <Suspense fallback={menu(<p role="status">Opening online gardens…</p>,true)}><OnlinePlay initialCharacter={character} sound={sound} changeCharacter={setCharacter} renderLobby={menu} leave={muted=>{if(typeof muted==='boolean')setSound(!muted);history.replaceState(null,'',location.pathname);setPane('ai');}} /></Suspense>;
  if(pane==='options')return menu(<><h2 className="mode-title"><ModeIcon mode="options" decorative />{menuLabels.options}</h2><label className="sound-option"><input type="checkbox" checked={sound} onChange={event=>setSound(event.target.checked)} />Enable sound and music</label><p className="front-note">You can also mute or unmute from the pause menu.</p></>);
  if(pane==='help')return menu(<><h2 className="mode-title"><ModeIcon mode="help" decorative />{menuLabels.help}</h2><div className="front-instructions"><h3>Whack with care</h3><p>Hit moles and stars. Avoid rabbits and empty holes. A lead of 100 points wins the round; first to two rounds wins the match.</p><h3>Spend your stars</h3><p>Collect up to four stars. Tap the star container or press your cast key to use the spell at that tier. Casting briefly freezes both boards.</p><h3>Your controls</h3><p>Solo or online: either layout controls your board.<br />QWE / ASD / ZXC. Magic: Tab.<br />Numbers or numpad: 789 / 456 / 123. Magic: numpad Enter.<br />Local two-player: letters for Player 1, numpad for Player 2.<br />Mouse or phone: tap the holes and stars.</p><h3>Take a breather</h3><p>Escape or the score bar opens the menu. Solo and local play pause; online play continues. Connection loss freezes the match while it reconnects.</p></div></>);
  return menu(<><h2 className="mode-title"><ModeIcon mode={pane} decorative />{menuLabels[pane]}</h2>
    <p className="front-note">{pane==='ai'?'Solo · Face a computer opponent. Choose your champions and difficulty.':'Local · Two players, one keyboard. Settle it in the garden.'}</p>
  </>);
}
