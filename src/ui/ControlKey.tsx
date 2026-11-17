import { assetUrl } from '../assets/url';

export function ControlKey({ label }: { label: string }) {
  const file = label === '+' ? 'blank' : label.toLowerCase();
  return <kbd className="control-key" aria-label={label}><img src={assetUrl(`/assets/input/${file}.png`)} alt="" draggable={false} />{label === '+' && <svg className="key-symbol" viewBox="0 0 16 16" aria-hidden="true"><path d="M7 4h2v3h3v2H9v3H7V9H4V7h3z" /></svg>}</kbd>;
}
