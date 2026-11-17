import { useEffect, useRef, type KeyboardEvent } from 'react';
import { assetUrl } from '../assets/url';
import type { Session, Snapshot } from '../game/Session';
import { characters } from '../game/config';
import { keyboardLayouts } from '../game/controls';
import { CharacterIcon } from './CharacterIcon';
import { MatchMeta } from './MatchMeta';
import { ModeIcon } from './ModeIcon';
import { SpellStars } from './LegacyRewards';
import { ControlKey } from './ControlKey';
import './game-menu.css';

export function GameMenu({ session, snapshot, resume, quit }: { session: Session; snapshot: Snapshot; resume: () => void; quit: () => void }) {
  const dialog = useRef<HTMLElement>(null);
  const actions = useRef<HTMLElement>(null);
  const status = snapshot.network?.status;
  const disconnected = status && status !== 'connected';
  const ended = status === 'ended';
  const online = session.match.options.mode === 'online';
  const heading = disconnected ? ended ? 'Garden disconnected' : 'Reconnecting…' : online ? 'Game menu' : 'Pause';
  useEffect(() => { dialog.current?.querySelector<HTMLButtonElement>('button:not(:disabled)')?.focus({ preventScroll: true }); }, [disconnected]);
  const keyboard = (event: KeyboardEvent) => {
    const buttons = [...actions.current!.querySelectorAll<HTMLButtonElement>('button:not(:disabled)')];
    if ((['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key)) && actions.current?.contains(document.activeElement)) {
      event.preventDefault();
      const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
      buttons[(index + (event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length]?.focus();
    }
    if (event.key === 'Tab') {
      const stops = [...dialog.current!.querySelectorAll<HTMLElement>('button:not(:disabled),[tabindex="0"]')];
      if (event.shiftKey && document.activeElement === stops[0]) { event.preventDefault(); stops.at(-1)?.focus(); }
      else if (!event.shiftKey && document.activeElement === stops.at(-1)) { event.preventDefault(); stops[0]?.focus(); }
    }
  };
  return <div className="match-overlay menu-overlay"><section ref={dialog} className="game-menu" role="dialog" aria-modal="true" aria-labelledby="game-menu-title" onKeyDown={keyboard}>
    <header className="menu-heading"><h2 id="game-menu-title"><ModeIcon mode={session.match.options.mode} decorative /><span>{heading}</span></h2>
      <MatchMeta state={snapshot.state} mode={session.match.options.mode} paused />
      {(disconnected || online) && <p className="menu-status" role="status">{disconnected ? ended ? 'The connection has ended.' : 'Reconnecting automatically. The game is frozen.' : 'The online match keeps running.'}</p>}
    </header>
    <nav ref={actions} className="menu-actions" aria-label="Match controls">
      <button disabled={!!disconnected} onClick={resume}>Resume</button>
      <button aria-pressed={session.muted} onClick={() => session.toggleSound()}>{session.muted ? 'Unmute' : 'Mute'}</button>
      <button onClick={quit}>Quit</button>
    </nav>
    <div className="menu-reference" tabIndex={0} role="region" aria-label="Controls and magic">
      <div className="menu-heroes">{snapshot.state.players.map((player, id) => {
        const controlled = id === 0 || session.match.options.mode === 'local';
        const layout = keyboardLayouts[id];
        const character = characters[player.character];
        return <section key={id} className={`menu-hero side-${id} ${controlled ? 'with-controls' : 'rival-hero'}`}>
          <CharacterIcon character={player.character} /><h3>{character.name}<small>{controlled ? id === 0 ? 'Player 1' : 'Player 2 · numpad' : 'Rival'}</small></h3>
          <div className="hero-reference-body">
            {controlled && <div className="keyboard-reference">
              <div className="board-key-grid" role="group" aria-label={`Player ${id + 1} hole keys`}>{layout.labels.map(label => <ControlKey key={label} label={label} />)}</div>
              <div className="cast-key"><ControlKey label={layout.castLabel} /><span>Magic</span></div>
            </div>}
            <ol className="hero-spells" aria-label={`${character.name} magic`}>{character.spells.map((spell, tier) => <li key={spell.name} aria-label={`${tier + 1} ${tier ? 'stars' : 'star'}: ${spell.name}`}><SpellStars count={tier+1} minSlots={4} /><span>{spell.name}</span></li>)}</ol>
          </div>
        </section>;
      })}</div>
      <div className="pointer-reference"><img src={assetUrl('/assets/input/mouse.png')} alt="Mouse" /><span>Whack a hole<br />Tap stars for magic</span></div>
    </div>
  </section></div>;
}
