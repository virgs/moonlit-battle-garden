import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { GardenScene } from '../render/GardenScene';
import { characters } from '../game/config';
import type { Session, Snapshot } from '../game/Session';
import type { PlayerId } from '../game/types';

const keys = [['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'], ['7', '8', '9', '4', '5', '6', '1', '2', '3']];

export function Board({ session, snapshot, id }: { session: Session; snapshot: Snapshot; id: PlayerId }) {
  const host = useRef<HTMLDivElement>(null);
  const latest = useRef(snapshot);
  latest.current = snapshot;
  const player = snapshot.state.players[id];
  const character = characters[player.character];
  const bot = id === 1 && session.match.options.mode === 'ai';
  const spell = character.spells[Math.max(0, player.stars - 1)];
  const playing = snapshot.state.phase === 'playing' && !snapshot.state.paused;
  const active = player.invasionUntil > snapshot.state.time || player.decoysUntil > snapshot.state.time;
  const shield = player.damageShield > 0 && player.shieldUntil > snapshot.state.time;
  const ward = player.magicShieldUntil > snapshot.state.time;

  useEffect(() => {
    const game = new Phaser.Game({
      type: Phaser.AUTO, parent: host.current!, width: 360, height: 390,
      transparent: true, pixelArt: true, audio: { noAudio: true },
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
      scene: new GardenScene(() => latest.current, id), banner: false,
    });
    return () => game.destroy(true);
  }, [session, id]);

  return <section className={`player-panel player-${id} ${active ? 'cursed' : ''}`} aria-label={`${bot ? 'Computer' : `Player ${id + 1}`} garden`}>
    <header className="player-header">
      <div className={`avatar ${player.character}`} aria-hidden="true">{character.emblem}</div>
      <div><span className="eyebrow">{bot ? `${session.match.options.difficulty} CPU` : `Player ${id + 1}`}</span><h2>{character.name}</h2></div>
      <div className="round-wins" aria-label={`${player.wins} rounds won`}>{[0, 1].map(n => <span key={n} className={n < player.wins ? 'won' : ''}>◆</span>)}</div>
    </header>
    <div className="vitals"><div className="health-track" role="meter" aria-label={`${id === 0 ? 'Your' : 'Opponent'} health`} aria-valuenow={player.health} aria-valuemin={0} aria-valuemax={100}><div style={{ width: `${player.health}%` }} /></div><strong>{player.health}<small> HP</small></strong><span className="score">{player.score.toLocaleString()}<small> score</small></span></div>
    <div className={`garden-wrap ${shield || ward ? 'protected' : ''}`}>
      <div className="phaser-host" ref={host} />
      <div className="hole-controls">{player.holes.map((target, hole) => <button
        key={hole} type="button" className="hole" aria-label={`${target?.kind ?? 'Empty'} hole ${hole + 1}`}
        data-kind={target?.kind ?? 'empty'} disabled={!playing || bot}
        onPointerDown={event => { if (event.button === 0) { event.preventDefault(); session.act({ type: 'hit', player: id, hole }); } }}
        onKeyDown={event => { if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) { event.preventDefault(); session.act({ type: 'hit', player: id, hole }); } }}
      ><span className="keycap">{keys[id][hole]}</span></button>)}</div>
      <div className="effect-tags">{shield && <span>◇ Guard ×{player.damageShield}</span>}{ward && <span>✧ Spore Ward</span>}{active && <span className="bad">Rabbit invasion</span>}</div>
    </div>
    <div className="magic-panel"><div className="magic-meter"><span className="eyebrow">Magic charge</span><span className="stars" aria-label={`${player.stars} stars`}>{[0, 1, 2, 3].map(n => <span key={n} className={n < player.stars ? 'charged' : ''}>★</span>)}</span></div>
      <button className="cast-button" disabled={!playing || bot || !player.stars || snapshot.state.time < player.nextCast} onClick={() => session.act({ type: 'cast', player: id })}><span>{player.stars ? spell.name : 'Collect stars to cast'}</span><kbd>{id === 0 ? 'R' : '+'}</kbd></button>
      <p className="spell-description">{player.stars ? spell.description : 'Hit golden stars. Save for stronger magic, or cast early.'}</p>
    </div>
    <div className="board-message" role="status">{player.messageUntil > snapshot.state.time ? player.message : character.role}</div>
  </section>;
}
