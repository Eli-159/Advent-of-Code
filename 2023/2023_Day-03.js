const input = document.querySelector('pre').textContent;

class FlatGrid {
    constructor(grid) {
        const textRows = grid.split('\n').filter(el => el);
        this.cells = textRows.flatMap((row, y) => row.split('').map((val, x) => new Cell(val, x, y)));
        this.numbers = textRows.flatMap((row, y) => {
            return [...row.matchAll(/[0-9]+/g)].map(match => {
                const num = new Number(match[0], match.index, y, match[0].length+match.index-1, y);
                this.linkCellToNum(num);
                return num;
            });
        });
    }

    linkCellToNum = (num) => {
        this.cells.filter(cell => cell.x >= num.coors.x1 && cell.y >= num.coors.y1 && cell.x <= num.coors.x2 && cell.y <= num.coors.y2).map(cell => {
            cell.linkNum(num);
        });
    }

    checkPartNumber = (coors) => {
        return (this.cells.filter(cell => cell.x >= coors.x1-1 && cell.y >= coors.y1-1 && cell.x <= coors.x2+1 && cell.y <= coors.y2+1 && cell.type == 'Symbol').length > 0);
    }

    findAllPartNumbers = () => {
        return this.numbers.filter(num => this.checkPartNumber(num.coors));
    }

    calcGearVal = (gearCoor) => {
        const cellRange = this.cells.filter(cell => cell.x >= gearCoor.x-1 && cell.y >= gearCoor.y-1 && cell.x <= gearCoor.x+1 && cell.y <= gearCoor.y+1 && cell.type == 'Digit');
        const iterator = cellRange.entries();
        let curr = iterator.next();
        while (!curr.done && curr.value[1].num == cellRange[0].num) curr = iterator.next();
        return curr.value && curr.value[1].num!=cellRange[0].num ? curr.value[1].num.val*cellRange[0].num.val : 0;
    }

    sumAllGears = () => {
        const posGears = this.cells.filter(cell => cell.val == '*');
        return posGears.reduce((a, b) => a + this.calcGearVal(b), 0);
    }
}

class Cell {
    constructor(val, x, y) {
        this.val = val;
        this.x = x;
        this.y = y;
        this.type = (val=='.' ? 'Blank' : (val.match(/[0-9]/)!=null ? 'Digit' : 'Symbol'));
    }

    linkNum = (num) => {
        this.num = num;
    }
}

class Number {
    constructor(val, x1, y1, x2, y2) {
        this.val = parseInt(val);
        this.coors = {x1, y1, x2, y2};
    }
}

const grid = new FlatGrid(input);

console.log('Part 1:', grid.findAllPartNumbers().reduce((a, b) => a+b.val, 0));
console.log('Part 2:', grid.sumAllGears());