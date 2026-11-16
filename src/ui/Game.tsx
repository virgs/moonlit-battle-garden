import { useEffect, useState, useSyncExternalStore } from 'react';
import { characters } from '../game/config';
import type { Session } from '../game/Session';
import { createArenaLayout } from '../render/layout';
import { ArenaCanvas } from './ArenaCanvas';
import { Board } from './Board';
import { ScoreBar } from './ScoreBar';
import { CastOverlay } from './CastOverlay';
import { pacingAt } from '../game/pacing';
import { Portrait } from './Portrait';
import { StarMeter, Trophy } from './LegacyRewards';
import './match.css';

export function Game({ session, leave }: { session: Session; leave: () => void }) {
  const snapshot = useSyncExternalStore(session.subscribe, session.getSnapshot);
  const [layout, setLayout] = useState(() => createArenaLayout(window.innerWidth, window.innerHeight, session.match.options.mode));
  const { state } = snapshot;
  const finished = state.phase === 'round-over' || state.phase === 'match-over';
  const link = snapshot.network;
  const disconnected = link && link.status !== 'connected';
  const opponent = state.players[1];
  useEffect(() => {
    session.start();
    const map = ['KeyQ', 'KeyW', 'KeyE', 'KeyA', 'KeyS', 'KeyD', 'KeyZ', 'KeyX', 'KeyC'];
    const numpad = ['Numpad7', 'Numpad8', 'Numpad9', 'Numpad4', 'Numpad5', 'Numpad6', 'Numpad1', 'Numpad2', 'Numpad3'];
    const keyboard = (event: KeyboardEvent) => {
      if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.code === 'Escape') { session.togglePause(); return; }
      for (const id of [0, 1] as const) {
        if (id === 1 && session.match.options.mode !== 'local') continue;
        const hole = (id === 0 ? map : numpad).indexOf(event.code);
        if (hole >= 0) { event.preventDefault(); session.act({ type: 'hit', player: id, hole }); }
        if (event.code === (id === 0 ? 'KeyR' : 'NumpadAdd')) { event.preventDefault(); session.act({ type: 'cast', player: id }); }
      }
    };
    const visibility = () => { if (document.hidden && !session.match.state.paused) session.togglePause(); };
    window.addEventListener('keydown', keyboard);
    document.addEventListener('visibilitychange', visibility);
    return () => { session.stop(); window.removeEventListener('keydown', keyboard); document.removeEventListener('visibilitychange', visibility); };
  }, [session]);

  const pace = pacingAt(state.time - state.roundStart);
  return <main className={`match-screen ${layout.single ? 'single-board' : 'two-boards'} ${layout.landscape ? 'landscape-board' : ''} ${session.match.options.mode}`} aria-label="Battle arena" data-home-character={session.home.owner} data-wave={pace.wave} data-wave-phase={pace.phase}>
    <ArenaCanvas session={session} snapshot={snapshot} layout={layout} onLayout={setLayout} />
    <ScoreBar state={state} area={layout.score} />
    <div className="match-hud">
      <nav className="match-toolbar" aria-label="Match controls"><button className="text-button" onClick={leave}>← Change matchup</button><span>ROUND {state.round} <span className="muted">/ FIRST TO TWO</span><small className="home-label">{session.home.name} · {characters[session.home.owner].name}’s home</small></span><div><button className="text-button" onClick={() => session.toggleSound()}>{session.muted ? 'Sound off' : 'Sound on'}</button><button className="text-button" onClick={() => session.togglePause()} disabled={finished || disconnected}>{state.paused ? 'Resume' : 'Pause'}</button></div></nav>
      {layout.opponent && <div className="mobile-opponent" style={{ left: layout.opponent.x, top: layout.opponent.y, width: layout.opponent.width, height: layout.opponent.height }}><span className="opponent-name"><span className="mini-avatar"><Portrait character={opponent.character} /></span>{characters[opponent.character].name}</span><strong>{opponent.score} pts</strong><span className="opponent-charge"><StarMeter count={opponent.stars} time={state.time} compact /></span></div>}
      {layout.gardens.map(garden => <Board key={garden.id} session={session} snapshot={snapshot} garden={garden} />)}
      {layout.gardens.map(garden => <CastOverlay key={garden.id} snapshot={snapshot} garden={garden} />)}
      {!layout.single && <div className="versus-label" aria-hidden="true">VS</div>}
    </div>
    {link && <span className="online-status" role="status">{link.status === 'connected' ? `Online · ${session.match.options.mode === 'online' ? 'Peer hosted' : ''}${link.rtt === null ? '' : ` · ${link.rtt} ms`}` : link.status === 'ended' ? 'Connection ended' : 'Reconnecting…'}</span>}
    {(state.phase === 'countdown' || state.paused || finished || disconnected) && <div className="match-overlay"><div className="overlay-card">
      {finished && !disconnected && state.winner !== null && <Trophy key={`${state.round}-${state.winner}`} wins={1} celebration />}
      <span className="eyebrow">{disconnected ? 'Connection interrupted' : finished ? 'Garden verdict' : state.paused ? 'Take a breather' : `Round ${state.round}`}</span>
      <h2>{disconnected ? link.status === 'ended' ? 'Garden disconnected' : 'Reconnecting…' : finished ? state.result : state.paused ? 'Paused' : Math.max(1, Math.ceil((state.countdownUntil - state.time) / 1000))}</h2>
      <p>{disconnected ? link.status === 'ended' ? 'The match has ended. Start a new garden to play again.' : 'Play is paused. Trying to reconnect for up to 30 seconds.' : finished ? 'A little rivalry. A lot of dirt.' : state.paused ? 'Your garden will be here when you’re ready.' : 'Moles: hit. Rabbits: spare. Stars: collect.'}</p>
      {disconnected ? <button className="primary-button" onClick={leave}>Back to setup</button> : finished ? <button className="primary-button" onClick={state.phase === 'match-over' ? leave : () => session.nextRound()}>{state.phase === 'match-over' ? 'Choose a rematch' : 'Next round →'}</button> : state.paused && <button className="primary-button" onClick={() => session.togglePause()}>Back to the garden</button>}
    </div></div>}
  </main>;
}
