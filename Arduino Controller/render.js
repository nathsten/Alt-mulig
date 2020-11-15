//@ts-check

import {turnOn} from './index.js';
import {turnOff} from './index.js';

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
        preform();
        btnClicked = true;
        btn.style.backgroundColor = "#ea450a";
        btn.style.transition = "0.25s";
        btn.innerHTML = "Turn Off"
    }
    else{
        preform();
        btnClicked = false;
        btn.style.backgroundColor = "#15d325";
        btn.style.transition = "0.25s";
        btn.innerHTML = "Turn On";
    }
}

const preform = () => {
    if(btnClicked !== true){
        let tOn = turnOn();
    }
    else if(btnClicked === true){
        let tOff = turnOff();
    }
    else{
        return console.error("WTF");
    }
}