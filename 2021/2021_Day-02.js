const instructions = document.getElementsByTagName('pre')[0].textContent.split('\n').filter(el => el.length > 0).map(el => {
    const parts = el.split(' ');
    return {
        inst: parts[0],
        num: parseInt(parts[1])
    }
});

const sumInst = inst => instructions.filter(el => el.inst == inst).map(el => el.num).reduce((prev, curr) => prev+curr);
console.log('Part 1:', (sumInst('down')-sumInst('up'))*sumInst('forward'));

let hoz = 0;
let depth = 0;
let aim = 0;
instructions.forEach(val => {
    if (val.inst == 'down') {
        aim += val.num;
    } else if (val.inst == 'up') {
        console.log('before', aim);
        aim -= val.num;
        console.log('after', aim);
    } else if (val.inst == 'forward') {
        hoz += val.num;
        depth += aim*val.num;
    }
});
console.log('Part 2:', BigInt(hoz*depth).toString());