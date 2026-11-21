import { config } from '../game/config';
import type { Player,Target } from '../game/types';
export type TargetStatus={kind:'armor'|'curse'|'bonus'|'rush'|'tending';value:number;label:string};
/** Actual per-target rules only: no markers for pending quotas or unaffected kinds. */
export function targetStatuses(player:Player,target:Target,time:number):TargetStatus[] {
  if(target.expires<=time)return [];
  const statuses:TargetStatus[]=[];
  if(target.kind==='mole'){
    if(target.armor)statuses.push({kind:'armor',value:target.armor+1,label:`${target.armor+1} hits remaining`});
    if(target.missBonus)statuses.push({kind:'curse',value:target.missBonus,label:`Missing this mole costs ${target.missBonus} extra points`});
    if(player.drainUntil>time)statuses.push({kind:'bonus',value:config.rosterSpells.drainBonus,label:`Manual elimination earns ${config.rosterSpells.drainBonus} bonus points`});
    if(target.rushReductionMs)statuses.push({kind:'rush',value:target.rushReductionMs,label:'Shortened target lifetime'});
  }
  if(target.extended)statuses.push({kind:'tending',value:config.rosterSpells.extensionMs,label:'Extended target lifetime'});
  return statuses;
}
