import type { CharacterId } from '../game/types';
export const spellMotifs:Record<CharacterId,Record<number,string>>={
 champignon:{1:'mushroom-buckler',2:'broom',3:'mushroom-fortress',4:'spore-cyclone'},
 andromoss:{1:'rabbit-portal',2:'alien-hourglass',3:'star-magnet',4:'rabbit-ufo'},
 'captain-bramble':{1:'ember-buckler',2:'tin-helmet',3:'helmet-sentinel',4:'iron-briar-cage'},
 duskmantle:{1:'amethyst-rune',2:'ink-veil',3:'soul-lantern',4:'thorn-eye'},
 sprig:{1:'dewdrop-leaf',2:'working-rake',3:'garden-shears',4:'twin-cultivator'},
};
export const signatureColours:Record<CharacterId,string>={champignon:'#ed83ac',andromoss:'#65d9ea','captain-bramble':'#ed715c',duskmantle:'#b292ef',sprig:'#a7d76b'};
