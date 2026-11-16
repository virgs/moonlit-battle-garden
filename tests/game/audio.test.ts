import { afterEach, expect, it, vi } from 'vitest';
import { Session } from '../../src/game/Session';
import { HomeMusic } from '../../src/presentation/HomeMusic';

class FakeAudio extends EventTarget {
  static instances: FakeAudio[] = [];
  paused = true;
  loop = false;
  volume = 1;
  currentTime = 0;
  constructor(public src: string) { super(); FakeAudio.instances.push(this); }
  load() {}
  play() { this.paused = false; return Promise.resolve(); }
  pause() { this.paused = true; }
}
afterEach(() => { vi.unstubAllGlobals(); FakeAudio.instances = []; });

it('starts home music only on sound opt-in, and pauses it for pause, mute, round end, and exit', () => {
  vi.stubGlobal('Audio', FakeAudio);
  const session = new Session({ characters: ['champignon', 'andy'], mode: 'local', difficulty: 'easy', seed: 1 });
  expect(FakeAudio.instances).toHaveLength(0);
  session.toggleSound();
  const music = FakeAudio.instances.find(audio => audio.src === session.home.music.src)!;
  expect(music.loop).toBe(true); expect(music.paused).toBe(false);
  session.togglePause(); expect(music.paused).toBe(true);
  session.togglePause(); expect(music.paused).toBe(false);
  session.toggleSound(); expect(music.paused).toBe(true);
  session.toggleSound(); expect(music.paused).toBe(false);
  session.match.state.phase = 'playing';
  session.match.state.players[0].score = 99;
  session.act({ type: 'hit', player: 1, hole: 0 });
  expect(session.match.state.phase).toBe('round-over'); expect(music.paused).toBe(true);
  session.nextRound(); expect(music.paused).toBe(false);
  session.stop(); expect(music.paused).toBe(true);
});

it('falls back from missing home music without starting playback while muted', () => {
  vi.stubGlobal('Audio', FakeAudio);
  const player = new HomeMusic({ src: '/final.ogg', fallback: '/fallback.mp3', volume: 0.2, loopStartMs: 1000, loopEndMs: 4000 });
  const audio = FakeAudio.instances[0];
  audio.dispatchEvent(new Event('error'));
  expect(audio.src).toBe('/fallback.mp3'); expect(audio.paused).toBe(true);
  player.setPlaying(true); expect(audio.paused).toBe(false);
  player.dispose(); expect(audio.paused).toBe(true);
  audio.dispatchEvent(new Event('ended')); expect(audio.paused).toBe(true);
});

it('loops a configured music segment and obeys pause during looping', () => {
  vi.stubGlobal('Audio', FakeAudio);
  const player = new HomeMusic({ src: '/final.ogg', fallback: '/fallback.mp3', volume: 0.2, loopStartMs: 1000, loopEndMs: 4000 });
  const audio = FakeAudio.instances[0];
  player.setPlaying(true); audio.currentTime = 4.1; audio.dispatchEvent(new Event('timeupdate'));
  expect(audio.currentTime).toBe(1);
  player.setPlaying(false); audio.currentTime = 5; audio.dispatchEvent(new Event('timeupdate'));
  expect(audio.currentTime).toBe(5); expect(audio.paused).toBe(true);
});
