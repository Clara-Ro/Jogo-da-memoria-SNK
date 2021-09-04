const Front = "card_front"
const Back = "card_back"
const Card = "card"
const Icon = "icon"



startGame()

function startGame() {
    
    initializeCards(game.createCardsFromPersonagens())
}

function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard")
    gameBoard.innerHTML = ''
    game.cards.forEach(card => {
        let cardElement = document.createElement('div')
        cardElement.id = card.id
        cardElement.classList.add(Card)
        cardElement.dataset.icon = card.icon
        cardElement.addEventListener('click',flipCard)
        createCardContent(card,cardElement)

        gameBoard.appendChild(cardElement)

    });
}

function createCardContent(card, cardElement) {
   createCardFace(Front, card, cardElement)
   createCardFace(Back, card, cardElement)
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)

    if (face === Front) {
        let iconElement = document.createElement('img')
        iconElement.classList.add(Icon)
        iconElement.src = "./" + card.icon + ".png" 
        cardElementFace.appendChild(iconElement)

    }else{
        cardElementFace.innerHTML = "SNK"
    }
    element.appendChild(cardElementFace)
}


function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add("flip")
      if (game.secondCard) {
            
       if (game.checkMatch()) {
           game.clearCards()

           if(game.checkGameOver()){
               let gameOverLayer = document.getElementById('gameover')
               gameOverLayer.style.display ='flex'
           }
       }else{
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

function restart (){
    game.clearCards()
    startGame()
    let gameOverLayer = document.getElementById('gameover')
        gameOverLayer.style.display ='none'
}