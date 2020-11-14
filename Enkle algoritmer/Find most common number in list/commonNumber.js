//@ts-check

let numbers = [5,2,4,6,5,7,2,1,2];

/**
 * @param {Number[]} n
 * @returns {Number} 
 */
const commonNumbers = (n) => {
    let numberAndIndex = [];
    let output;
    let numberTimesFound = [];
    

    for(let i=0; i<n.length; i++){
        let timesFound = 1;

        for(let j=0; j<n.length; j++){
            if(n[i] === n[j] && i !== j){
                timesFound += 1;
                numberAndIndex.push([n[j], i, j]);
            }
        }

        if(timesFound > 1){
            if(numberTimesFound.indexOf([n[i], timesFound]) === -1){
                numberTimesFound.push([n[i], timesFound]);
            }
        }
    }
    
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

console.log(commonNumbers(numbers));