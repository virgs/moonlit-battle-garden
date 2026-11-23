import { expect,it } from 'vitest';
import { keyboardAction,keyboardLayouts } from '../../src/game/controls';

it('both physical layouts target the local human in solo and online play, including numpad with Num Lock off',()=>{
 for(const mode of ['ai','online'] as const)for(const layout of keyboardLayouts){
  layout.codes.forEach((code,hole)=>expect(keyboardAction(code,mode)).toEqual({type:'hit',player:0,hole}));
  if(layout===keyboardLayouts[1])layout.codes.forEach((code,hole)=>expect(keyboardAction(code.replace('Numpad','Digit'),mode)).toEqual({type:'hit',player:0,hole}));
  expect(keyboardAction(layout.castCode,mode)).toEqual({type:'cast',player:0});
 }
});
it('keeps separate humans in local multiplayer and ignores unrelated browser keys',()=>{
 keyboardLayouts.forEach((layout,player)=>{layout.codes.forEach((code,hole)=>expect(keyboardAction(code,'local')).toEqual({type:'hit',player,hole}));expect(keyboardAction(layout.castCode,'local')).toEqual({type:'cast',player});});
 for(const code of ['Tab','Escape','ArrowUp','Space','KeyT'])expect(keyboardAction(code,'ai')).toBeNull();
});
