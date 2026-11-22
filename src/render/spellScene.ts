import type { GardenLayout } from './layout';
import type { spellSceneModel } from '../presentation/spellScene';
import { signatureColours } from '../presentation/spellIdentity';
type Model=ReturnType<typeof spellSceneModel>;
/** Pixel primitives for temporary animated VFX, not newly generated sprite assets. */
export function paintSpellScene(ctx:CanvasRenderingContext2D,model:Model,garden:GardenLayout,reduced:boolean){
 ctx.clearRect(0,0,301,383);ctx.imageSmoothingEnabled=false;
 const time=reduced?0:model.time,frame=Math.floor(time/100),ink='#14212b';
 const rect=(x:number,y:number,w:number,h:number,colour:string,alpha=1)=>{ctx.globalAlpha=alpha;ctx.fillStyle=colour;ctx.fillRect(Math.round(x),Math.round(y),w,h);};
 const line=(x:number,y:number,xx:number,yy:number,colour:string,width=1,alpha=1)=>{const n=Math.max(1,Math.ceil(Math.max(Math.abs(xx-x),Math.abs(yy-y))));for(let i=0;i<=n;i++)rect(x+(xx-x)*i/n,y+(yy-y)*i/n,width,width,colour,alpha);};
 const glint=(x:number,y:number,colour:string,size=2)=>{rect(x-size,y,size*2+1,1,colour,.8);rect(x,y-size,1,size*2+1,colour,.8);};
 const mote=(x:number,y:number,colour:string)=>{rect(x-1,y-1,4,4,ink,.8);rect(x,y,2,2,colour,.85);};
 const leaf=(x:number,y:number,colour:string)=>{rect(x,y,6,3,ink,.8);rect(x+1,y-1,4,4,colour,.8);rect(x+2,y,1,3,'#e0ecb6',.8);};
 const cap=(x:number,y:number,colour:string)=>{rect(x-2,y+2,4,6,'#e4d2af');rect(x-8,y,16,4,ink);rect(x-6,y-3,12,5,colour);rect(x-3,y-2,3,2,'#ffe4d5');};
 const drone=(x:number,y:number,tier:number)=>{
  const colour=signatureColours.sprig,spin=frame%4;
  line(x-18,y-2,x+18,y-2,ink,3);line(x-17,y-1,x+17,y-1,'#96a8af');
  for(const side of [-1,1]){const px=x+side*17;rect(px-2,y-4,4,4,ink);rect(px-(spin%2?3:7),y-5,spin%2?6:14,2,'#d4d5b2');}
  rect(x-10,y-4,20,12,ink);rect(x-8,y-3,16,8,'#5b8168');rect(x-6,y-2,12,4,colour);rect(x-4,y+5,8,3,'#d5b779');rect(x-2,y,4,3,'#e5f4c9');
  if(tier===4){rect(x-7,y+2,3,2,'#d9e6b6');rect(x+4,y+2,3,2,'#d9e6b6');}
 };
 const point=(hole:number)=>({x:(garden.holes[hole].feet.x-garden.x)/garden.scale,y:(garden.holes[hole].feet.y-garden.y)/garden.scale-35});
 const edgeWave=(colour:string,intensity=1)=>{
  for(let i=0;i<12;i++){const y=22+(i*29+(time/30)%29)%280,dx=Math.sin(time/420+i)*4;rect(4+dx,y,2,5,colour,.25*intensity);rect(294-dx,305-y,2,5,colour,.25*intensity);}
 };
 // Ropes/spirals follow the real three hole centers, including their nonuniform x positions.
 for(const column of model.columns){
  const colour=signatureColours[column.character],height=column.bottom-column.top;
  const centerAt=(y:number)=>{const centers=column.holes;if(y<=centers[0].y)return centers[0].x;if(y>=centers[2].y)return centers[2].x;const row=y<centers[1].y?0:1,a=centers[row],b=centers[row+1];return a.x+(b.x-a.x)*(y-a.y)/(b.y-a.y);};
  if(column.character==='sprig'){
   const swing=(y:number)=>Math.sin(time/480+y/48+column.column)*8;
   const strands=column.tier===4?2:1;
   for(let strand=0;strand<strands;strand++)for(let y=column.top+5;y<column.bottom-5;y+=3){
    const x=centerAt(y)+swing(y)+(strand?Math.sin(y/11+time/180)*3:0),next=centerAt(y+3)+swing(y+3)+(strand?Math.sin((y+3)/11+time/180)*3:0);
    line(x-1,y,next-1,y+3,ink,3,.7);line(x,y,next,y+3,strand?'#e8d59a':colour,1,.85);
   }
   drone(centerAt(column.top)+swing(column.top),column.top,column.tier);drone(centerAt(column.bottom)+swing(column.bottom),column.bottom,column.tier);
   for(let row=0;row<3;row++){const p=column.holes[row];if((frame+row)%5===0)glint(p.x+swing(p.y),p.y,colour,2);}
  }else{
   const strands=column.tier===4?4:2;
   for(let strand=0;strand<strands;strand++)for(let y=column.top;y<column.bottom;y+=4){
    const radius=(column.tier===4?23:15)*(.65+.35*(1-(y-column.top)/height)),phase=time/210-y/18+strand*Math.PI*2/strands;
    const x=centerAt(y)+Math.sin(phase)*radius,next=centerAt(y+4)+Math.sin(phase-4/18)*radius;
    line(x,y,next,y+4,colour,column.tier===4?2:1,Math.cos(phase)>.1?.5:.18);
   }
   for(let i=0;i<(column.tier===4?16:9);i++){const y=column.bottom-((time/8+i*31)%height),x=centerAt(y)+Math.sin(time/350+i)*19;mote(x,y,i%3?colour:'#f3d6a4');}
   const capY=column.top+(column.tier===4?16:0);cap(centerAt(column.top),capY,colour);if(column.tier===4){rect(centerAt(column.top)-7,capY-12,14,4,'#c4a36c');rect(centerAt(column.top)-8,capY-16,3,5,'#f0d48e');rect(centerAt(column.top)-1,capY-18,3,7,'#f0d48e');rect(centerAt(column.top)+6,capY-16,3,5,'#f0d48e');}
  }
 }
 for(const effect of model.effects){
  if(effect.columns.length)continue;
  const colour=signatureColours[effect.character],strength=effect.tier===4?2:1;
  if(effect.kind==='guard'||effect.kind==='ward'){
   edgeWave(colour,effect.tier===3?1.5:1);
   if(effect.kind==='ward'&&!reduced&&(effect.remaining??0)>.9){const phase=(1-effect.remaining!)/.1;for(let i=0;i<24;i++){const angle=i*Math.PI/12;leaf(150+Math.cos(angle)*(25+phase*125),165+Math.sin(angle)*(25+phase*135),colour);}}
   for(let i=0;i<(effect.tier===3?6:3);i++){const x=20+(i*47+time/40)%260,y=319+Math.sin(time/300+i)*7;if(effect.character==='champignon')cap(x,y,colour);else if(effect.character==='sprig')leaf(x,y,colour);else{line(x-5,y+4,x,y-3,colour,2,.7);line(x,y-3,x+5,y+4,colour,2,.7);}}
  }else if(effect.kind==='invasion'||effect.kind==='rush'||effect.kind==='decoys'){
   edgeWave(colour,strength);
   for(let i=0;i<6*strength;i++){const y=12+(time/12+i*43)%283,x=i%2?286:12;line(x,y,x+(i%2?-5:5),y+7,colour,1,.55);}
  }else if(effect.kind==='veil'){
   for(const side of [0,1])for(let ribbon=0;ribbon<3;ribbon++)for(let y=12;y<306;y+=4){const x=(side?294:4)+(side?-1:1)*(ribbon*4+Math.sin(time/420+y/29+ribbon)*5);rect(x,y,3,5,colour,.11+ribbon*.06);}
  }else if(effect.kind==='tending'){
   for(let i=0;i<7;i++){const y=20+(time/18+i*47)%280,x=i%2?281+Math.sin(time/500+i)*6:12+Math.sin(time/500+i)*6;leaf(x,y,colour);}
  }else if(effect.kind==='armor'||effect.kind==='curse'){
   for(let i=0;i<Math.min(effect.count,6);i++){const a=time/480+i*Math.PI*2/Math.min(effect.count,6);glint(150+Math.cos(a)*35,342+Math.sin(a)*12,colour,2);}
  }else if(effect.kind==='drain'){
   edgeWave(colour,.8);for(let i=0;i<4;i++)mote(120+i*20,336-Math.sin(time/400+i)*6,colour);
  }else if(effect.kind==='steal'){
   for(let i=0;i<effect.count;i++){const phase=(time/600+i*.2)%1,x=150+(garden.id===0?-1:1)*phase*110,y=335-Math.sin(phase*Math.PI)*18;glint(x,y,'#f6d88c',3);}
  }
 }
 // Target-local cues only appear on actual modified targets; no fake hittable creatures.
 for(const {hole,target,statuses} of model.targets){
  const p=point(hole);
  for(const status of statuses){
   if(status.kind==='armor')for(let i=0;i<3;i++){const a=time/430+i*2.1;glint(p.x+Math.cos(a)*27,p.y+Math.sin(a)*22,signatureColours['captain-bramble'],1);}
   if(status.kind==='curse')for(let i=0;i<(status.value===8?3:5);i++){const a=-time/600+i*Math.PI*2/(status.value===8?3:5);rect(p.x+Math.cos(a)*29,p.y+Math.sin(a)*24,2,3,signatureColours.duskmantle,.65);}
   if(status.kind==='bonus'&&(frame+hole)%4===0)glint(p.x-24,p.y-18,signatureColours.duskmantle,2);
   if(status.kind==='rush')for(const side of [-1,1])line(p.x+side*25,p.y-8,p.x+side*28,p.y+2,signatureColours.andromoss,1,.5);
   if(status.kind==='tending'){const age=model.time-target.born;if(age<350||model.effects.some(e=>e.kind==='tending')&&frame%12<3)rect(p.x+Math.sin(time/260+hole)*18,p.y-33+(time/30)%24,2,5,signatureColours.sprig,.6);}
  }
  if(target.kind==='rabbit'&&target.origin==='magic'&&model.time-target.born<350){const phase=reduced?1:(model.time-target.born)/350,from=p.x<150?0:301;line(from+(p.x-from)*phase,p.y-5,p.x,p.y,signatureColours.andromoss,1,.45);}
 }
 for(const event of model.hits){
  const p=point(event.hole!),age=model.time-event.time,progress=reduced?0:age/600;
  const column=model.columns.find(c=>c.column===event.hole!%3);
  if(column)for(let i=0;i<6;i++){const a=i*Math.PI/3;rect(p.x+Math.cos(a)*(4+progress*24),p.y+Math.sin(a)*(4+progress*18),progress<.5?3:2,progress<.5?3:2,signatureColours[column.character],(1-progress)*.9);}
  if(event.kind==='hit'&&event.targetKind==='mole'&&model.effects.some(e=>e.kind==='drain'))for(let i=0;i<3;i++){const v=Math.min(1,progress+i*.08);mote(p.x+(150-p.x)*v+Math.sin(v*8)*5,p.y+(338-p.y)*v-Math.sin(v*Math.PI)*25,signatureColours.duskmantle);}
 }
 for(const block of model.blocks){
  const fade=1-(model.time-block.time)/400,colour=signatureColours[model.owner];
  for(let i=0;i<12;i++){rect(5,12+i*25,3,12,colour,fade*.65);rect(293,12+i*25,3,12,colour,fade*.65);}
 }
 ctx.globalAlpha=1;
}
