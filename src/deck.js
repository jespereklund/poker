export default class Deck {
    deck = []
    
    constructor() {
        this.newDeck()
    }

    newRound() {
        if (this.deck.length < 10) {
            this.newDeck()
        }
    }

    popCard() {
        const card = this.deck.pop()
        return card
    }

    newDeck() {
        this.deck = []
        for (let i=0; i<52; i++) {
            this.deck.push(i)
        }
        this.shuffleDeck()      
    }

    shuffleDeck() {
        let currentIndex = this.deck.length;
        while (currentIndex != 0) {
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [this.deck[currentIndex], this.deck[randomIndex]] = [
            this.deck[randomIndex], this.deck[currentIndex]];
        }
    }
    
}