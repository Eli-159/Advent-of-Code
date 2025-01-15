const input = document.querySelector('pre').textContent.split('\n').filter(el => el);

class Game {
    constructor(text) {
        const parts = text.split(/:|;/);
        this.id = parseInt(parts.shift().substring(5));
        this.sets = parts.map(setString =>  new Set(setString));
        this.max = {
            red: this.sets.sort((a, b) => a.red<b.red ? 1 : -1)[0].red,
            green: this.sets.sort((a, b) => a.green<b.green ? 1 : -1)[0].green,
            blue: this.sets.sort((a, b) => a.blue<b.blue ? 1 : -1)[0].blue
        }
    }
}

class Set {
    constructor(setString) {
        this.red = 0;
        this.green = 0;
        this.blue = 0;
        setString.split(',').forEach(el => {
            const objectParts = el.trim().split(' ');
            this[objectParts[1]] = parseInt(objectParts[0]);
        });
    }
}

const games = input.map(val => new Game(val));

console.log('Part 1:', games.filter(game => game.max.red <= 12 && game.max.green <= 13 && game.max.blue <= 14).reduce((pre, cur) => pre+cur.id, 0));

console.log('Part 2:', games.reduce((pre, cur) => pre+(cur.max.red*cur.max.green*cur.max.blue), 0));