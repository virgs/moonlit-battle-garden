import { assetUrl } from '../assets/url';
const cache = new Map<string, Promise<{ width: number; height: number } | null>>();

/** Optional presentation art never blocks match startup or throws on a missing file. */
export function inspectImage(src: string): Promise<{ width: number; height: number } | null> {
  if (!cache.has(src)) cache.set(src, new Promise(resolve => {
    const image = new Image();
    image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => resolve(null);
    image.src = assetUrl(src);
  }));
  return cache.get(src)!;
}
