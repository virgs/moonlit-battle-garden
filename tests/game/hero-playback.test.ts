import {expect,it} from 'vitest';
import {characterIds} from '../../src/game/types';
import {heroFrameAt,presentation} from '../../src/presentation/config';

it('uses six idle poses per second and twelve victory poses per second across the approved roster',()=>{
 for(const hero of characterIds){expect(presentation[hero].standing).toMatchObject({fps:6,frameCount:5});expect(presentation[hero].victory).toMatchObject({fps:12,frameCount:9});}
});
it('catches up to elapsed time after delayed paints and wraps only looping clips',()=>{
 const idle=presentation.champignon.standing,victory=presentation.champignon.victory;
 expect(heroFrameAt(idle,0)).toBe(0);expect(heroFrameAt(idle,200)).toBe(1);expect(heroFrameAt(idle,700)).toBe(4);expect(heroFrameAt(idle,900)).toBe(0);expect(heroFrameAt(idle,1300)).toBe(2);
 expect(heroFrameAt(victory,200)).toBe(2);expect(heroFrameAt(victory,700)).toBe(8);expect(heroFrameAt(victory,900)).toBe(1);expect(heroFrameAt(victory,1300)).toBe(6);
 expect(heroFrameAt(victory,900,false)).toBe(8);expect(heroFrameAt(victory,60000,false)).toBe(8);expect(heroFrameAt(idle,-100)).toBe(0);
});
