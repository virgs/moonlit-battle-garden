import { parse } from 'yaml';
import source from '../assets/config/presentation.yaml?raw';
import { characterIds, type CharacterId } from '../game/types';

export type MusicAsset = { src: string; fallback: string; volume: number; loopStartMs: number; loopEndMs: number | null };
export type BackgroundAsset = { src: string; fallback: string; opacity: number; fallbackOpacity: number; fallbackTint: number; focusX: number; focusY: number };
export type CastClip = { renderer?: 'procedural'; src: string; frameWidth: number; frameHeight: number; frameCount: number; columns: number; fps: number; holdMs: number; sound: string | null };
export type CharacterPresentation = {
  portrait: string;
  icon: string;
  victory: CastClip;
  standing: CastClip;
  home: { name: string; background: BackgroundAsset; music: MusicAsset };
  casts: Record<number, CastClip>;
  effects: Record<number, CastClip>;
};
type Source = {
  castDefaults: Omit<CastClip, 'src'>;
  characters: Record<CharacterId, Omit<CharacterPresentation, 'casts' | 'effects'> & { casts: Record<number, Partial<CastClip> & { src: string }>; effects: Record<number, Partial<CastClip> & { src: string }> }>;
};
const raw = parse(source) as Source;
export const presentation = Object.fromEntries(Object.entries(raw.characters).map(([id, value]) => [id, {
  ...value, effects: Object.fromEntries(Object.entries(value.effects).map(([tier, clip]) => [tier, { ...raw.castDefaults, ...clip }])), casts: Object.fromEntries(Object.entries(value.casts).map(([tier, clip]) => [tier, { ...raw.castDefaults, ...clip }])),
}])) as Record<CharacterId, CharacterPresentation>;

for (const id of characterIds) {
  const value = presentation[id];
  if (!value || ![value.portrait, value.icon].every(path => path.startsWith('/assets/'))) throw new Error(`Missing presentation: ${id}`);
  for (const [key, clip] of Object.entries({ ...Object.fromEntries(Object.entries(value.effects).map(([tier, clip]) => [`effect-${tier}`, clip])), ...value.casts, victory: value.victory, standing: value.standing })) {
    if (!clip?.src.startsWith('/assets/') || [clip.frameWidth, clip.frameHeight, clip.frameCount, clip.columns].some(n => !Number.isInteger(n) || n <= 0) || clip.fps <= 0 || clip.holdMs < 0) throw new Error(`Invalid presentation clip: ${id}/${key}`);
  }
  const { music, background } = value.home;
  if (![music.src, music.fallback, background.src, background.fallback].every(path => path.startsWith('/assets/'))) throw new Error(`Invalid home path: ${id}`);
  if ([music.volume, background.opacity, background.fallbackOpacity, background.focusX, background.focusY].some(n => n < 0 || n > 1) || music.loopStartMs < 0 || (music.loopEndMs !== null && music.loopEndMs <= music.loopStartMs)) throw new Error(`Invalid home playback: ${id}`);
}

export function clipDuration(clip: CastClip): number { return clip.frameCount / clip.fps * 1000 + clip.holdMs; }
export function clipFrame(clip: CastClip, elapsed: number, reducedMotion = false): number {
  return reducedMotion ? 0 : Math.min(clip.frameCount - 1, Math.floor(Math.max(0, elapsed) * clip.fps / 1000));
}
export function validSheet(clip: CastClip, width: number, height: number): boolean {
  return width === clip.columns * clip.frameWidth && height === Math.ceil(clip.frameCount / clip.columns) * clip.frameHeight;
}

/** Reused final base art keeps new heroes' error fallbacks valid too. */
export function heroStill(character: CharacterId): string {
  if (character === 'sprig') return '/assets/characters/sprig/base-v6.png';
  if (character === 'captain-bramble' || character === 'duskmantle') return `/assets/characters/${character}/base.png`;
  return `/assets/legacy/${character}-hero.png`;
}
