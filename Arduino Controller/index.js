const {Board, Led} = require("johnny-five");
const express = require('express');
const port = 3000;
const index = express();
const server = index.listen(port, callBack);

index.use(express.static('public'))

function callBack(error){
    if(error){
        console.error('Noe gikk galt...')
    }
    else{
        console.log(`Server kjører på locahost:${port}`);
    }
}

index.get('/power/:onOff', turnOnFunk);

function turnOnFunk(req, res){
    const onOff = req.params.onOff;
    if(onOff === 'on'){
        console.log('Turning on...');
        turnOn();
    }
    else if(onOff === 'off'){
        console.log('Turning off...')
        turnOff();
    }
    else{
        console.log('Fokk...');
    }
}

function turnOn(){
    const board = new Board();
    board.on("ready", () => {
        const led = new Led(11);

        led.brightness(255);
    });
}

function turnOff(){
    const board = new Board();
    board.on("ready", () => {
        const led = new Led(11);

        led.brightness(0);
    });
}