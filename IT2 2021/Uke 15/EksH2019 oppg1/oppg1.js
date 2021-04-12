// @ts-check
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
 * Setter eventlistener på diven som blir sendt inn og
 * returnerer en ferdig laget html parragraf med animasjon slik at 
 * det er bare å legge den rett til i #main-diven.
 * Dette hindrer også at teksten animeres inn flere ganger, men lyden spilles
 * fortsatt av når du klikker på den. 
 * @param {HTMLElement} div 
 * @param {string} text 
 * @param {Audio} sound 
 */
const animate = async (div, text, sound) => new Promise((resolve, reject) => {
    div.addEventListener("click",
    // @ts-ignore
    /** @param {MouseEvent} e */ 
    e => {
        try{
            const { clientX, clientY } = e;
            const aniText = new$("p");
            aniText.innerHTML = text;
            aniText.className = "aniText";
            aniText.style.left = `${clientX}px`;
            aniText.style.top = `${clientY-20}px`;
            aniText.classList.add("aniIn");
            // @ts-ignore
            sound.play();
            resolve(aniText);
        }
        // Hvis noe feiler. Feks hvis lydfilen ikke virker. 
        catch(e) { reject(e); }
    })
})

const main = async () => {
    // Bruker utpakking av array til å lage koblinger til DOM raskere. 
    const [ main, imgEl, armstrekkeren, DBR, srcArm, srcDBR ] = $("main img armstrekkeren DBR srcArm srcDBR")

    // Henter bilde fra API, gjør det om til et objekt URl som er lesbar for css. 
    const getImg = await fetch('https://api.ndla.no/image-api/raw/BM_muskel_bak_sy054fdd.gif');
    const img = await getImg.blob();
    imgEl.style.backgroundImage = `url(${URL.createObjectURL(img)})`;

    // @ts-ignore 
    const pAs = await animate(armstrekkeren, "Armstrekkeren", srcArm);
    main.append(pAs);
    // @ts-ignore
    const pDBR =  await animate(DBR, "Den brede ryggmuskelen", srcDBR);
    main.append(pDBR);
}