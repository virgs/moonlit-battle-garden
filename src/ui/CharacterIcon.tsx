import { useState } from 'react';
import { assetUrl } from '../assets/url';
import type { CharacterId } from '../game/types';
import { presentation } from '../presentation/config';
import './character-icon.css';

/** Final icons drop in at configured paths; missing art uses the requested placeholder. */
export function CharacterIcon({ character, placeholder = 'hero' }: { character: CharacterId; placeholder?: 'hero' | 'box' }) {
  return <IconImage key={`${character}-${placeholder}`} character={character} placeholder={placeholder} />;
}
function IconImage({ character, placeholder }: { character: CharacterId; placeholder: 'hero' | 'box' }) {
  const [fallback, setFallback] = useState(false);
  if (fallback && placeholder === 'box') return <span className="character-icon character-icon-placeholder" data-character={character} data-state="fallback" aria-hidden="true" />;
  return <img className="character-icon" data-character={character} data-state={fallback ? 'fallback' : 'ready'}
    src={assetUrl(fallback ? `/assets/legacy/${character}-hero.png` : presentation[character].icon)} alt="" aria-hidden="true"
    onError={() => { if (!fallback) setFallback(true); }} />;
}
