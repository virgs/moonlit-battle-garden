/** Pack PixelLab's original frame + eight generated PNG frames, without scaling. */
import { chromium } from '@playwright/test';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
const [source, destination] = process.argv.slice(2);
if (!source || !destination) throw new Error('Usage: node scripts/pack-victory-sprites.mjs FRAME_DIRECTORY OUTPUT.png');
const frames = await Promise.all(Array.from({ length: 9 }, (_, index) => readFile(resolve(source, `${index}.png`)).then(buffer => buffer.toString('base64'))));
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  const sheet = await page.evaluate(async frames => {
    const images = await Promise.all(frames.map(async data => { const image = new Image(); image.src = `data:image/png;base64,${data}`; await image.decode(); return image; }));
    if (images.some(image => image.width !== 128 || image.height !== 160)) throw new Error('Expected 128×160 frames');
    const canvas = document.createElement('canvas'); canvas.width = 128 * images.length; canvas.height = 160;
    const context = canvas.getContext('2d'); context.imageSmoothingEnabled = false;
    images.forEach((image, index) => context.drawImage(image, index * 128, 0));
    return canvas.toDataURL('image/png').split(',')[1];
  }, frames);
  await mkdir(dirname(resolve(destination)), { recursive: true });
  await writeFile(destination, Buffer.from(sheet, 'base64'));
} finally { await browser.close(); }
