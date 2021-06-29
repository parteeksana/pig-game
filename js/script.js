'use strict';

//=====================================================================================
//SELECTING ELEMENTS
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

const scoreP1 = document.querySelector('#score--0');
const scoreP2 = document.getElementById('score--1');

const currentScoreP1 = document.querySelector('#current--0');
const currentScoreP2 = document.querySelector('#current--1');

const diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//=======================DECLARING FUNCTIONS ===================================================

const init = function () {
  scores = [0, 0]; //setting the total scores of both the players to 0.
  currentScore = 0;
  activePlayer = 0; //active player value are 0 and 1
  playing = true;

  diceImg.classList.add('hidden');
  scoreP1.textContent = 0;
  scoreP2.textContent = 0;
  currentScoreP1.textContent = 0;
  currentScoreP2.textContent = 0;

  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

// ========================= ROLLING FUNCTIONALITY ============================================================

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generate dice Value ( eg- 1 to 6)
    const diceValue = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice Image according to dice value
    diceImg.classList.remove('hidden');
    diceImg.src = `./images/dice-${diceValue}.png`;

    //3. To Check if dice value is 1 or not (if true, switch to next player)
    if (diceValue !== 1) {
      //display dice value to current Score
      currentScore += diceValue;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    //if dice value is 1, switch to other player
    else {
      switchPlayer();
    }
  }
});

//==================HOLD BTN FUNCTIONALITY =========================================================

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Display current score to Total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if the total score is >=20, finish the game
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceImg.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3. if less, switch to other player
      switchPlayer();
    }
  }
});

//============================= RESETTING THE GAME ==============================================================

btnNew.addEventListener('click', init);
