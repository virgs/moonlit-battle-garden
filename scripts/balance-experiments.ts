import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { config } from '../src/game/config';
import { simulateBattle, type BattleResult } from '../src/game/simulate';
import type { CharacterId, Difficulty } from '../src/game/types';

const count=Number(process.argv.find(arg=>arg.startsWith('--seeds='))?.split('=')[1]??100);
const seed=Number(process.argv.find(arg=>arg.startsWith('--seed='))?.split('=')[1]??20261117);
const reportName=process.argv.find(arg=>arg.startsWith('--report='))?.split('=')[1]??'balance-duration-experiments';
if(!Number.isInteger(count)||count<1||count>10000||!Number.isSafeInteger(seed)||!Number.isSafeInteger(seed+count-1)||!/^[a-z0-9-]+$/.test(reportName))throw new Error('Invalid seeds/seed/report arguments.');
const spread=process.argv.includes('--spread-seeds');
function spreadSeed(value:number){let x=value>>>0;x=Math.imul(x^(x>>>16),0x21f0aaad);x=Math.imul(x^(x>>>15),0x735a2d97);return (x^(x>>>15))>>>0;}
const baseline=JSON.parse(readFileSync(new URL('../reports/balance-duration-reference.json',import.meta.url),'utf8')) as typeof config;
const pace={rampMs:60000,endIntervalMs:600,endLifetimeMs:1300};
const densePace={...pace,endIntervalMs:360,minIntervalMs:300};
const requested=process.argv.find(arg=>arg.startsWith('--profiles='))?.split('=')[1]?.split(',');
const humanTiming={
  easy:{reactionJitter:0.25,intervalJitter:0.25,hesitationChance:0.08,hesitationMinMs:600,hesitationMaxMs:1100},
  medium:{reactionJitter:0.25,intervalJitter:0.25,hesitationChance:0.06,hesitationMinMs:500,hesitationMaxMs:900},
  hard:{reactionJitter:0.30,intervalJitter:0.25,hesitationChance:0.04,hesitationMinMs:400,hesitationMaxMs:850},
};
const profiles=[
  {name:'baseline',accuracy:0.97,pacing:{}},
  {name:'hard-95',accuracy:0.95,pacing:{}},
  {name:'hard-94',accuracy:0.94,pacing:{}},
  {name:'faster-ramp',accuracy:0.97,pacing:pace},
  {name:'hard-94-faster-ramp',accuracy:0.94,pacing:pace},
  {name:'dense-97',accuracy:0.97,pacing:densePace},
  {name:'dense-95',accuracy:0.95,pacing:densePace},
  {name:'dense-94',accuracy:0.94,pacing:densePace},
  {name:'catchup-05',accuracy:0.97,pacing:{scoreIntervalReduction:0.05,scoreLifetimeReduction:0.05}},
  {name:'hard94-catchup-05',accuracy:0.94,pacing:{scoreIntervalReduction:0.05,scoreLifetimeReduction:0.05}},
  {name:'hard94-faster-catchup-05',accuracy:0.94,pacing:{...pace,scoreIntervalReduction:0.05,scoreLifetimeReduction:0.05}},
  {name:'hard94-wave-peaks',accuracy:0.94,pacing:{...pace,minIntervalMs:300,intervalPeak:0.4}},
  {name:'random-timing',accuracy:0.97,pacing:{},timing:humanTiming},
  {name:'random-timing-faster',accuracy:0.97,pacing:pace,timing:humanTiming},
  {name:'random-timing-94-faster',accuracy:0.94,pacing:pace,timing:humanTiming},
  {name:'random-timing-wave',accuracy:0.94,pacing:{...pace,minIntervalMs:300,intervalPeak:0.4},timing:humanTiming},
  {name:'random-wave-errors',accuracy:0.92,accuracies:{easy:0.70,medium:0.87},pacing:{...pace,minIntervalMs:300,intervalPeak:0.4},timing:humanTiming},
  {name:'random-wave-errors-feedback',accuracy:0.92,accuracies:{easy:0.70,medium:0.87},pacing:{...pace,minIntervalMs:300,intervalPeak:0.4,scoreIntervalReduction:0.05,scoreLifetimeReduction:0.05},timing:humanTiming},
].filter(profile=>!requested||requested.includes(profile.name));
if(!profiles.length||requested?.some(name=>!profiles.some(profile=>profile.name===name)))throw new Error('Unknown --profiles entry.');
const matchups:[CharacterId,CharacterId][]=[['andy','andy'],['champignon','champignon'],['champignon','andy'],['andy','champignon']];
const quantile=(values:number[],p:number)=>values.length?[...values].sort((a,b)=>a-b)[Math.min(values.length-1,Math.floor(values.length*p))]/1000:null;
const summaries=[];const battles=[];const cache=new Map<string,BattleResult>();let actualMatches=0;
for(const profile of profiles){
  Object.assign(config.pacing,baseline.pacing,profile.pacing);
  for(const difficulty of ['easy','medium','hard'] as const){
    for(const key of ['reactionJitter','intervalJitter','hesitationChance','hesitationMinMs','hesitationMaxMs'] as const)delete config.ai[difficulty][key];
    Object.assign(config.ai[difficulty],baseline.ai[difficulty],'timing' in profile?profile.timing?.[difficulty]:{});
  }
  if('accuracies' in profile&&profile.accuracies)for(const [key,value] of Object.entries(profile.accuracies))config.ai[key as Difficulty].accuracy=value;
  config.ai.hard.accuracy=profile.accuracy;
  const configHash=createHash('sha256').update(JSON.stringify(config)).digest('hex').slice(0,12);
  for(const difficulty of ['easy','medium','hard'] as Difficulty[]){
    for(const mode of ['andy-mirror','champignon-mirror','mixed'] as const){
      const selected=mode==='mixed'?matchups.slice(2):[matchups[mode==='andy-mirror'?0:1]];
      const results:BattleResult[]=[];let champWins=0;const wins=[0,0],casts=[[0,0,0,0],[0,0,0,0]];
      for(const characters of selected)for(let n=0;n<count;n++){
        const matchSeed=spread?spreadSeed(seed+n):seed+n;
        const key=JSON.stringify([config.pacing,config.ai[difficulty],difficulty,characters,matchSeed]);
        let result=cache.get(key);
        if(!result){result=simulateBattle(characters,difficulty,matchSeed);cache.set(key,result);actualMatches++;}
        results.push(result);battles.push({profile:profile.name,difficulty,characters,seed:matchSeed,...result});
        if(!result.timedOut&&result.winnerSide!==null){wins[result.winnerSide]++;if(result.winner==='champignon')champWins++;}
        for(const side of [0,1] as const)result.casts[side].forEach((value,tier)=>{casts[side][tier]+=value;});
      }
      const decided=wins[0]+wins[1],rounds=results.flatMap(result=>result.roundDurationsMs);
      const row={profile:profile.name,configHash,difficulty,mode,total:results.length,wins,timedOut:results.filter(result=>result.timedOut).length,decided,champWinRate:mode==='mixed'&&decided?champWins/decided:null,leftWinRate:decided?wins[0]/decided:null,medianMatchSeconds:quantile(results.map(result=>result.durationMs),0.5),p95MatchSeconds:quantile(results.map(result=>result.durationMs),0.95),medianRoundSeconds:quantile(rounds,0.5),p95RoundSeconds:quantile(rounds,0.95),completedRounds:rounds.length,roundsWithin90Seconds:rounds.length?rounds.filter(time=>time<=90000).length/rounds.length:null,casts};
      summaries.push(row);
      console.log(`${profile.name.padEnd(21)} ${difficulty.padEnd(6)} ${mode.padEnd(18)} | match ${row.medianMatchSeconds?.toFixed(0)}/${row.p95MatchSeconds?.toFixed(0)}s med/p95 | round ${row.medianRoundSeconds?.toFixed(0)}/${row.p95RoundSeconds?.toFixed(0)}s | cap ${row.timedOut}/${row.total} | ${mode==='mixed'?'Champ':'left'} ${(((mode==='mixed'?row.champWinRate:row.leftWinRate)??0)*100).toFixed(1)}%`);
    }
  }
}
Object.assign(config.pacing,baseline.pacing);
for(const difficulty of ['easy','medium','hard'] as const){
  for(const key of ['reactionJitter','intervalJitter','hesitationChance','hesitationMinMs','hesitationMaxMs'] as const)delete config.ai[difficulty][key];
  Object.assign(config.ai[difficulty],baseline.ai[difficulty]);
}
const revision=execFileSync('git',['rev-parse','--short','HEAD'],{encoding:'utf8'}).trim();
mkdirSync('reports',{recursive:true});
writeFileSync(`reports/${reportName}.json`,JSON.stringify({generatedAt:new Date().toISOString(),revision,workingChanges:true,seed,seedSchedule:spread?'mixed 32-bit held-out seeds':'consecutive',count,actualMatches,profiles,baseline,summaries,battles})+'\n');
writeFileSync(`reports/${reportName}.md`,`# AI accuracy and pacing experiment\n\nRevision ${revision} + working changes. Seed source ${seed}–${seed+count-1}; schedule: ${spread?'mixed 32-bit seeds':'consecutive seeds'}. ${count} seeds/group; mixed groups swap character sides. ${actualMatches} actual simulations; identical effective configurations reuse outcomes instead of running duplicates. No production configuration changed by this experiment.\n\nBaseline is 97% Hard accuracy / 120 s ramp / 780 ms endpoint interval / 1500 ms endpoint lifetime. Accuracy-only variants use 95% or 94%. Faster-ramp variant uses a 60 s ramp, 600 ms endpoint interval and 1300 ms endpoint lifetime. Dense variants use the same 60 s ramp with a 360 ms endpoint interval and 300 ms interval floor. Start values, 25 s waves/recovery, 1150 ms lifetime floor, concurrency, scoring and spells remain fixed. Combined variants change both accuracy and pacing. Profile definitions: ${JSON.stringify(profiles)}.\n\nDurations include countdowns and shared cast freezes; result-screen input holds are excluded. Round metrics include **completed** rounds only, so caps must be considered alongside them. The cap is still 30 minutes for a whole simulated best-of-three match, not an in-game timer.\n\n| Variant | AI | Matchup | Match median / p95 s | Round median / p95 s | Capped | Champ or left win % of decided |\n| --- | --- | --- | ---: | ---: | ---: | ---: |\n${summaries.map(row=>`| ${row.profile} | ${row.difficulty} | ${row.mode} | ${row.medianMatchSeconds?.toFixed(1)} / ${row.p95MatchSeconds?.toFixed(1)} | ${row.medianRoundSeconds?.toFixed(1)} / ${row.p95RoundSeconds?.toFixed(1)} | ${row.timedOut}/${row.total} | ${(((row.mode==='mixed'?row.champWinRate:row.leftWinRate)??0)*100).toFixed(1)} |`).join('\n')}\n\nPilot sample sizes are descriptive, not a declaration of balanced human play. Full records include per-round durations and tier cast coverage. Reproduce: \`pnpm exec vite-node scripts/balance-experiments.ts --seeds=${count} --seed=${seed} --report=${reportName}${requested?` --profiles=${requested.join(',')}`:''}${spread?' --spread-seeds':''}\`.\n`);
