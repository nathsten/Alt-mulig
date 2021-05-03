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

const hytteInfo = {
    granbo: {
        Sengeplasser: 6, 
        Standard: "middels", 
        Badstue: "nei",
        Ukepris: 15000,
    },
    granstua: {
        Sengeplasser: 4, 
        Standard: "høy", 
        Badstue: "ja",
        Ukepris: 12000,
    }
}

const hentBilder = async hytte => {
    const bilder = [];
    for(let i = 0; i < 4; i++){
        const getBilde = await fetch(`../Vedlegg/${hytte}0${i}.jpg`);
        const bilde = await getBilde.blob();
        const url = await URL.createObjectURL(bilde);
        bilder.push(url);
    }
    return await bilder.map(url => `<div class="galleriBilder" id="${url}" style="background-image: url(${url})"></div>`).join("");
}

const main = () => {
    const [ velgHytte, hytte, info, galleri, back ] = $("velgHytte hytte info galleri back");
    velgHytte.addEventListener("click", async e => {
        const { id } = e.target;
        hytte.innerHTML = id;
        info.innerHTML = Object.keys(hytteInfo[id]).map(e => `<span>${e}: <br> ${hytteInfo[id][e]}</span>`).join("");
        galleri.innerHTML = await hentBilder(id);
    });
    galleri.addEventListener("click", e => {
        const { id } = e.target;
        if(!id || id === "galleri") return;
        velgHytte.style.backgroundImage = `url(${id})`;
        back.style.display = "block";
    });
    back.addEventListener("click", () => {
        velgHytte.style.backgroundImage = `url("../Vedlegg/menybilde.jpg")`;
        back.style.display = "none";
    })
}