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


/** Sorter ut tall over 0.
 * @param {number[]} a
 */
function filterUnder0(a){
    let kopi = [];
    for(let i=0; i<a.length; i++){
    if(a[i] > 0){kopi.push(a[i])}
    }
    return kopi;
}

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
        let commonWord = [n[0][0]];
        let bench = n[0][1];

        for(let i=0; i<n.length; i++){
            if(n[i][1] > bench){
                commonWord = [n[i][0]];
                bench = n[i][1];
            }
            else if(n[i][1] === bench){
                commonWord.push(n[i][0]);
            }
        }
        return commonWord;
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

/** Gjør om tilsendt valuta til NOK
 * Veldig tungvint, mulig bedre å splitte på lengden -3
 * Denne finner valuaen selv om valuta koden (SEK/NOK/USD/etc..) er lengre enn 3.
 * @param {string} a
 */
function valuta(a){
    let sum = [];
    let valuta = [];
    let sumHel = "";
    let valutaHel = "";
    let convertet;

    let split = a.split("");

    for(let i=0; i<split.length; i++){
        if(Number(split[i]) || Number(split[i]) == 0){
            sum.push(Number(split[i]));
        }
        else{
            valuta.push(split[i])
        }
    }
    
    for(let i=0; i<sum.length; i++){
        sumHel += sum[i];
    }

    for(let i=0; i<valuta.length; i++){
        valutaHel += valuta[i];
    }
    
    switch(valutaHel){
        case("USD"):
            convertet = Number(sumHel) * 6.4;
            break;
        case("GBP"):
            convertet = Number(sumHel) * 10.4;
            break;
        case("DKK"):
            convertet = Number(sumHel) * 1.1;
            break;
        case("EUR"):
            convertet = Number(sumHel) * 8.2;
            break;
        case("JPY"):
            convertet = Number(sumHel) * 6.0;
            break;
        case("SEK"):
            convertet = Number(sumHel) * 0.9;
            break;
    }
    return convertet + " kr";
}
console.log(valuta("192SEK"));


/** Sjekker at a&b ikke er tomme, lengden av "a" er større enn 2, og at "b" er 
        større enn 8 og mindre enn 92
 * @param {{ value: string; length: number; }} a
 * @param {{ value: string; }} b
 */
function dd(a,b){
    let korret = false;
    if(a.value !== "" && b.value !== ""){
        if(a.length > 2){
            if(Number(b.value) > 8 && Number(b.value) < 92){
                korret = true;
            }
        }
    }
    return korret;
}

// console.log(dd("he", "32"));

/** Returnerer alle ord som begynner på "c"
 * @param {string[]} a
 */
function katalogFilter(a){
    let cTabell = [];

    for(let i=0; i<a.length; i++){
        if(a[i].toLowerCase().charAt(0) === "c"){
            cTabell.push(a[i]);
        }
    }
    return cTabell;
}

let ordListe = ["aaa", "Cdf", "agc", "cgd"];

// console.log(katalogFilter(ordListe));

/** Summere alle tall under 89.
 * @param {Number[]} a
 */
function summer(a){
    let sumTable = [];

    for(let i=0; i<a.length; i++){
        if(a[i] > 89){
            sumTable.push(a[i])
        }
    }
    return sumTable.reduce((a,b) => a+b);
}

// console.log(summer([12,45,100,112]))

/** Summerer prisen av alle objekter som er billigere enn 208kr
 * @param {Object} a
 */
function prisberegning(a){
    let t = [];
    let ps = Object.keys(a);
    
    for(let i=0; i<ps.length; i++){
        if(Number(a[ps[i]].pris) < 208){
            t.push(Number(a[ps[i]].pris))
        }
    }

    return t.reduce((a,b) => a+b);
}

let prisliste = {
    "bukse": {"pris": 100},
    "sko": {"pris": 120},
    "skjorte": {"pris": 250}
}

// console.log(prisberegning(prisliste))

/** Sjekker om alle ord i en array begynner med "c".
 * @param {string[]} a
 */
function katalogC(a){
    let tof = true;

    for(let i=0; i<a.length; i++){
        if(a[i].toLowerCase().charAt(0) !== "c"){
            tof = false
        }
    }

    return tof;
}

// console.log(katalogC(["csj", "csso", "cdi", "fds"]));