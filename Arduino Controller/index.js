const {Board, Led} = require("johnny-five");
const express = require('express');
const fs = require('fs');
const port = 3000;
const index = express();
const server = index.listen(port, callBack);

index.use(express.static('public'));

const getBoardState = JSON.parse(fs.readFileSync('state.json'));

function callBack(error){
    if(error){
        console.error('Noe gikk galt...');
    }
    else{
        console.log(`Server kjører på localhost:${port}`);
    }
}

index.get('/power/:onOff', turnOnFunk);

function turnOnFunk(req, res){
    const onOff = req.params.onOff;
    if(onOff === 'on'){
        console.log('Turning on...');
        turnOn();
        getBoardState["lightOn"] = true;
        setTimeout(() => {
            fs.writeFileSync('state.json', JSON.stringify(getBoardState, null, 2));            
        }, 2500);
    }
    else if(onOff === 'off'){
        console.log('Turning off...')
        turnOff();
        getBoardState["lightOn"] = false;
        setTimeout(() => {
            fs.writeFileSync('state.json', JSON.stringify(getBoardState, null, 2));            
        }, 2500);
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