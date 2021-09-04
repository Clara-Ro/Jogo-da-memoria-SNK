let game = {
    lockmode:false,
    firstCard:null,
    secondCard:null,

    setCard: function (id) {
      let card = this.cards.filter(card => card.id === id)[0]
      if (card.flipped || this.lockmode) {
          return false
      }
      if (!this.firstCard) {
          this.firstCard = card
          this.firstCard.flipped = true
          return true
      }else{
          this.secondCard = card
          this.secondCard.flipped = true
          this.lockmode = true
          return true
      }
    },

    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false
        }
        return this.firstCard.icon === this.secondCard.icon
    },

    clearCards: function(){
        this.firstCard = null
        this.secondCard = null
        this.lockmode = false
    },

    unflipCards(){
        this.firstCard.flipped = false
        this.secondCard.flipped = false
        this.clearCards()
    },

    checkGameOver(){
        return this.cards.filter (card => !card.flipped).length == 0
    },

    personagens: ['armin','connie','eren','erwin','hange','levi','jean','logo','mikasa','sasha'],

    cards: null,


    createCardsFromPersonagens: function () {
        this.cards = [];
    
        this.personagens.forEach((personagem) => {
            this.cards.push(this.createPairFromPersonagem(personagem))
        });
       this.cards = this.cards.flatMap(pair=>pair)
       this.shuffleCards()
       return this.cards
    },
    
   createPairFromPersonagem: function (personagem) {
        
        return [{
            id: this.createIdWithPersonagem(personagem),
            icon: personagem,
            flipped: false
        },{
            id: this.createIdWithPersonagem(personagem),
            icon: personagem,
            flipped: false
        }]
    },
    
   createIdWithPersonagem: function (personagem) {
        return personagem + parseInt(Math.random()*1000)
    },

   shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0
    
        while (currentIndex!==0) {
            randomIndex = Math.floor(Math.random()*currentIndex)
            currentIndex--
    
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    },
    
}