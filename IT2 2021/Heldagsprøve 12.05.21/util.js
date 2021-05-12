/**
 * @param {string} ids string med id´er sepparert med " "
 * @returns {HTMLElement[]} liste av HTMLElementer
*/
const $ = ids => ids.split(" ").map(id => document.getElementById(id));
/**
 * @param {string} el tag-navent på elementet du vil lage
 * @returns {HTMLElement} 
*/
const new$ = el => document.createElement(el);

/**
 * Returnerer et promise med liste eller objekt med bilder eller lyder.
 * Bør brukes med en try - catch | .then().catch().., da den "rejecter" en eventuell error.
 * @param {string} type lyd | bilde | bildeListe
 * @param {string} dir hvilke mappe filen ligger i 
 * @param {string} filnavn navet på filen 
 * @param {string} filtype type fil, feks: mp3, jpg, osv
 * @returns {Promise} objekt | liste, med bilder | lyder => feks {hund: blob:hund.url}
*/
 const hentFiler = async (type, dir, filnavn, filtype) => new Promise(async (resolve, reject) => {
    switch(type){
        case "lyd": {
            try{
                // Objekt med filnavn som nøkkel
                const lydObj = {};
                // dytter in lyder med filnavn som nøkkel
                filnavn.split(" ").forEach(fil => lydObj[fil] = new Audio(`${dir}/${fil}.${filtype}`));
                resolve(lydObj);
            } catch(e) { reject(e) }
        }
        break;

        case "bilde": {
            try{
                // Objekt med filnavn som nøkkel
                const bildeObj = {};
                filnavn.split(" ").forEach(async fil => {
                    // henter filen lokalt ved bruk av fetch
                    const getFil = await fetch(`${dir}/${fil}.${filtype}`);
                    // parser den som blob
                    const blob = await getFil.blob();
                    // lager en lebar url for javascript
                    bildeObj[fil] = await URL.createObjectURL(blob);
                });
                // sender tilbake objektet med bilder
                resolve(bildeObj);
                // dersom noe går galt, feks feil i filnavn "rejecter" den erroren.
            } catch(e) {reject(e) }
        }
        break;

        case "bildeListe": {
            try{
                // maper over filnavn som et array og gjør det om til en liste med bilder
                const bilder = await filnavn.split(" ").map(async fil => {
                    const getFil = await fetch(`${dir}/${fil}.${filtype}`);
                    const blob = await getFil.blob();
                    // lager en lebar url for javascript
                    return await URL.createObjectURL(blob);
                });
                resolve(await bilder);
            } catch(e) {reject(e) }
        }
        break;
    }
})

/** Lager et HTMLElement for hver verdi i en array.
 * @param {any[]} arr 
 * @param {HTMLDivElement} div 
 * @param {string} tag 
 * @param {string} className 
 * @returns {void}
 */
const printArray = (arr, div, tag, className) => 
    arr.forEach(e => {
        const el = new$(tag);
        el.className = className;
        el.innerHTML = e;
        div.append(el);
    })


/**
 * @param {string} tag 
 * @param {string} text 
 * @param {{ id: string, class: string, href: string, value: string, target: string}} obj 
 * @returns {string} HTML-tag med innsendte verdier. 
 */
const makeTag = (tag, text, obj) => `<${tag} id="${obj.id ? obj.id : ''}" class="${obj.class ? obj.class : ''}" ${obj.href ? `href="${obj.href}"` : '/'} ${obj.value ? `value="${obj.value}"` : ''} ${obj.target ? `value="${obj.target}"` : ''}>${text}</${tag}>`;

/**
 * @param {number} num 
 * @returns {string} gjør tall til string
 */
const _S = num => num.toString();

/**
 * @param {number} num 
 * @returns {boolean} sjekker om tallet er en integer (helt tall).
 */
const isInt = num => Number.isInteger(+num);

export { $, new$, hentFiler, printArray, makeTag, _S, isInt };