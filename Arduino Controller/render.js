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
        try{
            let tOn = turnOn();
        }   catch(err){ };

        btnClicked = true;
        btn.style.backgroundColor = "#ea450a";
        btn.style.transition = "0.25s";
        btn.innerHTML = "Turn Off"
    }
    else{
        try{
            let tOff = turnOff();
        }   catch(err){ }
 
        btnClicked = false;
        btn.style.backgroundColor = "#15d325";
        btn.style.transition = "0.25s";
        btn.innerHTML = "Turn On";
    }
}