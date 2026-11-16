import { lazy, Suspense, useEffect, useState, useSyncExternalStore } from 'react';
import { Session } from '../game/Session';
import { characters } from '../game/config';
import type { CharacterId, Difficulty, MatchOptions } from '../game/types';
const Board = lazy(() => import('./Board').then(module => ({ default: module.Board })));

function Game({ session, leave }: { session: Session; leave: () => void }) {
  const snapshot = useSyncExternalStore(session.subscribe, session.getSnapshot);
  const { state } = snapshot;
  const finished = state.phase === 'round-over' || state.phase === 'match-over';
  const opponent = state.players[1];
  useEffect(() => {
    session.start();
    const map = ['KeyQ', 'KeyW', 'KeyE', 'KeyA', 'KeyS', 'KeyD', 'KeyZ', 'KeyX', 'KeyC'];
    const numpad = ['Numpad7', 'Numpad8', 'Numpad9', 'Numpad4', 'Numpad5', 'Numpad6', 'Numpad1', 'Numpad2', 'Numpad3'];
    const keyboard = (event: KeyboardEvent) => {
      if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.code === 'Escape') { session.togglePause(); return; }
      for (const id of [0, 1] as const) {
        if (id === 1 && session.match.options.mode === 'ai') continue;
        const hole = (id === 0 ? map : numpad).indexOf(event.code);
        if (hole >= 0) { event.preventDefault(); session.act({ type: 'hit', player: id, hole }); }
        if (event.code === (id === 0 ? 'KeyR' : 'NumpadAdd')) { event.preventDefault(); session.act({ type: 'cast', player: id }); }
      }
    };
    const visibility = () => {
      if (document.hidden && !session.match.state.paused) session.togglePause();
    };
    window.addEventListener('keydown', keyboard);
    document.addEventListener('visibilitychange', visibility);
    return () => { session.stop(); window.removeEventListener('keydown', keyboard); document.removeEventListener('visibilitychange', visibility); };
  }, [session]);

  return <>
    <div className="match-toolbar"><button className="text-button" onClick={leave}>← Change matchup</button><span>ROUND {state.round} <span className="muted">/ FIRST TO TWO</span></span><div><button className="text-button" onClick={() => session.toggleSound()}>{session.muted ? 'Sound off' : 'Sound on'}</button><button className="text-button" onClick={() => session.togglePause()} disabled={finished}>{state.paused ? 'Resume' : 'Pause'}</button></div></div>
    <div className="mobile-opponent"><span>{characters[opponent.character].emblem} {characters[opponent.character].name}</span><strong>{opponent.health} HP</strong><span>{'★'.repeat(opponent.stars)} · {opponent.wins} wins</span></div>
    <main className={`arena ${session.match.options.mode}`}>
      <Board session={session} snapshot={snapshot} id={0} /><div className="versus-divider"><span>VS</span><i /></div><Board session={session} snapshot={snapshot} id={1} />
      {(state.phase === 'countdown' || state.paused || finished) && <div className="match-overlay"><div className="overlay-card">
        <span className="eyebrow">{finished ? 'Garden verdict' : state.paused ? 'Take a breather' : `Round ${state.round}`}</span>
        <h2>{finished ? state.result : state.paused ? 'Paused' : Math.max(1, Math.ceil((state.countdownUntil - state.time) / 1000))}</h2>
        <p>{finished ? 'A little rivalry. A lot of dirt.' : state.paused ? 'Your garden will be here when you’re ready.' : 'Moles: hit. Rabbits: spare. Stars: collect.'}</p>
        {finished ? <button className="primary-button" onClick={state.phase === 'match-over' ? leave : () => session.nextRound()}>{state.phase === 'match-over' ? 'Choose a rematch' : 'Next round →'}</button> : state.paused && <button className="primary-button" onClick={() => session.togglePause()}>Back to the garden</button>}
      </div></div>}
    </main>
    <footer className="play-hints"><span><b>●</b> Whack moles</span><span><b>★</b> Collect magic</span><span><b>♧</b> Spare rabbits</span><span>Keyboard, mouse, or touch · Esc to pause</span></footer>
  </>;
}

export function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [character, setCharacter] = useState<CharacterId>('champignon');
  const [opponent, setOpponent] = useState<CharacterId>('andy');
  const [mode, setMode] = useState<MatchOptions['mode']>('ai');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  return <div className="app-shell">
    <header className="site-header"><a className="wordmark" href="/" aria-label="Moonlit Battle Garden home"><span className="brand-mark">☾</span> MOONLIT BATTLE GARDEN<span className="prototype-tag">PROTOTYPE 01</span></a><span className="header-note">Quick hands. Questionable magic.</span></header>
    {session ? <Suspense fallback={<p className="development-note">Opening the garden…</p>}><Game session={session} leave={() => { session.stop(); setSession(null); }} /></Suspense> : <main className="lobby">
      <section className="intro"><span className="eyebrow">A friendly garden rivalry</span><h1>Keep your garden.<br /><em>Ruin their day.</em></h1><p>A duel of moles, mischief, and perfectly timed magic.<br />Pick a side. Bring your fastest fingers.</p><div className="intro-pills"><span>1 vs 1</span><span>3 × 3 gardens</span><span>4 tiers of magic</span></div></section>
      <section className="match-setup" aria-label="Match setup"><div className="setup-heading"><span className="eyebrow">Make it personal</span><span className="step-label">01 / CHOOSE YOUR DUEL</span></div>
        <div className="mode-toggle" aria-label="Game mode"><button aria-pressed={mode === 'ai'} onClick={() => setMode('ai')}>Versus computer</button><button aria-pressed={mode === 'local'} onClick={() => setMode('local')}>Local two player</button></div>
        <div className="character-selection"><span className="eyebrow">Your character</span><div className="character-options">{(Object.keys(characters) as CharacterId[]).map(id => <button key={id} className={`character-card ${id} ${character === id ? 'selected' : ''}`} aria-pressed={character === id} onClick={() => { setCharacter(id); setOpponent(id === 'andy' ? 'champignon' : 'andy'); }}><span className="character-emblem">{characters[id].emblem}</span><strong>{characters[id].name}</strong><small>{characters[id].role}</small><span className="selection-indicator">{character === id ? 'SELECTED ✓' : 'CHOOSE CHARACTER'}</span></button>)}</div></div>
        <div className="setup-bottom"><label>Opponent<select value={opponent} onChange={event => setOpponent(event.target.value as CharacterId)}>{Object.entries(characters).map(([id, data]) => <option key={id} value={id}>{data.name}</option>)}</select></label>{mode === 'ai' ? <label>Difficulty<select value={difficulty} onChange={event => setDifficulty(event.target.value as Difficulty)}><option value="easy">Easy · warming up</option><option value="medium">Medium · a fair fight</option><option value="hard">Hard · quick hands</option></select></label> : <p className="local-note">Share a keyboard: QWE / ASD / ZXC and the number pad. Cast with R and numpad +.</p>}</div>
        <button className="primary-button start-button" onClick={() => setSession(new Session({ characters: [character, opponent], mode, difficulty, seed: crypto.getRandomValues(new Uint32Array(1))[0] }))}>Enter the garden <span>↗</span></button>
        <p className="setup-footnote">{mode === 'ai' ? 'Play offline. No account. Just a very determined opponent.' : 'Two players. One computer. A very personal rivalry.'}</p>
      </section>
      <section className="how-to"><div><span>01</span><h3>Whack with care</h3><p>Hit moles before they hide. Empty hits and rabbit hits cost health.</p></div><div><span>02</span><h3>Pocket some magic</h3><p>Collect stars for four different spells. Cast now or save for something bigger.</p></div><div><span>03</span><h3>Outlast your rival</h3><p>Protect your garden and disrupt theirs. First to win two rounds takes the match.</p></div></section>
      <p className="development-note">First playable · Local and AI matches available · Online rooms are next</p>
    </main>}
    <div className="site-footer"><span>GROWN FROM DIG HOLE BATTLE GARDEN · 2009 → 2026</span><a href="https://github.com/virgs/molecideGaiden" target="_blank" rel="noreferrer">Original art & sounds ↗</a></div>
  </div>;
}
