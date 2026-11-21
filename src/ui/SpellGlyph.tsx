import type { CSSProperties } from 'react';
import type { CharacterId } from '../game/types';

export const spellMotifs:Record<CharacterId,Record<number,string>>={
  champignon:{2:'broom',3:'mushroom-fortress',4:'spore-cyclone'},
  andromoss:{2:'alien-hourglass',3:'star-magnet',4:'rabbit-ufo'},
  'captain-bramble':{2:'tin-helmet',3:'helmet-sentinel',4:'iron-briar-cage'},
  duskmantle:{2:'ink-veil',3:'soul-lantern',4:'thorn-eye'},
  sprig:{2:'working-rake',3:'garden-shears',4:'twin-cultivator'},
};
/** Code-drawn pixel motifs. Only simulation time advances their discrete poses. */
export function SpellGlyph({character,tier,time,style}:{character:CharacterId;tier:number;time:number;style?:CSSProperties}) {
  const reduced=typeof window!=='undefined'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const frame=reduced?0:Math.floor(time/125)%8,p=frame/8,rock=[-12,-6,0,6,12,6,0,-6][frame];
  const motif=spellMotifs[character][tier];
  return <svg className="spell-glyph" style={style} viewBox="0 0 64 64" shapeRendering="crispEdges" overflow="visible" aria-hidden="true" data-motif={motif} data-frame={frame} data-asset="ready">
    <g stroke="#17212c" strokeWidth="2" strokeLinejoin="miter">
    {motif==='broom'&&<g transform={`rotate(${rock*2} 32 42)`}><path d="M32 8V39" stroke="#bd9361" strokeWidth="6"/><path d="M25 36H39L45 55H19Z" fill="#d2ad65"/><path d="M27 42L24 54M33 41V55M38 42L41 54" stroke="#8d622f"/><path d={`M${9+frame*3} 58h9`} stroke="#e6dfaf"/></g>}
    {motif==='mushroom-fortress'&&<><path d="M13 34V21H22V27H29V19H38V27H45V21H53V54H13Z" fill="#b4a0bc"/><path d="M26 54V42H39V54" fill="#51405f"/><path d="M6 35L11 26H23L28 35ZM38 35L43 26H55L60 35Z" fill="#b94b85"/><path d="M17 39V48M49 39V48" stroke="#f3d5af"/><path d={`M${12+frame*5} 17v-5`} stroke="#f5d49c"/></>}
    {motif==='spore-cyclone'&&<><path d="M24 12L19 3L31 7L39 2L41 13Z" fill="#f4cb66"/>{[0,1,2].map(i=><path key={i} d={`M${9+i*5} ${21+i*12}Q${p<.5?59:47} ${10+i*12} ${54-i*7} ${25+i*12}Q${p<.5?5:15} ${36+i*10} ${15+i*6} ${25+i*12}`} fill="none" stroke={i%2?'#edc2ed':'#b779ce'} strokeWidth="4"/>)}{[0,1,2].map(i=><rect key={i} x={8+(frame*6+i*17)%48} y={16+i*15} width="4" height="4" fill="#ffe4b8" stroke="none"/>)}</>}
    {motif==='alien-hourglass'&&<g transform={`rotate(${frame<4?0:180} 32 32)`}><path d="M17 9H47V15H17ZM17 49H47V55H17Z" fill="#d99b60"/><path d="M22 15H42V23L34 32L42 41V49H22V41L30 32L22 23Z" fill="#5a8594"/><path d={`M26 19H38L32 ${25+frame%4}ZM25 46L32 ${37-frame%4}L39 46Z`} fill="#ffdb8c" stroke="none"/><path d="M32 32V39" stroke="#ffdb8c"/></g>}
    {motif==='star-magnet'&&<><path d="M15 12H26V33Q32 43 38 33V12H49V35Q32 60 15 35Z" fill="#a965b9"/><path d="M15 12H26V22H15ZM38 12H49V22H38Z" fill="#d8e7ee"/>{[0,1,2].map(i=><path key={i} transform={`translate(${15+i*17} ${3+(frame*4+i*9)%22}) scale(.55)`} d="M0-6L2-2L7-2L3 1L4 6L0 3L-4 6L-3 1L-7-2L-2-2Z" fill="#ffe17f"/>)}</>}
    {motif==='rabbit-ufo'&&<g transform={`translate(0 ${frame%4<2?-2:1})`}><path d="M23 25V14Q32 4 41 14V25" fill="#a6e7ce"/><path d="M8 27L20 21H44L56 27V34L44 39H20L8 34Z" fill="#7a7fbc"/><path d="M19 30H45" stroke="#e2e4f4"/><path d="M24 43L20 60H44L40 43" fill="#86dbaa" fillOpacity={.2+p*.25} stroke="none"/><g transform={`translate(0 ${(frame*3)%12})`} fill="#f4b7bf"><path d="M28 45V36H31V43H34V36H37V45L40 48V53H25V48Z"/></g><path d={`M${15+frame*4} 34h4`} stroke="#ffcc78"/></g>}
    {motif==='tin-helmet'&&<g transform={`translate(0 ${frame%4===0?-2:0})`}><path d="M12 34V22L18 13H25L32 20L39 13H46L52 22V43L43 50H21L12 43Z" fill="#a1b4c2"/><path d="M17 35L28 38M36 38L47 35" stroke="#ef805e" strokeWidth="4"/><path d="M32 22V47" stroke="#dfe9e8"/><path d="M9 48H19M47 48H57" stroke="#f3d7a7"/></g>}
    {motif==='helmet-sentinel'&&<><path d="M10 52L16 21L9 8L25 11L32 20L39 11L55 8L48 21L54 52L32 59Z" fill="#46675c"/><path d="M19 32L28 36M36 36L45 32" stroke={frame%4<2?'#ff513e':'#d62739'} strokeWidth="5"/><path d="M32 25V49L24 44M32 49L40 44" fill="none" stroke="#a6c6ac"/><path d="M4 41L10 37M54 37L60 41" stroke="#e4bd70"/></>}
    {motif==='iron-briar-cage'&&<><path d="M12 53V26L20 11H44L52 26V53ZM12 27H52M12 49H52M23 13V53M41 13V53" fill="#3a465a" fillOpacity=".45" stroke="#b2b3cd" strokeWidth="3"/><path d="M9 49L19 43L12 37L24 30L18 23M44 48L54 42L46 35L55 28" fill="none" stroke="#88a57a" strokeWidth="3"/><path d={`M${23+frame*3} 19v7`} stroke="#eee5cb"/></>}
    {motif==='ink-veil'&&<>{[0,1,2].map(i=><path key={i} d={`M${11+i*16} 3Q${28+i*12+rock} 20 ${12+i*16} 32Q${i*16+rock} 46 ${20+i*16} 61L${5+i*16} 61Q${15+i*16} 42 ${3+i*16} 28Z`} fill={['#4c356c','#8763a3','#b58dca'][i]} fillOpacity=".8" stroke="none"/>)}</>}
    {motif==='soul-lantern'&&<g transform={`rotate(${rock/2} 32 9)`}><path d="M27 13V7H37V13M20 20H44L40 52H24ZM17 19H47M22 55H42" fill="#785a97" stroke="#d4acc9" strokeWidth="3"/><path d={`M32 24Q${21+frame%4} 38 30 46Q45 41 37 31L35 37Z`} fill="#c8e6be" stroke="none"/><path d="M27 23V47M38 23V47" stroke="#9f81ae"/></g>}
    {motif==='thorn-eye'&&<><path d="M5 32L15 23L12 12L25 17L32 4L39 17L52 12L49 23L59 32L49 41L52 52L39 47L32 60L25 47L12 52L15 41Z" fill="#54395f" stroke="#ae72ab"/><path d={`M15 32Q32 ${frame===4?30:13} 49 32Q32 ${frame===4?34:51} 15 32Z`} fill="#e3b6dd"/><path d="M30 24H35V40H30Z" fill="#452a57"/></>}
    {motif==='working-rake'&&<g transform={`translate(0 ${[0,2,5,8,5,2,0,0][frame]})`}><path d="M32 4V34" stroke="#b9905d" strokeWidth="6"/><path d="M13 33H51M14 33V48M26 33V48M38 33V48M50 33V48" fill="none" stroke="#a6c7c4" strokeWidth="4"/><path d="M10 54H22M30 56H42M46 52H56" stroke="#c7b385"/></g>}
    {motif==='garden-shears'&&<><g transform={`rotate(${rock} 32 31)`}><path d="M29 33L13 5L31 20L35 30Z" fill="#c4dfdc"/><path d="M30 34L19 45Q8 62 24 56L35 39Z" fill="#80b38a"/></g><g transform={`rotate(${-rock} 32 31)`}><path d="M35 33L51 5L33 20L29 30Z" fill="#e0e8c5"/><path d="M34 34L45 45Q56 62 40 56L29 39Z" fill="#b7cb86"/></g><rect x="29" y="29" width="6" height="6" fill="#d8b86c"/><path d="M8 21L13 25M51 25L56 21" stroke="#e5e7b7"/></>}
    {motif==='twin-cultivator'&&<><path d="M14 15H50V38H14Z" fill="#729989"/><path d="M23 15V6H41V15" fill="#b7c3b0"/>{[19,45].map(x=><g key={x} transform={`rotate(${frame*45} ${x} 43)`}><path d={`M${x-12} 39H${x-4}V31H${x+4}V39H${x+12}V47H${x+4}V55H${x-4}V47H${x-12}Z`} fill="#d3b47a"/><rect x={x-4} y="39" width="8" height="8" fill="#506b67"/></g>)}<path d="M29 22H35V29H29Z" fill="#d8e9b7"/></>}
    </g>
  </svg>;
}
