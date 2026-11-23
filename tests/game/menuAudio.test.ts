import {afterEach,expect,it,vi} from 'vitest';
import {MenuAudio} from '../../src/presentation/MenuAudio';
import {prepareSound} from '../../src/presentation/audioGesture';
vi.mock('../../src/presentation/audioGesture',()=>({prepareSound:vi.fn(),soundContext:()=>null}));
class AudioStub {
 static played:string[]=[];static instances:AudioStub[]=[];
 paused=true;volume=1;currentTime=0;playbackRate=1;
 constructor(public src:string){AudioStub.instances.push(this);}
 play(){this.paused=false;AudioStub.played.push(this.src);return Promise.resolve();}
 pause(){this.paused=true;}
}
afterEach(()=>{vi.unstubAllGlobals();vi.clearAllMocks();AudioStub.played=[];AudioStub.instances=[];});
it('stays silent until enabled, unlocks only for actions and stops immediately when muted',()=>{
 vi.stubGlobal('Audio',AudioStub);const audio=new MenuAudio();audio.play('menuConfirm');expect(prepareSound).not.toHaveBeenCalled();
 audio.setEnabled(true);expect(prepareSound).not.toHaveBeenCalled();
 for(const cue of ['menuMove','menuConfirm','menuBack','menuError'] as const)audio.play(cue);
 expect(AudioStub.played).toEqual(['move','confirm','back','error'].map(key=>`/assets/sfx/menu/${key}.wav`));expect(prepareSound).toHaveBeenCalledTimes(4);
 audio.setEnabled(false);expect(AudioStub.instances.every(a=>a.paused)).toBe(true);audio.play('menuMove');expect(AudioStub.played).toHaveLength(4);
 audio.setEnabled(true);expect(AudioStub.played).toHaveLength(4);audio.play('menuConfirm');expect(AudioStub.played).toHaveLength(5);audio.dispose();expect(AudioStub.instances.every(a=>a.paused)).toBe(true);audio.play('menuBack');expect(AudioStub.played).toHaveLength(5);
});
it('ships the four unmodified CC0 menu clips with their license and original hashes',async()=>{
 const {readFileSync}=await import('node:fs'),{createHash}=await import('node:crypto'),root='public/assets/sfx/menu/';const source=JSON.parse(readFileSync(root+'sources.json','utf8'));expect(source.license).toBe('CC0-1.0');expect(readFileSync(root+'LICENSE.txt','utf8')).toContain('Kenney');
 for(const [cue,file] of Object.entries(source.sounds) as [string,{sha256:string;edits:string}][]){expect(file.edits).toBe('none');expect(createHash('sha256').update(readFileSync(root+cue+'.wav')).digest('hex')).toBe(file.sha256);}
});
