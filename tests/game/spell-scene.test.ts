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
