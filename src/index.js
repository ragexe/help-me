module.exports = function count(mask, pairs) {
    let result = 0;

    let reducedMask = Array.prototype.reduce.call(mask, (prev, curr) => {
        return parseInt(prev) + parseInt(curr)
    });

    let multipliers = pairs.map((pair) => pair[0]).sort((left, right) => left - right);

    if (reducedMask > multipliers[0] || (mask.length - reducedMask) > multipliers[0]) return result;

    let powers = pairs.map((pair) => pair[1]);

    for (let j = 0; j < mask.length; j++) {
        result += getQuantity(multipliers, +mask[j] === 1)
    }

    let totalPower = powers.reduce((accumulator, currentValue) => {
        return accumulator *= (currentValue - 1) !== 0 ? (currentValue - 1) : 1;
    }, 1);

    let totalMultiplier = multipliers.reduce((previousValue, currentValue) => {
        return (previousValue) * (currentValue)
    });

    console.log(`multi ${totalMultiplier}`);
    console.log(result);

    if (mask.length > 1) {
        result /= multipliers[0]
    }

    // return 0
    return ~~pairs.reduce((prevPair, currentPair) => {
        result *= currentPair[0] ** (currentPair[1] - 1)
        if (result > 1000000007) {
            result %= 1000000007;
        }
        return result
    }, result)
};

function getQuantity(array, isEqualOne) {
    let resultObj = normalize(array);
    let mode = isEqualOne ? 0 : 1;
    let signSwitcher = 1;
    let result = 0;

    for (let i = array.length - mode; i >= 0; i--) {
        result += resultObj[i] * signSwitcher;
        signSwitcher *= -1;
    }

    // TODO refactor
    // console.log('---');
    // console.log(array);
    // console.log(result);

    return result;
}

function normalize(array) {
    let result = {};

    if (array.length === 1) {
        return {
            0: 1,
            1: array[0]
        }
    }

    for (let i = 0; i <= 2 ** array.length - 1; i++) {
        let bits = Array.from(i.toString(2));
        let bitMask = new Array(array.length - bits.length).fill('0').concat(bits);
        let level = bitMask.reduce((prevElement, currentElement) => {
            return parseInt(currentElement) + parseInt(prevElement)
        });
        result[level] = result[level] || 0;

        let multiSum = 1;
        for (let j = 0; j < array.length; j++) {
            if (parseInt(bitMask[j])) multiSum *= array[j]
        }

        result[level] += multiSum;
    }

    return result
}
