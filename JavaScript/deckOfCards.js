class Card {
    constructor(suit, name, value, show) {
        this.suit = suit;
        this.name = name;
        this.value = value;
        //make show a separate function
        //this.show = console.log('The', this.name, 'of', this.suit, 'which holds a value of ', this.value)
    }
}

class Deck {
    constructor() {
        const names = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
        const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        const suits = ['Spades', 'Diamonds', 'Hearts', 'Clubs'];
        this.cards = [];
        for (var i = 0; i < suits.length; i++) {
            for (var j = 0; j < names.length; j++) {
                this.cards.push(new Card(suits[i], names[j], values[j]));
            }
        }
    }
}

class Shuffle extends Deck {
    constructor(cards) {
        super(cards);
        this.mixedDeck = [];
        this.shuffleDeck = function (cards) {
            while (this.cards.length > 0) {
                var i = Math.floor((Math.random() * this.cards.length));
                this.mixedDeck.push(this.cards[i]);
                let temp = this.cards[this.cards.length - 1];
                this.cards[this.cards.length - 1] = this.cards[i];
                this.cards[i] = temp;
                this.cards.pop();
            }
            console.log('The deck is shuffled');
            return this.mixedDeck;
        }

        this.dealCard = function () {
            var playerCard = this.mixedDeck[this.mixedDeck.length - 1];
            this.mixedDeck.pop();
            console.log(this.mixedDeck.length);
            return playerCard;
        }

        this.resetDeck = function () {
            this.shuffleDeck();
        }
    }
}


class Player extends Shuffle {
    constructor(name) {
        super();
        this.myCards = [];
        this.name = name;
    }
    addtoHand(Deck) {
        this.myCards.push(Deck.dealCard());
        console.log(this.name, 'has the')
        for(var i = 0; i<this.myCards.length; i++){
             console.log(this.myCards[i].name, 'of', this.myCards[i].suit);
        }
    }

    removefromHand(cardNum){
        this.cardnum = cardNum;
        let temp = this.myCards[this.myCards.length -1];
        this.myCards[this.myCards.length -1] = this.myCards[this.cardnum];
        this.myCards[this.cardnum] = temp;
        this.myCards.pop();
        console.log(this.name, 'has the')
        for(var i = 0; i<this.myCards.length; i++){
             console.log(this.myCards[i].name, 'of', this.myCards[i].suit);
        }
    }
}

const newDeck = new Shuffle();
const newPlayer = new Player('Tim');
newDeck.shuffleDeck();
newPlayer.addtoHand(newDeck);
newPlayer.addtoHand(newDeck);newPlayer.addtoHand(newDeck);
newPlayer.addtoHand(newDeck);
newPlayer.removefromHand(1);