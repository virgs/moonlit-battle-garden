import { mkdirSync, writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { config, characters } from '../src/game/config';
import { characterIds, type CharacterId, type Difficulty } from '../src/game/types';
import { simulateBattle, type BattleResult } from '../src/game/simulate';
import { poolMatchups,matchupMatrix } from './roster-matrix';

const count=Number(process.argv.find(arg=>arg.startsWith('--seeds='))?.split('=')[1]??100);
const seed=Number(process.argv.find(arg=>arg.startsWith('--seed='))?.split('=')[1]??20261118);
if(!Number.isInteger(count)||count<1||count>1000||!Number.isSafeInteger(seed)||!Number.isSafeInteger(seed+count-1))throw Error('Use --seeds=1..1000 and a safe --seed.');
const reportName=process.argv.find(arg=>arg.startsWith('--report='))?.split('=')[1]??'balance-roster';
if(!/^[a-z0-9-]+$/.test(reportName))throw Error('Use a simple --report=name.');
const overrides: Record<string,number> = {};
for (const [flag,key] of [['--armor-ms=','armorMs'],['--sweep-ms=','cleanSweepMs']] as const) {
  const raw=process.argv.find(arg=>arg.startsWith(flag));
  if(raw) {
    const value=Number(raw.slice(flag.length));
    if(!Number.isInteger(value)||value<config.tickMs||value>30000||value%config.tickMs!==0)throw Error(`${flag} must be a positive tick multiple up to 30000ms.`);
    config.rosterSpells[key]=value;overrides[key]=value;
  }
}
const revision=execFileSync('git',['rev-parse','--short','HEAD'],{encoding:'utf8'}).trim();
const configHash=createHash('sha256').update(JSON.stringify(config)).digest('hex').slice(0,12);
const simulationHash=createHash('sha256').update(readdirSync('src/game').filter(file=>file.endsWith('.ts')).sort().map(file=>`${file}\n${readFileSync(`src/game/${file}`,'utf8')}`).join('\n')).digest('hex').slice(0,16);
type Row={difficulty:Difficulty;left:CharacterId;right:CharacterId;total:number;leftWins:number;rightWins:number;side0:number;unfinished:number;medianMatchSeconds:number;medianRoundSeconds:number;casts:number[][]};
const battles:({difficulty:Difficulty;seed:number;characters:readonly [CharacterId,CharacterId]} & BattleResult)[]=[];
const rows:Row[]=[];
const median=(values:number[])=>[...values].sort((a,b)=>a-b)[Math.floor(values.length/2)]??0;
for(const difficulty of ['easy','medium','hard'] as Difficulty[]) {
  for(let a=0;a<characterIds.length;a++) for(let b=a;b<characterIds.length;b++) {
    const left=characterIds[a],right=characterIds[b];
    let leftWins=0,rightWins=0,side0=0,unfinished=0;
    const durations:number[]=[],rounds:number[]=[],casts=[new Array<number>(4).fill(0),new Array<number>(4).fill(0)];
    for(let n=0;n<count;n++) for(const pair of (a===b?[[left,right] as const]:[[left,right],[right,left]] as const)) {
      const result=simulateBattle([...pair],difficulty,seed+n);
      battles.push({difficulty,seed:seed+n,characters:pair,...result});
      if(result.timedOut)unfinished++;
      else if(result.winnerSide!==null) {
        if(result.winnerSide===0)side0++;
        if(pair[result.winnerSide]===left)leftWins++;else rightWins++;
        durations.push(result.durationMs/1000);rounds.push(...result.roundDurationsMs.map(value=>value/1000));
      }
      for(const index of [0,1] as const) for(let tier=0;tier<4;tier++) casts[pair[index]===left?0:1][tier]+=result.casts[index][tier];
    }
    const total=count*(a===b?1:2);
    rows.push({difficulty,left,right,total,leftWins,rightWins,side0,unfinished,medianMatchSeconds:median(durations),medianRoundSeconds:median(rounds),casts});
  }
  console.log(`${difficulty}: ${rows.filter(row=>row.difficulty===difficulty).reduce((sum,row)=>sum+row.total,0)} matches; unfinished ${rows.filter(row=>row.difficulty===difficulty).reduce((sum,row)=>sum+row.unfinished,0)}`);
}
const summaries=(['easy','medium','hard'] as Difficulty[]).flatMap(difficulty=>characterIds.map(character=>{
  const pairs=rows.filter(row=>row.difficulty===difficulty&&row.left!==row.right&&(row.left===character||row.right===character));
  const casts=[0,0,0,0];
  for(const battle of battles)if(battle.difficulty===difficulty)for(const side of [0,1] as const)if(battle.characters[side]===character)battle.casts[side].forEach((n,tier)=>{casts[tier]+=n;});
  return {difficulty,character,total:pairs.reduce((n,row)=>n+row.total,0),wins:pairs.reduce((n,row)=>n+(row.left===character?row.leftWins:row.rightWins),0),unfinished:pairs.reduce((n,row)=>n+row.unfinished,0),casts,untestedTiers:casts.flatMap((n,tier)=>n===0?[tier+1]:[])};
}));
const pooled=poolMatchups(rows);
const matrix=matchupMatrix(rows,Object.fromEntries(characterIds.map(id=>[id,characters[id].name])) as Record<CharacterId,string>);
const report={pooled,overrides,simulationHash,summaries,generated:new Date().toISOString(),revision,workingChanges:true,configHash,seeds:count,seed,rows,battles};
mkdirSync('reports',{recursive:true});
writeFileSync(`reports/${reportName}.json`,JSON.stringify(report,null,2)+'\n');
const summaryTable=summaries.map(row=>`| ${row.difficulty} | ${characters[row.character].name} | ${row.wins}/${row.total} (${(row.wins/row.total*100).toFixed(1)}%) | ${row.unfinished} | ${row.casts.join('/')} | ${row.untestedTiers.join(', ')||'none'} |`).join('\n');
const table=rows.map(row=>`| ${row.difficulty} | ${characters[row.left].name} / ${characters[row.right].name} | ${row.total} | ${row.left===row.right?`${row.side0} left-side wins`: `${row.leftWins} / ${row.rightWins}`} | ${row.unfinished} | ${row.medianRoundSeconds.toFixed(1)} | ${row.medianMatchSeconds.toFixed(1)} | ${row.casts.map(tiers=>tiers.join('/')).join(' · ')} |`).join('\n');
writeFileSync(`reports/${reportName}.md`,`# Five-character roster diagnostic\n\nGenerated ${report.generated}. Revision ${revision} + working changes; config ${configHash}; simulation ${simulationHash}; base seed ${seed}. Duration overrides: ${JSON.stringify(overrides)}. ${battles.length} best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.\n\n## Main versus matrix\n\n${matrix}\n\n## Per-difficulty diagnostic detail\n\n| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |\n|---|---|---:|---|---:|---:|---:|---|\n${table}\n\n## Aggregate and coverage\n\nMirrors excluded from win rates; all battles included in tier coverage.\n\n| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |\n|---|---|---:|---:|---|---|\n${summaryTable}\n\nProvisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. The same bot priorities currently serve all heroes, with resource/ward/cleanse awareness and repeated armor strikes; Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.\n\nReproduce: \`pnpm balance:roster --seeds=${count} --seed=${seed}${reportName==='balance-roster'?'':` --report=${reportName}`}${overrides.armorMs===undefined?'':` --armor-ms=${overrides.armorMs}`}${overrides.cleanSweepMs===undefined?'':` --sweep-ms=${overrides.cleanSweepMs}`}\`.\n`);
