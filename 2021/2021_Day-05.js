class Line {
    constructor(pos, diag) {
        const splitPos = pos.split(' -&gt; ').map(coor => coor.split(','));
        this.start = {
            x: parseInt(splitPos[0][0]),
            y: parseInt(splitPos[0][1])
        };
        this.end = {
            x: parseInt(splitPos[1][0]),
            y: parseInt(splitPos[1][1])
        };
        this.points = [];
        if (diag || this.start.x == this.end.x || this.start.y == this.end.y) this.findAllPoints();
    }

    findAllPoints = () => {
        let curx = this.start.x;
        let cury = this.start.y;
        let prex = 0;
        let prey = 0;
        while (curx != prex || cury != prey) {
            this.points.push({
                x: curx,
                y: cury
            });
            prex = curx;
            prey = cury;
            if (curx < this.end.x) curx++;
            if (curx > this.end.x) curx--;
            if (cury < this.end.y) cury++;
            if (cury > this.end.y) cury--;
        }
    }
}

class Grid {
    constructor(opts) {
        this.start = {
            x: 0,
            y: 0
        }
        this.end = {
            x: opts.x,
            y: opts.y
        }
        this.grid = [];
        this.lines = [];
        this.createGrid();
    }

    createGrid = () => {
        let x = this.start.x;
        while (x != this.end.x) {
            let y = this.start.y;
            let column = [];
            while (y != this.end.y) {
                column.push(0);
                if (y < this.end.y) y++;
                if (y > this.end.y) y--;
            }
            this.grid.push(column);
            if (x < this.end.x) x++;
            if (x > this.end.x) x--;
        }
    }

    addLine = (line) => {
        this.lines.push(line);
        line.points.forEach(point => {
            this.grid[point.x][point.y]++;
        });
    }

    countOccurrences = () => {
        const occ = {};
        this.grid.forEach(row => {
            row.forEach(val => {
                occ[val] = (occ[val] ? occ[val]+1 : 1);
            });
        });
        return occ;
    }

    occurancesOver = (minNum) => {
        let count = 0;
        const allOccur = this.countOccurrences();
         Object.keys(allOccur).forEach(num => {
            if (num >= minNum) count+=allOccur[num];
        });
        return count;
    }
}

function findAllOverTwo(diag) {
    const rawData = document.getElementsByTagName('pre')[0].innerHTML.split('\n').filter(word => word.length > 0);
    const grid = new Grid({
        x:1000,
        y:1000
    });
    rawData.forEach(line => {
        grid.addLine(new Line(line, diag));
    });
    return grid.occurancesOver(2);
}

console.log('Part One:', findAllOverTwo(false));
console.log('Part Two:', findAllOverTwo(true));