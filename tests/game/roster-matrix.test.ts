import { expect,it } from 'vitest';
import { poolMatchups,matchupMatrix,type PairResult } from '../../scripts/roster-matrix';

it('weights pooled matchups by games and normalizes reversed row orientation',()=>{
  const rows:PairResult[]=[
    {difficulty:'easy',left:'champignon',right:'captain-bramble',total:20,leftWins:5,rightWins:15,side0:10,unfinished:0},
    {difficulty:'hard',left:'captain-bramble',right:'champignon',total:80,leftWins:20,rightWins:60,side0:40,unfinished:0},
  ];
  const pair=poolMatchups(rows).find(p=>p.left==='champignon'&&p.right==='captain-bramble')!;
  expect(pair.leftWins).toBe(65);expect(pair.rightWins).toBe(35);expect(pair.winRate).toBe(65);expect(pair.spread).toBe(50);
  const text=matchupMatrix(rows,{champignon:'Champignon',andromoss:'Andromoss','captain-bramble':'Bramble',duskmantle:'Duskmantle',sprig:'Sprig'});
  expect(text).toContain('🟩65.0%*');expect(text).toContain('🟥35.0%*');
});

it('keeps unfinished results separate and treats mirrors as side results',()=>{
  const rows:PairResult[]=[
    {difficulty:'easy',left:'champignon',right:'andromoss',total:10,leftWins:3,rightWins:5,side0:4,unfinished:2},
    {difficulty:'easy',left:'champignon',right:'champignon',total:20,leftWins:20,rightWins:0,side0:7,unfinished:0},
  ];
  const pairs=poolMatchups(rows),pair=pairs.find(p=>p.left==='champignon'&&p.right==='andromoss')!,mirror=pairs.find(p=>p.left===p.right&&p.left==='champignon')!;
  expect(pair.decided).toBe(8);expect(pair.winRate).toBe(37.5);expect(pair.unfinished).toBe(2);
  expect(mirror.winRate).toBe(35);expect(mirror.leftWins).toBe(7);expect(mirror.rightWins).toBe(13);
});
