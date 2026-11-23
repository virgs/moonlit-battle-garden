import { expect,it } from 'vitest';
import { titleGardenPose,titleCameraPeriod } from '../../src/presentation/titleGarden';
it('ping-pongs horizontally with continuous turnarounds and no loop jump',()=>{
 const period=titleCameraPeriod;
 expect(titleGardenPose(0).camera).toBe(0);expect(titleGardenPose(period/4).camera).toBeCloseTo(70);expect(titleGardenPose(period/2).camera).toBe(140);expect(titleGardenPose(period*3/4).camera).toBeCloseTo(70);expect(titleGardenPose(period).camera).toBe(0);
 expect(titleGardenPose(period/2-1).camera).toBeCloseTo(titleGardenPose(period/2+1).camera,6);expect(titleGardenPose(period-1).camera).toBeCloseTo(titleGardenPose(period+1).camera,6);
});
it('moves distant layers more slowly, scales travel for phones and provides a still reduced-motion scene',()=>{
 const pose=titleGardenPose(6000);expect(pose.sky).toBeLessThan(pose.mountains);expect(pose.mountains).toBeLessThan(pose.graves);expect(pose.graves).toBeLessThan(pose.trees);expect(pose.trees).toBeLessThan(pose.foreground);
 expect(titleGardenPose(titleCameraPeriod/2,false,40).camera).toBe(40);expect(titleGardenPose(0,true)).toEqual(titleGardenPose(15000,true));
 expect(titleGardenPose(250).batFrame).not.toBe(titleGardenPose(650).batFrame);expect(titleGardenPose(0).owlFrame).not.toBe(titleGardenPose(4000).owlFrame);expect(titleGardenPose(1000).pumpkinFrame).not.toBe(titleGardenPose(3000).pumpkinFrame);
});

it('ships nine-frame title actors with native aspect ratios',async()=>{
 const {readFileSync}=await import('node:fs');for(const [key,height] of [['bat',48],['owl',64],['pumpkin',48]] as const){const file=readFileSync(`public/assets/title-garden/${key}.png`);expect([file.readUInt32BE(16),file.readUInt32BE(20)]).toEqual([48*9,height]);}
 for(let t=0;t<10000;t+=50){const p=titleGardenPose(t);for(const f of [p.batFrame,p.owlFrame,p.pumpkinFrame])expect(f).toBeGreaterThanOrEqual(0);expect(Math.max(p.batFrame,p.owlFrame,p.pumpkinFrame)).toBeLessThan(9);}
});
