import { expect,test } from '@playwright/test';
import { openSelection,enterMatch,chooseCharacter } from './frontMenu';

test('two-star Clean Sweep marks one column for three seconds or until round end',async({page},info)=>{
  await page.clock.install();await openSelection(page,'local');await enterMatch(page);
  await expect(page.locator('.player-0 .cast-button')).toBeVisible();
  await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())+100));
  const garden=page.locator('.player-0');
  for(let stars=0;stars<2;stars++) {
    for(let n=0;n<250&&!await garden.locator('.hole[data-kind="star"]:enabled').count();n++)await page.clock.runFor(100);
    await garden.locator('.hole[data-kind="star"]').first().click();
  }
  await garden.locator('.cast-button').click();
  await expect(page.locator('.cast-stars')).toHaveAttribute('data-cost','2');
  await page.clock.runFor(1600);
  const arena=page.getByRole('main',{name:'Battle arena'});
  if((await arena.getAttribute('data-phase'))!=='playing'){await expect(page.getByRole('region',{name:'Round result'})).toBeVisible();return;}
  await expect(page.locator('.effect-sweep')).toBeVisible();
  await expect(garden).toHaveAttribute('data-sweep-columns',/^[0-2]$/);
  await page.clock.runFor(2000);
  if((await arena.getAttribute('data-phase'))!=='playing'){await expect(page.getByRole('region',{name:'Round result'})).toBeVisible();return;}
  await expect(page.locator('.effect-sweep')).toBeVisible();

  const boardBounds=await garden.boundingBox(),effectBounds=await page.locator('.effect-sweep').boundingBox();
  expect(effectBounds!.width).toBeLessThan(boardBounds!.width/2);
  await page.screenshot({path:info.outputPath('lasting-clean-sweep.png')});
  await page.clock.runFor(1000);await expect(page.locator('.effect-sweep')).toHaveCount(0);
});

test('Sprig can cast four-star automation with exactly two active columns',async({page},info)=>{
  test.setTimeout(60000);
  await page.clock.install();await openSelection(page,'local');await chooseCharacter(page,'Player 1','sprig');await enterMatch(page);
  await expect(page.locator('.player-0 .cast-button')).toBeVisible();
  await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())+100));
  const garden=page.locator('.player-0');
  for(let n=0;n<900;n++) {
    if((await garden.locator('.cast-button').getAttribute('aria-label'))?.includes('(4 stars)'))break;
    await page.clock.runFor(100);
    for(const id of [0,1]) {
      const star=page.locator(`.player-${id} .hole[data-kind="star"]:enabled`);
      if(await star.count())await star.first().click();
    }
  }
  await expect(garden.locator('.cast-button')).toHaveAccessibleName('Cast magic (4 stars)');
  await garden.locator('.cast-button').click();
  await expect(page.locator('.cast-stars')).toHaveAttribute('data-cost','4');
  await page.clock.runFor(1600);
  await expect(garden).toHaveAttribute('data-automation-columns',/^[0-2],[0-2]$/);
  const columns=(await garden.getAttribute('data-automation-columns'))!.split(',');expect(new Set(columns).size).toBe(2);
  await expect(page.locator('.effect-automation')).toBeVisible();
  await page.screenshot({path:info.outputPath('clockwork-two-columns.png')});
  await page.getByRole('button',{name:'Pause',exact:true}).click();
  await page.clock.runFor(1000);await expect(garden).toHaveAttribute('data-automation-columns',columns.join(','));
});

test('Sprig one-star Tending shows a six-second aura and freezes it during pause',async({page})=>{
  await page.clock.install();await openSelection(page,'local');await chooseCharacter(page,'Player 1','sprig');await enterMatch(page);
  await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())+100));
  const garden=page.locator('.player-0');
  for(let n=0;n<150&&!await garden.locator('.hole[data-kind="star"]:enabled').count();n++)await page.clock.runFor(100);
  await garden.locator('.hole[data-kind="star"]').first().click();await garden.locator('.cast-button').click();
  await expect(page.locator('.cast-stars')).toHaveAttribute('data-cost','1');await page.clock.runFor(1600);
  await expect(garden).toHaveAttribute('data-tending-active','true');await expect(page.locator('.effect-tending')).toBeVisible();
  await page.clock.runFor(1000);await page.getByRole('button',{name:'Pause',exact:true}).click();
  await page.clock.runFor(4000);await expect(garden).toHaveAttribute('data-tending-active','true');
  await page.getByRole('button',{name:'Resume',exact:true}).click();await page.clock.runFor(3600);
  await expect(garden).toHaveAttribute('data-tending-active','true');
  await page.clock.runFor(1500);
  await expect(garden).toHaveAttribute('data-tending-active','false');await expect(page.locator('.effect-tending')).toHaveCount(0);
});

test('Tin Caps arms three future moles and synchronizes their permanent extra hit with the HUD',async({page})=>{
  await page.clock.install();await openSelection(page,'local');await chooseCharacter(page,'Player 1','captain-bramble');await enterMatch(page);
  await expect(page.locator('.player-0 .cast-button')).toBeVisible();
  await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())+100));
  const caster=page.locator('.player-0'),enemy=page.locator('.player-1');
  for(let stars=0;stars<2;stars++) {
    for(let n=0;n<250&&!await caster.locator('.hole[data-kind="star"]:enabled').count();n++)await page.clock.runFor(100);
    await caster.locator('.hole[data-kind="star"]').first().click();
  }
  await caster.locator('.cast-button').click();
  await expect(enemy).toHaveAttribute('data-tin-charges','3');await page.clock.runFor(1600);
  const seen=new Set<string>();let activated=true;
  for(let n=0;n<120;n++) {
    await page.clock.runFor(100);
    const remaining=Number(await enemy.getAttribute('data-tin-charges'));
    if(remaining>0)activated=true;
    for(const t of await enemy.locator('.hole[data-armor="1"]').all()) {
      await expect(t).toHaveAttribute('data-kind','mole');await expect(t).toHaveAttribute('data-persistent-armor','true');
      seen.add((await t.getAttribute('data-born'))+':'+await t.getAttribute('data-key'));
    }
    if(activated&&remaining===0)break;
  }
  expect(activated).toBe(true);expect(seen.size).toBe(3);await expect(enemy).toHaveAttribute('data-tin-charges','0');
});

for(const hero of ['champignon','captain-bramble'] as const)test(`${hero} one-star guard shows two permanent charges and disappears after two mistakes`,async({page})=>{
  await page.clock.install();await openSelection(page,'local');await chooseCharacter(page,'Player 1',hero);await enterMatch(page);
  await expect(page.locator('.player-0 .cast-button')).toBeVisible();
  await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())+100));
  const garden=page.locator('.player-0');
  for(let stars=0;stars<1;stars++){
    const star=garden.locator('.hole[data-kind="star"]:enabled');
    for(let n=0;n<250&&!await star.count();n++)await page.clock.runFor(100);
    await star.first().click();
  }
  await garden.locator('.cast-button').click();
  await expect(garden).toHaveAttribute('data-guard-charges','2');await expect(garden).toHaveAttribute('data-guard-permanent','true');
  await page.clock.runFor(1500);await expect(page.locator('.effect-guard')).toBeVisible();
  await expect(garden).toHaveAttribute('data-guard-charges','2');
  for(const remaining of [1,0]){
    await garden.locator('.hole[data-kind="empty"]').first().dispatchEvent('pointerdown',{button:0});await expect(garden).toHaveAttribute('data-guard-charges',String(remaining));
  }
  await expect(page.locator('.effect-guard')).toHaveCount(0);
});

test('Helping Tines immediately clears one column and intercepts for four gameplay seconds or until round end',async({page})=>{
  await page.clock.install();await openSelection(page,'local');await chooseCharacter(page,'Player 1','sprig');await enterMatch(page);
  await expect(page.locator('.player-0 .cast-button')).toBeVisible();
  await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())+100));
  const garden=page.locator('.player-0');
  for(let stars=0;stars<2;stars++){
    const star=garden.locator('.hole[data-kind="star"]:enabled');
    for(let n=0;n<250&&!await star.count();n++)await page.clock.runFor(100);
    await star.first().click();
  }
  await garden.locator('.cast-button').click();await expect(page.locator('.cast-stars')).toHaveAttribute('data-cost','2');
  const column=Number(await garden.getAttribute('data-automation-columns'));expect([0,1,2]).toContain(column);
  for(const hole of [column,column+3,column+6])await expect(garden.locator('.hole').nth(hole)).toHaveAttribute('data-kind','empty');
  const arena=page.getByRole('main',{name:'Battle arena'}),started=Number(await arena.getAttribute('data-time'));
  await page.clock.runFor(1500);
  let finished=false;
  for(let n=0;n<45;n++) {
    const phase=await arena.getAttribute('data-phase'),elapsed=Number(await arena.getAttribute('data-time'))-started;
    if(phase==='round-over'||phase==='match-over'){finished=true;break;}
    if(elapsed>=4000)break;
    await expect(garden).toHaveAttribute('data-automation-columns',String(column));
    await expect(page.locator('.effect-automation')).toBeVisible();
    for(const hole of [column,column+3,column+6])await expect(garden.locator('.hole').nth(hole)).toHaveAttribute('data-kind','empty');
    await page.clock.runFor(100);
  }
  if(finished) {
    await expect(arena).toHaveAttribute('data-phase',/^(round-over|match-over)$/);
  } else {
    expect(Number(await arena.getAttribute('data-time'))-started).toBeGreaterThanOrEqual(4000);
    await expect(garden).toHaveAttribute('data-automation-columns','');
  }
  await expect(page.locator('.effect-automation')).toHaveCount(0);
});
