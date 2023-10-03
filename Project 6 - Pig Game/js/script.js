"use strict";

const $player0 = document.querySelector(".player--0");
const $player1 = document.querySelector(".player--1");
const $score1 = document.getElementById("score--0");
const $score2 = document.getElementById("score--1");
const $current0 = document.getElementById("current--0");
const $current1 = document.getElementById("current--1");
const $dice = document.querySelector(".dice");
const $btnNew = document.querySelector(".btn--new");
const $btnRoll = document.querySelector(".btn--roll");
const $btnHold = document.querySelector(".btn--hold");
const $icon = document.querySelector(".icon use");

let scores, currentScore, activePlayer, isPlaying, isDiceRolled;
const MAX_SCORE = 20;

const init = () => {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    isPlaying = true;
    isDiceRolled = false;


    $score1.textContent = 0;
    $score2.textContent = 0;
    $current0.textContent = 0;
    $current1.textContent = 0;

    $dice.classList.add("hidden");
    $player0.classList.remove("player--winner");
    $player1.classList.remove("player--winner");
    $player0.classList.add("player--active");
    $player1.classList.remove("player--active");
}
const generateRandomDice = () => Math.trunc(Math.random() * 6 + 1);
const updatePlayerCurrentScore = (currentScore) => document.getElementById(`current--${activePlayer}`).textContent = currentScore;
const updatePlayerTotalScore = () => document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

const switchPlayer = () => {
    activePlayer = activePlayer === 0 ? 1 : 0;
    $player0.classList.toggle("player--active");
    $player1.classList.toggle("player--active");
};

$btnRoll.addEventListener("click", () => {
    if (!isPlaying) return;
    isDiceRolled = true;
    const dice = generateRandomDice();
    $dice.classList.remove("hidden");
    $icon.attributes.href.textContent = `images/sprite.svg#dice-six-faces-${dice}`;
    if (dice !== 1) {
        currentScore += dice;
        updatePlayerCurrentScore(currentScore);
    } else {
        currentScore = 0;
        updatePlayerCurrentScore(currentScore);
        switchPlayer();
    }
});

$btnHold.addEventListener("click", () => {
    if (!isPlaying) return;
    
    $btnRoll.classList.add("btn-hint");
    setTimeout(()=>{
        $btnRoll.classList.remove("btn-hint");
    }, 500);
    
    if(!isDiceRolled) return;
    isDiceRolled = false;

    scores[activePlayer] += currentScore;
    updatePlayerTotalScore();
    if (scores[activePlayer] >= MAX_SCORE) {
        isPlaying = false;
        $dice.classList.add("hidden");
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    } else {
        currentScore = 0;
        updatePlayerCurrentScore(currentScore);
        switchPlayer();
    }
});

$btnNew.addEventListener("click", init);

init();