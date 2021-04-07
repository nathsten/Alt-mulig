let year = new Date().getFullYear();
let month = new Date().getMonth();
let today = new Date().getDate();
const todayYear = new Date().getFullYear();

const mNavn = ("Januar,Februar,Mars,April,Mai,Juni,Juli,August,"
               + "September,Oktober,November,Desember").split(",");

function setup(helligdager) {
    const py = document.getElementById("py");
    const ny = document.getElementById("ny");
    const lblYear = document.getElementById("year");
    const inptForm = document.getElementById("inptForm");
    const submit = document.getElementById("submit");
    const inpt = document.getElementById("eventText");
    const eventLabel = document.getElementById("eventLabel");

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
    divMndr.forEach(div => div.addEventListener("click", displayAddEvent));

    const makeMonth = () => {
        let mnr = 0;
        divMndr.forEach(div => {
            drawMonth(year,mnr, div, helligdager);
            mnr++;
        })
    }
    makeMonth();

    /**
     * @param {MouseEvent} event
     */
    function displayAddEvent(event) {
        const { target } = event;
        if(target.className.includes("clndDay")){
            const [ y, m, d ] = target.id.split(",").map(e => +e);
            inptForm.classList.remove("hidden");
            inptForm.classList.remove("slideOut");
            inptForm.classList.add("slideIn");
            const prevInfo = hentTextFor({y,m,d});
            inpt.focus();
            inpt.value = prevInfo;
            eventLabel.innerHTML = `Event for: ${d}-${m+1}-${y}`;
            
            submit.addEventListener("click", saveEvent);
            document.addEventListener("keydown", e => {if(e.keyCode === 27) {
                inptForm.classList.remove("slideIn");
                inptForm.classList.add("slideOut");
                setTimeout(() => {
                    inptForm.classList.add("hidden");
                    inpt.value = "";
                }, 751);
                
                submit.removeEventListener("click", saveEvent);
            }});
            
            /**
             * @param {MouseEvent} e
             */
            function saveEvent(e) {
                e.preventDefault();
                const text = inpt.value;
                console.log({y, m, d, text});
                lagreTextFor({y, m, d}, text);
                inptForm.classList.remove("slideIn");
                inptForm.classList.add("slideOut");
                setTimeout(() => {
                    inptForm.classList.add("hidden");
                    inpt.value = "";
                }, 751);
                
                submit.removeEventListener("click", saveEvent);
            }
        }
    }

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
        e.m = 3;
        e.d = 19
    }  

    else if((D === 28) && (E === 6)){
        e.m = 3;
        e.d = 18;
    }

    else{
        if(days > 31){
            e.m = 3;
            e.d = (days-31);
        }
        else{
            e.m = 2;
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
 * Lagrer text for en gitt dato, overskriver gammel
 * @param { {y:number,m:number,d:number } } dato
 * @param {string} text
 */
 function lagreTextFor(dato,text) {
    const { y, m, d } = dato;
    const event = {y, m, d, text};
    localStorage.setItem(text, JSON.stringify(event));
 }

 /**
 * Henter text for en gitt dato, tom tekst dersom ingenting lagra
 * @param { {y:number,m:number,d:number } } dato
 * @returns {string} text
 */
function hentTextFor(dato) {
    const len = localStorage.length;
        for(let i = 0; i < len; i++) {
            const verdi = localStorage.key(i);
            const data = JSON.parse(localStorage.getItem(verdi));
            if(data.y === dato.y && data.m === dato.m && data.d === dato.d) {
                return verdi; // eventuelt return data.text;
            }
        }

    return ""; // Denne blir bare gjennomført dersom if-statementet feiler. 
}

/**
 * Skal tegne en måned gitt år,mnd og
 * en div til å rendre i
 * @param {number} y Gjeldende år
 * @param {number} m 0..11 måned-nr
 * @param {HTMLDivElement} div Div hvor måned skal rendres
 * @param {{d: number, m: number}[]} helligdager
 */
function drawMonth(y,m,div, helligdager) {
    // disse linjene skal kanskje flyttes ut av funksjonen
    const special = [];  // liste over datoer som skal markeres
    const east = easter(y);
    special.push({y, m: east.m, d: east.d});    // 1. påskedag
    special.push(addDate(y, east.m, east.d, 1))  // 2.påskedag
    special.push(addDate(y, east.m, east.d, -2))  // langfredag
    special.push(addDate(y, east.m, east.d, -3))  // skjærtorsdag
    helligdager.forEach(day => special.push({y: 2021, m: day.m, d: day.d}));    
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
        const cs = [];
        (specialDays.includes(day)) ? cs.push("special") : "";
        (day === today && m === month && y === todayYear ? cs.push("today") : ""); 
        const txt = (day > 0 && day <= antall) ? String(day) : "";
        dagene += `<span class="${(day > 0 && day <= antall) ? "clndDay " : ""}${cs.join(" ")}" id="${y},${m},${day}" >${txt}</span>`;
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