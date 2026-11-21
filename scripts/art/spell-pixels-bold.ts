import type { CharacterId } from '../../src/game/types';
/** Approved D155 artwork: chunkier silhouettes, richer material ramps and articulated action poses. */
export const size=48,frames=8;
export const identities:Record<CharacterId,{name:string;colour:string;ramp:string[]}>= {
 champignon:{name:'Rose pink',colour:'#ed83ac',ramp:['#703654','#ac486f','#ed83ac','#ffd2dc']},
 andromoss:{name:'Moon cyan',colour:'#65d9ea',ramp:['#20566f','#368da6','#65d9ea','#c5fcf0']},
 'captain-bramble':{name:'Ember red',colour:'#ed715c',ramp:['#682c3e','#ac414d','#ed715c','#ffd1a0']},
 duskmantle:{name:'Twilight violet',colour:'#b292ef',ramp:['#433457','#76549d','#b292ef','#ead4ff']},
 sprig:{name:'Seedling green',colour:'#a7d76b',ramp:['#3a5744','#6a934d','#a7d76b','#e4f5b2']},
};
const metal=['#354354','#60758a','#a8bdc5','#e5edda'];
const wood=['#493544','#795044','#b88055','#e4b97c'];
const gold=['#704543','#ae713e','#eac565','#fff0bd'];
const cream=['#665064','#a58c89','#dfccac','#fff0cc'];
const water=['#314f7a','#468fb3','#91dfdf','#def8ea'];
const ink='#1c2233';
type Ramp=string[];type Point=[number,number];
export function paintBoldSpell(hero:CharacterId,tier:number,frame:number):string[]{
 const pixels=Array<string>(size*size).fill(''),accent=identities[hero].ramp;
 const put=(x:number,y:number,c:string)=>{x=Math.round(x);y=Math.round(y);if(x>=0&&x<size&&y>=0&&y<size)pixels[y*size+x]=c;};
 const rect=(x:number,y:number,w:number,h:number,c:string)=>{for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++)put(xx,yy,c);};
 const line=(x:number,y:number,xx:number,yy:number,c:string,width=1)=>{const n=Math.max(Math.abs(xx-x),Math.abs(yy-y));for(let i=0;i<=n;i++)rect(Math.round(x+(xx-x)*i/(n||1)),Math.round(y+(yy-y)*i/(n||1)),width,width,c);};
 const mix=(a:string,b:string)=>'#'+[1,3,5].map(i=>Math.round((parseInt(a.slice(i,i+2),16)+parseInt(b.slice(i,i+2),16))/2).toString(16).padStart(2,'0')).join('');
 const shape=(x:number,y:number,w:number,h:number,inside:(x:number,y:number)=>boolean,ramp:Ramp)=>{
  for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++)if(inside(xx,yy)){
   const thickness=Math.min(w,h)>=10?2:1;
   const edge=Array.from({length:thickness},(_,i)=>i+1).some(d=>!inside(xx-d,yy)||!inside(xx+d,yy)||!inside(xx,yy-d)||!inside(xx,yy+d));
   const light=(xx-x)/w*.45+(yy-y)/h*.55;
   put(xx,yy,edge?ink:light<.18?ramp[3]:light<.32?mix(ramp[2],ramp[3]):light<.57?ramp[2]:light<.71?mix(ramp[1],ramp[2]):light<.86?ramp[1]:ramp[0]);
  }
 };
 const box=(x:number,y:number,w:number,h:number,ramp:Ramp)=>shape(x,y,w,h,(xx,yy)=>xx>=x&&xx<x+w&&yy>=y&&yy<y+h,ramp);
 const ellipse=(cx:number,cy:number,rx:number,ry:number,ramp:Ramp)=>shape(cx-rx,cy-ry,rx*2+1,ry*2+1,(x,y)=>((x-cx)/rx)**2+((y-cy)/ry)**2<=1,ramp);
 const poly=(points:Point[],ramp:Ramp)=>{
  const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]),x=Math.min(...xs),y=Math.min(...ys),w=Math.max(...xs)-x+1,h=Math.max(...ys)-y+1;
  const inside=(xx:number,yy:number)=>{let yes=false;for(let i=0,j=points.length-1;i<points.length;j=i++){const a=points[i],b=points[j];if((a[1]>yy)!==(b[1]>yy)&&xx<(b[0]-a[0])*(yy-a[1])/(b[1]-a[1])+a[0])yes=!yes;}return yes;};
  shape(x,y,w,h,inside,ramp);
 };
 const gem=(x:number,y:number,r=4,ramp=accent)=>poly([[x,y-r],[x+r,y],[x,y+r],[x-r,y]],ramp);
 const sparkle=(x:number,y:number)=>{line(x-2,y,x+2,y,accent[2]);line(x,y-2,x,y+2,accent[2]);put(x,y,accent[3]);};
 const star=(x:number,y:number,r=4)=>poly([[x,y-r],[x+1,y-1],[x+r,y-1],[x+2,y+1],[x+3,y+r],[x,y+2],[x-3,y+r],[x-2,y+1],[x-r,y-1],[x-1,y-1]],gold);
 const mushroom=(x:number,y:number,r:number)=>{box(x-3,y,7,12,cream);ellipse(x,y,r,Math.max(4,Math.floor(r*.55)+[0,-1,-2,-1,0,2,1,0][frame]),accent);rect(x-r+3,y-1,3,2,accent[3]);rect(x+3,y+1,2,2,cream[2]);};
 const rabbit=(x:number,y:number)=>{poly([[x-5,y-3],[x-6+swing,y-12],[x-3+swing,y-12],[x-2,y-3]],cream);poly([[x+2,y-3],[x+2-swing,y-13],[x+5-swing,y-13],[x+5,y-3]],cream);ellipse(x,y,6,5,cream);put(x-2,y-1,ink);put(x+2,y-1,ink);put(x,y+2,accent[2]);};
 const bob=[0,-1,-3,-2,0,2,3,1][frame],swing=[-4,-2,0,3,4,2,0,-3][frame];
 const pulse=[0,1,3,2,0,-1,-2,-1][frame];
 if(hero==='champignon'){
  if(tier===1){ellipse(24,38,13,4,wood);mushroom(24,23+bob,17);box(19,34+bob,11,3,accent);sparkle(9+frame*4%29,10);}
  if(tier===2){line(25+swing*2,6,23,29,ink,4);line(26+swing*2,7,24,29,wood[2],2);poly([[18,26],[29,26],[37+swing,40],[12+swing,40]],gold);box(17,25,14,5,accent);for(let i=0;i<4;i++)line(18+i*4,32,15+i*6+swing,39,wood[1]);line(8+frame*3,43,15+frame*3,43,accent[2]);sparkle(38,19);}
  if(tier===3){box(10,22,29,19,cream);for(const x of [11,21,31])box(x,17,7,9,cream);poly([[20,41],[20,30],[27,28],[29,41]],wood);mushroom(10,21+bob,8);mushroom(38,21-bob,8);line(22,31,22,34+Math.max(0,pulse)*2,gold[2],2);line(26,31,26,34+Math.max(0,pulse)*2,gold[2],2);gem(24,23,4);sparkle(8+frame*4,8);}
  if(tier===4){poly([[15,13],[13,5],[21,9],[25,3],[29,9],[36,5],[33,13]],gold);for(let ring=0;ring<3;ring++){const y=20+ring*8,rx=16-ring*3+pulse;for(let a=0;a<22;a++){const angle=(a/22+frame/8)*Math.PI*2;const x=Math.round(24+Math.cos(angle)*rx),yy=Math.round(y+Math.sin(angle)*(4+Math.max(0,pulse)));rect(x,yy,4,4,accent[0]);rect(x,yy,4,3,accent[Math.sin(angle)<0?1:2]);put(x,yy,accent[3]);}}star(9+(frame*4)%29,17+(frame*3)%22,4);gem(24,41,4,gold);ellipse(9+(frame*3)%30,29,3,4,cream);}
 }else if(hero==='andromoss'){
  if(tier===1){ellipse(24,25,18,17,accent);ellipse(24,25,13,12,metal);rabbit(24,28+bob);for(let i=0;i<3;i++){const a=(frame/8+i/3)*Math.PI*2;gem(Math.round(24+Math.cos(a)*19),Math.round(25+Math.sin(a)*17),3);}}
  if(tier===2){box(11,6,26,6,gold);box(11,37,26,6,gold);poly([[16,12],[32,12],[32,18],[26,24],[32,31],[32,37],[16,37],[16,31],[22,24],[16,18]],accent);poly([[19,14],[29,14],[24,20+frame%3]],cream);poly([[18,35],[24,28-frame%3],[30,35]],gold);line(24,23,24,30,cream[3]);gem(12,24,3);gem(36,24,3);}
  if(tier===3){box(9,12,10,22,accent);box(29,12,10,22,accent);ellipse(24,33,15,11,accent);rect(20,12,8,19,'');box(9,10,10,7,metal);box(29,10,10,7,metal);for(let i=0;i<3;i++)star(Math.round(24+(i-1)*17*(1-((frame+i*2)%8)/10)),5+((frame+i*2)%8)*3,4);gem(24,36,3);}
  if(tier===4){for(let y=25;y<44;y+=3){const w=Math.floor((y-18)/3);rect(24-w,y,w*2,1,accent[(y+frame)%3===0?2:0]);}rabbit(24-swing,30+(frame%4)*3);ellipse(24+swing,14+bob,9,9,accent);ellipse(24+swing,22+bob,18,7,metal);ellipse(24+swing,20+bob,15,4,accent);for(let i=0;i<4;i++)box(8+swing+i*8,24+bob,4,3,i===frame%4?gold:accent);}
 }else if(hero==='captain-bramble'){
  if(tier===1){poly([[24,5],[40+Math.max(0,pulse),13],[37,32],[24,43],[11,32],[8-Math.max(0,pulse),13]],metal);poly([[24,9],[36,16],[33,30],[24,38],[15,30],[12,16]],accent);poly([[24,31],[18,25],[22+swing,17],[25,23],[28,19],[31,28],[27,33]],gold);line(17,19,24,25,accent[3]);line(31,22,24,28,accent[0]);sparkle(8+frame*4,8);}
  if(tier===2){poly([[7,30],[9,13],[16-Math.max(0,pulse),6],[22,14],[27,14],[33+Math.max(0,pulse),6],[40,14],[41,30],[33,38],[15,38]],metal);poly([[13,25+bob],[21,27],[23,32],[13,31-bob]],accent);poly([[27,27],[36,25+bob],[36,31-bob],[25,32]],accent);box(23,14,3,21,gold);rect(12+(frame*4)%23,18,3,2,accent[3]);box(10,35,28,5,accent);}
  if(tier===3){poly([[8-Math.max(0,pulse),5],[20,9],[24,17],[29,9],[40+Math.max(0,pulse),5],[36,20],[40,38],[24,44],[8,38],[12,20]],metal);poly([[12,24],[22,27],[21,31],[13,29]],accent);poly([[26,27],[36,24],[35,29],[27,31]],accent);box(22,18+bob,5,19-bob,accent);gem(24,37,5+Math.max(0,pulse),gold);line(13,12,18,18,metal[3]);sparkle(7+(frame*5)%35,8);}
  if(tier===4){poly([[10,17],[18,7],[32,7],[39,17],[39,40],[10,40]],metal);rect(14,19,21,17,'');for(const x of [16,24,32])box(x,8-Math.max(0,pulse)*2,3,32+Math.max(0,pulse)*2,metal);box(9,37,31,5,metal);line(7-swing,35,15,30-bob,accent[2],3);line(15,30,10,23,accent[1],2);line(34,36,40+swing,29-bob,accent[2],3);line(42,29,35,20,accent[1],2);gem(24,9,4);rect(12+(frame*3)%22,38,2,1,accent[3]);}
 }else if(hero==='duskmantle'){
  if(tier===1){for(let i=0;i<4;i++){const a=(i/4+frame/16)*Math.PI*2;gem(Math.round(24+Math.cos(a)*17),Math.round(24+Math.sin(a)*17),5);}line(24,9,24,39,accent[0],3);line(10,24,38,24,accent[1],3);gem(24,24,11+pulse);gem(24,23,6+Math.max(0,pulse),cream);gem(24,23,3);sparkle(9+frame*4,12);}
  if(tier===2){for(let i=0;i<3;i++){const x=7+i*12,d=i%2?-Math.trunc(swing*.75):Math.trunc(swing*.75);poly([[x,5],[x+8,5],[x+7+d,17],[x+2-d,29],[x+8+swing,42-bob],[x+swing,39-bob],[x-3+d,27],[x+2,16]],accent);line(x+3,9,x+1+d,20,accent[3]);gem(x+4,8,3,gold);}box(18,4,13,7,gold);rect(19,10,11,1,gold[0]);star(9+frame*4,8+(frame*5)%29,3);}
  if(tier===3){box(18,4,12,4,metal);box(21,2,6,5,gold);poly([[11,14],[16,9],[32,9],[37,14],[33,39],[15,39]],gold);poly([[16,15],[32,15],[29,35],[19,35]],accent);poly([[22,34],[17,27],[23+swing,12-bob],[25,23],[29,18-bob],[31,29],[26,34]],accent);line(15,15,17,36,gold[3],2);line(32,15,30,36,gold[1],2);box(14,38,20,5,metal);sparkle(24,23+bob);}
  if(tier===4){for(let i=0;i<8;i++){const a=i*Math.PI/4;poly([[24+Math.round(Math.cos(a)*12),24+Math.round(Math.sin(a)*12)],[24+Math.round(Math.cos(a)*22),24+Math.round(Math.sin(a)*22)],[24+Math.round(Math.cos(a+.4)*12),24+Math.round(Math.sin(a+.4)*12)]],accent);}ellipse(24,24,19,12,gold);ellipse(24,24,17,frame===4?3:10,accent);ellipse(24,24,11,frame===4?1:7,cream);if(frame!==4){ellipse(24+swing,24,5,7,accent);box(23+swing,20,3,9,wood);}gem(24,7,4,gold);sparkle(10+frame*4,11);}
 }else{
  if(tier===1){poly([[9,32],[11,18],[22,8],[38,7],[39,22],[29,36],[18,39]],accent);line(14,34,32,14,accent[3],2);line(20,27,17,18,accent[1]);line(25,22,34,22,accent[0]);poly([[31,26+bob],[38,36+bob],[37,41+bob],[30,44+bob],[25,39+bob]],water);rect(28,34+bob,2,2,water[3]);rect(35,40+bob,2,2,water[0]);sparkle(9+frame*4,7);}
  if(tier===2){line(24+swing,5-bob,24,28-bob,ink,5);line(25+swing,6-bob,25,28-bob,wood[2],2);box(19,20,11,5,accent);box(9,29-bob,31,5,metal);for(const x of [10,19,28,37])box(x,32-bob,3,9,metal);for(let i=0;i<3;i++)rect(9+(frame*3+i*11)%29,44,3,1,accent[2]);}
  if(tier===3){const open=[0,3,7,8,5,1,0,0][frame];poly([[23,25],[12-open,5],[22,13],[27,25]],metal);poly([[25,25],[36+open,5],[26,13],[21,25]],metal);ellipse(15,35,9,8,accent);ellipse(33,35,9,8,accent);ellipse(15,35,4,3,wood);ellipse(33,35,4,3,wood);gem(24,26,4,gold);sparkle(8+frame*4,8);}
  if(tier===4){box(10,13+bob,29,18,accent);box(18,6+bob,13,8,metal);box(21,8+bob,7,4,wood);for(const x of [13,35]){ellipse(x,35,10,10,metal);ellipse(x,35,6,6,gold);const teeth:Point[][]=[[[x-2,24],[x+2,24],[x+2,46],[x-2,46]],[[x-11,33],[x+11,33],[x+11,37],[x-11,37]],[[x-8,27],[x-5,25],[x+8,43],[x+5,45]],[[x+5,25],[x+8,27],[x-5,45],[x-8,43]]];poly(teeth[frame%4],gold);gem(x,35,3,accent);}box(20,18,10,7,metal);gem(24,21,3);}
 }
 // The hourglass turns over in quarter-turn pixel poses while sand falls.
 if(hero==='andromoss'&&tier===2){
  const turns=[0,0,0,1,2,2,2,3][frame],turned=Array<string>(size*size).fill('');
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
   let xx=x,yy=y;for(let t=0;t<turns;t++){const next=size-1-yy;yy=xx;xx=next;}
   turned[yy*size+xx]=pixels[y*size+x];
  }return turned;
 }
 return pixels;
}
