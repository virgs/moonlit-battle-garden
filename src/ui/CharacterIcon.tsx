import { useState } from 'react';
import { assetUrl } from '../assets/url';
import type { CharacterId } from '../game/types';
import { presentation } from '../presentation/config';
import './character-icon.css';

/** Optional drop-in art: absent icons leave no broken image or placeholder. */
export function CharacterIcon({ character }: { character: CharacterId }) {
  return <IconImage key={character} character={character} />;
}
function IconImage({ character }: { character: CharacterId }) {
  const [ready, setReady] = useState(false);
  return <img className="character-icon" data-character={character} data-state={ready ? 'ready' : 'pending'}
    src={assetUrl(presentation[character].icon)} alt="" aria-hidden="true" hidden={!ready}
    onLoad={() => setReady(true)} onError={() => setReady(false)} />;
}
