import { useState } from 'react';
import { characters } from '../game/config';
import type { CharacterId } from '../game/types';
import { presentation } from '../presentation/config';

export function Portrait({ character }: { character: CharacterId }) {
  const [status, setStatus] = useState('loading');
  return <span className="portrait" data-character={character} data-state={status} aria-hidden="true">
    <img src={presentation[character].portrait} alt="" hidden={status !== 'ready'} onLoad={() => setStatus('ready')} onError={() => setStatus('fallback')} />
    {status !== 'ready' && <span>{characters[character].emblem}</span>}
  </span>;
}
