class Pair {
    constructor(stringPair) {
        const ranges = stringPair.split(',');
        this.range1 = new Range(ranges[0]);
        this.range2 = new Range(ranges[1]);
    }

    checkContained = () => {
        const rtnObj = {
            full: false,
            part: false
        };
        const bigRange = this.range1.length > this.range2.length ? this.range1 : this.range2;
        const smlRange = this.range1.length <= this.range2.length ? this.range1 : this.range2;
        if (bigRange.min <= smlRange.min && bigRange.max >= smlRange.max) {
            rtnObj.full = true;
        }
        if (this.range1.secs.filter(val => this.range2.secs.find(v => v == val)).length > 0) rtnObj.part = true;
        return rtnObj;
    }
}

class Range {
    constructor(stringRange) {
        const bounds = stringRange.split('-').map(val => parseInt(val));
        this.min = bounds[0];
        this.max = bounds[1];
        this.secs = [];
        for (let i = this.min; i <= this.max; i++) this.secs.push(i);
        this.length = this.secs.length;
    }
}

const ranges = document.getElementsByTagName('pre')[0].innerHTML.split('\n').filter(val => val.length > 0).map(val=> new Pair(val));
console.log('Part 1:', ranges.reduce((a, b) => a + (b.checkContained().full ? 1 : 0), 0))
console.log('Part 2:', ranges.reduce((a, b) => a + (b.checkContained().part ? 1 : 0), 0))