const playfulMessages = [
  'Por favor 🥺',
  'Te lo estoy suplicando',
  'Estoy llorando 😭',
  'Estoy triste',
  'HUHUHUHU 😭',
  'Por favor, di que sí',
  'Voy a llorar',
];

const reactionImages = [
  'https://media1.tenor.com/images/9413ffc5a11722a3cc456a88810750bd/tenor.gif?itemid=14193216',
  'https://emoji.gg/assets/emoji/5228_cat_cri.gif',
  'https://media1.tenor.com/images/a0554662ae7c3c60c0a7fdadac74ef18/tenor.gif?itemid=13931206',
  'https://media3.giphy.com/media/qpCvOBBmBkble/giphy.gif',
  'https://c.tenor.com/fpIAhF2jIY0AAAAC/tenor.gif',
  'https://c.tenor.com/BP70qe8X0J8AAAAC/crycat-crying-cat.gif',
];

const times = [
  '12:00 p. m.',
  '1:00 p. m.',
  '2:00 p. m.',
  '3:00 p. m.',
  '4:00 p. m.',
  '5:00 p. m.',
  '6:00 p. m.',
  '7:00 p. m.',
  '8:00 p. m.',
  '9:00 p. m.',
  '10:00 p. m.',
];

const sceneIds = ['inviteScene', 'gardenScene', 'plannerScene', 'epilogueScene'];
const dateInput = document.querySelector('#dateInput');
const timeInput = document.querySelector('#timeInput');
const foodOptions = [...document.querySelectorAll('.food-option')];
const form = document.querySelector('#dateForm');
const formError = document.querySelector('#formError');
const confirmation = document.querySelector('#confirmation');
const summary = document.querySelector('#summary');
const whatsappButton = document.querySelector('#whatsappButton');
const reactionModal = document.querySelector('#reactionModal');
const reactionTitle = document.querySelector('#reactionTitle');
const reactionImage = document.querySelector('#reactionImage');
const reactionFace = document.querySelector('.reaction-face');
const reactionThinking = document.querySelector('#modalThinking');
const epilogueMusic = document.querySelector('#epilogueMusic');
const musicToggle = document.querySelector('#musicToggle');
const selected = { food: '' };
const bouquetLayers = [...document.querySelectorAll('.bouquet-layer:not(.bouquet-base)')];
const bouquetHotspots = [
  { left: 54.97, top: 21.05, w: 22.56, h: 13.35 },
  { left: 72.21, top: 38.97, w: 34.18, h: 17.19 },
  { left: 32.95, top: 39.25, w: 22.17, h: 15.76 },
  { left: 71.91, top: 25.55, w: 15.14, h: 10.48 },
  { left: 55.14, top: 51.23, w: 13.09, h: 10.22 },
  { left: 74.7, top: 53.6, w: 20.02, h: 13.28 },
  { left: 36.05, top: 17.63, w: 12.5, h: 10.09 },
  { left: 39.43, top: 30.35, w: 12.89, h: 10.42 },
  { left: 24.38, top: 47.57, w: 14.94, h: 11.07 },
  { left: 22.93, top: 26.59, w: 12.7, h: 7.16 },
  { left: 19.51, top: 32.84, w: 8.89, h: 6.51 },
  { left: 51.65, top: 39.51, w: 13.09, h: 9.31 },
  { left: 9.19, top: 39.92, w: 12.3, h: 8.98 },
  { left: 86.94, top: 24.45, w: 4.79, h: 3.39 },
  { left: 53.99, top: 30.11, w: 4.39, h: 3.65 },
  { left: 34.81, top: 52.61, w: 7.23, h: 4.88 },
  { left: 48.81, top: 27.38, w: 3.81, h: 3.52 },
  { left: 76.84, top: 43.89, w: 5.57, h: 2.67 },
];
const epilogueMessages = [
  'Kass, cada flor guarda un poquito del cariño con el que preparé esto para ti.',
  'Gracias por aceptar compartir una salida conmigo. Ya me hace ilusión.',
  'Que esta primavera nos encuentre con tiempo para reírnos y disfrutar juntos.',
];
let discoveredFlowers = 0;
let musicStarted = false;
let musicPrimed = false;

function showScene(id) {
  sceneIds.forEach((sceneId) => {
    const scene = document.querySelector(`#${sceneId}`);
    const active = sceneId === id;
    scene.classList.toggle('is-active', active);
    scene.setAttribute('aria-hidden', String(!active));
  });
}

function addPetals() {
  const layer = document.querySelector('#petalLayer');
  const count = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 5 : 22;
  for (let index = 0; index < count; index += 1) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.setProperty('--drift', `${(Math.random() - 0.5) * 220}px`);
    petal.style.setProperty('--duration', `${3.5 + Math.random() * 3}s`);
    petal.style.animationDelay = `${Math.random() * 1.5}s`;
    layer.appendChild(petal);
    window.setTimeout(() => petal.remove(), 8000);
  }
}

function tomorrowAsInputValue() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDate(value) {
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat('es-PE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Lima',
  }).format(date);
}

function setupPlanner() {
  times.forEach((time) => {
    const option = document.createElement('option');
    option.value = time;
    option.textContent = time;
    timeInput.append(option);
  });
  dateInput.min = tomorrowAsInputValue();
}

function showReaction() {
  const index = Math.floor(Math.random() * playfulMessages.length);
  reactionTitle.textContent = playfulMessages[index];
  reactionImage.classList.remove('is-hidden');
  reactionFace.hidden = true;
  reactionImage.src = reactionImages[index % reactionImages.length];
}

reactionImage.addEventListener('error', () => {
  reactionImage.classList.add('is-hidden');
  reactionFace.hidden = false;
});

function updateSummary() {
  const date = formatDate(dateInput.value);
  summary.innerHTML = `
    <div><dt>Fecha</dt><dd>${date}</dd></div>
    <div><dt>Hora</dt><dd>${timeInput.value}</dd></div>
    <div><dt>Antojo</dt><dd>${selected.food}</dd></div>
  `;

  const message = [
    'Hola Jesus 🌻',
    '',
    'Acepto nuestra salida pendiente.',
    '',
    `Fecha: ${date}`,
    `Hora: ${timeInput.value}`,
    `Se me antoja: ${selected.food}`,
    '',
    'Avísame si esa fecha te parece bien 💛',
  ].join('\n');
  whatsappButton.href = `https://wa.me/51924112585?text=${encodeURIComponent(message)}`;
}

function openFlowerMessage(index) {
  const modal = document.querySelector('#reactionModal');
  const title = document.querySelector('#reactionTitle');
  const image = document.querySelector('#reactionImage');
  const face = document.querySelector('.reaction-face');
  title.textContent = 'Una flor para ti 🌻';
  image.classList.add('is-hidden');
  face.hidden = false;
  document.querySelector('.reaction-copy').textContent = epilogueMessages[index];
  startEpilogueMusic();
  modal.classList.add('flower-message-modal');
  modal.classList.add('is-visible');
  modal.setAttribute('aria-hidden', 'false');
  document.querySelector('#modalYes').hidden = true;
  document.querySelector('#modalThinking').textContent = 'Volver al ramo';
  document.querySelector('#modalThinking').focus();
}

function startEpilogueMusic() {
  musicStarted = true;
  musicToggle.hidden = false;
  if (musicPrimed) {
    epilogueMusic.currentTime = 0;
    epilogueMusic.muted = false;
  } else {
    epilogueMusic.muted = false;
  }
  epilogueMusic.play().then(() => {
    musicToggle.textContent = 'Pausar música';
  }).catch(() => {
    musicToggle.textContent = 'Reproducir música';
  });
}

function primeEpilogueMusic() {
  epilogueMusic.muted = true;
  epilogueMusic.play().then(() => {
    musicPrimed = true;
  }).catch(() => {
    // Algunos navegadores bloquean incluso el audio silenciado hasta el primer toque.
  });
}

function closeFlowerMessage() {
  const modal = document.querySelector('#reactionModal');
  modal.classList.remove('flower-message-modal');
  modal.classList.remove('is-visible');
  modal.setAttribute('aria-hidden', 'true');
  document.querySelector('#modalYes').hidden = false;
  document.querySelector('#modalThinking').textContent = 'Necesito pensarlo';
  document.querySelector('.reaction-copy').textContent = 'Todavía puedes aceptar esta salida pendiente.';
}

function buildBouquetHotspots() {
  const container = document.querySelector('#bouquetHotspots');
  const chosen = [0, 5, 11];
  chosen.forEach((spotIndex, messageIndex) => {
    const spot = bouquetHotspots[spotIndex];
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'bouquet-hotspot';
    button.style.left = `${spot.left - spot.w / 2}%`;
    button.style.top = `${spot.top - spot.h / 2}%`;
    button.style.width = `${spot.w}%`;
    button.style.height = `${spot.h}%`;
    button.setAttribute('aria-label', 'Descubrir mensaje de una flor');
    button.addEventListener('click', () => {
      if (button.classList.contains('is-discovered')) return;
      button.classList.add('is-discovered');
      discoveredFlowers += 1;
      document.querySelector('#bouquetProgress').textContent = `${discoveredFlowers} de 3 flores descubiertas`;
      openFlowerMessage(messageIndex);
      if (discoveredFlowers === 3) document.querySelector('#epilogueFinal').hidden = false;
    });
    container.appendChild(button);
  });
}

function revealBouquet() {
  document.querySelector('#epilogueIntro').hidden = true;
  document.querySelector('#epilogueStage').hidden = false;
  bouquetLayers.forEach((layer, index) => {
    window.setTimeout(() => layer.classList.add('is-revealed'), index * 280);
  });
  buildBouquetHotspots();
}

document.querySelector('#thinkingButton').addEventListener('click', () => {
  showReaction();
  reactionModal.classList.add('is-visible');
  reactionModal.setAttribute('aria-hidden', 'false');
  reactionThinking.focus();
});

function acceptInvitation(event) {
  const button = event.currentTarget;
  button.textContent = '¡Sabía que aceptarías! 🌻';
  button.disabled = true;
  reactionModal.classList.remove('is-visible');
  reactionModal.setAttribute('aria-hidden', 'true');
  addPetals();
  window.setTimeout(() => {
    showScene('gardenScene');
  }, 1050);
}

document.querySelector('#yesButton').addEventListener('click', acceptInvitation);
document.querySelector('#modalYes').addEventListener('click', acceptInvitation);

function closeReactionModal() {
  reactionModal.classList.remove('is-visible');
  reactionModal.classList.remove('flower-message-modal');
  reactionModal.setAttribute('aria-hidden', 'true');
  document.querySelector('#modalYes').hidden = false;
  document.querySelector('#modalThinking').textContent = 'Necesito pensarlo';
  document.querySelector('.reaction-copy').textContent = 'Todavía puedes aceptar esta salida pendiente.';
  document.querySelector('#thinkingButton').focus();
}

document.querySelector('#modalClose').addEventListener('click', closeReactionModal);
reactionThinking.addEventListener('click', () => {
  showReaction();
});
reactionModal.addEventListener('click', (event) => {
  if (event.target === reactionModal) closeReactionModal();
});

document.querySelector('#planButton').addEventListener('click', () => {
  showScene('plannerScene');
  dateInput.focus();
});

foodOptions.forEach((option) => {
  option.addEventListener('click', () => {
    foodOptions.forEach((item) => item.classList.remove('is-selected'));
    option.classList.add('is-selected');
    selected.food = option.dataset.food;
    formError.textContent = '';
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const tomorrow = tomorrowAsInputValue();
  if (!dateInput.value || dateInput.value < tomorrow) {
    formError.textContent = 'Elige una fecha futura, después de hoy.';
    dateInput.focus();
    return;
  }
  if (!timeInput.value) {
    formError.textContent = 'Elige una hora para la salida.';
    timeInput.focus();
    return;
  }
  if (!selected.food) {
    formError.textContent = 'Elige qué se te antoja para la salida.';
    document.querySelector('.food-option').focus();
    return;
  }
  form.hidden = true;
  updateSummary();
  confirmation.hidden = false;
  confirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

document.querySelector('#epilogueButton').addEventListener('click', () => {
  showScene('epilogueScene');
  startEpilogueMusic();
});

document.querySelector('#revealBouquetButton').addEventListener('click', revealBouquet);

musicToggle.addEventListener('click', () => {
  if (!musicStarted) {
    startEpilogueMusic();
    return;
  }
  if (epilogueMusic.paused) {
    epilogueMusic.play();
    musicToggle.textContent = 'Pausar música';
  } else {
    epilogueMusic.pause();
    musicToggle.textContent = 'Reproducir música';
  }
});

document.querySelector('#editButton').addEventListener('click', () => {
  confirmation.hidden = true;
  form.hidden = false;
});

document.querySelector('#modalThinking').addEventListener('click', () => {
  if (document.querySelector('#modalYes').hidden) closeFlowerMessage();
});

setupPlanner();
epilogueMusic.load();
primeEpilogueMusic();
