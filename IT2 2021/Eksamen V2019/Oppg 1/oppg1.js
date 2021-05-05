import { $, new$ } from '../../util.js';

/**
 * @param {HTMLElement} div 
 * @param {string} dir 
 */
const lagBildeListe = async (div, dir) => {
    const getBilde = await fetch(dir);
    const bildeBlob = await getBilde.blob();
    const bilde = await URL.createObjectURL(bildeBlob);

    for(let i = 0; i < 3; i++){
        const bdiv = new$("div");
        bdiv.className = "bilde";
        bdiv.id = i.toString();
        bdiv.style.backgroundPositionY = `-${150*i}px`;
        bdiv.style.backgroundImage = `url(${bilde})`;
        div.append(bdiv);
    }
}

const info = "jpg fotografi,png fotografi|klippet,png animert".split(",").map(e => e.split(" ").map(e => e.replace("|", " ")));
const filformat = {
    png: "den er gjennomsiktig bakgrunn og kan brukes som lag",
    jpg: "den er av høy kvalitet, men ikke gjennomsiktig, de fleste bilder er i dette filformatet eller jpeg"
}

const main = async () => {
    const [ bildeListe, infoDiv ] = $("bildeListe infoDiv");
    await lagBildeListe(bildeListe, "../Vedlegg/fjell.jpg");
    bildeListe.addEventListener("click", e => {
        const { id } = e.target;
        const [fil, type] = info[+id];
        const filInfo = filformat[fil];
        infoDiv.innerHTML = `Filtype: .${fil} fordi ${filInfo}. <br> Grafikk: ${type}`;
    })
}

export default main;