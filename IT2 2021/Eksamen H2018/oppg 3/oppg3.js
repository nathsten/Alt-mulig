import { $ } from "../../util.js";

var hytteListe = [
    {Hytte: "Granstua", Jul: "utleid", Vinterferie: "utleid", Påske: "ledig"},
    {Hytte: "Granbo", Jul: "ledig", Vinterferie: "ledig", Påske: "utleid"},
    {Hytte: "Grantoppen", Jul: "utleid", Vinterferie: "ledig", Påske: "utleid"},
    {Hytte: "Granhaug", Jul: "utleid", Vinterferie: "ledig", Påske: "utleid"},
];

const hentListe = () => {
    if(JSON.parse(localStorage.getItem("hytteListe")).length !== hytteListe.length) return;
    
    if(!localStorage.getItem("hytteListe")){
        localStorage.setItem("hytteListe", JSON.stringify(hytteListe));
        return;
    }
    hytteListe = JSON.parse(localStorage.getItem("hytteListe"));
}
hentListe();

const printTable = (table, hytteListe) => {
    table.innerHTML = "";
    hytteListe.forEach(hytte => {
        table.innerHTML += `<td class="hytteKlikk" id="${hytte.Hytte}">${hytte.Hytte}</td><td>${hytte.Jul}</td><td>${hytte.Vinterferie}</td><td>${hytte.Påske}</td>`;
    })
}

const main = () => {
    const [ tableBody, selector, bestilling ] = $("tableBody selector bestilling");
    printTable(tableBody, hytteListe);
    tableBody.addEventListener("click", e => {
        const { id, className } = e.target;
        if(className !== "hytteKlikk") return;
        const [hytte] = hytteListe.filter(e => e.Hytte === id);

        selector.innerHTML = `<label>Jul<input type="radio" ${hytte.Jul === "ledig" ? '' : 'disabled'} name="${id}" value="Jul"></label>
        <label>Vinterferie<input type="radio" ${hytte.Vinterferie === "ledig" ? '' : 'disabled'} name="${id}" value="Vinterferie"></label>
        <label>Påske<input type="radio" ${hytte.Påske === "ledig" ? '' : 'disabled'} name="${id}" value="Påske"></label>
        <button id="bestill">Bestill</button>`;
        $("bestill")[0].addEventListener("click", () => {
            const [selected] = Array.from(selector.querySelectorAll("input")).filter(e => e.checked);
            bestilling.innerHTML = `<br>Du har bestilt ${selected.name} i ${selected.value}`;
            var i;
            for(i = 0; i < hytteListe.length; i++) if(hytteListe[i].Hytte === id) break;
            hytteListe[i][selected.value] = "utleid";
            printTable(tableBody, hytteListe);
            localStorage.setItem("hytteListe", JSON.stringify(hytteListe));
            selector.innerHTML = "";
        })
    });
}

export default main;