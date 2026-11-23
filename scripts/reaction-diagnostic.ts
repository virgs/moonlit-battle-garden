import { mkdirSync,readFileSync,readdirSync,writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { config,characters } from '../src/game/config';
import { characterIds,type Difficulty } from '../src/game/types';
import { reactionDiagnostic,reactionCount,type ReactionCohort,type ReactionResult } from '../src/game/reactionDiagnostic';

const seeds=Number(process.argv.find(arg=>arg.startsWith('--seeds='))?.slice(8)??100);
const seed=Number(process.argv.find(arg=>arg.startsWith('--seed='))?.slice(7)??20261119);
if(!Number.isInteger(seeds)||seeds<100||seeds>1000||!Number.isSafeInteger(seed)||!Number.isSafeInteger(seed+seeds-1))throw Error('Use 100..1000 seeds and safe seed integers');
const rows:ReactionResult[]=[];
for(const difficulty of ['easy','medium','hard'] as Difficulty[]) {
  for(const character of characterIds)for(let n=0;n<seeds;n++)rows.push(reactionDiagnostic(character,difficulty,seed+n));
  console.log(`${difficulty}: ${seeds*characterIds.length} spell-free ramp-and-steady sessions completed`);
}
// Hero identities must have no effect without magic. Repeats are controls, not independent evidence.
for(const difficulty of ['easy','medium','hard'] as Difficulty[])for(let n=0;n<seeds;n++) {
  const samples=rows.filter(row=>row.difficulty===difficulty&&row.seed===seed+n);
  if(new Set(samples.map(row=>JSON.stringify(row.cohorts))).size!==1)throw Error('Hero-dependent reaction behavior found');
}
const summaries=(['easy','medium','hard'] as Difficulty[]).flatMap(difficulty=>['ramp','steady'].flatMap(stage=>['build','peak','recovery'].map(phase=>{
  const kinds:ReactionCohort['kinds']={mole:reactionCount(),star:reactionCount(),rabbit:reactionCount()};
  for(const result of rows.filter(row=>row.character===characterIds[0]&&row.difficulty===difficulty)) {
    const cohort=result.cohorts.find(c=>c.stage===stage&&c.phase===phase);if(!cohort)continue;
    for(const kind of ['mole','star','rabbit'] as const) {
      const from=cohort.kinds[kind],to=kinds[kind];
      for(const key of ['offered','hit','expired','hitAgeMs'] as const)to[key]+=from[key];
      if(from.minLifetimeMs!==null)to.minLifetimeMs=to.minLifetimeMs===null?from.minLifetimeMs:Math.min(to.minLifetimeMs,from.minLifetimeMs);
      if(from.maxLifetimeMs!==null)to.maxLifetimeMs=to.maxLifetimeMs===null?from.maxLifetimeMs:Math.max(to.maxLifetimeMs,from.maxLifetimeMs);
    }
  }
  return {difficulty,stage,phase,kinds};
})));
const revision=execFileSync('git',['rev-parse','--short','HEAD'],{encoding:'utf8'}).trim();
const simulationHash=createHash('sha256').update(readdirSync('src/game').filter(file=>file.endsWith('.ts')).sort().map(file=>`${file}\n${readFileSync(`src/game/${file}`,'utf8')}`).join('\n')).digest('hex').slice(0,16);
const report={generated:new Date().toISOString(),revision,workingChanges:true,simulationHash,configHash:createHash('sha256').update(JSON.stringify(config)).digest('hex').slice(0,12),seeds,seed,activeMs:rows[0].activeMs,ai:config.ai,characterNames:Object.fromEntries(characterIds.map(id=>[id,characters[id].name])),rows,summaries};
const rate=(count:ReturnType<typeof reactionCount>)=>count.offered?`${(count.hit/count.offered*100).toFixed(1)}% (${count.hit}/${count.offered})`:'—';
const table=(stage:string)=>`| AI | Wave phase | Moles hit | Stars collected | Rabbits hit (mistakes) |\n|---|---|---:|---:|---:|\n`+summaries.filter(row=>row.stage===stage).map(row=>`| ${row.difficulty} | ${row.phase} | ${rate(row.kinds.mole)} | ${rate(row.kinds.star)} | ${rate(row.kinds.rabbit)} |`).join('\n');
mkdirSync('reports',{recursive:true});
writeFileSync('reports/reaction-pacing.json',JSON.stringify(report)+'\n');
writeFileSync('reports/reaction-pacing.md',`# Spell-free reaction diagnostic\n\nGenerated ${report.generated}; revision ${revision} + working changes; config ${report.configHash}; simulation ${simulationHash}.\n\n## Method\n\n${rows.length} fixed-duration sessions: ${seeds} per hero/difficulty, all five heroes, both boards using the same AI difficulty. Each runs ${rows[0].activeMs/1000} active seconds without spells or score-difference victory, then drains remaining targets. Actual simulation, spawn rules, scoring/score-pressure and bot hit behavior are used; AI settings are unchanged. Fixed length ensures late waves are sampled rather than ending/resetting before the ramp completes. Normal match victory rules are unchanged.\n\nEvery hero produces exactly the same cohort outcomes for the same seed/difficulty, verified across all sessions. Primary tables use one hero only (${seeds} distinct seeds, two boards each per difficulty); other heroes are duplicate controls, not five times the independent evidence. These are reaction measurements, not a versus balance tournament: there are no winners or meaningful hero win matrices with powers disabled.\n\nCohorts follow **target birth phase**, and ramp = before ${config.pacing.rampMs/1000} seconds / steady = from ${config.pacing.rampMs/1000} seconds onward. Denominator = actual targets appearing, not requested spawn offers or only attempted hits. Each cohort resolves fully; expired stars/rabbits count in its denominator, and no pending target is silently classified as missed. Rabbit-hit percentage is mistakes, so lower is better; zero at short lifetimes can mean inability to react rather than perfect recognition. Successful hit-age sums and actual lifetime ranges are in JSON. Spawn randomness, occupancy and score catch-up remain active. Casting is blocked in both Match and Bot; zero casts verified in every run.\n\n## Late waves (after the ramp)\n\n${table('steady')}\n\n## Ramp-up (first ${config.pacing.rampMs/1000} active seconds)\n\n${table('ramp')}\n\n## Interpretation\n\nThese rates combine reaction jitter, hit-action spacing, hit accuracy, hesitations and target prioritization. They do not measure a pure reaction-time probability alone. Stars get priority in the unchanged bot. No AI, casting or spell tuning in this pass; lower levels being unable to hit the fastest peaks is allowed. Compare full-kit versus matrices separately; this reaction diagnostic cannot establish spell balance. Human playtesting remains necessary.\n\nReproduce: \`pnpm diagnostic:reaction --seeds=${seeds} --seed=${seed}\`.\n`);
console.log('Verified hero equivalence, resolved cohorts and zero casts; saved reports/reaction-pacing.md');
