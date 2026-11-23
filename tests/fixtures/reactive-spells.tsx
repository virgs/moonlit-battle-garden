/** Controlled visual fixture using actual casts/hits/spawn modifiers, never replacement spell rules. */
import {createRoot} from 'react-dom/client';
import {Game} from '../../src/ui/Game';
import {Session} from '../../src/game/Session';
import {config} from '../../src/game/config';
import {modifyTarget} from '../../src/game/targetModifiers';
import type {CharacterId,PlayerId,TargetKind} from '../../src/game/types';
import '../../src/ui/style.css';
const q=new URLSearchParams(location.search),sample=q.get('case')??'champ1',phone=q.get('mode')==='ai';
const character:CharacterId=sample==='ward-opponent'?'duskmantle':sample.startsWith('theft-opponent')?'champignon':sample.startsWith('champ')?'champignon':sample.startsWith('bramble')?'captain-bramble':sample.startsWith('theft')?'andromoss':sample==='bonus'?'duskmantle':sample==='tending'||sample==='ward'?'sprig':'champignon';
const rival:CharacterId=sample==='ward-opponent'?'sprig':sample.startsWith('theft-opponent')?'andromoss':sample==='pressure1'||sample==='pressure4'||sample==='rush'?'andromoss':sample.startsWith('curse')||sample==='veil'||sample==='ward'?'duskmantle':'champignon';
const session=new Session({characters:[character,rival],mode:phone?'ai':'local',difficulty:'medium',seed:41}),m=session.match;
m.advance(config.countdownMs);m.state.players.forEach(p=>p.nextSpawn=Infinity);
let serial=200;
const notify=()=>{session.togglePause();session.togglePause();};
const spawn=(id:PlayerId,hole:number,kind:TargetKind='mole',arrival=true)=>{const p=m.state.players[id],target={id:serial++,kind,origin:'natural' as const,born:m.state.time-700,expires:m.state.time+5000};p.holes[hole]=target;modifyTarget(p,target,m.state.time,arrival);return target;};
const cast=(id:PlayerId,tier:number)=>{m.state.players[id].nextCast=0;m.state.players[id].stars=tier;m.action({type:'cast',player:id});m.advance(config.spells.castFreezeMs);m.state.players.forEach(p=>p.nextCast=Infinity);};
if(sample.startsWith('champ')||sample.startsWith('bramble')){cast(0,Number(sample.at(-1)));spawn(0,4);}
if(sample.startsWith('pressure')||sample==='rush'){cast(1,sample==='rush'?2:Number(sample.at(-1)));spawn(0,4);m.advance(50);}
if(sample.startsWith('theft')){const caster=sample.startsWith('theft-opponent')?1:0,donor=caster===0?1:0;m.state.players[donor].stars=sample.endsWith('empty')?0:3;cast(caster,3);spawn(0,4);}
if(sample.startsWith('curse')){spawn(0,0);cast(1,Number(sample.at(-1)));spawn(0,4);}
if(sample==='veil'){spawn(0,4);cast(1,2);}
if(sample==='bonus'){cast(0,3);spawn(0,4);}
if(sample==='tending'){spawn(0,0,'star');spawn(0,4);spawn(0,8,'rabbit');cast(0,1);}
if(sample==='ward-opponent'){cast(1,3);spawn(0,4);}
if(sample==='ward'){cast(1,1);spawn(0,4);cast(1,2);}
notify();
const review={
 fire(action:'block'|'strike'|'miss'|'cleanse'|'incoming'|'begin-cast'){
  if(action==='block')session.act({type:'hit',player:0,hole:8});
  if(action==='strike')session.act({type:'hit',player:0,hole:4});
  if(action==='miss'){const target=m.state.players[0].holes[4];if(target)target.expires=m.state.time+50;m.advance(50);notify();}
  if(action==='cleanse'){cast(0,3);notify();}
  if(action==='incoming'){cast(sample==='ward-opponent'?0:1,1);notify();}
  if(action==='begin-cast'){m.state.players[0].nextCast=0;m.state.players[0].stars=3;session.act({type:'cast',player:0});}
 },
 inspect(){return {time:m.state.time,score:m.state.players[0].score,guards:m.state.players[0].mistakeShield,ward:m.state.players[0].magicShieldUntil,events:m.events,targets:m.state.players[0].holes};}
};
Object.assign(window,{reactiveReview:review});
createRoot(document.getElementById('root')!).render(<Game session={session} leave={()=>{}}/>);
export type ReactiveReview=typeof review;
