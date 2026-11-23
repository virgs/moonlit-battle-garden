import { expect,test,type Page } from '@playwright/test';
import { openSelection,chooseCharacter,enterMatch } from './frontMenu';
async function prepare(page:Page,hero:string,tier:number){
  await page.clock.install();await openSelection(page,'local');await chooseCharacter(page,'Player 1',hero);await enterMatch(page);await expect(page.locator('.player-0 .cast-button')).toBeVisible();await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())+1000));
  const charge=async(id:number)=>Number((await page.locator(`.player-${id} .cast-button`).getAttribute('aria-label'))!.match(/\((\d) stars\)/)![1]);
  for(let n=0;n<650;n++){
    if(await charge(0)===tier)break;await page.clock.runFor(100);
    for(const id of [0,1])if(await charge(id)<tier){const star=page.locator(`.player-${id} .hole[data-kind="star"]:enabled`);if(await star.count())await star.first().click();}
  }
  await expect(page.locator('.player-0 .cast-button')).toHaveAccessibleName(`Cast magic (${tier} stars)`);await page.locator('.player-0 .cast-button').click();
}
test('casting dims the whole arena by50% while keeping hero and star cost above it',async({page},info)=>{
  await prepare(page,'champignon',1);
  const backdrop=page.locator('.cast-backdrop'),hero=page.locator('.casting-scene .cast-banner');await expect(backdrop).toBeVisible();await expect(hero).toBeVisible();await expect(page.locator('.casting-scene .cast-stars')).toHaveAttribute('data-cost','1');
  expect(await backdrop.evaluate(e=>getComputedStyle(e).backgroundColor)).toBe('rgba(0, 0, 0, 0.5)');
  const b=(await backdrop.boundingBox())!,v=page.viewportSize()!;expect(b).toEqual({x:0,y:0,width:v.width,height:v.height});
  expect(await page.locator('.casting-scene').evaluate(e=>getComputedStyle(e).opacity)).toBe('1');expect(await hero.evaluate(e=>getComputedStyle(e).opacity)).toBe('1');
  expect(await page.locator('.casting-scene').evaluate(e=>Number(getComputedStyle(e).zIndex))).toBeGreaterThan(await page.locator('.score-bar').evaluate(e=>Number(getComputedStyle(e).zIndex)));
  await page.screenshot({path:info.outputPath('casting-dim.png')});await page.clock.runFor(1600);await expect(backdrop).toHaveCount(0);await expect(page.locator('.effect-guard')).toBeVisible();
});
for(const [hero,tier,status,value] of [['captain-bramble',2,'armor',2],['captain-bramble',4,'armor',3],['duskmantle',4,'curse',6]] as const)test(`${hero}${tier}: future mole has attached ${status} marker`,async({page},info)=>{
  test.setTimeout(60000);await prepare(page,hero,tier);await page.clock.runFor(1600);const marker=page.locator(`[data-status="${status}"][data-affected-player="1"]`);
  for(let n=0;n<120&&!await marker.count();n++)await page.clock.runFor(100);await expect(marker.first()).toBeVisible();await expect(marker.first()).toHaveAttribute('data-value',String(value));
  const row=marker.first().locator('..'),hole=Number(await row.getAttribute('data-hole')),targetId=await row.getAttribute('data-target-id'),target=page.locator('.player-1 .hole').nth(hole);
  await expect(target).toHaveAttribute('data-kind','mole');expect(await marker.first().evaluate(e=>getComputedStyle(e).pointerEvents)).toBe('none');
  if(status==='armor'){
    await expect(marker.first().locator('.spell-glyph')).toHaveCount(0);await expect(marker.first()).toHaveText('');await expect(marker.first()).toHaveAttribute('data-layers',String(value-1));
    const box=(await marker.first().boundingBox())!,targetBox=(await target.boundingBox())!;expect(Math.abs(box.x+box.width/2-targetBox.x-targetBox.width/2)).toBeLessThan(2);expect(Math.abs(box.y-targetBox.y)).toBeLessThan(2);
  }else{await expect(marker.first().locator('.spell-glyph')).toHaveAttribute('data-outlined','true');await expect(marker.first()).toHaveText('');}
  await page.screenshot({path:info.outputPath(`${hero}-${tier}-target.png`)});
  if(status==='armor')for(let left=value-1;left>=1;left--){await target.dispatchEvent('pointerdown',{button:0});const current=page.locator(`.target-marker-group[data-target-id="${targetId}"] [data-status="armor"]`);await expect(page.locator(`.target-marker-group[data-target-id="${targetId}"] .shield-impact`)).toBeVisible();if(left===1)await expect(current).toHaveCount(0);else await expect(current).toHaveAttribute('data-layers',String(left-1));}
  await target.dispatchEvent('pointerdown',{button:0});await expect(page.locator(`.target-status-row[data-target-id="${targetId}"]`)).toHaveCount(0);
});
for(const [hero,tier,status] of [['duskmantle',3,'bonus'],['andromoss',2,'rush'],['sprig',1,'tending']] as const)test(`${hero}${tier}: target ${status} is readable during gameplay`,async({page},info)=>{
  test.setTimeout(60000);await prepare(page,hero,tier);await page.clock.runFor(1600);const marker=page.locator(`[data-status="${status}"]`);for(let n=0;n<100&&!await marker.count();n++)await page.clock.runFor(100);
  await expect(marker.first()).toBeVisible();if(status==='bonus')await expect(marker.first()).toHaveText('');await page.screenshot({path:info.outputPath(`${status}-target.png`)});
});
