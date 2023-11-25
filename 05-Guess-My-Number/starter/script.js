'use strict';

// ********************    VIDEO 3     ********************
// console.log(document.querySelector('.message').textContent);

// ********************    VIDEO 5     ********************
/*
document.querySelector('.message').textContent = '🎉 Correct Number';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 2;
console.log(document.querySelector('.guess').value);
*/

// ********************    VIDEO 6     ********************
// listen to event
// function is a value so we can pass it to the another function as argument
// javascript engine will call this function after event happened
/*
document.querySelector('.check').addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No number';
  }
});
*/

// ********************    VIDEO 7     ********************
/*
const secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20; // always keep data in code not DOM

document.querySelector('.check').addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No number';
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉 Correct number';
  }
  if (score > 0) {
    if (guess < secretNumber) {
      document.querySelector('.message').textContent = '📉 Too low';
      document.querySelector('.score').textContent = --score;
    } else if (guess > secretNumber) {
      document.querySelector('.message').textContent = '📈 Too high';
      document.querySelector('.score').textContent = --score;
    }
  } else {
    document.querySelector('.message').textContent = '💥 You lost the game';
  }
});
*/

// ********************    VIDEO 8     ********************
/*
const secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20; // always keep data in code not DOM

document.querySelector('.check').addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No number';
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉 Correct number';
    // for changing css style we use style property from querySelector
    // the value of the style must be string
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;
  }
  if (score > 0) {
    if (guess < secretNumber) {
      document.querySelector('.message').textContent = '📉 Too low';
      document.querySelector('.score').textContent = --score;
    } else if (guess > secretNumber) {
      document.querySelector('.message').textContent = '📈 Too high';
      document.querySelector('.score').textContent = --score;
    }
  } else {
    document.querySelector('.message').textContent = '💥 You lost the game';
  }
});
*/

// ********************    VIDEO 9     ********************
// code challenge
/*
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20; // always keep data in code not DOM

document.querySelector('.check').addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No number';
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉 Correct number';
    // for changing css style we use style property from querySelector
    // the value of the style must be string
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;
  }
  if (score > 0) {
    if (guess < secretNumber) {
      document.querySelector('.message').textContent = '📉 Too low';
      document.querySelector('.score').textContent = --score;
    } else if (guess > secretNumber) {
      document.querySelector('.message').textContent = '📈 Too high';
      document.querySelector('.score').textContent = --score;
    }
  } else {
    document.querySelector('.message').textContent = '💥 You lost the game';
  }
});

document.querySelector('.again').addEventListener('click', () => {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.score').textContent = score;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = '';
});
*/

// ********************    VIDEO 10     ********************

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20; // always keep data in code not DOM
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);

  if (!guess) {
    displayMessage('⛔ No number');
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct number');
    // for changing css style we use style property from querySelector
    // the value of the style must be string
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (score > 0) {
    if (guess < secretNumber) {
      displayMessage('📉 Too low');
      document.querySelector('.score').textContent = --score;
    } else if (guess > secretNumber) {
      displayMessage('📈 Too high');
      document.querySelector('.score').textContent = --score;
    }
  } else {
    displayMessage('💥 You lost the game');
  }
});

document.querySelector('.again').addEventListener('click', () => {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.score').textContent = score;
  document.querySelector('body').style.backgroundColor = '#222';
  displayMessage('Start guessing...');
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = '';
});
