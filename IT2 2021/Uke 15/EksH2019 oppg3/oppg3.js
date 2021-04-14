/**
 * @param {string} ids
 * @returns {HTMLElement[]}
 */
const $ = ids => ids.split(" ").map(id => document.getElementById(id));

const muskelGrupper = {
    Armer: ["Bicepscurl med stang", "Fransk press"],
    Skuldre: ["Stående militærpress", "Sidehev"],
    Ben: ["Knebøy", "Leg extension", "Leg curl"],
    Rygg: ["Nedtrekk", "Roing"],
    Bryst: ["Benkpress", "Flies", "Push up"]
};

/**
 * @param {string} msg melding til overskrift
 * @param {HTMLElement} hd header elementet
 * @param {HTMLElement} vd valg-diven
 * @param {string[]} vl liste over verdier som kan velges
 * @returns {Promise<string> | Error} valgte verdi, eventuelt error
 */
const valg = (msg, hd, vd, vl) => new Promise((resolve, reject) => {
    try{
        vd.innerHTML = vl.map(v => `<label>${v} <input type="radio" class="aktivitet" value="${v}" name="aktivitet"></label><br>`).join("");
        hd.innerHTML = msg;
        vd.addEventListener("change", () => {
            const sel = Array.from(vd.querySelectorAll(".aktivitet")).filter(e => e.checked)[0].value;
            resolve(sel);
        })
    }
    catch(e) { reject(e); }
})

const main = async () => {
    const [ header, valgliste ] = $("header valgliste");
    try{
        const muskelGruppe = await valg("Velg en muskelgruppe", header, valgliste, Object.keys(muskelGrupper));
        const aktivitet = await valg(`Velg en av aktivitetene for ${muskelGruppe}`, header, valgliste, muskelGrupper[muskelGruppe]);
        header.innerHTML = `Du valgte muskelgruppe ${muskelGruppe} og aktivitet ${aktivitet}`;
        valgliste.innerHTML = "";
    }
    catch(e){
        header.innerHTML = "Noe gikk galt...";
        console.log(e);
    }
}