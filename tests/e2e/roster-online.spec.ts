import { expect,test } from '@playwright/test';
import { openMainMenu,chooseCharacter } from './frontMenu';

for(const hostHero of ['captain-bramble','andromoss','duskmantle'] as const)test(`${hostHero} and Sprig synchronize hostile effects and Tending online`,async({page,browser},info)=>{
  test.setTimeout(hostHero==='duskmantle'?90000:45000);
  const failures:string[]=[];
  page.on('pageerror',error=>failures.push(error.message));
  await openMainMenu(page);
  await page.getByRole('button',{name:'Beyond the Hedge',exact:true}).click();
  await page.getByRole('button',{name:'Create online garden',exact:true}).click();
  const invite=page.getByRole('textbox',{name:'Share this invite'});
  await expect(invite).toBeVisible();
  const context=await browser.newContext({viewport:info.project.name==='mobile'?{width:390,height:844}:{width:1280,height:900}});
  try {
    const guest=await context.newPage();guest.on('pageerror',error=>failures.push(error.message));
    await guest.goto(await invite.inputValue());
    await guest.getByRole('button',{name:'Join garden',exact:true}).click();
    await expect(guest.getByRole('button',{name:'Confirm You',exact:true})).toBeEnabled();
    await chooseCharacter(page,'You',hostHero);
    await chooseCharacter(guest,'You','sprig');
    await expect(page.locator('.carousel-side-1')).toHaveAttribute('data-character','sprig');
    await expect(guest.locator('.carousel-side-1')).toHaveAttribute('data-character',hostHero);
    await guest.getByRole('button',{name:'Confirm You',exact:true}).click();
    await page.getByRole('button',{name:'Confirm You',exact:true}).click();
    await expect(page.locator('.player-0')).toHaveAttribute('data-character',hostHero);
    await expect(guest.locator('.player-0')).toHaveAttribute('data-character','sprig');
    for(let star=0;star<(hostHero==='duskmantle'?4:2);star++) {
      const target=page.locator('.player-0 .hole[data-kind="star"]');
      await expect(target.first()).toBeEnabled({timeout:20000});
      if(hostHero==='duskmantle'){
        const other=guest.locator('.player-0 .hole[data-kind="star"]').first();await expect(other).toBeEnabled({timeout:5000});
        await Promise.all([target.first().click(),other.click()]);
      }else await target.first().click();
    }
    if(hostHero!=='duskmantle'){
      const guestStar=guest.locator('.player-0 .hole[data-kind="star"]').first();
      await expect(guestStar).toBeEnabled({timeout:20000});await guestStar.click();
    }
    await page.locator('.player-0 .cast-button').click();
    await expect(page.locator(`.cast-banner[data-character="${hostHero}"]`)).toHaveAttribute('data-asset','ready');
    await expect(guest.locator(`.cast-banner[data-character="${hostHero}"]`)).toHaveAttribute('data-asset','ready');
    if(hostHero==='captain-bramble') {
      await expect(guest.locator('.effect-armor[data-character="captain-bramble"]')).toBeVisible({timeout:7000});
      await expect(guest.locator('.player-0 .hole[data-armor="1"]').first()).toBeEnabled();
      if(info.project.name==='desktop')await expect(page.locator('.player-1 .hole[data-armor="1"]').first()).toBeVisible();
    } else if(hostHero==='duskmantle') {
      await expect(guest.locator('.player-0')).toHaveAttribute('data-mark-permanent','true');
      await expect(guest.locator('.effect-curse')).toBeVisible({timeout:7000});
      const marked=guest.locator('.player-0 .hole[data-persistent-mark="true"]');
      await expect(marked.first()).toBeEnabled({timeout:7000});
      await expect(marked.first()).toHaveAttribute('data-kind','mole');
      const left=Number(await guest.locator('.player-0').getAttribute('data-mark-charges'));expect(left).toBeLessThan(6);
      if(info.project.name==='desktop')await expect(page.locator('.player-1')).toHaveAttribute('data-mark-permanent','true');
    } else {
      await expect(guest.locator('.effect-rush')).toBeVisible({timeout:7000});
      await expect(guest.locator('.player-0')).toHaveAttribute('data-mole-rush-active','true');
      await expect(guest.locator('.player-0 .hole[data-rushed="true"]').first()).toBeEnabled({timeout:5000});
      if(info.project.name==='desktop')await expect(page.locator('.player-1')).toHaveAttribute('data-mole-rush-active','true');
    }
    if(hostHero==='duskmantle'){expect(failures).toEqual([]);return;}
    await guest.screenshot({path:info.outputPath('sprig-vs-bramble-armor.png')});
    await guest.locator('.player-0 .cast-button').click();
    await expect(page.locator('.cast-banner[data-character="sprig"]')).toBeVisible();
    await expect(guest.locator('.effect-tending')).toBeVisible({timeout:7000});
    await expect(guest.locator('.player-0')).toHaveAttribute('data-tending-active','true');
    if(info.project.name==='desktop')await expect(page.locator('.player-1')).toHaveAttribute('data-tending-active','true');
    expect(failures).toEqual([]);
  } finally {await context.close();}
});
