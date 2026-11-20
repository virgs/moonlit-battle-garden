import type { CSSProperties } from 'react';
import type { Session, Snapshot } from '../game/Session';
import type { GardenLayout, Rect } from '../render/layout';
import { keyboardLayouts } from '../game/controls';
import { StarMeter } from './LegacyRewards';

const position = (rect: Rect): CSSProperties => ({ left: rect.x, top: rect.y, width: rect.width, height: rect.height });

export function Board({ session, snapshot, garden }: { session: Session; snapshot: Snapshot; garden: GardenLayout }) {
  const id = garden.id;
  const player = snapshot.state.players[id];
  const opponent = id === 1 && session.match.options.mode !== 'local';
  const playing = snapshot.state.phase === 'playing' && !snapshot.state.paused && !snapshot.state.casting && (!snapshot.network || snapshot.network.status === 'connected');
  return <section className={`player-panel player-${id}`} aria-label={`${id === 1 && session.match.options.mode === 'ai' ? 'Computer' : `Player ${id + 1}`} garden`} data-character={player.character} data-tin-charges={player.tinCharges} data-tending-active={player.tendingUntil > snapshot.state.time ? 'true' : 'false'} data-sweep-columns={player.sweepUntil > snapshot.state.time ? player.sweepColumns.join(',') : ''} data-automation-columns={player.automationUntil > snapshot.state.time ? player.automationColumns.join(',') : ''} data-score={player.score} data-board-x={garden.x} data-board-y={garden.y} data-board-scale={garden.scale}>
    <div className="hole-controls">{player.holes.map((target, hole) => <button
      key={hole} type="button" className="hole" aria-label={`${target?.armor ? 'Armored ' : ''}${target?.missBonus ? 'Marked ' : ''}${target?.kind ?? 'Empty'} hole ${hole + 1}`} data-armor={target?.armor ?? 0} data-persistent-armor={!!target?.persistentArmor} data-marked={!!target?.missBonus}
      style={position(garden.holes[hole].hit)} data-kind={target?.kind ?? 'empty'} data-born={target?.born} data-expires={target?.expires} data-key={keyboardLayouts[id].labels[hole]} disabled={!playing || opponent}
      onPointerDown={event => { if (event.button === 0) { event.preventDefault(); session.act({ type: 'hit', player: id, hole }); } }}
      onKeyDown={event => { if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) { event.preventDefault(); session.act({ type: 'hit', player: id, hole }); } }}
    />)}</div>
    <button className="cast-button star-control" style={position(garden.stars)} aria-label={`Cast magic (${player.stars} stars)`} disabled={!playing || opponent || !player.stars || snapshot.state.time < player.nextCast} onClick={() => session.act({ type: 'cast', player: id })}>
      <StarMeter count={player.stars} time={snapshot.state.time} horizontal={garden.horizontalStars} />
    </button>
  </section>;
}
