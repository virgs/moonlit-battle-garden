import { menuLabels } from './menuContent';
import './mode-icon.css';

type Mode = keyof typeof menuLabels;
/** Crisp vector pictograms share the game's pixel grid; no bitmap assets are generated. */
export function ModeIcon({ mode, decorative=false }: { mode:Mode; decorative?:boolean }) {
  return <span className={`mode-icon mode-icon-${mode}`} data-mode={mode} role={decorative?undefined:'img'} aria-label={decorative?undefined:menuLabels[mode]} aria-hidden={decorative||undefined} title={menuLabels[mode]}>
    <svg viewBox="0 0 24 24" aria-hidden="true" shapeRendering="crispEdges">
      {mode==='ai'&&<><path className="mode-frame" d="M6 6h12v12H6zM8 2v4m4-4v4m4-4v4M8 18v4m4-4v4m4-4v4M2 8h4m-4 4h4m-4 4h4m12-8h4m-4 4h4m-4 4h4"/><path className="mode-fill" d="M9 9h2v2H9zm4 0h2v2h-2zm-4 5h6v2H9z"/></>}
      {mode==='local'&&<><path className="mode-frame" d="M2 5h20v14H2zM12 5v14"/><path className="mode-blue" d="M4 8h2v2H4zm4 0h2v2H8zm-4 4h2v2H4zm4 0h2v2H8zm-4 4h6v1H4z"/><path className="mode-red" d="M14 8h2v2h-2zm4 0h2v2h-2zm-4 4h2v2h-2zm4 0h2v2h-2zm-4 4h6v1h-6z"/></>}
      {mode==='online'&&<path className="mode-frame" d="M8 2h8v2h4v4h2v8h-2v4h-4v2H8v-2H4v-4H2V8h2V4h4ZM2 9h20M2 15h20M10 2v4H8v12h2v4m4-20v4h2v12h-2v4"/>}
      {mode==='options'&&<><path className="mode-frame" d="M8 3h8v4h5v13H3V7h5ZM8 7h8M3 12h18"/><path className="mode-fill" d="M10 10h4v5h-4z"/></>}
      {mode==='help'&&<><path className="mode-frame" d="M2 4h7l3 2 3-2h7v16h-7l-3 2-3-2H2ZM12 6v16M5 8h4m-4 4h4m-4 4h4m6-8h4m-4 4h4m-4 4h4"/></>}
    </svg>
  </span>;
}
