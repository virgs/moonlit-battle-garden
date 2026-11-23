import { useEffect } from 'react';

/** Apply to the app and standalone arena previews, including menus/results. */
export function useGameInteraction() {
  useEffect(() => {
    const tab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' && event.code !== 'Tab') return;
      event.preventDefault();
      // The arena may handle Tab as magic; browser focus navigation stays disabled.
    };
    const selection = (event: Event) => event.preventDefault();
    window.addEventListener('keydown', tab, true);
    window.addEventListener('keyup', tab, true);
    document.addEventListener('selectstart', selection, true);
    return () => {
      window.removeEventListener('keydown', tab, true);
      window.removeEventListener('keyup', tab, true);
      document.removeEventListener('selectstart', selection, true);
    };
  }, []);
}
