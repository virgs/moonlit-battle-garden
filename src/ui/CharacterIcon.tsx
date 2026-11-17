import { useState } from 'react';
import { assetUrl } from '../assets/url';
import type { CharacterId } from '../game/types';
import { presentation } from '../presentation/config';
import './character-icon.css';

/** Recovered hero art remains visible until the final icon is supplied. */
export function CharacterIcon({ character }: { character: CharacterId }) {
  return <IconImage key={character} character={character} />;
}
function IconImage({ character }: { character: CharacterId }) {
  const [fallback, setFallback] = useState(false);
  return <img className="character-icon" data-character={character} data-state={fallback ? 'fallback' : 'ready'}
    src={assetUrl(fallback ? `/assets/legacy/${character}-hero.png` : presentation[character].icon)} alt="" aria-hidden="true"
    onError={() => { if (!fallback) setFallback(true); }} />;
}
