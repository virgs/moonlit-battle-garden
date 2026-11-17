import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { PeerRoom } from '../network/PeerRoom';
import type { Session } from '../game/Session';
import { ModeIcon } from './ModeIcon';
import { KeyHint } from './ControlKey';
import { menuLabels } from './menuContent';
import { CharacterSelection } from './CharacterSelection';
import type { SelectionView } from '../network/selection';
import type { CharacterId } from '../game/types';
import './online.css';
import { prepareAudio, discardPrimedMusic } from '../presentation/audioGesture';
const Game = lazy(() => import('./Game').then(module => ({ default: module.Game })));

export function OnlinePlay({ initialCharacter, leave, renderLobby, sound, changeCharacter }: { initialCharacter: CharacterId; leave: (muted?: boolean) => void; renderLobby: (content:ReactNode) => ReactNode; sound: boolean; changeCharacter: (character:CharacterId) => void }) {
  const [selecting,setSelecting]=useState(false);
  const [selection,setSelection]=useState<SelectionView|null>(null);
  const [character, setCharacter] = useState(initialCharacter);
  const [code, setCode] = useState(() => new URLSearchParams(location.search).get('join') ?? '');
  const [invite, setInvite] = useState('');
  const [status, setStatus] = useState('Create a garden or join a friend’s invite.');
  const [busy, setBusy] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const room = useRef<PeerRoom | null>(null);
  useEffect(() => () => { room.current?.dispose(); discardPrimedMusic(); }, []);
  const begin = (host: string | null) => {
    room.current?.dispose(); if(sound)prepareAudio(); setInvite('');setSelecting(true);setSelection(null); setBusy(true); setStatus('Connecting…');
    try {
      room.current = new PeerRoom(character, host, {
        invite: id => { if (!host) { const url = new URL(location.href); url.search = ''; url.hash = ''; url.searchParams.set('join', id); setInvite(url.toString()); } },
        selection:setSelection, status: setStatus, start: next => { if(sound)next.enableSound(); setSession(next); },
      });
    } catch { setStatus('Could not open a connection. Check your network settings and try again.'); setBusy(false); }
  };
  const join = () => {
    let host = code.trim();
    try { host = new URL(host).searchParams.get('join') ?? ''; } catch { /* a plain room ID */ }
    if (!/^[a-zA-Z0-9_-]{1,100}$/.test(host)) { setStatus('Paste a valid garden invite link or room ID.'); return; }
    begin(host);
  };
  if (session) return <Suspense fallback={<p className="development-note">Opening the garden…</p>}><Game session={session} leave={() => { session.stop(); leave(session.muted); }} /></Suspense>;
  const cancel=()=>{room.current?.dispose();room.current=null;discardPrimedMusic();setBusy(false);setInvite('');setSelecting(false);setSelection(null);setStatus('Create a garden or join a friend’s invite.');};
  const share=invite&&!selection?.connected&&<div className="selection-share"><label>Share this invite<input aria-label="Share this invite" readOnly value={invite} onFocus={event=>event.target.select()} /></label><button className="front-link" onClick={async()=>{try{if(!navigator.clipboard)throw new Error();await navigator.clipboard.writeText(invite);setStatus('Invite copied. Waiting for your opponent…');}catch{setStatus('Select the invite above to copy it.');}}}><KeyHint label="Enter" />Copy invite</button></div>;
  if(selecting)return <CharacterSelection mode="online" slots={[
    {character:selection?.players[0].character??character,ready:selection?.players[0].ready??false,controlled:true,canConfirm:!!selection?.connected,label:'You'},
    {character:selection?.players[1]?.character??null,ready:selection?.players[1]?.ready??false,controlled:false,label:'Rival'},
  ]} pick={(_id,value)=>{setCharacter(value);changeCharacter(value);room.current?.select(value,false);}} ready={(_id,value)=>{if(value&&sound)prepareAudio();room.current?.select(character,value);}} back={cancel} footer={share} status={selection?.connected?(selection.players.every(pick=>pick?.ready)?'Starting…':undefined):status} />;
  return renderLobby(<div className="online-lobby">
    <h2 className="mode-title"><ModeIcon mode="online" decorative />{menuLabels.online}</h2>
    <p className="front-note">Online · Invite a friend to a private garden.</p>
    <button className="front-action" disabled={busy} onClick={()=>begin(null)}><KeyHint label="Enter" />Create online garden</button>
    <label>Friend’s invite<input aria-label="Friend’s invite" disabled={busy} value={code} onKeyDown={event=>{if(event.key==='Enter'&&!event.repeat&&!busy&&code.trim()){event.preventDefault();join();}}} onChange={event=>setCode(event.target.value)} placeholder="Paste an invite link or room ID" /></label>
    <button className="front-action" disabled={busy||!code.trim()} onClick={join}><KeyHint label="Enter" />Join garden</button>
    {status!=='Create a garden or join a friend’s invite.'&&<p role="status">{status}</p>}
    <p className="online-note">The creator hosts the match. Keep both games open; closing the host ends play.</p>
  </div>);
}
