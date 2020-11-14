const settning = "Hei jeg er 17år jeg har en bror på 12år. Min far er 44år og min mor er 32år, jeg har også en bror på 1år";
// const numbers = Number(settning[34] + settning[35]);
// const output = [];
// output.push(numbers);

// console.log(numbers)

function finnTall(a){
    let output = [];
    let tall = "0123456789"

    for(let i=0; i<a.length; i++){
        let index = i+1;
        if(tall.includes(a[i])){
            if(isNaN(Number(a[i] + a[index])) === false){
                let numbers = String(a[i] + a[index]);
                output.push(Number(numbers));
            }
        }
    }
    return output;
}   
console.log(finnTall(settning))


// let yes = 1 + "a";
// if(isNaN(yes) === false){
//     console.log("Yes " + yes);
// }else{
//     console.log("No")
// }