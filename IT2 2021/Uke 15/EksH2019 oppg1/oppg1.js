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
 * animerer inn text samtidig som den spiller av lyden 
 * @param {HTMLElement} div 
 * @param {HTMLElement} main 
 * @param {string} text 
 * @param {Audio} sound 
 */
const animate = (div, main, text, sound) =>  {
    div.addEventListener("click",
    // @ts-ignore
    /** @param {MouseEvent} e */ 
    e => {
        const { clientX, clientY } = e;
        const [ id ] = $(text);
        const aniText = new$("p");
        aniText.innerHTML = text;
        aniText.className = "aniText";
        aniText.id = text.split(" ")[0];;
        aniText.style.left = `${clientX}px`;
        aniText.style.top = `${clientY-20}px`;
        aniText.classList.add("aniIn");
        setTimeout(() => {           
            // @ts-ignore
            sound.play();
        }, 400);
        try{main.removeChild(id)}catch{};
        main.append(aniText);
        // Hvis noe feiler. Feks hvis lydfilen ikke virker. 
    })
}

const main = async () => {
    // Bruker utpakking av array til å lage koblinger til DOM raskere. 
    const [ main, imgEl, armstrekkeren, DBR, srcArm, srcDBR ] = $("main img armstrekkeren DBR srcArm srcDBR")

    // Henter bilde fra API, gjør det om til et objekt URl som er lesbar for css. 
    const getImg = await fetch('https://api.ndla.no/image-api/raw/BM_muskel_bak_sy054fdd.gif');
    const img = await getImg.blob();
    imgEl.style.backgroundImage = `url(${URL.createObjectURL(img)})`;

    // @ts-ignore 
    animate(armstrekkeren, main, "Armstrekkeren", srcArm);
    // @ts-ignore
    animate(DBR, main, "Den brede ryggmuskelen", srcDBR);
}