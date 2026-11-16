import { lazy, Suspense, useState } from 'react';
import { Session } from '../game/Session';
import { characters } from '../game/config';
import type { CharacterId, Difficulty, MatchOptions } from '../game/types';
import { Portrait } from './Portrait';
import './presentation.css';
const OnlinePlay = lazy(() => import('./OnlinePlay').then(module => ({ default: module.OnlinePlay })));
const Game = lazy(() => import('./Game').then(module => ({ default: module.Game })));

export function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [character, setCharacter] = useState<CharacterId>('champignon');
  const [opponent, setOpponent] = useState<CharacterId>('andy');
  const [mode, setMode] = useState<MatchOptions['mode']>(new URLSearchParams(location.search).has('join') ? 'online' : 'ai');
  const [online, setOnline] = useState(new URLSearchParams(location.search).has('join'));
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  if (online) return <Suspense fallback={<p className="development-note">Opening online gardens…</p>}><OnlinePlay initialCharacter={character} leave={() => { setOnline(false); history.replaceState(null, '', location.pathname); }} /></Suspense>;
  if (session) return <Suspense fallback={<p className="development-note">Opening the garden…</p>}><Game session={session} leave={() => { session.stop(); setSession(null); }} /></Suspense>;
  return <div className="app-shell">
    <header className="site-header"><a className="wordmark" href="/" aria-label="Moonlit Battle Garden home"><span className="brand-mark">☾</span> MOONLIT BATTLE GARDEN<span className="prototype-tag">PROTOTYPE 01</span></a><span className="header-note">Quick hands. Questionable magic.</span></header>
    <main className="lobby">
      <section className="intro"><span className="eyebrow">A friendly garden rivalry</span><h1>Keep your garden.<br /><em>Ruin their day.</em></h1><p>A duel of moles, mischief, and perfectly timed magic.<br />Pick a side. Bring your fastest fingers.</p><div className="intro-pills"><span>1 vs 1</span><span>3 × 3 gardens</span><span>4 tiers of magic</span></div></section>
      <section className="match-setup" aria-label="Match setup"><div className="setup-heading"><span className="eyebrow">Make it personal</span><span className="step-label">01 / CHOOSE YOUR DUEL</span></div>
        <div className="mode-toggle" aria-label="Game mode"><button aria-pressed={mode === 'ai'} onClick={() => setMode('ai')}>Versus computer</button><button aria-pressed={mode === 'local'} onClick={() => setMode('local')}>Local two player</button><button aria-pressed={mode === 'online'} onClick={() => setMode('online')}>Online rival</button></div>
        <div className="character-selection"><span className="eyebrow">Your character · always left</span><div className="character-options">{(Object.keys(characters) as CharacterId[]).map(id => <button key={id} className={`character-card ${id} ${character === id ? 'selected' : ''}`} aria-pressed={character === id} onClick={() => { setCharacter(id); setOpponent(id === 'andy' ? 'champignon' : 'andy'); }}><span className="character-emblem"><Portrait character={id} /></span><strong>{characters[id].name}</strong><small>{characters[id].role}</small><span className="selection-indicator">{character === id ? 'SELECTED ✓' : 'CHOOSE CHARACTER'}</span></button>)}</div></div>
        <div className="setup-bottom">{mode !== 'online' && <label>Opponent<select value={opponent} onChange={event => setOpponent(event.target.value as CharacterId)}>{Object.entries(characters).map(([id, data]) => <option key={id} value={id}>{data.name}</option>)}</select></label>}{mode === 'ai' ? <label>Difficulty<select value={difficulty} onChange={event => setDifficulty(event.target.value as Difficulty)}><option value="easy">Easy · warming up</option><option value="medium">Medium · a fair fight</option><option value="hard">Hard · quick hands</option></select></label> : mode === 'online' ? <p className="local-note">Create an invite or join a friend. Each player chooses their own character.</p> : <p className="local-note">Share a keyboard: QWE / ASD / ZXC and the number pad. Cast with R and numpad +.</p>}</div>
        <button className="primary-button start-button" onClick={() => mode === 'online' ? setOnline(true) : setSession(new Session({ characters: [character, opponent], mode, difficulty, seed: crypto.getRandomValues(new Uint32Array(1))[0] }))}>Enter the garden <span>↗</span></button>
        <p className="setup-footnote">{mode === 'ai' ? 'Play offline. No account. Just a very determined opponent.' : mode === 'online' ? 'Private invites. No account. One player hosts.' : 'Two players. One computer. A very personal rivalry.'}</p>
      </section>
      <section className="how-to"><div><span>01</span><h3>Whack with care</h3><p>Hit moles before they hide. Empty hits and rabbit hits cost points.</p></div><div><span>02</span><h3>Pocket some magic</h3><p>Collect stars for four different spells. Cast now or save for something bigger.</p></div><div><span>03</span><h3>Outlast your rival</h3><p>Build a decisive score lead to fill the bar. First to win two rounds takes the match.</p></div></section>
      <p className="development-note">First playable · Local, AI and private online duels</p>
    </main>
    <div className="site-footer"><span>GROWN FROM DIG HOLE BATTLE GARDEN · 2009 → 2026</span><a href="https://github.com/virgs/molecideGaiden" target="_blank" rel="noreferrer">Original art & sounds ↗</a></div>
  </div>;
}
