import { expect,test,type Page } from '@playwright/test';
import { openSelection,chooseCharacter,enterMatch } from './frontMenu';
async function prepare(page:Page,hero:string,tier:number,mode:'local'|'ai'){
 await page.clock.install();await openSelection(page,mode);await chooseCharacter(page,'Player 1',hero);await enterMatch(page);await expect(page.locator('.player-0 .cast-button')).toBeVisible();await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())+1000));
 for(let n=0;n<650;n++){
  if((await page.locator('.player-0 .cast-button').getAttribute('aria-label'))?.includes(`(${tier} stars)`))break;
  await page.clock.runFor(100);
  for(const id of mode==='local'?[0,1]:[0]){
   const garden=page.locator(`.player-${id}`),label=await garden.locator('.cast-button').getAttribute('aria-label');
   if(label?.includes(`(${tier} stars)`))continue;
   const star=garden.locator('.hole[data-kind="star"]:enabled');if(await star.count())await star.first().click();
  }
 }
 await expect(page.locator('.player-0 .cast-button')).toHaveAccessibleName(`Cast magic (${tier} stars)`);await page.locator('.player-0 .cast-button').click();
}
test('timed column icon darkens top-down after hero casting, freezes while paused and expires',async({page})=>{
 await prepare(page,'champignon',2,'local');await expect(page.locator('.casting-scene')).toBeVisible();await expect(page.locator('.effect-sweep')).toHaveCount(0);
 await page.clock.runFor(1500);const icon=page.locator('.effect-sweep .spell-glyph');await expect(icon).toHaveAttribute('data-remaining','1');await expect(icon).toHaveAttribute('data-dark-rows','0');
 await page.clock.runFor(750);expect(Number(await icon.getAttribute('data-remaining'))).toBeCloseTo(.75,1);expect(Number(await icon.getAttribute('data-dark-rows'))).toBeCloseTo(12,0);
 await expect(icon.locator('.spell-elapsed image')).toHaveCount(1);await expect(icon.locator('clipPath rect')).toHaveAttribute('height',await icon.getAttribute('data-dark-rows') as string);
 await page.keyboard.press('Escape');const frozen=await icon.evaluate(e=>e.outerHTML);await page.clock.runFor(2000);expect(await icon.evaluate(e=>e.outerHTML)).toBe(frozen);await page.getByRole('button',{name:'Resume',exact:true}).click();
 await page.clock.runFor(2300);await expect(icon).toHaveCount(0);
});
test('single-board phone indicator shares the hidden enemy effect countdown',async({page})=>{
 await page.setViewportSize({width:390,height:844});await prepare(page,'andromoss',1,'ai');await page.clock.runFor(1500);
 const icon=page.locator('.hidden-board-effects[data-affected-player="1"] .spell-glyph[data-remaining]');await expect(icon).toHaveCount(1);await expect(icon).toHaveAttribute('data-dark-rows','0');await expect(page.locator('.player-1')).toHaveCount(0);
 const arena=page.getByRole('main',{name:'Battle arena'}),started=Number(await arena.getAttribute('data-time'));
 // Inspect before an unattended AI round can finish; hero casts freeze this deadline.
 await page.clock.runFor(400);for(let n=0;n<2&&await page.locator('.casting-scene').count();n++)await page.clock.runFor(1600);
 await expect(icon).toHaveCount(1);const elapsed=Number(await arena.getAttribute('data-time'))-started;expect(Number(await icon.getAttribute('data-remaining'))).toBeCloseTo(1-elapsed/8000,2);expect(Number(await icon.getAttribute('data-dark-rows'))).toBeGreaterThan(0);
 await page.keyboard.press('Escape');const frozen=await icon.getAttribute('data-remaining');await page.clock.runFor(1000);await expect(icon).toHaveAttribute('data-remaining',frozen!);
});
