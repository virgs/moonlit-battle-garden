import { assetUrl } from '../assets/url';
import { menuLabels } from './menuContent';
import './mode-icon.css';

type Mode = keyof typeof menuLabels;
/** Shared PixelLab mode artwork across menus, gameplay and pause. */
export function ModeIcon({ mode, decorative=false }: { mode:Mode; decorative?:boolean }) {
  if(mode==='ai'||mode==='local'||mode==='online')return <span className={`mode-icon mode-icon-${mode}`} data-mode={mode} role={decorative?undefined:'img'} aria-label={decorative?undefined:menuLabels[mode]} aria-hidden={decorative||undefined} title={menuLabels[mode]}><img src={assetUrl(`/assets/ui/modes/${mode}.png`)} alt=""/></span>;
  return <span className={`mode-icon mode-icon-${mode}`} data-mode={mode} role={decorative?undefined:'img'} aria-label={decorative?undefined:menuLabels[mode]} aria-hidden={decorative||undefined} title={menuLabels[mode]}>
    <svg viewBox="0 0 24 24" aria-hidden="true" shapeRendering="crispEdges">
      {mode==='options'&&<><path className="mode-frame" d="M8 3h8v4h5v13H3V7h5ZM8 7h8M3 12h18"/><path className="mode-fill" d="M10 10h4v5h-4z"/></>}
      {mode==='help'&&<><path className="mode-frame" d="M2 4h7l3 2 3-2h7v16h-7l-3 2-3-2H2ZM12 6v16M5 8h4m-4 4h4m-4 4h4m6-8h4m-4 4h4m-4 4h4"/></>}
    </svg>
  </span>;
}
