const input = document.querySelector('pre').textContent.split('\n\n');
const seeds = input.shift().split(' ').filter(line => /^[0-9]+$/.test(line)).map(seed => parseInt(seed));

class Map {
    constructor(mapText) {
        this.ranges = mapText.split('\n').filter(line => /^([0-9]| )+$/.test(line)).map(line => line.split(' ').map(num => parseInt(num))).sort((a, b) => a[1]>b[1] ? 1 : -1).flatMap((line, i, lines) => {
            const rtnArr = [];
            if (i == 0) {
                rtnArr.push({
                    source: {
                        start: 0,
                        end: line[1]-1
                    },
                    dest: {
                        start: 0,
                        end: line[1]-1
                    }
                });
            } else if (lines[i-1][1]+lines[i-1][2] < line[1]-1) {
                rtnArr.push({
                    source: {
                        start: lines[i-1] ? lines[i-1][1]+lines[i-1][2] : 0,
                        end: line[1]-1
                    },
                    dest: {
                        start: lines[i-1] ? lines[i-1][1]+lines[i-1][2] : 0,
                        end: line[1]-1
                    }
                });
            }
            rtnArr.push({
                source: {
                    start: line[1],
                    end: line[1]+line[2]-1
                },
                dest: {
                    start: line[0],
                    end: line[0]+line[2]-1
                }
            })
            return rtnArr;
        });
    }

    findDest = (source) => {
        const matchingRange = this.ranges.find(range => range.source.start <= source && range.source.end >= source);
        if (matchingRange) return {range: matchingRange, dest: matchingRange.dest.start+source-matchingRange.source.start};
        else return {range: null, dest: source}
    }

    findBlockDest = (lowBound, upBound) => {
        const blockRanges = [];
        const upDestBound = this.findDest(upBound).dest;
        let curr = lowBound;
        let currDest;
        do {
            currDest = this.findDest(curr);
            const endSource = currDest.range.source.end<=upBound ? currDest.range.source.end : upBound;
            const endDest = currDest.range.source.end<=upBound ? currDest.range.dest.end : upDestBound;
            blockRanges.push({
                source: {
                    start: curr,
                    end: endSource
                },
                dest: {
                    start: currDest.dest,
                    end: endDest
                }
            });
            curr = endSource+1;
        } while (curr <= upBound);
        return blockRanges;
    }
}

class BlockPath {
    constructor(lowBound, upBound, path) {
        this.lowBound = lowBound;
        this.upBound = upBound;
        this.path = path ? path : [{lowBound, upBound}];
    }

    mapBlock = (map) => {
        return map.findBlockDest(this.lowBound, this.upBound).map(range => {
            return BlockPath.cutBlock(this, range);
        });
    }

    static cutBlock = (block, range) => {
        const lowDif = range.source.start-block.lowBound;
        const upDif = block.upBound-range.source.end
        const path = block.path.map(bounds => {
            return {
                lowBound: bounds.lowBound+lowDif,
                upBound: bounds.upBound-upDif
            }
        });
        path.push({
            lowBound: range.dest.start,
            upBound: range.dest.end
        });
        return new BlockPath(range.dest.start, range.dest.end, path);
    }
}

const maps = input.map(mapText => new Map(mapText));

const seedLocations1 = seeds.map(seed => maps.reduce((mapped, map) => map.findDest(mapped).dest, seed));
console.log('Part 1:', seedLocations1.sort((a, b) => a<b ? -1 : 1)[0]);

const seedRanges = [];
for (let i = 0; i < seeds.length; i+=2) seedRanges.push([seeds[i], seeds[i]+seeds[i+1]-1]);
let blockPaths = seedRanges.map(seedRange => new BlockPath(...seedRange));
maps.forEach(map => blockPaths = blockPaths.flatMap(blockPath => blockPath.mapBlock(map)));

console.log('Part 2:', blockPaths.reduce((low, curr) => curr < low ? curr : low).lowBound);