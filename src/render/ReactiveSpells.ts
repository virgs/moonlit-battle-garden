import Phaser from 'phaser';
import {assetUrl} from '../assets/url';
import type {Snapshot} from '../game/Session';
import type {PlayerId} from '../game/types';
import {reactiveAssets,reactiveSpellActors} from '../presentation/reactiveSpells';
import type {ArenaLayout} from './layout';
/** Native sprites behind targets; actual stars travel between their real HUD meters. */
export class ReactiveSpells{
 private pool=new Map<string,{sprite:Phaser.GameObjects.Sprite;kind:string;player:number}>();
 private held:Snapshot|null=null;
 private confirmed=-1;private received=0;private visual=0;
 constructor(private scene:Phaser.Scene){}
 static preload(scene:Phaser.Scene){for(const [key,size]of Object.entries(reactiveAssets))scene.load.spritesheet(`reactive-${key}`,assetUrl(`/assets/effects/reactive/${key}.png`),{frameWidth:size,frameHeight:size});}
 update(snapshot:Snapshot,layout:ArenaLayout,reduced:boolean){
  if(!snapshot.state.casting)this.held=snapshot;
  const view=snapshot.state.casting?this.held:snapshot,active=new Set<string>();
  if(!view)return;
  const now=performance.now(),confirmed=view.state.time;if(this.confirmed!==confirmed){this.confirmed=confirmed;this.received=now;}
  const frozen=snapshot.state.paused||!!snapshot.state.casting||view.state.phase!=='playing';
  const motion=reduced?confirmed:frozen?Math.max(confirmed,Math.min(confirmed+49,this.visual)):confirmed+Math.max(0,Math.min(49,now-this.received));this.visual=motion;
  const draw=(key:string,kind:string,player:number,texture:string,frame:number,x:number,y:number,size:number,nativeSize:number,alpha:number,rotation:number,depth:number)=>{
   active.add(key);let entry=this.pool.get(key);if(!entry){entry={sprite:this.scene.add.sprite(x,y,texture),kind,player};this.pool.set(key,entry);}
   entry.sprite.setTexture(texture,frame).setPosition(x,y).setScale(size/nativeSize).setAlpha(alpha).setRotation(rotation).setDepth(depth).setVisible(true);
  };
  for(const garden of layout.gardens)for(const actor of reactiveSpellActors(view,garden.id,reduced,motion)){
   let x=garden.x+actor.x*garden.scale,y=garden.y+actor.y*garden.scale;
   if(actor.destination==='score'){const u=actor.progress??0,destX=layout.score.x+layout.score.width*(garden.id===0?.25:.75),destY=layout.score.y+layout.score.height/2;x+=(destX-x)*u+Math.sin(u*Math.PI)*20*garden.scale;y+=(destY-y)*u-Math.sin(u*Math.PI)*35*garden.scale;}
   draw(`${garden.id}-${actor.key}`,actor.kind,garden.id,`reactive-${actor.art}`,actor.frame,x,y,actor.size*garden.scale,reactiveAssets[actor.art],actor.alpha,actor.rotation,actor.depth);
  }
  const time=motion;
  const anchor=(id:PlayerId,portrait=false)=>{const element=portrait?document.querySelector(`.score-legend>span:nth-child(${id+1}) .score-hero-icon`):document.querySelector(`.player-${id} .cast-button`)??(id===1?document.querySelector('.opponent-charge'):null),rect=element?.getBoundingClientRect();return rect?{x:rect.x+rect.width/2,y:rect.y+rect.height/2,size:Math.max(48,Math.min(100,rect.width+20))}:{x:layout.score.x+layout.score.width*(id===0?.1:.9),y:layout.score.y+layout.score.height,size:64};};
  for(const e of view.events){if(e.kind!=='cast'||e.round!==view.state.round||time-e.time<0||time-e.time>1500)continue;
   const donor=(e.player===0?1:0) as PlayerId;
   if(e.visual?.wardBlocked){if(!layout.gardens.some(g=>g.id===donor)&&time-e.time<650){const u=(time-e.time)/650,at=anchor(donor,true);draw(`ward-hud-${e.id}`,'hidden-ward-block',donor,'reactive-ward',reduced?0:Math.floor(time/83)%9,at.x,at.y,at.size*(reduced?1:1+u*.3),64,(1-u)*.8,0,3);}continue;}
   if(e.visual?.theftTaken===undefined)continue;
   const from=anchor(donor),to=anchor(e.player);
   if(e.visual.theftTaken===0&&!layout.gardens.some(g=>g.id===e.player)&&time-e.time<650){const u=(time-e.time)/650;draw(`empty-hud-${e.id}`,'empty-theft',e.player,'reactive-rush',reduced?0:Math.floor(time/83)%9,to.x,to.y,reduced?36:36*(1-u),48,1-u,0,3);}
   for(let i=0;i<e.visual.theftTaken;i++){const age=time-e.time-i*70;if(age<0||age>1100)continue;const u=reduced?1:Math.min(1,age/900),received=i<(e.visual.theftReceived??0),alpha=received?Math.min(1,(1100-age)/200):Math.max(0,1-u*1.5);draw(`theft-${e.id}-${i}`,received?'stolen-star':'excess-star',e.player,'targets',8+(reduced?0:Math.floor(age/83)%8),from.x+(to.x-from.x)*u+(i-1.5)*5,from.y+(to.y-from.y)*u-Math.sin(u*Math.PI)*65,22,90,alpha,Math.sin(u*Math.PI)*.3,3);}
  }
  for(const [key,entry]of this.pool)if(!active.has(key)){entry.sprite.destroy();this.pool.delete(key);}
  const diagnostics=JSON.stringify([...this.pool.values()].map(({sprite,kind,player})=>({kind,player,texture:sprite.texture.key,frame:sprite.frame.name,x:Math.round(sprite.x*10)/10,y:Math.round(sprite.y*10)/10,alpha:Math.round(sprite.alpha*100)/100,size:Math.round(sprite.displayWidth*10)/10,depth:sprite.depth})));
  if(this.scene.game.canvas.dataset.reactiveSpells!==diagnostics)this.scene.game.canvas.dataset.reactiveSpells=diagnostics;
 }
}
