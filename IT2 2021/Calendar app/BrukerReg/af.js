const $ = id => document.getElementById(id);

/**
 * @param {Object} data 
 * @param {HTMLElement} form 
 * @returns 
 */
const getUserData = async (data, form) => new Promise((resolve, reject) => {
    form.info = data;
    form.addEventListener("useraccount", e => {
        if(e.detail === "ok"){
            resolve(form.info);
            return;
        }
        else{
            reject({});
            return;
        }
    })
})
var allData = 0;

const main = async () => {
    const formA = $("formA");
    const formB = $("formB");
    const formC = $("formC");
    const brukerListe = [];

    class Bruker{
        constructor(navn, etternavn, epost, priceType, kontonummer, expires, cc){
            this.navn = navn;
            this.etternavn = etternavn;
            this.epost = epost;
            this.priceType = priceType;
            this.kontonummer = kontonummer;
            this.expires = expires;
            this.cc = cc;
        }
    }

    const Adata = {navn: "", etternavn: "", epost: ""};
    const Bdata = {priceType: ""};
    const Cdata = {kontonummer: "", expires: "", cc: ""}

    const dataA = await getUserData(Adata, formA);
    formA.classList.add("hidden");
    formB.classList.remove("hidden");
    const dataB = await getUserData(Bdata, formB);
    formB.classList.add("hidden");
    formC.classList.remove("hidden");
    if(dataB.priceType !== "free"){
        const dataC = await getUserData(Cdata, formC);
        formC.classList.add("hidden");
        const {navn, etternavn, epost} = dataA
        const {priceType} = dataB;
        const {kontonummer, expires, cc} = dataC
        const bruker = new Bruker(navn, etternavn, epost, priceType, kontonummer, expires, cc);
        brukerListe.push(bruker);
    }
    else{
        formC.classList.add("hidden");
        const {navn, etternavn, epost} = dataA
        const {priceType} = dataB;
        const bruker = new Bruker(navn, etternavn, epost, priceType);
        brukerListe.push(bruker);
    }

    console.log(brukerListe);
}