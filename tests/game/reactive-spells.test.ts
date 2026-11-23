import {expect,it} from 'vitest';
import {readFileSync} from 'node:fs';
import {Match} from '../../src/game/Match';
import {config} from '../../src/game/config';
import {extendTarget} from '../../src/game/targetModifiers';
import {reactiveSpellActors,reactiveAssets} from '../../src/presentation/reactiveSpells';
import {localView} from '../../src/network/protocol';
const game=(hero:'champignon'|'captain-bramble'|'andromoss'|'duskmantle'|'sprig'='champignon')=>{const m=new Match({characters:[hero,'sprig'],mode:'local',difficulty:'medium',seed:1});m.advance(config.countdownMs);m.state.players.forEach(p=>p.nextSpawn=Infinity);return m;};
const view=(m:Match)=>({state:m.state,events:m.events});
const cast=(m:Match,tier:number)=>{m.state.players[0].stars=tier;m.action({type:'cast',player:0});m.advance(config.spells.castFreezeMs);};
const target=(m:Match,id=99)=>({id,kind:'mole' as const,born:m.state.time-800,expires:m.state.time+2000});
it('ships nine original nine-frame PixelLab animation families',()=>{for(const [key,size]of Object.entries(reactiveAssets)){const data=readFileSync(`public/assets/effects/reactive/${key}.png`);expect([data.readUInt32BE(16),data.readUInt32BE(20)]).toEqual([size*9,size]);}});
it('guardians represent actual remaining charges and intercept the last blocked empty hit at its real hole',()=>{
 for(const hero of ['champignon','captain-bramble'] as const){const m=game(hero);cast(m,1);expect(reactiveSpellActors(view(m),0).filter(a=>a.kind==='guardian')).toHaveLength(2);m.action({type:'hit',player:0,hole:8});expect(m.events.at(-1)).toMatchObject({kind:'shield',hole:8,visual:{guardRemaining:1}});m.action({type:'hit',player:0,hole:7});const actors=reactiveSpellActors(view(m),0);expect(actors.filter(a=>a.kind==='guardian')).toHaveLength(0);expect(actors.filter(a=>a.kind==='guard-intercept')).toHaveLength(2);expect(m.state.players[0].score).toBe(0);const last=reactiveSpellActors(view(m),0,true).find(a=>a.kind==='guard-intercept'&&a.key===`block-${m.events.at(-1)!.id}`)!;expect(last.x).toBeCloseTo(148);expect(last.y).toBeCloseTo(284);}
});
it('theft metadata records actual capacity-limited outcomes and survives seat remapping',()=>{
 const m=game('andromoss');m.state.players[1].stars=4;cast(m,3);expect(m.events.find(e=>e.kind==='cast')?.visual).toMatchObject({theftTaken:4,theftReceived:4});const swapped=localView(view(m),1);expect(swapped.events.find(e=>e.kind==='cast')).toMatchObject({player:1,visual:{theftTaken:4,theftReceived:4}});
 const empty=game('andromoss');cast(empty,3);expect(reactiveSpellActors(view(empty),0).some(a=>a.kind==='empty-theft')).toBe(true);
 const blocked=game('andromoss');blocked.state.players[1].stars=4;blocked.state.players[1].magicShieldUntil=blocked.state.time+6000;cast(blocked,3);expect(blocked.events.find(e=>e.kind==='cast')?.visual).toMatchObject({theftTaken:0,theftReceived:0,wardBlocked:true});expect(reactiveSpellActors(view(blocked),1).some(a=>a.kind==='living-ward')).toBe(true);expect(reactiveSpellActors(localView(view(blocked),1),0).some(a=>a.kind==='living-ward')).toBe(true);
});
it('only genuinely rewarded manual kills release souls, including after the aura ends',()=>{
 const manual=game('duskmantle');cast(manual,3);manual.state.players[0].holes[4]=target(manual);manual.action({type:'hit',player:0,hole:4});expect(manual.events.at(-1)?.visual?.bonusPoints).toBe(2);manual.state.players[0].drainUntil=0;expect(reactiveSpellActors(view(manual),0).some(a=>a.kind==='soul-reward')).toBe(true);
 const auto=game('duskmantle');cast(auto,3);auto.state.players[0].holes[4]=target(auto);auto.state.players[0].sweepColumns=[1];auto.state.players[0].sweepUntil=auto.state.time+1000;auto.advance(50);expect(auto.events.find(e=>e.kind==='hit')?.visual?.bonusPoints??0).toBe(0);expect(reactiveSpellActors(view(auto),0).some(a=>a.kind==='soul-reward')).toBe(false);
});
it('marks snap only on a real extra miss penalty, not on successful hits or ordinary missed moles',()=>{
 const m=game('duskmantle'),p=m.state.players[0];p.holes[4]={...target(m),expires:m.state.time+50,missBonus:8,persistentMark:true};m.advance(50);expect(m.events.at(-1)).toMatchObject({hole:4,targetKind:'mole',visual:{markPenalty:8}});expect(reactiveSpellActors(view(m),0).some(a=>a.kind==='curse-snap')).toBe(true);expect(p.score).toBe(-16);
});
it('portal, shortened lifetime and extended-time actors attach only to actually modified targets',()=>{
 const m=game('sprig'),p=m.state.players[0];p.holes[0]={id:1,kind:'rabbit',origin:'magic',born:m.state.time-100,expires:m.state.time+1000};p.holes[1]={...target(m,2),rushReductionMs:150};p.holes[2]=target(m,3);extendTarget(p.holes[2]!,m.state.time);const before=p.holes[2]!.extendedAt;extendTarget(p.holes[2]!,m.state.time+200);expect(p.holes[2]!.extendedAt).toBe(before);
 const actors=reactiveSpellActors(view(m),0);expect(actors.some(a=>a.kind==='rabbit-portal')).toBe(true);expect(actors.some(a=>a.kind==='shortened-mole')).toBe(true);expect(actors.some(a=>a.kind==='extended-target')).toBe(true);expect(actors.some(a=>a.kind==='time-granted')).toBe(true);
 const original=JSON.stringify(m.state);reactiveSpellActors(view(m),0);expect(JSON.stringify(m.state)).toBe(original);
});
it('holds sprite poses still for reduced motion and exposes no new effects during casting',()=>{const m=game('champignon');cast(m,1);const a=reactiveSpellActors(view(m),0,true);m.state.time+=500;expect(reactiveSpellActors(view(m),0,true)).toEqual(a);m.state.casting={player:0,tier:1,remainingMs:1000};expect(reactiveSpellActors(view(m),0)).toEqual([]);});

it('records removed versus received stars separately when the receiver capacity is smaller',()=>{
 const m=new Match({characters:['andromoss','champignon'],mode:'local',difficulty:'medium',seed:1,isolatedSpellTiers:[3,4]});m.advance(config.countdownMs);m.state.players[1].stars=4;m.state.players[0].stars=3;m.action({type:'cast',player:0});expect(m.events.find(e=>e.kind==='cast')?.visual).toMatchObject({theftTaken:4,theftReceived:3});expect(m.state.players[0].stars).toBe(3);expect(m.state.players[1].stars).toBe(0);
});

it('reduced-motion target growth and reaction cues keep their position, size and pose still',()=>{
 const m=game('sprig'),p=m.state.players[0];p.holes[4]={...target(m),born:m.state.time,missBonus:8,extended:true,extendedAt:m.state.time};m.events.push({id:10,time:m.state.time,round:1,player:0,kind:'penalty',hole:0,reason:'miss',visual:{markPenalty:8}});
 const poses=()=>reactiveSpellActors(view(m),0,true).map(({key,x,y,size,frame,rotation})=>({key,x,y,size,frame,rotation}));const first=poses();m.state.time+=150;expect(poses()).toEqual(first);
});
