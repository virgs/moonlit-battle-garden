import { expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { Match } from '../../src/game/Match';
import { config } from '../../src/game/config';
import { characterIds, isCharacterId, type CharacterId, type PlayerId, type Target } from '../../src/game/types';
import { presentation, validSheet } from '../../src/presentation/config';
import { chooseHome } from '../../src/game/homes';
import { validPick } from '../../src/network/selection';
import { Bot } from '../../src/game/Bot';

function game(a: CharacterId, b: CharacterId) {
  const match = new Match({ characters:[a,b], mode:'local', difficulty:'medium', seed:42 });
  match.advance(config.countdownMs);
  match.state.players.forEach(player => { player.nextSpawn = Infinity; });
  return match;
}
function target(match: Match, kind: Target['kind'] = 'mole', id = 99): Target {
  return { id, kind, born:match.state.time - 250, expires:match.state.time + 20000 };
}
function cast(match: Match, player: PlayerId, tier: number) {
  match.state.players[player].stars = tier;
  match.action({ type:'cast', player });
  expect(match.state.casting?.tier).toBe(tier);
  match.advance(config.spells.castFreezeMs);
}
function resolve(match: Match) { match.advance(config.spells.warningMs + config.tickMs); }

it('exposes five validated heroes with real art and distinct participating homes', () => {
  expect(characterIds).toHaveLength(5);
  for (const id of characterIds) {
    expect(isCharacterId(id)).toBe(true);
    expect(validPick({character:id,ready:true})).toBe(true);
    const art=presentation[id];
    for (const clip of [art.standing,art.victory,art.casts[1]]) {
      const png=readFileSync(`public${clip.src}`);
      expect(validSheet(clip,png.readUInt32BE(16),png.readUInt32BE(20))).toBe(true);
    }
    expect(new Set(Object.values(art.casts).map(clip=>clip.src)).size).toBe(1);
    expect(chooseHome({characters:[id,id],mode:'local',difficulty:'easy',seed:1}).owner).toBe(id);
  }
  expect(new Set(characterIds.map(id=>presentation[id].home.background.src)).size).toBe(5);
  expect(validPick({character:'rootbeard',ready:true})).toBe(false);
});

it('uses the same charge/cooldown/freeze contract for every tier of all five kits', () => {
  for (const id of characterIds) for (const tier of [1,2,3,4]) {
    const match=game(id,'andromoss');
    const time=match.state.time;
    cast(match,0,tier);
    expect(match.state.players[0].stars).toBe(0);
    expect(match.state.time).toBe(time);
    expect(match.events.filter(event=>event.kind==='cast')).toHaveLength(1);
    match.state.players[0].stars=tier;
    match.action({type:'cast',player:0});
    expect(match.events.filter(event=>event.kind==='cast')).toHaveLength(1);
  }
});

it('Bramble armor takes extra strikes without granting early points, and expires', () => {
  for (const tier of [1,4]) {
    const match=game('captain-bramble','andromoss'), victim=match.state.players[1];
    victim.holes[0]=target(match);
    cast(match,0,tier);resolve(match);
    const hits=tier===4?2:1;
    expect(victim.holes[0]?.armor).toBe(hits);
    for(let n=0;n<hits;n++) {
      match.action({type:'hit',player:1,hole:0});
      expect(victim.score).toBe(0);expect(victim.holes[0]).not.toBeNull();
    }
    match.action({type:'hit',player:1,hole:0});
    expect(victim.holes[0]).toBeNull();expect(victim.score).toBe(config.points.mole);
    victim.holes[1]={...target(match),armor:2};
    match.advance(config.rosterSpells.armorMs);
    expect(victim.holes[1]?.armor).toBeUndefined();
  }
});

it('Bramble guards consume one or three charges, independently of hostile armor', () => {
  for(const tier of [2,3]) {
    const match=game('captain-bramble','sprig'),player=match.state.players[0];
    cast(match,0,tier);
    for(let n=0;n<(tier===2?1:3);n++) match.action({type:'hit',player:0,hole:8});
    expect(player.score).toBe(0);
    match.action({type:'hit',player:0,hole:8});expect(player.score).toBe(-config.penalties.empty);
  }
});

it('Duskmantle marks exactly one/four moles and increases their miss penalty only', () => {
  for(const tier of [1,4]) {
    const match=game('duskmantle','sprig'),victim=match.state.players[1];
    for(let i=0;i<5;i++) victim.holes[i]={...target(match,'mole',i+1),expires:match.state.time+1500};
    victim.holes[6]=target(match,'star');victim.holes[7]=target(match,'rabbit');
    cast(match,0,tier);resolve(match);
    const count=tier===1?1:4,bonus=tier===1?config.rosterSpells.markBonus:config.rosterSpells.curseBonus;
    expect(victim.holes.filter(t=>t?.missBonus).length).toBe(count);
    expect(victim.holes[6]?.missBonus).toBeUndefined();expect(victim.holes[7]?.missBonus).toBeUndefined();
    match.advance(1000);
    expect(victim.score).toBe(-(5*config.penalties.miss+count*bonus));
  }
});

it('Duskmantle siphon rewards manual mole hits, not star collection', () => {
  const match=game('duskmantle','sprig'),player=match.state.players[0];
  player.holes[0]=target(match);player.holes[1]=target(match,'star');cast(match,0,3);
  match.action({type:'hit',player:0,hole:0});match.action({type:'hit',player:0,hole:1});
  expect(player.score).toBe(config.points.mole+config.rosterSpells.drainBonus+config.points.star);
});

it('Sprig extends a target only once and automation collects stars in its selected column', () => {
  const match=game('sprig','andromoss'),player=match.state.players[0];
  player.holes[0]=target(match);const expiry=player.holes[0].expires;
  cast(match,0,1);expect(player.holes[0]?.expires).toBe(expiry+config.rosterSpells.extensionMs);
  match.advance(config.spells.cooldownMs);cast(match,0,1);
  expect(player.holes[0]?.expires).toBe(expiry+config.rosterSpells.extensionMs);
  match.advance(config.spells.cooldownMs);
  player.holes[3]=target(match,'mole',100);player.holes[6]=target(match,'star',101);player.holes[1]=target(match,'rabbit',102);
  cast(match,0,2);expect(player.automationColumns).toEqual([0]);
  match.advance(config.rosterSpells.automationIntervalMs*3);
  expect(player.holes[0]).toBeNull();expect(player.holes[3]).toBeNull();
  expect(player.holes[6]).toBeNull();expect(player.holes[1]?.kind).toBe('rabbit');
  expect(player.stars).toBe(1);expect(player.score).toBe(config.points.mole*2+config.points.star);
});

it('wards block new hostile spells; Sprig cleanse removes pending and active modifiers', () => {
  const match=game('captain-bramble','sprig'),victim=match.state.players[1];
  victim.holes[0]=target(match);cast(match,0,4);resolve(match);
  expect(victim.holes[0]?.armor).toBe(2);
  victim.camouflageUntil=match.state.time+5000;victim.markUntil=match.state.time+5000;victim.holes[0]!.missBonus=6;
  cast(match,1,3);
  expect(victim.holes[0]?.armor).toBeUndefined();expect(victim.holes[0]?.missBonus).toBeUndefined();
  expect(victim.camouflageUntil).toBe(0);expect(victim.pending).toHaveLength(0);
  match.advance(config.spells.cooldownMs);cast(match,0,1);resolve(match);
  expect(victim.holes[0]?.armor).toBeUndefined();expect(victim.magicShieldUntil).toBe(0);
});

it('new modifier clocks freeze during casts and reset for the next round', () => {
  const match=game('duskmantle','sprig');cast(match,0,1);resolve(match);
  const until=match.state.players[1].camouflageUntil,time=match.state.time;
  cast(match,1,4);expect(match.state.time).toBe(time);expect(match.state.players[1].camouflageUntil).toBe(until);
  match.state.phase='round-over';match.nextRound();
  for(const player of match.state.players) {
    expect(player.automationUntil).toBe(0);expect(player.camouflageUntil).toBe(0);expect(player.armorUntil).toBe(0);expect(player.markCharges).toBe(0);
  }
});

it('armor/marks apply to future actual spawns, stop at expiry and do not affect stars', () => {
  const match=game('captain-bramble','duskmantle');
  cast(match,0,1);resolve(match);
  const victim=match.state.players[1];victim.nextSpawn=match.state.time;
  for(let time=0;time<4000&&!victim.holes.some(t=>t?.kind==='mole'&&t.armor===1);time+=config.tickMs)match.advance(config.tickMs);
  expect(victim.holes.some(t=>t?.kind==='mole'&&t.armor===1)).toBe(true);
  for(const hole of victim.holes)if(hole?.kind==='star')expect(hole.armor).toBeUndefined();
  const other=game('duskmantle','andromoss');cast(other,0,1);resolve(other);
  other.state.players[1].nextSpawn=other.state.time;
  for(let time=0;time<4000&&!other.state.players[1].holes.some(t=>t?.missBonus);time+=config.tickMs)other.advance(config.tickMs);
  expect(other.state.players[1].holes.some(t=>t?.missBonus)).toBe(true);
});

it('Sprig two-column automation works across its selected columns but spends one action per armor strike', () => {
  const match=game('sprig','andromoss'),player=match.state.players[0];
  player.holes[0]={...target(match),armor:1};player.armorUntil=match.state.time+10000;
  player.holes[1]=target(match,'mole',100);player.holes[2]=target(match,'star',101);
  cast(match,0,4);
  match.advance(config.rosterSpells.automationIntervalMs);
  expect(player.holes[0]?.armor).toBe(0);expect(player.score).toBe(0);
  match.advance(config.rosterSpells.automationIntervalMs*2);
  expect(player.holes[0]).toBeNull();expect(player.holes[1]).toBeNull();
  expect(player.automationColumns).toHaveLength(2);
  expect(player.holes[2]?.kind).toBe('star');expect(player.score).toBe(config.points.mole*2);
});

it('bots can strike armored targets repeatedly instead of abandoning them after one hit', () => {
  let cleared=0;
  for(let seed=0;seed<20;seed++) {
    const match=game('captain-bramble','andromoss'),player=match.state.players[1];
    player.armorUntil=match.state.time+10000;player.holes[0]={...target(match),armor:2};
    const bot=new Bot('hard',seed,1);
    for(let time=0;time<3000;time+=config.tickMs){match.advance(config.tickMs);bot.update(match);}
    if(!player.holes[0])cleared++;
  }
  expect(cleared).toBeGreaterThan(10);
});
