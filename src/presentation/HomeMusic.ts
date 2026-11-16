import { assetUrl } from '../assets/url';
import type { MusicAsset } from './config';

/** Native audio with optional loop points and a safe shared-track fallback. */
export class HomeMusic {
  readonly audio: HTMLAudioElement;
  private wanted = false;
  private fallback = false;
  private disposed = false;

  constructor(private asset: MusicAsset, primed?: HTMLAudioElement) {
    this.audio = primed ?? new Audio(assetUrl(asset.src));
    if (primed) this.audio.src = assetUrl(asset.src);
    this.audio.volume = asset.volume;
    this.audio.loop = asset.loopStartMs === 0 && asset.loopEndMs === null;
    this.audio.addEventListener('error', this.useFallback);
    this.audio.addEventListener('timeupdate', this.checkLoop);
    this.audio.addEventListener('ended', this.restart);
  }
  setPlaying(wanted: boolean): void {
    if (wanted === this.wanted || this.disposed) return;
    this.wanted = wanted;
    if (wanted) this.play();
    else this.audio.pause();
  }
  private play(): void {
    if (this.wanted && !this.disposed) void this.audio.play().catch(error => {
      // Autoplay rejection needs another user gesture, not an unrelated fallback track.
      if (error?.name !== 'NotAllowedError' && error?.name !== 'AbortError') this.useFallback();
    });
  }
  private useFallback = (): void => {
    if (this.fallback || this.disposed) return;
    this.fallback = true;
    this.audio.src = assetUrl(this.asset.fallback);
    this.audio.loop = true;
    this.audio.load();
    this.play();
  };
  private checkLoop = (): void => {
    if (!this.fallback && this.asset.loopEndMs !== null && this.audio.currentTime * 1000 >= this.asset.loopEndMs) this.restart();
  };
  private restart = (): void => {
    if (!this.wanted || this.disposed) return;
    this.audio.currentTime = this.fallback ? 0 : this.asset.loopStartMs / 1000;
    this.play();
  };
  dispose(): void {
    this.wanted = false;
    this.disposed = true;
    this.audio.pause();
    this.audio.removeEventListener('error', this.useFallback);
    this.audio.removeEventListener('timeupdate', this.checkLoop);
    this.audio.removeEventListener('ended', this.restart);
  }
}
