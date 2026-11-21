/** Compare existing CC0 art without changing the chosen title background or inspecting images. */
import { chromium,expect } from '@playwright/test';
import { createServer } from 'vite';
import { mkdirSync,writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve,join } from 'node:path';
const out=resolve('output/guard-flows/title-backgrounds');mkdirSync(out,{recursive:true});
const archive=process.argv.find(a=>a.startsWith('--archive='))?.slice(10)||'/private/tmp/moonlit-eight-homes/cemetery.zip';
execFileSync('python3',['-c',`import zipfile,pathlib,sys
out=pathlib.Path(sys.argv[2]);out.mkdir(parents=True,exist_ok=True)
files=['background.png','mountains.png','graveyard.png','sliced-objects/tree-1.png','sliced-objects/tree-3.png','sliced-objects/stone-1.png','sliced-objects/stone-3.png']
with zipfile.ZipFile(sys.argv[1]) as z:
 for name in files:(out/pathlib.Path(name).name).write_bytes(z.read('gothicvania-cemetery-files/PNG/Environment/'+name))
`,archive,join(out,'assets')]);
writeFileSync(join(out,'review.html'),'<!doctype html><html><meta name="viewport" content="width=device-width,initial-scale=1"><div id="root"></div><script type="module" src="/output/guard-flows/title-backgrounds/review.tsx"></script></html>');
writeFileSync(join(out,'review.tsx'),`
import {createRoot} from 'react-dom/client';import {useEffect} from 'react';import {TitleScreen} from '/src/ui/FrontScreens';import '/src/ui/style.css';
function Review(){useEffect(()=>{
 const mode=new URLSearchParams(location.search).get('scene')||'cemetery',screen=document.querySelector('.title-screen'),old=screen.querySelector('.front-backdrop');
 if(mode==='cemetery'){
  old.remove();const world=document.createElement('div');world.className='candidate-world';world.innerHTML='<div class="candidate-layer sky"></div><div class="candidate-layer mountains"></div><div class="candidate-layer graves"></div><img class="prop tree-left" src="/output/guard-flows/title-backgrounds/assets/tree-1.png"><img class="prop tree-right" src="/output/guard-flows/title-backgrounds/assets/tree-3.png"><img class="prop stone-left" src="/output/guard-flows/title-backgrounds/assets/stone-1.png"><img class="prop stone-right" src="/output/guard-flows/title-backgrounds/assets/stone-3.png">';screen.prepend(world);
 }else{old.src='/assets/homes/'+mode+'/background.png';old.style.opacity='.7';}
},[]);return <TitleScreen enter={()=>{}}/>;}
createRoot(document.getElementById('root')).render(<Review/>);
`);
writeFileSync(join(out,'review.css'),`.candidate-world{position:absolute;inset:0;z-index:-2;overflow:hidden}.candidate-layer{position:absolute;bottom:0;left:0;right:0;background-repeat:repeat-x;background-size:auto 100%;image-rendering:pixelated}.sky{height:100%;background-image:url('assets/background.png')}.mountains{height:79.91%;background-image:url('assets/mountains.png')}.graves{height:54.91%;background-image:url('assets/graveyard.png')}.prop{position:absolute;bottom:4%;width:auto;image-rendering:pixelated}.tree-left{height:52.23%;left:-6%}.tree-right{height:76.34%;right:-5%}.stone-left{height:16.96%;left:28%}.stone-right{height:17.86%;right:28%}`);
writeFileSync(join(out,'review.html'),'<!doctype html><html><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/output/guard-flows/title-backgrounds/review.css"><div id="root"></div><script type="module" src="/output/guard-flows/title-backgrounds/review.tsx"></script></html>');
const server=await createServer({server:{host:'127.0.0.1',port:4192,strictPort:true}});await server.listen();const browser=await chromium.launch();
try{
 const context=await browser.newContext({viewport:{width:1280,height:800},baseURL:'http://127.0.0.1:4192'}),page=await context.newPage();
 for(const scene of ['cemetery','lanternbloom-garden','andromoss']){
  await page.goto('/output/guard-flows/title-backgrounds/review.html?scene='+scene);await page.waitForLoadState('networkidle');await page.evaluate(()=>document.fonts.ready);await expect(page.getByRole('heading',{name:'Moonlit Battle Garden'})).toBeVisible();await expect(page.getByText('A garden rivalry',{exact:true})).toHaveCount(0);
  if(scene==='cemetery'){await expect(page.locator('.candidate-world .candidate-layer')).toHaveCount(3);await expect(page.locator('.candidate-world img')).toHaveCount(4);expect(await page.locator('.candidate-world img').evaluateAll(es=>es.every(e=>e instanceof HTMLImageElement&&e.complete&&e.naturalWidth>0))).toBe(true);}
  await page.screenshot({path:join(out,scene+'-title.png')});
 }
 await page.goto('/');await page.waitForLoadState('networkidle');await page.evaluate(()=>document.fonts.ready);await expect(page.getByText('A garden rivalry',{exact:true})).toHaveCount(0);await page.screenshot({path:join(out,'current-title-no-tagline.png')});await context.close();
 console.log('3 existing-art title options and live title without tagline captured. Background selection unchanged.');
}finally{await browser.close();await server.close();}
