class Board {
    constructor(boardData) {
        this.rows = boardData.split('\n').map(row => {
            return row.split(' ').filter(num => new RegExp('[0-9]+').test(num)).map(num => {
                return {
                    num: parseInt(num),
                    called: false
                };
            });
        }).filter(row => row.length == 5);
        this.bingo = false;
    }

    mark = (num) => {
        if (!this.bingo) {
            this.rows.forEach(row => {
                row.forEach(rowVal => {
                    if (rowVal.num == num) {
                        rowVal.called = true;
                        if (this.testBingo()) {
                            const bingoEvent = new CustomEvent('bingo', {
                                detail: this.calcScore(num)
                            });
                            document.dispatchEvent(bingoEvent);
                        }
                    }
                })
            });
        }
    }

    testBingo = () => {
        this.rows.forEach(row => {
            if (row.filter(val => val.called).length == 5) {
                this.bingo = true;
                return true;
            }
        });

        for (let i = 0; i < 5; i++) {
            let found = true;
            this.rows.forEach(row => {
                if (row[i].called == false) found = false;
            });
            if (found) {
                this.bingo = true;
                return true;
            }
        }
        return false;
    }

    calcScore = (mult) => {
        let sum = 0;
        this.rows.forEach(row => {
            row.forEach(val => {
                if (val.called == false) sum += val.num;
            });
        });
        return sum*mult;
    }
}

let bingoScore = undefined;
let bingoCount = 0;
document.addEventListener('bingo', e => {
    bingoScore = e.detail;
    bingoCount++;
    if (bingoCount == 1) console.log('First Score:', bingoScore);
});
const rawData = document.getElementsByTagName('pre')[0].innerHTML.split('\n\n');
const draw = rawData.shift().split(',');
const boards = rawData.map(boardData => {
    return new Board(boardData);
});

draw.forEach(markNum => {
    boards.forEach(board => {
        board.mark(markNum);
    });
});

console.log('Last Score:', bingoScore);