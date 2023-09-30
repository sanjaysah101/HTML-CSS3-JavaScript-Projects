'use strict';

const $secretNumber = document.querySelector(".secretNumber");
const $againBtn = document.querySelector("#again");
const $messageLabel = document.querySelector(".message");
const $checkResultBtn = document.querySelector("#check-result");
const $scoreLabel = document.getElementById("score");
const $highScoreLabel = document.getElementById("highscore");
const $userGuessInput = document.getElementById("guess");
const $body = document.querySelector("body");

let score = 20;
let highScore = 0;
let isGameOver = false;

const generateNumber = () => Math.trunc(Math.random() * 20 + 1);
const computeHighScore = currentScore => highScore = Math.max(highScore, currentScore);
const displayMessage = message => $messageLabel.textContent = message;

function resetGame() {
    score = 20;
    isGameOver = false;
    secretNumber = generateNumber();
    displayMessage("Start Guessing...");
    $scoreLabel.textContent = score;
    $highScoreLabel.textContent = highScore;
    $userGuessInput.disabled = false;
    $userGuessInput.focus();
    $userGuessInput.classList.remove("disable");
    $userGuessInput.placeholder = "";
    $userGuessInput.value = "";
    $secretNumber.textContent = "?";
    $checkResultBtn.textContent = "Check!";
    $body.style.backgroundColor = "#000";
}

function disableUserInput() {
    $userGuessInput.disabled = true;
    $userGuessInput.classList.add("disable");
    $userGuessInput.placeholder = "Game over";
    $userGuessInput.value = "";
    $checkResultBtn.textContent = "Over!";
}

let secretNumber = generateNumber();

$againBtn.addEventListener("click", () => resetGame());

$checkResultBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const userGuess = +$userGuessInput.value;

    if (score <= 0 || isGameOver) {
        displayMessage("🚫 No Chance Left");
        disableUserInput();
        $secretNumber.textContent = secretNumber;
        return;
    }
    if (!$userGuessInput.value) displayMessage("❌ invalid Number");
    else if (userGuess > secretNumber) displayMessage("📈 Too High");
    else if (userGuess < secretNumber) displayMessage("📉 Too Low");
    else {
        displayMessage("🎊 Correct Guess");
        isGameOver = true;
        computeHighScore(score);
        disableUserInput();
        $body.style.backgroundColor = "#60b347";
        $secretNumber.textContent = secretNumber;
    }

    score--;
    $scoreLabel.textContent = score;
    $highScoreLabel.textContent = highScore;
    // console.log(highScore);

    console.log(score);
})




