const input = document.querySelector('pre').textContent.split('\n').filter(el => el);

class Race {
    constructor(time, target) {
        this.time = time;
        this.target = target;
    }

    static calcHoldTime = (time, thresh) => {
        const disc = Math.sqrt(Math.pow(time, 2)-4*thresh);
        return {
            low: Math.ceil((time-disc)/2),
            high: Math.floor((time+disc)/2)
        };
    }

    findNumSucVars = () => {
        const holdTimes = Race.calcHoldTime(this.time, this.target);
        return holdTimes.high-holdTimes.low+1;
    }
}

const individualNums = input.map(line => line.split(' ').map(num => parseInt(num)).filter(num => num));
const races = individualNums[0].map((time, i) => new Race(time, individualNums[1][i]));
console.log(races.reduce((total, curr) => total*curr.findNumSucVars(), 1));

const fullNums = input.map(line => parseInt(line.match(/[0-9]/g).join('')));
const bigRace = new Race(fullNums[0], fullNums[1]);
console.log(bigRace.findNumSucVars());