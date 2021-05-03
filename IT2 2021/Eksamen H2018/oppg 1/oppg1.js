/**
 * @param {string} ids
 * @returns {HTMLElement[]}
 */
const $ = ids => ids.split(" ").map(id => document.getElementById(id));
/**
  * @param {string} el 
  * @returns {HTMLElement}
  */
const new$ = el => document.createElement(el);

/**
 * @param {{prisVoksne: number, prisBarn: number, avslagVoksen: number, avslagBarn: number, barn: number, voksne: number, dager: number}} bestilling Objekt med bestillinger
 * @param {HTMLElement} div
 */
const lagBestilling = (bestilling, div) => {
    const { prisVoksne, prisBarn, avslagVoksen, avslagBarn, barn, voksne, dager } = bestilling;
    const kort = new$("div");
    kort.innerHTML = `<h2>${dager} ${dager > 1 ? 'dager' : 'dag'} heiskort i alpinanlegget.</h2>
    <p>${barn || 0} barn, totalpris ${prisBarn}kr. Avslag: ${avslagBarn}kr</p>
    <p>${voksne || 0} voksne, totalpris ${prisVoksne}kr. Avslag: ${avslagVoksen}kr</p>
    <p>Totalpris ${prisBarn + prisVoksne}kr. Total avslag: ${avslagBarn + avslagVoksen}kr</p>`;
    kort.className = "heiskort";
    div.append(kort);
}

const main = () => {
    const [ ui, barnInpt, voksneInpt, dagerInpt, bestillingerDiv ] = $("ui barn voksne dager bestillinger");
    ui.addEventListener("submit",
    /** @param {MouseEvent} e */ 
    e => {
        e.preventDefault();
        const barn = barnInpt.value;
        const voksne = voksneInpt.value;
        const dager = dagerInpt.value;
        if((!barn && !voksne) || !dager){
            alert("Vennligst fyll inn minst 1 person og 1 dag");
            return;
        }
        if(dager > 7){
            alert("Du kan ikke bestille for mer enn 7 dager");
            return;
        }

        const prisVoksne = voksne*200*dager <= 1000 ? voksne*200*dager : 1000;
        const prisBarn = barn*100*dager <= 500 ? barn*100*dager : 500;

        const avslagVoksen = Math.max(voksne*200*dager-1000, 0);
        const avslagBarn = Math.max(barn*100*dager-500, 0);
        lagBestilling({prisVoksne, prisBarn, avslagVoksen, avslagBarn, barn, voksne, dager}, bestillingerDiv);
        barnInpt.value = null;
        voksneInpt.value = null;
        dagerInpt.value = null;
    })
}