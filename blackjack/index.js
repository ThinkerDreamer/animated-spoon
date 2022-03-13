let player = {
    name: "Angel",
    chips: 200,
    hasBlackJack: false,
    isAlive: false
}

let cards = []
let sum = 0
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let stayButton = document.getElementById("stay-btn")

stayButton.style.visibility = "hidden";

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
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    player.chips -= 25;
    stayButton.style.visibility = "visible";
    renderGame()
}

function renderGame() {
    playerEl.textContent = player.name + ": $" + player.chips
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "Blackjack! Play again?"
        player.hasBlackJack = true;
        player.chips += 50;
        stayButton.style.visibility = "hidden";
    } else {
        message = "You busted! Play again?"
        player.isAlive = false;
        stayButton.style.visibility = "hidden";
    }
    playerEl.textContent = player.name + ": $" + player.chips
    messageEl.textContent = message
}

function stay() {
    let dealerScore = Math.floor(Math.random() * 13) + 13;
    if (dealerScore <= 21 && sum < dealerScore) {
            message= "Dealer got " + dealerScore + ". You lose! Play again?"
            stayButton.style.visibility = "hidden";
        } else if (dealerScore > 21) {
            message = "Dealer busted with " + dealerScore + "! You win! Play again?"
            player.chips += 50;
            stayButton.style.visibility = "hidden";
        } else if (sum > dealerScore) {
            message = "You win! Dealer got " + dealerScore +". Play again?"
            player.chips += 50;
            stayButton.style.visibility = "hidden";
        }
    playerEl.textContent = player.name + ": $" + player.chips
    messageEl.textContent = message;
}

function newCard() {
    if (player.isAlive && !player.hasBlackJack) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}
