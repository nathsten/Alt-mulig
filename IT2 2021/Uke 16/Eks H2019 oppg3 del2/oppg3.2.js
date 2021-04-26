// @ts-check
/**
 * @param {string} ids
 * @returns {HTMLElement[]}
 */
 const $ = ids => ids.split(" ").map(id => document.getElementById(id));

/**
 * 
 * @param {Object[]} arr 
 * @param {HTMLElement} tableBody 
 * @param {HTMLElement} res 
 */
const lagTabell = (arr, tableBody, res) => {
    tableBody.innerHTML = "";
    var Treningsvolum = 0;
    arr.forEach(nySett => {
        var tbdy = "";
        const [s, r, m] = nySett;
        Treningsvolum += s*r*m;
        nySett.forEach(e => {
            tbdy += `<td>${e}</td>`;
        });
        tableBody.innerHTML += `<tr>${tbdy}</tr>`;
    })
    res.innerHTML = `Resultat: Treningsvolum: ${Treningsvolum}kg`
}

const main = () => {
    const alleSett = [];
    const [ form, Sett, Repitisjoner, Motstand, tableBody, res ] = $("form Sett Repitisjoner Motstand tableBody res");

    form.addEventListener("submit",
    // @ts-ignore
    /** @param {MouseEvent} e */ e => {
        e.preventDefault();
        // @ts-ignore
        const nySett = [ Sett.value, Repitisjoner.value, Motstand.value ];
        const lag = nySett.filter(e => e);
        if(lag.length === 3){
            alleSett.push(nySett);
            lagTabell(alleSett, tableBody, res);
        }
        else{
            alert("Du må fylle ut alle inputene først!");
        }
    });

}