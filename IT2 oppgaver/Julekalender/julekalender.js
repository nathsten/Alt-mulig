const $ = (id) => document.getElementById(id);

const kalenderDiv = $("kalenderDiv");
const days = $("days");
const inputDiv = $("inputDiv");
const inputHendelse = $("inputHendelse");
const lagre = $("lagre");
const x = $("x");
const inptLabel = $("label");

let allCalendarEvents = {

}
if(localStorage.getItem("calendarEvents")){
    allCalendarEvents = JSON.parse(localStorage.getItem("calendarEvents"));
}

const createCalendarDays = () => {
    kalenderDiv.innerHTML = "";
    for(let i=1; i<=31; i++){
        const days = document.createElement("div");
        days.className = "days";
        days.id = `days${i}`;
        days.innerHTML = `<p>Desember ${i}</p>`;
        if(allCalendarEvents[days.id]){
            days.innerHTML += `<p class="eventClass">${allCalendarEvents[days.id]}</p>`;
        }
        kalenderDiv.append(days);
    }
}

createCalendarDays();

const addDateValue = (e) => {
    inputHendelse.value = "";
    const tDiv = e.target;
    inputDisplay = true;
    inputDiv.style.display = "block";
    inptLabel.innerHTML = `Skriv inn hendelse for ${tDiv.innerHTML}: `;

    const lagreHendelse = () => {
        let hendelse = "";
        hendelse = inputHendelse.value;
        allCalendarEvents[tDiv.id] = hendelse;
        inputDiv.style.display = "none";
        localStorage.setItem("calendarEvents", JSON.stringify(allCalendarEvents));
        createCalendarDays();
    };

    lagre.addEventListener("click", lagreHendelse);
    inputHendelse.addEventListener("keydown", 
    /**
     * @param {keyCode} e
     */
    e => {
        if(e.keyCode === 13){
            lagreHendelse();
        }
    });
}

kalenderDiv.addEventListener("click", addDateValue);
x.addEventListener("click", () => {
    inputDiv.style.display = "none";
})