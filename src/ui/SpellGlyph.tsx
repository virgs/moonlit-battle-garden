import { useEffect,useState,type CSSProperties } from 'react';
import type { CharacterId } from '../game/types';
import { assetUrl } from '../assets/url';
import { presentation,validSheet } from '../presentation/config';
import { inspectImage } from '../presentation/images';
import { spellMotifs,signatureColours } from '../presentation/spellIdentity';
export { spellMotifs } from '../presentation/spellIdentity';
/** Raster-only art: the SVG is just a uniformly scaled sprite-sheet viewport. */
export function SpellGlyph({character,tier,time,style,className=''}:{character:CharacterId;tier:number;time:number;style?:CSSProperties;className?:string}){
 const clip=presentation[character].effects[tier],[ready,setReady]=useState(false);
 useEffect(()=>{let alive=true;setReady(false);void inspectImage(clip.src).then(image=>{if(alive)setReady(!!image&&validSheet(clip,image.width,image.height));});return()=>{alive=false;};},[clip]);
 const reduced=typeof window!=='undefined'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const frame=reduced?0:Math.floor(time*clip.fps/1000)%clip.frameCount;
 return <svg className={`spell-glyph ${className}`.trim()} style={style} viewBox={`0 0 ${clip.frameWidth} ${clip.frameHeight}`} overflow="hidden" aria-hidden="true" data-character={character} data-tier={tier} data-motif={spellMotifs[character][tier]} data-signature-colour={signatureColours[character]} data-frame={frame} data-asset={ready?'ready':'loading'}>
  <image href={assetUrl(clip.src)} width={clip.columns*clip.frameWidth} height={Math.ceil(clip.frameCount/clip.columns)*clip.frameHeight} x={-(frame%clip.columns)*clip.frameWidth} y={-Math.floor(frame/clip.columns)*clip.frameHeight}/>
 </svg>;
}
