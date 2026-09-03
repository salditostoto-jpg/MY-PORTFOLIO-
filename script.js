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

const chatbotLauncher = document.querySelector('#chatbotLauncher');
const chatbotPanel = document.querySelector('#chatbotPanel');
const chatbotClose = document.querySelector('#chatbotClose');
const chatbotForm = document.querySelector('#chatbotForm');
const chatbotInput = document.querySelector('#chatbotInput');
const chatbotMessages = document.querySelector('#chatbotMessages');
const exploreStory = document.querySelector('.hero-actions a[href="#about"]');
const storyModal = document.querySelector('#storyModal');
const storyModalClose = document.querySelector('#storyModalClose');

function setStoryOpen(isOpen) {
  storyModal.classList.toggle('is-open', isOpen);
  storyModal.setAttribute('aria-hidden', String(!isOpen));
  document.body.classList.toggle('modal-open', isOpen);
}

exploreStory.addEventListener('click', (event) => { event.preventDefault(); setStoryOpen(true); });
storyModalClose.addEventListener('click', () => setStoryOpen(false));
storyModal.querySelector('[data-close-story]').addEventListener('click', () => setStoryOpen(false));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && storyModal.classList.contains('is-open')) setStoryOpen(false); });

const galleryModal = document.querySelector('#galleryModal');
const galleryModalClose = document.querySelector('#galleryModalClose');
const galleryModalTitle = document.querySelector('#galleryModalTitle');
const galleryPhotoGrid = document.querySelector('#galleryPhotoGrid');
const galleryModalCard = galleryModal.querySelector('.gallery-modal-card');
let activeGalleryKey = '';
let galleryResetTimer;
let galleryScrollStart = 0;
let galleryWasScrolled = false;
const familyStories = [
  'My family is where my story begins. Sila yung mga taong kasama ko habang lumalaki ako at sila rin ang isa sa mga dahilan kung bakit ako naging ganito ngayon. Through the years, marami akong natutunan sa kanila not only through their advice, but also through the way they treat and support each other. Hindi man perfect ang family namin, I still appreciate every moment that we get to spend together.',
  'Hindi naman kailangan na laging may malaking celebration or special occasion para maging memorable ang isang moment. Sometimes, the simplest moments with my family are already enough to make me happy. Yung simpleng pagkain together, kwentuhan, tawanan, or kahit sama-sama lang sa bahay can become memories that I will always remember. Minsan, hindi natin napapansin na habang nangyayari ang mga simpleng moments na ito, gumagawa na pala tayo ng memories na magiging important sa atin someday.',
  'Like any family, we also experience different challenges. May times na hindi lahat goes according to plan, and there are moments when things become difficult. Pero kahit ganoon, we try our best to support each other. Knowing na may family akong pwede kong sandalan gives me confidence whenever I face something difficult. They remind me that problems are easier to face when you know that there are people who care about you and are willing to be there for you.',
  'Every picture has its own story and memory behind it. Kapag tinitingnan ko ang mga pictures namin, naaalala ko yung mga moments na sama-sama kami, yung mga tawanan, conversations, and experiences na nagbigay sa amin ng happiness. These moments may look simple in a picture, but they mean a lot to me. Habang tumatagal ang panahon, marami ring bagay ang nagbabago, pero these memories will always be something that I can look back on.',
  'For me, family is more than just the people I live with. Sila yung mga taong naging part ng journey ko, nagbigay ng lessons, support, and memories na dadalhin ko habang lumalaki ako. I know that as time passes, everyone will have their own goals, responsibilities, and paths to follow. Pero kahit magbago ang maraming bagay, I hope that we will continue to stay connected and create more memories together. My family will always be an important part of my story, and these five pictures are just some of the memories that I will always treasure.',
];
const familyStoryTitles = [
  'Where My Story Begins',
  'The Simple Moments',
  'Always There for Each Other',
  'Memories We Share',
  'My Family, My Home',
];
const selfStories = [
  'This picture represents who I am and a little part of my journey. Hindi man makikita sa isang picture ang buong personality ko, it still shows one moment that is part of my life. I am someone who is still learning, growing, and discovering more about myself. Marami pa akong gustong matutunan at maraming experiences na gusto kong maranasan habang patuloy akong naggo-grow.',
  'As I grow older, mas nakikilala ko rin kung sino talaga ako. I learned that knowing yourself is not something that happens overnight. It takes time, experiences, mistakes, and lessons. May mga bagay na dati hindi ko alam tungkol sa sarili ko, pero habang dumadaan ako sa different situations, mas naiintindihan ko kung ano ang strengths ko, weaknesses ko, at kung ano ang mga bagay na gusto kong pagbutihin.',
  'There are things that I genuinely enjoy doing, and these interests are also part of who I am. Whether it is spending time with things I like, learning something new, creating something, or simply enjoying my free time, these activities help me express myself. They give me a chance to be creative, relax, and enjoy the things that make me happy.',
  'Hindi lahat ng experiences ko naging easy or perfect. May mga times na nagkamali ako, nahirapan, or things did not go the way I expected. Pero bawat experience taught me something. Instead of seeing mistakes as something that only brings failure, I try to see them as lessons that can help me improve. Every challenge becomes part of my growth and helps me become a better version of myself.',
  'I know that I am still far from the person I want to become, and that is okay. I am still learning, improving, and discovering what I can do. My goal is not to become perfect, but to continue becoming better than who I was before. I want to keep learning, face challenges with courage, and make my own memories along the way. These pictures may only show different moments of my life, but together, they represent a part of my journey and the person I am becoming.',
];
const selfStoryTitles = [
  'This Is Me',
  'Getting to Know Myself',
  'My Interests and Passions',
  'Growing Through Experiences',
  'The Person I Want to Become',
];
const friendStories = [
  'Si Baillo yung isa sa mga taong masasabi kong super mahal ang Diyos. Makikita mo sa kanya kung gaano ka-important si God sa life niya. Hindi lang siya basta friend na kasama sa tawanan, pero isa rin siyang tao na nagpapaalala sa akin na importanteng magkaroon ng faith at relationship with God. I really appreciate having someone like him in my life because sometimes, through the people around us, we are reminded of what truly matters. His love for God is something I respect, and I hope that he will continue to grow in his faith and stay close to Him.',
  'Si Bagos naman ay isa sa mga friends na may influence sa akin. Through our friendship, mas naiintindihan ko kung gaano kahalaga si God sa buhay ko. Sometimes, we influence each other without even realizing it, whether through our words, actions, or the way we look at things. Sa kanya, naaalala ko na faith is not only something we talk about, but something that can also become part of the way we live. I am thankful because our friendship has given me moments where I can reflect on my own relationship with God and understand more about what He means to me.',
  'Si Enrico ay medyo mahiyain at hindi siya yung pinaka-maingay sa grupo, pero once you get to know him, masaya siyang kasama. Hindi kailangan na palaging maraming sinasabi para maging memorable ang isang tao. Sometimes, yung presence lang niya and the simple moments we share are already enough. I appreciate him because behind his shy personality is someone who can still laugh, enjoy the moment, and be a good friend. He reminds me that friendship does not always have to be loud—sometimes, the quiet ones can also become some of the most meaningful people in your life.',
  'Si Timbal naman, super masayahin at makulit—parang ako rin minsan. Siya yung type of friend na kayang gawing mas enjoyable ang isang ordinaryong moment. Kapag kasama siya, hindi nauubusan ng tawanan at kalokohan. Pero beyond the jokes and pagiging makulit, maganda siyang kasama because he makes people feel comfortable and helps create a happy atmosphere. I like having a friend like him because there are times when life can become stressful, and sometimes all we need is someone who can make us laugh and forget our worries for a while.',
  'Si Taylo naman ay isang mabait, makulit, at masayang kasama. Siya yung friend na madaling pakisamahan at kayang magdala ng good vibes sa grupo. Yung pagiging makulit niya makes our moments more fun, while his kindness makes the friendship feel genuine. I appreciate the simple conversations, jokes, and memories that we share because these are the moments that make friendship special. Hindi naman kailangan ng grand experiences para masabing meaningful ang friendship—sometimes, the simple moments with good people are the ones we remember the most.',
  'Si Villarico naman ay isa sa mga taong masasabi kong tunay kong buddy. Siya yung friend na comfortable akong kasama, whether we are talking about random things, laughing about something silly, or simply spending time together. Minsan, hindi naman kailangan ng deep conversations or big moments para maging special ang friendship. Yung simpleng pagiging present at yung feeling na comfortable kang maging sarili mo kapag kasama siya, malaking bagay na. I appreciate Villarico because our friendship feels natural. We can joke around, share different moments, and enjoy each other\'s company without having to pretend to be someone else. Through the simple memories we create, mas nagiging meaningful yung friendship namin. He is one of those buddies na kapag naalala ko ang school days and the people who made them more enjoyable, siguradong kasama siya sa memories na iyon. I hope that even as time passes and we eventually go our separate ways, we will still remember the moments we shared. Maybe someday, we will look back at these pictures and laugh about how simple our lives were back then. For now, I am just thankful that I have a buddy like Villarico who became part of my journey and gave me more memories to treasure.',
];
const friendStoryTitles = [
  'Baillo: A Friend Who Loves God',
  'Bagos: A Friend Who Influences Me',
  'Enrico: The Quiet but Fun Friend',
  'Timbal: The Fun and Chaotic One',
  'Taylo: Kind, Fun, and Easy to Be With',
  'Villarico: My Buddy',
];
const galleries = {
  self: { title: 'My <em>Self.</em>', photos: ['self-01.jpg', 'self-02.jpg', 'self-03.jpg', 'self-04.jpg', 'self-05.jpg'] },
  family: { title: 'My <em>Family.</em>', photos: ['family-01.jpg', 'family-02.jpg', 'family-03.jpg', 'family-04.jpg', 'family-05.jpg'] },
  friend: {
    title: 'My <em>Friends.</em>',
    photos: ['friend-1.jpg', 'friend-2.jpg', 'friend-3.jpg', 'friend-4.jpg', 'friend-5.jpg', 'friend-6.jpg'],
    links: {
      'friend-1.jpg': 'https://www.facebook.com/baillokenken.chicalatoy',
      'friend-2.jpg': 'https://www.facebook.com/Jazz2109',
      'friend-3.jpg': 'https://www.facebook.com/enrico.john.jerusalem.2025',
      'friend-4.jpg': 'https://www.facebook.com/Arkinomsm/photos',
      'friend-5.jpg': 'https://www.facebook.com/YetAnotherFriend',
      'friend-6.jpg': 'https://www.facebook.com/nico.villarico.3',
    },
  },
};

function setGalleryOpen(isOpen) {
  galleryModal.classList.toggle('is-open', isOpen);
  galleryModal.setAttribute('aria-hidden', String(!isOpen));
  document.body.classList.toggle('modal-open', isOpen);
  if (!isOpen) {
    resetGalleryPosition();
    window.requestAnimationFrame(resetGalleryPosition);
  }
}

document.querySelectorAll('[data-gallery]').forEach((button) => button.addEventListener('click', () => {
  const gallery = galleries[button.dataset.gallery];
  activeGalleryKey = button.dataset.gallery;
  const isSelfGallery = button.dataset.gallery === 'self';
  galleryModalTitle.innerHTML = gallery.title;
  galleryPhotoGrid.classList.toggle('rope-gallery', ['self', 'family', 'friend'].includes(activeGalleryKey));
  galleryPhotoGrid.style.setProperty('--pull', '0');
  galleryPhotoGrid.innerHTML = gallery.photos.map((photo, index) => {
    const image = `<img src="${photo}" alt="${isSelfGallery ? 'Christian personal photo' : 'Gallery photo'} ${index + 1}" loading="lazy">`;
    const link = gallery.links?.[photo];
    const story = activeGalleryKey === 'family' ? familyStories[index] : activeGalleryKey === 'self' ? selfStories[index] : activeGalleryKey === 'friend' ? friendStories[index] : '';
    const storyTitle = activeGalleryKey === 'family' ? familyStoryTitles[index] : activeGalleryKey === 'self' ? selfStoryTitles[index] : friendStoryTitles[index];
    const friendLink = activeGalleryKey === 'friend' ? link : '';
    const linkedImage = link
      && !friendLink
      ? `<a href="${link}" target="_blank" rel="noopener noreferrer" aria-label="Open Facebook profile">${image}</a>`
      : image;
    const storyLink = friendLink ? `<a class="story-link" href="${friendLink}" target="_blank" rel="noopener noreferrer">Open Facebook ↗</a>` : '';
    return `<figure class="gallery-photo${story ? ' flip-card' : ''}" style="--i:${index + 1}" data-number="0${index + 1}"${story ? ' role="button" tabindex="0"' : ''}><div class="family-flip-inner"><div class="family-flip-front">${linkedImage}</div>${story ? `<div class="family-flip-back"><span>Picture ${index + 1}</span><h3>${storyTitle}</h3><p>${story}</p>${storyLink}</div>` : ''}</div></figure>`;
  }).join('');
  galleryPhotoGrid.querySelectorAll('.flip-card').forEach((card) => {
    const flipCard = () => card.classList.toggle('is-flipped');
    card.querySelector('.story-link')?.addEventListener('click', (event) => event.stopPropagation());
    card.addEventListener('click', (event) => {
      flipCard();
    });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        flipCard();
      }
    });
  });
  galleryModalCard.scrollTop = 0;
  galleryPhotoGrid.style.setProperty('--pull', '0');
  setGalleryOpen(true);
}));
function resetGalleryPosition() {
  window.clearTimeout(galleryResetTimer);
  galleryModalCard.scrollTop = 0;
  galleryPhotoGrid.style.setProperty('--pull', '0');
}

function resetGalleryAfterRelease() {
  if (!['self', 'family', 'friend'].includes(activeGalleryKey) || !galleryWasScrolled) return;
  window.clearTimeout(galleryResetTimer);
  galleryResetTimer = window.setTimeout(() => {
    galleryModalCard.scrollTop = 0;
    galleryPhotoGrid.style.setProperty('--pull', '0');
  }, 350);
}

galleryModalCard.addEventListener('pointerdown', () => {
  window.clearTimeout(galleryResetTimer);
  galleryScrollStart = galleryModalCard.scrollTop;
  galleryWasScrolled = false;
});

galleryModalClose.addEventListener('click', () => {
  resetGalleryPosition();
  setGalleryOpen(false);
});
galleryModal.querySelector('[data-close-gallery]').addEventListener('click', () => {
  resetGalleryPosition();
  setGalleryOpen(false);
});

document.addEventListener('pointerup', () => {
  resetGalleryAfterRelease();
});
document.addEventListener('touchend', () => {
  resetGalleryAfterRelease();
});
document.addEventListener('pointercancel', () => {
  resetGalleryAfterRelease();
});

galleryModalCard.addEventListener('scroll', (event) => {
  const scroller = event.currentTarget;
  if (Math.abs(scroller.scrollTop - galleryScrollStart) > 4) galleryWasScrolled = true;
  if (!galleryPhotoGrid.classList.contains('rope-gallery')) return;
  const maxScroll = Math.max(1, scroller.scrollHeight - scroller.clientHeight);
  const progress = Math.min(1, Math.max(0, scroller.scrollTop / maxScroll));
  galleryPhotoGrid.style.setProperty('--pull', progress.toFixed(3));
});
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && galleryModal.classList.contains('is-open')) setGalleryOpen(false); });

function setChatOpen(isOpen) {
  chatbotPanel.classList.toggle('is-open', isOpen);
  chatbotPanel.setAttribute('aria-hidden', String(!isOpen));
  chatbotLauncher.setAttribute('aria-expanded', String(isOpen));
  if (isOpen) chatbotInput.focus();
}

function getPortfolioReply(question) {
  const text = question.toLowerCase();
  if (/(skill|program|code|html|css|javascript|web)/.test(text)) return 'Christian is learning HTML, CSS, and JavaScript. He enjoys building websites and growing through school and creative projects.';
  if (/(hobb|gaming|game|music|edit)/.test(text)) return 'Christian enjoys programming, gaming, listening to music, and creative editing. His favorite artists include Laufey, Sabrina Carpenter, and Orange & Lemons.';
  if (/(about|story|church|fellowship|who)/.test(text)) return 'Christian is a student and creative learner. School, church, fellowship, and everyday experiences have shaped his teamwork, communication, service, and personal growth.';
  if (/(contact|facebook|instagram|reach)/.test(text)) return 'You can reach Christian through the Facebook and Instagram links in the Contact section of this portfolio.';
  if (/(achievement|project|school)/.test(text)) return 'His portfolio highlights school projects, programming and web design practice, and collaborative group and advocacy work.';
  return 'I can help with Christian’s story, skills, hobbies, projects, music, and contact details. What would you like to know?';
}

function addChatMessage(message, kind) {
  const bubble = document.createElement('div');
  bubble.className = kind === 'user' ? 'user-message' : 'bot-message';
  bubble.textContent = message;
  chatbotMessages.appendChild(bubble);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function askChatbot(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;
  addChatMessage(cleanQuestion, 'user');
  window.setTimeout(() => addChatMessage(getPortfolioReply(cleanQuestion), 'bot'), 260);
}

chatbotLauncher.addEventListener('click', () => setChatOpen(!chatbotPanel.classList.contains('is-open')));
chatbotClose.addEventListener('click', () => setChatOpen(false));
chatbotForm.addEventListener('submit', (event) => { event.preventDefault(); askChatbot(chatbotInput.value); chatbotInput.value = ''; });
document.querySelectorAll('[data-prompt]').forEach((button) => button.addEventListener('click', () => askChatbot(button.dataset.prompt)));
