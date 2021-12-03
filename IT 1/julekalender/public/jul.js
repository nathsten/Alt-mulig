
/**
 * @param {string} ids 
 * @returns {HTMLHtmlElement[]}
 */
const $ = ids => ids.split(" ").map(id => document.getElementById(id));

const lyd = new Audio('./jul.mp3');

const [ mainDiv, jokesDiv ] = $("main jokes");

// if(screen.width <= 300){
//     mainDiv.style.gridTemplateColumns = "repeat(2, 1fr)"
// }

// if(screen.width <= 600){
//     mainDiv.style.gridTemplateColumns = "repeat(3, 1fr)"
// }

// if(screen.width <= 1000){
//     mainDiv.style.gridTemplateColumns = "repeat(5, 1fr)"
// }

// if(screen.width > 1000){
//     mainDiv.style.gridTemplateColumns = "repeat(6, 1fr)"
// }

const date = new Date().getDate();

for (let i = 1; i <= 24; i++) {
    const luke = document.createElement("div");
    luke.id = i;
    luke.innerHTML = `${i}. Desember`;
    luke.className = "luke";
    if(i === date){
        luke.classList.add("today");
    }
    if(i > date){
        luke.classList.add("closed");
    }
    mainDiv.append(luke);
}

var jokes;

(async (req) => {
    const getJokes = await fetch(req);
    jokes = await getJokes.json();
})('./jokes.json');

var showing = false;

mainDiv.addEventListener("click", e => {
    const { id, className } = e.target;
    if(className.includes("luke") && !showing && +id <= date){
        mainDiv.style.filter = "opacity(0.5)";
        jokesDiv.style.display = "block";
        jokesDiv.classList.remove("visJoke");
        jokesDiv.classList.add("visJoke");
        jokesDiv.innerHTML = jokes[id];
        setTimeout(() => {
            showing = true;
        }, 100);
        if(+id === 24){
            lyd.play();
            setTimeout(() => {
                lyd.pause();
            }, 2000);
        }
    }
    else if(showing){
        jokesDiv.style.display = "none";
        mainDiv.style.filter = "opacity(1)";
        showing = false;
    }
});

window.addEventListener("keydown", e => {
    if(e.keyCode === 27){
        if(showing){
            jokesDiv.style.display = "none";
            mainDiv.style.filter = "opacity(1)";
            showing = false;
        }
    }
})