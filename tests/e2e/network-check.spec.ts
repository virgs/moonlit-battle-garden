import { expect, test } from '@playwright/test';

test('phone link runs gameplay and reconnect checks without any user input',async({page,browser})=>{
  test.setTimeout(50_000);
  await page.goto('./?network-check=host');
  const invite=page.getByRole('textbox',{name:'Phone test link'});
  await expect(invite).toBeVisible({timeout:10_000});
  const context=await browser.newContext({viewport:{width:390,height:844}});
  try {
    const phone=await context.newPage();await phone.goto(await invite.inputValue());
    for(const client of [page,phone])await expect(client.getByRole('main',{name:'Automatic connection check'})).toHaveAttribute('data-phase','passed',{timeout:35_000});
    for(const client of [page,phone]){
      const report=JSON.parse(await client.getByLabel('Connection report').textContent()||'{}');
      expect(report.recovery).toBe(true);
      expect(report.hits.every((count:number)=>count>=3)).toBe(true);
      expect(report.casts.every((count:number)=>count>=1)).toBe(true);
    }
  }finally{await context.close();}
});
