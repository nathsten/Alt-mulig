// @ts-check

let year = 2021;
let month = 2;

const mNavn = ("Januar,Februar,Mars,April,Mai,Juni,Juli,August,"
               + "September,Oktober,November,Desember").split(",");

function setup() {
    
    const py = document.getElementById("py");
    const ny = document.getElementById("ny");
    const lblYear = document.getElementById("year");

    py.addEventListener("click", prevYear);
    ny.addEventListener("click", nextYear);

    function prevYear() {
        year -= 1;
        lblYear.innerHTML = String(year);
        makeMonth();
    }

    function nextYear() {
        year += 1;
        lblYear.innerHTML = String(year);
        makeMonth();
    }

    // @ts-ignore
    const divMndr = /**@type {HTMLDivElement[]} */ (document.querySelectorAll(".mnd"));

    const makeMonth = () => {
        let mnr = 0;
        divMndr.forEach(div => {
            drawMonth(year,mnr, div);
            mnr++;
        })
    }
    makeMonth();
}

function skudd(y) {
    if (y % 400 === 0) return 1;
    if (y % 100 === 0) return 0;
    if (y % 4 === 0) return 1;
    return 0;
}


const antallDager = (y,m) => {
    if (m === 1) return 28 + skudd(y);
    return 30 + (m % 7 + 1) % 2;
}

const startDay = (y, m) => new Date(y, m, 0).getDay();


/**
 * @param {number} y 
 * @returns {{m: number, d: number}}
 */
 const easter = (y) => {
    const e = {};
    var A, B, C, D, P, Q, M, N, D, E;
    A = y % 19;
    B = y % 4;
    C = y % 7;
    P = Math.floor(y / 100);
    Q = Math.floor((13 + 8 * P) / 25);
    M = Math.floor(15 - Q + P - P / 4) % 30;
    N = Math.floor(4 + P - P / 4 ) % 7;
    D = Math.floor(19 * A + M) % 30;
    E = Math.floor(2 * B + 4 * C + 6 * D + N) % 7;
    var days = Math.floor(22 + D + E);

    if((D === 29) && (E === 6)) {
        e.m = 4;
        e.d = 19
    }  

    else if((D === 28) && (E === 6)){
        e.m = 4;
        e.d = 18;
    }

    else{
        if(days > 31){
            e.m = 4;
            e.d = (days-31);
        }
        else{
            e.m = 3;
            e.d = days;
        }
    }
    return e
}

/**
 * @param {number} y 
 * @param {number} m 
 * @param {number} d 
 * @param {number} x 
 * @returns {{y: number, m: number, d: number}}
 */
 const addDate = (y, m, d, x) => {
    const daysInMonth = (yr, mt) => new Date(yr, mt+1, 0).getDate();
    const date = {
        y: undefined,
        m: undefined,
        d: undefined
    }
    const newDate = d + x;
    const dm = daysInMonth(y, m);
    if(newDate > dm){
        date.y = y;
        date.m = m+1;
        date.d = newDate - dm;
    }
    else {
        date.y = y;
        date.m = m;
        date.d = newDate;
    }
    return date
}

/**
 * Skal tegne en måned gitt år,mnd og
 * en div til å rendre i
 * @param {number} y Gjeldende år
 * @param {number} m 0..11 måned-nr
 * @param {HTMLDivElement} div Div hvor måned skal rendres
 */
function drawMonth(y,m,div) {
    // disse linjene skal kanskje flyttes ut av funksjonen
    const special = [];  // liste over datoer som skal markeres
    const east = easter(y);
    special.push({y,m:4,d:17}); // 17.mai
    special.push(east);    // 1. påskedag
    special.push(addDate(y, east.m, east.d, 1))  // 2.påskedag
    special.push(addDate(y, east.m, east.d, -2))  // langfredag
    special.push(addDate(y, east.m, east.d, -3))  // skjærtorsdag

    // finner special days for denne måned
    const notableThisMonth = special.filter(event => event.m === m);
    const specialDays = notableThisMonth.map(event => event.d);
    // specialDays er nå et array som [17,26]

    div.innerHTML = "";
    div.classList.add("month");
    const antall = antallDager(y,m);
    const start = startDay(y,m);
    let dagene = "";
    for (let i=1; i<42; i++) {
        const day = i - start;
        const marked = (specialDays.includes(day)) ? 'class="special"' : "";
        const txt = (day > 0 && day <= antall) ? String(day) : "";
        dagene += `<span ${marked}>${txt}</span>`;
    }
    let s = "";
    s += `
    <fieldset>
       <legend>${mNavn[m]} </legend>
       <div class="ukedager">
         <span>Ma</span> 
         <span>Ti</span> 
         <span>On</span> 
         <span>To</span> 
         <span>Fr</span> 
         <span>Lø</span> 
         <span>Sø</span>
       </div>
       <div class="dager">
         ${dagene}
       </div>
    </fieldset>`;
    div.innerHTML = s;
}

