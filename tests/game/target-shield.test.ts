import {expect,it} from 'vitest';
import {targetShield,shieldArcPixel,shieldArcGap,shieldArcs} from '../../src/render/targetShield';
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

it('keeps300 degrees of energy, centers the60 degree opening below and separates the two arcs',()=>{
 expect(shieldArcs.degrees).toBe(300);expect(shieldArcPixel(32,5)).toBe(true);expect(shieldArcPixel(5,32)).toBe(true);expect(shieldArcPixel(58,32)).toBe(true);
 expect(shieldArcPixel(18,55)).toBe(false);expect(shieldArcPixel(45,55)).toBe(false);expect(shieldArcPixel(16,54)).toBe(true);expect(shieldArcPixel(47,54)).toBe(true);
 expect(shieldArcPixel(32,32)).toBe(false);expect(shieldArcPixel(32,58)).toBe(false);expect(shieldArcPixel(0,0)).toBe(false);
 for(const scale of [.4,.6,1,2])expect(shieldArcGap(scale)).toBeGreaterThan(8*scale);
 expect(shieldArcs.primarySize).toBe(84); // The remaining arch does not resize after a layer is lost.
});
