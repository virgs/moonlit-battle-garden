import { expect, test } from '@playwright/test';

test('two browsers join a real WebRTC match, map local sides, sync inputs and pause, and handle leaving', async ({ browser, page }, testInfo) => {
  test.setTimeout(45000);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.getByRole('button', { name: 'Online rival' }).click();
  await page.getByRole('button', { name: /Enter the garden/ }).click();
  await page.getByRole('button', { name: 'Create online garden' }).click();
  const invite = page.getByRole('textbox', { name: 'Share this invite' });
  await expect(invite).toBeVisible({ timeout: 12000 });
  const inviteUrl = await invite.inputValue();
  const context = await browser.newContext({ viewport: testInfo.project.name === 'mobile' ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  const guest = await context.newPage();
  guest.on('pageerror', error => errors.push(error.message));
  await guest.addInitScript(() => {
    const original = RTCPeerConnection.prototype.createDataChannel;
    const channels: RTCDataChannel[] = [];
    (window as Window & { testChannels?: RTCDataChannel[] }).testChannels = channels;
    RTCPeerConnection.prototype.createDataChannel = function (...args: Parameters<typeof original>) {
      const channel = original.apply(this, args); channels.push(channel); return channel;
    };
  });
  await guest.goto(inviteUrl);
  await guest.getByLabel('Your character', { exact: true }).selectOption('andy');
  await guest.getByRole('button', { name: 'Join garden', exact: true }).click();
  await expect(page.locator('.match-screen')).toBeVisible({ timeout: 15000 });
  await expect(guest.locator('.match-screen')).toBeVisible({ timeout: 15000 });
  await expect(page.locator('.player-0')).toHaveAttribute('data-character', 'champignon');
  await expect(guest.locator('.player-0')).toHaveAttribute('data-character', 'andy');
  await expect(page.locator('.match-overlay')).toBeHidden({ timeout: 8000 });
  await expect(guest.locator('.match-overlay')).toBeHidden({ timeout: 8000 });
  await expect(guest.locator('.player-0 .hole[data-kind="mole"]').first()).toBeEnabled();
  await guest.locator('.player-0 .hole[data-kind="mole"]').first().click();
  await guest.getByRole('button', { name: 'Pause', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Paused', exact: true })).toBeVisible();
  await expect(guest.getByRole('heading', { name: 'Paused', exact: true })).toBeVisible();
  const score = await guest.locator('.player-0').getAttribute('data-score');
  expect(Number(score)).toBeGreaterThan(0);
  if (testInfo.project.name === 'desktop') {
    await expect(page.locator('.player-1')).toHaveAttribute('data-score', score!);
    await expect(guest.locator('.player-1 .hole').first()).toBeDisabled();
  } else {
    expect(Number(await page.getByRole('meter').getAttribute('aria-valuenow')) + Number(await guest.getByRole('meter').getAttribute('aria-valuenow'))).toBe(100);
    await expect(guest.locator('.player-1')).toHaveCount(0);
  }
  // A third browser cannot take over the occupied seat.
  const thirdContext = await browser.newContext(); const third = await thirdContext.newPage();
  await third.goto(inviteUrl);
  await third.getByRole('button', { name: 'Join garden', exact: true }).click();
  await expect(third.getByRole('status')).toHaveText('This garden already has two players.');
  await thirdContext.close();
  // Close the actual RTC data channel, keeping the browser/peer identity alive.
  await guest.evaluate(() => (window as Window & { testChannels?: RTCDataChannel[] }).testChannels?.forEach(channel => channel.close()));
  await expect(guest.getByRole('heading', { name: 'Reconnecting…', exact: true })).toBeVisible();
  await expect(guest.getByRole('heading', { name: 'Paused', exact: true })).toBeVisible({ timeout: 12000 });
  await expect(page.getByRole('heading', { name: 'Paused', exact: true })).toBeVisible();
  await expect(guest.locator('.player-0')).toHaveAttribute('data-score', score!);
  await page.getByRole('button', { name: 'Back to the garden' }).click();
  await expect(guest.locator('.match-overlay')).toBeHidden();
  // Real host inputs end a round; the guest can advance both players to the next.
  await page.evaluate(() => {
    const hole = document.querySelector<HTMLButtonElement>('.player-0 .hole[data-kind="empty"]')!;
    const code = `Key${hole.getAttribute('data-key')}`;
    for (let i = 0; i < 30; i++) window.dispatchEvent(new KeyboardEvent('keydown', { code }));
  });
  await expect(guest.getByRole('heading', { name: 'You win the round!' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Your opponent wins the round!' })).toBeVisible();
  await guest.getByRole('button', { name: /Next round/ }).click();
  await expect(page.locator('.match-screen')).toHaveAttribute('data-round', '2');
  await expect(guest.locator('.match-screen')).toHaveAttribute('data-round', '2');
  await guest.getByRole('button', { name: 'Pause', exact: true }).click();
  await guest.getByRole('button', { name: /Change matchup/ }).click();
  await expect(page.getByRole('heading', { name: 'Garden disconnected' })).toBeVisible();
  expect(errors).toEqual([]);
  await context.close();
});
