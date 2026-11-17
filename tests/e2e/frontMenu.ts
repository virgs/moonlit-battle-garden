import type { Page } from '@playwright/test';
export async function openMainMenu(page:Page) {
  await page.goto('/');await page.getByRole('button',{name:'Open main menu',exact:true}).click();
}
export async function openSelection(page:Page,mode:'ai'|'local'='ai') {
  await openMainMenu(page);await page.getByRole('button',{name:mode==='ai'?'Night Watch':'Garden Grudge',exact:true}).click();
}
export async function enterMatch(page:Page) {
  for(const slot of await page.locator('.character-carousel').all())if(await slot.getAttribute('data-ready')==='false')await slot.locator('.carousel-confirm').click();
  await page.getByRole('button',{name:'Enter the garden',exact:true}).click();
}
