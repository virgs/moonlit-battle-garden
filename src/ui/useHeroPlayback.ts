import { useEffect,useState } from 'react';
import { heroFrameAt,validSheet,type CastClip } from '../presentation/config';
import { inspectImage } from '../presentation/images';

/** Shared idle/victory clock. Paint only changed poses, hold hidden tabs and honor live motion preferences. */
export function useHeroPlayback(clip:CastClip,loop=true) {
  const [sheet,setSheet]=useState<{clip:CastClip;valid:boolean}|null>(null);
  const [pose,setPose]=useState<{clip:CastClip;loop:boolean;frame:number;reduced:boolean}|null>(null);
  const ready=sheet?.clip===clip&&sheet.valid;
  useEffect(()=>{
    let alive=true;
    void inspectImage(clip.src).then(image=>{if(alive)setSheet({clip,valid:!!image&&validSheet(clip,image.width,image.height)});});
    return()=>{alive=false;};
  },[clip]);
  useEffect(()=>{
    if(!ready)return;
    const media=window.matchMedia('(prefers-reduced-motion: reduce)');
    let request=0,start=performance.now(),hiddenAt:number|null=null,last=0;
    const tick=(now:number)=>{
      const frame=heroFrameAt(clip,now-start,loop);
      if(frame!==last){last=frame;setPose({clip,loop,frame,reduced:false});}
      if(loop||frame<clip.frameCount-1)request=requestAnimationFrame(tick);
    };
    const reset=()=>{
      cancelAnimationFrame(request);start=performance.now();hiddenAt=document.hidden?start:null;last=0;
      setPose({clip,loop,frame:0,reduced:media.matches});
      if(!media.matches&&!document.hidden)request=requestAnimationFrame(tick);
    };
    const visibility=()=>{
      if(document.hidden){hiddenAt??=performance.now();cancelAnimationFrame(request);}
      else if(hiddenAt!==null){start+=performance.now()-hiddenAt;hiddenAt=null;if(!media.matches&&(loop||last<clip.frameCount-1))request=requestAnimationFrame(tick);}
    };
    reset();media.addEventListener('change',reset);document.addEventListener('visibilitychange',visibility);
    return()=>{cancelAnimationFrame(request);media.removeEventListener('change',reset);document.removeEventListener('visibilitychange',visibility);};
  },[clip,ready,loop]);
  const current=ready&&pose?.clip===clip&&pose.loop===loop;
  return {ready,frame:current?pose.frame:0,reduced:current?pose.reduced:undefined};
}
