import { expect,it } from 'vitest';
import { starMeterPresentation as step,type StarMeterState } from '../../src/presentation/starMeter';
it('settles an interrupted pickup, holds spent stars during casting and starts clearing only afterward',()=>{
  const pickup=step({count:0,since:0,casting:false},{count:1,time:5000,casting:false});expect(pickup.frame).toBe(0);
  const casting=step(pickup,{count:0,time:5000,casting:true,spent:1});expect(casting).toMatchObject({count:1,frame:2,casting:true});
  const middle=step(casting,{count:0,time:5000,casting:true,spent:1});expect(middle).toEqual(casting);
  const end=step(middle,{count:0,time:5000,casting:false});expect(end).toMatchObject({count:0,frame:0,casting:false});
  expect(step(end,{count:0,time:5100,casting:false}).frame).toBe(1);expect(step(end,{count:0,time:5200,casting:false}).frame).toBe(2);
});
it('handles star rewards earned by a sweep during casting without confusing them with the cost',()=>{
  const hold=step({count:2,since:0,casting:false},{count:1,time:5000,casting:true,spent:2});expect(hold).toMatchObject({count:2,frame:2});
  expect(step(hold,{count:3,time:5000,casting:true,spent:2}).count).toBe(2);
  expect(step(hold,{count:3,time:5000,casting:false})).toMatchObject({count:3,frame:0});
});
it('defers enemy theft updates while leaving unchanged opponent meters settled',()=>{
  const previous:StarMeterState={count:4,since:1000,casting:false};
  const hold=step(previous,{count:0,time:5000,casting:true});expect(hold.count).toBe(4);expect(hold.frame).toBe(2);
  expect(step(hold,{count:0,time:5000,casting:false}).frame).toBe(0);
  expect(step(hold,{count:4,time:5000,casting:false}).frame).toBe(2);
});
it('uses captured cost even if the UI missed the last pickup snapshot',()=>{
  const hold=step({count:0,since:0,casting:false},{count:0,time:5000,casting:true,spent:4});expect(hold).toMatchObject({count:4,frame:2});
});
it('keeps normal pause semantics and settles terminal scenes/reduced motion without changing charge',()=>{
  const change=step({count:1,since:0,casting:false},{count:0,time:5000,casting:false});
  const paused=step(change,{count:0,time:5100,casting:false});expect(paused.frame).toBe(1);expect(step(paused,{count:0,time:5100,casting:false}).frame).toBe(1);
  expect(step(paused,{count:0,time:5100,casting:false,settled:true})).toMatchObject({count:0,frame:2});
  expect(step(change,{count:0,time:5000,casting:false,reduced:true})).toMatchObject({count:0,frame:2});
});

it('recognizes a new caster cost even when snapshots skip the gap between two casts',()=>{
  const hold=step({count:4,since:0,casting:false},{count:4,time:5000,casting:true});
  expect(step(hold,{count:0,time:5000,casting:true,spent:2})).toMatchObject({count:2,frame:2});
});
