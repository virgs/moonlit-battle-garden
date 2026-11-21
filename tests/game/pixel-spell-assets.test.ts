import { expect,it } from 'vitest';
import { readFileSync } from 'node:fs';
import { inflateSync } from 'node:zlib';
import { presentation,validSheet } from '../../src/presentation/config';
import { signatureColours,spellMotifs } from '../../src/presentation/spellIdentity';
import { characterIds } from '../../src/game/types';

it('ships20 shaded raster loops with hero colours, hard alpha and genuinely different frames',()=>{
 const silhouettes=new Set<string>();
 for(const hero of characterIds)for(const tier of [1,2,3,4]){
  const clip=presentation[hero].effects[tier],png=readFileSync('public'+clip.src),width=png.readUInt32BE(16),height=png.readUInt32BE(20);
  expect(validSheet(clip,width,height)).toBe(true);expect(clip.frameWidth).toBe(48);expect(clip.fps).toBe(8);expect(png[25]).toBe(6);
  const chunks:Buffer[]=[];for(let offset=8;offset<png.length;){const length=png.readUInt32BE(offset),kind=png.toString('ascii',offset+4,offset+8);if(kind==='IDAT')chunks.push(png.subarray(offset+8,offset+8+length));offset+=12+length;}
  const raw=inflateSync(Buffer.concat(chunks)),poses=new Set<string>();
  for(let frame=0;frame<8;frame++){
   const palette=new Set<string>(),alpha:number[]=[],rgba:number[]=[];
   for(let y=0;y<48;y++){
    expect(raw[y*(width*4+1)]).toBe(0);
    for(let x=0;x<48;x++){
     const pixel=raw.subarray(y*(width*4+1)+1+(frame*48+x)*4,y*(width*4+1)+1+(frame*48+x)*4+4);
     expect([0,255]).toContain(pixel[3]);alpha.push(pixel[3]);rgba.push(...pixel);
     if(pixel[3])palette.add('#'+pixel.subarray(0,3).toString('hex'));
    }
   }
   expect(palette.size,`${hero}${tier} shading`).toBeGreaterThanOrEqual(8);
   expect(palette,`${hero}${tier} identity`).toContain(signatureColours[hero]);
   poses.add(Buffer.from(rgba).toString('base64'));
   if(frame===0)silhouettes.add(Buffer.from(alpha).toString('base64'));
  }
  expect(poses.size,`${spellMotifs[hero][tier]} motion`).toBeGreaterThan(1);
 }
 expect(silhouettes.size).toBe(20);
});
