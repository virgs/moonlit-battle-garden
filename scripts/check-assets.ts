import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { presentation, validSheet } from '../src/presentation/config';

let missing = 0, invalid = 0, present = 0;
for (const [id, character] of Object.entries(presentation)) {
  const expected = [
    { path: character.portrait, clip: null },
    { path: character.icon, clip: null },
    { path: character.victory.src, clip: character.victory },
    { path: character.standing.src, clip: character.standing },
    { path: character.home.background.src, clip: null },
    { path: character.home.music.src, clip: null },
    ...Object.values(character.effects).map(clip => ({ path: clip.src, clip })),
    ...Object.values(character.casts).map(clip => ({ path: clip.src, clip })),
    ...Object.values(character.casts).flatMap(clip => clip.sound ? [{ path: clip.sound, clip: null }] : []),
  ];
  for (const item of expected) {
    const file = resolve('public', item.path.slice(1));
    if (!existsSync(file)) { missing++; console.log(`MISSING ${item.path}`); continue; }
    if (item.clip) {
      const data = readFileSync(file);
      if (data.length < 24 || data.toString('hex', 0, 8) !== '89504e470d0a1a0a' || !validSheet(item.clip, data.readUInt32BE(16), data.readUInt32BE(20))) {
        invalid++; console.log(`INVALID ${item.path}: expected ${item.clip.columns * item.clip.frameWidth}×${Math.ceil(item.clip.frameCount / item.clip.columns) * item.clip.frameHeight} PNG`); continue;
      }
    }
    present++; console.log(`READY   ${item.path}`);
  }
  for (const fallback of [character.home.background.fallback, character.home.music.fallback]) {
    if (!existsSync(resolve('public', fallback.slice(1)))) { invalid++; console.log(`INVALID ${id}: missing fallback ${fallback}`); }
  }
}
console.log(`${present} ready, ${missing} awaiting final assets, ${invalid} invalid. Missing files use prototype fallbacks.`);
if (invalid || (process.argv.includes('--strict') && missing)) process.exitCode = 1;
