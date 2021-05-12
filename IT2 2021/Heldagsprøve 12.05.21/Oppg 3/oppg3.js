import { $, new$, makeTag } from '../util.js';
import { leggTilAnsatt, leggTilArbeid, fordelArbeid, merkArbeid } from './templates.js';

const ansatte = "Per Anna Ola Kari Jens Lise".split(" ");
const alleArbeid = "Gui design,Login/out,Chat,Testing,RenderingEffects,Collision,Pathfinding,Assets".split(",");

var arbeidsStruktur = [];

const ansatteMedArbeid = {};

/**
 * @param {{navn: string, arbeid: string, antGroup: number, gjortAv: string}[]} stuct 
 * @param {HTMLElement} div 
 */
const printArbeidsSrtuktur = (stuct, div) => {
    div.innerHTML = `<div class="liste">
    <span>Navn</span>
    <span>Arbeid</span>
    <span>Antall på gruppen</span>
    <span>Fullført av</span>
</div>`;
    for(const obj of stuct){
        const { navn, arbeid, antGroup, gjortAv } = obj;
        const el = new$("div");
        el.innerHTML = `<span class="navnInfo">${navn}</span>
        <span class="arbeidInfo">${arbeid}</span>
        <span>${antGroup}</span>
        <span>${gjortAv || "ikke ferdig"}</span>`;
        el.className = "liste";
        if(gjortAv) el.classList.add("ferdig")
        div.append(el);
    }
}

const main = () => {
    /** Funksjonen er nødt for å ligge inne i main, ettersom jeg trenger koblingene til DOM. 
     * Funskjonen er litt spagettikode og preget av callback-hell, 
        men dette var den raskeste måten å gjøre det på 
        uten å bruke for mye tid på å lage Promise funksjoner. 
     * @param {MouseEvent} e 
        @returns {void}
     */
    const utførFunksjon = e => {
        // Pakker ut id fra knappen du trykket på.
        const { id } = e.target;
        switch(id){
            // Registrer ansatt med arbeid
            case "rama":{
                funkDiv.innerHTML = fordelArbeid;
                const [ ansatteSel, arbeidSel ] = $("ansatt arbeid");
                // Lager option tags for alle ansatte og alle jobber som finnes. 
                ansatteSel.innerHTML = ansatte.map(e => makeTag("option", e, {value: e}));
                arbeidSel.innerHTML = alleArbeid.map(e => makeTag("option", e, {value: e}));

                funkDiv.querySelectorAll("form")[0].addEventListener("submit", e => {
                    // slik at siden ikke oppdateres. 
                    e.preventDefault();
                    // Pakker ut inputene fra form. 
                    const [ansattInpt, arbeidInpt] = $("ansatt arbeid");
                    // Hvor mange andre som jobber på samme prosjekt
                    const finnesKollega = arbeidsStruktur.filter(e => e.arbeid === arbeidInpt.value).length;
                    // Laget er objekt med data som beskriver arbeidsfordelingen. 
                    const obj = {navn: ansattInpt.value, arbeid: arbeidInpt.value, antGroup: 1, gjortAv: ""};
                    // dersom det det er andre som jobber på samme prosjekt skal det legges til.
                    if(finnesKollega >= 1) {
                        obj.antGroup += finnesKollega;
                        // Oppdaterer hvor mange per prosjekt hos de andre. 
                        arbeidsStruktur = arbeidsStruktur.map(e => e.arbeid === arbeidInpt.value ? {navn: e.navn, arbeid: e.arbeid, antGroup: obj.antGroup, gjortAv: e.gjortAv} : e);
                    }
                    // Legger til i arbeidsStruktur arrayen
                    arbeidsStruktur.push(obj);

                    // Sjekker om ansatte er lagt til i objektet
                    if(ansatteMedArbeid[ansattInpt.value]){
                        // hvis ja, legger til arbeidet for den ansatte. 
                        ansatteMedArbeid[ansattInpt.value].push(arbeidInpt.value);
                    }
                    else{
                        // Hvis nei, lager en array med arbeidet til den ansatte. 
                        ansatteMedArbeid[ansattInpt.value] = [arbeidInpt.value];
                    }
                    // Printer den oppdaterte arbeidsstrukturen på skjermen. 
                    printArbeidsSrtuktur(arbeidsStruktur, arbeidsliste)
                    clearInfo();
                });
            }
            break;
    
            // Legg til ansatt
            case "ltan":{
                funkDiv.innerHTML = leggTilAnsatt;
                funkDiv.querySelectorAll("form")[0].addEventListener("submit", e => {
                    e.preventDefault();
                    // Legger til ny ansatt i ansatte arrayen. 
                    const [ ansatteInpt ] = funkDiv.querySelectorAll("#ansatt");
                    ansatte.push(ansatteInpt.value);
                    funkDiv.innerHTML = `${ansatteInpt.value} er lagt til`;
                    clearInfo();
                })

            }
            break;
    
            // Legg til arbeid
            case "ltar":{
                funkDiv.innerHTML = leggTilArbeid;
                funkDiv.querySelectorAll("form")[0].addEventListener("submit", e => {
                    e.preventDefault();
                    // Legge til arbeidet du skrev inn i alleArbeid arrayen. 
                    const [ arbeidInpt ] = funkDiv.querySelectorAll("#arbeid");
                    alleArbeid.push(arbeidInpt.value);
                    funkDiv.innerHTML = `${arbeidInpt.value} er lagt til`;
                    clearInfo();
                })
            }
            break;
    
            // Merk arbeid som ferdig  
            case "masf":{
                funkDiv.innerHTML = merkArbeid;
                const [ ansatteSel, arbeidSel ] = $("ansatt arbeid");
                // Lager option tags som viser de som har jobb.
                ansatteSel.innerHTML = arbeidsStruktur.map(e => makeTag("option", e.navn, {value: e.navn}));
                // Viser jobbene til første i listen
                arbeidSel.innerHTML = ansatteMedArbeid[arbeidsStruktur[0].navn].map(e => makeTag("option", e, {value: e})).join("");
                ansatteSel.addEventListener("change", () => {
                    const navn = ansatteSel.value;
                    // Viser jobbene til valgt person. 
                    arbeidSel.innerHTML = ansatteMedArbeid[navn].map(e => makeTag("option", e, {value: e})).join("");

                    // Venter på at du klikker "merk som ferdig"
                    funkDiv.querySelectorAll("form")[0].addEventListener("submit", 
                    /**@param {MouseEvent} e*/ e => {
                        e.preventDefault()
                        const ferdigArbeid = arbeidSel.value;
                        // Endrer hvem som har gjort ferdig spesifikt arbeid hos alle som er med på jobben. 
                        arbeidsStruktur = arbeidsStruktur.map(e => e.arbeid === ferdigArbeid ? {navn: e.navn, arbeid: e.arbeid, antGroup: e.antGroup, gjortAv: navn} : e);
                        // Fjerner jobben som er gjort hos den som har gjort jobben
                        ansatteMedArbeid[navn] = ansatteMedArbeid[navn].filter(e => e !== ferdigArbeid);
                        printArbeidsSrtuktur(arbeidsStruktur, arbeidsliste);

                        // Fjerner arbeidet fra andre medarbeidere som jobber på samme sak. 
                        Object.keys(ansatteMedArbeid).forEach(ansatt => {
                            if(ansatteMedArbeid[ansatt].includes(ferdigArbeid)){
                                ansatteMedArbeid[ansatt] = ansatteMedArbeid[ansatt].filter(e => e !== ferdigArbeid);
                            }
                        })
                        // Bekrefter hva som er gjort. 
                        funkDiv.innerHTML = `${ferdigArbeid} er gjort av ${navn}`;
                        clearInfo();
                    })
                })
            }
            break;
        }
    }
    const [ funksjonsListe, arbeidsliste, funkDiv, infoHeader, infoList ] = $("funksjonsListe arbeidsliste funkDiv infoHeader infoList");

    // Legger til eventistener på alle knappene.
    funksjonsListe.querySelectorAll("button").forEach(node => node.addEventListener("click", utførFunksjon));

    arbeidsliste.addEventListener("click", e => {
        const { className, innerHTML } = e.target;

        // Oppdaterer infoboksen
        if(className === "navnInfo"){
            infoHeader.innerHTML = `${innerHTML} jobber med:`;
            infoList.innerHTML = ansatteMedArbeid[innerHTML].map(e => makeTag("li", e, {}));
        }
        if(className === "arbeidInfo"){
            infoHeader.innerHTML = `${innerHTML} gjøres av:`;
            infoList.innerHTML = arbeidsStruktur.map(e => e.arbeid === innerHTML ? makeTag("li", e.navn, {}) : '').join("");
        }
    })

    const clearInfo = () => {
        infoHeader.innerHTML = "";
        infoList.innerHTML = "";
    }
}

export default main;