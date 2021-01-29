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

const tabell = new Set();
tabell.add({"type": "kvadrat", "bunnlinje": 10, "topplinje": 10, "høyde": 10, "forskyvning": 0, "areal": 100, id: 1});
tabell.add({"type": "regktangel", "bunnlinje": 20, "topplinje": 20, "høyde": 5, "forskyvning": 0, "areal": 100, id: 2});
tabell.add({"type": "parralellogram", "bunnlinje": 20, "topplinje": 20, "høyde": 10, "forskyvning": 2, "areal": 200, id: 3});
tabell.add({"type": "trapes", "bunnlinje": 20, "topplinje": 10, "høyde": 5, "forskyvning": 2, "areal": 75, id: 4});
tabell.add({"type": "trapes", "bunnlinje": 5, "topplinje": 3, "høyde": 10, "forskyvning": 5, "areal": 40, id: 5});

if(localStorage.getItem("tabell")){
    const saved = JSON.parse(localStorage.getItem("tabell"));
    tabell.clear()
    saved.forEach(el => {
        tabell.add(el);
    });
}
let saveTabell = Array.from(tabell);

const lables = "type firkant,bunnlinje,topplinje,høyde,forskyvning,areal".split(",");
const keys = "type bunnlinje topplinje høyde forskyvning areal".split(" ");

/**
 * @param {{ bunnlinje: number; topplinje: number; høyde: number; forskyvning: number; }} data
 */
const finnNavn = data => {
    const { bunnlinje, topplinje, høyde, forskyvning } = data;

    if(bunnlinje === topplinje && ((bunnlinje&&topplinje) === høyde) && forskyvning === 0){
        return "kvadrat";
    }
    else if(bunnlinje === topplinje && forskyvning === 0){
        return "rektangel";
    }
    else if(bunnlinje === topplinje && forskyvning !== 0){
        return "parallellogram";
    }
    else{
        return "trapes";
    }
}

const setup = () => {
    // Del 1
    const figList = $("figList");
    /**
     * Legger til all data fra Setet
     * @param {Set} tab
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
                    d.classList.add("selector");
                    d.id = el.id;
                }
                d.innerHTML = el[String(l)];
                figList.append(d);
            });
        })
    }
    // Aktiverer funksjonen ved oppstart
    tegnTabell(tabell);

    // Del 2
    const bunnlinjeInpt = $("bunnlinje");
    const topplinjeInpt = $("topplinje");
    const høydeInpt = $("høyde");
    const forskyvningInpt = $("forskyvning");
    const submit = $("submit");
    const gui = $("gui");

    const leggTilTrekant = () => {
        if(!redigerer){
            const bunnlinje = Number(bunnlinjeInpt.value);
            const topplinje = Number(topplinjeInpt.value);
            const høyde = Number(høydeInpt.value);
            const forskyvning = Number(forskyvningInpt.value);
            const areal = ((bunnlinje + topplinje)*høyde)/2;
            const data = { bunnlinje, topplinje, høyde, forskyvning }
            const navn = finnNavn(data);

            const id = tabell.size +1;
            tabell.add({"type": navn, "bunnlinje": bunnlinje, "topplinje": topplinje, "høyde": høyde, "forskyvning": forskyvning, "areal": areal, id: id});
            saveTabell = Array.from(tabell);
            localStorage.setItem("tabell", JSON.stringify(saveTabell));
            tegnTabell(tabell);
            bunnlinjeInpt.value = "";
            topplinjeInpt.value = "";
            høydeInpt.value = "";
            forskyvningInpt.value = "";
        }
    }

    submit.addEventListener("click", leggTilTrekant);
    gui.addEventListener("keydown", e => {
        const { key, keyCode } = e;
        if(key === "Enter" || keyCode === 13){
            leggTilTrekant();
        }
    })

    // Del 3
    let redigerer = false;
    let sletter = false;

    const ark = $("canvas");
    const ctx = ark.getContext("2d");
    const newLengths = $("newLengths");

    figList.addEventListener("click", e => {
        const { target } = e;

        if(target.className.includes("selector") && !redigerer && !sletter){
            const type = Number(target.id);
            let data;
            tabell.forEach(el => type === el.id ? data = el:0);
            ctx.clearRect(0, 0, 1100, 800);
            ctx.beginPath();
            let path;
            if(!data.forskyvning){
                path = new Path2D(`M 50 750 L ${data.bunnlinje*50+50} ${750} 
                L ${data.bunnlinje*50+50} ${750 - data.høyde*50} 
                L ${(data.bunnlinje*50) - (data.topplinje*50) + 50} ${750 - data.høyde*50} L 50 750`);
                ctx.stroke(path);
            }
            else{
                let cp = (data.bunnlinje*50+50) + (data.forskyvning*50/2);
                path = new Path2D(`M 50 750 L ${data.bunnlinje*50+50} 750 
                L ${(data.bunnlinje*50+50) + (data.forskyvning*50/2)} ${750 - data.høyde*50} 
                L ${cp - data.topplinje*50} ${750 - data.høyde*50} L 50 750`);
                ctx.stroke(path);
            }
        }
        else if(redigerer){
            const type = Number(target.id);
            let data;
            tabell.forEach(el => type === el.id ? data = el:0);
            newLengths.innerHTML = `Skriv inn nye lengder for ${data.type}`;
            submit.innerHTML = "Endre";
            submit.addEventListener("click", () => {
                const bunnlinje = Number(bunnlinjeInpt.value);
                const topplinje = Number(topplinjeInpt.value);
                const høyde = Number(høydeInpt.value);
                const forskyvning = Number(forskyvningInpt.value);
                const areal = ((bunnlinje + topplinje)*høyde)/2;
                const nyData = { bunnlinje, topplinje, høyde, forskyvning }
                const navn = finnNavn(nyData);

                const arrTab = Array.from(tabell);
                const id = tabell.size;
                arrTab[arrTab.indexOf(data)] = {"type": navn, "bunnlinje": bunnlinje, "topplinje": topplinje, "høyde": høyde, "forskyvning": forskyvning, "areal": areal, id: id};
                tegnTabell(arrTab);
                tabell.clear();
                arrTab.forEach(el => tabell.add(el));
                saveTabell = Array.from(tabell);
                localStorage.setItem("tabell", JSON.stringify(saveTabell));
                redigerer = false;
                newLengths.innerHTML = "";
                submit.innerHTML = "Legg til firkant";
                bunnlinjeInpt.value = "";
                topplinjeInpt.value = "";
                høydeInpt.value = "";
                forskyvningInpt.value = "";
            })
        }
        else if(sletter){
            const figurId = Number(target.id);
            tabell.forEach(el => {
                if(el.id === figurId){
                    tabell.delete((el));
                }
            });
            saveTabell = Array.from(tabell);
            localStorage.setItem("tabell", JSON.stringify(saveTabell));
            tegnTabell(tabell);
            sletter = false;
            ctx.clearRect(0, 0, 1100, 800);
        }
    })

    const edit = $("edit");
    const slett = $("slett");

    slett.addEventListener("click", () => {
        sletter = true;
        const selectors = document.querySelectorAll(".selector");
        selectors.forEach(s => s.classList.remove("sletter"));
        selectors.forEach(s => void s.offsetWidth);
        selectors.forEach(s => s.classList.add("sletter"));
    });
    edit.addEventListener("click", () => {
        redigerer = true;
        const selectors = document.querySelectorAll(".selector");
        selectors.forEach(s => s.classList.remove("redigerer"));
        selectors.forEach(s => void s.offsetWidth);
        selectors.forEach(s => s.classList.add("redigerer"));
    })
}