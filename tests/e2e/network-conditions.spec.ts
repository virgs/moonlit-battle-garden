import { expect, test } from '@playwright/test';
import { openMainMenu } from './frontMenu';
import { observeRtc, attachRtc } from './rtcDiagnostics';

test('delayed RTC traffic stays synchronized and a silent link recovers within grace', async ({ page, browser }, info) => {
  test.setTimeout(60_000);
  await observeRtc(page); await openMainMenu(page);
  await page.getByRole('button',{name:'Beyond the Hedge',exact:true}).click();
  await page.getByRole('button',{name:'Create online garden',exact:true}).click();
  const invite=page.getByRole('textbox',{name:'Share this invite'});
  await expect(invite).toBeVisible();
  const context=await browser.newContext({viewport:{width:390,height:844}});
  try {
    const guest=await context.newPage(); await observeRtc(guest);
    await guest.goto(await invite.inputValue());await guest.getByRole('button',{name:'Join garden',exact:true}).click();
    await expect(guest.getByRole('button',{name:'Confirm You'})).toBeEnabled();
    // 150 ms per direction at the data-channel send boundary (~300 ms extra RTT).
    for(const client of [page,guest])await client.evaluate(()=>{window.rtcTest.delayMs=150;});
    await guest.getByRole('button',{name:'Next character for You'}).click();
    await expect(page.locator('.carousel-side-1')).toHaveAttribute('data-character','andy');
    for(const client of [page,guest])await client.getByRole('button',{name:'Confirm You'}).click();
    for(const client of [page,guest]){
      await expect(client.locator('.match-screen')).toBeVisible({timeout:10_000});
      await expect(client.locator('.match-overlay')).toBeHidden({timeout:10_000});
    }
    // An empty hit is deterministic and cannot race a mole hiding during transit.
    await guest.evaluate(()=>{
      const hole=document.querySelector<HTMLButtonElement>('.player-0 .hole[data-kind="empty"]')!;
      hole.dispatchEvent(new PointerEvent('pointerdown',{button:0,bubbles:true}));
    });
    if(info.project.name==='desktop')await expect(page.locator('.player-1')).toHaveAttribute('data-score','-4');
    await expect(guest.locator('.player-0')).toHaveAttribute('data-score','-4');
    await attachRtc(guest,info,'delayed-guest-route');
    // Drop all sends while leaving RTC open: heartbeat must detect the silent link.
    for(const client of [page,guest])await client.evaluate(()=>{window.rtcTest.delayMs=0;window.rtcTest.drop=true;});
    for(const client of [page,guest])await expect(client.getByRole('heading',{name:'Reconnecting…',exact:true})).toBeVisible({timeout:12_000});
    const frozen=await page.locator('.match-screen').getAttribute('data-time');
    await page.waitForTimeout(500);
    await expect(page.locator('.match-screen')).toHaveAttribute('data-time',frozen!);
    for(const client of [page,guest])await client.evaluate(()=>{window.rtcTest.drop=false;});
    for(const client of [page,guest])await expect(client.locator('.match-overlay')).toBeHidden({timeout:12_000});
    await expect.poll(()=>page.locator('.match-screen').getAttribute('data-time')).not.toBe(frozen);
    await attachRtc(guest,info,'recovered-guest-route');
    await page.getByRole('button',{name:'Game menu',exact:true}).click();
    await page.getByRole('button',{name:'Quit',exact:true}).click();
    await expect(guest.getByRole('heading',{name:'Garden disconnected',exact:true})).toBeVisible();
  } finally { await context.close(); }
});
