import { expect,it } from 'vitest';
import { Match } from '../../src/game/Match';
import { config } from '../../src/game/config';
import { createArenaLayout } from '../../src/render/layout';
import { columnEffectGeometry,spellSceneModel } from '../../src/presentation/spellScene';
import { paintSpellScene } from '../../src/render/spellScene';
function game(hero:'champignon'|'sprig',tier:number){const m=new Match({characters:[hero,'captain-bramble'],mode:'local',difficulty:'hard',seed:41});m.advance(config.countdownMs);m.state.players.forEach(p=>p.nextSpawn=Infinity);m.state.players[0].stars=tier;m.action({type:'cast',player:0});return m;}
it('fits each animated column to all three real hole centers at every screen size',()=>{
 for(const [w,h,mode] of [[1280,800,'local'],[390,844,'ai'],[844,390,'ai'],[320,568,'ai']] as const)for(const garden of createArenaLayout(w,h,mode).gardens)for(const column of [0,1,2]){
  const g=columnEffectGeometry(garden,column);expect(g.bottom-g.top).toBeGreaterThan(270);
  for(let row=0;row<3;row++)expect(g.holes[row].x*garden.scale+garden.x).toBeCloseTo(garden.holes[column+row*3].feet.x,4);
  expect(g.bottom+8).toBeLessThan(383*.89-36); // Drone body stays above the duration icon.
 }
});
it('choreography follows actual casts, freezes and deadlines without mutating the match',()=>{
 for(const hero of ['champignon','sprig'] as const)for(const tier of [2,4]){
  const m=game(hero,tier),garden=createArenaLayout(1280,800,'local').gardens[0],read=()=>spellSceneModel({state:m.state,events:m.events},garden);
  expect(read().columns).toEqual([]);m.advance(config.spells.castFreezeMs);expect(read().columns).toHaveLength(hero==='sprig'&&tier===4?2:1);
  const before=JSON.stringify(m.state);read();expect(JSON.stringify(m.state)).toBe(before);
  m.state.paused=true;const frozen=read();m.advance(1000);expect(read()).toEqual(frozen);m.state.paused=false;m.advance(7000);expect(read().columns).toEqual([]);
 }
});
it('draws distinct pixel action for each column hero and uses only real hit events',()=>{
 const commands=(hero:'champignon'|'sprig',time:number,reduced=false)=>{
  const m=game(hero,4);m.advance(config.spells.castFreezeMs);m.state.time+=time;
  const garden=createArenaLayout(1280,800,'local').gardens[0],model=spellSceneModel({state:m.state,events:m.events},garden),rects:number[][]=[];
  expect(model.hits).toEqual([]);
  const ctx={clearRect:()=>{},fillRect:(...args:number[])=>rects.push(args)} as unknown as CanvasRenderingContext2D;
  paintSpellScene(ctx,model,garden,reduced);return rects;
 };
 expect(commands('champignon',0)).not.toEqual(commands('sprig',0));expect(commands('sprig',0)).not.toEqual(commands('sprig',200));expect(commands('sprig',0,true)).toEqual(commands('sprig',200,true));
});
it('adds scene choreography for all20 actual spell casts without changing outcomes',()=>{
 for(const hero of ['champignon','andromoss','captain-bramble','duskmantle','sprig'] as const)for(const tier of [1,2,3,4]){
  const m=new Match({characters:[hero,'champignon'],mode:'local',difficulty:'hard',seed:41});m.advance(config.countdownMs);m.state.players.forEach(p=>p.nextSpawn=Infinity);m.state.players[0].stars=tier;m.state.players[1].stars=4;m.action({type:'cast',player:0});m.advance(config.spells.castFreezeMs);
  const before=JSON.stringify(m.state),scenes=createArenaLayout(1280,800,'local').gardens.map(garden=>spellSceneModel({state:m.state,events:m.events},garden));
  expect(scenes.some(scene=>scene.effects.some(e=>e.character===hero&&e.tier===tier)),`${hero}${tier}`).toBe(true);expect(JSON.stringify(m.state)).toBe(before);
 }
});
it('reacts to real blocked mistakes including the last charge, not armor strikes',()=>{
 const m=new Match({characters:['champignon','captain-bramble'],mode:'local',difficulty:'hard',seed:41});m.advance(config.countdownMs);m.state.players.forEach(p=>p.nextSpawn=Infinity);m.state.players[0].stars=1;m.action({type:'cast',player:0});m.advance(config.spells.castFreezeMs);
 const read=()=>spellSceneModel({state:m.state,events:m.events},createArenaLayout(1280,800,'local').gardens[0]);
 m.action({type:'hit',player:0,hole:8});expect(read().blocks).toHaveLength(1);m.action({type:'hit',player:0,hole:8});expect(m.state.players[0].mistakeShield).toBe(0);expect(read().blocks).toHaveLength(2);
 m.advance(500);m.state.players[0].holes[4]={id:90,kind:'mole',born:m.state.time,expires:m.state.time+2000,armor:1,persistentArmor:true};m.action({type:'hit',player:0,hole:4});expect(read().blocks).toHaveLength(0);
});
it('keeps smooth cosmetic time bounded and joins rope ends to the banked drones',async()=>{
 const {spellMotionTime,droneRig,columnRopePoint}=await import('../../src/presentation/spellScene');
 expect(spellMotionTime(5000,16)).toBe(5016);expect(spellMotionTime(5000,500)).toBe(5049);expect(spellMotionTime(5000,16,true)).toBe(5000);expect(spellMotionTime(5000,16,false,true)).toBe(5000);
 const column=columnEffectGeometry(createArenaLayout(1280,800,'local').gardens[0],0);
 const rig=droneRig(column,5000),a=columnRopePoint(column,5000,0),b=columnRopePoint(column,5000,1);
 expect(a.x).toBeCloseTo(rig.top.x,5);expect(a.y).toBeCloseTo(rig.top.y+7,5);expect(b.x).toBeCloseTo(rig.bottom.x,5);expect(b.y).toBeCloseTo(rig.bottom.y-5,5);
 expect(Math.abs(rig.top.bank)).toBeLessThan(.15);expect(Math.abs(columnRopePoint(column,5001,.5).x-columnRopePoint(column,5000,.5).x)).toBeLessThan(.1);
});

it('reuses original Sprig poses without stretching and staggers the two columns',()=>{
 const m=game('sprig',4);m.advance(config.spells.castFreezeMs);
 const garden=createArenaLayout(1280,800,'local').gardens[0],model=spellSceneModel({state:m.state,events:m.events},garden),draws:unknown[][]=[];
 const ctx={clearRect:()=>{},fillRect:()=>{},save:()=>{},restore:()=>{},translate:()=>{},rotate:()=>{},drawImage:(...args:unknown[])=>draws.push(args)} as unknown as CanvasRenderingContext2D;
 const sheet={} as HTMLImageElement;
 paintSpellScene(ctx,model,garden,false,model.time,sheet);
 expect(draws).toHaveLength(2);expect(draws.map(d=>d[1]).sort()).toEqual([0,85]);
 for(const draw of draws){expect(draw[0]).toBe(sheet);expect(Number(draw[7])/Number(draw[8])).toBeCloseTo(85/361);}
 draws.length=0;paintSpellScene(ctx,model,garden,true,model.time+500,sheet);expect(draws.map(d=>d[1])).toEqual([0,0]);
});

it('does not invent column impact bursts for empty hits or missed moles',()=>{
 const m=game('champignon',2);m.advance(config.spells.castFreezeMs);const garden=createArenaLayout(1280,800,'local').gardens[0];m.action({type:'hit',player:0,hole:0});expect(m.events.at(-1)).toMatchObject({reason:'empty',hole:0});expect(spellSceneModel({state:m.state,events:m.events},garden).hits).toEqual([]);
});
