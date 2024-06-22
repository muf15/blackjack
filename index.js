let player = {
    name: "",
    chips: 200
}

if (!player.name || player.name.trim() === "") {
    player.name = prompt("Please enter your name:");
    if (!player.name || player.name.trim() === "") {
        player.name = "Player";
    }
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let instructionsEl = document.querySelector(".instructions")
let startBtn = document.getElementById("start-btn")
let game = document.querySelector("#game")
instructionsEl.style.display = "none";
startBtn.style.display = "none";
game.style.display = "block";
playerEl.textContent = player.name + ": ₹" + player.chips

function getCard() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades']
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
    let suit = suits[Math.floor(Math.random() * suits.length)]
    let value = values[Math.floor(Math.random() * values.length)]
    return {
        suit: suit,
        value: value,
        display: value + "_of_" + suit
    }
}

function startGame() {
    isAlive = true
    hasBlackJack = false
    let firstCard = getCard()
    let secondCard = getCard()
    cards = [firstCard, secondCard]
    sum = getCardValue(firstCard.value) + getCardValue(secondCard.value)
    renderGame()
}

function getCardValue(card) {
    if (card === 'A') {
        return 11
    } else if (['K', 'Q', 'J'].includes(card)) {
        return 10
    } else {
        return parseInt(card)
    }
}

function renderGame() {
    cardsEl.innerHTML = "";
    for (let i = 0; i < cards.length; i++) {
        let cardImage = document.createElement("img")
        cardImage.src = "cards/" + cards[i].display + ".svg"
        cardImage.classList.add("card")
        cardsEl.appendChild(cardImage)
    }

    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        player.chips += 100
    } else {
        message = "You're out of the game!"
        isAlive = false// 
        player.chips -= 100
    }
    playerEl.textContent = player.name + ": ₹" + player.chips
    messageEl.textContent = message
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getCard()
        sum += getCardValue(card.value)
        cards.push(card)
        renderGame()
    }
}