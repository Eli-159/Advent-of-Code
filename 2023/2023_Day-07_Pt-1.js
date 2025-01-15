const input = document.querySelector('pre').textContent.split('\n').filter(el => el);

class Card {
    constructor(id) {
        this.id = id;
        this.score = Card.scoreVals[id];
    }

    static scoreVals = {'2': 1, '3': 2, '4': 3, '5': 4, '6': 5, '7': 6, '8': 7, '9': 8, 'T': 9, 'J': 10, 'Q': 11, 'K': 12, 'A': 13};
}

class Hand {
    constructor(textHand) {
        const splitInput = textHand.split(' ');

        this.cardText = splitInput[0];
        this.cards = splitInput[0].split('').map(letter => new Card(letter));
        this.bid = parseInt(splitInput[1]);
        this.calcTypeScore();
        this.calcHandScore();
    }

    calcTypeScore = () => {
        const cardCounts = Object.keys(Card.scoreVals).map(cardId => {
            const matches = this.cardText.match(new RegExp(cardId, 'g'));
            return {cardId, num: matches ? matches.length : 0}
        }).filter(card => card.num > 0).sort((a, b) => a.num>b.num ? -1 : 1);
        if (cardCounts.length == 1) {
            this.typeScore = 7;
        } else if (cardCounts.length == 2) {
            if (cardCounts[0].num == 4) this.typeScore = 6;
            else this.typeScore = 5;
        } else if (cardCounts.length == 3) {
            if (cardCounts[0].num == 3) this.typeScore = 4;
            else this.typeScore = 3;
        } else if (cardCounts.length == 4) {
            this.typeScore = 2;
        } else {
            this.typeScore = 1
        }
    }

    calcHandScore = () => {
        this.fullScore = this.typeScore*(10**10)+this.cards.map((card, i) => card.score*(10**(8-2*i))).reduce((total, score) => total+score);
    }
}

const hands = input.map(line => new Hand(line)).sort((a, b) => a.fullScore-b.fullScore);
console.log('Part 1:', hands.map((hand, i) => hand.bid*(i+1)).reduce((total, curr) => total+curr));