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

let player1Name = "Player 1";
let player2Name = "Player 2";

newGameBtn.addEventListener("click", function() {
    overlay.style.display = "flex";
});

resetBtn.addEventListener("click", function() {
    resetGame();
});

nameSubmit.addEventListener("click", function(event) {
    event.preventDefault(); // To prevent the page from refreshing
    player1Name = player1Input.value ? player1Input.value : player1Name;
    player2Name = player2Input.value ? player2Input.value : player2Name;
    overlay.style.display = "none";
    startGame();
})

let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

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
        if (checkWin(player1Symbol)) {
            player1Wins();
        } else if (checkTie()) {
            tieGame();
        } else {
            player1sTurn = false;
            messageEl.textContent = `${player2Name}, select a square.`;
            renderBoard();
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
        if (checkWin(player2Symbol)) {
            player2Wins();
        } else if (checkTie()) {
            tieGame();
        } else {
            player1sTurn = true;
            messageEl.textContent = `${player1Name}, select a square.`;
            renderBoard();
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

disableBoard();