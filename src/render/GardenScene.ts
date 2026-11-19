import { assetUrl } from '../assets/url';
import Phaser from 'phaser';
import type { Snapshot } from '../game/Session';
import type { PlayerId, TargetKind } from '../game/types';
import { gardenArt } from './layout';
import type { ArenaLayout } from './layout';
import type { CharacterHome } from '../game/homes';
import { earthPlacements, earthFrameSize, rootStripTop, recolorBoard } from './legacyPresentation';

import { targetFrame, hitFrame, targetHitDuration } from './targetAnimation';
type GardenView = {
  image: Phaser.GameObjects.Image;
  sprites: Phaser.GameObjects.Sprite[];
  hitSprites: Phaser.GameObjects.Sprite[];
  rootStrip: Phaser.GameObjects.Image;
  dust: Phaser.GameObjects.Sprite[];
  flashes: { until: number; kind: TargetKind }[];
  previous: (TargetKind | null)[];
};

export class GardenScene extends Phaser.Scene {
  private gardens: GardenView[] = [];
  private targetMarks!: Phaser.GameObjects.Graphics;
  private backdrop!: Phaser.GameObjects.Graphics;
  private lastLayout: ArenaLayout | null = null;
  private lastEvent = 0;
  private background!: Phaser.GameObjects.Image;
  private reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  constructor(private getSnapshot: () => Snapshot, private getLayout: () => ArenaLayout, private home: CharacterHome) { super('gardens'); }
  preload(): void {
    this.load.image('garden', assetUrl('/assets/legacy/garden.png'));
    this.load.spritesheet('targets', assetUrl('/assets/characters.png'), { frameWidth: 90, frameHeight: 90 });
    this.load.spritesheet('earth', assetUrl('/assets/legacy/earth.png'), { frameWidth: earthFrameSize, frameHeight: earthFrameSize });
    this.load.image('home', assetUrl(this.home.background.fallback));
  }
  create(): void {
    this.backdrop = this.add.graphics();
    this.background = this.add.image(0, 0, 'home').setTint(this.home.background.fallbackTint).setAlpha(this.home.background.fallbackOpacity);
    for (let id = 0; id < 2; id++) {
      const source = this.textures.get('garden').getSourceImage() as HTMLImageElement;
      const texture = this.textures.createCanvas(`garden-${id}`, source.width, source.height)!;
      const context = texture.getContext();
      context.drawImage(source, 0, 0);
      const pixels = context.getImageData(0, 0, source.width, source.height);
      recolorBoard(pixels.data, source.width, id as PlayerId);
      context.putImageData(pixels, 0, 0); texture.refresh();
      this.gardens.push({
        image: this.add.image(0, 0, `garden-${id}`).setOrigin(0).setCrop(0, 0, gardenArt.width, rootStripTop),
        rootStrip: this.add.image(0, 0, `garden-${id}`).setOrigin(0).setCrop(0, rootStripTop, gardenArt.width, gardenArt.height - rootStripTop).setFlipX(id === 1),
        sprites: Array.from({ length: 9 }, () => this.add.sprite(0, 0, 'targets').setOrigin(0.5, 1).setVisible(false)),
        hitSprites: Array.from({ length: 9 }, () => this.add.sprite(0, 0, 'targets').setOrigin(0.5, 1).setDepth(2).setVisible(false)),
        dust: earthPlacements[id as PlayerId].map(() => this.add.sprite(0, 0, 'earth').setOrigin(0).setVisible(false)),
        flashes: Array.from({ length: 9 }, () => ({ until: 0, kind: 'mole' as const })),
        previous: Array.from({ length: 9 }, () => null),
      });
    }
    this.targetMarks = this.add.graphics().setDepth(3);
    this.game.canvas.dataset.boardColors = '000080,800000';
    this.game.canvas.setAttribute('aria-hidden', 'true');
    this.game.canvas.dataset.homeBackground = this.home.background.fallback;
    // Load final artwork after the playable scene is ready; a missing optional file
    // must not hold the loader or delay the countdown.
    this.load.once('filecomplete-image-home-final', () => {
      this.background.setTexture('home-final').clearTint().setAlpha(this.home.background.opacity);
      this.game.canvas.dataset.homeBackground = this.home.background.src;
      this.lastLayout = null;
    });
    this.load.image('home-final', assetUrl(this.home.background.src)).start();
  }
  private arrange(layout: ArenaLayout): void {
    const { width, height } = layout;
    const image = this.background.texture.getSourceImage();
    const scale = Math.max(width / image.width, height / image.height);
    this.background.setPosition(width / 2 + (0.5 - this.home.background.focusX) * (image.width * scale - width), height / 2 + (0.5 - this.home.background.focusY) * (image.height * scale - height)).setScale(scale);
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
      view.rootStrip.setVisible(false);
      [...view.sprites, ...view.hitSprites, ...view.dust].forEach(sprite => sprite.setVisible(false));
    });
    for (const garden of layout.gardens) {
      const view = this.gardens[garden.id];
      // A single scalar preserves the source aspect ratio for both board and targets.
      view.image.setPosition(garden.x, garden.y).setScale(garden.scale).setVisible(true);
      view.rootStrip.setPosition(garden.x, garden.y).setScale(garden.scale).setVisible(true);
      garden.holes.forEach((hole, index) => {
        for (const sprite of [view.sprites[index], view.hitSprites[index]]) sprite.setPosition(hole.feet.x, hole.feet.y).setScale(garden.scale * gardenArt.spriteScale);
      });
      view.dust.forEach((dust, index) => {
        const placement = earthPlacements[garden.id][index];
        dust.setPosition(garden.x + placement.x * garden.scale, garden.y + placement.y * garden.scale).setScale(garden.scale).setVisible(true);
      });
    }
    this.lastLayout = layout;
  }
  update(): void {
    const layout = this.getLayout();
    if (layout !== this.lastLayout) this.arrange(layout);
    const { state, events } = this.getSnapshot();
    this.targetMarks.clear();
    for (const garden of layout.gardens) {
      const view = this.gardens[garden.id];
      view.dust.forEach((dust, index) => {
        const placement = earthPlacements[garden.id][index];
        const phase = (Math.floor(state.time / (1000 / 12)) + placement.phase) % 4;
        dust.setFrame(this.reducedMotion.matches ? 0 : placement.reverse ? 3 - phase : phase);
      });
      for (const event of events.filter(item => item.id > this.lastEvent && item.player === garden.id)) {
        if (event.hole !== undefined) {
          const kind = event.targetKind ?? view.previous[event.hole];
          if (kind) view.flashes[event.hole] = { until: event.time + targetHitDuration, kind };
        }
      }
      this.updateTargets(garden.id, state.time);
      const player = state.players[garden.id];
      const activeColumns = new Set([...(player.automationUntil > state.time ? player.automationColumns : []), ...(player.sweepUntil > state.time ? player.sweepColumns : [])]);
      for (const column of activeColumns) {
        const areas = garden.holes.filter((_, index) => index % 3 === column).map(hole => hole.hit);
        const x = Math.min(...areas.map(area => area.x)), y = Math.min(...areas.map(area => area.y));
        const right = Math.max(...areas.map(area => area.x + area.width)), bottom = Math.max(...areas.map(area => area.y + area.height));
        this.targetMarks.fillStyle(0x86c99a, 0.06).fillRoundedRect(x,y,right-x,bottom-y,6*garden.scale);
        this.targetMarks.lineStyle(garden.scale,0x86c99a,0.55).strokeRoundedRect(x,y,right-x,bottom-y,6*garden.scale);
      }
      player.holes.forEach((target, index) => {
        if (!target || state.time - target.born < 180) return;
        const hole = garden.holes[index], radius = 17 * garden.scale, y = hole.feet.y - 34 * garden.scale;
        if (target.armor) {
          this.targetMarks.lineStyle(3 * garden.scale, 0xbacddd, 0.95).beginPath().arc(hole.feet.x, y, radius, Math.PI, 0).strokePath();
          for (let pip = 0; pip < target.armor; pip++) this.targetMarks.fillStyle(0xdde8e9).fillCircle(hole.feet.x + (pip - (target.armor - 1) / 2) * 9 * garden.scale, y - radius - 6 * garden.scale, 3 * garden.scale);
        }
        if (target.missBonus) this.targetMarks.lineStyle(2 * garden.scale, 0xe385eb, 0.95).strokeCircle(hole.feet.x, y, radius + 4 * garden.scale);
      });
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
        sprite.setVisible(true).setAlpha(this.getSnapshot().state.players[id].camouflageUntil > time ? 0.72 : 1).setFrame(targetFrame(target, time, this.reducedMotion.matches));
      } else sprite.setVisible(false);
      // Outgoing hit feedback must not hide or get cancelled by a new target.
      const hit = view.hitSprites[hole];
      if (flash.until > time) hit.setVisible(true).setAlpha(target ? 0.6 : 1).setFrame(hitFrame(flash.kind, targetHitDuration - (flash.until - time), this.reducedMotion.matches));
      else hit.setVisible(false);
    });
  }
}
