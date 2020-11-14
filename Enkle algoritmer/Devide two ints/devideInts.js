/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
// var divide = function(dividend, divisor) {
//     let output;
//     if(divisor < 0 && dividend < 0){
//         output = Math.floor(dividend/divisor);
//     }   
//     else if(divisor < 0 || dividend < 0){
//         output = Math.floor(dividend/divisor) + 1;
//     }
//     else{
//         output = Math.floor(dividend/divisor);
//     }
//     return output;
// };

var divide = function(dividend, divisor) {
    let output;
    if(dividend.length > 9){
        output = Math.trunc(dividend/divisor) - 1;
    }
    else{
        output = Math.trunc(dividend/divisor);
    }
    return output;
};

console.log(divide(11, -4))