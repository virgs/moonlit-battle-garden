import {expect,test,type Page} from '@playwright/test';
import type {ReactiveReview} from '../fixtures/reactive-spells';
type Actor={kind:string;player:number;texture:string;frame:number;depth:number;alpha:number};
const actors=async(page:Page):Promise<Actor[]>=>JSON.parse((await page.locator('.arena-canvas canvas').getAttribute('data-reactive-spells'))??'[]');
const fire=async(page:Page,action:Parameters<ReactiveReview['fire']>[0])=>{await page.evaluate(action=>(window as unknown as {reactiveReview:ReactiveReview}).reactiveReview.fire(action),action);await page.clock.runFor(25);};
async function open(page:Page,sample:string){await page.clock.install();await page.clock.pauseAt(new Date());await page.goto('/tests/fixtures/reactive-spells.html?case='+sample+(page.viewportSize()!.width<700?'&mode=ai':''));await page.waitForLoadState('networkidle');await page.clock.runFor(100);await expect(page.locator('.arena-canvas canvas')).toBeVisible();}
for(const [sample,kind]of [['champ1','guardian'],['champ3','guardian'],['bramble1','guardian'],['bramble3','guardian'],['pressure1','rabbit-portal'],['pressure4','rabbit-portal'],['rush','shortened-mole'],['curse1','marked-mole'],['curse4','marked-mole'],['veil','veiled-target'],['bonus','bonus-mole'],['tending','extended-target'],['theft','stolen-star'],['theft-empty','empty-theft'],['theft-opponent','stolen-star'],['theft-opponent-empty','empty-theft']] as const)test(`${sample} uses live animated raster actors rather than target badges`,async({page})=>{
 await open(page,sample);let effects=await actors(page);expect(effects.some(a=>a.kind===kind)).toBe(true);expect(effects.every(a=>a.texture==='targets'||a.texture.startsWith('reactive-'))).toBe(true);await expect(page.locator('.target-status svg,.target-status img')).toHaveCount(0);
 if(sample.startsWith('champ')||sample.startsWith('bramble')){expect(effects.filter(a=>a.kind==='guardian')).toHaveLength(sample.endsWith('3')?5:2);await fire(page,'block');effects=await actors(page);expect(effects.some(a=>a.kind==='guard-intercept')).toBe(true);expect(effects.filter(a=>a.kind==='guardian')).toHaveLength(sample.endsWith('3')?4:1);}
 if(sample.startsWith('curse')){await fire(page,'miss');expect((await actors(page)).some(a=>a.kind==='curse-snap')).toBe(true);}
 if(sample==='bonus'){await fire(page,'strike');expect((await actors(page)).some(a=>a.kind==='soul-reward')).toBe(true);}
 if(sample==='veil'){await fire(page,'strike');expect((await actors(page)).some(a=>a.kind==='veil-part')).toBe(true);}
 for(const a of effects.filter(a=>['marked-mole','shortened-mole','extended-target','veiled-target'].includes(a.kind)))expect(a.depth).toBeLessThan(1);
});
test('cleansing removes real hostile marks/mist and the next hostile spell consumes the living ward',async({page})=>{
 await open(page,'ward');expect((await actors(page)).some(a=>a.kind==='marked-mole')).toBe(true);expect((await actors(page)).some(a=>a.kind==='veil-mist')).toBe(true);await fire(page,'cleanse');let effects=await actors(page);expect(effects.some(a=>a.kind==='cleanse-wave')).toBe(true);expect(effects.some(a=>a.kind==='living-ward')).toBe(true);expect(effects.some(a=>a.kind==='marked-mole'||a.kind==='veil-mist')).toBe(false);await page.clock.runFor(900);await fire(page,'incoming');expect((await actors(page)).some(a=>a.kind==='living-ward')).toBe(true);await page.clock.runFor(700);expect((await actors(page)).some(a=>a.kind==='living-ward')).toBe(false);
});
test('native actors animate, freeze on pause/cast and remain still with reduced motion',async({page})=>{
 await open(page,'champ1');const before=(await actors(page)).filter(a=>a.kind==='guardian').map(a=>a.frame);await page.clock.runFor(150);expect((await actors(page)).filter(a=>a.kind==='guardian').map(a=>a.frame)).not.toEqual(before);await page.keyboard.press('Escape');await page.clock.runFor(25);const frozen=await actors(page);await page.clock.runFor(400);expect(await actors(page)).toEqual(frozen);await page.getByRole('button',{name:'Resume',exact:true}).click();await page.emulateMedia({reducedMotion:'reduce'});await page.clock.runFor(25);const still=await actors(page);await page.clock.runFor(150);expect(await actors(page)).toEqual(still);await page.emulateMedia({reducedMotion:'no-preference'});await fire(page,'begin-cast');const held=await actors(page);await page.clock.runFor(500);expect(await actors(page)).toEqual(held);await page.clock.runFor(1050);expect((await actors(page)).filter(a=>a.kind==='guardian')).toHaveLength(5);
});

test('an opponent ward block has visible feedback even when its garden is hidden',async({page})=>{
 await open(page,'ward-opponent');await fire(page,'incoming');const effects=await actors(page);expect(effects.some(a=>a.player===1&&a.kind===(page.viewportSize()!.width<700?'hidden-ward-block':'living-ward'))).toBe(true);await page.clock.runFor(700);expect((await actors(page)).some(a=>a.player===1&&(a.kind==='hidden-ward-block'||a.kind==='living-ward'))).toBe(false);
});

test('dedicated guard and curse finishers advance actual sprite frames then disappear',async({page})=>{
 await open(page,'bramble1');await fire(page,'block');await page.clock.runFor(600);const first=(await actors(page)).find(a=>a.kind==='guard-finish')!;expect(first.texture).toBe('reactive-thorn-finish');await page.clock.runFor(150);expect((await actors(page)).find(a=>a.kind==='guard-finish')!.frame).not.toBe(first.frame);await page.clock.runFor(400);expect((await actors(page)).some(a=>a.kind==='guard-finish')).toBe(false);
 await open(page,'curse4');await fire(page,'miss');expect((await actors(page)).find(a=>a.kind==='curse-snap')!.texture).toBe('reactive-curse-finish');
});
test('overlapping real spells and a labelled synthetic overload retain primary target cues and accessible touch controls',async({page})=>{
 for(const sample of ['overlap','overload']){await open(page,sample);const a=await actors(page);expect(a.find(a=>a.kind==='marked-mole')!.alpha).toBe(.9);expect(a.find(a=>a.kind==='extended-target')!.alpha).toBe(.55);expect(a.filter(a=>a.kind==='veiled-target').every(a=>a.alpha===.14)).toBe(true);
  if(sample==='overload'){await expect(page.locator('html')).toHaveAttribute('data-review-scenario','synthetic-overload');const shields=JSON.parse((await page.locator('.arena-canvas canvas').getAttribute('data-shields'))!);expect(shields[0]).toMatchObject({layers:2,targetAlpha:.72,targetDepth:1});expect(a.find(a=>a.kind==='shortened-mole')!.depth).toBeLessThan(.5);}
  const targets=await page.locator('.player-0 .hole').evaluateAll(elements=>elements.map(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height};}));for(const r of targets){expect(r.w).toBeGreaterThanOrEqual(44);expect(r.h).toBeGreaterThanOrEqual(44);expect(r.x).toBeGreaterThanOrEqual(0);expect(r.y).toBeGreaterThanOrEqual(0);}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
});
