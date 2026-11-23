import type { Page } from '@playwright/test';
export async function openMainMenu(page:Page) {
  await page.goto('./');await page.getByRole('button',{name:'Open main menu',exact:true}).click();
}
export async function openSelection(page:Page,mode:'ai'|'local'='ai') {
  await openMainMenu(page);await page.getByRole('button',{name:mode==='ai'?'Night Watch':'Garden Grudge',exact:true}).click();
}
export async function enterMatch(page:Page) {
  for(const slot of await page.locator('.character-carousel').all())if(await slot.getAttribute('data-ready')==='false')await slot.locator('.carousel-confirm').click();
  await page.getByRole('button',{name:'Enter the garden',exact:true}).click();
}

/** Select by identity rather than assuming a two-character carousel wrap. */
export async function chooseCharacter(page:Page,label:string,character:string) {
  if(label==='Computer'&&await page.getByRole('main',{name:'Character selection'}).getAttribute('data-step')==='player')await page.getByRole('button',{name:'Confirm Player 1',exact:true}).click();
  const next=page.getByRole('button',{name:`Next character for ${label}`,exact:true});
  const carousel=page.locator('.character-carousel').filter({has:next});
  if(await carousel.getAttribute('data-ready')==='true') await carousel.locator('.carousel-confirm').click();
  for(let n=0;n<5;n++) {
    if(await carousel.getAttribute('data-character')===character)return;
    await next.click();
  }
  throw new Error(`Character not available: ${character}`);
}
