const $ = id => document.getElementById(id);

const setup = () => {
    const skjema = $("skjema");
    const Tbody = $("Tbody");

    class Bruker{
        constructor(navn, etternavn, brukernavn){
            this.navn = navn;
            this.etternavn = etternavn;
            this.brukernavn = brukernavn;
        }
    }

    function upDateUsers(){
        const brukerListe = JSON.parse(localStorage.getItem("brukerListe"));
        Tbody.innerHTML = "";
        brukerListe.forEach(e => {
            const {navn, etternavn, brukernavn} = e;
            const tr = `<tr>
            <td>${navn}</td>
            <td>${etternavn}</td>
            <td>${brukernavn}</td>
          </tr>`;
          Tbody.innerHTML += tr;
        })
    }
    upDateUsers();

    skjema.info = new Bruker("", "", "");

    skjema.addEventListener("useraccount", e => {
        if(e.detail === "ok"){
            const { navn, etternavn, brukernavn } = skjema.info;
            if(navn){
                const brukerListe = JSON.parse(localStorage.getItem("brukerListe"));
                brukerListe.push({navn, etternavn, brukernavn})
                localStorage.setItem("brukerListe", JSON.stringify(brukerListe));
                upDateUsers();
            }
        }
    })
}