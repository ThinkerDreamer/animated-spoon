const resetBtn = document.getElementById("reset");
const messageEl = document.getElementById("message");
const newGameBtn = document.getElementById("new-game");
const squares = document.getElementsByClassName("square");
const player1NameEl = document.getElementById("player1Name");
const player2NameEl = document.getElementById("player2Name");
const player1ScoreEl = document.getElementById("player1Score");
const player2ScoreEl = document.getElementById("player2Score");
const overlay = document.querySelector(".overlay");
const humanVsHumanBtn = document.getElementById("human-vs-human");
const humanVsComputerBtn = document.getElementById("human-vs-computer");
const playerNameInputs = document.getElementsByClassName("player-name-input");
const modalH2 = document.getElementById("modal-h2");
const player1Label = document.getElementById("player1-label");
const player2Label = document.getElementById("player2-label");
const player1Input = document.getElementById("player1-input");
const player2Input = document.getElementById("player2-input");
const nameSubmit = document.getElementById("name-submit");

let player1Name = "Player 1";
let player2Name = "Player 2";
let player1Score = 0;
let player2Score = 0;
let playAgainstComputer = false;
let player1sTurn = true;
let gameOver = false;
const player1Symbol = "X";
const player2Symbol = "O";
let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const winCombos = [ [0, 1, 2],  //horizontal
                    [3, 4, 5],  //horizontal
                    [6, 7, 8],  //horizontal
                    [0, 3, 6],  //vertical
                    [1, 4, 7],  //vertical
                    [2, 5, 8],  //vertical
                    [0, 4, 8],  //diagonal
                    [2, 4, 6]   //diagonal
                  ];

// Add an event listener to each square according to its ID number
for (let square of squares) {
    square.addEventListener("click", function() {
        if (!gameOver) {
            playerMove(square.id)
        }
        renderBoard();
    });
}

// When start button is clicked, show modal to choose game mode
newGameBtn.addEventListener("click", function() {
    overlay.style.display = "flex";
});

humanVsHumanBtn.addEventListener("click", function() {
    playAgainstComputer = false;
    displayNameInputs();
});

function displayNameInputs() {
    for (let input of playerNameInputs) {
        input.style.display = "block";
    }
    nameSubmit.style.display = "inline-block";
    humanVsHumanBtn.style.display = "none";
    humanVsComputerBtn.style.display = "none";
}

humanVsComputerBtn.addEventListener("click", function() {
    playAgainstComputer = true;
    player1Name = "Human";
    player2Name = "Computer";
    modalH2.textContent = "Enter your name, human.";
    modalH2.style.marginBottom = "10px";
    displayNameInputs();
    player2Input.value = "Computer";
    player2Input.setAttribute("disabled", "true");
    player1Label.textContent = "Human";
    player2Label.textContent = "Computer";
});

resetBtn.addEventListener("click", function() {
    resetGame();
});

// Modal event listener
nameSubmit.addEventListener("click", function(event) {
    // Prevent the page from refreshing
    event.preventDefault();
    // Get players' preferred names, otherwise use "Player 1/2" / "Human/Computer" as defaults
    player1Name = player1Input.value ? player1Input.value : player1Name; 
    player2Name = player2Input.value ? player2Input.value : player2Name;
    // Hide the overlay
    overlay.style.display = "none";
    startGame();
})

function renderBoard() {
    let content = "";
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < squares.length; j++) {
            // If the symbol is in the array, render it on the DOM
            if (board[i] == player1Symbol) {
                content = player1Symbol;
            } else if (board[i] == player2Symbol) {
                content = player2Symbol;
            } else {
                // Otherwise, leave it blank
                content = "";
            }
        }
        squares[i].textContent = content;
    }
    player1ScoreEl.textContent = player1Score;
    player2ScoreEl.textContent = player2Score;
}

// Functions to control the board's clickability
function enableBoard() {
    for (let square of squares) {
        square.disabled = false;
        square.style.cursor = "pointer";
    }
}
function disableBoard() {
    for (let square of squares) {
        square.disabled = true;
        square.style.cursor = "default";
    }
}

// Function for first time playing, add names to the DOM
function startGame() {
    enableBoard();
    // Add player names to the DOM
    player1NameEl.textContent = player1Name;
    player2NameEl.textContent = player2Name;
    // Instruct player 1 to go first
    messageEl.textContent = `${player1Name}, select a square.`;
    renderBoard();
    // Hide the newGame button
    newGameBtn.style.display = "none";
}

// Main game function when a square is clicked
function playerMove(squareNum) {
    // If it's the human's move, allow them to make a move
    if ((playAgainstComputer && player1sTurn) || !playAgainstComputer) {
        // squareNum is number of clicked square
        let move = squareNum;
        let playerName = "";
        // If an X or O is in that spot already...
        if (board[move] == player1Symbol || board[move] == player2Symbol) {
            messageEl.textContent = "Invalid move. Please choose an unoccupied square.";
            // ...make the same player go again (don't change player1sTurn)
        } else { // If the square is empty
            if (player1sTurn) {
                // If it's a valid move, record it with an X
                board[move] = player1Symbol;
                if (checkWin(player1Symbol)) {
                    player1Wins();
                    return; // Don't change player1sTurn, check for a tie, or render the board
                }
            } else { // Player 2's turn
                // If it's a valid move, record it with an O
                board[move] = player2Symbol;
                if (checkWin(player2Symbol)) {
                    player2Wins();
                    return; // Don't change player1sTurn, check for a tie, or render the board
                } 
            }
            if (checkTie()) {
                tieGame();
            } else {
                // If no win, no tie, let the next player go
                player1sTurn = !player1sTurn;
                playerName = player1sTurn ? player1Name : player2Name;
                messageEl.textContent = `${playerName}, select a square.`;
                renderBoard();
                if (playAgainstComputer && !player1sTurn) {
                    computerMove();
                }
            }
        }
    }
}

// TODO: Add computer logic
//    Computer's choices of a move: 
//      1) If a move completes a computer win, make it
//      2) If a move blocks a human win, make it
//      3) If the center square is empty, take it
//      4) If the corners are empty, take one of them
//      5) Else, the sides are empty, take one of them

function computerMove() {
    // If it's player 2's turn (computer's turn), choose a random square
    if (!player1sTurn) {
        let randomSquare = Math.floor(Math.random() * 9);
        while (board[randomSquare] == player1Symbol || board[randomSquare] == player2Symbol) {
            randomSquare = Math.floor(Math.random() * 9);
        }
        messageEl.textContent = `Computer is thinking...`;
        setTimeout(() => {
            board[randomSquare] = player2Symbol;
            if (checkWin(player2Symbol)) {
                player2Wins();
            } else if (checkTie()) {
                tieGame();
            } else {
                player1sTurn = !player1sTurn;
                messageEl.textContent = `${player1Name}, select a square.`;
                renderBoard();
            }
        }, 1750); // Delay computer's move by 1.75 seconds
    }
}

// Boolean functions to check if there is a win or tie
function checkWin(player) {
    // Check each winning combo to see if player has it
    for (let i = 0; i < winCombos.length; i++) {
        if (board[winCombos[i][0]] == player && board[winCombos[i][1]] == player && board[winCombos[i][2]] == player) {
            return true;
        }
    }
    return false;
}
function checkTie() {
    // Count number of squares with an X or O = fullSquares
    let fullSquares = 0;
    for (let i = 0; i < board.length; i++) {
        if (board[i] == player1Symbol || board[i] == player2Symbol) {
            fullSquares++;
        }
        if (fullSquares == 9) {
            // If all 9 squares are full with no winner, it's a tie
            return true;
        }
    }
}

// Game outcomes (win/tie/lose) functions
function player1Wins() {
    messageEl.textContent = `${player1Name} wins!`;
    player1Score++;
    endGame();
}
function player2Wins() {
    messageEl.textContent = `${player2Name} wins!`;
    player2Score++;
    endGame();
}
function tieGame() {
    messageEl.textContent = "It's a tie!";
    player1Score += 0.5;
    player2Score += 0.5;
    endGame();
}

// End game function
function endGame() {
    renderBoard();
    gameOver = true;
    // In Human vs. Human, the player who played last goes second next game
    if (!playAgainstComputer) {
        player1sTurn = !player1sTurn; 
    } else {
        // Human always goes first against computer
        player1sTurn = true;
    }
    // Show reset button
    resetBtn.style.display = "inline-block";
    disableBoard();
}

// Resets game to play again when reset button is clicked
function resetGame() {
    // Remove all X's and O's
    board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    gameOver = false;
    enableBoard();
    let playerName = player1sTurn ? player1Name : player2Name;
    messageEl.textContent = `${playerName}, select a square.`;
    renderBoard();
    // Hide reset button
    resetBtn.style.display = "none";
}

disableBoard(); // When the page loads, the board is disabled