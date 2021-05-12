// // @ts-check
// Fikk så unødvendig mange røde streker med @ts-check at jeg doppet den.

import { $, makeTag } from '../util.js';

const oppdrag = {
    // Bruker split da det er raskere
    Per: "Gui design,Login/out,Chat".split(","),
    Anne: "Login/out,Testing,Rendering".split(","),
    // Legger til en ekstra slik at opptatt blir aktiviert.
    Ola: "Effects,Collision,Pathfinding,Rendering".split(","),
    Kari: "Testing,Login/out".split(","),
    // Gjør Jens ledig slik at ledig blir aktiviert.
    Jens: [],
    Linse: "GUI design,Assets,Rendering".split(",")
}


const main = () => {
    // Importert funksjonen $ som returnerer en array av HTMLElement, pakker de derretter ut.
    const [ ansattSelect, AnsattNavn, arbeidsListe, jobbInfo ] = $("ansattSelect AnsattNavn arbeidsListe jobbInfo");

    // Importert funksjonen makeTag fra util.js som lage en HTML tag for meg.
    ansattSelect.innerHTML += Object.keys(oppdrag).map(navn => makeTag("option", navn, {value: navn})).join("");
    AnsattNavn.innerHTML = `Per jobber med:`;
    arbeidsListe.innerHTML = oppdrag["Per"].map(jobb => makeTag("li", jobb, {class: "jobbListeItem"})).join("");

    ansattSelect.addEventListener("change", () => {
        const valgtAnsatt = ansattSelect.value;
        const antallOppdrag = oppdrag[valgtAnsatt].length;
        AnsattNavn.innerHTML = `${valgtAnsatt} jobber med:`;
        // lager liste over alle jobbene. 
        arbeidsListe.innerHTML = oppdrag[valgtAnsatt].map(jobb => makeTag("li", jobb, {class: "jobbListeItem"})).join("");
        if(antallOppdrag > 3){
            arbeidsListe.innerHTML += makeTag("h4", "Opptatt", {class: "opptatt"});
        }
        else if(antallOppdrag === 0) arbeidsListe.innerHTML += makeTag("h4", "Ledig", {class: "ledig"});
    });

    arbeidsListe.addEventListener("click",
    /**@param {MouseEvent} e */ e => {
        // Pakker ut verdier fra HTMLElementet som ble klikket på. 
        const { className, innerHTML } = e.target;
        if(className === "jobbListeItem"){
            jobbInfo.innerHTML = `<h3>Info om ${innerHTML}</h3>`;
        }
    })
}

export default main;