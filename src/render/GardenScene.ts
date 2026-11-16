import Phaser from 'phaser';
import type { Snapshot } from '../game/Session';
import type { PlayerId, TargetKind } from '../game/types';

const offsets: Record<TargetKind, number> = { mole: 0, star: 8, rabbit: 16 };

export class GardenScene extends Phaser.Scene {
  private sprites: Phaser.GameObjects.Sprite[] = [];
  private flashes: { until: number; frame: number }[] = [];
  private previous: (TargetKind | null)[] = Array.from({ length: 9 }, () => null);
  private lastEvent = 0;

  constructor(private getSnapshot: () => Snapshot, private playerId: PlayerId) { super('garden'); }
  preload(): void {
    this.load.image('garden', '/assets/garden.png');
    this.load.spritesheet('targets', '/assets/characters.png', { frameWidth: 90, frameHeight: 90 });
  }
  create(): void {
    this.add.image(180, 216, 'garden').setDisplaySize(360, 432);
    for (let hole = 0; hole < 9; hole++) {
      this.sprites.push(this.add.sprite(60 + hole % 3 * 120, 51 + Math.floor(hole / 3) * 120, 'targets').setDisplaySize(105, 105).setVisible(false));
      this.flashes.push({ until: 0, frame: 0 });
    }
    this.game.canvas.setAttribute('aria-hidden', 'true');
  }
  update(time: number): void {
    const { state, events } = this.getSnapshot();
    const player = state.players[this.playerId];
    const fresh = events.filter(event => event.id > this.lastEvent && event.player === this.playerId);
    for (const event of fresh) {
      if (event.hole !== undefined) {
        const kind = this.previous[event.hole];
        if (kind) this.flashes[event.hole] = { until: time + 400, frame: offsets[kind] };
      }
    }
    this.lastEvent = events.at(-1)?.id ?? this.lastEvent;
    player.holes.forEach((target, hole) => {
      const sprite = this.sprites[hole];
      const flash = this.flashes[hole];
      this.previous[hole] = target?.kind ?? null;
      if (target) {
        const age = state.time - target.born;
        const row = age < 300 ? 3 : target.expires - state.time < 300 ? 2 : 0;
        const frame = Math.min(7, Math.floor((row === 3 ? age : state.time) / (row === 3 ? 40 : 90)) % 8);
        sprite.setVisible(true).setFrame(row * 24 + offsets[target.kind] + frame);
      } else if (flash.until > time) {
        sprite.setVisible(true).setFrame(24 + flash.frame + Math.min(7, Math.floor((400 - flash.until + time) / 50)));
      } else sprite.setVisible(false);
    });
  }
}
