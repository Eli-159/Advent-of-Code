const input = document.querySelector('pre').textContent.split('\n').filter(el => el).map(line => line.split(' ').map(num => parseInt(num)));

class Sequence {
    constructor(items) {
        this.items = items;
        this.addDiffSeq();
    }

    addDiffSeq = () => {
        if (this.items.every(item => item === 0)) this.diffSeq = null;
        else this.diffSeq = new Sequence(this.items.slice(0, -1).map((item, index) => this.items[index+1]-item));
    }

    addPrediction = () => {
        const amountToAdd = this.diffSeq!==null ? this.diffSeq.addPrediction() : 0;
        const newItem = this.items[this.items.length-1]+amountToAdd;
        this.items.push(newItem);
        return newItem;
    }

    addHistory = () => {
        const amountToSubtract = this.diffSeq!==null ? this.diffSeq.addHistory() : 0;
        const newItem = this.items[0]-amountToSubtract;
        this.items.unshift(newItem);
        return newItem;
    }
}

const readings = input.map(arr => new Sequence(arr));

const sumOfPreds = readings.reduce((acc, curr) => acc+curr.addPrediction(), 0);
console.log('Part 1:', sumOfPreds);

const sumOfNewHistory = readings.reduce((acc, curr) => acc+curr.addHistory(), 0);
console.log('Part 2:', sumOfNewHistory);