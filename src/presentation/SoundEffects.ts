import { assetUrl } from '../assets/url';
import { soundContext } from './audioGesture';
import { presentation } from './config';
import { soundFiles } from './soundFiles';
import type { GameEvent } from '../game/types';
import type { Snapshot } from '../game/Session';

const path = (file: string) => `/assets/sfx/${file}`;

type Cue = keyof typeof soundFiles;
const volumes: Record<Cue, number> = { pop:.12, hit:.24, impact:.14, rabbit:.25, starAppear:.18, star:.25, wrong:.2, cast:.25, sweep:.2, end:.3 };

/** Cosmetic variation never consumes gameplay RNG. Native Web Audio supports overlapping short effects. */
export class SoundEffects {
  private context = soundContext();
  private buffers = new Map<string, Promise<AudioBuffer | null>>();
  private sources = new Set<AudioBufferSourceNode>();
  private fallback = new Map<string, HTMLAudioElement[]>();
  private counts = new Map<string, number>();
  private targets = new Set<number>();
  private lastEvent = 0;
  private phase: Snapshot['state']['phase'] | null = null;
  private generation = 0;
  private muted = false;
  private disposed = false;

  private buffer(src: string): Promise<AudioBuffer | null> {
    if (!this.buffers.has(src)) this.buffers.set(src, fetch(assetUrl(src)).then(response => response.ok ? response.arrayBuffer() : Promise.reject())
      .then(bytes => this.context!.decodeAudioData(bytes)).catch(() => null));
    return this.buffers.get(src)!;
  }
  preload(): void {
    if (this.context) for (const files of Object.values(soundFiles)) for (const file of files) void this.buffer(path(file));
  }
  private playFile(src: string, volume: number): void {
    if (this.muted || this.disposed) return;
    const generation = this.generation;
    if (this.context) {
      void this.buffer(src).then(buffer => {
        if (!buffer || this.muted || this.disposed || generation !== this.generation) return;
        // Never replay a backlog after autoplay blocking; the next gesture can resume audio.
        if (this.context!.state !== 'running') return;
        if (this.sources.size >= 12) { const oldest = this.sources.values().next().value; oldest?.stop(); this.sources.delete(oldest!); }
        const voice = this.context!.createBufferSource(), gain = this.context!.createGain();
        gain.gain.value = volume; voice.buffer = buffer;
        voice.connect(gain); gain.connect(this.context!.destination);
        voice.onended = () => { this.sources.delete(voice); voice.disconnect(); gain.disconnect(); };
        this.sources.add(voice); voice.start();
      });
    } else {
      const pool = this.fallback.get(src) ?? [];
      let audio = pool.find(item => item.paused);
      if (!audio && pool.length < 3) { audio = new Audio(assetUrl(src)); pool.push(audio); this.fallback.set(src, pool); }
      audio ??= pool[0]; audio.volume = volume; audio.currentTime = 0;
      void audio.play().catch(() => {});
    }
  }
  private play(cue: Cue): void {
    const count = this.counts.get(cue) ?? 0; this.counts.set(cue, count + 1);
    const choices = soundFiles[cue]; this.playFile(path(choices[count % choices.length]), volumes[cue]);
  }
  sync(snapshot: Snapshot): void {
    const { state, events } = snapshot;
    const current = new Set<number>(); let pop = false, starAppear = false;
    for (const player of state.players) for (const target of player.holes) if (target) {
      current.add(target.id);
      if (!this.targets.has(target.id)) { if (target.kind === 'star') starAppear = true; else pop = true; }
    }
    this.targets = current;
    // Coalesce simultaneous target offers, as the original browser SoundManager did.
    if (pop) this.play('pop'); if (starAppear) this.play('starAppear');
    for (const event of events.filter(item => item.id > this.lastEvent)) this.event(event, snapshot);
    this.lastEvent = events.at(-1)?.id ?? this.lastEvent;
    if (state.phase === 'match-over' && this.phase !== 'match-over') this.play('end');
    this.phase = state.phase;
  }
  private event(event: GameEvent, snapshot: Snapshot): void {
    if (event.kind === 'hit') { this.play('hit'); this.play('impact'); }
    if (event.kind === 'star') this.play('star');
    if (event.kind === 'penalty' || event.kind === 'shield') {
      if (event.targetKind === 'rabbit') { this.play('rabbit'); this.play('impact'); }
      else if (event.reason === 'empty') this.play('wrong');
    }
    if (event.kind === 'cast') {
      const character = snapshot.state.players[event.player].character;
      const clip = event.tier ? presentation[character].casts[event.tier] : null;
      if (clip?.sound) this.playFile(clip.sound, .3); else this.play('cast');
      if (character === 'champignon' && (event.tier === 2 || event.tier === 4)) this.play('sweep');
    }
  }
  setMuted(muted: boolean): void { this.muted = muted; if (muted) this.silence(); }
  silence(): void {
    this.generation++;
    this.sources.forEach(source => source.stop()); this.sources.clear();
    this.fallback.forEach(pool => pool.forEach(audio => audio.pause()));
  }
  dispose(): void { this.disposed = true; this.silence(); }
}
