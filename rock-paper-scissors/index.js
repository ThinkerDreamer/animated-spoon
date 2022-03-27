const newGameBtn = document.querySelector('#new-game-btn');
const gameBtns = document.querySelectorAll('.game-btn');
const instructionsEl = document.querySelector(".instructions");
const rockBtn = document.querySelector("#rock-btn");
const paperBtn = document.querySelector("#paper-btn");
const scissorsBtn = document.querySelector("#scissors-btn");
let outcomeEl = document.querySelector("#outcome-el");
let playerScoreEl = document.querySelector(".player-score-el");
let computerScoreEl = document.querySelector(".computer-score-el");
const weaponChoices = ["rock", "paper", "scissors"];
let playerChoice = "";
let playerScore = 0;
let computerScore = 0;


function startGame() {
    for (let i = 0; i < gameBtns.length; i++) {
        gameBtns[i].style.display = 'inline';
    }
    newGameBtn.style.display = 'none';
    instructionsEl.textContent ="Choose your weapon...";
}

function gameCalculations() {
    let compChoice = computerChoice();
    if (compChoice === playerChoice) {
        outcomeEl.textContent = "It's a tie!";
        playerScore += 0.5;
        computerScore += 0.5;
        renderScore();
    } else if (compChoice === "rock" && playerChoice === "scissors" || 
               compChoice === "paper" && playerChoice === "rock" || 
               compChoice === "scissors" && playerChoice === "paper") {
                   outcomeEl.textContent = `Computer chose ${compChoice}! Computer wins!`;
                   computerScore += 1;
                   renderScore();
    } else if (compChoice === "rock" && playerChoice === "paper" ||
               compChoice === "paper" && playerChoice === "scissors" || 
               compChoice === "scissors" && playerChoice === "rock") {
                   outcomeEl.textContent = `Computer chose ${compChoice}! You win!`;
                   playerScore += 1;
                   renderScore();
               }
}

function computerChoice() {
    let choiceNum = Math.floor(Math.random() * weaponChoices.length);
    return weaponChoices[choiceNum];
}

function chooseRock() {
    playerChoice = "rock";
    gameCalculations();
}
function choosePaper() {
    playerChoice = "paper";
    gameCalculations();
}
function chooseScissors() {
    playerChoice = "scissors";
    gameCalculations();
}

function renderScore() {
    playerScoreEl.textContent = `Player: ${playerScore}`;
    computerScoreEl.textContent = `Computer: ${computerScore}`;
}

newGameBtn.addEventListener('click', function() {
    startGame();
})
rockBtn.addEventListener('click', function() {
    chooseRock();
})
paperBtn.addEventListener('click', function() {
    choosePaper();
})
scissorsBtn.addEventListener('click', function() {
    chooseScissors();
})