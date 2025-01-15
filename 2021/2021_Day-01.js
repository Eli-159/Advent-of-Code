const numbers = document.getElementsByTagName('pre')[0].textContent.split('\n').filter(num => !isNaN(parseInt(num))).map(num => parseInt(num));
const numGrp = numbers.map((el, i, arr) => (arr[i-1] && arr[i+1] ? arr[i-1]+el+arr[i+1] : undefined)).filter(val => val != undefined);
console.log('Part 1: ', numbers.filter((el, i, arr) => el > arr[i-1]).length);
console.log('Part 2: ', numGrp.filter((el, i, arr) => el > arr[i-1]).length);