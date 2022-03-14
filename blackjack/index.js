let playerName = window.prompt("What's your name?");

let player = {
    name: playerName,
    chips: 200,
    hasBlackJack: false,
    isAlive: false,
    currentBet: 0,
    isStaying: false
}

let cards = []
let sum = 0
let message = ""
let messageEl = document.querySelector("#message-el");
let message2El = document.querySelector("#message2-el");
let sumEl = document.querySelector("#sum-el");
let cardsEl = document.querySelector("#cards-el");
let playerEl = document.querySelector("#player-el");
let startGameButton = document.querySelector("#start-game-btn");
let newCardButton = document.querySelector("#new-card-btn");
let stayButton = document.querySelector("#stay-btn");
let bettingEls = document.querySelector(".betting-els");
let betSlider = document.querySelector("#bet-slider");
let betEl = document.querySelector("#bet-el");

let numOfRenders = 0;

playerEl.textContent = player.name + ": $" + player.chips
console.log("Setting buttons to display:none");
stayButton.style.display = "none";
newCardButton.style.diplay = "none";
console.log("Done setting buttons to display:none");
betSlider.setAttribute("min", 5);
betSlider.setAttribute("max", player.chips);
betSlider.setAttribute("value", player.chips/8);
betSlider.setAttribute("step", 5);
betEl.textContent = "Default bet: $" + player.chips/8

betSlider.oninput = function() {
    betEl.textContent = "Current bet: $" + this.value;
  }

function hideSlider() {
    message2El.style.visibility = "hidden";
    message2El.style.height = 0;
    betSlider.style.visibility = "hidden";
    betSlider.style.height = 0;
    bettingEls.style.height = "50px";
}

function displaySlider() {
    message2El.style.visibility = "visible";
    message2El.style.height = "auto";
    betSlider.style.visibility = "visible";
    betSlider.style.height = "auto";
    bettingEls.style.height = "auto";
}


function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    player.isAlive = true;
    player.hasBlackJack = false;
    player.isStaying = false;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    player.currentBet = betSlider.value;
    player.chips -= player.currentBet;
    if (player.chips < 0) {
        alert("Getting more chips...");
        player.chips += 200;
    }
    if (window.matchMedia("(min-width: 500px)").matches) {
        stayButton.style.display = "block";
        newCardButton.style.display = "block";
    } else if (window.matchMedia("(max-width: 499px)").matches) {
        stayButton.style.display = "inline";
        newCardButton.style.display = "inline";
    }
    hideSlider();
    renderGame();
    gameCalculation();
}

function playerWins() {
    player.chips += (player.currentBet * 2);
    playerEl.textContent = player.name + ": $" + player.chips;
    player.isAlive = false;
    startGameButton.textContent = "NEW GAME";
    betSlider.setAttribute("max", player.chips);
    displaySlider();
}

function dealerWins() {
    player.isAlive = false;
    startGameButton.textContent = "NEW GAME";
    betSlider.setAttribute("max", player.chips);
    displaySlider();
}

function itsADraw() {
    player.chips += (player.currentBet * 1);
    playerEl.textContent = player.name + ": $" + player.chips;
    player.isAlive = false;
    startGameButton.textContent = "NEW GAME";
    betSlider.setAttribute("max", player.chips);
    displaySlider();
}

function gameCalculation() {
    renderGame();
    if (sum <= 20 && !player.isStaying) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "Blackjack! Play again?";
        player.hasBlackJack = true;
        playerWins();
    } else if (sum > 21) {
        message = "You busted! Play again?";
        dealerWins();

    } else if (player.isStaying) {
        renderGame();
        let dealerSum = dealerPlay();
        console.log("dealerScore is: " + dealerSum);
        if (dealerSum <= 21 && sum < dealerSum) {
            message= "Dealer got " + dealerSum + ".<br>You lose! Play again?";
            dealerWins();
        } else if (dealerSum > 21) {
            message = "Dealer busted with " + dealerSum + "!<br>You win! Play again?";
            playerWins();
        } else if (sum > dealerSum) {
            message = "You win! Dealer got " + dealerSum +".<br>Play again?"
            playerWins();
        } else if (sum === dealerSum) {
            message = "It's a draw! Dealer got " + dealerSum +".<br>Play again?"
            itsADraw();
        }
    }
    messageEl.innerHTML = message;
    renderGame();
}

function renderGame() {
    numOfRenders++;
    console.log("Rendering game..." + numOfRenders +" times so far")
    
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    sumEl.textContent = "Sum: " + sum
    playerEl.textContent = player.name + ": $" + player.chips
    if (!player.isAlive || player.hasBlackJack) {
        stayButton.style.display = "none";
        newCardButton.style.display = "none";

    }
}
function dealerPlay() {
    let dealerCard1 = getRandomCard();
    let dealerCard2 = getRandomCard();
    let dealerHand = [dealerCard1, dealerCard2];
    let dealerSum = dealerCard1 + dealerCard2;
    while (dealerSum < 21) {
        if (dealerSum >= 17) {
            return dealerSum;
        } else {
            let card = getRandomCard();
            dealerSum += card;
            dealerHand.push(card);
        }
    }
    console.log(dealerSum)
    return dealerSum;
}


function stay() {
    player.isStaying = true;
    gameCalculation()
}

function newCard() {
    if (player.isAlive && !player.hasBlackJack) {
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        gameCalculation();
        renderGame();        
    }
}
