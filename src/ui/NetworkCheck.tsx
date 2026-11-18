import { useEffect, useState } from 'react';
import { PeerRoom } from '../network/PeerRoom';
import type { Session } from '../game/Session';
import { assetUrl } from '../assets/url';
import './network-check.css';

type CheckReport = {
  phase:'waiting'|'running'|'reconnecting'|'passed'|'failed';
  status:string;
  hits:[number,number]; casts:[number,number];
  recovery:boolean; elapsedSeconds:number;
  route:Awaited<ReturnType<PeerRoom['diagnostics']>>;
};
const initial:CheckReport={phase:'waiting',status:'Connecting…',hits:[0,0],casts:[0,0],recovery:false,elapsedSeconds:0,route:null};

/** Explicit opt-in check: real PeerRoom/Session, automated inputs, no game controls needed. */
export function NetworkCheck({role}:{role:'host'|'join'}) {
  const [report,setReport]=useState<CheckReport>(initial);
  const [invite,setInvite]=useState('');
  useEffect(()=>{
    const peerId=new URLSearchParams(location.search).get('peer');
    if(role==='join'&&(!peerId||!/^[a-zA-Z0-9_-]{1,100}$/.test(peerId))){setReport({...initial,phase:'failed',status:'This test link is invalid. Ask for a fresh link.'});return;}
    let session:Session|null=null,room:PeerRoom|null=null,disposed=false,startedAt=0,interrupted=false,sawInterruption=false,routePending=false;
    let current={...initial,hits:[0,0] as [number,number],casts:[0,0] as [number,number]};
    const seen=new Set<number>();
    const attempts=new Set<number>();
    const publish=()=>{if(!disposed)setReport({...current,hits:[...current.hits],casts:[...current.casts]});};
    const finish=(phase:'passed'|'failed',status:string)=>{current.phase=phase;current.status=status;publish();};
    const character=role==='host'?'champignon':'andromoss';
    room=new PeerRoom(character,role==='join'?peerId:null,{
      invite:id=>{
        if(role!=='host')return;
        const url=new URL(location.href);url.search='';url.hash='';url.searchParams.set('network-check','join');url.searchParams.set('peer',id);setInvite(url.toString());
      },
      selection:view=>{
        if(view.connected&&!view.players[0].ready&&!session)queueMicrotask(()=>{if(!disposed)room?.select(character,true);});
      },
      status:status=>{
        if(disposed||current.phase==='passed'||current.phase==='failed')return;
        if(status.includes('interrupted')){sawInterruption=true;current.phase='reconnecting';}
        current.status=status;publish();
      },
      start:next=>{session=next;startedAt=Date.now();current.phase='running';current.status='Automatically testing gameplay traffic…';next.start();publish();},
    });
    const poll=setInterval(()=>{
      if(disposed||current.phase==='failed'||current.phase==='passed')return;
      if(!session){
        // Host can wait for the phone. Guests retain PeerRoom's normal initial timeout.
        if(role==='join'&&Date.now()-openedAt>35_000)finish('failed','Could not establish the connection. Keep this page open so the result can be checked.');
        return;
      }
      current.elapsedSeconds=Math.floor((Date.now()-startedAt)/1000);
      const snapshot=session.getSnapshot(),state=snapshot.state;
      for(const event of snapshot.events){
        if(seen.has(event.id))continue;seen.add(event.id);
        if(event.kind==='hit')current.hits[event.player]++;
        if(event.kind==='cast')current.casts[event.player]++;
      }
      const connected=snapshot.network?.status==='connected';
      if(connected){
        if(sawInterruption)current.recovery=true;
        current.phase='running';current.status=current.recovery?'Connection recovered; finishing checks…':'Automatically testing gameplay traffic…';
      }else current.phase='reconnecting';
      if(!routePending&&connected&&current.elapsedSeconds%2===0){
        routePending=true;void room?.diagnostics().then(route=>{if(!disposed)current.route=route;}).catch(()=>{/* Stats are optional across browser engines. */}).finally(()=>{routePending=false;});
      }
      // Close the real guest data channel once, preserving the normal session/token.
      if(role==='join'&&!interrupted&&current.elapsedSeconds>=8&&connected){interrupted=true;room?.interruptForDiagnostics();}
      if(connected&&state.phase==='playing'&&!state.paused&&!state.casting){
        const player=state.players[0];
        if(player.stars&&state.time>=player.nextCast)session.act({type:'cast',player:0});
        else {
          const hole=player.holes.findIndex(target=>target&&target.kind!=='rabbit'&&!attempts.has(target.id)&&state.time-target.born>=250);
          if(hole>=0){attempts.add(player.holes[hole]!.id);session.act({type:'hit',player:0,hole});}
        }
      }
      if(state.phase==='round-over')session.nextRound();
      if(current.elapsedSeconds>=20&&current.recovery&&current.hits.every(count=>count>=3)&&current.casts.every(count=>count>=1))finish('passed','Connection check passed. You can close this page.');
      else if(current.elapsedSeconds>=90||snapshot.network?.status==='ended')finish('failed','The connection check did not finish. Keep this page open so the result can be checked.');
      else publish();
    },200);
    const openedAt=Date.now();
    return()=>{disposed=true;clearInterval(poll);if(session)session.stop();else room?.dispose();};
  },[role]);
  return <main className="network-check" data-phase={report.phase} aria-label="Automatic connection check">
    <h1>Connection check</h1>
    <p>Keep Wi-Fi off on your phone and leave this page visible. Everything runs automatically.</p>
    <p role="status">{report.status}</p>
    {role==='host'&&invite&&<label>Open this link on the phone<input aria-label="Phone test link" readOnly value={invite} onFocus={event=>event.target.select()} /></label>}
    <dl><dt>Gameplay hits · this device / other device</dt><dd>{report.hits.join(' / ')}</dd><dt>Magic casts · this device / other device</dt><dd>{report.casts.join(' / ')}</dd><dt>Reconnect check</dt><dd>{report.recovery?'Passed':'Waiting'}</dd><dt>Elapsed</dt><dd>{report.elapsedSeconds}s</dd></dl>
    <details><summary>Technical results</summary><pre aria-label="Connection report">{JSON.stringify(report,null,2)}</pre></details>
    <a href={assetUrl('/')}>Return to the game</a>
  </main>;
}
