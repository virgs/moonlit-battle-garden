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
    assignment.textContent = home.character === 'champignon' ? 'Sir Champignon' : home.character === 'andromoss' ? 'Andromoss' : 'Character to be chosen';
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
    if (home.artCredit) {
      const credit = document.createElement('small');
      credit.className = 'art-credit';
      const source = document.createElement('a');
      source.href = home.artSource;
      source.textContent = `Artwork: ${home.artCredit}`;
      const license = document.createElement('a');
      license.href = home.artLicenseUrl;
      license.textContent = home.artLicense === 'CC0 1.0 Universal' ? 'CC0' : home.artLicense === 'CC BY 4.0' ? 'CC BY 4.0' : 'Creator permission';
      credit.append(source, ' · ', license);
      card.append(credit);
    }
    main.append(card);
  }
} catch {
  main.textContent = 'The home collection could not load. Please reload to try again.';
}
