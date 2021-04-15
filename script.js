'use strict';

const highScoreElem = document.querySelector('.highscore');
const body = document.querySelector('body');
const again = document.querySelector('.again');
const checkBtn = document.querySelector('.check');
const number = document.querySelector('.number');
const message = document.querySelector('.message');
const showScore = document.querySelector('.score');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const saveBtn = document.querySelector('.saveBtn');
const closeBtn = document.querySelector('.close');

// 🤔 Math.trunc() => This method ignore the decimal number part.

// const bgSound = new sound('sounds/bg.mp3');
const winSound = new sound('sounds/win.wav');
const bgSound = new sound('sounds/bg.mp3');
const loseSound = new sound('sounds/lose.wav');

let secretNumber = Math.ceil(Math.random() * 20);
let score = 20;
let highScore = 0;

// Score
const restScore = () => {
  if (score > 1) {
    score = score - 1;
    showScore.textContent = score;
    bgSound.play();
  } else if (score === 1) {
    message.textContent = '💥 You lost the game!';
    document.querySelector('.guess').readOnly = false;

    bgSound.stop();
    loseSound.play();
    showScore.textContent = 0;
  }
};

// Set High Score UserName
const userNameSet = () => {
  let userName = document.querySelector('.userName').value;
  if (userName !== '') {
    highScoreElem.textContent = `${highScore} - ${userName}`;
  }
};

closeBtn.addEventListener('click', () => {
  if (
    !modal.classList.contains('hidden') &&
    !modal.classList.contains('hidden')
  ) {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    saveBtn.addEventListener('click', userNameSet);
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    if (
      !modal.classList.contains('hidden') &&
      !modal.classList.contains('hidden')
    ) {
      userNameSet();
      modal.classList.add('hidden');
      overlay.classList.add('hidden');
      saveBtn.addEventListener('click', userNameSet);
    }
  }
});

// High Score
const calcHighscore = () => {
  if (score > highScore) {
    highScore = score;

    if (
      modal.classList.contains('hidden') &&
      modal.classList.contains('hidden')
    ) {
      modal.classList.remove('hidden');
      overlay.classList.remove('hidden');
      saveBtn.addEventListener('click', userNameSet);
    }
  }
};

// Background Colors Options
const blueColor =
  'radial-gradient(circle, rgba(60,255,109,1) 0%, rgba(33,77,251,1) 100%)';
const greenColor =
  'radial-gradient(circle, rgba(33,77,251,1) 0%, rgba(60,255,109,1) 100%)';

// Comparing guess to secretNumber
const guessComparing = () => {
  let guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    const message = document.querySelector('.message');
    message.textContent = '⛔ No number!';
  } else if (guess === secretNumber) {
    message.textContent = '🥳 Corrent Number!';
    number.textContent = secretNumber;
    body.style.background = blueColor;
    number.style.width = '30rem';
    bgSound.stop();
    winSound.play();
    document.querySelector('.guess').readOnly = true;
    calcHighscore();
  } else if (guess > secretNumber) {
    message.textContent = '🔺 Too high!';
    restScore();
  } else if (guess < secretNumber) {
    message.textContent = '🔻 Too low!';
    restScore();
  }
};

// Click and Key eventListeners in guessComparing function
checkBtn.addEventListener('click', guessComparing);
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') guessComparing();
});

//
again.addEventListener('click', () => {
  let guess = document.querySelector('.guess');

  message.textContent = 'Start guessing...';
  secretNumber = Math.ceil(Math.random() * 20);
  body.style.background = '#222';
  number.style.width = '15rem';
  number.textContent = '?';
  guess.value = '';

  score = 20;
  showScore.textContent = score;
  document.querySelector('.guess').readOnly = false;
  bgSound.stop();
});

// Sound Method for Sound effects
function sound(src) {
  this.sound = document.createElement('audio');
  this.sound.src = src;
  this.sound.setAttribute('preload', 'auto');
  this.sound.setAttribute('controls', 'none');
  this.sound.style.display = 'none';
  document.body.appendChild(this.sound);

  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}
