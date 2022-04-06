const square0 = document.getElementById("0");
const square1 = document.getElementById("1");
const square2 = document.getElementById("2");
const square3 = document.getElementById("3");
const square4 = document.getElementById("4");
const square5 = document.getElementById("5");
const square6 = document.getElementById("6");
const square7 = document.getElementById("7");
const square8 = document.getElementById("8");
const squares = document.getElementsByClassName("square");
const messageEl = document.getElementById("message");
const newGameBtn = document.getElementById("new-game");
const resetBtn = document.getElementById("reset");
const player1NameEl = document.getElementById("player1Name");
const player2NameEl = document.getElementById("player2Name");
const player1ScoreEl = document.getElementById("player1Score");
const player2ScoreEl = document.getElementById("player2Score");

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
    startGame();
});
resetBtn.addEventListener("click", function() {
    resetGame();
});

let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let player1Name = "";
let player2Name = "";
let player1Score = 0;
let player2Score = 0;
let player1sTurn = true;
let player1Symbol = "X";
let player2Symbol = "O";
let gameOver = false;
let winCombos = [   [0, 1, 2],  //horizontal
                    [3, 4, 5],  //horizontal
                    [6, 7, 8],  //horizontal
                    [0, 3, 6],  //vertical
                    [1, 4, 7],  //vertical
                    [2, 5, 8],  //vertical
                    [0, 4, 8],  //diagonal
                    [2, 4, 6]   //diagonal
                ];

function renderBoard() {
    let content = "";
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < squares.length; j++) {
            if (board[i] == player1Symbol) {
                content = player1Symbol;
            } else if (board[i] == player2Symbol) {
                content = player2Symbol;
            } else {
                content = "";
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

function startGame() {
    enableBoard();
    player1Name = prompt("Welcome to Tic Tac Toe!\n\nPlayer 1, please enter your name: ") || "Player 1";
    player2Name = prompt("Player 2, please enter your name: ") || "Player 2";
    player1NameEl.textContent = player1Name;
    player2NameEl.textContent = player2Name;
    messageEl.textContent = `${player1Name}, select a square.`;
    renderBoard();
    newGameBtn.style.display = "none";
}

function player1Move(squareNum) {
    let move = squareNum;
    console.log("player1Move: " + board[move]);
    if (board[move] == player1Symbol || board[move] == player2Symbol) {
        messageEl.textContent = "Invalid move. Please choose an unoccupied square.";
        player1sTurn = true;
    } else {
        board[move] = player1Symbol;
        if (!checkWin(player1Symbol) && !checkTie()) {
            player1sTurn = false;
            messageEl.textContent = `${player2Name}, select a square.`;
            renderBoard();
        } else if (checkWin(player1Symbol)) {
            player1Wins();
        } else if (checkTie()) {
            tieGame();
        }
    }
}
function player2Move(squareNum) {
    let move = squareNum;
    if (board[move] == player1Symbol || board[move] == player2Symbol) {
        messageEl.textContent = "Invalid move. Please choose an unoccupied square.";
        player1sTurn = false;
    } else {
        board[move] = player2Symbol;  
        if (!checkWin(player2Symbol) && !checkTie()) {
            player1sTurn = true;
            messageEl.textContent = `${player1Name}, select a square.`;
            renderBoard();
        } else if (checkWin(player2Symbol)) {
            player2Wins();
        } else if (checkTie()) {
            tieGame();
        }
    }
}

function checkWin(player) {
    console.log("entering checkWin");
    for (let i = 0; i < winCombos.length; i++) {
        if (board[winCombos[i][0]] == player && board[winCombos[i][1]] == player && board[winCombos[i][2]] == player) {
            return true;
        }
    }
    return false;
}

function checkTie() {
    console.log("entering checkTie");
    let fullSquares = 0;
    for (let i = 0; i < board.length; i++) {
        console.log(`board[${i}] = ${board[i]}`);
        if (board[i] == player1Symbol || board[i] == player2Symbol) {
            fullSquares++;
        }
        if (fullSquares == 9) {
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
    player1sTurn = player1sTurn;
    resetBtn.style.display = "inline-block";
    disableBoard();
}

function resetGame() {
    board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    gameOver = false;
    enableBoard();
    messageEl.textContent = `${player1Name}, select a square.`;
    renderBoard();
    resetBtn.style.display = "none";
}

function disableBoard() {
    for (let square of squares) {
        square.disabled = true;
        square.style.cursor = "default";
    }
}

disableBoard();