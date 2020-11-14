//Finner de som er etterhverandre.
let tall = [2,5,5,11];
let tgt = 10;

var twoSum = function(nums, target) {
    let output = [];
    let funnet = false;
    while(funnet === false){
        for(let i=0; i<nums.length; i++){
            for(let j=1; j<nums.length; j++){
                if(nums[i] + nums[j] === target){
                    if(i != j){
                        output.push(i, j);
                        output.length = 2;
                        funnet = true;
                    }
                };
            }
        }
    }
    return output
};

console.log(twoSum(tall, tgt));

// console.log("-----Sum etterhverandre i Arry----");
// console.log(twoSum(nums, tgt));
// console.log("----------------------------------");

// // // let tallListe = [1,4,7,5,2];
// const rndNum = () => Math.floor(Math.random() * 20) + 1;
// let tallListe = [rndNum(), rndNum(), rndNum(), rndNum(), rndNum(), rndNum(), rndNum(), rndNum(), rndNum(), rndNum(), rndNum(), rndNum(), rndNum(), rndNum(), rndNum(), rndNum()];
// let target = 12;
// console.log(tallListe)

function finSum(a, b){
    let output = [];
    for(let i=0; i<a.length; i++){
        for(let j=0; j<a.length; j++){
            if(a[i] + a[j] === b){output.push([[i, j], [a[i], a[j]]])}
        }
    }
    return output
}

// console.log(finSum(tallListe, target));
// console.log([rndNum(), rndNum()])