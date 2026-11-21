import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react';
import { MatchMeta } from './MatchMeta';
import { keyboardLayouts } from '../game/controls';
import type { Session } from '../game/Session';
import { createArenaLayout } from '../render/layout';
import { ArenaCanvas } from './ArenaCanvas';
import { Board } from './Board';
import { ScoreBar } from './ScoreBar';
import { SpellEffects } from './SpellEffects';
import { TargetMarkers } from './TargetMarkers';
import { CastOverlay } from './CastOverlay';
import { GameMenu } from './GameMenu';
import { MatchEnd } from './MatchEnd';
import './match.css';

export function Game({ session, leave }: { session: Session; leave: () => void }) {
  const snapshot = useSyncExternalStore(session.subscribe, session.getSnapshot);
  const [layout, setLayout] = useState(() => createArenaLayout(window.innerWidth, window.innerHeight, session.match.options.mode));
  const { state } = snapshot;
  const online = session.match.options.mode === 'online';
  const [menuOpen, setMenuOpen] = useState(false);
  const menuVisible = useRef(false);
  menuVisible.current = menuOpen;
  const openControls = () => online ? setMenuOpen(value => !value) : session.togglePause();
  const nextRound = useCallback(() => session.nextRound(), [session]);
  const finished = state.phase === 'round-over' || state.phase === 'match-over';
  useEffect(() => { if (finished) setMenuOpen(false); }, [finished]);
  const link = snapshot.network;
  const disconnected = link && link.status !== 'connected';
  useEffect(() => {
    session.start();
    const keyboard = (event: KeyboardEvent) => {
      if (['round-over', 'match-over'].includes(session.getSnapshot().state.phase)) return;
      if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.code === 'Escape') { if (session.match.options.mode === 'online') setMenuOpen(value => !value); else session.togglePause(); return; }
      if (menuVisible.current) return;
      for (const id of [0, 1] as const) {
        if (id === 1 && session.match.options.mode !== 'local') continue;
        const hole = (keyboardLayouts[id].codes as readonly string[]).indexOf(event.code);
        if (hole >= 0) { event.preventDefault(); session.act({ type: 'hit', player: id, hole }); }
        if (event.code === keyboardLayouts[id].castCode) { event.preventDefault(); session.act({ type: 'cast', player: id }); }
      }
    };
    const visibility = () => { if (session.match.options.mode !== 'online' && document.hidden && !session.match.state.paused) session.togglePause(); };
    window.addEventListener('keydown', keyboard);
    document.addEventListener('visibilitychange', visibility);
    return () => { session.stop(); window.removeEventListener('keydown', keyboard); document.removeEventListener('visibilitychange', visibility); };
  }, [session]);

  return <main className={`match-screen ${layout.single ? 'single-board' : 'two-boards'} ${layout.landscape ? 'landscape-board' : ''} ${session.match.options.mode}`} style={{ '--score-bottom': `${layout.score.y + layout.score.height + 8}px` } as CSSProperties} aria-label="Battle arena" data-home-character={session.home.owner} data-round={state.round} data-phase={state.phase} data-time={state.time}>
    <ArenaCanvas session={session} snapshot={snapshot} layout={layout} onLayout={setLayout} />
    <ScoreBar state={state} area={layout.score} opponentStars={layout.single ? state.players[1].stars : undefined} onPause={disconnected || finished || state.paused || menuOpen ? undefined : openControls} controlLabel={online ? 'Game menu' : undefined} />
    {!state.paused&&!menuOpen&&!disconnected&&<MatchMeta state={state} mode={session.match.options.mode} />}
    <div className="match-hud">
      {layout.gardens.map(garden => <Board key={garden.id} session={session} snapshot={snapshot} garden={garden} />)}
      {layout.gardens.map(garden => <SpellEffects key={garden.id} snapshot={snapshot} garden={garden} />)}
      {layout.gardens.map(garden=><TargetMarkers key={garden.id} snapshot={snapshot} garden={garden}/>)}
    </div>
    {state.casting&&<div className="casting-scene"><div className="cast-backdrop" aria-hidden="true"/><CastOverlay key={state.casting.player} snapshot={snapshot} player={state.casting.player} garden={layout.gardens.find(garden=>garden.id===state.casting?.player)??layout.gardens[0]}/></div>}
    {finished && (!disconnected || state.phase === 'match-over') && <MatchEnd key={`${state.phase}-${state.round}`} round={state.phase === 'round-over'} winner={state.result} character={state.winner === null ? undefined : state.players[state.winner].character} leave={state.phase === 'round-over' ? nextRound : leave} />}
    {state.phase !== 'match-over' && (state.paused || menuOpen || disconnected) && <GameMenu session={session} snapshot={snapshot} resume={openControls} quit={leave} />}
    {!finished && !state.paused && !menuOpen && !disconnected && state.phase === 'countdown' && <div className="match-overlay countdown-overlay" role="status" aria-label="Round countdown"><div className="round-countdown"><span className="countdown-number">{Math.max(1, Math.ceil((state.countdownUntil - state.time) / 1000))}</span></div></div>}
  </main>;
}
