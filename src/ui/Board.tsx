import type { CSSProperties } from 'react';
import { characters } from '../game/config';
import type { Session, Snapshot } from '../game/Session';
import type { GardenLayout, Rect } from '../render/layout';
import { Portrait } from './Portrait';
import { pacingAt } from '../game/pacing';

const keys = [['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'], ['7', '8', '9', '4', '5', '6', '1', '2', '3']];
const position = (rect: Rect): CSSProperties => ({ left: rect.x, top: rect.y, width: rect.width, height: rect.height });

/** Only HUD and accessible hit regions; all artwork lives in the shared canvas. */
export function Board({ session, snapshot, garden }: { session: Session; snapshot: Snapshot; garden: GardenLayout }) {
  const id = garden.id;
  const player = snapshot.state.players[id];
  const character = characters[player.character];
  const bot = id === 1 && session.match.options.mode === 'ai';
  const remote = id === 1 && session.match.options.mode === 'online';
  const spell = character.spells[Math.max(0, player.stars - 1)];
  const playing = snapshot.state.phase === 'playing' && !snapshot.state.paused && (!snapshot.network || snapshot.network.status === 'connected');
  const active = player.invasionUntil > snapshot.state.time || player.decoysUntil > snapshot.state.time;
  const shield = player.mistakeShield > 0 && player.shieldUntil > snapshot.state.time;
  const ward = player.magicShieldUntil > snapshot.state.time;
  const pace = pacingAt(snapshot.state.time - snapshot.state.roundStart);
  const phaseLabel = { build: 'Pressure rising', peak: 'Peak pressure', recovery: 'Breathing room' }[pace.phase];

  return <section className={`player-panel player-${id} ${active ? 'cursed' : ''}`} aria-label={`${bot ? 'Computer' : `Player ${id + 1}`} garden`} data-board-x={garden.x} data-board-y={garden.y} data-board-scale={garden.scale}>
    <div className="player-summary" style={position(garden.header)}>
      <header className="player-header">
        <div className={`avatar ${player.character}`} aria-hidden="true"><Portrait character={player.character} /></div>
        <div className="player-name"><span className="eyebrow">{bot ? `${session.match.options.difficulty} CPU` : remote ? 'Online rival' : session.match.options.mode === 'online' ? 'You' : `Player ${id + 1}`}</span><h2>{character.name}</h2></div>
        <div className="round-wins" aria-label={`${player.wins} rounds won`}>{[0, 1].map(n => <span key={n} className={n < player.wins ? 'won' : ''}>◆</span>)}</div>
      </header>
      <div className="vitals"><strong className="score" aria-label={`${id === 0 ? 'Your' : 'Opponent'} score`} data-score={player.score}>{player.score.toLocaleString()}<small> points</small></strong></div>
    </div>
    <div className="hole-controls">{player.holes.map((target, hole) => <button
      key={hole} type="button" className="hole" aria-label={`${target?.kind ?? 'Empty'} hole ${hole + 1}`}
      style={position(garden.holes[hole].hit)} data-kind={target?.kind ?? 'empty'} disabled={!playing || bot || remote}
      onPointerDown={event => { if (event.button === 0) { event.preventDefault(); session.act({ type: 'hit', player: id, hole }); } }}
      onKeyDown={event => { if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) { event.preventDefault(); session.act({ type: 'hit', player: id, hole }); } }}
    ><span className="keycap">{remote ? '' : keys[id][hole]}</span></button>)}</div>
    <div className="effect-tags" style={{ left: garden.x, top: garden.y + garden.height - 24, width: garden.width }}>{shield && <span>◇ Guard ×{player.mistakeShield}</span>}{ward && <span>✧ Spore Ward</span>}{active && <span className="bad">Rabbit invasion</span>}</div>
    <div className="magic-panel" style={position(garden.footer)}>
      <div className="magic-meter"><span className="eyebrow">Magic charge</span><span className="stars" aria-label={`${player.stars} stars`}>{[0, 1, 2, 3].map(n => <span key={n} className={n < player.stars ? 'charged' : ''}>★</span>)}</span></div>
      <button className="cast-button" title={player.stars ? spell.description : 'Collect golden stars to charge magic'} disabled={!playing || bot || remote || !player.stars || snapshot.state.time < player.nextCast} onClick={() => session.act({ type: 'cast', player: id })}><span>{player.stars ? `Cast: ${spell.name}` : 'Collect stars to cast'}</span><kbd>{id === 0 ? 'R' : '+'}</kbd></button>
      <p className="spell-description">{player.stars ? spell.description : 'Hit golden stars. Save for stronger magic, or cast early.'}</p>
      <div className="board-message" role="status">{player.messageUntil > snapshot.state.time ? player.message : `Wave ${pace.wave} · ${phaseLabel}`}</div>
    </div>
  </section>;
}
