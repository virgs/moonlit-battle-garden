import { afterEach, expect, it, vi } from 'vitest';
import { Session, type Snapshot } from '../../src/game/Session';
import { inputAction, localView, type Wire } from '../../src/network/protocol';

const options = { characters: ['champignon', 'andy'], mode: 'online', difficulty: 'medium', seed: 123 } as const;
afterEach(() => vi.useRealTimers());
function pair() {
  const hostMessages: Wire[] = [], guestMessages: Wire[] = [];
  const host = new Session({ ...options, characters: [...options.characters] }, { seat: 0, send: message => hostMessages.push(message), close() {} });
  const guest = new Session({ ...options, characters: [...options.characters] }, { seat: 1, send: message => guestMessages.push(message), close() {} });
  const flush = () => {
    while (hostMessages.length || guestMessages.length) {
      for (const m of hostMessages.splice(0)) guest.receive(m);
      for (const m of guestMessages.splice(0)) host.receive(m);
    }
  };
  return { host, guest, flush, hostMessages, guestMessages };
}
it('waits for guest readiness; only host advances; both see themselves on the left', () => {
  vi.useFakeTimers();
  const { host, guest, flush } = pair();
  host.start(); vi.advanceTimersByTime(5000); expect(host.match.state.time).toBe(0);
  guest.start(); flush(); vi.advanceTimersByTime(4000); flush();
  expect(host.match.state.phase).toBe('playing');
  expect(guest.match.state).toEqual(host.match.state);
  expect(guest.getSnapshot().state.players[0].character).toBe('andy');
  expect(host.getSnapshot().state.players[0].character).toBe('champignon');
  guest.act({ type: 'hit', player: 0, hole: 0 }); flush();
  expect(guest.getSnapshot().state.players[0].score).toBe(host.match.state.players[1].score);
  host.stop(); guest.stop();
});
it('maps winners, pending spell senders and cast events without mutating authoritative state', () => {
  const { host } = pair();
  host.match.state.winner = 1; host.match.state.phase = 'round-over';
  host.match.state.players[0].pending.push({ from: 1, tier: 2, at: 500 });
  const raw: Snapshot = { state: host.match.state, events: [{ id: 1, time: 50, round: 1, kind: 'cast', player: 1, tier: 2 }] };
  const view = localView(raw, 1);
  expect(view.state.winner).toBe(0); expect(view.state.result).toBe('You win the round!');
  expect(view.state.players[1].pending[0].from).toBe(0);
  expect(view.events[0].player).toBe(0); expect(raw.events[0].player).toBe(1);
});
it('rejects stale target clicks and malformed holes; accepts a genuine empty hit', () => {
  const { host } = pair();
  const snapshot = host.getSnapshot();
  expect(inputAction({ type: 'hit', hole: 0, target: 123 }, 1, snapshot)).toBeNull();
  expect(inputAction({ type: 'hit', hole: 12, target: null }, 1, snapshot)).toBeNull();
  expect(inputAction({ type: 'hit', hole: 0, target: null }, 1, snapshot)).toEqual({ type: 'hit', hole: 0, player: 1 });
});
it('replicates guest magic and next rounds while rejecting online pause; cannot act on the opponent board', () => {
  const { host, guest, flush } = pair();
  host.match.state.phase = 'playing'; host.match.state.players[1].stars = 2;
  host.connection('connected'); flush();
  guest.act({ type: 'cast', player: 1 }); flush(); expect(host.match.state.players[1].stars).toBe(2);
  guest.act({ type: 'cast', player: 0 }); flush(); expect(host.match.state.players[1].stars).toBe(0);
  expect(guest.getSnapshot().events.at(-1)?.tier).toBe(2);
  expect(host.getSnapshot().state.casting?.player).toBe(1);
  expect(guest.getSnapshot().state.casting?.player).toBe(0);
  const frozenTime = host.match.state.time;
  host.match.advance(1000); host.connection('connected'); flush();
  expect(guest.getSnapshot().state.time).toBe(frozenTime);
  expect(guest.getSnapshot().state.casting?.remainingMs).toBe(500);
  guest.togglePause(); host.togglePause(); flush(); expect(host.match.state.paused).toBe(false); expect(guest.getSnapshot().state.paused).toBe(false);
  host.match.state.phase = 'round-over'; host.connection('connected'); flush();
  guest.nextRound(); flush(); expect(host.match.state.round).toBe(2); expect(guest.match.state.round).toBe(2);
});
it('freezes on interruption and resumes automatically after the ready handshake', () => {
  vi.useFakeTimers();
  const { host, guest, flush } = pair(); host.start(); guest.start(); flush();
  vi.advanceTimersByTime(4000); flush();
  host.connection('reconnecting'); guest.connection('reconnecting');
  const time = host.match.state.time;
  vi.advanceTimersByTime(2000); expect(host.match.state.time).toBe(time);
  guest.act({ type: 'hit', player: 0, hole: 0 });
  host.receive({ kind: 'ready' }); guest.connection('connected'); flush();
  expect(guest.getSnapshot().state.paused).toBe(false);
  vi.advanceTimersByTime(100); flush();
  expect(host.match.state.time).toBe(time + 100);
  host.stop(); guest.stop();
});

it('allows explicit pause only in AI and same-computer modes', () => {
  for (const mode of ['ai', 'local'] as const) {
    const session = new Session({ mode, characters: ['champignon', 'andy'], difficulty: 'easy', seed: 1 });
    session.togglePause(); expect(session.match.state.paused).toBe(true);
    session.togglePause(); expect(session.match.state.paused).toBe(false);
  }
});
