//@ts-check

/**
 * @param {number[]} num1
 * @param {number[]} num2
 * @return {number}
 */

function finnMedian(num1, num2){
    let alleTall = num1.concat(num2);
    let tallListe = alleTall.sort((a,b) => a-b);
    let output;;
    let median = (tallListe.length);
    if((median % 2) === 0){
        let med = (median/2)
        let med1 = Math.floor(med-0.5);
        let med2 = Math.floor(med+0.5);
        let regnMedian = (tallListe[med1] + tallListe[med2]) / 2;
        output = regnMedian; 
    }   else{
        let med = Math.floor((median)/2);
        let finnMedian = tallListe[med];
        output = finnMedian;
    }
    return output;
}

let numberList1 = [2,3,0];
let numberList2 = [1,4,5];

console.log(finnMedian(numberList1, numberList2));