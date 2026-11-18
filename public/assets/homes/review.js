const main = document.querySelector('main');
try {
  const response = await fetch('catalog.json');
  if (!response.ok) throw new Error('Home collection unavailable');
  const { homes } = await response.json();
  for (const home of homes) {
    const card = document.createElement('article');
    card.dataset.home = home.id;
    const image = document.createElement('img');
    image.src = home.background;
    image.alt = home.name;
    image.style.objectPosition = `${home.focusX * 100}% ${home.focusY * 100}%`;
    const title = document.createElement('h2');
    title.textContent = home.name;
    const assignment = document.createElement('small');
    assignment.textContent = home.character === 'champignon' ? 'Sir Champignon' : home.character === 'andy' ? 'Andy' : 'Character to be chosen';
    const mood = document.createElement('p');
    mood.textContent = home.mood;
    const audio = document.createElement('audio');
    audio.src = home.music;
    audio.controls = true;
    audio.loop = true;
    audio.preload = 'none';
    audio.setAttribute('aria-label', `${home.name} music`);
    audio.addEventListener('play', () => {
      for (const other of document.querySelectorAll('audio')) if (other !== audio) other.pause();
    });
    card.append(image, title, assignment, mood, audio);
    main.append(card);
  }
} catch {
  main.textContent = 'The home collection could not load. Please reload to try again.';
}
