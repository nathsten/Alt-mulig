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

/**
 * @param {Promise<{[string]: string;}>[]} liste med bilder
 * @param {HTMLElement} divB
 */
const printBilder = (bildeListe, divB) => {
    divB.innerHTML = "";
    bildeListe.forEach(async (bilde, i) => {
        const div = new$("div");
        div.style.backgroundImage = `url(${await bilde})`;
        div.className = "bilde";
        div.id = i;
        divB.append(div);
    })
}

const velgInstrument = l => Math.floor(Math.random()*l.length);

const setup = async () => {
    const [ spilleListe, start, spillAvIgjen, p ] = $("spilleListe start sa p");
    const lydNavn = "fagott.floyte.klarinett.obo.valthorn.feil.riktig".split(".");
    const bildeNavn = lydNavn.slice(0, lydNavn.length-2);
    var lydListe = await hentLyder(lydNavn);
    var bildeListe = await hentBilder(bildeNavn);
    const instrumentListe = await lydListe.map(e => Object.keys(e).join("")).slice(0, 5);
    printBilder(bildeListe, spilleListe);
    var poeng = 0;
    const sai = (i) => lydListe[i][instrumentListe[i]].play()
    
    // idk funka dårlig. 
    start.addEventListener("click", () => {
        start.style.display = "none";
        const spill = () => {
            const i = velgInstrument(bildeListe);
            lydListe[i][instrumentListe[i]].play();
            const check = e => {
                const { id } = e.target;
                if(+id === i){
                    poeng += 100;
                    lydListe[i][instrumentListe[i]].pause();
                    bildeListe = bildeListe.filter((e, ix) => ix !== i);
                    lydListe = lydListe.filter((e, ix) => ix !== i);
                    printBilder(bildeListe, spilleListe);
                    spillAvIgjen.removeEventListener("click", sai);
                    spilleListe.removeEventListener("click", check);
                    spill();
                }
                else poeng -= 50;
                p.innerHTML = `Poeng: ${poeng}`;
            }
            spillAvIgjen.addEventListener("click", () => sai(i));
            spilleListe.addEventListener("click", check)
        }
        spill();
    })
}

export default setup;