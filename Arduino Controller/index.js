//@ts-check

// Dette funker ikke, nettsiden klager på at "require" ikke er deffinert.
function setup(){
    /**
     * @param {string} id
     * @returns {object}
     */
    const $ = (id) => document.getElementById(id);
    const btn = $("btn");

    btn.addEventListener("click", controllArduino);
    let btnClicked = false;

    function controllArduino(){
        if(btnClicked !== true){
            turnOn();
            btnClicked = true;
            btn.style.backgroundColor = "#ea450a";
            btn.style.transition = "0.25s";
            btn.innerHTML = "Turn Off"
        }
        else{
            turnOff();
            btnClicked = false;
            btn.style.backgroundColor = "#15d325";
            btn.style.transition = "0.25s";
            btn.innerHTML = "Turn On";
        }
    }
}


const five = require("johnny-five");
const board = new five.Board();

function turnOn(){
    board.on("ready", () => {
        const led = new five.Led(11);

        led.brightness(255);
    });
}

function turnOff(){
    board.on("ready", () => {
        const led = new five.Led(11);

        led.brightness(0);
    });
}

turnOff();