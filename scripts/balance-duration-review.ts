import { readFileSync,writeFileSync } from 'node:fs';
import { characters } from '../src/game/config';
import { characterIds,type CharacterId } from '../src/game/types';
import { matchupMatrix,poolMatchups,type PairResult } from './roster-matrix';

type Report={rows:PairResult[];seeds:number;seed:number;simulationHash:string;configHash:string;battles?:unknown[];summaries:{difficulty:string;character:CharacterId;untestedTiers:number[]}[]};
const read=(name:string)=>JSON.parse(readFileSync(`reports/${name}.json`,'utf8')) as Report;
const reference=read('duration-reference'),final=read('power-reference');
const profiles=[
  {name:'duration-armor4',armor:4,sweep:3},
  {name:'duration-sweep1',armor:6,sweep:1},
  {name:'duration-armor4-sweep1',armor:4,sweep:1},
  {name:'duration-armor3-sweep1',armor:3,sweep:1},
  {name:'duration-armor2-sweep1',armor:2,sweep:1},
];
const selected=read('duration-armor2-sweep1');
if(selected.battles && JSON.stringify(selected.battles)!==JSON.stringify(final.battles))throw Error('Adopted settings do not reproduce the selected trial.');
if(selected.configHash!==final.configHash || JSON.stringify(selected.rows)!==JSON.stringify(final.rows))throw Error('Selected trial aggregates/config differ from adopted settings.');
const names=Object.fromEntries(characterIds.map(id=>[id,characters[id].name])) as Record<CharacterId,string>;
function rate(report:Report,left:CharacterId,right:CharacterId) {
  const pair=poolMatchups(report.rows).find(row=>(row.left===left&&row.right===right)||(row.left===right&&row.right===left))!;
  return ((pair.left===left?pair.leftWins:pair.rightWins)/pair.decided*100).toFixed(1)+'%';
}
const lines=[
  '# Historical duration-only balance comparison'
  ,'', 'Superseded by D104/D105 and balance-normal-hits-review.md; these settings are not current defaults.',
  '',
  '## Adopted durations',
  '',
  '- Champignon Clean Sweep and Royal Cleanup clearing window: **3 → 1 active second**. Guards/wards retain their existing durations and charges.',
  '- Bramble Tin Caps / Heavy Harvest armor window: **6 → 2 active seconds**. Extra-hit counts remain one/two; guards retain their 8-second window.',
  '- No spell costs, scoring rules, bot policies or other spell values changed during these trials. No new artwork.',
  '',
  '## Sampling and selection',
  '',
  'All five candidates used the same 100 seeds as the reference: 200 games per distinct matchup and 100 mirrors per hero/level, or 7,500 matches each. All completed without caps. Difficulty contributions are equal. Paired seeds are correlated; these are not independent human trials.',
  '',
  'The selected candidate improves every pooled Champignon matchup and reduces every pooled Bramble matchup advantage relative to the reference. It is the strongest tested duration-only improvement, not a claim that the roster is balanced. The adopted YAML was run again and reproduces the selected trial’s full per-match outcomes exactly.',
  '',
  '| Variant | Armor s | Sweep s | Champignon vs Bramble | Bramble vs Andromoss | Bramble vs Duskmantle | Bramble vs Sprig |',
  '|---|---:|---:|---:|---:|---:|---:|',
];
function tableRow(label:string,armor:number,sweep:number,report:Report) {
  if(report.rows.some(row=>row.unfinished))throw Error('Do not omit caps from the comparison.');
  if(report.seeds!==100||report.seed!==reference.seed)throw Error('Unmatched sample/seed.');
  return `| ${label} | ${armor} | ${sweep} | ${rate(report,'champignon','captain-bramble')} | ${rate(report,'captain-bramble','andromoss')} | ${rate(report,'captain-bramble','duskmantle')} | ${rate(report,'captain-bramble','sprig')} |`;
}
lines.push(tableRow('Reference',6,3,reference));
for(const profile of profiles)lines.push(tableRow(profile.name,profile.armor,profile.sweep,read(profile.name)));
lines.push('','## Main versus matrix after adoption','',matchupMatrix(final.rows,names),'','## Reference versus matrix','',matchupMatrix(reference.rows,names));
lines.push('','## Difficulty differences remain relevant','','Pooling is the overview, not a replacement for per-level checks. For example, adopted Champignon vs Sprig wins are **27.5% Easy, 30.5% Medium, 78.5% Hard**. The pooled 45.5% masks that counter flip; the asterisk exposes the spread. Historical level rows, mirrors and spell coverage remain in `power-reference.json`; full raw outcomes are preserved at Git commit 100af6f.');
lines.push('','## Coverage and next decisions','','Easy Champignon still never uses tiers 3/4 under the current policy. More samples do not repair that coverage gap. The zero-point clearing mechanic and timing-sensitive multi-hit armor remain structural questions; no extra policy/numeric changes were made to chase 50%. Bramble still wins most pairings, so more tuning and human input testing are required.');
lines.push('','## Reproduction','','Check out Git commit 100af6f to reproduce historical sub-three-second settings: `pnpm balance:roster --seeds=100 --seed=20261118 --report=duration-armor2-sweep1 --armor-ms=2000 --sweep-ms=1000`. The current runner rejects those settings per D104. Reference source/config hashes and per-level counts remain in `duration-reference.json`; trial parameters and aggregates stay in the five duration JSON files. Raw outcomes for that historical candidate are preserved in `balance-roster.json` at Git commit 100af6f; the current file uses D105 normal-hit rules.','');
writeFileSync('reports/balance-duration-review.md',lines.join('\n'));
for(const profile of profiles) {
  const file=`reports/${profile.name}.json`;
  const report=JSON.parse(readFileSync(file,'utf8'));
  delete report.battles;
  report.summaryOnly=true;
  report.rawOutcomeNote='Per-pair/per-level/tier aggregates and reproduction parameters retained. Selected raw outcomes are in balance-roster.json at Git commit 100af6f; that historical adopted run was checked identical before discarding duplicate raw logs.';
  writeFileSync(file,JSON.stringify(report,null,2)+'\n');
}
console.log('Saved pooled matrices, per-matchup duration comparisons and compact trial records.');
