import { useEffect, useState, useSyncExternalStore, type CSSProperties } from 'react';
import type { Session } from '../game/Session';
import { createArenaLayout } from '../render/layout';
import { ArenaCanvas } from './ArenaCanvas';
import { Board } from './Board';
import { ScoreBar } from './ScoreBar';
import { CastOverlay } from './CastOverlay';
import { Trophy } from './LegacyRewards';
import './match.css';

export function Game({ session, leave }: { session: Session; leave: () => void }) {
  const snapshot = useSyncExternalStore(session.subscribe, session.getSnapshot);
  const [layout, setLayout] = useState(() => createArenaLayout(window.innerWidth, window.innerHeight, session.match.options.mode));
  const { state } = snapshot;
  const online = session.match.options.mode === 'online';
  const [menuOpen, setMenuOpen] = useState(false);
  const openControls = () => online ? setMenuOpen(value => !value) : session.togglePause();
  const finished = state.phase === 'round-over' || state.phase === 'match-over';
  const link = snapshot.network;
  const disconnected = link && link.status !== 'connected';
  useEffect(() => {
    session.start();
    const map = ['KeyQ', 'KeyW', 'KeyE', 'KeyA', 'KeyS', 'KeyD', 'KeyZ', 'KeyX', 'KeyC'];
    const numpad = ['Numpad7', 'Numpad8', 'Numpad9', 'Numpad4', 'Numpad5', 'Numpad6', 'Numpad1', 'Numpad2', 'Numpad3'];
    const keyboard = (event: KeyboardEvent) => {
      if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.code === 'Escape') { if (session.match.options.mode === 'online') setMenuOpen(value => !value); else session.togglePause(); return; }
      for (const id of [0, 1] as const) {
        if (id === 1 && session.match.options.mode !== 'local') continue;
        const hole = (id === 0 ? map : numpad).indexOf(event.code);
        if (hole >= 0) { event.preventDefault(); session.act({ type: 'hit', player: id, hole }); }
        if (event.code === (id === 0 ? 'KeyR' : 'NumpadAdd')) { event.preventDefault(); session.act({ type: 'cast', player: id }); }
      }
    };
    const visibility = () => { if (session.match.options.mode !== 'online' && document.hidden && !session.match.state.paused) session.togglePause(); };
    window.addEventListener('keydown', keyboard);
    document.addEventListener('visibilitychange', visibility);
    return () => { session.stop(); window.removeEventListener('keydown', keyboard); document.removeEventListener('visibilitychange', visibility); };
  }, [session]);

  return <main className={`match-screen ${layout.single ? 'single-board' : 'two-boards'} ${layout.landscape ? 'landscape-board' : ''} ${session.match.options.mode}`} style={{ '--score-bottom': `${layout.score.y + layout.score.height + 8}px` } as CSSProperties} aria-label="Battle arena" data-home-character={session.home.owner} data-round={state.round} data-phase={state.phase} data-time={state.time}>
    <ArenaCanvas session={session} snapshot={snapshot} layout={layout} onLayout={setLayout} />
    <ScoreBar state={state} area={layout.score} onPause={disconnected || finished ? undefined : openControls} controlLabel={online ? 'Game menu' : undefined} />
    <div className="match-hud">
      {layout.gardens.map(garden => <Board key={garden.id} session={session} snapshot={snapshot} garden={garden} />)}
      {layout.gardens.map(garden => <CastOverlay key={garden.id} snapshot={snapshot} garden={garden} />)}
    </div>
    {(state.phase === 'countdown' || state.paused || menuOpen || finished || disconnected) && <div className="match-overlay"><div className={`overlay-card ${finished ? 'result-card' : ''}`}>
      {finished && !disconnected && state.winner !== null && <Trophy key={`${state.round}-${state.winner}`} wins={1} celebration />}
      <span className="eyebrow">{disconnected ? 'Connection interrupted' : finished ? 'Garden verdict' : state.paused || menuOpen ? 'Game controls' : `Round ${state.round}`}</span>
      <h2>{disconnected ? link.status === 'ended' ? 'Garden disconnected' : 'Reconnecting…' : finished ? state.result : menuOpen ? 'Game menu' : state.paused ? 'Paused' : Math.max(1, Math.ceil((state.countdownUntil - state.time) / 1000))}</h2>
      {online && menuOpen && !disconnected && !finished && <p>The online match keeps running while this menu is open.</p>}
      {disconnected && <p>{link.status === 'ended' ? 'The match has ended. Start a new garden to play again.' : 'Play is paused. Trying to reconnect for up to 30 seconds.'}</p>}
      {disconnected ? <button className="primary-button" onClick={leave}>Back to setup</button> : finished ? <button className="primary-button" onClick={state.phase === 'match-over' ? leave : () => session.nextRound()}>{state.phase === 'match-over' ? 'Choose a rematch' : 'Next round →'}</button> : (state.paused || menuOpen) && <button className="primary-button" onClick={openControls}>Back to the garden</button>}
      {(state.paused || menuOpen || finished) && !disconnected && <nav className="pause-controls" aria-label="Match controls"><button className="text-button" onClick={() => session.toggleSound()}>{session.muted ? 'Sound off' : 'Sound on'}</button><button className="text-button" onClick={leave}>Change matchup</button></nav>}
    </div></div>}
  </main>;
}
