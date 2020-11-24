//@ts-check

/**
 * @param {string} id
 * @returns {object}
 */
const $ = (id) => document.getElementById(id);
function setup(){
    const btn = $("btn");

    btn.addEventListener("click", controllArduino);
    let btnClicked = false;

    function controllArduino(){
        if(btnClicked !== true){
            btnClicked = true;
            btn.style.backgroundColor = "#ea450a";
            btn.style.transition = "0.25s";
            btn.innerHTML = "Turn Off"; 
            // @ts-ignore
            loadJSON('power/on', function(error){
                if(error){
                    console.log('Noe gikk galt')
                }                
            }) 
        }
        else{
            btnClicked = false;
            btn.style.backgroundColor = "#15d325";
            btn.style.transition = "0.25s";
            btn.innerHTML = "Turn On"; 
            // @ts-ignore
            loadJSON('power/off', function(error){
                if(error){
                    console.log('Noe gikk galt')
                }
            })
        }
    }
}