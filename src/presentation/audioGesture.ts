import { assetUrl } from '../assets/url';
let context: AudioContext | null = null;
let primedMusic: HTMLAudioElement | null = null;

export function soundContext(): AudioContext | null { return context; }
/** Call synchronously from Enter/Create/Join so later network/audio loads retain a gesture-unlocked player. */
export function prepareAudio(): void {
  if (typeof window.AudioContext === 'function') {
    context ??= new AudioContext();
    void context.resume().catch(() => {});
  }
  if (!primedMusic) {
    primedMusic = new Audio(assetUrl('/assets/backgroundMusic.mp3'));
    primedMusic.volume = 0; primedMusic.loop = true;
    void primedMusic.play().catch(() => {});
  }
}
export function takePrimedMusic(): HTMLAudioElement | undefined {
  const audio = primedMusic; primedMusic = null; return audio ?? undefined;
}
export function discardPrimedMusic(): void {
  primedMusic?.pause(); primedMusic = null;
}
