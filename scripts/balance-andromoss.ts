import { createHash } from 'node:crypto';
import { readFileSync,readdirSync,mkdirSync,writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { config,characters } from '../src/game/config';
import { simulateBattle,type BattleResult } from '../src/game/simulate';
import { characterIds,type CharacterId,type Difficulty,type PlayerId,type SpellTier } from '../src/game/types';
const count=Number(process.argv.find(x=>x.startsWith('--seeds='))?.split('=')[1]??100);
const seed=Number(process.argv.find(x=>x.startsWith('--seed='))?.split('=')[1]??20261119);
const enemyTier=Number(process.argv.find(x=>x.startsWith('--enemy-tier='))?.split('=')[1]??4) as SpellTier;
if(!Number.isInteger(count)||count<100||count>1000||!Number.isSafeInteger(seed)||!Number.isSafeInteger(seed+count-1)||![1,2,3,4].includes(enemyTier))throw Error('Use100..1000 seeds, a safe base seed and enemy-tier1..4');
const levels:Difficulty[]=['easy','medium','hard'],tiers:SpellTier[]=[1,2,3,4];
const battles:(BattleResult & {difficulty:Difficulty;tier:SpellTier;enemy:CharacterId;actor:PlayerId;seed:number;characters:[CharacterId,CharacterId];selected:[SpellTier,SpellTier]})[]=[];
for(const difficulty of levels){
  for(const tier of tiers)for(const enemy of characterIds)for(let n=0;n<count;n++)for(const actor of [0,1] as const){
    const chars:[CharacterId,CharacterId]=actor===0?['andromoss',enemy]:[enemy,'andromoss'];
    const selected:[SpellTier,SpellTier]=actor===0?[tier,enemyTier]:[enemyTier,tier];
    const result=simulateBattle(chars,difficulty,seed+n,undefined,'opportunity',selected);
    battles.push({difficulty,tier,enemy,actor,seed:seed+n,characters:chars,selected,...result});
  }
  console.log(`${difficulty}: ${battles.filter(x=>x.difficulty===difficulty).length} games`);
}
const rows=levels.flatMap(difficulty=>tiers.flatMap(tier=>characterIds.map(enemy=>{
  const games=battles.filter(x=>x.difficulty===difficulty&&x.tier===tier&&x.enemy===enemy);
  const completed=games.filter(x=>!x.timedOut),wins=completed.filter(x=>x.winnerSide===x.actor).length;
  return {difficulty,tier,enemy,total:games.length,decided:completed.length,wins,unfinished:games.length-completed.length,winRate:completed.length?100*wins/completed.length:null};
})));
const pooled=tiers.flatMap(tier=>characterIds.map(enemy=>{
  const matching=rows.filter(x=>x.tier===tier&&x.enemy===enemy),decided=matching.reduce((n,x)=>n+x.decided,0),wins=matching.reduce((n,x)=>n+x.wins,0);
  const rates=matching.flatMap(x=>x.winRate===null?[]:[x.winRate]);
  return {tier,enemy,total:matching.reduce((n,x)=>n+x.total,0),decided,wins,unfinished:matching.reduce((n,x)=>n+x.unfinished,0),winRate:decided?100*wins/decided:null,spread:Math.max(...rates)-Math.min(...rates),counterFlip:rates.some(x=>x<50)&&rates.some(x=>x>50),levels:matching};
}));
if(enemyTier===4){const mirror=pooled.find(x=>x.tier===4&&x.enemy==='andromoss')!;if(mirror.wins*2!==mirror.decided)throw Error('Swapped identical4vs4 mirrors must be50%');}
const matrix=(difficulty?:Difficulty)=>{
  const data=difficulty?rows.filter(x=>x.difficulty===difficulty):pooled;
  const lines=['| Andromoss vs → | '+characterIds.map(x=>characters[x].name+` ${enemyTier}★`).join(' | ')+' |','|---|'+'---:|'.repeat(characterIds.length)];
  for(const tier of tiers)lines.push('| '+tier+'★ | '+characterIds.map(enemy=>{
    const r=data.find(x=>x.tier===tier&&x.enemy===enemy)!;const v=r.winRate;
    return v===null?'—':(v>60?'🟩':v<40?'🟥':'🟨')+v.toFixed(1)+'%'+(!difficulty&&'spread' in r&&(Number(r.spread)>20||r.counterFlip)?'*':'');
  }).join(' | ')+' |');return lines.join('\n');
};
const revision=execFileSync('git',['rev-parse','--short','HEAD'],{encoding:'utf8'}).trim();
const configHash=createHash('sha256').update(JSON.stringify(config)).digest('hex').slice(0,12);
const simulationHash=createHash('sha256').update(readdirSync('src/game').filter(x=>x.endsWith('.ts')).sort().map(x=>`${x}\n${readFileSync(`src/game/${x}`,'utf8')}`).join('\n')).digest('hex').slice(0,16);
const flags=pooled.filter(x=>x.spread>20||x.counterFlip).map(x=>`- ${x.tier}★ vs ${characters[x.enemy].name}: ${x.levels.map(q=>`${q.difficulty} ${q.winRate?.toFixed(1)}%`).join(', ')}; spread${x.spread.toFixed(1)} points${x.counterFlip?'; observed favored-side flip':''}.`).join('\n')||'No large spreads or favored-side flips.';
const report={generated:new Date().toISOString(),revision,workingChanges:true,configHash,simulationHash,seeds:count,seed,enemyTier,rows,pooled,battles};mkdirSync('reports',{recursive:true});
writeFileSync('reports/andromoss-fixed-opponents.json',JSON.stringify(report)+'\n');
writeFileSync('reports/andromoss-fixed-opponents.md',`# Andromoss against fixed opponent spells\n\n${battles.length} actual-simulation games,${count} paired seeds,${count*2} games/cell/difficulty. Every opponent uses only${enemyTier}★ and keeps that meter capacity across all Andromoss rows. Andromoss uses only the row’s selected tier/capacity. Same seeds/side swaps/hit settings/scaled opportunity delays. Revision${revision} +working changes; config${configHash}; simulation${simulationHash}.\n\nRows are spell costs, columns fixed enemy abilities, **not a symmetric character matrix**. Percentages are Andromoss wins; pooled by completed counts. 🟩>60%, 🟨40–60%, 🟥<40%; * means spread>20 points or observed favored-side flip.\n\n${matrix()}\n\n${levels.map(x=>'## '+x+'\n\n'+matrix(x)).join('\n\n')}\n\n## Difficulty flags\n\n${flags}\n\nNo unfinished games are invented as wins. Identical4vs4 Andromoss paired mirrors must be50%, including when capped pairs are excluded. Normal play has a four-slot meter and can change spell as charge grows; here the row fixes its cap. In particular3★ theft can remove four enemy stars but receive only three, unlike normal play’s capacity4. These tests compare selected-spell builds against constant opposition, not optimal full-kit choices or equal resource-efficiency/per-cast value. Human playtesting remains necessary.\n\nReproduce: \`pnpm balance:andromoss --seeds=${count} --seed=${seed} --enemy-tier=${enemyTier}\`.\n`);
