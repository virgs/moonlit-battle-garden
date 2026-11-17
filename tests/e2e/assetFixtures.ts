import { deflateSync } from 'node:zlib';
import type { Page } from '@playwright/test';

// Synthetic test pixels, not final game artwork. Exercises real browser image decoding.
export function png(width: number, height: number): Buffer {
  const crc = (data: Buffer) => {
    let value = 0xffffffff;
    for (const byte of data) { value ^= byte; for (let n = 0; n < 8; n++) value = (value >>> 1) ^ (value & 1 ? 0xedb88320 : 0); }
    return (value ^ 0xffffffff) >>> 0;
  };
  const chunk = (type: string, data: Buffer) => {
    const name = Buffer.from(type), length = Buffer.alloc(4), checksum = Buffer.alloc(4);
    length.writeUInt32BE(data.length); checksum.writeUInt32BE(crc(Buffer.concat([name, data])));
    return Buffer.concat([length, name, data, checksum]);
  };
  const header = Buffer.alloc(13); header.writeUInt32BE(width); header.writeUInt32BE(height, 4); header[8] = 8; header[9] = 6;
  const pixels = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const index = y * (width * 4 + 1) + 1 + x * 4;
    pixels[index] = (Math.floor(x / 128) * 29 + 40) % 255; pixels[index + 1] = 180; pixels[index + 2] = 100; pixels[index + 3] = 255;
  }
  return Buffer.concat([Buffer.from('89504e470d0a1a0a', 'hex'), chunk('IHDR', header), chunk('IDAT', deflateSync(pixels)), chunk('IEND', Buffer.alloc(0))]);
}
export async function supplyFinalArt(page: Page, validCast = true): Promise<void> {
  const portrait = png(256, 256), background = png(512, 256), cast = png(validCast ? 1024 : 128, 128);
  await page.route(/\/assets\/(characters|homes)\//, route => {
    const url = route.request().url();
    if (url.endsWith('/music.mp3')) return route.fulfill({ status: 404 });
    return route.fulfill({ contentType: 'image/png', body: (url.includes('/cast-') || url.includes('/effect-')) ? cast : url.endsWith('/standing.png') ? png(1024,160) : url.endsWith('/portrait.png') ? portrait : background });
  });
}
