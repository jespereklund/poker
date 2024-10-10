import {shuffle} from "./helpers.js"

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
        return this.deck.pop()
    }

    newDeck() {
        this.deck = []
        for (let i=0; i<52; i++) {
            this.deck.push(i)
        }
        this.deck = shuffle(this.deck)      
    }    
}