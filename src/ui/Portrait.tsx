import { assetUrl } from '../assets/url';
import { useState } from 'react';
import type { CharacterId } from '../game/types';
import { StandingHero } from './StandingHero';
import { presentation } from '../presentation/config';

export function Portrait({ character }: { character: CharacterId }) {
  return <PortraitImage key={character} character={character} />;
}
function PortraitImage({ character }: { character: CharacterId }) {
  const [status, setStatus] = useState('loading');
  return <span className="portrait" data-character={character} data-state={status} aria-hidden="true">
    <img src={assetUrl(presentation[character].portrait)} alt="" hidden={status !== 'ready'} onLoad={() => setStatus('ready')} onError={() => setStatus('fallback')} />
    {status !== 'ready' && <StandingHero character={character} />}
  </span>;
}
