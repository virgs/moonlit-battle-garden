import { openSelection, enterMatch } from './frontMenu';
import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

for (const available of [true, false]) test(`home music uses ${available ? 'the supplied final track' : 'the shared fallback'} and follows sound/pause controls`, async ({ page }) => {
  await page.addInitScript(() => {
    const Original = window.Audio;
    const elements: HTMLAudioElement[] = [];
    Object.defineProperty(window, '__testAudio', { value: elements });
    const TrackedAudio = function(src?: string) { const audio = new Original(src); elements.push(audio); return audio; };
    TrackedAudio.prototype = Original.prototype;
    window.Audio = TrackedAudio as unknown as typeof Audio;
  });
  const track = readFileSync('public/assets/backgroundMusic.mp3');
  await page.route(/\/assets\/homes\/[^/]+\/music\.mp3$/, route => available
    ? route.fulfill({ contentType: 'audio/mpeg', body: track })
    : route.fulfill({ status: 404 }));
  await openSelection(page);
  await enterMatch(page);
  const music = () => page.evaluate(() => {
    const elements = (window as Window & { __testAudio?: HTMLAudioElement[] }).__testAudio ?? [];
    const audio = elements.find(item => item.src.includes('/assets/homes/') || item.src.endsWith('/backgroundMusic.mp3'));
    return audio ? { src: audio.src, paused: audio.paused, time: audio.currentTime, loop: audio.loop } : null;
  });
  await expect.poll(async () => (await music())?.src).toMatch(available ? /\/assets\/homes\// : /\/backgroundMusic\.mp3$/);
  await expect.poll(async () => (await music())?.time ?? 0).toBeGreaterThan(0);
  expect((await music())?.loop).toBe(true);
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  await expect.poll(async () => (await music())?.paused).toBe(true);
  await page.getByRole('button', { name: 'Resume', exact: true }).click();
  await expect.poll(async () => (await music())?.paused).toBe(false);
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  await page.getByRole('button', { name: 'Mute', exact: true }).click();
  await page.getByRole('button', { name: 'Resume', exact: true }).click();
  await expect.poll(async () => (await music())?.paused).toBe(true);
});
