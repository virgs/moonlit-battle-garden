import { assetUrl } from '../assets/url';
import './control-key.css';

const menuKeys:Record<string,{x:number;y:number;width:number}>={
  Esc:{x:0,y:0,width:16}, Enter:{x:64,y:96,width:32}, 'Numpad Enter':{x:64,y:96,width:32},
  ArrowLeft:{x:0,y:80,width:16}, ArrowRight:{x:16,y:80,width:16},
};
export function KeyHint({ label }: { label:string }) {
  return <span className="key-hint" aria-hidden="true"><ControlKey label={label} /></span>;
}
export function ControlKey({ label }: { label: string }) {
  const menu=menuKeys[label];
  if(menu)return <kbd className="control-key atlas-key" aria-label={label} style={{aspectRatio:`${menu.width}/16`,width:`calc(var(--control-size, 26px) * ${menu.width/16})`}}><svg viewBox={`0 0 ${menu.width} 16`} aria-hidden="true"><image href={assetUrl('/assets/input/menu-keys.png')} width="448" height="128" x={-menu.x} y={-menu.y} /></svg></kbd>;
  const file = label === '+' || label === 'Tab' ? 'blank' : label.toLowerCase();
  return <kbd className="control-key" aria-label={label}><img src={assetUrl(`/assets/input/${file}.png`)} alt="" draggable={false} />{label === '+' && <svg className="key-symbol" viewBox="0 0 16 16" aria-hidden="true"><path d="M7 4h2v3h3v2H9v3H7V9H4V7h3z" /></svg>}{label === 'Tab' && <svg className="key-symbol" viewBox="0 0 16 16" aria-hidden="true"><text x="8" y="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="5" style={{textShadow:'none'}}>Tab</text></svg>}</kbd>;
}
