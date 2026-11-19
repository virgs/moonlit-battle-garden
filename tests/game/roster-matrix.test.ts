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

it('can report a single AI difficulty without pooling or spread flags',()=>{
  const rows:PairResult[]=[{difficulty:'medium',left:'champignon',right:'andromoss',total:200,leftWins:120,rightWins:80,side0:100,unfinished:0}];
  const text=matchupMatrix(rows,{champignon:'Champignon',andromoss:'Andromoss','captain-bramble':'Bramble',duskmantle:'Duskmantle',sprig:'Sprig'},'medium');
  expect(text).toContain('Medium AI only');expect(text).toContain('🟨60.0%');expect(text).not.toContain('pooled');expect(text).not.toContain('asterisk');
});

it('flags a favored-side flip even when the difficulty spread is small',()=>{
  const rows:PairResult[]=[
    {difficulty:'easy',left:'champignon',right:'andromoss',total:200,leftWins:110,rightWins:90,side0:100,unfinished:0},
    {difficulty:'hard',left:'champignon',right:'andromoss',total:200,leftWins:90,rightWins:110,side0:100,unfinished:0},
  ];
  expect(poolMatchups(rows).find(p=>p.left==='champignon'&&p.right==='andromoss')?.counterFlip).toBe(true);
  const text=matchupMatrix(rows,{champignon:'Champignon',andromoss:'Andromoss','captain-bramble':'Bramble',duskmantle:'Duskmantle',sprig:'Sprig'});
  expect(text).toContain('🟨50.0%*');expect(text).toContain('favored-side flip');
});
