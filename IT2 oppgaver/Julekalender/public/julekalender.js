/**
 * @param {string} id
 * @returns {object}
 */
const $ = (id) => document.getElementById(id);

const kalenderDiv = $("kalenderDiv");
const header = $("header");
const days = $("days");
const inputDiv = $("inputDiv");
const inptLabel = $("label");
const removeEventBtn = $("removeEvent");
let removeEventBtnPressed = false;

const getAllEvents = async () => {
    try{
        const getAllEvents = await fetch('/allEvents');
        const allEvents = await getAllEvents.json();

        kalenderDiv.innerHTML = "";
        kalenderDiv.innerHTML = "<div></div>";
        for(let i=1; i<=31; i++){
            const days = document.createElement("div");
            days.className = "days";
            days.id = `day${i}`;
            days.innerHTML = `<div>Desember ${i}</div>`;
            if(allEvents[days.id]){
                days.innerHTML += `<div class="eventClass">${allEvents[days.id]}</div>`;
            }
            kalenderDiv.append(days);
        }
    }catch(e){
        console.log(`Dette funket ikke... ${e}`);
    }
}

getAllEvents();

/**
 * @param {{ target: any; }} e
 */
const addDateValue = (e) => {
    const tDiv = e.target;
    if(tDiv.className === "days"){
        if(removeEventBtnPressed === false){
            const inputHendelse = $("inputHendelse");
            const lagre = $("lagre");
            const x = $("x");
            inputDiv.style.display = "block";
            inputHendelse.focus();
            inptLabel.innerHTML = `Skriv inn hendelse for ${tDiv.innerHTML}`;
            inputHendelse.value = "";
            const lagreHendelse = () => {
                const hendelse = inputHendelse.value;
                const DivID = tDiv.id;
                fetch(`/dateID/${DivID}/eventValue/${String(hendelse)}`).then(getAllEvents);

                inputDiv.style.display = "none";
            };

            lagre.addEventListener("click", lagreHendelse);
            inputHendelse.addEventListener("keydown", 
            /**
             * @param {{ keyCode: number; }} e
             */
            e => {
                if(e.keyCode === 13){
                    lagreHendelse();
                }
            });

            x.addEventListener("click", () => {
                inputDiv.style.display = "none";
            });
        }
    }
    if(removeEventBtnPressed === true){
        if(tDiv.className === "days" || tDiv.className === "eventClass"){
            let sendID = tDiv.id;
            if(tDiv.className === "eventClass"){
                sendID = tDiv.parentElement.id;
            }
            fetch(`/deleteItem/${sendID}`)
                .then(header.innerHTML = "Julekalender")
                .then(removeEventBtn.innerHTML = `<div>Slett hendelse</div>`)
                .then(removeEventBtnPressed = false)
                .then(getAllEvents);
        }
    }
}

kalenderDiv.addEventListener("click", addDateValue);

removeEventBtn.addEventListener("click", () => {
    if(removeEventBtnPressed !== true){
        header.innerHTML = "Trykk på datoen du vil slette hendelsen til";
        removeEventBtn.innerHTML = `<div style="top: 10px;">Avbryt</div>`;
        removeEventBtnPressed = true;
    }
    else{
        header.innerHTML = "Julekalender";
        removeEventBtn.innerHTML = `<div>Slett hendelse</div>`;
        removeEventBtnPressed = false;
    }
}, addDateValue);