import { expect,test } from '@playwright/test';
import { openSelection,chooseCharacter,enterMatch } from './frontMenu';
for(const [hero,tier] of [['champignon',3],['captain-bramble',3],['champignon',4],['sprig',4],['duskmantle',4],['captain-bramble',4]] as const)test(`${hero} ${tier}-star simplified rules`,async({page})=>{
  test.setTimeout(60000);await page.clock.install();await openSelection(page,'local');await chooseCharacter(page,'Player 1',hero);await enterMatch(page);
  const own=page.locator('.player-0'),enemy=page.locator('.player-1');await expect(own.locator('.cast-button')).toBeVisible();await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())+1000));
  const charge=async(id:number)=>Number((await page.locator(`.player-${id} .cast-button`).getAttribute('aria-label'))!.match(/\((\d) stars\)/)![1]);
  for(let n=0;n<650;n++){
    if(await charge(0)===tier)break;
    await page.clock.runFor(100);
    for(const id of [0,1])if(await charge(id)<tier){const star=page.locator(`.player-${id} .hole[data-kind="star"]:enabled`);if(await star.count())await star.first().click();}
  }
  await expect(own.locator('.cast-button')).toHaveAccessibleName(`Cast magic (${tier} stars)`);
  await own.locator('.cast-button').click();await expect(page.locator('.cast-stars')).toHaveAttribute('data-cost',String(tier));
  if(tier===3){
    await expect(own).toHaveAttribute('data-guard-charges','5');await expect(own).toHaveAttribute('data-guard-permanent','true');await page.clock.runFor(1500);
    for(let left=4;left>=0;left--){await own.locator('.hole[data-kind="empty"]').first().dispatchEvent('pointerdown',{button:0});await expect(own).toHaveAttribute('data-guard-charges',String(left));}
  }else if(hero==='champignon'||hero==='sprig'){
    const attribute=hero==='champignon'?'data-sweep-columns':'data-automation-columns',columns=(await own.getAttribute(attribute))!.split(',').map(Number);
    expect(columns.length).toBe(hero==='champignon'?1:2);if(hero==='champignon')await expect(own).toHaveAttribute('data-guard-charges','0');
    for(let n=0;n<9;n++)if(columns.includes(n%3))await expect(own.locator('.hole').nth(n)).toHaveAttribute('data-kind','empty');
    await page.clock.runFor(1600);await expect(page.locator(hero==='champignon'?'.effect-sweep':'.effect-automation')).toBeVisible();
    const arena=page.getByRole('main',{name:'Battle arena'}),start=Number(await arena.getAttribute('data-time')),duration=hero==='champignon'?6000:4000;
    for(let n=0;n<duration/100+5 && Number(await arena.getAttribute('data-time'))-start<duration && (await arena.getAttribute('data-phase'))==='playing';n++)await page.clock.runFor(100);
    await expect(page.locator(hero==='champignon'?'.effect-sweep':'.effect-automation')).toHaveCount(0);
  }else{
    const marks=hero==='duskmantle';await expect(enemy).toHaveAttribute(marks?'data-mark-charges':'data-tin-charges',marks?'6':'3');
    if(marks)await expect(enemy).toHaveAttribute('data-mark-permanent','true');else await expect(enemy).toHaveAttribute('data-tin-hits','2');
    // The cast itself must leave existing targets unmodified; only future arrivals qualify.
    await expect(enemy.locator(marks?'.hole[data-marked="true"]':'.hole[data-armor="2"]')).toHaveCount(0);
    await page.clock.runFor(1500);let seen=false;
    for(let n=0;n<150&&!seen;n++){
      await page.clock.runFor(100);const target=enemy.locator(marks?'.hole[data-marked="true"]':'.hole[data-armor="2"]');
      if(await target.count()){seen=true;await expect(target.first()).toHaveAttribute(marks?'data-persistent-mark':'data-persistent-armor','true');await expect(target.first()).toHaveAttribute('data-kind','mole');}
    }
    expect(seen).toBe(true);
  }
});
