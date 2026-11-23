import type { GardenLayout } from './layout';
import type { spellSceneModel } from '../presentation/spellScene';
import { columnCenterX,columnRopePoint,droneRig } from '../presentation/spellScene';
import { signatureColours } from '../presentation/spellIdentity';
type Model=ReturnType<typeof spellSceneModel>;
/** Pixel primitives for temporary animated VFX, not newly generated sprite assets. */
export function paintSpellScene(ctx:CanvasRenderingContext2D,model:Model,garden:GardenLayout,reduced:boolean,motionTime=model.time,droneSheet?:HTMLImageElement){
 ctx.clearRect(0,0,301,383);ctx.imageSmoothingEnabled=false;
 const visualTime=reduced?model.time:motionTime,time=reduced?0:visualTime,frame=Math.floor(time/100),ink='#14212b';
 let paintColour='',paintAlpha=-1;
 const rect=(x:number,y:number,w:number,h:number,colour:string,alpha=1)=>{if(alpha!==paintAlpha){ctx.globalAlpha=alpha;paintAlpha=alpha;}if(colour!==paintColour){ctx.fillStyle=colour;paintColour=colour;}ctx.fillRect(Math.round(x*2)/2,Math.round(y*2)/2,w,h);};
 const line=(x:number,y:number,xx:number,yy:number,colour:string,width=1,alpha=1)=>{const n=Math.max(1,Math.ceil(Math.max(Math.abs(xx-x),Math.abs(yy-y))));for(let i=0;i<=n;i++)rect(x+(xx-x)*i/n,y+(yy-y)*i/n,width,width,colour,alpha);};
 const glint=(x:number,y:number,colour:string,size=2)=>{rect(x-size,y,size*2+1,1,colour,.8);rect(x,y-size,1,size*2+1,colour,.8);};
 const mote=(x:number,y:number,colour:string,alpha=1)=>{rect(x-1,y-1,4,4,ink,.65*alpha);rect(x,y,2,2,colour,.85*alpha);};
 const leaf=(x:number,y:number,colour:string)=>{rect(x,y,6,3,ink,.8);rect(x+1,y-1,4,4,colour,.8);rect(x+2,y,1,3,'#e0ecb6',.8);};
 const cap=(x:number,y:number,colour:string)=>{rect(x-2,y+2,4,6,'#e4d2af');rect(x-8,y,16,4,ink);rect(x-6,y-3,12,5,colour);rect(x-3,y-2,3,2,'#ffe4d5');};
 const polygon=(points:number[][],colour:string,alpha=1)=>{
  const ys=points.map(p=>p[1]),min=Math.floor(Math.min(...ys)*2)/2,max=Math.ceil(Math.max(...ys)*2)/2;
  for(let y=min;y<max;y+=.5){const hits:number[]=[];for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+1)%points.length];if((a[1]>y)!==(b[1]>y))hits.push(a[0]+(b[0]-a[0])*(y-a[1])/(b[1]-a[1]));}hits.sort((a,b)=>a-b);for(let i=0;i+1<hits.length;i+=2)rect(hits[i],y,Math.max(.5,Math.round(hits[i+1]*2)/2-Math.round(hits[i]*2)/2),.5,colour,alpha);}
 };
 const drone=(x:number,y:number,tier:number,bank:number)=>{
  const colour=signatureColours.sprig,cos=Math.cos(bank),sin=Math.sin(bank);
  const project=(xx:number,yy:number,z=0)=>[x+xx*cos-yy*sin,y+(xx*sin+yy*cos)*.42-z];
  const hull=(points:number[][],c:string,alpha=1)=>polygon(points.map(([x,y,z])=>project(x,y,z||0)),c,alpha);
  // Foreshortened horizontal rotor planes and visible top/front faces match the board.
  for(const side of [-1,1]){
   const a=project(side*7,-1),b=project(side*19,-2);line(a[0],a[1],b[0],b[1],ink,3);line(a[0],a[1],b[0],b[1],'#849d99',1);
   const rim=Array.from({length:16},(_,i)=>project(side*19+Math.cos(i*Math.PI/8)*9,-2+Math.sin(i*Math.PI/8)*9,2));polygon(rim,'#c5d6b4',.15);
   for(let blade=0;blade<2;blade++){const angle=time/44+blade*Math.PI/2+side*.3,p=project(side*19+Math.cos(angle)*9,-2+Math.sin(angle)*9,2),q=project(side*19-Math.cos(angle)*9,-2-Math.sin(angle)*9,2);line(p[0],p[1],q[0],q[1],'#dfe9c6',1,.85);}
  }
  hull([[-11,0],[-8,7],[8,7],[11,0],[8,7,-4],[-8,7,-4]],ink);
  hull([[-8,7],[8,7],[7,7,-3],[-7,7,-3]],'#456a59');
  hull([[-12,0],[-8,-7],[8,-7],[12,0],[8,7],[-8,7]],ink);
  hull([[-10,0],[-7,-5],[7,-5],[10,0],[7,5],[-7,5]],'#729f74');
  hull([[-8,-1],[-5,-4],[6,-4],[9,0],[1,1]],colour);
  hull([[-6,-3],[-4,-4],[4,-4],[6,-3]],'#e4efbd');
  const nose=project(0,7,-3);rect(nose[0]-3,nose[1],6,2,'#d5bd7f');
  for(const dx of tier===4?[-5,5]:[0]){const light=project(dx,2,1);rect(light[0]-1,light[1]-1,3,2,'#e1f0b6');}
 };
 const point=(hole:number)=>({x:(garden.holes[hole].feet.x-garden.x)/garden.scale,y:(garden.holes[hole].feet.y-garden.y)/garden.scale-35});
 const edgeWave=(colour:string,intensity=1)=>{
  for(let i=0;i<12;i++){const y=22+(i*29+(time/30)%29)%280,dx=Math.sin(time/420+i)*4;rect(4+dx,y,2,5,colour,.25*intensity);rect(294-dx,305-y,2,5,colour,.25*intensity);}
 };
 // Ropes/spirals follow the real three hole centers, including their nonuniform x positions.
 for(const column of model.columns){
  const colour=signatureColours[column.character],height=column.bottom-column.top;
  const centerAt=(y:number)=>columnCenterX(column,y);
  if(column.character==='sprig'){
   if(droneSheet){
    // Preserve both original hand-drawn poses and their thick rope/rotor silhouettes.
    const scale=height/361,width=85*scale,phase=time/310+column.column*1.9;
    const x=centerAt((column.top+column.bottom)/2)+Math.sin(phase)*5,y=(column.top+column.bottom)/2;
    ctx.save();ctx.globalAlpha=1;ctx.translate(x,y);ctx.rotate(Math.sin(phase+Math.PI/2)*.025);
    ctx.drawImage(droneSheet,(reduced?0:Math.floor(time*12/1000+column.column))%2*85,0,85,361,-width/2,-height/2,width,height);
    ctx.restore();paintColour='';paintAlpha=-1;
    // Small green signature lights relate the reused artwork to Sprig's spell icons.
    glint(x,column.top+9,colour,2);glint(x,column.bottom-9,colour,2);
   }else{
   const rig=droneRig(column,time),pulse=model.hits.filter(e=>e.hole!%3===column.column).reduce((sum,e)=>sum+Math.exp(-(visualTime-e.time)/220)*Math.sin((visualTime-e.time)/28)*2,0);
   for(let strand=0;strand<(column.tier===4?2:1);strand++){
    const points=Array.from({length:101},(_,i)=>columnRopePoint(column,time,i/100,strand?1:0,pulse,rig));
    for(let i=0;i<100;i++){const a=points[i],b=points[i+1];line(a.x-1,a.y,b.x-1,b.y,ink,3,.62);}
    for(let i=0;i<100;i++){const a=points[i],b=points[i+1];line(a.x,a.y,b.x,b.y,strand?'#ead5a2':colour,1,.85);}
   }
   drone(rig.top.x,rig.top.y,column.tier,rig.top.bank);drone(rig.bottom.x,rig.bottom.y,column.tier,rig.bottom.bank);
   }
   for(let row=0;row<3;row++){const p=column.holes[row];if((frame+row)%5===0)glint(p.x+Math.sin(time/570-p.y/60)*8,p.y,colour,2);}
  }else{
   const strong=column.tier===4,strands=strong?3:1;
   // Opaque, shaded ribbons travel rapidly; the rear pass stays behind the front pass.
   for(const front of [false,true])for(let strand=0;strand<strands;strand++)for(let y=column.top;y<column.bottom;y+=2){
    const phase=time/(strong?61:76)-y/25+strand*Math.PI*2/strands+column.column;
    if((Math.cos(phase)>0)!==front)continue;
    const radius=(strong?24:17)*(.65+.35*(1-(y-column.top)/height));
    const x=centerAt(y)+Math.sin(phase)*radius,next=centerAt(y+2)+Math.sin(phase-2/25)*radius;
    const width=strong?5:4,shade=front?colour:'#985573';
    line(x-2,y-1,next-2,y+1,ink,width+4,front?.95:.8);
    line(x,y,next,y+2,shade,width,front?1:.85);
    if(front)line(x+1,y,next+1,y+2,'#ffe0b5',1,.95);
   }
   for(let i=0;i<(strong?13:7);i++){
    const y=column.bottom-((time/(strong?3:4)+i*43)%height),phase=time/95+i*2.4;
    const x=centerAt(y)+Math.sin(phase)*(strong?24:17),fade=Math.max(0,Math.min(1,(y-column.top)/10,(column.bottom-y)/10));
    mote(x,y,i%3?colour:'#ffe0b5',fade);
    if(i%3===0){cap(x,y,colour);glint(x+8,y-4,'#ffe0b5',2);}
   }
   for(const hit of model.hits.filter(e=>e.hole!%3===column.column)){
    const p=point(hit.hole!),age=(visualTime-hit.time)/260;if(age<0||age>1)continue;
    for(let i=0;i<5;i++){const a=i*Math.PI*2/5+age;glint(p.x+Math.cos(a)*age*23,p.y+Math.sin(a)*age*13,colour,Math.max(1,3-age*2));}
   }
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
   if(status.kind==='tending'){const age=visualTime-target.born;if(age<350||model.effects.some(e=>e.kind==='tending')&&frame%12<3)rect(p.x+Math.sin(time/260+hole)*18,p.y-33+(time/30)%24,2,5,signatureColours.sprig,.6);}
  }
  if(target.kind==='rabbit'&&target.origin==='magic'&&visualTime-target.born<350){const phase=reduced?1:(visualTime-target.born)/350,from=p.x<150?0:301;line(from+(p.x-from)*phase,p.y-5,p.x,p.y,signatureColours.andromoss,1,.45);}
 }
 for(const event of model.hits){
  const p=point(event.hole!),age=visualTime-event.time,progress=reduced?0:age/600;
  const column=model.columns.find(c=>c.column===event.hole!%3);
  if(column)for(let i=0;i<6;i++){const a=i*Math.PI/3;rect(p.x+Math.cos(a)*(4+progress*24),p.y+Math.sin(a)*(4+progress*18),progress<.5?3:2,progress<.5?3:2,signatureColours[column.character],(1-progress)*.9);}
  if(event.kind==='hit'&&event.targetKind==='mole'&&model.effects.some(e=>e.kind==='drain'))for(let i=0;i<3;i++){const v=Math.min(1,progress+i*.08);mote(p.x+(150-p.x)*v+Math.sin(v*8)*5,p.y+(338-p.y)*v-Math.sin(v*Math.PI)*25,signatureColours.duskmantle);}
 }
 for(const block of model.blocks){
  const fade=Math.max(0,1-(visualTime-block.time)/400),colour=signatureColours[model.owner];
  for(let i=0;i<12;i++){rect(5,12+i*25,3,12,colour,fade*.65);rect(293,12+i*25,3,12,colour,fade*.65);}
 }
 ctx.globalAlpha=1;
}
