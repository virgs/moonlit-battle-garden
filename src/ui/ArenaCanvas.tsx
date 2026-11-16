import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { GardenScene } from '../render/GardenScene';
import { createArenaLayout } from '../render/layout';
import type { ArenaLayout } from '../render/layout';
import type { Session, Snapshot } from '../game/Session';

export function ArenaCanvas({ session, snapshot, layout, onLayout }: {
  session: Session; snapshot: Snapshot; layout: ArenaLayout; onLayout: (layout: ArenaLayout) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const latest = useRef({ snapshot, layout });
  latest.current = { snapshot, layout };
  useEffect(() => {
    const element = host.current!;
    const game = new Phaser.Game({
      type: Phaser.AUTO, parent: element, width: element.clientWidth, height: element.clientHeight,
      backgroundColor: '#10251f', pixelArt: true, audio: { noAudio: true }, banner: false,
      scale: { mode: Phaser.Scale.NONE },
      scene: new GardenScene(() => latest.current.snapshot, () => latest.current.layout),
    });
    const resize = () => {
      const { width, height } = element.getBoundingClientRect();
      game.scale.resize(width, height);
      onLayout(createArenaLayout(width, height, session.match.options.mode));
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => { observer.disconnect(); game.destroy(true); };
  }, [session, onLayout]);
  return <div className="arena-canvas" ref={host} data-testid="arena-canvas" />;
}
