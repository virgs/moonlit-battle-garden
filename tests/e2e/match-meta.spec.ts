import { expect, test } from '@playwright/test';
import { openSelection, enterMatch } from './frontMenu';

test('round clock follows active time and HUD clears the score bar on desktop and phones', async ({ page }) => {
  await page.clock.install();
  await openSelection(page);
  await enterMatch(page);
  await expect(page.locator('.player-0 .hole').first()).toBeEnabled({timeout:9000});
  await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())+100));
  const clock=page.getByRole('timer',{name:'Round elapsed time'});
  const start=Number(await clock.getAttribute('data-elapsed-ms'));
  await page.clock.runFor(1000);
  expect(Number(await clock.getAttribute('data-elapsed-ms'))).toBe(start+1000);
  for(const [width,height] of [[1440,900],[390,844],[320,568],[844,390]] as const) {
    await page.setViewportSize({width,height});
    await page.clock.runFor(50);
    await expect(page.locator('.match-meta .mode-icon')).toHaveAttribute('data-mode','ai');
    await expect(page.locator('.match-mode-name')).toHaveText('Night Watch');
    await expect(page.locator('.match-round-number')).toHaveText('1');
    await expect(page.locator('.match-round-number')).toHaveAttribute('aria-label','Round 1');
    expect(await clock.evaluate(element=>parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(24);
    // ResizeObserver and React commit asynchronously, independently of the mocked clock.
    await expect.poll(()=>page.evaluate(()=>{
      const meta=document.querySelector('.match-meta')!.getBoundingClientRect();
      const bar=document.querySelector('.legacy-score-art')!.getBoundingClientRect();
      return meta.x>=0&&meta.right<=innerWidth&&Math.abs(meta.x+meta.width/2-innerWidth/2)<1&&meta.bottom<=bar.top;
    })).toBe(true);
  }
  await page.getByRole('button',{name:'Pause',exact:true}).click();
  const frozen=await clock.getAttribute('data-elapsed-ms');
  await page.clock.runFor(1500);
  await expect(clock).toHaveAttribute('data-elapsed-ms',frozen!);
  await page.getByRole('button',{name:'Resume',exact:true}).click();
  await page.clock.runFor(1000);
  expect(Number(await clock.getAttribute('data-elapsed-ms'))).toBe(Number(frozen)+1000);
});
