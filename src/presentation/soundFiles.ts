export const soundFiles = {
  pop: ['charPop.mp3', 'original-digpop.wav'],
  hit: ['die0.wav','die1.wav','die2.wav','die3.mp3','die4.mp3', ...Array.from({length:10},(_,i)=>`original-morre${i+1}.wav`)],
  impact: ['original-impacto1.wav','original-impacto2.wav','original-impacto3.wav','original-impacto4.wav'],
  armor: ['original-impacto2.wav','original-impacto4.wav'],
  rabbit: ['rabbitHit.wav','original-matoucoelho.wav'],
  starAppear: ['starRaise.mp3','original-estrelaaparecendo.wav'],
  star: ['starHit.wav','original-estrela.wav'],
  wrong: ['wrongHit.wav','original-clicouerrado.wav'],
  cast: ['specialBarHit.wav','original-especialPersonagem.wav'],
  sweep: ['original-morreEspecial.wav'],
  end: ['gameOver.wav'],
} as const;
