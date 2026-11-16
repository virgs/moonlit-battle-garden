import { afterEach, expect, it, vi } from 'vitest';
import { Session } from '../../src/game/Session';

class FakeAudio {
  static instances: FakeAudio[] = [];
  paused = true;
  loop = false;
  volume = 1;
  currentTime = 0;
  constructor(readonly src: string) { FakeAudio.instances.push(this); }
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
  const music = FakeAudio.instances.find(audio => audio.src === session.home.music)!;
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
