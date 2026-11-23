import { afterEach,expect,it } from 'vitest';
import { Match } from '../../src/game/Match';
import { config } from '../../src/game/config';
import { cleanse,modifyTarget } from '../../src/game/targetModifiers';
import { playerPacingAt } from '../../src/game/pacing';
import type { Target,TargetKind } from '../../src/game/types';

const before={window:config.rosterSpells.tendingMs,extension:config.rosterSpells.extensionMs,marks:config.rosterSpells.ominousMarks,bonus:config.rosterSpells.markBonus,markWindow:config.rosterSpells.ominousMarkMs};
afterEach(()=>{config.rosterSpells.tendingMs=before.window;config.rosterSpells.extensionMs=before.extension;config.rosterSpells.ominousMarks=before.marks;config.rosterSpells.markBonus=before.bonus;config.rosterSpells.ominousMarkMs=before.markWindow;});
function game(hero:'sprig'|'duskmantle'='sprig') {
  const match=new Match({characters:[hero,'andromoss'],mode:'local',difficulty:'medium',seed:41});
  match.advance(config.countdownMs);match.state.players.forEach(p=>p.nextSpawn=Infinity);return match;
}
function target(match:Match,id:number,kind:TargetKind='mole'):Target {return {id,kind,born:match.state.time-200,expires:match.state.time+10000};}
function cast(match:Match){match.state.players[0].stars=1;match.action({type:'cast',player:0});match.advance(config.spells.castFreezeMs);}
function aura(){config.rosterSpells.tendingMs=3000;config.rosterSpells.extensionMs=500;return game();}

it('extends each current/new target kind once, excludes the end boundary and retains earned time',()=>{
  const match=aura(),p=match.state.players[0];
  for(const [hole,kind] of (['mole','rabbit','star'] as const).entries())p.holes[hole]=target(match,hole+1,kind);
  const old=p.holes[0]!.expires;cast(match);expect(p.tendingUntil-match.state.time).toBe(3000);
  for(const t of p.holes.slice(0,3))expect(t?.expires).toBe(old+500);
  for(const kind of ['mole','rabbit','star'] as const) {
    const arrival=target(match,20,kind),expiry=arrival.expires;
    modifyTarget(p,arrival,match.state.time+2950);modifyTarget(p,arrival,match.state.time+2950);
    expect(arrival.expires).toBe(expiry+500);
    const boundary=target(match,21,kind);modifyTarget(p,boundary,p.tendingUntil);expect(boundary.extended).toBeUndefined();
  }
  match.advance(3000);expect(p.holes[0]?.expires).toBe(old+500);
  const expired={...target(match,22),expires:match.state.time};modifyTarget(p,expired,match.state.time);expect(expired.extended).toBeUndefined();
});

it('applies the aura to actual natural/star/magical arrivals, then stops extending new spawns',()=>{
  const match=aura();match.advance(config.pacing.starOffsetsMs[0]*config.pacing.starScheduleScale-500);cast(match);const p=match.state.players[0],until=p.tendingUntil;
  p.nextSpawn=match.state.time+250;p.decoysUntil=match.state.time+10000;
  const seen=new Set<number>(),origins=new Set<string>();let after=0;
  for(let n=0;n<5000/config.tickMs;n++) {
    match.advance(config.tickMs);
    for(const t of p.holes)if(t&&!seen.has(t.id)) {
      seen.add(t.id);origins.add(t.origin!);
      const base=Math.round(playerPacingAt(t.born-match.state.roundStart,p.score,match.state.players[1].score).lifetimeMs);
      expect(t.expires-t.born).toBe(base+(t.born<until?500:0));
      expect(!!t.extended).toBe(t.born<until);if(t.born>=until)after++;
    }
    match.state.players.forEach(player=>player.score=0);
  }
  expect(origins).toEqual(new Set(['natural','star','magic']));expect(after).toBeGreaterThan(0);
});

it('freezes with casting/pause, survives hostile cleansing, resets per round and never stacks per target',()=>{
  const match=aura(),p=match.state.players[0];p.holes[0]=target(match,1);const expires=p.holes[0]!.expires;
  cast(match);const time=match.state.time,until=p.tendingUntil;
  match.state.players[1].stars=1;match.action({type:'cast',player:1});match.advance(config.spells.castFreezeMs);
  expect(match.state.time).toBe(time);expect(p.tendingUntil).toBe(until);
  match.state.paused=true;match.advance(5000);expect(p.tendingUntil-match.state.time).toBe(3000);match.state.paused=false;
  cleanse(p,match.state.time);expect(p.tendingUntil).toBe(until);expect(p.holes[0]!.expires).toBe(expires+500);
  match.advance(config.spells.cooldownMs);cast(match);expect(p.holes[0]!.expires).toBe(expires+500);
  match.state.phase='round-over';match.nextRound();expect(match.state.players[0].tendingUntil).toBe(0);
});

it('one-star marks exactly three future moles and has no expiry',()=>{
  config.rosterSpells.ominousMarks=3;const match=game('duskmantle'),p=match.state.players[1];
  p.holes[0]=target(match,1);p.holes[1]=target(match,2,'star');cast(match);match.advance(config.spells.warningMs);
  expect(p.holes[0]?.missBonus).toBeUndefined();expect(p.markCharges).toBe(3);
  const future=[target(match,3),target(match,4),target(match,5),target(match,6)];for(const t of future)modifyTarget(p,t,match.state.time,true);
  expect(future.map(t=>t.missBonus)).toEqual([config.rosterSpells.markBonus,config.rosterSpells.markBonus,config.rosterSpells.markBonus,undefined]);
  expect(p.markCharges).toBe(0);expect(p.markPermanent).toBe(true);expect(p.markUntil).toBe(0);
});

it('adds eight penalty points on top of the ordinary miss penalty for three future marks',()=>{
  config.rosterSpells.ominousMarks=3;config.rosterSpells.markBonus=8;
  const match=game('duskmantle'),enemy=match.state.players[1];cast(match);match.advance(config.spells.warningMs);
  for(let hole=0;hole<3;hole++){const t={...target(match,hole+1),expires:match.state.time+300};modifyTarget(enemy,t,match.state.time,true);enemy.holes[hole]=t;}
  expect(enemy.markCharges).toBe(0);expect(enemy.holes.slice(0,3).map(t=>t?.missBonus)).toEqual([8,8,8]);
  match.advance(300);expect(enemy.score).toBe(-48);
});

it('records extended target hits, extra-time hits and expiries separately for every kind',()=>{
  config.rosterSpells.extensionMs=750;config.rosterSpells.tendingMs=6000;
  const match=game(),p=match.state.players[0];
  for(const [hole,kind] of (['mole','star','rabbit'] as const).entries())
    p.holes[hole]={...target(match,hole+1,kind),expires:match.state.time+1000};
  cast(match);expect(p.tendingUntil-match.state.time).toBe(6000);
  for(const t of p.holes.slice(0,3))expect(t!.expires-match.state.time).toBe(1750);
  match.advance(1000);
  for(const hole of [0,1,2])match.action({type:'hit',player:0,hole});
  for(const [hole,kind] of (['mole','star','rabbit'] as const).entries())
    p.holes[hole]={...target(match,hole+20,kind),extended:true,expires:match.state.time+50};
  match.advance(50);
  const stats=match.statistics[0];
  expect([stats.tendingMoleHits,stats.tendingStarHits,stats.tendingRabbitHits]).toEqual([1,1,1]);
  expect([stats.tendingLateMoleHits,stats.tendingLateStarHits,stats.tendingLateRabbitHits]).toEqual([1,1,1]);
  expect([stats.tendingMoleExpiries,stats.tendingStarExpiries,stats.tendingRabbitExpiries]).toEqual([1,1,1]);
});
