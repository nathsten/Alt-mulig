// @ts-check

const { mkdir } = require("fs");

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
    /**
     * @param {string | any[]} n
     */
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
    return convertet;
}
// console.log(valuta("192SEK"));

/** Litt bedre måte å gjøre det på.
 * @param {string} a
 * @returns {Number}
 */
const valutaToNOK = (a) => {
    let valuta = a.slice(a.length-3);
    let valutaNum;
    let sumStr = ""; for(let i=0; i<a.length-3; i++){sumStr += a[i]}; // Må garrantert finnes en bedre måte å gjøre dette på...
    let sum = Number(sumStr);

    switch(valuta.toUpperCase()){
        case("USD"):
            valutaNum = 6.4;
            break;
        case("GBP"):
            valutaNum = 10.4;
            break;
        case("DKK"):
            valutaNum = 1.1;
            break;
        case("EUR"):
            valutaNum = 8.2;
            break;
        case("JPY"):
            valutaNum = 6.0;
            break;
        case("SEK"):
            valutaNum = 0.9;
            break;
    }
    return sum*valutaNum;
}

// console.log(valutaToNOK("178gbp"))


/** Sjekker at a&b ikke er tomme, lengden av "a" er større enn 2, og at "b" er 
        større enn 8 og mindre enn 92
 * @param {{ value: string; length: number; }} a
 * @param {{ value: string; }} b
 */
function checkAB(a,b){
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

// console.log(checkAB("he", "32"));

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

/** Finner hyppigheten til hvert ord i en settning. 
 * @param {string} a
 * @returns {object}
 */
function wordFrequency(a){
    let wf = {};
    let w = a.split(" ");

    for(let i=0; i<w.length; i++){
        if(wf[w[i]] === undefined){
            wf[w[i]] = 1;
        }
        else{
        wf[w[i]] += 1;
        }
    }

    return wf;
}

// console.log(wordFrequency("det var en gang en mann som en gang sa det"))

/** Gjør om entall til flertall
 * @param {string} a
 * @returns {string}
 */
function plural(a){
    let i = a.length;
    if(a.split("")[i-1] !== "s"){
        a += "s";
    }
    return a;
}

// console.log(plural("cat"));

/** Teller opp hvor mange tall det finnes i en array. 
 * @param {number[]} a
 * @returns {object}
 */
function telling(a){
    let t = {};

    for(let i=0; i<a.length; i++){
        if(t[a[i]] !== undefined){
            t[a[i]] += 1;
        }
        else{
            t[a[i]] = 1;
        }
    }
    return t;
}

// console.log(telling([1,1,1,1,2,2,2,3,3,4,4,5,5,6,6,6,6]));

/** Finner den kombinasjonen av pakkene(b) som er mindre eller lik "a";
 * @param {number} a
 * @param {number[]} b
 */
function taMedBest(a,b){
    let summer = [];

    for(let i=0; i<b.length; i++){
        let sum = 0;
        for(let j=i; j<b.length; j++){
            sum += b[j];
            summer.push(sum);
        }
        summer.push(sum);
    }

    let best = summer[0];

    for(let i=0; i<summer.length; i++){
        if(summer[i] > best && summer[i] <= a){
            best = summer[i];
        }
    }

    return best;
}

// console.log(taMedBest(60, [8,20,30,5,4]));

/** Newton for å finne nullpunkt (ikke helt newton men den funker)
 * @param {string} a
 * @param {number} b
 * @param {number} c
 */
const newton = (a,b,c) => {
    let nullpunkt;

    let n = "";
    for(let i=0; i<a.length; i++){
        if(Number(a[i]) || Number(a[i]) === 0){
            n += String(a[i]);
        }
    }
    
    let cN = Number(n);

    let x1 = -0+(Math.sqrt(0**2 - 4*1*-cN))/2;
    let x2 = -0-(Math.sqrt(0**2 - 4*1*-cN))/2;

    if(x1 > b && x1 < c && x2 > b && x2 < c){
        nullpunkt = [x1.toFixed(3), x2.toFixed(3)];
    }
    else if(x1 > b && x1 < c){
        nullpunkt = x1.toFixed(3);
    }
    else if(x2 > b && x2 < c){
        nullpunkt = x2.toFixed(3);
    }
    else{
        nullpunkt = "Fant ingen nullpunkt innenfor intervallet";
    }

    return nullpunkt;
}

// console.log(newton("x*x-16", -1, 12));

/**
 * @param {string | any[]} a
 * @param {number} b
 * @returns {string[]}
 */
function numberNames(a,b){
    let numsStr = "";
    let names = "";
    let output = [];
    let index = 1000;
    let numbers = [];

    for(let i=0; i<a.length; i++){
        if(Number(a[i])){
            numsStr += String(a[i]);
            if(index === 1000){
                index = i;
            }
        }
        else if (Number(a[i]) === 0 || String(a[i])) {
            names += String(a[i])
        }
    }

    for(let i=0; i<b; i++){
        let o = Number(numsStr) + i;
        numbers.push(o)
    }

    for(let i=0; i<numbers.length; i++){
        let o = names + numbers[i]
        output.push(o)
    }

    return output
}

// console.log(numberNames("1bilde", 3))

/**
 * @param {string} a
 */
// function reduce(a){
//     let nums = "";
//     let str = "";

//     /**
//      * @param {any} a
//      * @param {any} b
//      */
//     a.split("").reduce((a,b) => {
//         if(Number(a)){
//             nums += String(a);
//         }
//         if(Number(b)){
//             nums += String(b);
//         }
//         else{
//             str += String(b);
//         }
//     })
//     return [nums, str]
// }

// console.log(reduce("hei12"))

let byLister = ["oslo", "os"];

// console.log(byLister.map(e => `<o>${e}</o>`).join(``));

class Elev{
    fornanvn; 
    etternavn;
    /**
     * @param {any} a
     * @param {any} b
     */
    constructor(a,b){
        this.fornanvn = a;
        this.etternavn = b
    }
}

let n = new Date();
// console.log(n)

/**
 * @param {any[]} a
 */
function su(a){
    /**
     * @param {any} a
     * @param {any} b
     */
    return a.reduce((a,b) => a+b, 0)
}

// console.log(su([1,2,3]))

/**
 * @param {number} r
 * @param {number} h
 */
function cylinder(r,h){
    let areal = r**2*Math.PI;
    return areal*h;
}

// console.log(cylinder(10, 5));

/**
 * @param {String} a
 */
const boyOrGirl = a => {
    if(a.includes("a") || a.includes("unn") || a.includes("de") || a.includes("te") || a.includes("ri")){
        return "f";
    }
    return "m";
}

// console.log(boyOrGirl("ingunn"));

/**
 * @param {String} a
 */
const ub = a => {
    const obj = {}
    a.toLowerCase().split("").forEach(b => obj[b] ? obj[b] +=1:0 || obj[b] === undefined ? obj[b] = 1:0);
    return (Object.keys(obj).length);
}

// console.log(ub("Nathaniel"));

/**
 * @param {string} a
 */
function hils(a){
    const ne = a.split(" ");
    let output = "";
    for(let i=0; i<ne.length; i++){
        let navn = "";
        for(let j=0; j<ne[i].length; j++){
            if(j === 0){
                navn += ne[i][j].toUpperCase();
            }
            else{
                navn += ne[i][j];
            }
        }
        if(i !== ne.length-1){
            navn += " ";
        }
        output += navn;
    }
    return `Hei ${output}, velkommen!`;
}
// console.log(hils("nath sten"));

/**
 * @param {string | any[]} a
 */
function siste(a){
    const len = a.length;
    return a[len-1];
}

// console.log(siste("hei"));

/**
 * @param {number} n
 */
function bits(n){
    let antall = 0;
    while(n > 0){
        if(n % 2 === 1){
            antall ++;
        }
        n = Math.floor(n/2);
    }
    return antall;
}

// console.log(bits(12));

/**
 * @param {string} a
 */
function inits(a){
    const n = a.split(" ");
    let i = "";
    n.forEach(e => i += e[0].toUpperCase());
    return i;
}

// console.log(inits("Ulla vest"));

/** 
 * @param {string} a 
 */
function niceName(a){
    return a.split(",").reverse().join(" ");
}   

// console.log(niceName("Olsen,Ole"))

/** 
 * @param {string} a 
 */
function onlyTheLonely(a){
    return a === a.toLowerCase();
}

/** 
 * @param {number[]} a 
 * @param {number[]} b 
 */
function kontakt2(a,b){
    return a.filter(e => !b.includes(e));
}
// console.log(kontakt2([1,2,3,4,5,6,7,8,9], [15,2,6,4]))

/**
 * @param {{Object: number}} byliste
 * @returns {string[]}
 */
const findRoute = byliste => {
    const byer = Object.keys(byliste);
    const route = [];

    return ["hei"];
}

const byer = {
    Haugesund: 0,
    Tysvær: 10,
    Stavanger: 120,
    Bokn: 40,
    Vindafjord: 31,
    Karmøy: 11,
    Åkrehamn: 45,
    Bryne: 89,
    Kopervik: 18
}

/**
 * @param {string} a
 * @param {number} b
 */
function dupliser(a,b){
    if(b < 1 || b > 10){
        return "";
    }
    else{
        return a.repeat(b);
    }
}
// console.log(dupliser("X", 9));

/**
 * @param {string} a
 * @param {string} b
 * @param {number} c
 */
function shortname(a,b,c){
    const l = n => n.length;
    if(l(a) + l(b) < c){
        return a + ' '+b;
    }
    else if(l(a[0]) + l(b) < c){
        return a[0] + ' ' + b;
    }
    else{
        return a[0] + ' ' + b[0];
    }
}
// console.log(shortname("olse", "olsen", 3));

const findNumbers1 = a => {
    const tall = [];
    const isN = s => "0123456789".includes(s);
    for(let i=0; i<a.length; i++){
        let ts = "";
        if(isN(a[i])){
            let j=i;
            while(isN(a[j])){
                ts += a[j];
                i = j;
                j++
                if(!isN(a[j])){
                    break;
                }
            }
            if(ts){
                tall.push(Number(ts));
            }
        }
    }
    return tall;
}
const a = "jeg er 12 og broren min er 16";
// console.log(findNumbers(a));

const findNums2 = a => {
    const t = [];
    a.replace(/(\d+)/gm, n => t.push(+n));
    return t;
}

/**
 * @param {string} a 
 */
const findNumbers = a => a.split(/(\d+)/).filter(e => +e).map(e => +e);
// const findNumbers = a => a.split(/(\d+)/).filter(e => e === "0" || +e).map(e => +e);

/**
 * @param {string} a 
 */
const m = a => a.match(/(\d+)/g).map(e => +e);
// console.log(m("jeg er 12, broren min er 16 og min mor er 106"));

// console.log(findNumbers("jeg er 12, broren min er 16 og min mor er 106"));

/**
 * @param {string} a 
 */
const findNameAndAges = a => {
    const namesAges = {};
    const names = a.split(" ").filter(e => e[0] === e[0].toUpperCase()).filter(e => e.match(/[A-Z]/));
    const ages = [];
    a.match(/[A-Z(\d+)]/gm).join("").split(/(\d+)/gm).forEach(e => +e ? ages.push(e) : null);
    for(let i in ages){
        namesAges[names[i]] = +ages[i]
    }
    return namesAges
}
const na = `Ole er 12 år og Per er 14år, jeg Jonathan fyllte 18år i høst, og Gunnhild som er vår mor er 42år og vår bror Joe er en kul 19åring`;
// console.log(findNameAndAges(na)); // { Ole: 12, Per: 14, Jonathan: 18, Gunnhild: 42, Joe: 19 }

const tellOrd = a => a.split(/[ ,.]+/gm).length;
// console.log(tellOrd("Hei, jeg heter Jones a sss"));

/**
 * @param {string} a 
 */
const forskjelligeOrd = a => {
    const ord = {};
    a.split(/[ ,.]+/gm).forEach(e => ord[e] ? ord[e] += 1 : ord[e] = 1);
    return Object.keys(ord).length;
}
// console.log(forskjelligeOrd("Hei jeg heter jeg og jeg er jeg"));

/**
 * @param {string} a 
 */
const repitisjonsFrase = a => {
    const treOrd = a.match(/(.*?\s){3}/g);
    return treOrd;
}
// console.log(repitisjonsFrase("jeg heter joe jeg er kul jeg heter joe "))

/**
 * @param {string} a 
 */
const deriver = a => {
    const potenser = a.split(/[+-]/g);
    const tegn = a.match(/[+-]+/gm);
    let i = 0;
    let deriverte = "";
    potenser.forEach(ledd => {
        if(+ledd[0] && +ledd[ledd.length-1]){
            const xs = +ledd[ledd.length-1] * +ledd[0];
            deriverte += `${xs}${ledd[1]}`;
            if(+ledd[ledd.length-1]-1 > 1){
                deriverte += `^${+ledd[ledd.length-1]-1}`;
            }
            if(tegn[i]){
                deriverte += tegn[i];
            }
        }
        else{
            deriverte += `${ledd.split("").filter(e => +e).join("")} `;
            if(tegn[i]){
                deriverte += tegn[i];
            }
        }
        i++;
    })

    return deriverte;
}

console.log(deriver("3x^4-9x^3-3x^2+18x"));

/**
 * @param {string} a 
 */
const sisteOrd = a => a.split(/[ ]+/).filter(e => e[e.length-1] === ".").map(e => e.slice(0, e.length-1));

// console.log(sisteOrd("Hei jeg heter. og jeg har."))

class HashTable{
    constructor(){
        this.table = {};
        this.length = 0;
        this.keys = [];
    }
    genHashKey(){
        const c = "qwertyuiopasdfghjklzxcvbnm1234567890";
        const r = () => Math.floor(Math.random() * c.length);
        let key = "";
        for(let i=0; i<10; i++){
            key += c[r()];
        }
        return {key};
    }
    add(username, score){
        const userId = this.keys.length + 1;;
        const {key} = this.genHashKey();
        this.table[key]=  {userId, username, score};
        this.length += 1;
        this.keys.push(key)
        return key;
    }
    get = key => this.table[key];
}

// const ht = new HashTable();
// const JKey = ht.add("Joe", 1000);
// const BKey = ht.add("Ben", 2500);
// const HKey = ht.add("Hans", 1800);
// const MKey = ht.add("Martin", 2200);
// console.log(ht.get(MKey))

