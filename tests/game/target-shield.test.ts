import {expect,it} from 'vitest';
import {targetShield} from '../../src/render/targetShield';
const mole={id:1,kind:'mole' as const,born:0,expires:10000,armor:2};
it('shows only real remaining armor and plays an animated energy pose',()=>{
 expect(targetShield(mole,1000).layers).toBe(2);expect(targetShield({...mole,armor:1},1000).layers).toBe(1);expect(targetShield({...mole,armor:0},1000).layers).toBe(0);expect(targetShield(mole,10000).layers).toBe(0);expect(targetShield({...mole,kind:'rabbit'},1000).layers).toBe(0);
 expect(targetShield(mole,1100).frame).not.toBe(targetShield(mole,1000).frame);expect(targetShield(mole,1000).pulse).toBeGreaterThan(.97);
});
it('keeps reduced motion still and follows target emergence',()=>{
expect(targetShield(mole,1000,true).frame).toBe(0);expect(targetShield(mole,1500,true).pulse).toBe(1);expect(targetShield(mole,50).reveal).toBeLessThan(targetShield(mole,1000).reveal);
});
it('pops only after a real armor hit and ends at the exact280ms deadline',()=>{
 expect(targetShield(mole,1000).burst).toBe(false);expect(targetShield(mole,1000,false,1000)).toMatchObject({burst:true,burstFrame:0});expect(targetShield({...mole,armor:0},1279,false,1000)).toMatchObject({layers:0,burst:true,burstFrame:4});expect(targetShield(mole,1280,false,1000).burst).toBe(false);
});
