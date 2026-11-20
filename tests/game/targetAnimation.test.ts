import { expect, it } from 'vitest';
import { targetFrame, hitFrame, targetHitDuration } from '../../src/render/targetAnimation';
import { Match } from '../../src/game/Match';

it('plays every rising and hiding frame in order within short and long reaction windows', () => {
  for (const life of [1150, 1500, 2200, 2600]) {
    const target = { id: 1, kind: 'mole' as const, born: 1000, expires: 1000 + life };
    const rise: number[] = [], hide: number[] = [], idle = new Set<number>();
    for (let time = target.born; time < target.expires; time += 50) {
      const frame = targetFrame(target, time);
      if (frame >= 72 && rise.at(-1) !== frame) rise.push(frame);
      else if (frame >= 48 && frame < 72 && hide.at(-1) !== frame) hide.push(frame);
      else if (frame < 8) idle.add(frame);
    }
    expect(rise).toEqual([72,73,74,75,76,77,78,79]);
    expect(hide).toEqual([48,49,50,51,52,53,54,55]);
    expect(idle.size).toBeGreaterThan(1);
  }
});
it('selects the same animation rows for stars/rabbits and all eight hit frames', () => {
  for (const [kind, offset] of [['mole', 0], ['star', 8], ['rabbit', 16]] as const) {
    const target = { id: 1, kind, born: 0, expires: 2200 };
    expect(targetFrame(target, 0)).toBe(72 + offset);
    expect(targetFrame(target, 2199)).toBe(55 + offset);
    expect(targetFrame(target, 100, true)).toBe(offset);
    const hits = new Set(Array.from({ length: Math.ceil(targetHitDuration) }, (_, elapsed) => hitFrame(kind, elapsed)));
    expect([...hits]).toEqual(Array.from({ length: 8 }, (_, n) => 24 + offset + n));
  }
});
it('rabbit hits carry explicit sprite metadata even when a guard absorbs the penalty', () => {
  for (const shield of [0, 1]) {
    const match = new Match({ mode: 'local', characters: ['champignon', 'andromoss'], difficulty: 'easy', seed: 1 });
    match.advance(3000);
    const player = match.state.players[0];
    player.mistakeShield = shield; player.shieldUntil = 10000;
    player.holes[4] = { id: 1, kind: 'rabbit', born: 3000, expires: 5000 };
    match.action({ type: 'hit', player: 0, hole: 4 });
    expect(match.events.at(-1)).toMatchObject({ hole: 4, targetKind: 'rabbit', kind: shield ? 'shield' : 'penalty' });
  }
});

function transitionPoses(life: number, kind: 'mole' | 'star' | 'rabbit' = 'mole', offset = 0) {
  const target = { id: 1, kind, born: 1000, expires: 1000 + life };
  const rise: number[] = [], retreat: number[] = [];
  let retreatStarted = false;
  for (let time = target.born; time < target.expires; time += 50) {
    const frame = targetFrame(target,time);
    if (frame >= 72 + offset && frame <= 79 + offset) {
      expect(retreatStarted).toBe(false);
      if (rise.at(-1) !== frame) rise.push(frame);
    } else if (frame >= 48 + offset && frame <= 55 + offset) {
      retreatStarted = true;
      if (retreat.at(-1) !== frame) retreat.push(frame);
    }
  }
  return { rise: rise.map(frame=>frame-72-offset), retreat: retreat.map(frame=>frame-48-offset) };
}

it('keeps complete start/end poses in shortened rise and retreat sequences for every target kind',()=>{
  for (const [kind,offset] of [['mole',0],['star',8],['rabbit',16]] as const) {
    for (const [life,poses] of [[300,[0,4,7]],[425,[0,2,5,7]],[500,[0,2,4,5,7]],[800,[0,1,2,3,4,5,6,7]]] as const) {
      const actual=transitionPoses(life,kind,offset);
      expect(actual.rise).toEqual(poses);expect(actual.retreat).toEqual(poses);
    }
  }
});

it('restores omitted middle frames automatically when the lifetime grows',()=>{
  const short=transitionPoses(300),medium=transitionPoses(500),long=transitionPoses(800);
  expect(short.rise).toHaveLength(3);expect(medium.rise).toHaveLength(5);expect(long.rise).toHaveLength(8);
  expect(long.retreat).toEqual([0,1,2,3,4,5,6,7]);
  // Frame selection is derived each time, with no destructive edits or cached short clip.
  expect(transitionPoses(300)).toEqual(short);
});

it('preserves both endpoints in order for intermediate and non-tick-aligned lifetimes',()=>{
  for (const life of [350,450,528,550,650,750,799,1150,2200]) {
    const poses=transitionPoses(life);
    for (const sequence of [poses.rise,poses.retreat]) {
      expect(sequence[0]).toBe(0);expect(sequence.at(-1)).toBe(7);
      expect(sequence.every((frame,index)=>index===0||frame>sequence[index-1])).toBe(true);
    }
  }
});
