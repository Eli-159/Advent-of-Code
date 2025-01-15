class Matrix {
    constructor(stringMatrix) {
        const splitMatrix = stringMatrix.split('\n');
        const cols = splitMatrix.pop();
        this.stacks = [];
        for (let i = 1; i < cols.length; i+=4) {
            this.stacks.push(new Stack(cols[i]));
        }
        for (let i = splitMatrix.length-1; i >= 0; i--) {
            let y = 0;
            for (let x = 1; x < splitMatrix[0].length; x+=4) {
                if (new RegExp('[A-Z]').test(splitMatrix[i][x])) this.stacks[y].createBox(splitMatrix[i][x]);
                y++;
            }
        }
    }

    moveBoxes = (to, from, num) => {
        this.stacks.find(stack => stack.num == to).appendBoxes(this.stacks.find(stack => stack.num == from).removeBoxes(num));
    }

    moveBoxFromInst = (strInst, singular) => {
        const splitInst = strInst.split(' ').filter(val => !isNaN(parseInt(val))).map(val => parseInt(val));
        if (singular) {
            for (let i = 0; i < splitInst[0]; i++) {
                this.moveBoxes(splitInst[2], splitInst[1], 1);
            }
        } else {
            this.moveBoxes(splitInst[2], splitInst[1], splitInst[0]);
        }
    }

    instBatch = (strInst, singular) => {
        const splitInst = strInst.split('\n').filter(val => val.length > 0);
        splitInst.forEach(inst => this.moveBoxFromInst(inst, singular));
    }

    getTopBoxes = () => {
        const boxes = [];
        this.stacks.forEach(stack => boxes.push(stack.getTopBox()));
        return boxes;
    }
}

class Stack {
    constructor(num) {
        this.num = num;
        this.boxes = [];
    }

    createBox = (boxId) => {
        this.appendBoxes([new Box(boxId)]);
    }

    appendBoxes = (boxes) => {
        boxes.forEach(box => {
            box.updatePos({
                stackNum: this.num,
                vertPos: this.boxes.length+1
            });
            this.boxes.push(box)
        });
    }

    removeBoxes = (num) => {
        const splicedBoxes = this.boxes.splice(this.boxes.length-num, num);
        return splicedBoxes;
    }

    getTopBox = () => {
        return this.boxes[this.boxes.length-1];
    }
}

class Box {
    constructor(id, posObj) {
        this.id = id;
        if (posObj) this.updatePos(posObj);
    }

    updatePos = (posObj) => {
        this.stackNum = posObj.stackNum;
        this.vertPos = posObj.vertPos;
    }
}

const fullData = document.getElementsByTagName('pre')[0].innerHTML.split('\n\n');

const boxMatrix1 = new Matrix(fullData[0]);
boxMatrix1.instBatch(fullData[1], true);
console.log('Part 1:', boxMatrix1.getTopBoxes().reduce((a, b) => a + b.id, ''));

const boxMatrix2 = new Matrix(fullData[0]);
boxMatrix2.instBatch(fullData[1], false);
console.log('Part 2:', boxMatrix2.getTopBoxes().reduce((a, b) => a + b.id, ''));