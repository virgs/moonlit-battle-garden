import { afterEach, expect, it, vi } from 'vitest';
import { Match } from '../../src/game/Match';
import { SoundEffects } from '../../src/presentation/SoundEffects';
import type { GameEvent } from '../../src/game/types';

class AudioStub {
  static played: string[] = []; static instances: AudioStub[] = [];
  paused = true; volume = 1; currentTime = 0;
  constructor(public src: string) { AudioStub.instances.push(this); }
  play() { this.paused = false; AudioStub.played.push(this.src); return Promise.resolve(); }
  pause() { this.paused = true; }
}
afterEach(() => { vi.unstubAllGlobals(); AudioStub.played=[]; AudioStub.instances=[]; });
const create = () => new Match({ mode:'local', characters:['champignon','andy'], difficulty:'easy', seed:1 });
it('plays original spawn, charge, hit, impact, rabbit, cast and game-over cues once per event', () => {
  vi.stubGlobal('Audio', AudioStub); const match=create(), effects=new SoundEffects();
  const sync=()=>effects.sync({state:match.state,events:match.events});
  match.state.players[0].holes[0]={id:1,kind:'mole',born:0,expires:2000}; sync();
  expect(AudioStub.played.at(-1)).toMatch(/charPop\.mp3$/);
  match.state.players[1].holes[0]={id:2,kind:'star',born:0,expires:2000}; sync();
  expect(AudioStub.played.at(-1)).toMatch(/starRaise\.mp3$/);
  const count=AudioStub.played.length; sync(); expect(AudioStub.played).toHaveLength(count);
  const emit=(event:Partial<GameEvent>)=>{match.events.push({id:match.events.length+1,round:1,time:0,player:0,kind:'hit',...event});sync();};
  emit({kind:'hit',targetKind:'mole'}); expect(AudioStub.played.slice(-2)).toEqual(['/assets/sfx/die0.wav','/assets/sfx/original-impacto1.wav']);
  emit({kind:'penalty',targetKind:'rabbit',reason:'rabbit'}); expect(AudioStub.played.slice(-2)[0]).toMatch(/rabbitHit\.wav$/);
  emit({kind:'penalty',reason:'empty'}); expect(AudioStub.played.at(-1)).toMatch(/wrongHit\.wav$/);
  const beforeMiss=AudioStub.played.length; emit({kind:'penalty',reason:'miss'}); expect(AudioStub.played).toHaveLength(beforeMiss);
  emit({kind:'star'}); expect(AudioStub.played.at(-1)).toMatch(/starHit\.wav$/);
  emit({kind:'cast',tier:2}); expect(AudioStub.played.slice(-2)).toEqual(['/assets/sfx/specialBarHit.wav','/assets/sfx/original-morreEspecial.wav']);
  match.state.phase='match-over';sync(); expect(AudioStub.played.at(-1)).toMatch(/gameOver\.wav$/);
  const ended=AudioStub.played.length;sync();expect(AudioStub.played).toHaveLength(ended);
  effects.dispose();expect(AudioStub.instances.every(audio=>audio.paused)).toBe(true);
});
it('consumes muted events without replaying them on unmute and cycles hit variations', () => {
  vi.stubGlobal('Audio', AudioStub); const match=create(), effects=new SoundEffects();
  effects.setMuted(true);match.events=[{id:1,time:0,round:1,player:0,kind:'star'}];
  effects.sync({state:match.state,events:match.events});effects.setMuted(false);effects.sync({state:match.state,events:match.events});expect(AudioStub.played).toEqual([]);
  for(let id=2;id<=4;id++){match.events.push({id,time:0,round:1,player:0,kind:'hit'});effects.sync({state:match.state,events:match.events});}
  expect(AudioStub.played.filter(src=>/\/die/.test(src))).toEqual(['/assets/sfx/die0.wav','/assets/sfx/die1.wav','/assets/sfx/die2.wav']);
});
