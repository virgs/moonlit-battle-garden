import { useEffect, useState } from 'react';
import type { CharacterId } from '../game/types';
import { VictoryHero } from './VictoryHero';
import { Trophy } from './LegacyRewards';
import './match-end.css';

export const MATCH_END_DELAY_MS = 4000;

/** A fresh input after the victory hold dismisses the screen; the winning input never does. */
export function MatchEnd({ winner, leave, round = false, character }: { winner: string; leave: () => void; round?: boolean; character?: CharacterId }) {
  const [ready, setReady] = useState(false);
  useEffect(() => { const timer = setTimeout(() => setReady(true), MATCH_END_DELAY_MS); return () => clearTimeout(timer); }, []);
  useEffect(() => {
    if (!ready) return;
    const key = (event: KeyboardEvent) => {
      if (event.repeat || event.ctrlKey || event.metaKey || event.altKey || ['Shift', 'Control', 'Alt', 'Meta'].includes(event.key)) return;
      event.preventDefault(); leave();
    };
    const pointer = (event: PointerEvent) => { if (event.button === 0) { event.preventDefault(); leave(); } };
    const gamepad = () => {
      try {
        const pads = navigator.getGamepads?.() ?? [];
        return [...pads].some(pad => pad?.buttons.some(button => button.pressed));
      } catch { return false; } // Some embedded browsers disallow the optional Gamepad API.
    };
    // A held gamepad button must be released before it counts as a new press.
    let held = gamepad();
    const timer = setInterval(() => { const pressed = gamepad(); if (pressed && !held) leave(); held = pressed; }, 100);
    window.addEventListener('keydown', key);
    window.addEventListener('pointerdown', pointer);
    return () => { clearInterval(timer); window.removeEventListener('keydown', key); window.removeEventListener('pointerdown', pointer); };
  }, [ready, leave]);
  return <section role="region" className="match-end" aria-label={round ? 'Round result' : 'Match result'} data-ready={ready}>
    {round || !character ? <Trophy wins={1} celebration /> : <VictoryHero character={character} />}
    <h1>{winner}</h1>
    <p className={`continue-prompt ${ready ? 'ready' : ''}`} role="status" aria-hidden={!ready}>{ready ? round ? 'Press any key or tap for the next round' : 'Press any key or tap to return to the menu' : ''}</p>
  </section>;
}
