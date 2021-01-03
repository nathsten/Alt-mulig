//@ts-check

let numbers = [5,6,2,4,6,6,5,7,2,1,6,2];

/**
 * @param {Number[]} n
 * @returns {Number} 
 */
const commonNumbers = (n) => {
    let output;
    let numberTimesFound = [];
    

    for(let i=0; i<n.length; i++){
        let timesFound = 1;

        for(let j=0; j<n.length; j++){
            if(n[i] === n[j] && i !== j){
                timesFound += 1;
            }
        }

        if(timesFound > 1){
            if(numberTimesFound.indexOf([n[i], timesFound]) === -1){
                numberTimesFound.push([n[i], timesFound]);
            }
        }
    }
    
    /**
     * @param {Number[][]} n
     */
    const findCommonNumber = (n) => {
        let commonNumber = n[0][1];

        for(let i=0; i<n.length; i++){
            if(n[i][1] > commonNumber){
                commonNumber = n[i][0];
            }
        }
        return commonNumber;
    }

    output = findCommonNumber(numberTimesFound);

    return output;
}

// console.log(commonNumbers(numbers));

/**
 * @param {number[]} n
 * @returns {string}
 */
const findCommonNumber = n => {
    const numbers = {};
    n.forEach(e => numbers[e] ? numbers[e] += 1:0 || numbers[e] === undefined ? numbers[e] = 1:0);
    let commonNumber = Object.keys(numbers)[0];
    Object.keys(numbers).forEach(num => numbers[num] > numbers[commonNumber] ? commonNumber = num:0);
    return commonNumber;
}
console.log(findCommonNumber(numbers))