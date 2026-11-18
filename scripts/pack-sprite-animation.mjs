/** Pack numbered PixelLab PNG frames without resizing, recoloring or trimming. */
import { chromium } from '@playwright/test';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const [source, destination, countArgument] = process.argv.slice(2);
const count = Number(countArgument);
if (!source || !destination || !Number.isInteger(count) || count < 2) throw new Error('Usage: node scripts/pack-sprite-animation.mjs FRAME_DIRECTORY OUTPUT.png FRAME_COUNT');
const frames = await Promise.all(Array.from({ length: count }, (_, index) => readFile(resolve(source, `${index}.png`)).then(buffer => buffer.toString('base64'))));
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  const result = await page.evaluate(async frames => {
    const images = await Promise.all(frames.map(async data => { const image = new Image(); image.src = `data:image/png;base64,${data}`; await image.decode(); return image; }));
    const { width, height } = images[0];
    if (images.some(image => image.width !== width || image.height !== height)) throw new Error('Animation frames must have identical dimensions');
    const canvas = document.createElement('canvas'); canvas.width = width * images.length; canvas.height = height;
    const context = canvas.getContext('2d'); context.imageSmoothingEnabled = false;
    images.forEach((image, index) => context.drawImage(image, index * width, 0));
    return { png: canvas.toDataURL('image/png').split(',')[1], frameWidth: width, frameHeight: height, frameCount: images.length };
  }, frames);
  await mkdir(dirname(resolve(destination)), { recursive: true });
  await writeFile(destination, Buffer.from(result.png, 'base64'));
  console.log(JSON.stringify({ destination, frameWidth: result.frameWidth, frameHeight: result.frameHeight, frameCount: result.frameCount }));
} finally { await browser.close(); }
