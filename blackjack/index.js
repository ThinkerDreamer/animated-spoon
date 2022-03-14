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
let sumEl = document.querySelector("#sum-el");
let cardsEl = document.querySelector("#cards-el");
let playerEl = document.querySelector("#player-el");
let newCardButton = document.querySelector("#new-card-btn");
let stayButton = document.querySelector("#stay-btn");
let betSlider = document.querySelector("#bet-slider");
let betEl = document.querySelector("#bet-el");


stayButton.style.visibility = "hidden";
betSlider.setAttribute("min", 5);
betSlider.setAttribute("max", player.chips);
betSlider.setAttribute("value",40);
betSlider.setAttribute("step", 5);
betEl.textContent = "Default bet: $40"

betSlider.oninput = function() {
    betEl.textContent = "Current bet: $" + this.value;
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
    if (player.chips <= 0) {
        alert("Getting more chips...");
        player.chips = 200;
    }
    stayButton.style.visibility = "visible";
    newCardButton.style.visibility = "visible";
    renderGame();
    gameCalculation();
}

function gameCalculation() {
    renderGame()
    if (sum <= 20 && !player.isStaying) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "Blackjack! Play again?"
        player.hasBlackJack = true;
        player.chips += (player.currentBet * 2);
        stayButton.style.visibility = "hidden";
        newCardButton.style.visibility = "hidden";
    } else if (sum > 21) {
        message = "You busted! Play again?"
        player.isAlive = false;
        stayButton.style.visibility = "hidden";
        newCardButton.style.visibility = "hidden";
    } else if (player.isStaying) {
        let dealerSum = dealerPlay();
        console.log("dealerScore is: " + dealerSum);
        if (dealerSum <= 21 && sum < dealerSum) {
            message= "Dealer got " + dealerSum + ". You lose! Play again?"
            stayButton.style.visibility = "hidden";
            newCardButton.style.visibility = "hidden";
        } else if (dealerSum > 21) {
            message = "Dealer busted with " + dealerSum + "! You win! Play again?"
            player.chips += (player.currentBet * 2);
            playerEl.textContent = player.name + ": $" + player.chips
            stayButton.style.visibility = "hidden";
            newCardButton.style.visibility = "hidden";
        } else if (sum > dealerSum) {
            message = "You win! Dealer got " + dealerSum +". Play again?"
            player.chips += (player.currentBet * 2);
            playerEl.textContent = player.name + ": $" + player.chips
            stayButton.style.visibility = "hidden";
            newCardButton.style.visibility = "hidden";
        } else if (sum === dealerSum) {
            message = "It's a draw! Dealer got " + dealerSum +". Play again?"
            player.chips += (player.currentBet * 1);
            playerEl.textContent = player.name + ": $" + player.chips
            stayButton.style.visibility = "hidden";
            newCardButton.style.visibility = "hidden";
        }
    }
    messageEl.textContent = message
}

function renderGame() {
    betSlider.setAttribute("max", player.chips);
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    sumEl.textContent = "Sum: " + sum
    playerEl.textContent = player.name + ": $" + player.chips
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
