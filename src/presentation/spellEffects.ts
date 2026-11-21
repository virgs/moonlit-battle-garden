import type { Snapshot } from '../game/Session';
import type { CharacterId,PlayerId } from '../game/types';
import { hasGuard } from '../game/targetModifiers';
export type SpellEffect={kind:string;character:CharacterId;tier:number;count:number;columns:number[]};
/** Read-only cues: pending quotas stay on the rim; assigned effects live on targets. */
export function higherSpellEffects(snapshot:Snapshot,side:PlayerId):SpellEffect[]{
  const {state}=snapshot,p=state.players[side],time=state.time,effects:SpellEffect[]=[];
  const add=(kind:string,character:CharacterId,tier:number,count=1,columns:number[]=[])=>effects.push({kind,character,tier,count,columns});
  if(p.sweepUntil>time)add('sweep','champignon',p.sweepTier,1,p.sweepColumns);
  if(p.shieldTier===3&&hasGuard(p,time))add('guard',p.character,3,p.mistakeShield);
  if(p.magicShieldUntil>time)add('ward','sprig',3);
  if(p.decoysUntil>time)add('decoys','andromoss',4);
  else if(p.moleRushUntil>time)add('rush','andromoss',p.moleRushTier);
  if(p.tinCharges>0)add('armor','captain-bramble',p.tinTier,p.tinCharges);
  if(p.markTier===4&&p.markCharges>0)add('curse','duskmantle',4,p.markCharges);
  if(p.camouflageUntil>time)add('veil','duskmantle',2);
  if(p.drainUntil>time)add('drain','duskmantle',3);
  if(p.automationUntil>time)add('automation','sprig',p.automationTier,1,p.automationColumns);
  const cast=[...snapshot.events].reverse().find(e=>e.kind==='cast'&&e.player===side&&e.round===state.round);
  // Three-star cost leaves zero; only a successful steal receives this brief cue.
  const earnedAfterCast=cast?snapshot.events.filter(e=>e.player===side&&e.id>cast.id&&e.kind==='star').length:0;
  const stolen=Math.max(0,p.stars-earnedAfterCast);
  if(p.character==='andromoss'&&cast?.tier===3&&time-cast.time<1000&&stolen>0)add('steal','andromoss',3,stolen);
  return effects;
}
