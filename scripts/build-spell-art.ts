/** Deterministic hand-painted raster sheets: no image generation service or image analysis. */
import { mkdirSync,writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { resolve } from 'node:path';
import { paintBoldSpell } from './art/spell-pixels-bold';
import { identities,paintSpell,size,frames } from './art/spell-pixels';
import { spellMotifs,signatureColours } from '../src/presentation/spellIdentity';
import type { CharacterId } from '../src/game/types';
const bold=!process.argv.includes('--baseline'),paint=bold?paintBoldSpell:paintSpell;
const out=resolve('public/assets/effects/'+(bold?'pixel-spells-bold':'pixel-spells'));mkdirSync(out,{recursive:true});
function crc32(data:Buffer){let crc=0xffffffff;for(const byte of data){crc^=byte;for(let b=0;b<8;b++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}return (crc^0xffffffff)>>>0;}
function chunk(type:string,data:Buffer){const name=Buffer.from(type),length=Buffer.alloc(4),crc=Buffer.alloc(4);length.writeUInt32BE(data.length);crc.writeUInt32BE(crc32(Buffer.concat([name,data])));return Buffer.concat([length,name,data,crc]);}
const assets=[];
for(const hero of Object.keys(identities) as CharacterId[])for(const tier of [1,2,3,4]){
 if(identities[hero].colour!==signatureColours[hero])throw Error('Identity palette mismatch');
 const sheet=Array.from({length:frames},(_,frame)=>paint(hero,tier,frame));
 const width=size*frames,raw=Buffer.alloc(size*(width*4+1));
 for(let y=0;y<size;y++)for(let f=0;f<frames;f++)for(let x=0;x<size;x++){
  const hex=sheet[f][y*size+x];if(!hex)continue;
  const offset=y*(width*4+1)+1+(f*size+x)*4;
  raw[offset]=parseInt(hex.slice(1,3),16);raw[offset+1]=parseInt(hex.slice(3,5),16);raw[offset+2]=parseInt(hex.slice(5,7),16);raw[offset+3]=255;
 }
 const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(width);ihdr.writeUInt32BE(size,4);ihdr[8]=8;ihdr[9]=6;
 const filename=`${hero}-${tier}.png`;writeFileSync(resolve(out,filename),Buffer.concat([Buffer.from('89504e470d0a1a0a','hex'),chunk('IHDR',ihdr),chunk('IDAT',deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]));
 assets.push({character:hero,tier,motif:spellMotifs[hero][tier],signatureColour:signatureColours[hero],file:filename,width,height:size,frameWidth:size,frameHeight:size,frames,fps:8,columns:frames});
}
writeFileSync(resolve(out,'manifest.json'),JSON.stringify({method:'Hand-authored integer-pixel raster painting; no AI-generated or edited source images',source:bold?'scripts/art/spell-pixels-bold.ts':'scripts/art/spell-pixels.ts',...(bold?{reviewStatus:'Approved and active (D155)',baseline:'../pixel-spells/manifest.json',outline:'Two-pixel contours on major shapes',motion:'Articulated eight-pose action loops'}:{}),lighting:'Upper-left highlights, bottom-right shadows; opaque palette clusters and transparent background',identities,assets},null,2)+'\n');
console.log(`Painted20 ${bold?'approved bolder set':'archived baseline'} transparent48×48 eight-frame pixel spell sheets.`);
