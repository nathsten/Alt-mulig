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



// let currWindow = remote.BrowserWindow.getFocusedWindow();

// window.closeCurrentWindow = function(){
//     currWindow.close();
// }