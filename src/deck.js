export default class Deck {
    deck = []
    
    constructor() {
        this.newDeck()
    }

    popCard(afterHold = false) {
        //console.log("popCard deck length=", this.deck.length)
        if (this.deck.length < 4 && afterHold === false ) {
            this.deck = []
            this.newDeck()
        }
        const card = this.deck.pop()
        return card
    }

    newDeck() {
        this.deck = []
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