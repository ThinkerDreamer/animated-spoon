const resetBtn = document.getElementById("reset");
const messageEl = document.getElementById("message");
const newGameBtn = document.getElementById("new-game");
const squares = document.getElementsByClassName("square");
const player1NameEl = document.getElementById("player1Name");
const player2NameEl = document.getElementById("player2Name");
const player1ScoreEl = document.getElementById("player1Score");
const player2ScoreEl = document.getElementById("player2Score");
const overlay = document.querySelector(".overlay");
const player1Input = document.getElementById("player1-input");
const player2Input = document.getElementById("player2-input");
const nameSubmit = document.getElementById("name-submit");

let player1Name = "Player 1";
let player2Name = "Player 2";
let player1Score = 0;
let player2Score = 0;
let player1sTurn = true;
let player1Symbol = "X";
let player2Symbol = "O";
let gameOver = false;
let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let winCombos = [   [0, 1, 2],  //horizontal
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
            if (player1sTurn) {
                player1Move(square.id);
            } else {
                player2Move(square.id);
            }
        }
        renderBoard();
    });
}

newGameBtn.addEventListener("click", function() {
    overlay.style.display = "flex";
});

resetBtn.addEventListener("click", function() {
    resetGame();
});

nameSubmit.addEventListener("click", function(event) {
    // Prevent the page from refreshing
    event.preventDefault();
    // Get players' preferred names, otherwise use "Player 1/2" as defaults
    player1Name = player1Input.value ? player1Input.value : player1Name;
    player2Name = player2Input.value ? player2Input.value : player2Name;
    overlay.style.display = "none";
    startGame();
})

function renderBoard() {
    let content = "";
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < squares.length; j++) {
            // if the symbol is in the array, render it on the DOM
            if (board[i] == player1Symbol) {
                content = player1Symbol;
            } else if (board[i] == player2Symbol) {
                content = player2Symbol;
            } else {
                content = ""; // otherwise, leave it blank
            }
        }
        squares[i].textContent = content;
    }
    player1ScoreEl.textContent = player1Score;
    player2ScoreEl.textContent = player2Score;
}

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

function startGame() {
    enableBoard();
    player1NameEl.textContent = player1Name;
    player2NameEl.textContent = player2Name;
    messageEl.textContent = `${player1Name}, select a square.`;
    renderBoard();
    // Hide the newGame button
    newGameBtn.style.display = "none";
}

function player1Move(squareNum) {
    // squareNum is number of clicked square
    let move = squareNum;
    // If an X or O is in that spot already...
    if (board[move] == player1Symbol || board[move] == player2Symbol) {
        messageEl.textContent = "Invalid move. Please choose an unoccupied square.";
        // ...make the same player go again
        player1sTurn = true;
    } else {
        // If it's a valid move, record it
        board[move] = player1Symbol;
        if (checkWin(player1Symbol)) {
            player1Wins();
        } else if (checkTie()) {
            tieGame();
        } else {
            // If no win, no tie, let the next player go
            player1sTurn = false;
            messageEl.textContent = `${player2Name}, select a square.`;
            renderBoard();
        } 
    }
}
function player2Move(squareNum) {
    // squareNum is number of clicked square
    let move = squareNum;
    // If an X or O is in that spot already...
    if (board[move] == player1Symbol || board[move] == player2Symbol) {
        messageEl.textContent = "Invalid move. Please choose an unoccupied square.";
        // ...make the same player go again
        player1sTurn = false;
    } else {
        // If it's a valid move, record it
        board[move] = player2Symbol;  
        if (checkWin(player2Symbol)) {
            player2Wins();
        } else if (checkTie()) {
            tieGame();
        } else {
            // If no win, no tie, let the next player go
            player1sTurn = true;
            messageEl.textContent = `${player1Name}, select a square.`;
            renderBoard();
        }
    }
}

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

function endGame() {
    gameOver = true;
    player1sTurn = !player1sTurn; // The next player gets a turn to go first -- currently not working
    // Show reset button
    resetBtn.style.display = "inline-block";
    disableBoard();
}

function resetGame() {
    // Remove all X's and O's
    board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    gameOver = false;
    enableBoard();
    messageEl.textContent = `${player1Name}, select a square.`;
    renderBoard();
    // Hide reset button
    resetBtn.style.display = "none";
}

disableBoard(); // When the page loads, the board is disabled