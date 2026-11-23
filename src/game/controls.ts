import type { GameAction, MatchOptions } from './types';

/** Board order is row-major: top left through bottom right. Shared by input and its menu reference. */
export const keyboardLayouts = [
  { labels: ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'], codes: ['KeyQ', 'KeyW', 'KeyE', 'KeyA', 'KeyS', 'KeyD', 'KeyZ', 'KeyX', 'KeyC'], castLabel: 'R', castCode: 'KeyR' },
  { labels: ['7', '8', '9', '4', '5', '6', '1', '2', '3'], codes: ['Numpad7', 'Numpad8', 'Numpad9', 'Numpad4', 'Numpad5', 'Numpad6', 'Numpad1', 'Numpad2', 'Numpad3'], castLabel: '+', castCode: 'NumpadAdd' },
] as const;

/** One human owns both layouts; local two-player keeps separate keyboard halves. */
export function keyboardAction(code: string, mode: MatchOptions['mode']): GameAction | null {
  // Laptop keyboards can use the number row when no separate numpad is present.
  const physicalCode = mode !== 'local' && /^Digit[1-9]$/.test(code) ? code.replace('Digit', 'Numpad') : code;
  for (const [index, layout] of keyboardLayouts.entries()) {
    const player = mode === 'local' && index === 1 ? 1 : 0;
    const hole = (layout.codes as readonly string[]).indexOf(physicalCode);
    if (hole >= 0) return { type: 'hit', player, hole };
    if (code === layout.castCode) return { type: 'cast', player };
  }
  return null;
}
