class Round {
    constructor(input, modeChoice) {
        this.modeChoice = modeChoice;
        this.input = input;
        let procInput = input;
        procInput = procInput.replaceAll(/A|X/g, '1');
        procInput = procInput.replaceAll(/B|Y/g, '2');
        procInput = procInput.replaceAll(/C|Z/g, '3');
        this.oppChoice = parseInt(procInput[0]);
        if (modeChoice){
            this.ownChoice = parseInt(procInput[2]);
        } else {
            if (input[2] == 'X') this.winVal = 0
            if (input[2] == 'Y') this.winVal = 3
            if (input[2] == 'Z') this.winVal = 6
        }
    }

    static compArr = [3, 1, 2, 3, 1];
    
    calcWinVal = () => {
        if (this.oppChoice == this.ownChoice) this.winVal = 3
        else if (Round.compArr[this.oppChoice+1] == this.ownChoice) this.winVal = 6
        else this.winVal = 0
    }

    calcOwnChoice = () => {
        if (this.input[2] == 'X') this.ownChoice = Round.compArr[this.oppChoice-1]
        else if (this.input[2] == 'Y') this.ownChoice = this.oppChoice;
        else this.ownChoice = Round.compArr[this.oppChoice+1];
    }

    calcScore = () => {
        if (this.modeChoice) this.calcWinVal();
        else this.calcOwnChoice();
        return this.ownChoice + this.winVal;
    }
}

const roundData = document.getElementsByTagName('pre')[0].innerHTML.split('\n').filter(val => val.length > 0)
const partOneRounds = roundData.map(val => new Round(val, true));
const partTwoRounds = roundData.map(val => new Round(val, false));
console.log('Part 1:', partOneRounds.reduce((a, b) => a+b.calcScore(), 0));
console.log('Part 2:', partTwoRounds.reduce((a, b) => a+b.calcScore(), 0));