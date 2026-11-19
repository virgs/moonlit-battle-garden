import { mkdirSync, writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { config, characters } from '../src/game/config';
import { characterIds, type CharacterId, type Difficulty, type SpellTier, type IsolatedCastingPolicy } from '../src/game/types';
import { simulateBattle, type BattleResult } from '../src/game/simulate';
import { poolMatchups,matchupMatrix } from './roster-matrix';
import { playerStatistics, type PlayerStatistics } from '../src/game/statistics';
import { isolatedCasting,castingProfiles,useCastingProfile,defaultCastingProfile } from '../src/game/IsolatedCasting';

const count=Number(process.argv.find(arg=>arg.startsWith('--seeds='))?.split('=')[1]??100);
const seed=Number(process.argv.find(arg=>arg.startsWith('--seed='))?.split('=')[1]??20261118);
if(!Number.isInteger(count)||count<100||count>1000||!Number.isSafeInteger(seed)||!Number.isSafeInteger(seed+count-1))throw Error('Use --seeds=100..1000 and a safe --seed.');
const tierArgument=process.argv.find(arg=>arg.startsWith('--tier='));
const tierNumber=tierArgument===undefined?undefined:Number(tierArgument.slice(7));
if(tierNumber!==undefined&&![1,2,3,4].includes(tierNumber))throw Error('Use --tier=1..4.');
const isolatedSpellTier=tierNumber as SpellTier | undefined;
const policyArgument=process.argv.find(arg=>arg.startsWith('--casting='))?.slice(10);
if(policyArgument!==undefined&&!['immediate','opportunity'].includes(policyArgument))throw Error('Use --casting=immediate|opportunity.');
if(policyArgument&&!isolatedSpellTier)throw Error('--casting requires --tier.');
const castingPolicy=isolatedSpellTier?(policyArgument??(isolatedSpellTier===1?'opportunity':'immediate')) as IsolatedCastingPolicy:'normal';
if(castingPolicy==='opportunity'&&isolatedSpellTier!==1)throw Error('Opportunity casting is implemented for tier 1 only.');
const castProfile=process.argv.find(arg=>arg.startsWith('--cast-profile='))?.slice(15)??(castingPolicy==='opportunity'?defaultCastingProfile:'baseline');
if(!Object.hasOwn(castingProfiles,castProfile))throw Error('Use --cast-profile=baseline|fast|scaled.');
if(castProfile!=='baseline'&&castingPolicy!=='opportunity')throw Error('Casting trial profiles require --tier=1 --casting=opportunity.');
useCastingProfile(castProfile as keyof typeof castingProfiles);
const reportName=process.argv.find(arg=>arg.startsWith('--report='))?.split('=')[1]??(isolatedSpellTier?`balance-tier-${isolatedSpellTier}${isolatedSpellTier===1&&castingPolicy==='immediate'?'-immediate':''}`:'balance-roster');
if(!/^[a-z0-9-]+$/.test(reportName))throw Error('Use a simple --report=name.');
const overrides: Record<string,number> = {};
for (const [flag,key] of [['--armor-ms=','armorMs'],['--sweep-ms=','cleanSweepMs'],['--ominous-ms=','ominousMarkMs']] as const) {
  const raw=process.argv.find(arg=>arg.startsWith(flag));
  if(raw) {
    const value=Number(raw.slice(flag.length));
    if(!Number.isInteger(value)||value<3000||value>30000||value%config.tickMs!==0)throw Error(`${flag} must be a tick multiple between 3000 and 30000ms.`);
    config.rosterSpells[key]=value;overrides[key]=value;
  }
}
if(process.argv.some(arg=>arg.startsWith('--sweep-interval-ms=')))throw Error('Historical Sweep-cadence flag removed: Clean Sweep now strikes on every simulation tick and spawn. Use an older Git revision to reproduce cadence trials.');
const extension=process.argv.find(arg=>arg.startsWith('--extension-ms='));
if(extension) {
  const value=Number(extension.slice('--extension-ms='.length));
  if(!Number.isInteger(value)||value<250||value>5000||value%config.tickMs!==0)throw Error('--extension-ms must be 250..5000 on the tick grid.');
  config.rosterSpells.extensionMs=value;overrides.extensionMs=value;
}
const markPenalty=process.argv.find(arg=>arg.startsWith('--mark-bonus='));
if(markPenalty) {
  const value=Number(markPenalty.slice('--mark-bonus='.length));
  if(!Number.isInteger(value)||value<0||value>50)throw Error('--mark-bonus must be an integer between 0 and 50.');
  config.rosterSpells.markBonus=value;overrides.markBonus=value;
}
const tendingWindow=process.argv.find(arg=>arg.startsWith('--tending-ms='));
if(tendingWindow) {
  const value=Number(tendingWindow.slice('--tending-ms='.length));
  if(!Number.isInteger(value)||value%config.tickMs!==0||value<0||value>30000||(value>0&&value<3000))throw Error('--tending-ms must be 0 (historical instant control) or 3000..30000ms on the tick grid.');
  config.rosterSpells.tendingMs=value;overrides.tendingMs=value;
}
for (const [flag,key] of [['--ominous-marks=','ominousMarks'],['--armor-targets=','armorTargets'],['--heavy-armor-targets=','heavyArmorTargets']] as const) {
  const raw=process.argv.find(arg=>arg.startsWith(flag));
  if(raw) {
    const value=Number(raw.slice(flag.length));
    if(!Number.isInteger(value)||value<1||value>99)throw Error(`${flag} must be 1..99.`);
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
      const result=simulateBattle([...pair],difficulty,seed+n,isolatedSpellTier,castingPolicy==='normal'?undefined:castingPolicy);
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
const names=Object.fromEntries(characterIds.map(id=>[id,characters[id].name])) as Record<CharacterId,string>;
const matrix=matchupMatrix(rows,names)+'\n\n'+['easy','medium','hard'].map(level=>`### ${level[0].toUpperCase()+level.slice(1)}\n\n${matchupMatrix(rows.filter(row=>row.difficulty===level),names,level)}`).join('\n\n');
const diagnosticMetrics=(['easy','medium','hard'] as Difficulty[]).flatMap(difficulty=>characterIds.map(character=>{
  const totals=playerStatistics();let appearances=0,castCount=0;
  const decisions={scheduled:0,cancelled:0,executed:0,pending:0,delaySumMs:0,rampScheduled:0,steadyScheduled:0,rampExecuted:0,steadyExecuted:0};
  for(const battle of battles)if(battle.difficulty===difficulty&&battle.characters[0]!==battle.characters[1])for(const side of [0,1] as const)if(battle.characters[side]===character) {
    const stats=battle.castingStatistics?.[side];
    if(stats)for(const key of Object.keys(decisions) as (keyof typeof decisions)[])decisions[key]+=stats[key];
    appearances++;castCount+=battle.casts[side].reduce((a,b)=>a+b,0);
    for(const key of Object.keys(totals) as (keyof PlayerStatistics)[])totals[key]+=battle.statistics[side][key];
  }
  return {difficulty,character,appearances,castCount,totals,decisions};
}));
const diagnosticTable=diagnosticMetrics.map(row=>{
  const avg=(n:number)=>(n/row.appearances).toFixed(2);
  return `| ${row.difficulty} | ${characters[row.character].name} | ${avg(row.castCount)} | ${avg(row.totals.pointsEarned)} / ${avg(row.totals.pointsLost)} | ${avg(row.totals.guardPointsPrevented)} | ${avg(row.totals.starsStolen)} / ${avg(row.totals.stolenStarsReceived)} | ${avg(row.totals.emptyThefts)} |`;
}).join('\n');
const decisionTable=diagnosticMetrics.map(row=>{
  const s=row.decisions;
  return `| ${row.difficulty} | ${characters[row.character].name} | ${(s.scheduled/row.appearances).toFixed(2)} | ${s.scheduled?(100*s.cancelled/s.scheduled).toFixed(1)+'%':'—'} | ${s.executed} / ${s.pending} | ${s.scheduled?(s.delaySumMs/s.scheduled).toFixed(0):'—'} | ${s.steadyScheduled} / ${s.steadyExecuted} |`;
}).join('\n');
const difficultyFlags=pooled.filter(pair=>pair.left!==pair.right&&(pair.counterFlip||pair.spread>20)).map(pair=>`- ${names[pair.left]} vs ${names[pair.right]}: ${pair.levels.map(level=>`${level.difficulty} ${level.winRate?.toFixed(1)}%`).join(', ')}; spread ${pair.spread.toFixed(1)} points${pair.counterFlip?'; observed favored-side flip':''}.`).join('\n')||'No observed flips or spreads above 20 points.';
const modeNote=isolatedSpellTier?`Isolated tier ${isolatedSpellTier}: ${isolatedSpellTier}-slot charge cap; only tier ${isolatedSpellTier} can cast. ${castingPolicy==='opportunity'?`Every bot waits for a useful visible opportunity, then a ${isolatedCasting.minDelayMs}–${isolatedCasting.maxDelayMs}ms base random delay, multiplied by ${JSON.stringify(isolatedCasting.delayMultipliers)} for difficulty (profile ${castProfile}), rechecking before casting. Vanished opportunities cancel/restart the wait. Conditions: Sweep useful/urgent selected column, theft enemy charge, armor unarmored enemy mole, mark unmarked enemy mole, tending unextended own mole near escape. No refresh of an active Sweep. On-board target visibility ${isolatedCasting.visibleMs}ms (theft watches enemy charge directly); urgent means at most ${isolatedCasting.urgentMs}ms remaining.`:'Every bot casts on the first free tick when full/cooldown-ready, irrespective of usefulness.'} Hit behavior still follows difficulty. Spell powers unchanged.`:'Normal four-slot meter and character-aware casting strategy.';
const report={isolatedSpellTier,castingPolicy,castProfile,castingSettings:castingPolicy==='opportunity'?isolatedCasting:undefined,diagnosticMetrics,pooled,overrides,simulationHash,summaries,generated:new Date().toISOString(),revision,workingChanges:true,configHash,seeds:count,seed,rows,battles};
mkdirSync('reports',{recursive:true});
writeFileSync(`reports/${reportName}.json`,JSON.stringify(report,null,2)+'\n');
const summaryTable=summaries.map(row=>`| ${row.difficulty} | ${characters[row.character].name} | ${row.wins}/${row.total} (${(row.wins/row.total*100).toFixed(1)}%) | ${row.unfinished} | ${row.casts.join('/')} | ${row.untestedTiers.join(', ')||'none'} |`).join('\n');
const table=rows.map(row=>`| ${row.difficulty} | ${characters[row.left].name} / ${characters[row.right].name} | ${row.total} | ${row.left===row.right?`${row.side0} left-side wins`: `${row.leftWins} / ${row.rightWins}`} | ${row.unfinished} | ${row.medianRoundSeconds.toFixed(1)} | ${row.medianMatchSeconds.toFixed(1)} | ${row.casts.map(tiers=>tiers.join('/')).join(' · ')} |`).join('\n');
writeFileSync(`reports/${reportName}.md`,`# Five-character roster diagnostic\n\n${modeNote}\n\nGenerated ${report.generated}. Revision ${revision} + working changes; config ${configHash}; simulation ${simulationHash}; base seed ${seed}. Tuning overrides: ${JSON.stringify(overrides)}. ${battles.length} best-of-three matches using the actual simulation and bots. Each distinct pairing swaps sides for each seed; mirrors run once.\n\n## Pooled versus overview and per-level matrices\n\n${matrix}\n\n## Difficulty flags\n\n${difficultyFlags}\n\nFlips are descriptive changes across AI levels, not significance claims.\n\n## Per-difficulty diagnostic detail\n\n| AI | Pair | Matches | Wins | Unfinished | Median round s | Median match s | Tier 1/2/3/4 casts |\n|---|---|---:|---|---:|---:|---:|---|\n${table}\n\n## Aggregate and coverage\n\nMirrors excluded from win rates; all battles included in tier coverage.\n\n| AI | Hero | Distinct-pair wins | Unfinished | Tier 1/2/3/4 casts | Unused tiers |\n|---|---|---:|---:|---|---|\n${summaryTable}\n\n## Observed impact per match\n\nDistinct-character games only; totals divided by character appearances. Earned/lost include all play, not just spells. Guard prevention is exact; no counterfactual estimate of points prevented by offensive spells. Stolen/received distinguishes overflow. Metrics include capped games, if any.\n\n| AI | Hero | Casts | Points earned / lost | Guard points prevented | Stars stolen / received | Empty theft casts |\n|---|---|---:|---:|---:|---:|---:|\n${diagnosticTable}\n\n## Casting decisions\n\nDistinct-character games only. Scheduled = valid opportunity with full charge/cooldown ready; cancellation = opportunity lost/replaced, charge lost or round reset; executed = valid at cast start, not guaranteed useful after hostile warning. Pending terminal decisions remain separate. Delay is sampled decision time, excluding target visibility. Late = round age at least 60 s; short rounds can limit exposure.\n\n| AI | Hero | Scheduled/match | Cancelled/scheduled | Executed / pending | Mean sampled delay ms | Late scheduled / executed |\n|---|---|---:|---:|---:|---:|---:|\n${decisionTable}\n\nProvisional kits, not a human-balance claim. Mirror rows report player-side wins; casts for mirrors are combined in the first column. Medians exclude capped matches; unfinished games are never awarded invented winners. Inspect tier coverage and strategy bias before tuning. ${isolatedSpellTier?'Casting follows the recorded shared policy/settings; opportunity conditions are spell-specific but base delay is shared across heroes, with recorded per-difficulty multipliers; hit priorities and repeated armor strikes remain difficulty-dependent. Tier-restricted meters change resource spells and exclude cross-tier counters/combos; this is not normal-mode balance.':'The same bot priorities currently serve all heroes, with resource/ward/cleanse awareness and repeated armor strikes;'} Easy timing can make multi-hit armor particularly punishing. Human playtests remain necessary. Prior two-character findings remain historical and are not overwritten.\n\nReproduce: \`pnpm balance:roster --seeds=${count} --seed=${seed}${isolatedSpellTier?` --tier=${isolatedSpellTier} --casting=${castingPolicy} --cast-profile=${castProfile}`:''}${reportName==='balance-roster'?'':` --report=${reportName}`}${overrides.markBonus===undefined?'':` --mark-bonus=${overrides.markBonus}`}${overrides.ominousMarks===undefined?'':` --ominous-marks=${overrides.ominousMarks}`}${overrides.tendingMs===undefined?'':` --tending-ms=${overrides.tendingMs}`}${overrides.ominousMarkMs===undefined?'':` --ominous-ms=${overrides.ominousMarkMs}`}${overrides.extensionMs===undefined?'':` --extension-ms=${overrides.extensionMs}`}${overrides.armorMs===undefined?'':` --armor-ms=${overrides.armorMs}`}${overrides.cleanSweepMs===undefined?'':` --sweep-ms=${overrides.cleanSweepMs}`}${overrides.armorTargets===undefined?'':` --armor-targets=${overrides.armorTargets}`}${overrides.heavyArmorTargets===undefined?'':` --heavy-armor-targets=${overrides.heavyArmorTargets}`}\`.\n`);
