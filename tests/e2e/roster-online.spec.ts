import { expect,test } from '@playwright/test';
import { openMainMenu,chooseCharacter } from './frontMenu';

test('Bramble and Sprig choose new heroes online and synchronize armored targets',async({page,browser},info)=>{
  test.setTimeout(45000);
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
    await chooseCharacter(page,'You','captain-bramble');
    await chooseCharacter(guest,'You','sprig');
    await expect(page.locator('.carousel-side-1')).toHaveAttribute('data-character','sprig');
    await expect(guest.locator('.carousel-side-1')).toHaveAttribute('data-character','captain-bramble');
    await guest.getByRole('button',{name:'Confirm You',exact:true}).click();
    await page.getByRole('button',{name:'Confirm You',exact:true}).click();
    await expect(page.locator('.player-0')).toHaveAttribute('data-character','captain-bramble');
    await expect(guest.locator('.player-0')).toHaveAttribute('data-character','sprig');
    for(let star=0;star<2;star++) {
      const target=page.locator('.player-0 .hole[data-kind="star"]');
      await expect(target.first()).toBeEnabled({timeout:20000});await target.first().click();
    }
    await page.locator('.player-0 .cast-button').click();
    await expect(page.locator('.cast-banner[data-character="captain-bramble"]')).toHaveAttribute('data-asset','ready');
    await expect(guest.locator('.cast-banner[data-character="captain-bramble"]')).toHaveAttribute('data-asset','ready');
    await expect(guest.locator('.effect-armor[data-character="captain-bramble"]')).toBeVisible({timeout:7000});
    await expect(guest.locator('.player-0 .hole[data-armor="1"]').first()).toBeEnabled();
    if(info.project.name==='desktop')await expect(page.locator('.player-1 .hole[data-armor="1"]').first()).toBeVisible();
    await guest.screenshot({path:info.outputPath('sprig-vs-bramble-armor.png')});
    expect(failures).toEqual([]);
  } finally {await context.close();}
});
