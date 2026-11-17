import { afterEach, expect, it, vi } from 'vitest';
import { Session } from '../../src/game/Session';
import { config } from '../../src/game/config';
import { Bot } from '../../src/game/Bot';

afterEach(() => { vi.restoreAllMocks(); vi.useRealTimers(); });
function clock() {
  vi.useFakeTimers();
  let now = 0;
  vi.spyOn(performance, 'now').mockImplementation(() => now);
  const session = new Session({ characters:['champignon','andy'], mode:'ai', difficulty:'medium', seed:42 });
  session.start();
  return { session, callback(elapsed: number) { now += elapsed; vi.advanceTimersByTime(config.tickMs); } };
}
it('catches up delayed callbacks with one bot decision per fixed step', () => {
  const bot = vi.spyOn(Bot.prototype, 'update');
  const { session, callback } = clock();
  callback(225); expect(session.match.state.time).toBe(200); expect(bot).toHaveBeenCalledTimes(4);
  callback(75); expect(session.match.state.time).toBe(300); expect(bot).toHaveBeenCalledTimes(6);
  session.stop();
});
it('bounds long stalls and never catches up time spent manually paused', () => {
  const { session, callback } = clock();
  callback(5000); expect(session.match.state.time).toBe(250);
  session.togglePause(); callback(5000); expect(session.match.state.time).toBe(250);
  session.togglePause(); callback(50); expect(session.match.state.time).toBe(300);
  session.stop();
});
