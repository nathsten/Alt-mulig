import { $, hentFiler } from '../../util.js';

const main = async () => {
    const [ liste, bildeDiv, lagdiv ] = $("liste bilde lag");
    const lag = "milan roma inter";
    const bilder = await hentFiler("bilde", "../Vedlegg", lag, "jpg");
    const lyder = await hentFiler("lyd", "../Vedlegg", lag, "mp3");

    liste.innerHTML = lag.split(" ").map(lag => lag.big()).join("");

    await liste.addEventListener("click", async e => {
        const { innerHTML } = e.target;
        await lyder[innerHTML].play();
        bildeDiv.style.backgroundImage = `url(${await bilder[innerHTML]})`;
        lagdiv.innerHTML = innerHTML;
    })

}

export default main;