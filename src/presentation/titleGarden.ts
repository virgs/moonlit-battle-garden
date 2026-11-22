/** Decorative title time only. Independent of match simulation, networking and audio. */
export const titleCameraPeriod=20_000;
export function titleGardenPose(time:number,reduced=false,distance=140){
 const t=reduced?0:Math.max(0,time),progress=(1-Math.cos(2*Math.PI*t/titleCameraPeriod))/2;
 return {time:t,camera:distance*progress,sky:distance*progress*.06,mountains:distance*progress*.22,graves:distance*progress*.5,trees:distance*progress*.85,foreground:distance*progress,batFrame:Math.floor(t/140)%4,owlFacing:Math.floor(t/1000)%8,pumpkinLit:t%4800<2100||t%4800>4200};
}
