"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score1El = document.getElementById("score--0");
const score2El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNewEl = document.querySelector(".btn--new");
const btnRollEl = document.querySelector(".btn--roll");
const btnHoldEl = document.querySelector(".btn--hold");
const iconEl = document.querySelector(".icon use");

let scores, currentScore, activePlayer, isPlaying, isDiceRolled;
const MAX_SCORE = 20;

const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;
  isDiceRolled = false;
  score1El.textContent = 0;
  score2El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
const generateRandomDice = () => Math.trunc(Math.random() * 6 + 1);
const updatePlayerCurrentScore = (currentScore) =>
  (document.getElementById(`current--${activePlayer}`).textContent =
    currentScore);
const updatePlayerTotalScore = () =>
  (document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer]);

const switchPlayer = () => {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

const handleBtnRollClick = () => {
  if (!isPlaying) return;
  isDiceRolled = true;
  const dice = generateRandomDice();
  diceEl.classList.remove("hidden");
  iconEl.attributes.href.textContent = `images/sprite.svg#dice-six-faces-${dice}`;
  if (dice !== 1) {
    currentScore += dice;
    updatePlayerCurrentScore(currentScore);
  } else {
    currentScore = 0;
    updatePlayerCurrentScore(currentScore);
    switchPlayer();
  }
};

const handleBtnHoldClick = () => {
  if (!isPlaying) return;

  btnRollEl.classList.add("btn-hint");
  setTimeout(() => {
    btnRollEl.classList.remove("btn-hint");
  }, 500);

  if (!isDiceRolled) return;

  isDiceRolled = false;
  scores[activePlayer] += currentScore;
  updatePlayerTotalScore();
  if (scores[activePlayer] >= MAX_SCORE) {
    isPlaying = false;
    diceEl.classList.add("hidden");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
  } else {
    currentScore = 0;
    updatePlayerCurrentScore(currentScore);
    switchPlayer();
  }
};

btnRollEl.addEventListener("click", handleBtnRollClick);

btnHoldEl.addEventListener("click", handleBtnHoldClick);

btnNewEl.addEventListener("click", init);

init();
