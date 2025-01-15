class Rucksack {
    constructor(contents) {
        this.comp1 = new Compartment(contents.substring(0, contents.length/2));
        this.comp2 = new Compartment(contents.substring(contents.length/2));
    }

    findCommonItems = () => {
        this.commonItems = this.comp1.uniqueItems.filter(val => this.comp2.uniqueItems.find(v => v.letter == val.letter));
        return this.commonItems;
    }

    getAllItems = () => {
        return [...this.comp1.items, ...this.comp2.items].filter((val, ind, arr) => arr.findIndex(v => v.letter == val.letter) >= ind);
    }
}

class Compartment {
    constructor(contents) {
        this.items = contents.split('').map(val => new Item(val));
        this.uniqueItems = this.items.filter((val, ind, arr) => arr.findIndex(v => v.letter == val.letter) >= ind);
    }
}

class Item {
    constructor(letter) {
        this.letter = letter;
        this.priority = Item.priorities[letter];
    }

    static priorities = {
        a:1, b:2, c:3, d:4, e:5, f:6, g:7, h:8, i:9, j:10, k:11, l:12, m:13, n:14, o:15, p:16, q:17, r:18, s:19, t:20, u:21, v:22, w:23, x:24, y:25, z:26,
        A:27, B:28, C:29, D:30, E:31, F:32, G:33, H:34, I:35, J:36, K:37, L:38, M:39, N:40, O:41, P:42, Q:43, R:44, S:45, T:46, U:47, V:48, W:49, X:50, Y:51, Z:52
    }
}

const rucksacks = document.getElementsByTagName('pre')[0].innerHTML.split('\n').filter(val => val.length > 0).map(val=> new Rucksack(val));
console.log('Part 1:', rucksacks.reduce((a, b) => a+b.findCommonItems().reduce(((c, d) => c+d.priority), 0), 0));

let badgePri = 0;
for (let i = 0; i < rucksacks.length; i+=3) {
    badgePri += rucksacks[i].getAllItems().filter(val => {
        return rucksacks[i+1].getAllItems().findIndex(v => v.letter == val.letter) > -1 && rucksacks[i+2].getAllItems().findIndex(v => v.letter == val.letter) > -1
    })[0].priority;

}
console.log('Part 2:', badgePri);