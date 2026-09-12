const landing = document.querySelector('#landingScreen');
const noteOpen = document.querySelector('#noteOpenScreen');
const question = document.querySelector('#questionScreen');
const celebration = document.querySelector('#celebrationScreen');
const openNote = document.querySelector('#openNote');

function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(item => item.classList.remove('is-active'));
  screen.classList.add('is-active');
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function burst(amount = 150) {
  const layer = document.querySelector('#particleLayer');
  for (let index = 0; index < amount; index += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.textContent = index % 7 === 0 ? '✦' : (index % 4 === 0 ? '💗' : '♥');
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.fontSize = `${12 + Math.random() * 28}px`;
    particle.style.animationDuration = `${2.8 + Math.random() * 3.8}s`;
    particle.style.animationDelay = `${Math.random() * 1.8}s`;
    particle.style.setProperty('--drift', `${-160 + Math.random() * 320}px`);
    particle.style.setProperty('--spin', `${-520 + Math.random() * 1040}deg`);
    layer.appendChild(particle);
    particle.addEventListener('animationend', () => particle.remove());
  }
}

function celebrate() {
  burst();
  showScreen(celebration);
}

openNote.addEventListener('click', () => {
  openNote.classList.add('opened');
  burst(35);
  setTimeout(() => showScreen(noteOpen), 900);
});
document.querySelector('#continueToQuestion').addEventListener('click', () => showScreen(question));
document.querySelector('#yesMain').addEventListener('click', celebrate);
document.querySelector('#whyButton').addEventListener('click', () => {
  showScreen(document.querySelector('#quoteScreen'));
});
document.querySelector('#yesQuote').addEventListener('click', celebrate);
document.querySelector('#yesAttempt1').addEventListener('click', celebrate);
document.querySelector('#yesAttempt2').addEventListener('click', celebrate);
document.querySelector('#yesAttempt3').addEventListener('click', celebrate);
document.querySelector('#maybeLater').addEventListener('click', () => showScreen(document.querySelector('#finalScreen')));
document.querySelector('#finalYes').addEventListener('click', celebrate);
document.querySelector('#finalWhy').addEventListener('click', () => showScreen(document.querySelector('#quoteScreen')));
document.querySelector('#noStart').addEventListener('click', () => showScreen(document.querySelector('#attempt1')));
document.querySelector('#no1').addEventListener('click', () => showScreen(document.querySelector('#attempt2')));
document.querySelector('#no2').addEventListener('click', () => showScreen(document.querySelector('#attempt3')));
document.querySelector('#no3').addEventListener('click', () => showScreen(document.querySelector('#playfulScreen')));
document.querySelector('#againButton').addEventListener('click', () => showScreen(landing));

for (let index = 0; index < 18; index += 1) {
  const heart = document.createElement('span');
  heart.textContent = index % 3 === 0 ? '✦' : '♥';
  heart.style.cssText = `position:absolute;left:${Math.random() * 100}%;top:${Math.random() * 100}%;color:#ffffff90;font-size:${10 + Math.random() * 14}px;animation:float ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite;`;
  document.querySelector('.hearts-bg').appendChild(heart);
}