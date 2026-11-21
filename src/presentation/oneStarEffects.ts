import { config } from '../game/config';
import { hasGuard } from '../game/targetModifiers';
import type { CharacterId,Player } from '../game/types';

export type OneStarEffect = { kind:'guard'|'invasion'|'curse'|'tending'; character:CharacterId; count:number; holes:number[]; label:string };
/** Read-only presentation of the affected player. No timers, randomness or rule changes. */
export function oneStarEffects(player:Player,time:number):OneStarEffect[] {
  const effects:OneStarEffect[]=[];
  if(player.shieldTier===1 && hasGuard(player,time) && (player.character==='champignon'||player.character==='captain-bramble')) {
    effects.push({kind:'guard',character:player.character,count:player.mistakeShield,holes:[],label:`1-star protection: ${player.mistakeShield} mistakes remaining`});
  }
  if(player.invasionUntil>time)effects.push({kind:'invasion',character:'andromoss',count:1,holes:[],label:'1-star enemy rabbit pressure'});
  // Existing marks preserve their assigned bonus across later casts. Tier1 is +8; tier4 is +6.
  const holes=player.holes.flatMap((target,hole)=>target?.kind==='mole'&&target.expires>time&&target.missBonus===config.rosterSpells.markBonus?[hole]:[]);
  const pending=player.markTier===1?player.markCharges:0;
  if(pending+holes.length>0)effects.push({kind:'curse',character:'duskmantle',count:pending+holes.length,holes,label:`1-star curse: ${pending} future moles and ${holes.length} marked moles`});
  if(player.tendingUntil>time)effects.push({kind:'tending',character:'sprig',count:1,holes:[],label:'1-star longer target lifetime'});
  return effects;
}
