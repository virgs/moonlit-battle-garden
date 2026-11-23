/** Decorative title time only. Independent of match simulation, networking and audio. */
export const titleCameraPeriod=20_000;
export function titleGardenPose(time:number,reduced=false,distance=140){
 const t=reduced?0:Math.max(0,time),progress=(1-Math.cos(2*Math.PI*t/titleCameraPeriod))/2;
 return {time:t,camera:distance*progress,sky:distance*progress*.06,mountains:distance*progress*.22,graves:distance*progress*.5,trees:distance*progress*.85,foreground:distance*progress,batFrame:Math.floor(t/83.333)%9,owlFrame:Math.floor(t/750)%9,pumpkinFrame:Math.floor(t/333.333)%9};
}
