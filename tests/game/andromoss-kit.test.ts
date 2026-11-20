import { expect,it } from 'vitest';
import { Match } from '../../src/game/Match';
import { config } from '../../src/game/config';
import { cleanse,modifyTarget } from '../../src/game/targetModifiers';
import { playerPacingAt } from '../../src/game/pacing';
import type { Target,TargetKind } from '../../src/game/types';
function game(){const m=new Match({characters:['andromoss','sprig'],mode:'local',difficulty:'medium',seed:41});m.advance(config.countdownMs);m.state.players.forEach(p=>p.nextSpawn=Infinity);return m;}
function cast(m:Match,tier:number){m.state.players[0].stars=tier;m.action({type:'cast',player:0});m.advance(config.spells.castFreezeMs);}
function target(m:Match,kind:TargetKind='mole',life=500):Target{return {id:99,kind,born:m.state.time,expires:m.state.time+life};}
it('1 and4 add only rabbits at850/650ms over8 seconds, with4 also shortening moles',()=>{
  for(const tier of [1,4]){
    const m=game(),p=m.state.players[1],start=m.state.time;cast(m,tier);
    expect((tier===1?p.invasionUntil:p.decoysUntil)-start).toBe(8000);
    expect(p.moleRushUntil).toBe(tier===4?start+8000:0);
    const seen=new Set<number>(),births:number[]=[];
    for(let t=0;t<8200;t+=50){m.advance(50);for(const x of p.holes)if(x&&!seen.has(x.id)){
      seen.add(x.id);expect(x.origin).toBe('magic');expect(x.kind).toBe('rabbit');births.push(x.born-start);
    }p.holes.fill(null);}
    expect(births.length).toBe(tier===1?10:13);expect(births[0]).toBe(50);
    for(let n=1;n<births.length;n++)expect(births[n]-births[n-1]).toBe(tier===1?850:650);
  }
});
it('2 affects only new moles once, allows425ms below the natural floor, and excludes the8s boundary',()=>{
  const m=game(),p=m.state.players[1];p.holes[0]=target(m,'mole',1000);const expiry=p.holes[0]!.expires;cast(m,2);
  expect(p.holes[0]!.expires).toBe(expiry);expect(p.moleRushUntil-m.state.time).toBe(8000);
  const mole=target(m);modifyTarget(p,mole,m.state.time,true);expect(mole.expires-mole.born).toBe(425);expect(mole.rushReductionMs).toBe(75);
  modifyTarget(p,mole,m.state.time,true);expect(mole.expires-mole.born).toBe(425);
  for(const kind of ['star','rabbit'] as const){const t=target(m,kind);modifyTarget(p,t,m.state.time,true);expect(t.expires-t.born).toBe(500);expect(t.rushed).toBeUndefined();}
  const boundary={...target(m),born:p.moleRushUntil,expires:p.moleRushUntil+500};modifyTarget(p,boundary,p.moleRushUntil,true);expect(boundary.expires-boundary.born).toBe(500);
});
it('real new moles use85% of wave lifetime while actual rabbits/stars retain their wave lifetime',()=>{
  const m=game();m.advance(60000);cast(m,4);const p=m.state.players[1];p.nextSpawn=m.state.time+250;
  const seen=new Set<number>(),kinds=new Set<TargetKind>();
  for(let n=0;n<160;n++){
    m.advance(50);
    for(const t of p.holes)if(t&&!seen.has(t.id)){
      seen.add(t.id);kinds.add(t.kind);const base=Math.round(playerPacingAt(t.born-m.state.roundStart,p.score,m.state.players[0].score).lifetimeMs);
      expect(t.expires-t.born).toBe(t.kind==='mole'?Math.round(base*.85):base);
    }
    m.state.players.forEach(q=>q.score=0);
  }
  expect(kinds.has('mole')).toBe(true);expect(kinds.has('rabbit')).toBe(true);expect(kinds.has('star')).toBe(true);
});
it('adds the fixed Tending bonus after shortening and cleanses lost time without stacking or revival',()=>{
  const m=game(),p=m.state.players[1];cast(m,2);p.tendingUntil=m.state.time+6000;
  const live=target(m);modifyTarget(p,live,m.state.time,true);expect(live.expires-live.born).toBe(425+750);p.holes[0]=live;
  const expired={...target(m),rushed:true,rushReductionMs:75,expires:m.state.time};p.holes[1]=expired;
  cleanse(p,m.state.time);expect(live.expires-live.born).toBe(1250);expect(live.rushReductionMs).toBeUndefined();expect(p.moleRushUntil).toBe(0);
  expect(expired.expires).toBe(m.state.time);cleanse(p,m.state.time);expect(live.expires-live.born).toBe(1250);
});
it('freeze/reset preserve and clear both components correctly, while recasts do not compound old targets',()=>{
  const m=game(),p=m.state.players[1];cast(m,4);const time=m.state.time,end=p.moleRushUntil;
  m.state.paused=true;m.advance(20000);expect(m.state.time).toBe(time);expect(p.decoysUntil).toBe(end);m.state.paused=false;
  m.state.phase='round-over';m.nextRound();expect(m.state.players[1].moleRushUntil).toBe(0);expect(m.state.players[1].invasionUntil+m.state.players[1].decoysUntil).toBe(0);
});
