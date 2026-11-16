import Phaser from 'phaser';
import type { Snapshot } from '../game/Session';
import type { PlayerId, TargetKind } from '../game/types';
import { gardenArt } from './layout';
import type { ArenaLayout } from './layout';
import type { CharacterHome } from '../game/homes';

const offsets: Record<TargetKind, number> = { mole: 0, star: 8, rabbit: 16 };
type GardenView = {
  image: Phaser.GameObjects.Image;
  sprites: Phaser.GameObjects.Sprite[];
  roots: Phaser.GameObjects.Sprite[];
  flashes: { until: number; frame: number }[];
  previous: (TargetKind | null)[];
};

export class GardenScene extends Phaser.Scene {
  private gardens: GardenView[] = [];
  private backdrop!: Phaser.GameObjects.Graphics;
  private lastLayout: ArenaLayout | null = null;
  private lastEvent = 0;
  private background!: Phaser.GameObjects.Image;
  private reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  constructor(private getSnapshot: () => Snapshot, private getLayout: () => ArenaLayout, private home: CharacterHome) { super('gardens'); }
  preload(): void {
    this.load.image('garden', '/assets/garden.png');
    this.load.spritesheet('targets', '/assets/characters.png', { frameWidth: 90, frameHeight: 90 });
    this.load.spritesheet('roots', '/assets/root.png', { frameWidth: 70, frameHeight: 70 });
    this.load.image('home', this.home.background);
  }
  create(): void {
    this.backdrop = this.add.graphics();
    this.background = this.add.image(0, 0, 'home').setTint(this.home.tint).setAlpha(0.22);
    for (let id = 0; id < 2; id++) {
      this.gardens.push({
        image: this.add.image(0, 0, 'garden').setOrigin(0),
        sprites: Array.from({ length: 9 }, () => this.add.sprite(0, 0, 'targets').setOrigin(0.5, 1).setVisible(false)),
        roots: Array.from({ length: 4 }, () => this.add.sprite(0, 0, 'roots').setVisible(false)),
        flashes: Array.from({ length: 9 }, () => ({ until: 0, frame: 0 })),
        previous: Array.from({ length: 9 }, () => null),
      });
    }
    this.game.canvas.setAttribute('aria-hidden', 'true');
  }
  private arrange(layout: ArenaLayout): void {
    const { width, height } = layout;
    const image = this.textures.get('home').getSourceImage();
    this.background.setPosition(width / 2, height / 2).setScale(Math.max(width / image.width, height / image.height));
    this.backdrop.clear().fillStyle(0x10251f).fillRect(0, 0, width, height);
    for (let n = 0; n < 65; n++) {
      this.backdrop.fillStyle(0xd1e58a, 0.1 + (n % 3) * 0.06)
        .fillCircle(((n * 137 + 31) % 997) / 997 * width, ((n * 79 + 53) % 491) / 491 * height, n % 5 === 0 ? 1.5 : 0.7);
    }
    if (!layout.single) {
      this.backdrop.lineStyle(1, 0xc9e586, 0.1).lineBetween(width / 2, 88, width / 2, height - 90);
    }
    this.gardens.forEach(view => {
      view.image.setVisible(false);
      [...view.sprites, ...view.roots].forEach(sprite => sprite.setVisible(false));
    });
    for (const garden of layout.gardens) {
      const view = this.gardens[garden.id];
      // A single scalar preserves the source aspect ratio for both board and targets.
      view.image.setPosition(garden.x, garden.y).setScale(garden.scale).setVisible(true);
      garden.holes.forEach((hole, index) => {
        view.sprites[index].setPosition(hole.feet.x, hole.feet.y).setScale(garden.scale * gardenArt.spriteScale);
      });
      view.roots.forEach((root, index) => {
        const x = [37, 105, 193, 265][index];
        root.setPosition(garden.x + x * garden.scale, garden.y + 352 * garden.scale).setScale(garden.scale * 0.75).setVisible(true);
      });
    }
    this.lastLayout = layout;
  }
  update(): void {
    const layout = this.getLayout();
    if (layout !== this.lastLayout) this.arrange(layout);
    const { state, events } = this.getSnapshot();
    for (const garden of layout.gardens) {
      const view = this.gardens[garden.id];
      view.roots.forEach((root, index) => root.setFrame(index * 4 + (this.reducedMotion.matches ? 0 : (Math.floor(state.time / 140) + index) % 4)));
      for (const event of events.filter(item => item.id > this.lastEvent && item.player === garden.id)) {
        if (event.hole !== undefined) {
          const kind = view.previous[event.hole];
          if (kind) view.flashes[event.hole] = { until: state.time + 400, frame: offsets[kind] };
        }
      }
      this.updateTargets(garden.id, state.time);
    }
    this.lastEvent = events.at(-1)?.id ?? this.lastEvent;
  }
  private updateTargets(id: PlayerId, time: number): void {
    const view = this.gardens[id];
    this.getSnapshot().state.players[id].holes.forEach((target, hole) => {
      const sprite = view.sprites[hole];
      const flash = view.flashes[hole];
      view.previous[hole] = target?.kind ?? null;
      if (target) {
        const age = time - target.born;
        const row = age < 300 ? 3 : target.expires - time < 300 ? 2 : 0;
        const frame = Math.floor((row === 3 ? age : time) / (row === 3 ? 40 : 90)) % 8;
        sprite.setVisible(true).setFrame(row * 24 + offsets[target.kind] + frame);
      } else if (flash.until > time) {
        sprite.setVisible(true).setFrame(24 + flash.frame + Math.min(7, Math.floor((400 - flash.until + time) / 50)));
      } else sprite.setVisible(false);
    });
  }
}
