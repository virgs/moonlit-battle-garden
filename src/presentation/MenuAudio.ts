import { prepareSound } from './audioGesture';
import { SoundEffects } from './SoundEffects';
import type { MenuCue } from './soundFiles';

/** Local action feedback only: no hover/mount/network-update sounds or gameplay RNG. */
export class MenuAudio {
  private enabled=false;
  private effects:SoundEffects|null=null;
  setEnabled(enabled:boolean):void {
    this.enabled=enabled;
    this.effects?.setMuted(!enabled);
  }
  play(cue:MenuCue):void {
    if(!this.enabled)return;
    prepareSound();
    this.effects??=new SoundEffects();
    this.effects.playMenu(cue);
  }
  dispose():void {
    this.effects?.dispose();
    this.effects=null;
    this.enabled=false;
  }
}

export const menuAudio=new MenuAudio();
