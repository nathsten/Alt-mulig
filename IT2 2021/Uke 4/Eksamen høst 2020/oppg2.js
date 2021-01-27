/**
 * @param {string} id
 * @returns {object}
 */
const $ = id => document.getElementById(id);
/**
 * @param {string} el
 * @returns {object}
 */
const new$ = el => document.createElement(el);

const tabell = new Map();
tabell.set("kvadrat", {"type": "kvadrat", "bunnlinje": 10, "topplinje": 10, "høyde": 10, "forskying": 0, "areal": 100});
tabell.set("regktangel", {"type": "regktangel", "bunnlinje": 20, "topplinje": 20, "høyde": 5, "forskying": 0, "areal": 100})
tabell.set("parralellogram", {"type": "parralellogram", "bunnlinje": 20, "topplinje": 20, "høyde": 10, "forskying": 2, "areal": 200})
tabell.set("trapes", {"type": "trapes", "bunnlinje": 20, "topplinje": 10, "høyde": 5, "forskying": 2, "areal": 75})
tabell.set("trapes", {"type": "trapes", "bunnlinje": 5, "topplinje": 3, "høyde": 10, "forskying": 5, "areal": 40})

const lables = "type firkant,bunnlinje,topplinje,høyde,forskyvning,areal".split(",");
const keys = "type bunnlinje topplinje høyde forskying areal".split(" ")

const setup = () => {
    // Del 1
    const figList = $("figList");
    /**
     * Legger til all data fra Mapen 
     * @param {Map} tab
     */
    const tegnTabell = tab => {
        figList.innerHTML = "";
        // Legger til Labels
        lables.forEach(l => {
            const d = new$("div");
            d.innerHTML = l;
            d.className = "labels";
            figList.append(d);
        })

        // Legger til datatene
        tab.forEach(el => {
            keys.forEach(l => {
                const d = new$("div");
                d.className = "data";
                if(!Number(el[(l)]) && el[l] !== 0){
                    d.classList.add("selector")
                }
                d.innerHTML = el[String(l)];
                figList.append(d);
            });
        })
    }
    // Aktiverer funksjonen ved oppstart
    tegnTabell(tabell);

    // Del 2
    const navnInpt = $("navn");
    const bunnlinjeInpt = $("bunnlinje");
    const topplinjeInpt = $("topplinje");
    const høydeInpt = $("høyde");
    const forskyvningInpt = $("forskyvning");
    const submit = $("submit");

    const leggTilTrekant = () => {
        const navn = navnInpt.value;
        const bunnlinje = Number(bunnlinjeInpt.value);
        const topplinje = Number(topplinjeInpt.value);
        const høyde = Number(høydeInpt.value);
        const forskyvning = Number(forskyvningInpt.value);
        const areal = ((bunnlinje + topplinje)*høyde)/2;
        tabell.set(String(navn), {"type": navn, "bunnlinje": bunnlinje, "topplinje": topplinje, "høyde": høyde, "forskying": forskyvning, "areal": areal});
        tegnTabell(tabell);
    }

    submit.addEventListener("click", leggTilTrekant);


    // Del 3
    const ark = $("canvas");
    const ctx = ark.getContext("2d");

    figList.addEventListener("click", e => {
        const { target } = e;

        if(target.className.includes("selector")){
            const type = target.innerHTML;
            const data = tabell.get(type);
            console.log(data);

            const path = new Path2D(``);
        }
    })
}