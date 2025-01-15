const dataString = document.getElementsByTagName('pre')[0].textContent;
const currChars = [dataString[0], dataString[1], dataString[2], dataString[3]];
let markerFound = false;
let charsPassed = 3;

while (!markerFound) {
    charsPassed++;
    currChars.shift();
    currChars.push(dataString[charsPassed]);
    markerFound = new Set(currChars).size == 4;
}

console.log('Part 1:', charsPassed+1);

charsPassed--;
currChars.unshift(dataString[charsPassed-3])
for (let i = 2; i <= 10; i++) currChars.push(dataString[charsPassed+i]);
charsPassed+=10
markerFound = false;
while (!markerFound) {
    charsPassed++;
    currChars.shift();
    currChars.push(dataString[charsPassed]);
    markerFound = new Set(currChars).size == 14;
}

console.log('Part 2:', charsPassed+1);