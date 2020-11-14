//Algoritme som finne to tall som kan ganges sammen for å få ditt 
//targetted tall.
function rndNum1(){
    let num1 = Math.floor(Math.random() * (1000 - 100) + 100) / 100;
    return num1;
}

function rndNum2(){
    let num2 = Math.floor(Math.random() * (1000 - 100) + 100) / 100;
    return num2;
}

let target;
// target = 57.28

function findNumber(){
    let tallTabell = [];
    for(let i=0; i<10000000; i+=1){
        let num1 = rndNum1();
        let num2 = rndNum2();
        if(num1 * num2 == target){
            tallTabell.push(`Multipliser disse: ${num1}, ${num2}`);
        }
    }
    return tallTabell
}
// console.log(findNumber())

// Finner alltid et tall som må ganges med ditt tall for å få e
let targetForE;
function findE(){
    let tallTabell = [];
    for(let i=0; i<100000000; i+=1){
        let num1 = rndNum1();
        let num2 = rndNum2();
        if((targetForE * num1) == 2.72){
            tallTabell.push(`Multipliser disse: (ditt tall) med, ${num1}`);
        }
        if((targetForE * num2) == 2.72){
            tallTabell.push(`Multipliser disse: (ditt tall) med, ${num2}`);
        }
    }
    return tallTabell
}
// console.log(findE())

//Algoritme som lager en array med stigende tall
function risingNumber(){
    let num = Math.floor(Math.random() * (100000 - 100) + 100) / 1000;
    return num;
}
function lagStigendeTabell(){
    let tabell = [1];
    for (let i=0; i<10000; i+=1){
        let num = risingNumber();
        if (num = (tabell[i]*2)){
            tabell.push(num)
        }
    }
    return tabell;
}

console.log(lagStigendeTabell());

let tallArr = [5,2,3,1,8,7,0,4,7,3,4,9,8,6,1,5];

function finnSum(a){
    let sumArr = [];
    for(let i=0; i<a.length; i++){
        for(let j=0; j<a.length; j++){
            if(a[i] + a[j] === 9){sumArr.push([a[i], a[j]])}            
        }
    }
    return sumArr; 
}
console..log(finnSum(tallArr));
