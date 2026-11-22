import { useEffect,useRef } from 'react';
import { assetUrl } from '../assets/url';
import { titleGardenPose } from '../presentation/titleGarden';
import './title-garden.css';

const files={sky:'/assets/title-garden/background.png',mountains:'/assets/title-garden/mountains.png',graves:'/assets/title-garden/graveyard.png',tree1:'/assets/title-garden/tree-1.png',tree3:'/assets/title-garden/tree-3.png',stone1:'/assets/title-garden/stone-1.png',stone3:'/assets/title-garden/stone-3.png',bush:'/assets/title-garden/bush-small.png',targets:'/assets/characters.png',earth:'/assets/legacy/earth.png'};
type Images=Record<keyof typeof files,HTMLImageElement>;
/** Approved scenery/sprites plus temporary code-drawn bat/owl/pumpkin stand-ins. */
export function TitleGarden(){
 const canvas=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
  const element=canvas.current!,context=element.getContext('2d');if(!context)return;
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');let alive=true,request=0,time=0,last=performance.now(),painted=-100,images:Images|undefined;
  const paint=()=>{if(!images)return;const width=Math.max(80,Math.round(element.clientWidth/Math.max(1,element.clientHeight)*224));if(element.width!==width||element.height!==224){element.width=width;element.height=224;}drawGarden(context,images,width,time,media.matches);element.dataset.ready='true';element.dataset.time=String(Math.round(time));element.dataset.camera=titleGardenPose(time,media.matches,Math.min(140,width*.4)).camera.toFixed(3);element.dataset.reduced=String(media.matches);};
  const tick=(now:number)=>{const delta=now-last;last=now;if(!document.hidden)time+=Math.min(100,Math.max(0,delta));if(now-painted>=1000/30){paint();painted=now;}if(alive&&!media.matches)request=requestAnimationFrame(tick);};
  const motion=()=>{cancelAnimationFrame(request);last=performance.now();paint();if(alive&&images&&!media.matches)request=requestAnimationFrame(tick);};
  const resize=new ResizeObserver(paint);resize.observe(element);media.addEventListener('change',motion);
  void Promise.all(Object.entries(files).map(([key,path])=>new Promise<[string,HTMLImageElement]>((resolve,reject)=>{const img=new Image();img.onload=()=>resolve([key,img]);img.onerror=reject;img.src=assetUrl(path);}))).then(entries=>{if(!alive)return;images=Object.fromEntries(entries) as Images;last=performance.now();paint();if(!media.matches)request=requestAnimationFrame(tick);}).catch(()=>{element.dataset.ready='fallback';});
  return()=>{alive=false;cancelAnimationFrame(request);resize.disconnect();media.removeEventListener('change',motion);};
 },[]);
 return <canvas ref={canvas} className="title-garden" aria-hidden="true" data-actors="mole,dust,bats,shooting-star,owl,pumpkin" style={{backgroundImage:`url(${assetUrl(files.sky)})`}}/>;
}
function drawGarden(ctx:CanvasRenderingContext2D,images:Images,width:number,time:number,reduced:boolean){
 const p=titleGardenPose(time,reduced,Math.min(140,width*.4)),t=p.time;ctx.imageSmoothingEnabled=false;ctx.clearRect(0,0,width,224);
 const rect=(x:number,y:number,w:number,h:number,c:string)=>{ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),w,h);};
 const image=(img:HTMLImageElement,x:number,y:number,w=img.width,h=img.height)=>ctx.drawImage(img,Math.round(x),Math.round(y),w,h);
 const tile=(img:HTMLImageElement,offset:number)=>{for(let x=-img.width-Math.round(offset)%img.width;x<width;x+=img.width)image(img,x,224-img.height);};
 const sprite=(frame:number,x:number,y:number,size:number)=>ctx.drawImage(images.targets,frame%24*90,Math.floor(frame/24)*90,90,90,Math.round(x),Math.round(y),size,size);
 tile(images.sky,p.sky);tile(images.mountains,p.mountains);tile(images.graves,p.graves);
 // Shooting star: rare bright crossing, independent of the camera's reversal.
 const shooting=t%10500;if(!reduced&&shooting>1200&&shooting<2300){const phase=(shooting-1200)/1100,x=width*.85-phase*110,y=12+phase*28;for(let i=8;i>0;i--)rect(x+i*3,y-i,4,1,i>4?'#57718c':'#a7cfca');sprite(8,x-3,y-3,8);}
 // Temporary bats: discrete pixel wings, staggered paths high above the title.
 for(let i=0;i<3;i++){const x=(t*(.012+i*.003)+i*143)%(width+100)-45,y=27+i*9+Math.sin(t/700+i)*5,flap=(p.batFrame+i)%4;rect(x,y,5,5,'#232539');rect(x+1,y,2,1,'#c6b4c7');const wing=flap<2?-4:3;rect(x-8,y+wing,8,3,'#574d70');rect(x+5,y+wing,8,3,'#574d70');rect(x-11,y+wing-2,4,3,'#39304f');rect(x+12,y+wing-2,4,3,'#39304f');}
 for(let world=-384;world<width+550;world+=384){
  image(images.tree1,world-36-p.trees,107);image(images.tree3,world+Math.min(286,width*.8+100)-p.trees,53);
  image(images.stone1,world+106-p.graves,184);image(images.stone3,world+229-p.graves,181);
  // Owl stand-in: body stays still; head turns front/side/back with a short blink.
  const ox=Math.round(world+57-p.trees),oy=132,face=p.owlFacing;rect(ox+6,oy+17,2,11,'#615043');rect(ox+2,oy+8,12,15,'#2c3644');rect(ox+4,oy+10,8,10,'#59616a');rect(ox,oy,16,12,'#242c3c');rect(ox+2,oy+2,12,8,'#818786');rect(ox,oy-2,4,4,'#242c3c');rect(ox+12,oy-2,4,4,'#242c3c');
  if(face!==3&&face!==4){const look=face===1||face===2?-2:face===5||face===6?2:0;if(reduced||t%5100>150){rect(ox+4+look,oy+5,3,3,'#ebd495');rect(ox+10+look,oy+5,3,3,'#ebd495');rect(ox+5+look,oy+6,1,2,'#172331');rect(ox+11+look,oy+6,1,2,'#172331');}rect(ox+8+look,oy+9,2,2,'#ad8f62');}
  image(images.bush,world+320-p.foreground,194);
 }
 rect(0,213,width,11,'#1c2423');rect(0,213,width,2,'#48503b');
 for(let world=-384;world<width+550;world+=384){
  // Pumpkin stand-in: pixel contour and independently blinking eyes/grin.
  const x=Math.round(world+Math.min(263,width*.7)-p.foreground),y=202;rect(x+3,y,16,16,'#3f2b32');rect(x,y+3,22,10,'#3f2b32');rect(x+2,y+3,18,10,'#a15d38');rect(x+5,y+1,12,14,'#c4854a');rect(x+7,y+3,3,9,'#e0aa63');rect(x+10,y-3,3,5,'#657449');const glow=p.pumpkinLit?'#ffe2a0':'#392b33';rect(x+4,y+5,4,3,glow);rect(x+14,y+5,4,3,glow);rect(x+6,y+11,11,2,glow);rect(x+4,y+9,3,3,glow);rect(x+17,y+9,3,3,glow);
  // Approved mole/dust frames: travelling soil disturbances lead into a peek.
  const phase=(t+world+384)%11000,mx=world+Math.min(143,width*.45)-p.foreground;
  if(phase<5000&&!reduced){const travel=mx-40+phase/5000*40;rect(travel,215,12,2,'#79654b');rect(travel+2,213,6,2,'#b18b58');ctx.drawImage(images.earth,Math.floor(t/125)%4*45,0,45,45,Math.round(travel-3),205,20,20);}
  if(reduced||phase>=5000&&phase<8166){const frame=reduced?0:phase<5666?72+Math.min(7,Math.floor((phase-5000)/666*8)):phase<7500?Math.floor(t/84)%8:48+Math.min(7,Math.floor((phase-7500)/666*8));sprite(frame,mx-17,185,34);}
 }
}
