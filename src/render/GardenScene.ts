import {ReactiveSpells} from './ReactiveSpells';
import { assetUrl } from '../assets/url';
import Phaser from 'phaser';
import type { Snapshot } from '../game/Session';
import type { PlayerId, TargetKind } from '../game/types';
import { gardenArt } from './layout';
import type { ArenaLayout } from './layout';
import type { CharacterHome } from '../game/homes';
import { earthPlacements, earthFrameSize, rootStripTop, recolorBoard } from './legacyPresentation';

import {targetShield,shieldArcs,shieldArcPixel,shieldArcGap} from './targetShield';
import { targetFrame, hitFrame, targetHitDuration, playsTargetHit } from './targetAnimation';
type GardenView = {
  image: Phaser.GameObjects.Image;
  sprites: Phaser.GameObjects.Sprite[];
  hitSprites: Phaser.GameObjects.Sprite[];
  shields:{outer:Phaser.GameObjects.Sprite;secondary:Phaser.GameObjects.Sprite;burst:Phaser.GameObjects.Sprite;hitTime:number;lastLayers:number;hitSize:number}[];
  rootStrip: Phaser.GameObjects.Image;
  dust: Phaser.GameObjects.Sprite[];
  flashes: { until: number; kind: TargetKind }[];
  previous: (TargetKind | null)[];
};

export class GardenScene extends Phaser.Scene {
  private gardens: GardenView[] = [];
  private backdrop!: Phaser.GameObjects.Graphics;
  private lastLayout: ArenaLayout | null = null;
  private lastEvent = 0;
  private shieldRound=0;
  private reactive!:ReactiveSpells;
  private background!: Phaser.GameObjects.Image;
  private reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  constructor(private getSnapshot: () => Snapshot, private getLayout: () => ArenaLayout, private home: CharacterHome) { super('gardens'); }
  preload(): void {
    ReactiveSpells.preload(this);
    this.load.image('garden', assetUrl('/assets/legacy/garden.png'));
    this.load.spritesheet('targets', assetUrl('/assets/characters.png'), { frameWidth: 90, frameHeight: 90 });
    this.load.spritesheet('earth', assetUrl('/assets/legacy/earth.png'), { frameWidth: earthFrameSize, frameHeight: earthFrameSize });
    this.load.spritesheet('shield-energy',assetUrl('/assets/effects/bramble-shield/energy-idle.png'),{frameWidth:64,frameHeight:64});
    this.load.spritesheet('shield-pop',assetUrl('/assets/effects/bramble-shield/energy-break.png'),{frameWidth:64,frameHeight:64});
    this.load.image('home', assetUrl(this.home.background.fallback));
  }
  create(): void {
    this.reactive=new ReactiveSpells(this);
    this.backdrop = this.add.graphics();
    this.background = this.add.image(0, 0, 'home').setTint(this.home.background.fallbackTint).setAlpha(this.home.background.fallbackOpacity);
    // Derive clipped textures once; the approved source pixels and animation stay intact.
    for(const [sourceKey,key,count,burst] of [['shield-energy','shield-arch',9,false],['shield-pop','shield-arch-pop',5,true]] as const){
     const source=this.textures.get(sourceKey).getSourceImage() as HTMLImageElement,texture=this.textures.createCanvas(key,source.width,source.height)!;
     const ctx=texture.getContext();ctx.drawImage(source,0,0);const pixels=ctx.getImageData(0,0,source.width,source.height);
     for(let y=0;y<source.height;y++)for(let x=0;x<source.width;x++)if(!shieldArcPixel(x%64,y,burst))pixels.data[(y*source.width+x)*4+3]=0;
     ctx.putImageData(pixels,0,0);texture.refresh();for(let frame=0;frame<count;frame++)texture.add(frame,0,frame*64,0,64,64);
    }
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
        sprites: Array.from({ length: 9 }, () => this.add.sprite(0, 0, 'targets').setOrigin(0.5, 1).setDepth(1).setVisible(false)),
        hitSprites: Array.from({ length: 9 }, () => this.add.sprite(0, 0, 'targets').setOrigin(0.5, 1).setDepth(2).setVisible(false)),
        shields:Array.from({length:9},()=>({outer:this.add.sprite(0,0,'shield-arch').setDepth(.5).setVisible(false),secondary:this.add.sprite(0,0,'shield-arch').setDepth(.5).setVisible(false),burst:this.add.sprite(0,0,'shield-arch-pop').setDepth(.5).setVisible(false),hitTime:-Infinity,lastLayers:0,hitSize:84})),
        dust: earthPlacements[id as PlayerId].map(() => this.add.sprite(0, 0, 'earth').setOrigin(0).setVisible(false)),
        flashes: Array.from({ length: 9 }, () => ({ until: 0, kind: 'mole' as const })),
        previous: Array.from({ length: 9 }, () => null),
      });
    }
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
      [...view.sprites, ...view.hitSprites, ...view.dust,...view.shields.flatMap(s=>[s.outer,s.secondary,s.burst])].forEach(sprite => sprite.setVisible(false));
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
    if(this.shieldRound!==state.round){this.gardens.forEach(v=>v.shields.forEach(s=>{s.hitTime=-Infinity;s.lastLayers=0;}));this.shieldRound=state.round;}
    for (const garden of layout.gardens) {
      const view = this.gardens[garden.id];
      view.dust.forEach((dust, index) => {
        const placement = earthPlacements[garden.id][index];
        const phase = (Math.floor(state.time / (1000 / 12)) + placement.phase) % 4;
        dust.setFrame(this.reducedMotion.matches ? 0 : placement.reverse ? 3 - phase : phase);
      });
      for(const event of events.filter(e=>e.id>this.lastEvent&&e.player===garden.id&&e.hole!==undefined&&e.kind==='shield'&&e.targetKind==='mole'&&!e.reason)){const s=view.shields[event.hole!];s.hitTime=event.time;s.hitSize=s.lastLayers>1?shieldArcs.secondarySize:shieldArcs.primarySize;s.lastLayers=Math.max(0,s.lastLayers-1);}
      for (const event of events.filter(item => item.id > this.lastEvent && item.player === garden.id)) {
        if (event.hole !== undefined && playsTargetHit(event)) {
          const kind = event.targetKind ?? view.previous[event.hole];
          if (kind) view.flashes[event.hole] = { until: event.time + targetHitDuration, kind };
        }
      }
      this.updateTargets(garden.id, state.time);
      const p=state.players[garden.id];
      garden.holes.forEach((hole,index)=>{
       const s=view.shields[index],pose=targetShield(p.holes[index],state.time,this.reducedMotion.matches,s.hitTime),size=shieldArcs.primarySize*garden.scale*pose.pulse;
       const x=hole.feet.x,y=hole.feet.y-shieldArcs.centerOffset*garden.scale*pose.reveal;
       s.outer.setVisible(pose.layers>0).setPosition(x,y).setScale(size/64*(.55+.45*pose.reveal)).setFrame(pose.frame).setAlpha(.85*pose.reveal);
       s.secondary.setVisible(pose.layers>1).setPosition(x,y).setScale(shieldArcs.secondarySize*garden.scale*pose.pulse/64*(.55+.45*pose.reveal)).setFrame((pose.frame+4)%9).setAlpha(.7*pose.reveal);
       s.burst.setVisible(pose.burst).setPosition(x,hole.feet.y-shieldArcs.centerOffset*garden.scale).setScale(s.hitSize*garden.scale/64).setFrame(pose.burstFrame);s.lastLayers=pose.layers;
      });


    }
    this.reactive.update(this.getSnapshot(),layout,this.reducedMotion.matches);
    const shields=layout.gardens.flatMap(g=>this.gardens[g.id].shields.flatMap((s,hole)=>s.outer.visible||s.burst.visible?[{player:g.id,hole,layers:s.secondary.visible?2:s.outer.visible?1:0,shape:'bottom-open-arcs',degrees:shieldArcs.degrees,bottomGap:360-shieldArcs.degrees,gap:s.secondary.visible?shieldArcGap(s.outer.scaleX*64/shieldArcs.primarySize):null,frame:s.outer.frame.name,burst:s.burst.visible,burstFrame:s.burst.frame.name,depth:s.outer.depth,targetDepth:this.gardens[g.id].sprites[hole].depth,targetAlpha:this.gardens[g.id].sprites[hole].alpha}]:[]));
    const diagnostic=JSON.stringify(shields);if(this.game.canvas.dataset.shields!==diagnostic)this.game.canvas.dataset.shields=diagnostic;
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
