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
 expect(titleGardenPose(250).batFrame).not.toBe(titleGardenPose(650).batFrame);expect(titleGardenPose(0).owlFacing).not.toBe(titleGardenPose(4000).owlFacing);expect(titleGardenPose(1000).pumpkinLit).not.toBe(titleGardenPose(3000).pumpkinLit);
});
