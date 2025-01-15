const calData = document.getElementsByTagName('pre')[0].innerHTML.split('\n\n').map(elf => {
    return elf.split('\n').reduce((a, b) => a + parseInt(b), 0);
}).filter(val => !isNaN(val)).sort((a, b) => a<b ? 1 : -1);
console.log('Part 1:', calData[0]);
console.log('Part 2:', calData[0]+calData[1]+calData[2]);