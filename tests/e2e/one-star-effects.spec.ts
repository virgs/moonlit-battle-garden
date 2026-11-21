import { expect,test } from '@playwright/test';
import { openSelection,chooseCharacter,enterMatch } from './frontMenu';

for(const hero of ['champignon','captain-bramble','andromoss','duskmantle','sprig'] as const)test(`${hero} one-star gameplay loop is readable, frozen by pause and click-through`,async({page})=>{
  test.setTimeout(60000);await page.clock.install();await openSelection(page,'local');await chooseCharacter(page,'Player 1',hero);await enterMatch(page);
  await expect(page.locator('.player-0 .cast-button')).toBeVisible();await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())+1000));
  const own=page.locator('.player-0');
  for(let n=0;n<250&&!await own.locator('.hole[data-kind="star"]:enabled').count();n++)await page.clock.runFor(100);
  await own.locator('.hole[data-kind="star"]:enabled').first().click();await own.locator('.cast-button').click();
  await expect(page.locator('.cast-stars')).toHaveAttribute('data-cost','1');await expect(page.locator('.one-star-effect')).toHaveCount(0);
  await page.clock.runFor(1600);
  const effect=page.locator(`.one-star-effect[data-character="${hero}"]`),sprites=effect.locator('.one-star-sprite');
  if(hero==='duskmantle')for(let n=0;n<100&&!await sprites.count();n++)await page.clock.runFor(100);
  await expect(effect).toBeVisible();await expect(sprites.first()).toHaveAttribute('data-asset','ready');
  expect(await effect.evaluate(element=>getComputedStyle(element).pointerEvents)).toBe('none');
  await expect(effect).toHaveAttribute('data-affected-player',hero==='andromoss'||hero==='duskmantle'?'1':'0');
  const geometry=await sprites.first().boundingBox();expect(geometry!.width).toBeCloseTo(geometry!.height,1);
  await expect(page.locator('.effect-impact[data-tier="1"]')).toHaveCount(0);
  if(hero==='champignon'||hero==='captain-bramble'){
    await expect(sprites).toHaveCount(2);
    const glyphs=await sprites.evaluateAll(elements=>elements.map(element=>{const r=element.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};}));
    const holes=await own.locator('.hole').evaluateAll(elements=>elements.map(element=>{const r=element.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};}));
    for(const glyph of glyphs)for(const hole of holes)expect(glyph.x+glyph.width<=hole.x||glyph.x>=hole.x+hole.width||glyph.y+glyph.height<=hole.y||glyph.y>=hole.y+hole.height).toBe(true);
    const first=await sprites.first().getAttribute('data-frame');await page.clock.runFor(200);expect(await sprites.first().getAttribute('data-frame')).not.toBe(first);
    await page.keyboard.press('Escape');const frozen=await sprites.first().getAttribute('data-frame');await page.clock.runFor(2000);await expect(sprites.first()).toHaveAttribute('data-frame',frozen!);await page.getByRole('button',{name:'Resume',exact:true}).click();
    const remaining=Number(await own.getAttribute('data-guard-charges'));
    for(let left=remaining;left>0;left--){await own.locator('.hole[data-kind="empty"]').first().dispatchEvent('pointerdown',{button:0});await expect(sprites).toHaveCount(left-1);}
    await expect(effect).toHaveCount(0);
  }else if(hero==='duskmantle'){
    const marked=page.locator('.player-1 .hole[data-marked="true"]');await expect(marked.first()).toBeEnabled();
    const hole=await marked.first().boundingBox(),marker=await sprites.first().boundingBox();expect(Math.abs((marker!.x+marker!.width/2)-(hole!.x+hole!.width/2))).toBeLessThan(2);
    await marked.first().dispatchEvent('pointerdown',{button:0});await expect(effect.locator('.one-star-sprite')).toHaveCount(0);
  }else{
    const arena=page.getByRole('main',{name:'Battle arena'}),start=Number(await arena.getAttribute('data-time')),duration=hero==='andromoss'?8000:6000;
    for(let n=0;n<duration/100+5 && Number(await arena.getAttribute('data-time'))-start<duration && await arena.getAttribute('data-phase')==='playing';n++)await page.clock.runFor(100);
    await expect(effect).toHaveCount(0);
  }
  await expect(page.locator('.hidden-board-effects')).toHaveCount(0);
});

for(const viewport of [{width:390,height:844},{width:844,height:390}])test(`hidden opponent uses the same one-star sprite beside its portrait ${viewport.width}x${viewport.height}`,async({page})=>{
  test.setTimeout(60000);await page.setViewportSize(viewport);await page.clock.install();await openSelection(page);await chooseCharacter(page,'Player 1','andromoss');await chooseCharacter(page,'Computer','sprig');await enterMatch(page);
  await expect(page.locator('.player-0 .cast-button')).toBeVisible();await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())+1000));
  const own=page.locator('.player-0');for(let n=0;n<250&&!await own.locator('.hole[data-kind="star"]:enabled').count();n++)await page.clock.runFor(100);
  await own.locator('.hole[data-kind="star"]:enabled').first().click();await own.locator('.cast-button').click();await page.clock.runFor(1600);
  await expect(page.locator('.player-1')).toHaveCount(0);
  const indicator=page.locator('.hidden-board-effects[data-affected-player="1"] .hidden-board-effect[data-effect="invasion"]');
  await expect(indicator).toBeVisible();await expect(indicator.locator('.one-star-sprite')).toHaveAttribute('data-asset','ready');
  await expect(indicator.locator('.one-star-sprite')).toHaveAttribute('data-character','andromoss');await expect(indicator).toHaveAccessibleName('1-star enemy rabbit pressure');
  const box=(await indicator.boundingBox())!;expect(box.x).toBeGreaterThanOrEqual(0);expect(box.y).toBeGreaterThanOrEqual(0);expect(box.x+box.width).toBeLessThanOrEqual(viewport.width);expect(box.y+box.height).toBeLessThanOrEqual(viewport.height);
  await page.emulateMedia({reducedMotion:'reduce'});await page.clock.runFor(100);await expect(indicator.locator('.one-star-sprite')).toHaveAttribute('data-frame','0');
});
