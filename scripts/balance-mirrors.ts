import { mkdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { config } from '../src/game/config';
import { simulateBattle } from '../src/game/simulate';
import type { CharacterId, Difficulty } from '../src/game/types';

const count=Number(process.argv.find(arg=>arg.startsWith('--seeds='))?.split('=')[1]??1000);
const baseSeed=Number(process.argv.find(arg=>arg.startsWith('--seed='))?.split('=')[1]??20261117);
const name=process.argv.find(arg=>arg.startsWith('--report='))?.split('=')[1]??'balance-mirrors';
if(!Number.isInteger(count)||count<1||count>10000||!Number.isSafeInteger(baseSeed)||!Number.isSafeInteger(baseSeed+count-1))throw new Error('Use --seeds=1..10000 and a safe integer --seed.');
if(!/^[a-z0-9-]+$/.test(name))throw new Error('Use a simple --report=name.');
const revision=execFileSync('git',['rev-parse','--short','HEAD'],{encoding:'utf8'}).trim();
const dirty=Boolean(execFileSync('git',['status','--porcelain'],{encoding:'utf8'}).trim());
const configHash=createHash('sha256').update(JSON.stringify(config)).digest('hex').slice(0,12);
const generatedAt=new Date().toISOString();
const percent=(value:number)=>`${(value*100).toFixed(1)}%`;
function interval(wins:number,total:number){
  if(!total)return null;
  const z=1.959963984540054,p=wins/total,denominator=1+z*z/total;
  const center=(p+z*z/(2*total))/denominator;
  const half=z*Math.sqrt(p*(1-p)/total+z*z/(4*total*total))/denominator;
  return [center-half,center+half];
}
const quantile=(values:number[],fraction:number)=>[...values].sort((a,b)=>a-b)[Math.min(values.length-1,Math.floor(values.length*fraction))]/1000;
const summaries=[];
const battles=[];
for(const character of ['andromoss','champignon'] as CharacterId[])for(const difficulty of ['easy','medium','hard'] as Difficulty[]){
  const wins:[number,number]=[0,0],casts:[number[],number[]]=[[0,0,0,0],[0,0,0,0]];
  let timedOut=0,noWinner=0;
  const durations:number[]=[];
  for(let n=0;n<count;n++){
    const seed=baseSeed+n;
    const result=simulateBattle([character,character],difficulty,seed);
    if(result.timedOut){timedOut++;if(result.winnerSide!==null||result.winner!==null)throw new Error('Capped match reported a winner.');}
    else if(result.winnerSide===null)noWinner++;
    else {if(result.winner!==character)throw new Error('Mirror result reported the wrong character.');wins[result.winnerSide]++;}
    for(const side of [0,1] as const)result.casts[side].forEach((value,tier)=>{casts[side][tier]+=value;});
    durations.push(result.durationMs);
    battles.push({character,difficulty,seed,...result});
  }
  const decided=wins[0]+wins[1],side0WinRate=decided?wins[0]/decided:null;
  const row={character,difficulty,total:count,decided,wins,timedOut,noWinner,side0WinRate,side0Wilson95:interval(wins[0],decided),averageSeconds:durations.reduce((a,b)=>a+b,0)/count/1000,medianSeconds:quantile(durations,0.5),p95Seconds:quantile(durations,0.95),casts};
  summaries.push(row);
  console.log(`${character.padEnd(10)} ${difficulty.padEnd(6)} | left ${wins[0]}, right ${wins[1]} | left ${side0WinRate===null?'n/a':percent(side0WinRate)} of decided | unfinished ${timedOut}/${count} | median ${row.medianSeconds.toFixed(1)}s, p95 ${row.p95Seconds.toFixed(1)}s`);
}
const report={generatedAt,revision,dirty,configHash,baseSeed,seedsPerGroup:count,seedSchedule:'consecutive; once per seed per character/difficulty',rules:'score-difference',winningLead:config.winScoreDifference,capMs:config.maxSimulationMs,summaries,battles};
const markdown=`# AI mirror-match audit\n\nGenerated: ${generatedAt}. Revision: ${revision}${dirty?' + working changes':''}. Config hash: ${configHash}. Base seed: ${baseSeed}.\n\n${count} seeds × two characters × three difficulties = ${count*6} actual best-of-three matches. Same character and AI difficulty on both sides. Uses the production simulateBattle/Match/Bot code, existing side-specific bot RNG seeds, alternating tick command order, score pressure, cast freezes and ${config.maxSimulationMs/60000}-minute diagnostic cap. The runner does not alter spell, bot, pacing or gameplay tuning. Each seed runs **once** per mirror matchup: swapping identical character names would merely duplicate the same deterministic match.\n\n| Character | AI | Left wins | Right wins | Left % of decided | Nominal 95% interval | Unfinished | Median / p95 seconds |\n| --- | --- | ---: | ---: | ---: | --- | ---: | --- |\n${summaries.map(row=>`| ${row.character} | ${row.difficulty} | ${row.wins[0]} | ${row.wins[1]} | ${row.side0WinRate===null?'n/a':percent(row.side0WinRate)} | ${row.side0Wilson95?row.side0Wilson95.map(percent).join('–'):'n/a'} | ${row.timedOut}/${row.total} | ${row.medianSeconds.toFixed(1)} / ${row.p95Seconds.toFixed(1)} |`).join('\n')}\n\n## Spell coverage by side\n\nTier 1 / 2 / 3 / 4 total casts, including capped matches:\n\n${summaries.map(row=>`- ${row.character} ${row.difficulty}: left ${row.casts[0].join(' / ')}; right ${row.casts[1].join(' / ')}.`).join('\n')}\n\n## Interpretation limits\n\nApproximately 50/50 side wins are expected for symmetric rules and equally skilled bots over representative seeds, not exactly 50/50 in a finite batch. Wilson intervals are descriptive reference intervals: these deterministic consecutive-seed experiments are not a guarantee of independent random samples, and six groups are inspected. An isolated interval excluding 50% requires follow-up, not automatic tuning. Unfinished matches are neither draws nor wins and are excluded from decided-win percentages; high cap rates can hide bias and are a separate match-duration problem. Mirror symmetry checks side/harness bias but cannot establish cross-character balance, human fairness, or that both bots have strong spell strategies.\n\nReproduce: \`pnpm balance:mirrors --seeds=${count} --seed=${baseSeed}${name!=='balance-mirrors'?` --report=${name}`:''}\`. Per-match records: ${name}.json.\n`;
mkdirSync('reports',{recursive:true});
writeFileSync(`reports/${name}.json`,JSON.stringify(report,null,2)+'\n');
writeFileSync(`reports/${name}.md`,markdown);
if(summaries.some(row=>row.noWinner))throw new Error('A completed mirror match had no winner.');
