// @ts-check

/** Finner alle tall over 0.
 * @param {number[]} a
 * @param {number[]} b
 * @param {number[]} c
 * @param {number[]} d
 * @param {number[]} e
 * @param {number[]} f
 */
function filterNumbers(a,b,c,d,e,f){
    let tall = a.concat(b, c, d, e, f);
    let tallOverNull = [];

    for(let i=0; i<tall.length; i++){
        if(tall[i] > 0){
            tallOverNull.push(tall[i]);
        }
    }

    return tallOverNull;
}
let tallA = [1,-3,4];
let tallB = [1,3,-9];
let tallC = [1,-1,4];
let tallD = [-6,3,4];
let tallE = [-3,3,4];
let tallF = [1,3,-3];
// console.log(filterNumbers(tallA, tallB, tallC, tallD, tallE, tallF));


/** Finner det miste tallet blandt tre alternativ
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
function minimun(a,b,c){
    let min = Math.min(a,b,c);
    return min;
}
// console.log(minimun(4,5,2));


/** Returnerer snitte av tre tall
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
function average(a,b,c){
    let sum = a + b + c;
    let average = sum/3;
    return average;
}

// console.log(average(4,6,2));

/** Finnder gdc til to tall
 * @param {number} a
 * @param {number} b
 */
function gdc(a,b){
    let gdc;
    for(let i=1; i<100; i++){
        if((a % i === 0) && (b % i === 0)){
            gdc = i;
        }
    }
    return gdc;
}

// console.log(gdc(1365,462))

/** Finner hvilke tall i b som mangler i a
 * @param {number[]} a
 * @param {number[]} b
 */
function kontakt(a,b){
    let ikkeReg = [];
    for(let i=0; i<a.length; i++){
        if( b.indexOf(a[i]) === -1 ){
            ikkeReg.push(a[i])
        }
    }
    return ikkeReg;
}

// console.log(kontakt([1,2,3,4,5,6,7,8,9], [15,2,6,4]))


/**
 * @param {string} a
 */
function makeSelect(a){
    let elementer = a.split(",")
    let select = "(select)";
    for(let i=0; i<elementer.length; i++){
        let opt = elementer[i];
        select += "(option)" + opt + "(/option)";
    }
    select += "(/select)";
    return select;
}

// console.log(makeSelect("Ole, Joe, John, Peter"));


/** Finner det mest gjentattet ordet i en settning. 
 *  Dersom to eller flere ord gjentas like mange ganger blir den første i alfabetet returnert. 
 * @param {string} a
 */
function topN(a){
    let output = [];
    let ord = a.split(" ");
    let gjentattord = [];

    for(let i=0; i<ord.length; i++){
        let antFunnet = 1;

        for(let j=0; j<ord.length; j++){
            if(ord[i] === ord[j] && j !== i){
                antFunnet += 1;
            }
        }

        if(antFunnet > 1){
            if(gjentattord.indexOf([ord[i], antFunnet]) === -1){
                gjentattord.push([ord[i], antFunnet]);
            }
        }
    }
    const findCommonWord = (n) =>{
        let commonNumber = [n[0][0]];
        let bench = n[0][1];

        for(let i=0; i<n.length; i++){
            if(n[i][1] > bench){
                commonNumber = [n[i][0]];
                bench = n[i][1];
            }
            else if(n[i][1] === bench){
                commonNumber.push(n[i][0]);
            }
        }
        return commonNumber;
    }
    output = findCommonWord(gjentattord);
    if(output.length > 1){
        output.sort();
        output = [output[0]];
    }
    return output;
}

// console.log(topN("det var en gang en mann som sa det er en gang det"));

/** Tar vekke alle like tall i en array. 
 * @param {array} a 
 */
function uniq(a){
    let unni = a;
    for(let i=0; i<a.length; i++){
        for(let j=0; j<a.length; j++){
            if(unni[i] === unni[j] && i !== j){
                unni.splice(j, 1);
            }
        }
    }
    unni.sort((a,b) => a-b);
    return unni;
}

// console.log(uniq([1,2,2,1,1,4,4,3,5,2,2,1,2]));