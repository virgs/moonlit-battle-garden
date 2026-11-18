import { expect,it } from 'vitest';
import { selectionView,validPick,validPicks,type LobbyPicks } from '../../src/network/selection';
it('validates network picks and readiness before applying them',()=>{
  expect(validPick({character:'andromoss',ready:true})).toBe(true);
  for(const value of [null,{}, {character:'andy',ready:true}, {character:'nightshade',ready:true}, {character:'unknown',ready:true},{character:'andromoss',ready:'yes'}])expect(validPick(value)).toBe(false);
  expect(validPicks([{character:'champignon',ready:false},null])).toBe(true);
  expect(validPicks([{character:'andromoss',ready:false}])).toBe(false);
});
it('maps both live character choices to local-first carousels without mutating the host picks',()=>{
  const picks:LobbyPicks=[{character:'champignon',ready:false},{character:'andromoss',ready:true}];
  const guest=selectionView(picks,1,true,'andromoss');
  expect(guest.players).toEqual([picks[1],picks[0]]);
  guest.players[0].ready=false;expect(picks[1]?.ready).toBe(true);
  expect(selectionView(picks,0,true,'champignon').players).toEqual(picks);
});
it('keeps an explicit second slot while waiting or reconnecting',()=>{
  const view=selectionView([{character:'champignon',ready:false},null],1,false,'andromoss');
  expect(view.players).toEqual([{character:'andromoss',ready:false},null]);expect(view.connected).toBe(false);
});
