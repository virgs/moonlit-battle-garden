import { useEffect,useState,useId,type CSSProperties } from 'react';
import type { CharacterId } from '../game/types';
import { assetUrl } from '../assets/url';
import { presentation,validSheet } from '../presentation/config';
import { inspectImage } from '../presentation/images';
import { spellMotifs,signatureColours } from '../presentation/spellIdentity';
export { spellMotifs } from '../presentation/spellIdentity';
// Integer-pixel scanlines give a circular backing a stepped edge without a smooth stroke.
function pixelDisc(radius:number):string {
 return Array.from({length:48},(_,y)=>{
  const span=Math.sqrt(Math.max(0,radius*radius-(y-23.5)**2));
  const left=Math.max(0,Math.ceil(23.5-span)),right=Math.min(47,Math.floor(23.5+span));
  return (y-23.5)**2<=radius*radius&&right>=left?`M${left} ${y}h${right-left+1}v1H${left}Z`:'';
 }).join('');
}
const backingPaths=[pixelDisc(24),pixelDisc(23),pixelDisc(22)];
/** Uniform raster-sheet viewport; optional backing stays outside the duration layer. */
export function SpellGlyph({character,tier,time,style,className='',remaining,backed=false,outlined=false}:{character:CharacterId;tier:number;time:number;style?:CSSProperties;className?:string;remaining?:number;backed?:boolean;outlined?:boolean}){
 const id=useId().replace(/:/g,''),timed=remaining!==undefined;
 const clip=presentation[character].effects[tier],[ready,setReady]=useState(false);
 useEffect(()=>{let alive=true;setReady(false);void inspectImage(clip.src).then(image=>{if(alive)setReady(!!image&&validSheet(clip,image.width,image.height));});return()=>{alive=false;};},[clip]);
 const reduced=typeof window!=='undefined'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const frame=reduced?0:Math.floor(time*clip.fps/1000)%clip.frameCount;
 const fraction=timed?Math.max(0,Math.min(1,remaining)):undefined;
 const darkRows=fraction===undefined?0:Math.round(clip.frameHeight*(1-fraction));
 const tint=[1,3,5].map(start=>parseInt(signatureColours[character].slice(start,start+2),16)/255*.13);
 const sheet={href:assetUrl(clip.src),width:clip.columns*clip.frameWidth,height:Math.ceil(clip.frameCount/clip.columns)*clip.frameHeight,x:-(frame%clip.columns)*clip.frameWidth,y:-Math.floor(frame/clip.columns)*clip.frameHeight};
 return <svg className={`spell-glyph ${className}`.trim()} style={style} viewBox={`0 0 ${clip.frameWidth} ${clip.frameHeight}`} overflow={outlined?'visible':'hidden'} aria-hidden="true" data-character={character} data-tier={tier} data-motif={spellMotifs[character][tier]} data-signature-colour={signatureColours[character]} data-frame={frame} data-asset={ready?'ready':'loading'} data-remaining={fraction} data-dark-rows={timed?darkRows:undefined} data-backed={backed||undefined} data-outlined={outlined||undefined}>
  {backed&&<g className="spell-backing" shapeRendering="crispEdges" transform={`scale(${clip.frameWidth/48} ${clip.frameHeight/48})`}>
   <path d={backingPaths[0]} fill="#030910"/>
   <path d={backingPaths[1]} fill={signatureColours[character]}/>
   <path d={backingPaths[2]} fill="#08111c" fillOpacity=".97"/>
  </g>}
  {outlined&&<defs>
   <clipPath id={`${id}-frame`}><rect width={clip.frameWidth} height={clip.frameHeight}/></clipPath>
   <filter className="spell-outline" id={`${id}-outline`} filterUnits="userSpaceOnUse" x="-6" y="-6" width={clip.frameWidth+12} height={clip.frameHeight+12} colorInterpolationFilters="sRGB">
    <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="outer"/>
    <feFlood floodColor="#071018" result="dark"/><feComposite in="dark" in2="outer" operator="in" result="darkEdge"/>
    <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="inner"/>
    <feFlood floodColor={signatureColours[character]} floodOpacity=".85" result="hero"/><feComposite in="hero" in2="inner" operator="in" result="heroEdge"/>
    <feMerge><feMergeNode in="darkEdge"/><feMergeNode in="heroEdge"/><feMergeNode in="SourceGraphic"/></feMerge>
   </filter>
  </defs>}
  {timed&&<defs>
   <filter id={`${id}-shade`} colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values={`.2 0 0 0 ${tint[0]} 0 .2 0 0 ${tint[1]} 0 0 .2 0 ${tint[2]} 0 0 0 1 0`}/></filter>
   <clipPath id={`${id}-elapsed`}><rect width={clip.frameWidth} height={darkRows}/></clipPath>
  </defs>}
  {outlined?<g filter={`url(#${id}-outline)`}><g clipPath={`url(#${id}-frame)`}><image {...sheet}/></g></g>:<image {...sheet}/>}
  {timed&&<g className="spell-elapsed" clipPath={`url(#${id}-elapsed)`}><image {...sheet} filter={`url(#${id}-shade)`}/></g>}
 </svg>;
}
