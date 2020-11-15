const {Board, Led} = require("johnny-five");
const board = new Board();

export function turnOn(){
    board.on("ready", () => {
        const led = new Led(11);

        led.brightness(255);
    });
}

export function turnOff(){
    board.on("ready", () => {
        const led = new Led(11);

        led.brightness(0);
    });
}

// Funksjoner som ikke eksporteres:
function turnOn(){
    board.on("ready", () => {
        const led = new Led(11);

        led.brightness(255);
    });
}

function turnOff(){
    board.on("ready", () => {
        const led = new Led(11);

        led.brightness(0);
    });
}

// Utføre funksjonene.
// turnOff();
// turnOn();

// kjøre funksjonen i terminal:
// node /Users/nathaniel/Documents/VG2/IT/Alt-mulig/Arduino\ Controller/index.js 


// let currWindow = remote.BrowserWindow.getFocusedWindow();

// window.closeCurrentWindow = function(){
//     currWindow.close();
// }