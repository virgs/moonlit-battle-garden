/** Actual approved sheets; technical frame-timing review only. */
import {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {characterIds,isCharacterId} from '../../src/game/types';
import {StandingHero} from '../../src/ui/StandingHero';
import {VictoryHero} from '../../src/ui/VictoryHero';
import '../../src/ui/style.css';
import '../../src/ui/presentation.css';
const requested=new URLSearchParams(location.search).get('hero');
function Review(){
 const [hero,setHero]=useState(isCharacterId(requested)?requested:'champignon');
 return <main style={{display:'flex',flexWrap:'wrap',gap:20,padding:20}} data-character={hero}>
  <section className="preview-idle" style={{width:180,height:180}}><StandingHero character={hero}/></section>
  <section className="preview-loop" style={{width:180,height:180}}><VictoryHero character={hero}/></section>
  <section className="preview-once" style={{width:180,height:180}}><VictoryHero character={hero} loop={false}/></section>
  <button onClick={()=>setHero(characterIds[(characterIds.indexOf(hero)+1)%characterIds.length])}>Next hero</button>
 </main>;
}
createRoot(document.getElementById('root')!).render(<Review/>);
