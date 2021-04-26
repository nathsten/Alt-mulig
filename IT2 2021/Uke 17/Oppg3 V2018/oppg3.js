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
 * @param {string[]} lydNavn 
 * @returns {Promise<{[string]: Audio;}>[]} liste med lyder
 */
const hentLyder = async lydNavn => new Promise((resolve, reject) => {
    try{
        resolve(lydNavn.map(mp3 => {
            return {[mp3]: new Audio(`./Vedlegg/${mp3}.mp3`)}
        }));
        return;
    }
    catch(e) { 
        reject(e); 
        return;
    }
})

/**
 * @param {string[]} bildeNavn 
 * @returns {Promise<{[string]: string;}>[]} liste med bilder
 */
 const hentBilder = async bildeNavn => new Promise(async(resolve, reject) => {
    try{
        const bildeListe = await bildeNavn.map(async jpg => {
            const getImg = await fetch(`./Vedlegg/${jpg}.jpg`);
            const imgBlob = await getImg.blob();
            const img = await URL.createObjectURL(imgBlob);
            return await img;
        });
        resolve(bildeListe);
        return;
    }
    catch(e) { 
        reject(e); 
        return;
    }
})

const setup = async () => {
    const [ spilleListe ] = $("spilleListe");
    const lydNavn = "fagott.floyte.klarinett.obo.valthorn.feil.riktig".split(".");
    const bildeNavn = lydNavn.slice(0, lydNavn.length-2);
    const lydListe = await hentLyder(lydNavn);
    const bildeListe = await hentBilder(bildeNavn);
    await bildeListe.forEach(async bilde => {
        const div = new$("div");
        div.style.backgroundImage = `url(${await bilde})`;
        div.className = "bilde";
        spilleListe.append(div);
    })
}

export default setup;