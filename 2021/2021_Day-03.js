function partOne() {
    const rawData = document.getElementsByTagName('pre')[0].innerHTML.split('\n');

    const gam = [];
    const eps = [];

    for (let i = 0; i < rawData[0].length; i++) {
        const oneCount = rawData.filter(val => val[i] == '1').length;
        const zeroCount = rawData.filter(val => val[i] == '0').length;
        const oneBigger = oneCount>zeroCount;

        gam.push(oneBigger ? 1 : 0);
        eps.push(oneBigger ? 0 : 1);
    }

    const gamNum = parseInt(gam.join(''), 2);
    const epsNum = parseInt(eps.join(''), 2);

    console.log(gamNum*epsNum);
}

function partTwo() {
    const rawData = document.getElementsByTagName('pre')[0].innerHTML.split('\n');

    let ox = rawData;
    let co = rawData;

    for (let i = 0; i < rawData[0].length; i++) {
        if (ox.length == 1) break;
        const oneCount = ox.filter(val => val[i] == '1');
        const zeroCount = ox.filter(val => val[i] == '0');
        if (zeroCount.length > oneCount.length) {
            ox = zeroCount;
        } else {
            ox = oneCount;
        }
    }

    for (let i = 0; i < rawData[0].length; i++) {
        if (co.length == 1) break;
        const oneCount = co.filter(val => val[i] == '1');
        const zeroCount = co.filter(val => val[i] == '0');
        if (zeroCount.length > oneCount.length) {
            co = oneCount;
        } else {
            co = zeroCount;
        }
    }
    
    const oxNum = parseInt(ox.join(''), 2);
    const coNum = parseInt(co.join(''), 2);

    console.log(oxNum*coNum);
}