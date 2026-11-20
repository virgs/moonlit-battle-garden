import { expect,test } from '@playwright/test';
import { openSelection,chooseCharacter,enterMatch } from './frontMenu';
for(const tier of [1,2,3,4])test(`Andromoss ${tier}-star effect uses its new role on the HUD and actual targets`,async({page})=>{
  test.setTimeout(60000);await page.clock.install();await openSelection(page,'local');await chooseCharacter(page,'Player 1','andromoss');await enterMatch(page);
  await expect(page.locator('.player-0 .cast-button')).toBeVisible();await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())+100));
  const own=page.locator('.player-0'),enemy=page.locator('.player-1');
  const stars=async(id:number)=>Number((await page.locator(`.player-${id} .cast-button`).getAttribute('aria-label'))!.match(/\((\d) stars\)/)![1]);
  for(let n=0;n<650;n++){
    if(await stars(0)===tier && (tier!==3||await stars(1)===4))break;
    await page.clock.runFor(100);
    for(const id of [0,1])if(await stars(id)<(id===0?tier:tier===3?4:tier)){
      const star=page.locator(`.player-${id} .hole[data-kind="star"]:enabled`);if(await star.count())await star.first().click();
    }
  }
  await expect(own.locator('.cast-button')).toHaveAccessibleName(`Cast magic (${tier} stars)`);
  await own.locator('.cast-button').click();await expect(page.locator('.cast-stars')).toHaveAttribute('data-cost',String(tier));
  if(tier===3){
    await expect(enemy.locator('.cast-button')).toHaveAccessibleName('Cast magic (0 stars)');
    await expect(own.locator('.cast-button')).toHaveAccessibleName('Cast magic (4 stars)');
  }else{
    await expect(enemy).toHaveAttribute('data-rabbit-pressure',tier===2?'0':String(tier));
    await expect(enemy).toHaveAttribute('data-mole-rush-active',tier===1?'false':'true');
    await page.clock.runFor(1600);
    if(tier===1||tier===4){
      const rabbit=enemy.locator('.hole[data-origin="magic"][data-kind="rabbit"]');
      for(let n=0;n<30&&!await rabbit.count();n++)await page.clock.runFor(100);
      await expect(rabbit.first()).toHaveAttribute('data-rushed','false');await expect(enemy.locator('.hole[data-origin="magic"][data-kind="mole"]')).toHaveCount(0);
    }
    if(tier===2||tier===4){
      const rushed=enemy.locator('.hole[data-rushed="true"]');
      for(let n=0;n<30&&!await rushed.count();n++)await page.clock.runFor(100);
      await expect(rushed.first()).toHaveAttribute('data-kind','mole');await expect(page.locator('.effect-rush')).toBeVisible();
    }
  }
});
