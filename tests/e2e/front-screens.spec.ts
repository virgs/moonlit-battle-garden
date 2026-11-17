import { expect, test } from '@playwright/test';

for (const [name,width,height] of [['desktop',1440,900],['phone-portrait',390,844],['small-phone',320,568],['phone-landscape',844,390]] as const) {
  test(`${name}: title, main menu and embedded online setup fit`,async({page},testInfo)=>{
    await page.setViewportSize({width,height});
    await page.goto('/');
    await page.evaluate(()=>document.fonts.ready);
    await expect(page.getByRole('main',{name:'Title screen'})).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('main',{name:'Title screen'})).toBeVisible();
    await page.screenshot({path:testInfo.outputPath(`${name}-title.png`)});
    if(testInfo.project.name==='mobile')await page.getByRole('button',{name:'Open main menu'}).tap();
    else await page.keyboard.press('Enter');
    await expect(page.getByRole('main',{name:'Main menu'})).toBeVisible();
    await expect(page.locator('.match-screen')).toHaveCount(0);
    for(const option of ['Versus computer','Local two player','Online rival','Options','How to play'])await expect(page.getByRole('button',{name:option,exact:true})).toBeInViewport();
    await expect(page.getByRole('heading',{name:'Choose your champion'})).toBeVisible();
    await page.screenshot({path:testInfo.outputPath(`${name}-menu.png`)});
    await page.getByRole('button',{name:'Online rival',exact:true}).click();
    await expect(page.getByRole('button',{name:'Create online garden'})).toBeVisible();
    await expect(page.getByRole('button',{name:'Enter the garden'})).toHaveCount(0);
    const input=page.getByRole('textbox',{name:'Friend’s invite'});
    await input.fill('invalid invite');
    await page.getByRole('button',{name:'Join garden',exact:true}).click();
    await expect(page.getByRole('status')).toHaveText('Paste a valid garden invite link or room ID.');
    await page.locator('.front-panel').evaluate(element=>{element.scrollTop=0;});
    await page.screenshot({path:testInfo.outputPath(`${name}-online.png`)});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&document.documentElement.scrollHeight<=innerHeight)).toBe(true);
    expect(await page.locator('.front-panel').evaluate(element=>element.scrollWidth<=element.clientWidth)).toBe(true);
  });
}

test('keyboard menu navigation and sound preference survive reload and apply to matches',async({page})=>{
  await page.goto('/');await page.keyboard.press('Enter');
  await expect(page.getByRole('button',{name:'Versus computer',exact:true})).toBeFocused();
  await page.keyboard.press('ArrowUp');
  await expect(page.getByRole('heading',{name:'How to play',exact:true})).toBeVisible();
  await page.keyboard.press('ArrowUp');
  const sound=page.getByRole('checkbox',{name:'Enable sound and music'});
  await expect(sound).toBeChecked();await sound.uncheck();
  await page.reload();await page.keyboard.press('Enter');
  await page.getByRole('button',{name:'Options',exact:true}).click();await expect(sound).not.toBeChecked();
  await page.getByRole('button',{name:'Versus computer',exact:true}).click();
  await page.keyboard.press('ArrowRight');await expect(page.locator('.character-card').first()).toBeFocused();
  await page.getByRole('button',{name:'Enter the garden',exact:true}).click();
  await expect(page.locator('.player-0 .hole').first()).toBeEnabled({timeout:9000});
  await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Unmute',exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Unmute',exact:true}).click();
  await expect(page.getByRole('button',{name:'Mute',exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Quit',exact:true}).click();
  await expect(page.getByRole('main',{name:'Main menu'})).toBeVisible();
  await page.getByRole('button',{name:'Back to title'}).click();await expect(page.getByRole('main',{name:'Title screen'})).toBeVisible();
});
