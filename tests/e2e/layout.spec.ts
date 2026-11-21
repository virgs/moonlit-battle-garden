import { openSelection, enterMatch, chooseCharacter } from './frontMenu';
import { expect, test } from '@playwright/test';
import { gardenArt } from '../../src/render/layout';

const resizeGroups = { phones:[[320,568],[390,844],[844,390]], tablets:[[768,1024],[1024,600],[1024,1000]], desktops:[[1440,900],[2560,1080],[3840,2160]] };
for (const [group, sizes] of Object.entries(resizeGroups)) test(`minimal HUD preserves anchors, names and stars through ${group} resizes`, async ({ page }, testInfo) => {
  await openSelection(page,'local');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('.selection-heading h1')).toHaveCSS('font-family', 'Almendra, Georgia, serif');
  await expect(page.locator('body')).toHaveCSS('font-family', 'Literata, Georgia, serif');
  expect(await page.evaluate(() => document.fonts.check('400 30px Almendra') && document.fonts.check('400 15px Literata'))).toBe(true);
  await chooseCharacter(page,'Player 1','captain-bramble');
  await chooseCharacter(page,'Player 2','champignon');
  await enterMatch(page);
  await expect(page.locator('canvas')).toHaveCount(1);
  await expect(page.locator('.match-overlay')).toBeHidden({ timeout: 8000 });
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  await page.addStyleTag({ content: '.match-overlay{visibility:hidden!important}' });
  for (const [width, height] of sizes) {
    await page.setViewportSize({ width, height });
    await expect(page.locator('canvas')).toHaveAttribute('width', String(width));
    await expect(page.locator('canvas')).toHaveAttribute('height', String(height));
    // Read one consistent frame. Hundreds of separate DevTools geometry calls
    // were competing with software WebGL redraws, especially at 4K on CI.
    const geometry = await page.evaluate(() => {
      const bounds = (element: Element) => {
        const { x,y,width,height } = element.getBoundingClientRect();
        return { x,y,width,height };
      };
      const rect = (selector: string, root: ParentNode = document) => bounds(root.querySelector(selector)!);
      const legend = document.querySelector('.score-legend')!;
      return {
        bar:rect('.score-bar'), art:rect('.legacy-score-art'),
        meters:document.querySelectorAll('[role="meter"]').length,
        verticalStars:document.querySelectorAll('.player-panel .vertical-stars').length,
        legendFont:getComputedStyle(legend).fontFamily, shadow:getComputedStyle(legend).textShadow,
        inline:document.querySelector('.score-bar')!.classList.contains('inline-heroes'),
        short:document.querySelector('.score-bar')!.classList.contains('short-heroes'),
        names:[...legend.children].map(element => {const text=element.querySelector('.hero-name-text')!;const range=document.createRange();range.selectNodeContents(text);return {text:element.textContent,fits:range.getBoundingClientRect().width<=element.clientWidth,lines:range.getClientRects().length,textBounds:bounds(text),...bounds(element)};}),
        portraitAligned:document.querySelectorAll('.score-trophies.portrait-aligned').length===2,
        icons:[...legend.querySelectorAll('.character-icon')].map(element=>({...bounds(element),character:element.getAttribute('data-character'),state:element.getAttribute('data-state')})),
        trophies:[...document.querySelectorAll('.score-trophies .trophy-art')].map(element => { const {x,y,width,height}=element.getBoundingClientRect();return {x,y,width,height}; }),
        panels:[...document.querySelectorAll('.player-panel')].map(panel => ({
          x:Number(panel.getAttribute('data-board-x')), y:Number(panel.getAttribute('data-board-y')), scale:Number(panel.getAttribute('data-board-scale')),
          stars:rect('.star-control',panel), holes:[...panel.querySelectorAll('.hole')].map(element => { const {x,y,width,height}=element.getBoundingClientRect();return {x,y,width,height}; }),
        })),
        obsolete:document.querySelectorAll('.player-summary,.magic-panel,.board-message,.spell-description,.keycap,.versus-label,.online-status').length,
        fits:document.documentElement.scrollHeight<=innerHeight&&document.documentElement.scrollWidth<=innerWidth,
      };
    });
    const {bar,art}=geometry;
    expect(geometry.icons.map(icon=>icon.character)).toEqual(['captain-bramble','champignon']);
    for(const [id,icon] of geometry.icons.entries()){
      expect(icon.state).toBe('ready');expect(icon.width).toBe(height<=520?(width<1000?48:64):width<=360?48:width<=700?64:width<900?80:width<1200?96:128);
      expect(icon.height).toBe(icon.width);const trophy=geometry.trophies[id];expect(icon.y+icon.height<=trophy.y||icon.x+icon.width<=trophy.x||icon.x>=trophy.x+trophy.width).toBe(true);
      expect(icon.y).toBeGreaterThanOrEqual(0);
      expect(icon.x).toBeGreaterThanOrEqual(0);expect(icon.x+icon.width).toBeLessThanOrEqual(width);
    }
    expect(art.width/art.height).toBeCloseTo(499/45,1); expect(geometry.meters).toBe(1);
    if(width===844&&height===390)expect(geometry.verticalStars).toBe(2);
    expect(geometry.names.map(name=>name.text)).toEqual(['Captain Bramble','Sir Champignon']);
    expect(geometry.legendFont).toBe('Almendra, Georgia, serif');
    expect((geometry.shadow.match(/rgb\(/g)??[]).length).toBeGreaterThanOrEqual(8);
    expect(geometry.shadow).toContain(' -2px -2px 0px'); expect(geometry.names.every(name=>name.fits&&name.lines===1)).toBe(true);
    for(const id of [0,1]) {
      const trophy=geometry.trophies[id], label=geometry.names[id], panel=geometry.panels[id], stars=panel.stars;
      expect(geometry.portraitAligned).toBe(true);
      expect(trophy.x+trophy.width/2).toBeCloseTo(geometry.icons[id].x+geometry.icons[id].width/2,1);
      expect(trophy.width).toBeCloseTo((width<700||(height<500&&width<1000)?112:168)*.8,1);
      expect(trophy.y).toBeGreaterThanOrEqual(Math.max(geometry.icons[id].y+geometry.icons[id].height,label.textBounds.y+label.textBounds.height));
      expect(trophy.y+trophy.height).toBeLessThanOrEqual(bar.y+bar.height);
      expect(trophy.x).toBeGreaterThanOrEqual(0);expect(trophy.x+trophy.width).toBeLessThanOrEqual(width);
      if(geometry.inline){
        expect(label.y+label.height/2).toBeCloseTo(art.y+art.height/2,0);
        if(id===0)expect(label.x+label.width).toBeLessThan(art.x);else expect(label.x).toBeGreaterThan(art.x+art.width);
      }
      expect(geometry.names[0].x+geometry.names[0].width).toBeLessThan(geometry.names[1].x);
      expect(label.x).toBeGreaterThanOrEqual(0);expect(label.x+label.width).toBeLessThanOrEqual(width);
      expect(label.y+label.height).toBeLessThanOrEqual(bar.y+bar.height);
      expect(panel.y).toBeGreaterThanOrEqual(bar.y+bar.height);
      expect(stars.x).toBeGreaterThanOrEqual(0);expect(stars.x+stars.width).toBeLessThanOrEqual(width);expect(stars.y+stars.height).toBeLessThanOrEqual(height);
      for(const [hole,box] of panel.holes.entries()) {
        expect(box.x+box.width/2).toBeCloseTo(panel.x+gardenArt.holes[hole].x*panel.scale,0);
        expect(box.y+77*panel.scale).toBeCloseTo(panel.y+gardenArt.holes[hole].y*panel.scale,0);
        expect(box.x>=stars.x+stars.width||box.x+box.width<=stars.x||box.y+box.height<=stars.y).toBe(true);
      }
    }
    expect(geometry.obsolete).toBe(0);expect(geometry.fits).toBe(true);
  }
  await page.screenshot({ path: testInfo.outputPath(`minimal-${group}.png`) });
});

test('single board uses horizontal stars on a narrow portrait screen with a vertical left column and centered board in landscape and the original column on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openSelection(page); await enterMatch(page);
  await expect(page.locator('.single-board .player-0 .horizontal-stars')).toHaveCount(1);
  await expect(page.locator('.player-1')).toHaveCount(0);
  await page.setViewportSize({ width: 844, height: 390 });
  await expect(page.locator('.single-board .player-0 .vertical-stars')).toHaveCount(1);
  const board=page.locator('.player-0');
  const x=Number(await board.getAttribute('data-board-x')), scale=Number(await board.getAttribute('data-board-scale'));
  expect(x+gardenArt.width*scale/2).toBeCloseTo(844/2,0);
  const stars=(await board.locator('.star-control').boundingBox())!;
  expect(stars.height).toBeGreaterThan(stars.width);
  expect(stars.x+stars.width).toBeLessThan(x);
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator('.two-boards .vertical-stars')).toHaveCount(2);
  await expect(page.locator('canvas')).toHaveCount(1);
});
