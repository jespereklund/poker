export default class Deck {
    deck = []
    
    constructor() {
        this.newDeck()
    }

    popCard() {
        console.log("deck length=", this.deck.length)
        if (this.deck.length < 8) {
            this.deck = []
            this.newDeck()
        }
        const card = this.deck.pop()
        return card
    }

    newDeck() {
        for (let i=0; i<52; i++) {
            this.deck.push(i)
        }
        this.shuffleDeck()      
        console.log("new deck", this.deck.length)
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