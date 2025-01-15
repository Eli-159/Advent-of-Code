const input = document.querySelector('pre').textContent.split('\n\n').filter(el => el);
const instructions = input[0].split('');
const nodes = {};
input[1].split('\n').filter(node => node).map(node => nodes[node.substring(0, 3)] = {
    name: node.substring(0, 3),
    L: node.substring(7, 10),
    R: node.substring(12, 15)
});

let currNode = nodes.AAA;
let index = 0;
while (currNode.name != 'ZZZ') {
    currNode = nodes[currNode[instructions[index%(instructions.length)]]];
    index++;
}
console.log('Part 1:', index);



const nodeEnds = Object.keys(nodes).filter(nodeName => /..A/.test(nodeName)).map(nodeName => {
    const ends = [];
    let node = nodes[nodeName];
    let i = 0;
    while (ends.length < 2) {
        node = nodes[node[instructions[i%(instructions.length)]]];
        if (/..Z/.test(node.name)) {
            ends.push({index: i, node: node.name});
        }
        i++;
    }
    return ends;
});

// Following this a pattern was identified: and end is reached after a set number of times for each node. The below code verifies the pattern does indeed exist.
if (!nodeEnds.every(end => (end[0].index+1)*2 == end[1].index+1)) throw new Error('Pattern doesn\'t work on this dataset');

// Given the pattern is verfied, the lowest common multiple is found
const nodeFactors = nodeEnds.map(ends => ends[0].index+1).sort((a, b) => b-a);
console.log(nodeFactors);
const lowestCommMult = nodeFactors.reduce((acc, curr) => {
    let lcm;
    for (lcm = acc; lcm%curr !== 0; lcm+=acc);
    return lcm;
}, nodeFactors[0]);

console.log('Part 2:', lowestCommMult);