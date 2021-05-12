import { hentFiler } from '../util.js';

/**
 * @param {HTMLElement[]} arr lisen med HTML elementer
 * @param {string} cn klassenavnet som skal legges til.
 * @param {*} bool om i skal være med i klassen.
 * @returns {void} 
 */
const addClasses = (arr, cn, bool) => {
    // Hopper over annen hver ettersom den inneholder en index for text 
    // og en for <h1></h1>
    for(let i = 1; i < arr.length; i+=2){
        arr[i].classList.add(`${cn}${bool ? i : ''}`);
    }
}

const main = async () => {
    const { zonk } = await hentFiler("lyd", "../vedlegg", "zonk", "mp3");
    const mainDiv = document.getElementById("main");
    // siden getElementsByTagName returnerer en nodeList, plukker jeg ut den første verdien.
    const [ body ] = document.getElementsByTagName("body");
    /** window.onload løser problemet med at lyd ikke kan spilles før bruker har
    trykket på noe.
    MEN av og til så feiler den og må løses med et klikk på skjermen også oppdatere siden,
    dette blir ikke særlig brukervennlig.
    
    En løsning som er enda sikrere er å lage ha en eventlisner på "click", 
    og derretter starter funskjonen nedenfor. */
    
    window.addEventListener("click", () => {
        mainDiv.classList.remove("hidden");
        const headers = Array.from(mainDiv.childNodes);

        addClasses(headers, "animasjon", true);
        let plays = 0;

        /**Intervallet legger opp til at det er 1300ms mellom hver landing
        grunnen til dette er at dersom det bare er 300ms mellom hver, blir det 
        for kort tid til at lyden kan spilles av for hver landing */
        setTimeout(() => {   
            // venter 2000ms før første avspilling starter       
            zonk.play();
            plays++;
            let player = setInterval(() => {
                zonk.play();
                plays++;
                if(plays >= 3){
                    // Når alle tre har landet stopper den å spille av.
                    clearInterval(player);

                    // Legger til blink klassen
                    addClasses(headers, "blink", false);

                    // venter 700ms før body blir blå.
                    setTimeout(() => {
                        body.style.backgroundColor = "lightblue";
                    }, 700);
                    };
            }, 1300);
        }, 2000);
    })
}

export default main;