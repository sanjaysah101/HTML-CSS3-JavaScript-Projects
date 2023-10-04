"use strict";

const secretNumberEl = document.querySelector(".secretNumber");
const againBtnEl = document.querySelector("#again");
const messageLabelEl = document.querySelector(".message");
const checkResultBtnEl = document.querySelector("#check-result");
const scoreLabelEl = document.getElementById("score");
const highScoreLabelEl = document.getElementById("highscore");
const userGuessInputEl = document.getElementById("guess");
const bodyEl = document.querySelector("body");

let secretNumber,
  score,
  isGameOver,
  highScore = 0;

const generateNumber = () => Math.trunc(Math.random() * 20 + 1);
const displayMessage = (message) => (messageLabelEl.textContent = message);
const displaySecretNumber = (secretNumber) =>
  (secretNumberEl.textContent = secretNumber);
const changeBackgroundColor = (color) => (bodyEl.style.backgroundColor = color);
const updateHighScoreElm = (score) =>
  (highScoreLabelEl.textContent = Math.max(highScore, score));
const updateScoreLabelElm = (score) => (scoreLabelEl.textContent = score);
const updateCheckResultBtnText = (text) =>
  (checkResultBtnEl.textContent = text);

function init() {
  score = 20;
  isGameOver = false;
  secretNumber = generateNumber();
}

const resetGame = () => {
  init();
  userGuessInputEl.disabled = false;
  userGuessInputEl.focus();
  userGuessInputEl.classList.remove("disable");
  userGuessInputEl.placeholder = "";
  userGuessInputEl.value = "";
  updateCheckResultBtnText("Check!");
  displayMessage("Start Guessing...");
  displaySecretNumber("?");
  updateScoreLabelElm(score);
  changeBackgroundColor("#000");
};

const disableUserInput = () => {
  userGuessInputEl.disabled = true;
  userGuessInputEl.classList.add("disable");
  userGuessInputEl.placeholder = "Game over";
  userGuessInputEl.value = "";
  updateCheckResultBtnText("Over!");
};

const handleCheckResultClick = (e) => {
  e.preventDefault();
  const userGuess = +userGuessInputEl.value;

  if (score <= 0 || isGameOver) {
    displayMessage("🚫 No Chance Left");
    disableUserInput();
    displaySecretNumber(secretNumber);
    return;
  }
  if (!userGuessInputEl.value) displayMessage("❌ invalid Number");
  else if (userGuess > secretNumber) displayMessage("📈 Too High");
  else if (userGuess < secretNumber) displayMessage("📉 Too Low");
  else {
    isGameOver = true;
    displayMessage("🎊 Correct Guess");
    disableUserInput();
    changeBackgroundColor("#60b347");
    displaySecretNumber(secretNumber);
    updateHighScoreElm(score);
  }
  updateScoreLabelElm(--score);
};

init();

againBtnEl.addEventListener("click", resetGame);

checkResultBtnEl.addEventListener("click", handleCheckResultClick);
