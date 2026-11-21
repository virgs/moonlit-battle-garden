import { expect,it } from 'vitest';
import { readFileSync } from 'node:fs';
import { inflateSync } from 'node:zlib';
import { presentation } from '../../src/presentation/config';
import { characterIds } from '../../src/game/types';
import { signatureColours } from '../../src/presentation/spellIdentity';

function decode(path:string){
 const png=readFileSync(path),width=png.readUInt32BE(16),height=png.readUInt32BE(20),chunks:Buffer[]=[];
 for(let offset=8;offset<png.length;){const length=png.readUInt32BE(offset);if(png.toString('ascii',offset+4,offset+8)==='IDAT')chunks.push(png.subarray(offset+8,offset+8+length));offset+=12+length;}
 const raw=inflateSync(Buffer.concat(chunks)),poses=Array.from({length:8},()=>[] as string[]);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const pixel=raw.subarray(y*(width*4+1)+1+x*4,y*(width*4+1)+1+x*4+4);
  expect([0,255]).toContain(pixel[3]);poses[Math.floor(x/48)].push(pixel[3]?'#'+pixel.subarray(0,3).toString('hex'):'');
 }
 return {png,width,height,poses};
}
it('keeps20 bolder review candidates separate, preserving colours and stronger motion',()=>{
 let oldColours=0,newColours=0,oldInk=0,newInk=0,oldMotion=0,newMotion=0;
 for(const hero of characterIds)for(const tier of [1,2,3,4]){
  const clip=presentation[hero].effects[tier];expect(clip.src).toContain('/pixel-spells/');
  const old=decode('public'+clip.src),candidate=decode(`public/assets/effects/pixel-spells-bold/${hero}-${tier}.png`);
  expect(candidate.width).toBe(384);expect(candidate.height).toBe(48);expect(candidate.png.equals(old.png)).toBe(false);
  expect(new Set(candidate.poses.map(p=>p.join(','))).size).toBeGreaterThan(1);
  for(let f=0;f<8;f++){
   const pixels=candidate.poses[f],palette=new Set(pixels.filter(Boolean));
   expect(palette,`${hero}${tier} frame${f}`).toContain(signatureColours[hero]);
   expect(palette.size).toBeGreaterThanOrEqual(8);
   for(let x=0;x<48;x++){expect(pixels[x]).toBe('');expect(pixels[47*48+x]).toBe('');}
   for(let y=0;y<48;y++){expect(pixels[y*48]).toBe('');expect(pixels[y*48+47]).toBe('');}
   oldColours+=new Set(old.poses[f].filter(Boolean)).size;newColours+=palette.size;
   oldInk+=old.poses[f].filter(c=>c==='#1c2233').length;newInk+=pixels.filter(c=>c==='#1c2233').length;
   if(f){for(let i=0;i<pixels.length;i++){if(!!pixels[i]!==!!candidate.poses[f-1][i])newMotion++;if(!!old.poses[f][i]!==!!old.poses[f-1][i])oldMotion++;}}
  }
 }
 expect(newColours).toBeGreaterThan(oldColours);expect(newInk).toBeGreaterThan(oldInk);expect(newMotion).toBeGreaterThan(oldMotion);
});
