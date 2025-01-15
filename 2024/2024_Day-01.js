// [GENERAL CODE]
// Gets the input, removes a blank and converts the strings to two numerical values
const input = document.querySelector('pre').textContent.split('\n');
input.pop();
const numInput = input.map(row => row.split(/\s+/).map(stringNum => parseInt(stringNum)));

// Seperates and orders the lists
const leftList = numInput.map(row => row[0]).sort((a, b) => a-b);
const rightList = numInput.map(row => row[1]).sort((a, b) => a-b);

// [PART 1 CODE]
// Finds the difference between each one and adds it using the reduce function
const totalDiff = leftList.reduce((total, leftItem, index) => total+Math.abs(leftItem-rightList[index]), 0);
console.log('Part 1:', totalDiff);

// [PART 2 CODE]
// Calculates the similarity score by reducing the left list and filtering the right to find matching values each time
const totalSimScore = leftList.reduce((total, leftItem) => total+(leftItem*rightList.filter(val => val===leftItem).length), 0);
console.log('Part 2:', totalSimScore);