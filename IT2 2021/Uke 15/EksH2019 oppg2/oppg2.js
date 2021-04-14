/**
 * @param {string} ids
 * @returns {HTMLElement[]}
 */
 const $ = ids => ids.split(" ").map(id => document.getElementById(id));

const aktiviteter = [
    {aktivitet: "Velg Aktivitet", kcal: 0, active: false},
    {aktivitet: "Aerobics", kcal: 814, active: true},
    {aktivitet: "Bordtennis", kcal: 236, active: true},
    {aktivitet: "Fotball", kcal: 510, active: true},
    {aktivitet: "Golf", kcal: 244, active: true},
    {aktivitet: "Jogging", kcal: 666, active: true}
];

const [ AktivitetListe, intensivitetListe, varighet, beregn, svar ] = $("AktivitetListe intensivitet varighet beregn svar");

AktivitetListe.innerHTML += aktiviteter.map(act => `<option ${act.active ? '' : 'disabled'} id="${act.kcal}">${act.aktivitet}</option>`).join("");

beregn.addEventListener("click", () => {
    const aktivitet = aktiviteter.filter(e => e.aktivitet === AktivitetListe.value)[0];
    const intensivitet = Array.from(intensivitetListe.querySelectorAll(".intensivitet")).filter(e => e.checked)[0];
    const tid = varighet.value;
    if(!intensivitet || !tid){
        alert("Du må velge alle alternativene!"); 
        return; 
    }
    const kcal = ((aktivitet.kcal*(+intensivitet.id))/60 * tid).toFixed(1);
    svar.innerHTML = `Du valgte ${aktivitet.aktivitet} på ${intensivitet.value}${intensivitet.value !== "Middels" ? 't' : ''} nivå. <br> Aktiviteen skal vare i ${tid} minutter.<br>Total kaloriforbruk er: ${kcal}kcal.`;
})