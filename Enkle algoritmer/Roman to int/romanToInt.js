//@ts-check
/**
* @param {string} s
* @return {number} 
*/
var romanToInt = function(s) {
    let roman = s.split("");
    let tall = [];
    let output = 0;

    for(let i=0; i<roman.length; i++){
        switch(roman[i]){
            case"I":
            {
                tall.push(1);
                break;
            }
            case"V":
            {
                tall.push(5);
                break;
            }
            case"X":
            {
                tall.push(10);
                break;
            }
            case"L":
            {
                tall.push(50);
                break;
            }
            case"C":
            {
                tall.push(100);
                break;
            }
            case"D":
            {
                tall.push(500);
                break;
            }
            case"M":
            {
                tall.push(1000);
                break;
            }
        }
    }
    for(let i=0; i<tall.length; i++){
        let t = tall[i];
        output += t;
    }

    return output;
};

console.log(romanToInt("IV"));

// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000