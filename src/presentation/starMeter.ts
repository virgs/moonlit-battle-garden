import { legacyRewardFrame,legacyStars } from '../render/legacyPresentation';
export type StarMeterState={count:number;since:number;casting:boolean};
export const settledStarFrame=legacyRewardFrame(0,true);
const settledAge=2000/legacyStars.fps;

/** Hold a completed pose during the cut-scene; defer charge changes until gameplay resumes. */
export function starMeterPresentation(previous:StarMeterState,input:{count:number;time:number;casting:boolean;spent?:number;settled?:boolean;reduced?:boolean}):StarMeterState&{frame:number} {
  const {count,time,casting,spent,settled,reduced}=input;
  let next:StarMeterState=previous;
  if(casting){
    if(!previous.casting || (spent!==undefined && previous.count!==spent))next={count:spent??previous.count,since:time,casting:true};
  }else if(settled){
    next={count,since:time-settledAge,casting:false};
  }else if(previous.casting){
    next={count,since:previous.count===count?time-settledAge:time,casting:false};
  }else if(previous.count!==count){
    next={count,since:time,casting:false};
  }
  return {...next,frame:casting||settled?settledStarFrame:legacyRewardFrame(time-next.since,reduced)};
}
