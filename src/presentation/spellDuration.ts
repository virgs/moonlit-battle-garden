/** Presentation only: use the simulation deadline, never a browser animation clock. */
export function durationRemaining(until:number,time:number,duration:number):number {
  return Math.max(0,Math.min(1,(until-time)/duration));
}
