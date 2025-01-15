const input = document.querySelector('pre').textContent.split('\n').filter(el => el);

class Card {
    constructor(id) {
        this.id = id;
        this.score = Card.scoreVals[id];
    }

    static scoreVals = {'J': 1,'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'T': 10, 'Q': 11, 'K': 12, 'A': 13};
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
        }).filter(card => card.num > 0).sort((a, b) => a.cardId=='J' ? -1 : (b.cardId=='J' ? 1 : (a.num>b.num ? -1 : 1)));
        const numJokers = cardCounts[0].cardId=='J' ? cardCounts.shift().num : 0;
        this.cardCountLength = cardCounts;
        if (cardCounts.length <= 1) {
            this.typeScore = 7;
        } else if (cardCounts.length == 2) {
            if (cardCounts[0].num+numJokers == 4) this.typeScore = 6;
            else this.typeScore = 5;
        } else if (cardCounts.length == 3) {
            if (cardCounts[0].num+numJokers == 3) this.typeScore = 4;
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
console.log('Part 2:', hands.map((hand, i) => hand.bid*(i+1)).reduce((total, curr) => total+curr));