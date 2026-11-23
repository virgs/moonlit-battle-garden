import {expect,test} from '@playwright/test';
import {openSelection} from './frontMenu';
for(const [label,width,height] of [['desktop',1280,800],['portrait',390,844],['small',320,568],['landscape',844,390]] as const)test(`${label}: AI difficulty is a separate keyboard and touch carousel after character locks`,async({page},info)=>{
 await page.setViewportSize({width,height});await openSelection(page);await expect(page.getByRole('combobox',{name:'Difficulty'})).toHaveCount(0);
 await page.getByRole('button',{name:'Confirm Player 1'}).click();await expect(page.locator('.selected-stamp')).toHaveCount(2);await expect(page.locator('.carousel-state')).toHaveCount(0);
 await page.screenshot({path:info.outputPath(label+'-selected.png')});await page.getByRole('button',{name:'Choose difficulty',exact:true}).click();await expect(page.getByRole('main',{name:'Difficulty selection'})).toBeVisible();
 const carousel=page.locator('.difficulty-carousel');await expect(carousel).toHaveAttribute('data-difficulty','medium');await page.keyboard.press('ArrowRight');await expect(carousel).toHaveAttribute('data-difficulty','hard');await page.getByRole('button',{name:'Next difficulty',exact:true}).click();await expect(carousel).toHaveAttribute('data-difficulty','easy');
 await page.getByRole('button',{name:'medium difficulty',exact:true}).click();await page.getByRole('button',{name:'Back to characters',exact:true}).click();await expect(page.locator('.selected-stamp')).toHaveCount(2);await page.getByRole('button',{name:'Choose difficulty',exact:true}).click();await expect(carousel).toHaveAttribute('data-difficulty','medium');
 await page.screenshot({path:info.outputPath(label+'-difficulty.png')});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&document.documentElement.scrollHeight<=innerHeight)).toBe(true);
 await page.keyboard.press('Enter');await expect(page.locator('.match-screen')).toHaveAttribute('data-difficulty','medium');
});
