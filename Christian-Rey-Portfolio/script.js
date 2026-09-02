const menuButton = document.querySelector('#menuBtn');
const nav = document.querySelector('#nav');

const welcomePopup = document.querySelector('#welcomePopup');
document.querySelector('#enterPortfolio').addEventListener('click', () => {
  welcomePopup.classList.add('is-hidden');
});

// Use Christian's selected artwork as the cover for each song.
const covers = {
  'Please Please Please': ['sabrina.png', 'Sabrina Carpenter cover artwork'],
  'Silver Lining': ['laufey.jpg', 'Laufey cover artwork'],
  'Street by Street': ['laufey.jpg', 'Laufey cover artwork'],
  'Heaven Knows': ['heaven.jpg', 'Heaven Knows cover artwork'],
};
document.querySelectorAll('.song').forEach((song) => {
  const title = song.querySelector('.song-info h3')?.textContent.trim();
  const selectedCover = covers[title];
  if (!selectedCover) return;
  const cover = song.querySelector('.gif-disk img');
  cover.src = selectedCover[0];
  cover.alt = selectedCover[1];
  cover.closest('.gif-disk').classList.add('laufey-cover');
});

const audioSources = {
  audio1: 'assets/audio/please-please-please.mp4',
  audio2: 'assets/audio/silver-lining.mp3',
  audio3: 'assets/audio/street-by-street.mp4',
  audio4: 'assets/audio/heaven-knows.mp4',
};
Object.entries(audioSources).forEach(([id, source]) => {
  document.querySelector(`#${id}`).src = source;
});

document.querySelectorAll('.mini-card').forEach((card) => {
  if (card.querySelector('h3')?.textContent.trim() === 'Programming') {
    card.classList.add('programming-photo');
  }
  if (card.querySelector('h3')?.textContent.trim() === 'Gaming') {
    card.classList.add('gaming-photo');
  }
  if (card.querySelector('h3')?.textContent.trim() === 'Music') {
    card.classList.add('music-photo');
  }
  if (card.querySelector('h3')?.textContent.trim() === 'Creative Editing') {
    card.classList.add('editing-photo');
  }
});

document.querySelectorAll('.card').forEach((card) => {
  if (card.querySelector('h3')?.textContent.trim() === 'School Projects') {
    card.querySelector('.card-visual').classList.add('academic-photo');
  }
  if (card.querySelector('h3')?.textContent.trim() === 'Programming & Web Design') {
    card.querySelector('.card-visual').classList.add('code-photo');
  }
  if (card.querySelector('h3')?.textContent.trim() === 'Group & Advocacy Work') {
    card.querySelector('.card-visual').classList.add('together-photo');
  }
});

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.play-btn').forEach((button) => button.addEventListener('click', () => {
  const id = button.dataset.song;
  const audio = document.querySelector(`#audio${id}`);
  if (!audio) return;

  document.querySelectorAll('audio').forEach((track) => {
    if (track !== audio) track.pause();
  });
  document.querySelectorAll('.gif-disk').forEach((disk) => disk.classList.remove('spinning'));
  document.querySelectorAll('.play-btn').forEach((item) => {
    if (item !== button) {
      item.classList.remove('playing');
      item.innerHTML = '<span>▶</span> Play';
    }
  });

  if (audio.paused) {
    audio.play().then(() => {
      button.classList.add('playing');
      button.innerHTML = '<span>❚❚</span> Pause';
      button.closest('.song').querySelector('.gif-disk').classList.add('spinning');
    }).catch(() => {
      button.innerHTML = '<span>!</span> Add audio';
    });
  } else {
    audio.pause();
    button.classList.remove('playing');
    button.innerHTML = '<span>▶</span> Play';
    button.closest('.song').querySelector('.gif-disk').classList.remove('spinning');
  }
  audio.onended = () => {
    button.classList.remove('playing');
    button.innerHTML = '<span>▶</span> Play';
    button.closest('.song').querySelector('.gif-disk').classList.remove('spinning');
  };
}));

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelector('#contactForm').addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('#formMessage').textContent = 'Thanks! Your message is ready to send.';
  event.currentTarget.reset();
});
