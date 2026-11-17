export function roundClock(elapsedMs:number):string {
  const seconds=Math.floor(Math.max(0,elapsedMs)/1000);
  const pad=(value:number)=>String(value).padStart(2,'0');
  return seconds>=3600?`${Math.floor(seconds/3600)}:${pad(Math.floor(seconds/60)%60)}:${pad(seconds%60)}`:`${pad(Math.floor(seconds/60))}:${pad(seconds%60)}`;
}
