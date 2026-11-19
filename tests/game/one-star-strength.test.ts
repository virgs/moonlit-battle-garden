import { expect,it } from 'vitest';
import { Match } from '../../src/game/Match';
import { config } from '../../src/game/config';

function game(tier:number) {
  const match=new Match({characters:['champignon','sprig'],difficulty:'medium',mode:'local',seed:41});
  match.advance(config.countdownMs);match.state.players.forEach(p=>p.nextSpawn=Infinity);
  match.state.players[0].stars=tier;match.action({type:'cast',player:0});match.advance(config.spells.castFreezeMs);
  return match;
}
function mole(match:Match) {
  match.state.players[0].holes[0]={id:99,kind:'mole',born:match.state.time-250,expires:match.state.time+10000};
}

it('slower Clean Sweep keeps the initial hit and normal rewards, then waits its own interval',()=>{
  const prior=config.rosterSpells.sweepIntervalMs;
  try {
    config.rosterSpells.sweepIntervalMs=750;
    const match=new Match({characters:['champignon','sprig'],difficulty:'medium',mode:'local',seed:41});
    match.advance(config.countdownMs);match.state.players.forEach(p=>p.nextSpawn=Infinity);
    mole(match);match.state.players[0].stars=1;match.action({type:'cast',player:0});
    expect(match.state.players[0].holes[0]).toBeNull();expect(match.state.players[0].score).toBe(config.points.mole);
    match.advance(config.spells.castFreezeMs);mole(match);match.advance(700);
    expect(match.state.players[0].holes[0]?.kind).toBe('mole');
    match.advance(50);expect(match.state.players[0].holes[0]).toBeNull();
    expect(match.state.players[0].score).toBe(2*config.points.mole);
    expect(match.state.players[0].sweepUntil-match.state.time).toBe(2250);
  } finally { config.rosterSpells.sweepIntervalMs=prior; }
});

it('Royal Cleanup retains quarter-second strikes when one-star Sweep is slower',()=>{
  const prior=config.rosterSpells.sweepIntervalMs;
  try {
    config.rosterSpells.sweepIntervalMs=750;
    const match=game(4);mole(match);match.advance(200);
    expect(match.state.players[0].holes[0]?.kind).toBe('mole');
    match.advance(50);expect(match.state.players[0].holes[0]).toBeNull();
    expect(config.rosterSpells.royalSweepIntervalMs).toBe(250);
    expect(match.state.players[0].mistakeShield).toBe(3);
  } finally { config.rosterSpells.sweepIntervalMs=prior; }
});
