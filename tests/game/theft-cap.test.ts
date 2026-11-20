import { afterEach,expect,it } from 'vitest';
import { Match } from '../../src/game/Match';
import { config } from '../../src/game/config';
const original=config.spells.starTheftCap,oldWarning=config.spells.warningMs;
afterEach(()=>{config.spells.starTheftCap=original;config.spells.warningMs=oldWarning;});

it('limits the experimental three-star theft to three while preserving warning and the remaining enemy star',()=>{
  config.spells.starTheftCap=3;config.spells.warningMs=650;
  const match=new Match({characters:['andromoss','sprig'],mode:'local',difficulty:'medium',seed:41});
  match.advance(config.countdownMs);match.state.players.forEach(p=>p.nextSpawn=Infinity);
  const [caster,victim]=match.state.players;caster.stars=3;victim.stars=4;
  match.action({type:'cast',player:0});match.advance(config.spells.castFreezeMs);
  expect(caster.stars).toBe(0);expect(victim.stars).toBe(4);
  match.advance(config.spells.warningMs-config.tickMs);expect(victim.stars).toBe(4);
  match.advance(config.tickMs);expect(victim.stars).toBe(1);expect(caster.stars).toBe(3);
  expect(match.statistics[0].starsStolen).toBe(3);
});
