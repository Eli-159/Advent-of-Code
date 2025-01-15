const input = document.querySelector('pre').textContent.split('\n').filter(el => el);

class Collection {
    constructor(cards) {
        this.cards = cards.map(cardText => new Card(cardText, this));
    }

    winAllCards = () => {
        this.cards.forEach(card => card.addToCollection());
    }
    
    countCards = () => {
        return this.cards.reduce((count, card) => count+card.count, 0);
    }
}

class Card {
    constructor(text, collection) {
        this.collection = collection;
        this.cardNum = parseInt(text.substring(5, 8));
        const splitData = text.substring(10).split(' | ').map(part => part.split(' ').map(num => parseInt(num)).filter(num => num));
        this.winNums = splitData[0];
        this.givenNums = splitData[1];
        this.score = this.givenNums.reduce((score, num) => this.winNums.includes(num) ? (score != 0 ? score*2 : 1) : score, 0);
        this.numWins = this.givenNums.filter(num => this.winNums.includes(num)).length;
        this.wonCards = [];
        for (let i = this.cardNum+1; i <= this.cardNum+this.numWins; i++) this.wonCards.push(i);
        this.count = 1;
    }

    win = (num) => {
        this.count += num;
        return this;
    }

    addToCollection = () => {
        this.wonCards.forEach(cardNum => this.collection.cards[cardNum-1].win(this.count).cardNum);
    }
}

const collection = new Collection(input);

console.log('Part 1:', collection.cards.reduce((score, card) => score + card.score, 0));

collection.winAllCards();
console.log('Part 2:', collection.countCards());