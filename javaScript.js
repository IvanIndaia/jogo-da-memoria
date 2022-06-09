const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"


startGame()



function startGame() {
    // shuffleCards(cards)
    inicializeCards(game.createCardsFromTechs())
}



function inicializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard")
    // console.log(gameBoard)

    gameBoard.innerHTML = ''
    game.cards.forEach(card => {

        let cardElement = document.createElement('div')
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon

        createCardContent(card, cardElement)

        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement)
    })
}



function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement)
}



function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)

    if (face === FRONT) {
        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON)
        iconElement.src = "images/" + card.icon + ".png"
        cardElementFace.appendChild(iconElement)
    } else {
        cardElementFace.innerHTML = "&lt/&gt"
    }
    element.appendChild(cardElementFace)
}

let gaming = 0
let conta = 0
let joga = ['joga1', 'joga2', 0, 0]

function flipCard() {
    if (conta == 0) {
        if (gaming == 1) {
            gaming = 2
        } else if (gaming == 2) {
            gaming = 1
        } else {
            gaming = 1
        }
        conta++
    }else {
        conta = 0
    }

    if (game.setCard(this.id)) {
        this.classList.add("flip")
        if (game.secondCard) {
            if (game.checkMatch()) {
            
                if (gaming == 1) {
                    pontuar(joga[0])
                }
                if (gaming == 2) {
                    pontuar(joga[1])
                }

                game.clearCards()
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById("gameOver")
                    gameOverLayer.style.display = 'flex'
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id)
                    let secondCardView = document.getElementById(game.secondCard.id)


                    firstCardView.classList.remove('flip')
                    secondCardView.classList.remove('flip')
                    game.unflipCards()
                }, 1000)
            }
        }
    }
}

function restart() {
    game.clearCards
    startGame()
    let gameOverLayer = document.getElementById("gameOver")
    gameOverLayer.style.display = 'none'
}

function starter() {
    let jogador1 = prompt("Digite o nome do Jogador 1")
    let jogador2 = prompt("Digite o nome do Jogador 2")

    let jog1 = document.getElementById("j1")
    let jog2 = document.getElementById("j2")

    jog1.innerHTML = `${jogador1}`
    jog2.innerHTML = `${jogador2}`

    document.getElementById("startMemory").style.display = 'none'
}

function pontuar(jog) {
    if (jog == 'joga1') {
        joga[2]++
        let jog1 = document.getElementById("jj1")
        jog1.innerHTML = `${joga[2]}`
    }
    
    if (jog == 'joga2') {
        joga[3]++
        let jog2 = document.getElementById("jj2")
        jog2.innerHTML = `${joga[3]}`
    }
}