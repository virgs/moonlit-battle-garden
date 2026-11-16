import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { PeerRoom } from '../network/PeerRoom';
import type { Session } from '../game/Session';
import { characters } from '../game/config';
import type { CharacterId } from '../game/types';
import './online.css';
const Game = lazy(() => import('./Game').then(module => ({ default: module.Game })));

export function OnlinePlay({ initialCharacter, leave }: { initialCharacter: CharacterId; leave: () => void }) {
  const [character, setCharacter] = useState(initialCharacter);
  const [code, setCode] = useState(() => new URLSearchParams(location.search).get('join') ?? '');
  const [invite, setInvite] = useState('');
  const [status, setStatus] = useState('Create a garden or join a friend’s invite.');
  const [busy, setBusy] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const room = useRef<PeerRoom | null>(null);
  useEffect(() => () => room.current?.dispose(), []);
  const begin = (host: string | null) => {
    room.current?.dispose(); setInvite(''); setBusy(true); setStatus('Connecting…');
    try {
      room.current = new PeerRoom(character, host, {
        invite: id => { if (!host) { const url = new URL(location.href); url.search = ''; url.hash = ''; url.searchParams.set('join', id); setInvite(url.toString()); } },
        status: setStatus, start: setSession,
      });
    } catch { setStatus('Could not open a connection. Check your network settings and try again.'); setBusy(false); }
  };
  const join = () => {
    let host = code.trim();
    try { host = new URL(host).searchParams.get('join') ?? ''; } catch { /* a plain room ID */ }
    if (!/^[a-zA-Z0-9_-]{1,100}$/.test(host)) { setStatus('Paste a valid garden invite link or room ID.'); return; }
    begin(host);
  };
  if (session) return <Suspense fallback={<p className="development-note">Opening the garden…</p>}><Game session={session} leave={() => { session.stop(); leave(); }} /></Suspense>;
  return <main className="online-lobby">
    <button className="text-button" onClick={leave}>← Back to setup</button>
    <span className="eyebrow">A garden for two</span><h1>Invite a rival.</h1>
    <label>Your character<select aria-label="Your character" disabled={busy} value={character} onChange={event => setCharacter(event.target.value as CharacterId)}>{Object.entries(characters).map(([id, data]) => <option key={id} value={id}>{data.name}</option>)}</select></label>
    <button className="primary-button" disabled={busy} onClick={() => begin(null)}>Create online garden</button>
    <label>Friend’s invite<input aria-label="Friend’s invite" disabled={busy} value={code} onChange={event => setCode(event.target.value)} placeholder="Paste an invite link or room ID" /></label>
    <button className="primary-button" disabled={busy || !code.trim()} onClick={join}>Join garden</button>
    {invite && <label>Share this invite<input aria-label="Share this invite" readOnly value={invite} onFocus={event => event.target.select()} /><button className="text-button" onClick={() => { void navigator.clipboard?.writeText(invite).then(() => setStatus('Invite copied. Waiting for your opponent…')).catch(() => setStatus('Select the invite above to copy it.')); }}>Copy invite</button></label>}
    <p role="status">{status}</p>
    {busy && <button className="text-button" onClick={() => { room.current?.dispose(); room.current = null; setBusy(false); setInvite(''); setStatus('Create a garden or join a friend’s invite.'); }}>Cancel / try again</button>}
    <p className="online-note">The creator hosts the match. Keep both games open; closing the host ends play. Brief interruptions pause the match while reconnecting.</p>
  </main>;
}
