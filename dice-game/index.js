// Create variables for the game state
let player1Score = 0;
let player2Score = 0;
let player1Turn = true;
let player1Name = "Player 1";
let player2Name = "Player 2";

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.querySelector("#player1Dice");
const player2Dice = document.querySelector("#player2Dice");
const player1Scoreboard = document.querySelector("#player1Scoreboard");
const player2Scoreboard = document.querySelector("#player2Scoreboard");
const message = document.querySelector("#message");
const rollBtn = document.querySelector("#rollBtn");
const resetBtn = document.querySelector("#resetBtn");
const submitBtn = document.querySelector("#submit-modal");
const player1NameEl = document.querySelector("#player1-name-el");
const player2NameEl = document.querySelector("#player2-name-el");
const container = document.querySelector(".container");
const overlay = document.querySelector("#overlay");
const modal = document.querySelector("#modal");

function showResetButton() {
    rollBtn.style.display = "none";
    resetBtn.style.display = "block";
}

/* Submit the modal with players' names */
submitBtn.addEventListener("click", function() {
    if (player1NameEl.value) {
        player1Name = player1NameEl.value;
    }
    if (player2NameEl.value) {
        player2Name = player2NameEl.value;
    }
    message.textContent = `${player1Name}'s Turn`;
    container.style.display = "block";
    modal.style.display = "none";
    overlay.style.display = "none";
    overlay.innerHTML = "";
})

/* Hook up a click event listener to the Roll Dice Button. */
 rollBtn.addEventListener("click", function() {
    const randomNumber = Math.floor(Math.random() * 6) + 1

    if (player1Turn) {
        player1Score += randomNumber;
        player1Scoreboard.textContent = player1Score;
        player1Dice.textContent = randomNumber;
        player1Dice.classList.remove("active");
        player2Dice.classList.add("active");
        message.textContent = `${player2Name}'s Turn`;
    } else {
        player2Score += randomNumber;
        player2Scoreboard.textContent = player2Score;
        player2Dice.textContent = randomNumber;
        player2Dice.classList.remove("active");
        player1Dice.classList.add("active");
        message.textContent = `${player1Name}'s Turn`;
    }
    
    if (player1Score >= 20 && !player1Turn && player2Score < 20) {
        message.textContent = `${player1Name} Won 🥳`;
        showResetButton();
    } else if (player1Score >= 20 && player2Score >= 20) {
        message.textContent = "It's a tie! 💖🤝";
        showResetButton();
    } else if (player2Score >= 20) {
        message.textContent = `${player2Name} Won 🎉`;
        showResetButton();
    }
    player1Turn = !player1Turn;
})
 
resetBtn.addEventListener("click", function(){
    reset();
})

function reset() {
    player1Score = 0;
    player2Score = 0;
    player1Turn = true;
    player1Scoreboard.textContent = 0;
    player2Scoreboard.textContent = 0;
    player1Dice.textContent = "-";
    player2Dice.textContent = "-";
    message.textContent = `${player1Name}'s Turn`;
    resetBtn.style.display = "none";
    rollBtn.style.display = "block";
    player2Dice.classList.remove("active");
    player1Dice.classList.add("active");
}
