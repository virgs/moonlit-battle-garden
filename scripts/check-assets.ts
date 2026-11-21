import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
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
  // All spell tiers share one character casting sheet. Count each file once.
  const unique=new Map(expected.map(item=>[item.path,item]));
  for (const item of unique.values()) {
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
// Staged homes are ready assets, even though their characters are not playable.
const catalog = JSON.parse(readFileSync('public/assets/homes/catalog.json', 'utf8')) as { homes: { id: string; character: string | null; background: string; music: string }[] };
const provenance = JSON.parse(readFileSync('public/assets/homes/provenance.json', 'utf8')) as { assets: { home?: string; character?: string; file: string; installedSha256: string }[] };
if (catalog.homes.length !== 8 || new Set(catalog.homes.map(home => home.id)).size !== 8) {
  invalid++; console.log('INVALID home catalog: expected eight distinct homes');
}
for (const home of catalog.homes) {
  for (const path of [home.background, home.music]) {
    const file = resolve('public/assets/homes', path);
    const source = provenance.assets.find(asset => `${asset.home ?? asset.character}/${asset.file}` === path);
    if (!existsSync(file) || !source || createHash('sha256').update(readFileSync(file)).digest('hex') !== source.installedSha256) {
      invalid++; console.log(`INVALID home asset/provenance: ${path}`);
    } else if (!home.character) {
      present++; console.log(`READY   /assets/homes/${path} (staged)`);
    }
  }
}
console.log(`${present} ready, ${missing} awaiting final assets, ${invalid} invalid. Missing files use prototype fallbacks.`);
if (invalid || (process.argv.includes('--strict') && missing)) process.exitCode = 1;
