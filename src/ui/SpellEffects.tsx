import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { assetUrl } from '../assets/url';
import { presentation, validSheet } from '../presentation/config';
import { inspectImage } from '../presentation/images';
import type { CharacterId } from '../game/types';
import type { Snapshot } from '../game/Session';
import type { GardenLayout } from '../render/layout';
import './spell-effects.css';
import { hasGuard,hasTinCaps } from '../game/targetModifiers';

/** The simulation owns effect lifetime; these layers never capture hole input. */
export function SpellEffects({ snapshot, garden }: { snapshot: Snapshot; garden: GardenLayout }) {
  const { state } = snapshot, player = state.players[garden.id];
  if (state.phase !== 'playing' || state.casting) return null;
  const effects: { kind: string; character: CharacterId; tier: number }[] = [];
  if (player.sweepUntil > state.time) effects.push({ kind: 'sweep', character: 'champignon', tier: player.sweepTier });
  if (hasGuard(player,state.time)) effects.push({ kind: 'guard', character: player.character, tier: player.shieldTier });
  if (player.magicShieldUntil > state.time) effects.push({ kind: 'ward', character: player.character, tier: 3 });
  if (player.invasionUntil > state.time) effects.push({ kind: 'invasion', character: 'andromoss', tier: 2 });
  if (player.decoysUntil > state.time) effects.push({ kind: 'decoys', character: 'andromoss', tier: 4 });
  if (player.armorUntil > state.time || hasTinCaps(player)) effects.push({ kind: 'armor', character: 'captain-bramble', tier: player.armorUntil > state.time ? player.armorTier : 2 });
  if (player.markUntil > state.time && (player.markCharges > 0 || player.holes.some(target => target?.missBonus))) effects.push({ kind: 'curse', character: 'duskmantle', tier: player.markTier });
  if (player.camouflageUntil > state.time) effects.push({ kind: 'veil', character: 'duskmantle', tier: 2 });
  if (player.drainUntil > state.time) effects.push({ kind: 'drain', character: 'duskmantle', tier: 3 });
  if (player.tendingUntil > state.time) effects.push({ kind: 'tending', character: 'sprig', tier: 1 });
  if (player.automationUntil > state.time) effects.push({ kind: 'automation', character: 'sprig', tier: player.automationTier });
  if (player.pending.length) effects.push({ kind: 'incoming', character: state.players[player.pending[0].from].character, tier: player.pending[0].tier });
  const recent = [...snapshot.events].reverse().find(event => event.kind === 'cast' && event.player === garden.id && event.round === state.round && state.time - event.time < 700);
  if (recent?.tier) effects.push({ kind: 'impact', character: player.character, tier: recent.tier });
  return <div className="spell-effects" style={{ left:garden.x, top:garden.y, width:garden.width, height:garden.height } as CSSProperties} aria-hidden="true">
    {effects.map(effect => {
      const areas = effect.kind === 'sweep' && player.sweepTier === 2
        ? garden.holes.filter((_,index) => player.sweepColumns.includes(index % 3)).map(hole => hole.hit) : [];
      const bounds: CSSProperties | undefined = areas.length ? {
        left: Math.min(...areas.map(area=>area.x))-garden.x,
        top: Math.min(...areas.map(area=>area.y))-garden.y,
        width: Math.max(...areas.map(area=>area.x+area.width))-Math.min(...areas.map(area=>area.x)),
        height: Math.max(...areas.map(area=>area.y+area.height))-Math.min(...areas.map(area=>area.y)),
        right: 'auto', bottom: 'auto',
      } : undefined;
      return <Effect key={effect.kind} {...effect} time={state.time} bounds={bounds} />;
    })}
  </div>;
}
function Effect({ kind, character, tier, time, bounds }: { kind: string; character: CharacterId; tier: number; time: number; bounds?: CSSProperties }) {
  const clip = presentation[character].effects[tier];
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    setReady(false);
    void inspectImage(clip.src).then(image => { if (alive) setReady(!!image && validSheet(clip, image.width, image.height)); });
    return () => { alive = false; };
  }, [clip]);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const frame = reduced ? 0 : Math.floor(time * clip.fps / 1000) % clip.frameCount;
  // A time-driven marker keeps placeholder motion frozen by pause/casting too.
  return <div className={`spell-effect effect-${kind}`} style={bounds} data-effect={kind} data-character={character} data-tier={tier} data-asset={ready ? 'ready' : 'fallback'} data-frame={frame}>
    {ready ? <svg viewBox={`0 0 ${clip.frameWidth} ${clip.frameHeight}`} overflow="hidden"><image href={assetUrl(clip.src)} width={clip.columns*clip.frameWidth} height={Math.ceil(clip.frameCount/clip.columns)*clip.frameHeight} x={-(frame%clip.columns)*clip.frameWidth} y={-Math.floor(frame/clip.columns)*clip.frameHeight} /></svg>
      : <svg viewBox="0 0 100 100" preserveAspectRatio="none"><rect x="3" y="3" width="94" height="94" rx="12" /><path d={kind === 'incoming' ? 'M43 6 L50 15 L57 6 M43 94 L50 85 L57 94' : `M${10+frame*8} 3 l5 4 l-5 4 l-5 -4 Z M${90-frame*8} 89 l5 4 l-5 4 l-5 -4 Z`} /></svg>}
  </div>;
}
