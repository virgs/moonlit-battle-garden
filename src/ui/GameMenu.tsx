import { useEffect, useRef } from 'react';
import type { Session, Snapshot } from '../game/Session';
import { characters } from '../game/config';
import './game-menu.css';

export function GameMenu({ session, snapshot, resume, quit }: { session: Session; snapshot: Snapshot; resume: () => void; quit: () => void }) {
  const first = useRef<HTMLButtonElement>(null);
  const status = snapshot.network?.status;
  const disconnected = status && status !== 'connected';
  const ended = status === 'ended';
  const online = session.match.options.mode === 'online';
  const heading = disconnected ? ended ? 'Garden disconnected' : 'Reconnecting…' : online ? 'Game menu' : 'Paused';
  useEffect(() => { first.current?.focus(); }, []);
  return <div className="match-overlay menu-overlay"><section className="game-menu" role="dialog" aria-modal="true" aria-labelledby="game-menu-title">
    <h2 id="game-menu-title">{heading}</h2>
    <p className="menu-status">{disconnected ? ended ? 'The connection has ended. Quit to set up another match.' : 'The game is frozen while we reconnect. Play resumes automatically when both players are connected.' : online ? 'The online match keeps running while this menu is open.' : 'Take a breath. Your garden will wait.'}</p>
    <nav className="menu-actions" aria-label="Match controls">
      <button ref={first} className="primary-button" disabled={!!disconnected} onClick={resume}>Resume</button>
      <button className="text-button" aria-pressed={session.muted} onClick={() => session.toggleSound()}>{session.muted ? 'Unmute' : 'Mute'}</button>
      <button className="text-button" onClick={quit}>Quit</button>
    </nav>
    <p className="menu-help">Tap holes to whack. Tap your star container to cast. Tap the score bar or press Esc to open or close this menu. Collect stars; avoid rabbits and empty holes. First to two rounds wins.</p>
    <div className="menu-players">{snapshot.state.players.map((player, id) => <section key={id} className={`menu-player side-${id}`}>
      <h3>{characters[player.character].name}</h3>
      <p>{id === 1 && session.match.options.mode !== 'local' ? 'Opponent' : id === 0 ? 'Player 1 · Q W E / A S D / Z X C · R to cast' : 'Player 2 · 7 8 9 / 4 5 6 / 1 2 3 (numpad) · + to cast'}</p>
      <ol>{characters[player.character].spells.map((spell, tier) => <li key={spell.name}><strong>{tier + 1} {tier ? 'stars' : 'star'} · {spell.name}</strong><span>{spell.description}</span></li>)}</ol>
    </section>)}</div>
    <p className="menu-help">Casting uses your exact star count and spends the charge. A round resets scores and stars; round wins stay.</p>
  </section></div>;
}
