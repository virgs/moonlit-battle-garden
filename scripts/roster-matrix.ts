import { characterIds,type CharacterId } from '../src/game/types';

export type PairResult={difficulty:string;left:CharacterId;right:CharacterId;total:number;leftWins:number;rightWins:number;side0:number;unfinished:number};

/** Pool actual win counts, never average percentages from unequal samples. */
export function poolMatchups(rows:readonly PairResult[]) {
  return characterIds.flatMap((left,index)=>characterIds.slice(index).map(right=>{
    const matching=rows.filter(row=>(row.left===left&&row.right===right)||(row.left===right&&row.right===left));
    const levels=matching.map(row=>{
      const decided=row.total-row.unfinished;
      const wins=left===right?row.side0:row.left===left?row.leftWins:row.rightWins;
      const losses=left===right?decided-row.side0:row.left===left?row.rightWins:row.leftWins;
      return {difficulty:row.difficulty,total:row.total,decided,wins,losses,unfinished:row.unfinished,winRate:decided?wins/decided*100:null};
    });
    const sum=(key:'total'|'decided'|'wins'|'losses'|'unfinished')=>levels.reduce((value,level)=>value+level[key],0);
    const rates=levels.flatMap(level=>level.winRate===null?[]:[level.winRate]);
    const decided=sum('decided'),leftWins=sum('wins'),rightWins=sum('losses');
    return {left,right,total:sum('total'),decided,leftWins,rightWins,unfinished:sum('unfinished'),winRate:decided?leftWins/decided*100:null,spread:rates.length?Math.max(...rates)-Math.min(...rates):0,levels};
  }));
}

export function matchupMatrix(rows:readonly PairResult[],names:Record<CharacterId,string>):string {
  const pairs=poolMatchups(rows);
  const lines=[
    'Row hero win rate against column hero; Easy/Medium/Hard pooled by actual completed-match counts.',
    '',
    '🟩 >60% · 🟨 40–60% · 🟥 <40%. An asterisk marks a spread above 20 percentage points across AI levels; per-level results remain below.',
    '',
    '| Against → | '+characterIds.map(id=>names[id]).join(' | ')+' |',
    '|---|'+'---:|'.repeat(characterIds.length),
  ];
  for(const id of characterIds) {
    const cells=characterIds.map(other=>{
      if(other===id)return '—';
      const pair=pairs.find(p=>(p.left===id&&p.right===other)||(p.left===other&&p.right===id))!;
      if(!pair.decided)return '—';
      const rate=(pair.left===id?pair.leftWins:pair.rightWins)/pair.decided*100;
      return (rate>60?'🟩':rate<40?'🟥':'🟨')+rate.toFixed(1)+'%'+(pair.spread>20?'*':'');
    });
    lines.push('| '+names[id]+' | '+cells.join(' | ')+' |');
  }
  lines.push('','Identical-character diagonals are omitted; mirror results measure player-side wins separately. Unfinished games are excluded from percentages and retained in the diagnostic counts.');
  return lines.join('\n');
}
