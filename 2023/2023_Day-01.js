const inputOne = document.querySelector('pre').textContent.split('\n').filter(el => el);
const inputTwo = inputOne.map(el => {
    let newEl = el;
    const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    numbers.forEach((str, index) => {
        while (newEl.includes(str)) {
            newEl = newEl.slice(0, newEl.indexOf(str)+1) + (index+1).toString() + newEl.slice(newEl.indexOf(str)+1, newEl.length);
        }
    });
    return newEl;
});

function calcTotal(input) {
    return input.map(el => {
        const numbers = [...el.matchAll(/[0-9]/g)];
        return numbers[0][0] + numbers[numbers.length-1][0];
    }).reduce((pre, cur) => pre + parseInt(cur), 0);
}

console.log('Part 1:', calcTotal(inputOne));
console.log('Part 2:', calcTotal(inputTwo));