import { enterMatch } from './frontMenu';
import { expect, test } from '@playwright/test';

for (const [name,width,height] of [['desktop',1440,900],['phone-portrait',390,844],['small-phone',320,568],['phone-landscape',844,390]] as const) {
  test(`${name}: title, main menu and embedded online setup fit`,async({page},testInfo)=>{
    await page.setViewportSize({width,height});
    await page.goto('/');
    await page.evaluate(()=>document.fonts.ready);
    await expect(page.getByRole('main',{name:'Title screen'})).toBeVisible();
    await expect(page.locator('.title-garden')).toHaveAttribute('data-ready','true');
    await expect(page.locator('.title-garden')).toHaveAttribute('data-actor-art','pixellab');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('main',{name:'Title screen'})).toBeVisible();
    await page.screenshot({path:testInfo.outputPath(`${name}-title.png`)});
    if(testInfo.project.name==='mobile')await page.getByRole('button',{name:'Open main menu'}).tap();
    else await page.keyboard.press('Enter');
    await expect(page.getByRole('main',{name:'Main menu'})).toBeVisible();
    await expect(page.locator('.match-screen')).toHaveCount(0);await expect(page.locator('.mode-art-placeholder')).toHaveCount(0);
    await expect(page.locator('.front-nav .mode-icon')).toHaveCount(3);
    await expect(page.getByRole('button',{name:'Back to title',exact:true})).toContainText('Back to title');
    for(const option of ['Night Watch','Garden Grudge','Beyond the Hedge'])await expect(page.getByRole('button',{name:option,exact:true})).toBeInViewport();
    await expect(page.getByRole('heading',{name:'Night Watch',exact:true})).toBeVisible();
    await page.screenshot({path:testInfo.outputPath(`${name}-menu.png`)});
    await page.getByRole('button',{name:'Beyond the Hedge',exact:true}).click();
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

test('three-mode keyboard menu and pause sound preference work without shed or notes entries',async({page})=>{
 await page.goto('/');await page.keyboard.press('Enter');await expect(page.getByRole('button',{name:'Night Watch',exact:true})).toBeFocused();
 await expect(page.getByRole('button',{name:'Garden Shed',exact:true})).toHaveCount(0);await expect(page.getByRole('button',{name:'Field Notes',exact:true})).toHaveCount(0);
 await page.keyboard.press('ArrowUp');await expect(page.getByRole('button',{name:'Beyond the Hedge',exact:true})).toBeFocused();await page.keyboard.press('ArrowDown');await page.getByRole('button',{name:'Night Watch',exact:true}).click();await enterMatch(page);
 await expect(page.locator('.player-0 .hole').first()).toBeEnabled({timeout:9000});await page.keyboard.press('Escape');await page.getByRole('button',{name:'Mute',exact:true}).click();await page.getByRole('button',{name:'Quit',exact:true}).click();await expect(page.getByRole('main',{name:'Main menu'})).toBeVisible();
 await page.getByRole('button',{name:'Night Watch',exact:true}).click();await enterMatch(page);await expect(page.locator('.player-0 .hole').first()).toBeEnabled({timeout:9000});await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Unmute',exact:true})).toBeVisible();
});
