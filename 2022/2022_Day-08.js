class Tree {
    constructor(height, row, col, grid) {
        this.height = parseInt(height);
        this.row = row;
        this.col = col;
        this.grid = grid;
    }

    calcVisibility = () => {
        this.visible = true;
        this.visibleLeft = true;
        this.visibleRight = true;
        this.visibleTop = true;
        this.visibleBottom = true;
        for (let i = 0; i < this.col && this.visibleLeft; i++) this.visibleLeft = this.grid.trees[this.row][i].height < this.height;
        for (let i = 98; i > this.col && this.visibleRight; i--) this.visibleRight = this.grid.trees[this.row][i].height < this.height;
        for (let i = 0; i < this.row && this.visibleTop; i++) this.visibleTop = this.grid.trees[i][this.col].height < this.height;
        for (let i = 98; i > this.row && this.visibleBottom; i--) this.visibleBottom = this.grid.trees[i][this.col].height < this.height;
        this.visible = this.visibleLeft || this.visibleRight || this.visibleTop || this.visibleBottom;
    }

    calcView = () => {
        this.view = 0;
        this.viewLeft = 0;
        this.viewRight = 0;
        this.viewTop = 0;
        this.viewBottom = 0;
        for (let i = this.col-1; i >= 0; i--) {
            if (this.grid.trees[this.row][i].height < this.height) this.viewLeft++;
            else {
                this.viewLeft++;
                break;
            }
        }
        for (let i = this.col+1; i <= 98; i++) {
            if (this.grid.trees[this.row][i].height < this.height) this.viewRight++;
            else {
                this.viewRight++
                break;
            }
        }
        for (let i = this.row-1; i >= 0; i--) {
            if (this.grid.trees[i][this.col].height < this.height) this.viewTop++;
            else {
                this.viewTop++;
                break;
            }
        }
        for (let i = this.row+1; i <= 98; i++) {
            if (this.grid.trees[i][this.col].height < this.height) this.viewBottom++;
            else {
                this.viewBottom++;
                break;
            }
        }
        this.view = this.viewLeft*this.viewRight*this.viewTop*this.viewBottom;
    }
}

class Grid {
    constructor(stringGrid) {
        this.trees = stringGrid.split('\n').filter(val => val.length > 0).map((row, rowInd) => row.split('').map((val, colInd) => new Tree(val, rowInd, colInd, this)));
        this.trees.forEach(row => row.forEach(tree => {
            tree.calcVisibility();
            tree.calcView();
        }));
    }

    countVisible = () => {
        return this.trees.flatMap(tree => tree).filter(tree => tree.visible).length
    }

    bestView = () => {
        return this.trees.flatMap(tree => tree).map(tree => tree.view).sort((a, b) => b - a)[0];
    }
}

const treeGrid = new Grid(document.getElementsByTagName('pre')[0].textContent);
console.log('Part 1:', treeGrid.countVisible());
console.log('Part 2:', treeGrid.bestView());