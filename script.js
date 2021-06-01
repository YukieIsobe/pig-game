'use strict';

// Selecting Elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//starting condition
let playing, currentScore, acctivePlayer, score;
const init = function() {
  playing = true;
  currentScore = 0;
  acctivePlayer = 0;
  score = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}
init();

// Switch the player
const switchPlayer = function() {
  currentScore = 0;
  document.getElementById(`current--${acctivePlayer}`).textContent = 0;
  acctivePlayer === 0 ? acctivePlayer = 1 : acctivePlayer = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function() {
  if(playing) {
    let diceNum = Math.trunc(Math.random() * 6 + 1);
    console.log(`random num : ${diceNum}`);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNum}.png`;
    if(diceNum !== 1) {
      currentScore = diceNum + currentScore;
      document.getElementById(`current--${acctivePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
})

// Holding scores functionality
btnHold.addEventListener('click', function() {
  if (playing) {
    score[acctivePlayer] = currentScore + score[acctivePlayer];
    if (score[acctivePlayer] < 100) {
      document.getElementById(`score--${acctivePlayer}`).textContent = score[acctivePlayer];
      switchPlayer();
    } else {
      playing = false;
      diceEl.classList.add('hidden');
      document.getElementById(`score--${acctivePlayer}`).textContent = 'you are winner!';
      document.querySelector(`.player--${acctivePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${acctivePlayer}`).classList.remove('player--active');
    }
  }
})

// Reset the game functionality
btnNew.addEventListener('click', function() {
  init();
})

